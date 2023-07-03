import { Braille } from "./braille";
export class HanBraille extends Braille {
    constructor(asciiMode: boolean = false, u11bc_null: boolean = false) {
        super();
        this.asciiMode = asciiMode;
        this.u11bc_null = u11bc_null;
    }
    u11bc_null: boolean = false;
    HangToBrai(hang: string, width: number = 0): string {
        let d: string = hang.normalize('NFD');
        let o: string = "";
        let p: string = "";
        let linePos: number = 0;
        let isNumeric: boolean = false;
        let isUEB: boolean = false;
        let isCapital: boolean = false;
        let isInitial: boolean = true;
        let prohibitContract: boolean = false;
        while (d !== "") {
            /* Code switching */
            if (!isNumeric && d.match(/^[0-9]/gu)) {
                //Enabling numeric mode in front of digits
                isNumeric = true;
                o += HanBraille.DotsToUni(3,4,5,6);
            }
            else if (!isUEB && d.match(/^[A-Za-z@#^&\u0391-\u03a1\u03a3-\u03a9\u03b1-\u03c9]/)) {
                //Enabling UEB mode in front of Basic Latin or Greek
                isUEB = true;
                isInitial = true;
                o += HanBraille.DotsToUni(3,5,6);
                prohibitContract = true;
            }
            else if (isNumeric && d.match(/^[^0-9.,~\-]/gu)) {
                //Disabling numeric mode after non-digit appears
                // Korean rule accepts hyphens and swung dashes while numeric mode, unlike UEB
                isNumeric = false;
                if (o.match(/\u2824$/) && d.match(/^[\u1102\u1103\u1106\u110f-\u1112]\u1161/gu)) {
                    //hyphen before 나다마카타파하
                    prohibitContract = true;
                }
                else if (d.match(/^([\u1102\u1103\u1106\u110f-\u1112]|\u110b\u116e\u11ab)/gu)) {
                    //number before ㄴㄷㅁㅋㅌㅍㅎ운
                    o += HanBraille.DotsToUni(0);
                }
            }
            else if (isUEB && d.match(/^[0-9\p{P}][^A-Za-z@#^&\u0391-\u03a1\u03a3-\u03a9\u03b1-\u03c9]/gu)) {
                isUEB = false;
            }
            else if (isUEB && d.match(/^\s[^A-Za-z@#^&\u0391-\u03a1\u03a3-\u03a9\u03b1-\u03c9]/gu)) {
                isUEB = false;
                isInitial = true;
                o += HanBraille.DotsToUni(2,5,6);
            }
            /** Code switching: UEB capital **/
            if (isUEB && !isCapital && d.match(/^\p{Lu}+(\s+\p{Lu}+){2,}/gu)) {
                isCapital = true;
                o += Braille.BraiToUCS([6],[6],[6]);
            }
            else if (isUEB && !isCapital && d.match(/^\p{Lu}+/gu)) {
                isCapital = true;
                o += Braille.BraiToUCS([6],[6]);
            }
            else if (isUEB && !isCapital && d.match(/^\p{Lu}/gu)) {
                o += Braille.BraiToUCS([6]);
            }
            else if (isUEB && isCapital && d.match(/^[^\s\p{Lu}]/gu)) {
                isCapital = false;
                o += Braille.BraiToUCS([6],[3]);
            }
            /* Actual conversion */
            if (d[0].match(/^\n/)) {
                isInitial = true;
                o += '\n';
                p = d[0];
                d = d.slice(1);
            }
            else if (d[0].match(/^ /gu)) {
                //whitespace is special
                isInitial = true;
                o += HanBraille.DotsToUni(0);
                p = d[0];
                d = d.slice(1);
            }
            else if (!isUEB) hanExit: {
                for (const x of this.#hanMappingAntiCollision) {
                    let p_regexp = new RegExp(x[0][0], 'gu');
                    let d_regexp = new RegExp('^' + x[0][1], 'gu');
                    if (p_regexp.test(p) && d_regexp.test(d)) {
                        o += x[1][0];
                    }
                }
                if (!prohibitContract) {
                    for (const x of this.#hanMappingContract) {
                        let regexp = new RegExp('^' + x[0], 'gu');
                        if (regexp.test(d)) {
                            o += x[1][0];
                            p = d[0];
                            d = d.slice(regexp.lastIndex);
                            break hanExit;
                        }
                    }
                }
                for (const x of this.#hanMapping) {
                    let regexp = new RegExp('^' + x[0], 'gu');
                    if (regexp.test(d)) {
                        o += x[1][0];
                        p = d[0];
                        d = d.slice(regexp.lastIndex);
                        prohibitContract = false;
                        break hanExit;
                    }
                }
                console.log(`Skipping ${d[0]}...`);
                d = d.slice(1);
            }
            else if (isUEB) UEBExit: {
                /*
                if (!prohibitContract) {
                    for (const x of this.UEB2) {
                        let regexp = new RegExp('^' + x[0], 'gu');
                        if (regexp.test(d.toLowerCase())) {
                            o += x[1][0];
                            p = d[0];
                            d = d.slice(regexp.lastIndex);
                            break UEBExit;
                        }
                    }
                }*/
                for (const x of this.UEB) {
                    let regexp = new RegExp('^' + x[0], 'gu');
                    if (regexp.test(d.toLowerCase())) {
                        o += x[1][0];
                        p = d[0];
                        d = d.slice(regexp.lastIndex);
                        prohibitContract = false;
                        break UEBExit;
                    }
                }
                console.log(`Skipping ${d[0]}...`);
                d = d.slice(1);
            }
            
        }
        if (this.asciiMode) {
            o =  Braille.BraiUCSToASCII(o);
        }
        return o;
    }
    readonly #hanMappingAntiCollision: Map<string[], string[]> = new Map([
        // [[prev, next], [...candidates]]
        //제5절: Vowel chain
        [['[\u1161-\u11a7]', '\u110b\u1168'], [HanBraille.BraiToUCS([3,6])]], //(V)예: 제10항
        [['[\u1163\u116a\u116e\u116f]', '\u110b\u1162'], [HanBraille.BraiToUCS([3,6])]], //([ㅑㅘㅜㅝ])애: 제11항
    ])
    readonly #hanMappingContract: Map<string, string[]> = new Map([
        /* Special cases */
        //제52~58항: opening and closing
        //['"(.*)"', [HanBraille.DotsToUni(2,3,6) + '$1' + HanBraille.DotsToUni(3,5,6)]],
        //["'(.*)'", [HanBraille.BraiToUCS([6],[2,3,6]) + '$1' + HanBraille.BraiToUCS([3,5,6],[3])]],
        //제28항; This needs to go *before* the syllable, unlike UCS hangul
        ////always first because this changes character order; ignored if not related to hangul syllable
        //['([\u1100-\u115f][\u1160-\u11a7][\u11a8-\u11ff]?)\u302e', [HanBraille.BraiToUCS([4,5,6],[2]) + '$1']], //거성 1점
        //['([\u1100-\u115f][\u1160-\u11a7][\u11a8-\u11ff]?)\u302f', [HanBraille.BraiToUCS([4,5,6],[1,3]) + '$1']], //상성 2점
        //제7절: Abbr. Only at the beginning of the line, or after a whitespace or a punctuation
        ['(?<=^|\\s|\\p{P})그래서'.normalize('NFD'), [HanBraille.BraiToUCS([1],[2,3,4])]], //그래서
        ['(?<=^|\\s|\\p{P})그러나'.normalize('NFD'), [HanBraille.BraiToUCS([1],[1,2])]], //그러나
        ['(?<=^|\\s|\\p{P})그러면'.normalize('NFD'), [HanBraille.BraiToUCS([1],[2,5])]], //그러면
        ['(?<=^|\\s|\\p{P})그러므로'.normalize('NFD'), [HanBraille.BraiToUCS([1],[2,6])]], //그러므로
        ['(?<=^|\\s|\\p{P})그런데'.normalize('NFD'), [HanBraille.BraiToUCS([1],[1,3,4,5])]], //그런데
        ['(?<=^|\\s|\\p{P})그리고'.normalize('NFD'), [HanBraille.BraiToUCS([1],[1,3,6])]], //그리고
        ['(?<=^|\\s|\\p{P})그리하여'.normalize('NFD'), [HanBraille.BraiToUCS([1],[1,5,6])]], //그리하여
        //제6절: Shorthands
        ////17항: shorthand prohibition
        ['나\u110b'.normalize('NFD'), [HanBraille.BraiToUCS([1,4],[1,2,6])]], //나ㅇ
        ['다\u110b'.normalize('NFD'), [HanBraille.BraiToUCS([2,4],[1,2,6])]], //다ㅇ
        ['따\u110b'.normalize('NFD'), [HanBraille.BraiToUCS([6],[2,4],[1,2,6])]], //따ㅇ
        ['마\u110b'.normalize('NFD'), [HanBraille.BraiToUCS([1,5],[1,2,6])]], //마ㅇ
        ['바\u110b'.normalize('NFD'), [HanBraille.BraiToUCS([4,5],[1,2,6])]], //바ㅇ
        ['빠\u110b'.normalize('NFD'), [HanBraille.BraiToUCS([6],[4,5],[1,2,6])]], //빠ㅇ
        ['자\u110b'.normalize('NFD'), [HanBraille.BraiToUCS([4,6],[1,2,6])]], //자ㅇ
        ['짜\u110b'.normalize('NFD'), [HanBraille.BraiToUCS([6],[4,6],[1,2,6])]], //짜ㅇ
        ['카\u110b'.normalize('NFD'), [HanBraille.BraiToUCS([1,2,4],[1,2,6])]], //카ㅇ
        ['타\u110b'.normalize('NFD'), [HanBraille.BraiToUCS([1,2,5],[1,2,6])]], //타ㅇ
        ['파\u110b'.normalize('NFD'), [HanBraille.BraiToUCS([1,4,5],[1,2,6])]], //파ㅇ
        ['하\u110b'.normalize('NFD'), [HanBraille.BraiToUCS([2,4,5],[1,2,6])]], //하ㅇ
        ['팠'.normalize('NFD'), [HanBraille.BraiToUCS([1,4,5],[1,2,6],[3,4])]], //팠
        ////16항: exceptional shorthands
        ['성'.normalize('NFD'), [HanBraille.BraiToUCS([6],[1,2,4,5,6])]], //성
        ['썽'.normalize('NFD'), [HanBraille.BraiToUCS([6],[6],[1,2,4,5,6])]], //썽
        ['정'.normalize('NFD'), [HanBraille.BraiToUCS([4,6],[1,2,4,5,6])]], //정
        ['쩡'.normalize('NFD'), [HanBraille.BraiToUCS([6],[4,6],[1,2,4,5,6])]], //쩡
        ['청'.normalize('NFD'), [HanBraille.BraiToUCS([5,6],[1,2,4,5,6])]], //청
        ['셩'.normalize('NFD'), [HanBraille.BraiToUCS([6],[1,5,6],[3,4,5,6])]], //셩
        ['쎵'.normalize('NFD'), [HanBraille.BraiToUCS([6],[6],[1,5,6],[3,4,5,6])]], //쎵
        ['졍'.normalize('NFD'), [HanBraille.BraiToUCS([4,6],[1,5,6],[3,4,5,6])]], //졍
        ['쪙'.normalize('NFD'), [HanBraille.BraiToUCS([6],[4,6],[1,5,6],[3,4,5,6])]], //쪙
        ['쳥'.normalize('NFD'), [HanBraille.BraiToUCS([5,6],[1,5,6],[3,4,5,6])]], //쳥
        ////12~15항
        ['가'.normalize('NFD'), [HanBraille.DotsToUni(1,2,4,6)]], //가
        ['까'.normalize('NFD'), [HanBraille.BraiToUCS([6],[1,2,4,6])]], //까
        ['나'.normalize('NFD'), [HanBraille.DotsToUni(1,4)]], //나
        ['다'.normalize('NFD'), [HanBraille.DotsToUni(2,4)]], //다
        ['따'.normalize('NFD'), [HanBraille.BraiToUCS([6],[2,4])]], //따
        ['마'.normalize('NFD'), [HanBraille.DotsToUni(1,5)]], //마
        ['바'.normalize('NFD'), [HanBraille.DotsToUni(4,5)]], //바
        ['빠'.normalize('NFD'), [HanBraille.BraiToUCS([6],[4,5])]], //빠
        ['사'.normalize('NFD'), [HanBraille.DotsToUni(1,2,3)]], //사
        ['싸'.normalize('NFD'), [HanBraille.BraiToUCS([6],[1,2,3])]], //싸
        ['자'.normalize('NFD'), [HanBraille.DotsToUni(4,6)]], //자
        ['짜'.normalize('NFD'), [HanBraille.BraiToUCS([6],[4,6])]], //짜
        ['카'.normalize('NFD'), [HanBraille.DotsToUni(1,2,4)]], //카
        ['타'.normalize('NFD'), [HanBraille.DotsToUni(1,2,5)]], //타
        ['파'.normalize('NFD'), [HanBraille.DotsToUni(1,4,5)]], //파
        ['하'.normalize('NFD'), [HanBraille.DotsToUni(2,4,5)]], //하
        ['\u1165\u11a8', [HanBraille.DotsToUni(1,4,5,6)]], //ᅟᅥᆨ
        ['\u1165\u11a9', [HanBraille.BraiToUCS([1,4,5,6],[1])]], //ᅟᅥᆩ
        ['\u1165\u11aa', [HanBraille.BraiToUCS([1,4,5,6],[3])]], //ᅟᅥᆪ
        ['\u1165\u11ab', [HanBraille.DotsToUni(2,3,4,5,6)]], //ᅟᅥᆫ
        ['\u1165\u11ac', [HanBraille.BraiToUCS([2,3,4,5,6],[1,3])]], //ᅟᅥᆬ
        ['\u1165\u11ad', [HanBraille.BraiToUCS([2,3,4,5,6],[3,5,6])]], //ᅟᅥᆭ
        ['\u1165\u11af', [HanBraille.DotsToUni(2,3,4,5)]], //ᅟᅥᆯ
        ['\u1165\u11b0', [HanBraille.BraiToUCS([2,3,4,5],[1])]], //ᅟᅥᆰ
        ['\u1165\u11b1', [HanBraille.BraiToUCS([2,3,4,5],[2,6])]], //ᅟᅥᆱ
        ['\u1165\u11b2', [HanBraille.BraiToUCS([2,3,4,5],[1,2])]], //ᅟᅥᆲ
        ['\u1165\u11b3', [HanBraille.BraiToUCS([2,3,4,5],[3])]], //ᅟᅥᆳ
        ['\u1165\u11b4', [HanBraille.BraiToUCS([2,3,4,5],[2,3,6])]], //ᅟᅥᆴ
        ['\u1165\u11b5', [HanBraille.BraiToUCS([2,3,4,5],[2,5,6])]], //ᅟᅥᆵ
        ['\u1165\u11b6', [HanBraille.BraiToUCS([2,3,4,5],[3,5,6])]], //ᅟᅥᆶ
        ['\u1167\u11ab', [HanBraille.DotsToUni(1,6)]], //ᅟᅧᆫ
        ['\u1167\u11ac', [HanBraille.BraiToUCS([1,6],[1,3])]], //ᅟᅧᆬ
        ['\u1167\u11ad', [HanBraille.BraiToUCS([1,6],[3,5,6])]], //ᅟᅧᆭ
        ['\u1167\u11af', [HanBraille.DotsToUni(1,2,5,6)]], //ᅟᅧᆯ
        ['\u1167\u11b0', [HanBraille.BraiToUCS([1,2,5,6],[1])]], //ᅟᅧᆰ
        ['\u1167\u11b1', [HanBraille.BraiToUCS([1,2,5,6],[2,6])]], //ᅟᅧᆱ
        ['\u1167\u11b2', [HanBraille.BraiToUCS([1,2,5,6],[1,2])]], //ᅟᅧᆲ
        ['\u1167\u11b3', [HanBraille.BraiToUCS([1,2,5,6],[3])]], //ᅟᅧᆳ
        ['\u1167\u11b4', [HanBraille.BraiToUCS([1,2,5,6],[2,3,6])]], //ᅟᅧᆴ
        ['\u1167\u11b5', [HanBraille.BraiToUCS([1,2,5,6],[2,5,6])]], //ᅟᅧᆵ
        ['\u1167\u11b6', [HanBraille.BraiToUCS([1,2,5,6],[3,5,6])]], //ᅟᅧᆶ
        ['\u1167\u11bc', [HanBraille.DotsToUni(1,2,4,5,6)]], //ᅟᅧᆼ
        ['\u1169\u11a8', [HanBraille.DotsToUni(1,3,4,6)]], //ᅟᅩᆨ
        ['\u1169\u11a9', [HanBraille.BraiToUCS([1,3,4,6],[1])]], //ᅟᅩᆩ
        ['\u1169\u11aa', [HanBraille.BraiToUCS([1,3,4,6],[3])]], //ᅟᅩᆪ
        ['\u1169\u11ab', [HanBraille.DotsToUni(1,2,3,5,6)]], //ᅟᅩᆫ
        ['\u1169\u11ac', [HanBraille.BraiToUCS([1,2,3,5,6],[1,3])]], //ᅟᅩᆬ
        ['\u1169\u11ad', [HanBraille.BraiToUCS([1,2,3,5,6],[3,5,6])]], //ᅟᅩᆭ
        ['\u1169\u11bc', [HanBraille.DotsToUni(1,2,3,4,5,6)]], //ᅟᅩᆼ
        ['\u116e\u11ab', [HanBraille.DotsToUni(1,2,4,5)]], //ᅟᅮᆫ
        ['\u116e\u11ac', [HanBraille.BraiToUCS([1,2,4,5],[1,3])]], //ᅟᅮᆬ
        ['\u116e\u11ad', [HanBraille.BraiToUCS([1,2,4,5],[3,5,6])]], //ᅟᅮᆭ
        ['\u116e\u11af', [HanBraille.DotsToUni(1,2,3,4,6)]], //ᅟᅮᆯ
        ['\u116e\u11b0', [HanBraille.BraiToUCS([1,2,3,4,6],[1])]], //ᅟᅮᆰ
        ['\u116e\u11b1', [HanBraille.BraiToUCS([1,2,3,4,6],[2,6])]], //ᅟᅮᆱ
        ['\u116e\u11b2', [HanBraille.BraiToUCS([1,2,3,4,6],[1,2])]], //ᅟᅮᆲ
        ['\u116e\u11b3', [HanBraille.BraiToUCS([1,2,3,4,6],[3])]], //ᅟᅮᆳ
        ['\u116e\u11b4', [HanBraille.BraiToUCS([1,2,3,4,6],[2,3,6])]], //ᅟᅮᆴ
        ['\u116e\u11b5', [HanBraille.BraiToUCS([1,2,3,4,6],[2,5,6])]], //ᅟᅮᆵ
        ['\u116e\u11b6', [HanBraille.BraiToUCS([1,2,3,4,6],[3,5,6])]], //ᅟᅮᆶ
        ['\u1173\u11ab', [HanBraille.DotsToUni(1,3,5,6)]], //ᅟᅳᆫ
        ['\u1173\u11ac', [HanBraille.BraiToUCS([1,3,5,6],[1,3])]], //ᅟᅳᆬ
        ['\u1173\u11ad', [HanBraille.BraiToUCS([1,3,5,6],[3,5,6])]], //ᅟᅳᆭ
        ['\u1173\u11af', [HanBraille.DotsToUni(2,3,4,6)]], //ᅟᅳᆯ
        ['\u1173\u11b0', [HanBraille.BraiToUCS([2,3,4,6],[1])]], //ᅟᅳᆰ
        ['\u1173\u11b1', [HanBraille.BraiToUCS([2,3,4,6],[2,6])]], //ᅟᅳᆱ
        ['\u1173\u11b2', [HanBraille.BraiToUCS([2,3,4,6],[1,2])]], //ᅟᅳᆲ
        ['\u1173\u11b3', [HanBraille.BraiToUCS([2,3,4,6],[3])]], //ᅟᅳᆳ
        ['\u1173\u11b4', [HanBraille.BraiToUCS([2,3,4,6],[2,3,6])]], //ᅟᅳᆴ
        ['\u1173\u11b5', [HanBraille.BraiToUCS([2,3,4,6],[2,5,6])]], //ᅟᅳᆵ
        ['\u1173\u11b6', [HanBraille.BraiToUCS([2,3,4,6],[3,5,6])]], //ᅟᅳᆶ
        ['\u1175\u11ab', [HanBraille.DotsToUni(1,2,3,4,5)]], //ᅟᅵᆫ
        ['\u1175\u11ac', [HanBraille.BraiToUCS([1,2,3,4,5],[1,3])]], //ᅟᅵᆬ
        ['\u1175\u11ad', [HanBraille.BraiToUCS([1,2,3,4,5],[3,5,6])]], //ᅟᅵᆭ
        ['것'.normalize('NFD'), [HanBraille.BraiToUCS([4,5,6],[2,3,4])]], //것
        ['껏'.normalize('NFD'), [HanBraille.BraiToUCS([6],[4,5,6],[2,3,4])]], //껏
    ]);
    readonly #hanMapping: Map<string, string[]> = new Map([
        //Numeric
        ['0', [Braille.DotsToUni(2,4,5)]],
        ['1', [Braille.DotsToUni(1)]],
        ['2', [Braille.DotsToUni(1,2)]],
        ['3', [Braille.DotsToUni(1,4)]],
        ['4', [Braille.DotsToUni(1,4,5)]],
        ['5', [Braille.DotsToUni(1,5)]],
        ['6', [Braille.DotsToUni(1,2,4)]],
        ['7', [Braille.DotsToUni(1,2,4,5)]],
        ['8', [Braille.DotsToUni(1,2,5)]],
        ['9', [Braille.DotsToUni(2,4)]],
        //제1절
        ['\u1100', [HanBraille.DotsToUni(4)]], //ㄱ
        ['\u1101', [HanBraille.BraiToUCS([6],[4])]], //ㄲ
        ['\u1102', [HanBraille.DotsToUni(1,4)]], //ㄴ
        ['\u1103', [HanBraille.DotsToUni(2,4)]], //ㄷ
        ['\u1104', [HanBraille.BraiToUCS([6],[2,4])]], //ㄸ
        ['\u1105', [HanBraille.DotsToUni(5)]], //ㄹ
        ['\u1106', [HanBraille.DotsToUni(1,5)]], //ㅁ
        ['\u1107', [HanBraille.DotsToUni(4,5)]], //ㅂ
        ['\u1108', [HanBraille.BraiToUCS([6],[4,5])]], //ㅃ
        ['\u1109', [HanBraille.DotsToUni(6)]], //ㅅ
        ['\u110a', [HanBraille.BraiToUCS([6],[6])]], //ㅆ
        ['\u110b', ["",
                    HanBraille.DotsToUni(1,2,4,5)]], //ㅇ: normally not written, 1-2-4-5 is a fallback
        ['\u110c', [HanBraille.DotsToUni(4,6)]], //ㅈ
        ['\u110d', [HanBraille.BraiToUCS([6],[4,6])]], //ㅉ
        ['\u110e', [HanBraille.DotsToUni(5,6)]], //ㅊ
        ['\u110f', [HanBraille.DotsToUni(1,2,4)]], //ㅋ
        ['\u1110', [HanBraille.DotsToUni(1,2,5)]], //ㅌ
        ['\u1111', [HanBraille.DotsToUni(1,4,5)]], //ㅍ
        ['\u1112', [HanBraille.DotsToUni(2,4,5)]], //ㅎ
        //제3절
        ['\u1161', [HanBraille.DotsToUni(1,2,6)]], //ㅏ
        ['\u1162', [HanBraille.DotsToUni(1,2,3,5)]], //ㅐ
        ['\u1163', [HanBraille.DotsToUni(3,4,5)]], //ㅑ
        ['\u1164', [HanBraille.BraiToUCS([3,4,5],[1,2,3,5])]], //ㅒ
        ['\u1165', [HanBraille.DotsToUni(2,3,4)]], //ㅓ
        ['\u1166', [HanBraille.DotsToUni(1,3,4,5)]], //ㅔ
        ['\u1167', [HanBraille.DotsToUni(1,5,6)]], //ㅕ
        ['\u1168', [HanBraille.DotsToUni(3,4)]], //ㅖ*
        ['\u1169', [HanBraille.DotsToUni(1,3,6)]], //ㅗ
        ['\u116a', [HanBraille.DotsToUni(1,2,3,6)]], //ㅘ
        ['\u116b', [HanBraille.BraiToUCS([1,2,3,6],[1,2,3,5])]], //ㅙ
        ['\u116c', [HanBraille.DotsToUni(1,3,4,5,6)]], //ㅚ
        ['\u116d', [HanBraille.DotsToUni(3,4,6)]], //ㅛ
        ['\u116e', [HanBraille.DotsToUni(1,3,4)]], //ㅜ
        ['\u116f', [HanBraille.DotsToUni(1,2,3,4)]], //ㅝ
        ['\u1170', [HanBraille.BraiToUCS([1,2,3,4],[1,2,3,5])]], //ㅞ
        ['\u1171', [HanBraille.BraiToUCS([1,3,4],[1,2,3,5])]], //ㅟ
        ['\u1172', [HanBraille.DotsToUni(1,4,6)]], //ㅠ
        ['\u1173', [HanBraille.DotsToUni(2,4,6)]], //ㅡ
        ['\u1174', [HanBraille.DotsToUni(2,4,5,6)]], //ㅢ
        ['\u1175', [HanBraille.DotsToUni(1,3,5)]], //ㅣ
        //제2절
        ['\u11a8', [HanBraille.DotsToUni(1)]], //-ㄱ
        ['\u11a9', [HanBraille.BraiToUCS([1],[1])]], //-ㄲ
        ['\u11aa', [HanBraille.BraiToUCS([1],[3])]], //-ㄳ
        ['\u11ab', [HanBraille.DotsToUni(2,5)]], //-ㄴ
        ['\u11ac', [HanBraille.BraiToUCS([2,5], [1,3])]], //-ㄵ
        ['\u11ad', [HanBraille.BraiToUCS([2,5], [3,5,6])]], //-ㄶ
        ['\u11ae', [HanBraille.DotsToUni(3,5)]], //-ㄷ
        ['\u11af', [HanBraille.DotsToUni(2)]], //-ㄹ
        ['\u11b0', [HanBraille.BraiToUCS([2], [1])]], //-ㄺ
        ['\u11b1', [HanBraille.BraiToUCS([2], [2,6])]], //-ㄻ
        ['\u11b2', [HanBraille.BraiToUCS([2], [1,2])]], //-ㄼ
        ['\u11b3', [HanBraille.BraiToUCS([2], [3])]], //-ㄽ
        ['\u11b4', [HanBraille.BraiToUCS([2], [2,3,6])]], //-ㄾ
        ['\u11b5', [HanBraille.BraiToUCS([2], [2,5,6])]], //-ㄿ
        ['\u11b6', [HanBraille.BraiToUCS([2], [3,5,6])]], //-ㅀ
        ['\u11b7', [HanBraille.DotsToUni(2,6)]], //-ㅁ
        ['\u11b8', [HanBraille.DotsToUni(1,2)]], //-ㅂ
        ['\u11b9', [HanBraille.BraiToUCS([1,2], [3])]], //-ㅄ
        ['\u11ba', [HanBraille.DotsToUni(3)]], //-ㅅ
        ['\u11bb', [HanBraille.DotsToUni(3,4)]], //-ㅆ*
        ['\u11bc', [HanBraille.DotsToUni(2,3,5,6),
                    HanBraille.BraiToUCS([5],[2,3,5,6])]], //-ㅇ: second candidate is for historical null sound jongseong (T)
        ['\u11bd', [HanBraille.DotsToUni(1,3)]], //-ㅈ
        ['\u11be', [HanBraille.DotsToUni(2,3)]], //-ㅊ
        ['\u11bf', [HanBraille.DotsToUni(2,3,5)]], //-ㅋ
        ['\u11c0', [HanBraille.DotsToUni(2,3,6)]], //-ㅌ
        ['\u11c1', [HanBraille.DotsToUni(2,5,6)]], //-ㅍ
        ['\u11c2', [HanBraille.DotsToUni(3,5,6)]], //-ㅎ
        //제4절: Singular
        ////Assuming remaining Hangul Compatibility Jamo as the choseong (L)
        ////TODO: L-HJF, HCF-V, HCF-HJF-T (These are special cases)
        ['\u3131', [HanBraille.BraiToUCS([1,2,3,4,5,6],[4])]], //*ㄱ
        ['\u3134', [HanBraille.BraiToUCS([1,2,3,4,5,6],[1,4])]], //*ㄴ
        ['\u3137', [HanBraille.BraiToUCS([1,2,3,4,5,6],[2,4])]], //*ㄷ
        ['\u3139', [HanBraille.BraiToUCS([1,2,3,4,5,6],[5])]], //*ㄹ
        ['\u3141', [HanBraille.BraiToUCS([1,2,3,4,5,6],[1,5])]], //*ㅁ
        ['\u3142', [HanBraille.BraiToUCS([1,2,3,4,5,6],[4,5])]], //*ㅂ
        ['\u3145', [HanBraille.BraiToUCS([1,2,3,4,5,6],[6])]], //*ㅅ
        ['\u3147', [HanBraille.BraiToUCS([1,2,3,4,5,6],[1,2,4,5])]], //*ㅇ
        ['\u3148', [HanBraille.BraiToUCS([1,2,3,4,5,6],[4,6])]], //*ㅈ
        ['\u314a', [HanBraille.BraiToUCS([1,2,3,4,5,6],[5,6])]], //*ㅊ
        ['\u314b', [HanBraille.BraiToUCS([1,2,3,4,5,6],[1,2,4])]], //*ㅋ
        ['\u314c', [HanBraille.BraiToUCS([1,2,3,4,5,6],[1,2,5])]], //*ㅌ
        ['\u314d', [HanBraille.BraiToUCS([1,2,3,4,5,6],[1,4,5])]], //*ㅍ
        ['\u314e', [HanBraille.BraiToUCS([1,2,3,4,5,6],[2,4,5])]], //*ㅎ
        ['\u314f', [HanBraille.BraiToUCS([1,2,3,4,5,6],[1,2,6])]], //*ㅏ
        ['\u3151', [HanBraille.BraiToUCS([1,2,3,4,5,6],[3,4,5])]], //*ㅑ
        ['\u3153', [HanBraille.BraiToUCS([1,2,3,4,5,6],[2,3,4])]], //*ㅓ
        ['\u3155', [HanBraille.BraiToUCS([1,2,3,4,5,6],[1,5,6])]], //*ㅕ
        ['\u3157', [HanBraille.BraiToUCS([1,2,3,4,5,6],[1,3,6])]], //*ㅗ
        ['\u315b', [HanBraille.BraiToUCS([1,2,3,4,5,6],[3,4,6])]], //*ㅛ
        ['\u315c', [HanBraille.BraiToUCS([1,2,3,4,5,6],[1,3,4])]], //*ㅜ
        ['\u3160', [HanBraille.BraiToUCS([1,2,3,4,5,6],[1,4,6])]], //*ㅠ
        ['\u3161', [HanBraille.BraiToUCS([1,2,3,4,5,6],[2,4,6])]], //*ㅡ
        ['\u3163', [HanBraille.BraiToUCS([1,2,3,4,5,6],[1,3,5]),
                    HanBraille.BraiToUCS([4,5,6],[1,3,5])]], //*ㅣ: second candidate is for isolated ㅣ
        //제8절
        ////Todo: 제23항
        ////제19항
        ['\u1140', [HanBraille.BraiToUCS([5],[4,6])]], //ㅿ
        ['\u11eb', [HanBraille.BraiToUCS([5],[1,3])]], //-ㅿ
        ['\u114c', [HanBraille.BraiToUCS([5],[1,4,5])]], //ㆁ
        ['\u11f0', [HanBraille.BraiToUCS([5],[2,5,6])]], //-ㆁ
        ['\u1159', [HanBraille.BraiToUCS([5],[2,4,5])]], //ㆆ
        ['\u11f9', [HanBraille.BraiToUCS([5],[3,5,6])]], //-ㆆ
        ['\u317f', [HanBraille.BraiToUCS([1,2,3,4,5,6],[5],[4,6])]], //*ㅿ
        ['\u3181', [HanBraille.BraiToUCS([1,2,3,4,5,6],[5],[1,4,5])]], //*ㆁ
        ['\u3186', [HanBraille.BraiToUCS([1,2,3,4,5,6],[5],[2,4,5])]], //*ㆆ
        ////제20항
        ['\u111d', [HanBraille.BraiToUCS([5],[1,5],[2,3,5,6])]], //ㅱ
        ['\u11e2', [HanBraille.BraiToUCS([5],[2,6],[2,3,5,6])]], //-ㅱ
        ['\u112b', [HanBraille.BraiToUCS([5],[4,5],[2,3,5,6])]], //ㅸ
        ['\u11e6', [HanBraille.BraiToUCS([5],[1,2],[2,3,5,6])]], //-ㅸ
        ['\u112c', [HanBraille.BraiToUCS([5],[6],[4,5],[2,3,5,6])]], //ㅹ
        ['\u1157', [HanBraille.BraiToUCS([5],[1,4,5],[2,3,5,6])]], //ㆄ
        ['\u111b', [HanBraille.BraiToUCS([5],[5],[2,3,5,6])]], //ᄛᅠ
        ////제21항
        ['\u1114', [HanBraille.BraiToUCS([5],[1,4],[1,4])]], //ㅥ
        ['\u1147', [HanBraille.BraiToUCS([5],[1,2,4,5],[1,2,4,5])]], //ㆀ
        ['\u1158', [HanBraille.BraiToUCS([5],[2,4,5],[2,4,5])]], //ㆅ
        ////제22항
        ['\u111e', [HanBraille.BraiToUCS([5],[4,5],[4])]], //ㅲ
        ['\u1120', [HanBraille.BraiToUCS([5],[4,5],[2,4])]], //ㅳ
        ['\u1121', [HanBraille.BraiToUCS([5],[4,5],[6])]], //ㅄ
        ['\u1122', [HanBraille.BraiToUCS([5],[4,5],[6],[4])]], //ㅴ
        ['\u1123', [HanBraille.BraiToUCS([5],[4,5],[6],[2,4])]], //ㅵ
        ['\u1127', [HanBraille.BraiToUCS([5],[4,5],[4,6])]], //ㅶ
        ['\u1129', [HanBraille.BraiToUCS([5],[4,5],[1,2,5])]], //ㅷ
        ['\u112d', [HanBraille.BraiToUCS([5],[6],[4])]], //ㅺ
        ['\u112e', [HanBraille.BraiToUCS([5],[6],[1,4])]], //ㅻ
        ['\u112f', [HanBraille.BraiToUCS([5],[6],[2,4])]], //ㅼ
        ['\u1132', [HanBraille.BraiToUCS([5],[6],[4,5])]], //ㅽ
        ['\u1136', [HanBraille.BraiToUCS([5],[6],[4,6])]], //ㅾ
        ['\u11c7', [HanBraille.BraiToUCS([2,5],[3])]], //-ㅧ
        ['\u11c8', [HanBraille.BraiToUCS([2,5],[5],[1,3])]], //-ㅨ
        ['\u11d9', [HanBraille.BraiToUCS([2],[5],[3,5,6])]], //-ㅭ
        ['\u11da', [HanBraille.BraiToUCS([2,6],[1])]], //-ᅟᅠᇚ
        ['\u11dd', [HanBraille.BraiToUCS([2,6],[3])]], //-ㅯ
        ['\u11df', [HanBraille.BraiToUCS([2,6],[5],[1,3])]], //-ㅰ
        //제9절
        ////제25항
        ['\u119e', [HanBraille.BraiToUCS([5],[3,4,5,6])]], //ㆍ
        ['\u11a1', [HanBraille.BraiToUCS([5],[3,4,5,6],[1,2,3,5])]], //ㆎ
        ['\u318d', [HanBraille.BraiToUCS([1,2,3,4,5,6],[5],[3,4,5,6])]], //*ㆍ
        ['\u318e', [HanBraille.BraiToUCS([1,2,3,4,5,6],[5],[3,4,5,6],[1,2,3,5])]], //*ㆎ
        ////제26항
        ['\u1188', [HanBraille.BraiToUCS([4,5,6],[3,4,6],[1,3,5])]], //ㆉ
        ['\u1184', [HanBraille.BraiToUCS([4,5,6],[3,4,6],[3,4,5])]], //ㆇ
        ['\u1185', [HanBraille.BraiToUCS([4,5,6],[3,4,6],[3,4,5],[1,2,3,5])]], //ㆈ
        ['\u1194', [HanBraille.BraiToUCS([4,5,6],[1,4,6],[1,3,5])]], //ㆌ
        ['\u1191', [HanBraille.BraiToUCS([4,5,6],[1,4,6],[1,5,6])]], //ㆊ
        ['\u1192', [HanBraille.BraiToUCS([4,5,6],[1,4,6],[3,4])]], //ㆋ
        //제12절: 문장 부호
        ['\\.', [HanBraille.DotsToUni(2,5,6)]],
        ['\\?', [HanBraille.DotsToUni(2,3,6)]],
        ['!', [HanBraille.DotsToUni(2,3,5)]],
        [',', [HanBraille.DotsToUni(5)]],
        ['·', [HanBraille.BraiToUCS([5],[2,3])]],
        [':', [HanBraille.BraiToUCS([5],[2])]],
        [';', [HanBraille.BraiToUCS([5,6],[2,3])]],
        ['/', [HanBraille.BraiToUCS([4,5,6],[3,4])]],
        ['“', [HanBraille.DotsToUni(2,3,6)]],
        ['”', [HanBraille.DotsToUni(3,5,6)]],
        ["‘", [HanBraille.BraiToUCS([6],[2,3,6])]],
        ["’", [HanBraille.BraiToUCS([3,5,6],[3])]],
        ['\\(', [HanBraille.BraiToUCS([2,3,6],[3])]],
        ['\\)', [HanBraille.BraiToUCS([6],[3,5,6])]],
        ['\\{', [HanBraille.BraiToUCS([2,3,6],[2])]],
        ['\\}', [HanBraille.BraiToUCS([5],[3,5,6])]],
        ['\\[', [HanBraille.BraiToUCS([2,3,6],[2,3])]],
        ['\\]', [HanBraille.BraiToUCS([5,6],[3,5,6])]],
        ['『', [HanBraille.BraiToUCS([5,6],[2,3,6])]],
        ['』', [HanBraille.BraiToUCS([3,5,6],[2,3])]],
        ['《', [HanBraille.BraiToUCS([5,6],[2,3,6])]],
        ['》', [HanBraille.BraiToUCS([3,5,6],[2,3])]],
        ['「', [HanBraille.BraiToUCS([5],[2,3,6])]],
        ['」', [HanBraille.BraiToUCS([3,5,6],[2])]],
        ['〈', [HanBraille.BraiToUCS([5],[2,3,6])]],
        ['〉', [HanBraille.BraiToUCS([3,5,6],[2])]],
        ['-', [HanBraille.DotsToUni(3,6)]],
        ['—', [HanBraille.BraiToUCS([3,6],[3,6])]],
        ['~', [HanBraille.BraiToUCS([3,6],[3,6])]],
        ['……', [HanBraille.BraiToUCS([6],[6],[6])]],
        ['…', [HanBraille.BraiToUCS([6],[6],[6])]],
        ['\\*', [HanBraille.BraiToUCS([3,5],[3,5])]],
        ['※', [HanBraille.BraiToUCS([3,5],[3,5])
                ,HanBraille.BraiToUCS([4,5,6],[3,5])]], //Alternative conversion
        ["'", [HanBraille.DotsToUni(3)]], //Apostrophe
        ['〃', [HanBraille.BraiToUCS([5,6],[2,3])]],
        ['ː', [HanBraille.BraiToUCS([6],[3])]],
        ['₩', [HanBraille.BraiToUCS([4],[2,4,5,6])]],
        ['￦', [HanBraille.BraiToUCS([4],[2,4,5,6])]],
        ['¢', [HanBraille.BraiToUCS([4],[1,4])]],
        ['\\$', [HanBraille.BraiToUCS([4],[1,4,5])]],
        ['£', [HanBraille.BraiToUCS([4],[1,2,3])]],
        ['¥', [HanBraille.BraiToUCS([4],[1,3,4,5,6])]],
        ['€', [HanBraille.BraiToUCS([4],[1,5])]],
    ]);
}
