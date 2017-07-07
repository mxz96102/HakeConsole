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

let num = 0, __prefix = 1, timeSpace = {};

export default class FakeConsole {
  constructor(realConsole, injectElement) {
    this.real = realConsole;
    this.injectElement = injectElement;
  }

  __out(type, content, num) {
    let prefix = BLANK_SPACE.repeat(__prefix * 2 - 2);

    this.injectElement.innerHTML += `${prefix}[${type}] ${num} :<br/> ${content} <br />` ;
    this.injectElement.scrollTop = this.injectElement.scrollHeight;
  }
  assert() {
    if(!arguments[0]) {
      let call = [];

      for (let i = 0; i < arguments.length; i++) {
        call.push(arguments[i]);
      }
      this.error.apply(this, call);
    }
  }
  clear() {
    this.injectElement.innerHTML = '';
  }
  debug() {
    this.log.apply(this, arguments);
  }
  error() {
    for (let i = 0; i < arguments.length; i++) {
      this.__out('xerrorx', __toString(arguments[i]), ++num);
    }
    try{
      this.real.error.apply(window, arguments);
    } catch (e) {
      this.real.log(e);
    }
  }
  group() {
    __prefix = __prefix > 6 ? 5 : __prefix + 1;
    this.log.apply(this, arguments);
  }
  groupCollapsed() {
    this.group.apply(this, arguments);
  }
  groupEnd() {
    __prefix = __prefix - 1 || 0;
    this.log.apply(this, arguments);
  }
  info() {
    this.log.apply(this, arguments);
  }
  log() {
    for (let i = 0; i < arguments.length; i++) {
      this.__out('log', __toString(arguments[i]), ++num);
    }
    try{
      this.real.log.apply(window, arguments);
    } catch (e) {
      this.real.log(e);
    }
  }
  time() {
    try{
      timeSpace[arguments[0]] = (new Date()).getTime();
    } catch (e) {
      this.real.log(e);
    }
  }
  timeEnd() {
    let end = (new Date()).getTime();

    try{
      this.__out('time', (end - timeSpace[arguments[0]]) + 'ms', ++num);
    } catch (e) {
      this.real.log(e);
    }
  }
  trace() {
    this.real.trace.apply(window, arguments);
  }
  warn() {
    for (let i = 0; i < arguments.length; i++) {
      this.__out('!warn!', __toString(arguments[i]), ++num);
    }
    try{
      this.real.warn.apply(window, arguments);
    } catch (e) {
      this.real.log(e);
    }
  }
}
