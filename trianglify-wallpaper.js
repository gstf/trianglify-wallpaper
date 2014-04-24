#!/usr/bin/env node

var Trianglify = require('trianglify'),
    fs = require('fs'),
    tmp = require('tmp'),
    svg2png = require('svg2png');

var opts = require('nomnom')
   .option('width', {
        abbr: 'w',
        default: 2560,
        help: 'Width of output image'
   })
   .option('height', {
        abbr: 'h',
        default: 1600,
        help: 'Height of output image'
   })
   .option('cellsize', {
        abbr: 'cs',
        help: 'Cellsize'
   })
   .option('bleed', {
        abbr: 'b',
        help: 'Bleed'
   })
   .option('noiseIntensity', {
        abbr: 'ni',
        help : 'Noise intensity'
   })
   .option('cellpadding', {
        abbr: 'cp',
        help: 'Cellpadding'
   })
   .option('output', {
        abbr: 'o',
        default: 'out.png',
        help: 'Output filename'
   })
   .parse();

var t = new Trianglify(opts);
var pattern = t.generate(opts.width, opts.height);

tmp.file({ postfix : '.svg' }, function(err, path, fd) {
    if (err) throw err;

    fs.writeFile(path, pattern.svgString, function(err) {
        if(err) throw err;

        svg2png(path, opts.output, function (err) {
            if (err) throw err;
            console.log(opts.output + ' written');
        });
    })
});

