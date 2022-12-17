"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// const path = require('path');
const app = (0, express_1.default)();
// Works in `build`
// app.use(express.static(path.join(__dirname, 'frontend')));
// app.get('/', function (_, res) {
//   res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
// });
app.get('/api/get', (_, res) => {
    res.send('Send some text back!');
});
const port = 8080;
app.listen(port);
