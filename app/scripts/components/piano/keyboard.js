"use strict";

var React = require('react'),
    classNames = require('classnames'),
    connectToStores = require('../../../../node_modules/alt/utils/connectToStores'),
    KeyboardActions = require('../../actions/keyboardActions'),
    KeyboardStore = require('../../store/KeyboardStore')

var Key = connectToStores(React.createClass({
  statics: {
    getStores() {
      return [KeyboardStore]
    },
    getPropsFromStores() {
      return KeyboardStore.getState()
    }
  },

  propTypes: {
    settings: React.PropTypes.object
  },

  handleKeyUp: function(selectedKey) {
    return function() {
      selectedKey.isSelected = false;
      KeyboardActions.onKeyUp(selectedKey);
    }
  },

  handleKeyPress: function(selectedKey) {
    return function() {
      selectedKey.isSelected = true;
      KeyboardActions.onKeyPress(selectedKey);
    }
  },

  render: function() {
    var keyClassName = classNames('key', this.props.settings.type, {
      'active': this.props.settings.isSelected
    });

    return (<li className={keyClassName} onMouseDown={this.handleKeyPress(this.props.settings)} onMouseUp={this.handleKeyUp(this.props.settings)}>
              <span>{this.props.settings.label}</span>
            </li>)
  }
}));

var Keyboard = React.createClass({
  propTypes: {
    keynotes: React.PropTypes.array
  },

  render: function() {
    return (<ul className='keyboard'>
              {this.props.keynotes.map(function(key){
                return <Key key={key.id} settings={key}></Key>
              })}
            </ul>)
  }
})

module.exports = Keyboard;
