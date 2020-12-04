const sqlite3 = require('sqlite3').verbose();

// open database in memory
const db = new sqlite3.Database('./database/services_teste.sqlite', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Conectado ao banco de dados em memoria');
});
