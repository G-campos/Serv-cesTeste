const db = require ('knex') ({
    client: 'sqlite3',
    connection: {
      filename: './services_teste.sqlite'
    },
    useNullAsDefault: true
})

module.exports = function (db) {
  app.set('db', db)
  return app
  }