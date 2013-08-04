/* ========================================================================
 * Copyright 2013 Audrey Roy
 *
 * Adapted from Bootstrap: carousel.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#carousel
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // ROTATINGNAV CLASS DEFINITION
  // ============================

  var RotatingNav = function (element, options) {
    this.$element    = $(element)
    this.options     = options
    this.paused      =
    this.sliding     =
    this.interval    =
    this.$active     =
    this.$items      = null

    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  RotatingNav.DEFAULTS = {
    interval: 5000
  , pause: 'hover'
  }

  RotatingNav.prototype.cycle =  function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  RotatingNav.prototype.getActiveIndex = function () {
    this.$active = this.$element.find('.item.active')
    this.$items  = this.$active.parent().children()

    return this.$items.index(this.$active)
  }

  RotatingNav.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getActiveIndex()

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid', function () { that.to(pos) })
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
  }

  RotatingNav.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition.end) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  RotatingNav.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  RotatingNav.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  RotatingNav.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $active2   = this.$element.find('.item.active2')
    var $next     = next || $active2[type]()
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var fallback  = type == 'next' ? 'first' : 'last'
    var that      = this

    this.sliding = true

    isCycling && this.pause()

    $next = $next.length ? $next : this.$element.find('.item')[fallback]()

    var e = $.Event('slide.bs.rotatingnav', { relatedTarget: $next[0], direction: direction })

    if ($next.hasClass('active')) return

    if ($.support.transition && this.$element.hasClass('slide')) {
      this.$element.trigger(e)
      if (e.isDefaultPrevented()) return
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one($.support.transition.end, function () {
          $active.removeClass(['active', direction].join(' '))
          $active2.removeClass(['active2', direction].join(' ')).addClass('active')
          $next.removeClass([type, direction].join(' ')).addClass('active2')
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid') }, 0)
        })
        .emulateTransitionEnd(600)
    } else {
      this.$element.trigger(e)
      if (e.isDefaultPrevented()) return
      $active.removeClass('active')
      $active2.addClass('active')
      $active2.removeClass('active2')
      $next.addClass('active2')
      this.sliding = false
      this.$element.trigger('slid')
    }
    
    var active_index = $('.active').index()
    var active2_index = $('.active2').index()
    
    console.log('.active index: ' + active_index)
    console.log('.active2 index: ' + active2_index)

    if (active2_index < active_index) $('.active').addClass('pull-left')
    else $('.item').removeClass('pull-left')

    isCycling && this.cycle()

    return this
  }


  // ROTATINGNAV PLUGIN DEFINITION
  // =============================

  var old = $.fn.rotatingnav

  $.fn.rotatingnav = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.rotatingnav')
      var options = $.extend({}, RotatingNav.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.rotatingnav', (data = new RotatingNav(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  $.fn.rotatingnav.Constructor = RotatingNav


  // ROTATINGNAV NO CONFLICT
  // =======================

  $.fn.rotatingnav.noConflict = function () {
    $.fn.rotatingnav = old
    return this
  }


  // ROTATINGNAV DATA-API
  // ====================

  $(document).on('click.bs.rotatingnav.data-api', '[data-slide], [data-slide-to]', function (e) {
    var $this   = $(this), href
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    $target.rotatingnav(options)

    if (slideIndex = $this.attr('data-slide-to')) {
      $target.data('bs.rotatingnav').to(slideIndex)
    }

    e.preventDefault()
  })

  $(window).on('load', function () {
    $('[data-ride="rotatingnav"]').each(function () {
      var $rotatingnav = $(this)
      $rotatingnav.rotatingnav($rotatingnav.data())
    })
  })

}(window.jQuery);
