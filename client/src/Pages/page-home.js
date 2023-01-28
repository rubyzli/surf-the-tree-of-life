import React, { useEffect, useState } from "react";
import ComListSpecies from "../Components/com-list-species";
import SearchList from "../Components/search-link-species";

const fetchSpecies = (dataSetter) => {
	return fetch("http://localhost:8080/api/species/", {}).then((res) =>
		res.json().then((data) => dataSetter(data))
	);
};

const updateSpecies = (species) => {

	return fetch(`http://localhost:8080/api/species/${species._id}`, 
	{
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(species)
	}).then((res) => res.json())
}

const PageHome = () => {
	const [species, setSpecies] = useState();
	const [searchedSpecies, setSearchedSpecies] = useState()

	useEffect(() => {
		fetchSpecies(setSpecies);
	}, []);

	const handleChange = async (e) => {
		e.preventDefault()

		setTimeout(async () => {
		const response = await fetch(`http://localhost:8080/api/species/search?search=${e.target.value}`)
		const data = await response.json();
		setSearchedSpecies(data)
		setSpecies(null);

		}, 1500)
	}

	return (
		<div>
			<h1>Welcome to Tree Of Life Project</h1>
			<input onChange={(e) => handleChange(e)}></input>
			{species ? <ComListSpecies species={species}></ComListSpecies> : 
    			species === null && searchedSpecies ? <SearchList updateSpecies={updateSpecies} list={searchedSpecies}/> : null
			}
		</div>
	);
};

export default PageHome;
