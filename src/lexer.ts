export type JsonTokenType =  'string' | 'empty' | 'number' | 'boolean' | 'null' | 'object' | 'array' | 'colon' | 'comma' | 'open_brace' | 'close_brace' | 'open_bracket' | 'close_bracket';
export type Opts ={
  generateJsonFile: boolean
}

const fs = require('fs')
export class Token {
  public type: JsonTokenType;
  public value: any;

  constructor(type: JsonTokenType, value: any) {
    this.type = type;
    this.value = value;
  }
}

export class Lexer {
  public tokens: Token[] = [];
  public json: string;
  private position: number;
  private currentChar: string;
  private opts: Opts

  constructor(json: string, opts: Opts ={ generateJsonFile: false}) {
    this.json = json;
    this.opts = opts
    this.position = 0;
    this.currentChar = this.json[this.position];
    this.value()
  }

  private getNext(){
    this.position++
    this.currentChar = this.json[this.position]
  }

   private isNumber(str: string) {
    const regex = /^-?\d+(\.\d+)?$/;  // Regular expression to match integers and floating-point numbers
    return regex.test(str);
  }

  private tokenize() {
      switch (this.currentChar){
        case '{':
          this.tokens.push(new Token('open_brace', this.currentChar))
          break;
        case '}':
          this.tokens.push(new Token('close_brace', this.currentChar))
          break;
        case '[':
          this.tokens.push(new Token('open_bracket', this.currentChar))
          break;
        case ']':
          this.tokens.push(new Token('close_bracket', this.currentChar))
          break;
        case ',':
          this.tokens.push(new Token('comma', this.currentChar))
          break;
        case ':':
            this.tokens.push(new Token('colon', this.currentChar))
            break;
        case '"':
          this.getNext()

          let strVal = ''
          while (this.currentChar !== '"'){
            strVal += this.currentChar
            this.getNext()
          }

          this.tokens.push(new Token('string', strVal))
          break
        case '':
          this.tokens.push(new Token('empty', this.currentChar))
          break
        default:
          const endChar = ['}', ']', ',']
          let nonStrVal = ''
          while (!endChar.includes(this.currentChar)){
            nonStrVal += this.currentChar
            this.getNext()
          }

          if (nonStrVal === 'null'){
            this.tokens.push(new Token('null', nonStrVal))
          } else if ( nonStrVal === 'true' || nonStrVal === 'false'){
            this.tokens.push(new Token('boolean', nonStrVal))
          } else if (this.isNumber(nonStrVal)){
            this.tokens.push(new Token('number', nonStrVal))
          } else {
            return new Error('EOF')
          }

          this.tokenize() // tokenize end char
      }

  }

  private value(){
    while(this.position < this.json.length){
      this.tokenize()
      this.getNext()
    }
    this.opts.generateJsonFile && fs.writeFileSync('tokens.json', JSON.stringify(this.tokens))
  }
}