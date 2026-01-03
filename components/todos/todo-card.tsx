import type { TodoCard } from "@/types/todoCard"

interface Props{
    card : TodoCard
}

export default function TodoCard({card: todo} : Props) {
  return (
    <div className="card">
        <p>{todo.title}</p>
        <span className="comment">Comments ({todo.comments.length})</span>
    </div>
  )
}
