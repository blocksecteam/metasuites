import React, { type FC } from 'react'

import type { BaseComponent } from '@common/types'

interface Props extends BaseComponent {
  color?: string
  size?: number
  ml?: number
  mr?: number
}

const IconDownload: FC<Props> = ({
  size = 16,
  color = '#448C0C',
  className,
  style = {},
  ml = 0,
  mr = 0
}) => {
  const stylesheet = Object.assign(
    {
      margin: 0,
      marginLeft: ml,
      marginRight: mr
    },
    style
  )

  return (
    <svg
      width={size}
      style={stylesheet}
      height={size}
      className={className}
      viewBox="0 0 64 64"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <polygon
          id="path-1"
          points="0 0 37.6119754 0 37.6119754 31.828216 0 31.828216"
        ></polygon>
      </defs>
      <g
        id="page-1"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <g id="64">
          <g id="group-48" transform="translate(4.352000, 0.000000)">
            <polygon
              id="Fill-17"
              fill={color}
              points="23.6500494 45.7685612 23.6463872 45.7722234 17.8127432 49.1435522 13.7542263 51.4912924 9.90314754 53.7176564 0 47.9983258 0 15.9984305 13.7542263 8.05639808 13.7542263 40.056555 17.8127432 42.400633"
            />
            <polygon
              id="Fill-19"
              fill={color}
              points="37.6082086 26.2843839 37.6082086 37.7120585 27.7123855 43.4277269 27.705061 43.4243263 27.6906738 43.4350513 17.8126386 37.7264458 17.8126386 26.2843839 17.9701137 26.1949213 27.6263235 20.5972285 27.6477736 20.6116158 27.7123855 20.5721162"
            />
            <g id="group" transform="translate(17.812612, 0.000000)">
              <mask id="mask-2" fill="white">
                <use xlinkHref="#path-1" />
              </mask>
              <g id="Clip-22" />
              <polygon
                id="Fill-21"
                fill={color}
                mask="url(#mask-2)"
                points="37.6119754 15.9982997 37.6119754 31.828216 23.8543486 23.9115576 23.8543486 23.9437327 19.79557 21.5993931 13.9331515 18.2136771 9.89974691 15.8837247 0 21.5993931 0 5.7158515 9.89974691 -7.84759962e-05 19.79557 5.71218928 23.8543486 8.05652888 27.6659277 10.257519"
              />
            </g>
            <polygon
              id="Fill-23"
              fill={color}
              points="55.4245878 36.5919968 55.4245878 47.9982212 45.5036524 53.7282769 41.666961 55.9436542 41.4555989 56.065292 37.6081824 58.2843316 27.7123593 64 17.8126124 58.2843316 14.0154205 56.0904043 17.8126124 53.8964771 27.7552595 48.1486335 31.7993892 45.8079562 31.7530884 45.7791816 37.6081824 42.40079 41.666961 40.0564504 41.666961 28.6750767"
            />
            <polygon
              id="Fill-25"
              fill={color}
              points="37.6082086 26.2843839 37.6082086 37.7120585 27.7123855 43.4277269 27.705061 43.4243263 27.6906738 43.4350513 17.8126386 37.7264458 17.8126386 26.2843839 17.9701137 26.1949213 27.6263235 20.5972285 27.6477736 20.6116158 27.7123855 20.5721162"
            />
            <polygon
              id="Fill-27"
              fill={color}
              points="37.6082086 26.2843839 37.6082086 37.7120585 27.7123855 43.4277269 27.705061 43.4243263 17.8126386 37.7120585 17.8126386 26.2843839 17.9701137 26.1949213 27.6477736 20.6116158 27.7123855 20.5721162"
            />
          </g>
          <rect id="rect" x="0" y="0" width={size} height={size} />
        </g>
      </g>
    </svg>
  )
}

export default IconDownload
