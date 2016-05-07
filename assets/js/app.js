

var app = angular.module('TweetSearch', []);

        app.controller('Controller', ['$scope', '$http', '$sce', function($scope, $http, $sce) {

            $scope.loading = 1; //show loader
            $scope.profile_loading = 0; //hide profile_loader
            $scope.image_loading = 1; //show image_loader
            $scope.image_block_loading = 0; //hide image_block_loader

            $scope.Search = function() {               

                var QueryCommand = 'http://loklak.org/api/search.json?q=' + $scope.query;
                var image_QueryCommand = 'https://pixabay.com/api/?key=2528033-e0c41becdbace0c0e39a0df71&image_type=photo&q=' + $scope.query;

                $scope.loading = 1; //show loader
                $scope.profile_loading = 0; //hide profile_loader
                $scope.image_loading = 1; //show image_loader
                $scope.image_block_loading = 0; //hide image_block_loader

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

                $http.get(String(image_QueryCommand)).then(function(image_response) {
                    console.log(image_response.data.hits[0].previewURL);
                    $scope.image_myData = image_response.data.hits;

                    $scope.image_loading = 0; //hide image_loader
                    $scope.image_block_loading = 1; //show image_block_loader

                    for (var i = 0; i < $scope.image_myData.length; ++i) {
                        $scope.image_myData[i].previewURL = $sce.trustAsHtml($scope.image_myData[i].previewURL);
                    }
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
            transclude: true, // Insert custom content inside the directive
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

            $scope.feedback_table_show = 0; //hide feedback_table_show

            $scope.feedback = [
                    {f_name: 'Random', f_email: 'abc@xyz.com', f_offer: 'Amazing !'},
                    {f_name: 'Qwerty', f_email: 'qwerty@qwerty.in', f_offer: 'Qwerty :)'}
                ];

            $scope.toggleModal = function() {            

            var new_feedback = {
                f_name: $scope.f_name,
                f_email: $scope.f_email,
                f_offer: $scope.f_offer,
            };

            $scope.feedback.push(new_feedback); 

            $scope.feedback_table_show = 1; //show feedback_table_show

            $scope.modalShown = !$scope.modalShown;         
  
            };
        }]);