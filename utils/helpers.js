module.exports = {
  format_date: date => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
      date
    ).getFullYear()}`;
  },
  format_url: url => {
    return url
      .replace('http://', '')
      .replace('https://', '')
      .replace('www.', '')
      .split('/')[0]
      .split('?')[0];
  },
  format_plural: (word, amount) => {
    if (amount !== 1) {
      return `${word}s`;
    }

    return word;
  },
  compare: function(a, operator, b, options) {
    /*eslint eqeqeq: 0*/

    if (arguments.length < 4) {
      throw new Error('handlebars Helper {{compare}} expects 4 arguments');
    }

    var result;
    switch (operator) {
      case '===':
        result = a === b;
        break;
      case '!=':
        result = a != b;
        break;
      case '!==':
        result = a !== b;
        break;
      case '<':
        result = a < b;
        break;
      case '>':
        result = a > b;
        break;
      case '<=':
        result = a <= b;
        break;
      case '>=':
        result = a >= b;
        break;
      case 'typeof':
        result = typeof a === b;
        break;
      default: {
        throw new Error('helper {{compare}}: invalid operator: `' + operator + '`');
      }
    }

    return util.value(result, this, options);
  }
};
