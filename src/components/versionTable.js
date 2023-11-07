import React, { useState } from 'react';

const VersionTable = () => {
  const components = [
    'process-engine',
    'admin',
    'designer',
    '@flowx/ui-sdk',
    '@flowx/ui-toolkit',
    '@flowx/ui-theme',
    'paperflow-web-components',
    'flowx-process-renderer',
    'cms-core',
    'scheduler-core',
    'events-gateway',
    'notification-plugin',
    'document-plugin',
    'ocr-plugin',
    'license-core',
    'customer-management-plugin',
    'task-management-plugin',
    'data-search',
    'audit-core',
    'reporting-plugin',
    'advancing-controller',
    'iOS renderer',
    'Android renderer',
  ];

  const [selectedComponent, setSelectedComponent] = useState(components[0]);

  const versionData = {
    'process-engine': [
      '',
      '4.3.2',
      '4.3.1',
      '4.1.0',
      // ... other versions for 'process-engine'
    ],
    // ... Add version data for other components
  };

  const handleComponentChange = (event) => {
    setSelectedComponent(event.target.value);
  };

  return (
    <div>
      <select value={selectedComponent} onChange={handleComponentChange}>
        {components.map((component) => (
          <option key={component} value={component}>
            {component}
          </option>
        ))}
      </select>

      <table>
        <thead>
          <tr>
            {versionData[selectedComponent].map((version, index) => (
              <th key={index}>{version}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {versionData[selectedComponent].map((version, index) => (
              <td key={index}>{version}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default VersionTable;
