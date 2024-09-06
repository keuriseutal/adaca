import {Task} from '@models';
import {createContext} from 'react';

export interface ITaskContext {
  tasks: Task[];
  addTask: (newTask: Task) => void;
  removeTask: (taskId: string) => void;
  toggleTaskCompletion: (taskId: string) => void;
  setTasksState: (newTasks: Task[]) => void;
}

export const TaskContext = createContext<ITaskContext | undefined>(undefined);
