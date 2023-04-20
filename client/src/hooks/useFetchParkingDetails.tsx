import React, { useState, useContext } from "react";
import {parkingContext} from '../common/Context'
import { ParkingDetailsType} from './types/type'


const useFetchParkingDetails  = () => {
    const dispatch  = useContext(parkingContext)?.dispatch
    const [parkingDetails, setParkingDetails] = useState(null)

    const getParkingDetails: ParkingDetailsType = async ({type, parkingLot }): Promise<any> => {
        try{
            const response = await fetch(`http://localhost:5000/getSlot/${parkingLot}/${type}`, {
                method: "GET",
                mode: "cors", 
                headers: {
                  "Content-Type": "application/json",
                }
              });
            const parkingResponse = await response.json()
            const payload = {
                id: parkingResponse._id,
                floor: parkingResponse.floor,
                slotType: parkingResponse.slotType
            }
            dispatch && dispatch({type: 'SET_PARKING_DETAILS', payload})
        
        }catch(err){
            console.log(err)
            return false
        }finally{
            return Promise.resolve()
        }

        
    }

    const updateParkingDetails: ParkingDetailsType = async({parkingLot, id}): Promise<any> => {
        console.log(id)
        try{
            const response = await fetch(`http://localhost:5000/releaseSlot/${parkingLot}/${id}`, {
                method: "PUT",
                mode: "cors", 
                headers: {
                  "Content-Type": "application/json",
                }
              });
            const parkingResponse = await response.json()
            console.log(parkingResponse)
            dispatch && dispatch({type: 'RESET_PARKING_DETAILS'})
        }catch(err){
            console.log(err)
        }finally{
            return Promise.resolve()
        }

    }

    return {getParkingDetails, updateParkingDetails}
}

export default useFetchParkingDetails