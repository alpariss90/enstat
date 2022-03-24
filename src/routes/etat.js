var express=require('express');
var router=express.Router();
var etatService=require('../services/etatService');
var enseignantService=require('../services/enseignantService');
var pdf=require('html-pdf');
var fs=require('fs');
var options=require('../services/options');

router.get('/list.php', function(req, res){

return res.render('etats/list',{
    
});

});


router.get('/liste-enseignant', function(req, res){
    ens=enseignantService.list().rows;
return res.render('etats/liste_enseignant', {
    ens:ens
})
});


router.get('/imprime/list-enseignant', function(req, res){
    
    return res.render('etats/liste_enseignant',{ens: enseignantService.list().rows }, function(err, html){
        pdf.create(html, options.options_portrait()).toFile('./public/reports/liste-enseignant.pdf', function(err, result) {
            if (err){
               // return console.log(err);
            }else{
                //console.log(res); 
                var dataFile=fs.readFileSync('./public/reports/liste-enseignant.pdf');
                res.header('content-type', 'application/pdf');
                res.send(dataFile);
            } 
            
        });
    });
});

router.get('/liste-cycle-module', function(req, res){
    cs=etatService.listCycle().rows;
    cms=etatService.listCycleModule().rows;
return res.render('etats/liste_cycle_module', {
    cs:cs, cms: cms
})
});

router.get('/imprime/liste-cycle-module', function(req, res){

    cs=etatService.listCycle().rows;
    cms=etatService.listCycleModule().rows;
    
    return res.render('etats/liste_cycle_module',{cs: cs, cms:cms }, function(err, html){
        pdf.create(html, options.options_portrait()).toFile('./public/reports/liste-cycle-module.pdf', function(err, result) {
            if (err){
               // return console.log(err);
            }else{
                //console.log(res); 
                var dataFile=fs.readFileSync('./public/reports/liste-cycle-module.pdf');
                res.header('content-type', 'application/pdf');
                res.send(dataFile);
            } 
            
        });
    });
});

module.exports=router;