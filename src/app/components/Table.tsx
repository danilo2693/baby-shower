'use client';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { GuestType } from '../types';
import Link from 'next/link';
import { CiLink } from 'react-icons/ci';
import { Clipboard } from './Clipboard';

const SWLibrary = withReactContent(Swal);

export const Table = ({
  guests,
  generalData
}: {
  guests: GuestType[];
  generalData: { copy_message: string };
}) => {
  const [showTable, setShowTable] = useState(false);

  const showModalTable = () => {
    SWLibrary.fire({
      title: 'Escribe la contraseña',
      input: 'text',
      confirmButtonColor: '#d95ba7',
      cancelButtonColor: '#fcf3f9',
      confirmButtonText: 'Aceptar',
      allowOutsideClick: false,
      preConfirm: (password) => {
        if (password === `${process.env.NEXT_PUBLIC_TABLE_PASSWORD}`) {
          return true;
        } else {
          SWLibrary.showValidationMessage(`
            Contraseña incorrecta
           `);
        }
      }
    }).then((result) => {
      if (!result.dismiss) {
        setShowTable(true);
      }
    });
  };

  useEffect(() => {
    showModalTable();
  }, []);
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            Cantidad
          </th>
          <th scope="col" className="px-6 py-3">
            Nombres
          </th>
          <th scope="col" className="px-6 py-3">
            Estado
          </th>
          <th scope="col" className="px-6 py-3">
            Ver invitación
          </th>
          <th scope="col" className="px-6 py-3">
            Copiar enlace de invitación
          </th>
        </tr>
      </thead>
      <tbody>
        {showTable &&
          guests?.map((item) => (
            <tr
              key={item.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.allNames.length}
              </th>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.names}
              </th>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.isConfirmed ? (
                  <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                    Confirmado
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                    Sin confirmar
                  </span>
                )}
              </th>
              <td className="px-6 py-4">
                <Link
                  href={`/invitations/${item.id}`}
                  className="flex gap-1 items-center flex-wrap underline"
                >
                  <CiLink />
                  Ver invitación
                </Link>
              </td>
              <td className="px-6 py-4">
                <Clipboard
                  text={generalData?.copy_message}
                  url={`${process.env.NEXT_PUBLIC_HOST}/invitations/${item.id}`}
                />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
