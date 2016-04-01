// @flow

import { observable } from 'mobx'
import radium from 'radium'
import React, { Component } from 'react'

const Snake = class Snake extends Component {
  canvas: Object;
  food: any;
  score: any;
  constructor(props) {
    super(props)
    this.food = observable()
    this.score = observable()
  }
  setCanvas = (ref) => this.canvas = ref;
  render() {
    return (
      <canvas style={Snake.style} ref={this.setCanvas}></canvas>
    )
  }
  static style = {
    height: 450,
    width: 450,
    border: '1px solid black'
  };
}

export default radium(Snake)
