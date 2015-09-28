/**
* A simple slider made with pure Javascript
*
* @version 0.1
* @author Josue Osuna
*/
(function (window, document) {
  'use strict';

  /**
  * Constructor for the slider
  *
  * @class Slider
  * @constructor
  * @param {String} Selector for the slider's container
  */
  function Slider(element) {
    if (!(this instanceof Slider)) return new Slider(element, options);

    this.controlPrev = '.prev';
    this.controlNext = '.next';

    this.container = document.querySelector(element);
    this.slider = this.container.children[0];
    this.items = this.slider.children;

    this.containerDimension = this.container.offsetWidth;
    this.itemDimension = this.items[0].offsetWidth;

    this.iniPos = this.addResponsive();
    this.addControls(this.controlNext, this.controlPrev);
  }

  // An alias for prototype
  Slider.fn = Slider.prototype;

  /**
  * Add responsive for slider
  *
  * @method addResponsive
  */
  Slider.fn.addResponsive = function () {
    var width,
        right;
    width = (window.innerWidth > 0) 
      ? window.innerWidth : screen.width;
    console.log(width);
    if (width > 1300) {
      right = 0;
    } else {
      right = 1180 - width;
    }
    this.slider.style['right'] = right + 'px';
    return right;
  }  
  /**
  * Add event listeners for the controls passed
  *
  * @method addControls
  * @param {String | Node Element} Next Control
  * @param {String | Node Element} Prev Control
  * @param {Integer} Number of items (steps) to avance/return
  */
  Slider.fn.addControls = function (next, prev) {

    var that = this;

    next = document.querySelector(next);
    prev = document.querySelector(prev);

    next.addEventListener('click', function (e) {
      e.preventDefault();
      that.move(1);
    });

    prev.addEventListener('click', function (e) {
      e.preventDefault();
      that.move(-1);
    });
  };

  /**
  * Move the slider.
  * Pass a negative number to go in the inverse direction
  *
  * @method move
  * @param {Integer} Number of items to move
  */
  Slider.fn.move = function (steps) {
    steps = steps;

    var nextPos = this.getNextPos(steps);

    this.slider.style['right'] = nextPos + 'px';
  };


  /**
  * Return the next position for the slider based in steps
  *
  * @method getNextPos
  */
  Slider.fn.getNextPos = function (steps) {
    var maxPos,
        currentPos,
        nextPos;

    maxPos = (this.itemDimension * (this.items.length -1)) 
      + this.iniPos;

    currentPos = this.slider.style['right'];
    if (currentPos) {
      currentPos = Math.floor(parseInt(currentPos));
    }

    nextPos = currentPos + (this.itemDimension * steps);

    if (nextPos > maxPos) {
      return this.iniPos;
    } else if (nextPos < 0) {
      return Math.ceil(maxPos);
    } else {
      return Math.ceil(nextPos);
    }
  };

  window.Slider = Slider;

}(window, document));