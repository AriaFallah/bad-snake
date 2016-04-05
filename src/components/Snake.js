// @flow

import React, { Component } from 'react'
import { checkCollision, createFood, createSnake, paintCell } from '../util'

const Snake = class Snake extends Component {
  ctx: Object;
  cw: number = 10;
  d: string;
  food: Object;
  h: number = 450;
  score: number = 0;
  snake: Array<Object>;
  w: number = 450;

  componentDidMount() {
    this.init()
    setInterval(this.paint, 60)
    document.addEventListener('keyup', this.move)
  }

  render() {
    return (
      <canvas height={this.h} width={this.w} ref={this.setCanvas}></canvas>
    )
  }

  setCanvas: Function = (ref) => this.ctx = ref.getContext('2d');

  init: Function = () => {
    this.d = 'right'
    this.food = createFood(this.w, this.h, this.cw)
    this.snake = createSnake()
  };

  paint: Function = () => {
    this.ctx.fillStyle = 'white'
    this.ctx.strokeStyle = 'black'
    this.ctx.fillRect(0, 0, this.w, this.h)
    this.ctx.strokeRect(0, 0, this.w, this.h)

    let nx = this.snake[0].x
    let ny = this.snake[0].y

    if (this.d === 'right') nx++
    else if (this.d === 'left') nx--
    else if (this.d === 'up') ny--
    else if (this.d === 'down') ny++

    if (
      nx === -1
      || nx === this.w / this.cw
      || ny === -1
      || ny === this.w / this.cw
      || checkCollision(nx, ny, this.snake)
    ) this.init()

    let tail = {}
    if (nx === this.food.x && ny === this.food.y) {
      tail = { x: nx, y: ny }
      this.score++
      createFood(this.w, this.h, this.cw)
    } else {
      tail = this.snake.pop()
      tail.x = nx
      tail.y = ny
    }
    this.snake.unshift(tail)

    for (let i = 0; i < this.snake.length; i++) {
      const c = this.snake[i]
      paintCell(this.ctx, c.x, c.y, this.cw)
    }

    paintCell(this.ctx, this.food.x, this.food.y, this.cw)
  };

  move: Function = (e: Object) => {
    const key = e.keyCode
    if (key === '37' && this.d !== 'right') this.d = 'left'
    else if (key === '38' && this.d !== 'this.down') this.d = 'up'
    else if (key === '39' && this.d !== 'left') this.d = 'right'
    else if (key === '40' && this.d !== 'up') this.d = 'down'
  };
}

export default Snake
