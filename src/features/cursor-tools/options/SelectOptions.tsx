import React from 'react'
// @mui
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
// Hooks
import { useSelectedElements } from 'src/hooks/useSelectedElements'
import { useCavasUpdater } from 'src/hooks/useCanvasUpdater'
// Local Components
import FillOption from './components/Fill'
import StrokeOption from './components/Stroke'
import LineCap from './components/LineCap'
import StrokeWidth from './components/StrokeWidth'
// svg.js
import { SVG } from '@svgdotjs/svg.js'
// Utils
import { handleAttributeChange } from 'src/utils/svgManipulation'

const SHAPE_TAGS = ['rect', 'circle', 'ellipse', 'polygon']
const LINE_TAGS = ['line', 'polyline', 'path']

const getAttribute = (element: SVGElement, attribute: string) => {
  return (element.style[attribute as keyof CSSStyleDeclaration] as string) ?? SVG(element).attr(attribute)
}

const ElementEditOption: React.FC<{ elements: SVGElement[]; tagName: SVGElement['tagName'] }> = ({
  elements,
  tagName
}) => {
  const { updateCanvas, updateSubscriber } = useCavasUpdater()

  const getDefaultAttributeValue = (attribute: string) => {
    const firstElementAttrValue = getAttribute(elements[0], attribute)

    return elements.every(el => getAttribute(el, attribute) === firstElementAttrValue) ? firstElementAttrValue : null
  }

  const getChangeAttribute = (attribute: string) => (value: string | number) => {
    elements.forEach(el => (el.style[attribute as any] = value.toString()))
    updateCanvas()
  }

  if (SHAPE_TAGS.includes(tagName)) {
    return (
      <>
        <FillOption fillColor={getDefaultAttributeValue('fill')} setFillColor={getChangeAttribute('fill')} />
        <StrokeOption strokeColor={getDefaultAttributeValue('stroke')} setStrokeColor={getChangeAttribute('stroke')} />
        <StrokeWidth
          strokeWidth={getDefaultAttributeValue('stroke-width')}
          setStrokeWidth={getChangeAttribute('stroke-width')}
        />
      </>
    )
  }

  if (LINE_TAGS.includes(tagName)) {
    return (
      <>
        <StrokeOption strokeColor={getDefaultAttributeValue('stroke')} setStrokeColor={getChangeAttribute('stroke')} />
        <LineCap
          lineCap={getDefaultAttributeValue('stroke-linecap')}
          setLineCap={getChangeAttribute('stroke-linecap')}
        />
        <StrokeWidth
          strokeWidth={getDefaultAttributeValue('stroke-width')}
          setStrokeWidth={getChangeAttribute('stroke-width')}
        />
      </>
    )
  }

  return null
}

export default function SelectOptions() {
  const { selectedElements } = useSelectedElements()

  let assortedElements: Record<SVGElement['tagName'], SVGElement[]> = {}
  for (const el of selectedElements) {
    if (el.tagName in assortedElements) {
      assortedElements[el.tagName].push(el)
    } else {
      assortedElements[el.tagName] = [el]
    }
  }

  return (
    <>
      {Object.entries(assortedElements).map(([tagName, elements]) => (
        <Accordion key={tagName}>
          <AccordionSummary>
            {tagName} ({elements.length})
          </AccordionSummary>
          <AccordionDetails>
            <ElementEditOption elements={elements} tagName={tagName} />
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  )
}
