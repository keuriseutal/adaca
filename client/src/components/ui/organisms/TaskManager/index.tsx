import {useState, useEffect, useContext} from 'react';
import {ITaskContext, TaskContext} from '@contexts';
import {Task} from '@models';

import {TaskInput, TaskList} from '@molecules';

export const TaskManager = () => {
  const taskContext: ITaskContext | undefined = useContext(TaskContext);
  const [taskName, setTaskName] = useState<string>('');

  useEffect(() => {
    fetch('/api/tasks')
      .then(response => response.json())
      .then(data => taskContext?.setTasksState(data))
      .catch(error => console.error('Error fetching tasks: ', error));
  }, []);

  const onAddTask = () => {
    fetch('api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': sessionStorage.getItem('token') ?? '',
      },
      body: JSON.stringify({name: '', completed: false}),
    })
      .then(response => response.json())
      .then(newTask => taskContext?.addTask(newTask))
      .catch(error => console.error('Error adding task: ', error));

    setTaskName('');
  };

  const onRemoveTask = (taskId: string) => {
    fetch(`api/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': sessionStorage.getItem('token') ?? '',
      },
    })
      .then(() => taskContext?.removeTask(taskId))
      .catch(error => console.error('Error removing task: ', error));
  };

  const onToggleTaskCompletion = (taskId: string) => {
    const task = taskContext?.tasks.find((task: Task) => task._id === taskId);
    fetch(`api/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': sessionStorage.getItem('token') ?? '',
      },
      body: JSON.stringify({completed: !task?.completed}),
    })
      .then(response => response.json())
      .then(() => taskContext?.toggleTaskCompletion(taskId))
      .catch(error => console.error('Error toggling task completion: ', error));
  };

  return (
    <div>
      <TaskInput
        taskName={taskName}
        setTaskName={setTaskName}
        addTask={onAddTask}
      />
      <TaskList
        tasks={taskContext?.tasks ?? []}
        onToggle={onToggleTaskCompletion}
        onRemove={onRemoveTask}
      />
    </div>
  );
};
