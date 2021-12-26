import React, { useRef, useState } from "react";
import { Button, Form, Image, Message, Modal, Segment } from "semantic-ui-react";
import { userService } from "../../services/userService";

export const AddPatientModal = ({ open, closeModal }) => {
	const [patient, setPatient] = useState({
		firstName: "",
		secondName: "",
		phone: "",
		email: "",
		additionalContactInfo: [],
		region: "",
		city: "",
		street: "",
		buildingNumber: "",
		flatNumber: "",
		zipCode: "",
		password: "",
	});
	const [errorResponse, setErrorResponse] = useState(false);
	const [isSending, setSending] = useState(false);
	const [file, setFile] = useState(null);
	const fileInputRef = useRef();

	const handleChange = (e, { name, value }) => {
		setPatient({ ...patient, [name]: value });
		setErrorResponse(false);
	};
	const handleAddPatient = async () => {
		setSending(true);
		const sucess = await userService.addPatient(patient, file);
		console.log(sucess);
		setSending(false);

		if (!sucess) {
			setErrorResponse(true);
		} else {
			closeModal();
		}
	};

	const handleFileChange = (e) => setFile(e.target.files[0]);

	return (
		<Modal open={open}>
			<Modal.Header>Додати пацієнта</Modal.Header>
			<Modal.Content image>
				<Form fluid style={{ width: "100%" }} error={errorResponse}>
					<Form.Group widths="equal">
						<Form.Input
							fluid
							label="Ім'я"
							placeholder="Ім'я"
							name="firstName"
							value={patient.firstName}
							onChange={handleChange}
						/>
						<Form.Input
							fluid
							label="Прізвище"
							placeholder="Прізвище"
							name="secondName"
							value={patient.secondName}
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group widths="equal">
						<Form.Input
							fluid
							label="Номер телефону"
							placeholder="Номер телефону"
							name="phone"
							value={patient.phone}
							onChange={handleChange}
						/>
						<Form.Input
							fluid
							label="E-mail"
							placeholder="E-mail"
							name="email"
							autocomplete="off"
							value={patient.email}
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group widths="equal">
						<Form.Input
							fluid
							label="Область"
							placeholder="Львівська"
							name="region"
							value={patient.region}
							onChange={handleChange}
						/>
						<Form.Input
							fluid
							label="Місто/село"
							placeholder="Львів"
							name="city"
							value={patient.city}
							onChange={handleChange}
						/>
						<Form.Input
							fluid
							label="Поштовий індекс"
							placeholder="35548"
							name="zip"
							value={patient.zip}
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group widths="equal">
						<Form.Input
							fluid
							label="Вулиця"
							placeholder="Шевченка"
							name="street"
							value={patient.street}
							onChange={handleChange}
						/>
						<Form.Input
							fluid
							label="Будинок"
							placeholder="3"
							name="buildingNumber"
							value={patient.buildingNumber}
							onChange={handleChange}
						/>
						<Form.Input
							fluid
							label="Квартира"
							placeholder="5"
							name="flatNumber"
							value={patient.flatNumber}
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group widths="equal">
						<Form.Input fluid label="Зображення">
							<Button
								label={(file?.name || "").slice(-15)}
								content="Choose File"
								labelPosition="right"
								icon="file"
								onClick={() => fileInputRef.current.click()}
							/>
							<input ref={fileInputRef} type="file" hidden onChange={handleFileChange} />
						</Form.Input>
						{/* <Form.Input
							fluid
							label="Пароль"
							type="password"
							name="password"
							autocomplete="off"
							value={patient.password}
							onChange={handleChange}
						/> */}
					</Form.Group>
					<Message error>Не вдалось зберегти пацієнта, перевірте будь ласка введені данні.</Message>
				</Form>
			</Modal.Content>
			<Modal.Actions>
				<Button color="black" onClick={() => closeModal()}>
					Закрити
				</Button>
				<Button loading={isSending} content="Додати пацієнта" onClick={handleAddPatient} positive />
			</Modal.Actions>
		</Modal>
	);
};
