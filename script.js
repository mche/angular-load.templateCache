(function () {
'use strict';

angular.module('load.templateCache', [])

.service('loadTemplateCache', function ($http, $templateCache, $q) {
  
  this.put = function (conf, flag_all) {// flag - returns $q.all(...)
    var promise = [];
    
    angular.forEach(conf, function(url, key) {
      var get = $http.get(url, {"cache": true}).then(
        function (resp) {
          //~ $timeout(function() {
            $templateCache.put(key, resp.data);
          //~ });
        }
      );
      promise.push(get);
    });
    
    if (flag_all) return $q.all(promise);
    
    return promise;
    
    //~ return $q.all(promise);//.then(function(values){
      //~ if (done) done();
    //~ });
    
  };
  
  var re = {
    mojo: /^@@@\s*(.+)/gm //([^\n]+)
    
  };
  
  this.split = function(arr, flag_all) {// массив урлов (flag_all - returns $q.all(...)
    var promise = arr.map(function(url, index) {
      //~ console.log(url, $http);
      return $http.get(url, {"cache": true}).then(function (resp) {
        var splt = resp.data.split(re.mojo);
        //~ console.log(splt);
        //~ var result;
        //~ while (result = re.mojo.exec(resp.data)) {
          //~ console.log(result);
        //~ }
        while (splt.length > 0) {
          var id = splt.shift();
          if (id == "") continue;
          var tpl = splt.shift();
          //~ console.log("Template: ", id);
          $templateCache.put(id, tpl);
        }
        var idx = arr.indexOf(url);
        //~ arr.slice(idx, 1);
        delete arr[idx];
        
        if (arr.join('') == "") arr.unshift(done);//arr[0] = done;
        //~ console.log("Массив ", arr);
      });
    });
    
    if (flag_all) return $q.all(promise);
    
    return promise;
    
  };
  
})
;

}());