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
      this.activeHead = 0;
      this.activeTail = this.activeCount - 1;
      this.panelHead = 0;
      this.panelTail = this.panelCount - 1;
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
      console.log("activeHead " + this.activeHead + ", activeTail " + this.activeTail);
      $('.item').removeClass('pull-left');
      $('.item').removeClass('active');
      $('.item').each(function(index){
        if (this.isActive(index)) {
          $(this).addClass('active');
          $(this).show();
          if (index > this.activeTail) {
            $(this).addClass('pull-left');
          }
        } else {
          $(this).hide();
        }
      });
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
