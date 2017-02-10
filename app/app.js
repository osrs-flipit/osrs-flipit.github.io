(function () {
    'use strict';

    angular.module('app', ['app.directives', 'app.services']);

    angular.module('app').config(function ($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist(['self', 'https://services.runescape.com/m=itemdb_oldschool/**']);
    });
})();