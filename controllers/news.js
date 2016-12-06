let hn = require('hacker-news-api');

let deleted = [];

class NewsCtrl {
    index(req, res) {
        hn.story().search('security').hitsPerPage(10).before('past_24h', function (error, data) {
            if (error) throw error;
            data.hits = data.hits.filter(i => deleted.indexOf(i.objectID) < 0);
            res.render('news', data);
        });
    }

    deleteNews(req, res) {
        if(deleted.indexOf(req.body.id) == -1)
            deleted.push(req.body.id);

        hn.story().search('security').hitsPerPage(10).before('past_24h', function (error, data) {
            if (error) throw error;
            data.hits = data.hits.filter(i => deleted.indexOf(i.objectID) < 0);
            res.render('news', data);
        });
    }
}

module.exports = new NewsCtrl();