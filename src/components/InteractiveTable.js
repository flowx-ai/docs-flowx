import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button } from '@mui/material';
import { useState } from 'react';

const InteractiveTable = () => {
    const [firstDropdownValue, setFirstDropdownValue] = useState('');
    const [secondDropdownValue, setSecondDropdownValue] = useState('');
    
    const handleFirstDropdownChange = (event) => {
      const selectedValue = event.target.value;
      setFirstDropdownValue(selectedValue);
  
      // Reset the second dropdown when the first dropdown changes
      setSecondDropdownValue('');
    };
  
    const handleSecondDropdownChange = (event) => {
      const selectedValue = event.target.value;
      setSecondDropdownValue(selectedValue);
    };
  
    // Define options for the second dropdown based on the selection in the first dropdown
    const secondDropdownOptions = [
      { label: 'Select an option', value: '' },
      { label: 'Option A', value: 'A' },
      { label: 'Option B', value: 'B' },
      { label: 'Option C', value: 'C' },
    ];
  
    return (
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>First Dropdown</th>
            <th>Second Dropdown</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Item 1</td>
            <td>
              <select value={firstDropdownValue} onChange={handleFirstDropdownChange}>
                <option value="">Select an option</option>
                <option value="Option 1">Option 1</option>
                <option value="Option 2">Option 2</option>
                <option value="Option 3">Option 3</option>
              </select>
            </td>
            <td>
              <select value={secondDropdownValue} onChange={handleSecondDropdownChange}>
                {secondDropdownOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    );
  };
  
export default InteractiveTable;
