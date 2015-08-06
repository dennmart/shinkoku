var React = require('react');
var capitalize = require('underscore.string/capitalize');
var WaniKaniItemMixin = require('./mixins/wanikani_item_mixin');

module.exports = React.createClass({
  mixins: [WaniKaniItemMixin],

  radicalInfo: function() {
    return (
      <div className='type-info'>
        <div className={'character ' + this.props.type}>{this.radicalCharacterDisplay(this.props)}</div>
        <div className='meaning'>{capitalize(this.props.meaning.replace('-', ' '))}</div>
      </div>
    )
  },

  kanjiInfo: function() {
    return (
      <div className='type-info'>
        <div className={'character ' + this.props.type}>{this.props.character}</div>
        <div className='reading'>{this.importantMeaning(this.props)}</div>
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

  render: function() {
    return (
      <div className='item-modal'>
        {this.characterInfo()}
        <div className='level'>Level {this.props.level}</div>
        <div className='percentage'>{this.props.percentage}% Correct</div>
        <div className='wanikani-link'>{this.linkToWaniKani(this.props)}</div>
      </div>
    )
  }
});
