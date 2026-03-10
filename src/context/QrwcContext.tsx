import React, { createContext, useState, useEffect, useContext } from 'react'
import { Qrwc, Control } from '@q-sys/qrwc'

const QrwcContext = createContext<{
  initialized: boolean
  controls: { [key: string]: Control }
}>({
  initialized: false,
  controls: {},
})

export function useQrwc() {
  return useContext(QrwcContext)
}

export default function QrwcProvider({
  children
}: {
  children: React.JSX.Element
}) {

  const [controls, setControls] = useState<{ [key: string]: Control }>({})
  const reconnectDelay = 5000

  /**
   * Setup qrwc and reconnection logic.
   */
  useEffect(() => {
    const setupQrwc = async () => {
      const coreIP = process.env.REACT_APP_CORE_IP_ADDRESS ?? ''
      const socket = new WebSocket(`ws://${coreIP}/qrc-public-api/v0`)
      const qrwc = await Qrwc.createQrwc<{
        Text_Box: 'text.1'
        'LD-Controls': 'toggle.1' | 'toggle.2' | 'percent.1' | 'percent.2' | 'percent.3' | 'percent.4'
        'LD-Preset_1': 'input'
        'LD-Preset_2': 'input'
        'LD-Preset_3': 'input'
        Gain: 'gain' | 'mute'
        Momentary: 'momentary.1'
        Toggle: 'toggle.1'
        LED: 'led.1'
        'RL-FlipFlop': 'set' | 'reset' | 'toggle' | 'state' | 'out' | 'not'
        'AC-Meters': 'meter.1' | 'meter.2' | 'meter.3'
        'AC-Gain_1': 'gain' | 'mute'
        'AC-Gain_2': 'gain' | 'mute'
        'HVAC v2': 'Up' | 'Down' | 'currentTemp' | 'setPoint' | 'ACOn' | 'HeatOn'
        'HVAC-Shades': 'output.1.input.1.select' | 'output.1.input.2.select' | 'output.1.input.3.select' | 'output.1.input.4.select' | 'output.1.input.5.select' | 'output.1.input.6.select' | 'output.1.input.7.select' | 'output.1.input.8.select'
        'Design-Status': 'status'
        'Display-Routing': 'hdmi.out.1.select.index' |'hdmi.out.1.select.pretty.name' | 'hdmi.out.2.select.index' | 'hdmi.out.2.select.pretty.name'
      }>({
        socket, // Required
        timeout: 3000, // Optional; Default: 5000 (ms)
        pollingInterval: 100, //Optional; Default: 350 (ms)
      })


      qrwc.on('disconnected', () => {
        setTimeout(setupQrwc, reconnectDelay)
      })

      setControls({
        gain: qrwc.components.Gain.controls.gain,
        mute: qrwc.components.Gain.controls.mute,
        text: qrwc.components.Text_Box.controls['text.1'],
        toggle1: qrwc.components['LD-Controls'].controls['toggle.1'],
        toggle2: qrwc.components['LD-Controls'].controls['toggle.2'],
        Momentary: qrwc.components.Momentary.controls['momentary.1'],
        LED: qrwc.components.LED.controls['led.1'],
        Toggle: qrwc.components.Toggle.controls['toggle.1'],
        OpenAirwall: qrwc.components['RL-FlipFlop'].controls['set'],
        CloseAirwall: qrwc.components['RL-FlipFlop'].controls['reset'],
        AirwallState: qrwc.components['RL-FlipFlop'].controls['state'],
        'LD-Perimeter': qrwc.components['LD-Controls'].controls['percent.1'],
        'LD-FrontWall': qrwc.components['LD-Controls'].controls['percent.2'],
        'LD-Table': qrwc.components['LD-Controls'].controls['percent.3'],
        'LD-Master': qrwc.components['LD-Controls'].controls['percent.4'],
        LightingPreset1: qrwc.components['LD-Preset_1'].controls['input'],
        LightingPreset2: qrwc.components['LD-Preset_2'].controls['input'],
        LightingPreset3: qrwc.components['LD-Preset_3'].controls['input'],
        MicrophoneInput: qrwc.components['AC-Meters'].controls['meter.1'],
        MicrophoneMute: qrwc.components['AC-Gain_1'].controls.mute,
        LoudspeakerOut1: qrwc.components['AC-Meters'].controls['meter.2'],
        LoudspeakerOut2: qrwc.components['AC-Meters'].controls['meter.3'],
        LoudspeakerMute: qrwc.components['AC-Gain_2'].controls.mute,
        DisplayLeftPower: qrwc.components['LD-Controls'].controls['toggle.1'],
        DisplayRightPower: qrwc.components['LD-Controls'].controls['toggle.2'],
        ACUp: qrwc.components['HVAC v2'].controls['Up'],
        ACDown: qrwc.components['HVAC v2'].controls['Down'],
        ACSetPoint: qrwc.components['HVAC v2'].controls['setPoint'],
        ACCurrentTemp: qrwc.components['HVAC v2'].controls['currentTemp'],
        ACOn: qrwc.components['HVAC v2'].controls['ACOn'],
        HeatOn: qrwc.components['HVAC v2'].controls['HeatOn'],
        ShadesUp: qrwc.components['HVAC-Shades'].controls['output.1.input.3.select'],
        ShadesDown: qrwc.components['HVAC-Shades'].controls['output.1.input.1.select'],
        ShadesCustom: qrwc.components['HVAC-Shades'].controls['output.1.input.2.select'],
        DesignStatus: qrwc.components['Design-Status'].controls['status'],
        LeftDisplayIndex: qrwc.components['Display-Routing'].controls['hdmi.out.1.select.index'],
        LeftDisplayName: qrwc.components['Display-Routing'].controls['hdmi.out.1.select.pretty.name'],
        RightDisplayIndex: qrwc.components['Display-Routing'].controls['hdmi.out.2.select.index'],
        RightDisplayName: qrwc.components['Display-Routing'].controls['hdmi.out.2.select.pretty.name']
      })

      return qrwc
    }
    const qrwc = setupQrwc()

    return () => {
      qrwc.then((qrwc) => {
        qrwc.close()
      })
    }
  }, [])

  return (
    <QrwcContext.Provider
      value={{
        controls,
        initialized: Object.values(controls).every(Boolean),
      }}
    >
      {children}
    </QrwcContext.Provider>
  )
}