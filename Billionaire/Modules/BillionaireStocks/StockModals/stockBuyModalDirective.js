angular.module("BillionaireGame.Stocks")
.directive("stockBuyModal",function() {
return {
	restrict: "AE",	
	controller: function($scope, billionaireDriverService, billionaireStockMarketService) {

		$scope.openBuyStockModal = function(stock) {

		    var deal = {
		        type: "BUY",
		        date: $scope.session.world.month,
		        name: stock.name,
		        symbol: stock.symbol,
		        link: stock,
		        boughtPrice: stock.price,
		        count: 10,
		        comission: $scope.session.player.comission,
		    }


		    $scope.deal = deal;
		    $scope.stock = stock;

		    $('#stockBuyModal-'+stock.symbol).modal();
		    $('#stockBuyModal-'+stock.symbol).on('hidden.bs.modal', function() {
		        billionaireDriverService.unpause();
		    });

		    billionaireDriverService.pause();
		}


		$scope.confirmBuyStock = function(deal, count, comission) {

				var stock = deal.link;

		    billionaireDriverService.pause();
		    $('#stockBuyModal-'+stock.symbol).modal('hide');

		    deal.count = count;
		    deal.comission = comission;
		    deal.originalNetCost = deal.boughtPrice + comission / count;
		    deal.totalCost = deal.boughtPrice * count + comission;
		    
		    billionaireStockMarketService.buyStocks(deal,count,comission);

		    $scope.session.player.stockHistory.push(deal);

		    $scope.session.player.cash -= (deal.totalCost);
		}


	},
	link: function(scope, elem) {

	},
	templateUrl: "Billionaire/Modules/BillionaireStocks/StockModals/stockBuyModal.html",
}
});