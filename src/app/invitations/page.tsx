import Link from 'next/link';
import { CiLink } from 'react-icons/ci';
import { FaCopy } from 'react-icons/fa';
import { Clipboard } from '../components/Clipboard';

export default async function Invitation() {
  const data = await fetch('http://localhost:3000/api/guess');
  const guess = await data.json();
  return (
    <main className="flex flex-col justify-center items-center h-screen py-10">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nombres
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
            {guess.map((item) => (
              <tr
                key={item.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.names}
                </th>
                <td className="px-6 py-4">
                  <Link
                    href={`/invitation/${item.id}`}
                    target="_blank"
                    className="flex gap-1 items-center"
                  >
                    <CiLink />
                    Ver invitación
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <Clipboard text={`/invitation/${item.id}`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
