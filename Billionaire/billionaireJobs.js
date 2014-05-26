angular.module("BillionaireGame")
    .service("billionaireJobs", function() {
        var jobs = [{
            name: "Delivery Boy",
            salary: 22500,
            taxRate: 0.18,
            requirement: function() {return true},
            description: "A humble lackey, you cart goods to and fro throughout the city",
            effect: null
        },{
            name: "Accountant",
            salary: 30000,
            taxRate: 0.21,
            description: "The unsung hero of the corporate world, you toil away in a dank basement with some foregotten adding machine.",
            technical: "-5% to Capital Gains Tax. Requires college education.",
            requirement: function(session) {
                if (session.player.collegeEducation) return true;
                return false;
            },
            requirementMessage: "You must have a college education to be an accountant.",
            effect: function(session) {
                session.market.capitalGainsTax -= 0.05;
            },
            onquit: function(session) {
                session.market.capitalGainsTax += 0.05;
            }
        }]

        return jobs;
    })
