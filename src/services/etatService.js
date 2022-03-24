const pool=require('./provider');
const deasync=require('deasync');




module.exports={
    listCycle: function(){
        ret=null;
        pool.query(
            'select * from cycle order by id',
            [],
            (err, result)=>{
                ret={result: result}
            }
        );
        while(ret==null)
            deasync.runLoopOnce();
        return ret.result;
    },
    listCycleModule: function(){
        ret=null;
        pool.query(
            'select * from v_cycle_module order by libelle_cycle, libelle_semestre, libelle_ue',
            [],
            (err, result)=>{
                ret={result: result}
            }
        );
        while(ret==null)
            deasync.runLoopOnce();
        return ret.result;
    }
    
};