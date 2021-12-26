import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Header, Image, List, Message, Segment } from "semantic-ui-react";
import { userService } from "../../services/userService";
import { MedicalRecordsList } from "../medicalRecords/MdicalRecordsList";

export const PatientPage = () => {
	const [patient, setPatient] = useState({});
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState(false);
	const params = useParams();

	useEffect(() => {
		Promise.resolve()
			.then(() => setLoading(true))
			.then(() => userService.getUserById(params.id))
			.then((patient) => {
				if (!patient) {
					setError(true);
				} else {
					setPatient(patient);
				}
			})
			.finally(() => setLoading(false));
	}, [params]);

	const getStreet = () => {
		if (!patient.address?.street) {
			return "";
		}

		let streetPath = patient.address?.street;
		streetPath += patient.address?.buildingNumber ? ` буд. ${patient.address?.buildingNumber}` : ``;
		streetPath += patient.address?.flatNumber ? ` кв. ${patient.address?.flatNumber}` : ``;

		return streetPath;
	};

	return (
		<>
			<Segment loading={isLoading}>
				{isError && (
					<Message negative>
						<Message.Header>Сталась помилка при заватажені данних користувача</Message.Header>
						<p>
							Спробуйте перезаватажити сторінку, якщо помилка повториться зверніться до служби підтримки
						</p>
					</Message>
				)}
				{!isError && patient && (
					<Grid>
						<Grid.Column width={4}>
							<Image
								style={{ minHeight: "100%", maxHeight: "30vh", objectFit: "cover" }}
								size="medium"
								src={patient.imageUrl}
							/>
						</Grid.Column>
						<Grid.Column width={12}>
							<Header size="huge">{patient.secondName + " " + patient.firstName}</Header>
							<div style={{ fontSize: "large" }}>
								<div>{patient.email}</div>
								<div style={{ display: "flex", marginTop: "1em" }}>
									<div>
										<span style={{ color: "#6c6b6c" }}>Область: </span>
										{patient.address?.region || ""}
									</div>
									<div style={{ marginLeft: "20%" }}>
										<span style={{ color: "#6c6b6c" }}>Місто:</span> {patient.address?.city || ""}
									</div>
								</div>
								<div style={{ display: "flex", marginTop: "1em" }}>
									<div>
										<span style={{ color: "#6c6b6c" }}>Адреса: </span>
										{getStreet()}
									</div>
								</div>
								<div style={{ display: "flex", marginTop: "1em" }}>
									<div>
										<span style={{ color: "#6c6b6c" }}>Поштовий індекс: </span>
										{patient.address?.zipCode || ""}
									</div>
								</div>
							</div>
						</Grid.Column>
					</Grid>
				)}
			</Segment>
			<MedicalRecordsList patientId={params.id} />
		</>
	);
};
