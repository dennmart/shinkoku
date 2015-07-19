var React = require('react');

module.exports = React.createClass({
  render: function() {
    return this.buildItem();
  },

  buildItem: function() {
    switch (this.props.type) {
      case 'radical':
        return this.radicalInfo();
      case 'kanji':
        return this.kanjiInfo();
      case 'vocabulary':
        return this.vocabularyInfo();
    };
  },

  radicalInfo: function() {
    var characterDisplay;

    if (this.props.character == null) {
      characterDisplay = (<img src={this.props.image} />);
    } else {
      characterDisplay = this.props.character;
    }

    return (
      <div className={'col-md-4 ' + this.props.type}>
        <div className='character'>{characterDisplay}</div>
        <div className='meaning'>{this.props.meaning}</div>
      </div>
    )
  },

  kanjiInfo: function() {
    return (
      <div className={'col-md-4 ' + this.props.type}>
        <div className='character'>{this.props.character}</div>
        <div className='reading'>{this.props[this.props.important_reading]}</div>
        <div className='meaning'>{this.props.meaning}</div>
      </div>
    )
  },

  vocabularyInfo: function() {
    return (
      <div className={'col-md-4 ' + this.props.type}>
        <div className='character'>{this.props.character}</div>
        <div className='reading'>{this.props.kana}</div>
        <div className='meaning'>{this.props.meaning}</div>
      </div>
    )
  }
});
