export const dynamic = 'force-static';
import { GuestType } from '@/app/types';
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
  const guests: GuestType[] = postsSnapshot.docs.map((doc: any) => ({
    ...doc.data(),
    id: doc.id
  }));
  return Response.json(
    guests.map((guest) => {
      const lf = new Intl.ListFormat('es');
      let guestTransformed;
      if (guest.names.length > 2) {
        const [firstPerson] = guest.names;
        guestTransformed = { ...guest, names: `${firstPerson} y familia` };
      } else {
        guestTransformed = { ...guest, names: lf.format(guest.names) };
      }
      return guestTransformed;
    })
  );
}
