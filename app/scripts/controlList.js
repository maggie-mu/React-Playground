'use strict';

var React = require('react'),
    Control = require("./Control"),
    controlsDetails = document.getElementById("controls-details");

var ControlList = React.createClass({

    propTypes: {
      handleControlSelection: React.PropTypes.func,
      items: React.PropTypes.array
    },

    getInitialState: function() {
       this.props.items[0].isSelected = true;
       return {
         selectedControl: this.props.items[0],
         collapse: true
       }
    },

    handleControlSelection: function(itemText) {
      var self = this;
      return function() {
        self.expandingNav();
        self.setState({
          selectedControl: itemText
        })

        self.props.handleControlSelection(itemText);
      }
    },

    expandingNav: function() {
      this.setState({
        collapse: !this.state.collapse
      })
    },

    render: function() {
        var self = this,
            className = 'navbar-menu ' + (this.state.collapse? 'collapse': 'collapse in');

        var createItem = function(itemText, i) {
            var isSelected = (itemText.key !== self.state.selectedControl.key)? "list-group-item": "list-group-item selected";
            return <a className={isSelected} onClick={self.handleControlSelection(itemText)} key={itemText.key}>{itemText.name}</a>;
        };
        return <nav className="navbar navbar-default navbar-controls">
                  <div className="navbar-header">
                    <a className="navbar-brand" href="#">Select a control</a>
                  </div>
                  <button className="navbar-toggle collapsed" onClick={this.expandingNav} aria-expanded="false">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <div className={className}>
                    <ul className="nav navbar-nav list-group--dark">
                        {this.props.items.map(createItem)}
                    </ul>
                  </div>
              </nav>
    }
});

module.exports = ControlList;
