interface Props{
  title : string
}

export default function BoardHeader({title} : Props) {
  return (
      <header className="board-header">
        <h1>{title}</h1>
      </header>
  )
}
