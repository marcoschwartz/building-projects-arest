// Events
Template.home.events({

    'click #on': function() {
        Meteor.call('digitalWrite', 1, 7, 1);
    },
    'click #off': function() {
        Meteor.call('digitalWrite', 1, 7, 0);
    }

});

// Rendered
Template.home.rendered = function() {

    // Set pin
    Meteor.call('pinMode', 1, 7, 'o');

    // Refresh temperature & humidity
    Meteor.call('getVariable', 1, 'temperature', function(err, data) {
        console.log(data);
        $('#temperature').text(data.temperature);
    });

    Meteor.call('getVariable', 1, 'humidity', function(err, data) {
        $('#humidity').text(data.humidity);
    });

}
