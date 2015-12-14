"use strict";

var React = require('react'),
    classNames = require('classnames'),
    connectToStores = require('../../../../node_modules/alt/utils/connectToStores'),
    KeyboardActions = require('../../actions/keyboardActions'),
    KeyboardStore = require('../../store/KeyboardStore')

var MusicNote = connectToStores(React.createClass({
  statics: {
    getStores() {
      return [KeyboardStore]
    },
    getPropsFromStores() {
      return KeyboardStore.getState()
    }
  },

  getInitialState: function() {
    return {
      styles: {
        path1: {  fill:'#000000'},
        path2: { stroke:'#000000'}
      }
    };
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

  renderSVGNote: function(transform) {
    return  <svg>
              <g transform={transform}>
                <path d="M 303.13715,299.65106 C 299.74131,301.47103 297.93187,304.76561 299.04493,307.24402 C 300.23219,309.88766 304.31194,310.63374 308.15151,308.90939 C 311.99107,307.18503 314.14367,303.63999 312.95641,300.99636 C 311.76914,298.35272 307.6894,297.60664 303.84983,299.33099 C 303.60986,299.43876 303.36355,299.52973 303.13715,299.65106 z "
                   style={this.state.styles.path1}/>
                <path d="M 299.50465,305.98445 L 299.50465,339.57202" style={this.state.styles.path2}/>
              </g>
            </svg>
  },

  renderNote: function() {
    if(this.props.settings.direction && this.props.settings.direction === 'up') {
       return this.renderSVGNote("translate(-298.7171,-298.402)");
    } else {
       return this.renderSVGNote("matrix(-1,0,0,-1,313.2829,340.3223)");
    }
  },

  componentWillReceiveProps: function(newProps) {
    if(newProps.settings.isSelected) {
      this.setState({
        styles: {
          path1: {  fill:'#E67E22'},
          path2: { stroke:'#E67E22', strokeWidth: 3}
        }
      });
    } else {
      this.setState({
        styles: {
          path1: {  fill:'#000000'},
          path2: { stroke:'#000000'}
        }
      });
    }
  },

  render: function() {
    var keyClassName = classNames('note', this.props.settings.type, {
      'active': this.props.settings.isSelected
    });

    return (<li className={keyClassName}>
              {this.props.settings.type === 'whiteKey'?
                 <div className={this.props.settings.label}>
                    {this.renderNote()}
                 </div>: undefined
              }
            </li>)
  }
}));

var MusicNotes = React.createClass({
  propTypes: {
    keynotes: React.PropTypes.array
  },

  render: function() {
    return (<div className='music-notes'>
              <ul className='music-notes-lines'>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <ul className='music-notes-notes'>
                {this.props.keynotes.map(function(note){
                  return <MusicNote key={note.id} settings={note}></MusicNote>
                })}
              </ul>
            </div>)
  }
})

module.exports = MusicNotes;
