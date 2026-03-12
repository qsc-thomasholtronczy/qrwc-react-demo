import type { Control } from '@q-sys/qrwc'

// QRWC Controls Array. the format is [Q-SYS ComponentName]: [Q-SYS Control CodeName]
export const COMPONENT_CONTROLS = {
  'Design-Status': ['status'],

  'RL-FlipFlop': ['set', 'reset', 'state'],

  'LD-Controls': [ 'toggle.1', 'toggle.2', 'percent.1', 'percent.2', 'percent.3', 'percent.4' ],

  'LD-Preset_1': ['input'],
  'LD-Preset_2': ['input'],
  'LD-Preset_3': ['input'],
  'Preset_Save_1': ['percent.output'],
  'Preset_Save_2': ['percent.output'],
  'Preset_Save_3': ['percent.output'],

  'AC-Meters': ['meter.1', 'meter.2', 'meter.3'],
  'AC-Gain_1': ['mute'],
  'AC-Gain_2': ['mute'],

  'HVAC v2': ['Up', 'Down', 'setPoint', 'currentTemp', 'ACOn', 'HeatOn'],

  'HVAC-Shades': [ 'output.1.input.3.select', 'output.1.input.1.select', 'output.1.input.2.select' ],

  'Display-Routing': [ 'hdmi.out.1.select.index', 'hdmi.out.1.select.pretty.name', 'hdmi.out.2.select.index', 'hdmi.out.2.select.pretty.name'],
} as const

export type ComponentName = keyof typeof COMPONENT_CONTROLS

// Control IDs depend on component
export type ControlIdForComponent<C extends ComponentName> =
  (typeof COMPONENT_CONTROLS)[C][number]

/**
 * Strongly typed nested controls dictionary:
 * controls['AC-Meters']['meter.3'] -> Control | undefined
 */
export type ControlDictionary = {
  [C in ComponentName]?: {
    [I in ControlIdForComponent<C>]?: Control
  }
}
