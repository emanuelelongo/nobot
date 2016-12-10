let inject = require('connect-inject');
let IpToken = require('./ipToken');

let span = '<span id="abcdef" data-token="__data__"></span>';

let ch = 'function ch(id){elem = document.getElementById(id); document.cookie="challenge="+elem.dataset.token+"; path=/"}';


class JsDomChallenge {
    constructor() {
        this.type = process.argv[2] || 'none';
    }

    _getIp(req) {
        return req.headers['true-client-ip'] || req.client.remoteAddress;
    }

    challenge() {
        return (req, res, next) => {
            let token = new IpToken(this._getIp(req));
            span = span.replace('__data__', token.value);
            inject({snippet: [span, '<script>(' + ch + ')(\"abcdef\")</script>']})(req, res, next);
        }
    }

    check() {
        return (req, res, next) => {
            if(req.method === 'GET' || IpToken.verify(req.cookies["challenge"], this._getIp(req)))
                return next();

            res.status(401).send("Unauthorized");
        }
    }
}

module.exports = new JsDomChallenge();