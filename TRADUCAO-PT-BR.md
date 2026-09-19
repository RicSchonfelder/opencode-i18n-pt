# opencode-i18n-pt

Fork do [OpenCode](https://github.com/anomalyco/opencode) com a interface **TUI traduzida para Português (Brasil)**.

Branch de tradução estável: `feat/pt-br-stable`
Base: `v1.18.31` (release estável mais recente)

> **Nota:** a branch `dev` do upstream contém um bug ao enviar prompts (`TypeError: evaluating 'a.name'` em `SystemPrompt.environment`). Use a **estável** para uso diário.

## O que está traduzido

O OpenCode tem **dois** sistemas de texto:

1. **`packages/ui` + `packages/app`** — já possuem infraestrutura i18n (`en.ts`, `br.ts`). O `br.ts` já existia traduzido.
2. **`packages/tui`** — a interface de terminal (TUI) tem **todas as strings hardcoded em inglês**, sem sistema i18n. Este fork traduz essas strings diretamente no código.

### Arquivos traduzidos (TUI)

| Arquivo | Conteúdo |
|---|---|
| `packages/tui/src/app.tsx` | Comandos da paleta (Ctrl+P): trocar sessão/modelo/agente/tema, categorias |
| `packages/tui/src/routes/home.tsx` | Placeholders da tela inicial ("Pergunte qualquer coisa...") |
| `packages/tui/src/routes/session/index.tsx` | Comandos de sessão (renomear, compartilhar, compactar, navegação) |
| `packages/tui/src/component/prompt/index.tsx` | Comandos de prompt (limpar, enviar, colar, habilidades, stash) |
| `packages/tui/src/component/command-palette.tsx` | Título da paleta ("Comandos", "Sugerido") |
| `packages/tui/src/config/keybind.ts` | ~180 descrições de atalhos de teclado |
| `packages/tui/src/feature-plugins/home/tips-view.tsx` | ~120 dicas da tela inicial |
| `packages/tui/src/feature-plugins/system/diff-viewer.tsx` | Comando "Abrir visualizador de diff" |
| `packages/tui/src/feature-plugins/home/tips.tsx` | Comando "Mostrar/Ocultar dicas" |
| `packages/tui/src/feature-plugins/system/plugins.tsx` | Comandos "Plugins"/"Instalar plugin" |
| `packages/tui/src/component/dialog-*.tsx` | Diálogos (agente, MCP, provedor, sessões, skills, stash, tag, renomear) |
| `packages/tui/src/ui/dialog-select.tsx` | "Nenhum resultado encontrado" |
| `packages/opencode/src/agent/agent.ts` | Descrições dos agentes nativos (build, plan, general, explore) |

## Como buildar e testar

Pré-requisitos: [bun](https://bun.sh)

```bash
# instalar dependências
bun install --frozen-lockfile

# typecheck da TUI
cd packages/tui && bun run typecheck && cd ../..

# ⚠️ IMPORTANTE: o build DEVE ser feito no LINUX (WSL), não no Windows
# Buildar o binário Windows nativamente no Windows gera um binário com bug:
# "TypeError: undefined is not an object (evaluating 'a.name')" no layer-node
# ao enviar prompts. O release oficial é cross-compilado no Linux (GitHub Actions).
wsl
cd /mnt/c/.../opencode-i18n-pt/packages/opencode
bun run build   # builda todos os targets (inclui Windows x64)

# o binário Windows fica em:
./dist/opencode-windows-x64/bin/opencode.exe

# testar num diretório limpo (o .opencode/ interno do repo pode conflitar com build dev)
mkdir -p /tmp/test-clean
cd /tmp/test-clean
/path/para/dist/opencode-windows-x64/bin/opencode.exe run "diga OK"
```

> **Nota:** não rode o binário dentro do diretório do repositório — o `.opencode/` interno do próprio OpenCode referencia plugins e agentes de desenvolvimento que quebram em builds dev.

## Como funciona a tradução

A TUI não tem camada i18n — cada string é um literal no código. A tradução foi feita:
1. Localizando os comandos registrados com `namespace: "palette"` (aparecem no Ctrl+P)
2. Traduzindo os campos `title`, `description`, `category` e mensagens (`toast`)
3. Mantendo os **ids de comando em inglês** (`session.new`, `model.list`, etc.) — são chaves de sistema e não devem mudar
4. Mantendo nomes de agentes (`build`, `plan`) — são identificadores usados em `/comandos`, config e system prompt

## Créditos

Tradução: RicSchonfelder · Projeto original: [anomalyco/opencode](https://github.com/anomalyco/opencode)