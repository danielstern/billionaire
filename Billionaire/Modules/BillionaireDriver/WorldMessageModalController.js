angular.module("BillionaireGame.Driver")
.controller("WorldMessageModalController",function($scope, 
	billionaireWorldMessageService,
	billionaireDriverService) {
    billionaireWorldMessageService.onbroadcastmessage(function(message) {
        $scope.worldMessage = message;

        billionaireDriverService.pause();
        
        $('#worldMessageModal').modal();
        $('#worldMessageModal').on('hidden.bs.modal', function() {
            billionaireDriverService.unpause();
        });

    })

  });