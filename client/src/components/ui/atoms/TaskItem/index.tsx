import {Button} from '@atoms';

import {Task} from '@models';

type TaskItemProps = {
  task: Task;
  onToggle: Function;
  onRemove: Function;
};

export const TaskItem = (props: TaskItemProps) => {
  return (
    <li>
      <span
        style={{textDecoration: props.task.completed ? 'line-through' : 'none'}}
        onClick={() => props.onToggle(props.task._id)}
      >
        {props.task.name}
      </span>
      <Button onClick={() => props.onRemove(props.task._id)}>Remove</Button>
    </li>
  );
};
