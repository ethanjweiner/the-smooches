"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path = require('path');
const app = (0, express_1.default)();
// Works in `build`
app.use(express_1.default.static(path.join(__dirname, 'frontend')));
app.get('/', function (_, res) {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});
app.get('/api/test', (_, res) => {
    res.send('some text!');
});
const port = 8080;
app.listen(port);
