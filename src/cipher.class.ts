import { Convert } from "./convert.class";

export class Cipher {
    static readonly startKey = "7";
    static readonly hexDecMap = ["2", "6", "a", "3", "b", "0", "c", "4", "1", "f", "d", "5", "e", "7", "8", "9"];
    static seedrandom = require('seedrandom');

    public static cipherToBigInt(hexDec: string): bigint {
        return Convert.baseToBigInt(this.streamIn(this.cbcIn(hexDec)), Convert.hexiDecimal);
    }

    public static cipherFromBigInt(bi: bigint, len: number): string {
        return this.cbcOut(this.streamOut(Convert.fixLength(Convert.bigIntToBase(bi, Convert.hexiDecimal), len)));
    }
    
    public static streamIn(hexDec: string): string {
        const hd = Convert.hexiDecimal;
        const base = hd.length;
        let seed = hd.indexOf(hexDec.charAt(hexDec.length - 2)) * base + 
            hd.indexOf(hexDec.charAt(hexDec.length - 1));
        let rng = this.seedrandom(seed);
        let result = "";
        for (let i = 0; i < hexDec.length - 2; i++) {
            result += hd[(hd.indexOf(hexDec.charAt(i)) + Math.floor(rng.quick() * base)) % base];
        }
        return result + hexDec.substring(hexDec.length - 2);
    }
    
    public static streamOut(hexDec: string): string {
        const hd = Convert.hexiDecimal;
        const base = hd.length;
        let seed = hd.indexOf(hexDec.charAt(hexDec.length - 2)) * base + 
            hd.indexOf(hexDec.charAt(hexDec.length - 1));
        let rng = this.seedrandom(seed);
        let result = "";
        for (let i = 0; i < hexDec.length - 2; i++) {
            result += hd[
                (((hd.indexOf(hexDec.charAt(i)) - Math.floor(rng.quick() * base)) % base) + base) % base
            ];
        }
        return result + hexDec.substring(hexDec.length - 2)
    }
    
    public static cbcIn(hexdec: string): string {
        // while not at end, cipher a block and add to result
        let pos = 0;
        let key = Cipher.startKey;
        
        let ciphered = "";
        while (pos < hexdec.length) {
            key = this.encipher(hexdec.substr(pos, 1), key);
            ciphered = ciphered + key;
            pos++;
        }
        return ciphered
        // return this.reverse(ciphered);
    }

    public static cbcOut(enciphered: string): string {
        let key = Cipher.startKey;
        let pos = 0;
        let plain = "";
        // enciphered = this.reverse(enciphered);
        while (pos < enciphered.length) {
            let block = enciphered.substr(pos, 1);
            plain = plain + this.decipher(block, key);
            key = block;
            pos++;
        }
        return plain;
    }


    static encipher(plain: string, key: string): string {
        // operates on string representation of hexadecimal
        if (plain.length != key.length) {
            console.log("encipher block wrong size");
            return "";
        }
        
        return Cipher.hexDecMap[
            (Convert.hexiDecimal.indexOf(plain) + 
            Convert.hexiDecimal.indexOf(key)) % 
            Cipher.hexDecMap.length];
    }

    static decipher(enciphered: string, key: string): string {
        if (enciphered.length != key.length) {
            console.log("decipher block wrong size");
            return "";
        }
        const mod = Convert.hexiDecimal.length;
        return Convert.hexiDecimal[
            (((Cipher.hexDecMap.indexOf(enciphered) - 
            Convert.hexiDecimal.indexOf(key)) % mod) + mod) % mod]
    }

    static reverse(input: string): string {
        return input.split("").reverse().join("");
    }



}