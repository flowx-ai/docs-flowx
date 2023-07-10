import React from 'react';
import Modal from 'react-modal';

const NpsModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="NPS Survey"
      className="nps-modal" // Add a custom CSS class for the modal
      overlayClassName="nps-modal-overlay" // Add a custom CSS class for the modal overlay
    >
      <h2 className="nps-modal-title">NPS Survey</h2>
      <p className="nps-modal-content"> We value your feedback! Please take a moment to participate in our Net Promoter Score (NPS) survey. </p>
      <a href="https://forms.gle/a7FSY47dd1dHupcc9" className="nps-button">Take the NPS survey</a>
      <button className="nps-modal-close-button" onClick={onClose}>
        Close
      </button>
    </Modal>
  );
};

export default NpsModal;
