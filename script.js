(function () {
'use strict';

angular.module('load.templateCache', [])

.service('loadTemplateCache', function ($http, $templateCache, $q) {
  
  this.put = function (conf, flag_all) {// flag - returns $q.all(...)
    var promise = [];
    
    angular.forEach(conf, function(url, key) {
      var get = $http.get(url, {"cache": true}).then(
        function (resp) {
            $templateCache.put(key, resp.data);
        }
      );
      promise.push(get);
    });
    
    if (flag_all) return $q.all(promise);
    
    return promise;
    
  };
  
  var re = {
    mojo: /^@@@\s*(.+)/gm //([^\n]+)
    
  };
  
  this.split = function(arr, flag_all) {// массив урлов (flag_all - returns $q.all(...)
    var promise = [];
    
    angular.forEach(arr, function(url, idx) {
      var get = $http.get(url, {"cache": true}).then(function (resp) {
        var splt = resp.data.split(re.mojo);
        while (splt.length > 0) {
          var id = splt.shift();
          if (id == "") continue;
          var tpl = splt.shift();
          //~ console.log("Template: ", id);
          $templateCache.put(id, tpl);
        }
      });
      
      promise.push(get);
      
    });
    
    if (flag_all) return $q.all(promise);
    
    return promise;
    
  };
  
})
;

}());