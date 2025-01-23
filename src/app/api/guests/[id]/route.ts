export const dynamic = 'force-dynamic';
import { GuestResponseType, PersonType } from '@/app/types';
import FIREBASE_CONFIG from '@/lib/firebase-config';
import {
  getFirestore,
  collection,
  query,
  getDocs,
  where,
  documentId
} from 'firebase/firestore';
import { NextRequest } from 'next/server';

const db = getFirestore(FIREBASE_CONFIG);

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const postsRef = query(
    collection(db, 'guests'),
    where(documentId(), '==', id)
  );

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

  const [guest] = guestsWithType;
  if (guest) {
    const lf = new Intl.ListFormat('es');
    const names = guest.names.map((item: PersonType) => item.name);

    let guestTransformed;
    if (guest.names.length > 2) {
      const [firstPerson] = names;
      guestTransformed = { ...guest, names: `${firstPerson} y familia` };
    } else {
      guestTransformed = { ...guest, names: lf.format(names) };
    }
    return Response.json(guestTransformed);
  }
  return Response.json(null);
}
