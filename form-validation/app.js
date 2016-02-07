angular.module('form', [])
.controller('formController', ['$scope', function($scope) {

	var vm = this;

	$scope.signupForm = function() {
		console.log(signup_form);
	}
}])
.directive('ensureUnique', function($http) {
	require: 'ngModel',
	link: function(scope, ele, attrs, c) {
		scope.$watch(attrs.ngModel, function(n) {
			if(!n) return;

			$http({
				method: 'POST',
				url: '/api/check/' + attrs.ensureUnique,
				data: { 'field': attrs.ensureUnique }
			}).success(function(data) {
				c.$setValidity('unique', data.isUnique);
			}).error(function(data) {
				c.$setValidity('unique', false);
			})
		})
	}
});