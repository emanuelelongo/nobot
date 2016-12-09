let IpToken = require('./ipToken');

class IPTokenChallenge {
    constructor() {
    }

    _getIp(req) {
        return req.headers['true-client-ip'] || req.client.remoteAddress;
    }

    challenge() {
        return (req, res, next) => {
            let ip = this._getIp(req);
            let token = new IpToken(ip);
            res.cookie('challenge', token.value);
            next();
        }
    }

    check() {
        return (req, res, next) => {
            let ip = this._getIp(req);
            if(req.method === 'GET' || IpToken.verify(req.cookies['challenge'], ip))
                return next();

            res.status(401).send("Unauthorized");
        }
    }
}

module.exports = new IPTokenChallenge();
