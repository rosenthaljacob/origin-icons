import React, { createContext, useState, useMemo } from 'react'

interface CanvasUpdaterContextValue {
  updateCanvas: () => void
  updateSubscriber: number
}

interface CanvasUpdaterProviderProps {
  children: React.ReactNode
}

export const CanvasUpdaterContext = createContext<CanvasUpdaterContextValue | undefined>(undefined)

export default function CanvasUpdaterProvider({ children }: CanvasUpdaterProviderProps) {
  const [updateSubscriber, setUpdateSubscriber] = useState(0)

  const updateCanvas = () => setUpdateSubscriber(prev => prev + 1)

  const value = useMemo(() => ({ updateCanvas, updateSubscriber }), [updateSubscriber, updateCanvas])
  return <CanvasUpdaterContext.Provider value={value}>{children}</CanvasUpdaterContext.Provider>
}
