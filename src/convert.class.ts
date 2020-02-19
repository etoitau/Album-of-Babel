import { PicViewer } from "./pic-viewer.class";

export class Convert {
    static readonly hexiDecimal: Array<string> = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
    static readonly bigBase: Array<string> = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
        ".", "-", "_", "~"];
    static readonly vigArray: Array<number> = [6, 2, 8, 3, 1, 8, 5, 3, 0, 7];
    static readonly tenArray: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    static readonly primes: Array<number> = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];

    static maxBig: bigint;

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
    // convert to bigint

    // convert bigint to hex
    // sum to get prime
    // use prime to unshuffle

    static shuffleHexString(hex: string) {
        let prime = this.hexPrimeSum(hex);
        let stringOut = "";
        for (let i = 0; i < hex.length; i++) {
            stringOut = stringOut + hex.charAt((i * prime) % hex.length);
        }
        return stringOut;
    }

    static unShuffleHexString(hex: string) {
        let prime = this.hexPrimeSum(hex);
        let asStringArray = hex.split("");
        let stringOutArray = Array(asStringArray.length);
        for (let i = 0; i < asStringArray.length; i++) {
            stringOutArray[i * prime % stringOutArray.length] = asStringArray[i];
        }
        return stringOutArray.join("");
    }

    static hexPrimeSum(num: string) {
        let index = 0;
        for (let c of num) {
            index = (index + this.hexiDecimal.indexOf(c)) % this.primes.length;
        }
        return this.primes[index];
    }

    // not used
    static primeSum(num: bigint) {
        let index = 0;
        let asString = num.toString();
        for (let c of asString) {
            index = (index + Number(c)) % this.primes.length;
        }
        return this.primes[index];
    }

    // not used
    static cipher(num: bigint) {
        // simple Vigenère cipher
        let stringIn = num.toString();
        let stringOut = "";
        for (let i = 0; i < stringIn.length; i++) {
            stringOut = stringOut + 
                ((Number(stringIn.charAt(i)) + this.vigArray[i % this.vigArray.length]) % 10);
        }
        return BigInt(stringOut);
    }

    // not used
    static decipher(num: bigint) {
        let stringIn = num.toString();
        console.log(stringIn);
        let stringOut = "";
        for (let i = 0; i < stringIn.length; i++) {
            stringOut = stringOut + 
                ((Number(stringIn.charAt(i)) + 10 - this.vigArray[i % this.vigArray.length]) % 10);
        }
        return BigInt(stringOut);
    }
    
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
        console.log("doing a convert")
        const bBase = base.length;
        var digits = Array();
        while (num > 0) {
            digits.push(base[num % bBase])
            num = Math.floor(num / bBase);
        }
        return digits.reverse().join("");
    }

}