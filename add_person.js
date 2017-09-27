const knex = require("knex");





knex.select('first_name').from('famous_people')
.where('id', '>', 0)
.orWhere('id', '<', 3)
.asCallback(function(err, rows) {
  if (err) return console.error(err);
  knex.select('id').from('famous_people')
    .whereIn('nickname', _.pluck(rows, 'name'))
    .asCallback(function(err, rows) {
      if (err) return console.error(err);
      console.log(rows);
    });
});



knex.destroy();