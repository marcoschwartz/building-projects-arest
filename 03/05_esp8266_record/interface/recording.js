if (Meteor.isServer) {
  Meteor.startup(function () {
    aREST.addDevice('http', '10.5.113.180');
  });
}

if (Meteor.isClient) {

  // Main route
  Router.route('/', {name: 'home'});

  Template.home.helpers({

    events: function() {
      return Events.find({}, {sort: {timestamp: -1}});
    }

  });

  // Events
  Template.event.helpers({

    formatDate: function() {
      return moment(this.timestamp).fromNow();
    }

  });

}
