import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Onboard from '../Onboard';
import useOnBoardParking from '../../../hooks/useOnBoardParking'

let mockLoading = false
const mockOnboardParkingDetails = jest.fn()
jest.mock('./../../../hooks/useOnBoardParking', () => {
  return () => ({
    onBoardParkingDetails: mockOnboardParkingDetails,
    loading: mockLoading
  });
});



describe('Onboard Component', () => {
  const wraper = () => {
    return (
      render(<Onboard />)
    )
  }
  test('renders learn react link', () => {
    wraper()
    expect(screen.getByTestId('onBoardContainer')).toBeInTheDocument();
    expect(screen.getByTestId('noOfFloorContainer')).toBeInTheDocument();
    expect(screen.getByTestId('parkingLotContainer')).toBeInTheDocument();
  });
  test('when number of floor change', () => {
    const { container } = wraper()
    fireEvent.change(screen.getByTestId('floorNumber'), { target: { value: 2 } })
    expect(container.getElementsByClassName('listItemParking').length).toBe(2);
  })
  test('when parkinglot change', () => {
    const { container } = wraper()
    fireEvent.change(screen.getByTestId('parkinglot'), { target: { value: 'test' } })
    fireEvent.change(screen.getByTestId('floorNumber'), { target: { value: 2 } })
    expect(container.getElementsByClassName('labelCover').length).toBe(10);
    expect(screen.getAllByTestId('floornumberInput').length).toBe(2);
    expect(screen.getAllByTestId('floornumberInput').length).toBe(2);
    expect(screen.getByTestId('onboardBtn')).toBeInTheDocument();
  })
  test('when Onboard button clicked', () => {
    const { container } = wraper()
    fireEvent.change(screen.getByTestId('floorNumber'), { target: { value: 1 } })
    fireEvent.change(screen.getByTestId('parkinglot'), { target: { value: 'test' } })
    expect(screen.getByTestId('parkinglot')).toHaveValue('test')
    const floorNumber = screen.getAllByTestId('floornumberInput')
    const smallInput = screen.getAllByTestId('smallInput')
    const mediumInput = screen.getAllByTestId('mediumInput')
    const LargeInput = screen.getAllByTestId('LargeInput')
    const xlargeInput = screen.getAllByTestId('xlargeInput')
    fireEvent.change(floorNumber[0], { target: { value: 2 } })
    fireEvent.change(smallInput[0], { target: { value: 1 } })
    fireEvent.change(mediumInput[0], { target: { value: 1 } })
    fireEvent.change(LargeInput[0], { target: { value: 1 } })
    fireEvent.change(xlargeInput[0], { target: { value: 1 } })
    screen.debug()
    fireEvent.click(screen.getByTestId('onboardBtn'))
    const payload = {
      floors: [{ floorNumber: 2, small: 1, Large: 1, Medium: 1, XLarge: 1 } ],
      parkingLot: 'test'
    }
    expect(mockOnboardParkingDetails).toHaveBeenCalledWith(payload)
  })
  test('when loader is present', ()=>{
    mockLoading = true;
    wraper()
    screen.debug()
    expect(screen.getAllByTestId('loader')).toBeInTheDocument()
  })
})

