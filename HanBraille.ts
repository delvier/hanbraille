export class HanBraille {
    static HangToBrai(hang: string): string {
        let d: string = hang.normalize('NFD');
        for (let i of HanBraille.mapping) {
            d = d.replace(new RegExp(i[0], 'ugim'), i[1][0]);
        }
        return d;
    }
    static #BraiToUCS(...lists: number[][]): string {
        let o: string = ""
        for (let i of lists) {
            o += this.#DotsToUni(...i);
        }
        return o;
    }
    static #DotsToUni(...dots: number[]): string {
        let n: number = 0x2800;
        let s: Set<number> = new Set(dots);
        for (let i of s) {
            if (!([1,2,3,4,5,6,7,8].includes(i))) {
                continue;
            }
            n += 2 ** (i - 1);
        }
        return String.fromCharCode(n);
    }
    static mapping: Map<string, string[]> = new Map([
        /* Special cases */
        //제7절: Abbr. Only at the beginning of the line, or after a whitespace or a punctuation
        ['(?<=^|\\s|\\p{P})그래서'.normalize('NFD'), [this.#BraiToUCS([1],[2,3,4])]], //그래서
        ['(?<=^|\\s|\\p{P})그러나'.normalize('NFD'), [this.#BraiToUCS([1],[1,2])]], //그러나
        ['(?<=^|\\s|\\p{P})그러면'.normalize('NFD'), [this.#BraiToUCS([1],[2,5])]], //그러면
        ['(?<=^|\\s|\\p{P})그러므로'.normalize('NFD'), [this.#BraiToUCS([1],[2,6])]], //그러므로
        ['(?<=^|\\s|\\p{P})그런데'.normalize('NFD'), [this.#BraiToUCS([1],[1,3,4,5])]], //그런데
        ['(?<=^|\\s|\\p{P})그리고'.normalize('NFD'), [this.#BraiToUCS([1],[1,3,6])]], //그리고
        ['(?<=^|\\s|\\p{P})그리하여'.normalize('NFD'), [this.#BraiToUCS([1],[1,5,6])]], //그리하여
        //제6절: Shorthands
        ////17항: shorthand prohibition
        ['나\u110b'.normalize('NFD'), [this.#BraiToUCS([1,4],[1,2,6])]], //나ㅇ
        ['다\u110b'.normalize('NFD'), [this.#BraiToUCS([2,4],[1,2,6])]], //다ㅇ
        ['따\u110b'.normalize('NFD'), [this.#BraiToUCS([6],[2,4],[1,2,6])]], //따ㅇ
        ['마\u110b'.normalize('NFD'), [this.#BraiToUCS([1,5],[1,2,6])]], //마ㅇ
        ['바\u110b'.normalize('NFD'), [this.#BraiToUCS([4,5],[1,2,6])]], //바ㅇ
        ['빠\u110b'.normalize('NFD'), [this.#BraiToUCS([6],[4,5],[1,2,6])]], //빠ㅇ
        ['자\u110b'.normalize('NFD'), [this.#BraiToUCS([4,6],[1,2,6])]], //자ㅇ
        ['짜\u110b'.normalize('NFD'), [this.#BraiToUCS([6],[4,6],[1,2,6])]], //짜ㅇ
        ['카\u110b'.normalize('NFD'), [this.#BraiToUCS([1,2,4],[1,2,6])]], //카ㅇ
        ['타\u110b'.normalize('NFD'), [this.#BraiToUCS([1,2,5],[1,2,6])]], //타ㅇ
        ['파\u110b'.normalize('NFD'), [this.#BraiToUCS([1,4,5],[1,2,6])]], //파ㅇ
        ['하\u110b'.normalize('NFD'), [this.#BraiToUCS([2,4,5],[1,2,6])]], //하ㅇ
        ['팠'.normalize('NFD'), [this.#BraiToUCS([1,4,5],[1,2,6],[3,4])]], //팠
        ////16항: exceptional shorthands
        ['성'.normalize('NFD'), [this.#BraiToUCS([6],[1,2,4,5,6])]], //성
        ['썽'.normalize('NFD'), [this.#BraiToUCS([6],[6],[1,2,4,5,6])]], //썽
        ['정'.normalize('NFD'), [this.#BraiToUCS([4,6],[1,2,4,5,6])]], //정
        ['쩡'.normalize('NFD'), [this.#BraiToUCS([6],[4,6],[1,2,4,5,6])]], //쩡
        ['청'.normalize('NFD'), [this.#BraiToUCS([5,6],[1,2,4,5,6])]], //청
        ['셩'.normalize('NFD'), [this.#BraiToUCS([6],[1,5,6],[3,4,5,6])]], //셩
        ['쎵'.normalize('NFD'), [this.#BraiToUCS([6],[6],[1,5,6],[3,4,5,6])]], //쎵
        ['졍'.normalize('NFD'), [this.#BraiToUCS([4,6],[1,5,6],[3,4,5,6])]], //졍
        ['쪙'.normalize('NFD'), [this.#BraiToUCS([6],[4,6],[1,5,6],[3,4,5,6])]], //쪙
        ['쳥'.normalize('NFD'), [this.#BraiToUCS([5,6],[1,5,6],[3,4,5,6])]], //쳥
        ////12~15항
        ['가'.normalize('NFD'), [this.#DotsToUni(1,2,4,6)]], //가
        ['까'.normalize('NFD'), [this.#BraiToUCS([6],[1,2,4,6])]], //까
        ['나'.normalize('NFD'), [this.#DotsToUni(1,4)]], //나
        ['다'.normalize('NFD'), [this.#DotsToUni(2,4)]], //다
        ['따'.normalize('NFD'), [this.#BraiToUCS([6],[2,4])]], //따
        ['마'.normalize('NFD'), [this.#DotsToUni(1,5)]], //마
        ['바'.normalize('NFD'), [this.#DotsToUni(4,5)]], //바
        ['빠'.normalize('NFD'), [this.#BraiToUCS([6],[4,5])]], //빠
        ['사'.normalize('NFD'), [this.#DotsToUni(1,2,3)]], //사
        ['싸'.normalize('NFD'), [this.#BraiToUCS([6],[1,2,3])]], //싸
        ['자'.normalize('NFD'), [this.#DotsToUni(4,6)]], //자
        ['짜'.normalize('NFD'), [this.#BraiToUCS([6],[4,6])]], //짜
        ['카'.normalize('NFD'), [this.#DotsToUni(1,2,4)]], //카
        ['타'.normalize('NFD'), [this.#DotsToUni(1,2,5)]], //타
        ['파'.normalize('NFD'), [this.#DotsToUni(1,4,5)]], //파
        ['하'.normalize('NFD'), [this.#DotsToUni(2,4,5)]], //하
        ['\u1165\u11a8', [this.#DotsToUni(1,4,5,6)]], //ᅟᅥᆨ
        ['\u1165\u11a9', [this.#BraiToUCS([1,4,5,6],[1])]], //ᅟᅥᆩ
        ['\u1165\u11aa', [this.#BraiToUCS([1,4,5,6],[3])]], //ᅟᅥᆪ
        ['\u1165\u11ab', [this.#DotsToUni(2,3,4,5,6)]], //ᅟᅥᆫ
        ['\u1165\u11ac', [this.#BraiToUCS([2,3,4,5,6],[1,3])]], //ᅟᅥᆬ
        ['\u1165\u11ad', [this.#BraiToUCS([2,3,4,5,6],[3,5,6])]], //ᅟᅥᆭ
        ['\u1165\u11af', [this.#DotsToUni(2,3,4,5)]], //ᅟᅥᆯ
        ['\u1165\u11b0', [this.#BraiToUCS([2,3,4,5],[1])]], //ᅟᅥᆰ
        ['\u1165\u11b1', [this.#BraiToUCS([2,3,4,5],[2,6])]], //ᅟᅥᆱ
        ['\u1165\u11b2', [this.#BraiToUCS([2,3,4,5],[1,2])]], //ᅟᅥᆲ
        ['\u1165\u11b3', [this.#BraiToUCS([2,3,4,5],[3])]], //ᅟᅥᆳ
        ['\u1165\u11b4', [this.#BraiToUCS([2,3,4,5],[2,3,6])]], //ᅟᅥᆴ
        ['\u1165\u11b5', [this.#BraiToUCS([2,3,4,5],[2,5,6])]], //ᅟᅥᆵ
        ['\u1165\u11b6', [this.#BraiToUCS([2,3,4,5],[3,5,6])]], //ᅟᅥᆶ
        ['\u1167\u11ab', [this.#DotsToUni(1,6)]], //ᅟᅧᆫ
        ['\u1167\u11ac', [this.#BraiToUCS([1,6],[1,3])]], //ᅟᅧᆬ
        ['\u1167\u11ad', [this.#BraiToUCS([1,6],[3,5,6])]], //ᅟᅧᆭ
        ['\u1167\u11af', [this.#DotsToUni(1,2,5,6)]], //ᅟᅧᆯ
        ['\u1167\u11b0', [this.#BraiToUCS([1,2,5,6],[1])]], //ᅟᅧᆰ
        ['\u1167\u11b1', [this.#BraiToUCS([1,2,5,6],[2,6])]], //ᅟᅧᆱ
        ['\u1167\u11b2', [this.#BraiToUCS([1,2,5,6],[1,2])]], //ᅟᅧᆲ
        ['\u1167\u11b3', [this.#BraiToUCS([1,2,5,6],[3])]], //ᅟᅧᆳ
        ['\u1167\u11b4', [this.#BraiToUCS([1,2,5,6],[2,3,6])]], //ᅟᅧᆴ
        ['\u1167\u11b5', [this.#BraiToUCS([1,2,5,6],[2,5,6])]], //ᅟᅧᆵ
        ['\u1167\u11b6', [this.#BraiToUCS([1,2,5,6],[3,5,6])]], //ᅟᅧᆶ
        ['\u1167\u11bc', [this.#DotsToUni(1,2,4,5,6)]], //ᅟᅧᆼ
        ['\u1169\u11a8', [this.#DotsToUni(1,3,4,6)]], //ᅟᅩᆨ
        ['\u1169\u11a9', [this.#BraiToUCS([1,3,4,6],[1])]], //ᅟᅩᆩ
        ['\u1169\u11aa', [this.#BraiToUCS([1,3,4,6],[3])]], //ᅟᅩᆪ
        ['\u1169\u11ab', [this.#DotsToUni(1,2,3,5,6)]], //ᅟᅩᆫ
        ['\u1169\u11ac', [this.#BraiToUCS([1,2,3,5,6],[1,3])]], //ᅟᅩᆬ
        ['\u1169\u11ad', [this.#BraiToUCS([1,2,3,5,6],[3,5,6])]], //ᅟᅩᆭ
        ['\u1169\u11bc', [this.#DotsToUni(1,2,3,4,5,6)]], //ᅟᅩᆼ
        ['\u116e\u11ab', [this.#DotsToUni(1,2,4,5)]], //ᅟᅮᆫ
        ['\u116e\u11ac', [this.#BraiToUCS([1,2,4,5],[1,3])]], //ᅟᅮᆬ
        ['\u116e\u11ad', [this.#BraiToUCS([1,2,4,5],[3,5,6])]], //ᅟᅮᆭ
        ['\u116e\u11af', [this.#DotsToUni(1,2,3,4,6)]], //ᅟᅮᆯ
        ['\u116e\u11b0', [this.#BraiToUCS([1,2,3,4,6],[1])]], //ᅟᅮᆰ
        ['\u116e\u11b1', [this.#BraiToUCS([1,2,3,4,6],[2,6])]], //ᅟᅮᆱ
        ['\u116e\u11b2', [this.#BraiToUCS([1,2,3,4,6],[1,2])]], //ᅟᅮᆲ
        ['\u116e\u11b3', [this.#BraiToUCS([1,2,3,4,6],[3])]], //ᅟᅮᆳ
        ['\u116e\u11b4', [this.#BraiToUCS([1,2,3,4,6],[2,3,6])]], //ᅟᅮᆴ
        ['\u116e\u11b5', [this.#BraiToUCS([1,2,3,4,6],[2,5,6])]], //ᅟᅮᆵ
        ['\u116e\u11b6', [this.#BraiToUCS([1,2,3,4,6],[3,5,6])]], //ᅟᅮᆶ
        ['\u1173\u11ab', [this.#DotsToUni(1,3,5,6)]], //ᅟᅳᆫ
        ['\u1173\u11ac', [this.#BraiToUCS([1,3,5,6],[1,3])]], //ᅟᅳᆬ
        ['\u1173\u11ad', [this.#BraiToUCS([1,3,5,6],[3,5,6])]], //ᅟᅳᆭ
        ['\u1173\u11af', [this.#DotsToUni(2,3,4,6)]], //ᅟᅳᆯ
        ['\u1173\u11b0', [this.#BraiToUCS([2,3,4,6],[1])]], //ᅟᅳᆰ
        ['\u1173\u11b1', [this.#BraiToUCS([2,3,4,6],[2,6])]], //ᅟᅳᆱ
        ['\u1173\u11b2', [this.#BraiToUCS([2,3,4,6],[1,2])]], //ᅟᅳᆲ
        ['\u1173\u11b3', [this.#BraiToUCS([2,3,4,6],[3])]], //ᅟᅳᆳ
        ['\u1173\u11b4', [this.#BraiToUCS([2,3,4,6],[2,3,6])]], //ᅟᅳᆴ
        ['\u1173\u11b5', [this.#BraiToUCS([2,3,4,6],[2,5,6])]], //ᅟᅳᆵ
        ['\u1173\u11b6', [this.#BraiToUCS([2,3,4,6],[3,5,6])]], //ᅟᅳᆶ
        ['\u1175\u11ab', [this.#DotsToUni(1,2,3,4,5)]], //ᅟᅵᆫ
        ['\u1175\u11ac', [this.#BraiToUCS([1,2,3,4,5],[1,3])]], //ᅟᅵᆬ
        ['\u1175\u11ad', [this.#BraiToUCS([1,2,3,4,5],[3,5,6])]], //ᅟᅵᆭ
        ['것'.normalize('NFD'), [this.#BraiToUCS([4,5,6],[2,3,4])]], //것
        ['껏'.normalize('NFD'), [this.#BraiToUCS([6],[4,5,6],[2,3,4])]], //껏
        //제5절: Vowel chain
        ['(?<=[\u1161-\u11a7])\u110b\u1168', [this.#BraiToUCS([3,6],[3,4])]], //(V)예: 제10항
        ['(?<=[\u1163\u116a\u116e\u116f])\u110b\u1162', [this.#BraiToUCS([3,6],[1,2,3,5])]], //([ㅑㅘㅜㅝ])애: 제11항
        /* End of the special cases */
        //제1절
        ['\u1100', [this.#DotsToUni(4)]], //ㄱ
        ['\u1101', [this.#BraiToUCS([6],[4])]], //ㄲ
        ['\u1102', [this.#DotsToUni(1,4)]], //ㄴ
        ['\u1103', [this.#DotsToUni(2,4)]], //ㄷ
        ['\u1104', [this.#BraiToUCS([6],[2,4])]], //ㄸ
        ['\u1105', [this.#DotsToUni(5)]], //ㄹ
        ['\u1106', [this.#DotsToUni(1,5)]], //ㅁ
        ['\u1107', [this.#DotsToUni(4,5)]], //ㅂ
        ['\u1108', [this.#BraiToUCS([6],[4,5])]], //ㅃ
        ['\u1109', [this.#DotsToUni(6)]], //ㅅ
        ['\u110a', [this.#BraiToUCS([6],[6])]], //ㅆ
        ['\u110b', ["",
                    this.#DotsToUni(1,2,4,5)]], //ㅇ: normally not written, 1-2-4-5 is a fallback
        ['\u110c', [this.#DotsToUni(4,6)]], //ㅈ
        ['\u110d', [this.#BraiToUCS([6],[4,6])]], //ㅉ
        ['\u110e', [this.#DotsToUni(5,6)]], //ㅊ
        ['\u110f', [this.#DotsToUni(1,2,4)]], //ㅋ
        ['\u1110', [this.#DotsToUni(1,2,5)]], //ㅌ
        ['\u1111', [this.#DotsToUni(1,4,5)]], //ㅍ
        ['\u1112', [this.#DotsToUni(2,4,5)]], //ㅎ
        //제3절
        ['\u1161', [this.#DotsToUni(1,2,6)]], //ㅏ
        ['\u1162', [this.#DotsToUni(1,2,3,5)]], //ㅐ
        ['\u1163', [this.#DotsToUni(3,4,5)]], //ㅑ
        ['\u1164', [this.#BraiToUCS([3,4,5],[1,2,3,5])]], //ㅒ
        ['\u1165', [this.#DotsToUni(2,3,4)]], //ㅓ
        ['\u1166', [this.#DotsToUni(1,3,4,5)]], //ㅔ
        ['\u1167', [this.#DotsToUni(1,5,6)]], //ㅕ
        ['\u1168', [this.#DotsToUni(3,4)]], //ㅖ*
        ['\u1169', [this.#DotsToUni(1,3,6)]], //ㅗ
        ['\u116a', [this.#DotsToUni(1,2,3,6)]], //ㅘ
        ['\u116b', [this.#BraiToUCS([1,2,3,6],[1,2,3,5])]], //ㅙ
        ['\u116c', [this.#DotsToUni(1,3,4,5,6)]], //ㅚ
        ['\u116d', [this.#DotsToUni(3,4,6)]], //ㅛ
        ['\u116e', [this.#DotsToUni(1,3,4)]], //ㅜ
        ['\u116f', [this.#DotsToUni(1,2,3,4)]], //ㅝ
        ['\u1170', [this.#BraiToUCS([1,2,3,4],[1,2,3,5])]], //ㅞ
        ['\u1171', [this.#BraiToUCS([1,3,4],[1,2,3,5])]], //ㅟ
        ['\u1172', [this.#DotsToUni(1,4,6)]], //ㅠ
        ['\u1173', [this.#DotsToUni(2,4,6)]], //ㅡ
        ['\u1174', [this.#DotsToUni(2,4,5,6)]], //ㅢ
        ['\u1175', [this.#DotsToUni(1,3,5)]], //ㅣ
        //제2절
        ['\u11a8', [this.#DotsToUni(1)]], //-ㄱ
        ['\u11a9', [this.#BraiToUCS([1],[1])]], //-ㄲ
        ['\u11aa', [this.#BraiToUCS([1],[3])]], //-ㄳ
        ['\u11ab', [this.#DotsToUni(2,5)]], //-ㄴ
        ['\u11ac', [this.#BraiToUCS([2,5], [1,3])]], //-ㄵ
        ['\u11ad', [this.#BraiToUCS([2,5], [3,5,6])]], //-ㄶ
        ['\u11ae', [this.#DotsToUni(3,5)]], //-ㄷ
        ['\u11af', [this.#DotsToUni(2)]], //-ㄹ
        ['\u11b0', [this.#BraiToUCS([2], [1])]], //-ㄺ
        ['\u11b1', [this.#BraiToUCS([2], [2,6])]], //-ㄻ
        ['\u11b2', [this.#BraiToUCS([2], [1,2])]], //-ㄼ
        ['\u11b3', [this.#BraiToUCS([2], [3])]], //-ㄽ
        ['\u11b4', [this.#BraiToUCS([2], [2,3,6])]], //-ㄾ
        ['\u11b5', [this.#BraiToUCS([2], [2,5,6])]], //-ㄿ
        ['\u11b6', [this.#BraiToUCS([2], [3,5,6])]], //-ㅀ
        ['\u11b7', [this.#DotsToUni(2,6)]], //-ㅁ
        ['\u11b8', [this.#DotsToUni(1,2)]], //-ㅂ
        ['\u11b9', [this.#BraiToUCS([1,2], [3])]], //-ㅄ
        ['\u11ba', [this.#DotsToUni(3)]], //-ㅅ
        ['\u11bb', [this.#DotsToUni(3,4)]], //-ㅆ*
        ['\u11bc', [this.#DotsToUni(2,3,5,6),
                    this.#BraiToUCS([5],[2,3,5,6])]], //-ㅇ: second candidate is for historical null sound jongseong (T)
        ['\u11bd', [this.#DotsToUni(1,3)]], //-ㅈ
        ['\u11be', [this.#DotsToUni(2,3)]], //-ㅊ
        ['\u11bf', [this.#DotsToUni(2,3,5)]], //-ㅋ
        ['\u11c0', [this.#DotsToUni(2,3,6)]], //-ㅌ
        ['\u11c1', [this.#DotsToUni(2,5,6)]], //-ㅍ
        ['\u11c2', [this.#DotsToUni(3,5,6)]], //-ㅎ
        //제4절: Singular
        ////Assuming remaining Hangul Compatibility Jamo as the choseong (L)
        ////TODO: L-HJF, HCF-V, HCF-HJF-T (These are special cases)
        ['\u3131', [this.#BraiToUCS([1,2,3,4,5,6],[4])]], //*ㄱ
        ['\u3134', [this.#BraiToUCS([1,2,3,4,5,6],[1,4])]], //*ㄴ
        ['\u3137', [this.#BraiToUCS([1,2,3,4,5,6],[2,4])]], //*ㄷ
        ['\u3139', [this.#BraiToUCS([1,2,3,4,5,6],[5])]], //*ㄹ
        ['\u3141', [this.#BraiToUCS([1,2,3,4,5,6],[1,5])]], //*ㅁ
        ['\u3142', [this.#BraiToUCS([1,2,3,4,5,6],[4,5])]], //*ㅂ
        ['\u3145', [this.#BraiToUCS([1,2,3,4,5,6],[6])]], //*ㅅ
        ['\u3147', [this.#BraiToUCS([1,2,3,4,5,6],[1,2,4,5])]], //*ㅇ
        ['\u3148', [this.#BraiToUCS([1,2,3,4,5,6],[4,6])]], //*ㅈ
        ['\u314a', [this.#BraiToUCS([1,2,3,4,5,6],[5,6])]], //*ㅊ
        ['\u314b', [this.#BraiToUCS([1,2,3,4,5,6],[1,2,4])]], //*ㅋ
        ['\u314c', [this.#BraiToUCS([1,2,3,4,5,6],[1,2,5])]], //*ㅌ
        ['\u314d', [this.#BraiToUCS([1,2,3,4,5,6],[1,4,5])]], //*ㅍ
        ['\u314e', [this.#BraiToUCS([1,2,3,4,5,6],[2,4,5])]], //*ㅎ
        ['\u314f', [this.#BraiToUCS([1,2,3,4,5,6],[1,2,6])]], //*ㅏ
        ['\u3151', [this.#BraiToUCS([1,2,3,4,5,6],[3,4,5])]], //*ㅑ
        ['\u3153', [this.#BraiToUCS([1,2,3,4,5,6],[2,3,4])]], //*ㅓ
        ['\u3155', [this.#BraiToUCS([1,2,3,4,5,6],[1,5,6])]], //*ㅕ
        ['\u3157', [this.#BraiToUCS([1,2,3,4,5,6],[1,3,6])]], //*ㅗ
        ['\u315b', [this.#BraiToUCS([1,2,3,4,5,6],[3,4,6])]], //*ㅛ
        ['\u315c', [this.#BraiToUCS([1,2,3,4,5,6],[1,3,4])]], //*ㅜ
        ['\u3160', [this.#BraiToUCS([1,2,3,4,5,6],[1,4,6])]], //*ㅠ
        ['\u3161', [this.#BraiToUCS([1,2,3,4,5,6],[2,4,6])]], //*ㅡ
        ['\u3163', [this.#BraiToUCS([1,2,3,4,5,6],[1,3,5]),
                    this.#BraiToUCS([4,5,6],[1,3,5])]], //*ㅣ: second candidate is for isolated ㅣ
        //제8절
        ////Todo: 제23항
        ////제19항
        ['\u1140', [this.#BraiToUCS([5],[4,6])]], //ㅿ
        ['\u11eb', [this.#BraiToUCS([5],[1,3])]], //-ㅿ
        ['\u114c', [this.#BraiToUCS([5],[1,4,5])]], //ㆁ
        ['\u11f0', [this.#BraiToUCS([5],[2,5,6])]], //-ㆁ
        ['\u1159', [this.#BraiToUCS([5],[2,4,5])]], //ㆆ
        ['\u11f9', [this.#BraiToUCS([5],[3,5,6])]], //-ㆆ
        ['\u317f', [this.#BraiToUCS([1,2,3,4,5,6],[5],[4,6])]], //*ㅿ
        ['\u3181', [this.#BraiToUCS([1,2,3,4,5,6],[5],[1,4,5])]], //*ㆁ
        ['\u3186', [this.#BraiToUCS([1,2,3,4,5,6],[5],[2,4,5])]], //*ㆆ
        ////제20항
        ['\u111d', [this.#BraiToUCS([5],[1,5],[2,3,5,6])]], //ㅱ
        ['\u11e2', [this.#BraiToUCS([5],[2,6],[2,3,5,6])]], //-ㅱ
        ['\u112b', [this.#BraiToUCS([5],[4,5],[2,3,5,6])]], //ㅸ
        ['\u11e6', [this.#BraiToUCS([5],[1,2],[2,3,5,6])]], //-ㅸ
        ['\u112c', [this.#BraiToUCS([5],[6],[4,5],[2,3,5,6])]], //ㅹ
        ['\u1157', [this.#BraiToUCS([5],[1,4,5],[2,3,5,6])]], //ㆄ
        ['\u111b', [this.#BraiToUCS([5],[5],[2,3,5,6])]], //ᄛᅠ
        ////제21항
        ['\u1114', [this.#BraiToUCS([5],[1,4],[1,4])]], //ㅥ
        ['\u1147', [this.#BraiToUCS([5],[1,2,4,5],[1,2,4,5])]], //ㆀ
        ['\u1158', [this.#BraiToUCS([5],[2,4,5],[2,4,5])]], //ㆅ
        ////제22항
        ['\u111e', [this.#BraiToUCS([5],[4,5],[4])]], //ㅲ
        ['\u1120', [this.#BraiToUCS([5],[4,5],[2,4])]], //ㅳ
        ['\u1121', [this.#BraiToUCS([5],[4,5],[6])]], //ㅄ
        ['\u1122', [this.#BraiToUCS([5],[4,5],[6],[4])]], //ㅴ
        ['\u1123', [this.#BraiToUCS([5],[4,5],[6],[2,4])]], //ㅵ
        ['\u1127', [this.#BraiToUCS([5],[4,5],[4,6])]], //ㅶ
        ['\u1129', [this.#BraiToUCS([5],[4,5],[1,2,5])]], //ㅷ
        ['\u112d', [this.#BraiToUCS([5],[6],[4])]], //ㅺ
        ['\u112e', [this.#BraiToUCS([5],[6],[1,4])]], //ㅻ
        ['\u112f', [this.#BraiToUCS([5],[6],[2,4])]], //ㅼ
        ['\u1132', [this.#BraiToUCS([5],[6],[4,5])]], //ㅽ
        ['\u1136', [this.#BraiToUCS([5],[6],[4,6])]], //ㅾ
        ['\u11c7', [this.#BraiToUCS([2,5],[3])]], //-ㅧ
        ['\u11c8', [this.#BraiToUCS([2,5],[5],[1,3])]], //-ㅨ
        ['\u11d9', [this.#BraiToUCS([2],[5],[3,5,6])]], //-ㅭ
        ['\u11da', [this.#BraiToUCS([2,6],[1])]], //-ᅟᅠᇚ
        ['\u11dd', [this.#BraiToUCS([2,6],[3])]], //-ㅯ
        ['\u11df', [this.#BraiToUCS([2,6],[5],[1,3])]], //-ㅰ
        //제9절
        ////제25항
        ['\u119e', [this.#BraiToUCS([5],[3,4,5,6])]], //ㆍ
        ['\u11a1', [this.#BraiToUCS([5],[3,4,5,6],[1,2,3,5])]], //ㆎ
        ['\u318d', [this.#BraiToUCS([1,2,3,4,5,6],[5],[3,4,5,6])]], //*ㆍ
        ['\u318e', [this.#BraiToUCS([1,2,3,4,5,6],[5],[3,4,5,6],[1,2,3,5])]], //*ㆎ
        ////제26항
        ['\u1188', [this.#BraiToUCS([4,5,6],[3,4,6],[1,3,5])]], //ㆉ
        ['\u1184', [this.#BraiToUCS([4,5,6],[3,4,6],[3,4,5])]], //ㆇ
        ['\u1185', [this.#BraiToUCS([4,5,6],[3,4,6],[3,4,5],[1,2,3,5])]], //ㆈ
        ['\u1194', [this.#BraiToUCS([4,5,6],[1,4,6],[1,3,5])]], //ㆌ
        ['\u1191', [this.#BraiToUCS([4,5,6],[1,4,6],[1,5,6])]], //ㆊ
        ['\u1192', [this.#BraiToUCS([4,5,6],[1,4,6],[3,4])]], //ㆋ
        ////제28항; TODO: This needs to go *before* the syllable, unlike UCS hangul
        ['\u302e', [this.#BraiToUCS([4,5,6],[2])]], //거성 1점
        ['\u302f', [this.#BraiToUCS([4,5,6],[1,3])]], //상성 2점
        //misc.
        ['\\s', [this.#DotsToUni()]], //공백
        ['[^\u2800-\u28ff]', [""]], //unsupported
    ])
}