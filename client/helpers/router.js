/* ---------------------------------------------------- +/

## Client Router ##

Client-side Router.

/+ ---------------------------------------------------- */

// Config

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
});

// Filters

var filters = {

  myFilter: function () {
    // do something
  },

  isLoggedIn: function() {
    if (!(Meteor.loggingIn() || Meteor.user())) {
      flash('You must be logged in to access that page', 'warning');
      this.render('homepage');
    } else {
      this.next();
    }
  }

};

Router.onBeforeAction(filters.myFilter, {only: ['items']});
Router.onBeforeAction(filters.isLoggedIn, {only: ['remoteWorkers']});

// Routes

Router.map(function() {

  // RemoteWorkers
  this.route('remoteWorkers', {
    waitOn: function () {
      return Meteor.subscribe('allRemoteWorkers');
    },
    data: function () {
      var currentUser = Meteor.user();
      if (currentUser) {
        var value = {
          remoteWorkersButMe: RemoteWorkers.find({ username : { $ne : currentUser.username }}),
          me : RemoteWorkers.findOne({ username: currentUser.username })
        };
        //console.log(value);
        return value;
      } else {
        return {
          remoteWorkersButMe: null,
          me : null
        };

      }
    }
  });

  // Pages
  this.route('homepage', {
    path: '/'
  });

  this.route('content');

});
