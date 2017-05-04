
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {
          id: 1,
          task: 'Task 1 user 1',
          user_id: 1
        },
        {
          id: 2,
          task: 'Task 2 user 1',
          user_id: 1
        },
        {
          id: 3,
          task: 'Task 1 user 2',
          user_id: 2
        },
        {
          id: 4,
          task: 'Task 2 user 2',
          user_id: 2
        }
      ])
    }).then(function () {
      return knex.raw(
          "SELECT setval('tasks', (SELECT MAX (id) FROM tasks))"
      )
    }).catch(function (error) {
      console.error('Oops! tasks - ', error)
    })
}