import React, { useState } from 'react'
import useOnBoardParking from '../../hooks/useOnBoardParking'
import {FloorSdetails, OnSlotChange, OnFloorNumberChangeType, Payload} from './types/type'
import './Onboard.css'

const Onboard = () => {
  const [numberOfFloor, setNumberOfFloor] = useState(0)
  const [floors, setFloors] = useState<FloorSdetails[]>([])
  const [parkingLot, setParkingLot] = useState('')

  const {onBoardParkingDetails, loading}   = useOnBoardParking()

  const updateFloor = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const floor = isNaN(Number(e.target.value)) ? 0 : Number(e.target.value)
    setNumberOfFloor(floor)
    const slotInEachFloor = []
    for (let i = 0; i < floor; i++) {
      const floorDetails = {
        floorNumber: i + 1,
        small: 0,
        Large: 0,
        Medium: 0,
        XLarge: 0
      }
      slotInEachFloor.push(floorDetails)
    }
    setFloors(slotInEachFloor)
  }

  const onSlotChange: OnSlotChange = (e, key, slotType) => {
    const value = e.target.value
    floors[key][slotType] = Number(value)
    const copyFloor = JSON.parse(JSON.stringify(floors))
    setFloors(copyFloor)
  }
  const onFloorNumberChange: OnFloorNumberChangeType = (e, key) => {
    const value = e.target.value
    floors[key].floorNumber = Number(value)
    const copyFloor = JSON.parse(JSON.stringify(floors))
    setFloors(copyFloor)
  }

  const OnboardParking = (e: React.MouseEvent<HTMLButtonElement>):void => {
    e.preventDefault()
    const payLoad: Payload = {
      floors,
      parkingLot
    }
    if(parkingLot){
      onBoardParkingDetails(payLoad)
    }
  }

  const generateFloor = () => {
    return !!floors.length && floors.map((val, key) => {
      return (
        <li className='listItemParking' key={key} >
          <div className='labelCover'>
            <label data-testid='floorNumber'>Floor Number: {val.floorNumber}</label>
            <span><input type='text' data-testid='floornumberInput' name='floorNumber' value={val.floorNumber} onChange={(e) => onFloorNumberChange(e, key)} /></span>
          </div>
          <div className='labelCover'>
            <label>Small Slot: </label>
            <span><input type='text' data-testid='smallInput' name='small' value={val.small} onChange={(e) => onSlotChange(e, key, 'small')} /></span>
          </div>
          <div className='labelCover'>
            <label>Medium Slot: </label>
            <span><input type='text' name='medium' data-testid='mediumInput' value={val.Medium} onChange={(e) => onSlotChange(e, key, 'Medium')} /></span>
          </div>
          <div className='labelCover'>
            <label>Larg Slot: </label>
            <span><input type='text' name='Large' data-testid='LargeInput' value={val.Large} onChange={(e) => onSlotChange(e, key, 'Large')} /></span>
          </div>
          <div className='labelCover'>
            <label>XLarg Slot: </label>
            <span><input type='text' name='xlarge' data-testid='xlargeInput' value={val.XLarge} onChange={(e) => onSlotChange(e, key, 'XLarge')} /></span>
          </div>
        </li>
      )
    })
  }
  return (
    <div className='onBoardContainer' data-testid='onBoardContainer'>
      {loading && <div data-testid='loader'>Loading........</div>}
      <form>
        <div data-testid='noOfFloorContainer'>
          <label>No Of Floor</label>
          <input type='text' name='floorNumber' data-testid='floorNumber' value={numberOfFloor} onChange={updateFloor} />
        </div>
        <div data-testid='parkingLotContainer'>
          <label>Parking Lot</label>
          <input type='text' name='parkingLot' data-testid='parkinglot' value={parkingLot} onChange={(e) => setParkingLot(e.target.value)} />
        </div>

        <ul>
          {generateFloor()}

          {!!floors.length && parkingLot &&(
            <li data-testid='onBoardParkingBtn'>
              <button onClick={OnboardParking} data-testid='onboardBtn'>OnBoard Parking</button>
            </li>
          )}

        </ul>
      </form>
          
    </div>
  )
};

export default Onboard;