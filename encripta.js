const fs = require('fs');
const { BigInteger } = require('jsbn');

function readKeyFile(keyFile) {
  const data = fs.readFileSync(keyFile, 'utf8').split('\n');
  const n = new BigInteger(data[0]);
  const e = new BigInteger(data[1]);
  return { n, e };
}

function readInputFile(inputFile) {
  return fs.readFileSync(inputFile, 'utf8');
}

function encodeChunk(chunk, n, e) {
  const chunkInt = new BigInteger(Buffer.from(chunk, 'utf8').toString('hex'), 16);
  const encodedChunk = chunkInt.modPow(e, n);
  return encodedChunk.toString();
}

function encrypt(inputFile, keyFile, outputFile) {
  const { n, e } = readKeyFile(keyFile);
  const data = readInputFile(inputFile);
  const encodedChunks = [];

  // Codifica os dados em blocos e criptografa
  for (let i = 0; i < data.length; i += 64) {
    const chunk = data.slice(i, i + 64);
    const encodedChunk = encodeChunk(chunk, n, e);
    encodedChunks.push(encodedChunk);
  }

  // Grava pedaços codificados no arquivo de saída
  fs.writeFileSync(outputFile, encodedChunks.join('\n'));
}

// COMANDO DE TESTE: node encripta.js chave.txt texto.txt criptografado.txt
encrypt('texto.txt', 'chave.txt', 'criptografado.txt');
