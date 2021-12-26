import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Header, Menu } from "semantic-ui-react";
import { userService } from "../../services/userService";

export const NavigationBar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const currentRoute = location.pathname.split("/")[1];

	const handleItemClick = (e, { name }) => navigate(name);

	const logOut = () => {
		userService.logOutUser();
		navigate("/auth");
	};

	return (
		<Menu fluid vertical style={{ borderRadius: 0 }}>
			<Menu.Item header>
				<Header size="huge">
					<Link to="/">MedHis</Link>
				</Header>
			</Menu.Item>
			<Menu.Item name="user" active={currentRoute === "user"} onClick={handleItemClick} />
			<Menu.Item name="pics" active={currentRoute === "pics"} onClick={handleItemClick} />
			<Menu.Item name="companies" active={currentRoute === "companies"} onClick={handleItemClick} />
			<Menu.Item name="links" active={currentRoute === "links"} onClick={handleItemClick} />
			<Menu.Item onClick={logOut}>Log out</Menu.Item>
		</Menu>
	);
};
