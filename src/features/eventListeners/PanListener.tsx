import React, { useState, useEffect } from 'react'

// Canvas
import { useCanvas } from 'src/features/canvas/CanvasProvider'

interface PanStartEvent {
  initPan: { x: number; y: number }
  mousePosition: { x: number; y: number }
}

export default function PanListener() {
  // Canvas
  const { mouseData, pan, setPan } = useCanvas()
  const { relativeMousePosition, client, isMouseDown } = mouseData

  // State
  const [panStartEvent, setPanStartEvent] = useState<PanStartEvent | null>(null)

  // Effects
  useEffect(() => {
    if (!isMouseDown) {
      if (panStartEvent) {
        setPanStartEvent(null)
      }

      return
    }

    if (!panStartEvent) {
      setPanStartEvent({
        initPan: { x: pan.x, y: pan.y },
        mousePosition: client
      })

      return
    }

    const updatePan = () => {
      setPan({
        x: panStartEvent.initPan.x + (client.x - panStartEvent.mousePosition.x),
        y: panStartEvent.initPan.y + (client.y - panStartEvent.mousePosition.y)
      })
    }

    updatePan()
  }, [relativeMousePosition, isMouseDown])

  return null
}
