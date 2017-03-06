
app.controller('registerCtrl',['$scope','$ionicModal',function(scope,$ionicModal){
	scope.name = '红包活动页';
	$ionicModal.fromTemplateUrl('/widget/login.html', {
	    scope: scope,
	    animation: 'slide-in-up'
	  }).then(function(modal) {
	    scope.modal = modal;
	    scope.modal.show();
	  });
}]);