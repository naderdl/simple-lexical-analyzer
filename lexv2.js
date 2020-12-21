const fs = require("fs");
const file = fs.readFileSync("./bubbleSort.js").toString();
const moo = require('moo');
var asTable = require ('as-table').configure ({ delimiter: ' | ' });


let lexer = moo.compile({
    WS: /[ \t]+/,
    number: /0|[1-9][0-9]*/,
    specialChars: /[$()_~`{}\[\]:;?,.]/,
    operators: /(?:\+){1,2}|(?:-){1,2}|(?:=)|(?:\/)|(?:%)|(?:<)|(?:>)|(?:!)|(?:&)|(?:\|)/,
    keyword: [
        "break",
        "case",
        "catch",
        "continue",
        "debugger",
        "default",
        "delete",
        "do",
        "else",
        "finally",
        "for",
        "function",
        "if",
        "instanceof",
        "new",
        "return",
        "switch",
        "this",
        "throw",
        "try",
        "typeof",
        "var",
        "void",
        "while",
        "with",
        'let',
        'log',
        'length',
        'false',
        'true',
        'console',
        'log'
    ],
    identifiers: ['bubbleSort','swap','inputArray','i','n','x','temp'],
    NL: { match: /\n/, lineBreaks: true },
})
let output = []
lexer.reset(file)
for (let here of lexer) {
    delete here.toString
    output.push(here)
}
console.log(asTable(output))
fs.writeFileSync('./output.json',JSON.stringify(output, undefined, 4))