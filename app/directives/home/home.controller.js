(function () {
    'use strict';

    angular.module('app.directives')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['FlipIt'];

    function HomeController(FlipIt) {
        var vm = this;

        vm.allItems = [];
        vm.pageItems = [];
        vm.pageSize = 10;
        vm.currentPage = 1;

        activate();

        function activate() {
            vm.allItems = FlipIt.getAllItems();
            setPage();
        }

        function setPage() {
            var min = vm.currentPage * vm.pageSize,
                max = (vm.currentPage + 1) * vm.pageSize;
            if (vm.allItems.length > vm.pageSize) {
                vm.pageItems = vm.allItems.slice(min, max);
            }
        }
    }
})();