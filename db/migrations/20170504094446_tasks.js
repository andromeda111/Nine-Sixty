
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tasks', (table) => {
  table.increments()
  table.text('task').notNullable()
  table.boolean('checked').notNullable().default(false)
  table.integer('user_id').notNullable()
  table.timestamps(true, true)
})
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tasks')
};
