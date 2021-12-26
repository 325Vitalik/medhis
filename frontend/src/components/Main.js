import React from "react";
import { Route, Routes } from "react-router-dom";
import { Grid, Segment } from "semantic-ui-react";
import { NavigationBar } from "./navigation/NavigationBar";

export const Main = () => {
	return (
		<Grid>
			<Grid.Column width={4}>
				<NavigationBar />
			</Grid.Column>
			<Grid.Column stretched width={12}>
				<Segment>
					<Routes>
						<Route index element={<>MAIN PAGE</>} />
						<Route path="user" element={<>USER PAGE 1</>}>
							{/* <Route path=":userId" element={<></>} />
							<Route path="new" element={<></>} /> */}
							<Route index element={<>USER PAGE 2</>} />
						</Route>
					</Routes>
				</Segment>
			</Grid.Column>
		</Grid>
	);
};
