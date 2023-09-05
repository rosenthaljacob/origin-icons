import { SVG } from '@svgdotjs/svg.js'

export const shiftElement = (element: SVGElement, x: number, y: number) => {
  const el = SVG(element)
  el.dmove(x, y)
}
