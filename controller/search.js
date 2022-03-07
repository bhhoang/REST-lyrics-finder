const cheerio = require('cheerio');
const request = require('request');
var songobj = {};

const search = function (query){
    request("https://www.nhaccuatui.com/tim-kiem?q=" + query, (error, response, html) => {
        if(!error && response.statusCode == 200) {
          const $ = cheerio.load(html);
      
          const url = $($('.sn_search_single_song')['0']).find('a').attr('href');
          const songName = $($('.sn_search_single_song')['0']).find('.title_song a').attr('title');
          const singer = $($('.sn_search_single_song')['0']).find('.singer_song a').text();
          return request(url, (error, response, html) => {
                if(!error && response.statusCode == 200) {
                    const ra = cheerio.load(html);
                    let lyrics = ra('#divLyric').text();
                    let lines = lyrics.split('\n');
                    lines = lines.filter(function(entry) { return entry.trim() != '' });
                    (lines[0].includes("Bài hát")) ? lines.shift() : null;
                    lyrics = lines.join('\n');
                    songobj.name = songName;
                    songobj.singer = singer;
                    songobj.lyrics = lyrics.trim();
                }
          })
        }
        else {
          return;
        }
      }
    )
}
module.exports = search;
module.exports.songobj = songobj;