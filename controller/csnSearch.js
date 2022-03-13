const axios = require('axios');
const cheerio = require('cheerio');

const csnSearch = function (query, callback) {
    let songobj = new Object();
    axios.get('https://chiasenhac.vn/tim-kiem?q=' + query).then(res => {
        const $ = cheerio.load(res.data);
        let url = $($('.media .align-items-stretch')['6']).find('.media-title a').attr('href');
        let songName = $($('.media .align-items-stretch')['6']).find('.media-title a').attr('title');
        let singer = $($('.media .align-items-stretch')['6']).find('.author').text();
        if(url){
            axios.get(url).then(res => {
                const ra = cheerio.load(res.data);
                let lyrics = ra('#fulllyric').text();
                let lines = lyrics.split('\n');
                lines = lines.filter(function (entry) { return entry.trim() != '' });
                (lines[0].includes("Intro")) ? lines.shift() : null;
                lyrics = lines.join('\n');
                songobj.name = songName;
                songobj.singer = singer;
                songobj["api author"] = "Nanika";
                songobj.hoster = "";
                songobj.lyrics = lyrics.trim();
                return callback(songobj);
            })
            .catch(err => {
                songobj.error = "Lỗi " + err;
                songobj["api author"] = "Nanika";
                songobj.hoster = "";
                return callback(songobj);
            })
        }
        else {
            songobj.error = "Không tìm thấy bài hát";
            songobj["api author"] = "Nanika";
            songobj.hoster = "";
            return callback(songobj);
        }
    }).catch(err => {
        songobj.error = "Lỗi " + err;
        songobj["api author"] = "Nanika";
        songobj.hoster = "";
        return callback(songobj);
    })
}

module.exports = csnSearch;
