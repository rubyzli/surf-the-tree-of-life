import React, { useEffect, useState } from "react";



const SearchList = ({list, updateSpecies}) => {
    const [expandedItems, setExpandedItems] = useState({});
    const [previouslyExpanded, setPreviouslyExpanded] = useState(false)
    const [comment, setComment] = useState()

    const handleClick = (id, item) => {
        setExpandedItems({
            ...expandedItems,
            [id]: !expandedItems[id]
        });

        if(expandedItems[id] && !previouslyExpanded){
            setPreviouslyExpanded(true)
        } else if(!expandedItems[id]) {
            setPreviouslyExpanded(false)
        }

        if(previouslyExpanded){
            item.comment = comment
            updateSpecies(item);
            setComment()
        } 
    }

    const handleInput = (e) => {
        e.preventDefault();
        setComment(e.target.value)
    }

    useEffect(() => {
    
    }, [])
    
    return list ? (
        <>
        {list.map((item) => {
            return (
                <>
                <li onClick={() => handleClick(item._id, item)} key={item._id}>{item.name}</li>
                {expandedItems[item._id] && (
                    <ul>
                        <li>extinct: {item.extinct ? 'true' : 'false'}</li>
                        <li>_id: {item._id}</li>
                        <li>parent: {item.parent}</li>
                        <li>confidence: {item.confidence}</li>
                        <textarea defaultValue={item.comment} onChange={e => handleInput(e, item)}></textarea>
                    </ul>
                )}
                </>
            )
        })}
        </>
    ) : (
        <p>loading</p>
    )
}


export default SearchList