import type { TodoCard } from "@/types/todoCard"

interface Props{
    card : TodoCard
}

export default function TodoCardItem({card: todo} : Props) {
  return (
    <div className="card">
        <p>{todo.title}</p>
        <span className="comment">Comments ({0})</span>
    </div>
  )
}
