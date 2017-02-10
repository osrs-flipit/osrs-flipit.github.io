(function () {
    'use strict';

    angular.module('app.services')
        .factory('FlipIt', FlipIt);

    FlipIt.$inject = ['$http', '$log', 'Items'];

    function FlipIt($http, $log, Items) {
        var vm = this;

        vm.osrsServiceEndpoint = 'http://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=';
        vm.trendingItems = [];
        vm.trendingItemsSize = 100;
        vm.db = [];
        vm.dbSize = 0;

        loadDB();

        function loadDB() {
            $http.get('./app/db.json')
                .then(function (data) {
                    vm.db = data;
                    vm.dbSize = data.length;
                }, function (error) {
                    $log.error(error);
                });
        }

        function loadTrendingItems(membersFlag) {
            for (var i = 0; i < dbSize; i++) {
                $http.get(vm.osrsServiceEndpoint + vm.db[i].id)
                    .then(function (data) {
                        switch (membersFlag) {
                            case 1:
                                {
                                    addTrendingItem(data.item);
                                    break;
                                }
                            case 2:
                                {
                                    if (data.item.members === "true") {
                                        addTrendingItem(data.item);
                                        break;
                                    }
                                }
                            case 3:
                                {
                                    if (data.item.members === "false") {
                                        addTrendingItem(data.item);
                                        break;
                                    }
                                }
                        }
                    }, function (error) {
                        $log.error(error);
                    });
            }
        }

        function addTrendingItem(data) {
            if (vm.trendingItems.length < vm.trendingItemsSize) {
                if (parseFloat(vm.trendingItems[0].day30.change) < parseFloat(data.day30.change)) {
                    vm.trendingItems.unshift(data);
                } else if (parseFloat(vm.trendingItems[vm.trendingItems.length - 1].day30.change) > parseFloat(data.day30.change)) {
                    vm.trendingItems.push(data);
                } else {
                    for (var i = 0; i < vm.trendingItems.length; i++) {
                        if (parseFloat(vm.trendingItems[i].day30.change) < parseFloat(data.day30.change)) {
                            vm.trendingItems.splice(i + 1, 0, data);
                        }
                    }
                }
            } else if (vm.trendingItems.length == vm.trendingItemsSize) {
                var lastIndex = vm.trendingItems.length - 1;
                if (parseFloat(data.day30.change) > parseFloat(vm.trendingItems[lastIndex].day30.change)) {
                    for (var i = lastIndex; i >= 0; i--) {
                        if (parseFloat(vm.trendingItems[i].day30.change) > parseFloat(data.day30.change)) {
                            vm.trendingItems.splice(i + 1, 0, data);
                            vm.trendingItems.pop();
                        }
                    }
                }
            }
        }

        function getTrendingItems(membersFlag) {
            loadTrendingItems(membersFlag);
            return vm.trendingItems;
        }

        return {
            getTrendingItems: getTrendingItems
        }
    }
})();