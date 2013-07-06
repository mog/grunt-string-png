/*
 * grunt-stringpng
 * http://trbl.at/
 *
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    var fs = require('fs'),
        PNG = require('pngjs').PNG;

    grunt.registerMultiTask('stringpng', 'String to PNG', function() {

        var done = this.async(),
            destURL = this.files[0].dest;


        var src = (grunt.file.read(this.filesSrc)).trim(),
            dst = fs.createWriteStream(destURL),
            png = new PNG({
                height: 1,
                width: src.length + 1
            });

        for(var i = 0, c = 0; i < (src.length + 1) * 4; i+=4, c++){

           var char = src.charCodeAt(c);
            png.data[i] = char;
            png.data[i+1] = char;
            png.data[i+2] = char;

            png.data[i+3] = 255;
        }

        var stream = png.pack();
        stream.on('end', function(){
            done(0);
        });

        stream.pipe(dst);
    });
};
