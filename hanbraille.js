"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _HanBraille_hanMappingAntiCollision, _HanBraille_hanMappingContract, _HanBraille_hanMapping;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HanBraille = void 0;
const braille_1 = require("./braille");
class HanBraille extends braille_1.Braille {
    constructor(u11bc_null = false, u3163_isolate = false) {
        super();
        _HanBraille_hanMappingAntiCollision.set(this, [
            //제5절: Vowel chain
            { symbol: '', braille: HanBraille.DotsToUni(3, 6), before: /[\u1161-\u11a7]/gu, after: /^\u110b\u1168/gu },
            { symbol: '', braille: HanBraille.DotsToUni(3, 6), before: /[\u1163\u116a\u116e\u116f]/gu, after: /^\u110b\u1162/gu },
            //제28항; This needs to go *before* the syllable, unlike UCS hangul
            ////always first because this changes character order; ignored if not related to hangul syllable
            { symbol: '', braille: HanBraille.BraiToUCS([4, 5, 6], [2]), after: /^([\u1100-\u115f][\u1160-\u11a7][\u11a8-\u11ff]?)\u302e/gu },
            { symbol: '', braille: HanBraille.BraiToUCS([4, 5, 6], [1, 3]), after: /^([\u1100-\u115f][\u1160-\u11a7][\u11a8-\u11ff]?)\u302f/gu },
            //제38항
            //number before ㄴㄷㅁㅋㅌㅍㅎ운
            { symbol: '', braille: HanBraille.DotsToUni(0), before: /[0-9]/gu, after: /^([\u1102\u1103\u1106\u110f-\u1112]|\u110b\u116e\u11ab)/gu },
        ]);
        _HanBraille_hanMappingContract.set(this, [
            /* Special cases */
            //제52~58항: opening and closing
            //{symbol: '"(.*)"', braille: HanBraille.DotsToUni(2,3,6) + '$1' + HanBraille.DotsToUni(3,5,6)},
            //{symbol: "'(.*)'", braille: HanBraille.BraiToUCS([6],[2,3,6]) + '$1' + HanBraille.BraiToUCS([3,5,6],[3])},
            //제7절: Abbr. Only at the beginning of the line, or after a whitespace or a punctuation
            { symbol: '그래서'.normalize('NFD'), braille: HanBraille.BraiToUCS([1], [2, 3, 4]), before: /(^|\s|\p{P})$/gu },
            { symbol: '그러나'.normalize('NFD'), braille: HanBraille.BraiToUCS([1], [1, 2]), before: /(^|\s|\p{P})$/gu },
            { symbol: '그러면'.normalize('NFD'), braille: HanBraille.BraiToUCS([1], [2, 5]), before: /(^|\s|\p{P})$/gu },
            { symbol: '그러므로'.normalize('NFD'), braille: HanBraille.BraiToUCS([1], [2, 6]), before: /(^|\s|\p{P})$/gu },
            { symbol: '그런데'.normalize('NFD'), braille: HanBraille.BraiToUCS([1], [1, 3, 4, 5]), before: /(^|\s|\p{P})$/gu },
            { symbol: '그리고'.normalize('NFD'), braille: HanBraille.BraiToUCS([1], [1, 3, 6]), before: /(^|\s|\p{P})$/gu },
            { symbol: '그리하여'.normalize('NFD'), braille: HanBraille.BraiToUCS([1], [1, 5, 6]), before: /(^|\s|\p{P})$/gu },
            //제6절: Shorthands
            ////17항: shorthand prohibition
            { symbol: '나\u110b'.normalize('NFD'), braille: HanBraille.BraiToUCS([1, 4], [1, 2, 6]) },
            { symbol: '다\u110b'.normalize('NFD'), braille: HanBraille.BraiToUCS([2, 4], [1, 2, 6]) },
            { symbol: '따\u110b'.normalize('NFD'), braille: HanBraille.BraiToUCS([6], [2, 4], [1, 2, 6]) },
            { symbol: '마\u110b'.normalize('NFD'), braille: HanBraille.BraiToUCS([1, 5], [1, 2, 6]) },
            { symbol: '바\u110b'.normalize('NFD'), braille: HanBraille.BraiToUCS([4, 5], [1, 2, 6]) },
            { symbol: '빠\u110b'.normalize('NFD'), braille: HanBraille.BraiToUCS([6], [4, 5], [1, 2, 6]) },
            { symbol: '자\u110b'.normalize('NFD'), braille: HanBraille.BraiToUCS([4, 6], [1, 2, 6]) },
            { symbol: '짜\u110b'.normalize('NFD'), braille: HanBraille.BraiToUCS([6], [4, 6], [1, 2, 6]) },
            { symbol: '카\u110b'.normalize('NFD'), braille: HanBraille.BraiToUCS([1, 2, 4], [1, 2, 6]) },
            { symbol: '타\u110b'.normalize('NFD'), braille: HanBraille.BraiToUCS([1, 2, 5], [1, 2, 6]) },
            { symbol: '파\u110b'.normalize('NFD'), braille: HanBraille.BraiToUCS([1, 4, 5], [1, 2, 6]) },
            { symbol: '하\u110b'.normalize('NFD'), braille: HanBraille.BraiToUCS([2, 4, 5], [1, 2, 6]) },
            { symbol: '팠'.normalize('NFD'), braille: HanBraille.BraiToUCS([1, 4, 5], [1, 2, 6], [3, 4]) },
            ////16항: exceptional shorthands
            { symbol: '성'.normalize('NFD'), braille: HanBraille.BraiToUCS([6], [1, 2, 4, 5, 6]) },
            { symbol: '썽'.normalize('NFD'), braille: HanBraille.BraiToUCS([6], [6], [1, 2, 4, 5, 6]) },
            { symbol: '정'.normalize('NFD'), braille: HanBraille.BraiToUCS([4, 6], [1, 2, 4, 5, 6]) },
            { symbol: '쩡'.normalize('NFD'), braille: HanBraille.BraiToUCS([6], [4, 6], [1, 2, 4, 5, 6]) },
            { symbol: '청'.normalize('NFD'), braille: HanBraille.BraiToUCS([5, 6], [1, 2, 4, 5, 6]) },
            { symbol: '셩'.normalize('NFD'), braille: HanBraille.BraiToUCS([6], [1, 5, 6], [3, 4, 5, 6]) },
            { symbol: '쎵'.normalize('NFD'), braille: HanBraille.BraiToUCS([6], [6], [1, 5, 6], [3, 4, 5, 6]) },
            { symbol: '졍'.normalize('NFD'), braille: HanBraille.BraiToUCS([4, 6], [1, 5, 6], [3, 4, 5, 6]) },
            { symbol: '쪙'.normalize('NFD'), braille: HanBraille.BraiToUCS([6], [4, 6], [1, 5, 6], [3, 4, 5, 6]) },
            { symbol: '쳥'.normalize('NFD'), braille: HanBraille.BraiToUCS([5, 6], [1, 5, 6], [3, 4, 5, 6]) },
            ////12~15항
            { symbol: '가'.normalize('NFD'), braille: HanBraille.DotsToUni(1, 2, 4, 6) },
            { symbol: '까'.normalize('NFD'), braille: HanBraille.BraiToUCS([6], [1, 2, 4, 6]) },
            { symbol: '나'.normalize('NFD'), braille: HanBraille.DotsToUni(1, 4) },
            { symbol: '다'.normalize('NFD'), braille: HanBraille.DotsToUni(2, 4) },
            { symbol: '따'.normalize('NFD'), braille: HanBraille.BraiToUCS([6], [2, 4]) },
            { symbol: '마'.normalize('NFD'), braille: HanBraille.DotsToUni(1, 5) },
            { symbol: '바'.normalize('NFD'), braille: HanBraille.DotsToUni(4, 5) },
            { symbol: '빠'.normalize('NFD'), braille: HanBraille.BraiToUCS([6], [4, 5]) },
            { symbol: '사'.normalize('NFD'), braille: HanBraille.DotsToUni(1, 2, 3) },
            { symbol: '싸'.normalize('NFD'), braille: HanBraille.BraiToUCS([6], [1, 2, 3]) },
            { symbol: '자'.normalize('NFD'), braille: HanBraille.DotsToUni(4, 6) },
            { symbol: '짜'.normalize('NFD'), braille: HanBraille.BraiToUCS([6], [4, 6]) },
            { symbol: '카'.normalize('NFD'), braille: HanBraille.DotsToUni(1, 2, 4) },
            { symbol: '타'.normalize('NFD'), braille: HanBraille.DotsToUni(1, 2, 5) },
            { symbol: '파'.normalize('NFD'), braille: HanBraille.DotsToUni(1, 4, 5) },
            { symbol: '하'.normalize('NFD'), braille: HanBraille.DotsToUni(2, 4, 5) },
            { symbol: '\u1165\u11a8', braille: HanBraille.DotsToUni(1, 4, 5, 6) },
            { symbol: '\u1165\u11a9', braille: HanBraille.BraiToUCS([1, 4, 5, 6], [1]) },
            { symbol: '\u1165\u11aa', braille: HanBraille.BraiToUCS([1, 4, 5, 6], [3]) },
            { symbol: '\u1165\u11ab', braille: HanBraille.DotsToUni(2, 3, 4, 5, 6) },
            { symbol: '\u1165\u11ac', braille: HanBraille.BraiToUCS([2, 3, 4, 5, 6], [1, 3]) },
            { symbol: '\u1165\u11ad', braille: HanBraille.BraiToUCS([2, 3, 4, 5, 6], [3, 5, 6]) },
            { symbol: '\u1165\u11af', braille: HanBraille.DotsToUni(2, 3, 4, 5) },
            { symbol: '\u1165\u11b0', braille: HanBraille.BraiToUCS([2, 3, 4, 5], [1]) },
            { symbol: '\u1165\u11b1', braille: HanBraille.BraiToUCS([2, 3, 4, 5], [2, 6]) },
            { symbol: '\u1165\u11b2', braille: HanBraille.BraiToUCS([2, 3, 4, 5], [1, 2]) },
            { symbol: '\u1165\u11b3', braille: HanBraille.BraiToUCS([2, 3, 4, 5], [3]) },
            { symbol: '\u1165\u11b4', braille: HanBraille.BraiToUCS([2, 3, 4, 5], [2, 3, 6]) },
            { symbol: '\u1165\u11b5', braille: HanBraille.BraiToUCS([2, 3, 4, 5], [2, 5, 6]) },
            { symbol: '\u1165\u11b6', braille: HanBraille.BraiToUCS([2, 3, 4, 5], [3, 5, 6]) },
            { symbol: '\u1167\u11ab', braille: HanBraille.DotsToUni(1, 6) },
            { symbol: '\u1167\u11ac', braille: HanBraille.BraiToUCS([1, 6], [1, 3]) },
            { symbol: '\u1167\u11ad', braille: HanBraille.BraiToUCS([1, 6], [3, 5, 6]) },
            { symbol: '\u1167\u11af', braille: HanBraille.DotsToUni(1, 2, 5, 6) },
            { symbol: '\u1167\u11b0', braille: HanBraille.BraiToUCS([1, 2, 5, 6], [1]) },
            { symbol: '\u1167\u11b1', braille: HanBraille.BraiToUCS([1, 2, 5, 6], [2, 6]) },
            { symbol: '\u1167\u11b2', braille: HanBraille.BraiToUCS([1, 2, 5, 6], [1, 2]) },
            { symbol: '\u1167\u11b3', braille: HanBraille.BraiToUCS([1, 2, 5, 6], [3]) },
            { symbol: '\u1167\u11b4', braille: HanBraille.BraiToUCS([1, 2, 5, 6], [2, 3, 6]) },
            { symbol: '\u1167\u11b5', braille: HanBraille.BraiToUCS([1, 2, 5, 6], [2, 5, 6]) },
            { symbol: '\u1167\u11b6', braille: HanBraille.BraiToUCS([1, 2, 5, 6], [3, 5, 6]) },
            { symbol: '\u1167\u11bc', braille: HanBraille.DotsToUni(1, 2, 4, 5, 6) },
            { symbol: '\u1169\u11a8', braille: HanBraille.DotsToUni(1, 3, 4, 6) },
            { symbol: '\u1169\u11a9', braille: HanBraille.BraiToUCS([1, 3, 4, 6], [1]) },
            { symbol: '\u1169\u11aa', braille: HanBraille.BraiToUCS([1, 3, 4, 6], [3]) },
            { symbol: '\u1169\u11ab', braille: HanBraille.DotsToUni(1, 2, 3, 5, 6) },
            { symbol: '\u1169\u11ac', braille: HanBraille.BraiToUCS([1, 2, 3, 5, 6], [1, 3]) },
            { symbol: '\u1169\u11ad', braille: HanBraille.BraiToUCS([1, 2, 3, 5, 6], [3, 5, 6]) },
            { symbol: '\u1169\u11bc', braille: HanBraille.DotsToUni(1, 2, 3, 4, 5, 6) },
            { symbol: '\u116e\u11ab', braille: HanBraille.DotsToUni(1, 2, 4, 5) },
            { symbol: '\u116e\u11ac', braille: HanBraille.BraiToUCS([1, 2, 4, 5], [1, 3]) },
            { symbol: '\u116e\u11ad', braille: HanBraille.BraiToUCS([1, 2, 4, 5], [3, 5, 6]) },
            { symbol: '\u116e\u11af', braille: HanBraille.DotsToUni(1, 2, 3, 4, 6) },
            { symbol: '\u116e\u11b0', braille: HanBraille.BraiToUCS([1, 2, 3, 4, 6], [1]) },
            { symbol: '\u116e\u11b1', braille: HanBraille.BraiToUCS([1, 2, 3, 4, 6], [2, 6]) },
            { symbol: '\u116e\u11b2', braille: HanBraille.BraiToUCS([1, 2, 3, 4, 6], [1, 2]) },
            { symbol: '\u116e\u11b3', braille: HanBraille.BraiToUCS([1, 2, 3, 4, 6], [3]) },
            { symbol: '\u116e\u11b4', braille: HanBraille.BraiToUCS([1, 2, 3, 4, 6], [2, 3, 6]) },
            { symbol: '\u116e\u11b5', braille: HanBraille.BraiToUCS([1, 2, 3, 4, 6], [2, 5, 6]) },
            { symbol: '\u116e\u11b6', braille: HanBraille.BraiToUCS([1, 2, 3, 4, 6], [3, 5, 6]) },
            { symbol: '\u1173\u11ab', braille: HanBraille.DotsToUni(1, 3, 5, 6) },
            { symbol: '\u1173\u11ac', braille: HanBraille.BraiToUCS([1, 3, 5, 6], [1, 3]) },
            { symbol: '\u1173\u11ad', braille: HanBraille.BraiToUCS([1, 3, 5, 6], [3, 5, 6]) },
            { symbol: '\u1173\u11af', braille: HanBraille.DotsToUni(2, 3, 4, 6) },
            { symbol: '\u1173\u11b0', braille: HanBraille.BraiToUCS([2, 3, 4, 6], [1]) },
            { symbol: '\u1173\u11b1', braille: HanBraille.BraiToUCS([2, 3, 4, 6], [2, 6]) },
            { symbol: '\u1173\u11b2', braille: HanBraille.BraiToUCS([2, 3, 4, 6], [1, 2]) },
            { symbol: '\u1173\u11b3', braille: HanBraille.BraiToUCS([2, 3, 4, 6], [3]) },
            { symbol: '\u1173\u11b4', braille: HanBraille.BraiToUCS([2, 3, 4, 6], [2, 3, 6]) },
            { symbol: '\u1173\u11b5', braille: HanBraille.BraiToUCS([2, 3, 4, 6], [2, 5, 6]) },
            { symbol: '\u1173\u11b6', braille: HanBraille.BraiToUCS([2, 3, 4, 6], [3, 5, 6]) },
            { symbol: '\u1175\u11ab', braille: HanBraille.DotsToUni(1, 2, 3, 4, 5) },
            { symbol: '\u1175\u11ac', braille: HanBraille.BraiToUCS([1, 2, 3, 4, 5], [1, 3]) },
            { symbol: '\u1175\u11ad', braille: HanBraille.BraiToUCS([1, 2, 3, 4, 5], [3, 5, 6]) },
            { symbol: '것'.normalize('NFD'), braille: HanBraille.BraiToUCS([4, 5, 6], [2, 3, 4]) },
            { symbol: '껏'.normalize('NFD'), braille: HanBraille.BraiToUCS([6], [4, 5, 6], [2, 3, 4]) }, //껏
        ]);
        _HanBraille_hanMapping.set(this, [
            //Numeric
            { symbol: '0', braille: braille_1.Braille.DotsToUni(2, 4, 5) },
            { symbol: '1', braille: braille_1.Braille.DotsToUni(1) },
            { symbol: '2', braille: braille_1.Braille.DotsToUni(1, 2) },
            { symbol: '3', braille: braille_1.Braille.DotsToUni(1, 4) },
            { symbol: '4', braille: braille_1.Braille.DotsToUni(1, 4, 5) },
            { symbol: '5', braille: braille_1.Braille.DotsToUni(1, 5) },
            { symbol: '6', braille: braille_1.Braille.DotsToUni(1, 2, 4) },
            { symbol: '7', braille: braille_1.Braille.DotsToUni(1, 2, 4, 5) },
            { symbol: '8', braille: braille_1.Braille.DotsToUni(1, 2, 5) },
            { symbol: '9', braille: braille_1.Braille.DotsToUni(2, 4) },
            //제1절
            { symbol: '\u1100', braille: HanBraille.DotsToUni(4) },
            { symbol: '\u1101', braille: HanBraille.BraiToUCS([6], [4]) },
            { symbol: '\u1102', braille: HanBraille.DotsToUni(1, 4) },
            { symbol: '\u1103', braille: HanBraille.DotsToUni(2, 4) },
            { symbol: '\u1104', braille: HanBraille.BraiToUCS([6], [2, 4]) },
            { symbol: '\u1105', braille: HanBraille.DotsToUni(5) },
            { symbol: '\u1106', braille: HanBraille.DotsToUni(1, 5) },
            { symbol: '\u1107', braille: HanBraille.DotsToUni(4, 5) },
            { symbol: '\u1108', braille: HanBraille.BraiToUCS([6], [4, 5]) },
            { symbol: '\u1109', braille: HanBraille.DotsToUni(6) },
            { symbol: '\u110a', braille: HanBraille.BraiToUCS([6], [6]) },
            { symbol: '\u110b', braille: HanBraille.DotsToUni(1, 2, 4, 5), condition: false },
            { symbol: '\u110b', braille: "" },
            { symbol: '\u110c', braille: HanBraille.DotsToUni(4, 6) },
            { symbol: '\u110d', braille: HanBraille.BraiToUCS([6], [4, 6]) },
            { symbol: '\u110e', braille: HanBraille.DotsToUni(5, 6) },
            { symbol: '\u110f', braille: HanBraille.DotsToUni(1, 2, 4) },
            { symbol: '\u1110', braille: HanBraille.DotsToUni(1, 2, 5) },
            { symbol: '\u1111', braille: HanBraille.DotsToUni(1, 4, 5) },
            { symbol: '\u1112', braille: HanBraille.DotsToUni(2, 4, 5) },
            //제3절
            { symbol: '\u1161', braille: HanBraille.DotsToUni(1, 2, 6) },
            { symbol: '\u1162', braille: HanBraille.DotsToUni(1, 2, 3, 5) },
            { symbol: '\u1163', braille: HanBraille.DotsToUni(3, 4, 5) },
            { symbol: '\u1164', braille: HanBraille.BraiToUCS([3, 4, 5], [1, 2, 3, 5]) },
            { symbol: '\u1165', braille: HanBraille.DotsToUni(2, 3, 4) },
            { symbol: '\u1166', braille: HanBraille.DotsToUni(1, 3, 4, 5) },
            { symbol: '\u1167', braille: HanBraille.DotsToUni(1, 5, 6) },
            { symbol: '\u1168', braille: HanBraille.DotsToUni(3, 4) },
            { symbol: '\u1169', braille: HanBraille.DotsToUni(1, 3, 6) },
            { symbol: '\u116a', braille: HanBraille.DotsToUni(1, 2, 3, 6) },
            { symbol: '\u116b', braille: HanBraille.BraiToUCS([1, 2, 3, 6], [1, 2, 3, 5]) },
            { symbol: '\u116c', braille: HanBraille.DotsToUni(1, 3, 4, 5, 6) },
            { symbol: '\u116d', braille: HanBraille.DotsToUni(3, 4, 6) },
            { symbol: '\u116e', braille: HanBraille.DotsToUni(1, 3, 4) },
            { symbol: '\u116f', braille: HanBraille.DotsToUni(1, 2, 3, 4) },
            { symbol: '\u1170', braille: HanBraille.BraiToUCS([1, 2, 3, 4], [1, 2, 3, 5]) },
            { symbol: '\u1171', braille: HanBraille.BraiToUCS([1, 3, 4], [1, 2, 3, 5]) },
            { symbol: '\u1172', braille: HanBraille.DotsToUni(1, 4, 6) },
            { symbol: '\u1173', braille: HanBraille.DotsToUni(2, 4, 6) },
            { symbol: '\u1174', braille: HanBraille.DotsToUni(2, 4, 5, 6) },
            { symbol: '\u1175', braille: HanBraille.DotsToUni(1, 3, 5) },
            //제2절
            { symbol: '\u11a8', braille: HanBraille.DotsToUni(1) },
            { symbol: '\u11a9', braille: HanBraille.BraiToUCS([1], [1]) },
            { symbol: '\u11aa', braille: HanBraille.BraiToUCS([1], [3]) },
            { symbol: '\u11ab', braille: HanBraille.DotsToUni(2, 5) },
            { symbol: '\u11ac', braille: HanBraille.BraiToUCS([2, 5], [1, 3]) },
            { symbol: '\u11ad', braille: HanBraille.BraiToUCS([2, 5], [3, 5, 6]) },
            { symbol: '\u11ae', braille: HanBraille.DotsToUni(3, 5) },
            { symbol: '\u11af', braille: HanBraille.DotsToUni(2) },
            { symbol: '\u11b0', braille: HanBraille.BraiToUCS([2], [1]) },
            { symbol: '\u11b1', braille: HanBraille.BraiToUCS([2], [2, 6]) },
            { symbol: '\u11b2', braille: HanBraille.BraiToUCS([2], [1, 2]) },
            { symbol: '\u11b3', braille: HanBraille.BraiToUCS([2], [3]) },
            { symbol: '\u11b4', braille: HanBraille.BraiToUCS([2], [2, 3, 6]) },
            { symbol: '\u11b5', braille: HanBraille.BraiToUCS([2], [2, 5, 6]) },
            { symbol: '\u11b6', braille: HanBraille.BraiToUCS([2], [3, 5, 6]) },
            { symbol: '\u11b7', braille: HanBraille.DotsToUni(2, 6) },
            { symbol: '\u11b8', braille: HanBraille.DotsToUni(1, 2) },
            { symbol: '\u11b9', braille: HanBraille.BraiToUCS([1, 2], [3]) },
            { symbol: '\u11ba', braille: HanBraille.DotsToUni(3) },
            { symbol: '\u11bb', braille: HanBraille.DotsToUni(3, 4) },
            { symbol: '\u11bc', braille: HanBraille.BraiToUCS([5], [2, 3, 5, 6]), condition: this.u11bc_null },
            { symbol: '\u11bc', braille: HanBraille.DotsToUni(2, 3, 5, 6) },
            { symbol: '\u11bd', braille: HanBraille.DotsToUni(1, 3) },
            { symbol: '\u11be', braille: HanBraille.DotsToUni(2, 3) },
            { symbol: '\u11bf', braille: HanBraille.DotsToUni(2, 3, 5) },
            { symbol: '\u11c0', braille: HanBraille.DotsToUni(2, 3, 6) },
            { symbol: '\u11c1', braille: HanBraille.DotsToUni(2, 5, 6) },
            { symbol: '\u11c2', braille: HanBraille.DotsToUni(3, 5, 6) },
            //제4절: Singular
            ////Assuming remaining Hangul Compatibility Jamo as the Jongseong (T) per 43항
            ////TODO: L-HJF, HCF-V, HCF-HJF-T (These are special cases)
            { symbol: '\u3131', braille: HanBraille.BraiToUCS([1, 2, 3, 4, 5, 6], [1]) },
            { symbol: '\u3134', braille: HanBraille.BraiToUCS([1, 2, 3, 4, 5, 6], [2, 5]) },
            { symbol: '\u3137', braille: HanBraille.BraiToUCS([1, 2, 3, 4, 5, 6], [3, 5]) },
            { symbol: '\u3139', braille: HanBraille.BraiToUCS([1, 2, 3, 4, 5, 6], [2]) },
            { symbol: '\u3141', braille: HanBraille.BraiToUCS([1, 2, 3, 4, 5, 6], [2, 6]) },
            { symbol: '\u3142', braille: HanBraille.BraiToUCS([1, 2, 3, 4, 5, 6], [1, 2]) },
            { symbol: '\u3145', braille: HanBraille.BraiToUCS([1, 2, 3, 4, 5, 6], [3]) },
            { symbol: '\u3147', braille: HanBraille.BraiToUCS([1, 2, 3, 4, 5, 6], [2, 3, 5, 6]) },
            { symbol: '\u3148', braille: HanBraille.BraiToUCS([1, 2, 3, 4, 5, 6], [1, 3]) },
            { symbol: '\u314a', braille: HanBraille.BraiToUCS([1, 2, 3, 4, 5, 6], [2, 3]) },
            { symbol: '\u314b', braille: HanBraille.BraiToUCS([1, 2, 3, 4, 5, 6], [2, 3, 5]) },
            { symbol: '\u314c', braille: HanBraille.BraiToUCS([1, 2, 3, 4, 5, 6], [2, 3, 6]) },
            { symbol: '\u314d', braille: HanBraille.BraiToUCS([1, 2, 3, 4, 5, 6], [2, 5, 6]) },
            { symbol: '\u314e', braille: HanBraille.BraiToUCS([1, 2, 3, 4, 5, 6], [3, 5, 6]) },
            { symbol: '\u314f', braille: HanBraille.BraiToUCS([1, 2, 3, 4, 5, 6], [1, 2, 6]) },
            { symbol: '\u3151', braille: HanBraille.BraiToUCS([1, 2, 3, 4, 5, 6], [3, 4, 5]) },
            { symbol: '\u3153', braille: HanBraille.BraiToUCS([1, 2, 3, 4, 5, 6], [2, 3, 4]) },
            { symbol: '\u3155', braille: HanBraille.BraiToUCS([1, 2, 3, 4, 5, 6], [1, 5, 6]) },
            { symbol: '\u3157', braille: HanBraille.BraiToUCS([1, 2, 3, 4, 5, 6], [1, 3, 6]) },
            { symbol: '\u315b', braille: HanBraille.BraiToUCS([1, 2, 3, 4, 5, 6], [3, 4, 6]) },
            { symbol: '\u315c', braille: HanBraille.BraiToUCS([1, 2, 3, 4, 5, 6], [1, 3, 4]) },
            { symbol: '\u3160', braille: HanBraille.BraiToUCS([1, 2, 3, 4, 5, 6], [1, 4, 6]) },
            { symbol: '\u3161', braille: HanBraille.BraiToUCS([1, 2, 3, 4, 5, 6], [2, 4, 6]) },
            { symbol: '\u3162', braille: HanBraille.BraiToUCS([1, 2, 3, 4, 5, 6], [2, 4, 5, 6]) },
            { symbol: '\u3163', braille: HanBraille.BraiToUCS([4, 5, 6], [1, 3, 5]), condition: this.u3163_isolate },
            { symbol: '\u3163', braille: HanBraille.BraiToUCS([1, 2, 3, 4, 5, 6], [1, 3, 5]) },
            //제8절
            ////Todo: 제23항
            ////제19항
            { symbol: '\u1140', braille: HanBraille.BraiToUCS([5], [4, 6]) },
            { symbol: '\u11eb', braille: HanBraille.BraiToUCS([5], [1, 3]) },
            { symbol: '\u114c', braille: HanBraille.BraiToUCS([5], [1, 4, 5]) },
            { symbol: '\u11f0', braille: HanBraille.BraiToUCS([5], [2, 5, 6]) },
            { symbol: '\u1159', braille: HanBraille.BraiToUCS([5], [2, 4, 5]) },
            { symbol: '\u11f9', braille: HanBraille.BraiToUCS([5], [3, 5, 6]) },
            { symbol: '\u317f', braille: HanBraille.BraiToUCS([1, 2, 3, 4, 5, 6], [5], [4, 6]) },
            { symbol: '\u3181', braille: HanBraille.BraiToUCS([1, 2, 3, 4, 5, 6], [5], [1, 4, 5]) },
            { symbol: '\u3186', braille: HanBraille.BraiToUCS([1, 2, 3, 4, 5, 6], [5], [2, 4, 5]) },
            ////제20항
            { symbol: '\u111d', braille: HanBraille.BraiToUCS([5], [1, 5], [2, 3, 5, 6]) },
            { symbol: '\u11e2', braille: HanBraille.BraiToUCS([5], [2, 6], [2, 3, 5, 6]) },
            { symbol: '\u112b', braille: HanBraille.BraiToUCS([5], [4, 5], [2, 3, 5, 6]) },
            { symbol: '\u11e6', braille: HanBraille.BraiToUCS([5], [1, 2], [2, 3, 5, 6]) },
            { symbol: '\u112c', braille: HanBraille.BraiToUCS([5], [6], [4, 5], [2, 3, 5, 6]) },
            { symbol: '\u1157', braille: HanBraille.BraiToUCS([5], [1, 4, 5], [2, 3, 5, 6]) },
            { symbol: '\u111b', braille: HanBraille.BraiToUCS([5], [5], [2, 3, 5, 6]) },
            ////제21항
            { symbol: '\u1114', braille: HanBraille.BraiToUCS([5], [1, 4], [1, 4]) },
            { symbol: '\u1147', braille: HanBraille.BraiToUCS([5], [1, 2, 4, 5], [1, 2, 4, 5]) },
            { symbol: '\u1158', braille: HanBraille.BraiToUCS([5], [2, 4, 5], [2, 4, 5]) },
            ////제22항
            { symbol: '\u111e', braille: HanBraille.BraiToUCS([5], [4, 5], [4]) },
            { symbol: '\u1120', braille: HanBraille.BraiToUCS([5], [4, 5], [2, 4]) },
            { symbol: '\u1121', braille: HanBraille.BraiToUCS([5], [4, 5], [6]) },
            { symbol: '\u1122', braille: HanBraille.BraiToUCS([5], [4, 5], [6], [4]) },
            { symbol: '\u1123', braille: HanBraille.BraiToUCS([5], [4, 5], [6], [2, 4]) },
            { symbol: '\u1127', braille: HanBraille.BraiToUCS([5], [4, 5], [4, 6]) },
            { symbol: '\u1129', braille: HanBraille.BraiToUCS([5], [4, 5], [1, 2, 5]) },
            { symbol: '\u112d', braille: HanBraille.BraiToUCS([5], [6], [4]) },
            { symbol: '\u112e', braille: HanBraille.BraiToUCS([5], [6], [1, 4]) },
            { symbol: '\u112f', braille: HanBraille.BraiToUCS([5], [6], [2, 4]) },
            { symbol: '\u1132', braille: HanBraille.BraiToUCS([5], [6], [4, 5]) },
            { symbol: '\u1136', braille: HanBraille.BraiToUCS([5], [6], [4, 6]) },
            { symbol: '\u11c7', braille: HanBraille.BraiToUCS([2, 5], [3]) },
            { symbol: '\u11c8', braille: HanBraille.BraiToUCS([2, 5], [5], [1, 3]) },
            { symbol: '\u11d9', braille: HanBraille.BraiToUCS([2], [5], [3, 5, 6]) },
            { symbol: '\u11da', braille: HanBraille.BraiToUCS([2, 6], [1]) },
            { symbol: '\u11dd', braille: HanBraille.BraiToUCS([2, 6], [3]) },
            { symbol: '\u11df', braille: HanBraille.BraiToUCS([2, 6], [5], [1, 3]) },
            //제9절
            ////제25항
            { symbol: '\u119e', braille: HanBraille.BraiToUCS([5], [3, 4, 5, 6]) },
            { symbol: '\u11a1', braille: HanBraille.BraiToUCS([5], [3, 4, 5, 6], [1, 2, 3, 5]) },
            { symbol: '\u318d', braille: HanBraille.BraiToUCS([1, 2, 3, 4, 5, 6], [5], [3, 4, 5, 6]) },
            { symbol: '\u318e', braille: HanBraille.BraiToUCS([1, 2, 3, 4, 5, 6], [5], [3, 4, 5, 6], [1, 2, 3, 5]) },
            ////제26항
            { symbol: '\u1188', braille: HanBraille.BraiToUCS([4, 5, 6], [3, 4, 6], [1, 3, 5]) },
            { symbol: '\u1184', braille: HanBraille.BraiToUCS([4, 5, 6], [3, 4, 6], [3, 4, 5]) },
            { symbol: '\u1185', braille: HanBraille.BraiToUCS([4, 5, 6], [3, 4, 6], [3, 4, 5], [1, 2, 3, 5]) },
            { symbol: '\u1194', braille: HanBraille.BraiToUCS([4, 5, 6], [1, 4, 6], [1, 3, 5]) },
            { symbol: '\u1191', braille: HanBraille.BraiToUCS([4, 5, 6], [1, 4, 6], [1, 5, 6]) },
            { symbol: '\u1192', braille: HanBraille.BraiToUCS([4, 5, 6], [1, 4, 6], [3, 4]) },
            //제12절: 문장 부호
            { symbol: '\\.', braille: HanBraille.DotsToUni(2, 5, 6) },
            { symbol: '\\?', braille: HanBraille.DotsToUni(2, 3, 6) },
            { symbol: '!', braille: HanBraille.DotsToUni(2, 3, 5) },
            { symbol: ',', braille: HanBraille.DotsToUni(5) },
            { symbol: '·', braille: HanBraille.BraiToUCS([5], [2, 3]) },
            { symbol: ':', braille: HanBraille.BraiToUCS([5], [2]) },
            { symbol: ';', braille: HanBraille.BraiToUCS([5, 6], [2, 3]) },
            { symbol: '/', braille: HanBraille.BraiToUCS([4, 5, 6], [3, 4]) },
            { symbol: '“', braille: HanBraille.DotsToUni(2, 3, 6) },
            { symbol: '”', braille: HanBraille.DotsToUni(3, 5, 6) },
            { symbol: "‘", braille: HanBraille.BraiToUCS([6], [2, 3, 6]) },
            { symbol: "’", braille: HanBraille.BraiToUCS([3, 5, 6], [3]) },
            { symbol: '\\(', braille: HanBraille.BraiToUCS([2, 3, 6], [3]) },
            { symbol: '\\)', braille: HanBraille.BraiToUCS([6], [3, 5, 6]) },
            { symbol: '\\{', braille: HanBraille.BraiToUCS([2, 3, 6], [2]) },
            { symbol: '\\}', braille: HanBraille.BraiToUCS([5], [3, 5, 6]) },
            { symbol: '\\[', braille: HanBraille.BraiToUCS([2, 3, 6], [2, 3]) },
            { symbol: '\\]', braille: HanBraille.BraiToUCS([5, 6], [3, 5, 6]) },
            { symbol: '『', braille: HanBraille.BraiToUCS([5, 6], [2, 3, 6]) },
            { symbol: '』', braille: HanBraille.BraiToUCS([3, 5, 6], [2, 3]) },
            { symbol: '《', braille: HanBraille.BraiToUCS([5, 6], [2, 3, 6]) },
            { symbol: '》', braille: HanBraille.BraiToUCS([3, 5, 6], [2, 3]) },
            { symbol: '「', braille: HanBraille.BraiToUCS([5], [2, 3, 6]) },
            { symbol: '」', braille: HanBraille.BraiToUCS([3, 5, 6], [2]) },
            { symbol: '〈', braille: HanBraille.BraiToUCS([5], [2, 3, 6]) },
            { symbol: '〉', braille: HanBraille.BraiToUCS([3, 5, 6], [2]) },
            { symbol: '-', braille: HanBraille.DotsToUni(3, 6) },
            { symbol: '—', braille: HanBraille.BraiToUCS([3, 6], [3, 6]) },
            { symbol: '~', braille: HanBraille.BraiToUCS([3, 6], [3, 6]) },
            { symbol: '……', braille: HanBraille.BraiToUCS([6], [6], [6]) },
            { symbol: '…', braille: HanBraille.BraiToUCS([6], [6], [6]) },
            { symbol: '\\*', braille: HanBraille.BraiToUCS([3, 5], [3, 5]) },
            { symbol: '※', braille: HanBraille.BraiToUCS([4, 5, 6], [3, 5]), condition: false },
            { symbol: '※', braille: HanBraille.BraiToUCS([3, 5], [3, 5]) },
            { symbol: "'", braille: HanBraille.DotsToUni(3) },
            { symbol: '〃', braille: HanBraille.BraiToUCS([5, 6], [2, 3]) },
            { symbol: 'ː', braille: HanBraille.BraiToUCS([6], [3]) },
            { symbol: '₩', braille: HanBraille.BraiToUCS([4], [2, 4, 5, 6]) },
            { symbol: '￦', braille: HanBraille.BraiToUCS([4], [2, 4, 5, 6]) },
            { symbol: '¢', braille: HanBraille.BraiToUCS([4], [1, 4]) },
            { symbol: '\\$', braille: HanBraille.BraiToUCS([4], [1, 4, 5]) },
            { symbol: '£', braille: HanBraille.BraiToUCS([4], [1, 2, 3]) },
            { symbol: '¥', braille: HanBraille.BraiToUCS([4], [1, 3, 4, 5, 6]) },
            { symbol: '€', braille: HanBraille.BraiToUCS([4], [1, 5]) },
            { symbol: '\u302e', braille: '' },
            { symbol: '\u302f', braille: '' }, //discarding isolated bangjeom
        ]);
        this._u11bc_null = u11bc_null;
        this._u3163_isolate = u3163_isolate;
    }
    get u11bc_null() {
        return this._u11bc_null;
    }
    get u3163_isolate() {
        return this._u3163_isolate;
    }
    HangBrai(hang, width = 0) {
        let d = hang.normalize('NFD');
        let o = '';
        let p = ' ';
        let linePos = 0;
        let isNumeric = false;
        let prohibitContract = false;
        const UEBDetect = /^[\p{Lu}\p{Ll}@#^&\u0391-\u03a1\u03a3-\u03a9\u03b1-\u03c9](([0-9\p{Lu}\p{Ll}@#^&\u0391-\u03a1\u03a3-\u03a9\u03b1-\u03c9]|\p{P}|\p{Lm}|\p{Mn}|\s)*([0-9\p{Lu}\p{Ll}@#^&\u0391-\u03a1\u03a3-\u03a9\u03b1-\u03c9]|\p{P}|\p{Lm}|\p{Mn}))?/gu;
        while (d !== '') {
            /* Code switching */
            if (!isNumeric && d.match(/^[0-9]/gu)) {
                //Enabling numeric mode in front of digits
                isNumeric = true;
                o += HanBraille.DotsToUni(3, 4, 5, 6);
            }
            else if (UEBDetect.test(d)) {
                var q = d.slice(0, UEBDetect.lastIndex);
                d = d.slice(UEBDetect.lastIndex);
                o += HanBraille.DotsToUni(3, 5, 6);
                q = this.UnifiedBrl(q);
                q = q.replace(/\u2820\u2804$/gu, ''); //remove capital terminator
                o += this.UnifiedBrl(q);
                o += HanBraille.DotsToUni(2, 5, 6);
            }
            else if (isNumeric && d.match(/^[^0-9.,~\-]/gu)) {
                //Disabling numeric mode after non-digit appears
                // Korean rule accepts hyphens and swung dashes while numeric mode, unlike UEB
                isNumeric = false;
                if (o.match(/\u2824$/) && d.match(/^[\u1102\u1103\u1106\u110f-\u1112]\u1161/gu)) {
                    //hyphen before 나다마카타파하
                    prohibitContract = true;
                }
            }
            /* Actual conversion */
            if (d[0] === undefined) {
            }
            else if (d[0].match(/^\n/)) {
                o += '\n';
                p = d[0];
                d = d.slice(1);
            }
            else if (d[0].match(/^\s/gu)) {
                o += HanBraille.DotsToUni(0);
                p = d[0];
                d = d.slice(1);
            }
            else
                hanExit: {
                    for (const x of __classPrivateFieldGet(this, _HanBraille_hanMappingAntiCollision, "f")) {
                        //assuring x.symbol is ''; new RegExp obj is necessary
                        let b;
                        if (x.before)
                            b = new RegExp(x.before);
                        let a;
                        if (x.after)
                            a = new RegExp(x.after);
                        if ((b === undefined || b.test(p))
                            && (a === undefined || a.test(d))) {
                            o += x.braille;
                        }
                    }
                    if (!prohibitContract) {
                        for (const x of __classPrivateFieldGet(this, _HanBraille_hanMappingContract, "f")) {
                            let regexp;
                            if (typeof (x.after) == 'object') { //RegExp
                                regexp = new RegExp('^' + x.symbol + '(?=' + x.after.source + ')', 'gu');
                            }
                            else {
                                regexp = new RegExp('^' + x.symbol, 'gu');
                            }
                            if (regexp.test(d)
                                && (x.condition === undefined || x.condition)
                                && (x.before === undefined || x.before.test(p))) {
                                o += x.braille;
                                p = d.slice(0, regexp.lastIndex);
                                d = d.slice(regexp.lastIndex);
                                break hanExit;
                            }
                        }
                    }
                    for (const x of __classPrivateFieldGet(this, _HanBraille_hanMapping, "f")) {
                        let regexp = new RegExp('^' + x.symbol, 'gu');
                        if (regexp.test(d) && (x.condition || x.condition === undefined)) {
                            o += x.braille;
                            p = d.slice(0, regexp.lastIndex);
                            d = d.slice(regexp.lastIndex);
                            prohibitContract = false;
                            break hanExit;
                        }
                    }
                    console.log(`Skipping ${d[0]}...`);
                    d = d.slice(1);
                }
        }
        return o;
    }
}
exports.HanBraille = HanBraille;
_HanBraille_hanMappingAntiCollision = new WeakMap(), _HanBraille_hanMappingContract = new WeakMap(), _HanBraille_hanMapping = new WeakMap();
