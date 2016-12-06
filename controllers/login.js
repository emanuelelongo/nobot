class LoginCtrl {
    index(req, res) {
        res.cookie('auth', '', { expires: new Date() });
        res.render('login');
    }

    doLogin(req, res) {
        if(req.body.email === "eee@mail.com" && req.body.password === "eeeee") {
            res.authenticate(req.body.email);
            res.redirect('user/news');
            res.end();
            return;
        }
        res.render('login', {showFailMessage: true});
    }
}

module.exports = new LoginCtrl();