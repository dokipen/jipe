# jipe

jipe is a pipe to filter, extract from and pretty print a stream of JSON
objects.

[![build status](https://secure.travis-ci.org/dokipen/jipe.png)](http://travis-ci.org/dokipen/jipe)

![Stolen Logo](http://i.imgur.com/L6qW35a.png)

## Using

    $ npm install jipe
    $ jipe --help
    $ jipe < abunchofjsonobjects.json

## Query Language

Internally, jipe uses [Inquiry](http://bigeasy.github.io/inquiry/) to filter and extract from JSON objects. Please refer to [Inquiry](http://bigeasy.github.io/inquiry/)'s documentation to find out how to query your JSON.

## FAQ

Is it efficient? No. I have spent zero effort making the parsing algorithm
efficient. I may or may not in the future.
