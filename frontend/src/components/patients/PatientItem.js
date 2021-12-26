import React from "react";
import { List, Image } from "semantic-ui-react";

export const PatientItem = ({
	firstName,
	secondName,
	imageUrl = "https://react.semantic-ui.com/images/avatar/small/christian.jpg",
}) => {
	return (
		<List.Item>
			<Image avatar src={imageUrl} />
			<List.Content>
				<List.Header as="a">{secondName + " " + firstName}</List.Header>
			</List.Content>
		</List.Item>
	);
};
