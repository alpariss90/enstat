var express=require('express');
const usersService = require('../services/usersService');
var router=express.Router();



router.get('/login.php', (req, res)=>{
    res.render('login',{
        result: {error: req.flash('error'), success: req.flash('success')}
    });
});

router.get('/logout.php', function(req, res){
    req.session.destroy(function(){
        //req.flash("success", "Vous êtes deconnecter.......");
            return res.redirect("/login.php");
    });
});

router.post('/login.php', (req, res)=>{
    const {login, password}=req.body;
    if(!login || !password){
        req.flash("error", "Veuillez bien remplir le formulaire")
        return res.redirect('/login.php');
    }else{
        console.log("1");
        var user=usersService.isUserCanLogin(login, password);
        if(user != null){
            req.session.user=user;
            return res.redirect('/');
        }else{
            console.log("3");
            req.flash("error", "Login et/ou mot de passe incorrect");
            return res.redirect("/login.php");
        }
    }
});





module.exports=router;