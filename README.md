![Stolen Logo](http://i.imgur.com/L6qW35a.png)

[![build status](https://secure.travis-ci.org/dokipen/jipe.png)](http://travis-ci.org/dokipen/jipe)

jipe is a pipe to filter, extract from and pretty print a stream of JSON
objects. It can be used from the shell, or as a nodejs library.

## Using

Always use `jipe --help` to get the latest documentation.

    $ npm install jipe
    $ jipe --help
    $ jipe < abunchofjsonobjects.json

## Using as a Library

You are incouraged to also use jipe as a library.  The following streams are
available:

jipe.Parse    - The parser, input is a binary stream and output is an object
                stream. Optional `skip` option is support to skip first n
                bytes of the input stream.
jipe.Inquery  - Inquery filter. Objects in and out. Takes a `query` argument
                that is a valid [Inquiry](http://bigeasy.github.io/inquiry/)
                expression.
jipe.JSONPath - JSONPath filter. Objects in and out. Takes a `query` argument
                that is a valid [JSONPath](https://github.com/s3u/JSONPath)
                expression.
jipe.Pp       - The pretty printer. Optional `indent` option is supported and is
                4 by default. Takes an object stream as input and outputs a
                binary stream.

## Query Language

There are multiple query languages supported, depending on which parameter are
passed.  Please refer to the individual packages for docuntation of their query
languages.

--jsonpath uses [JSONPath](https://github.com/s3u/JSONPath)

--inquery uses [Inquiry](http://bigeasy.github.io/inquiry/)

## Additional Features

Sometimes you have an enormous JSON array of objects or other arrays and you'd
like to treat each element seperately.  The --skip option was created for this
purpose. Since the jipe parser ignores anything in between objects, if you tell
it to skip the opening left bracket, it will treat each of the elements as it's
own event.  --skip takes a number argument and will skip that number of bytes
from the beginning of the input stream.

## FAQ

Is it efficient? No. I have spent zero effort making the parsing algorithm
efficient. I may or may not in the future.

Is it safe? No. If you pass in invalid JSON, it will just keep buffering data
and trying to parse it until it explodes. It cannot recover from bad JSON.

What is valid JSON? Arrays and Objects. That's it. Valid JSON begins with
{ or [ and ends with } or ]. Any non-[ or non-{ characters before the starting
delimiter or after the ending delimeter are simply ignored.

Does it care about newlines? No, your JSON can span multple lines, and doesn't
need any newlines between objects.
