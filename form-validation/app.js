angular.module('form', []).controller('formController', ['$scope', function($scope) {
    var vm = this;
    $scope.signupForm = function() {
        if ($scope.signup_form.$valid) {
            //submit as normal
        } else {
            $scope.signup_form.submitted = true;
        }
    }
    $scope.submitted = false;
}]).directive('ensureUnique', function($http) {
    return {
        require: 'ngModel',
        link: function(scope, ele, attrs, c) {
            scope.$watch(attrs.ngModel, function(n) {
                if (!n) return;
                $http({
                    method: 'POST',
                    url: '/api/check/' + attrs.ensureUnique,
                    data: {
                        'field': attrs.ensureUnique,
                        'value': scope.signup.username
                    }
                }).success(function(data) {
                    console.log(data);
                    c.$setValidity('unique', data.isUnique);
                }).error(function(data) {
                    console.log(data);
                    c.$setValidity('unique', false);
                })
            })
        }
    }
}).directive('ngFocus', [function() {
    var focus_class = 'ng-focused';
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            ctrl.$focused = false;
            element.bind('focus', function(evt) {
                element.addClass(focus_class);
                scope.$apply(function() {
                    ctrl.$focused = true;
                });
            }).bind('blur', function(evt) {
            	element.removeClass(focus_class);
            	scope.$apply(function() {
            		ctrl.$focused = false;
            	});
            });
        }
    }
}]);