import { useContext } from 'react'
import { CanvasUpdaterContext } from 'src/features/canvas/CanvasUpdaterProvider'

export const useCavasUpdater = () => {
  const context = useContext(CanvasUpdaterContext)
  if (context === undefined) throw new Error('useCanvasUpdater must be used within a CanvasUpdaterProvider')
  return context
}
