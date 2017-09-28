exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('milestones', function (table) {
    // now go modify the variable table - which corresponds to milestones
      table.integer('famous_people_id').unsigned().index().references('id').inTable('famous_people')
      // creates famous_people_id as foreign key in table milestones (could put reference('famous_people.id'));
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('milestones', function (table) {
      table.dropForeign('famous_people_id');
      table.dropColumn('famous_people_id');
    })

  ]);
};

