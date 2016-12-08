(function () {
'use strict';

angular.module('load.templateCache', [])

.service('loadTemplateCache', function ($http, $templateCache) {
  
  this.put = function (conf) {
    Object.keys(conf).map(function(key, index) {
      var url = conf[key];
      $http.get(url, {"cache": true}).then(function (resp) {
        $templateCache.put(key, resp.data);
        delete conf[key];
        if (Object.keys(conf).length == 0) conf.ready = true;
      });
    });
    
  };
  
  var re = {
    mojo: /^@@@\s*([^\n]+)([^@]+)/gm
    
  };
  
  this.split = function(arr, done) {// массив урлов done - строка помещается в массив после выработки всех урлов
    done = done || 'complete';
    //~ return console.log(arr);
    arr.map(function(url, index) {
      console.log(url, $http);
      $http.get(url, {"cache": true}).then(function (resp) {
        //~ $templateCache.put(key, resp.data);
        while (result = re.mojo.exec(resp.data)) {
          console.log(result);
        }
        var idx = arr.indexOf(url);
        arr.slice(idx, 1);
        if (arr.length == 0) arr[0] = done;
      });
    });
  };
  
})
;

}());