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

        // UI related
        vm.sortColumn = '';
        vm.sort = sort;
        vm.reverse = true;

        activate();

        function activate() {
            vm.allItems = FlipIt.getAllItems();
        }

        function setPage() {
            var max = vm.currentPage * vm.pageSize,
                min = (vm.currentPage * vm.pageSize) - vm.pageSize;
            if (vm.allItems.length > vm.pageSize) {
                vm.pageItems = vm.allItems.slice(min, max);
            }
        }

        function sort(sortColunm) {
            vm.sortColumn = sortColumn;
            vm.reverse = !vm.reverse;

        }
    }
})();