export * as TuiKeybind from "./keybind"

import type { KeyEvent, Renderable } from "@opentui/core"
import type { Binding } from "@opentui/keymap"
import type { BindingCommandMap, BindingConfig, BindingDefaults } from "@opentui/keymap/extras"
import { Schema } from "effect"

const KeyStroke = Schema.Struct({
  name: Schema.String,
  ctrl: Schema.optional(Schema.Boolean),
  shift: Schema.optional(Schema.Boolean),
  meta: Schema.optional(Schema.Boolean),
  super: Schema.optional(Schema.Boolean),
  hyper: Schema.optional(Schema.Boolean),
})

const BindingObject = Schema.StructWithRest(
  Schema.Struct({
    key: Schema.Union([Schema.String, KeyStroke]),
    event: Schema.optional(Schema.Literals(["press", "release"])),
    preventDefault: Schema.optional(Schema.Boolean),
    fallthrough: Schema.optional(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
)

const BindingItem = Schema.Union([Schema.String, KeyStroke, BindingObject])
export const BindingValueSchema = Schema.Union([
  Schema.Literal(false),
  Schema.Literal("none"),
  BindingItem,
  Schema.Array(BindingItem),
])
export type BindingValueSchema = Schema.Schema.Type<typeof BindingValueSchema>

type Definition = {
  default: BindingValueSchema
  description: string
}

export const LeaderDefault = "ctrl+x"

const keybind = (value: Definition["default"], description: string): Definition => ({ default: value, description })

export const Definitions = {
  leader: keybind(LeaderDefault, "Tecla líder para combinações de teclas"),

  app_exit: keybind("ctrl+c,ctrl+d,<leader>q", "Sair do aplicativo"),
  app_debug: keybind("none", "Alternar painel de depuração"),
  app_console: keybind("none", "Alternar console"),
  app_heap_snapshot: keybind("none", "Gravar snapshot do heap"),
  app_toggle_animations: keybind("none", "Alternar animações"),
  app_toggle_file_context: keybind("none", "Alternar contexto de arquivo"),
  app_toggle_diffwrap: keybind("none", "Alternar quebra de diff"),
  app_toggle_paste_summary: keybind("none", "Alternar resumo de colagem"),
  app_toggle_session_directory_filter: keybind("none", "Alternar filtro de diretório de sessão"),
  command_list: keybind("ctrl+p", "Listar comandos disponíveis"),
  help_show: keybind("none", "Abrir diálogo de ajuda"),
  docs_open: keybind("none", "Abrir documentação"),
  diff_open: keybind("none", "Abrir visualizador de diff"),
  diff_close: keybind("escape,q", "Fechar visualizador de diff"),
  diff_toggle: keybind("enter,space", "Alternar item do visualizador de diff"),
  diff_expand: keybind("right", "Expandir item do visualizador de diff"),
  diff_expand_all: keybind("E", "Expandir todas as pastas do visualizador de diff"),
  diff_collapse: keybind("left", "Recolher item do visualizador de diff"),
  diff_switch_focus: keybind("tab", "Alternar foco do visualizador de diff"),
  diff_next_hunk: keybind("]", "Ir para o próximo trecho do diff"),
  diff_previous_hunk: keybind("[", "Ir para o trecho anterior do diff"),
  diff_next_file: keybind("n", "Ir para o próximo arquivo do diff"),
  diff_previous_file: keybind("p", "Ir para o arquivo anterior do diff"),
  diff_toggle_file_tree: keybind("b", "Alternar árvore de arquivos do diff"),
  diff_single_patch: keybind("s", "Alternar visualização de patch único"),
  diff_switch_source: keybind("d", "Alternar origem do visualizador de diff"),
  diff_toggle_view: keybind("v", "Alternar visualização dividida ou unificada do diff"),
  diff_help: keybind("?", "Mostrar mais atalhos do visualizador de diff"),

  editor_open: keybind("<leader>e", "Abrir editor externo"),
  theme_list: keybind("<leader>t", "Listar temas disponíveis"),
  theme_switch_mode: keybind("none", "Alternar entre modo claro e escuro"),
  theme_mode_lock: keybind("none", "Bloquear ou desbloquear modo de tema"),
  sidebar_toggle: keybind("<leader>b", "Alternar barra lateral"),
  scrollbar_toggle: keybind("none", "Alternar barra de rolagem da sessão"),
  status_view: keybind("<leader>s", "Ver status"),
  debug_view: keybind("none", "Ver informações de depuração"),

  session_export: keybind("<leader>x", "Exportar sessão para o editor"),
  session_copy: keybind("none", "Copiar transcrição da sessão"),
  session_move: keybind("none", "Mover sessão"),
  session_new: keybind("<leader>n", "Criar uma nova sessão"),
  session_list: keybind("<leader>l", "Listar todas as sessões"),
  session_timeline: keybind("<leader>g", "Mostrar linha do tempo da sessão"),
  session_fork: keybind("none", "Bifurcar sessão a partir de uma mensagem"),
  session_rename: keybind("ctrl+r", "Renomear sessão"),
  session_delete: keybind("ctrl+d", "Excluir sessão"),
  session_share: keybind("none", "Compartilhar sessão atual"),
  session_unshare: keybind("none", "Descompartilhar sessão atual"),
  session_interrupt: keybind("escape", "Interromper sessão atual"),
  session_background: keybind("ctrl+b", "Colocar subagentes síncronos em segundo plano"),
  session_compact: keybind("<leader>c", "Compactar a sessão"),
  session_toggle_timestamps: keybind("none", "Alternar horários das mensagens"),
  session_toggle_generic_tool_output: keybind("none", "Alternar saída genérica de ferramentas"),
  session_queued_prompts: keybind("<leader>q", "Gerenciar prompts na fila"),
  session_child_first: keybind("<leader>down", "Ir para a primeira sessão filha"),
  session_child_cycle: keybind("right", "Ir para a próxima sessão filha"),
  session_child_cycle_reverse: keybind("left", "Ir para a sessão filha anterior"),
  session_parent: keybind("up", "Ir para a sessão pai"),
  session_pin_toggle: keybind("ctrl+f", "Fixar ou desafixar sessão na lista de sessões"),
  session_quick_switch_1: keybind("<leader>1", "Trocar para sessão no slot rápido 1"),
  session_quick_switch_2: keybind("<leader>2", "Trocar para sessão no slot rápido 2"),
  session_quick_switch_3: keybind("<leader>3", "Trocar para sessão no slot rápido 3"),
  session_quick_switch_4: keybind("<leader>4", "Trocar para sessão no slot rápido 4"),
  session_quick_switch_5: keybind("<leader>5", "Trocar para sessão no slot rápido 5"),
  session_quick_switch_6: keybind("<leader>6", "Trocar para sessão no slot rápido 6"),
  session_quick_switch_7: keybind("<leader>7", "Trocar para sessão no slot rápido 7"),
  session_quick_switch_8: keybind("<leader>8", "Trocar para sessão no slot rápido 8"),
  session_quick_switch_9: keybind("<leader>9", "Trocar para sessão no slot rápido 9"),

  stash_delete: keybind("ctrl+d", "Excluir entrada do stash"),
  model_provider_list: keybind("ctrl+a", "Abrir lista de provedores no diálogo de modelo"),
  model_favorite_toggle: keybind("ctrl+f", "Alternar status de favorito do modelo"),
  model_list: keybind("<leader>m", "Listar modelos disponíveis"),
  model_cycle_recent: keybind("f2", "Próximo modelo usado recentemente"),
  model_cycle_recent_reverse: keybind("shift+f2", "Modelo anterior usado recentemente"),
  model_cycle_favorite: keybind("none", "Próximo modelo favorito"),
  model_cycle_favorite_reverse: keybind("none", "Modelo favorito anterior"),
  mcp_list: keybind("none", "Listar servidores MCP"),
  provider_connect: keybind("none", "Conectar provedor"),
  console_org_switch: keybind("none", "Trocar organização do console"),
  agent_list: keybind("<leader>a", "Listar agentes"),
  agent_cycle: keybind("tab", "Próximo agente"),
  agent_cycle_reverse: keybind("shift+tab", "Agente anterior"),
  variant_cycle: keybind("ctrl+t", "Ciclar variantes do modelo"),
  variant_list: keybind("none", "Listar variantes do modelo"),

  messages_page_up: keybind("pageup,ctrl+alt+b", "Rolar mensagens uma página acima"),
  messages_page_down: keybind("pagedown,ctrl+alt+f", "Rolar mensagens uma página abaixo"),
  messages_line_up: keybind("ctrl+alt+y", "Rolar mensagens uma linha acima"),
  messages_line_down: keybind("ctrl+alt+e", "Rolar mensagens uma linha abaixo"),
  messages_half_page_up: keybind("ctrl+alt+u", "Rolar mensagens meia página acima"),
  messages_half_page_down: keybind("ctrl+alt+d", "Rolar mensagens meia página abaixo"),
  messages_first: keybind("ctrl+g,home", "Ir para a primeira mensagem"),
  messages_last: keybind("ctrl+alt+g,end", "Ir para a última mensagem"),
  messages_next: keybind("none", "Ir para a próxima mensagem"),
  messages_previous: keybind("none", "Ir para a mensagem anterior"),
  messages_last_user: keybind("none", "Ir para a última mensagem do usuário"),
  messages_copy: keybind("<leader>y", "Copiar mensagem"),
  messages_undo: keybind("<leader>u", "Desfazer mensagem"),
  messages_redo: keybind("<leader>r", "Refazer mensagem"),
  messages_toggle_conceal: keybind("<leader>h", "Alternar ocultação de blocos de código nas mensagens"),
  tool_details: keybind("none", "Alternar visibilidade dos detalhes das ferramentas"),
  display_thinking: keybind("none", "Alternar visibilidade dos blocos de raciocínio"),

  prompt_submit: keybind("none", "Enviar prompt"),
  prompt_editor_context_clear: keybind("none", "Limpar contexto do editor"),
  prompt_skills: keybind("none", "Abrir seletor de habilidades"),
  prompt_stash: keybind("none", "Guardar prompt no stash"),
  prompt_stash_pop: keybind("none", "Recuperar prompt do stash"),
  prompt_stash_list: keybind("none", "Listar prompts no stash"),
  workspace_set: keybind("none", "Definir workspace"),

  input_clear: keybind("ctrl+c", "Limpar campo de entrada"),
  input_paste: keybind({ key: "ctrl+v", preventDefault: false }, "Colar da área de transferência"),
  input_submit: keybind("return", "Enviar entrada"),
  input_newline: keybind("shift+return,ctrl+return,alt+return,ctrl+j", "Inserir nova linha na entrada"),
  input_move_left: keybind("left,ctrl+b", "Mover cursor para a esquerda na entrada"),
  input_move_right: keybind("right,ctrl+f", "Mover cursor para a direita na entrada"),
  input_move_up: keybind("up", "Mover cursor para cima na entrada"),
  input_move_down: keybind("down", "Mover cursor para baixo na entrada"),
  input_select_left: keybind("shift+left", "Selecionar à esquerda na entrada"),
  input_select_right: keybind("shift+right", "Selecionar à direita na entrada"),
  input_select_up: keybind("shift+up", "Selecionar acima na entrada"),
  input_select_down: keybind("shift+down", "Selecionar abaixo na entrada"),
  input_line_home: keybind("ctrl+a", "Ir para o início da linha na entrada"),
  input_line_end: keybind("ctrl+e", "Ir para o fim da linha na entrada"),
  input_select_line_home: keybind("ctrl+shift+a", "Selecionar até o início da linha na entrada"),
  input_select_line_end: keybind("ctrl+shift+e", "Selecionar até o fim da linha na entrada"),
  input_visual_line_home: keybind("alt+a", "Ir para o início da linha visual na entrada"),
  input_visual_line_end: keybind("alt+e", "Ir para o fim da linha visual na entrada"),
  input_select_visual_line_home: keybind("alt+shift+a", "Selecionar até o início da linha visual na entrada"),
  input_select_visual_line_end: keybind("alt+shift+e", "Selecionar até o fim da linha visual na entrada"),
  input_buffer_home: keybind("home", "Ir para o início do buffer na entrada"),
  input_buffer_end: keybind("end", "Ir para o fim do buffer na entrada"),
  input_select_buffer_home: keybind("shift+home", "Selecionar até o início do buffer na entrada"),
  input_select_buffer_end: keybind("shift+end", "Selecionar até o fim do buffer na entrada"),
  input_delete_line: keybind("ctrl+shift+d", "Excluir linha na entrada"),
  input_delete_to_line_end: keybind("ctrl+k", "Excluir até o fim da linha na entrada"),
  input_delete_to_line_start: keybind("ctrl+u", "Excluir até o início da linha na entrada"),
  input_backspace: keybind("backspace,shift+backspace", "Backspace na entrada"),
  input_delete: keybind("ctrl+d,delete,shift+delete", "Excluir caractere na entrada"),
  input_undo: keybind("ctrl+-,super+z", "Desfazer na entrada"),
  input_redo: keybind("ctrl+.,super+shift+z", "Refazer na entrada"),
  input_word_forward: keybind("alt+f,alt+right,ctrl+right", "Mover para a próxima palavra na entrada"),
  input_word_backward: keybind("alt+b,alt+left,ctrl+left", "Mover para a palavra anterior na entrada"),
  input_select_word_forward: keybind("alt+shift+f,alt+shift+right", "Selecionar palavra à frente na entrada"),
  input_select_word_backward: keybind("alt+shift+b,alt+shift+left", "Selecionar palavra atrás na entrada"),
  input_delete_word_forward: keybind("alt+d,alt+delete,ctrl+delete", "Excluir palavra à frente na entrada"),
  input_delete_word_backward: keybind("ctrl+w,ctrl+backspace,alt+backspace", "Excluir palavra atrás na entrada"),
  input_select_all: keybind("super+a", "Selecionar tudo na entrada"),
  history_previous: keybind("up", "Item anterior do histórico"),
  history_next: keybind("down", "Próximo item do histórico"),

  "dialog.select.prev": keybind("up,ctrl+p", "Mover para o item anterior do diálogo"),
  "dialog.select.next": keybind("down,ctrl+n", "Mover para o próximo item do diálogo"),
  "dialog.select.page_up": keybind("pageup", "Mover uma página acima no diálogo"),
  "dialog.select.page_down": keybind("pagedown", "Mover uma página abaixo no diálogo"),
  "dialog.select.home": keybind("home", "Ir para o primeiro item do diálogo"),
  "dialog.select.end": keybind("end", "Ir para o último item do diálogo"),
  "dialog.select.submit": keybind("return", "Enviar item selecionado do diálogo"),
  "dialog.prompt.submit": keybind("return", "Enviar prompt do diálogo"),
  "dialog.mcp.toggle": keybind("space", "Alternar MCP no diálogo de MCP"),
  "dialog.move_session.new": keybind("ctrl+m", "Nova cópia de projeto"),
  "dialog.move_session.delete": keybind("ctrl+d", "Excluir cópia de projeto"),
  "dialog.move_session.refresh": keybind("ctrl+r", "Atualizar cópias de projeto"),
  "prompt.autocomplete.prev": keybind("up,ctrl+p", "Mover para o item anterior do autocompletar"),
  "prompt.autocomplete.next": keybind("down,ctrl+n", "Mover para o próximo item do autocompletar"),
  "prompt.autocomplete.hide": keybind("escape", "Ocultar autocompletar"),
  "prompt.autocomplete.select": keybind("return", "Selecionar item do autocompletar"),
  "prompt.autocomplete.complete": keybind("tab", "Completar item do autocompletar"),
  "permission.prompt.fullscreen": keybind("ctrl+f", "Alternar tela cheia do prompt de permissão"),
  "plugins.toggle": keybind("space", "Alternar plugin"),
  "dialog.plugins.install": keybind("shift+i", "Instalar plugin a partir do diálogo de plugins"),

  terminal_suspend: keybind("ctrl+z", "Suspender terminal"),
  terminal_title_toggle: keybind("none", "Alternar título do terminal"),
  tips_toggle: keybind("<leader>h", "Alternar dicas na tela inicial"),
  plugin_manager: keybind("none", "Abrir diálogo de gerenciador de plugins"),
  plugin_install: keybind("none", "Instalar plugin"),

  which_key_toggle: keybind("ctrl+alt+k", "Alternar painel which-key"),
  which_key_layout_toggle: keybind("ctrl+alt+shift+k", "Alternar layout do which-key"),
  which_key_pending_toggle: keybind("ctrl+alt+shift+p", "Alternar pré-visualização pendente do which-key"),
  which_key_group_previous: keybind("ctrl+alt+left,ctrl+alt+[", "Grupo anterior do which-key"),
  which_key_group_next: keybind("ctrl+alt+right,ctrl+alt+]", "Próximo grupo do which-key"),
  which_key_scroll_up: keybind("ctrl+alt+up,ctrl+alt+p", "Rolar which-key para cima"),
  which_key_scroll_down: keybind("ctrl+alt+down,ctrl+alt+n", "Rolar which-key para baixo"),
  which_key_page_up: keybind("ctrl+alt+pageup", "Rolar which-key uma página acima"),
  which_key_page_down: keybind("ctrl+alt+pagedown", "Rolar which-key uma página abaixo"),
  which_key_home: keybind("ctrl+alt+home", "Ir para o primeiro atalho do which-key"),
  which_key_end: keybind("ctrl+alt+end", "Ir para o último atalho do which-key"),
} satisfies Record<string, Definition>

type KeybindName = keyof typeof Definitions
const KeybindNames = new Set<string>(Object.keys(Definitions))

export const KeybindOverrides = Schema.Struct(
  Object.fromEntries(
    Object.entries(Definitions).map(([name, item]) => [
      name,
      Schema.optional(BindingValueSchema).annotate({ description: item.description }),
    ]),
  ),
).annotate({ description: "TUI keybinding overrides" })
export const Descriptions = Object.fromEntries(
  Object.entries(Definitions).map(([name, item]) => [name, item.description]),
) as Record<KeybindName, string>
export const CommandMap = {
  app_exit: "app.exit",
  app_debug: "app.debug",
  app_console: "app.console",
  app_heap_snapshot: "app.heap_snapshot",
  app_toggle_animations: "app.toggle.animations",
  app_toggle_file_context: "app.toggle.file_context",
  app_toggle_diffwrap: "app.toggle.diffwrap",
  app_toggle_paste_summary: "app.toggle.paste_summary",
  app_toggle_session_directory_filter: "app.toggle.session_directory_filter",
  command_list: "command.palette.show",
  help_show: "help.show",
  docs_open: "docs.open",
  diff_open: "diff.open",
  diff_close: "diff.close",
  diff_toggle: "diff.toggle",
  diff_expand: "diff.expand",
  diff_expand_all: "diff.expand_all",
  diff_collapse: "diff.collapse",
  diff_switch_focus: "diff.switch_focus",
  diff_next_hunk: "diff.next_hunk",
  diff_previous_hunk: "diff.previous_hunk",
  diff_next_file: "diff.next_file",
  diff_previous_file: "diff.previous_file",
  diff_toggle_file_tree: "diff.toggle_file_tree",
  diff_single_patch: "diff.single_patch",
  diff_switch_source: "diff.switch_source",
  diff_toggle_view: "diff.toggle_view",
  diff_help: "diff.help",
  editor_open: "prompt.editor",
  theme_list: "theme.switch",
  theme_switch_mode: "theme.switch_mode",
  theme_mode_lock: "theme.mode.lock",
  sidebar_toggle: "session.sidebar.toggle",
  scrollbar_toggle: "session.toggle.scrollbar",
  status_view: "opencode.status",
  debug_view: "opencode.debug",
  session_export: "session.export",
  session_copy: "session.copy",
  session_move: "session.move",
  session_new: "session.new",
  session_list: "session.list",
  session_timeline: "session.timeline",
  session_fork: "session.fork",
  session_rename: "session.rename",
  session_delete: "session.delete",
  session_share: "session.share",
  session_unshare: "session.unshare",
  session_interrupt: "session.interrupt",
  session_background: "session.background",
  session_compact: "session.compact",
  session_toggle_timestamps: "session.toggle.timestamps",
  session_toggle_generic_tool_output: "session.toggle.generic_tool_output",
  session_queued_prompts: "session.queued_prompts",
  session_child_first: "session.child.first",
  session_child_cycle: "session.child.next",
  session_child_cycle_reverse: "session.child.previous",
  session_parent: "session.parent",
  session_pin_toggle: "session.pin.toggle",
  session_quick_switch_1: "session.quick_switch.1",
  session_quick_switch_2: "session.quick_switch.2",
  session_quick_switch_3: "session.quick_switch.3",
  session_quick_switch_4: "session.quick_switch.4",
  session_quick_switch_5: "session.quick_switch.5",
  session_quick_switch_6: "session.quick_switch.6",
  session_quick_switch_7: "session.quick_switch.7",
  session_quick_switch_8: "session.quick_switch.8",
  session_quick_switch_9: "session.quick_switch.9",
  stash_delete: "stash.delete",
  model_provider_list: "model.dialog.provider",
  model_favorite_toggle: "model.dialog.favorite",
  model_list: "model.list",
  model_cycle_recent: "model.cycle_recent",
  model_cycle_recent_reverse: "model.cycle_recent_reverse",
  model_cycle_favorite: "model.cycle_favorite",
  model_cycle_favorite_reverse: "model.cycle_favorite_reverse",
  mcp_list: "mcp.list",
  provider_connect: "provider.connect",
  console_org_switch: "console.org.switch",
  agent_list: "agent.list",
  agent_cycle: "agent.cycle",
  agent_cycle_reverse: "agent.cycle.reverse",
  variant_cycle: "variant.cycle",
  variant_list: "variant.list",
  messages_page_up: "session.page.up",
  messages_page_down: "session.page.down",
  messages_line_up: "session.line.up",
  messages_line_down: "session.line.down",
  messages_half_page_up: "session.half.page.up",
  messages_half_page_down: "session.half.page.down",
  messages_first: "session.first",
  messages_last: "session.last",
  messages_next: "session.message.next",
  messages_previous: "session.message.previous",
  messages_last_user: "session.messages_last_user",
  messages_copy: "messages.copy",
  messages_undo: "session.undo",
  messages_redo: "session.redo",
  messages_toggle_conceal: "session.toggle.conceal",
  tool_details: "session.toggle.actions",
  display_thinking: "session.toggle.thinking",
  prompt_submit: "prompt.submit",
  prompt_editor_context_clear: "prompt.editor_context.clear",
  prompt_skills: "prompt.skills",
  prompt_stash: "prompt.stash",
  prompt_stash_pop: "prompt.stash.pop",
  prompt_stash_list: "prompt.stash.list",
  workspace_set: "workspace.set",
  input_clear: "prompt.clear",
  input_paste: "prompt.paste",
  input_submit: "input.submit",
  input_newline: "input.newline",
  input_move_left: "input.move.left",
  input_move_right: "input.move.right",
  input_move_up: "input.move.up",
  input_move_down: "input.move.down",
  input_select_left: "input.select.left",
  input_select_right: "input.select.right",
  input_select_up: "input.select.up",
  input_select_down: "input.select.down",
  input_line_home: "input.line.home",
  input_line_end: "input.line.end",
  input_select_line_home: "input.select.line.home",
  input_select_line_end: "input.select.line.end",
  input_visual_line_home: "input.visual.line.home",
  input_visual_line_end: "input.visual.line.end",
  input_select_visual_line_home: "input.select.visual.line.home",
  input_select_visual_line_end: "input.select.visual.line.end",
  input_buffer_home: "input.buffer.home",
  input_buffer_end: "input.buffer.end",
  input_select_buffer_home: "input.select.buffer.home",
  input_select_buffer_end: "input.select.buffer.end",
  input_delete_line: "input.delete.line",
  input_delete_to_line_end: "input.delete.to.line.end",
  input_delete_to_line_start: "input.delete.to.line.start",
  input_backspace: "input.backspace",
  input_delete: "input.delete",
  input_undo: "input.undo",
  input_redo: "input.redo",
  input_word_forward: "input.word.forward",
  input_word_backward: "input.word.backward",
  input_select_word_forward: "input.select.word.forward",
  input_select_word_backward: "input.select.word.backward",
  input_delete_word_forward: "input.delete.word.forward",
  input_delete_word_backward: "input.delete.word.backward",
  input_select_all: "input.select.all",
  history_previous: "prompt.history.previous",
  history_next: "prompt.history.next",
  terminal_suspend: "terminal.suspend",
  terminal_title_toggle: "terminal.title.toggle",
  tips_toggle: "tips.toggle",
  plugin_manager: "plugins.list",
  plugin_install: "plugins.install",
  which_key_toggle: "which-key.toggle",
  which_key_layout_toggle: "which-key.layout.toggle",
  which_key_pending_toggle: "which-key.pending.toggle",
  which_key_group_previous: "which-key.group.previous",
  which_key_group_next: "which-key.group.next",
  which_key_scroll_up: "which-key.scroll.up",
  which_key_scroll_down: "which-key.scroll.down",
  which_key_page_up: "which-key.page.up",
  which_key_page_down: "which-key.page.down",
  which_key_home: "which-key.home",
  which_key_end: "which-key.end",
} satisfies BindingCommandMap
const CommandDescriptions = Object.fromEntries(
  Object.entries(Definitions).map(([name, item]) => [
    CommandMap[name as keyof typeof CommandMap] ?? name,
    item.description,
  ]),
) as Record<string, string>

export type Keybinds = { [K in KeybindName]: BindingValueSchema }
export type KeybindOverrides = Partial<Keybinds>
export type BindingLookupView = {
  readonly bindings: readonly Binding<Renderable, KeyEvent>[]
  get(command: string): readonly Binding<Renderable, KeyEvent>[]
  has(command: string): boolean
  gather(name: string, commands: readonly string[]): readonly Binding<Renderable, KeyEvent>[]
  pick(name: string, commands: readonly string[]): Binding<Renderable, KeyEvent>[]
  omit(name: string, commands: readonly string[]): Binding<Renderable, KeyEvent>[]
}

export function toBindingConfig(keybinds: Keybinds): BindingConfig<Renderable, KeyEvent> {
  return Object.fromEntries(Object.entries(keybinds)) as BindingConfig<Renderable, KeyEvent>
}

const decodeBindingValue = Schema.decodeUnknownSync(BindingValueSchema)

export function defaultValue(name: KeybindName) {
  return Definitions[name].default
}

export function parse(keybinds: KeybindOverrides): Keybinds {
  const invalid = unknownKeys(keybinds)
  if (invalid.length) throw new Error(`Unrecognized keybind${invalid.length === 1 ? "" : "s"}: ${invalid.join(", ")}`)
  return Object.fromEntries(
    Object.entries(Definitions).map(([name, item]) => [
      name,
      decodeBindingValue(keybinds[name as KeybindName] ?? item.default),
    ]),
  ) as Keybinds
}

export const Keybinds = { parse }

export function unknownKeys(input: object) {
  return Object.keys(input).filter((key) => !KeybindNames.has(key))
}

export function bindingDefaults(): BindingDefaults<Renderable, KeyEvent> {
  return ({ command, binding }) => {
    if (binding.desc !== undefined) return
    return { desc: CommandDescriptions[command] }
  }
}
