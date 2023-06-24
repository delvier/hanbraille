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

The `-a` flag makes the output as [Braille ASCII](https://en.wikipedia.org/wiki/Braille_ASCII).

```console
$ node ./hanbraille.js "…1948년 7월 12일에 제정되고 8차에 걸쳐 개정된 헌법을 이제 국회의 의결을 거쳐 국민투표에 의하여 개정한다."
⠠⠠⠠⠼⠁⠒⠙⠓⠀⠉⠡⠀⠼⠛⠏⠂⠀⠼⠁⠃⠕⠂⠝⠀⠨⠝⠨⠻⠊⠽⠈⠥⠀⠼⠓⠰⠣⠝⠀⠈⠞⠰⠱⠀⠈⠗⠨⠻⠊⠽⠒⠀⠚⠾⠘⠎⠃⠮⠀⠕⠨⠝⠀⠈⠍⠁⠚⠽⠺⠀⠺⠈⠳⠮⠀⠈⠎⠰⠱⠀⠈⠍⠁⠑⠟⠓⠍⠙⠬⠝⠀⠺⠚⠣⠱⠀⠈⠗⠨⠻⠚⠒⠊⠲
$ node ./hanbraille.js -a "…1948년 7월 12일에 제정되고 8차에 걸쳐 개정된 헌법을 이제 국회의 의결을 거쳐 국민투표에 의하여 개정한다."
,,,#A3DH C* #GP1 #ABO1N .N.]IY@U #H;<N @T;: @R.]IY3 J)^SB! O.N @MAJYW W@\! @S;: @MAEQHMD+N WJ<: @R.]J3I4
```

- Constitution of the Republic of Korea (No. 10), Preamble, part of

```console
$ echo "ᄃᆡᄀᆡ 하나님이 셰샹ᄋᆞᆯ 사랑ᄒᆞ여 그 외아달ᄋᆞᆯ 주어
> 무론 밋ᄂᆞᆫ 쟈ᄂᆞᆫ 망ᄒᆞ물 면ᄒᆞ고 길이 살물 엇게 ᄒᆞ미니" | node ./hanbraille.js
⠊⠐⠼⠗⠈⠐⠼⠗⠀⠚⠉⠉⠕⠢⠕⠀⠠⠌⠠⠜⠶⠐⠼⠂⠀⠇⠐⠣⠶⠚⠐⠼⠱⠀⠈⠪⠀⠽⠣⠊⠂⠐⠼⠂⠀⠨⠍⠎
⠑⠍⠐⠷⠀⠑⠕⠄⠉⠐⠼⠒⠀⠨⠜⠉⠐⠼⠒⠀⠑⠶⠚⠐⠼⠑⠯⠀⠑⠡⠚⠐⠼⠈⠥⠀⠈⠕⠂⠕⠀⠇⠂⠑⠯⠀⠎⠄⠈⠝⠀⠚⠐⠼⠑⠕⠉⠕
```

- John 3:16, 《예수셩교젼셔》 (1887).

## Todo

- Cover all rules defined in "한국 점자 규정", including support for punctuations, Latin alphabet and numbers
- Reverse conversion
- Line length-concerning conversion
- Executable wrapper
