import React, { Component, createRef } from 'react'
import 'intersection-observer'
import scrollama from 'scrollama'
import p5 from 'p5'
import Matter, { Body } from 'matter-js'
import 'matter-wrap'
import { initBezier } from 'p5bezier'
import tinycolor from 'tinycolor2'

import { HairWithPhysics, hair } from './hair'
import TextBox from './frags/textBox'
import HandSVG from './frags/hand/handsvg'
import Social from './frags/social/social'
import { addBoundaries } from './scene'
import { random, randomInt } from './methods'

import './mySketch.css'
import Roboto from './font/Roboto-Black.ttf'

const debug = false

Matter.use('matter-wrap')

const Engine = Matter.Engine,
  // Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Constraint = Matter.Constraint,
  Composite = Matter.Composite

// const defaultCategory = 0x0001,
//   noCollision = 0x0002

const myEngine = Engine.create()
const myWorld = myEngine.world

const scroller = scrollama()
let prevPageY

let myColor // HEX

let prevScene = 0
let scene = 1
const lastScene = 7 // 6 + References page

const hairsL = 350
const hairs = []
let boundaries
const movingBoundaries = Composite.create()
World.addComposite(myWorld, movingBoundaries)

const constraintsToText = Composite.create()
Composite.addComposite(movingBoundaries, constraintsToText)

const fps = debug ? 30 : 60
// const hasBoundary = false

let entering = true // The beginning of the story
let engineRunning = false

export default class MySketch extends Component {
  constructor(props) {
    super()
    this.myP5 = null
    this.canvasHolder = createRef()
    myColor = props.color
  }

  componentDidMount() {
    if (this.myP5 === null)
      this.myP5 = new p5(this.Sketch, this.canvasHolder.current)

    document.addEventListener('scroll', this.handleWheel)

    scene1Narration = document.getElementById('scene1Narration')

    prevPageY = window.scrollY
  }

  componentWillUnmount() {
    this.myP5.clear()
    this.myP5 = null

    document.removeEventListener('scroll', this.handleWheel)
  }

  handleWheel = e => {
    // if (scene === 1 && entering) e.preventDefault()
    Composite.translate(movingBoundaries, {
      x: 0,
      y: prevPageY - window.scrollY,
    })
    prevPageY = window.scrollY

    // console.log(document.getElementById('OMEGA').getBoundingClientRect());
  }

  Sketch = p => {
    p.preload = () => {
      // Scene 5
      calcPoints(p)
    }

    let myC = tinycolor(myColor).toRgb()
    myC = [myC.r, myC.g, myC.b]

    p.setup = () => {
      let c = p.createCanvas(window.innerWidth, window.innerHeight)
      p.frameRate(fps)
      initBezier(c)
      // p.background(255)

      p.noFill()
      p.strokeWeight(0.5)
      p.stroke(myColor)
      p.rectMode(p.CENTER)
      p.textFont('Roboto')
      p.textStyle(p.BOLD)
      p.textAlign(p.LEFT, p.TOP)

      for (let i = 0; i < hairsL; i++) {
        hairs.push(
          new HairWithPhysics(
            p,
            p.random(0, window.innerWidth),
            p.random(0, window.innerHeight),
            myC,
            myWorld
          )
        )
      }

      for (let i of hairs) {
        i.body.plugin.wrap = {
          min: { x: -100, y: -10000 },
          max: { x: window.innerWidth, y: window.innerHeight },
        }
      }

      boundaries = addBoundaries(
        [
          [-100, window.innerHeight / 2, 220, window.innerHeight],
          [
            window.innerWidth + 100,
            window.innerHeight / 2,
            220,
            window.innerHeight,
          ],
          [
            window.innerWidth / 2,
            window.innerHeight + 100,
            window.innerWidth,
            220,
          ],
        ],
        myWorld
      )

      // Scene 1
      s1Interval = setInterval(change, debug ? 500 : 3000)

      // Engine.run(myEngine)

      initScroller()
    }

    p.draw = () => {
      switch (scene) {
        case 1:
          scene_1(p, myC)
          break

        case 2:
          scene_2(p)
          break

        case 3:
          scene_3(p)
          break

        case 4:
          scene_4(p)
          break

        case 5:
          scene_5(p)
          break

        case 6:
          scene_6(p)
          break

        case 7:
          scene_7(p)
          break

        default:
          break
      }

      checkHairAndRemove()

      if (debug) for (let i of boundaries) i.show(p)

      if (o <= 250 && scene !== 4) o += 5
    }

    // p.windowResized = () => {
    //   p.resizeCanvas(window.innerWidth, window.innerHeight)
    // }
  }

  /* --------------------------------- render --------------------------------- */

