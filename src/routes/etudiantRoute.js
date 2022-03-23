var express=require('express');
const etudiantService = require('../services/etudiantService');
const paramsService=require('../services/paramsService');
var router=express.Router();



router.get('/list.php', (req, res)=>{
    var etudiants=etudiantService.list().rows;
    res.render('etudiants/list',{
        etudiants: etudiants,
        result: {error: req.flash('error'), success: req.flash('success')}
    });
});

router.post('/save', function(req, res){
    const {nom,prenom,age,cycle, telephone }=req.body;

    if(etudiantService.isEtudiantExist(telephone)> 0){
        req.flash('error', "Etudiant avec numero "+telephone+"+ existe déja");
        return res.redirect('/etudiant/list.php')
    }

    var etudiant=etudiantService.mapEtudiant(nom,prenom,age,cycle,0,telephone);

    etudiant.who_done="test"//req.session.user.login;
    etudiant.when_done=new Date();

    const rs=etudiantService.add(etudiant);
    if(!rs.err){
        req.flash('success', rs.result);
        res.redirect('/etudiant/list.php');
    }else{
        req.flash('error', "Etudiant non ajouté");
        res.redirect('/etudiant/list.php');
    }
   
});

router.post('/edit', function(req, res){
    const {nom,prenom,age,diplome,id, telephone, cycle}=req.body;

    
    var etudiant=etudiantService.mapEtudiant(nom,prenom,age,cycle,id, telephone);

   
    etudiant.who_done="test"//req.session.user.login;
    etudiant.when_done=new Date();

    const rs=etudiantService.edit(etudiant);
    if(!rs.err){
        req.flash('success', rs.result);
        res.redirect('/etudiant/list.php');
    }else{
        req.flash('error', "etudiant non modifier");
        res.redirect('/etudiant/list.php');
    }
   
});


router.get('/form-edit.php/:id', (req, res)=>{
    return res.render('etudiants/form-edit',{
        etudiant: etudiantService.getById(req.params.id).shift()
    })
});


module.exports=router;