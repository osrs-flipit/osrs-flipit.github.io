(function () {
    'use strict';

    angular.module('app.directives')
        .directive('flipitHome', HomeDirective);

    //HomeDirective.$inject = [];

    function HomeDirective() {
        var directive = {
            restrict: 'E',
            templateUrl: '/app/directives/home/home.template.html'
        };

        return directive;
    }
})();