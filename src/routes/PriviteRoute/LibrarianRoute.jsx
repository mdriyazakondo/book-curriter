import { Navigate } from "react-router";
import Loading from "../../shared/Loading/Loading";
import useRole from "../../hooks/useRole";

const LibrarianRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) return <Loading />;
  if (role === "Librarian") return children;
  return <Navigate to="/" replace="true" />;
};

export default LibrarianRoute;
