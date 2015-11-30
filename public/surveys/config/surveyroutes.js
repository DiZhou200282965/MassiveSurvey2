(function () {
    var moduleName = "surveyRoutes";
    var app = angular.module(moduleName, ['ngRoute', 'ngResource']);
    // Routes ++++++++++++++++++++++++++++++++++++++++++++++++++++++
    app.config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/', {
                templateUrl: '/surveys.html',
                controller: 'SurveyController'
            })
                .when('/:id', {
                templateUrl: '/surveyDetails.html',
                controller: 'SurveyDetailCtrl'
            });
        }]);
})(); // end of closure
