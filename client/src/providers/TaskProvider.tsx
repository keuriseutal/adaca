import {useState, ReactNode} from 'react';

import {TaskContext} from "@contexts";
import {Task} from '@models';

type TaskProviderProps = {
  children: ReactNode;
};

export const TaskProvider = (props: TaskProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  const removeTask = (taskId: string) => {
    setTasks(tasks.filter(task => task._id !== taskId));
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(
      tasks.map(task =>
        task._id === taskId ? {...task, completed: !task.completed} : task
      )
    );
  };

  const setTasksState = (newTasks: Task[]) => {
    setTasks(newTasks);
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, removeTask, toggleTaskCompletion, setTasksState }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};
