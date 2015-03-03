/* global global */
var async = require('async');
var passError = require('passerror');
var glob = require('glob');
var fs = require('fs');
var Path = require('path');
var expect = require('../lib/');
var vm = require('vm');
var extend = require('../lib/utils').extend;

var assertionsPath = Path.resolve(__dirname, '..', 'documentation');

async.waterfall([
    glob.bind(null, assertionsPath + '/**/*.md'),
    function (files, callback) {
        async.map(files, function (file, callback) {
            fs.readFile(file, passError(callback, function (data) {
                callback(null, {
                    name: file,
                    content: data.toString()
                });
            }));
        }, callback);
    },
    function (files, callback) {
        callback(null, files.map(function (file) {
            var oldGlobal = extend({}, global);
            global.expect = expect;

            var lastError;
            var updateContent = file.content.replace(/```(output|js|javascript)([\s\S]*?)```/gm, function ($0, lang, code) {
                switch (lang) {
                case 'js':
                case 'javascript':
                    try {
                        vm.runInThisContext(code);
                        lastError = null;
                    } catch (e) {
                        var errorMessage = e._isUnexpected ?
                            e.output.toString() :
                            e.message;

                        lastError = errorMessage;
                    }
                    return $0;
                case 'output':
                    return '```output\n' + (lastError || '') + '\n```';
                default:
                    return $0;
                }
            });

            Object.keys(global).forEach(function (key) {
                if (!(key in oldGlobal)) {
                    delete global[key];
                }
            });
            extend(global, oldGlobal);

            return { name: file.name, content: updateContent };
        }));
    },
    function (files, callback) {
        async.each(files, function (file, cb) {
            fs.writeFile(file.name, file.content, 'utf8', cb);
        }, callback);
    }
], function (err) {
    if (err) {
        throw err;
    }

    console.log('Done!');
});