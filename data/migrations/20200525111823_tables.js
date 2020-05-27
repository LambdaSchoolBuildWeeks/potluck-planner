
exports.up = function(knex) {
  return knex.schema
  .createTable("users", users => {
      users.increments()
      users.string("name").notNullable().index()
      users.string("username").notNullable().unique().index()
      users.string("password").notNullable()
  })
  .createTable("events", events => {
      events.increments()
      events.integer("userID")
        .unsigned()
        .notNullable()
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT")
      events.string("title").notNullable()
      events.string("description")
      events.string("month").notNullable()
      events.integer("day").notNullable()
      events.integer("year").notNullable()
      events.integer("time_From").notNullable()
      events.integer("time_To").notNullable()
      events.string("location").notNullable()
  })
  .createTable("friends", friends => {
      friends.increments()
      friends.integer("userID")
        .unsigned()
        .notNullable()
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT")
      friends.boolean("RSVP").defaultTo(false)
  })
  .createTable("events_friends", events_friends => {
      events_friends.increments()
      events_friends.integer("eventsID")
        .unsigned()
        .notNullable()
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT")
      events_friends.integer("friendsID")
        .unsigned()
        .notNullable()
        .references("friends.id")
        .onUpdate("CASCADE")
        .onDelete("RESTRICT")
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists("events_friends")
  .dropTableIfExists("friends")
  .dropTableIfExists("events")
  .dropTableIfExists("users")
};
