(function () {
    'use strict';

    angular.module('app.directives')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['FlipIt'];

    function HomeController(FlipIt) {
        var vm = this;

        vm.allItems = [];
        vm.pageSize = 10;
        vm.currentPage = 1;

        activate();

        function activate() {
            vm.allItems = FlipIt.getAllItems();
        }
    }
})();