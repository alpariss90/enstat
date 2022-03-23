var express=require('express');
const app=express();
const cors=require('cors');
const users=require('./src/routes/usersRoute');
const enseignant=require('./src/routes/enseignantRoute');
const etudiant=require('./src/routes/etudiantRoute');
const authenticated=require('./src/routes/authenticatedRoute');
const cycle=require('./src/routes/cycleRoute');
const params=require('./src/routes/paramsRoute');
const semestre=require('./src/routes/semestre');
const etat=require('./src/routes/etat');
const flash=require('connect-flash');
const session=require('express-session');
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');
const enseignantService=require('./src/services/enseignantService');

const port=process.env.PORT;

var corsOptions = {
    origin: 'http://localhost:4000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});
app.set('view engine', 'twig');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors(corsOptions));
//app.use('/bootstrap', express.static('./node_modules/bootstrap/'));
app.set('views', './src/vues');
app.use(cookieParser());
//app.use(session({secret: "Your secret key"}));
//app.use(cookieParser('secret'));
app.use(session({
    cookie: { maxAge: 60000 },
   // store: sessionStore,
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret'
}));


app.use(function(req, res, next){
    if(req.session.user){
        res.locals.user=req.session.user;
    }
    next(); 
});



app.use(flash());
app.use('/', authenticated);
/*
app.use(function(req, res, next){
    if(req.session.user){
        next();
    }else{
        return res.redirect('/logout.php');
    }
});
*/


app.use('/users', users);
app.use('/enseignant', enseignant);
app.use('/etudiant', etudiant);
app.use('/cycle', cycle);
app.use('/params', params);
app.use('/semestre', semestre);
app.use('/etat', etat);



app.get('/', (req, res)=>{
    return res.redirect('/index.php');
});

app.get('/index.php', function(req, res){

    var moduleByCycle=enseignantService.getNbreModuleByCycle().rows;

    return res.render('accueil',{
        message: "TABLEAU DE BORD",
        nbreModuleByCycle: moduleByCycle
    })
});



app.get('*', function(req, res){
    res.send('<h1>404 PAGE NOT FOUND</h1>')
});
app.listen(port, ()=>{
    console.log('App listen at port'+port);
})