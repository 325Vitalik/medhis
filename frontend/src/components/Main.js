import React from "react";
import { Route, Routes } from "react-router-dom";
import { Grid, Segment } from "semantic-ui-react";
import { MedicalRecordPage } from "./medicalRecords/MedicalRecordPage";
import { NavigationBar } from "./navigation/NavigationBar";
import { PatientList } from "./patients/PatientList";
import { PatientPage } from "./patients/PatientPage";

export const Main = () => {
	return (
		<Grid>
			<Grid.Column width={4}>
				<NavigationBar />
			</Grid.Column>
			<Grid.Column stretched width={12}>
				<Routes>
					{/* <Route index element={<>MAIN PAGE</>} />
						<Route path="user" element={<>USER PAGE 1</>}>
							<Route index element={<>USER PAGE 2</>} />
						</Route> */}
					<Route path="patients" element={<PatientList />} />
					<Route path="patient/:id" element={<PatientPage />} />
					<Route path="medical-record/:id" element={<MedicalRecordPage />} />
				</Routes>
			</Grid.Column>
		</Grid>
	);
};
