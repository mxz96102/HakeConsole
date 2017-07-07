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
  textAlign: 'center'
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
    extend(this.button.style, ButtonStyle);
    extend(this.screen.style, ScreenStyle);
    this.button.innerHTML = 'Hake';
    document.body.appendChild(this.button);
    document.body.appendChild(this.screen);
    this.button.onclick = ()=>{
      __this.screen.style.display = __this.screen.style.display === 'none' ? '' : 'none';
    };
  }
}
