import { useContext } from 'react'
import { SelectedElementsContext } from 'src/features/canvas/SelectedElementsProvider'

export const useSelectedElements = () => {
  const context = useContext(SelectedElementsContext)
  if (context === undefined) throw new Error('useSelectedElements must be used within a SelectedElementsProvider')
  return context
}
