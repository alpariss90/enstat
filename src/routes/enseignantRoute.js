var express=require('express');
const enseignantService = require('../services/enseignantService');
var router=express.Router();



router.get('/list.php', (req, res)=>{
    var enseignants=enseignantService.list().rows;
    res.render('enseignants/list',{
        enseignants: enseignants,
        result: {error: req.flash('error'), success: req.flash('success')}
    });
});

router.post('/save', function(req, res){
    const {nom,prenom,age,diplome}=req.body;

    if(enseignantService.isEnseignantExist(nom,prenom,age)> 0){
        req.flash('error', "Enseignatn "+nom+" "+prenom+" "+age+"+ existe déja");
        return res.redirect('/enseignant/list.php')
    }

    var enseignant=enseignantService.mapEnseignant(nom,prenom,age,diplome,0);

    enseignant.who_done="test"//req.session.user.login;
    enseignant.when_done=new Date();

    const rs=enseignantService.add(enseignant);
    if(!rs.err){
        req.flash('success', rs.result);
        res.redirect('/enseignant/list.php');
    }else{
        req.flash('error', "Enseignat non ajouté");
        res.redirect('/enseignant/list.php');
    }
   
});

router.post('/edit', function(req, res){
    const {nom,prenom,age,diplome,id}=req.body;

    
    var enseignant=enseignantService.mapEnseignant(nom,prenom,age,diplome,id);

   
    enseignant.who_done="test"//req.session.user.login;
    enseignant.when_done=new Date();

    const rs=enseignantService.edit(enseignant);
    if(!rs.err){
        req.flash('success', rs.result);
        res.redirect('/enseignant/list.php');
    }else{
        req.flash('error', "Enseignant non modifier");
        res.redirect('/enseignant/list.php');
    }
   
});


router.get('/form-edit.php/:id', (req, res)=>{
    return res.render('enseignants/form-edit',{
        enseignant: enseignantService.getById(req.params.id).shift()
    })
});






module.exports=router;