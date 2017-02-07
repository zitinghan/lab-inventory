'use strict';

/**
 * @ngdoc function
 * @name labInventoryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the labInventoryApp
 */
angular.module('labInventoryApp')
  .controller('MainCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    this.clickEvent = function(){
    	console.log('123');
    }
  });
