import { Bodies, Body, Composite, World } from 'matter-js'

export function addBoundaries(bList, composite, compositeType = 'World') {
  let b = []

  for (let i of bList)
    b.push(new Boundary(i[0], i[1], i[2], i[3], i[4], composite, compositeType))

  return b
}

export function Boundary(x, y, w, h, options = {}, composite, compositeType) {
  this.x = x
  this.y = y
  this.w = w
  this.h = h
  this.body = Bodies.rectangle(x, y, w, h, {
    isStatic: true,
    collisionFilter: {
      mask: 0x0001,
    },
    ...options,
  })
  compositeType === 'World'
    ? World.add(composite, this.body)
    : Composite.add(composite, this.body)

  this.translate = function (vec) {
    Body.translate(this.body, vec)
  }

  this.show = function (p) {
    p.push()
    p.fill(0)
    p.rect(this.x, this.y, this.w, this.h)
    p.pop()
  }
}
