(function () {
    'use strict';

    angular.module('app.services')
        .factory('FlipIt', FlipIt);

    FlipIt.$inject = ['$http', '$log', 'Items'];

    function FlipIt($http, $log, Items) {
        var vm = this;

        // All items
        vm.osrsServiceItems = 'https://rsbuddy.com/exchange/summary.json';
        // All items with store prices.
        vm.osrsServiceStorePrices = 'https://rsbuddy.com/exchange/names.json';
        //  Hourly Pricepoint
        vm.osrsServiceEndpoint = 'https://api.rsbuddy.com/grandExchange?a=guidePrice&i=';
        // Plot points for recent trades based on timespan. Replace timespan with a value in vm.osrsTradeSpan
        vm.osrsServiceGraph = 'https://api.rsbuddy.com/grandExchange?a=graph&start=1425921352106&g=timespan&i=';
        /* Trades within a certain span of time
         * 180 - 3hrs, 1440 - 1day, 4320 - 3days        
         */
        vm.osrsTradeSpan = [4320, 1440, 180];
        vm.trendingItems = [];
        vm.trendingItemsSize = 100;
        vm.marketDB = [];
        vm.db = [];
        vm.dbSize = 0;

        function loadDB() {
            var loadPromise = $http.get('./app/db.json')
                .then(function (response) {
                    for (var obj in response.data) {
                        var key = response.data[obj].id + '';
                        vm.db[key] = response.data[obj].name;
                    }
                    vm.dbSize = response.data.length;
                }, function (error) {
                    $log.error(error);
                });
            return loadPromise;
        }

        function loadTrendingItems() {
            for (var property in vm.db) {
                var itemID = property;
                $http.get(vm.osrsServiceEndpoint + itemID)
                    .then(function (response) {
                        var startIndex = response.config.url.lastIndexOf('=') + 1;
                        var index = response.config.url.substring(startIndex, response.config.url.length);
                        var itemName = vm.db[index];
                        addItem(index, itemName, response.data);
                        //addTrendingItem(vm.db[i].name, response.data);
                    }, function (error) {
                        $log.error(error);
                    });
            }
        }

        function addItem(id, itemName, data) {
            var item = {
                id: id,
                name: itemName,
                buyPrice: data.buying,
                sellPrice: data.selling,
                revenue: data.selling - data.buying,
                demandQuantity: data.buyingQuantity - data.sellingQuantity,
                demandPercentage: data.sellingQuantity == 0 ? 0 : ((data.buyingQuantity / data.sellingQuantity) - 1) * 100
            }

            vm.marketDB.push(item);
        }

        function addTrendingItem(itemName, data) {
            if (vm.trendingItems.length < vm.trendingItemsSize) {
                if (vm.trendingItems[0]) {
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

        function activate() {
            var loadPromise = loadDB().then(function (response) {
                loadTrendingItems();
            });
        }

        function getTrendingItems() {
            activate();
            return vm.trendingItems;
        }

        function getAllItems() {
            activate();
            return vm.marketDB;
        }

        return {
            getTrendingItems: getTrendingItems,
            getAllItems: getAllItems
        }
    }
})();