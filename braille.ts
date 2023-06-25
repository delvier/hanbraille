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
    readonly UEB: Map<string, string[]> = new Map([
        //todo
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
        ['A', [Braille.BraiToUCS([6],[1])]],
        ['B', [Braille.BraiToUCS([6],[1,2])]],
        ['C', [Braille.BraiToUCS([6],[1,4])]],
        ['D', [Braille.BraiToUCS([6],[1,4,5])]],
        ['E', [Braille.BraiToUCS([6],[1,5])]],
        ['F', [Braille.BraiToUCS([6],[1,2,4])]],
        ['G', [Braille.BraiToUCS([6],[1,2,4,5])]],
        ['H', [Braille.BraiToUCS([6],[1,2,5])]],
        ['I', [Braille.BraiToUCS([6],[2,4])]],
        ['J', [Braille.BraiToUCS([6],[2,4,5])]],
        ['K', [Braille.BraiToUCS([6],[1,3])]],
        ['L', [Braille.BraiToUCS([6],[1,2,3])]],
        ['M', [Braille.BraiToUCS([6],[1,3,4])]],
        ['N', [Braille.BraiToUCS([6],[1,3,4,5])]],
        ['O', [Braille.BraiToUCS([6],[1,3,5])]],
        ['P', [Braille.BraiToUCS([6],[1,2,3,4])]],
        ['Q', [Braille.BraiToUCS([6],[1,2,3,4,5])]],
        ['R', [Braille.BraiToUCS([6],[1,2,3,5])]],
        ['S', [Braille.BraiToUCS([6],[2,3,4])]],
        ['T', [Braille.BraiToUCS([6],[2,3,4,5])]],
        ['U', [Braille.BraiToUCS([6],[1,3,6])]],
        ['V', [Braille.BraiToUCS([6],[1,2,3,6])]],
        ['W', [Braille.BraiToUCS([6],[2,4,5,6])]],
        ['X', [Braille.BraiToUCS([6],[1,3,4,6])]],
        ['Y', [Braille.BraiToUCS([6],[1,3,4,5,6])]],
        ['Z', [Braille.BraiToUCS([6],[1,3,5,6])]],
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