import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Header, Image, List, Message, Segment } from "semantic-ui-react";
import { userService } from "../../services/userService";
import { MedicalRecordsList } from "../medicalRecords/MdicalRecordsList";

export const MedicalRecordPage = () => {
	const [patient, setPatient] = useState({});
	const [isLoading, setLoading] = useState(false);
	const [isError, setError] = useState(false);
	const params = useParams();

	return (
		<>
			<div>Medical page: {params.id}</div>
		</>
	);
};
