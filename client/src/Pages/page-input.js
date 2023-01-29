import React, { useEffect, useState } from "react";
import { Form } from "react-router-dom";

const fetchSpecies = (dataSetter) => {
	return fetch("http://localhost:8080/api/species/", {}).then((res) =>
		res.json().then((data) => dataSetter(data))
	);
};

const postInputSpecies = (species) => {
    fetch("http://localhost:8080/input", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(species)
    }).then((res) => res.json())
}

const InputSpecies = () => {
    const [species, setSpecies] = useState()

    useEffect(() => {
        fetchSpecies(setSpecies)
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formObject = Object.fromEntries(formData.entries())
        console.log(formObject);
        postInputSpecies(formObject);
    }

    return (
        <>
            <Form onSubmit={(e) => onSubmit(e)} className="form">
                <label>name <input name="name" type="text"></input></label>
                <label>species <select name="species">
                    {species && species.map(item => {
                        return <option value={item.name}>{item.name}</option>
                    })}
                    </select></label>
                <label>date <input name="date" type="date"></input></label>
                <label>description <input name="description" type="text"></input></label>
                <button type="submit">Submit</button>
            </Form>
        </>
    )
}

export default InputSpecies;