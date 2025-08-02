import Button from "./components/ui/Button"
function App() {
function handleClick(){
  console.log("Clicked")
}
  return (
    <div className="bg-red-500">Hello
    <Button variant="secondary"
  size="sm"
  text="Post"
  startIcon="+"
  endIcon="-"
  onClick={handleClick}/>
    </div>
  )
}

export default App
