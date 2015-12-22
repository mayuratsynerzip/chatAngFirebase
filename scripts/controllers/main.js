'use strict';

/**
 * @ngdoc function
 * @name firebaseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the firebaseApp
 */
angular.module('firebaseApp')
  .controller('MainCtrl',['$scope', '$timeout', '$window', function ($scope, $timeout, $window) {
    var rootRef = new Firebase('https://shining-heat-9587.firebaseio.com/');
    var dbref = rootRef.child('chatmessages');
    dbref.on('value', function(snapshot){
      snapshot.forEach(function(){
        $timeout(function(){
          var snapshotVal = snapshot.val();
          $scope.messages = snapshotVal;
        })
      })
    });

    $('#messageTxt').keypress(function(e){
      if(e.keyCode == 13) {
        $scope.addMessage();
      }
    });

    $scope.addMessage = function() {
      if($window.loginStatus == true) {
        if($scope.currentMessage != "") {
          var newMessage = {
            user: $window.username,
            text: $scope.currentMessage
          };
          dbref.push(newMessage);
          $scope.currentMessage = "";
        }
      } else {
       $('#errMessage').show(function(){
         setTimeout(function(){
           $('#errMessage').hide();
         })
       })
      }
    }
  }]);
