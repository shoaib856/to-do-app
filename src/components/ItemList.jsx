import propTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";

export const ItemList = ({
  children,
  done = false,
  setTasks,
  id,

  handleStart,
  handleDragEnter,
  handleDragSort,
}) => {
  const [completed, setCompleted] = useState(done);

  const handleCompletedItem = useCallback(() => {
    setTasks((prevState) =>
      prevState.map((item) => {
        if (item?.id === id) {
          return {
            ...item,
            done: completed,
          };
        }
        return item;
      })
    );
  }, [completed, id, setTasks]);

  useEffect(() => {
    handleCompletedItem();
  }, [handleCompletedItem]);

  const handleDeleteItem = () => {
    setTasks((prevState) => prevState.filter((item) => !(item.id === id)));
  };

  return (
    <li
      draggable
      onDragStart={handleStart}
      onDragEnter={handleDragEnter}
      onDragEnd={handleDragSort}
      className="app__container__list__item"
    >
      <label>
        <div className="app__container__list__item__checkbox">
          <input
            defaultChecked={completed}
            onChange={() => setCompleted(!completed)}
            type="checkbox"
          />
        </div>
        <p className="app__container__list__item__text">{children}</p>
      </label>
      <button
        title="Delete button"
        onClick={handleDeleteItem}
        type="button"
        className="delete-btn"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
          <path
            className="delete-btn__icon"
            fill="#494C6B"
            fillRule="evenodd"
            d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
          />
        </svg>
      </button>
    </li>
  );
};

ItemList.propTypes = {
  children: propTypes.node.isRequired,
  done: propTypes.bool,
  setTasks: propTypes.func.isRequired,
  id: propTypes.number.isRequired,

  handleStart: propTypes.func.isRequired,
  handleDragEnter: propTypes.func.isRequired,
  handleDragSort: propTypes.func.isRequired,
};
