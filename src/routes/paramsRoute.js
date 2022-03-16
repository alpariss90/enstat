var express=require('express');
const paramsService = require('../services/paramsService');
var router=express.Router();



router.get('/annee.php', (req, res)=>{
    var annees=paramsService.listAnnee().rows;
    res.render('params/annee',{
        annees: annees,
        result: {error: req.flash('error'), success: req.flash('success')}
    });
});


router.post('/annee.php', (req, res)=>{
    const {annee}=req.body;
    ret=paramsService.updateAnneActive(annee);
    req.flash('success', 'ANNEE active changé avec success')
    return res.redirect('/params/annee.php');
    
});




module.exports=router;