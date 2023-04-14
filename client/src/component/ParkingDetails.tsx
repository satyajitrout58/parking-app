import React from 'react'
import useFetchParkingDetails from '../hooks/useFetchParkingDetails'

import './ParkingDetails.css'

type ParkingDetailsType = {
    id: string | undefined;
    floor: number | undefined;
    slotType: string | undefined;
    parkingLot: string | undefined;
}
type updateParking = (e: React.MouseEvent<HTMLButtonElement>) => void
const ParkingDetails = ({id, floor, slotType, parkingLot} : ParkingDetailsType) => {
    const [ getParkingDetails, updateParkingDetails] = useFetchParkingDetails()
    const releaseParking: updateParking = (e) => {
        if(id && parkingLot){
            updateParkingDetails({id, parkingLot })
        }
    }
    return id && (
        <div className='parkingDetails'>
            <ul>
                <li><b>ID:</b> {id}</li>
                <li><b>Floor:</b> {floor}</li>
                <li><b>Slot Type:</b> {slotType}</li>
                <li>
                    <button onClick={releaseParking}>Release It</button>
                </li>
            </ul>
        </div>
    ) || <span>No Parking Available</span>
}
export default ParkingDetails