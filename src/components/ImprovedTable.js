import React, { useState } from 'react';
import './ImprovedTable.css'; // Import CSS file for styling

function ImprovedTable() {
  const dropdownOptions = [
    '3.4.3',
    '3.4.2',
    '3.4.1',
    '3.4.0',
    '3.3.0',
    // Add more options here
  ];

  const packages = ['process-engine', 'admin', 'designer', '@flowx/ui-sdk', '@flowx/ui-toolkit', '@flowx/ui-theme', 'paperflow-web-components', 'flowx-process-renderer', 'cms-core', 'scheduler-core', 'events-gateway', 'notification-plugin', 'document-plugin', 'ocr-plugin', 'license-core', 'customer-management-plugin', 'task-management-plugin', 'data-search', 'audit-core', 'reporting-plugin', 'advancing-controller', 'iOS renderer', 'Android renderer'];

  const [selectedOption1, setSelectedOption1] = useState(dropdownOptions[0]);
  const [selectedOption2, setSelectedOption2] = useState(dropdownOptions[0]);
  const [selectedPackage1, setSelectedPackage1] = useState(packages[0]);
  const [selectedPackage2, setSelectedPackage2] = useState(packages[0]);

  const handleDropdownChange1 = (event) => {
    setSelectedOption1(event.target.value);
  };

  const handleDropdownChange2 = (event) => {
    setSelectedOption2(event.target.value);
  };

  const handlePackageChange1 = (event) => {
    setSelectedPackage1(event.target.value);
  };

  const handlePackageChange2 = (event) => {
    setSelectedPackage2(event.target.value);
  };

  const tableData = {
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
      'audit-core': '2.1.',
      'reporting-plugin': '0.0.40',
      'advancing-controller': '0.3.5',
      'iOS renderer': '2.3.0',
      'Android renderer': '2.1.4'
    },
    // Add data for other versions
  };

  return (
    <div>
      <h2>Compare Component Versions</h2>
      <div className="table-container">
        <div className="table">
          <label>Select Version 1:</label>
          <select className='select-element' value={selectedOption1} onChange={handleDropdownChange1}>
            {dropdownOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <label>Select Package 1:</label>
          <select className='select-element' value={selectedPackage1} onChange={handlePackageChange1}>
            {packages.map((pkg) => (
              <option key={pkg} value={pkg}>
                {pkg}
              </option>
            ))}
          </select>
        </div>
        <div className="table">
          <label>Select Version 2:</label>
          <select className='select-element' value={selectedOption2} onChange={handleDropdownChange2}>
            {dropdownOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <label>Select Package 2:</label>
          <select className='select-element' value={selectedPackage2} onChange={handlePackageChange2}>
            {packages.map((pkg) => (
              <option key={pkg} value={pkg}>
                {pkg}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="comparison">
        {tableData[selectedOption1] && tableData[selectedOption2] && (
          <table>
            <thead>
              <tr>
                <th>Package</th>
                <th>{selectedOption1}</th>
                <th>{selectedOption2}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selectedPackage1}</td>
                <td>{tableData[selectedOption1][selectedPackage1]}</td>
                <td>{tableData[selectedOption2][selectedPackage2]}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ImprovedTable;
