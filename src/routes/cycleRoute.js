var express=require('express');
const cycleService = require('../services/cycleService');
var router=express.Router();



router.get('/list.php/:id?', (req, res)=>{
    var cycles=cycleService.list().rows;
    var cycleDetail=cycleService.listDetail(req.params.id).rows;
    //console.log(cycles.filter(c=> c.id==req.params.id));
    res.render('cycles/list',{
        cycles: cycles,
        cycleDetails: cycleDetail,
        cycle: cycles.filter(c=> c.id==req.params.id).shift(),
        result: {error: req.flash('error'), success: req.flash('success')}
    });
});

router.get('/list-UE.php/:id?', (req, res)=>{
    var ues=cycleService.listUE().rows;
    res.render('cycles/list_ue',{
        ues: ues,
        result: {error: req.flash('error'), success: req.flash('success')}
    });
});




module.exports=router;