
const fs = require("fs");
const file = fs.readFileSync("./bubbleSort.js").toString();
console.log(file)
const natural = require("natural");
var asTable = require ('as-table').configure ({ maxTotalWidth: 25, delimiter: ' | ' });

const tokenizer = new natural.WordPunctTokenizer();

let fileTokens = tokenizer.tokenize(file);

let output = [];

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

let identifiers = /[a-zA-Z_]*[a-zA-Z0-9]+/g;

let operators = [
    '+',
    '++',
    '-',
    '--',
    '=',
    '/',
    '%',
    '<',
    '>',
    '!',
    '&',
    '|'
]

let numerals = /^(\d+)$/g;

let specialChars = [
    '[',
    ']',
    '(',
    ')',
    '{',
    '}',
    '_',
    '~',
    ':',
    ';',
    ',',
    '.'
];

let whiteSpace = /\n/;

fs.writeFileSync('./tokes.json', fileTokens.toString());

fileTokens.forEach((token) => {
    if (keywords.includes(token)) {
        output.push({
            token, type:"Keyword"
        });
    } else if (identifiers.test(token)) {
        output.push({
            token, type:"Identifier"
        });
    } else if (operators.includes(token)) {
        output.push({
            token, type:"Operators"
        });
    } else if (numerals.test(token)) {
        output.push({
            token, type:"Numerals"
        });
    } else if (specialChars.includes(token)) {
        output.push({
            token, type:"SpecialChar"
        });
    } else if (whiteSpace.test(token)) {
        output.push({
            token: "\n", type:"whiteSpace"
        });
    } else {
        output.push({
            token: "\n", type:"token"
        });
    };
});

console.log(asTable(output))
