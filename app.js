var express=require('express');
const app=express();
const users=require('./src/routes/usersRoute');
const enseignant=require('./src/routes/enseignantRoute');
const authenticated=require('./src/routes/authenticatedRoute');
const cycle=require('./src/routes/cycleRoute');
const params=require('./src/routes/paramsRoute');
const flash=require('connect-flash');
const session=require('express-session');
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');

const port=process.env.PORT;


app.set('view engine', 'twig');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
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
app.use('/cycle', cycle);
app.use('/params', params);



app.get('/', (req, res)=>{
    return res.redirect('/index.php');
});

app.get('/index.php', function(req, res){
    return res.render('accueil',{
        message: "Bienvenue sur le systeme de gestion de ENSTAT"
    })
});



app.get('*', function(req, res){
    res.send('<h1>404 PAGE NOT FOUND</h1>')
});
app.listen(port, ()=>{
    console.log('App listen at port'+port);
})