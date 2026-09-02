type Params = Record<string, string | number>

const en = {
  "common.search": "Search",
  "common.cancel": "Cancel",
  "common.confirm": "Confirm",
  "common.ok": "ok",
  "common.help": "Help",
  "common.closeHelp": "Close help",
  "common.helpHint": "Press {{shortcut}} to see all available actions and commands in any context.",
  "common.getStarted": "Get started",
  "common.permission": "Permission",
  "common.permissions": "Permissions",
  "common.searchSkills": "Search skills...",
  "common.enterText": "Enter text",
  "common.enterFilename": "Enter filename",

  "prompt.askAnything": "Ask anything... \"{{example}}\"",
  "prompt.runCommand": "Run a command... \"{{example}}\"",
  "prompt.suggestion.1": "Corrigir um TODO no código",
  "prompt.suggestion.2": "Qual é a stack tecnológica deste projeto?",
  "prompt.suggestion.3": "Corrigir os testes quebrados",

  "permission.alwaysAllow": "Always allow",
  "permission.allowOnce": "Allow once",
  "permission.allowAlways": "Allow always",
  "permission.reject": "Reject",
  "permission.rejectPermission": "Reject permission",
  "permission.confirmRejection": "Confirm permission rejection",

  "question.rejectQuestion": "Reject question",
  "question.typeOwnAnswer": "Type your own answer",
  "question.next": "Next question",
  "question.previous": "Previous question",

  "toast.noAssistantMessages": "No assistant messages found",
  "toast.noTextParts": "No text parts found in last assistant message",
  "toast.noTextContent": "No text content found in last assistant message",
  "toast.confirmRedo": "Confirm Redo",
}

export type Dict = typeof en

const br: Partial<Dict> = {
  "common.search": "Buscar",
  "common.cancel": "Cancelar",
  "common.confirm": "Confirmar",
  "common.ok": "ok",
  "common.help": "Ajuda",
  "common.closeHelp": "Fechar ajuda",
  "common.helpHint": "Pressione {{shortcut}} para ver todas as ações e comandos disponíveis em qualquer contexto.",
  "common.getStarted": "Começar",
  "common.permission": "Permissão",
  "common.permissions": "Permissões",
  "common.searchSkills": "Buscar skills...",
  "common.enterText": "Digite o texto",
  "common.enterFilename": "Digite o nome do arquivo",

  "prompt.askAnything": "Pergunte qualquer coisa... \"{{example}}\"",
  "prompt.runCommand": "Execute um comando... \"{{example}}\"",
  "prompt.suggestion.1": "Corrigir um TODO no código",
  "prompt.suggestion.2": "Qual é a stack tecnológica deste projeto?",
  "prompt.suggestion.3": "Corrigir os testes quebrados",

  "permission.alwaysAllow": "Sempre permitir",
  "permission.allowOnce": "Permitir uma vez",
  "permission.allowAlways": "Permitir sempre",
  "permission.reject": "Rejeitar",
  "permission.rejectPermission": "Rejeitar permissão",
  "permission.confirmRejection": "Confirmar rejeição da permissão",

  "question.rejectQuestion": "Rejeitar pergunta",
  "question.typeOwnAnswer": "Digite sua própria resposta",
  "question.next": "Próxima pergunta",
  "question.previous": "Pergunta anterior",

  "toast.noAssistantMessages": "Nenhuma mensagem do assistente encontrada",
  "toast.noTextParts": "Nenhuma parte de texto encontrada na última mensagem do assistente",
  "toast.noTextContent": "Nenhum conteúdo de texto encontrado na última mensagem do assistente",
  "toast.confirmRedo": "Confirmar Refazer",
}

const dicts: Record<string, Partial<Dict>> = { en, br }

function detect(): string {
  const explicit = process.env.OPENCODE_LOCALE
  if (explicit && dicts[explicit.toLowerCase().split(/[-_]/)[0]]) return explicit.toLowerCase().split(/[-_]/)[0]
  const lang = process.env.LC_ALL ?? process.env.LANG ?? process.env.LANGUAGE ?? ""
  const code = lang.split(/[._-]/)[0].toLowerCase()
  // map pt -> br for Portuguese (Brazil)
  const mapped = code === "pt" ? "br" : code
  return dicts[mapped] ? mapped : "en"
}

const locale = detect()
console.error("[TUI i18n] locale detected:", locale)
const active = dicts[locale] ?? en

export function t(key: keyof Dict, params?: Params): string {
  const template = active[key] ?? en[key] ?? key
  if (!params) return template
  return template.replace(/\{\{(\w+)\}\}/g, (match, name: string) => {
    const value = params[name]
    return value === undefined ? match : String(value)
  })
}

export function localeCode() {
  return locale
}
