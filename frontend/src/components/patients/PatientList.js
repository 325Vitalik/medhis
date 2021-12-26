import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { List, Pagination, Image, Input, Message, Icon, Button, Container, Segment } from "semantic-ui-react";
import { userService } from "../../services/userService";
import { AddPatientModal } from "./AddPatientModal";
import { PatientItem } from "./PatientItem";

const NUMBER_OF_ITEMS_ON_PAGE = 10;

export const PatientList = () => {
	const [activePage, setActivePage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [patients, setPatients] = useState([]);
	const [loading, setLoading] = useState(false);
	const [showAddPatientModal, setShowAddPatientModal] = useState(false);

	useEffect(() => {
		Promise.resolve()
			.then(() => setLoading(true))
			.then(() => userService.getTotalPatients())
			.then((total) => setTotalPages(Math.ceil(total / NUMBER_OF_ITEMS_ON_PAGE) || 1))
			.then(() => userService.getPatients(NUMBER_OF_ITEMS_ON_PAGE, NUMBER_OF_ITEMS_ON_PAGE * (activePage - 1)))
			.then((patients) => setPatients(patients))
			.finally(() => setLoading(false));
	}, [activePage]);

	const pageChangeHandler = (e, { activePage }) => setActivePage(activePage);
	const addPatientHandler = () => setShowAddPatientModal(true)

	return (
		<>
			<AddPatientModal open={showAddPatientModal} closeModal={() => setShowAddPatientModal(false)}/>
			<Segment fluid>
				<Button icon labelPosition="left" content="focus" onClick={addPatientHandler}>
					<Icon name="add" />
					Додати пацієнта
				</Button>
				<Input action="Шукати" placeholder="Шукати..." />
			</Segment>
			{loading && (
				<Message icon>
					<Icon name="circle notched" loading />
					<Message.Content>
						<Message.Header>Завантаження данних</Message.Header>
					</Message.Content>
				</Message>
			)}
			{patients.length === 0 && !loading && (
				<Message warning>
					<Message.Header>Пацієнтів не знайдено</Message.Header>
				</Message>
			)}
			{patients.length > 0 && !loading && (
				<Segment>
					<List relaxed="very" celled size="massive">
						{patients.map((patient) => (
							<PatientItem
								id={patient.id}
								firstName={patient.firstName}
								secondName={patient.secondName}
								imageUrl={patient.imageUrl}
							/>
						))}
					</List>
					<Pagination activePage={activePage} totalPages={totalPages} onPageChange={pageChangeHandler} />
				</Segment>
			)}
		</>
	);
};
