

var app = angular.module('TweetSearch', []);
        app.controller('Controller', ['$scope', '$http', '$sce', function($scope, $http, $sce) {

            $scope.Search = function() {

                var QueryCommand = 'http://loklak.org/api/search.json?q=' + $scope.query;

                $http.get(String(QueryCommand)).then(function(response) {
                    console.log(response.data.statuses[0].text);
                    $scope.myData = response.data.statuses;
                    for (var i = 0; i < $scope.myData.length; ++i) {
                        $scope.myData[i].text = $sce.trustAsHtml($scope.myData[i].text);
                    }
                    //$scope.firstResult = response.data.statuses[0];
                });
            }

        }]);


        app.directive('modalDialog', function() {
            return {
            restrict: 'E',

                scope: {
                show: '='
                },
            replace: true, // Replace with the template below
            transclude: true, // we want to insert custom content inside the directive
            link: function(scope, element, attrs) {
            scope.dialogStyle = {};
            
            if (attrs.width)
                scope.dialogStyle.width = attrs.width;
            if (attrs.height)
                scope.dialogStyle.height = attrs.height;
      
            scope.hideModal = function() {
                scope.show = false;
                };
            },
            template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
            };
        });

        app.controller('MyCtrl', ['$scope', function($scope) {
            $scope.modalShown = false;
            $scope.toggleModal = function() {
            $scope.modalShown = !$scope.modalShown;
            };
        }]);