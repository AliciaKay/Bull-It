var myApp = angular.module('myApp', ['ngRoute']);

console.log('reached client.js');
/// Routes ///
myApp.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    console.log('myApp -- config')
    $routeProvider
        .when('/home', {
            templateUrl: '/views/templates/home.html',
            controller: 'LoginController as lc',
        })
        .when('/register', {
            templateUrl: '/views/templates/register.html',
            controller: 'LoginController as lc'
        })
        .when('/user', {
            templateUrl: '/views/templates/user.html',
            controller: 'UserController as uc',
            resolve: {
                getuser: function (UserService) {
                    return UserService.getuser();
                }
            }
        })
        .when('/info', {
            templateUrl: '/views/templates/info.html',
            controller: 'InfoController',
            resolve: {
                getuser: function (UserService) {
                    return UserService.getuser();
                }
            }
        })
        .when('/today', {
            templateUrl: 'views/templates/today.html',
            controller: 'TodayController as TC'
        }).when('/thisWeek', {
            templateUrl: 'views/templates/thisWeek.html',
            controller: 'ThisWeekController as WC'
        }).when('/add', {
            templateUrl: 'views/templates/add.html',
            controller: 'AddItemController as AC'
        }).when('/edit', {
            templateUrl: 'views/templates/edit.html',
            controller: 'EditItemController as EC'
        }).when('/do', {
            templateUrl: 'views/templates/do.html',
            controller: 'DoModeController as DC'
        }).otherwise({
            redirectTo: '/home'
        })
    // $locationProvider.html5Mode(true);
});