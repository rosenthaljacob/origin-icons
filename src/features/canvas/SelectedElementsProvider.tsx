import React, { useState, createContext, useMemo } from 'react'

interface SelectedElementsProviderProps {
  children: React.ReactNode
}

interface SelectedElementsContextValue {
  selectedElements: SVGElement[]
  setSelectedElements: React.Dispatch<React.SetStateAction<SVGElement[]>>
  hoverElement: SVGElement | null
  setHoverElement: React.Dispatch<React.SetStateAction<SVGElement | null>>
}

export const SelectedElementsContext = createContext<SelectedElementsContextValue | undefined>(undefined)

export default function SelectedElementsProvider({ children }: SelectedElementsProviderProps) {
  const [selectedElements, setSelectedElements] = useState<SVGElement[]>([])
  const [hoverElement, setHoverElement] = useState<SVGElement | null>(null)

  const value = { selectedElements, setSelectedElements, hoverElement, setHoverElement }
  return <SelectedElementsContext.Provider value={value}>{children}</SelectedElementsContext.Provider>
}
