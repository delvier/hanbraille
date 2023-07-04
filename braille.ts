export type Rule = {
    symbol: string;
    braille: string;
    before?: RegExp;
    after?: RegExp;
    condition?: boolean;
};
export class Braille {
    constructor(asciiMode: boolean = false) {
        this.asciiMode = asciiMode;
    }
    asciiMode: boolean = false;
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
    static BraiUCSToASCII(i: string): string {
        let o: string = ""
        for (let j of [...i]) {
            o += new Braille().Ascii.get(j);
        }
        return o;
    }
    readonly UEB2: Rule[] = [
        //condition is rather complex, how to compromise
        {symbol: 'but', braille: Braille.DotsToUni(1,2)},
        {symbol: 'can', braille: Braille.DotsToUni(1,4)},
        {symbol: 'do', braille: Braille.DotsToUni(1,4,5)},
        {symbol: 'every', braille: Braille.DotsToUni(1,5)},
        {symbol: 'from', braille: Braille.DotsToUni(1,2,4)},
        {symbol: 'go', braille: Braille.DotsToUni(1,2,4,5)},
        {symbol: 'have', braille: Braille.DotsToUni(1,2,5)},
        {symbol: 'just', braille: Braille.DotsToUni(2,4,5)},
        {symbol: 'knowledge', braille: Braille.DotsToUni(1,3)},
        {symbol: 'like', braille: Braille.DotsToUni(1,2,3)},
        {symbol: 'more', braille: Braille.DotsToUni(1,3,4)},
        {symbol: 'not', braille: Braille.DotsToUni(1,3,4,5)},
        {symbol: 'people', braille: Braille.DotsToUni(1,2,3,4)},
        {symbol: 'quite', braille: Braille.DotsToUni(1,2,3,4,5)},
        {symbol: 'rather', braille: Braille.DotsToUni(1,2,3,5)},
        {symbol: 'so', braille: Braille.DotsToUni(2,3,4)},
        {symbol: 'that', braille: Braille.DotsToUni(2,3,4,5)},
        {symbol: 'us', braille: Braille.DotsToUni(1,3,6)},
        {symbol: 'very', braille: Braille.DotsToUni(1,2,3,6)},
        {symbol: 'will', braille: Braille.DotsToUni(2,4,5,6)},
        {symbol: 'it', braille: Braille.DotsToUni(1,3,4,6)},
        {symbol: 'you', braille: Braille.DotsToUni(1,3,4,5,6)},
        {symbol: 'as', braille: Braille.DotsToUni(1,3,5,6)},
        //
        {symbol: 'child', braille: Braille.DotsToUni(1,6)},
        {symbol: 'shall', braille: Braille.DotsToUni(1,4,6)},
        {symbol: 'this', braille: Braille.DotsToUni(1,4,5,6)},
        {symbol: 'which', braille: Braille.DotsToUni(1,5,6)},
        {symbol: 'out', braille: Braille.DotsToUni(1,2,5,6)},
        {symbol: 'still', braille: Braille.DotsToUni(3,4)},
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
        {symbol: 'ing', braille: Braille.DotsToUni(3,4,6)},
        {symbol: 'ar', braille: Braille.DotsToUni(3,4,5)},
        //
        {symbol: 'be', braille: Braille.DotsToUni(2,3)},
        {symbol: 'enough', braille: Braille.DotsToUni(2,6)},
        {symbol: 'were', braille: Braille.DotsToUni(2,3,5,6)},
        {symbol: 'his', braille: Braille.DotsToUni(2,3,6)},
        {symbol: 'in', braille: Braille.DotsToUni(3,5)},
        {symbol: 'was', braille: Braille.DotsToUni(3,5,6)},
        {symbol: 'ea', braille: Braille.DotsToUni(2)},
        {symbol: 'bb', braille: Braille.DotsToUni(2,3)},
        {symbol: 'con', braille: Braille.DotsToUni(2,5)},
        {symbol: 'cc', braille: Braille.DotsToUni(2,5)},
        {symbol: 'dis', braille: Braille.DotsToUni(2,5,6)},
        {symbol: 'en', braille: Braille.DotsToUni(2,6)},
        {symbol: 'ff', braille: Braille.DotsToUni(2,3,5)},
        {symbol: 'gg', braille: Braille.DotsToUni(2,3,5,6)},
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