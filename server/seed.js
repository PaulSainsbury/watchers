var Fixture = {
  createUsers : function () {
    var billId = Accounts.createUser({
      username: 'bill',
      email: 'paul+bill@digitaltinder.com',
      password: 'bill',
      profile: {
        firstName: 'Bill',
        lastName: 'Billington',
        callUrl: 'skype:billBillington?call',
        chatUrl: 'skype:billBillington?chat'
      }
    });
    var bill = Meteor.users.findOne(billId);

    var aliceId = Accounts.createUser({
      username: 'alice',
      email: 'paul+alice@digitaltinder.com',
      password: 'alice',
      profile: {
        firstName: 'Alice',
        lastName: 'Allerton',
        callUrl: 'skype:aliceAllerton?call',
        chatUrl: 'skype:aliceAllerton?chat'
      }
    });
    var alice = Meteor.users.findOne(aliceId);

    return {
      bill: bill,
      alice: alice
    };
  },
  getUsers : function () {

    var bill = Meteor.users.findOne({ username: 'bill'}),
      alice = Meteor.users.findOne({ username: 'alice'});

    if (bill) {
      return {
        bill: bill,
        alice: alice
      };

    }
    return Fixture.createUsers();
  }
};

if (RemoteWorkers.find().count() === 0) {
  var users = Fixture.getUsers();

  RemoteWorkers.insert({
      username: users.bill.username,
      lastImage: null
  });

  RemoteWorkers.insert({
      username: users.alice.username,
      lastImage: null
  });

}

Meteor.startup(function () {
  Houston.add_collection(Meteor.users);
  Houston.add_collection(Houston._admins);
  RemoteWorkers._ensureIndex({ username: 1 }, { unique: true});
});
