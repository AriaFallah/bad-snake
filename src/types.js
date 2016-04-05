export type Canvas = {
  ctx: Object,
  cellWidth: number,
  height: number,
  width: number
}

export type Pos = { x: number, y: number }

export type Snake = { body: Array<Pos>, direction: string }
