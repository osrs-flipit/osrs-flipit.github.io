(function () {
    'use strict';

    angular.module('app.services')
        .factory('FlipIt', FlipIt);

    FlipIt.$inject = ['$http', '$log', 'Items'];

    function FlipIt($http, $log, Items) {
        var vm = this;

        vm.osrsServiceEndpoint = 'https://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=';
        vm.trendingItems = [];
        vm.trendingItemsSize = 100;
        vm.db = [];
        vm.dbSize = 0;

        function loadDB() {
            var loadPromise = $http.get('./app/db.json')
                .then(function (response) {
                    vm.db = response.data;
                    vm.dbSize = response.data.length;
                }, function (error) {
                    $log.error(error);
                });
            return loadPromise
        }

        function loadTrendingItems(membersFlag) {
            for (var i = 0; i < vm.dbSize; i++) {
                $http({
                        method: 'JSONP',
                        url: vm.osrsServiceEndpoint + vm.db[i].id
                    })
                    .then(function (response) {
                        switch (membersFlag) {
                            case 1:
                                {
                                    addTrendingItem(angular.fromJson(response.data.item));
                                    break;
                                }
                            case 2:
                                {
                                    if (data.item.members === "true") {
                                        addTrendingItem(angular.fromJson(response.data.item));
                                        break;
                                    }
                                }
                            case 3:
                                {
                                    if (data.item.members === "false") {
                                        addTrendingItem(angular.fromJson(response.data.item));
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
            var loadPromise = loadDB().then(function (response) {
                loadTrendingItems(membersFlag);
            });
            return vm.trendingItems;
        }

        return {
            getTrendingItems: getTrendingItems
        }
    }
})();