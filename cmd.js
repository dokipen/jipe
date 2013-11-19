#!/usr/bin/env node

var usage =
  "\n" +
  "       ========== --- ===== =======\n" +
  "      ========== - - ======= =====\n" +
  "            === - - ==   ===\n" +
  "           === - - ==   ===\n" +
  "          === - - ======= ===\n" +
  "         === - - ===== =====\n" +
  "  ===   === - - ===  ===\n" +
  " ===   === - - ===  ===\n" +
  " ======== - - ===  =========\n" +
  "   ====  --- ===  =========\n" +
  "\n" +
  " Filter, extract and pretty-print streams of JSON objects like a pro.\n" +
  "\n" +
  " Bug reports: http://www.github.com/dokipen/jipe/issues\n" +
  " Usage: $0 [OPTIONS]";

var command = require('./').command;
var debug = require('debug')('jipe.main');
var opts = require('optimist')
  .usage(usage)
  .options({
    help: {
      desc: 'Print this message',
      alias: 'h'
    },
    indent: {
      desc: 'Indent to use for pretty-printing json.',
      default: 4,
      alias: 'i'
    },
    inquiry: {
      desc: 'An Inquiry expression.  See http://bigeasy.github.io/inquiry/.',
      string: true,
      alias: 'I'
    },
    jsonpath: {
      desc: 'A JSONPath expression.  See https://github.com/s3u/JSONPath.',
      string: true,
      alias: 'j'
    },
    skip: {
      desc: 'Skip some characters at the beginning of input.  Useful ' +
            'if input is wrapped in an array.',
      default: 0,
      alias: 's'
    }
  }).wrap(82);

if (opts.argv.help) {
  opts.showHelp(console.log);
  process.exit(0);
}

debug('argv %j', opts.argv);
command(opts.argv);
