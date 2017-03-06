
// 单一商品（首页列表和购物车公用的组件）
// 自定义标签
app.directive('singleProduct',function(listService){
	return {
		restrict:'E',
		link:function(scope,element,attr){
			// console.log(element[0]);
			// 注意此处加减法操作不再传参index，把list[index]换成item也可以,
			scope.plus = function(){
				scope.item.num++;
			};
			scope.minus = function(){
				if(scope.item.num>0){
					scope.item.num--;
				}
			};
			scope.$watch('item',function(newValue,oldvalue){
				listService.setCart(newValue,scope);
				// console.log(listService.getcoreCartData())
			},true);	//这里的true代表一直监听item变化
		},
		templateUrl:'/widget/singleCart.html',
		replace:true,
		scope:{
			item:'=item',	//item属于单个商品的单个数据对象
			list:'=list',	//list是购物车里的所有商品数据对象
			index:'=index'	//index是单个商品在数据对象里的对应下标
		}
	}
})
