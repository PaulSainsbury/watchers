Template.profileEdit.events({
  'submit' : function(e) {
    e.preventDefault();

    var target = $(e.target),
      firstName = target.find("#firstName").val(),
      lastName = target.find("#lastName").val(),
      callUrl = target.find("#callUrl").val(),
      chatUrl = target.find("#chatUrl").val();

    var userProfile = {
      firstName : firstName,
      lastName  : lastName,
      callUrl   : callUrl,
      chatUrl   : chatUrl
    };

    Meteor.call('updateProfile', userProfile);
  }
});
