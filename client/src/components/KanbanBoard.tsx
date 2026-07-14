import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";

type Task = {
  _id: string;
  title: string;
  status: string;
};

type Props = {
  tasks: Task[];
  onStatusChange: (id: string, status: string) => void;
};

function KanbanBoard({ tasks, onStatusChange }: Props) {
  const columns = {
    todo: tasks.filter((t) => t.status === "todo"),
    "in-progress": tasks.filter((t) => t.status === "in-progress"),
    done: tasks.filter((t) => t.status === "done"),
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const source = result.source.droppableId;
    const destination = result.destination.droppableId;

    if (source === destination) return;

    onStatusChange(result.draggableId, destination);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid md:grid-cols-3 gap-6">
        {Object.entries(columns).map(([status, tasks]) => (
          <Droppable key={status} droppableId={status}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 min-h-[500px] shadow transition-colors duration-300"
              >
                <h2 className="text-xl font-bold capitalize mb-4 text-gray-900 dark:text-white">
                  {status.replace("-", " ")}
                </h2>

                {tasks.map((task, index) => (
                  <Draggable
                    key={task._id}
                    draggableId={task._id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg shadow-md p-4 mb-3 cursor-grab active:cursor-grabbing transition-colors duration-300 hover:shadow-lg"
                      >
                        {task.title}
                      </div>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}

export default KanbanBoard;
