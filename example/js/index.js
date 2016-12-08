angular.module('myApp', ['load.templateCache'])
.controller('MyCtrl', function($scope, loadTemplateCache) {
    loadTemplateCache.split(["https://raw.githubusercontent.com/mche/angular-load.templateCache/master/example/templates.html"]);
})
;
