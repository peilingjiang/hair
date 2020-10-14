import React, { Component } from 'react'
import { CirclePicker } from 'react-color'

import './setColor.css'

export default class SetColor extends Component {
  constructor(props) {
    super()
    this.state = {
      color: '#000',
    }
  }

  handleChange = (color, event) => {
    this.setState({ color: color.hex })
  }

  handleSend = () => {
    this.props.handleSetColor(this.state.color)
  }

  render() {
    return (
      <div className="center-picker">
        <div className="oneHair">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 205.58 77.14">
            <path
              d="M1,3.72C21.66-.16,49.91-1.77,75.42,12.1,98.58,24.68,103,41.05,126.88,56.58c15.27,9.91,39.43,20.09,77.7,19.54"
              fill="none"
              stroke={this.state.color}
              stroke-linecap="round"
              strokeMiterlimit="10"
              strokeWidth="1"
            />
          </svg>
        </div>
        <CirclePicker
          onChange={this.handleChange}
          width={300}
          colors={[
            '#333333',
            '#75360f',
            '#ecca35',
            '#5e0808',
            '#cd3b6a',
            '#9b1b30',
            '#ffa37b',
            '#1592ca',
            '#710193',
            '#ea738d',
            '#2a603b',
            '#a7fc00',
            '#21eeee',
            '#999999',
          ]}
        />
        <button
          className="setColorButton"
          onClick={this.handleSend}
          disabled={this.state.color === null ? true : false}
        >
          Confirm
        </button>
        <p>This information will not be stored nor help grow any database.</p>
      </div>
    )
  }
}
