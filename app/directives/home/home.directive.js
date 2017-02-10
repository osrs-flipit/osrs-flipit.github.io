(function () {
    'use strict';

    angular.module('app.directives')
        .directive('flipitHome', HomeDirective);

    HomeDirective.$inject = [];

    function HomeDirective() {
        var directive = {
            restrict: 'E',
            controller: 'HomeContoller',
            controllerAs: 'home',
            templateUrl: 'home.template.html'
        };

        return directive;
    }
})();