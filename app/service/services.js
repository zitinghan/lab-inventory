// Main script & template
'use strict';

angular.module('services', [])

.factory('globalVar', function() {
    return {
        IPAddress: 'http://sgbippc0011:3000/', 
    }
})

.factory('globalFunction', function(){
    var page;
    return{
        removeFilterEmpty: function(val){
            var key = Object.keys(val);
            for(var i in key){
                if(typeof val[key[i]]=="undefined" || val[key[i]]===""){
                    delete val[key[i]];
                }
            }
            return val;
        },
    }
});
