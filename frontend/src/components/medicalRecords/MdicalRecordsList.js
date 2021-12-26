import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Header, Icon, Image, List, Message, Pagination, Segment } from "semantic-ui-react";
import { medicalRecordService } from "../../services/medicalRecordService";
import { userService } from "../../services/userService";
import { MedicalRecordListItem } from "./MedicalRecordListItem";

const NUMBER_OF_ITEMS_ON_PAGE = 10;

export const MedicalRecordsList = ({ patientId }) => {
	const [activePage, setActivePage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState(false);
	const [medicalRecords, setMedicalRecords] = useState([]);

	useEffect(() => {
		Promise.resolve()
			.then(() => setLoading(true))
			.then(() => medicalRecordService.getTotalMedicalRecordsByPatient(patientId))
			.then((total) => setTotalPages(Math.ceil(total / NUMBER_OF_ITEMS_ON_PAGE) || 1))
			.then(() =>
				medicalRecordService.getMedicalRecordsByPatient(
					patientId,
					NUMBER_OF_ITEMS_ON_PAGE,
					NUMBER_OF_ITEMS_ON_PAGE * (activePage - 1)
				)
			)
			.then((medicalRecords) => {
				if (!medicalRecords) {
					setError(true);
				} else {
					setMedicalRecords(medicalRecords);
				}
			})
			.finally(() => setLoading(false));
	}, [patientId]);

	const pageChangeHandler = (e, { activePage }) => setActivePage(activePage);

	return (
		<Segment loading={isLoading}>
			<Header size="large">Медична історія</Header>
			{isLoading && (
				<Message icon>
					<Message.Content>
						<Message.Header>Завантаження данних</Message.Header>
					</Message.Content>
				</Message>
			)}
			{medicalRecords.length === 0 && !isLoading && (
				<Message warning>
					<Message.Header>Медичних записів не знайдено</Message.Header>
				</Message>
			)}
			{medicalRecords.length > 0 && !isLoading && (
				<List relaxed="very" celled size="huge">
					{medicalRecords.map((medicalRecord) => (
						<MedicalRecordListItem
							title={medicalRecord.title}
							body={medicalRecord.body}
							diagnoses={medicalRecord.diagnoses}
							id={medicalRecord.id}
							date={medicalRecord.date}
						/>
					))}
				</List>
			)}
			<Pagination activePage={activePage} totalPages={totalPages} onPageChange={pageChangeHandler} />
		</Segment>
	);
};
