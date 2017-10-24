const express = require('express');
const router = express.Router();
const request = require('request');
const cacheStorage = require('../../src/lapstat/cache/storage');
const DataReader = require('../../src/lapstat/data-reader');
const UrlResolver = require('../../src/lapstat/url-resolver');

function getData(type) {
    let url = UrlResolver.resolve(type);

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

function get(type, req, res) {
    try {
        const cachedKey = 'times_' + type;
        const cached = cacheStorage.get(cachedKey);

        if (!cached) {
            const data = getData(type);
            data.then(function (result) {
                res.setHeader('Content-Type', 'application/json');
                cacheStorage.set(cachedKey, result);
                res.send(JSON.stringify(result));
            });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(cached));
        }
    } catch (exception) {
        console.log('Yikes', exception);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({exception: 'YIKES!'}));
    }
}

router.get('/pro', function (req, res) {
    get('pro', req, res);

});

router.get('/semipro', function (req, res) {
    get('semipro', req, res);
});

router.get('/am', function (req, res) {
    get('am', req, res);
});


module.exports = router;
module.exports.getData = getData;
