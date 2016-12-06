class HomeCtrl {
    index(req, res) {
        res.render('home');
    }
}

module.exports = new HomeCtrl();