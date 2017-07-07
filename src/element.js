/**
 * Created by mxz on 2017/7/7.
 */

const ButtonStyle = {
  background: '#65cdef',
  width: '36px',
  height: '36px',
  position: 'absolute',
  bottom: '20px',
  right: '20px',
  lineHeight: '36px',
  color: 'white',
  textAlign: 'center',
  fontSize: '12px'
};
const ScreenStyle = {
  background: '#555',
  width: '80%',
  maxWidth: '400px',
  height: '120px',
  bottom: '60px',
  right: '20px',
  position: 'absolute',
  padding: '6px',
  fontSize: '12px',
  lineHeight: '15px',
  color: '#ddd',
  overflowY: 'scroll',
  border: '14px black solid',
  display: 'none'
};
const InputStyle = {
  background: '#eee',
  width: '120px',
  border: 'none',
  height: '36px',
  position: 'absolute',
  bottom: '20px',
  right: '60px',
  lineHeight: '36px',
  padding: '5px',
  boxSizing: 'border-box',
  display: 'none'
};

function extend(a, b) {
  for(let i in b) {
    a[i] = b[i];
  }
}

export default class ConsoleElements {
  constructor(param) {
    let __this = this;

    this.button = document.createElement('div');
    this.screen = document.createElement('div');
    this.input = document.createElement('input');
    extend(this.button.style, ButtonStyle);
    extend(this.screen.style, ScreenStyle);
    extend(this.input.style, InputStyle);
    this.button.innerHTML = 'Hake';
    document.body.appendChild(this.button);
    document.body.appendChild(this.screen);
    document.body.appendChild(this.input);
    this.button.onclick = ()=>{
      __this.screen.style.display = __this.screen.style.display === 'none' ? '' : 'none';
      __this.input.style.display = __this.input.style.display === 'none' ? '' : 'none';
    };
    this.input.onchange = e => {
      let result;

      try {
        result = Function('return ' + e.target.value)();
      } catch (e) {
        console.error(e);
        return;
      }
      if(result !== undefined) {
        console.log(result);
      }
      e.target.value = '';
    };
  }
}
