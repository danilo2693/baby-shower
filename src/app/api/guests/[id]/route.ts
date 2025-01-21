export const dynamic = 'force-static';
import { GuestType } from '@/app/types';
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
  const guests: GuestType[] = postsSnapshot.docs.map((doc: any) => ({
    ...doc.data(),
    id: doc.id
  }));

  const [guest] = guests;
  if (guest) {
    const lf = new Intl.ListFormat('es');
    let guestTransformed;
    if (guest.names.length > 2) {
      const [firstPerson] = guest.names;
      guestTransformed = { ...guest, names: `${firstPerson} y familia` };
    } else {
      guestTransformed = { ...guest, names: lf.format(guest.names) };
    }
    return Response.json(guestTransformed);
  }
  return Response.json(null);
}
