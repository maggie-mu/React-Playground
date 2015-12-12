'use strict';

var React = require('react'),
    Utility = require('../utility');
var serverUrl = 'http://localhost:3000/';

var Milestones = React.createClass({
    getInitialState: function() {
        return {list: []};
    },

    componentWillMount: function() {
        var self = this;

        $.ajax({
            url: serverUrl + 'milestones',
            method: "GET",
            success: function(data) {
                self.setState({list: data.milestones});
            }
        });
    },

    componentDidUpdate: function() {

        function checkViewPoint() {
            $(".milestone-card").each(function(index){
                if(Utility.isElementInViewport($(this))) {
                    $(this).addClass("active");
                } else {
                    if(index !== 0) {
                        $(this).removeClass("active");
                    }
                }
            })
        }

        //check whether the milestones are in the current view point before scrolling
        checkViewPoint();
        $(window).scroll(_.throttle(checkViewPoint,100));
    },

    createCard: function(item, index) {

        return <div className="milestone-card">
                <div className="milestone-circle"><div className="milestone-circle-inner"></div></div>
                <div className="milestone-dash"></div>
                <div className="milestone">
                    <div className="milestone-title">{item.title}</div>
                    <p>{item.description}</p>
                </div>
               </div>
    },
    render: function() {
        return (
            <div className="milestones">
                <div className="milestone-list">
                    {this.state.list.map(this.createCard)}
                </div>
                <div className="milestones-line"></div>
            </div>
        )
    }
});

module.exports = Milestones;
