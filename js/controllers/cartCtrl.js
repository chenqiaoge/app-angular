
app.controller('cartCtrl',['$scope','listService',function(scope,list){
	scope.name = '购物车页面';
	var data = list.getCartData();
	console.log(data);
	if (data) {
		scope.list = data;
	}
	scope.$watch('list',function(value){
		console.log(value);
	},true)
}]);