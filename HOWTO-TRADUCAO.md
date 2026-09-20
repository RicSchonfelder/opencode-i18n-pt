# Como a tradução PT-BR foi feita

Guia passo a passo de como a TUI do OpenCode foi traduzida para Português (Brasil) no fork `RicSchonfelder/opencode-i18n-pt`.

## Contexto

O OpenCode tem **dois** sistemas de texto:

1. **`packages/ui` + `packages/app`** (web) — já possuem infraestrutura i18n real:
   - `packages/ui/src/i18n/en.ts` — dicionário inglês
   - `packages/ui/src/i18n/br.ts` — dicionário pt-BR (já existia)
   - Funciona com `import.meta` + seleção de idioma no config.

2. **`packages/tui`** (terminal) — **todas as strings são hardcoded em inglês**, sem sistema i18n. Não há `t()` nem dicionários. Cada comando/diálogo tem o texto literal no código.

Este fork traduz o **TUI** (sistema #2), que é o que o usuário vê ao digitar `opencode` no terminal.

## Passo 1: entender de onde vem cada texto da TUI

A paleta de comandos (Ctrl+P) é o principal ponto de entrada. Ela monta a lista a partir de comandos registrados com `namespace: "palette"`.

Fontes dos textos (todos em `packages/tui/src/`):

| Arquivo | Conteúdo |
|---|---|
| `app.tsx` | Comandos da paleta: `appCommands` (trocar sessão/modelo/agente/tema, etc.) + categorias |
| `routes/home.tsx` | Placeholders da tela inicial (rotativos: "Pergunte qualquer coisa...") |
| `routes/session/index.tsx` | Comandos de sessão (`sessionCommandList`) |
| `component/prompt/index.tsx` | Comandos de prompt + placeholder "Pergunte qualquer coisa..." |
| `component/command-palette.tsx` | Título do diálogo ("Comandos", "Sugerido") |
| `config/keybind.ts` | ~180 descrições de atalhos de teclado (usadas no which-key/ajuda) |
| `feature-plugins/home/tips-view.tsx` | ~120 dicas da tela inicial |
| `feature-plugins/system/diff-viewer.tsx` | Comando "Abrir visualizador de diff" |
| `feature-plugins/home/tips.tsx` | Comando "Mostrar/Ocultar dicas" |
| `feature-plugins/system/plugins.tsx` | Comandos "Plugins"/"Instalar plugin" |
| `component/dialog-*.tsx` | Diálogos: agente, MCP, provedor, sessões, skills, stash, tag, renomear |
| `ui/dialog-select.tsx` | "Nenhum resultado encontrado" |
| `packages/opencode/src/agent/agent.ts` | Descrições dos agentes nativos |

## Passo 2: regras da tradução

1. **IDs de comando NÃO mudam** — `session.new`, `model.list`, `agent.list` etc. são chaves de sistema (usadas em `slashName`, bindings, config, API). Só o texto visível (`title`, `description`, `category`) muda.

2. **Nomes de agentes NÃO mudam** — `build`, `plan`, `general`, `explore` são identificadores usados em `/comandos`, config e system prompt. Traduzir quebraria tudo. Só a `description` muda.

3. **Slash commands NÃO mudam** — `/new`, `/models`, `/help` etc. são os mesmos (o usuário digita). Só o texto exibido na paleta muda.

4. **Categorias são traduzidas** — "System"→"Sistema", "Session"→"Sessão", "Agent"→"Agente", "Provider"→"Provedor", "Prompt"→"Prompt" (termo técnico).

5. **Mensagens de toast/erro são traduzidas** — as que aparecem na UI.

## Passo 3: localizar os comandos da paleta

Para encontrar todos os comandos visíveis no Ctrl+P, busque por `namespace: "palette"`:

```bash
rg -n 'namespace: "palette"' packages/tui/src
```

Cada comando tem os campos `title`, `category`, `desc` — traduza os que são strings.

## Passo 4: traduzir os arquivos

Edite cada arquivo traduzindo os literais. Exemplo (`app.tsx`):

```ts
// antes
title: "Switch model",
category: "Agent",
// depois
title: "Trocar de modelo",
category: "Agente",
```

Exemplo de descrição de agente (`agent.ts`):

```ts
// antes
description: "The default agent. Executes tools based on configured permissions.",
// depois
description: "O agente padrão. Executa ferramentas conforme as permissões configuradas.",
```

## Passo 5: tipo de elipse — atenção ao upstream

O upstream usa **elipse unicode `…`** em algumas strings e **`...`** (3 pontos) em outras, dependendo da versão:
- v1.18.25 e anteriores: `...`
- v1.18.31: `…`

Ao traduzir, mantenha o mesmo caractere que o upstream usa no arquivo atual para minimizar conflitos de rebase.

## Passo 6: typecheck

```bash
cd packages/tui
bun run typecheck   # usa tsgo --noEmit
```

## Passo 7: build — CRÍTICO: usar Linux/WSL

**Buildar o binário Windows nativamente no Windows gera um binário com bug** ao enviar prompts:

```
TypeError: undefined is not an object (evaluating 'a.name')
```

no `LayerNode.walk` (`packages/core/src/effect/layer-node.ts`), ao montar o grafo `locationServices` no `SystemPrompt.environment`. Testado: bun 1.4.2 e 1.3.14, com/sem minify, com/sem web UI embed, config isolada — **todo build no Windows falha**.

**A solução é cross-compilar no Linux** (como o GitHub Actions faz):

```bash
# dentro do WSL/Linux
cd packages/opencode
bun run build    # builda todos os targets, inclui opencode-windows-x64
```

O binário Windows resultante funciona corretamente.

> **Motivo:** o release oficial sempre foi cross-compilado no Linux (GitHub Actions). O teste confirmou que isso não é só escolha de CI, é **necessário** para um binário Windows correto.

## Passo 8: CPUs antigas precisam do build baseline

Em máquinas sem AVX2 (ex.: Intel Core i5-2430M, Sandy Bridge 2011), o build `x64` padrão falha com **"Instrução ilegal"**. Use o build `baseline`:

```bash
bun run build   # gera também opencode-linux-x64-baseline e opencode-windows-x64-baseline
```

## Resultado

- ~20 arquivos alterados, ~523 strings traduzidas
- Branch: `feat/pt-br-stable` (base v1.18.31)
- Release binário: `pt-br-v1.18.31` no fork
- Instalação: `install-opencode.ps1 -PtBr` no repo `legacy-setup`

## Referências

- Issue original: [anomalyco/opencode#35831](https://github.com/anomalyco/opencode/issues/35831)
- Plugin de tradução por runtime (abordagem alternativa): [mike652638/opencode-zh-plugin](https://github.com/mike652638/opencode-zh-plugin)