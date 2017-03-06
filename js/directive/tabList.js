
app.directive('tabList',function(listService,$timeout){
	return {
		restrict:'E',	//自定义标签
		link:function(scope,element,attr){
			scope.getStatus = function(index){
				// 紧紧围绕数据进行操作，改变dom的状态
				for(var i=0;i<scope.list.length;i++){
					scope.list[i].active = false;
				}
				scope.list[index].active=true;
			};
			scope.list = [{
				name:'首页',
				link:'#/home',
				icon:'ion-home',
				active:false,
				isShow:'none'
			},{
				name:'品牌团',
				link:'#/address',
				icon:'ion-star',
				active:false,
				isShow:'none'
			},{
				name:'红包',
				link:'#/register',
				icon:'ion-funnel',
				active:false,
				isShow:'none'
			},{
				name:'购物车',
				link:'#/cart',
				icon:'ion-android-cart',
				active:false,
				isShow:'block',

			},{
				name:'我的',
				link:'#/info',
				icon:'ion-person',
				active:false,
				isShow:'none'
			}];
			// 高亮显示刷新后依据hash值来让当前页图标高亮
			for (var i = 0; i < scope.list.length; i++) {
				if (location.hash === scope.list[i].link) {
					scope.list[i].active = true;
				} 
			};
			//获取购物车数据，
			$timeout(function() {
				// 从数据工厂获取到要缓存的数据（单个商品数据改变时会改变此数据），把数据工厂里的数据绑定给此作用域中数据，
				// 因初始绑定时一直是得到空对象，所以用延时器来延时绑定，
				scope.data = listService.getNumData();
			},0);

			scope.$watch('data',function(newValue,oldvalue){
				// 监听数据变化，计算出数量总数
				var num = 0;
				for(var index in newValue){
					num += newValue[index].num;
				};
				scope.CartNum = num;
				// console.log(num);
			},true);
				
			
			
		},
		templateUrl:'/widget/tab.html',
		replace:true,
		scope:{
			// 与外界作用域独立,防止重名等影响
		}
	}
})