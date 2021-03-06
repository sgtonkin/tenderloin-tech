var bookshelf = require('./db/db');

// Define bookshelf models

var Admin = bookshelf.Model.extend({
  tableName: 'admins',
  events: function() {
    return this.hasMany(Event);
  }
});

var Participant = bookshelf.Model.extend({
  tableName: 'participants',
  events: function() {
    return this.belongsToMany(Event).through(EventParticipant);
  },
  status: function() {
    return this.hasMany(EventParticipant);
  }
});

var Event = bookshelf.Model.extend({
  tableName: 'events',
  participants: function() {
    return this.belongsToMany(Participant)
      .through(EventParticipant)
      .withPivot(['status', 'checkin_time']);
  },
  admin: function() {
    return this.belongsTo(Admin);
  },
  status: function() {
    return this.hasMany(EventParticipant);
  }
});

var EventParticipant = bookshelf.Model.extend({
  tableName: 'events_participants',
  participant: function() {
    return this.belongsTo(Participant);
  },
  event: function() {
    return this.belongsTo(Event);
  }
});

var Beacon = bookshelf.Model.extend({
  tableName: 'beacons',
  events: function() {
    return this.belongsToMany(Event).through(beacons_events);
  }
});

var BeaconEvent = bookshelf.Model.extend({
  tableName: 'beacons_events',
  beacon: function() {
    return this.belongsTo(Beacon);
  },
  event: function() {
    return this.belongsTo(Event);
  }
});

// Define bookshelf collections

var EventsParticipants = bookshelf.Collection.extend({
  model: EventParticipant
});

var Events = bookshelf.Collection.extend({
  model: Event
});

var Beacons = bookshelf.Collection.extend({
  model: Beacon
});

var BeaconsEvents = bookshelf.Collection.extend({
  model: BeaconEvent
});

var Participants = bookshelf.Collection.extend({
  model: Participant
});

module.exports = {
  Admin: Admin,
  Participant: Participant,
  Participants: Participants,
  Event: Event,
  Events: Events,
  EventParticipant: EventParticipant,
  EventsParticipants: EventsParticipants,
  Beacon: Beacon,
  Beacons: Beacons,
  BeaconsEvent: BeaconEvent,
  BeaconsEvents: BeaconsEvents
};
