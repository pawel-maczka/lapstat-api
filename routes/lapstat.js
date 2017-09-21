var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');


router.get('/', function (req, res) {
    var url = 'http://managerdc7.rackservice.org:50915/lapstat?valid=1';
    var result = [];

    request(url, function (error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);

            $('table tbody').filter(function () {

                var rows = $(this).children();

                rows.each(function (index, row) {
                    result.push({
                        driver: row.children[3].children[0].data.trim(),
                        car: row.children[5].children[2].data.trim(),
                        time: row.children[7].children[0].data.trim(),
                        gap:row.children[9].children[0].data.trim(),
                    });
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
