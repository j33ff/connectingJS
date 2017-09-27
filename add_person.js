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

const firstName = process.argv[2];
const lastName = process.argv[3];
const dob = process.argv[4];

knex('famous_people').insert({
  first_name: firstName,
  last_name: lastName,
  birthdate: dob
})
.returning('id')
.then((id)=>{
  console.log("new record inserted "+id);
});

// ([{first_name: firstName},{last_name: lastName}, {birthdate: dob}]).into('famous_people');

knex.destroy();