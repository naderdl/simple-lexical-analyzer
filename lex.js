
const fs = require("fs");
const file = fs.readFileSync("./bubbleSort.js").toString();
const natural = require("natural");
const tokenizer = new natural.WordPunctTokenizer();

let fileTokens = tokenizer.tokenize(file);

let keywords = [
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
    "in",
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
    'true',
    'log',
];

let identifiers = /[a-zA-Z_]+[a-zA-Z0-9_]+/g;

let operators = /(\+){1,2}|(-){1,2}|(=)|(\/)|(%)|(<)|(>)|(!)|(&)|(\|)/g;

let numerals = /^(\d+)$/g;

let specialChars = /[$()_~`{}\[\]:;?,]/g;

fs.writeFileSync('./tokes.json',fileTokens.toString());

fileTokens.forEach((token) => {
    if (keywords.includes(token)) {
        console.log(token, "Keyword");
    } else if (identifiers.test(token)) {
        console.log(token, "Identifier");
    } else if (operators.test(token)) {
        console.log(token, "Operators");
    } else if (numerals.test(token)) {
        console.log(token, "Numerals");
    } else if (specialChars.test(token)) {
        console.log(token, "SpecialChar");
    }
    else {
      console.log('token',token.toString())
    };
});
