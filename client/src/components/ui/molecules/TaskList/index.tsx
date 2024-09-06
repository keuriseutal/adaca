import {TaskItem} from '@atoms';
import {Task} from '@models';

type TaskLinkProps = {
  tasks: Task[];
  onToggle: Function;
  onRemove: Function;
};

export const TaskList = (props: TaskLinkProps) => {
  return (
    <ul>
      {props.tasks.map((task: Task) => (
        <TaskItem
          key={task._id}
          task={task}
          onToggle={props.onToggle}
          onRemove={props.onRemove}
        />
      ))}
    </ul>
  );
};
