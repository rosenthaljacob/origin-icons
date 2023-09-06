import DrawOptions from './options/DrawOptions'

export const TOOL_LIST = [
  {
    name: 'draw',
    icon: 'tabler:brush',
    label: 'Draw',
    optionsComponent: <DrawOptions />
  },
  {
    name: 'pan',
    icon: 'tabler:move',
    label: 'Pan',
    optionsComponent: null
  },
  {
    name: 'select',
    icon: 'tabler:cursor',
    label: 'Select',
    optionsComponent: null
  },
  {
    name: 'circle',
    icon: 'tabler:circle',
    label: 'Circle',
    optionsComponent: null
  },
  {
    name: 'ellipse',
    icon: 'tabler:circle',
    label: 'Ellipse',
    optionsComponent: null
  },
  {
    name: 'rectangle',
    icon: 'tabler:square',
    label: 'Rectangle',
    optionsComponent: null
  }
]
