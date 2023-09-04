import React, { useEffect, useState } from 'react'
// Local
import HoverElement from './HoverElement'

export default function SelectListener() {
  const [hoverElement, setHoverElement] = useState<SVGElement | null>(null)
  const [selectedElements, setSelectedElements] = useState<SVGElement[]>([])

  const handleMouseOver = (ev: MouseEvent) => {
    const target = ev.target as SVGElement
    if (target.tagName === 'svg') return setHoverElement(null)

    setHoverElement(target)
  }
  const handleMouseDown = (ev: MouseEvent) => {
    const target = ev.target as SVGElement

    if (!hoverElement) {
      // Start drag select here
      setSelectedElements([])
      return
    }

    if (ev.shiftKey) {
      if (selectedElements.includes(hoverElement))
        return setSelectedElements(selectedElements.filter(el => el !== hoverElement))

      return setSelectedElements(prev => [...prev, hoverElement])
    }

    setSelectedElements([hoverElement])
  }

  useEffect(() => {
    console.log('hoverElement', hoverElement)
  }, [hoverElement])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const svg = document.getElementById('svg-canvas')
    if (!svg) return

    svg.addEventListener('mousemove', e => handleMouseOver(e))

    return () => {
      svg.removeEventListener('mousemove', e => handleMouseOver(e))
    }
  }, [])
  return (
    <>
      <HoverElement hoverElement={hoverElement} />
    </>
  )
}
