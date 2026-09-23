<p align="center">
  <img src="packages/console/app/src/asset/logo-ornate-light.svg" alt="OpenCode logo" width="220">
</p>

# OpenCode PT-BR

Fork do [OpenCode](https://github.com/anomalyco/opencode) com a interface em
**Português (Brasil)** e um instalador que funciona até em Windows antigos
(7/8/10/11) — sem Chocolatey, sem WSL, sem npm e sem privilégios de
administrador.

---

## Instalar

Abra o PowerShell e cole:

```powershell
powershell -c "irm https://raw.githubusercontent.com/RicSchonfelder/opencode-ptbr/dev/installer/windows/install-opencode.ps1 | iex" -PtBr
```

Isso baixa e instala a versão **pt-BR** automaticamente. Sem `-PtBr`, instala a
versão oficial:

```powershell
powershell -c "irm https://raw.githubusercontent.com/RicSchonfelder/opencode-ptbr/dev/installer/windows/install-opencode.ps1 | iex"
```

### O que o instalador faz

- Detecta a arquitetura (x64 / arm64) e baixa o build **x64-baseline** — roda em CPUs antigas sem AVX2
- Força TLS 1.2 (necessário no Windows 7/8, que só usam TLS 1.0 por padrão)
- Extrai em `D:\Programas\opencode\bin` quando a pasta existir (senão usa `%LOCALAPPDATA%\opencode\bin`), sem admin, e adiciona ao PATH do usuário
- Compatível com PowerShell 2.0+ (usa WebClient + Shell COM em vez de `Invoke-RestMethod`/`Expand-Archive`)

### Sem internet na máquina alvo

Copie `installer/windows/install-opencode.ps1` para a máquina (pendrive) e rode:

```powershell
powershell -ExecutionPolicy Bypass -File install-opencode.ps1 -PtBr
```

---

## Instalação em outras plataformas

```bash
# YOLO
curl -fsSL https://opencode.ai/install | bash

# Gerenciadores de pacotes
npm i -g opencode-ai@latest        # ou bun/pnpm/yarn
scoop install opencode             # Windows
choco install opencode             # Windows
brew install anomalyco/tap/opencode # macOS e Linux (recomendado)
brew install opencode              # macOS e Linux (fórmula oficial)
sudo pacman -S opencode            # Arch Linux (Stable)
paru -S opencode-bin               # Arch Linux (Latest from AUR)
mise use -g opencode               # qualquer sistema
nix run nixpkgs#opencode           # ou github:anomalyco/opencode para dev
```

> [!TIP]
> Remova versões anteriores à 0.1.x antes de instalar.

## Agentes

O OpenCode inclui dois agentes nativos, alternáveis com a tecla `Tab`:

- **build** — agente padrão com acesso total para desenvolvimento
- **plan** — agente somente leitura para análise e exploração de código

Há também o subagente **general** para buscas complexas e tarefas em várias
etapas, invocado com `@general` nas mensagens.

## Documentação

Para mais informações de configuração, veja a [documentação oficial](https://opencode.ai/docs).

## Contribuindo

Veja o [guia de contribuição](./CONTRIBUTING.md) antes de abrir um pull request.

## Licença

Este fork mantém a [licença do projeto original](./LICENSE).

---

**Comunidade** [Discord](https://discord.gg/opencode) | [X.com](https://x.com/opencode)