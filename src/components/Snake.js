// @flow

import React, { Component } from 'react'
import type { Canvas, Pos, Snake } from '../types'
import { createFood, createSnake, didLose, paintCell } from '../util'

const Game = class Game extends Component {
  canvas: Canvas = { cellWidth: 10, ctx: {}, height: 450, width: 450 };
  food: Pos;
  score: number = 0;
  snake: Snake;

  componentDidMount() {
    this.init()
    setInterval(this.paint, 60)
    document.addEventListener('keyup', this.move)
  }

  render() {
    return (
      <canvas height={this.canvas.height} width={this.canvas.width} ref={this.setCanvas}></canvas>
    )
  }

  setCanvas: Function = (ref) => this.canvas.ctx = ref.getContext('2d');

  init: Function = () => {
    this.food = createFood(this.canvas)
    this.snake = {
      body: createSnake(5),
      direction: 'right'
    }
  };

  paint: Function = () => {
    const { ctx, width, height } = this.canvas
    const { body, direction } = this.snake
    let { x, y } = body[0]

    ctx.fillStyle = 'white'
    ctx.strokeStyle = 'black'
    ctx.fillRect(0, 0, width, height)
    ctx.strokeRect(0, 0, width, height)

    if (direction === 'right') x++
    else if (direction === 'left') x--
    else if (direction === 'up') y--
    else if (direction === 'down') y++

    if (didLose(body, this.canvas, { x, y })) {
      this.init()
      return
    }

    let tail = {}
    if (x === this.food.x && y === this.food.y) {
      tail = { x, y }
      this.score++
      createFood(this.canvas)
    } else {
      tail = this.snake.pop()
      tail.x = x
      tail.y = y
    }
    this.snake.unshift(tail)

    for (let i = 0; i < this.snake.length; i++) {
      paintCell(this.canvas, body[i])
    }

    paintCell(this.canvas, this.food)
  };

  move: Function = (e: Object) => {
    const { keyCode } = e
    if (keyCode === '37' && this.snake.direction !== 'right') this.snake.direction = 'left'
    else if (keyCode === '38' && this.snake.direction !== 'down') this.snake.direction = 'up'
    else if (keyCode === '39' && this.snake.direction !== 'left') this.snake.direction = 'right'
    else if (keyCode === '40' && this.snake.direction !== 'up') this.snake.direction = 'down'
  };
}

export default Game
