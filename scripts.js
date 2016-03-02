// Dynamic data to filter in $scope.items - example data: Tshirt data withe name of the tshirt, type, color
// Dynamic filter buttons defined in $scope.filterbuttons - Specify the attribute to filter - color and the value to filter - Black

angular.module('ionicApp', ['ionic', 'ionic-material', 'ngAnimate'])
    .controller('MyCtrl', function ($scope, $ionicHistory, $timeout, ionicMaterialInk, ionicMaterialMotion, $filter) {

        $scope.filterConditions = $scope.filterConditions || [];
        $scope.button = $scope.button || {};

//Dataset on which to be filtered
        $scope.items = [{
            name: 'Tshirt1',
            type: 'Shirt',
            color: 'White'
        }, {
            name: 'Tshirt2',
            type: 'Shirt',
            color: 'Black'
        }, {
            name: 'Jeans1',
            type: 'Pant',
            color: 'Blue'
        }, {
            name: 'Jeans2',
            type: 'Pant',
            color: 'Black'
        }, {
            name: 'Vneckshirt',
            type: 'Shirt',
            color: 'White'
        }, {
            name: 'Poloshirt',
            type: 'Shirt',
            color: 'Blue'
        }, {
            name: 'CottonPant',
            type: 'Pant',
            color: 'Black'
        }, {
            name: 'TshirtNew',
            type: 'Shirt',
            color: 'Black'
        }, {
            name: 'Tshirt4',
            type: 'Shirt',
            color: 'White'

        }];
// Filter buttons
        $scope.filterbuttons = [{type: 'Shirt'}, {type: 'Pant'}, {color: 'Black'}, {color: 'White'}];

//Modify the dataset to add the function and button dymanically
        for (var i = 0; i < $scope.filterbuttons.length; i++) {
            $scope.filterbuttons[i].funcName = 'filter' + Object.keys($scope.filterbuttons[i])[0] + $scope.filterbuttons[i][Object.keys($scope.filterbuttons[i])[0]];
            $scope.filterbuttons[i].name = $scope.filterbuttons[i][Object.keys($scope.filterbuttons[i])[0]];
        }

// One time creation of function for every button so that it does not have to be regenerated for each click
        for (var i = 0; i < $scope.filterbuttons.length; i++) {
            $scope[$scope.filterbuttons[i].funcName] = (function (i) {
                return function () {
                    if ($scope.button[$scope.filterbuttons[i].funcName].clicked == true) {
                        var filterattribute = Object.keys($scope.filterbuttons[i])[0];
                        var filtervalue = $scope.filterbuttons[i][Object.keys($scope.filterbuttons[i])[0]];
                        var filterObject = {};
                        filterObject[filterattribute] = filtervalue;
                        $scope.filterConditions.push(filterObject);
                    }
                    else {
                        $scope.filterConditions.splice($scope.filterConditions.indexOf(filterObject), 1);
                    }
                }
            })(i);
        }

//On button click on the front end, execute a specific function for the button
        $scope.buttonClickFunction = function (funcName) {
            if (angular.isFunction($scope[funcName]))
                $scope[funcName]();
        }

        $scope.criteriaMatch = function (item) {
            var matching = true;
            for (var i = 0; i < $scope.filterConditions.length; i++) {
                matching = matching && (item[Object.keys($scope.filterConditions[i])] == $scope.filterConditions[i][Object.keys($scope.filterConditions[i])]);
            }
            return matching;
        };



        // Animate list on this event
        $scope.$on('ngLastRepeat.mylist', function (e) {
            $timeout(function () {
                ionicMaterialMotion.fadeSlideIn();
                ionicMaterialInk.displayEffect();
            }, 500); // No timeout delay necessary.
        });
        //}).filter('criteriaMatch1', function () {
        //return function (items,letter) {
        //    var filtered = [];
        //    var letterMatch = new RegExp(letter, 'i');
        //    for (var i = 0; i < items.length; i++) {
        //        var item = items[i];
        //        if (letterMatch.test(item.type))
        //        {
        //            filtered.push(item);
        //        }
        //    }
        //
        //    return filtered;
        //};
    }).directive('ngLastRepeat', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngLastRepeat' + (attr.ngLastRepeat ? '.' + attr.ngLastRepeat : ''));
                });
            }
        }
    };
});
