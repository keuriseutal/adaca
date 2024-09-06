import {Button, Input} from '@atoms';

type TaskInputProps = {
  taskName: string;
  setTaskName: Function;
  addTask: Function;
};

export const TaskInput = (props: TaskInputProps) => {
  return (
    <div>
      <Input
        placeholder="Enter task name"
        value={props.taskName}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          props.setTaskName(event.target.value)
        }
      />
      <Button onClick={props.addTask}>Add Task</Button>
    </div>
  );
};
