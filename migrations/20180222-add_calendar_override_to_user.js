
'use strict';

var models = require('../lib/model/db');

module.exports = {
  up: function (queryInterface, Sequelize) {

    queryInterface.describeTable('Users').then(function(attributes){

      if (attributes.hasOwnProperty('calendar_override')) {
        return 1;
      }

      return queryInterface.addColumn(
        'Users',
        'calendarId',
        {
          type: Sequelize.INTEGER,
        }
      );
    });

  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Users', 'calendar_override');
  }
};
