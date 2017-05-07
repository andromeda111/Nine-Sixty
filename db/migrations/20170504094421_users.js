
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments()
    table.string('username').notNullable()
    table.specificType('hashed_pw', 'char(60)').notNullable()
    table.boolean('initiated').notNullable().default(false)
    table.string('zip').notNullable().default('')
    table.string('sign').notNullable().default('')
    table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
