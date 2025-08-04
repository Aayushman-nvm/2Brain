import Button from "./ui/Button";
import { togglePopup } from "../states/slice";
import { useDispatch } from "react-redux";

function NavBar() {
  const dispatch = useDispatch();

  async function handleShare() {
    try {
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
