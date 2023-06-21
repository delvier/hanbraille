# HanBraille

Hangul Braille Converter / 한글 점자 변환기

## Initialization

`npm i && tsc`

## Command-line usage

    $ node ./hanbraille.js "여기서 올라가라"
    ⠱⠈⠕⠠⠎⠀⠥⠂⠐⠣⠫⠐⠣`
    $ echo "여기서 구멍을 파라" | node ./hanbraille.js
    ⠱⠈⠕⠠⠎⠀⠈⠍⠑⠎⠶⠮⠀⠙⠐⠣`

- The example quotes are from _Pokémon ORAS_, known for remarkable usage of braille.

## Todo

- Cover all rules defined in "한국 점자 규정", including support for punctuations, Latin alphabet and numbers
- Proper order for Middle Korean pitch marks (방점)
- Reverse conversion
- Braille ASCII/BRF conversion mode
