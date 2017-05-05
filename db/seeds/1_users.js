
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1, username: 'andromeda111', hashed_pw: 'asdf'
        },
        {
          id: 2, username: 'borgcube636', hashed_pw: 'borg'
        }
      ])
    }).then(function () {
      return knex.raw(
          "SELECT setval('users_id_seq', (SELECT MAX (id) FROM users))"
      )
    }).catch(function (error) {
      console.error('Oops! users - ', error)
    })
}
