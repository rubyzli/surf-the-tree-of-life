import React, { useEffect, useState } from "react";
import ComListSpecies from "../Components/com-list-species";

const fetchSpecies = (dataSetter) => {
	return fetch("http://localhost:8080/api/species/", {}).then((res) =>
		res.json().then((data) => dataSetter(data))
	);
};

const PageHome = () => {
	const [species, setSpecies] = useState();

	useEffect(() => {
		fetchSpecies(setSpecies);
	}, []);

	const handleChange = async (e) => {
		e.preventDefault()

		setTimeout(async () => {
		const response = await fetch(`http://localhost:8080/api/species/search?search=${e.target.value}`)
		const data = await response.json();
		setSpecies(data);
		console.log(data);
	}	, 1500)
	}

	return (
		<div>
			<h1>Welcome to Tree Of Life Project</h1>
			<input onChange={(e) => handleChange(e)}></input>
			<ComListSpecies species={species}></ComListSpecies>
		</div>
	);
};

export default PageHome;
