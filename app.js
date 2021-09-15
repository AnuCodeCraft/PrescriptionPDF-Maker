const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');

const gethtmltopdf = require('./gerenatepdf.js');

app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());

app.get('/', (req,res) =>{
 res.status(200).json({ "message" :" Poc for document upload, go to '/pdfgenerate' endpoint to upload the pdf "});
})

app.get('/pdfgenerate', (req, res) => {
    const result = gethtmltopdf();
    res.status(200).json({ "message" :" Successfully pdf uploaded "});
    
});


app.listen(3000, () => {
    console.log('App is listening on port 3000');
});