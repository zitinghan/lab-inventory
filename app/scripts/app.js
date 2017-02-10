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
    'ngTouch',
    'ui.bootstrap',
    'services'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'ConsumeCtrl',
        controllerAs: 'consume'
      })
      .when('/microbiology', {
        templateUrl: 'views/microbiology.html',
        controller: 'MicroCtrl',
        controllerAs: 'micro'
      })
      .when('/admin/:user', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl',
        controllerAs: 'admin'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
