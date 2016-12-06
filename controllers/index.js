let HomeCtrl    = require('./home');
let LoginCtrl   = require('./login');
let NewsCtrl = require('./news');

module.exports = {
    register: function(app) {
        app.get('/', HomeCtrl.index);

        app.get('/login', LoginCtrl.index);
        app.post('/login', LoginCtrl.doLogin);

        app.get('/user/news', NewsCtrl.index);
        app.post('/user/news', NewsCtrl.deleteNews);
    }

};