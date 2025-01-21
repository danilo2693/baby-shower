export const dynamic = 'force-static';
import FIREBASE_CONFIG from '@/lib/firebase-config';
import {
  getFirestore,
  collection,
  query,
  getDocs,
  where,
  documentId
} from 'firebase/firestore';

const db = getFirestore(FIREBASE_CONFIG);

export async function GET(request, { params }) {
  const { id } = await params;

  const postsRef = query(
    collection(db, 'guests'),
    where(documentId(), '==', id)
  );

  const postsSnapshot = await getDocs(postsRef);
  const guests = postsSnapshot.docs.map((doc) => ({
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
