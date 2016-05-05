

var app = angular.module('TweetSearch', []);

        app.controller('Controller', ['$scope', '$http', '$sce', function($scope, $http, $sce) {

            $scope.loading = 0; //hide loader
            $scope.profile_loading = 0; //hide profile_loader

            $scope.Search = function() {               

                var QueryCommand = 'http://loklak.org/api/search.json?q=' + $scope.query;

                $scope.loading = 1; //show loader
                $scope.profile_loading = 0; //hide profile_loader

                $http.get(String(QueryCommand)).then(function(response) {
                    console.log(response.data.statuses[0].text);
                    $scope.myData = response.data.statuses;

                    $scope.loading = 0; //hide loader
                    $scope.profile_loading = 1; //show profile_loader

                    for (var i = 0; i < $scope.myData.length; ++i) {
                        $scope.myData[i].text = $sce.trustAsHtml($scope.myData[i].text);
                    }
                    //$scope.firstResult = response.data.statuses[0];
                });
            }

        }]);

        app.controller('LoklakPeersController', ['$scope', '$http', '$sce', function($scope, $http, $sce){
            $scope.showPeers = function() {

                var peers_QueryCommand = 'http://loklak.org/api/peers.json';

                $http.get(String(peers_QueryCommand)).then(function(peers_response) {
                    console.log(peers_response.data.peers[0].host);
                    $scope.peers_myData = peers_response.data.peers;
                    for (var i = 0; i < $scope.peers_myData.length; ++i) {
                        $scope.peers_myData[i].host = $sce.trustAsHtml($scope.peers_myData[i].host);
                    }
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