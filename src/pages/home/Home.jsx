// components
import RecipeList from '../../components/RecipeList/RecipeList';

// hooks
import { useFireFetch } from '../../hooks/useFireFetch';

// styles
import './Home.css';

const Home = () => {
  const { data: recipes, isPending, error } = useFireFetch('recipes');
  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipes && <RecipeList recipes={recipes} />}
    </div>
  );
};
export default Home;
