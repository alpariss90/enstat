var express=require('express');
const cycleService = require('../services/cycleService');
var router=express.Router();



router.get('/list.php/:id?', (req, res)=>{
    var cycles=cycleService.list().rows;
    var cycleDetail=cycleService.getListDetailCycleByCycle(req.params.id);
    //console.log(cycles.filter(c=> c.id==req.params.id));
    res.render('cycles/list',{
        cycles: cycles,
        cycleDetails: cycleDetail,
        cycle: cycles.filter(c=> c.id==req.params.id).shift(),
        result: {error: req.flash('error'), success: req.flash('success')}
    });
});

router.get('/gerer.php/:id?', (req, res)=>{
    var ues=cycleService.listUE().rows;
    var semestres=cycleService.listSemestre().rows;
    var modules=cycleService.listModule().rows;
    var anneeActive=cycleService.getYearActive().rows.shift().valeur;
    var cycleDetail=cycleService.getDetailCycleById(req.params.id).shift();
    console.log(cycleDetail);
    res.render('cycles/gerer',{
        ues: ues, annee:anneeActive, semestres: semestres, modules: modules,
        cycleDetail: cycleDetail,
        result: {error: req.flash('error'), success: req.flash('success')}
    });
});



router.post('/gerer.php', function(req, res){
   const {semestre, ue, module, idDetailCycle} = req.body;

   if(module == null){
    req.flash('error', "Veuillez selectionner au moins un module!!!");
       return res.redirect('/cycle/gerer.php/'+idDetailCycle);
   }
   if(semestre==null || ue==null){
    req.flash('error', "Veuillez choisir un semestre et une UE!!!");
       return res.redirect('/cycle/gerer.php/'+idDetailCycle);
   }

   var anneeActive=cycleService.getYearActive().rows.shift().id;//anneeActiveInSession(ToImplementAfterAuth)
   var whoDone="test"//ToGetFromSessionAfterAuthImpl
   var cycleModules=cycleService.mapCycleModule(anneeActive, semestre, ue, module, whoDone);


   var result=cycleService.addCycleModules(cycleModules);

   if(!result.err)
        req.flash('success', result.result);
    else
        req.flash('error', result.err);

    return res.redirect('/cycle/gerer.php/'+idDetailCycle);

});



module.exports=router;