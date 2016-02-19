angular.module('myApp', [])
.run( function($rootScope) {
    $rootScope.rootProperty = 'root scope';
})
.controller('ParentController', function($scope) {
    $scope.parentProperty = 'parent scope';
})
.controller('ChildController', function($scope) {
    $scope.childProperty = 'child scope';

    $scope.fullSentenceFromChild = 'Same $scope: We can access: ' +
        $scope.rootProperty + ' and ' +
        $scope.parentProperty + ' and ' +
        $scope.childProperty
})
.directive('myDirective', function($http) {
    return {
        restrict: 'A',
        scope: {
            myUrl: '=someAttr',
            myText: '@'
        },
        replace: true,
        
        template: '<div>\
        <label>My Url Field: </label>\
        <input type="text" ng-model="myUrl">\
        <a href="{{ myUrl }}">{{ myText }}</a>\
        </div>'
    }
});