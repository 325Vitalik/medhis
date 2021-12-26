import React from "react";
import { Navigate } from "react-router-dom";
import { userService } from "../../services/userService";

export const AuthRequired = ({ children }) => {
	if (!userService.checkUserLoggedIn()) {
		return <Navigate to="/auth" />;
	}

	return children;
};
