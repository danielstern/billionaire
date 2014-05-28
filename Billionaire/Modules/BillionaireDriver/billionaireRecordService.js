angular.module("BillionaireGame.Driver")
 
.service("billionaireRecordService",function(billionaireDriverService){


    billionaireDriverService.onmonth(function(session) {

        var snapshot = _.clone(session);
        snapshot.monthEnding = {
            income: session.player.incomeThisMonth,
            taxes: session.player.taxesThisMonth
        }

        delete snapshot.record;

        session.record.push(snapshot);

    })

})