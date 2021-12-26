import React from "react";
import { useNavigate } from "react-router-dom";
import { Label, List } from "semantic-ui-react";

export const MedicalRecordListItem = ({
	title = "Complex general title",
	body = "123san'io  hif hario fhperahgpa;righpliearhsgl.ehsr aperugp aelr hagio erpghuar gfplaruglusdj gflrusdj dfoershgpla rsugluersgokz",
	diagnoses = ["fdsaf", "sdfsad favdf", "avsffdvd"],
	id = 'a',
	date = "12.09.2020",
}) => {
	const navigate = useNavigate();

	const openMedicalRecord = () => navigate(`/medical-record/${id}`);

	return (
		<List.Item style={{ cursor: "pointer" }} onClick={openMedicalRecord}>
			<List.Content>
				<List.Header as="a" style={{ marginBottom: "7px" }}>
					{title}
				</List.Header>
				<List.Description>
					{diagnoses.map((item) => (
						<Label as="p" content={item} />
					))}
					<div style={{ marginTop: "7px", marginBottom: "7px" }}>{body.slice(0, 144) + "..."}</div>
					<div style={{ fontSize: "small" }}>{date}</div>
				</List.Description>
			</List.Content>
		</List.Item>
	);
};
