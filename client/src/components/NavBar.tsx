import Button from "./ui/Button";
import { togglePopup, setShare } from "../states/slice";
import { useSelector, useDispatch } from "react-redux";

function NavBar() {
  const dispatch = useDispatch();
  const apiUrl = import.meta.env.VITE_SERVER_URL;
  const userId = useSelector((state: any) => state.app.user._id);
  const isShare=useSelector((state: any) => state.app.share);

  async function handleShare() {
    try {
      dispatch(setShare());
      const response=await fetch(`${apiUrl}/sharelink`,{
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({share:!isShare,id:userId}),
      });
      const data=await response.json();
      console.log(data);
      if(!isShare===true){alert(`Share link: ${apiUrl}${data.link}`)}
      else{alert(`Share link: ${data.message}`)}
      
    } catch (error) {
      console.log(error);
    }
  }

  function handlePopUp() {
    dispatch(togglePopup());
  }
  
  return (
    <div>
      2Brain
      <Button
        variant="primary"
        size="lg"
        text="Create"
        startIcon=""
        onClick={handlePopUp}
      />
      <Button
        variant="primary"
        size="lg"
        text="Share"
        startIcon=""
        onClick={handleShare}
      />
    </div>
  );
}

export default NavBar;
