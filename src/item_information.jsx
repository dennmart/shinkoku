import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'boron/OutlineModal';
import capitalize from 'underscore.string/capitalize';
import prune from 'underscore.string/prune';
import ItemModal from './item_modal';

class ItemInformation extends React.Component {
  constructor(props) {
    super(props);
    this.showModal = this.showModal.bind(this);
  }

  showModal() {
    this.refs.modal.show();
  }

  buildItem() {
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

  radicalInfo() {
    const { type, meaning } = this.props;

    return (
      <div className={`item-container ${type}`}>
        <div className="character">
          {this.radicalCharacterDisplay(this.props)}
        </div>
        <div className="meaning">{capitalize(meaning.replace('-', ' '))}</div>
      </div>
    );
  }

  kanjiInfo() {
    const { type, character, meaning } = this.props;

    return (
      <div className={`item-container ${type}`}>
        <div className="character">{character}</div>
        <div className="reading">{this.importantMeaning()}</div>
        <div className="meaning">{capitalize(meaning)}</div>
      </div>
    );
  }

  vocabularyInfo() {
    const { type, character, kana, meaning } = this.props;

    return (
      <div className={`item-container ${type}`}>
        <div className="character">{character}</div>
        <div className="reading">{kana}</div>
        <div className="meaning">{prune(capitalize(meaning), 80)}</div>
      </div>
    );
  }

  importantMeaning() {
    const { props } = this;
    return props[props.important_reading];
  }

  radicalCharacterDisplay() {
    const { character, image, meaning } = this.props;

    if (character === null) {
      return <img src={image} alt={`Radical for ${meaning}`} />;
    }
    return character;
  }

  render() {
    const modal = (
      <Modal ref="modal">
        <ItemModal {...this.props} />
      </Modal>
    );
    return (
      <div>
        <div
          className="col-md-4 item"
          role="button"
          onClick={this.showModal}
          onKeyPress={this.showModal}
          tabIndex="0"
        >
          {this.buildItem()}
        </div>
        {modal}
      </div>
    );
  }
}

ItemInformation.propTypes = {
  type: PropTypes.string.isRequired,
  meaning: PropTypes.string.isRequired,
  character: PropTypes.string,
  kana: PropTypes.string,
  image: PropTypes.string,
};

ItemInformation.defaultProps = {
  character: null,
  kana: null,
  image: null,
};

export default ItemInformation;
