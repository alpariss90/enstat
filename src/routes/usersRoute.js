var express=require('express');
const usersService = require('../services/usersService');
var router=express.Router();



router.get('/list.php', (req, res)=>{
    var users=usersService.list().rows;
    res.render('users/list',{
        users: users,
        result: {error: req.flash('error'), success: req.flash('success')}
    });
});

router.post('/save', function(req, res){
    const {nom,prenom,login,division,profil}=req.body;

    if(usersService.isUserExist(login)> 0){
        req.flash('error', 'Le login '+login+' existe déja');
        return res.redirect('/users/list.php')
    }

    var user=usersService.mapUser(nom,prenom,login,division,profil);

    user.who_done="test"//req.session.user.login;
    user.when_done=new Date();

    const rs=usersService.add(user);
    if(!rs.err){
        req.flash('success', rs.result);
        res.redirect('/users/list.php');
    }else{
        req.flash('error', "Utilisateur non ajouté");
        res.redirect('/users/list.php');
    }
   
});

router.post('/edit', function(req, res){
    const {nom,prenom,login,division,profil}=req.body;


    var user=usersService.mapUser(nom,prenom,login,division,profil);

    user.who_done="test"//req.session.user.login;
    user.when_done=new Date();

    const rs=usersService.edit(user);
    if(!rs.err){
        req.flash('success', rs.result);
        res.redirect('/users/list.php');
    }else{
        req.flash('error', "Utilisateur non modifier");
        res.redirect('/users/list.php');
    }
   
});

router.get('/init.php/:login', (req, res)=>{
    usersService.init(req.params.login);
    req.flash('success', 'Mot de passe de utilisateur '+req.params.login+' effectué avec success');
    return res.redirect('/users/list.php');
});

router.get('/change-etat.php/:login', (req, res)=>{
    usersService.setEtat(req.params.login);
    req.flash('success', 'Etat de utilisateur '+req.params.login+' changé avec success');
    return res.redirect('/users/list.php');
});


router.get('/form-edit.php/:login', (req, res)=>{
    return res.render('users/form-edit',{
        user: usersService.getByLogin(req.params.login).shift()
    })
});






module.exports=router;