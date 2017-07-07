import FakeConsole from 'console';
import ConsoleElements from 'element';

export default class HakeConsole {
  constructor() {
    let element = new ConsoleElements(), fake = new FakeConsole(window.console, element.screen);

    window.console = fake;
  }
};
