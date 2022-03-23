const pool=require('./provider');
const deasync=require('deasync');




module.exports={
    list: function(){
        ret=null;
        pool.query(
            'select * from v_etudiant',
            [],
            (err, result)=>{
                ret={result: result}
            }
        );
        while(ret==null)
            deasync.runLoopOnce();
        return ret.result;
    },
    add: function(etudiant){
        ret=null;
            pool.query(
            "insert into etudiant ( nom, prenom, age, cycle, who_done, when_done, telephone) values ($1,$2,$3,$4,$5,$6, $7)",
            [etudiant.nom, etudiant.prenom, etudiant.age, etudiant.cycle, etudiant.who_done, etudiant.when_done, etudiant.telephone],
            function(err, rs){
                ret={err: err, result: 'Ajout etudiant '+etudiant.nom+' faite avec success'};         
            });
            while(ret==null)
             deasync.runLoopOnce()
    return ret;
    },
    edit:   function(etudiant){
        ret=null;
       
            pool.query(
            "update etudiant set nom=$1, prenom=$2, age=$3, cycle=$4, who_done=$5, when_done=$6, telephone=$8 where id=$7",
            [ etudiant.nom, etudiant.prenom, etudiant.age, etudiant.cycle, etudiant.who_done, etudiant.when_done, etudiant.id, etudiant.telephone],
            function(err, rs){
                ret={err: err, result: 'Modification etudiant '+etudiant.nom+' faite avec success'};         
            });
            while(ret==null)
             deasync.runLoopOnce()
    return ret;
    },
    mapEtudiant : function(nom, prenom, age, cycle, id, telephone){
        var enseignant={
            nom: nom,
            prenom: prenom,
            age: age,
            cycle: cycle,
            id: id,
            telephone: telephone
        }
        return enseignant;
    },
    isEtudiantExist: function(telephone){
        var etudiant =this.list().rows.filter(e=>(e.telephone==telephone));
        return etudiant.length;
    },
    getById: function(id){
        var etudiant =this.list().rows.filter(e=>e.id==id);
        return etudiant;
    }
};