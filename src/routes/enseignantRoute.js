var express=require('express');
const enseignantService = require('../services/enseignantService');
const paramsService=require('../services/paramsService');
var router=express.Router();



router.get('/list.php', (req, res)=>{
    var enseignants=enseignantService.list().rows;
    res.render('enseignants/list',{
        enseignants: enseignants,
        result: {error: req.flash('error'), success: req.flash('success')}
    });
});

router.post('/save', function(req, res){
    const {nom,prenom,age,diplome, telephone}=req.body;

    if(enseignantService.isEnseignantExist(nom,prenom,age)> 0){
        req.flash('error', "Enseignatn "+nom+" "+prenom+" "+age+"+ existe déja");
        return res.redirect('/enseignant/list.php')
    }

    var enseignant=enseignantService.mapEnseignant(nom,prenom,age,diplome,0, telephone);

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
    const {nom,prenom,age,diplome,id, telephone}=req.body;

    
    var enseignant=enseignantService.mapEnseignant(nom,prenom,age,diplome,id, telephone);

   
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

router.get('/affectation.php/:idEnseignant', (req,res)=>{
    var enseignant=enseignantService.getById(req.params.idEnseignant).shift();
    var annee=paramsService.getYearActive().rows.shift();
    var idAnnee=annee.id;
    var moduleDispo=enseignantService.getModuleDispoForEnseignant( idAnnee).rows;

    return res.render('enseignants/affectation_module',{
        annee: annee.valeur, enseignant: enseignant, modules: moduleDispo,
        result: {error: req.flash('error'), success: req.flash('success')}
    }) 

});


router.post('/affecter.php', function(req, res){
    const {modules, enseignant}=req.body;
    var annee=paramsService.getYearActive().rows.shift();
    var idAnnee=annee.id;

    if(modules == null){
        req.flash('error', "Veuillez selectionner au moins un module!!!");
           return res.redirect('/enseignant/affectation.php/'+enseignant);
       }
    who_done="test"; //session
       enseignantModules=enseignantService.mapEnseignantModule(idAnnee, enseignant, modules, who_done);
       console.log(enseignantModules);
       var result=enseignantService.addEnseignantModules(enseignantModules);

       if(!result.err)
       req.flash('success', result.result);
   else
       req.flash('error', result.err);


       return res.redirect('/enseignant/affectation.php/'+enseignant);

});


router.get('/list_enseigner.php/:idEnseignant', (req,res)=>{
    var enseignant=enseignantService.getById(req.params.idEnseignant).shift();
    var annee=paramsService.getYearActive().rows.shift();
    var idAnnee=annee.id;
    var moduleDispo=enseignantService.listModuleEnseignerByEnseignant( req.params.idEnseignant, idAnnee).rows;

    return res.render('enseignants/list_enseigner',{
        annee: annee.valeur, enseignant: enseignant, modules: moduleDispo,
        result: {error: req.flash('error'), success: req.flash('success')}
    }) 

});

router.get('/retirer.php/:idModule/:idEnseignant', (req,res)=>{
   
    var annee=paramsService.getYearActive().rows.shift().id;
    var result=enseignantService.deleteModuleEnseignant(req.params.idModule, req.params.idEnseignant, annee);
    if(!result.err)
        req.flash('success', result.result);
    else
        req.flash('error', result.err);
        return res.redirect('/enseignant/list_enseigner.php/'+req.params.idEnseignant);

});





module.exports=router;