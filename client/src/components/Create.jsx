import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import myStyle from './Main.module.css';
import NavBar from './NavBar';

const Create = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(null);
    const acceptName = (event) => {
        setName(event.target.value);
    }
    const acceptDescription = (event) => {
        setDescription(event.target.value);
    }
    const createFruit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8000/api/fruits", {
            name,
            price,
            image,
            description
        })
            .then(res => {
                console.log("SUCCESS SUCCESS");
                console.log(res.data);
                navigate("/admin");
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }
    return (
        <div>
            <div className={myStyle.topBox}>
                <NavBar />
            </div>
            <form onSubmit={createFruit}>
                    <div>
                        <div>
                            <div>Name:</div>
                            <input
                                onChange={acceptName}
                                value={name}
                            />
                        </div>
                        {/* ========================================================== */}
                        <div>
                            <div>Image Url:</div>
                            <input
                                onChange={event => setImage(event.target.value)}
                                value={image}
                            />
                        </div>
                        {/* ========================================================== */}
                        <div>
                            <div>Price ($ per pound):</div>
                            <input
                                onChange={event => setPrice(event.target.value)}
                                type="Number"
                            />
                        </div>
                        {/* ========================================================== */}
                        <div>
                            <div>Description:</div>
                            <input
                                onChange={acceptDescription}
                                value={description}
                            />
                        </div>
                    </div>

                    {/* ========================================================== */}
                    <div>
                        <button>Add Fruit</button>    
                    </div>
            </form>
        </div>
    )
}

export default Create