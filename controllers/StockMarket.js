angular.module("BillionaireGame")
    .controller("StockMarket", function($scope, $rootScope) {


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
                if (!$scope.session.confirming) $scope.unpause();
            });

            $scope.pause();
        }

        $scope.confirmBuyStock = function(deal, count, comission) {

            $scope.pause();
            $scope.session.confirming = true;
            $('#stockBuyModal').modal('hide');

            deal.originalNetCost = deal.boughtPrice + comission / count;
            deal.count = count;
            deal.comission = comission;
            deal.totalCost = deal.boughtPrice * count + comission;
            deal.settled = true;

            var stocks = $scope.expandStocks(deal);
           
            $scope.session.player.stocks = $scope.session.player.stocks.concat(stocks);
            $scope.session.player.stockHistory.push(deal);

            $scope.session.player.cash -= (deal.totalCost);
            $('#confirmStockBuyModal').modal();
            $('#confirmStockBuyModal').on('hidden.bs.modal', function() {
                $scope.unpause();
                $scope.session.confirming = false;
            });
        }

        $scope.openSellStockModal = function(holding) {

            $scope.deal = holding;

            $('#stockSellModal').modal();
            $('#stockSellModal').on('hidden.bs.modal', function() {
                if (!$scope.session.confirming) $scope.unpause();
            });


            $scope.pause();
        }

        $rootScope.consolidateStocks = function() {

            var consolidated = [];

            var stocks = _.clone($scope.session.player.stocks);

            console.log("Consolidating stocks");

            var holdings = _.groupBy(stocks,function(stock){
                return JSON.stringify({
                    symbol: stock.link.symbol,
                    boughtDate: stock.link.boughtDate,
                    boughtPrice: stock.link.boughtPrice,
                });
            });

            _.each(holdings,function(holding){
                holding.link = holding[0].link;
                holding.boughtPrice = holding[0].boughtPrice;
                consolidated.push(holding);
            })

            console.log("Holdings?",holdings);

            return consolidated;

        }

        $scope.expandStocks = function(holding) {

            var stocks = [];
            for (var i = 0; i < holding.count; i++) {
                var _stock = {};
                _stock.boughtPrice = holding.boughtPrice;
                _stock.boughtDate = holding.date;
                _stock.originalNetCost = holding.originalNetCost;
                _stock.link = holding.link;
                stocks.push(_stock);
                
            }

            return stocks;
        }

        $scope.confirmSellStock = function(holding, count) {

            $scope.pause();
            $scope.session.confirming = true;
            $('#stockBuyModal').modal('hide');

            deal.count -= count;

            var transaction = {
                amountSold: count,
                stock: deal.link,
                price: deal.soldAt,
            }

            $scope.session.player.cash += (deal.count);
            $('#confirmStockBuyModal').modal();
            $('#confirmStockBuyModal').on('hidden.bs.modal', function() {
                $scope.unpause();
                $scope.session.confirming = false;
            });
        }

        $scope.getROR = function(stock) {

            if (!stock) return;

            var numMonths = $scope.session.world.month - stock.boughtDate;
            var startingVal = stock.originalNetCost;
            var currentVal = stock.link.price;

            if (!numMonths) return;

            var res = Calculon.rateOfReturn({
                interestRate: null,
                startingValue: startingVal,
                finalValue: currentVal,
                numMonths: numMonths
            });

            return res.value;
        }

    })