  render() {
    return (
      <>
        <div id="mainCanvas" ref={this.canvasHolder}>
          {/* ... id="defaultCanvas0" class="p5Canvas" */}
        </div>

        {/* Scene 1 */}

        <div className="scene scene1">
          <h1 id="introTitle" className="introTitle no-display">
            they're just falling...
          </h1>
          <p id="scene1Narration" className="mainNarration scene1Narration"></p>
        </div>

        {/* Scene 2 */}

        <div className="scene scene2 sceneMarker marker2">
          <HandSVG
            color={myColor}
            world={myWorld}
            movingBoundaries={movingBoundaries}
          />
          <TextBox
            className="scene2Text"
            main="10% of them are ready to go"
            // mainClassName="sceneMarker marker2"
            detailed="… that’s around 10,000 among all your scalp hair follicles. They are at a stage called Telogen where the follicle grows and softens the anchor point of the shaft. The hair base will break free from the root and the hair will be shed. You can do a simple Hair Pulling Test - no more than 3 threads of hairs could be normally pulled out from any location on the scalp. Don’t panic! Within two weeks, the new hair shaft will begin to emerge once the Telogen phase is complete."
          />
        </div>

        {/* Scene 3 */}

        <div className="scene scene3 sceneMarker marker3">
          <TextBox
            className="scene3Text"
            main="social media amplifies anxiety"
            // mainClassName="sceneMarker marker3"
            detailed="… as anecdotal evidence suggests that more millennials are losing their hair earlier and faster. Is that true? Few empirical evidence has been found. “It’s normal for people to experience some hair loss in their 20s and 30s,” while “greater exposure to celebrities and the media create a greater desire for thicker, more attractive hair than earlier generations experienced.”"
          />
          <Social bgColor="#eeeeee" color={myColor} />
        </div>

        {/* Scene 4 */}

        <div className="scene scene4 sceneMarker marker4">
          <TextBox
            className="scene4Text"
            main="good habits can be harmful"
            // mainClassName="sceneMarker marker4"
            detailed="… as the growing popularity of vegetarian and vegan diets could be contributing to millennial hair loss. With restricted diets, insufficient energy, protein, etc. are supplied to the body, and  since hair growth is a relatively low priority compared to other bodily functions, hair growth is halted quickly when your body is placed under stress."
          />
        </div>

        {/* Scene 5 */}

        <div className="scene scene5 sceneMarker marker5">
          <TextBox
            className="scene5Text"
            main="but they can help!"
            detailed="… hairs are made of proteins and some nutritions. While you can’t change factors like age or genetics, diet is one thing you have control over. Try to eat more food with the following nutritions to promote your hair growth. Please notice that causational relationships are not discovered for most of them, and some might only help when you’ve already experienced hair loss due to deficiency. Please ask the doctor for more information."
          />

          <div className="bigText omega" id="OMEGA">
            OMEGA
            <div className="hiddenText">
              <p className="name">omega - 3/6</p>|
              <p className="food">
                salmon / sunflower seed / deep-sea fish / vegetables
              </p>
            </div>
          </div>
          <div className="bigText zn" id="Zn">
            Zn
            <div className="hiddenText">
              <p className="name">zinc</p>|
              <p className="food">oyster / lean meat / egg / basil / peanut</p>
            </div>
          </div>
          <div className="bigText fe" id="Fe">
            Fe
            <div className="hiddenText">
              <p className="name">iron</p>|
              <p className="food">whole wheat bread / grapes</p>
            </div>
          </div>
          <div className="bigText c" id="vE">
            vE
            <div className="hiddenText">
              <p className="name">vitamine e</p>|
              <p className="food">kiwi / spinach / kale / yam / hazelnut</p>
            </div>
          </div>
          <div className="bigText d" id="vB">
            vB
            <div className="hiddenText">
              <p className="name">vitamine b</p>|
              <p className="food">fish / carrot / milk / egg</p>
            </div>
          </div>
        </div>

        {/* Scene 6 */}

        <div className="scene scene6 sceneMarker marker6">
          <TextBox
            className="scene6Text"
            main="or... you can shave them all"
            detailed="… as bald can be “good”! Empirical evidence shows that men with shaved heads were viewed as more dominant, taller, stronger, and smarter than their counterparts with full heads of hair. Don’t be afraid and shave it when you feel like it."
          />
        </div>

        {/* Scene 7 */}

        <div className="scene scene7 sceneMarker marker7">
          <p className="thanks">thanks for reading</p>

          <div className="references">
            <h2>references</h2>
            <p>
              {
                '1. Mannes, A. E. (2013) ‘Shorn Scalps and Perceptions of Male Dominance’, Social Psychological and Personality Science, 4(2), pp. 198–205. doi: 10.1177/1948550612449490.'
              }
            </p>
            <p>
              {
                '2. Guo, E. L., & Katta, R. (2017). Diet and hair loss: effects of nutrient deficiency and supplement use. Dermatology practical & conceptual, 7(1), 1–10.'
              }
            </p>
            <p>
              {
                '3. Le Floch, C., Cheniti, A., Connétable, S., Piccardi, N., Vincenzi, C., & Tosti, A. (2015). Effect of a nutritional supplement on hair loss in women. Journal of cosmetic dermatology, 14(1), 76–82.'
              }
            </p>
            <p>
              {
                '4. Kil, M. S., Kim, C. W., & Kim, S. S. (2013). Analysis of serum zinc and copper concentrations in hair loss. Annals of dermatology, 25(4), 405–409. '
              }
            </p>
            <p>
              {
                '5. Trost, L. B., Bergfeld, W. F., & Calogeras, E. (2006). The diagnosis and treatment of iron deficiency and its potential relationship to hair loss. Journal of the American Academy of Dermatology, 54(5), 824–844. doi: 10.1016/j.jaad.2005.11.1104'
              }
            </p>
            <p>
              {
                '6. Glynis Ablon, "A 3-Month, Randomized, Double-Blind, Placebo-Controlled Study Evaluating the Ability of an Extra-Strength Marine Protein Supplement to Promote Hair Growth and Decrease Shedding in Women with Self-Perceived Thinning Hair", Dermatology Research and Practice, vol. 2015, Article ID 841570, 8 pages, 2015.'
              }
            </p>
            <p>
              {
                '7. Grant, J. E., & Chamberlain, S. R. (2016). Trichotillomania. The American journal of psychiatry, 173(9), 868–874.'
              }
            </p>
            <p>
              {
                '8. Chamberlain SR, Hampshire A, Menzies LA, et al. Reduced Brain White Matter Integrity in Trichotillomania: A Diffusion Tensor Imaging Study. Arch Gen Psychiatry. 2010;67(9):965–971. doi:10.1001/archgenpsychiatry.2010.109 '
              }
            </p>
            <p>
              {
                '9. Liwen Hu, Chongyang Ma, Linjie Luo, and Hao Li. 2015. Single-view hair modeling using a hairstyle database. ACM Trans. Graph. 34, 4, Article 125 (August 2015), 9 pages. '
              }
            </p>
            <p>{'10. Hair, Hair loss, Human hair growth - Wikipedia'}</p>
          </div>
        </div>
      </>
    )
  }
}

