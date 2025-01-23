export const dynamic = 'force-dynamic';
import { GuestResponseType, GuestType, PersonType } from '@/app/types';
import FIREBASE_CONFIG from '@/lib/firebase-config';
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query
} from 'firebase/firestore';

const db = getFirestore(FIREBASE_CONFIG);

export async function GET() {
  const postsRef = query(collection(db, 'guests'), orderBy('names'));

  const postsSnapshot = await getDocs(postsRef);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const guests: GuestResponseType[] = postsSnapshot.docs.map((doc: any) => ({
    ...doc.data(),
    id: doc.id
  }));

  const guestsWithType = guests.map((guest) => {
    return {
      ...guest,
      names: guest.names.map((item: string) => {
        const [name, type] = item.split('-');
        return {
          name,
          type
        };
      })
    };
  });

  const guestsTransformed: GuestType[] = guestsWithType.map((guest) => {
    const lf = new Intl.ListFormat('es');
    const names = guest.names.map((item: PersonType) => item.name);
    let guestTransformed;
    if (guest.names.length > 2) {
      const [firstPerson] = names;
      guestTransformed = {
        ...guest,
        names: `${firstPerson} y familia`,
        allNames: guest.names
      };
    } else {
      guestTransformed = {
        ...guest,
        names: lf.format(names),
        allNames: guest.names
      };
    }
    return guestTransformed;
  });

  const totals = guestsTransformed.reduce(
    (acc, item) => {
      // Suma el total de allNames
      acc.total += item.allNames.length;

      // Si el item está confirmado, analiza los tipos
      if (item.isConfirmed) {
        item.allNames.forEach((name) => {
          if (name.type === 'a') acc.totalConfirmedAdults++;
          if (name.type === 'n') acc.totalConfirmedChildren++;
        });
      }

      return acc;
    },
    {
      total: 0,
      totalConfirmedAdults: 0,
      totalConfirmedChildren: 0
    }
  );

  return Response.json({
    guests: guestsTransformed,
    ...totals,
    totalConfirmed: totals.totalConfirmedAdults + totals.totalConfirmedChildren,
    totalUnconfirmed:
      totals.total -
      (totals.totalConfirmedAdults + totals.totalConfirmedChildren)
  });
}
