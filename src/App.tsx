import { ChangeEvent, useState } from 'react';
import { Button } from "@/components/ui/button";

export default function App() {
  // Initialize state with the number from localStorage or default to 0
  const [number, setNumber] = useState(() => {
    const savedNumber = localStorage.getItem('userNumber');
    return savedNumber ? JSON.parse(savedNumber) : 0;
  });

  // Handle button click to increment the number
  const handleClick = () => {
    const newNumber = number + 1;
    setNumber(newNumber);
    localStorage.setItem('userNumber', JSON.stringify(newNumber));
  };

  // Export the current number as a JSON file
  const exportData = () => {
    const data = { number };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'userData.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Handle file input change to import data
  const importData = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length === 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      
      reader.onload = () => {
        const data = JSON.parse(reader.result?.toString() || '');
        // TODO: have a better way to determine the structure of the json file (schema)
        if (typeof data.number === 'number') {
          setNumber(data.number);
          localStorage.setItem('userNumber', JSON.stringify(data.number));
        } else {
          alert("Invalid file format: 'number' field is missing or not a number.");
        }
      };
      
      reader.readAsText(file);
    } else {
      alert("Invalid file selection");
    }
  };

  return (
    <div>
      <Button onClick={handleClick}>Click me</Button>
      <p>Current Number: {number}</p>
      <Button onClick={exportData}>Export Number</Button>
      {/* TODO: make this a component? */}
      <input type="file" accept=".json" onChange={importData} />
    </div>
  );
}
