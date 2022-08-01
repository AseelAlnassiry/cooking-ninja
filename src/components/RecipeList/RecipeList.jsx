// React Router
import { Link } from 'react-router-dom';

// hooks
import { useTheme } from '../../hooks/useTheme';

// styles
import './RecipeList.css';

const RecipeList = ({ recipes }) => {
  let { color, mode } = useTheme();

  if (color === '#58249c') {
    color = 'purple';
  } else if (color === '#249c6b') {
    color = 'green';
  } else {
    color = 'red'
  }

  if (recipes.length === 0) {
    return <div className="error">No recipes to load...</div>;
  }

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div className={`card ${mode}`} key={recipe.title}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make.</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`recipes/${recipe.id}`} className={color}>
            Cook This
          </Link>
        </div>
      ))}
    </div>
  );
};
export default RecipeList;
