type Coordinate = {
  x: number
  y: number
}

// Calculates the cx, cy, and r values for a circle given two points
export function calculateCircle(point1: Coordinate, point2: Coordinate) {
  // Calculate the midpoint between the two points for cx and cy
  const cx = (point1.x + point2.x) / 2
  const cy = (point1.y + point2.y) / 2

  // Calculate the distance between the two points
  const dx = point2.x - point1.x
  const dy = point2.y - point1.y
  const distance = Math.sqrt(dx * dx + dy * dy)

  // The radius is half the distance between the two points
  const r = distance / 2

  return { cx, cy, r }
}

export function calculateEllipse(point1: Coordinate, point2: Coordinate) {
  // Calculate the midpoint between the two points for cx and cy
  const cx = (point1.x + point2.x) / 2
  const cy = (point1.y + point2.y) / 2

  // Calculate the distance between the two points along the x and y axes
  const dx = Math.abs(point2.x - point1.x)
  const dy = Math.abs(point2.y - point1.y)

  // The radii are half the distance between the two points along the x and y axes
  const rx = dx / 2
  const ry = dy / 2

  return { cx, cy, rx, ry }
}

export function calculateRectangle(point1: Coordinate, point2: Coordinate) {
  const x = Math.min(point1.x, point2.x)
  const y = Math.min(point1.y, point2.y)
  const width = Math.abs(point2.x - point1.x)
  const height = Math.abs(point2.y - point1.y)

  return { x, y, width, height }
}
