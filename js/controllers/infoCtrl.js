
app.controller('infoCtrl',['$scope','$ionicModal',function(scope,$ionicModal){
	$ionicModal.fromTemplateUrl('/widget/login.html', {
	    scope: scope,
	    animation: 'slide-in-up'
	  }).then(function(modal) {
	    scope.modal = modal;
	    scope.modal.show();
	  });
	  scope.name = '订单列表页'
	  
}]);
