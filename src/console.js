/**
 * Created by mxz on 2017/7/5.
 */
const BLANK_SPACE = '&nbsp;';

function __toString(target, isDeep) {
  let str = '';

  switch (typeof target) {
    case 'object':
      if(target === null) {
        return 'null';
      }
      str = '{<br />';
      if (!isDeep) {
        for (let key in target) {
          str += BLANK_SPACE + BLANK_SPACE;
          if (target[key] !== target) {
            str += key + ': ' + __toString(target[key], true) + '<br />';
          } else {
            str += key + ': ' + '[itself]' + '<br />';
          }
        }
      } else return target.name || 'Object';
      str += '}';
      return str;
    case 'number':
    case 'string':
    case 'boolean':
    case 'undefined':
      return target + '';
    case 'array':
      str += '[ ';
      for (let key in target) {
        str += (JSON.stringify(target[key]) || __toString(target[key])) + ' ,';
      }
      str[str.length - 1] = ']';
      return str;
    case 'function':
      return 'function ' + target.name + '';
  }
  return '';
}

let num = 0;

export default class FakeConsole {
  constructor(realConsole, injectElement) {
    this.real = realConsole;
    this.injectElement = injectElement;
  }

  __out(type, content, num) {
    this.injectElement.innerHTML += ` [${type}] ${num} :<br/> ${content} <br />` ;
    this.injectElement.scrollTop = this.injectElement.scrollHeight;
  }
  assert() {}
  clear() {}
  debug() {}
  error() {
    for (let i = 0; i < arguments.length; i++) {
      this.__out('log', __toString(arguments[i]), ++num);
    }
    try{
      this.real.error.call(arguments);
    } catch (e) {
      this.real.log(e);
    }
  }
  group() {}
  groupCollapsed() {}
  info() {}
  log() {
    for (let i = 0; i < arguments.length; i++) {
      this.__out('log', __toString(arguments[i]), ++num);
    }
    try{
      this.real.log.call(arguments);
    } catch (e) {
      this.real.log(e);
    }
  }
  time() {}
  timeEnd() {}
  trace() {}
  warn() {
    for (let i = 0; i < arguments.length; i++) {
      this.__out('log', __toString(arguments[i]), ++num);
    }
    try{
      this.real.warn.call(arguments);
    } catch (e) {
      this.real.log(e);
    }
  }
}
