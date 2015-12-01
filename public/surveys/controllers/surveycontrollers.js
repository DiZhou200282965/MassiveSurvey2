(function () {
    var moduleName = "surveyControllers";
    var app = angular.module(moduleName, ['ngRoute', 'ngResource', 'surveyServices', 'surveyRoutes']);

    // app.directive('surveyDetails', function() {
    //   return {
    //     restrict:'E',
    //     templateUrl: "/survey-details.html"
    //   };
    // });

    // Controllers ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    app.controller('SurveyController', ['$scope', 'Surveys', function ($scope, Surveys) {
        $scope.editing = [];
        $scope.username = '';
        $scope.userSurveys = [];
        $scope.answers = [];
        $scope.setUserName = function (userName) {
                $scope.username = userName; //get the username
                $scope.surveys = Surveys.query(function () {
                    $scope.userSurveys = []; // reset the userSurveys array
                    $scope.surveys.forEach(function (survey) {
                        if (survey.username == $scope.username) {
                            $scope.userSurveys.push(survey);
                        }
                    });
                    $scope.surveys = $scope.userSurveys;
                });
            };


            
            //adding short answer question
            var counter = 0;
              $scope.questionelemnt = [{
                id: counter,
                saQuestion: 'Question-Click on me to edit!',
                saAnswer: '',
              }];

              $scope.newItem = function ($event) {
                counter++;
                $scope.questionelemnt.push({
                  id: counter,
                  saQuestion: 'Question-Click on me to edit!',
                  saAnswer: '',
                });
                $event.preventDefault();
              };
              $scope.addAnswer = function() {
                var newAnswer = $scope.newAnswer;
                $scope.answers.push(newAnswer);
                $scope.newAnswer='';
            };
            $scope.save = function () {
                if (!$scope.newSurvey || $scope.newSurvey.length < 1) {
                    return;
                }
                
                var survey = new Surveys({ name: $scope.newSurvey, username: $scope.username, 
                    multipleChoice:
                    {
                       question: $scope.newQuestion,
                       answers: $scope.answers
                    },
                    shortAnswer: $scope.questionelemnt,
                    completed: false });

                //save into db
                survey.$save(function () {
                    $scope.surveys.push(survey);
                    // clear inputs
                    $scope.newSurvey = '';
                    $scope.newQuestion = ''; 
                    $scope.answers = [];
                    $scope.questionelemnt = [];
                });
            };


            // $scope.answers = [];
            // $scope.addAnswer = function(){
                
            //     $scope.answers.push();

            // };

            $scope.update = function (index) {
                var survey = $scope.surveys[index];
                Surveys.update({ id: survey._id }, survey);
                $scope.editing[index] = false;
            };
            $scope.edit = function (index) {
                $scope.editing[index] = angular.copy($scope.surveys[index]);
            };
            $scope.cancel = function (index) {
                $scope.surveys[index] = angular.copy($scope.editing[index]);
                $scope.editing[index] = false;
            };
            $scope.remove = function (index) {
                var survey = $scope.surveys[index];
                Surveys.remove({ id: survey._id }, function () {
                    $scope.surveys.splice(index, 1);
                });
                $scope.editing[index] = false;
            };
            $scope.remainingSurveys = function () {
                var count = 0;
                angular.forEach($scope.surveys, function (survey) {
                    if ($scope.username == survey.username) {
                        count += survey.completed ? 0 : 1;
                    }
                });
                return count;
            };
            $scope.totalSurveys = function () {
                var count = 0;
                angular.forEach($scope.surveys, function (survey) {
                    if ($scope.username == survey.username) {
                        count++;
                    }
                });
                return count;
            };
        }]);

app.controller('SurveyDetailCtrl', ['$scope', '$routeParams', 'Surveys', '$location',
    function ($scope, $routeParams, Surveys, $location) {
        $scope.survey = Surveys.get({ id: $routeParams.id });
        $scope.update = function () {
            Surveys.update({ id: $scope.survey._id }, $scope.survey, function () {
                $location.url('/');
            });
        };
        $scope.remove = function () {
            Surveys.remove({ id: $scope.survey._id }, function () {
                $location.url('/');
            });
        };
        $scope.cancel = function () {
            $location.url('/');
        };
    }]);




})(); //end of closure
