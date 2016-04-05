// Check for a collision
export function checkCollision(x: number, y: number, array: Array<Object>): boolean {
  for (let i = 0; i < array.length; i++) {
    if (array[i].x === x && array[i].y === y) return true
  }
  return false
}

// Lets create the food now
export function createFood(w: number, h: number, cw: number): Object {
  return {
    x: Math.round(Math.random() * (w - cw) / cw),
    y: Math.round(Math.random() * (h - cw) / cw),
  }
}

// Create an array of cells representing our snake
export function createSnake(): Array<Object> {
  const snakeArray = []
  for (let i = 0; i < 5; ++i) {
    snakeArray.push({ x: i, y: 0 })
  }
  return snakeArray
}

// Paint a single cell of a canvas
export function paintCell(ctx: Object, x: number, y: number, cw: number) {
  ctx.fillStyle = 'blue'
  ctx.strokeStyle = 'white'
  ctx.fillRect(x * cw, y * cw, cw, cw)
  ctx.strokeRect(x * cw, y * cw, cw, cw)
}
