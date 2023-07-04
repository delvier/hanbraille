export type Rule = {
    symbol: string;
    braille: string;
    before?: RegExp;
    after?: RegExp;
    condition?: boolean;
};
export class Braille {
    constructor() {
    }
    static standalone_prec: RegExp = new RegExp(/(^|\s|\p{Pd}|\p{Ps}|\p{Pi})$/gu);
    static standalone_foll: RegExp = new RegExp(/\s|\p{Pd}|[,;:.!?]|\p{Pe}|\p{Pf}|$/gu);
    ToBrai(input: string, width: number = 0): string {
        let d: string = input.normalize('NFD'); //detaching diacritics
        let o: string = '';
        let p: string = ' ';
        let linePos: number = 0;
        let isNumeric: boolean = false;
        let isCapital: boolean = false;
        let isCapSeq: boolean = false;
        let prohibitContract: boolean = false;
        if (!isNumeric && d.match(/^[0-9]/gu)) {
            //Enabling numeric mode in front of digits
            isNumeric = true;
            o += Braille.DotsToUni(3,4,5,6);
        }
        else if (isNumeric && d.match(/^[^0-9.,]/gu)) {
            //Disabling numeric mode after non-digit appears
            isNumeric = false;
            if (d.match(/^[a-j.,]/gu)) {
                //force grade 1 mode to avoid confusion
                o += Braille.DotsToUni(5,6);
            }
        }
        else if (!isCapital && d.match(/^\p{Lu}+/gu)) {
            isCapital = true;
            isCapSeq = false;
            o += Braille.BraiToUCS([6],[6]);
        }
        else if (!isCapital && d.match(/^\p{Lu}/gu)) {
            o += Braille.BraiToUCS([6]);
        }
        else if (isCapital && isCapSeq && d.match(/^[^\s\p{Lu}]/gu)) {
            isCapital = false;
            isCapSeq = false;
            o += Braille.BraiToUCS([6],[3]);
        }
        else if (isCapital && !isCapSeq && d.match(/^[^\p{Lu}]/gu)) {
            isCapital = false;
        }
        /* Actual conversion */
        if (d[0].match(/^\n/)) {
            o += '\n';
            p = d[0];
            d = d.slice(1);
        }
        else if (d[0].match(/^\s/gu)) {
            o += Braille.DotsToUni(0);
            p = d[0];
            d = d.slice(1);
        }
        if (true) UEBExit: {
            if (!prohibitContract) {
                for (const x of this.UEB2) {
                    let regexp: RegExp;
                    if (typeof(x.after) == 'string') {
                        regexp = new RegExp('^' + x.symbol + '(?=' + x.after + ')', 'gu');
                    } else if (typeof(x.after) == 'object') { //RegExp
                        regexp = new RegExp('^' + x.symbol + '(?=' + x.after.source + ')', 'gu');
                    } else {
                        regexp = new RegExp('^' + x.symbol, 'gu');
                    }
                    if (regexp.test(d)
                    && (x.condition === undefined || x.condition)
                    && (x.before === undefined || x.before.test(p))) {
                        o += x.braille;
                        p = d.slice(0, regexp.lastIndex);
                        d = d.slice(regexp.lastIndex);
                        break UEBExit;
                    }
                }
            }
            for (const x of this.UEB) {
                let regexp = new RegExp('^' + x.symbol, 'gu');
                if (regexp.test(d.toLowerCase()) && (x.condition || x.condition === undefined)) {
                    o += x.braille;
                    p = d.slice(0, regexp.lastIndex);
                    d = d.slice(regexp.lastIndex);
                    prohibitContract = false;
                    break UEBExit;
                }
            }
            console.log(`Skipping ${d[0]}...`);
            d = d.slice(1);
        }
        return o;
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
    readonly UEB2: Rule[] = [
        //condition is rather complex, how to compromise
        {symbol: 'but', braille: Braille.DotsToUni(1,2), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'can', braille: Braille.DotsToUni(1,4), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'do', braille: Braille.DotsToUni(1,4,5), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'every', braille: Braille.DotsToUni(1,5), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'from', braille: Braille.DotsToUni(1,2,4), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'go', braille: Braille.DotsToUni(1,2,4,5), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'have', braille: Braille.DotsToUni(1,2,5), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'just', braille: Braille.DotsToUni(2,4,5), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'knowledge', braille: Braille.DotsToUni(1,3), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'like', braille: Braille.DotsToUni(1,2,3), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'more', braille: Braille.DotsToUni(1,3,4), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'not', braille: Braille.DotsToUni(1,3,4,5), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'people', braille: Braille.DotsToUni(1,2,3,4), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'quite', braille: Braille.DotsToUni(1,2,3,4,5), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'rather', braille: Braille.DotsToUni(1,2,3,5), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'so', braille: Braille.DotsToUni(2,3,4), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'that', braille: Braille.DotsToUni(2,3,4,5), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'us', braille: Braille.DotsToUni(1,3,6), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'very', braille: Braille.DotsToUni(1,2,3,6), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'will', braille: Braille.DotsToUni(2,4,5,6), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'it', braille: Braille.DotsToUni(1,3,4,6), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'you', braille: Braille.DotsToUni(1,3,4,5,6), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'as', braille: Braille.DotsToUni(1,3,5,6), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'child', braille: Braille.DotsToUni(1,6), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'shall', braille: Braille.DotsToUni(1,4,6), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'this', braille: Braille.DotsToUni(1,4,5,6), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'which', braille: Braille.DotsToUni(1,5,6), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'out', braille: Braille.DotsToUni(1,2,5,6), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'still', braille: Braille.DotsToUni(3,4), before: Braille.standalone_prec, after: Braille.standalone_foll},
        //
        {symbol: 'about', braille: Braille.BraiToUCS([1],[1,2]), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'above', braille: Braille.BraiToUCS([1],[1,2],[1,2,3,6]), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'according', braille: Braille.BraiToUCS([1],[1,4]), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'across', braille: Braille.BraiToUCS([1],[1,4],[1,2,3,5]), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'after', braille: Braille.BraiToUCS([1],[1,2,4]), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'afternoon', braille: Braille.BraiToUCS([1],[1,2,4],[1,3,4,5]), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'afterward', braille: Braille.BraiToUCS([1],[1,2,4],[2,4,5,6]), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'again', braille: Braille.BraiToUCS([1],[1,2,4,5]), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'against', braille: Braille.BraiToUCS([1],[1,2,4,5],[3,4]), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'also', braille: Braille.BraiToUCS([1],[1,2,3]), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'almost', braille: Braille.BraiToUCS([1],[1,2,3],[1,3,4]), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'already', braille: Braille.BraiToUCS([1],[1,2,3],[1,2,3,5]), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'altogether', braille: Braille.BraiToUCS([1],[1,2,3],[2,3,4,5]), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'although', braille: Braille.BraiToUCS([1],[1,2,3],[1,4,5,6]), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'always', braille: Braille.BraiToUCS([1],[1,2,3],[2,4,5,6]), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'blind', braille: Braille.BraiToUCS([1,2],[1,2,3]), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'braille', braille: Braille.BraiToUCS([1,2],[1,2,3,5],[1,2,3]), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'could', braille: Braille.BraiToUCS([1,4],[1,4,5]), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'declare', braille: Braille.BraiToUCS([1,4,5],[1,4],[1,2,3]), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'declaring', braille: Braille.BraiToUCS([1,4,5],[1,4],[1,2,3],[1,2,4,5]), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'deceive', braille: Braille.BraiToUCS([1,4,5],[1,4],[1,2,3,6]), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'deceiving', braille: Braille.BraiToUCS([1,4,5],[1,4],[1,2,3,6],[1,2,4,5]), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'either', braille: Braille.BraiToUCS([1,5],[2,4]), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'friend', braille: Braille.BraiToUCS([1,2,4],[1,2,3,5]), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'first', braille: Braille.BraiToUCS([1,2,4],[3,4]), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'good', braille: Braille.BraiToUCS([1,2,4,5],[1,4,5]), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'great', braille: Braille.BraiToUCS([1,2,4,5],[1,2,3,5],[2,3,4,5]), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'him', braille: Braille.BraiToUCS([1,2,5],[1,3,4]), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'himself', braille: Braille.BraiToUCS([1,2,5],[1,3,4],[1,2,4]), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'herself', braille: Braille.BraiToUCS([1,2,5],[1,2,4,5,6],[1,2,4]), before: Braille.standalone_prec, after: Braille.standalone_foll},
        //
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
        //
        {symbol: 'ound', braille: Braille.BraiToUCS([4,6],[1,4,5]), before: /[A-Za-z]$/gu, after: Braille.standalone_foll},
        {symbol: 'ance', braille: Braille.BraiToUCS([4,6],[1,5]), before: /[A-Za-z]$/gu, after: Braille.standalone_foll},
        {symbol: 'sion', braille: Braille.BraiToUCS([4,6],[1,3,4,5]), before: /[A-Za-z]$/gu, after: Braille.standalone_foll},
        {symbol: 'less', braille: Braille.BraiToUCS([4,6],[2,3,4]), before: /[A-Za-z]$/gu, after: Braille.standalone_foll},
        {symbol: 'ount', braille: Braille.BraiToUCS([4,6],[2,3,4,5]), before: /[A-Za-z]$/gu, after: Braille.standalone_foll},
        {symbol: 'ence', braille: Braille.BraiToUCS([5,6],[1,5]), before: /[A-Za-z]$/gu, after: Braille.standalone_foll},
        {symbol: 'ong', braille: Braille.BraiToUCS([5,6],[1,2,4,5]), before: /[A-Za-z]$/gu, after: Braille.standalone_foll},
        {symbol: 'ful', braille: Braille.BraiToUCS([5,6],[1,2,3]), before: /[A-Za-z]$/gu, after: Braille.standalone_foll},
        {symbol: 'tion', braille: Braille.BraiToUCS([5,6],[1,3,4,5]), before: /[A-Za-z]$/gu, after: Braille.standalone_foll},
        {symbol: 'ness', braille: Braille.BraiToUCS([5,6],[2,3,4]), before: /[A-Za-z]$/gu, after: Braille.standalone_foll},
        {symbol: 'ment', braille: Braille.BraiToUCS([5,6],[2,3,4,5]), before: /[A-Za-z]$/gu, after: Braille.standalone_foll},
        {symbol: 'ity', braille: Braille.BraiToUCS([5,6],[1,3,4,5,6]), before: /[A-Za-z]$/gu, after: Braille.standalone_foll},
        //
        {symbol: 'and', braille: Braille.DotsToUni(1,2,3,5,6)},
        {symbol: 'for', braille: Braille.DotsToUni(1,2,3,4,5,6)},
        {symbol: 'of', braille: Braille.DotsToUni(1,2,3,5,6)},
        {symbol: 'the', braille: Braille.DotsToUni(2,3,4,6)},
        {symbol: 'with', braille: Braille.DotsToUni(2,3,4,5,6)},
        //
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
        {symbol: 'ing', braille: Braille.DotsToUni(3,4,6), before: Braille.standalone_prec},
        {symbol: 'ar', braille: Braille.DotsToUni(3,4,5)},
        //
        {symbol: 'be', braille: Braille.DotsToUni(2,3), before: /(^|\s|\p{Ps})$/gu, after: /\s|\p{Pe}|$/gu},
        {symbol: 'enough', braille: Braille.DotsToUni(2,6), before: Braille.standalone_prec, after: Braille.standalone_foll},
        {symbol: 'were', braille: Braille.DotsToUni(2,3,5,6), before: /(^|\s|\p{Ps})$/gu, after: /\s|\p{Pe}|$/gu},
        {symbol: 'his', braille: Braille.DotsToUni(2,3,6), before: /(^|\s|\p{Ps})$/gu, after: /\s|\p{Pe}|$/gu},
        {symbol: 'in', braille: Braille.DotsToUni(3,5)},
        {symbol: 'was', braille: Braille.DotsToUni(3,5,6), before: /(^|\s|\p{Ps})$/gu, after: /\s|\p{Pe}|$/gu},
        {symbol: 'ea', braille: Braille.DotsToUni(2), before: /[A-Za-z]$/gu, after: /[A-Za-z]/gu},
        {symbol: 'bb', braille: Braille.DotsToUni(2,3), before: /[A-Za-z]$/gu, after: /[A-Za-z]/gu},
        {symbol: 'con', braille: Braille.DotsToUni(2,5), condition: false},
        {symbol: 'cc', braille: Braille.DotsToUni(2,5), before: /[A-Za-z]$/gu, after: /[A-Za-z]/gu},
        {symbol: 'dis', braille: Braille.DotsToUni(2,5,6), condition: false},
        {symbol: 'en', braille: Braille.DotsToUni(2,6)},
        {symbol: 'ff', braille: Braille.DotsToUni(2,3,5), before: /[A-Za-z]$/gu, after: /[A-Za-z]/gu},
        {symbol: 'gg', braille: Braille.DotsToUni(2,3,5,6), before: /[A-Za-z]$/gu, after: /[A-Za-z]/gu},
        {symbol: 'in', braille: Braille.DotsToUni(3,5)},
    ]
    readonly UEB: Rule[] = [
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
        {symbol: '#', braille: Braille.BraiToUCS([4,5,6],[1,4,5,6])},
        {symbol: '\\^', braille: Braille.BraiToUCS([4],[2,6])},
        {symbol: '&', braille: Braille.BraiToUCS([4],[1,2,3,5,6])},
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
        {symbol: '"', braille: Braille.DotsToUni(3)},
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
    ];
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