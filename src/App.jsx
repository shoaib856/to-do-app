import lightBackground from "./assets/images/bg-desktop-light.jpg";
import darkBackground from "./assets/images/bg-desktop-dark.jpg";

import lightBackgroundMobile from "./assets/images/bg-mobile-light.jpg";
import darkBackgroundMobile from "./assets/images/bg-mobile-dark.jpg";

import iconSun from "./assets/images/icon-sun.svg";
import iconMoon from "./assets/images/icon-moon.svg";

import { useEffect, useRef, useState } from "react";
import { ItemList } from "./components/ItemList";

const list = [
  {
    id: 1,
    text: "Complete online JavaScript course",
    done: false,
  },
  {
    id: 2,
    text: "Jog around the park 3x",
    done: false,
  },
  {
    id: 3,
    text: "10 minutes meditation",
    done: false,
  },
  {
    id: 4,
    text: "Read for 1 hour",
    done: false,
  },
  {
    id: 5,
    text: "Pick up groceries",
    done: false,
  },
];
function App() {
  const [completed, setCompleted] = useState(false);
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState(list);
  const [filterTasks, setFilterTasks] = useState(null);
  const [active, setActive] = useState("all");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    switch (active) {
      case "all":
        setFilterTasks(null);
        break;
      case "active":
        setFilterTasks(tasks.filter((item) => !item.done));
        break;
      case "completed":
        setFilterTasks(tasks.filter((item) => item.done));
        break;
      default:
        setFilterTasks(null);
        break;
    }
  }, [tasks, active]);

  const handleAddTask = (e) => {
    if (taskText === "") return;
    if (e.key === "Enter" || e.type === "click") {
      setTasks([
        ...tasks,
        { id: tasks.length + 1, text: taskText, done: completed },
      ]);
      setTaskText("");
    }
  };
  const ClearCompleted = () => {
    setTasks(tasks.filter((item) => !item.done));
  };

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  let dragItem = useRef();
  let dragOverItem = useRef();

  const handleStart = (i) => {
    dragItem.current = i;
  };

  const handleDragEnter = (e, i) => {
    e.preventDefault();
    dragOverItem.current = i;
  };

  const handleSort = () => {
    const _tasks = [...tasks];
    const draggedItemContent = _tasks.splice(dragItem.current, 1)[0];

    _tasks.splice(dragOverItem.current, 0, draggedItemContent);

    setTasks(_tasks);

    if (filterTasks) {
      const _filterTasks = [...filterTasks];
      const draggedItemContent = _filterTasks.splice(dragItem.current, 1)[0];
      _filterTasks.splice(dragOverItem.current, 0, draggedItemContent);
      setFilterTasks(_filterTasks);
    }

    dragItem.current = null;
    dragOverItem.current = null;
  };

  return (
    <div className="app">
      <img
        src={darkMode ? darkBackground : lightBackground}
        alt="BackgroundImage"
        className="background-image-desktop"
      />
      <img
        src={darkMode ? darkBackgroundMobile : lightBackgroundMobile}
        alt="BackgroundImage"
        className="background-image-mobile"
      />

      <div className="app__container">
        <nav className="app__header">
          <h1>TO DO</h1>
          <button onClick={handleDarkMode}>
            <img src={darkMode ? iconSun : iconMoon} alt="dark mode" />
          </button>
        </nav>
        <div className="app__container__input__enter">
          <label className="app__container__input">
            <div className="app__container__input__checkbox">
              <input
                onChange={() => setCompleted(!completed)}
                type="checkbox"
              />
            </div>
            <input
              onKeyDown={handleAddTask}
              type="text"
              placeholder="Create a new todo..."
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
            />
          </label>
          <button onClick={handleAddTask} className="enter-btn">
            <svg
              fill="#000000"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="primary"
                d="M19,3V17a1,1,0,0,1-1,1H5"
                style={{
                  fill: "none",
                  stroke: "rgb(0, 0, 0)",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                }}
              ></path>
              <polyline
                id="primary-2"
                data-name="primary"
                points="8 15 5 18 8 21"
                style={{
                  fill: "none",
                  stroke: "rgb(0, 0, 0)",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                }}
              ></polyline>
            </svg>
          </button>
        </div>
        <div className="app__container__list">
          <ul className="list">
            {(filterTasks ? filterTasks : tasks).map((item, i) => (
              <ItemList
                setTasks={setTasks}
                tasks={tasks}
                key={item?.id}
                id={item?.id}
                done={item?.done}
                handleStart={() => handleStart(i)}
                handleDragEnter={(e) => handleDragEnter(e, i)}
                handleDragSort={handleSort}
              >
                {item?.text}
              </ItemList>
            ))}
            {(filterTasks ? filterTasks : tasks).length === 0 && (
              <li className="empty-list">
                <p>No Tasks</p>
              </li>
            )}
          </ul>
          <div className="app__container__footer">
            <div>
              <p>{(filterTasks ? filterTasks : tasks).length} items left</p>
            </div>
            <div className="tags">
              <button
                onClick={() => {
                  setActive("all");
                }}
                type="button"
                className={`${active === "all" ? "active" : null}`}
              >
                All
              </button>
              <button
                onClick={() => {
                  setActive("active");
                }}
                type="button"
                className={`${active === "active" ? "active" : null}`}
              >
                Active
              </button>
              <button
                onClick={() => {
                  setActive("completed");
                }}
                type="button"
                className={`${active === "completed" ? "active" : null}`}
              >
                Completed
              </button>
            </div>
            <div>
              <button onClick={ClearCompleted} type="button">
                Clear Completed
              </button>
            </div>
          </div>
        </div>
      </div>
      <p className="hint">Drag and Drop to reorder list</p>
    </div>
  );
}

export default App;
