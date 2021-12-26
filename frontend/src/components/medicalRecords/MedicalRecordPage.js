import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Divider, Grid, Header, Image, Label, List, Message, Segment } from "semantic-ui-react";
import { medicalRecordService } from "../../services/medicalRecordService";
import { userService } from "../../services/userService";
import { MedicalRecordsList } from "../medicalRecords/MdicalRecordsList";

export const MedicalRecordPage = () => {
	const [medicalRecord, setMedicalRecord] = useState({});
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState(false);
	const params = useParams();

	useEffect(() => {
		Promise.resolve()
			.then(() => setLoading(true))
			.then(() => medicalRecordService.getMedicalRecordById(params.id))
			.then((medicalRecord) => {
				if (!medicalRecord) {
					setError(true);
				} else {
					setMedicalRecord(medicalRecord);
				}
			})
			.finally(() => setLoading(false));
	}, [params]);

	return (
		<span>
			<Segment loading={isLoading}>
				{isError && (
					<Message negative>
						<Message.Header>Сталась помилка при заватажені данних медичного запису</Message.Header>
						<p>
							Спробуйте перезаватажити сторінку, якщо помилка повториться зверніться до служби підтримки
						</p>
					</Message>
				)}
				{!isError && medicalRecord && (
					<div style={{ fontSize: "large" }}>
						<Header size="huge">{medicalRecord.title}</Header>
						<span style={{ color: "#6c6b6c" }}>Діагнози: </span>
						{medicalRecord.diagnoses?.map((item) => (
							<Label as="p" content={item} />
						))}
						<Divider />
						<div>
							<span style={{ color: "#6c6b6c" }}>Нотатки: </span>
							{medicalRecord.body}
						</div>
						<Divider />
						<div>
							<div style={{ color: "#6c6b6c" }}>Аналізи: </div>
							{medicalRecord.analyzes?.map((item) => (
								<div>
									<span>{item.name}</span>
									<span>: </span>
									<span>{item.results}</span>
									<span>, </span>
									<span style={{ color: "#6c6b6c" }}>{item.additionalInfo}</span>
								</div>
							))}
						</div>
						<Divider />
						<div>
							<div style={{ color: "#6c6b6c" }}>Виписані препарати: </div>
							{medicalRecord.medicines?.map((item) => (
								<div>{item}</div>
							))}
						</div>
						<Divider />
						<div>
							<div style={{ color: "#6c6b6c" }}>Дата прийому: {new Date(medicalRecord.date).toLocaleString()}</div>
						</div>
					</div>
				)}
			</Segment>
		</span>
	);
};
