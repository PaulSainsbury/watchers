Meteor.methods({
  updateProfile: function(userProfile) {
    var user = Meteor.user();
    Meteor.users.update({
      _id : user._id,
    }, {
      $set : {
        'profile.firstName' : userProfile.firstName,
        'profile.lastName'  : userProfile.lastName,
        'profile.callUrl'   : userProfile.callUrl,
        'profile.chatUrl'   : userProfile.chatUrl
      }
    });
  },
  updateStatus: function(status) {
    var user = Meteor.user();
    Meteor.users.update({
      _id : user._id,
    }, {
      $set : {
        'profile.status' : status
      }
    });

  }
});
