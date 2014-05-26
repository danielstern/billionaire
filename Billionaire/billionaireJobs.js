angular.module("BillionaireGame")
    .service("billionaireJobs", function() {
        var jobs = [{
            name: "Delivery Boy",
            salary: 20000,
            taxRate: 0.18,
            description: "A humble lackey, you cart goods to and fro throughout the city",
            effects: {

            }

        }]

        return jobs;
    })
