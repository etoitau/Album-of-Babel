import { PicViewer } from "./pic-viewer.class";

export class Convert {
    static readonly hexiDecimal: Array<string> = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    static readonly bigBase: Array<string> = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
        ".", "-", "_", "~"];
    // static readonly vigArray: Array<number> = [97, 7, 11, 29, 13, 83, 61, 31, 2, 19];
    static readonly tenArray: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    // static readonly primes: Array<number> = [607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709]; // 17
    // static readonly primeMod = Convert.primes.length;

    static maxBig: bigint;

    static hexToName(hexDec: string): string {
        return this.bigIntToBase(this.baseToBigInt(hexDec, this.hexiDecimal), this.bigBase);
    }

    static nameToHex(name: string, len: number) {
        return this.fixLength(this.bigIntToBase(this.baseToBigInt(name, this.bigBase), this.hexiDecimal), len)
    }

    static fixLength(input: string, len: number) {
        // add leading zeros
        if (input.length < len) {
            return "0".repeat(len - input.length) + input;
        } else {
            return String(input);
        }
    }

    static bigIntShortForm(bi: bigint) {
        let asString = bi.toString();
        if (asString.length < 10) { return asString; }

        return asString.charAt(0) + "." + asString.substr(1, 3) + "..." + 
            asString.substr(asString.length - 3) + " x 10^" + (asString.length - 1);
    }

    static getMax(): bigint {
        if (this.maxBig != null) { return this.maxBig}
        let maxHex = "";
        for (let i = 0; i < PicViewer.DEFAULT_PIC_SIZE**2; i++) {
            maxHex += "ffffff";
        }
        this.maxBig = this.baseToBigInt(maxHex, this.hexiDecimal);
        return this.maxBig;
    }

    static getPercent(bi: bigint) {
        let percent = bi * BigInt(100) / this.getMax() ;
        return percent.toString();
    }

    // get hex string
    // sum digits to get prime
    // use prime to shuffle
    // run modified vigenere on hex
    // convert to bigint

    // convert bigint to hex
    // undo vig cipher
    // sum to get prime
    // use prime to unshuffle

    // static hexToBigInt(hex: string) {
    //     return this.baseToBigInt(this.cipher(this.shuffleHexString(hex)), this.hexiDecimal);
    // }

    // static bigIntToHex(bi: bigint, size: number) {
    //     return this.unShuffleHexString(this.decipher(this.fixLength(this.bigIntToBase(bi, this.hexiDecimal), size)));
    // }

    // static shuffleHexString(hex: string) {
    //     // console.log("shuffle in: " + hex);
    //     let prime = this.hexPrimeSum(hex);
    //     let stringOut = "";
    //     for (let i = 0; i < hex.length; i++) {
    //         let index = (i * prime) % hex.length;
    //         // console.log(index);
    //         stringOut = stringOut + hex.charAt(index);
    //     }
    //     // console.log("shuffle out: " + stringOut);
    //     return stringOut;
    // }

    // static unShuffleHexString(hex: string) {
    //     let prime = this.hexPrimeSum(hex);
    //     let asStringArray = hex.split("");
    //     let stringOutArray = Array(asStringArray.length);
    //     for (let i = 0; i < asStringArray.length; i++) {
    //         stringOutArray[i * prime % stringOutArray.length] = asStringArray[i];
    //     }
    //     return stringOutArray.join("");
    // }

    // static hexPrimeSum(num: string) {
    //     let index = 0;
    //     for (let c of num) {
    //         index = (index + this.hexiDecimal.indexOf(c)) % this.primes.length;
    //     }
    //     return this.primes[index];
    // }

    // // not used
    // static primeSum(num: bigint) {
    //     let index = 0;
    //     let asString = num.toString();
    //     for (let c of asString) {
    //         index = (index + Number(c)) % this.primes.length;
    //     }
    //     return this.primes[index];
    // }

    // static cipher(hexString: string) {
    //     // simple Vigenère cipher
    //     // hex string in and hex string out
    //     let stringOut = "";
    //     for (let i = 0; i < hexString.length; i++) {
    //         let startValue = this.hexiDecimal.indexOf(hexString.charAt(i));
    //         let toAdd = this.vigArray[i % this.vigArray.length];
    //         let endValue = this.hexiDecimal[(startValue + toAdd) % this.hexiDecimal.length];
    //         stringOut = stringOut + endValue;
    //     }
    //     return stringOut;
    // }

    // static decipher(hexString: string) {
    
    //     let stringOut = "";
    //     for (let i = 0; i < hexString.length; i++) {
    //         let startValue = this.hexiDecimal.indexOf(hexString.charAt(i));
    //         let toSub = this.vigArray[i % this.vigArray.length];
    //         let index = (((startValue - toSub) % this.hexiDecimal.length) + this.hexiDecimal.length) % this.hexiDecimal.length;
    //         let endValue = this.hexiDecimal[index];
    //         stringOut = stringOut + endValue;
    //     }
    //     return stringOut;
    // }
    
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