export const navItems = [
  { id: 'room-layout', label: 'Room Setup' },
  { id: 'lighting', label: 'Lighting Controls' },
  { id: 'audio', label: 'Audio Controls' },
  { id: 'displays', label: 'Display Controls' },
  { id: 'hvac', label: 'A/C & Shades' },
] as const

export type NavItemId = typeof navItems[number]['id']

export const navLabelMap = Object.fromEntries(
  navItems.map(item => [item.id, item.label])
) as Record<NavItemId, string>