const drawHairWithPhysics = (crazy = false, opacity = 250) => {
  for (let i = 0; i < hairs.length; i++) hairs[i].render(crazy, opacity)
  // hair(p, p.random(0, window.innerWidth), p.random(0, window.innerHeight))
}

const checkHairAndRemove = () => {
  for (let i in hairs) {
    if (isOutOfBounds(hairs[i])) {
      hairs[i].removeSelf()
      hairs.splice(i, 1)
      i--
    }
  }
}

const isOutOfBounds = i => {
  const { x, y } = i.body.position
  return y > window.innerHeight + 300 || x < -300 || x > window.innerWidth + 300
}

/* --------------------------------- Scene 1 -------------------------------- */
let day = 0
let dayInc = (debug ? 5 : 0.015) / fps // 0.001

const hairPerDay = 60

let scene1Narration
let s1NText = [
  "they're falling",
  'falling',
  'faster and faster',
  '',
  'do you need to worry?',
  '',
  'these are hairs a healthy person would lose for 100 days',
  "hey don't panic",
  'because',
  '',
]

const scene_1 = (p, myC) => {
  if (entering && day < 120) {
    for (let i = 0; i < hairPerDay * dayInc; i++) {
      hair(p, random(0, window.innerWidth), random(0, window.innerHeight), myC)
    }
    day += dayInc
    if (!debug)
      dayInc += dayInc < 0.005 ? 0.000009 : dayInc < 0.015 ? 0.000033 : 0.00018
    else dayInc += 0.003
  } else if (entering) {
    // p.background(255)
    p.clear()
    handleSceneChange()
  } else {
    p.clear()
    drawHairWithPhysics(false, o)
  }
}

let c = 0
let s1Interval
function change() {
  scene1Narration.classList.add('hide')
  setTimeout(
    function () {
      if (c >= s1NText.length) {
        breakChange()
        return
      }
      scene1Narration.innerHTML = s1NText[c]
      scene1Narration.classList.remove('hide')
      c++
    },
    debug ? 500 : 700
  )
}

function breakChange() {
  scene1Narration.classList.add('no-display')
  clearInterval(s1Interval)
}

/* --------------------------------- Scene 2 -------------------------------- */

const scene_2 = p => {
  p.clear()
  drawHairWithPhysics(false, o)
}

