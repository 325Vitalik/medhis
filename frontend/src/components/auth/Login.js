import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Grid, Header, Message, Segment } from "semantic-ui-react";
import { authService } from "../../services/authService";

export const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [formError, setFormError] = useState(false);
	const navigate = useNavigate();

	const changeEmailHandler = (e, { value }) => setEmail(value);
	const changePasswordHandler = (e, { value }) => setPassword(value);
	const submitLoginForm = async () => {
		const success = await authService.loginUser(email, password);

		if (!success) {
			return setFormError(true);
		}

		navigate('/')
	};

	return (
		<Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
			<Grid.Column style={{ maxWidth: 450 }}>
				<Header as="h2" color="teal" textAlign="center">
					Увійдіть у ваш акаунт
				</Header>
				<Form size="large" onSubmit={submitLoginForm} error={formError}>
					<Segment stacked>
						<Form.Input
							fluid
							name="email"
							icon="user"
							iconPosition="left"
							placeholder="E-mail"
							value={email}
							onChange={changeEmailHandler}
						/>
						<Form.Input
							fluid
							name="password"
							icon="lock"
							iconPosition="left"
							placeholder="Password"
							type="password"
							value={password}
							onChange={changePasswordHandler}
						/>
						<Message error header="Email або пароль неправильні" />
						<Button color="teal" fluid size="large" type="submit">
							Увійти
						</Button>
					</Segment>
				</Form>
			</Grid.Column>
		</Grid>
	);
};
