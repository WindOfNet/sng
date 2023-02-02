#!/usr/bin/env node

import clipboardy from 'clipboardy';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

console.log('enter a template i.g. A01-1122[5]33');

let inp = '';
let start = null;
let count = 0;
do {
  inp = await rl.question('template: ');
  const matches = inp.match(/\[(.*?)\]/g)?.map((m) => m.slice(1, -1)) ?? [];

  if (matches.length !== 1) {
    console.log('invalid value');
    continue;
  }

  if (isNaN(matches[0]) || !Number.isInteger(Number(matches[0]))) {
    console.log('the value in [] should be an integer number');
    continue;
  }

  start = Number(matches[0]);
} while (start === null);

do {
  const inputCount = Number(await rl.question('count: '));
  if (isNaN(inputCount) || !Number.isInteger(inputCount)) {
    console.log('count should be an integer number and > 1');
    continue;
  }

  count = Number(inputCount);
} while (count < 1);

const values = [];
const prefix = inp.substring(0, inp.indexOf('['));
const postfix = inp.substring(inp.indexOf(']') + 1, inp.length);
for (let i = 0; i < count; i++) {
  values.push(`${prefix}${i + start}${postfix}`);
}

const result = values.join('\n');
clipboardy.writeSync(result);
console.log(result);
console.log('↑↑↑ copied! ↑↑↑');
rl.close();
