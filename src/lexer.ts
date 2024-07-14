export type JsonTokenType =  'string' | 'number' | 'boolean' | 'null' | 'object' | 'array' | 'colon' | 'comma' | 'open_brace' | 'close_brace' | 'open_bracket' | 'close_bracket';


class Token {
  public type: JsonTokenType;
  public value: any;

  constructor(type: JsonTokenType, value: any) {
    this.type = type;
    this.value = value;
  }
}

export class Lexer {
  public json: string;
  public tokens: Token[] = [];

  constructor(json: string) {
    this.json = json;
    this.transform(json);
  }

   isNumber(str: string) {
    const regex = /^-?\d+(\.\d+)?$/;  // Regular expression to match integers and floating-point numbers
    return regex.test(str);
}

  transform(json: string) {
    for (let c=0; c<json.length;c++){
      const character = json[c]
      console.log('--------character', character)
      switch (character){
        case '{':
          this.tokens.push(new Token('open_brace', character))
          break;
        case '}':
          this.tokens.push(new Token('close_brace', character))
          break;
        case '[':
          this.tokens.push(new Token('open_bracket', character))
          break;
        case ']':
          this.tokens.push(new Token('close_bracket', character))
          break;
        case ',':
          this.tokens.push(new Token('comma', character))
          break;
        case ':':
            this.tokens.push(new Token('colon', character))
            break;
        case '"':
          let j = c
          j++
          let strVal = ''
          while (json[j] !== '"'){
            strVal += json[j]
            j++
          }
          this.tokens.push(new Token('string', strVal))
          c =j
          break;
        default:
          let k = c
          let nonStrVal = ''
          const endChar = [']','}',',']
          while (!endChar.includes(json[k])){
            nonStrVal += json[k]
            k++
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
          c =k
      }
    }
  }

}