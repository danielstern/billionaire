angular.module("BillionaireGame.Driver")
.controller("BillionaireMasterController", function($scope, 
    billionaireDriverService,
    billionaireEventsService,
    billionaireWorldMessageService) {


    var session = billionaireDriverService.newGame();

    var scenario = {
        duration: 600,
        minimum: -10000,
        required: 1000000
    }

    session.scenario = scenario;

    $scope.session = session;

})
