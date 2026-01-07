import ClientPage from "./ClientPage";

interface TaskReviewProps {
  params: Promise<{ id: string }>;
}

async function TaskReview(props: TaskReviewProps) {
  const { id } = await props.params;

  return <ClientPage id={id} />;
}
export default TaskReview;
