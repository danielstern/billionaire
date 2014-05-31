angular.module("BillionaireGame.Stocks")
.directive("stockSellModal",function() {
return {
	restrict: "AE",
	controller: function($scope) {
		console.log("Stock sell modal init");
	},
	link: function(scope, elem) {
		console.log("LINK");
	},
	templateUrl: "Billionaire/Modules/BillionaireStocks/StockModals/stockSellModal.html",
}
});