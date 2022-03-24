const pool=require('./provider');
const deasync=require('deasync');




module.exports={
    list: function(){
        ret=null;
        pool.query(
            'select * from enseignant',
            [],
            (err, result)=>{
                ret={result: result}
            }
        );
        while(ret==null)
            deasync.runLoopOnce();
        return ret.result;
    },
    listModuleEnseignerByEnseignant: function(idEnseignant, annee){
        ret=null;
        pool.query(
            'select * from v_cycle_module where module  in (select module from enseignant_module where enseignant=$1 and annee=$2)',
            [idEnseignant, annee],
            (err, result)=>{
                ret={result: result}
            }
        );
        while(ret==null)
            deasync.runLoopOnce();
        return ret.result;
    },
    getModuleDispoForEnseignant: function( annee){
        ret=null;
        pool.query(
            'select * from v_cycle_module where module not in (select module from enseignant_module where annee=$1)',
            [ annee],
            (err, result)=>{
                ret={result: result}
            }
        );
        while(ret==null)
            deasync.runLoopOnce();
        return ret.result;
    },
    getNbreModuleByCycle: function(){
        ret=null;
        pool.query(
            'select libelle_cycle as cycle, count(libelle_module) as nbre from v_cycle_module group by libelle_cycle order by libelle_cycle',
            [],
            (err, result)=>{
                ret={result: result}
            }
        );
        while(ret==null)
            deasync.runLoopOnce();
        return ret.result;
    },
    add: function(enseignant){
        ret=null;
            pool.query(
            "insert into enseignant (telephone, nom, prenom, age, diplome, who_done, when_done) values ($1,$2,$3,$4,$5,$6)",
            [enseignant.telephone, enseignant.nom, enseignant.prenom, enseignant.age, enseignant.diplome, enseignant.who_done, enseignant.when_done],
            function(err, rs){
                ret={err: err, result: 'Ajout enseignant '+enseignant.nom+' faite avec success'};         
            });
            while(ret==null)
             deasync.runLoopOnce()
    return ret;
    },
    edit:   function(enseignant){
        ret=null;
       
            pool.query(
            "update enseignant set nom=$1, prenom=$2, age=$3, diplome=$4, who_done=$5, when_done=$6, telephone=$8 where id=$7",
            [ enseignant.nom, enseignant.prenom, enseignant.age, enseignant.diplome, enseignant.who_done, enseignant.when_done, enseignant.id, enseignant.telephone],
            function(err, rs){
                ret={err: err, result: 'Modification enseignant '+enseignant.nom+' faite avec success'};         
            });
            while(ret==null)
             deasync.runLoopOnce()
    return ret;
    },
    deleteModuleEnseignant: function(module, enseignant, annee){
        ret=null;
            pool.query(
            "delete from enseignant_module where enseignant=$1 and module=$2 and annee=$3",
            [enseignant, module, annee],
            function(err, rs){
                ret={err: err, result: 'Suppression faite avec success'};         
            });
            while(ret==null)
             deasync.runLoopOnce()
    return ret;
    },
    mapEnseignant : function(nom, prenom, age, diplome, id, telephone){
        var enseignant={
            nom: nom,
            prenom: prenom,
            age: age,
            diplome: diplome,
            id: id,
            telephone: telephone
        }
        return enseignant;
    },
    isEnseignantExist: function(nom, prenom, age){
        var enseignant =this.list().rows.filter(e=>(e.nom==nom && e.prenom==prenom && e.age==age));
        return enseignant.length;
    },
    getById: function(id){
        var enseignant =this.list().rows.filter(e=>e.id==id);
        return enseignant;
    },
    mapEnseignantModule: function(annee, enseignant, modules, whoDone){
       var enseignantModules=[];
        
       for(var i=0; i< modules.length; i++){
        var enseignantModule={
            annee: annee,
            enseignant: enseignant,
            module: modules[i],
            who_done: whoDone,
            when_done: new Date()
        };

        enseignantModules.push(enseignantModule);
       }
        
        return enseignantModules;
    },
    addEnseignantModules: function(enseignantModules){
        let ret=null;

        enseignantModules.forEach((e, index)=>{
                pool.query(
                            'insert into enseignant_module (enseignant,annee,module,who_done,when_done) values ($1,$2,$3,$4,$5)',
                            [e.enseignant, e.annee, e.module, e.who_done, e.when_done],
                            (err, result)=>{
                               ret={err: err, result: "Insertion Faite avec suceess"};     
                            });
        });

        while(ret==null)
            deasync.runLoopOnce();
        return ret;
        
    }
};