const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 3001;
const app = express(); 
 
require('dotenv').config({ path: `.env.${process.env.test}` })

app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running
// app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/ping', function (req, res) { 
 return res.send('pong');ss
});
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port);
console.log(`working in port: ${port} environment: ${process.env.NODE_ENV}`);