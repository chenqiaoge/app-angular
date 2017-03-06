
// 主js文件,项目的入口js文件

var app = angular.module('fruitApp',['ionic','ngRoute']);

// 因为是单页面开发，所以需要进行路由的配置，依据hash值显示相应视图
app.config(function($routeProvider){
	$routeProvider.when('/home',{
		templateUrl:'/view/home.html',	//首页的视图
		controller:'homeCtrl'	//首页的控制层
	}).when('/cart',{
		templateUrl:'/view/cart.html',
		controller:'cartCtrl'
	}).when('/address',{
		templateUrl:'/view/address.html',
		controller:'addressCtrl'
	}).when('/info',{
		templateUrl:'/view/info.html',
		controller:'infoCtrl'
	}).when('/register',{
		templateUrl:'/view/register.html',
		controller:'registerCtrl'
	}).otherwise({
		redirectTo:'/home'
	})
})

//我们可以通过对应视图的对应的控制层，进行数据模型的双向数据绑定