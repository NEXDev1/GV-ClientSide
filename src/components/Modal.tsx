import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useModal } from './ModalContext';
import Invoice from './Invoice'; // Import the Invoice component

export default function Modal() {
  const { showModal, closeModal } = useModal();
  const modalContentRef = useRef(null);
  

  const handlePrint = () => {
    const modalContent = modalContentRef.current as HTMLElement | null;
    if (modalContent) {
      const contentToPrint = modalContent.innerHTML;
      const originalDocumentContent = document.body.innerHTML;
  
      // Temporarily replace the document content with the modal content
      document.body.innerHTML = contentToPrint;
  
      // Trigger the print dialog
      window.print();
  
      // Restore the original document content
      document.body.innerHTML = originalDocumentContent;
    }
  };

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={showModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-middle max-w-screen-lg w-full p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl">
              <div className="flex flex-col h-full">
                <div className="flex-none flex justify-end items-center mb-4">
                  <button
                    className="text-gray-400 hover:text-gray-500 mr-4 no-print"
                    onClick={handlePrint}
                  >
                    <span className="sr-only">Print</span>
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                  <button
                    ref={cancelButtonRef}
                    className="text-gray-400 hover:text-gray-500 no-print"
                    onClick={closeModal}
                  >
                    <span className="sr-only">Close</span>
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex-auto overflow-y-auto" ref={modalContentRef}>
                  <Invoice />
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
