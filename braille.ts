export class Braille {
    static BraiToUCS(...lists: number[][]): string {
        let o: string = ""
        for (let i of lists) {
            o += this.DotsToUni(...i);
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
            [...this.DotsToUni(...i)].forEach((e) => {
                o += this.Ascii.get(e);
            });
        }
        return o;
    }
    static BraiUCSToASCII(i: string): string {
        let o: string = ""
        for (let j of [...i]) {
            o += this.Ascii.get(j);
        }
        return o;
    }
    static UEB: Map<string, string[]> = new Map([
        //todo
        ['0', [this.DotsToUni(2,4,5)]],
        ['1', [this.DotsToUni(1)]],
        ['2', [this.DotsToUni(1,2)]],
        ['3', [this.DotsToUni(1,4)]],
        ['4', [this.DotsToUni(1,4,5)]],
        ['5', [this.DotsToUni(1,5)]],
        ['6', [this.DotsToUni(1,2,4)]],
        ['7', [this.DotsToUni(1,2,4,5)]],
        ['8', [this.DotsToUni(1,2,5)]],
        ['9', [this.DotsToUni(2,5)]],
    ]);
    static Ascii: Map<string, string> = new Map([
        [this.DotsToUni(), ' '],
        [this.DotsToUni(2,3,4,6), '!'],
        [this.DotsToUni(5), '"'],
        [this.DotsToUni(3,4,5,6), '#'],
        [this.DotsToUni(1,2,4,6), '$'],
        [this.DotsToUni(1,4,6), '%'],
        [this.DotsToUni(1,2,3,4,5,6), '&'],
        [this.DotsToUni(3), "'"],
        [this.DotsToUni(1,2,3,5,6), '('],
        [this.DotsToUni(2,3,4,5,6), ')'],
        [this.DotsToUni(1,6), '*'],
        [this.DotsToUni(3,4,6), '+'],
        [this.DotsToUni(6), ','],
        [this.DotsToUni(3,6), '-'],
        [this.DotsToUni(4,6), '.'],
        [this.DotsToUni(3,4), '/'],
        [this.DotsToUni(3,5,6), '0'],
        [this.DotsToUni(2), '1'],
        [this.DotsToUni(2,3), '2'],
        [this.DotsToUni(2,5), '3'],
        [this.DotsToUni(2,5,6), '4'],
        [this.DotsToUni(2,6), '5'],
        [this.DotsToUni(2,3,5), '6'],
        [this.DotsToUni(2,3,4,5), '7'],
        [this.DotsToUni(2,3,6), '8'],
        [this.DotsToUni(3,5), '9'],
        [this.DotsToUni(1,5,6), ':'],
        [this.DotsToUni(5,6), ';'],
        [this.DotsToUni(1,2,6), '<'],
        [this.DotsToUni(1,2,3,4,5,6), '='],
        [this.DotsToUni(3,4,5), '>'],
        [this.DotsToUni(1,4,5,6), '?'],
        [this.DotsToUni(4), '@'],
        [this.DotsToUni(1), 'A'],
        [this.DotsToUni(1,2), 'B'],
        [this.DotsToUni(1,4), 'C'],
        [this.DotsToUni(1,4,5), 'D'],
        [this.DotsToUni(1,5), 'E'],
        [this.DotsToUni(1,2,4), 'F'],
        [this.DotsToUni(1,2,4,5), 'G'],
        [this.DotsToUni(1,2,5), 'H'],
        [this.DotsToUni(2,4), 'I'],
        [this.DotsToUni(2,4,5), 'J'],
        [this.DotsToUni(1,3), 'K'],
        [this.DotsToUni(1,2,3), 'L'],
        [this.DotsToUni(1,3,4), 'M'],
        [this.DotsToUni(1,3,4,5), 'N'],
        [this.DotsToUni(1,3,5), 'O'],
        [this.DotsToUni(1,2,3,4), 'P'],
        [this.DotsToUni(1,2,3,4,5), 'Q'],
        [this.DotsToUni(1,2,3,5), 'R'],
        [this.DotsToUni(2,3,4), 'S'],
        [this.DotsToUni(2,3,4,5), 'T'],
        [this.DotsToUni(1,3,6), 'U'],
        [this.DotsToUni(1,2,3,6), 'V'],
        [this.DotsToUni(2,4,5,6), 'W'],
        [this.DotsToUni(1,3,4,6), 'X'],
        [this.DotsToUni(1,3,4,5,6), 'Y'],
        [this.DotsToUni(1,3,5,6), 'Z'],
        [this.DotsToUni(2,4,6), '['],
        [this.DotsToUni(1,2,5,6), '\\'],
        [this.DotsToUni(1,2,4,5,6), ']'],
        [this.DotsToUni(4,5), '^'],
        [this.DotsToUni(4,5,6), '_']
    ]);
}