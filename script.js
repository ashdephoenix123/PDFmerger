const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const { mergePDF } = require('./merge')
const fs = require('fs');

const app = express()
const port = 3000;

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('index');
})

app.post('/submit', upload.array('pdfs', 2), async (req, res, next) => {
    let d = await mergePDF(req.files[0].path, req.files[1].path);
    res.sendFile(__dirname + `/static/${d}.pdf`)
    setTimeout(() => {
        fs.unlinkSync(__dirname + `/static/${d}.pdf`);
        fs.unlinkSync(__dirname + `/${req.files[0].path}`);
        fs.unlinkSync(__dirname + `/${req.files[1].path}`);
    }, 1000);
})

app.listen(3000, () => {
    console.log(`Server is ready on port http://localhost:${port}`);
})
