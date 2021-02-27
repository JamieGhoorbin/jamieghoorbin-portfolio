import { useState } from 'react';

const name = {
  firstName: 'Jamie',
  secondName: 'Ghoorbin',
};

const location = {
  ...name,
  location1: 'London',
  location2: 'Canterbury',
};

console.log(name);
console.log(location);

const SomeData = () => {
  const [someData, setSomeData] = useState({});
  return (
    <div>
      <h3>Current Data</h3>
      <button onClick={() => setSomeData(name)}>Name</button>
      <button onClick={() => setSomeData(location)}>Location</button>

      <ul>
        {Object.keys(someData).map((x) => (
          <li key={x}>
            {x}: {someData[x]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SomeData;
