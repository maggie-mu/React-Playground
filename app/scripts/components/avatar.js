"use strict";

var React = require("react");

var Avatar = React.createClass({

    handleHover: function(e) {
        var currentEl = $(e.target).parent().next(".avatar-label");

        currentEl.find("svg").css("top", -(30+25+2) + "px");
        currentEl.find("svg").css("left", -(136-25) + "px");

        currentEl.find("svg").css("display", "block");
    },

    closeTooltip: function(e) {
        var currentEl = $(e.target).parent().next(".avatar-label");

        currentEl.find("svg").css("display", "none");
    },

    render: function() {
        return (
            <div className="avatar-container">
                <ul>
                    <li className="avatar-list-item" onMouseLeave={this.closeTooltip}>
                            <div className="avatar">
                                <img src="../images/kate.png" alt="Kate Howe" onMouseOver={this.handleHover} />
                            </div>
                            <div className="avatar-label">
                                <svg version="1.1" baseProfile="full" width="136px" height="60px" xmlns="http://www.w3.org/2000/svg"
                                     style={{display: "none", top:"100px", left:"200px"}}>
                                    <g transform="">
                                        <polygon points="0 0, 136 0, 136 60, 116 40, 0 40" fill="#000" fill-opacity="0.85"></polygon>
                                        <text x="20" y="25" font-size=".875em" text-anchor="middle" fill="white">Sarah Howe</text>
                                        <g>
                                        </g></g>
                                </svg>
                            </div>
                    </li>
                </ul>
            </div>
        )
    }
});

module.exports = Avatar;
