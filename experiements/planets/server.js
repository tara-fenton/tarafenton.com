const express = require('express')
const app = express()
var path    = require("path");
 app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile(path.join('index.html')))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
