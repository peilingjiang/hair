import React, { PureComponent } from 'react'
import { addBoundaries } from '../../scene'

import './handsvg.css'

/**
 * Props -
 * world - myWorld
 */

// const myRender = Render.create()

export default class HandSVG extends PureComponent {
  componentDidMount() {
    // console.log(this.handRef.getBoundingClientRect());
    this.hookHandBound()

    // document.addEventListener('scroll', this.handleWheel)
  }

  componentWillUnmount() {
    // document.removeEventListener('scroll', this.handleWheel)
  }

  hookHandBound = () => {
    const { movingBoundaries } = this.props
    const { x, y, height, width } = this.handRef.getBoundingClientRect()
    addBoundaries(
      [
        [
          x + width / 4,
          y + height / 2,
          200,
          50,
          { friction: 0, angle: Math.PI / 4 },
        ],
        [
          x + width * 0.7,
          y + height * 0.5,
          300,
          100,
          { friction: 0, angle: Math.PI * 0.1, frictionStatic: 0.1 },
        ],
      ],
      movingBoundaries,
      'Composite'
    )
  }

  render() {
    const { color } = this.props

    return (
      <div className="hand-svg">
        <svg
          ref={ref => (this.handRef = ref)}
          viewBox="0 0 1246.68 606.49"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m301.05 352.14c-16.39-1.31-41-1-55.26 9.63-8.17 6.11-8.94 16.23-.62 22.12 23.43 16.6 70.59 33.47 186.35 91.33 6.54 3.27 14.11 3.85 21.41 3.51 30.6-1.44 95.29-5.32 129.92 3.45"
            fill="#fff"
            stroke="#000"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="12"
          />
          <path
            d="m106.25 425.52c61.54-91.85 185.07-102.75 250.21-43 55.66 51.06 65.14 150.45 8.8 223.82"
            fill="none"
            stroke={color}
            strokeMiterlimit="10"
            strokeWidth=".9"
          />
          <path
            d="m336.65 290.63s-52.65-37.87-74.26-45.35c-18-6.21-40.45-7.09-55.62-2.37-12 3.75-16.37 24-6.93 32.34 25.16 22.17 34.45 22.17 86.72 68.75 4.46 4 10.17 6.27 15.65 8.66 21.31 9.33 65.45 30.69 100.53 56.84"
            fill="#fff"
            stroke="#000"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="12"
          />
          <path
            d="m0 330.2c57.08-4.2 179.83-21.06 305.27-105.2a633.62 633.62 0 0 0 204.1-224.88"
            fill="none"
            stroke={color}
            strokeMiterlimit="10"
            strokeWidth=".9"
          />
          <path
            d="m1240.68 138.81s-59.87 29-144.38 45.64c-61.57 12.11-129.94-33.3-297.07 73.23-99.82 63.63-160.18 51-226.28 79a34.38 34.38 0 0 1 -32.87-3.19c-16.7-11.45-45.22-28.34-77-35.66a9.24 9.24 0 0 1 -5.34-3.55c-8.37-11.3-41.19-53.77-77.78-75.66-28.85-44.77-48-58.24-66.47-68.23-19.55-10.59-38.77 10.23-30.42 32.78 31.59 85.25 73.75 128.65 127.28 242 7.86 16.64 28.2 23.65 46.29 27 41.63 7.83 126.36 25.83 195.79 53.96a126.19 126.19 0 0 0 90.65 1.7c22.94-8.35 51.69-19.4 81.77-32.42a596.11 596.11 0 0 1 172.71-45.61c65.85-7.11 157.35-19.74 243.12-46.92"
            fill="#fff"
          />
          <path
            d="m673.8 310.48s22.45-16.81 36-63.24-44.34-41.83-116-61.13c-39.51-10.64-53.32-39.71-56.88-66.63-3.34-25.34 15.17-41.33 39.94-35 24.26 6.18 49.54 10.44 68 17.92 74 30 97.84 54.13 149.18 58.47 55.36 4.66 125.66-22.87 197.41 24.51"
            fill="#fff"
          />
          <g strokeMiterlimit="10">
            <path
              d="m709.77 247.24s-44.34-41.83-116-61.13c-39.51-10.64-53.32-39.71-56.88-66.63-3.34-25.34 15.17-41.33 39.94-35 24.26 6.18 49.54 10.44 68 17.92 74 30 97.84 54.13 149.18 58.47 55.39 4.66 125.69-22.87 197.44 24.51"
              fill="none"
              stroke="#000"
              strokeLinecap="round"
              strokeWidth="12"
            />
            <path
              d="m379.93 218.66c-28.85-44.77-48-58.24-66.47-68.23-19.55-10.59-38.77 10.23-30.42 32.78 31.59 85.25 73.75 128.65 127.28 242 7.86 16.64 28.2 23.65 46.29 27 41.65 7.79 126.39 25.79 195.81 53.91a126.19 126.19 0 0 0 90.67 1.71c22.94-8.35 51.68-19.4 81.76-32.42a596.11 596.11 0 0 1 172.71-45.61c65.85-7.11 157.35-19.74 243.12-46.92"
              fill="none"
              stroke="#000"
              strokeLinecap="round"
              strokeWidth="12"
            />
            <path
              d="m767 177.91s-43.2 18.47-56.31 66.19c-13.41 48.81-36.87 66.38-36.87 66.38"
              fill="#fff"
              stroke="#000"
              strokeLinecap="round"
              strokeWidth="12"
            />
            <path
              d="m1240.68 138.81s-59.87 29-144.38 45.64c-61.57 12.11-129.94-33.3-297.07 73.23-99.82 63.63-160.18 51-226.28 79a34.38 34.38 0 0 1 -32.87-3.19c-16.7-11.45-45.22-28.34-77-35.66a9.23 9.23 0 0 1 -5.33-3.53c-9.49-12.82-50.59-65.94-92.91-83.36-19.21-7.91-37.56 13.14-27.3 31.2 11.5 20.23 32 51.35 68.49 98 32.31 41.25 42.37 41.88 85.06 78.05 8.1 6.87 19 9.44 29.49 11.1 29.41 4.68 78.62 7 140.85 23.3"
              fill="#fff"
              stroke="#000"
              strokeLinecap="round"
              strokeWidth="12"
            />
            <path
              d="m126.89 177.91c103.56 84.29 192.01 106.38 254.11 110.76 178 12.56 290.09-109.67 406.6-54.73 57.64 27.21 87.95 84.41 104.25 126.41"
              fill="none"
              stroke={color}
              strokeWidth=".9"
            />
            <path
              d="m701.2 303.27c-47.87 14.3-86.94 16-128.25 33.45a34.38 34.38 0 0 1 -32.87-3.19c-16.7-11.45-45.22-28.34-77-35.66a9.23 9.23 0 0 1 -5.33-3.53c-9.49-12.82-50.59-65.94-92.91-83.36-19.21-7.91-37.56 13.14-27.3 31.2 11.5 20.23 32 51.35 68.49 98 32.31 41.25 42.37 41.88 85.06 78.05 8.1 6.87 19 9.44 29.49 11.1 29.41 4.68 78.62 7 140.85 23.3"
              fill="#fff"
              stroke="#000"
              strokeLinecap="round"
              strokeWidth="12"
            />
          </g>
        </svg>
        {/* <img ref={(ref) => (this.handRef = ref) } className="hand" src={hand} alt="Hand" /> */}
      </div>
    )
  }
}
