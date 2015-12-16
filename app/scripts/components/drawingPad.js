'use strict';

var React = require('react');
var serverUrl = 'http://localhost:3000/';

var DrawingPad = React.createClass({
    handleDrawing: function () {
        this.clearActiveButtons();

        $('.btn-drawing').addClass('is-active');
        this.canvas.isDrawingMode = true;
    },
    handleAddingText: function () {
        //deactive drawing
        this.clearActiveButtons();
        this.deactiveDrawing();

        $('.btn-add-text').addClass('is-active');
        var text = new fabric.Text('Add Text', {fontWeight: 'normal', fontSize: 20, left: 100, top: 100 });
        this.canvas.add(text);
    },
    deactiveDrawing: function () {
        this.canvas.isDrawingMode = false;
    },
    clearActiveButtons: function() {
        $('.drawing-controls button').removeClass('is-active');
    },
    clearDrawing: function () {
        this.clearActiveButtons();
        this.deactiveDrawing();

        $('.btn-clear').addClass('is-active');
        this.canvas.clear();

        this.addImage();
    },

    addImage: function() {
        var self = this,
            imageUrl = this.props.imageUrl;

        fabric.util.loadImage(imageUrl, function(image) {
            var img = new fabric.Image(image);
            var oImg = img.set({top: 10, width: 537, height: 341});

            oImg.lockMovementX = true;
            oImg.lockMovementY = true;

            self.canvas.add(img);
        }, null, {crossOrigin: 'Anonymous'});

    },

    componentDidMount: function () {
        this.canvas = new fabric.Canvas('tools_sketch');

        this.addImage();

    },
    saveDrawing: function () {
        var drawingSVG = this.canvas.toSVG(),
            canvas = new fabric.Canvas('saved_sketch');


        //save the image to the server
        $.ajax({
            type: 'POST',
            url:  serverUrl + 'image',
            data: {image: this.canvas.toDataURL()},
            success: function(data) {
                $('.drawing-pad h3').removeClass('hide');

                fabric.Image.fromURL(data.url, function(img) {
                    canvas.add(img).renderAll();
                });
            },
            dataType: 'json'
        });


    },
    render: function () {
        return (
            <div className='drawing-pad'>
                <div className='drawing-controls'>
                    <button type='button' className='btn btn-dark btn-drawing' onClick={this.handleDrawing}>Draw</button>
                    <button type='button' className='btn btn-dark btn-add-text' onClick={this.handleAddingText}>Add Text</button>
                    <button type='button' className='btn btn-dark btn-clear' onClick={this.clearDrawing}>Clear</button>
                    <button type='button' className='btn btn-dark btn-save hide' onClick={this.saveDrawing}>Save</button>
                </div>
                <canvas id='tools_sketch' width='900' height='400'></canvas>
                <h3 className='hide'>The saved image is </h3>
                <canvas id='saved_sketch' width='900' height='400'></canvas>
            </div>
        );
    }
});


module.exports = DrawingPad;