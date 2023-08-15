import { Navigate, useLocation } from "react-router-dom";
import { parseToken } from "./state/atoms/adminatom";


interface LayoutProps  { 
  children: React.ReactNode
}

const SecureRoute = (props: LayoutProps) => {
  const token = parseToken();
  console.log(token)
  const location = useLocation();
  if (token === 'undefined' || token === 'null' || !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{props.children}</>;
};

export default SecureRoute;
