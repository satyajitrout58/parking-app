export type FloorSdetails = {
    floorNumber: number;
    small: number;
    Large: number;
    Medium: number;
    XLarge: number;
  }
  export type KeyType = 'small' | 'Large' | 'Medium' | 'XLarge'
  
  export type OnSlotChange = (e: React.ChangeEvent<HTMLInputElement>, key: number, slotType: KeyType) => void
  
  export type OnFloorNumberChangeType = (e: React.ChangeEvent<HTMLInputElement>, key: number) => void
  
  export type Payload = {
    floors: FloorSdetails[]
    parkingLot: string
  }