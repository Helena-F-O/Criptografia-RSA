const fs = require('fs');
const BigInteger = require('big-integer');

// Função para calcular a exponenciação modular
function modPow(base, exponent, modulus) {
  let result = BigInteger(1);
  while (exponent > 0) {
    if (exponent % 2 === 1) {
      result = result.multiply(base).mod(modulus);
    }
    base = base.square().mod(modulus);
    exponent = Math.floor(exponent / 2);
  }
  return result;
}

// Ler os nomes dos arquivos de entrada e saída da linha de comando
const [, , chaveFile, criptografadoFile, descriptografadoFile] = process.argv;

// Ler os dados do arquivo de chaves
const chaveData = fs.readFileSync(chaveFile, 'utf8').trim().split('\n');
const n = BigInteger(chaveData[0]);
const d = BigInteger(chaveData[1]);

// Ler os grupos criptografados
const gruposCriptografados = fs.readFileSync(criptografadoFile, 'utf8').trim().split('\n');

// Descriptografar os grupos
const gruposDescriptografados = [];
for (let i = 0; i < gruposCriptografados.length; i++) {
  const grupoCriptografado = BigInteger(gruposCriptografados[i]);
  const grupoDescriptografado = modPow(grupoCriptografado, d, n);
  gruposDescriptografados.push(grupoDescriptografado);
}

// Converter os grupos descriptografados de volta para texto
const textoBinario = gruposDescriptografados.map(grupo => grupo.toString(2)).join('');
const texto = Buffer.from(textoBinario, 'binary').toString('utf8');

// Escrever o texto descriptografado no arquivo de saída
fs.writeFileSync(descriptografadoFile, texto);
