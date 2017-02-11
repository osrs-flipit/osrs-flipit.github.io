(function () {
    'use strict';

    angular.module('app.directives')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['FlipIt'];

    function HomeController(FlipIt) {
        var vm = this;

        vm.allItems = [];

        activate();

        function activate() {
            vm.allItems = FlipIt.getAllItems();
        }
    }
})();