'use strict';

var React = require('react'),
    DrawingPad = require('./components/drawingPad'),
    Milestones = require('./components/milestones'),
    FlipCard = require('./components/flipCard'),
    Avatar = require('./components/avatar'),
    Piano = require('./components/piano/piano');

var Control = React.createClass({
    buildControl: function(control) {
        var content;

        switch (control.key) {
            case 'drawingPad':
               return <DrawingPad imageUrl={control.imageUrl}/>;
            case 'milestones':
                return <Milestones/>;
            case 'flipCard':
                return <FlipCard/>;
            case 'avatar':
                return <Avatar/>;
            case 'piano':
                return <Piano/>;
        }

    },
    render: function () {
        var control = this.props.control;

        return  (
            <div>
                <h3>{control.name}</h3>
                <p>{control.description}</p>
                <div className="control-description">
                    {this.buildControl(control)}
                </div>
            </div>
        );
    }
});

module.exports = Control;
