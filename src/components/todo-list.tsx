import React from "react";
import { useState, useEffect } from "react";
import TodoStyles from "./todo-list.module.css";
import {
  Input,
  Button,
  DeleteIcon, // @ts-ignore
} from "@ya.praktikum/react-developer-burger-ui-components";

export interface TodoItem {
  text: string;
  completed: boolean;
}
function TodoList(): React.JSX.Element {
  const [disabled, setDisabled] = useState(true);

  //будем использовать useState в этом приложении для отслеживания каждого нового элемента Todo и списка Todo
  const [todo, setTodo] = useState("");

  //Нам нужно создать новый хук useState для отслеживания состояния массива Todos и добавить в него новые элементы
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const [filteredTasks, setFilteredTasks] = useState(todos); //хранит результат отфильтрованногог списка задач
  const [filter, setFilter] = useState("all"); //текущий фильтр для отображения задач

  // Функция для добавления новой задачи в список
  //состояние не должно изменяться напрямую, воспользуемся оператором массивов spread
  const addTodo = () => {
    if (todo.trim() !== "") {
      //убеждаемся, что значение не пустое
      setTodos([...todos, { text: todo, completed: false }]);
      setTodo(""); //очищаем поле ввода
    }
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addTodo();
    }
  };

  useEffect(() => {
    //useEffect отслеживает изменения фильтра и пересчитывает отфильтрованный список задач в зависимости от выбранного фильтра
    // Здесь можно добавить логику для фильтрации задач в соответствии с выбранным фильтром
    const filteredTasks = todos.filter((task) => {
      if (filter === "all") {
        return true;
      } else if (filter === "completed") {
        return task.completed;
      } else {
        return !task.completed;
      }
    });

    // Обновляем список задач
    setFilteredTasks(filteredTasks);
  }, [filter, todos]);
  // Функция для отметки задачи как выполненной
  const toggleTodo = (index: number) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const cancelChanges = () => {
    setTodo("");
  };
  useEffect(() => {
    if (todo === "" || !todo) {
    }
  }, [todo]);

  const deleteTodo = (text: TodoItem) => {
    //создадим новый массив Todos, содержащий все элементы, кроме удаляемого. В конце нужно будет обновить состояние с помощью вновь созданных Todos.
    const newTodos = todos.filter((todo) => {
      return todo !== text;
    });
    setTodos(newTodos);
  };

  const itemsLeft = todos.filter((item) => {
    return item.completed === false;
  }).length;

  const deleteCompleted = () => {
    const newTodo = todos.filter((todo) => {
      return todo.completed === false;
    });
    setTodos(newTodo);
  };

  return (
    <section className={TodoStyles.section}>
      <h1
        className={`${TodoStyles.title} text text_type_main-large mt-10 mb-5`}
      >
        TODOS
      </h1>

      <Input
        aria-hidden="true"
        id="input"
        role="textbox"
        type={"text"}
        placeholder="What needs to be done?"
        value={todo}
        name={"todo"}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setTodo(e.target.value);
        }}
        icon="EditIcon"
        disabled={disabled}
        onIconClick={() => setDisabled(false)}
        error={false}
        errorText={"Ошибка"}
        onKeyDown={handleKeyPress}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      />

      <div className={TodoStyles.btn_div} data-testid="visible">
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          onClick={cancelChanges}
        >
          Отменить
        </Button>

        <Button
          htmlType="submit"
          type="primary"
          onClick={addTodo}
          size="medium"
        >
          Добавить
        </Button>
      </div>

      {todos?.length > 0 ? ( //Прежде чем отображать список, нужно убедиться в том, что он не пуст
        <ul className={`${TodoStyles.list} text text_type_main-default`}>
          {filteredTasks.map((todo, index) => (
            <div className={TodoStyles.div}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(index)}
              />
              <li key={index.toString()}>
                <span
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.text}
                </span>
              </li>

              <DeleteIcon
                onClick={() => {
                  deleteTodo(todo);
                }}
                type="primary"
              />
            </div>
          ))}
        </ul>
      ) : (
        <div>
          <p className={`${TodoStyles.text} text text_type_main-default mt-8`}>
            задание не найдено
          </p>
        </div>
      )}

      <div className={TodoStyles.div_btn}>
        {/* При нажатии на кнопки фильтров вызывается функция setFilter, чтобы изменить текущий фильтр */}
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          onClick={() => setFilter("all")}
        >
          Все
        </Button>
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          onClick={() => setFilter("completed")}
        >
          Завершенные
        </Button>
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          onClick={() => setFilter("uncompleted")}
        >
          Незавершенные
        </Button>
        <span className="text text_type_main-default text_color_inactive">{`${itemsLeft} items left`}</span>
        <Button
          htmlType="button"
          type="secondary"
          size="medium"
          onClick={() => deleteCompleted()}
        >
          Clear completed
        </Button>
      </div>
    </section>
  );
}
export default TodoList;
