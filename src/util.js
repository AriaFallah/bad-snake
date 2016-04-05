// @flow

import type { Canvas, Pos } from './types'

// Check if the snake hit itself
export function collidingWithSelf({ x, y }: Pos, body: Array<Pos>): boolean {
  for (let i = 0; i < body.length; i++) {
    if (body[i].x === x && body[i].y === y) return true
  }
  return false
}

// Create the location of the food
export function createFood({ cellWidth, height, width }: Canvas): Pos {
  return {
    x: Math.round(Math.random() * (width - cellWidth) / cellWidth),
    y: Math.round(Math.random() * (height - cellWidth) / cellWidth),
  }
}

// Create an array of cells representing the snake body
export function createSnake(length: number): Array<Object> {
  const snakeArray = []
  for (let i = 0; i < length; ++i) {
    snakeArray.push({ x: i, y: 0 })
  }
  return snakeArray
}

// Check the lose conditions for the game
export function didLose(body: Array<Object>, canvas: Canvas, head: Pos): boolean {
  return isOutOfBounds(head, canvas) || collidingWithSelf(head, body)
}

// Check if the snake has left the canvas
export function isOutOfBounds({ cellWidth, height, width }: Canvas, { x, y }: Pos): boolean {
  return x < 0 || y < 0 || x >= width / cellWidth || y >= height / cellWidth
}

// Paint a single cell of a canvas
export function paintCell({ cellWidth, ctx }: Canvas, { x, y }: Pos) {
  ctx.fillStyle = 'blue'
  ctx.strokeStyle = 'white'
  ctx.fillRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth)
  ctx.strokeRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth)
}
