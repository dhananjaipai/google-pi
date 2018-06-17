const express = require('express');
const {
    bootstrap
} = require('./raspi');

const app = express();
const meta = bootstrap();

app.get('/:speechInput', (req, res) => {
    // TODO: Parse user-intent (Expected format : "OK Google, Tell GooglePi {turn on, turn off, toggle} {name,tag} after? {time seconds/minutes/hours?}". Add support for realtive time using a node scheduler to run jobs.
});

module.exports = app;