/*
 * grunt-updateref
 * https://github.com/meronmee/grunt-updateref
 *
 * Copyright (c) 2013 meronmee
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('updateref', grunt.file.readJSON('package.json').description, function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      type: null,
      prefix: '',
      from: null,
      to: null
    });
   
    // Iterate over all specified file groups.
    this.files.forEach(function(file) {
      //src is an array of file contents
      var src = file.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      })[0];//There can only be on src file and one dest file
      
      //Manipulate options
      var util = require('util');
      var to = '';
      if(util.isArray(options.prefix)){
        to = (options.to + '').replace(options.prefix[0], options.prefix[1]);
      } else {
        to = options.prefix + '' + options.to;
      }
      var froms = util.isArray(options.from) ? options.from : [options.from];

      //Core actions
      if('js' === (''+options.type).toLowerCase()){
        froms.forEach(function(from, index){
          //var regex = new RegExp('<script.+?' + from + '[\'\" ]{1}.*?</script>');
          var regex = new RegExp('<script[^<]+?' + from + '.*?</script>');
          if(index === 0){
            src = src.replace(regex, '<script src="' + to + '" type="text/javascript"></script>');
          } else {
            src = src.replace(regex, '');
          }
        });
      } else if('css' === (''+options.type).toLowerCase()){
         froms.forEach(function(from, index){
          var regex = new RegExp('<link[^<]+?' + from + '.*?>');
          if(index === 0){
            src = src.replace(regex, '<link href="' + to + '" rel="stylesheet">');
          } else {
            src = src.replace(regex, '');
          }
        });
      } else if(options.type === undefined){
        grunt.log.error('"options.type" is necessary, and it must be "js" or "css".');
      } else {
        grunt.log.error('"options.type" must be "js" or "css".');
      }

      // Write the destination file.
      grunt.file.write(file.dest, src);
      // Print a success message.
      grunt.log.writeln('File "' + file.dest + '" created.');
    });
  });

};
