angular.module("BillionaireGame.Loans")
    .controller("BillionaireLoansController", function($scope,billionaireDriverService) {

        $scope.parseFloat = parseFloat;

        $scope.openLoanModal = function(loan) {
            var player = $scope.session.player;
            var availableCredit = loan.getAvailableCredit($scope.session);

            $scope.loanOffer = _.clone(loan);
            $scope.loanOffer.maxCredit = availableCredit;
            $scope.loanOffer.amountRequested = $scope.loanOffer.getAvailableCredit($scope.session).toFixed(2);

            billionaireDriverService.pause();
            $('#takeLoanModal').modal();
            $('#takeLoanModal').on('hidden.bs.modal', function() {
                billionaireDriverService.unpause();
            });
        }

        $scope.openRepayLoanModal = function(loan) {

            $scope.loanToBeRepayed = loan;
            $scope.loanToBeRepayed.amountToRepay = $scope.session.player.cash.toFixed(2);
            if ($scope.session.player.cash.toFixed(2) > $scope.loanToBeRepayed.balance) {
                $scope.loanToBeRepayed.amountToRepay = $scope.loanToBeRepayed.balance;
            }

            billionaireDriverService.pause();
            $('#repayLoanModal').modal();
            $('#repayLoanModal').on('hidden.bs.modal', function() {
                billionaireDriverService.unpause();
            });

        }

        $scope.confirmRepayLoan = function(loan) {

            var player = $scope.session.player;

            player.cash -= loan.amountToRepay;
            loan.balance -= loan.amountToRepay;

            if (loan.balance < 1) {
                player.loans = _.without(player.loans, loan);
            }

            $('#repayLoanModal').modal('hide');

        }

        $scope.confirmTakeLoan = function(loan) {
            console.log("Confirm take loan:", loan);
            var session = $scope.session;

            var player = $scope.session.player;
            var note = {
                name: loan.name,
                balance: parseFloat(loan.amountRequested),
                interestRate: loan.interestRate,
                date: session.world.month,
                totalPrincipalPaid: 0,
                totalInterestPaid: 0
            }

            billionaireDriverService.onmonth(function(session){
                player.cash -= note.balance * note.interestRate / 12;
            })

            player.cash += note.balance;
            player.loans.push(note);
            $('#takeLoanModal').modal('hide');

        }

    })
