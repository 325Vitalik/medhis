import React from "react";
import { useNavigate } from "react-router-dom";
import { List, Image } from "semantic-ui-react";

export const PatientItem = ({
	id,
	firstName,
	secondName,
	imageUrl = "https://react.semantic-ui.com/images/avatar/small/christian.jpg",
}) => {
	const navigate = useNavigate();

	return (
		<List.Item onClick={() => navigate(`/patient/${id}`)}>
				<Image avatar src={imageUrl} />
				<List.Content>
					<List.Header as="a">{secondName + " " + firstName}</List.Header>
				</List.Content>
		</List.Item>
	);
};
