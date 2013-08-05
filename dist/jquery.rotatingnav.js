/*
 *  jQuery RotatingNav - v0.1.0
 *  A nav menu that rotates through infinite links, allowing for more nav menu links than can normally fit.
 *  https://github.com/audreyr/rotatingnav/
 *
 *  Made by Audrey Roy
 *  Under MIT License
 */
;(function ( $, window, document, undefined ) {

  var rotatingnav = "rotatingnav",
      defaults = {
        panelCount: 8,
        activeCount: 4
      };

  function RotatingNav ( element, options ) {
    this.element = element;
    this.settings = $.extend( {}, defaults, options );
    this._defaults = defaults;
    this._name = rotatingnav;
    this.init();
  }

  RotatingNav.prototype = {

    init: function () {
      var that = this;
      that.activeHead = 0;
      that.activeTail = this.settings.activeCount - 1;
      that.panelHead = 0;
      that.panelTail = this.settings.panelCount - 1;

      that.updateActive();
      $(".left.rotatingnav-control").click(function () {
        that.shiftBackward();
      });
      $(".right.rotatingnav-control").click(function () {
        that.shiftForward();
      });
      $("body").keypress(function (event) {
        if (event.which === 102) { // f - forward
          that.shiftForward();
        } else if (event.which === 98) { // b - backward
          that.shiftBackward();
        }
      });
    },

    isActive: function (index) {
      if (this.activeHead < this.activeTail &&
          this.activeHead <= index &&
          index <= this.activeTail) {
        return true;
      } else if (this.activeHead > this.activeTail &&
                 !(this.activeTail < index &&
                   index < this.activeHead)) {
        return true;
      } else {
        return false;
      }
    },

    updateActive: function () {
      var that = this;
      console.log("activeHead " + that.activeHead + ", activeTail " + that.activeTail);
      $(".item").removeClass("pull-left");
      $(".item").removeClass("active");
      $(".item").each(function(index){
        if (that.isActive(index)) {
          $(this).addClass("active");
          $(this).show();
          if (index > that.activeTail) {
            $(this).addClass("pull-left");
          }
        } else {
          $(this).hide();
        }
      });
    },

    shiftForward: function () {
      console.log("Shifting forward");
      this.activeHead++;
      this.activeTail++;
      if (this.activeTail > this.panelTail) {
        this.activeTail = this.panelHead;
      }
      if (this.activeHead > this.panelTail) {
        this.activeHead = this.panelHead;
      }
      this.updateActive();
    },

    shiftBackward: function () {
      console.log("Shifting backward");
      this.activeHead--;
      this.activeTail--;
      if (this.activeHead < this.panelHead) {
        this.activeHead = this.panelTail;
      }

      if (this.activeTail < this.panelHead) {
        this.activeTail = this.panelTail;
      }
      this.updateActive();
    }

  };

  $.fn[ rotatingnav ] = function ( options ) {
    return this.each(function () {
      if ( !$.data( this, "_" + rotatingnav ) ) {
        $.data (this, "plugin_" + rotatingnav, new RotatingNav( this, options ) );
      }
    });
  };

})( jQuery, window, document );
