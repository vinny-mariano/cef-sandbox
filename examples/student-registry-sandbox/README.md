# Student Registry Sandbox

Projeto fictício e descartável para avaliar o **Copilot Engineering Framework (CEF) v1.0.0** em um workspace real.

O cenário simula um pequeno cadastro de estudantes. Todos os nomes, e-mails e registros são inventados; os e-mails usam o domínio reservado `.invalid`.

## Objetivo inicial: T-001

Adicionar `registrationDate` à entidade `Student` e persistir seu valor, preservando os campos existentes.

**Importante:** o campo `registrationDate` foi intencionalmente omitido da implementação inicial e dos registros JSON. Não o adicione manualmente antes de executar a inspeção da Phase 2 com o Copilot.

## Stack

- Frontend: React + Vite
- Backend: Node.js nativo (HTTP, `node:fs`, `node:test`)
- Persistência: arquivo JSON local
- Proxy reverso: configuração de exemplo para Nginx

O backend não usa dependências externas. O frontend utiliza React e Vite.

## Requisitos

- Node.js 22.12 ou superior
- npm
- VS Code com GitHub Copilot

O Vite atual requer Node.js 20.19+ ou 22.12+; este projeto fixa o mínimo em 22.12+. Consulte a documentação oficial antes de atualizar a stack: https://vite.dev/guide/.

## Abrir corretamente no VS Code

1. Extraia esta pasta em um diretório separado do repositório canônico do CEF.
2. Abra **a pasta `student-registry-sandbox` como workspace** no VS Code. Não abra somente a subpasta `backend`.
3. Confira se `.github/copilot-instructions.md`, `.github/instructions/` e `ENGINE.md` aparecem na raiz do Explorer.
4. Use o modo **Ask** para a inspeção somente de leitura da Phase 2.
5. Não autorize implementação até concluir a revisão humana.

Este pacote contém uma cópia de trabalho dos documentos centrais do CEF v1.0.0 para que o workspace seja autocontido. O repositório original do CEF continua sendo a fonte canônica. Se você alterar o framework, sincronize conscientemente as instruções deste sandbox; não assuma sincronização automática.

## Instalação e execução — PowerShell

Abra dois terminais integrados no VS Code.

### Terminal 1 — Backend

```powershell
Set-Location .\backend
npm install
npm run dev
```

API: http://localhost:3001

Verificação de saúde: http://localhost:3001/api/health

### Terminal 2 — Frontend

```powershell
Set-Location .\frontend
npm install
npm run dev
```

Interface: http://localhost:5173

O Vite encaminha as chamadas `/api` para o backend na porta 3001.

## Testes

No terminal do backend:

```powershell
npm test
```

## Build do frontend

No terminal do frontend:

```powershell
npm run build
```

## Persistência

Os registros são armazenados em `backend/data/students.json`. O repositório lê e grava esse arquivo. O campo `createdAt` já existe e utiliza timestamps ISO 8601. A tarefa T-001 deve ser analisada pelo Copilot; não presuma que `registrationDate` deve copiar automaticamente a semântica de `createdAt`.

## Nginx

`nginx/student-registry.conf` é um exemplo para servir os arquivos estáticos do build e encaminhar `/api/` ao backend local. O caminho de `root` precisa ser ajustado à instalação. A configuração não foi aplicada a um servidor Nginx neste pacote.

## Limites do laboratório

- Não contém dados reais nem integrações externas.
- Não contém credenciais ou arquivos `.env`.
- O armazenamento JSON é intencionalmente simples e serve para exercícios; não é uma recomendação para produção ou acesso concorrente.
- Não use este projeto para guardar dados pessoais reais.
