import React, { useEffect, useState } from "react";

const fetchInputSpecies = (dataSetter) => {
    fetch("http://localhost:8080/input", {}).then(res => res.json())
    .then(data => dataSetter(data))
}

const deleteInputSpecies = (id) => {
    console.log(id)
    fetch(`http://localhost:8080/input/${id}`, { method: 'DELETE'}).then((res) => res.json())
}

const ShowInputSpecies = () => {
    const [species, setSpecies] = useState()

    const deleteSpecies = (id) => {
        deleteInputSpecies(id)

        setSpecies((species) => {
            return species.filter((species) => species._id !== id);
          });
    }

    useEffect(() => {
        fetchInputSpecies(setSpecies);
    }, [])

    return (
        <>
            {species && species.map((species, index) => {
                return <li key={index}>{species.name}, {species.dangerlevel}
                <button onClick={(e) => deleteSpecies(species._id)}>Delete</button>
                </li>
            })}
        </>
    )
}

export default ShowInputSpecies;