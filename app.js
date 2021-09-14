const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');

const gethtmltopdf = require('./gerenatepdf.js');

app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());

app.get('/', (req, res) => {
    gethtmltopdf();
    
    res.send("Pdf Generated");
});

app.get('/ejs', function(req, res) {
        res.render(path.resolve(__dirname, 'views/template.ejs'));
      });

app.listen(3000, () => {
    console.log('App is listening on port 3000');
});