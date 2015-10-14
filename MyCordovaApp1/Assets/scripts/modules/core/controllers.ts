module MyCordovaApp1.Core.Controllers {
    "use strict";

    var module = angular.module("MyCordovaApp1.Core.Controllers", []);

    interface IHomeScope extends ng.IScope {
        homeMessage: string;

        clickButton(): void;
    }

    class HomeController {

        constructor($scope: IHomeScope, $cordova: Services.ICordovaService) {
            $scope.homeMessage = "Hello World";

            $scope.clickButton = function () {
                alert("test action clicked!");
            }
        }
    }

    module.controller("homeController", ['$scope', '$cordova', ($scope, $cordova) => new HomeController($scope, $cordova)]);
}