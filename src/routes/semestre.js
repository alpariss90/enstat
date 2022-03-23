var express=require('express');
var router=express.Router();
var cycleService=require('../services/cycleService');


router.get('/ue.php', function(req, res){
var cycleDetail=cycleService.listDetailCycle().rows;
var annee=cycleService.getYearActive().rows.shift().valeur;
console.log(annee)
return res.render('cycles/list_ue',{
    cycles: cycleDetail, annee:annee
});

});


module.exports=router;