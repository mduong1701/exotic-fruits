import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import myStyle from './Main.module.css';
import NavBar from './NavBar';

const ViewOne = () => {
    const { id } = useParams();
    const [thisFruit, setThisFruit] = useState(null);
    useEffect(() => {
        axios.get(`http://localhost:8000/api/fruits/${id}`)
            .then(res => {
                console.log(res.data);
                setThisFruit(res.data);
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <div className={myStyle.topBox}>
                <NavBar />
            </div>
            {
                thisFruit
                    ? <div>
                        <div className={myStyle.flexDisplayViewOne}>
                            <div className={myStyle.shiver}>
                                <div ><img className={myStyle.pictureViewOne} src={thisFruit.image} /></div>
                            </div>
                            <div className={myStyle.details}>
                                <h2 className={myStyle.center}>{thisFruit.name}</h2>
                                <p><strong>Price (per lb): </strong>${thisFruit.price}</p>
                                <p><strong>Description: </strong>{thisFruit.description}</p>
                            </div>
                        </div>
                    </div>
                    : "Loading ..."
            }
        </div>
    )
}

export default ViewOne