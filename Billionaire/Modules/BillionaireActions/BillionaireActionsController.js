angular.module("BillionaireGame.Actions")   
    .controller("ActionsController", function($scope,billionaireDriverService) {

        $scope.openConfirmAction = function(action) {
            console.log("Confirming ", action);

            $scope.currentActionHappening = action;

            billionaireDriverService.pause();
            $('#actionsModal').modal();
            $('#actionsModal').on('hidden.bs.modal', function() {
                billionaireDriverService.unpause();
            });

        }

        $scope.confirmTakeAction = function(action) {
            console.log("Confirming", action);

            action.timeRemaining = action.time;

            var session = $scope.session;

            $('#actionsModal').modal('hide');

            session.player.cash -= action.cost;

            session.player.actionsTaken.push(action);
            action.purchased = true;

            var done = false;
            var monthStarted = $scope.session.world.month;

            billionaireDriverService.onmonth(function(session) {

                if (action.completed) return;
                action.timeRemaining--;
                if (!action.timeRemaining) {
                    action.effect($scope.session);
                    action.completed = true;
                }
            })

        }
    })
