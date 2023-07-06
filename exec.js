#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hanbraille_1 = require("./hanbraille");
let help = `HanBraille - Hangul Braille Converter
Usage: hanbraille [-a] [-i] [-q] "Some string"
  -a    print results as Braille ASCII
  -i    consider isolated vowel 'i' as grammatical particles, rather than jamo themselves
  -q    consider final 'ieung' as null symbols
`;
let args = process.argv.slice(2);
if (process.stdin.isTTY && args.length < 1) {
    console.log(help);
    process.exit(1);
}
let ascii = false;
let text = '';
let u11bc_null = false;
let u3163_isolate = false;
for (let q of args) {
    if (q === '-a') {
        ascii = true;
    }
    else if (q === '-q') {
        u11bc_null = true;
    }
    else if (q === '-i') {
        u3163_isolate = true;
    }
    else if (text === '') {
        text = '' + q;
    }
    else {
        text = text.concat(' ', q);
    }
}
var hanbraille = new hanbraille_1.HanBraille(u11bc_null, u3163_isolate);
if (!process.stdin.isTTY) {
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => {
        text = chunk.toString().replace(/\r\n/g, '\n');
    })
        .on('end', () => {
        let out = hanbraille.HangBrai(text);
        if (ascii) {
            out = hanbraille.BraiUCSToASCII(out);
        }
        console.log(out);
    });
}
else {
    let out = hanbraille.HangBrai(text);
    if (ascii) {
        out = hanbraille.BraiUCSToASCII(out);
    }
    console.log(out);
}
