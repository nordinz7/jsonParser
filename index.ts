import { Lexer } from "./src/lexer"
import { Parser } from "./src/parser"

const sample  ={
  "string": "Hello, World!",
  "number": 12345,
  "float": 123.45,
  "boolean": true,
  "null": null,
  "array": [1, "two", 3.0, false, null],
  "object": {
    "nestedString": "Nested Hello",
    "nestedNumber": 67890,
    "nestedArray": ["nested", 456, true],
    "nestedObject": {
      "deepNestedString": "Deep Nested Hello"
    }
  },
  "date": "2024-07-14T12:34:56Z",
  "binary": "SGVsbG8sIFdvcmxkIQ==",
  "list_of_objects": [
    {
      "id": 1,
      "name": "Item 1"
    },
    {
      "id": 2,
      "name": "Item 2"
    }
  ]
}


const lexer = new Lexer(JSON.stringify(sample), {generateJsonFile: true})
const parser = new Parser(lexer.tokens)
console.log('--------p',parser.value )