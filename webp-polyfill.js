var webpPolyfill = {
    _convertBinaryToArray: function (binary) {
        var arr = new Array();
        var num = binary.length;
        var i;
        for (i = 0; i < num; ++i)
            arr.push(binary.charCodeAt(i));
        return arr;
    },
    _WebPDecodeAndDraw: function (canvas, data) {
        // /--------- libwebpjs 0.2.0 decoder code start
        // ---------------------------------------------
        // var WebPImage = { width:{value:0},height:{value:0} };
        var decoder = new WebPDecoder();

        data = data.split('').map(function (e) {
            return String.fromCharCode(e.charCodeAt(0) & 0xff);
        }).join('');

        data = webpPolyfill._convertBinaryToArray(data);// unkonvertierung in char

        // Config, you can set all arguments or what you need, nothing no objeect
        var config = decoder.WebPDecoderConfig;
        var output_buffer = config.j;
        var bitstream = config.input;

        if (!decoder.WebPInitDecoderConfig(config)) {
            console.error("Library version mismatch!");
            return -1;
        }

        // var StatusCode = decoder.VP8StatusCode;

        status = decoder.WebPGetFeatures(data, data.length, bitstream);
        if (status != 0) {
            console.error('Unable to decode webp image.');
        }

        // var mode = decoder.WEBP_CSP_MODE;
        output_buffer.J = 4;

        status = decoder.WebPDecode(data, data.length, config);

        if (status != 0) {
            console.error('Decoding failed.');
            return -1;
        }

        // alert("Decoded %s. Dimensions: "+output_buffer.width+" x
        // "+output_buffer.height+""+(bitstream.has_alpha.value ? " (with alpha)" :
        // "")+". Now saving...\n");
        var bitmap = output_buffer.c.RGBA.ma;
        // var bitmap = decoder.WebPDecodeARGB(data, data.length, WebPImage.width,
        // WebPImage.height);

        // /--------- libwebpjs 0.2.0 decoder code end
        // ---------------------------------------------

        if (bitmap) {
            // Draw Image
            var biHeight = output_buffer.height;
            var biWidth = output_buffer.width;
            canvas.attr('height', biHeight).attr('width', biWidth);
            var canvas = canvas[0];
            var iwidth = canvas.width;
            var iheight = canvas.height;

            canvas.width = biWidth;
            canvas.height = biHeight;

            var context = canvas.getContext('2d');
            var output = context.createImageData(canvas.width, canvas.height);
            var outputData = output.data;

            for (var h = 0; h < biHeight; h++) {
                for (var w = 0; w < biWidth; w++) {
                    outputData[0 + w * 4 + (biWidth * 4) * h] = bitmap[1 + w * 4 + (biWidth * 4) * h];
                    outputData[1 + w * 4 + (biWidth * 4) * h] = bitmap[2 + w * 4 + (biWidth * 4) * h];
                    outputData[2 + w * 4 + (biWidth * 4) * h] = bitmap[3 + w * 4 + (biWidth * 4) * h];
                    outputData[3 + w * 4 + (biWidth * 4) * h] = bitmap[0 + w * 4 + (biWidth * 4) * h];
                }
            }

            context.putImageData(output, 0, 0);
            context.drawImage(canvas, 0, 0);

            var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            var newCanvas = jQuery("<canvas>").attr("width", imageData.width).attr(
                    "height", imageData.height)[0];

            newCanvas.getContext("2d").putImageData(imageData, 0, 0);

            canvas.width = iwidth;
            canvas.height = iheight;
            var wscale = iwidth / biWidth;
            var hscale = iheight / biHeight;
            context.scale(wscale, hscale);
            context.drawImage(newCanvas, 0, 0);

            return canvas.toDataURL();

        }
    },
    _process: function (img, dontAttach) {
        img = jQuery(img);
        var src = img.attr('src');
        if (src.split('.').pop() !== 'webp')
            return;
        var canvas = jQuery('<canvas style="display: none;"></canvas>');
        jQuery.ajax(src, {processData: false, mimeType: 'text/plain; charset=x-user-defined'}).done(function (data) {
            img.attr('src', webpPolyfill._WebPDecodeAndDraw(canvas, data));
        });

        if (!dontAttach) {
            jQuery(img).off('DOMAttrModified.webp');
            jQuery(img).on('DOMAttrModified.webp', function () {
                var src = img.attr('src');
                if (src.split('.').pop() !== 'webp')
                    return;
                var canvas = jQuery('<canvas style="display: none;"></canvas>');
                jQuery.ajax(src, {processData: false, mimeType: 'text/plain; charset=x-user-defined'}).done(function (data) {
                    img.attr('src', webpPolyfill._WebPDecodeAndDraw(canvas, data));
                });
            });
        }
    },
    evaluateParent: function (parent, dontAttach) {
        jQuery(parent).find("img").each(function (i, img) {
            webpPolyfill._process(img, dontAttach);
        });
    },
    evaluate: function (element, dontAttach) {
        webpPolyfill._process(element, dontAttach);
    },
    detach: function (img) {
        img = jQuery(img);
        jQuery(img).off('DOMAttrModified.webp');
    },
    getDataUriOfWebpImage: function (img) {
        img = jQuery(img);
        var src = img.attr('src');
        if (src.split('.').pop() !== 'webp')
            return('Image is does not have a webp extension.', src);
        var canvas = jQuery('<canvas style="display: none;"></canvas>');
        jQuery.ajax(src, {processData: false, mimeType: 'text/plain; charset=x-user-defined'}).done(function (data) {
            return webpPolyfill._WebPDecodeAndDraw(canvas, data);
        });
    },
    getDataUriOfWebpUrl: function (url) {
        var canvas = jQuery('<canvas style="display: none;"></canvas>');
        jQuery.ajax(url, {processData: false, mimeType: 'text/plain; charset=x-user-defined'}).done(function (data) {
            return webpPolyfill._WebPDecodeAndDraw(canvas, data);
        });
    }
}