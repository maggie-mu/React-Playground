'use strict';

var React = require('react');

var FlipCard = React.createClass({

    render: function() {
        return (
            <div className="flip-container">
                <div className="flipper">
                    <div className="front">
                    </div>
                    <div className="back">
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = FlipCard;