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
		console.log("link",scope);
		scope.session = scope.$parent.session;		
	},
	templateUrl: "Billionaire/Modules/BillionaireStocks/StockModals/stockBuyModal.html",
}
});