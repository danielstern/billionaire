angular.module("BillionaireGame.Driver")
.controller("BillionaireMasterController", function($scope, billionaireDriverService,billionaireEventsService) {

    $scope.broadcastMessage = function(message) {
        $scope.worldMessage = message;

        billionaireDriverService.pause();
        $('#worldMessageModal').modal();
        $('#worldMessageModal').on('hidden.bs.modal', function() {
            billionaireDriverService.unpause();
        });

    }

    var session = billionaireDriverService.newGame();

    var scenario = {
        duration: 600,
        minimum: -10000,
        required: 1000000
    }

    session.scenario = scenario;

    $scope.session = session;

})
