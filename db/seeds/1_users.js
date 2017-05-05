
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1, username: 'andromeda111', hashed_pw: '$2a$12$mbwCC.IudRr2ac0Kj53ZTOo9Nyd5kgHBYrvvHFWGA40LI0ided1Xe'
        },
        {
          id: 2, username: 'borgcube636', hashed_pw: '$2a$12$skceB.Cmnz2.bKdmUImBKum0Z1qN0YyCc7QfKvEg6Qd5Qc8t.lLgm'
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
