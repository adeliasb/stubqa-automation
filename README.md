# Plano de Testes – API /crawl

Este projeto automatiza os testes mínimos exigidos pelo enunciado, usando *WireMock* para simular a API e *Cypress* para validar as operações.

## Pré‑requisitos
* Java 17 (para rodar o WireMock)
* Node.js 18+ (para rodar o Cypress)

## Como executar

```bash
# 1. clonar ou baixar o repositório
cd wiremock
java -jar wiremock-standalone-4.0.0-beta.2.jar --port 4567 --root-dir . &
# WireMock ficará escutando na porta 4567

# 2. instalar dependências do projeto
npm install

# 3. rodar os testes Cypress (modo headless)
npx cypress run
# ou modo interativo
npx cypress open