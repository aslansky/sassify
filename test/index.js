'use strict';

var fs = require('fs');
var path = require('path');
var browserify = require('browserify');
var sassify = require('../lib');
var should = require('should');

var scss = path.join(__dirname, '/styles.scss');
var js = path.join(__dirname, '/noop.js');

describe('sassify', function() {
  it('should compile scss to css', function (end) {
      browserify()
        .require('./lib', {expose: 'sassify'})
        .add(scss)
        .add(js)
        .transform(sassify)
        .bundle(function (err, src) {
          should.not.exist(err);
          should.exist(src);
          src.should.containEql('background-color: green;')
          end();
        });
    });
});
