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
    static Ascii: Map<string, string> = new Map([

    ]);
}