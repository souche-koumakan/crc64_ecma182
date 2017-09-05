# CRC64 ECMA182

Implement of CRC64-ECMA182 for Node.js.

## Installation

```sh
$ npm install --save crc64-ecma182
```

## Usage

### Calculate a Buffer

You can calculate the CRC64-ECMA182 value for a Node.js buffer or string:

```js
crc64.crc64(buff[, prev]);
```

+ Parameters:
    + `buff`: the buffer or string to be calculated;
    + [`prev`]: if exists, `prev` indicates the previous CRC64-ECMA182 value and the result of this function will strict equal to `prev`; (**optional**)
+ Returns: the result buffer that calculated.


```js
const crc64 = require("crc64-ecma182");
const ret1 = crc64.crc64("123456789");
const ret2 = crc64.crc64(new Buffer("123456789"));
const ret3 = crc64.crc64("123456789", Buffer.alloc(8));
const ret4 = crc64.crc64(new Buffer("123456789"), Buffer.alloc(8));

// ret1 ~ ret2 all equals to:
//
//   [ 0xfa, 0x39, 0x19, 0xdf, 0xbb, 0xc9, 0x5d, 0x99 ]
```

### Calculate a file

You can calculate the CRC64-ECMA182 value for a file:

```js
crc64.crc64File(filename[, toString], callback);
```

+ Parameters:
    + `filename`: the file's name that to be calculated;
    + `toString`: to decide wether the result should be a buffer or a UInt64 string, default to `true`; (**optional**)
    + `callback`: the callback function which receives two arguments `err` and `ret`.

```js
crc64.crc64File(path.join(__dirname, "pic.png"), function(err, ret) {
    console.log(err, ret);

    // a possible result:
    //
    //   undefined 5178350320981835788
});
```

### Convert Result Buffer to String

If you get a CRC64-ECMA182 result in Buffer, you could convert it to a UInt64 string via function:

```js
crc64.toUInt64String(buff);
```

+ Parameters:
    + `buff`: the CRC64-ECMA182 buffer result;
+ Returns: the UInt64 string.

```js
const ret1 = crc64.crc64("123456789");
const str = crc64.toUInt64String(ret1); // 11051210869376104954
```

## Contribution

You're welcome to make pull-requests.
