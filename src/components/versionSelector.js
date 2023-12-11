import React, { useState } from 'react';
import versionData from './versionData'; // Import your version data from a separate file or API

const VersionSelector = () => {
  // State to track the selected version
  const [selectedVersion, setSelectedVersion] = useState(null);

  // Handle version selection
  const handleVersionSelect = (event) => {
    setSelectedVersion(event.target.value);
  };

  return (
    <div>
      <h2>Version Selector</h2>
      <select value={selectedVersion} onChange={handleVersionSelect}>
        <option value="">Select a version</option>
        {versionData.map((item) => (
          <option key={item.version} value={item.version}>
            {item.version}
          </option>
        ))}
      </select>
      <div>
        {selectedVersion && (
          <div>
            <h3>Data for Version {selectedVersion}</h3>
            <pre>{JSON.stringify(versionData.find((item) => item.version === selectedVersion).data, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default VersionSelector;
