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
    readonly UEB2: Map<string, string[]> = new Map([
        //condition is rather complex, how to compromise
        ['but', [Braille.DotsToUni(1,2)]],
        ['can', [Braille.DotsToUni(1,4)]],
        ['do', [Braille.DotsToUni(1,4,5)]],
        ['every', [Braille.DotsToUni(1,5)]],
        ['from', [Braille.DotsToUni(1,2,4)]],
        ['go', [Braille.DotsToUni(1,2,4,5)]],
        ['have', [Braille.DotsToUni(1,2,5)]],
        ['just', [Braille.DotsToUni(2,4,5)]],
        ['knowledge', [Braille.DotsToUni(1,3)]],
        ['like', [Braille.DotsToUni(1,2,3)]],
        ['more', [Braille.DotsToUni(1,3,4)]],
        ['not', [Braille.DotsToUni(1,3,4,5)]],
        ['people', [Braille.DotsToUni(1,2,3,4)]],
        ['quite', [Braille.DotsToUni(1,2,3,4,5)]],
        ['rather', [Braille.DotsToUni(1,2,3,5)]],
        ['so', [Braille.DotsToUni(2,3,4)]],
        ['that', [Braille.DotsToUni(2,3,4,5)]],
        ['us', [Braille.DotsToUni(1,3,6)]],
        ['very', [Braille.DotsToUni(1,2,3,6)]],
        ['will', [Braille.DotsToUni(2,4,5,6)]],
        ['it', [Braille.DotsToUni(1,3,4,6)]],
        ['you', [Braille.DotsToUni(1,3,4,5,6)]],
        ['as', [Braille.DotsToUni(1,3,5,6)]],
        //
        ['child', [Braille.DotsToUni(1,6)]],
        ['shall', [Braille.DotsToUni(1,4,6)]],
        ['this', [Braille.DotsToUni(1,4,5,6)]],
        ['which', [Braille.DotsToUni(1,5,6)]],
        ['out', [Braille.DotsToUni(1,2,5,6)]],
        ['still', [Braille.DotsToUni(3,4)]],
        ['and', [Braille.DotsToUni(1,2,3,5,6)]],
        ['for', [Braille.DotsToUni(1,2,3,4,5,6)]],
        ['of', [Braille.DotsToUni(1,2,3,5,6)]],
        ['the', [Braille.DotsToUni(2,3,4,6)]],
        ['with', [Braille.DotsToUni(2,3,4,5,6)]],
        //
        ['ch', [Braille.DotsToUni(1,6)]],
        ['gh', [Braille.DotsToUni(1,2,6)]],
        ['sh', [Braille.DotsToUni(1,4,6)]],
        ['th', [Braille.DotsToUni(1,4,5,6)]],
        ['wh', [Braille.DotsToUni(1,5,6)]],
        ['ed', [Braille.DotsToUni(1,2,4,6)]],
        ['er', [Braille.DotsToUni(1,2,4,5,6)]],
        ['ou', [Braille.DotsToUni(1,2,5,6)]],
        ['ow', [Braille.DotsToUni(2,4,6)]],
        ['st', [Braille.DotsToUni(3,4)]],
        ['ing', [Braille.DotsToUni(3,4,6)]],
        ['ar', [Braille.DotsToUni(3,4,5)]],
        //
        ['be', [Braille.DotsToUni(2,3)]],
        ['enough', [Braille.DotsToUni(2,6)]],
        ['were', [Braille.DotsToUni(2,3,5,6)]],
        ['his', [Braille.DotsToUni(2,3,6)]],
        ['in', [Braille.DotsToUni(3,5)]],
        ['was', [Braille.DotsToUni(3,5,6)]],
        ['ea', [Braille.DotsToUni(2)]],
        ['bb', [Braille.DotsToUni(2,3)]],
        ['con', [Braille.DotsToUni(2,5)]],
        ['cc', [Braille.DotsToUni(2,5)]],
        ['dis', [Braille.DotsToUni(2,5,6)]],
        ['en', [Braille.DotsToUni(2,6)]],
        ['ff', [Braille.DotsToUni(2,3,5)]],
        ['gg', [Braille.DotsToUni(2,3,5,6)]],
        ['in', [Braille.DotsToUni(3,5)]],
    ])
    readonly UEB: Map<string, string[]> = new Map([
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
        ['@', [Braille.BraiToUCS([4],[1])]],
        ['#', [Braille.BraiToUCS([4,5,6],[1,4,5,6])]],
        ['\\^', [Braille.BraiToUCS([4],[2,6])]],
        ['&', [Braille.BraiToUCS([4],[1,2,3,5,6])]],
        ['a', [Braille.DotsToUni(1)]],
        ['b', [Braille.DotsToUni(1,2)]],
        ['c', [Braille.DotsToUni(1,4)]],
        ['d', [Braille.DotsToUni(1,4,5)]],
        ['e', [Braille.DotsToUni(1,5)]],
        ['f', [Braille.DotsToUni(1,2,4)]],
        ['g', [Braille.DotsToUni(1,2,4,5)]],
        ['h', [Braille.DotsToUni(1,2,5)]],
        ['i', [Braille.DotsToUni(2,4)]],
        ['j', [Braille.DotsToUni(2,4,5)]],
        ['k', [Braille.DotsToUni(1,3)]],
        ['l', [Braille.DotsToUni(1,2,3)]],
        ['m', [Braille.DotsToUni(1,3,4)]],
        ['n', [Braille.DotsToUni(1,3,4,5)]],
        ['o', [Braille.DotsToUni(1,3,5)]],
        ['p', [Braille.DotsToUni(1,2,3,4)]],
        ['q', [Braille.DotsToUni(1,2,3,4,5)]],
        ['r', [Braille.DotsToUni(1,2,3,5)]],
        ['s', [Braille.DotsToUni(2,3,4)]],
        ['t', [Braille.DotsToUni(2,3,4,5)]],
        ['u', [Braille.DotsToUni(1,3,6)]],
        ['v', [Braille.DotsToUni(1,2,3,6)]],
        ['w', [Braille.DotsToUni(2,4,5,6)]],
        ['x', [Braille.DotsToUni(1,3,4,6)]],
        ['y', [Braille.DotsToUni(1,3,4,5,6)]],
        ['z', [Braille.DotsToUni(1,3,5,6)]],
        ['"', [Braille.DotsToUni(3)]],
        ['\u03b1', [Braille.BraiToUCS([4,6],[1])]], //alpha
        ['\u03b2', [Braille.BraiToUCS([4,6],[1,2])]], //beta
        ['\u03b3', [Braille.BraiToUCS([4,6],[1,2,4,5])]], //gamma
        ['\u03b4', [Braille.BraiToUCS([4,6],[1,4,5])]], //delta
        ['\u03b5', [Braille.BraiToUCS([4,6],[1,5])]], //epsilon
        ['\u03b6', [Braille.BraiToUCS([4,6],[1,3,5,6])]], //zeta
        ['\u03b7', [Braille.BraiToUCS([4,6],[1,5,6])]], //eta
        ['\u03b8', [Braille.BraiToUCS([4,6],[1,4,5,6])]], //theta
        ['\u03b9', [Braille.BraiToUCS([4,6],[2,4])]], //iota
        ['\u03ba', [Braille.BraiToUCS([4,6],[1,3])]], //kappa
        ['\u03bb', [Braille.BraiToUCS([4,6],[1,2,3])]], //lambda
        ['\u03bc', [Braille.BraiToUCS([4,6],[1,3,4])]], //mu
        ['\u03bd', [Braille.BraiToUCS([4,6],[1,3,4,5])]], //nu
        ['\u03be', [Braille.BraiToUCS([4,6],[1,3,4,6])]], //xi
        ['\u03bf', [Braille.BraiToUCS([4,6],[1,3,5])]], //omicron
        ['\u03c0', [Braille.BraiToUCS([4,6],[1,2,3,4])]], //pi
        ['\u03c1', [Braille.BraiToUCS([4,6],[1,2,3,5])]], //rho
        ['\u03c2', [Braille.BraiToUCS([4,6],[2,3,4])]], //final sigma
        ['\u03c3', [Braille.BraiToUCS([4,6],[2,3,4])]], //sigma
        ['\u03c4', [Braille.BraiToUCS([4,6],[2,3,4,5])]], //tau
        ['\u03c5', [Braille.BraiToUCS([4,6],[1,3,6])]], //ypsilon
        ['\u03c6', [Braille.BraiToUCS([4,6],[1,2,4])]], //phi
        ['\u03c7', [Braille.BraiToUCS([4,6],[1,2,3,4,6])]], //chi
        ['\u03c8', [Braille.BraiToUCS([4,6],[1,3,4,5,6])]], //psi
        ['\u03c9', [Braille.BraiToUCS([4,6],[2,4,5,6])]], //omega
    ]);
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