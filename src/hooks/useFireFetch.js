// hooks
import { useEffect, useState } from 'react';

// firebase
import db from '../firebase/config';
import { collection, onSnapshot, doc, getDoc } from 'firebase/firestore';

export const useFireFetch = (
  targetCollection,
  id = null,
  parameters = null
) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      let ref;
      if (id) {
        ref = doc(db, targetCollection, id);
        const unsub = await getDoc(ref);
        const results = { ...unsub.data(), id: unsub.id };
        setData(results);
        if (!unsub.exists()) {
          setIsPending(false);
          setError('couldnt find the data');
        } else {
          setIsPending(false);
        }

        return () => results;
      } else {
        ref = collection(db, targetCollection);

        const unsub = await onSnapshot(ref, (snapshot) => {
          let results = [];
          snapshot.docs.forEach((doc) => {
            results.push({ ...doc.data(), id: doc.id });
          });
          if (results.length === 0) {
            setError('no data was found');
            setIsPending(false);
          } else {
            setData(results);
            setIsPending(false);
          }
        });

        return () => unsub();
      }
    };

    fetchData();
  }, [targetCollection, id]);

  return { data, isPending, error };
};
