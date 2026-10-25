import KanbanColumn from "./KanbanColumn";

const columns = ["todo", "inProgress", "completed"];

export default function KanbanBoard({ tasks,  onStatusChange }) {

  return (
    <section className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 xl:grid-cols-3">
      {columns.map((status) => (
        <KanbanColumn
          key={status}
          status={status}
          tasks={tasks.filter((task) => task.status === status)}
          onStatusChange={onStatusChange}
        />
      ))}
    </section>
  );
}