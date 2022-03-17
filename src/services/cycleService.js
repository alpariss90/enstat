const pool=require('./provider');
const deasync=require('deasync');




module.exports={
    list: function(){
        ret=null;
        pool.query(
            'select * from cycle',
            [],
            (err, result)=>{
                ret={result: result}
            }
        );
        while(ret==null)
            deasync.runLoopOnce();
        return ret.result;
    },
    listSemestre: function(){
        ret=null;
        pool.query(
            'select * from semestre',
            [],
            (err, result)=>{
                ret={result: result}
            }
        );
        while(ret==null)
            deasync.runLoopOnce();
        return ret.result;
    },
    listModule: function(){
        ret=null;
        pool.query(
            'select * from module',
            [],
            (err, result)=>{
                ret={result: result}
            }
        );
        while(ret==null)
            deasync.runLoopOnce();
        return ret.result;
    },
    listDetailCycle: function(){
        ret=null;
        pool.query(
            'select * from detail_cycle',
            [],
            (err, result)=>{
                ret={result: result}
            }
        );
        while(ret==null)
            deasync.runLoopOnce();
        return ret.result;
    },
    getCycleById: function(id){
        var cycle =this.list().rows.filter(e=>e.id==id);
        return cycle;
    },
    getCycleDetailById: function(id){
        var cycleDetail =this.list().rows.filter(e=>e.id==id);
        return cycleDetail;
    },
    getListDetailCycleByCycle: function(id){
        var detailCycle=this.listDetailCycle().rows.filter(d=>d.cycle==id);
        return detailCycle;
    },
    getDetailCycleById: function(id){
        var detailCycle=this.listDetailCycle().rows.filter(d=>d.id==id);
        return detailCycle;
    },
    listUE: function(){
        ret=null;
        pool.query(
            'select * from unite_enseignement',
            [],
            (err, result)=>{
                ret={result: result}
            }
        );
        while(ret==null)
            deasync.runLoopOnce();
        return ret.result;
    },
    getYearActive: function(){
        ret=null;
        pool.query(
            'select * from params where libelle=$1 and etat=true',
            ['ANNEE'],
            (err, res)=>{
                ret={result: res}
            }
        );
        while(ret==null)
            deasync.runLoopOnce();
        
        return ret.result;
    },
    mapCycleModule: function(annee, semestre, ue, modules, whoDone){
       var cycleModules=[];
        
       for(var i=0; i< modules.length; i++){
        var cycleModule={
            annee: annee,
            semestre: semestre,
            unite_enseignement: ue,
            module: modules[i],
            who_done: whoDone,
            when_done: new Date()
        };

        cycleModules.push(cycleModule);
       }
       /*modules.forEach((element, index) => {
           var cycleModule={
            annee: annee,
            semestre: semestre,
            unite_enseignement: ue,
            module: modules[index],
            who_done: whoDone,
            when_done: new Date()
        };

        cycleModules.push(cycleModule);
       });*/
        
        return cycleModules;
    },
    addCycleModules: function(cycleModules){
        let ret=null;
        /*cycleModules.forEach((element, index)=>{
            console.log(element.semestre);
        })*/
        cycleModules.forEach((e, index)=>{
                pool.query(
                            'insert into cycle_module (annee,semestre,unite_enseignement,module,who_done,when_done) values ($1,$2,$3,$4,$5,$6)',
                            [e.annee, e.semestre, e.unite_enseignement, e.module, e.who_done, e.when_done],
                            (err, result)=>{
                               ret={err: err, result: "Insertion Faite avec suceess"};     
                            });
        });

        while(ret==null)
            deasync.runLoopOnce();
    console.log(ret.err);
        return ret;
        
    }
    
};