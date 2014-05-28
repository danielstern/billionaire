angular.module("BillionaireGame.Jobs")
    .controller("BillionareJobsController", function($scope) {

        $scope.openConfirmJob = function(job) {
            $scope.prospectiveJob = job;

            $scope.pause();
            $('#takeJobModal').modal();
            $('#takeJobModal').on('hidden.bs.modal', function() {
                $scope.unpause();
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
