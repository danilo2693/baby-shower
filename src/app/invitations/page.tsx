import { GuestType } from '../types';
import { Table } from '../components/Table';

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
        <Table guests={guests} generalData={generalData} />
      </div>
    </main>
  );
}
