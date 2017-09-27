const settings = require("./settings");
const knex = require('knex')({
  client: 'pg',
  connection: {
    user   : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
    // password: '...'

  }
});



function printLine(person) {
  const birthdate = person.birthdate;
  // console.log('type of birthdate:', person.birthdate instanceof Date);

  console.log('- ' + person.id + ': ' + person.first_name + ' ' + person.last_name + ', born ' + person.birthdate);
  // return first_name, last_name, 'born' + birthdate;
}

var input = process.argv[2];

knex.select('*').from('famous_people').where('first_name', input).orWhere('last_name', input).asCallback( (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    result.forEach(printLine);
    // console.log(result.rows); //output: 1

  });

