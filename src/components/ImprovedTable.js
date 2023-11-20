import React, { useState, useEffect } from 'react';
import './ImprovedTable.css'; // Import CSS file for styling

function ImprovedTable() {
  const dropdownOptions = [
    '3.4.4',
    '3.4.3',
    '3.4.2',
    '3.4.1',
    '3.4.0',
    '3.3.0',
    // Add more options here
  ];

  const packages = ['process-engine', 'admin', 'designer', '@flowx/ui-sdk', '@flowx/ui-toolkit', '@flowx/ui-theme', 'paperflow-web-components', 'flowx-process-renderer', 'cms-core', 'scheduler-core', 'events-gateway', 'notification-plugin', 'document-plugin', 'ocr-plugin', 'license-core', 'customer-management-plugin', 'task-management-plugin', 'data-search', 'audit-core', 'reporting-plugin', 'advancing-controller', 'iOS renderer', 'Android renderer'];

  const allOptions = dropdownOptions.concat(packages);

  const [selectedOption1, setSelectedOption1] = useState(dropdownOptions[0]);
  const [selectedOption2, setSelectedOption2] = useState(dropdownOptions[0]);
  const [selectedPackage, setSelectedPackage] = useState(packages[0]);
  const [changelogs, setChangelogs] = useState({});

  const handleDropdownChange1 = (event) => {
    setSelectedOption1(event.target.value);
  };

  const handleDropdownChange2 = (event) => {
    setSelectedOption2(event.target.value);
  };

  const handlePackageChange = (event) => {
    setSelectedPackage(event.target.value);
  };

  const changelogData = {
    '3.4.4': {
      'process-engine': [
        'Changelog entry 1 for process-engine in version 3.4.4',
        'Changelog entry 2 for process-engine in version 3.4.4',
        // Add more entries for other packages in this version
      ],
      'admin': [
        'Changelog entry 1 for admin in version 3.4.4',
        'Changelog entry 2 for admin in version 3.4.4',
        // Add more entries for other packages in this version
      ],
      // Add more packages and their respective changelogs for version 3.4.4
    },
    '3.4.3': {
      'process-engine': [
        'Changelog entry 1 for process-engine in version 3.4.3',
        'Changelog entry 2 for process-engine in version 3.4.3',
        // Add more entries for other packages in this version
      ],
      'admin': [
        'Changelog entry 1 for admin in version 3.4.3',
        'Changelog entry 2 for admin in version 3.4.3',
        // Add more entries for other packages in this version
      ],
      // Add more packages and their respective changelogs for version 3.4.3
    },
    // Add more changelog entries for other versions
  };


  useEffect(() => {
    // Fetch changelog entries for the selected package and versions
    const changelog1 = changelogData[selectedOption1]?.[selectedPackage] || [];
    const changelog2 = changelogData[selectedOption2]?.[selectedPackage] || [];

    // Store changelog entries for both versions in a combined object
    const combinedChangelogs = {
      [selectedOption1]: changelog1,
      [selectedOption2]: changelog2,
    };

    setChangelogs(combinedChangelogs);
  }, [selectedOption1, selectedOption2, selectedPackage]);


  

  const tableData = {
    '3.4.4': {
      'process-engine': '4.3.5-2v1',
      'admin': '3.3.19-1',
      'designer': '3.35.18-1',
      '@flowx/ui-sdk':'3.35.18-1',
      '@flowx/ui-toolkit':'3.35.18-1',
      '@flowx/ui-theme': '3.35.18-1',
      'paperflow-web-components': '3.35.18-1',
      'flowx-process-renderer': '-',
      'cms-core': '1.3.9',
      'scheduler-core':'1.2.4',
      'events-gateway': '1.1.0',
      'notification-plugin': '2.0.9',
      'document-plugin': '2.0.10',
      'ocr-plugin': '1.0.12',
      'license-core': '1.0.7',
      'customer-management-plugin': '0.2.8',
      'task-management-plugin': '3.0.3',
      'data-search': '0.2.6',
      'audit-core': '2.2.0',
      'reporting-plugin': '0.0.40',
      'advancing-controller': '0.3.5',
      'iOS renderer': '2.3.0',
      'Android renderer': '2.1.4'
    },

    '3.4.3': {
      'process-engine': '4.3.5',
      'admin': '3.3.19',
      'designer': '3.35.18',
      '@flowx/ui-sdk':'3.35.18',
      '@flowx/ui-toolkit':'3.35.18',
      '@flowx/ui-theme': '3.35.18',
      'paperflow-web-components': '3.35.18',
      'flowx-process-renderer': '-',
      'cms-core': '1.3.9',
      'scheduler-core':'1.2.4',
      'events-gateway': '1.1.0',
      'notification-plugin': '2.0.9',
      'document-plugin': '2.0.10',
      'ocr-plugin': '1.0.12',
      'license-core': '1.0.7',
      'customer-management-plugin': '0.2.8',
      'task-management-plugin': '3.0.3',
      'data-search': '0.2.6',
      'audit-core': '2.2.0',
      'reporting-plugin': '0.0.40',
      'advancing-controller': '0.3.5',
      'iOS renderer': '2.3.0',
      'Android renderer': '2.1.4'
    },

    '3.4.2': {
      'process-engine': '4.3.2',
      'admin': '3.3.10',
      'designer': '3.35.9',
      '@flowx/ui-sdk':'3.35.9',
      '@flowx/ui-toolkit':'3.35.9',
      '@flowx/ui-theme': '3.35.9',
      'paperflow-web-components': '3.35.9',
      'flowx-process-renderer': '-',
      'cms-core': '1.3.9',
      'scheduler-core':'1.2.4',
      'events-gateway': '1.1.0',
      'notification-plugin': '2.0.8',
      'document-plugin': '2.0.8',
      'ocr-plugin': '1.0.12',
      'license-core': '1.0.7',
      'customer-management-plugin': '0.2.8',
      'task-management-plugin': '3.0.3',
      'data-search': '0.2.6',
      'audit-core': '2.1.0',
      'reporting-plugin': '0.0.40',
      'advancing-controller': '0.3.5',
      'iOS renderer': '2.3.0',
      'Android renderer': '2.1.4'
    },
  
  '3.4.1': {
  'process-engine': '4.3.1',
  'admin': '3.3.7',
  'designer': '3.35.6',
  '@flowx/ui-sdk':'3.35.6',
  '@flowx/ui-toolkit':'3.35.6',
  '@flowx/ui-theme': '3.35.6',
  'paperflow-web-components': '3.35.6',
  'flowx-process-renderer': '-',
  'cms-core': '1.3.9',
  'scheduler-core':'1.2.4',
  'events-gateway': '1.1.0',
  'notification-plugin': '2.0.8',
  'document-plugin': '2.0.8',
  'ocr-plugin': '1.0.12',
  'license-core': '1.0.7',
  'customer-management-plugin': '0.2.8',
  'task-management-plugin': '3.0.3',
  'data-search': '0.2.6',
  'audit-core': '2.1.3',
  'reporting-plugin': '0.0.40',
  'advancing-controller': '0.3.5',
  'iOS renderer': '2.3.0',
  'Android renderer': '2.1.4'
},

'3.4.0': {
  'process-engine': '4.1,0',
  'admin': '3.1.1',
  'designer': '3.33.2',
  '@flowx/ui-sdk':'3.33.2',
  '@flowx/ui-toolkit':'3.33.2',
  '@flowx/ui-theme': '3.33.2',
  'paperflow-web-components': '3.33.2',
  'flowx-process-renderer': '-',
  'cms-core': '1.3.6',
  'scheduler-core':'1.1.0',
  'events-gateway': '1.0.6',
  'notification-plugin': '2.0.5',
  'document-plugin': '2.0.6',
  'ocr-plugin': '1.0.8',
  'license-core': '1.0.4',
  'customer-management-plugin': '0.2.6',
  'task-management-plugin': '3.0.0',
  'data-search': '0.2.3',
  'audit-core': '2.1.0',
  'reporting-plugin': '0.0.40',
  'advancing-controller': '0.3.2',
  'iOS renderer': '2.3.0',
  'Android renderer': '2.1.4'
},


};


return (
  <div>
    <h2>Compare Component Versions</h2>
    <div className="table-container">
      {/* Dropdown for Version 1 */}
      <div className="table">
        <label>Select Version 1:</label>
        <select className='select-element' value={selectedOption1} onChange={handleDropdownChange1}>
          {dropdownOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      {/* Dropdown for Version 2 */}
      <div className="table">
        <label>Select Version 2:</label>
        <select className='select-element' value={selectedOption2} onChange={handleDropdownChange2}>
          {dropdownOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      {/* Dropdown for selecting a Package */}
      <div className="table">
        <label>Select Package:</label>
        <select className='select-element' value={selectedPackage} onChange={handlePackageChange}>
          {packages.map((pkg) => (
            <option key={pkg} value={pkg}>
              {pkg}
            </option>
          ))}
        </select>
      </div>
    </div>
    {/* Display changelogs for both selected versions */}
    <div className="changelog">
      <h3>Changelog for {selectedPackage}</h3>
      <div>
        {Object.entries(changelogs).map(([version, entries]) => (
          <div key={version}>
            <h4>Version {version}</h4>
            <ul>
              {entries.map((entry, index) => (
                <li key={index}>{entry}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </div>
);
}
export default ImprovedTable;
