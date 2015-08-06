var React = require('react');

module.exports = {
  radicalCharacterDisplay: function(item) {
    if (item.character == null) {
      return <img src={item.image} />;
    } else {
      return item.character;
    }
  },

  importantMeaning: function(item) {
    return item[item.important_reading];
  },

  linkToWaniKani: function(item) {
    if (item.type == 'radical') {
      var link = 'https://www.wanikani.com/radicals/' + item.meaning;
    } else {
      var link = 'https://www.wanikani.com/' + item.type + '/' + item.character;
    }

    return (
      <a href={link} target='_blank'>
        View more information on WaniKani
      </a>
    )
  }
}
