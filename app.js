var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
 
var app = express();
var jsonParser = bodyParser.json();
app.set("view engine", "hbs");
 
app.use(express.static(__dirname + "/public"));
app.use("/editArticle/:contentID", function (request, response) {
    var id = request.params["contentID"];//id статьи
    response.render("createNewArticle.hbs", {
        conId: id
    });
});
// получение списка данных
app.get("/api/contents", function(req, res){
      
    var statya = fs.readFileSync("contents.json", "utf8");
    var contents = JSON.parse(statya);
    res.send(contents);
});
// получение одной статьи по id
app.get("/api/contents/:id", function(req, res){
      
    var id = req.params.id; // статью id
    var statya = fs.readFileSync("contents.json", "utf8");
    var contents = JSON.parse(statya);
    var content = null;
    // находим в массиве статью по id
    for(var i=0; i<contents.length; i++){
        if(contents[i].id==id){
            content = contents[i];
            break;
        }
    }
    // отправляем статью
    if(content){
        res.send(content);
    }
    else{
        res.status(404).send();
    }
});
// получение отправленных данных
app.post("/api/contents", jsonParser, function (req, res) {
     
    if(!req.body) return res.sendStatus(400);
     
    var titleText = req.body.title;
    var contextText = req.body.context;
    var timeText = req.body.time;
    var content = {title: titleText, context: contextText, time: timeText};
     
    var data = fs.readFileSync("contents.json", "utf8");
    var contents = JSON.parse(data);
     
    // находим максимальный id
    var id = Math.max.apply(Math,contents.map(function(o){return o.id;}))
    // увеличиваем его на единицу
    content.id = id+1;
    // добавляем статью в массив
    contents.push(content);
    var data = JSON.stringify(contents);
    // перезаписываем файл с новыми данными
    fs.writeFileSync("contents.json", data);
    res.send(content);
});
 // удаление статьи по id
app.delete("/api/contents/:id", function(req, res){
      
    var id = req.params.id;
    var data = fs.readFileSync("contents.json", "utf8");
    var contents = JSON.parse(data);
    var index = -1;
    // находим индекс статьи в массиве
    for(var i=0; i<contents.length; i++){
        if(contents[i].id==id){
            index=i;
            break;
        }
    }
    if(index > -1){
        // удаляем статью из массива по индексу
        var content = contents.splice(index, 1)[0];
        var data = JSON.stringify(contents);
        fs.writeFileSync("contents.json", data);
        // отправляем удаленную статью
        res.send(content);
    }
    else{
        res.status(404).send();
    }
});
// изменение статьи
app.put("/api/contents", jsonParser, function(req, res){
      
    if(!req.body) return res.sendStatus(400);
     
    var contentId = req.body.id;
    var titleText = req.body.title;
    var contextText = req.body.context;
    var timeText = req.body.time;
     
    var data = fs.readFileSync("contents.json", "utf8");
    var contents = JSON.parse(data);
    var content;
    for(var i=0; i<contents.length; i++){
        if(contents[i].id==contentId){
            content = contents[i];
            break;
        }
    }
    // изменяем данные у статьи
    if(content){
        content.context = contextText;
        content.title = titleText;
        content.time = timeText;
        var data = JSON.stringify(contents);
        fs.writeFileSync("contents.json", data);
        res.send(content);
    }
    else{
        res.status(404).send(content);
    }
});





app.get("/aplic/contents", function(req, res){
      
    var statya = fs.readFileSync("contents_ready.json", "utf8");
    var contents = JSON.parse(statya);
    res.send(contents);
});
// получение одной статьи по id
app.get("/aplic/contents/:id", function(req, res){
      
    var id = req.params.id; // статью id
    var statya = fs.readFileSync("contents_ready.json", "utf8");
    var contents = JSON.parse(statya);
    var content = null;
    // находим в массиве статью по id
    for(var i=0; i<contents.length; i++){
        if(contents[i].id==id){
            content = contents[i];
            break;
        }
    }
    // отправляем статью
    if(content){
        res.send(content);
    }
    else{
        res.status(404).send();
    }
});
// получение отправленных данных для публикации
app.post("/aplic/contents/", jsonParser, function (req, res) {
     
    if(!req.body) return res.sendStatus(400);
     
    var titleText = req.body.title;
    var contextText = req.body.context;
    var timeText = req.body.time;
    var content = {title: titleText, context: contextText, time: timeText};
     
    var data = fs.readFileSync("contents_ready.json", "utf8");
    var contents = JSON.parse(data);
     
    // находим максимальный id
    var id = Math.max.apply(Math,contents.map(function(o){return o.id;}))
    // увеличиваем его на единицу
    content.id = id+1;
    // добавляем статью в массив
    contents.push(content);
    var data = JSON.stringify(contents);
    // перезаписываем файл с новыми данными
    fs.writeFileSync("contents_ready.json", data);
    res.send(content);
});
 // удаление статьи по id
app.delete("/aplic/contents/:id", function(req, res){
      
    var id = req.params.id;
    var data = fs.readFileSync("contents_ready.json", "utf8");
    var contents = JSON.parse(data);
    var index = -1;
    // находим индекс статьи в массиве
    for(var i=0; i<contents.length; i++){
        if(contents[i].id==id){
            index=i;
            break;
        }
    }
    if(index > -1){
        // удаляем статью из массива по индексу
        var content = contents.splice(index, 1)[0];
        var data = JSON.stringify(contents);
        fs.writeFileSync("contents_ready.json", data);
        // отправляем удаленную статью
        res.send(content);
    }
    else{
        res.status(404).send();
    }
});
// изменение статьи
app.put("/aplic/contents", jsonParser, function(req, res){
      
    if(!req.body) return res.sendStatus(400);
     
    var contentId = req.body.id;
    var titleText = req.body.title;
    var contextText = req.body.context;
     
    var data = fs.readFileSync("contents_ready.json", "utf8");
    var contents = JSON.parse(data);
    var content;
    for(var i=0; i<contents.length; i++){
        if(contents[i].id==contentId){
            content = contents[i];
            break;
        }
    }
    // изменяем данные у статьи
    if(content){
        content.context = contextText;
        content.title = titleText;
        var data = JSON.stringify(contents);
        fs.writeFileSync("ccontents_ready.json", data);
        res.send(content);
    }
    else{
        res.status(404).send(content);
    }
});



  
app.listen(3000, function(){
    console.log("Сервер ожидает подключения...");
});