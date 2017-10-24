class UrlProvider {
    static pro() {
        return 'http://managerdc7.rackservice.org:50915/lapstat?valid=1&ranking=1';
    }

    static semipro() {
        return 'http://managerdc7.rackservice.org:50175/lapstat?valid=1&ranking=1';
    }

    static am() {
        return 'http://managerdc7.rackservice.org:50456/lapstat?valid=1&ranking=1';
    }
}

module.exports = UrlProvider;