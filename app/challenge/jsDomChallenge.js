let inject = require('connect-inject');
let IpToken = require('./ipToken');

let span = '<span id="abcdef" data-token="__data__"></span>';

let ch = 'function ch(id){elem = document.getElementById(id); console.log(elem.dataset.token);}';


class JsDomChallenge {
    constructor() {
        this.type = process.argv[2] || 'none';
    }

    _getIp(req) {
        return req.headers['true-client-ip'] || req.client.remoteAddress;
    }

    challenge() {
        let _this = this;
        return function(req, res, next) {
            let token = new IpToken(_this._getIp(req));
            span = span.replace('__data__', token.value);
            inject({snippet: [span, '<script>(' + ch + ')(\"abcdef\")</script>']})(req, res, next);
        }
    }

    check() {
        return function(req, res, next) {
            next();
        }
    }
}

module.exports = new JsDomChallenge();