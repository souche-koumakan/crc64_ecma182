/**
 * Kaidi ZHU <zhukaidi@souche.com> created at 2017-09-05 16:43:17 with ❤
 *
 * Copyright (c) 2017 Souche.com, all rights reserved.
 */
'use strict';

const binding = require('../build/Release/crc64_ecma182');

/**
 * Calculate the CRC64-ECMA182 of a buffer
 * @param {Buffer} buff the buffer to be calculated
 * @param {Buffer} [prev] the previous CRC64-ECMA182 result
 * @returns {Buffer} the result, if `prev` is passed then the `result` is `prev`
 */
module.exports = function(buff, prev) {
    if(typeof buff === 'string') {
        buff = new Buffer(buff);
    }

    if(!Buffer.isBuffer(buff) || (prev && !Buffer.isBuffer(prev))) {
        throw new Error('Arguments should be instance of Buffer.');
    }

    return binding.crc64.apply(null, prev ? [ buff, prev ] : [ buff ]);
};
