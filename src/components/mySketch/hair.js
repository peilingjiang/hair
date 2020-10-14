import { Bodies, Body, World } from 'matter-js'
import { newBezier, newBezierObj } from 'p5bezier'

import { map, random, randomInt } from './methods'

const renderScaleFactor = 8

const _getHeight = w => {
  return w < 4 ? random(30, 60) : random(15, 45)
}

export function hair(p, x, y, c = '#333') {
  let thisW = random(1.5, 9)
  p.push()
  p.stroke(...c, random(70, 170)) // ! Change to selected color
  p.strokeWeight(random(0.3, 0.6))
  p.translate(x, y)
  p.rotate(random(0, Math.PI))
  newBezier(
    _getInnerPoints(
      thisW * renderScaleFactor,
      _getHeight(thisW) * renderScaleFactor
    ),
    'OPEN',
    3
  )
  p.pop()
}

export function HairWithPhysics(p, x, y, color, myW) {
  // p5
  // Init x, y
  // myWorld
  this.p = p
  this.color = color // Array
  this.bodyW = random(1.5, 9)
  this.bodyH = _getHeight(this.bodyW)
  this.body = Bodies.rectangle(x, y, this.bodyW, this.bodyH, {
    collisionFilter: {
      mask: 0x0001,
    },
    friction: 0.8,
    restitution: 0.2,
    frictionAir: random(0.05, 0.15),
    angle: random(0, Math.PI),
    mass: 0.3,
  })

  const { position, vertices } = this.body
  const [{ x: aX, y: aY }] = vertices
  const { x: pX, y: pY } = position
  const rAX = renderScaleFactor * (aX - pX),
    rAY = renderScaleFactor * (aY - pY)

  const innerPoints = _getInnerPoints(rAX, rAY)
  this.bezierObj = newBezierObj(innerPoints, 'OPEN', 3)

  World.add(myW, this.body)

  this.render = function (crazy, opacity = 250) {
    const { position, angle } = this.body
    this.p.push()
    this.p.stroke(...this.color, opacity)
    crazy
      ? this.p.translate(position.x + random(-3, 3), position.y + random(-3, 3))
      : this.p.translate(position.x, position.y)
    this.p.rotate(angle)
    this.bezierObj.draw()
    this.p.pop()
  }

  this.forceUp = function () {
    Body.applyForce(
      this.body,
      { x: this.body.position.x, y: this.body.position.y },
      {
        x: random(-0.02, 0.02),
        y: random(0, -0.04),
      }
    )
  }

  this.removeSelf = function () {
    World.remove(myW, this.body)
  }
}

const _getInnerPoints = (rAX, rAY) => {
  let pointArray = []

  let x = 0,
    y = 0,
    step = 0
  while (x < 1 && step < 3) {
    y = random(0, 1)
    pointArray.push([map(x, 0, 1, rAX, -rAX), map(y, 0, 1, rAY, -rAY)])
    x += random(0.15, 0.3)
    ++step
  }
  pointArray.push([-rAX, map(random(0, 1), 0, 1, rAY, -rAY)])

  const l = pointArray.length - 1
  // 1
  let a = randomInt(l),
    b = randomInt(l)
  ;[pointArray[a], pointArray[b]] = [pointArray[b], pointArray[a]]
  // 2
  // a = randomInt(l)
  // b = randomInt(l)
  // ;[pointArray[a], pointArray[b]] = [pointArray[b], pointArray[a]]

  return pointArray
}
