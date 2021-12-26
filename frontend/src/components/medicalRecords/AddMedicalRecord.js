import React, { useRef, useState } from "react";
import { Button, Form, Image, Message, Modal, Segment, TextArea } from "semantic-ui-react";
import { medicalRecordService } from "../../services/medicalRecordService";
import { userService } from "../../services/userService";

export const AddMedicalRecord = ({ open, closeModal, patientId }) => {
	const [medicalRecord, setMedicalRecord] = useState({
		diagnoses: "",
		analyzes: [],
		medicines: "",
		title: "",
		body: "",
	});
	const [errorResponse, setErrorResponse] = useState(false);
	const [isSending, setSending] = useState(false);

	const handleChange = (e, { name, value }) => {
		setMedicalRecord({ ...medicalRecord, [name]: value });
		setErrorResponse(false);
	};
	const handleAddMedicalRecord = async () => {
		setSending(true);
		const sucess = await medicalRecordService.addMedicalRecord(medicalRecord, patientId);
		setSending(false);
		if (!sucess) {
			setErrorResponse(true);
		} else {
			closeModal();
		}
	};

	return (
		<Modal open={open}>
			<Modal.Header>Додати пацієнта</Modal.Header>
			<Modal.Content image>
				<Form fluid style={{ width: "100%" }} error={errorResponse}>
					<Form.Group widths="equal">
						<Form.Input
							fluid
							label="Заголовок"
							placeholder=""
							name="title"
							value={medicalRecord.title}
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group widths="equal">
						<Form.Input label="Детальний опис" fluid>
							<TextArea
								fluid
								name="body"
								value={medicalRecord.body}
								onChange={handleChange}
								style={{ minHeight: 100 }}
							/>
						</Form.Input>
					</Form.Group>
					<Form.Group widths="equal">
						<Form.Input
							fluid
							label="Діагнози (через кому)"
							placeholder="діагноз1, діагноз2, діагноз3"
							name="diagnoses"
							value={medicalRecord.diagnoses}
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group widths="equal">
						<Form.Input
							fluid
							label="Виписані медичні препарати (через кому)"
							placeholder="перепарат1, перепарат2, перепарат3"
							name="medicines"
							value={medicalRecord.medicines}
							onChange={handleChange}
						/>
					</Form.Group>
					<Message error>Не вдалось зберегти запис, перевірте будь ласка введені данні.</Message>
				</Form>
			</Modal.Content>
			<Modal.Actions>
				<Button color="black" onClick={() => closeModal()}>
					Закрити
				</Button>
				<Button loading={isSending} content="Додати запис" onClick={handleAddMedicalRecord} positive />
			</Modal.Actions>
		</Modal>
	);
};
