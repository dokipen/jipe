![Stolen Logo](http://i.imgur.com/L6qW35a.png)

jipe is a pipe to filter, extract from and pretty print a stream of JSON
objects.

[![build status](https://secure.travis-ci.org/dokipen/jipe.png)](http://travis-ci.org/dokipen/jipe)

## Using

    $ npm install jipe
    $ jipe --help
    $ jipe < abunchofjsonobjects.json

## Query Language

Internally, jipe uses [Inquiry](http://bigeasy.github.io/inquiry/) to filter and extract from JSON objects. Please refer to [Inquiry](http://bigeasy.github.io/inquiry/)'s documentation to find out how to query your JSON.

## FAQ

Is it efficient? No. I have spent zero effort making the parsing algorithm
efficient. I may or may not in the future.

Is it safe? No. If you pass in invalid JSON, it will just keep buffering data
and trying to parse it until it explodes. It cannot recover from bad JSON.

What is valid JSON? Arrays and Objects. That's it. Valid JSON begins with
{ or [ and ends with } or ]. Any non-[ or non-{ characters before the starting
delimiter or after the ending delimeter are simply ignored.

Does it care about newlines? No, you json can span multple lines, and doesn't
need any newlines between objects.
