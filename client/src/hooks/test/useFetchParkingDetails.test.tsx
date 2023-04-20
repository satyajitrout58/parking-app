import { renderHook, act } from '@testing-library/react'
import useFetchParkingDetails from '../useFetchParkingDetails'

describe('useFetchParkingDetails custom hook', () => {
    const wraper = () => {
        return renderHook(useFetchParkingDetails)
    }
    test('It should call getParkingDetails', ()=> {
        const { result } = wraper()
    })
})