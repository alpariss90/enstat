var express=require('express');
var router=express.Router();
var etatService=require('../services/etatService');
var pdf=require('html-pdf');


router.get('/list.php', function(req, res){

return res.render('etats/list',{
    
});

});


module.exports=router;