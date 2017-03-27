'use strict';

/**
 * @ngdoc function
 * @name labInventoryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the labInventoryApp
 */
angular.module('labInventoryApp')
  .controller('AdminCtrl', function ($routeParams) {
    if(typeof(Storage) !== undefined) {

        if ($routeParams.user === 'kahxin') {
            localStorage.setItem('user', $routeParams.user);
            document.getElementById('result').innerHTML = 'Welcome back '+ $routeParams.user +'. You can now proceed with edit function';
        }else if($routeParams.user === 'exit'){
            localStorage.removeItem('user');
        }else {
          document.getElementById('result').innerHTML = 'Sorry you are not able to do anything';
        }
    } 
   
  });
