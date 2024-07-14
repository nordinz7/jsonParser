// lexer
  // loops thorugh characters
  // generates tokens
//parser
  // generate AST
// transformer

import { Lexer } from "./src/lexer"
import { Parser } from "./src/parser"

const sample  ={"menu": {
  "id": "file",
  "value": "File",
  "popup": {
    "menuitem": [
      {"value": "New", "onclick": "CreateNewDoc()"},
      {"value": "Open", "onclick": "OpenDoc()"},
      {"value": "Close", "onclick": "CloseDoc()"}
    ]
  }
}}

const lexer = new Lexer(JSON.stringify(sample))
console.log('--------lexer',lexer )
// const parser  = new Parser(lexer)