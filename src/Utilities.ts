export class Utilities {

    //disabling external object creation
    private constructor() {

    }

    public static getRandomInt32() {
        return Math.floor(Math.random() * Math.pow(2, 32))
    }

    public static getRandomInt128() {
        let toReturn = Buffer.alloc(16)
        toReturn.writeUInt32BE(Utilities.getRandomInt32())
        toReturn.writeUInt32BE(Utilities.getRandomInt32(), 4)
        toReturn.writeUInt32BE(Utilities.getRandomInt32(), 8)
        toReturn.writeUInt32BE(Utilities.getRandomInt32(), 12)
        return toReturn
    }

    public static toDashedString(buffer: Buffer) {
        let toReturn: String[] = []
        buffer.forEach((val, index) => {
            toReturn.push(this.toHex((val & 0xF0) >> 4))
            toReturn.push(this.toHex(val & 0xF))
            if(index % 4 == 3 && index + 1 != buffer.length) {
                toReturn.push('-')
            }
        }, this)
        return toReturn.join('')
    }

    private static toHex(num: number) {
        switch(num) {
            case 0: return "0"
            case 1: return "1"
            case 2: return "2"
            case 3: return "3"
            case 4: return "4"
            case 5: return "5"
            case 6: return "6"
            case 7: return "7"
            case 8: return "8"
            case 9: return "9"
            case 10: return "a"
            case 11: return "b"
            case 12: return "c"
            case 13: return "d"
            case 14: return "e"
            case 15: return "f"
            default:
                throw Error(`unexpected argument:${num} toHex`)
        }
    }

}