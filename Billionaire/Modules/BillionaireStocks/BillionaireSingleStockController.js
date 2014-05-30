angular.module("BillionaireGame.Stocks")
.controller('BillionaireSingleStockController',function($scope,$routeParams){
	_.each($scope.session.market.stocks,function(stock){
		if (stock.symbol == $routeParams.symbol) {
			$scope.stock = stock;
			console.log(stock);
		}
	})
})