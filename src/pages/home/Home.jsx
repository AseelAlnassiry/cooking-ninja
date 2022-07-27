// components
import RecipeList from '../../components/RecipeList/RecipeList';

// hooks
import useFetch from '../../hooks/useFetch';

// styles
import './Home.css';

const Home = () => {
  const url = 'http://localhost:3000/recipes';
  const { data: recipes, isPending, error } = useFetch(url);
  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipes && <RecipeList recipes={recipes} />}
    </div>
  );
};
export default Home;
