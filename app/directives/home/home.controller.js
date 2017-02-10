(function () {
    'use strict';

    angular.module('app.directives')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['FlipIt'];

    function HomeController(FlipIt) {
        var vm = this;

        vm.trendingItems = [];

        activate();

        function activate() {
            vm.trendingItems = FlipIt.getTrendingItems(1);
        }
    }
})();