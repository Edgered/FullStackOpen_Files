const Note = ({ content, triggerDeletion }) => {
  return (
    <li>{content.name} {content.number} <button onClick={triggerDeletion}>Delete</button></li>
  )
}

export default Note