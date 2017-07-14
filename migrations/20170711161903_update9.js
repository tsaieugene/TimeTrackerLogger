
//create facebookID column for user table
exports.up = function(knex, Promise) {
    return knex.schema.table('users', (table) => {
        table.integer('facebookID').notNullable();;
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('users', (table) => {
        table.dropColumn('facebookID');
    });
};
