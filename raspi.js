const {
  Gpio
} = require('onoff');

class PiSwitch {
  constructor(pin, name, tags) {
    this.pin = pin;
    this.name = name;
    this.tags = tags;
    this.controller = new Gpio(pin, 'out');
  }
  get pin() {
    return this.pin;
  }
  get name() {
    return this.name;
  }
  get tags() {
    return this.tags;
  }
  addTag(value) {
    this.tags.push(value);
  }
  removeTag(value) {
    const i = this.tags.indexOf(value);
    if (i !== -1) {
      this.tags.splice(i, 1);
    }
  }
  clearTags() {
    this.tags = [];
  }
  on() {
    this.controller.writeSync(1);
  }
  off() {
    this.controller.writeSync(0);
  }
  clear() {
    this.controller.unexport();
  }
}

module.exports = PiSwitch;