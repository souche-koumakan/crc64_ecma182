/**
 * Kaidi ZHU <zhukaidi@souche.com> created at 2017-09-05 17:31:16 with ❤
 *
 * Copyright (c) 2017 Souche.com, all rights reserved.
 */
'use strict';

const assert = require('assert');

require('should');

const crc64 = require('../');

describe('buffer test', function() {
    const retString = '11051210869376104954';
    const retBuffer = new Buffer([ 0xfa, 0x39, 0x19, 0xdf, 0xbb, 0xc9, 0x5d, 0x99 ]);

    it('check \'123456789\'', function() {
        const ret = crc64.crc64('123456789');
        ret.should.be.instanceof(Buffer);
        crc64.toUInt64String(ret).should.be.equal(retString);
        ret.length.should.be.equal(retBuffer.length);
        ret.compare(retBuffer).should.be.equal(0);
    });

    it('check Buffer(\'123456789\')', function() {
        const ret = crc64.crc64(new Buffer('123456789'));
        ret.should.be.instanceof(Buffer);
        crc64.toUInt64String(ret).should.be.equal(retString);
        ret.length.should.be.equal(retBuffer.length);
        ret.compare(retBuffer).should.be.equal(0);
    });

    it('check \'123456789\' with previous value', function() {
        const prev = Buffer.alloc(8);
        const ret = crc64.crc64('123456789', prev);
        ret.should.be.instanceof(Buffer);
        crc64.toUInt64String(ret).should.be.equal(retString);
        ret.length.should.be.equal(retBuffer.length);
        ret.compare(retBuffer).should.be.equal(0);
        assert.strictEqual(ret, prev);
    });

    it('check Buffer(\'123456789\') with previous value', function() {
        const prev = Buffer.alloc(8);
        const ret = crc64.crc64(new Buffer('123456789'), prev);
        ret.should.be.instanceof(Buffer);
        crc64.toUInt64String(ret).should.be.equal(retString);
        ret.length.should.be.equal(retBuffer.length);
        ret.compare(retBuffer).should.be.equal(0);
        assert.strictEqual(ret, prev);
    });
});
