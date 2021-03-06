# Webp Polyfill

Webp Polyfill is a polyfill (adds support for non-native features) for webp images in the browser.

## Created using
- [libwebpjs](http://libwebpjs.hohenlimburg.org/v0.2.0/) By Dominik Homberger
- segment of [libwebpwrapper](https://wordpress.org/plugins/wp-webp/) By [tuxlog](http://www.tuxlog.de/)
- [native support detection](https://queryj.wordpress.com/2012/06/11/detecting-webp-support/) By [James Westgate](https://twitter.com/jameswestgate)

### Dependencies
- [jQuery](https://jquery.com/)

### Installation
bower

```
bower install https://github.com/FallingSnow/webp-polyfill.git
```

### When to use
Don't worry about it, webp-polyfill already checks if webp is natively supported.

### Example
To evaluate a single `img` tag.
```
webpPolyfill.evaluate(jQuery('img'));
```

To evaluate all `img` tags in a parent element.
```
webpPolyfill.evaluateParent('body');
```

### Methods
- `evaluate(element[, dontAttach])`
    * `element` - The image element you are trying to turn into a datauri.
    * `dontAttach` - If you don't want a `src` attribute listener to be placed on the element so that every time the src changes in the future it will be evaluated, set this to true.
    * returns nothing.
- `evaluateParent(element[, dontAttach])`
    * `element` - The parent element in which to search for webp image within.
    * `dontAttach` - If you don't want a `src` attribute listener to be placed on the element so that every time the src changes in the future it will be evaluated, set this to true.
    * returns nothing.
- `detach(element)`
    * `element` - The image element you want to remove the src attribute listener from.
    * returns nothing.
- `getDataUriOfWebpImage(element)`
    * `element` - The image element you want to get a datauri from.
    * returns `string`
        - `string` - Contains the datauri.
- `getDataUriOfWebpUrl(url)`
    * `url` - The url you want to get a datauri from.
    * returns `string`
        - `string` - Contains the datauri.

### Special thanks to
[All those that made libwebp](https://github.com/webmproject/libwebp/graphs/contributors)

### License

DWTFYWWI LICENSE
Version 1, January 2006

Copyright (C) 2015 Ayrton Sparling

Preamble

The licenses for most software are designed to take away your
freedom to share and change it.  By contrast, the DWTFYWWI or Do
Whatever The Fuck You Want With It license is intended to guarantee
your freedom to share and change the software--to make sure the
software is free for all its users.

DWTFYWWI LICENSE

TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
   
0. The author grants everyone permission to do whatever the fuck they
want with the software, whatever the fuck that may be.

This license does not apply to components of this software that already
have a license by another party.