import React from 'react'

export default function TextBox({
  main,
  detailed,
  className = '',
  mainClassName = '',
  detailedClassName = '',
}) {
  return (
    <div className={'textBox ' + className}>
      <p className={'textBoxMain ' + mainClassName}>{main}</p>
      <p className={'textBoxDetailed ' + detailedClassName}>{detailed}</p>
    </div>
  )
}
