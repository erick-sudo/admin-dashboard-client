import React, { useEffect, useState } from 'react';
import { NavLink, useParams, useNavigate } from'react-router-dom';

import "./ItemTable.css"

function CategoryForm() {

    const navigate = useNavigate();

    const { id } = useParams();

    const [formData, setFormData] = useState({
        name: "",
        description: ""
    })

    useEffect(() => {
        fetch("http://localhost:9292/categories/" + id,{
            headers: {
                "Authorization": "Bearer " +localStorage.getItem('token')
            }
        })
        .then((response) =>response.json())
        .then(res => {
            setFormData(res)
        })
    },[id])

    function handleChange(event) {
        setFormData({
          ...formData,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div className="category-form">
            <h1>Category Editor</h1>
            <form onSubmit={(event) => {
                event.preventDefault()
                fetch("http://localhost:9292/update/categories/" + id, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " +localStorage.getItem('token')
                    },
                    body: JSON.stringify(formData)
                })
                .then((response) => response.json())
                .then(res => {
                    navigate("/categories")
                })
            }}>
                <input type="text" name="name" onChange={handleChange} value={formData.name} placeholder='Name...' />
                <textarea name="description" rows="10" type="text" onChange={handleChange} value={formData.description} placeholder='Description...'></textarea>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}


function ItemsTable({endpoint}) {

    const [rows, setRows] = React.useState([{}]);

    useEffect(() => {
        fetch(`http://localhost:9292/${endpoint}`,{
            headers: {
                "Authorization": "Bearer " +localStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then(data => setRows(data))
    }, [endpoint])

    return(
        <div className='list'>
            <table>
                <thead>
                    <tr>
                    {
                        Object.keys(rows[0]).map((title, index) => (
                            <th key={index}>{title.toUpperCase()}</th>
                        ))
                    }
                    {endpoint === "categories" ? <th>Actions</th> : null}
                    </tr>
                </thead>
                <tbody>
                    {
                        rows.map((row, index) => {
                            return (
                                <tr key={index}>
                                    {
                                        Object.keys(row).map((cell, index) => (
                                            <td key={index}>{row[cell]}</td>
                                        ))
                                    }
                                    {endpoint === "categories" ? <td><NavLink to={`/categories/${row.id}`}>Edit</NavLink></td> : null}
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
};

export { ItemsTable, CategoryForm };
