import React, { useEffect, useMemo, useState } from 'react'
import { Box, Button, ButtonGroup, Typography } from '@mui/material'
import type { Control, IControlState } from '@q-sys/qrwc'
import {
  Cast,
  Computer,
  Panorama,
  PhoneIphone,
  SettingsInputHdmi,
  Tv,
} from '@mui/icons-material'

type IconSpec = React.ElementType | keyof typeof ICON_MAP | string

const ICON_MAP = {
  Cast,
  Computer,
  Panorama,
  PhoneIphone,
  SettingsInputHdmi,
  Tv,
} as const

interface VideoRoutingProps {
  choiceControl?: Control
  indexControl?: Control
  labels?: string[]
  icons?: IconSpec[]
}

function filterFollowHdmi(choices: string[]) {
  return choices.filter(
    (c) =>
      !/follow/i.test(c) &&   // “Follow HDMI”, “Follow H1”
      !/^follow/i.test(c)
  )
}

function normalizeChoices(raw: unknown): string[] {
  if (!raw) return []
  if (Array.isArray(raw) && raw.every((x) => typeof x === 'string')) return raw as string[]
  if (Array.isArray(raw)) {
    return (raw as any[]).map((c) =>
      typeof c === 'string' ? c : c?.String ?? c?.Label ?? c?.Text ?? ''
    )
  }
  return []
}

function prettyLabel(label: string) {
  return label.replace(/([A-Za-z]+)(\d+)/, '$1 $2')
}

function defaultIconFor(choice: string): React.ElementType | undefined {
  if (choice.startsWith('Graphic')) return Panorama
  if (choice.startsWith('HDMI')) return SettingsInputHdmi
  return undefined
}

function resolveIcon(icon: IconSpec | undefined): React.ElementType | undefined {
  if (!icon) return undefined
  if (typeof icon === 'function') return icon // already a component
  return (ICON_MAP as any)[icon] // string lookup (may be undefined)
}

export default function VideoRouting({ choiceControl, indexControl, labels, icons }: VideoRoutingProps) {
    const [choices, setChoices] = useState<string[]>([])
    const [currentName, setCurrentName] = useState<string>('') // from choiceControl.String
    const [currentIndex, setCurrentIndex] = useState<number | null>(null) // from indexControl.Value

    // Infer whether the index control is 0- or 1-based (best-effort)
    const indexBase = useMemo(() => {
        if (!choices.length || currentIndex == null) return 0
        return currentIndex >= 1 && currentIndex <= choices.length ? 1 : 0
    }, [choices.length, currentIndex])

    // Subscribe to the CHOICE control (labels + choices)
    useEffect(() => {
        if (!choiceControl) return
        
        setCurrentName(choiceControl.state.String ?? '')
        setChoices(filterFollowHdmi(normalizeChoices((choiceControl.state as any).Choices)))

        const onUpdate = (state: IControlState) => {
        setCurrentName(state.String ?? '')
        setChoices(filterFollowHdmi(normalizeChoices((state as any).Choices)))
        }

        choiceControl.on('update', onUpdate)
        return () => choiceControl.removeListener('update', onUpdate)
    }, [choiceControl])

    // Subscribe to the INDEX control (sync when route changes elsewhere)
    useEffect(() => {
        if (!indexControl) return

        const initial = indexControl.state.Value
        setCurrentIndex(typeof initial === 'number' ? initial : null)

        const onUpdate = (state: IControlState) => {
        const v = state.Value
        setCurrentIndex(typeof v === 'number' ? v : null)
        }

        indexControl.on('update', onUpdate)
        return () => indexControl.removeListener('update', onUpdate)
    }, [indexControl])

    // If index changes (automation/other UI), derive currentName as fallback
    useEffect(() => {
        if (!choices.length || currentIndex == null) return
        const i = currentIndex - indexBase
        if (i >= 0 && i < choices.length) {
        const inferredName = choices[i]
        // Only override if choiceControl isn't already giving us a matching name
        if (!currentName || !choices.includes(currentName)) {
            setCurrentName(inferredName)
        }
        }
    }, [choices, currentIndex, indexBase, currentName])

    const handleSelect = async (choice: string, idx: number) => {
        // Preferred: set via string choice control (your "pretty.name" control)
        if (choiceControl) {
        await choiceControl.update(choice)
        return
        }
        // Fallback: set via index control if no choiceControl provided
        if (indexControl) {
        await indexControl.update(idx + indexBase)
        }
    }

    if (!choiceControl && !indexControl) return null

    if (!choices.length) {
        return (
        <Typography variant="caption" color="text.secondary">
            No routing choices available.
        </Typography>
        )
    }

    return (
        <Box sx={{ display: 'flex', '& > *': { m: 1 } }}>
        <ButtonGroup orientation="vertical" aria-label="Video Routing Button Group" fullWidth>
            {choices.map((choice, idx) => {
            const displayLabel = labels?.[idx] ?? prettyLabel(choice)

            const iconSpec = icons?.[idx]
            const Icon =
                resolveIcon(iconSpec) ?? defaultIconFor(choice)

            // Selected if currentName matches, OR index matches (backup)
            const selectedByName = currentName === choice
            const selectedByIndex =
                currentIndex != null && (currentIndex - indexBase) === idx
            const selected = selectedByName || selectedByIndex

            return (
                <Button
                key={`${idx}-${choice}`}
                variant={selected ? 'contained' : 'outlined'}
                onClick={() => handleSelect(choice, idx)}
                sx={{ justifyContent: 'flex-start' }}
                >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, width: '100%'}}>
                    {Icon ? <Icon fontSize="small" /> : null}
                    <Typography variant="button" sx={{ textTransform: 'none' }}>
                    {displayLabel}
                    </Typography>
                </Box>
                </Button>
            )
            })}
        </ButtonGroup>
        </Box>
    )
}