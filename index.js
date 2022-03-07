const express = require('express');
const app = express();
const search = require('./router/route');
const PORT = process.env.PORT || 3000;

app.use('/search', search);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})