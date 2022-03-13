const express = require('express');
const router = express.Router();
require('dotenv').config({ path: '../.env' });
let search;
if(process.env.SOURCEMODE == 1){
search = require('../controller/search');
}
else if(process.env.SOURCEMODE == 2){
search = require('../controller/csnSearch');
}

router.get('/',(req,res)=>{
    res.writeHead(200, {'Content-Type': 'application/json'});
    const q = req.query.q;
    const que = encodeURIComponent(q);
    search(que, writeEnd)
    function writeEnd(songobj){
        res.end(JSON.stringify(songobj, null, 4));
    }
})

module.exports = router;