/* --------------------------------- Scene 3 -------------------------------- */
let scene3Timer = 0
const scene_3 = p => {
  p.clear()
  drawHairWithPhysics(true, o)

  if (p.millis() >= scene3Timer + 500) {
    for (let i = randomInt(50); i < hairs.length; i += Math.floor(30, 70)) {
      hairs[i].forceUp()
    }

    scene3Timer = p.millis()
  }
}

/* --------------------------------- Scene 4 -------------------------------- */

let o = 250

const scene_4 = p => {
  p.clear()

  for (let i = 0; i < hairs.length; i++) {
    hairs[i].render(false, o)
  }

  if (o > 100) o -= 5
}

/* --------------------------------- Scene 5 -------------------------------- */

const points = []
let hasConstraints = false

const calcPoints = p => {
  // const w = window.innerWidth
  // const h = window.innerHeight
  p.loadFont(Roboto, font => {
    const bigTexts = ['OMEGA', 'Zn', 'vE', 'vB', 'Fe']
    // const bTX =  [.15, .6, .3, .8, .8]
    // const bTY =  [.35, .5, .7, .7, .2]

    for (let bT in bigTexts) {
      let r = document.getElementById(bigTexts[bT]).getBoundingClientRect()

      let tP = font.textToPoints(bigTexts[bT], r.x, r.y + 108, 128)
      for (let t = 0; t < tP.length; t += randomInt(2) + 1) {
        points.push(tP[t])
      }
    }

    // Now we have points...
    const cOptions = {
      // isSensor: true,
      isStatic: true,
      label: 'c',
      collisionFilter: {
        mask: 0x0002,
      },
    }
    for (let i of points) {
      let b = Bodies.circle(i.x, i.y, 10, cOptions)
      Composite.add(movingBoundaries, b)
    }
  })
}

const scene_5 = p => {
  p.clear()
  drawHairWithPhysics(false, o)
  // p.push()
  // p.fill('#000')
  // for (let i of movingBoundaries.bodies) {
  //   p.circle(i.position.x, i.position.y, 10)
  // }
  // p.pop()
}

const buildConstraint = () => {
  // console.log(movingBoundaries)
  const { bodies } = movingBoundaries
  for (let b in movingBoundaries.bodies) {
    if (hairs[b]) {
      let t = Constraint.create({
        bodyA: bodies[b],
        bodyB: hairs[b].body,
        length: 20,
        stiffness: 0.8,
      })
      Composite.add(constraintsToText, t)
    }
  }

  hasConstraints = true
}

const clearConstraint = () => {
  Composite.clear(constraintsToText, false)
  if (Math.abs(hairs[0].body.velocity.y) > 30) {
    for (let i of hairs) {
      Body.setVelocity(i.body, {
        x: i.body.velocity.x,
        y: Math.min(Math.max(i.body.velocity.y, -20), 20),
      })
    }
  }
  hasConstraints = false
}

/* --------------------------------- Scene 6 -------------------------------- */

const scene_6 = p => {
  p.clear()
  drawHairWithPhysics(false, o)
}

/* --------------------------------- Scene 7 -------------------------------- */

const scene_7 = p => {
  p.clear()
  drawHairWithPhysics(false, o)
}

/* -------------------------------- Scroller -------------------------------- */

function initScroller() {
  scroller
    .setup({
      step: '.sceneMarker',
      offset: 0.75,
      debug: false,
      progress: true,
    })
    .onStepEnter(handleStepEnter)
    .onStepExit(handleStepExit)
    .onStepProgress(handleStepProgress)
}

function handleStepEnter(response) {
  prevScene = scene
  scene = getScene(response)
  if (scene !== prevScene) handleSceneChange(scene, prevScene, response)
}

function handleSceneChange(s, pS, response) {
  if (entering) {
    // First time scene 1 to 2
    entering = false

    document.getElementById('introTitle').classList.remove('no-display')
    breakChange() // Scene1 narrative

    if (!engineRunning) {
      Engine.run(myEngine) // ! Engine starts running
      engineRunning = true
    }

    drawHairWithPhysics(false, o)
    return
  }
}

function handleStepExit(response) {
  if (getScene(response) === 5) {
    if (hasConstraints) {
      clearConstraint()
    }
  }
}

function handleStepProgress(response) {
  if (scene === 5 && response.progress > 0.6) {
    // Scroll down and entering...
    if (!hasConstraints) {
      // Add constrains
      buildConstraint()
    }
  } else {
    if (hasConstraints) {
      clearConstraint()
    }
  }
}

function getScene(r) {
  // Return Int
  for (let i = 1; i <= lastScene; i++)
    if (r.element.className.includes('marker' + i)) {
      return i
    }
}
