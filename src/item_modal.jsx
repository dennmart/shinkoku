import React from 'react';
import capitalize from 'underscore.string/capitalize';

class ItemModal extends React.Component {
  radicalInfo() {
    return (
      <div className='type-info'>
        <div className={'character ' + this.props.type}>{this.radicalCharacterDisplay(this.props)}</div>
        <div className='meaning'>{capitalize(this.props.meaning.replace('-', ' '))}</div>
      </div>
    )
  }

  kanjiInfo() {
    return (
      <div className='type-info'>
        <div className={'character ' + this.props.type}>{this.props.character}</div>
        <div className='reading'>{this.importantMeaning(this.props)}</div>
        <div className='meaning'>{capitalize(this.props.meaning)}</div>
      </div>
    )
  }

  vocabularyInfo() {
    return (
      <div className='type-info'>
        <div className={'character ' + this.props.type}>{this.props.character}</div>
        <div className='reading'>{this.props.kana}</div>
        <div className='meaning'>{capitalize(this.props.meaning)}</div>
      </div>
    )
  }

  characterInfo() {
    switch (this.props.type) {
      case 'radical':
        return this.radicalInfo();
      case 'kanji':
        return this.kanjiInfo();
      case 'vocabulary':
        return this.vocabularyInfo();
    };
  }

  radicalCharacterDisplay(item) {
    if (item.character == null) {
      return <img src={item.image} />;
    } else {
      return item.character;
    }
  }

  importantMeaning(item) {
    return item[item.important_reading];
  }

  linkToWaniKani(item) {
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

  render() {
    return (
      <div className='item-modal'>
        {this.characterInfo()}
        <div className='level'>Level {this.props.level}</div>
        <div className='percentage'>{this.props.percentage}% Correct</div>
        <div className='wanikani-link'>{this.linkToWaniKani(this.props)}</div>
      </div>
    )
  }
}

export default ItemModal;
