
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useRecoilValue } from "recoil";
import { courseState, userState } from "../state/atoms/adminatom";

const Loader = () => {

    const {isUserLoading} = useRecoilValue(userState)
    const {isCourseLoading} = useRecoilValue(courseState)
    const handleClose = ()=>{
        
    }
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isCourseLoading || isUserLoading}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Loader;
