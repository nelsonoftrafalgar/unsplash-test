import { StylesConfig } from "react-select/src/styles"

const variables = {
  fontColor: '#000',
  borderColor: 'transparent',
  itemsBgColor: '#fff',
  boxShadow: '0px 4px 12px 0px rgba(198, 198, 198, 0.82)',
  borderRadius: '5px'
}

const {
  borderRadius,
  borderColor, 
  fontColor, 
  itemsBgColor, 
  boxShadow
} = variables

export const SELECT_STYLES: StylesConfig = {
  container: (base) => {
    return {
      ...base,
      width: '200px',
      border: `1px solid ${borderColor}`,
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
      color: `${fontColor}`,
    }
  },
  control: () => {
    return {
      'display': 'flex',
      'fontSize': '14px',
      'fontFamily': 'sans-serif',
      'color': 'black',
      'justifyContent': 'center',
      '@media (min-width: 1024px)': {
        fontSize: '14px'
      },
      '&:hover': {
        cursor: 'pointer',
        opacity: '.6'
      }
    }
  },
  menuList: () => {
    return {
      background: '#fff', 
    }
  },
  option: (styles) => {
    return {
      ...styles,
      'fontFamily': 'sans-serif',
    }
  },
  placeholder: (base) => {
    return {
      ...base,
      color: `${fontColor}`,
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
      cursor: 'pointer',
      color: `${fontColor}`,
      padding: '0 8px',
      marginBottom: '4px',
      width: '32px',
      height: '32px',
      svg: {
        width: '32px',
        height: '32px'
      }
    }
  },
  singleValue: (styles) => {
    return {
      ...styles,
      color: `${fontColor}`,
    }
  },
  clearIndicator: () => {
    return {
      color: `${fontColor}`,
      paddingTop: '2px'
    }
  }
}
