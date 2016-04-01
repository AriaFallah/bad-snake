// @flow

import radium from 'radium'
import React from 'react'
import Snake from './snake'

const styles = {
  height: '100%',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column'
}

export default radium(() =>
  <main style={styles}>
    <h1>Reactive™ Snake</h1>
    <Snake />
  </main>
)
