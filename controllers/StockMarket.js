angular.module("BillionaireGame")
    .controller("StockMarket", function($scope) {


        $scope.openBuyStockModal = function(stock) {

            var deal = {
                type: "BUY",
                date: $scope.session.world.month,
                name: stock.name,
                symbol: stock.symbol,
                link: stock,
                boughtAt: stock.price,
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

            deal.originalNetCost = deal.boughtAt + comission / count;
            deal.count = count;
            deal.comission = comission;
            deal.totalCost = deal.boughtAt * count + comission;
            deal.settled = true;

            for (var i = 0; i < deal.count; i++) {
                var _stock = {};
                _stock.boughtAt = deal.boughtAt;
                _stock.boughtDate = deal.date;
                _stock.originalNetCost = deal.originalNetCost;
                _stock.link = deal.link;
                $scope.session.player.stocks.push(_stock);
            }

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

        $scope.getROR = function(deal) {

            if (!deal) return;

            var numMonths = $scope.session.world.month - deal.date;
            var startingVal = deal.originalNetCost;
            var currentVal = deal.link.price;

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
