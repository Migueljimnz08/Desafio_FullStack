import { useContext } from "react";
import { UserContext } from "./UserContextContext";

export const useUser = () => useContext(UserContext);
