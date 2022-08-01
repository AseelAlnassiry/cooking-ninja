// hooks
import useFetch from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';

// styles
import './Recipe.css';

const Recipe = () => {
  const { id } = useParams();
  const url = 'http://localhost:3000/recipes/' + id;
  const { data: recipe, isPending, error } = useFetch(url);
  let {mode, color} = useTheme();

  if (color === '#58249c') {
    color = 'purple';
  } else if (color === '#249c6b') {
    color = 'green';
  } else {
    color = 'red'
  }

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...`</p>}
      {recipe && (
        <>
          <h2 className={`page-title ${color}`}>{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>
        </>
      )}
    </div>
  );
};
export default Recipe;
