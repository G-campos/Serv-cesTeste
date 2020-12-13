var knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : 'localhost',
      user : 'campos',
      password : '@lpha2019',
      database : 'services_teste'
    }
})
module.exports = knex