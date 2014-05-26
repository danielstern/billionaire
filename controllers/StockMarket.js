angular.module("BillionaireGame")
    .controller("StockMarket", function($scope) {


        $scope.openBuyStockModal = function(stock) {

            var deal = {
                date: $scope.session.world.month,
                name: stock.name,
                symbol: stock.symbol,
                link: stock,
                boughtAt: stock.price,
                count: 10,
                comission: $scope.session.player.comission,
            }

            $scope.deal = deal;

            $('#stockBuyModal').modal();
              $('#stockBuyModal').on('hidden.bs.modal', function() {
                if (!$scope.session.confirming) $scope.unpause();
            });

            $scope.pause();
        }

        $scope.openSellStockModal = function(deal) {

            console.log("SEll stock modal.")

            $scope.deal = _.clone(deal);
            $scope.deal.sharesAvailable = deal.count;

            $('#stockSellModal').modal();
            $('#stockSellModal').on('hidden.bs.modal', function() {
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

            $scope.session.player.stocks.push(deal);

            $scope.session.player.cash -= (deal.totalCost);
            $('#confirmStockBuyModal').modal();
            $('#confirmStockBuyModal').on('hidden.bs.modal', function() {
                $scope.unpause();
                $scope.session.confirming = false;
            });
        }

        $scope.confirmSellStock = function(deal, count) {

            throw new error("To do!");


            $scope.pause();
            $scope.session.confirming = true;
            $('#stockBuyModal').modal('hide');

            deal.amountSold = deal.amountSold || 0;
            deal.amountSold += count;
            deal.count -= count;

            //$scope.session.player.cash += (deal.count);
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
