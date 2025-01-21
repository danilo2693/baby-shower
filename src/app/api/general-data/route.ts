export const dynamic = 'force-static';
import FIREBASE_CONFIG from '@/lib/firebase-config';
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';

const db = getFirestore(FIREBASE_CONFIG);

export async function GET() {
  const generalRef = query(collection(db, 'general_data'));
  const generalSnapshot = await getDocs(generalRef);
  const generalDataArray = generalSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id
  }));

  const [generalData] = generalDataArray;

  return Response.json(generalData);
}
