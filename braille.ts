export interface Rule {
    symbol: string;
    braille: string;
    before?: RegExp;
    after?: RegExp;
    condition?: boolean;
};
export class Braille {
    constructor() {
    }
    static stdaln_prec: RegExp = new RegExp(/^|\s|\p{Pd}|\p{Ps}|\p{Pi}/gu);
    static stdaln_foll: RegExp = new RegExp(/\s|\p{Pd}|[,;:.!?]|\p{Pe}|\p{Pf}|$/gu);
    static stdaln_foll_shfm: RegExp = new RegExp(/(('|’)?s)?(\s|\p{Pd}|[,;:.!?]|\p{Pe}|\p{Pf}|$)/gu);
    static regex_nonvowel: RegExp = new RegExp(/[^AEIOUYaeiouy]/gu);
    static regex_latin: RegExp = new RegExp(/[A-Za-z]/gu);
    UnifiedBrl(input: string, width: number = 0): string {
        let d: string = input.normalize('NFD'); //detaching diacritics
        d = d.replace(/[0-9][0-9.,]*/gu, Braille.DotsToUni(3,4,5,6) + '$&'); //Numeric mode
        d = d.replace(/(?<=[0-9])[a-j.,]/giu, Braille.DotsToUni(5,6) + '$&'); //Force grade 1 mode after numeric
        d = d.replace(/(?<=\s|^)[bcdf-hj-np-tv-z?](?=[\s.]|$)/giu, Braille.DotsToUni(5,6) + '$&'); //grade 1 mode for isolated
        d = d.replace(/([\u00e6\u0153])(\p{Mn})+/giu, '$2' + Braille.DotsToUni(1,2,6) + '$1' + Braille.DotsToUni(3,4,5)); //digraphs with modifier are surrounded
        d = d.replace(/(\p{Lu}|\p{Ll})(\p{Mn})+/gu, '$2$1'); //Non-spacing modifier precedes
        d = d.replace(/\p{Lu}[^\p{Ll}\s]+( [^\p{Ll}\s]+){2,}/gu, Braille.BraiToUCS([6],[6],[6]) + '$&'); //Capitalised passage
        d = d.replace(/(?<!\u2820\u2820\u2820[^\u2804]*)\p{Lu}{2,}/gu, Braille.BraiToUCS([6],[6]) + '$&'); //Capitalised word
        d = d.replace(/\u2820\u2820\u2820\p{Lu}[^\p{Ll}\s]+( [^\p{Ll}\s]+){2,}/gu, '$&' + Braille.BraiToUCS([6],[3])); //Capitals terminator
        d = d.replace(/(^|[^\u2820])\u2820\u2820\p{Lu}{2,}(?=[^\p{Lu}])/gu, '$&' + Braille.BraiToUCS([6],[3])); //Capitals terminator
        d = d.replace(/(?<!\u2820\u2820[^\u2804]*)\p{Lu}(?![^\u2820]*\u2820\u2804)/gu, Braille.DotsToUni(6) + '$&'); //Single Capital
        for (let r of this.UEB()) {
            var rule: RegExp = new RegExp('(?<=' + (r.before?.source || '') + ')' + r.symbol + '(?=' + (r.after?.source || '') + ')', 'giu');
            if (rule.test(d)) {
                d = d.replace(rule, r.braille);
            }
        }
        return d;
    }
    static BraiToUCS(...lists: number[][]): string {
        let o: string = ""
        for (let i of lists) {
            o += Braille.DotsToUni(...i);
        }
        return o;
    }
    static DotsToUni(...dots: number[]): string {
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
    static BraiToASCII(...lists: number[][]): string {
        let o: string = ""
        for (let i of lists) {
            [...Braille.DotsToUni(...i)].forEach((e) => {
                o += new Braille().Ascii.get(e);
            });
        }
        return o;
    }
    BraiUCSToASCII(i: string): string {
        let o: string = ""
        for (let j of [...i]) {
            o += new Braille().Ascii.get(j);
        }
        return o;
    }
    UEB(): Rule[] {return [
        //condition is rather complex, how to compromise
        //Alphabetic wordsigns
        {symbol: 'but', braille: Braille.DotsToUni(1,2), before: Braille.stdaln_prec, after: Braille.stdaln_foll},
        {symbol: 'can', braille: Braille.DotsToUni(1,4), before: Braille.stdaln_prec, after: Braille.stdaln_foll},
        {symbol: 'do', braille: Braille.DotsToUni(1,4,5), before: Braille.stdaln_prec, after: Braille.stdaln_foll},
        {symbol: 'every', braille: Braille.DotsToUni(1,5), before: Braille.stdaln_prec, after: Braille.stdaln_foll},
        {symbol: 'from', braille: Braille.DotsToUni(1,2,4), before: Braille.stdaln_prec, after: Braille.stdaln_foll},
        {symbol: 'go', braille: Braille.DotsToUni(1,2,4,5), before: Braille.stdaln_prec, after: Braille.stdaln_foll},
        {symbol: 'have', braille: Braille.DotsToUni(1,2,5), before: Braille.stdaln_prec, after: Braille.stdaln_foll},
        {symbol: 'just', braille: Braille.DotsToUni(2,4,5), before: Braille.stdaln_prec, after: Braille.stdaln_foll},
        {symbol: 'knowledge', braille: Braille.DotsToUni(1,3), before: Braille.stdaln_prec, after: Braille.stdaln_foll},
        {symbol: 'like', braille: Braille.DotsToUni(1,2,3), before: Braille.stdaln_prec, after: Braille.stdaln_foll},
        {symbol: 'more', braille: Braille.DotsToUni(1,3,4), before: Braille.stdaln_prec, after: Braille.stdaln_foll},
        {symbol: 'not', braille: Braille.DotsToUni(1,3,4,5), before: Braille.stdaln_prec, after: Braille.stdaln_foll},
        {symbol: 'people', braille: Braille.DotsToUni(1,2,3,4), before: Braille.stdaln_prec, after: Braille.stdaln_foll},
        {symbol: 'quite', braille: Braille.DotsToUni(1,2,3,4,5), before: Braille.stdaln_prec, after: Braille.stdaln_foll},
        {symbol: 'rather', braille: Braille.DotsToUni(1,2,3,5), before: Braille.stdaln_prec, after: Braille.stdaln_foll},
        {symbol: 'so', braille: Braille.DotsToUni(2,3,4), before: Braille.stdaln_prec, after: Braille.stdaln_foll},
        {symbol: 'that', braille: Braille.DotsToUni(2,3,4,5), before: Braille.stdaln_prec, after: Braille.stdaln_foll},
        {symbol: 'us', braille: Braille.DotsToUni(1,3,6), before: Braille.stdaln_prec, after: Braille.stdaln_foll},
        {symbol: 'very', braille: Braille.DotsToUni(1,2,3,6), before: Braille.stdaln_prec, after: Braille.stdaln_foll},
        {symbol: 'will', braille: Braille.DotsToUni(2,4,5,6), before: Braille.stdaln_prec, after: Braille.stdaln_foll},
        {symbol: 'it', braille: Braille.DotsToUni(1,3,4,6), before: Braille.stdaln_prec, after: Braille.stdaln_foll},
        {symbol: 'you', braille: Braille.DotsToUni(1,3,4,5,6), before: Braille.stdaln_prec, after: Braille.stdaln_foll},
        {symbol: 'as', braille: Braille.DotsToUni(1,3,5,6), before: Braille.stdaln_prec, after: Braille.stdaln_foll},
        //Strong wordsigns
        {symbol: 'child', braille: Braille.DotsToUni(1,6), before: Braille.stdaln_prec, after: Braille.stdaln_foll},
        {symbol: 'shall', braille: Braille.DotsToUni(1,4,6), before: Braille.stdaln_prec, after: Braille.stdaln_foll},
        {symbol: 'this', braille: Braille.DotsToUni(1,4,5,6), before: Braille.stdaln_prec, after: Braille.stdaln_foll},
        {symbol: 'which', braille: Braille.DotsToUni(1,5,6), before: Braille.stdaln_prec, after: Braille.stdaln_foll},
        {symbol: 'out', braille: Braille.DotsToUni(1,2,5,6), before: Braille.stdaln_prec, after: Braille.stdaln_foll},
        {symbol: 'still', braille: Braille.DotsToUni(3,4), before: Braille.stdaln_prec, after: Braille.stdaln_foll},
        //Shortforms
        {symbol: 'about', braille: Braille.BraiToUCS([1],[1,2]), before: Braille.stdaln_prec, after: Braille.stdaln_foll},
            {symbol: 'about', braille: Braille.BraiToUCS([1],[1,2]), before: Braille.stdaln_prec, after: /fac(e(d|r)?|ing)/gu},
            {symbol: 'about', braille: Braille.BraiToUCS([1],[1,2]), before: Braille.stdaln_prec, after: /turn(ed)?/gu},
            {symbol: 'about', braille: Braille.BraiToUCS([1],[1,2]), before: /east|gad|here|knock|lay|north/gu, after: Braille.stdaln_foll_shfm},
            {symbol: 'about', braille: Braille.BraiToUCS([1],[1,2]), before: /right|round|roust|run|south/gu, after: Braille.stdaln_foll_shfm},
            {symbol: 'about', braille: Braille.BraiToUCS([1],[1,2]), before: /stir|there|turn|walk|west|where/gu, after: Braille.stdaln_foll_shfm},
        {symbol: 'above', braille: Braille.BraiToUCS([1],[1,2],[1,2,3,6]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
            {symbol: 'above', braille: Braille.BraiToUCS([1],[1,2],[1,2,3,6]), before: Braille.stdaln_prec, after: /board|ground|mentioned/gu},
            {symbol: 'above', braille: Braille.BraiToUCS([1],[1,2],[1,2,3,6]), before: /herein/gu, after: Braille.stdaln_foll_shfm},
        {symbol: 'according', braille: Braille.BraiToUCS([1],[1,4]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
            {symbol: 'according', braille: Braille.BraiToUCS([1],[1,4]), before: Braille.stdaln_prec, after: /ly/gu},
            {symbol: 'according', braille: Braille.BraiToUCS([1],[1,4]), before: /un/, after: Braille.stdaln_foll_shfm},
            {symbol: 'according', braille: Braille.BraiToUCS([1],[1,4]), before: /un/gu, after: /ly/gu},
        {symbol: 'across', braille: Braille.BraiToUCS([1],[1,4],[1,2,3,5]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
            {symbol: 'across', braille: Braille.BraiToUCS([1],[1,4],[1,2,3,5]), before: /read/gu, after: Braille.stdaln_foll_shfm},
        {symbol: 'after', braille: Braille.BraiToUCS([1],[1,2,4]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
            {symbol: 'after', braille: Braille.BraiToUCS([1],[1,2,4]), before: Braille.stdaln_prec, after: /b(attle|irth|reakfast|urn(e(d|r)|ing)?)/gu},
            {symbol: 'after', braille: Braille.BraiToUCS([1],[1,2,4]), before: Braille.stdaln_prec, after: /c(are|lap|offee)|d(amp|ark|eck|inner)/gu},
            {symbol: 'after', braille: Braille.BraiToUCS([1],[1,2,4]), before: Braille.stdaln_prec, after: /flow|g(ame|low|uard)|h(atch(es)?|our)/gu},
            {symbol: 'after', braille: Braille.BraiToUCS([1],[1,2,4]), before: Braille.stdaln_prec, after: /l(i(fe|ght|ves)|unch(es)?)/gu},
            {symbol: 'after', braille: Braille.BraiToUCS([1],[1,2,4]), before: Braille.stdaln_prec, after: /m(arket|atch(es)?|ath|eeting|id(day|night)|ost)/gu},
            {symbol: 'after', braille: Braille.BraiToUCS([1],[1,2,4]), before: Braille.stdaln_prec, after: /p(ain|art(ies|y)|iece|lay)/gu},
            {symbol: 'after', braille: Braille.BraiToUCS([1],[1,2,4]), before: Braille.stdaln_prec, after: /s(ale|chool|ensation|h(ave|ock|ow(er)?)|upper)/gu},
            {symbol: 'after', braille: Braille.BraiToUCS([1],[1,2,4]), before: Braille.stdaln_prec, after: /t(aste|ax(es)?|ea|h(eatre|ought)|ime|reatment)/gu},
            {symbol: 'after', braille: Braille.BraiToUCS([1],[1,2,4]), before: Braille.stdaln_prec, after: /wor(l?d|k)/gu},
            {symbol: 'after', braille: Braille.BraiToUCS([1],[1,2,4]), before: /(t|w)?here(in)?|morning/gu, after: Braille.stdaln_foll_shfm},
        {symbol: 'afternoon', braille: Braille.BraiToUCS([1],[1,2,4],[1,3,4,5]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
            {symbol: 'afternoon', braille: Braille.BraiToUCS([1],[1,2,4],[1,3,4,5]), before: Braille.stdaln_prec, after: /tea/gu},
            {symbol: 'afternoon', braille: Braille.BraiToUCS([1],[1,2,4],[1,3,4,5]), before:/good|mid/gu, after: Braille.stdaln_foll_shfm},
        {symbol: 'afterward', braille: Braille.BraiToUCS([1],[1,2,4],[2,4,5,6]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
        {symbol: 'again', braille: Braille.BraiToUCS([1],[1,2,4,5]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
            {symbol: 'again', braille: Braille.BraiToUCS([1],[1,2,4,5]), before: /(t|w)?here(in)?/gu, after: Braille.stdaln_foll_shfm},
        {symbol: 'against', braille: Braille.BraiToUCS([1],[1,2,4,5],[3,4]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
            {symbol: 'against', braille: Braille.BraiToUCS([1],[1,2,4,5],[3,4]), before: /(t|w)?here/gu, after: Braille.stdaln_foll_shfm},
        {symbol: 'also', braille: Braille.BraiToUCS([1],[1,2,3]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
        {symbol: 'almost', braille: Braille.BraiToUCS([1],[1,2,3],[1,3,4]), before: Braille.stdaln_prec, after: Braille.stdaln_foll},
        {symbol: 'already', braille: Braille.BraiToUCS([1],[1,2,3],[1,2,3,5]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
        {symbol: 'altogether', braille: Braille.BraiToUCS([1],[1,2,3],[2,3,4,5]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
        {symbol: 'although', braille: Braille.BraiToUCS([1],[1,2,3],[1,4,5,6]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
        {symbol: 'always', braille: Braille.BraiToUCS([1],[1,2,3],[2,4,5,6]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
        {symbol: 'blind', braille: Braille.BraiToUCS([1,2],[1,2,3]), before: Braille.stdaln_prec, after: Braille.regex_nonvowel},
            {symbol: 'blind', braille: Braille.BraiToUCS([1,2],[1,2,3]), before: /colou?r|deaf|pur|snow|un/gu, after: Braille.regex_nonvowel},
        {symbol: 'braille', braille: Braille.BraiToUCS([1,2],[1,2,3,5],[1,2,3])},
        {symbol: 'could', braille: Braille.BraiToUCS([1,4],[1,4,5]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
            {symbol: 'could', braille: Braille.BraiToUCS([1,4],[1,4,5]), before: Braille.stdaln_prec, after: /('|’)ve|a|e?st|n('|’)t(('|’)ve)?/gu},
        {symbol: 'declare', braille: Braille.BraiToUCS([1,4,5],[1,4],[1,2,3]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
            {symbol: 'declare', braille: Braille.BraiToUCS([1,4,5],[1,4],[1,2,3]), before: Braille.stdaln_prec, after: /d|r/ug},
            {symbol: 'declare', braille: Braille.BraiToUCS([1,4,5],[1,4],[1,2,3]), before: /un/gu, after: Braille.stdaln_foll_shfm},
            {symbol: 'declare', braille: Braille.BraiToUCS([1,4,5],[1,4],[1,2,3]), before: /un/gu, after: /d/gu},
        {symbol: 'declaring', braille: Braille.BraiToUCS([1,4,5],[1,4],[1,2,3],[1,2,4,5]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
        {symbol: 'deceive', braille: Braille.BraiToUCS([1,4,5],[1,4],[1,2,3,6]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
            {symbol: 'deceive', braille: Braille.BraiToUCS([1,4,5],[1,4],[1,2,3,6]), before: Braille.stdaln_prec, after: /d|r/gu},
            {symbol: 'deceive', braille: Braille.BraiToUCS([1,4,5],[1,4],[1,2,3,6]), before: /arch/gu, after: /r/gu},
            {symbol: 'deceive', braille: Braille.BraiToUCS([1,4,5],[1,4],[1,2,3,6]), before: /un/gu, after: Braille.stdaln_foll_shfm},
            {symbol: 'deceive', braille: Braille.BraiToUCS([1,4,5],[1,4],[1,2,3,6]), before: /un/gu, after: /d|r/gu},
        {symbol: 'deceiving', braille: Braille.BraiToUCS([1,4,5],[1,4],[1,2,3,6],[1,2,4,5]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
            {symbol: 'deceiving', braille: Braille.BraiToUCS([1,4,5],[1,4],[1,2,3,6],[1,2,4,5]), before: /un/gu, after: Braille.stdaln_foll_shfm},
        {symbol: 'either', braille: Braille.BraiToUCS([1,5],[2,4]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
        {symbol: 'friend', braille: Braille.BraiToUCS([1,2,4],[1,2,3,5]), before: Braille.stdaln_prec, after: Braille.regex_nonvowel},
            {symbol: 'friend', braille: Braille.BraiToUCS([1,2,4],[1,2,3,5]), before: /be|boy|de|g(al|entleman|irl|uy)/gu, after: Braille.regex_nonvowel},
            {symbol: 'friend', braille: Braille.BraiToUCS([1,2,4],[1,2,3,5]), before: /lady|(wo)?man|pen|school|un/gu, after: Braille.regex_nonvowel},
            {symbol: 'friend', braille: Braille.BraiToUCS([1,2,4],[1,2,3,5]), before: /(wo)?men/gu, after: /s/gu},
        {symbol: 'first', braille: Braille.BraiToUCS([1,2,4],[3,4]), before: Braille.stdaln_prec, after: Braille.regex_nonvowel},
            {symbol: 'first', braille: Braille.BraiToUCS([1,2,4],[3,4]), before: Braille.stdaln_prec, after: /aid(er)?/gu},
            {symbol: 'first', braille: Braille.BraiToUCS([1,2,4],[3,4]), before: /feet|head|tail/gu, after: Braille.regex_nonvowel},
        {symbol: 'good', braille: Braille.BraiToUCS([1,2,4,5],[1,4,5]), before: Braille.stdaln_prec, after: Braille.regex_nonvowel},
            {symbol: 'good', braille: Braille.BraiToUCS([1,2,4,5],[1,4,5]), before: Braille.stdaln_prec, after: /afternoon|e(r|st|vening)|i(e|sh)|y(|ear)/gu},
            {symbol: 'good', braille: Braille.BraiToUCS([1,2,4,5],[1,4,5]), before: /feel|scatter|super/, after: Braille.regex_nonvowel},
        {symbol: 'great', braille: Braille.BraiToUCS([1,2,4,5],[1,2,3,5],[2,3,4,5])},
        {symbol: 'him', braille: Braille.BraiToUCS([1,2,5],[1,3,4]), before: Braille.stdaln_prec, after: Braille.stdaln_foll},
            {symbol: 'him', braille: Braille.BraiToUCS([1,2,5],[1,3,4]), before: Braille.stdaln_prec, after: /bo(es)?/gu},
        {symbol: 'himself', braille: Braille.BraiToUCS([1,2,5],[1,3,4],[1,2,4]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
        {symbol: 'herself', braille: Braille.BraiToUCS([1,2,5],[1,2,4,5,6],[1,2,4]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
        {symbol: 'immediate', braille: Braille.BraiToUCS([2,4],[1,3,4],[1,3,4]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
            {symbol: 'immediate', braille: Braille.BraiToUCS([2,4],[1,3,4],[1,3,4]), before: Braille.stdaln_prec, after: /ly|ness/gu},
        {symbol: 'little', braille: Braille.BraiToUCS([1,2,3],[1,2,3]), before: Braille.stdaln_prec, after: Braille.regex_nonvowel},
            {symbol: 'little', braille: Braille.BraiToUCS([1,2,3],[1,2,3]), before: /be/gu, after: Braille.regex_nonvowel},
        {symbol: 'letter', braille: Braille.BraiToUCS([1,2,3],[1,2,3,5]), before: Braille.stdaln_prec, after: Braille.regex_nonvowel},
            {symbol: 'letter', braille: Braille.BraiToUCS([1,2,3],[1,2,3,5]), before: Braille.stdaln_prec, after: /e(d|r)|ing|opener/gu},
            {symbol: 'letter', braille: Braille.BraiToUCS([1,2,3],[1,2,3,5]), before: /blood|chain|hate|love|news|re/gu, after: Braille.regex_nonvowel},
            {symbol: 'letter', braille: Braille.BraiToUCS([1,2,3],[1,2,3,5]), before: /re/gu, after: /ed|ing/gu},
            {symbol: 'letter', braille: Braille.BraiToUCS([1,2,3],[1,2,3,5]), before: /un/gu, after: /ed/gu},
        {symbol: 'myself', braille: Braille.BraiToUCS([1,3,4],[1,3,4,5,6],[1,2,4]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
        {symbol: 'much', braille: Braille.BraiToUCS([1,3,4],[1,6]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
            {symbol: 'much', braille: Braille.BraiToUCS([1,3,4],[1,6]), before: Braille.stdaln_prec, after: /ly|ness/gu},
            {symbol: 'much', braille: Braille.BraiToUCS([1,3,4],[1,6]), before: /foras|in(as|so)|over/gu, after: Braille.stdaln_foll_shfm},
        {symbol: 'must', braille: Braille.BraiToUCS([1,3,4],[3,4]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
            {symbol: 'must', braille: Braille.BraiToUCS([1,3,4],[3,4]), before: Braille.stdaln_prec, after: /('|’)ve|a(rd)?|i(e(r|st)|ly|ness)|n('|’)t(('|’)ve)?|y/gu},
        {symbol: 'necessary', braille: Braille.BraiToUCS([1,3,4,5],[1,5],[1,4]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
            {symbol: 'necessary', braille: Braille.BraiToUCS([1,3,4,5],[1,5],[1,4]), before: /un/gu, after: Braille.stdaln_foll_shfm},
        {symbol: 'neither', braille: Braille.BraiToUCS([1,3,4,5],[1,5],[2,4]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
        {symbol: 'paid', braille: Braille.BraiToUCS([1,2,3,4],[1,4,5]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
            {symbol: 'paid', braille: Braille.BraiToUCS([1,2,3,4],[1,4,5]), before: /(high|low|poor)ly|(i|we)ll|over|post|p?re|un(der)?/gu, after: Braille.stdaln_foll_shfm},
        {symbol: 'perceive', braille: Braille.BraiToUCS([1,2,3,4],[1,2,4,5,6],[1,2],[1,2,3,6]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
            {symbol: 'perceive', braille: Braille.BraiToUCS([1,2,3,4],[1,2,4,5,6],[1,2],[1,2,3,6]), before: Braille.stdaln_prec, after: /d|r/gu},
            {symbol: 'perceive', braille: Braille.BraiToUCS([1,2,3,4],[1,2,4,5,6],[1,2],[1,2,3,6]), before: /ap|mis|un/gu, after: Braille.stdaln_foll_shfm},
            {symbol: 'perceive', braille: Braille.BraiToUCS([1,2,3,4],[1,2,4,5,6],[1,2],[1,2,3,6]), before: /ap|mis/gu, after: /d|r/gu},
            {symbol: 'perceive', braille: Braille.BraiToUCS([1,2,3,4],[1,2,4,5,6],[1,2],[1,2,3,6]), before: /un/gu, after: /d/gu},
        {symbol: 'perceiving', braille: Braille.BraiToUCS([1,2,3,4],[1,2,4,5,6],[1,2],[1,2,3,6],[1,2,4,5]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
            {symbol: 'perceiving', braille: Braille.BraiToUCS([1,2,3,4],[1,2,4,5,6],[1,2],[1,2,3,6],[1,2,4,5]), before: /ap|mis|un/gu, after: Braille.stdaln_foll_shfm},
        {symbol: 'perhaps', braille: Braille.BraiToUCS([1,2,3,4],[1,2,4,5,6],[1,2,5]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
            {symbol: 'perhaps', braille: Braille.BraiToUCS([1,2,3,4],[1,2,4,5,6],[1,2,5]), before: Braille.stdaln_prec, after: /es/gu},
        {symbol: 'quick', braille: Braille.BraiToUCS([1,2,3,4,5],[1,3]), before: Braille.stdaln_prec, after: Braille.regex_nonvowel},
            {symbol: 'quick', braille: Braille.BraiToUCS([1,2,3,4,5],[1,3]), before: Braille.stdaln_prec, after: /e(n(ed|er|ing)?|r|st)|i(e|sh(ly)?)|y/gu},
            {symbol: 'quick', braille: Braille.BraiToUCS([1,2,3,4,5],[1,3]), before: /double|super|un/gu, after: Braille.regex_nonvowel},
        {symbol: 'receive', braille: Braille.BraiToUCS([1,2,3,5],[1,4],[1,2,3,6]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
            {symbol: 'receive', braille: Braille.BraiToUCS([1,2,3,5],[1,4],[1,2,3,6]), before: Braille.stdaln_prec, after: /d|r(ship)?/gu},
            {symbol: 'receive', braille: Braille.BraiToUCS([1,2,3,5],[1,4],[1,2,3,6]), before: /p/gu, after: Braille.stdaln_foll_shfm},
            {symbol: 'receive', braille: Braille.BraiToUCS([1,2,3,5],[1,4],[1,2,3,6]), before: /p/gu, after: /r/gu},
            {symbol: 'receive', braille: Braille.BraiToUCS([1,2,3,5],[1,4],[1,2,3,6]), before: /un/gu, after: /d/gu},
        {symbol: 'receiving', braille: Braille.BraiToUCS([1,2,3,5],[1,4],[1,2,3,6],[1,2,4,5]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
            {symbol: 'receiving', braille: Braille.BraiToUCS([1,2,3,5],[1,4],[1,2,3,6],[1,2,4,5]), before: /p/gu, after: Braille.stdaln_foll_shfm},
        {symbol: 'rejoice', braille: Braille.BraiToUCS([1,2,3,5],[2,4,5],[1,2]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
            {symbol: 'rejoice', braille: Braille.BraiToUCS([1,2,3,5],[2,4,5],[1,2]), before: Braille.stdaln_prec, after: /d|ful(ly|ness)?|r/gu},
            {symbol: 'rejoice', braille: Braille.BraiToUCS([1,2,3,5],[2,4,5],[1,2]), before: /un/gu, after: Braille.stdaln_foll_shfm},
            {symbol: 'rejoice', braille: Braille.BraiToUCS([1,2,3,5],[2,4,5],[1,2]), before: /un/gu, after: /d|ful(ly|ness)?|r/gu},
        {symbol: 'rejoicing', braille: Braille.BraiToUCS([1,2,3,5],[2,4,5],[1,2],[1,2,4,5]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
            {symbol: 'rejoicing', braille: Braille.BraiToUCS([1,2,3,5],[2,4,5],[1,2],[1,2,4,5]), before: Braille.stdaln_prec, after: /ly/gu},
            {symbol: 'rejoicing', braille: Braille.BraiToUCS([1,2,3,5],[2,4,5],[1,2],[1,2,4,5]), before: /un/gu, after: Braille.stdaln_foll_shfm},
            {symbol: 'rejoicing', braille: Braille.BraiToUCS([1,2,3,5],[2,4,5],[1,2],[1,2,4,5]), before: /un/gu, after: /ly/gu},
        {symbol: 'said', braille: Braille.BraiToUCS([3,4,5],[1,4,5]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
            {symbol: 'said', braille: Braille.BraiToUCS([3,4,5],[1,4,5]), before: Braille.stdaln_prec, after: /e?st/gu},
            {symbol: 'said', braille: Braille.BraiToUCS([3,4,5],[1,4,5]), before: /a?fore|gain|mis/gu, after: Braille.stdaln_foll_shfm},
        {symbol: 'such', braille: Braille.BraiToUCS([3,4,5],[1,6]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
            {symbol: 'such', braille: Braille.BraiToUCS([3,4,5],[1,6]), before: Braille.stdaln_prec, after: /like/gu},
            {symbol: 'such', braille: Braille.BraiToUCS([3,4,5],[1,6]), before: /none?|some/gu, after: Braille.stdaln_foll_shfm},
        {symbol: 'today', braille: Braille.BraiToUCS([2,3,4,5],[1,4,5]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
        {symbol: 'together', braille: Braille.BraiToUCS([2,3,4,5],[1,2,4,5],[1,2,3,5]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
            {symbol: 'together', braille: Braille.BraiToUCS([2,3,4,5],[1,2,4,5],[1,2,3,5]), before: Braille.stdaln_prec, after: /ness/gu},
        {symbol: 'tomorrow', braille: Braille.BraiToUCS([2,3,4,5],[1,3,4]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
        {symbol: 'tonight', braille: Braille.BraiToUCS([2,3,4,5],[1,3,4,5]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
        {symbol: 'itself', braille: Braille.BraiToUCS([1,3,4,6],[1,2,4]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
        {symbol: 'its', braille: Braille.BraiToUCS([1,3,4,6],[2,3,4]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
        {symbol: 'your', braille: Braille.BraiToUCS([1,3,4,5,6],[1,2,3,5]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
        {symbol: 'yourself', braille: Braille.BraiToUCS([1,3,4,5,6],[1,2,3,5],[1,2,4]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
            {symbol: 'yourself', braille: Braille.BraiToUCS([1,3,4,5,6],[1,2,3,5],[1,2,4]), before: /do-it-/gu, after: /er/gu},
        {symbol: 'yourselves', braille: Braille.BraiToUCS([1,3,4,5,6],[1,2,3,5],[1,2,3,6],[2,3,4]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
        {symbol: 'themselves', braille: Braille.BraiToUCS([2,3,4,6],[1,3,4],[1,2,3,6],[2,3,4]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
        {symbol: 'children', braille: Braille.BraiToUCS([1,6],[1,3,4,5]), after: Braille.regex_nonvowel},
        {symbol: 'should', braille: Braille.BraiToUCS([1,4,6],[1,4,5]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
            {symbol: 'should', braille: Braille.BraiToUCS([1,4,6],[1,4,5]), before: Braille.stdaln_prec, after: /('|’)ve|a|e?st|n('|’)t(('|’)ve)?/gu},
        {symbol: 'thyself', braille: Braille.BraiToUCS([1,4,5,6],[1,3,4,5,6],[1,2,4]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
        {symbol: 'ourselves', braille: Braille.BraiToUCS([1,2,5,6],[1,2,3,5],[1,2,3,6],[2,3,4]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
        {symbol: 'would', braille: Braille.BraiToUCS([2,4,5,6],[1,4,5]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
            {symbol: 'would', braille: Braille.BraiToUCS([2,4,5,6],[1,4,5]), before: Braille.stdaln_prec, after: /('|’)ve|a|e?st|n('|’)t(('|’)ve)?/gu},
            {symbol: 'would', braille: Braille.BraiToUCS([2,4,5,6],[1,4,5]), before: /('|’)t/gu, after: Braille.stdaln_foll_shfm},
            {symbol: 'would', braille: Braille.BraiToUCS([2,4,5,6],[1,4,5]), before: /('|’)t/gu, after: /('|’)ve|a|n('|’)t(('|’)ve)?/gu},
        {symbol: 'because', braille: Braille.BraiToUCS([2,3],[1,4]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
        {symbol: 'before', braille: Braille.BraiToUCS([2,3],[1,2,4]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
            {symbol: 'before', braille: Braille.BraiToUCS([2,3],[1,2,4]), before: Braille.stdaln_prec, after: /hand/gu},
        {symbol: 'behind', braille: Braille.BraiToUCS([2,3],[1,2,5]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
            {symbol: 'behind', braille: Braille.BraiToUCS([2,3],[1,2,5]), before: Braille.stdaln_prec, after: /hand/gu},
        {symbol: 'below', braille: Braille.BraiToUCS([2,3],[1,2,3]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
            {symbol: 'below', braille: Braille.BraiToUCS([2,3],[1,2,3]), before: Braille.stdaln_prec, after: /deck|ground|mentioned/gu},
        {symbol: 'beneath', braille: Braille.BraiToUCS([2,3],[1,3,4,5]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
            {symbol: 'beneath', braille: Braille.BraiToUCS([2,3],[1,3,4,5]), before: Braille.stdaln_prec, after: /deck|ground/},
        {symbol: 'beside', braille: Braille.BraiToUCS([2,3],[2,3,4]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
        {symbol: 'between', braille: Braille.BraiToUCS([2,3],[2,3,4,5]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
            {symbol: 'between', braille: Braille.BraiToUCS([2,3],[2,3,4,5]), before: Braille.stdaln_prec, after: /deck|time|while/gu},
        {symbol: 'beyond', braille: Braille.BraiToUCS([2,3],[1,3,4,5,6]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
        {symbol: 'conceive', braille: Braille.BraiToUCS([2,5],[1,4],[1,2,3,6]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
            {symbol: 'conceive', braille: Braille.BraiToUCS([2,5],[1,4],[1,2,3,6]), before: Braille.stdaln_prec, after: /d|r/gu},
        {symbol: 'conceiving', braille: Braille.BraiToUCS([2,5],[1,4],[1,2,3,6],[1,2,4,5]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
        {symbol: 'oneself', braille: Braille.BraiToUCS([5],[1,3,5],[1,2,4]), before: Braille.stdaln_prec, after: Braille.stdaln_foll_shfm},
        //Strong contractions
        {symbol: 'and', braille: Braille.DotsToUni(1,2,3,4,6)},
        {symbol: 'for', braille: Braille.DotsToUni(1,2,3,4,5,6)},
        {symbol: 'of', braille: Braille.DotsToUni(1,2,3,5,6)},
        {symbol: 'the', braille: Braille.DotsToUni(2,3,4,6)},
        {symbol: 'with', braille: Braille.DotsToUni(2,3,4,5,6)},
        //Initial-letter contractions
        {symbol: 'upon', braille: Braille.BraiToUCS([4,5],[1,3,6])},
        {symbol: 'these', braille: Braille.BraiToUCS([4,5],[2,3,4,6])},
        {symbol: 'those', braille: Braille.BraiToUCS([4,5],[1,4,5,6])},
        {symbol: 'whose', braille: Braille.BraiToUCS([4,5],[1,5,6])},
        {symbol: 'word', braille: Braille.BraiToUCS([4,5],[2,4,5,6])},
        {symbol: 'cannot', braille: Braille.BraiToUCS([4,5,6],[1,4])},
        {symbol: 'had', braille: Braille.BraiToUCS([4,5,6],[1,2,5])},
        {symbol: 'many', braille: Braille.BraiToUCS([4,5,6],[1,3,4])},
        {symbol: 'spirit', braille: Braille.BraiToUCS([4,5,6],[2,3,4])},
        {symbol: 'their', braille: Braille.BraiToUCS([4,5,6],[2,3,4,6])},
        {symbol: 'world', braille: Braille.BraiToUCS([4,5,6],[2,4,5,6])},
        {symbol: 'day', braille: Braille.BraiToUCS([5],[1,4,5])},
        {symbol: 'ever', braille: Braille.BraiToUCS([5],[1,5]), before: /[^EIei]$/gu},
        {symbol: 'father', braille: Braille.BraiToUCS([5],[1,2,4])},
        {symbol: 'here', braille: Braille.BraiToUCS([5],[1,2,5])},
        {symbol: 'know', braille: Braille.BraiToUCS([5],[1,3])},
        {symbol: 'lord', braille: Braille.BraiToUCS([5],[1,2,3])},
        {symbol: 'mother', braille: Braille.BraiToUCS([5],[1,3,4])},
        {symbol: 'name', braille: Braille.BraiToUCS([5],[1,3,4,5])},
        {symbol: 'one', braille: Braille.BraiToUCS([5],[1,3,5]), before: /[^Oo]$/gu},
        {symbol: 'part', braille: Braille.BraiToUCS([5],[1,2,3,4])},
        {symbol: 'question', braille: Braille.BraiToUCS([5],[1,2,3,4,5])},
        {symbol: 'right', braille: Braille.BraiToUCS([5],[1,2,3,5])},
        {symbol: 'some', braille: Braille.BraiToUCS([5],[2,3,4]), after: /[^dD]/gu},
        {symbol: 'time', braille: Braille.BraiToUCS([5],[2,3,4,5])},
        {symbol: 'under', braille: Braille.BraiToUCS([5],[1,3,6]), before: /[^AOao]$/gu},
        {symbol: 'young', braille: Braille.BraiToUCS([5],[1,3,4,5,6])},
        {symbol: 'there', braille: Braille.BraiToUCS([5],[2,3,4,6])},
        {symbol: 'character', braille: Braille.BraiToUCS([5],[1,6])},
        {symbol: 'through', braille: Braille.BraiToUCS([5],[1,4,5,6])},
        {symbol: 'where', braille: Braille.BraiToUCS([5],[1,5,6])},
        {symbol: 'ought', braille: Braille.BraiToUCS([5],[1,2,5,6])},
        {symbol: 'work', braille: Braille.BraiToUCS([5],[2,4,5,6])},
        //Final-letter groupsigns
        {symbol: 'ound', braille: Braille.BraiToUCS([4,6],[1,4,5]), before: Braille.regex_latin, after: Braille.stdaln_foll},
        {symbol: 'ance', braille: Braille.BraiToUCS([4,6],[1,5]), before: Braille.regex_latin, after: Braille.stdaln_foll},
        {symbol: 'sion', braille: Braille.BraiToUCS([4,6],[1,3,4,5]), before: Braille.regex_latin, after: Braille.stdaln_foll},
        {symbol: 'less', braille: Braille.BraiToUCS([4,6],[2,3,4]), before: Braille.regex_latin, after: Braille.stdaln_foll},
        {symbol: 'ount', braille: Braille.BraiToUCS([4,6],[2,3,4,5]), before: Braille.regex_latin, after: Braille.stdaln_foll},
        {symbol: 'ence', braille: Braille.BraiToUCS([5,6],[1,5]), before: Braille.regex_latin, after: /\s|\p{Pd}|[AaDdRr,;:.!?]|\p{Pe}|\p{Pf}|$/gu},
        {symbol: 'ong', braille: Braille.BraiToUCS([5,6],[1,2,4,5]), before: Braille.regex_latin, after: Braille.stdaln_foll},
        {symbol: 'ful', braille: Braille.BraiToUCS([5,6],[1,2,3]), before: Braille.regex_latin, after: Braille.stdaln_foll},
        {symbol: 'tion', braille: Braille.BraiToUCS([5,6],[1,3,4,5]), before: Braille.regex_latin, after: Braille.stdaln_foll},
        {symbol: 'ness', braille: Braille.BraiToUCS([5,6],[2,3,4]), before: Braille.regex_latin, after: Braille.stdaln_foll},
        {symbol: 'ment', braille: Braille.BraiToUCS([5,6],[2,3,4,5]), before: Braille.regex_latin, after: Braille.stdaln_foll},
        {symbol: 'ity', braille: Braille.BraiToUCS([5,6],[1,3,4,5,6]), before: Braille.regex_latin, after: Braille.stdaln_foll},
        //Strong groupsigns
        {symbol: 'ch', braille: Braille.DotsToUni(1,6)},
        {symbol: 'gh', braille: Braille.DotsToUni(1,2,6)},
        {symbol: 'sh', braille: Braille.DotsToUni(1,4,6)},
        {symbol: 'th', braille: Braille.DotsToUni(1,4,5,6)},
        {symbol: 'wh', braille: Braille.DotsToUni(1,5,6)},
        {symbol: 'ed', braille: Braille.DotsToUni(1,2,4,6)},
        {symbol: 'er', braille: Braille.DotsToUni(1,2,4,5,6)},
        {symbol: 'ou', braille: Braille.DotsToUni(1,2,5,6)},
        {symbol: 'ow', braille: Braille.DotsToUni(2,4,6)},
        {symbol: 'st', braille: Braille.DotsToUni(3,4)},
        {symbol: 'ing', braille: Braille.DotsToUni(3,4,6), before: Braille.stdaln_prec},
        {symbol: 'ar', braille: Braille.DotsToUni(3,4,5)},
        //Lower groupsigns
        {symbol: 'ea', braille: Braille.DotsToUni(2), before: Braille.regex_latin, after: Braille.regex_latin},
        {symbol: 'bb', braille: Braille.DotsToUni(2,3), before: Braille.regex_latin, after: Braille.regex_latin},
        {symbol: 'con', braille: Braille.DotsToUni(2,5), condition: false},
        {symbol: 'cc', braille: Braille.DotsToUni(2,5), before: Braille.regex_latin, after: Braille.regex_latin},
        {symbol: 'dis', braille: Braille.DotsToUni(2,5,6), condition: false},
        {symbol: 'en', braille: Braille.DotsToUni(2,6)},
        {symbol: 'ff', braille: Braille.DotsToUni(2,3,5), before: Braille.regex_latin, after: Braille.regex_latin},
        {symbol: 'gg', braille: Braille.DotsToUni(2,3,5,6), before: Braille.regex_latin, after: Braille.regex_latin},
        {symbol: 'in', braille: Braille.DotsToUni(3,5)},
        //Lower wordsigns
        {symbol: 'be', braille: Braille.DotsToUni(2,3), before: /(^|\s|\p{Ps})/gu, after: /\s|\p{Pe}|$/gu},
        {symbol: 'enough', braille: Braille.DotsToUni(2,6), before: Braille.stdaln_prec, after: Braille.stdaln_foll},
        {symbol: 'were', braille: Braille.DotsToUni(2,3,5,6), before: /(^|\s|\p{Ps})/gu, after: /\s|\p{Pe}|$/gu},
        {symbol: 'his', braille: Braille.DotsToUni(2,3,6), before: /(^|\s|\p{Ps})/gu, after: /\s|\p{Pe}|$/gu},
        {symbol: 'in', braille: Braille.DotsToUni(3,5), before: /(^|\s|\p{Ps})/gu, after: /\s|\p{Pe}|$/gu},
        {symbol: 'was', braille: Braille.DotsToUni(3,5,6), before: /(^|\s|\p{Ps})/gu, after: /\s|\p{Pe}|$/gu},
        //Grade 1
        {symbol: '0', braille: Braille.DotsToUni(2,4,5)},
        {symbol: '1', braille: Braille.DotsToUni(1)},
        {symbol: '2', braille: Braille.DotsToUni(1,2)},
        {symbol: '3', braille: Braille.DotsToUni(1,4)},
        {symbol: '4', braille: Braille.DotsToUni(1,4,5)},
        {symbol: '5', braille: Braille.DotsToUni(1,5)},
        {symbol: '6', braille: Braille.DotsToUni(1,2,4)},
        {symbol: '7', braille: Braille.DotsToUni(1,2,4,5)},
        {symbol: '8', braille: Braille.DotsToUni(1,2,5)},
        {symbol: '9', braille: Braille.DotsToUni(2,4)},
        {symbol: '@', braille: Braille.BraiToUCS([4],[1])},
        {symbol: '\\$', braille: Braille.BraiToUCS([4],[2,3,4])},
        {symbol: '¢', braille: Braille.BraiToUCS([4],[1,4])},
        {symbol: '€', braille: Braille.BraiToUCS([4],[1,5])},
        {symbol: '£', braille: Braille.BraiToUCS([4],[1,2,3])},
        {symbol: '¥', braille: Braille.BraiToUCS([4],[1,3,4,5,6])},
        {symbol: '&', braille: Braille.BraiToUCS([4],[1,2,3,5,6])},
        {symbol: '\\^', braille: Braille.BraiToUCS([4],[2,6])},
        {symbol: '<', braille: Braille.BraiToUCS([4],[1,2,6])},
        {symbol: '>', braille: Braille.BraiToUCS([4],[3,4,5])},
        {symbol: '~', braille: Braille.BraiToUCS([4],[3,5])},
        {symbol: '\u2020', braille: Braille.BraiToUCS([4],[6],[1,4,5,6])}, //dagger
        {symbol: '\u2021', braille: Braille.BraiToUCS([4],[6],[1,2,4,5,6])}, //ddagger
        {symbol: '\u00a9', braille: Braille.BraiToUCS([4,5],[1,4])}, //copyright
        {symbol: '\u00b0', braille: Braille.BraiToUCS([4,5],[2,4,5])}, //deg
        {symbol: '\u00b6', braille: Braille.BraiToUCS([4,5],[1,2,3,4])}, //pilcrow
        {symbol: '\u00ae', braille: Braille.BraiToUCS([4,5],[1,2,3,5])}, //registered
        {symbol: '\u00a7', braille: Braille.BraiToUCS([4,5],[2,3,4])}, //section
        {symbol: '\u2122', braille: Braille.BraiToUCS([4,5],[2,3,4,5])}, //section
        {symbol: '#', braille: Braille.BraiToUCS([4,5,6],[1,4,5,6])},
        {symbol: '\u2022', braille: Braille.BraiToUCS([4,5,6],[2,5,6])}, //bullet
        {symbol: '\u3003', braille: Braille.BraiToUCS([5],[2])}, //ditto
        {symbol: '=', braille: Braille.BraiToUCS([5],[2,3,5,6])},
        {symbol: '\\+', braille: Braille.BraiToUCS([5],[2,3,5])}, //plus
        {symbol: '\u2212', braille: Braille.BraiToUCS([5],[3,6])}, //minus
        {symbol: '\u00d7', braille: Braille.BraiToUCS([5],[2,3,6])}, //cross multiplication
        {symbol: '\u00f7', braille: Braille.BraiToUCS([5],[3,4])}, //division symbol
        {symbol: '\\*', braille: Braille.BraiToUCS([5],[3,5])},
        {symbol: '%', braille: Braille.BraiToUCS([4,6],[2,5,6])},
        {symbol: '\\|', braille: Braille.BraiToUCS([4,5,6],[1,2,5,6])},
        {symbol: ',', braille: Braille.DotsToUni(2)},
        {symbol: ';', braille: Braille.DotsToUni(2,3)},
        {symbol: ':', braille: Braille.DotsToUni(2,5)},
        {symbol: '\\.', braille: Braille.DotsToUni(2,5,6)},
        {symbol: '…', braille: Braille.BraiToUCS([2,5,6],[2,5,6],[2,5,6])},
        {symbol: '!', braille: Braille.DotsToUni(2,3,5)},
        {symbol: '\\?', braille: Braille.DotsToUni(2,3,6)},
        {symbol: '“', braille: Braille.BraiToUCS([4,5],[2,3,6])},
        {symbol: '”', braille: Braille.BraiToUCS([4,5],[3,5,6])},
        {symbol: "‘", braille: Braille.BraiToUCS([6],[2,3,6])},
        {symbol: "’", braille: Braille.BraiToUCS([6],[3,5,6])},
        {symbol: '«', braille: Braille.BraiToUCS([4,5,6],[2,3,6])},
        {symbol: '»', braille: Braille.BraiToUCS([4,5,6],[3,5,6])},
        {symbol: '"', braille: Braille.BraiToUCS([6],[2,3,5,6])},
        {symbol: "'", braille: Braille.DotsToUni(3)}, //Smart quote detection needed
        {symbol: '\\(', braille: Braille.BraiToUCS([5],[1,2,6])},
        {symbol: '\\)', braille: Braille.BraiToUCS([5],[3,4,5])},
        {symbol: '\\[', braille: Braille.BraiToUCS([4,6],[1,2,6])},
        {symbol: '\\]', braille: Braille.BraiToUCS([4,6],[3,4,5])},
        {symbol: '\\{', braille: Braille.BraiToUCS([4,5,6],[1,2,6])},
        {symbol: '\\}', braille: Braille.BraiToUCS([4,5,6],[3,4,5])},
        {symbol: '/', braille: Braille.BraiToUCS([4,5,6],[3,4])},
        {symbol: '\\\\', braille: Braille.BraiToUCS([4,5,6],[1,6])},
        {symbol: '-', braille: Braille.DotsToUni(3,6)},
        {symbol: '–', braille: Braille.BraiToUCS([6],[3,6])},
        {symbol: '--', braille: Braille.BraiToUCS([6],[3,6])},
        {symbol: '—', braille: Braille.BraiToUCS([5],[6],[3,6])},
        {symbol: '_+', braille: Braille.BraiToUCS([4,6],[3,6])},
        {symbol: '→', braille: Braille.BraiToUCS([1,2,5,6],[1,3,5])},
        {symbol: '↓', braille: Braille.BraiToUCS([1,2,5,6],[1,4,6])},
        {symbol: '←', braille: Braille.BraiToUCS([1,2,5,6],[2,4,6])},
        {symbol: '↑', braille: Braille.BraiToUCS([1,2,5,6],[3,4,6])},
        {symbol: '′', braille: Braille.DotsToUni(2,3,5,6)},
        {symbol: '″', braille: Braille.BraiToUCS([2,3,5,6],[2,3,5,6])},
        //basic latin
        {symbol: 'a', braille: Braille.DotsToUni(1)},
        {symbol: 'b', braille: Braille.DotsToUni(1,2)},
        {symbol: 'c', braille: Braille.DotsToUni(1,4)},
        {symbol: 'd', braille: Braille.DotsToUni(1,4,5)},
        {symbol: 'e', braille: Braille.DotsToUni(1,5)},
        {symbol: 'f', braille: Braille.DotsToUni(1,2,4)},
        {symbol: 'g', braille: Braille.DotsToUni(1,2,4,5)},
        {symbol: 'h', braille: Braille.DotsToUni(1,2,5)},
        {symbol: 'i', braille: Braille.DotsToUni(2,4)},
        {symbol: 'j', braille: Braille.DotsToUni(2,4,5)},
        {symbol: 'k', braille: Braille.DotsToUni(1,3)},
        {symbol: 'l', braille: Braille.DotsToUni(1,2,3)},
        {symbol: 'm', braille: Braille.DotsToUni(1,3,4)},
        {symbol: 'n', braille: Braille.DotsToUni(1,3,4,5)},
        {symbol: 'o', braille: Braille.DotsToUni(1,3,5)},
        {symbol: 'p', braille: Braille.DotsToUni(1,2,3,4)},
        {symbol: 'q', braille: Braille.DotsToUni(1,2,3,4,5)},
        {symbol: 'r', braille: Braille.DotsToUni(1,2,3,5)},
        {symbol: 's', braille: Braille.DotsToUni(2,3,4)},
        {symbol: 't', braille: Braille.DotsToUni(2,3,4,5)},
        {symbol: 'u', braille: Braille.DotsToUni(1,3,6)},
        {symbol: 'v', braille: Braille.DotsToUni(1,2,3,6)},
        {symbol: 'w', braille: Braille.DotsToUni(2,4,5,6)},
        {symbol: 'x', braille: Braille.DotsToUni(1,3,4,6)},
        {symbol: 'y', braille: Braille.DotsToUni(1,3,4,5,6)},
        {symbol: 'z', braille: Braille.DotsToUni(1,3,5,6)},
        //extended
        {symbol: '\u00a8', braille: Braille.BraiToUCS([4],[1,6],[1,3,5])}, //o-slash, undecomposable
        {symbol: '\u0142', braille: Braille.BraiToUCS([4],[1,6],[1,2,3])}, //Polish l-slash, undecomposable
        {symbol: '\u0127', braille: Braille.BraiToUCS([4],[2,5],[1,2,5])}, //h-bar, undecomposable
        {symbol: '\u00c6', braille: Braille.BraiToUCS([1],[6],[4,5],[2,3,5],[1,5]), before: /(^|[^\u2820])\u2820/ug}, //Single-occuring Æ
        {symbol: '\u00e6', braille: Braille.BraiToUCS([1],[4,5],[2,3,5],[1,5])}, //æ, ligature
        {symbol: '\u0152', braille: Braille.BraiToUCS([1,3,5],[6],[4,5],[2,3,5],[1,5]), before: /(^|[^\u2820])\u2820/ug}, //Single-occuring Œ
        {symbol: '\u0153', braille: Braille.BraiToUCS([1,3,5],[4,5],[2,3,5],[1,5])}, //œ, ligature
        {symbol: '\u014b', braille: Braille.BraiToUCS([4,5],[1,3,4,5])}, //eng
        {symbol: '\u0259', braille: Braille.BraiToUCS([4,5,6],[2,6])}, //schwa
        //Early English
        {symbol: '\u021d', braille: Braille.BraiToUCS([3,4,5,6],[1,3,4,5,6])}, //yogh
        {symbol: '\u00fe', braille: Braille.BraiToUCS([3,4,5,6],[2,3,4,6])}, //thorn
        {symbol: '\u00f0', braille: Braille.BraiToUCS([3,4,5,6],[1,2,4,6])}, //eth
        {symbol: '\u01bf', braille: Braille.BraiToUCS([3,4,5,6],[2,4,5,6])}, //wynn
        //Greek
        {symbol: '\u03b1', braille: Braille.BraiToUCS([4,6],[1])}, //alpha
        {symbol: '\u03b2', braille: Braille.BraiToUCS([4,6],[1,2])}, //beta
        {symbol: '\u03b3', braille: Braille.BraiToUCS([4,6],[1,2,4,5])}, //gamma
        {symbol: '\u03b4', braille: Braille.BraiToUCS([4,6],[1,4,5])}, //delta
        {symbol: '\u03b5', braille: Braille.BraiToUCS([4,6],[1,5])}, //epsilon
        {symbol: '\u03b6', braille: Braille.BraiToUCS([4,6],[1,3,5,6])}, //zeta
        {symbol: '\u03b7', braille: Braille.BraiToUCS([4,6],[1,5,6])}, //eta
        {symbol: '\u03b8', braille: Braille.BraiToUCS([4,6],[1,4,5,6])}, //theta
        {symbol: '\u03b9', braille: Braille.BraiToUCS([4,6],[2,4])}, //iota
        {symbol: '\u03ba', braille: Braille.BraiToUCS([4,6],[1,3])}, //kappa
        {symbol: '\u03bb', braille: Braille.BraiToUCS([4,6],[1,2,3])}, //lambda
        {symbol: '\u03bc', braille: Braille.BraiToUCS([4,6],[1,3,4])}, //mu
        {symbol: '\u03bd', braille: Braille.BraiToUCS([4,6],[1,3,4,5])}, //nu
        {symbol: '\u03be', braille: Braille.BraiToUCS([4,6],[1,3,4,6])}, //xi
        {symbol: '\u03bf', braille: Braille.BraiToUCS([4,6],[1,3,5])}, //omicron
        {symbol: '\u03c0', braille: Braille.BraiToUCS([4,6],[1,2,3,4])}, //pi
        {symbol: '\u03c1', braille: Braille.BraiToUCS([4,6],[1,2,3,5])}, //rho
        {symbol: '\u03c2', braille: Braille.BraiToUCS([4,6],[2,3,4])}, //final sigma
        {symbol: '\u03c3', braille: Braille.BraiToUCS([4,6],[2,3,4])}, //sigma
        {symbol: '\u03c4', braille: Braille.BraiToUCS([4,6],[2,3,4,5])}, //tau
        {symbol: '\u03c5', braille: Braille.BraiToUCS([4,6],[1,3,6])}, //ypsilon
        {symbol: '\u03c6', braille: Braille.BraiToUCS([4,6],[1,2,4])}, //phi
        {symbol: '\u03c7', braille: Braille.BraiToUCS([4,6],[1,2,3,4,6])}, //chi
        {symbol: '\u03c8', braille: Braille.BraiToUCS([4,6],[1,3,4,5,6])}, //psi
        {symbol: '\u03c9', braille: Braille.BraiToUCS([4,6],[2,4,5,6])}, //omega
        //modifier
        {symbol: '\u0338', braille: Braille.BraiToUCS([4],[1,6])}, //solidus
        {symbol: '\u0335', braille: Braille.BraiToUCS([4],[2,5])},
        {symbol: '\u0336', braille: Braille.BraiToUCS([4],[2,5])}, //horiz. break
        {symbol: '\u0306', braille: Braille.BraiToUCS([4],[3,4,6])}, //breve
        {symbol: '\u0304', braille: Braille.BraiToUCS([4],[3,6])}, //macron
        {symbol: '\u0327', braille: Braille.BraiToUCS([4,5],[1,2,3,4,6])}, //cedilla
        {symbol: '\u0300', braille: Braille.BraiToUCS([4,5],[1,6])}, //grave
        {symbol: '\u0302', braille: Braille.BraiToUCS([4,5],[1,4,6])}, //circumflex
        {symbol: '\u030a', braille: Braille.BraiToUCS([4,5],[1,2,4,6])}, //ring
        {symbol: '\u0303', braille: Braille.BraiToUCS([4,5],[1,2,4,5,6])}, //tilde
        {symbol: '\u0308', braille: Braille.BraiToUCS([4,5],[2,5])}, //diaeresis/umlaut
        {symbol: '\u0301', braille: Braille.BraiToUCS([4,5],[3,4])}, //acute
        {symbol: '\u030c', braille: Braille.BraiToUCS([4,5],[3,4,6])}, //caron
        //
        {symbol: ' ', braille: Braille.DotsToUni(0)},
    ]};
    readonly Ascii: Map<string, string> = new Map([
        [Braille.DotsToUni(), ' '],
        [Braille.DotsToUni(2,3,4,6), '!'],
        [Braille.DotsToUni(5), '"'],
        [Braille.DotsToUni(3,4,5,6), '#'],
        [Braille.DotsToUni(1,2,4,6), '$'],
        [Braille.DotsToUni(1,4,6), '%'],
        [Braille.DotsToUni(1,2,3,4,5,6), '&'],
        [Braille.DotsToUni(3), "'"],
        [Braille.DotsToUni(1,2,3,5,6), '('],
        [Braille.DotsToUni(2,3,4,5,6), ')'],
        [Braille.DotsToUni(1,6), '*'],
        [Braille.DotsToUni(3,4,6), '+'],
        [Braille.DotsToUni(6), ','],
        [Braille.DotsToUni(3,6), '-'],
        [Braille.DotsToUni(4,6), '.'],
        [Braille.DotsToUni(3,4), '/'],
        [Braille.DotsToUni(3,5,6), '0'],
        [Braille.DotsToUni(2), '1'],
        [Braille.DotsToUni(2,3), '2'],
        [Braille.DotsToUni(2,5), '3'],
        [Braille.DotsToUni(2,5,6), '4'],
        [Braille.DotsToUni(2,6), '5'],
        [Braille.DotsToUni(2,3,5), '6'],
        [Braille.DotsToUni(2,3,4,5), '7'],
        [Braille.DotsToUni(2,3,6), '8'],
        [Braille.DotsToUni(3,5), '9'],
        [Braille.DotsToUni(1,5,6), ':'],
        [Braille.DotsToUni(5,6), ';'],
        [Braille.DotsToUni(1,2,6), '<'],
        [Braille.DotsToUni(1,2,3,4,5,6), '='],
        [Braille.DotsToUni(3,4,5), '>'],
        [Braille.DotsToUni(1,4,5,6), '?'],
        [Braille.DotsToUni(4), '@'],
        [Braille.DotsToUni(1), 'A'],
        [Braille.DotsToUni(1,2), 'B'],
        [Braille.DotsToUni(1,4), 'C'],
        [Braille.DotsToUni(1,4,5), 'D'],
        [Braille.DotsToUni(1,5), 'E'],
        [Braille.DotsToUni(1,2,4), 'F'],
        [Braille.DotsToUni(1,2,4,5), 'G'],
        [Braille.DotsToUni(1,2,5), 'H'],
        [Braille.DotsToUni(2,4), 'I'],
        [Braille.DotsToUni(2,4,5), 'J'],
        [Braille.DotsToUni(1,3), 'K'],
        [Braille.DotsToUni(1,2,3), 'L'],
        [Braille.DotsToUni(1,3,4), 'M'],
        [Braille.DotsToUni(1,3,4,5), 'N'],
        [Braille.DotsToUni(1,3,5), 'O'],
        [Braille.DotsToUni(1,2,3,4), 'P'],
        [Braille.DotsToUni(1,2,3,4,5), 'Q'],
        [Braille.DotsToUni(1,2,3,5), 'R'],
        [Braille.DotsToUni(2,3,4), 'S'],
        [Braille.DotsToUni(2,3,4,5), 'T'],
        [Braille.DotsToUni(1,3,6), 'U'],
        [Braille.DotsToUni(1,2,3,6), 'V'],
        [Braille.DotsToUni(2,4,5,6), 'W'],
        [Braille.DotsToUni(1,3,4,6), 'X'],
        [Braille.DotsToUni(1,3,4,5,6), 'Y'],
        [Braille.DotsToUni(1,3,5,6), 'Z'],
        [Braille.DotsToUni(2,4,6), '['],
        [Braille.DotsToUni(1,2,5,6), '\\'],
        [Braille.DotsToUni(1,2,4,5,6), ']'],
        [Braille.DotsToUni(4,5), '^'],
        [Braille.DotsToUni(4,5,6), '_']
    ]);
}