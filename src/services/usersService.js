const pool=require('./provider');
const deasync=require('deasync');




module.exports={
    list: function(){
        ret=null;
        pool.query(
            'select * from users where deleted=false',
            [],
            (err, result)=>{
                ret={result: result}
            }
        );
        while(ret==null)
            deasync.runLoopOnce();
        return ret.result;
    },
    add: function(user){
        ret=null;
            pool.query(
            "insert into users (login, nom, prenom, division, profil, who_done, when_done, deleted,active) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)",
            [user.login, user.nom, user.prenom, user.division, user.profil, user.who_done, user.when_done, false, true],
            function(err, rs){
                ret={err: err, result: 'Ajout utilisateur '+user.login+' faite avec success'};         
            });
            while(ret==null)
             deasync.runLoopOnce()
    return ret;
    },
    edit:   function(user){
        ret=null;
            pool.query(
            "update users set nom=$1, prenom=$2, division=$3, profil=$4, who_done=$5, when_done=$6 where login=$7",
            [ user.nom, user.prenom, user.division, user.profil, user.who_done, user.when_done, user.login],
            function(err, rs){
                ret={err: err, result: 'Modification utilisateur '+user.login+' faite avec success'};         
            });
            while(ret==null)
             deasync.runLoopOnce()
    return ret;
    },
    init: function(login){
        pool.query('update users set mot_de_passe=$1 where login=$2', ["1234", login], (err, result)=>{
            console.log(err+" // "+result);
        }) 
    },
    setEtat: function(login){    
        pool.query('update users set active=not active where login=$1', [login], (err, result)=>{
            console.log(err+" // "+result);
        }) 
    },
    mapUser : function(nom, prenom, login, division, profil){
        var user={
            nom: nom,
            prenom: prenom,
            login: login,
            profil: profil,
            division: division
        }
        return user;
    },
    isUserExist: function(login){
        var users =this.list().rows.filter(u=>u.login==login);
        return users.length;
    },
    getByLogin: function(login){
        var user =this.list().rows.filter(u=>u.login==login);
        return user;
    },
    isUserCanLogin: function(login, password){
        var user=this.list().rows.filter(u=>(u.login==login && u.mot_de_passe==password)).shift();
        return user;
    }
};