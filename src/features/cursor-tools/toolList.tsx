import DrawOptions from './options/DrawOptions'
import ShapeOptions from './options/ShapeOptions'

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
    optionsComponent: <ShapeOptions />
  },
  {
    name: 'ellipse',
    icon: 'tabler:circle',
    label: 'Ellipse',
    optionsComponent: <ShapeOptions />
  },
  {
    name: 'rectangle',
    icon: 'tabler:square',
    label: 'Rectangle',
    optionsComponent: <ShapeOptions />
  },
  {
    name: 'line',
    icon: 'tabler:line',
    label: 'Line',
    optionsComponent: null
  }
]
