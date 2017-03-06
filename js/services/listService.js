// 数据工厂,负责列表页的数据处理
app.factory('listService',function($http){
	// 对购物车中的数据进行本地缓存，
	function Store(nameSpace,data){
		if (data) {
			// 缓存数据
			localStorage.setItem(nameSpace,JSON.stringify(data));
			return;	//执行存储就不执行取缓存
		}
		// 有缓存时取出缓存数据，（注意&&的用法，此处是在nameSpace存在时返回JSON.parse(localStorage.getItem(nameSpace));否则会返回null，）
		return (nameSpace && JSON.parse(localStorage.getItem(nameSpace))) || null;
	};

	// 通过ajax获取列表页的数据
	var list = $http({
			url:'http://as-vip.missfresh.cn/v2/product/home/index?device_id=1bdc50a20e934093f440a1e28444af0d&env=web&platform=web&tdk=148655526557756796133&uuid=1bdc50a20e934093f440a1e28444af0d&version=2.3.4',
			method:'post',
			data:{
				lat:39.91388,
				lng:116.60418
			}
		})/*.success(function(res){
			console.log(res);
			var data = res.product_list.slice(1);
			}) //可以有更好的写法 */;
	var coreData = null;	//数据工厂中的核心数据
	var coreCartData = {
		// 空对象，存储购物车列表数据，
	};
	function getCartList(obj){
		// 把购物车列表数据对象转为数组，
		var arr = [];
		for(var key in obj){
			arr.push(obj[key]);
		};
		return arr;
	};
	return {
		
		getHttpData:function(callback){
			// callback被称作回调函数：当一个函数方法被作为形参来传递给另一个方法的时候，
			list.success(callback);

		},
		setData:function(data){
			// 储存请求到的数据
			coreData = data;
		},
		getData:function(){
			// 获取请求过储存起来的数据，
			return coreData;			
		},
		setCart:function(item,scope){
			// 设置购物车列表数据
			coreCartData[item.name] = item;
			// 当购物车列表中商品的数量减为0时，要删除（包含与视图绑定的）数据
			if (item.num === 0) {
				delete coreCartData[item.name];
				if (scope && scope.list) {
					// 当购物车列表有数据时才执行，防止第一次加载时（购物车无数据）报错
					scope.list.splice(scope.index,1);	
					//此处用到了下标index，所以购物车的自定义标签中index不能省略
				}
				
			};
			// 缓存购物车列表的数据 
			Store('cartlist',coreCartData);
		},
		getCoreCartData:function(){
			// 取出购物车列表数据的缓存
			return Store('cartlist') || {};
			// 容易犯的小bug，是直接返回缓存起来的数据，在刷新时会有bug，
			// return coreCartData;
		},
		getCartData:function(){
			var arr = [];
			if (!coreData) {
				// 请求的数据还没有储存给coreData时,就先访问缓存中的数据，缓存中有数据就返回数据（要将对象转化为数组），然后跳出函数，
				coreCartData = Store('cartlist') || {};
				// console.log(coreCartData);
				return (coreCartData && getCartList(coreCartData)) || false;
			};
			for (var i = 0; i < coreData.length; i++) {
				if(coreData[i].num !== 0){
					// 请求到并储存起来的数据的num值大于0时，就插入到数组中，在购物车列表可用，
					arr.push(coreData[i]);
				}
			}
			return arr;
		},
		getNumData :function(){
			// 为计算购物车总数给tab中用
			return coreCartData;
		}
	}
})
