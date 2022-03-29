console.log("1: Start");

const child_process = require("child_process");
const { inherits } = require("util");
const newProcess = child_process.spawn("node", ["./fibonacci.js"], {stdio: "inherit"});

console.log("3: End");
