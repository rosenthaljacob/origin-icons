import DrawOptions from './options/DrawOptions'

export const TOOL_LIST = [
  {
    name: 'draw',
    icon: 'tabler:brush',
    label: 'Path',
    optionsComponent: <DrawOptions />
  },
  {
    name: 'pan',
    icon: 'tabler:move',
    label: 'Pan',
    optionsComponent: null
  }
]
