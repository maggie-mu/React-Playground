
var serverUrl = 'http://localhost:3000/';

var React = window.React = require('react'),
    Control = require("./control"),
    ControlList = require("./controlList"),
    contentEle = document.getElementById("content");

var NavigationApp = React.createClass({
  propTypes: {
    items: React.PropTypes.array
  },
  getInitialState: function() {
     this.props.items[0].isSelected = true;
     return {selectedControl: this.props.items[0]}
  },
  setSelectedControl: function(selectedItem) {
     this.setState({
       selectedControl: selectedItem
     })
  },
  render: function() {
    return (
        <div className='content'>
            <div className="control-nav">
              <ControlList items={this.props.items} handleControlSelection={this.setSelectedControl}/>
            </div>
            <div>
              <Control control={this.state.selectedControl}></Control>
            </div>
        </div>
    );
  }
});

$(document).ready(function() {
    //set up cloudinary configuration
    $.cloudinary.config({ cloud_name: 'maggiemu', api_key: '575354932185368'});

    $.ajax({
        url: serverUrl + 'controls',
        method: "GET",
        success: function(data) {
            if (data && data.items) {
                React.render(<NavigationApp items={data.items}/>, contentEle);
            }
        }
    });

});
