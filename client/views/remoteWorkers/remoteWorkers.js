/* ---------------------------------------------------- +/

## Items ##

Code related to the items template

/+ ---------------------------------------------------- */

Template.remoteWorkers.created = function () {
  //
};

Template.remoteWorkers.helpers({
  formatDate : function (date) {
    if (date)
      return moment(date).fromNow();
    return 'No Date';
  },
  formatName : function() {
    var user = Meteor.users.findOne({ username : this.username});
    return user.profile.firstName || this.username;
  }
});

Template.remoteWorkers.rendered = function () {
  var width = 300;
  var height = 150;
  var self = this;

  self.video = document.querySelector('video');
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');

  self.localMediaStream = null;
  navigator.getUserMedia = navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia;

  // Start Video
  var vgaConstraints = {
    video: {
      mandatory: {
        maxWidth: width,
        maxHeight: height
      }
    }
  };

  canvas.width = width;
  canvas.height = height;


  navigator.getUserMedia(vgaConstraints, function(stream) {
    self.video.src = window.URL.createObjectURL(stream);
    self.localMediaStream = stream;
    self.video.height = 1;
    self.video.width = 1;
  }, function() {
      console.log('Error loading stream');
  });

  self.timerID = null;
  self.startTimer = function () {
    var btnStartTimer = document.querySelector('#btnStartTimer');

    if (self.timerID) {
      btnStartTimer.innerHTML = "Start Timer";
      window.clearInterval(self.timerID);
      self.timerID = null;
    } else {
      self.snapshot();
      self.timerID = window.setInterval(self.snapshot, 10000);
      btnStartTimer.innerHTML = "Stop Timer";
    }
  };

  self.snapshot = function() {
    if (self.localMediaStream) {
      ctx.drawImage(self.video, 0, 0, width, height);
      // Other browsers will fall back to image/png.
      var imageString = canvas.toDataURL('image/png');
      document.querySelector('#myImage').src = imageString;

      Meteor.call('updateRemoteWorkerImage', Meteor.user().username, imageString, function(error, result){
        console.log('Updated');
      });
    }
  };

};

Template.remoteWorkers.destroyed = function () {
  var self = this;
  self.video.pause();
  self.localMediaStream.stop(); // Doesn't do anything in Chrome.
  window.clearInterval(self.timerID);
  self.timerID = null;
};

Template.remoteWorkers.events({
  'click #btnTakeSnapshot' : function(e, item) {
    e.preventDefault();
    Template.instance().snapshot();
  },
  'click #btnStartTimer' : function (e, item){
    e.preventDefault();
    Template.instance().startTimer();
  },
  'click #btnJoin' : function(e, item) {
    e.preventDefault();
    Meteor.call('createRemoteWorker', function(error, result) {
      console.log('updated');
    });
  }
});
