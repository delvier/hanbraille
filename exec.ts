#!/usr/bin/env node

import { Braille } from "./braille";
import { HanBraille } from "./hanbraille";

let help: string = 
`HanBraille - Hangul Braille Converter
Usage: hanbraille [-a] [-i] [-q] "Some string"
  -a    print results as Braille ASCII
  -i    consider isolated vowel 'i' as postpositions, rather than jamo themselves
  -q    consider final 'ieung' as null symbols
`;

let args: string[] = process.argv.slice(2);

if (process.stdin.isTTY && args.length < 1) {
    console.log(help);
    process.exit(1);
}
let ascii: boolean = false;
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
var hanbraille = new HanBraille(u11bc_null, u3163_isolate);
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
} else {
    let out = hanbraille.HangBrai(text);
    if (ascii) {
        out = hanbraille.BraiUCSToASCII(out);
    }
    console.log(out);
}