var React = require('react');
var capitalize = require('underscore.string/capitalize');

module.exports = React.createClass({
  radicalInfo: function() {
    var characterDisplay;

    if (this.props.character == null) {
      characterDisplay = (<img src={this.props.image} />);
    } else {
      characterDisplay = this.props.character;
    }

    return (
      <div className='type-info'>
        <div className={'character ' + this.props.type}>{characterDisplay}</div>
        <div className='meaning'>{capitalize(this.props.meaning.replace('-', ' '))}</div>
      </div>
    )
  },

  kanjiInfo: function() {
    return (
      <div className='type-info'>
        <div className={'character ' + this.props.type}>{this.props.character}</div>
        <div className='reading'>{this.props[this.props.important_reading]}</div>
        <div className='meaning'>{capitalize(this.props.meaning)}</div>
      </div>
    )
  },

  vocabularyInfo: function() {
    return (
      <div className='type-info'>
        <div className={'character ' + this.props.type}>{this.props.character}</div>
        <div className='reading'>{this.props.kana}</div>
        <div className='meaning'>{capitalize(this.props.meaning)}</div>
      </div>
    )
  },

  characterInfo: function() {
    switch (this.props.type) {
      case 'radical':
        return this.radicalInfo();
      case 'kanji':
        return this.kanjiInfo();
      case 'vocabulary':
        return this.vocabularyInfo();
    };
  },

  linkToWaniKani: function() {
    if (this.props.type == 'radical') {
      var link = 'https://www.wanikani.com/radicals/' + this.props.meaning;
    } else {
      var link = 'https://www.wanikani.com/' + this.props.type + '/' + this.props.character;
    }

    return (
      <a href={link} target='_blank'>
        View more information on WaniKani
      </a>
    )
  },

  render: function() {
    return (
      <div className='item-modal'>
        {this.characterInfo()}

        <div className='level'>Level {this.props.level}</div>
        <div className='percentage'>{this.props.percentage}% Correct</div>
        <div className='wanikani-link'>{this.linkToWaniKani()}</div>
      </div>
    )
  }
});
