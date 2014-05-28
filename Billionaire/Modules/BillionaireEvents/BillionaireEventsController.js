angular.module("BillionaireGame.Events")
    .controller('BillionaireEventsController', function($scope,
        billionaireEventsService, billionaireDriverService ) {
        billionaireEventsService.onevent(function(eventNotice) {

            $scope.currentEventHappening = eventNotice;
            billionaireDriverService.pause();
            $('#eventModal').modal();
            $('#eventModal').on('hidden.bs.modal', function() {
                billionaireDriverService.unpause();
            });

        })

    })
