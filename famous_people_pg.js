const pg = require("pg");
const settings = require("./settings"); // settings.json


const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

function printLine(person) {
  const birthdate = person.birthdate;
  // console.log('type of birthdate:', person.birthdate instanceof Date);

  console.log('- ' + person.id + ': ' + person.first_name + ' ' + person.last_name + ', born ' + person.birthdate);
  // return first_name, last_name, 'born' + birthdate;
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1;", [process.argv[2]], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    result.rows.forEach(printLine);
    // console.log(result.rows); //output: 1
    client.end();
  });
});





