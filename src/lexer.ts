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

  transform(json: string) {
    for (let c=0; c<json.length;c++){
      const character = json[c]
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
          return new Error('EOF')
      }
    }
  }

}