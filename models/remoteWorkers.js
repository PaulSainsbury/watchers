RemoteWorkers = new Meteor.Collection('remoteWorkers');

// Allow/Deny
RemoteWorkers.allow({
  insert: function(userId, doc){
    return can.createRemoteWorker(userId);
  },
  update:  function(userId, doc, fieldNames, modifier){
    return can.editRemoteWorker(userId, doc);
  },
  remove:  function(userId, doc){
    return can.removeRemoteWorker(userId, doc);
  }
});

// Methods
Meteor.methods({
  createRemoteWorker: function(){
    if(can.createRemoteWorker(Meteor.user()._id)) {
      var user = Meteor.user();
      RemoteWorkers.insert({ username: user.username });
    }
  },
  removeRemoteWorker: function(item){
    if(can.removeRemoteWorker(Meteor.user(), item)){
      RemoteWorkers.remove(item._id);
    }else{
      throw new Meteor.Error(403, 'You do not have the rights to delete this item.');
    }
  },
  updateRemoteWorkerImage : function (userName, imageString) {
    RemoteWorkers.update({ username : userName }, {
      $set : {
        lastImage : imageString,
        imageDate: new Date()
      }
    });
  }
});
