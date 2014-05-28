angular.module("BillionaireGame.Stocks")
    .controller("BillionaireStocksController", function($scope, $rootScope, 
            billionaireDriverService,
            billionaireStockMarketService,
            billionaireCalculationService
        ) {

        $scope.getROR = function(stock) {
            return billionaireCalculationService.getRORForStock(stock,$scope.session);
        };

        $scope.openBuyStockModal = function(stock) {

            var deal = {
                type: "BUY",
                date: $scope.session.world.month,
                name: stock.name,
                symbol: stock.symbol,
                link: stock,
                boughtPrice: stock.price,
                count: 10,
                stocks: [],
                comission: $scope.session.player.comission,
            }


            $scope.deal = deal;

            $('#stockBuyModal').modal();
            $('#stockBuyModal').on('hidden.bs.modal', function() {
                if (!$scope.session.confirming) billionaireDriverService.unpause();
            });

            billionaireDriverService.pause();
        }


        $scope.confirmBuyStock = function(deal, count, comission) {

            billionaireDriverService.pause();
            $scope.session.confirming = true;
            $('#stockBuyModal').modal('hide');

            deal.originalNetCost = deal.boughtPrice + comission / count;
            deal.count = count;
            deal.comission = comission;
            deal.totalCost = deal.boughtPrice * count + comission;
            deal.settled = true;

            var stocks = billionaireStockMarketService.expandStocks(deal);

            $scope.session.player.stocks = $scope.session.player.stocks.concat(stocks);
            $scope.session.player.stockHistory.push(deal);

            $scope.session.player.cash -= (deal.totalCost);
            $('#confirmStockBuyModal').modal();
            $('#confirmStockBuyModal').on('hidden.bs.modal', function() {
                billionaireDriverService.unpause();
                $scope.session.confirming = false;
            });
        }


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

            for (var i = 0; i < count; i++) {
                var stock = _.find($scope.session.player.stocks, function(stock) {
                    if (stock.originalNetCost == holding[0].originalNetCost && stock.boughtDate == holding[0].boughtDate && stock.link == holding[0].link) {
                        return true;
                    }
                });

                $scope.session.player.stocks = _.without($scope.session.player.stocks, stock);
            }

            $scope.session.player.cash += (count * holding[0].link.price) - (count * holding.taxPerUnit);

            $('#stockSellModal').modal('hide');
            if (!$scope.session.confirming) billionaireDriverService.unpause();

        }


    })
