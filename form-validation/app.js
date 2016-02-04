angular.module('form', [])
.controller('formController', ['$scope', function($scope) {

	var vm = this;

	$scope.signupForm = function() {
		console.log(signup_form);
	}
}]);