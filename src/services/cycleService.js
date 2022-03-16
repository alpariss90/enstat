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
    listDetail: function(id){
        ret=null;
        pool.query(
            'select * from detail_cycle where cycle=$1',
            [id],
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
    }
};