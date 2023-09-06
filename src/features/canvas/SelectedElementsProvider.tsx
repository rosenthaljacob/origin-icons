import React, { useState, createContext, useMemo } from 'react'

interface SelectedElementsProviderProps {
  children: React.ReactNode
}

interface SelectedElementsContextValue {
  selectedElements: SVGElement[]
  setSelectedElements: React.Dispatch<React.SetStateAction<SVGElement[]>>
}

export const SelectedElementsContext = createContext<SelectedElementsContextValue | undefined>(undefined)

export default function SelectedElementsProvider({ children }: SelectedElementsProviderProps) {
  const [selectedElements, setSelectedElements] = useState<SVGElement[]>([])

  const value = { selectedElements, setSelectedElements }
  return <SelectedElementsContext.Provider value={value}>{children}</SelectedElementsContext.Provider>
}
