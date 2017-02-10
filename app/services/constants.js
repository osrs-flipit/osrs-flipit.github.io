(function () {
    'use strict';

    angular.module('app.services')
        .constant('Items', {
            SETS: {
                IRON: {
                    PIECES: [1153, 1115, 1067, 1191],
                    SET: 12972
                },
                STEEL: {
                    PIECES: [1157, 1119, 1069, 1193],
                    SET: 12984
                },
                BLACK: {
                    PIECES: [1165, 1125, 1077, 1195],
                    SET: 12988
                },
                MITH: {
                    PIECES: [1159, 1121, 1071, 1197],
                    SET: 13000
                },
                ADDY: {
                    PIECES: [1161, 1123, 1073, 1199],
                    SET: 13012
                },
                RUNE: {
                    PIECES: [1163, 1127, 1079, 1201],
                    SET: 13024
                },
                SARA: {
                    PIECES: [2661, 2663, 2665, 2667],
                    SET: 13040
                },
                ZAM: {
                    PIECES: [2653, 2655, 2657, 2659],
                    SET: 13044
                },
                GUTH: {
                    PIECES: [2669, 2671, 2673, 2675],
                    SET: 13048
                }
            }
        });
})();