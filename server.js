const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname+'/dist/web-socio-convenios/browser'));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname+'/dist/web-socio-convenios/browser/index.html'));
});

//app.listen(process.env.port || 8080);



const host = '0.0.0.0';
const port = process.env.PORT || 8080;
app.listen(port, host, function() {
    console.log("Server started.......");
  });