if (Meteor.isServer) {
  Meteor.startup(function () {

    // Add device
    aREST.addDevice('http', '192.168.0.104');

  });
}

if (Meteor.isClient) {

  // Main route
  Router.route('/', {name: 'home'});

  // Events
  Template.home.events({

    'click #on': function() {
      Meteor.call('digitalWrite', "34f5eQ", 7, 1);
    },
    'click #off': function() {
      Meteor.call('digitalWrite', "34f5eQ", 7, 0);
    }

  });

}
