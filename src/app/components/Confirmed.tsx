'use client';
import FIREBASE_CONFIG from '@/lib/firebase-config';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function Confirmed({
  id,
  initialConfirm
}: {
  id: string;
  initialConfirm: boolean;
}) {
  const [isConfirmed, setIsConfirmed] = useState(initialConfirm);

  useEffect(() => {
    const db = getFirestore(FIREBASE_CONFIG);
    const documentRef = doc(db, `guests/${id}`);

    const unsubscribe = onSnapshot(documentRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setIsConfirmed(data.isConfirmed);
      } else {
        console.error('No such document!');
      }
    });

    return () => unsubscribe();
  }, [id]);

  return (
    <>
      {isConfirmed ? (
        <span className="flex items-center self-end gap-1 font-cookie-fallback sm:text-sm text-xl ">
          🎉🎊Asistencia confirmada🎊🎉
        </span>
      ) : (
        <span className="self-end gap-1 font-cookie-fallback sm:text-sm text-xl ">
          Asistencia sin confirmar 😔
        </span>
      )}
    </>
  );
}
