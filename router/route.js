const express = require('express');
const router = express.Router();
const search = require('../controller/search');
const songobj = require('../controller/search').songobj;

router.get('/',(req,res)=>{
    res.writeHead(200, {'Content-Type': 'application/json'});
    const q = req.query.q;
    const que = encodeURIComponent(q);
    search(que);
    setTimeout(()=>res.end(JSON.stringify(songobj, null, 4)),5000);
})

module.exports = router;