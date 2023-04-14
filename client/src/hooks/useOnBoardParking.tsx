import React, {useState} from "react";
import { Payload, } from './types/type'

const useOnBoardParking = () => {
    const [loading, setLoading] = useState(false)
    const onBoardParkingDetails = async(payload : Payload) => {
        setLoading(true)
        try{
            const response = await fetch(`http://localhost:5000/unboardParking`, {
                method: "POST",
                mode: "cors", 
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
              });
            const parkingResponse = await response.json()
            setLoading(false)
        }catch(err){
            console.log(err)
            setLoading(false)
        }
    }

    return { onBoardParkingDetails, loading }  
}

export default useOnBoardParking