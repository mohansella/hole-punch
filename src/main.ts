
class Main {
    
    public static main() {
        console.log("Hello world");
    }

}

if(require.main == module) {
    Main.main();
}