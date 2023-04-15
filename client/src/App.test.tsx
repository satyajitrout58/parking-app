import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';

describe('App component', ( )=> {
  const wraper = () => {
    return render(
        <App />      
      );
  }
  test('renders header links', () => {
    window.history.pushState({}, "", '/')
    wraper()    
    expect(screen.getByTestId('allocateLink')).toBeInTheDocument();
    expect(screen.getByTestId('onBoardLink')).toBeInTheDocument();
  });
  test('renders header Home Component', () => {
    window.history.pushState({}, "", '/')
    wraper()
    expect(screen.getByTestId('homeContainer')).toBeInTheDocument();
    expect(screen.getByTestId('getParkingContainer')).toBeInTheDocument();
  });
  test('renders Onboard Component', () => {
    window.history.pushState({}, "", '/onboard')
    wraper()
    expect(screen.getByTestId('onBoardContainer')).toBeInTheDocument();
    expect(screen.getByTestId('noOfFloorContainer')).toBeInTheDocument();
    expect(screen.getByTestId('parkingLotContainer')).toBeInTheDocument();
  });
})

