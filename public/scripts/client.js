var myApp = angular.module('myApp', ['ngRoute']);

console.log('reached client.js');

myApp.config(function($routeProvider) {
    $routeProvider.when('/today', {
        templateUrl: 'views/today.html',
        controller: 'TodayController as TC'
    }).when('/thisWeek', {
        templateUrl: 'views/thisWeek.html',
        controller: 'ThisWeekController as WC'
    }).when('/add', {
        templateUrl: 'views/add.html',
        controller: 'AddItemController as AC'
    }).when('/edit', {
        templateUrl: 'views/edit.html',
        controller: 'EditItemController as EC'
    }).when('/do', {
        templateUrl: 'views/do.html',
        controller: 'DoModeController as DC'
    }).when('/info', {
        templateUrl: 'views/info.html',
        controller: 'InfoController as IC'
    }).when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutController as BC'
    }).otherwise('/');
    // $locationProvider.html5Mode(true);
  });