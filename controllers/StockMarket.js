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

        $rootScope.consolidateStocks = function() {

            var consolidated = [];

            var stocks = _.clone($scope.session.player.stocks);

            var holdings = _.groupBy(stocks,function(stock){
                return JSON.stringify({
                    symbol: stock.link.symbol,
                    boughtDate: stock.boughtDate,
                    originalNetCost: stock.originalNetCost,
                });
            });

            _.each(holdings,function(holding){
                holding.link = holding[0].link;
                consolidated.push(holding);
            })

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

        $scope.openSellStockModal = function(holding) {

            $scope.deal = holding;
            holding.amountToSell = holding.length;
            //var scope = $scope;
            //debugger;

            $('#stockSellModal').modal();
            $('#stockSellModal').on('hidden.bs.modal', function() {
                if (!$scope.session.confirming) $scope.unpause();
            });


            $scope.pause();
        }


        $scope.confirmSellStock = function(holding, count) {

            $scope.pause();

            console.log("Selling stock",holding);
           // debugger;

            holding.settled = false;

            for (var i = 0; i < count; i++) {
               var stock = _.find($scope.session.player.stocks,function(stock){
                    if (stock.originalNetCost == holding[0].originalNetCost
                        && stock.boughtDate == holding[0].boughtDate
                        && stock.link == holding[0].link) {
                          return true;
                    }
               });

               $scope.session.player.stocks = _.without($scope.session.player.stocks, stock);
            }

            $scope.session.player.cash += (count * holding[0].link.price);

            $('#stockSellModal').modal('hide');
            if (!$scope.session.confirming) $scope.unpause();
         
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
