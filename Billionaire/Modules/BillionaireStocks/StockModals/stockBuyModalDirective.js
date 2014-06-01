angular.module("BillionaireGame.Stocks")
.directive("stockBuyModal",function() {
return {
	restrict: "AE",
	// scope: {
	//   session:'@',
	// },
	// controller: function($scope) {
	// 	console.log("Stock buy modal init");
	// },
	link: function(scope, elem) {
		console.log("Abraham lincolon", scope);
	},
	templateUrl: "Billionaire/Modules/BillionaireStocks/StockModals/stockBuyModal.html",
}
});