import React, { useContext, useState } from "react";
import {parkingContext} from '../../common/Context'
import { slotType } from '../../common/constant'
import useFetchParkingDetails from '../../hooks/useFetchParkingDetails'
import ParkingDetails from '../../component/parkingDetails/ParkingDetails'
import {GetOptionList, KeyType, UpdateSelectedStateType} from './types/type'
import './Home.css'

const Home = () => {
    const state = useContext(parkingContext)?.state
    const parkingLot = state?.parkingLot
    const id = state?.id
    const slot = state?.slotType
    const floor = state?.floor

    const [selectedType, setSelectedType] = useState<string>('small')
    const {getParkingDetails, updateParkingDetails} = useFetchParkingDetails()

    const getOptionList : GetOptionList = ()  => {
      return Object.keys(slotType).map((value): React.ReactNode => {
        return <option key={value}>{slotType[(value as KeyType) ]}</option>
      })
    }

    const updateSelectedState: UpdateSelectedStateType = (e) => {
      setSelectedType(e.currentTarget.value)
    }

    const getParkingSlot = (e: React.MouseEvent<HTMLButtonElement>): void => {
      e.preventDefault()
      if(parkingLot){
        getParkingDetails({type: selectedType, parkingLot})
      }
      
      
    }
    
    return (
      <div data-testid='homeContainer'>
          <div data-testid='getParkingContainer' className='getParkingContainer'>  
              <form>
                <select onChange={updateSelectedState} data-testid='select-type'>
                  {getOptionList()}
                </select>
                <button onClick={getParkingSlot} data-testid='getParkingSlotBtn'>Get Parking Slot</button>
              </form>
              <ParkingDetails id={id} slotType={slot} floor={floor} parkingLot={parkingLot}/>
          </div>
        
      </div>
    );
};
  
  export default Home;