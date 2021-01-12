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
    string: /"(?:.*?)"/
})
let output = []
lexer.reset(file)

for (let here of lexer) {
    delete here.toString
    output.push(here)
}

console.log(asTable(output))
fs.writeFileSync('./output.json',JSON.stringify(output, undefined, 4))

console.log('symantec checking ...')

for (let [index, token] of output.entries()) {
    if ((token.type == 'keyword') && (token.value == 'let' || token.value == 'var' || token.value == 'const')) {
        let WS_IsAvailable = output[index + 1].type == 'WS'
        let IdentifierIsAvailable = output[index + 2].type == 'identifiers'
        if (!WS_IsAvailable || !IdentifierIsAvailable) {
            console.error('this is sematic error for declaring a variable', token, output[index + 1].type, output[index + 2].type);
        }
    }

    if ((token.type == 'operators') && (token.value == '+' | token.value == '-')) {
        let WS_IsAvailable = output[index - 1].type == 'WS' && output[index + 1].type == 'WS';
        let isLeftOperandValid = output[index - 2].type == 'number' || output[index - 2].type == 'identifiers' || output[index - 2].value == 'length';
        let isRightOperandValid = output[index + 2].type == 'number' || output[index + 2].type == 'identifiers' || output[index + 2].value == 'length';
        if (!WS_IsAvailable || !isLeftOperandValid || !isRightOperandValid) {
            console.error('this is sematic error for operators', token, output[index + 2].type, output[index - 2].type, `isLeftOperandValid: ${isLeftOperandValid}`, `isRightOperandValid: ${isRightOperandValid}`);
        }
    }
}

let leftParentheses = output.filter(token => token.value == '(');
let rightParentheses = output.filter(token => token.value == ')');
let leftBraces = output.filter(token => token.value == '{');
let rightBraces = output.filter(token => token.value == '}');
let leftBrackets = output.filter(token => token.value == '[');
let rightBrackets = output.filter(token => token.value == ']');

if (leftParentheses.length != rightParentheses.length) {
    console.log('there is missing or extra parentheses ()',)
}
if (leftBraces.length != rightBraces.length) {
    console.log('there is missing or extra Braces {}')
}
if (leftBrackets.length != rightBrackets.length) {
    console.log('there is missing or extra Braces []')
}
