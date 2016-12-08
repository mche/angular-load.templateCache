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
    mojo: /^@@@\s*(.+)/gm //([^\n]+)
    
  };
  
  this.split = function(arr, done) {// массив урлов done - строка помещается в массив после выработки всех урлов
    done = done || 'complete';
    //~ return console.log(arr);
    arr.map(function(url, index) {
      //~ console.log(url, $http);
      $http.get(url, {"cache": true}).then(function (resp) {
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
        
        if (arr.join('') == "") arr[0] = done;
        //~ console.log("Массив ", arr);
      });
    });
  };
  
})
;

}());