const express = require('express');
const router = express.Router();
const search = require('../controller/search');

router.get('/',(req,res)=>{
    res.writeHead(200, {'Content-Type': 'application/json'});
    const q = req.query.q;
    const que = encodeURIComponent(q);
    search(que, writeEnd);
    function writeEnd(songobj){
        res.end(JSON.stringify(songobj, null, 4));
    }
})

module.exports = router;