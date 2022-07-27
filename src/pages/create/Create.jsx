// hooks
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

// styles
import './Create.css';

const Create = () => {
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [newIngredient, setNewIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);
  const { postData, data, error } = useFetch(
    'http://localhost:3000/recipes',
    'POST'
  );
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    postData({
      title,
      ingredients,
      method,
      cookingTime: cookingTime + ' minutes',
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();

    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevIngredients) => [...prevIngredients, ing]);
    }

    setNewIngredient('');
    ingredientInput.current.focus();
  };

  useEffect(() => {
    if (data) {
      navigate('/');
    }
  }, [data, navigate]);

  return (
    <div className="create">
      <h2 className="page-title">Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">
          <span>Recipe Title</span>
        </label>
        <input
          name="title"
          id="title"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />

        <label htmlFor="ing-input">
          <span>Recipe Ingredients: </span>
        </label>
        <div className="ingredients">
          <input
            type="text"
            name="ing-input"
            id="ing-input"
            onChange={(e) => setNewIngredient(e.target.value)}
            value={newIngredient}
            ref={ingredientInput}
          />
          <button className="btn" onClick={handleAdd}>
            add
          </button>
        </div>
        <p>
          Current Ingredients:{' '}
          {ingredients.map((ingredient) => (
            <em key={ingredient}>{ingredient}, </em>
          ))}
        </p>

        <label htmlFor="method">
          <span>Recipe Method:</span>
        </label>
        <textarea
          name="method"
          id="method"
          onChange={(e) => setMethod(e.target.value)}
          value={method}
          required
        />

        <label htmlFor="cooking-time">
          <span>Cooking Time (minutes):</span>
          <input
            type="number"
            name="cooking-time"
            id="cooking-time"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
          />
        </label>

        <button className="btn">submit</button>
      </form>
    </div>
  );
};
export default Create;
