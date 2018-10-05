const initalState = {
  propertyName: '',
  propertyDescription: '',
  propertyAddress: '',
  propertyCity: '',
  propertyState: '',
  propertyZip: '',
  propertyImage: '',
  loanAmount: '',
  monthlyMortgage: '',
  desiredRent: '',
}

const STEP_ONE = "STEP_ONE"
const STEP_TWO = "STEP_TWO"
const STEP_THREE = "STEP_THREE"

export default function reducer(state = initalState, action) {
  switch (action.type) {
    case STEP_ONE:
      return Object.assign({}, state, { propertyName: action.payload.propertyName, propertyDescription: action.payload.propertyDescription })
    case STEP_TWO:
      return Object.assign({}, state, { propertyAddress: action.payload.propertyAddress, propertyCity: action.payload.propertyCity, propertyState: action.payload.propertyState, propertyZip: action.payload.propertyZip })
    case STEP_THREE:
      return Object.assign({}, state, {propertyImage: action.payload.propertyImage})
    default:
      return state
  }
}

export function stepOne(propertyName, propertyDescription) {
  return {
    type: STEP_ONE,
    payload: {
      propertyName,
      propertyDescription
    }
  }
}
export function stepTwo(propertyAddress, propertyCity, propertyState, propertyZip) {
  return {
    type: STEP_TWO,
    payload: {
      propertyAddress,
      propertyCity,
      propertyState,
      propertyZip
    }
  }
}

export function stepThree(propertyImage) {
  return {
    type: STEP_THREE,
    payload: {
      propertyImage
    }
  }
}