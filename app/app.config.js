(function(){
    'use strict';

    angular.module('app')
        .config('routeConfig', RouteConfig);

    RouteConfig.$inject = ['$routeProvider'];

    function RouteConfig($routeProvider){
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                controllerAs: 'home',
                templateUrl: './directives/home/home.template.html'
            })
            .otherwise('/');
    }
})();