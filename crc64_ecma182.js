/**
 * Kaidi ZHU <zhukaidi@souche.com> created at 2017-09-05 14:59:20 with ❤
 *
 * Copyright (c) 2017 Souche.com, all rights reserved.
 */
'use strict';

const fs = require('fs');

const binding = require('./build/Release/crc64_ecma182');
const crc64 = require('./lib/crc64_ecma182');

/**
 * Calculate the CRC64-ECMA182 of a buffer
 * @param {Buffer} buff the buffer to be calculated
 * @param {Buffer} [prev] the previous CRC64-ECMA182 result
 * @returns {Buffer} the result, if `prev` is passed then the `result` is `prev`
 */
exports.crc64 = function(buff, prev) {
    return crc64(buff, prev);
};

/**
 * Convert a result buffer into a UInt64 string
 * @param {Buffer} buff the buffer to be converted
 * @returns {String} the result string
 */
exports.toUInt64String = function(buff) {
    if(!(buff instanceof Buffer) || (buff.length != 8)) {
        throw new Error('Argument should be an 8-length buffer.');
    }

    return binding.toUInt64String(buff);
};

/**
 * Calculate the CRC64-ECMA182 of a file
 * @param {String} filename the filename
 * @param {Boolean} [toString] whether the result should convert to string or not, default to `true`
 * @param {Function} callback the callback function
 */
exports.crc64File = function(filename, toString, callback) {
    if(typeof toString === 'function') {
        callback = toString;
        toString = true;
    }

    let errored = false;
    const stream = fs.createReadStream(filename);
    stream.on('error', function(err) {
        errored = true;
        stream.destroy();
        return callback(err);
    });

    const ret = Buffer.alloc(8);
    stream.on('data', function(chunk) {
        exports.crc64(chunk, ret);
    });
    stream.on('end', function() {
        if(errored) return;
        return callback(undefined, toString ? exports.toUInt64String(ret) : ret);
    });
};
