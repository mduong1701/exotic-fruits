import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import myStyle from './Main.module.css';
import Button from 'react-bootstrap/Button';
import NavBar from './NavBar';

const Main = (props) => {

    const [fruits, setFruits] = useState([]);
    const navigate = useNavigate();
    const handleAdd = () => {
        navigate("/admin/new");
    }

    const compareName = (a, b) => {

        // converting to uppercase to have case-insensitive comparison
        const name1 = a.name.toUpperCase();
        const name2 = b.name.toUpperCase();

        let comparison = 0;

        if (name1 > name2) {
            comparison = 1;
        } else if (name1 < name2) {
            comparison = -1;
        }
        return comparison;
    }


    useEffect(() => {
        axios.get("http://localhost:8000/api/fruits")
            .then(res => {
                console.log(res.data);
                setFruits(res.data.sort(compareName));
            })
            .catch(err => console.log(err))
    }, [])

    const deleteFruit = (deleteID) => {
        axios.delete(`http://localhost:8000/api/fruits/${deleteID}`)
            .then(res => {
                console.log(res.data);
                console.log("Delete successfully");
                // remove the note from the DOM after a successful deletion
                setFruits(fruits.filter((fruit) => fruit._id !== deleteID));
            })
            .catch(err => console.log(err))
    }

    const viewFruit = (viewID) => {
        navigate("/fruits/" + viewID);
    }

    return (
        <div >
            <div className={myStyle.topBox}>
                <NavBar />
            </div>
            <div>
                <Button
                    onClick={handleAdd}>
                    Add Fruit
                </Button>
            </div>
            <div className={myStyle.bigBox}>
                {fruits.map((oneFruit) => {
                    return (
                        <div key={oneFruit._id} className={myStyle.boxMain}>
                            <div ><img className={myStyle.pictureViewOne} src={oneFruit.image} /></div>
                            <div>
                                <h3>{oneFruit.name}</h3>
                                <Button
                                    onClick={() => viewFruit(oneFruit._id)}
                                    variant="info">
                                    Info
                                </Button>
                                <hr></hr>
                                <Button
                                    variant="info"
                                    onClick={() => deleteFruit(oneFruit._id)}>
                                    Delete
                                </Button>
                            </div>



                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Main