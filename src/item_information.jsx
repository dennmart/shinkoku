import React from 'react';
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
    switch (this.props.type) {
      case 'radical':
        return this.radicalInfo();
      case 'kanji':
        return this.kanjiInfo();
      case 'vocabulary':
        return this.vocabularyInfo();
    };
  }

  radicalInfo() {
    return (
      <div className={'item-container ' + this.props.type}>
        <div className='character'>{this.radicalCharacterDisplay(this.props)}</div>
        <div className='meaning'>{capitalize(this.props.meaning.replace('-', ' '))}</div>
      </div>
    )
  }

  kanjiInfo() {
    return (
      <div className={'item-container ' + this.props.type}>
        <div className='character'>{this.props.character}</div>
        <div className='reading'>{this.importantMeaning(this.props)}</div>
        <div className='meaning'>{capitalize(this.props.meaning)}</div>
      </div>
    )
  }

  vocabularyInfo() {
    return (
      <div className={'item-container ' + this.props.type}>
        <div className='character'>{this.props.character}</div>
        <div className='reading'>{this.props.kana}</div>
        <div className='meaning'>{prune(capitalize(this.props.meaning), 80)}</div>
      </div>
    )
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

  render() {
    var modal = (
      <Modal ref='modal'>
        <ItemModal {...this.props} />
      </Modal>
    )
    return (
      <div>
        <div className='col-md-4 item' onClick={this.showModal}>
          {this.buildItem()}
        </div>
        {modal}
      </div>
    )
  }
}

export default ItemInformation;
