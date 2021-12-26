import React from "react";
import { Navigate } from "react-router-dom";
import { authService } from "../../services/authService";

export const AuthRequired = ({ children }) => {
	if (!authService.checkUserLoggedIn()) {
		return <Navigate to="/auth" />;
	}

	return children;
};
