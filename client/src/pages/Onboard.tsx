import React, { useState } from 'react'
import useOnBoardParking from '../hooks/useOnBoardParking'
import './Onboard.css'
type FloorSdetails = {
  floorNumber: number;
  small: number;
  Large: number;
  Medium: number;
  XLarge: number;
}
type KeyType = 'small' | 'Large' | 'Medium' | 'XLarge'

type OnSlotChange = (e: React.ChangeEvent<HTMLInputElement>, key: number, slotType: KeyType) => void

type OnFloorNumberChangeType = (e: React.ChangeEvent<HTMLInputElement>, key: number) => void

type Payload = {
  floors: FloorSdetails[]
  parkingLot: string
}
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
        <li className='listItem' key={key} >
          <div className='labelCover'>
            <label>Floor Number: {val.floorNumber}</label>
            <span><input type='text' name='floorNumber' value={val.floorNumber} onChange={(e) => onFloorNumberChange(e, key)} /></span>
          </div>
          <div className='labelCover'>
            <label>Small Slot: </label>
            <span><input type='text' name='small' value={val.small} onChange={(e) => onSlotChange(e, key, 'small')} /></span>
          </div>
          <div className='labelCover'>
            <label>Medium Slot: </label>
            <span><input type='text' name='medium' value={val.Medium} onChange={(e) => onSlotChange(e, key, 'Medium')} /></span>
          </div>
          <div className='labelCover'>
            <label>Larg Slot: </label>
            <span><input type='text' name='Large' value={val.Large} onChange={(e) => onSlotChange(e, key, 'Large')} /></span>
          </div>
          <div className='labelCover'>
            <label>XLarg Slot: </label>
            <span><input type='text' name='xlarge' value={val.XLarge} onChange={(e) => onSlotChange(e, key, 'XLarge')} /></span>
          </div>
        </li>
      )
    })
  }
  return (
    <div className='onBoardContainer'>
      {loading && <div>Loading........</div>}
      <form>
        <div>
          <label>No Of Floor</label>
          <input type='text' name='floorNumber' value={numberOfFloor} onChange={updateFloor} />
        </div>
        <div>
          <label>Parking Lot</label>
          <input type='text' name='parkingLot' value={parkingLot} onChange={(e) => setParkingLot(e.target.value)} />
        </div>

        <ul>
          {generateFloor()}

          {!!floors.length && (
            <li>
              <button onClick={OnboardParking}>OnBoard Parking</button>
            </li>
          )}

        </ul>
      </form>
          
    </div>
  )
};

export default Onboard;