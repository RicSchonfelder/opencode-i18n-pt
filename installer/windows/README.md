# Instalador Windows (legacy)

Instalador one-liner para Windows antigos (7/8/10/11) — sem Chocolatey, sem WSL, sem npm, sem admin.

Padrao de uso (igual `irm massgrave.dev/get | iex`):

## Instalar opencode

Abra o PowerShell e cole:

```powershell
powershell -c "irm https://raw.githubusercontent.com/RicSchonfelder/opencode-ptbr/main/installer/windows/install-opencode.ps1 | iex"
```

O que faz:

- Detecta a arquitetura (x64 / arm64) e baixa o build **x64-baseline** — roda em CPUs antigas sem AVX2
- Forca TLS 1.2 (necessario no Windows 7/8, que so usam TLS 1.0 por padrao)
- Extrai em `D:\Programas\opencode\bin` quando a pasta existir (senao usa `%LOCALAPPDATA%\opencode\bin`), sem admin, e adiciona ao PATH do usuario
- Compativel com PowerShell 2.0+ (usa WebClient + Shell COM em vez de Invoke-RestMethod/Expand-Archive)

### Versao em Portugues (pt-BR)

Para instalar a versao com a TUI traduzida para Portugues (Brasil), use a flag `-PtBr`:

```powershell
powershell -c "irm https://raw.githubusercontent.com/RicSchonfelder/opencode-ptbr/main/installer/windows/install-opencode.ps1 | iex" -PtBr
```

Localmente:

```powershell
powershell -ExecutionPolicy Bypass -File install-opencode.ps1 -PtBr
```

A versao pt-BR e baixada da release `pt-br-*` deste mesmo repositorio.

## Uso local (sem internet no host intermediario)

Copie `install-opencode.ps1` para a maquina (pendrive) e rode:

```powershell
powershell -ExecutionPolicy Bypass -File install-opencode.ps1
```

## Adicionar outro programa

Copie `install-opencode.ps1`, troque a variavel `$url` para o zip do release desejado e ajuste o nome do `.exe` verificado. Siga o mesmo padrao: baixar com `WebClient`, extrair com Shell COM, adicionar ao PATH.