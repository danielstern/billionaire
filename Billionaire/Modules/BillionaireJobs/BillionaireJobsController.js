angular.module("BillionaireGame.Jobs")
    .controller("BillionaireJobsController", function($scope, billionaireDriverService) {

        billionaireDriverService.onmonth(function(session){
            
        })

        $scope.openConfirmJob = function(job) {
            $scope.prospectiveJob = job;

            billionaireDriverService.pause();
            $('#takeJobModal').modal();
            $('#takeJobModal').on('hidden.bs.modal', function() {
                billionaireDriverService.unpause();
            });

        }

        $scope.confirmTakeJob = function(job) {
            var player = $scope.session.player;
            if (player.job.onquit) player.job.onquit(session);
            player.job = job;
            if (job.effect) job.effect(session);
            $('#takeJobModal').modal('hide');
        }


    })
