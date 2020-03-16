## Guia para a execução da aplicação

### Introdução

A API proposta foi desenvolvida em NodeJs utilizando Express.
Para a montagem de queries e criação de migrations foi utilizada a dependencia Knex.
Para facilitar o processo de importação de arquivos dentro da API foi utilizada a dependencia Consign.
As dependencias MySql e MySql2 são requisitos para o correto funcionamento do Knex.


### Instruções

_É estritamente necessário que a máquina tenha o node instalado para que seja possível rodar a aplicação_

1. Rode o comando `npm install` (ou `npm i`) para instalar todas as dependencias
2. Crie o banco de dados Mysql chamado vuttr
3. Rode o comando `knex migrate:latest` para gerar as tabelas
4. Por ultimo rode o comando `node index.js` 

Seu server deve estar funcionando agora.
