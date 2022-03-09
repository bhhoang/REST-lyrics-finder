const cheerio = require('cheerio');
const request = require('request');

const search = function (query, callback) {
  let songobj = new Object();
  try {
    request("https://www.nhaccuatui.com/tim-kiem?q=" + query, (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        let url = $($('.sn_search_single_song')['0']).find('a').attr('href');
        let songName = $($('.sn_search_single_song')['0']).find('.title_song a').attr('title');
        let singer = $($('.sn_search_single_song')['0']).find('.singer_song a').text();
        if ($('.sn_box_search_suggest')){
            songName = $($('.sn_box_search_suggest')[0]).find('.sn_name_album_search a').attr('title');
            singer =  $($('.sn_box_search_suggest')[0]).find('.sn_list_singer_search a').text();
            url = $($('.sn_box_search_suggest')[0]).find('.sn_thumb a').attr('href');
        }
        if (url) {
          return request(url, (error, response, html) => {
            if (!error && response.statusCode == 200) {
              const ra = cheerio.load(html);
              let lyrics = ra('#divLyric').text();
              let lines = lyrics.split('\n');
              lines = lines.filter(function (entry) { return entry.trim() != '' });
              (lines[0].includes("Bài hát")) ? lines.shift() : null;
              lyrics = lines.join('\n');
              songobj.name = songName;
              songobj.singer = singer;
              songobj["api author"] = "Nanika";
              songobj.hoster = "";
              songobj.lyrics = lyrics.trim();
              return callback(songobj);
            }
          })
        }
        else {
          songobj.error = "Không tìm thấy bài hát hoặc API bị hỏng";
          songobj["api author"] = "Nanika";
          songobj.hoster = "";
          return callback(songobj);
        }
      }
    })
  }
  catch (error) {
    songobj.error = "Lỗi" + error;
    songobj.author = "Nanika";
    songobj.hoster = "";
    return songobj
  }
}
module.exports = search;