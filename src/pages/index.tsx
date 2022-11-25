import styles from "../styles/Home.module.css";
import { trpc } from "../utils/trcp";

export default function Home() {
  const allTasks = trpc.todo.all.useQuery(undefined, {
    staleTime: 3000,
  });

  const addTask = trpc.todo.add.useMutation({
    onSuccess() {
      allTasks.refetch();
    }
  });

  const editTask = trpc.todo.edit.useMutation({
    onSuccess() {
      allTasks.refetch();
    }
  });


  return (
    <div className={styles.container}>
      <div style={{ padding: "30px", borderBottom: "1pt solid #000", backgroundColor: '#CCC' }}>
        <span>Add task: </span>
        <input
          placeholder="What needs to be done?"
          autoFocus
          onKeyDown={(e) => {
            const name = e.currentTarget.value.trim();
            if (e.key === "Enter" && name) {
              addTask.mutate({ name });
              e.currentTarget.value = "";
            }
          }}
        />
      </div>
      {allTasks?.data?.map((task) => (
        <div onClick={() => editTask.mutate({ id: task.id })} style={{ cursor: 'pointer', marginBottom: "30px", padding: "0 30px", borderBottom: "1pt solid #000" }}>
          <h3 style={{  textDecoration: `${task.completed ? 'line-through' : 'none'}`}}>{task.name}</h3>
        </div>
      ))}
    </div>
  );
}
