const express = require('express');
const session = require('express-session');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session'); // Library to use MySQL to store session objects
const passport = require('passport');
const db = require('./config/db');

const mainRoute = require('./routes/main');
const userRoute = require('./routes/user');
const adminRoute = require('./routes/admin');
const vendorRoute = require('./routes/vendor'); 
const app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(cookieParser());

app.use(session({
	key: 'foodhubsg',
	secret: 'totallysecretpassword',
	store: new MySQLStore({
		host: db.host,
		port: 3306,
		user: db.username,
		password: db.password,
		database: db.database,
		clearExpired: true,
		checkExpirationInterval: 900000,
		expiration: 900000,
	}),
	resave: false,
	saveUninitialized: false,
}));

app.use(flash());
var sessionFlash = function (req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
}
app.use(sessionFlash);

app.use(function (req, res, next) {
	next();
});

app.use(passport.initialize());
app.use(passport.session());
const authenticate = require('./config/passport');
authenticate.localStrategy(passport);

app.use('/', mainRoute);
app.use('/user', userRoute);
app.use('/admin', adminRoute);
app.use('/vendor', vendorRoute);

const foodhubsg = require('./config/DBConnection');
foodhubsg.setUpDB(false);


const port = 5000;
app.listen(port, () => { console.log(`Server started on port ${port}`); });