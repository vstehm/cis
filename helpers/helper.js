const request = require('request');

module.exports = {
    get(url) {
        return new Promise((resolve, reject) => {
            let data = {
                url: url
            };
            request.get(data, function (err, httpResponse, body) {
                if (err != null) {
                    return reject(err);
                }
                let json = body;
                try {
                    json = JSON.parse(body);
                }
                catch (err) {
                    // log.e(url, body);
                    return reject(err);
                }
                return resolve(json);
            })
        });
    },
    getImage(url) {
        return new Promise((resolve, reject) => {
            let data = {
                url: url,
                encoding: null
            };
            request.get(data, function (err, httpResponse, body) {
                if (err != null) {
                    return reject(err);
                }
                let json = body;
                return resolve(json);
            })
        });
    }
};