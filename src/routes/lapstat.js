const express = require('express');
const router = express.Router();
const request = require('request');
const cacheStorage = require('../../src/lapstat/cache/storage');
const DataReader = require('../../src/lapstat/data-reader');


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
                        const reader = new DataReader(html);
                        resolve({times: reader.parse()});
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
