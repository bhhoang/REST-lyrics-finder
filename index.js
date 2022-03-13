const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })
const express = require('express');
const app = express();
const search = require('./router/route');
const ejs = require('ejs');
const PORT = process.env.PORT || 3000;

if(process.env.SOURCEMODE == 1){
    console.log('Choosing mode 1: Source will be from NhacCuaTui');
}
else if(process.env.SOURCEMODE == 2){
    console.log('Choosing mode 2: Source will be from CsnSearch');
}

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.use('/search', search);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})