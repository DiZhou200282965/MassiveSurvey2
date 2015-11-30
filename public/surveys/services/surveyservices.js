(function () {
    var app = angular.module('surveyServices', ['ngRoute', 'ngResource', 'surveyRoutes']);
    // Surveys Service +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    app.factory('Surveys', ['$resource', function ($resource) {
            return $resource('/surveys/:id', null, {
                'update': { method: 'PUT' }
            });
        }]);
})(); // end of closure
