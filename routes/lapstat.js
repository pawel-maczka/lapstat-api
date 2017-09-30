const express = require('express');
const router = express.Router();
const request = require('request');
const cheerio = require('cheerio');
const cacheStorage = require('../cache/storage');

function getData() {

    let url = 'http://managerdc7.rackservice.org:50915/lapstat?valid=1';
    let times = [];

    return new Promise(function (resolve, reject) {
        request
            .get(url)
            .on('response', function (response) {
                let html = '';

                response
                    .on('data', (chunk) => html += chunk)
                    .on('error', (err) => reject(err))
                    .on('end', () => {
                        let $ = cheerio.load(html);

                        $('table tbody').filter(function () {

                            let rows = $(this).children();

                            rows.each(function (index, row) {
                                times.push({
                                    driver: row.children[3].children[0].data.trim(),
                                    car: row.children[5].children[2].data.trim(),
                                    time: row.children[7].children[0].data.trim(),
                                    gap: row.children[9].children[0].data.trim(),
                                });
                            });
                        });

                        resolve({times: times});
                    });

            });
    });

}

router.get('/', function (req, res) {
    const cached = cacheStorage.get('times');

    if (!cached) {
        const data = getData();
        data.then(function (result) {
            res.setHeader('Content-Type', 'application/json');
            cacheStorage.set('times', result);
            res.send(JSON.stringify(result));
        });
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(cached));
    }
});


module.exports = router;
module.exports.getData = getData;
