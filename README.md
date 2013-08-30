# rotatingnav [![Build Status](https://secure.travis-ci.org/audreyr/rotatingnav.png?branch=master)](https://travis-ci.org/audreyr/rotatingnav) [![Dependency Status](https://david-dm.org/audreyr/rotatingnav.png)](https://david-dm.org/audreyr/rotatingnav) [![devDependency Status](https://david-dm.org/audreyr/rotatingnav/dev-status.png)](https://david-dm.org/audreyr/rotatingnav#info=devDependencies)

A nav menu that rotates through infinite links, allowing for more nav menu links than can normally fit.

![Screenshot of rotatingnav](rotatingnav-screenshot.png)

The above is just a screenshot. For a live demo, see http://bl.ocks.org/audreyr/6151852. In the demo:

* To advance forward: click > or press f
* To go backward: click < or press b

You can also see a styled version at the top of the new [djangopackages.com](https://www.djangopackages.com).

### Usage

Add this bit of JS:

```
$(function() {
	$(".rotatingnav").rotatingnav({
    panelCount: 8,
    activeCount: 4
	});
});
```

As for the corresponding HTML, see [demo/index.html](https://github.com/audreyr/rotatingnav/blob/master/demo/index.html) for an example of how to define the HTML for a nav menu with tons and tons of links.

### License

MIT. http://audreyr.mit-license.org

### Contribute

Contributions that make this better are more than welcome!

I particularly could use help implementing mobile support (https://github.com/audreyr/rotatingnav/issues/1).