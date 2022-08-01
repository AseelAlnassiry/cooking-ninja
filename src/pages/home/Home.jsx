// components
import RecipeList from '../../components/RecipeList/RecipeList';

// hooks
import { useEffect, useState } from 'react';

// firebase
import db from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

// styles
import './Home.css';

const Home = () => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async (targetData) => {
    await setIsPending(true);
    const dataCollection = collection(db, 'recipes');
    const dataSnapshot = await getDocs(dataCollection);

    if (dataSnapshot.empty) {
      setError('No recipes to load');
      setIsPending(false);
    } else {
      const dataList = dataSnapshot.docs.map((doc) => doc.data());
      setData(dataList);
      setIsPending(false);
    }
  };

  useEffect(() => {
    fetchData(db);
  }, []);

  const recipes = data;

  return (
    <div className='home'>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {recipes && <RecipeList recipes={recipes} />}
    </div>
  );
};
export default Home;
