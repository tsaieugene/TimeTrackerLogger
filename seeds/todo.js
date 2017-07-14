
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  var date = new Date();
  var date1 = new Date(Date.now() - 864e5);   
  return knex('todo').del()
    .then(function () {
      var todos = [{
          title: 'Build a CRUD app',
          date: date.toISOString().substring(0, 10),
          createdBy: 100784047254119
      }, {
          title: 'Wash dishes',
          date: date.toISOString().substring(0, 10),
          createdBy: 100784047254119,
          complete: true
      }, {
          title: 'Go for a run',
          date: date.toISOString().substring(0, 10),
          createdBy: 1
      }, {
          title: 'Build a CRUD app yesterday',
          date: date1.toISOString().substring(0, 10),
          createdBy: 1
      }, {
          title: 'Wash dishes yesterday',
          date: date1.toISOString().substring(0, 10),
          createdBy: 1
      }, {
          title: 'Go for a run yesterday',
          date: date1.toISOString().substring(0, 10),
          createdBy: 100784047254119
      }, {
          title: 'Run yesterday',
          date: date1.toISOString().substring(0, 10),
          createdBy: 10208322281568532
      }, {
          title: 'Wash dishes yesterday',
          date: date1.toISOString().substring(0, 10),
          createdBy: 10208322281568532
      }];
      // Inserts seed entries
      return knex('todo').insert(todos);
    });
};
