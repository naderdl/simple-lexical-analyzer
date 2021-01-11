const fs = require('fs');
const symbolTable = JSON.parse(fs.readFileSync('./output.json'));

for (let [index, token] of symbolTable.entries()) {
    if ((token.type == 'keyword') && (token.value == 'let' | token.value == 'var' | token.value == 'const')) {
        let WS_IsAvailable = symbolTable[index + 1].type == 'WS'
        let IdentifierIsAvailable = symbolTable[index + 2].type == 'identifiers'
        if (!WS_IsAvailable || !IdentifierIsAvailable) {
            console.error('this is sematic error for declaring a variable', token, symbolTable[index + 1].type, symbolTable[index + 2].type);
        }
    }

    if ((token.type == 'operators') && (token.value == '+' | token.value == '-')) {
        let WS_IsAvailable = symbolTable[index - 1].type == 'WS' && symbolTable[index + 1].type == 'WS';
        let isLeftOperandValid = symbolTable[index - 2].type == 'number' || symbolTable[index - 2].type == 'identifiers' || symbolTable[index - 2].type == 'keyword';
        let isRightOperandValid = symbolTable[index + 2].type == 'number' || symbolTable[index + 2].type == 'identifiers' || symbolTable[index + 2].type == 'keyword';
        if (!WS_IsAvailable || !isLeftOperandValid || !isRightOperandValid) {
            console.error('this is sematic error for operators', token, symbolTable[index + 2].type, symbolTable[index - 2].type, `isLeftOperandValid: ${isLeftOperandValid}`, `isRightOperandValid: ${isRightOperandValid}`);
        }
    }
}

let leftParentheses = symbolTable.filter(token => token.value == '(');
let rightParentheses = symbolTable.filter(token => token.value == ')');
let leftBraces = symbolTable.filter(token => token.value == '{');
let rightBraces = symbolTable.filter(token => token.value == '}');
let leftBrackets = symbolTable.filter(token => token.value == '[');
let rightBrackets = symbolTable.filter(token => token.value == ']');

if (leftParentheses.length != rightParentheses.length) {
    console.log('there is missing or extra parentheses ()',)
}
if (leftBraces.length != rightBraces.length) {
    console.log('there is missing or extra Braces {}')
}
if (leftBrackets.length != rightBrackets.length) {
    console.log('there is missing or extra Braces []')
}



