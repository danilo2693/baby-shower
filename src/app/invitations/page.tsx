import Link from 'next/link';
import { CiLink } from 'react-icons/ci';
import { Clipboard } from '../components/Clipboard';

export default async function Invitation() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/guests`);
  const guests = await data?.json();

  return (
    <main className="flex flex-col justify-center items-center h-screen p-20 sm:py-10 sm:p-4">
      <h1 className="font-cookie sm:text-6xl text-8xl text-persian-pink-600 mb-4">
        Invitaciones
      </h1>
      <div className="relative overflow-x-auto w-full">
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
            {guests?.map((item) => (
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
                    href={`/invitations/${item.id}`}
                    className="flex gap-1 items-center flex-wrap"
                  >
                    <CiLink />
                    Ver invitación
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <Clipboard
                    text={`${process.env.NEXT_PUBLIC_HOST}/invitation/${item.id}`}
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
