import React, { createContext, useReducer } from "react";
import { InitialStateType, ActionType, ContextType, ParkingContextType } from './types/type'

const initialState : InitialStateType = {
    id: undefined,
    floor: undefined,
    slotType: undefined,
    parkingLot: 'test'
}

const reducer = (state : InitialStateType, action: ActionType): InitialStateType => {
    switch(action.type){
        case 'SET_PARKING_DETAILS':{
            const { payload } = action
            const {id,floor, slotType } = payload
            return {...state , id, floor, slotType}
        }
        case 'RESET_PARKING_DETAILS':
            return {...state , id: undefined, floor:undefined, slotType: undefined}
        default:
            return state
    }
}

export const parkingContext = createContext<ParkingContextType | null>(null)

const ParkingContext = ({ children }: ContextType) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <parkingContext.Provider value={{state, dispatch}}>{children}</parkingContext.Provider>
    )
}
export default ParkingContext