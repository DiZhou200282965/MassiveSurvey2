(function () {
	var mainApplicationModuleName = "app";
	var app = angular.module(mainApplicationModuleName, ['ngRoute', 'ngResource', 'surveyRoutes', 'surveyServices', 'surveyControllers']);
    // wait for web page to load then manually bootstrap angular
    angular.element(document).ready(function () {
    	angular.bootstrap(document, [mainApplicationModuleName]);
    });
})(); 

