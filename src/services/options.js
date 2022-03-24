module.exports={
    options_portrait : function(){
        return {
            format: 'A4',
             orientation:'portrait',
             "border": {
                 "top": "5px",            // default is 0, units: mm, cm, in, px
                 "right": "5px",
                 "bottom": "10px",
                 "left": "5px"
               },
             
               paginationOffset: 1,       // Override the initial pagination number
               "header": {
                 "height": "10px"
                 //"contents": '<div style="text-align: center;">ENSTAT</div>'
               },
               "footer": {
                 "height": "15px",
                 "contents": {
                   first: 'Page 1',
                   2: 'Page 2', // Any page number is working. 1-based index
                   default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                   last: 'Derniere page'
                 }
               }
            };
    },
    options_landscape: function(){
        return {
            format: 'A4', 
            orientation:'landscape',
            "border": {
                "top": "5px",            // default is 0, units: mm, cm, in, px
                "right": "5px",
                "bottom": "5px",
                "left": "5px"
              },
            
              paginationOffset: 1,       // Override the initial pagination number
              "header": {
                "height": "2mm",
                "contents": '<div style="text-align: center;">ENSTAT</div>'
              },
              "footer": {
                "height": "2mm",
                "contents": {
                  first: 'Cover page',
                  2: 'Second page', // Any page number is working. 1-based index
                  default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                  last: 'Last Page'
                }
              }
        }
    }
}
