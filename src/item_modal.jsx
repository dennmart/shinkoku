import React from 'react';
import PropTypes from 'prop-types';
import capitalize from 'underscore.string/capitalize';

class ItemModal extends React.Component {
  radicalInfo() {
    const { type, meaning } = this.props;

    return (
      <div className="type-info">
        <div className={`character ${type}`}>
          {this.radicalCharacterDisplay(this.props)}
        </div>
        <div className="meaning">{capitalize(meaning.replace('-', ' '))}</div>
      </div>
    );
  }

  kanjiInfo() {
    const { type, character, meaning } = this.props;

    return (
      <div className="type-info">
        <div className={`character ${type}`}>{character}</div>
        <div className="reading">{this.importantMeaning()}</div>
        <div className="meaning">{capitalize(meaning)}</div>
      </div>
    );
  }

  vocabularyInfo() {
    const { type, character, kana, meaning } = this.props;

    return (
      <div className="type-info">
        <div className={`character ${type}`}>{character}</div>
        <div className="reading">{kana}</div>
        <div className="meaning">{capitalize(meaning)}</div>
      </div>
    );
  }

  characterInfo() {
    const { type } = this.props;

    switch (type) {
      case 'radical':
        return this.radicalInfo();
      case 'kanji':
        return this.kanjiInfo();
      case 'vocabulary':
        return this.vocabularyInfo();
      default:
        return null;
    }
  }

  radicalCharacterDisplay() {
    const { character, image, meaning } = this.props;

    if (character == null) {
      return <img src={image} alt={`Radical for ${meaning}`} />;
    }
    return character;
  }

  importantMeaning() {
    const { props } = this;
    return props[props.important_reading];
  }

  linkToWaniKani() {
    const { type, meaning, character } = this.props;
    let link = null;

    if (type === 'radical') {
      link = `https://www.wanikani.com/radicals/${meaning}`;
    } else {
      link = `https://www.wanikani.com/${type}/${character}`;
    }

    return (
      <a href={link} target="_blank" rel="noopener noreferrer">
        View more information on WaniKani
      </a>
    );
  }

  render() {
    const { level, percentage } = this.props;

    return (
      <div className="item-modal">
        {this.characterInfo()}
        <div className="level">Level {level}</div>
        <div className="percentage">{percentage}% Correct</div>
        <div className="wanikani-link">{this.linkToWaniKani()}</div>
      </div>
    );
  }
}

ItemModal.propTypes = {
  type: PropTypes.string.isRequired,
  meaning: PropTypes.string.isRequired,
  character: PropTypes.string,
  kana: PropTypes.string,
  image: PropTypes.string,
  level: PropTypes.number.isRequired,
  percentage: PropTypes.string.isRequired,
};

ItemModal.defaultProps = {
  character: null,
  kana: null,
  image: null,
};

export default ItemModal;
