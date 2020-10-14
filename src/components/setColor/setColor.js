import React, { Component } from 'react'
import { CirclePicker } from 'react-color'

export default class SetColor extends Component {
  constructor(props) {
    super()
    this.state = {
      color: null,
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
