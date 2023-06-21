# HanBraille

Hangul Braille Converter / 한글 점자 변환기

Supports modern Hangul as well as common obsolete Hangul jamo (옛한글), including ㆁㆆㅿㆍ etc..

## Initialization

```console
npm i && tsc
```

## Command-line usage

```console
$ node ./hanbraille.js "여기서 올라가라"
⠱⠈⠕⠠⠎⠀⠥⠂⠐⠣⠫⠐⠣
$ node ./hanbraille.js "여기서 구멍을 파라"
⠱⠈⠕⠠⠎⠀⠈⠍⠑⠎⠶⠮⠀⠙⠐⠣
```

- The above quotes are from _Pokémon ORAS_, known for remarkable usage of braille.

```console
$ echo "ᄃᆡᄀᆡ 하나님이 셰샹ᄋᆞᆯ 사랑ᄒᆞ여 그 외아달ᄋᆞᆯ 주어
\> 무론 밋ᄂᆞᆫ 쟈ᄂᆞᆫ 망ᄒᆞ물 면ᄒᆞ고 길이 살물 엇게 ᄒᆞ미니" \| node ./hanbraille.js
⠊⠐⠼⠗⠈⠐⠼⠗⠀⠚⠉⠉⠕⠢⠕⠀⠠⠌⠠⠜⠶⠐⠼⠂⠀⠇⠐⠣⠶⠚⠐⠼⠱⠀⠈⠪⠀⠽⠣⠊⠂⠐⠼⠂⠀⠨⠍⠎
⠑⠍⠐⠷⠀⠑⠕⠄⠉⠐⠼⠒⠀⠨⠜⠉⠐⠼⠒⠀⠑⠶⠚⠐⠼⠑⠯⠀⠑⠡⠚⠐⠼⠈⠥⠀⠈⠕⠂⠕⠀⠇⠂⠑⠯⠀⠎⠄⠈⠝⠀⠚⠐⠼⠑⠕⠉⠕
```

- John 3:16, 《예수셩교젼셔》 (1887).

## Todo

- Cover all rules defined in "한국 점자 규정", including support for punctuations, Latin alphabet and numbers
- Proper order for Middle Korean pitch marks (방점)
- Reverse conversion
- Braille ASCII/BRF conversion mode
