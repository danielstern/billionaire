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

    $scope.session = session;

})
