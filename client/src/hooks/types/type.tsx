export type ParkingDetailsArgsType = {
    parkingLot: string;
    type?: string;
    id?: string;
}

export type ParkingDetailsType = ({ type, parkingLot, id }: ParkingDetailsArgsType) => Promise<any>

export type FloorSdetails = {
    floorNumber: number;
    small: number;
    Large: number;
    Medium: number;
    XLarge: number;
}
export type Payload = {
    floors: FloorSdetails[]
    parkingLot: string
}
