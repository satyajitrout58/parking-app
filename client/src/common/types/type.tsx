export type InitialStateType = {
    id: undefined | string;
    floor: undefined | number;
    slotType: undefined | string;
    parkingLot: string;
}

export type ActionType = {
    type: string,
    payload?: any 
}

export type ContextType = {
    children: React.ReactNode
}

export type ParkingContextType = {
    state: InitialStateType;
    dispatch : React.Dispatch<ActionType>;

}