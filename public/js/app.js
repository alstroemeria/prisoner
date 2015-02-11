'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'ngRoute',

  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',

  // 3rd party dependencies
  'btford.socket-io'
])

// .
// config(function ($routeProvider, $locationProvider) {
//   $routeProvider.
//     when('/menu', {
//       templateUrl: 'partials/menu',
//       controller: 'MyCtrl1'
//     }).
//     when('/start', {
//       templateUrl: 'partials/start',
//       controller: 'MyCtrl2'
//     }).
//     otherwise({
//       redirectTo: '/view1'
//     });

//   $locationProvider.html5Mode(true);
// });
