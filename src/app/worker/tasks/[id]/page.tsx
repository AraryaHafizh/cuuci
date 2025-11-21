interface TaskDetailProps {
  params: Promise<{ id: string }>;
}

async function TaskDetail(props: TaskDetailProps) {
  const { id } = await props.params;

  return (
    <main className="mt-50">
      <p>task detail {id}</p>
    </main>
  );
}

export default TaskDetail;
