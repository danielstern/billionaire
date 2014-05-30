angular.module("BillionaireGame.Jobs")
    .service("billionaireJobsDefinitions", function() {
        var jobs = [{
            name: "Delivery Boy",
            salary: 22500,
            taxRate: 0.18,
            requirement: function() {return true},
            description: "A humble lackey, you cart goods to and fro throughout the city",
            effect: null
        },{
            name: "Chef",
            salary: 28000,
            taxRate: 0.20,
            description: "You cook food, it is not a glamorous life, but it is good.",
            technical: "-10% to Expenses.",
            requirement: function(session) {
                return session.player.canCook;
            },
            requirementMessage: "You must be able to cook to be a chef.",
            effect: function(session) {
                session.player.expenses *= 0.85;
            },
            onquit: function(session) {
                session.player.expenses *= 1.15;
            }
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
        },{
            name: "Executive",
            salary: 40000,
            taxRate: 0.26,
            description: "Show me the money!",
            technical: "+10% to Expenses",
            requirement: function(session) {
                if (session.player.collegeEducation) return true;
                return false;
            },
            requirementMessage: "You must have a college education to be an executive.",
            effect: function(session) {
                session.player.expenses *= 1.15;
            },
            onquit: function(session) {
                  session.player.expenses *= 0.85;
            }
        }
        ]

        return jobs;
    })
