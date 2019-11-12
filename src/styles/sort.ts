import { StylesConfig } from 'react-select/src/styles'
import { variables } from './variables'

const {
  borderRadius,
  fontColor,
  itemsBgColor,
  boxShadow,
  fontFamily,
  fontSize2
} = variables

export const SELECT_STYLES: StylesConfig = {
  container: (base) => {
    return {
      ...base,
      width: '200px',
      border: `1px solid transparent`,
      borderRadius: `${borderRadius}`,
      background: `${itemsBgColor}`,
      boxShadow: `${boxShadow}`,
      marginTop: '25px',
      input: {
        textIndent: '-999999999em'
      }
    }
  },
  valueContainer: (base) => {
    return {
      ...base,
      paddingLeft: 5,
      color: `${fontColor}`
    }
  },
  control: () => {
    return {
      'display': 'flex',
      'fontSize': `${fontSize2}`,
      'fontFamily': `${fontFamily}`,
      'color': `${fontColor}`,
      'justifyContent': 'center',
      '&:hover': {
        cursor: 'pointer',
        opacity: '.6'
      }
    }
  },
  menuList: () => {
    return {
      background: `${itemsBgColor}`
    }
  },
  option: (styles) => {
    return {
      ...styles,
      fontFamily: `${fontFamily}`
    }
  },
  placeholder: (base) => {
    return {
      ...base,
      color: `${fontColor}`
    }
  },
  indicatorSeparator: () => {
    return {
      display: 'none'
    }
  },
  dropdownIndicator: (base) => {
    return {
      ...base,
      ':hover': {color: `${fontColor}`},
      'cursor': 'pointer',
      'color': `${fontColor}`,
      'padding': '0 8px',
      'marginBottom': '4px',
      'width': '32px',
      'height': '32px',
      'svg': {
        width: '32px',
        height: '32px'
      }
    }
  },
  singleValue: (styles) => {
    return {
      ...styles,
      color: `${fontColor}`
    }
  },
  clearIndicator: () => {
    return {
      color: `${fontColor}`,
      paddingTop: '2px'
    }
  }
}
