const express = require('express');
const router = express.Router();
const request = require('request');
const cheerio = require('cheerio');

router.get('/', function (req, res) {
    let url = 'http://managerdc7.rackservice.org:50915/lapstat?valid=1';
    let result = [];

    request(url, function (error, response, html) {
        if (!error) {
            let $ = cheerio.load(html);

            $('table tbody').filter(function () {

                let rows = $(this).children();

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
