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
        vm.setPage = setPage;
        vm.highlight = highlight;

        activate();

        function activate() {
            vm.allItems = FlipIt.getAllItems(vm.setPage);
        }

        function setPage() {
            var max = vm.currentPage * vm.pageSize,
                min = (vm.currentPage * vm.pageSize) - vm.pageSize;
            if (vm.allItems.length > vm.pageSize) {
                vm.pageItems = vm.allItems.slice(min, max);
            }
        }

        function highlight(ratio, revenue, demandQuantity) {
            if (revenue > 0 && demandQuantity > 0) {
                if (ratio < 10) {
                    return "excellent";
                } else if (ratio < 20) {
                    return "great";
                } else if (ratio < 50) {
                    return "good";
                }
            }
        }
    }
})();