const pool=require('./provider');
const deasync=require('deasync');




module.exports={
    listAnnee: function(){
        ret=null;
        pool.query(
            'select * from params where libelle=$1',
            ['ANNEE'],
            (err, result)=>{
                ret={result: result}
            }
        );
        while(ret==null)
            deasync.runLoopOnce();
        return ret.result;
    },
    updateAnneActive:   function(valeur){

        this.desactiveAllAnnee();
        ret=null;
            pool.query(
            "update params set etat=true where libelle=$1 and valeur=$2",
            ['ANNEE', valeur],
            function(err, rs){
               
                ret='ok';
                console.log(ret);         
            });
            while(ret==null)
             deasync.runLoopOnce()
    return ret;
    },
    desactiveAllAnnee:   function(){
        ret=null;
            pool.query(
            "update params set etat=false where libelle=$1",
            ['ANNEE'],
            function(err, rs){ 
                ret='ok';         
            });
            while(ret==null)
             deasync.runLoopOnce()
    return ret;
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
    }
    
    
};