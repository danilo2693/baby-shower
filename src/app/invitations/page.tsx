export const dynamic = 'force-dynamic';
import Link from 'next/link';
import { CiLink } from 'react-icons/ci';
import { Clipboard } from '../components/Clipboard';
import { GuestType } from '../types';

export default async function Invitation() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/guests`);

  const response = await data?.json();
  const guests: GuestType[] = response.guests;
  const {
    total,
    totalConfirmedAdults,
    totalConfirmedChildren,
    totalConfirmed,
    totalUnconfirmed
  } = response;

  const generalDataResponse = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/general-data`
  );

  const generalData = await generalDataResponse?.json();

  return (
    <main className="flex flex-col justify-center items-center h-screen p-20 sm:py-10 sm:p-4">
      <h1 className="font-cookie sm:text-6xl text-8xl text-persian-pink-600 mb-4">
        Invitaciones
      </h1>
      <div className="flex flex-wrap gap-2 self-end pb-4">
        <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
          Total: {total}
        </span>
        <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
          Adultos confirmados: {totalConfirmedAdults}
        </span>
        <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
          Niños confirmados: {totalConfirmedChildren}
        </span>
        <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
          Total confirmados: {totalConfirmed}
        </span>
        <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
          Sin confirmar: {totalUnconfirmed}
        </span>
      </div>
      <div className="relative overflow-x-auto w-full">
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
            {guests?.map((item) => (
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
                    url={`${process.env.NEXT_PUBLIC_HOST}/invitation/${item.id}`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
