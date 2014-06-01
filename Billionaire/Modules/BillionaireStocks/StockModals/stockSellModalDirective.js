angular.module("BillionaireGame.Stocks")
.directive("stockSellModal",function() {
return {
	restrict: "AE",
	controller: function($scope,billionaireDriverService,billionaireStockMarketService  ) {

		$scope.openSellStockModal = function(holding) {

		    $scope.deal = holding;
		    var stock = holding.link;

		    holding.gainPerUnit = holding.link.price - holding[0].boughtPrice;
		    holding.taxPerUnit = $scope.session.market.capitalGainsTax;

		    holding.amountToSell = holding.length;

		    var modalSelector = '#stockSellModal-'+stock.symbol;
		    $scope.modalSelector = modalSelector;
		    console.log("opening modal",modalSelector);
		    $(modalSelector).modal();
		    $(modalSelector).on('hidden.bs.modal', function() {
		        billionaireDriverService.unpause();
		    });

		    billionaireDriverService.pause();
		}


		$scope.confirmSellStock = function(holding, count) {

		    billionaireStockMarketService.sellStocks(holding,count,$scope.session);
		    $($scope.modalSelector).modal('hide');

		}
		
	},
	link: function(scope, elem) {
		console.log("LINK");
	},
	templateUrl: "Billionaire/Modules/BillionaireStocks/StockModals/stockSellModal.html",
}
});