let express       = require('express');
let bodyParser    = require('body-parser');
let cookieParser  = require('cookie-parser');
let cors          = require('cors');
let handlebars    = require('handlebars');
let exphbs        = require('express-handlebars');
let controllers   = require('./controllers');
let Authenticator = require('./app/auth');
let challenge     = require('./app/challenge/jsDomChallenge');

let authenticator = new Authenticator("keep this secret");
let app = express();
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('*', authenticator.helper());
app.use('/user', authenticator.check());
app.use('/public', express.static(__dirname + '/public'));
app.use(challenge.challenge());
app.use(challenge.check());
app.engine('hbs', exphbs({defaultLayout: 'main.hbs'}));
app.set('view engine', 'hbs');

controllers.register(app);

app.listen(8080, () => {
    console.log("Listening on port 8080");
});
