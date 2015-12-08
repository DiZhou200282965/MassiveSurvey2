(function () {
    var moduleName = "surveyControllers";
    var app = angular.module(moduleName, ['ngRoute', 'ngResource', 'surveyServices', 'surveyRoutes']);



    // Controllers 
    app.controller('SurveyController', ['$scope', 'Surveys', function ($scope, Surveys) {
        
        $scope.twOptArry = [];
        //$scope.mulQueArry = [];
        //$scope.mulOptArry = ["option1","optasdfn2"];
        $scope.shortAnswerArry = [];
        $scope.editing = [];
        $scope.username = '';
        $scope.userSurveys = [];

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

        /*
         *    ###########  two-option   ##############
         */
        $scope.addTwoOptionQuestion = function () {
            // add object to array
            $scope.twOptArry.push({
                twOptionQuestion: $scope.twOptionQuestion,
                option1: $scope.option1,
                option2: $scope.option2
            });
            // clear text
            $scope.twOptionQuestion = "";
            $scope.option1 = "";
            $scope.option2 = "";
        };// end of two-option section 

         /*          
        //* ##########   Multiple Choice Section  ########         
        //*/
        //$scope.addMulOption = function () {
        //    $scope.mulOptArry.push(" ");
        //}
        
        //$scope.addMultipleOptionQuestion = function () {

        //    $scope.mulQueArry.push({
        //        mulQue: $scope.mulQue,
        //        mulOpt: $scope.mulOptArry
        //    });
        //    $scope.mulQue = "";
        //    $scope.mulOptArry = [];
        //}//  end of multiple choice section 
     /*
      *  ###########  Short Answer   ##############
      */
        $scope.addShortAnswer = function () {
            $scope.shortAnswerArry.push($scope.shortAnswer);
        }//  end of Short Answer section 

        $scope.save = function () {
            if (!$scope.surveyName || $scope.surveyName.length < 1) {
               
            }
            //new survey object
            var survey = new Surveys({
                name: $scope.surveyName,
                category: $scope.category,
                completed: false,
                username: $scope.username,
                twoOption: $scope.twOptArry,
                //multipleQuestion: $scope.mulQueArry
                shortAnswer:$scope.shortAnswerArry
            });

            //save into db
            survey.$save(function () {
                $scope.surveys.push(survey);
                // clear inputs
                $scope.surveyName = '';
                $scope.shortAnswer = '';
                $scope.twOptArry = [];
                $scope.shortAnswerArry = [];
            });
        };




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


    app.controller('createSurveyCtrl', ['$scope', '$routeParams', 'Surveys', '$location',
    function ($scope, $routeParams, Surveys, $location) {

    }]);


})(); //end of closure
