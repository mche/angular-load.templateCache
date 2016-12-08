angular.module('myApp', ['load.templateCache'])
.controller('MyCtrl', function($scope, loadTemplateCache) {
    loadTemplateCache.split(["http://dsfgfg.com/templates.html"]);
})
;
