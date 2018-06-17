const {
  Gpio
} = require('onoff');

const config = require('./pi.config');

/* Wrapper Class for creating custom switches */
class PiSwitch {
  constructor(pin, name, tags) {
    this.pin = pin; // The RASPI GPIO Pin number - based on the connection
    this.name = name; // Unique identifier for the device
    this.tags = tags; // Used to group similar devices together - for turning off all fans, lights etc.
    this.controller = new Gpio(pin, 'out');
  }
  /**
   * Accessor for pin number of a given switch
   */
  get pin() {
    return this.pin;
  }
  /**
   * Accessor for name of a given switch
   */
  get name() {
    return this.name;
  }
  /**
   * Accessor for tags for a given switch
   */
  get tags() {
    return this.tags;
  }
  /**
   * Add new tags to a device
   * @param  {string} value
   */
  addTag(value) {
    this.tags.push(value);
  }
  /**
   * Remove existing tags from a device
   * @param  {string} value
   */
  removeTag(value) {
    const i = this.tags.indexOf(value);
    if (i !== -1) {
      this.tags.splice(i, 1);
    }
  }
  /**
   * Reset all tags from the device
   */
  clearTags() {
    this.tags = [];
  }
  /**
   * Turn ON a switch
   */
  on() {
    this.controller.writeSync(1);
  }
  /**
   * Turn OFF a switch
   */
  off() {
    this.controller.writeSync(0);
  }
  /**
   * Toggle state of a switch
   */
  toggle() {
    const val = this.controller.readSync() === 0 ? 1 : 0;
    this.controller.writeSync(val);
  }
  /**
   * Reset the switch
   */
  clear() {
    this.controller.unexport();
  }
}

/**
 * Initial code to create controllers based on user-config file.
 * Name and Tags meta info is used for look-up and parsing user-intent
 */
function bootstrap() {
  return config.reduce((meta, switchConfig) => {
    // TODO : Use a validator to make sure that the config is set in the correct format
    meta.switchBoard.push(new PiSwitch(switchConfig.values()));
    meta.names.push(switchConfig.name);
    meta.tags.push(...switchConfig.tags);
    return meta;
  }, {
    names: [],
    tags: [],
    switchBoard: []
  })
}

module.exports = {
  PiSwitch,
  bootstrap
};