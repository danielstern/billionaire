angular.module("BillionaireGame.Actions")   
    .controller("BillionaireActionsController", function($scope,billionaireDriverService) {

        $scope.canTakeAction = true;
        
        $scope.openConfirmAction = function(action) {
            
            $scope.currentActionHappening = action;

            billionaireDriverService.pause();
            $('#actionsModal').modal();
            $('#actionsModal').on('hidden.bs.modal', function() {
                billionaireDriverService.unpause();
            });

        }

        $scope.confirmTakeAction = function(action) {
            
            action.timeRemaining = action.time;

            var session = $scope.session;

            $('#actionsModal').modal('hide');

            session.player.cash -= action.cost;

            session.player.actionsTaken.push(action);
            action.purchased = true;

            var done = false;
            var monthStarted = $scope.session.world.month;

            $scope.canTakeAction = false;

            billionaireDriverService.onmonth(function(session) {

                if (action.completed) return;
                action.timeRemaining--;
                if (!action.timeRemaining) {
                    action.effect($scope.session);
                    action.completed = true;
                    $scope.canTakeAction = true;
                }
            })

        }
    })
