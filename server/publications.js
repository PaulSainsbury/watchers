Meteor.publish('allRemoteWorkers', function() {
  return RemoteWorkers.find();
});

Meteor.publish('singleRemoteWorker', function(id) {
  return RemoteWorkers.find(id);
});

Meteor.publish('userProfiles', function() {
  return Meteor.users.find({}, {
    fields: {
      _id : 1,
      username: 1,
      'profile.firstName' : 1,
      'profile.callUrl' : 1,
      'profile.chatUrl' : 1
    }
  });
});
