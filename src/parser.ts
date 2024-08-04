import type { JsonTokenType, Token } from "./lexer";

export class Parser {
  public tokens; position; currentToken; value;

  constructor(tokens: Token[]) {
    this.tokens = tokens
    this.position = 0
    this.currentToken = this.tokens[this.position]
    this.value = this.parse()
  }

  getNext(){
    this.position++
    this.currentToken = this.tokens[this.position]
  }

  parse():any{
    const v = this.currentToken

    switch(v.type){
      case 'boolean':
        return v.value === 'true'
      case 'string':
        return v.value
      case "number":
        return Number(v.value)
      case 'null':
        return null
      case 'open_brace':
        return this.parseObject()
      case 'open_bracket':
        return this.parseArray()
      case 'colon':
      case 'comma':
        this.getNext()
        return this.parse()
      default:
        return 'Invalid'
    }
  }

  parseObject(){
    const obj:any = {}
    this.getNext()

    while(this.currentToken.type !== 'close_brace'){
      const key = this.parse()
      this.getNext()
      const value = this.parse()

      obj[key] = value
      this.getNext()
    }
    return obj
  }

  parseArray(){
    const arr:any = []
    this.getNext()

    while(this.currentToken.type !== 'close_bracket'){
      arr.push(this.parse())
      this.getNext()
    }
    return arr
  }
}