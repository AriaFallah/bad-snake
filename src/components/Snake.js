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
    setInterval(this.paint, 30)
    document.addEventListener('keydown', this.move)
  }

  render() {
    return (
      <canvas height={this.canvas.height} width={this.canvas.width} ref={this.setCanvas}></canvas>
    )
  }

  setCanvas: Function = (ref: Object) => this.canvas.ctx = ref.getContext('2d');

  init: Function = () => {
    this.food = createFood(this.canvas)
    this.snake = {
      body: createSnake(5),
      direction: 'down'
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
      this.food = createFood(this.canvas)
    } else {
      tail = this.snake.body.pop()
      tail.x = x
      tail.y = y
    }
    this.snake.body.unshift(tail)

    for (let i = 0; i < body.length; i++) {
      paintCell(this.canvas, body[i])
    }

    paintCell(this.canvas, this.food)
  };

  move: Function = (e: Object) => {
    const { keyCode } = e
    const { snake } = this
    if (keyCode === 37 && snake.direction !== 'right') snake.direction = 'left'
    else if (keyCode === 38 && snake.direction !== 'down') snake.direction = 'up'
    else if (keyCode === 39 && snake.direction !== 'left') snake.direction = 'right'
    else if (keyCode === 40 && snake.direction !== 'up') snake.direction = 'down'
  };
}

export default Game
