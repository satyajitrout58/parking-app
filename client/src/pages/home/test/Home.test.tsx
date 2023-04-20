import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../Home';
import useFetchParkingDetails from '../../../hooks/useFetchParkingDetails'
import { parkingContext } from '../../../common/Context'

let mockLoading = false
const mockgetParkingDetails = jest.fn()
const mockupdateParkingDetails = jest.fn()
jest.mock('./../../../hooks/useFetchParkingDetails', () => {
  return () => ({
    getParkingDetails: mockgetParkingDetails,
    updateParkingDetails: mockupdateParkingDetails
  });
});
const mockDispatch = jest.fn()
const initaialValue = {
  state: {
    id: undefined,
    floor: undefined,
    slotType: undefined,
    parkingLot: 'test'
  },
  dispatch: mockDispatch
}
describe('Home Component', () => {
    const wraper = ({incomingState}) => {
        const state = Object.assign({initaialValue, incomingState})
        console.log(state)
        return render(
            <parkingContext.Provider value={initaialValue}>
                <Home />
            </parkingContext.Provider>
        )
    }
    test('It render homeContainer', ()=>{
      wraper({})
      expect(screen.getByTestId('homeContainer')).toBeInTheDocument()
    })
    test('It render getParkingContainer', ()=>{
      wraper({})
      expect(screen.getByTestId('getParkingContainer')).toBeInTheDocument()
    })
    test('It render getParkingSlotBtn', ()=>{
      wraper({})
      expect(screen.getByTestId('getParkingSlotBtn')).toBeInTheDocument()
    })
    test('It render select-type', ()=>{
      wraper({})
      screen.debug()
      expect(screen.getByTestId('select-type')).toBeInTheDocument()
    })
})