var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/', function (req, res) {
    var url = 'http://managerdc7.rackservice.org:50915/lapstat?valid=1';
    var result = [];

    request(url, function (error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);
            // We'll use the unique header class as a starting point.
            $('table tbody').filter(function () {

                // Let's store the data we filter into a variable so we can easily see what's going on.

                var rows = $(this).children();
                var driver,time;

                rows.each(function (index, row) {
                    driver = row.children[3].children[0].data;
                    time = row.children[7].children[0].data;

                    result.push({driver: driver, time: time});
                });
            })
        } else {
            console.error('err', error);
        }

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(result));
    })
});


module.exports = router;
