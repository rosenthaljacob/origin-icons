import React, { useEffect, useState } from 'react'
// Local
import HoverElement from './HoverElement'
import SelectedElements from './SelectedElements'
import { useSelectedElements } from 'src/hooks/useSelectedElements'

export default function SelectListener() {
  const { selectedElements, setSelectedElements } = useSelectedElements()
  const [hoverElement, setHoverElement] = useState<SVGElement | null>(null)

  const handleMouseOver = (ev: MouseEvent) => {
    const target = ev.target as SVGElement
    if (target.tagName === 'svg') return setHoverElement(null)

    setHoverElement(target)
  }
  const handleMouseDown = (ev: MouseEvent) => {
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
    if (typeof window === 'undefined') return

    const svg = document.getElementById('svg-canvas')
    if (!svg) return

    svg.addEventListener('mousemove', handleMouseOver)
    svg.addEventListener('click', handleMouseDown)

    return () => {
      svg.removeEventListener('mousemove', handleMouseOver)
      svg.removeEventListener('click', handleMouseDown)
    }
  }, [selectedElements, hoverElement])
  return (
    <>
      <HoverElement hoverElement={hoverElement} />
      <SelectedElements />
    </>
  )
}
