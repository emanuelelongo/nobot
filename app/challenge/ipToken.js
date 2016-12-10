let jwt = require('jsonwebtoken');
const SECRET = '___secret___';

class IpToken {
    constructor(ip) {
        this.token = jwt.sign({ip: ip}, SECRET, {audience: "challenge", expiresIn: 100});
    }

    get value(){
        return this.token;
    }

    static verify(value, ip) {
        try {
            let data = jwt.verify(value, SECRET, {audience: "challenge"});
            return data.ip === ip;
        }
        catch (err) {
            return false;
        }
    }
}

module.exports = IpToken;