import { useSelector, useDispatch } from "react-redux";
import { closePopup } from "../states/slice";

function PopUp() {
  const dispatch = useDispatch();
  const isOpen: boolean = useSelector((state: any) => state.modal.isOpen);

  async function handleCreate() {
    //will be adding actual function content here
  }

  if (!isOpen) return null;
  return (
    <div>
      PopUp
      <button onClick={() => dispatch(closePopup())}>Close</button>
      <input placeholder="Enter post title" />
      <input placeholder="Enter post link" />
      <button onClick={handleCreate}>Create</button>
    </div>
  );
}

export default PopUp;
