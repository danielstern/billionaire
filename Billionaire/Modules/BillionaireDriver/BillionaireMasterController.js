angular.module("BillionaireGame.Driver")
.controller("BillionaireMasterController", function($scope, billionaireDriverService) {


    $scope.broadcastMessage = function(message) {
        $scope.worldMessage = message;

        $scope.pause();
        $('#worldMessageModal').modal();
        $('#worldMessageModal').on('hidden.bs.modal', function() {
            $scope.unpause();
        });

    }

    var session = billionaireDriverService.newGame();

    $scope.session = session;

})
