const UrlProvider = require('../../src/lapstat/url-provider');

class UrlResolver {
    static resolve(type) {
        switch (type) {
            case 'pro':
                return UrlProvider.pro();
            case 'semipro':
                return UrlProvider.semipro();
            case 'am':
                return UrlProvider.am();
            default:
                throw 'Unknown URL type';
        }
    }
}

module.exports = UrlResolver;