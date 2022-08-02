// react router
import { Link } from 'react-router-dom';

// hooks
import { useTheme } from '../../hooks/useTheme';

// images
import Trashcan from '../../assets/delete.svg';

// database & firebase
import db from '../../firebase/config';
import { doc, deleteDoc } from 'firebase/firestore';

// styles
import './RecipeList.css';

const RecipeList = ({ recipes }) => {
  let { color, mode } = useTheme();

  if (color === '#58249c') {
    color = 'purple';
  } else if (color === '#249c6b') {
    color = 'green';
  } else {
    color = 'red';
  }

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'recipes', id));
  };

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
          <img
            src={Trashcan}
            alt="delete button"
            onClick={() => handleDelete(recipe.id)}
          />
        </div>
      ))}
    </div>
  );
};
export default RecipeList;
