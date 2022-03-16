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
    add: function(enseignant){
        ret=null;
            pool.query(
            "insert into enseignant ( nom, prenom, age, diplome, who_done, when_done) values ($1,$2,$3,$4,$5,$6)",
            [enseignant.nom, enseignant.prenom, enseignant.age, enseignant.diplome, enseignant.who_done, enseignant.when_done],
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
            "update enseignant set nom=$1, prenom=$2, age=$3, diplome=$4, who_done=$5, when_done=$6 where id=$7",
            [ enseignant.nom, enseignant.prenom, enseignant.age, enseignant.diplome, enseignant.who_done, enseignant.when_done, enseignant.id],
            function(err, rs){
                ret={err: err, result: 'Modification enseignant '+enseignant.nom+' faite avec success'};         
            });
            while(ret==null)
             deasync.runLoopOnce()
    return ret;
    },
    mapEnseignant : function(nom, prenom, age, diplome){
        var enseignant={
            nom: nom,
            prenom: prenom,
            age: age,
            diplome: diplome
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
    }
};