import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useSpring, animated } from 'react-spring';

const NpsModal = ({ isOpen, onClose }) => {
  const [hasShownModal, setHasShownModal] = useState(false);
  const fadeAnimation = useSpring({
    opacity: isOpen ? 1 : 0,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  useEffect(() => {
    const hasShown = localStorage.getItem('hasShownModal');
    if (hasShown) {
      setHasShownModal(true);
    }
  }, []);

  const closeModal = () => {
    setHasShownModal(true);
    localStorage.setItem('hasShownModal', 'true');
    onClose();
  };

  return (
    <>
      {!hasShownModal && (
        <Modal
          isOpen={true}
          onRequestClose={closeModal}
          contentLabel="NPS Survey"
          className="nps-modal"
          overlayClassName="nps-modal-overlay"
        >
          <animated.div style={fadeAnimation}>
            <button className="nps-modal-close-button" onClick={closeModal}>
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
