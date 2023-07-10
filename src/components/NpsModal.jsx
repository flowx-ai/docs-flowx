import React from 'react';
import Modal from 'react-modal';
import { useSpring, animated } from 'react-spring';

const NpsModal = ({ isOpen, onClose }) => {
  const fadeAnimation = useSpring({
    opacity: isOpen ? 1 : 0,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  return (
    <>
      {isOpen && (
        <Modal
          isOpen={true}
          onRequestClose={onClose}
          contentLabel="NPS Survey"
          className="nps-modal"
          overlayClassName="nps-modal-overlay"
        >
          <animated.div style={fadeAnimation}>
            <button className="nps-modal-close-button" onClick={onClose}>
              <span aria-hidden="true">×</span>
            </button>
            <h2 className="nps-modal-title">NPS Survey</h2>
            <p className="nps-modal-content">
              We value your feedback! Please take a moment to participate in our Net Promoter Score (NPS) survey.
            </p>
            <a href="https://forms.gle/a7FSY47dd1dHupcc9" className="nps-button">
              Take the NPS survey
            </a>
          </animated.div>
        </Modal>
      )}
    </>
  );
};

export default NpsModal;
