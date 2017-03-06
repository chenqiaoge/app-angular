
app.controller('homeCtrl',['$scope','listService',function(scope,listS){
	scope.name = '首页';
	console.log('进入首页执行控制器了');
	if (listS.getData()) {
		scope.homeData = listS.getData();
		return;
	}
	listS.getHttpData(function(res){
		console.log(res);
		var bannerData = res.product_list[0].images_list;
		var data = res.product_list.slice(1);
		var cartlist = listS.getCoreCartData();
		// console.log(data);
		// 给请求得到的数据添加num属性，并初始化为0
		for (var i = 0; i < data.length; i++) {
			data[i].num = 0;
			data[i].price = Number(data[i].price/100).toFixed(2);
			data[i].vip_price = Number(data[i].vip_price/100).toFixed(2);
			for(var key in cartlist){
				if (data[i].name === cartlist[key].name) {
					data[i].num = cartlist[key].num;
				}
			}
			
		}
		listS.setData(data);	//对已经从服务端请求得到的数据进行保存（优化性能）
		scope.homeData = data;	//数据模型的双向绑定
		scope.bannerData = bannerData;
		console.log(bannerData);
		scope.$watch('hopmeData',function(){
			console.log('homeData数据改变了');

		},true);
	})
}]);