Centro Univesitário Católica de Santa Catarina
Helena Felicia de Oliveira Avelino e José Vitor Vegini
5 Fase - Engenharia de Software - Noturno - 2023/1

# Atividade Criptografia-RSA

Objetivo  Para esta tarefa você deve implementar um par de programas para encriptar e decriptar arquivos texto usando o algoritmo de chaves públicas RSA. O objetivo desta tarefa é praticar a programação, implementando um algoritmo criptográfico, de forma a compreender melhor seu funcionamento.

//---------------------------------------------------------------------------------------------

# Relatório - Implementação de Encriptação e Decriptação RSA

Escreva o que deseja no arquivo texto.txt
Ele será criptografado no arquivo criptografado.txt
E será descriptografado no arquivo descriptografado.txt

Para testar utilize os comandos:

npm install big-integer (instale esse pacote)
node encripta.js chave.txt texto.txt criptografado.txt (aqui irá criptografar)
node decripta.js chave.txt criptografado.txt descriptografado.txt (aqui irá drescriptografar)

# Planejamento e Organização do Código:
Em nosso pensamento separar os arquivos de criptografia e descriptografia seria mais organizado, então fizemos 2 arquivos cada um com sua função. 

Encripta
-ler arquivo chave
-ler arquivo de entrada
-pedaço codificado
-Codifica os dados em blocos e criptografa
-Grava pedaços codificados no arquivo de saída

Decripta
-calcular a exponenciação modular
-Ler os nomes dos arquivos de entrada e saída da linha de comando
-Ler os dados do arquivo de chaves
-Ler os grupos criptografados
-Descriptografar os grupos
-Converter os grupos descriptografados de volta para texto
-Escrever o texto descriptografado no arquivo de saída

# Linguagem de Programação:
Utilizamos Node.js pois é uma das que mais nos identificamos e gostamos de trabalhar.

# Problemas Encontrados:
Certa dificuldade apenas para entender a proposta inicial, mas depois ficou mais tranquilo de entender. E tambem quais arquivos utilizar para os testes. Olhando pelo gist ele não está na forma ideal com chave publica e privada mas está funcionando de certa forma.

# Teste:
Para o teste eu criei um arquivo chamado chave.txt onde ficam as chaves para a criptografia, e um arquivo texto.txt para escrever a mensagem a ser criptografada.

#Avalie o projeto: 
No gostamos achamos muito interessante, meio confuso mas bem bacana.

//------------------------------------------------------------------------------------------

# Requisitos

Você deve criar dois programas (na linguagem de programação de sua escolha) distintos e entregar um relatório (detalhes a seguir):
O programa Encripta deve ler um arquivo contendo a chave e um arquivo contendo o dado a ser encriptado. Você deve criptografar os dados usando as chaves e escrever o resultado como uma sequência de inteiros longos a um arquivo de saída.
O programa Decripta  deve ler um arquivo com a chave e um arquivo com números inteiros longos usando as chaves e escrever os dados resultantes em um arquivo de saída.
Ambos os devem ler os nomes dos arquivos a serem utilizados como parâmetros de entrada (linha de comando). Os argumentos devem ser, em ordem:
O nome do arquivo contendo as chaves
O nome do arquivo de entrada
O nome do arquivo de saída
Certifique-se de que seus programas funcionam como especificado. Os argumentos devem ser interpretados da forma que é descrita. As chaves e textos devem ser intercambiáveis entre os programas dos alunos.

# Visão geral do algoritmo RSA

Para usar a criptografia RSA, calculamos três números intimamente relacionados: o módulo n, a chave pública e e a chave privada d. Para calculá-los, você pode criar um terceiro aplicativo, GetKeys.java, usando o algoritmo abaixo (para os números primos, utilize o arquivo primekeys.txt que contém uma série de números primos grandes):

Escolha de forma aleatória dois números primos grandes p e q.
Calcule n = pq
Calcule a função totiente de Euler em: n: T(n) = (p-1)(q-1)
Escolha um inteiro e tal que 1 < e < T(n), de forma que e e T(n) sejam primos entre si.
Calcule d de forma que d = e^-1 mod (T(n))
A chave pública é o par {e, n}, a chave privada {d, n}

Para criptografar uma mensagem de texto, o arquivo inteiro deve ser lido, codificado como base 64 para formar uma string longa, com todo o texto do arquivo. 

Assim que o arquivo tenha sido convertido em uma string única, codificada em base 64, processe-o da seguinte forma: Repetidamente selecione uma parte da string e converta-a em um inteiro longo, que é basicamente a representação binária dessa parte da string. Você pode conferir o arquivo TextChunk que contém código exemplo que pode ser usado para traduzir entre strings de caracteres e sua representação em inteiros longos.

Quão grande esses grupos de texto devem ser, depende do módulo n. O tamanho de cada grupo, representado por um inteiro grande (BigInteger, em java) não deve ser maior que n. 

Assim que o grupo de caracteres foi convertido em um inteiro longo, use o módulo n  e a chave pública e  para calcular a versão criptografada do grupo usando a fórmula:

        encodedChunk = originalChunk^e mod n


(Se você usar a linguagem java, a classe BigInteger tem métodos que são bem úteis para esse cálculo). Cada encodedChunk, que é um inteiro longo deve ser escrito no arquivo de saída em uma linha separada.

Decriptar um arquivo criptografado funciona da mesma forma. Leia uma linha do arquivo contendo a representação decimal e converta-o em um inteiro longo (BigInteger em java). Então use o módulo n e a chave privada d para calcular o valor inteiro do grupo de caracteres original:

        originalChunk = encodedChunk^d mod n


Então converta-o novamente para string (novamente você pode usar o TextChunk.java ou criar os métodos na sua linguagem de escolha., baseado neste arquivo e decodifique usando base 64..

# Formato de arquivos

Seus programas devem processar e gerar arquivos formatados como:
Arquivos de chaves: Devem conter duas linhas com um número inteiro decimal possivelmente longo. A primeira linha deve ser o módulo e a segunda linha deve conter o expoente (a chave pública ou privada).
Arquivo texto plano: Um arquivo de texto contendo o texto descriptografado. No caso do programa Decrypt, ele provavelmente gerará um arquivo de saída com o texto contendo apenas uma linha. Não é um problema.
Arquivo criptografado: Sequências de números inteiros bem grandes. Um por linha
Para ler os dados nos arquivos de chaves e texto criptografado, leia cada linha e construa uma representação "BigInteger" para cada linha.

# Relatório

Você deve entregar um breve relatório para discutir seu programa, suas deciões de projeto e problemas que você encontrou durante o desenvolvimento. O relatório deve conter:
Os nomes da dupla
Planejamento e operação: como você organizou seu código? Que tipos de problemas você encontrou? Que linguagem utilizou e por quê?
Teste: Como você testou seu código? Que tipos de bugs você encontrou? O que funciona e o que não funciona? Há algum problema no código que você não conseguiu resolver?
Avalie o projeto: O que você aprendeu? Valeu a pena? Você pode incluir coisas que você aprendeu sobre a linguagem que escolheu, problemas do projeto, criptografia, etc.

# Entrega

A entrega se dará através de um repositório no github. Seu relatório pode ser entregue como o arquivo README.md do repositório.
