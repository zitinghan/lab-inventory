'use strict';

/**
 * @ngdoc overview
 * @name labInventoryApp
 * @description
 * # labInventoryApp
 *
 * Main module of the application.
 */
angular
  .module('labInventoryApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'ConsumeCtrl',
        controllerAs: 'consume'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
