export type ParkingDetailsType = {
    id: string | undefined;
    floor: number | undefined;
    slotType: string | undefined;
    parkingLot: string | undefined;
}
export type updateParking = (e: React.MouseEvent<HTMLButtonElement>) => void