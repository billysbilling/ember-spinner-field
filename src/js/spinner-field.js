/**
 * TODO: 
 * - Repeat
 */

module.exports = require('ember-number-field').extend({
    step: 1,

    init: function() {
        this._super();
        var step = this.get('step');
        if (typeof step !== 'number') {
            this.set('step', 1*step);
        }
    },
    
    picker1Icon: 'icons/caret-up',
    picker2Icon: 'icons/caret-down',

    didClickPicker1: function() {
        this.move(1);
    },
    
    didClickPicker2: function() {
        this.move(-1);
    },
    
    keyDown: function(e) {
        var allowedKeys = [
            48, 49, 50, 51, 52, 52, 53, 54, 55, 56, 57, //Numbers
            188, //Comma
            189, //Minus
            190, //Period
            13, //Enter
            46, //Delete
            8, //Backspace
            37, //Left
            39, //Right
            9 //Tab
        ];
        if (!e.metaKey && !allowedKeys.contains(e.which)) {
            //Note: The `dispatchKeyboardEvent` ember-testing helper isn't capable of sending the keycode when running in PhantomJS.
            //So we don't prevent default when testing through PhantomJS.
            if (!window.isCli) {
                e.preventDefault();
            }
        }
        if (e.keyCode === $.keyCode.UP) {
            this.move(1);
        } else if (e.keyCode === $.keyCode.DOWN) {
            this.move(-1);
        }
    },
    move: function(factor) {
        var v = 1 * (this.get('value') || 0),
            step = this.get('step'),
            min = this.get('min'),
            max = this.get('max');
        v += factor * step;
        if (!Em.isEmpty(min)) {
            v = Math.max(v, this.get('minIncluded') ? min : min + step);
        }
        if (!Em.isEmpty(max)) {
            v = Math.min(v, this.get('maxIncluded') ? max : max - step);
        }
        this.set('value', v);
    }
});