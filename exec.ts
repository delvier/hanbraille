#!/usr/bin/env node

import { Braille } from "./braille";
import { HanBraille } from "./hanbraille";

let help: string = 
`HanBraille - Hangul Braille Converter
Usage: hanbraille [-a] "Some string"
-a: prints results as Braille ASCII. Compatible with BRF.
`;

if (process.stdin.isTTY && process.argv.length < 3) {
    console.log(help);
    process.exit(1);
}
let ascii: boolean = false;
if (process.argv.includes("-a")) {
    ascii = true;
}
var hanbraille = new HanBraille(ascii);
let text = process.argv[process.argv.length - 1] ?? "다람쥐 헌 쳇바퀴에 타고파";
if (!process.stdin.isTTY) {
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => {
        text = chunk.toString().replace(/\r\n/g, '\n');
    })
    .on('end', () => {
        let out = hanbraille.HangToBrai(text);
        if (ascii) {
            out = hanbraille.BraiUCSToASCII(out);
        }
        console.log(out);
    });
} else {
    let out = hanbraille.HangToBrai(text);
    if (ascii) {
        out = hanbraille.BraiUCSToASCII(out);
    }
    console.log(out);
}