interface CardProps{
    title:string,
    link:string,
    type:"Image"|"Video"|"Tweet"|"WebSite"|"Miscellaneous",
}

function Card({title, link, type}:CardProps) {
  return (
    <div>Card
        <p>some buttons and file type {type}</p>
        <p>title {title}</p>
        <p>Embeddings {link}</p>
    </div>
  )
}

export default Card