let jwt = require('jsonwebtoken');

class Authenticator {
    constructor(secret) {
        this.secret = secret;
    }

    _buildAuthenticateHelper(res) {
        return (email) => {
            res.cookie("auth", jwt.sign({email: email}, this.secret, {audience: "login", expiresIn: "60d"}));
        };
    }

    _checkRequest(req) {
        let token = req.cookies['auth'];
        if (!token) {
            return false;
        }
        try {
            let data = jwt.verify(token, this.secret, {audience: "login"});
            if (data.email) {
                req.userInfo = {email: data.email};
                return true;
            }
            return false;
        }
        catch (err) {
            return false;
        }
    }

    helper() {
        return (req, res, next) => {
            res.authenticate = this._buildAuthenticateHelper(res);
            next();
        };
    }

    check() {
        return (req, res, next) => {
            if (!this._checkRequest(req)) {
                if(req.method === "GET") {
                    res.redirect('/login');
                }
                else {
                    res.status(401).send("Unauthorized");
                }
                return;
            }
            next();
        }
    }
}
module.exports = Authenticator;