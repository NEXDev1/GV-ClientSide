// ModalContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import Modal from './Modal';

interface ModalContextType {
  showModal: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    console.log("openModal");
    setShowModal(true);
    console.log("showModal"); // Add this line
  };

  const closeModal = () => {
    setShowModal(false);
    console.log(showModal); // Add this line
  };

  return (
    <ModalContext.Provider value={{ showModal, openModal, closeModal }}>
      {children}
      {showModal && <Modal />}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
