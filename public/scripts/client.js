var myApp = angular.module('myApp', ['ui.bootstrap.modal', 'ngRoute']);

console.log('reached client.js');

myApp.config(function($routeProvider, 
) {
    $routeProvider.when('/today', {
        templateUrl: 'views/today.html',
        controller: 'TodayController as TC'
    }).when('/thisWeek', {
        templateUrl: 'views/thisWeek.html',
        controller: 'ThisWeekController as WC'
    }).when('/add', {
        templateUrl: 'views/add.html',
        controller: 'AddItemController as AC'
    }).otherwise('/');
    // $locationProvider.html5Mode(true);
  });