
"use strict";

var moment = require('moment');

var as_date_formatted = function(date_str, format, options) {

  // By default we considering that we are in UTC time
  var utc_offset = 0;
  var user;

  if ( options.hasOwnProperty('data')
    && options.data.hasOwnProperty('root')
    && options.data.root.hasOwnProperty('logged_user')
    && options.data.root.logged_user
  ) {
    user = options.data.root.logged_user;
  } else if (options.hasOwnProperty('data')
    && options.data.hasOwnProperty('root')
    && options.data.root.hasOwnProperty('user')
    && options.data.root.user
  ) {
    user = options.data.root.user;
  }

  if ( user && user.hasOwnProperty('company') ) {
    utc_offset = user.company.get_utc_offset();

    if ( ! format ) {
      format = user.company.get_default_date_format();
    }
  }

  if (! date_str) return '';

  // Failed to find out what format to use, default to the hard coded one
  if ( ! format ) {
    format = 'YYYY-MM-DD';
  }

  return moment(date_str).utcOffset(utc_offset).format(format);
}

module.exports = function(){
  return {
    // Handlebars does not allow to have conditions in IF, here is
    // workaround picked from here: http://stackoverflow.com/questions/8853396/logical-operator-in-a-handlebars-js-if-conditional
    if_equal :  function(v1, v2, options){
      if(v1 === v2) {
        return options.fn(this);
      }
      return options.inverse(this);
    },

    // Given string with UTC date return string with local date formated in default manner
    as_date : function(date_string, options) {

      return as_date_formatted(date_string, undefined, options);
    },

    as_datetime : function (date_str, options) {
      return as_date_formatted(date_str, 'YYYY-MM-DD HH:mm:ss', options);
    },

    // Given string with UTC date and string with moment.js format return string with local date
    as_date_formatted : as_date_formatted,


  };
};
