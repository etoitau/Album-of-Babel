import { PicViewer } from "./pic-viewer.class";

/**
 * Tools for formatting and conversion
 */
export class Convert {
    static readonly hexiDecimal: Array<string> = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    static readonly bigBase: Array<string> = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
        ".", "-", "_", "~"];
    static readonly tenArray: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    static maxBig: bigint;

    // hexidecimal to bigBase
    static hexToName(hexDec: string): string {
        return this.bigIntToBase(this.baseToBigInt(hexDec, this.hexiDecimal), this.bigBase);
    }

    // bigBase to hexidecimal
    // length fixed to desired format
    static nameToHex(name: string, len: number) {
        return this.fixLength(this.bigIntToBase(this.baseToBigInt(name, this.bigBase), this.hexiDecimal), len)
    }

    // need to restore leading zeros after conversion from 
    // bigint to hexidecimal to set image from hexidecimal string
    static fixLength(input: string, len: number) {
        if (input.length < len) {
            return "0".repeat(len - input.length) + input;
        } else {
            return String(input);
        }
    }

    // format bigint to display page number to user
    static bigIntShortForm(bi: bigint) {
        let asString = bi.toString();
        if (asString.length < 10) { return asString; }

        return asString.charAt(0) + "." + asString.substr(1, 3) + "..." + 
            asString.substr(asString.length - 3) + " x 10^" + (asString.length - 1);
    }

    // how many pages possible in album?
    static getMax(): bigint {
        if (this.maxBig != null) { return this.maxBig}
        let maxHex = "";
        for (let i = 0; i < PicViewer.DEFAULT_PIC_SIZE**2; i++) {
            maxHex += "ffffff";
        }
        this.maxBig = this.baseToBigInt(maxHex, this.hexiDecimal);
        return this.maxBig;
    }

    // what is current page expressed and formatted as a percent of max?
    static getPercent(bi: bigint) {
        let percent = bi * BigInt(100) / this.getMax() ;
        return percent.toString();
    }

    // convert string in specified base to bigint
    static baseToBigInt(num: string, base: Array<string>) {
        const bBase = BigInt(base.length);
        var bi = BigInt("0");
        var biD;
        for (let d of num) {
            biD = BigInt(base.indexOf(d));
            bi = bBase * bi + biD;
        }
        return bi;
    }

    // convert bigint to string in specified base
    static bigIntToBase(num: bigint, base: Array<string>) {
        const bBase = BigInt(base.length);
        var digits = Array();
        const zero = BigInt("0");
        while (num > zero) {
            let index = Number(num % bBase);
            digits.push(base[index]);
            num = num / bBase;
        }
        return digits.reverse().join("");
    }

    // convert number to string in specified base
    static numberToBase(num: number, base: Array<string>) {
        const bBase = base.length;
        var digits = Array();
        while (num > 0) {
            digits.push(base[num % bBase])
            num = Math.floor(num / bBase);
        }
        return digits.reverse().join("");
    }

}