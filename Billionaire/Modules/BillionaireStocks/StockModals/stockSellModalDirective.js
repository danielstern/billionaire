angular.module("BillionaireGame.Stocks")
.directive("stockSellModal",function() {
return {
	restrict: "AE",
	controller: function($scope) {


		$scope.openSellStockModal = function(holding) {

		    $scope.deal = holding;
		    holding.gainPerUnit = holding.link.price - holding[0].boughtPrice;
		    holding.taxPerUnit = $scope.session.market.capitalGainsTax;

		    holding.amountToSell = holding.length;

		    $('#stockSellModal').modal();
		    $('#stockSellModal').on('hidden.bs.modal', function() {
		        if (!$scope.session.confirming) billionaireDriverService.unpause();
		    });


		    billionaireDriverService.pause();
		}


		$scope.confirmSellStock = function(holding, count) {

		    billionaireDriverService.pause();
		    billionaireStockMarketService.sellStocks(holding,count,$scope.session);


		    $('#stockSellModal').modal('hide');
		    if (!$scope.session.confirming) billionaireDriverService.unpause();

		}
		
	},
	link: function(scope, elem) {
		console.log("LINK");
	},
	templateUrl: "Billionaire/Modules/BillionaireStocks/StockModals/stockSellModal.html",
}
});