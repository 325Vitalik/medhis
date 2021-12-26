import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { Main } from "./components/Main";
import { AuthRequired } from "./components/auth/AuthRequired";

function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="auth" element={<Login />} />
					<Route
						path="/*"
						element={
							<AuthRequired>
								<Main />
							</AuthRequired>
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
