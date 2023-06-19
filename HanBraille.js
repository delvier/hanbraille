"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _HanBraille_BraiToUCS, _HanBraille_DotsToUni;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HanBraille = void 0;
class HanBraille {
    static HangToBrai(hang) {
        let d = hang.normalize('NFD');
        for (let i of HanBraille.mapping) {
            d = d.replace(new RegExp(i[0], 'ugim'), i[1][0]);
        }
        return d;
    }
}
exports.HanBraille = HanBraille;
_a = HanBraille, _HanBraille_BraiToUCS = function _HanBraille_BraiToUCS(...lists) {
    let o = "";
    for (let i of lists) {
        o += __classPrivateFieldGet(this, _a, "m", _HanBraille_DotsToUni).call(this, ...i);
    }
    return o;
}, _HanBraille_DotsToUni = function _HanBraille_DotsToUni(...dots) {
    let n = 0x2800;
    let s = new Set(dots);
    for (let i of s) {
        if (!([1, 2, 3, 4, 5, 6, 7, 8].includes(i))) {
            continue;
        }
        n += 2 ** (i - 1);
    }
    return String.fromCharCode(n);
};
HanBraille.mapping = new Map([
    /* Special cases */
    //제7절: Abbr. Only at the beginning of the line, or after a whitespace or a punctuation
    ['(?<=^|\\s|\\p{P})그래서'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1], [2, 3, 4])]],
    ['(?<=^|\\s|\\p{P})그러나'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1], [1, 2])]],
    ['(?<=^|\\s|\\p{P})그러면'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1], [2, 5])]],
    ['(?<=^|\\s|\\p{P})그러므로'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1], [2, 6])]],
    ['(?<=^|\\s|\\p{P})그런데'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1], [1, 3, 4, 5])]],
    ['(?<=^|\\s|\\p{P})그리고'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1], [1, 3, 6])]],
    ['(?<=^|\\s|\\p{P})그리하여'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1], [1, 5, 6])]],
    //제6절: Shorthands
    ////17항: shorthand prohibition
    ['나\u110b'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 4], [1, 2, 6])]],
    ['다\u110b'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [2, 4], [1, 2, 6])]],
    ['따\u110b'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [6], [2, 4], [1, 2, 6])]],
    ['마\u110b'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 5], [1, 2, 6])]],
    ['바\u110b'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [4, 5], [1, 2, 6])]],
    ['빠\u110b'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [6], [4, 5], [1, 2, 6])]],
    ['자\u110b'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [4, 6], [1, 2, 6])]],
    ['짜\u110b'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [6], [4, 6], [1, 2, 6])]],
    ['카\u110b'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 4], [1, 2, 6])]],
    ['타\u110b'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 5], [1, 2, 6])]],
    ['파\u110b'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 4, 5], [1, 2, 6])]],
    ['하\u110b'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [2, 4, 5], [1, 2, 6])]],
    ['팠'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 4, 5], [1, 2, 6], [3, 4])]],
    ////16항: exceptional shorthands
    ['성'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [6], [1, 2, 4, 5, 6])]],
    ['썽'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [6], [6], [1, 2, 4, 5, 6])]],
    ['정'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [4, 6], [1, 2, 4, 5, 6])]],
    ['쩡'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [6], [4, 6], [1, 2, 4, 5, 6])]],
    ['청'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [5, 6], [1, 2, 4, 5, 6])]],
    ['셩'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [6], [1, 5, 6], [3, 4, 5, 6])]],
    ['쎵'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [6], [6], [1, 5, 6], [3, 4, 5, 6])]],
    ['졍'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [4, 6], [1, 5, 6], [3, 4, 5, 6])]],
    ['쪙'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [6], [4, 6], [1, 5, 6], [3, 4, 5, 6])]],
    ['쳥'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [5, 6], [1, 5, 6], [3, 4, 5, 6])]],
    ////12~15항
    ['가'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 1, 2, 4, 6)]],
    ['까'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [6], [1, 2, 4, 6])]],
    ['나'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 1, 4)]],
    ['다'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 2, 4)]],
    ['따'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [6], [2, 4])]],
    ['마'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 1, 5)]],
    ['바'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 4, 5)]],
    ['빠'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [6], [4, 5])]],
    ['사'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 1, 2, 3)]],
    ['싸'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [6], [1, 2, 3])]],
    ['자'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 4, 6)]],
    ['짜'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [6], [4, 6])]],
    ['카'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 1, 2, 4)]],
    ['타'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 1, 2, 5)]],
    ['파'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 1, 4, 5)]],
    ['하'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 2, 4, 5)]],
    ['\u1165\u11a8', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 1, 4, 5, 6)]],
    ['\u1165\u11a9', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 4, 5, 6], [1])]],
    ['\u1165\u11aa', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 4, 5, 6], [3])]],
    ['\u1165\u11ab', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 2, 3, 4, 5, 6)]],
    ['\u1165\u11ac', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [2, 3, 4, 5, 6], [1, 3])]],
    ['\u1165\u11ad', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [2, 3, 4, 5, 6], [3, 5, 6])]],
    ['\u1165\u11af', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 2, 3, 4, 5)]],
    ['\u1165\u11b0', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [2, 3, 4, 5], [1])]],
    ['\u1165\u11b1', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [2, 3, 4, 5], [2, 6])]],
    ['\u1165\u11b2', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [2, 3, 4, 5], [1, 2])]],
    ['\u1165\u11b3', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [2, 3, 4, 5], [3])]],
    ['\u1165\u11b4', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [2, 3, 4, 5], [2, 3, 6])]],
    ['\u1165\u11b5', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [2, 3, 4, 5], [2, 5, 6])]],
    ['\u1165\u11b6', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [2, 3, 4, 5], [3, 5, 6])]],
    ['\u1167\u11ab', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 1, 6)]],
    ['\u1167\u11ac', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 6], [1, 3])]],
    ['\u1167\u11ad', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 6], [3, 5, 6])]],
    ['\u1167\u11af', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 1, 2, 5, 6)]],
    ['\u1167\u11b0', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 5, 6], [1])]],
    ['\u1167\u11b1', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 5, 6], [2, 6])]],
    ['\u1167\u11b2', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 5, 6], [1, 2])]],
    ['\u1167\u11b3', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 5, 6], [3])]],
    ['\u1167\u11b4', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 5, 6], [2, 3, 6])]],
    ['\u1167\u11b5', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 5, 6], [2, 5, 6])]],
    ['\u1167\u11b6', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 5, 6], [3, 5, 6])]],
    ['\u1167\u11bc', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 1, 2, 4, 5, 6)]],
    ['\u1169\u11a8', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 1, 3, 4, 6)]],
    ['\u1169\u11a9', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 3, 4, 6], [1])]],
    ['\u1169\u11aa', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 3, 4, 6], [3])]],
    ['\u1169\u11ab', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 1, 2, 3, 5, 6)]],
    ['\u1169\u11ac', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 3, 5, 6], [1, 3])]],
    ['\u1169\u11ad', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 3, 5, 6], [3, 5, 6])]],
    ['\u1169\u11bc', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 1, 2, 3, 4, 5, 6)]],
    ['\u116e\u11ab', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 1, 2, 4, 5)]],
    ['\u116e\u11ac', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 4, 5], [1, 3])]],
    ['\u116e\u11ad', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 4, 5], [3, 5, 6])]],
    ['\u116e\u11af', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 1, 2, 3, 4, 6)]],
    ['\u116e\u11b0', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 3, 4, 6], [1])]],
    ['\u116e\u11b1', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 3, 4, 6], [2, 6])]],
    ['\u116e\u11b2', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 3, 4, 6], [1, 2])]],
    ['\u116e\u11b3', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 3, 4, 6], [3])]],
    ['\u116e\u11b4', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 3, 4, 6], [2, 3, 6])]],
    ['\u116e\u11b5', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 3, 4, 6], [2, 5, 6])]],
    ['\u116e\u11b6', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 3, 4, 6], [3, 5, 6])]],
    ['\u1173\u11ab', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 1, 3, 5, 6)]],
    ['\u1173\u11ac', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 3, 5, 6], [1, 3])]],
    ['\u1173\u11ad', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 3, 5, 6], [3, 5, 6])]],
    ['\u1173\u11af', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 2, 3, 4, 6)]],
    ['\u1173\u11b0', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [2, 3, 4, 6], [1])]],
    ['\u1173\u11b1', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [2, 3, 4, 6], [2, 6])]],
    ['\u1173\u11b2', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [2, 3, 4, 6], [1, 2])]],
    ['\u1173\u11b3', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [2, 3, 4, 6], [3])]],
    ['\u1173\u11b4', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [2, 3, 4, 6], [2, 3, 6])]],
    ['\u1173\u11b5', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [2, 3, 4, 6], [2, 5, 6])]],
    ['\u1173\u11b6', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [2, 3, 4, 6], [3, 5, 6])]],
    ['\u1175\u11ab', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 1, 2, 3, 4, 5)]],
    ['\u1175\u11ac', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 3, 4, 5], [1, 3])]],
    ['\u1175\u11ad', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 3, 4, 5], [3, 5, 6])]],
    ['것'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [4, 5, 6], [2, 3, 4])]],
    ['껏'.normalize('NFD'), [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [6], [4, 5, 6], [2, 3, 4])]],
    //제5절: Vowel chain
    ['(?<=[\u1161-\u11a7])\u110b\u1168', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [3, 6], [3, 4])]],
    ['(?<=[\u1163\u116a\u116e\u116f])\u110b\u1162', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [3, 6], [1, 2, 3, 5])]],
    /* End of the special cases */
    //제1절
    ['\u1100', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 4)]],
    ['\u1101', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [6], [4])]],
    ['\u1102', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 1, 4)]],
    ['\u1103', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 2, 4)]],
    ['\u1104', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [6], [2, 4])]],
    ['\u1105', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 5)]],
    ['\u1106', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 1, 5)]],
    ['\u1107', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 4, 5)]],
    ['\u1108', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [6], [4, 5])]],
    ['\u1109', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 6)]],
    ['\u110a', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [6], [6])]],
    ['\u110b', ["",
            __classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 1, 2, 4, 5)]],
    ['\u110c', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 4, 6)]],
    ['\u110d', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [6], [4, 6])]],
    ['\u110e', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 5, 6)]],
    ['\u110f', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 1, 2, 4)]],
    ['\u1110', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 1, 2, 5)]],
    ['\u1111', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 1, 4, 5)]],
    ['\u1112', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 2, 4, 5)]],
    //제3절
    ['\u1161', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 1, 2, 6)]],
    ['\u1162', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 1, 2, 3, 5)]],
    ['\u1163', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 3, 4, 5)]],
    ['\u1164', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [3, 4, 5], [1, 2, 3, 5])]],
    ['\u1165', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 2, 3, 4)]],
    ['\u1166', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 1, 3, 4, 5)]],
    ['\u1167', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 1, 5, 6)]],
    ['\u1168', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 3, 4)]],
    ['\u1169', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 1, 3, 6)]],
    ['\u116a', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 1, 2, 3, 6)]],
    ['\u116b', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 3, 6], [1, 2, 3, 5])]],
    ['\u116c', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 1, 3, 4, 5, 6)]],
    ['\u116d', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 3, 4, 6)]],
    ['\u116e', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 1, 3, 4)]],
    ['\u116f', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 1, 2, 3, 4)]],
    ['\u1170', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 3, 4], [1, 2, 3, 5])]],
    ['\u1171', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 3, 4], [1, 2, 3, 5])]],
    ['\u1172', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 1, 4, 6)]],
    ['\u1173', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 2, 4, 6)]],
    ['\u1174', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 2, 4, 5, 6)]],
    ['\u1175', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 1, 3, 5)]],
    //제2절
    ['\u11a8', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 1)]],
    ['\u11a9', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1], [1])]],
    ['\u11aa', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1], [3])]],
    ['\u11ab', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 2, 5)]],
    ['\u11ac', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [2, 5], [1, 3])]],
    ['\u11ad', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [2, 5], [3, 5, 6])]],
    ['\u11ae', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 3, 5)]],
    ['\u11af', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 2)]],
    ['\u11b0', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [2], [1])]],
    ['\u11b1', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [2], [2, 6])]],
    ['\u11b2', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [2], [1, 2])]],
    ['\u11b3', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [2], [3])]],
    ['\u11b4', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [2], [2, 3, 6])]],
    ['\u11b5', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [2], [2, 5, 6])]],
    ['\u11b6', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [2], [3, 5, 6])]],
    ['\u11b7', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 2, 6)]],
    ['\u11b8', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 1, 2)]],
    ['\u11b9', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2], [3])]],
    ['\u11ba', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 3)]],
    ['\u11bb', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 3, 4)]],
    ['\u11bc', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 2, 3, 5, 6),
            __classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [5], [2, 3, 5, 6])]],
    ['\u11bd', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 1, 3)]],
    ['\u11be', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 2, 3)]],
    ['\u11bf', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 2, 3, 5)]],
    ['\u11c0', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 2, 3, 6)]],
    ['\u11c1', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 2, 5, 6)]],
    ['\u11c2', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a, 3, 5, 6)]],
    //제4절: Singular
    ////Assuming remaining Hangul Compatibility Jamo as the choseong (L)
    ////TODO: L-HJF, HCF-V, HCF-HJF-T (These are special cases)
    ['\u3131', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 3, 4, 5, 6], [4])]],
    ['\u3134', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 3, 4, 5, 6], [1, 4])]],
    ['\u3137', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 3, 4, 5, 6], [2, 4])]],
    ['\u3139', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 3, 4, 5, 6], [5])]],
    ['\u3141', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 3, 4, 5, 6], [1, 5])]],
    ['\u3142', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 3, 4, 5, 6], [4, 5])]],
    ['\u3145', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 3, 4, 5, 6], [6])]],
    ['\u3147', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 3, 4, 5, 6], [1, 2, 4, 5])]],
    ['\u3148', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 3, 4, 5, 6], [4, 6])]],
    ['\u314a', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 3, 4, 5, 6], [5, 6])]],
    ['\u314b', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 3, 4, 5, 6], [1, 2, 4])]],
    ['\u314c', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 3, 4, 5, 6], [1, 2, 5])]],
    ['\u314d', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 3, 4, 5, 6], [1, 4, 5])]],
    ['\u314e', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 3, 4, 5, 6], [2, 4, 5])]],
    ['\u314f', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 3, 4, 5, 6], [1, 2, 6])]],
    ['\u3151', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 3, 4, 5, 6], [3, 4, 5])]],
    ['\u3153', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 3, 4, 5, 6], [2, 3, 4])]],
    ['\u3155', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 3, 4, 5, 6], [1, 5, 6])]],
    ['\u3157', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 3, 4, 5, 6], [1, 3, 6])]],
    ['\u315b', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 3, 4, 5, 6], [3, 4, 6])]],
    ['\u315c', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 3, 4, 5, 6], [1, 3, 4])]],
    ['\u3160', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 3, 4, 5, 6], [1, 4, 6])]],
    ['\u3161', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 3, 4, 5, 6], [2, 4, 6])]],
    ['\u3163', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 3, 4, 5, 6], [1, 3, 5]),
            __classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [4, 5, 6], [1, 3, 5])]],
    //제8절
    ////Todo: 제23항
    ////제19항
    ['\u1140', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [5], [4, 6])]],
    ['\u11eb', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [5], [1, 3])]],
    ['\u114c', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [5], [1, 4, 5])]],
    ['\u11f0', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [5], [2, 5, 6])]],
    ['\u1159', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [5], [2, 4, 5])]],
    ['\u11f9', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [5], [3, 5, 6])]],
    ['\u317f', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 3, 4, 5, 6], [5], [4, 6])]],
    ['\u3181', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 3, 4, 5, 6], [5], [1, 4, 5])]],
    ['\u3186', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 3, 4, 5, 6], [5], [2, 4, 5])]],
    ////제20항
    ['\u111d', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [5], [1, 5], [2, 3, 5, 6])]],
    ['\u11e2', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [5], [2, 6], [2, 3, 5, 6])]],
    ['\u112b', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [5], [4, 5], [2, 3, 5, 6])]],
    ['\u11e6', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [5], [1, 2], [2, 3, 5, 6])]],
    ['\u112c', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [5], [6], [4, 5], [2, 3, 5, 6])]],
    ['\u1157', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [5], [1, 4, 5], [2, 3, 5, 6])]],
    ['\u111b', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [5], [5], [2, 3, 5, 6])]],
    ////제21항
    ['\u1114', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [5], [1, 4], [1, 4])]],
    ['\u1147', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [5], [1, 2, 4, 5], [1, 2, 4, 5])]],
    ['\u1158', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [5], [2, 4, 5], [2, 4, 5])]],
    ////제22항
    ['\u111e', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [5], [4, 5], [4])]],
    ['\u1120', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [5], [4, 5], [2, 4])]],
    ['\u1121', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [5], [4, 5], [6])]],
    ['\u1122', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [5], [4, 5], [6], [4])]],
    ['\u1123', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [5], [4, 5], [6], [2, 4])]],
    ['\u1127', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [5], [4, 5], [4, 6])]],
    ['\u1129', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [5], [4, 5], [1, 2, 5])]],
    ['\u112d', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [5], [6], [4])]],
    ['\u112e', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [5], [6], [1, 4])]],
    ['\u112f', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [5], [6], [2, 4])]],
    ['\u1132', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [5], [6], [4, 5])]],
    ['\u1136', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [5], [6], [4, 6])]],
    ['\u11c7', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [2, 5], [3])]],
    ['\u11c8', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [2, 5], [5], [1, 3])]],
    ['\u11d9', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [2], [5], [3, 5, 6])]],
    ['\u11da', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [2, 6], [1])]],
    ['\u11dd', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [2, 6], [3])]],
    ['\u11df', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [2, 6], [5], [1, 3])]],
    //제9절
    ////제25항
    ['\u119e', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [5], [3, 4, 5, 6])]],
    ['\u11a1', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [5], [3, 4, 5, 6], [1, 2, 3, 5])]],
    ['\u318d', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 3, 4, 5, 6], [5], [3, 4, 5, 6])]],
    ['\u318e', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [1, 2, 3, 4, 5, 6], [5], [3, 4, 5, 6], [1, 2, 3, 5])]],
    ////제26항
    ['\u1188', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [4, 5, 6], [3, 4, 6], [1, 3, 5])]],
    ['\u1184', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [4, 5, 6], [3, 4, 6], [3, 4, 5])]],
    ['\u1185', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [4, 5, 6], [3, 4, 6], [3, 4, 5], [1, 2, 3, 5])]],
    ['\u1194', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [4, 5, 6], [1, 4, 6], [1, 3, 5])]],
    ['\u1191', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [4, 5, 6], [1, 4, 6], [1, 5, 6])]],
    ['\u1192', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [4, 5, 6], [1, 4, 6], [3, 4])]],
    ////제28항; TODO: This needs to go *before* the syllable, unlike UCS hangul
    ['\u302e', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [4, 5, 6], [2])]],
    ['\u302f', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_BraiToUCS).call(_a, [4, 5, 6], [1, 3])]],
    //misc.
    ['\\s', [__classPrivateFieldGet(_a, _a, "m", _HanBraille_DotsToUni).call(_a)]],
    ['[^\u2800-\u28ff]', [""]], //unsupported
]);
