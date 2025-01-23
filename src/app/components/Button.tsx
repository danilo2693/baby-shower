'use client';
import React from 'react';
import { ButtonType } from '../types';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import FIREBASE_CONFIG from '@/lib/firebase-config';

const SWLibrary = withReactContent(Swal);
const db = getFirestore(FIREBASE_CONFIG);

export const Button = ({
  children,
  text,
  url,
  showConfirm,
  id,
  maxDateToConfirm
}: ButtonType) => {
  const goTo = () => {
    window.open(url);
  };

  const enableToConfirmInvitation = () => {
    const today = new Date();
    const maxDate = new Date(maxDateToConfirm || '');

    return today <= maxDate;
  };

  const updateStatus = async (isConfirmed: boolean) => {
    if (id) {
      await updateDoc(doc(db, 'guests', id), {
        isConfirmed
      });
    }
  };

  const showInvalidDateConfirmation = () => {
    SWLibrary.fire({
      title: 'Lo siento, ya no se puede confirmar asistencia',
      confirmButtonColor: '#d95ba7',
      cancelButtonColor: '#fcf3f9',
      denyButtonText: 'No puedo ir',
      showCloseButton: true,
      allowOutsideClick: false
    }).then((result) => {
      if (!result.dismiss) {
        updateStatus(!!result.isConfirmed);
      }
    });
  };

  const showConfirmModal = () => {
    SWLibrary.fire({
      title: 'Hola. ¿Quieres confirmar tu asistencia?',
      confirmButtonColor: '#d95ba7',
      cancelButtonColor: '#fcf3f9',
      confirmButtonText: 'Si',
      showDenyButton: true,
      denyButtonText: 'No puedo ir',
      showCloseButton: true,
      allowOutsideClick: false
    }).then((result) => {
      if (!result.dismiss) {
        updateStatus(!!result.isConfirmed);
      }
    });
  };

  const showModal = () => {
    if (enableToConfirmInvitation()) {
      showConfirmModal();
    } else {
      showInvalidDateConfirmation();
    }
  };

  return (
    <button
      type="button"
      className="text-white bg-persian-pink-700 hover:bg-persian-pink-800 focus:ring-4 focus:outline-none focus:ring-persian-pink-300 font-medium rounded-3xl text-lg sm:text-[0.75rem] px-5 sm:px-2 py-2.5 sm:py-0 text-center inline-flex items-center dark:bg-persian-pink-600 dark:hover:bg-persian-pink-700 dark:focus:ring-persian-pink-800"
      onClick={showConfirm ? showModal : goTo}
    >
      {children}
      {text}
    </button>
  );
};
