/* ---------------------------------------------------- +/

## Fixtures ##

Fill in the app with dummy data if database is empty.

/+ ---------------------------------------------------- */

// Fixture data
if (Items.find().count() === 0) {

  Items.insert({
    title: "Eridanus",
    body: "Eridanus is a constellation. It is represented as a river; its name is the Ancient Greek name for the Po River."
  });

  Items.insert({
    title: "Cassiopeia",
    body: "Cassiopeia is a constellation in the northern sky, named after the vain queen Cassiopeia in Greek mythology, who boasted about her unrivalled beauty."
  });

  Items.insert({
    title: "Scorpius",
    body: "Scorpius, sometimes known as Scorpio, is one of the constellations of the zodiac."
  });
}

var Fixture = {
  createUsers : function () {
    var billId = Accounts.createUser({
      username: 'bill',
      email: 'paul+bill@digitaltinder.com',
      password: 'bill',
      profile: { name: 'Bill Billington'}
    });
    var bill = Meteor.users.findOne(billId);

    var aliceId = Accounts.createUser({
      username: 'alice',
      email: 'paul+alice@digitaltinder.com',
      password: 'alice',
      profile: { name: 'Alice Allerton'}
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
      callUrl: 'skype:billBillington?call',
      chatUrl: 'skype:billBillington?chat',
      lastImage: null
  });

  RemoteWorkers.insert({
      username: users.alice.username,
      callUrl: 'skype:aliceAllerton?call',
      chatUrl: 'skype:aliceAllerton?chat',
      lastImage: null
  });

}

Meteor.startup(function () {
  Houston.add_collection(Meteor.users);
  Houston.add_collection(Houston._admins);
  RemoteWorkers._ensureIndex({ username: 1 }, { unique: true});
});
