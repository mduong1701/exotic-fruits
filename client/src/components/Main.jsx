import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import pirateStyle from './Main.module.css';
import NavBar from './NavBar';
import Button from 'react-bootstrap/Button';

const Main = (props) => {

    const [pirates, setPirates] = useState([]);
    const navigate = useNavigate();

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
                setPirates(res.data.sort(compareName));
            })
            .catch(err => console.log(err))
    }, [])

    const viewPirate = (viewID) => {
        navigate("/fruits/" + viewID);
    }

    return (
        <div >
            <div className={pirateStyle.topBox}>
                <NavBar />
            </div>

            <div className={pirateStyle.bigBox}>
                {pirates.map((onePirate) => {
                    return (
                        <div key={onePirate._id} className={pirateStyle.boxMain}>
                            <div ><img className={pirateStyle.pictureViewOne} src={onePirate.image} /></div>
                            <div>
                                <h3>{onePirate.name}</h3>
                                <Button
                                    onClick={() => viewPirate(onePirate._id)}
                                    variant="info">
                                    Info
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