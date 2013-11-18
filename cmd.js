#!/usr/bin/env node

var command = require('./').command;
var debug = require('debug')('jipe.main');
var opts = require('optimist')
  .usage('Jipe - Filter, extract from and pretty print a stream of ' +
         'json objects.\nUsage: $0 [OPTIONS]')
  .options({
    help: {
      describe: 'Print this message',
      alias: 'h'
    },
    indent: {
      describe: 'Indent to use for pretty-printing json.',
      default: 4,
      alias: 'i'
    },
    query: {
      describe: 'An inquiry query',
      alias: 'q'
    }
  });

if (opts.argv.help) {
  opts.showHelp(console.log);
  process.exit(0);
}

debug('argv %j', opts.argv);
command(opts.argv);
