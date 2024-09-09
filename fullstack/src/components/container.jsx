'use client';
import { useState } from "react";
import Webcam from "@/components/Webcam/Webcam";
import Widget from "@/components/widget";

const Container = () => {
    const [data] = useState('coming soon');
    return (
        <div className="app-container">
        <div className="widgets">
            <Widget name={'Temperature'} data={data}/>
            <Widget name={'Air Pressure'} data={data}/>
            <Widget name={'Humidity'} data={data}/>
            <Widget name={'Wind'} data={data}/>
            <Webcam />
        </div>
        </div>
    );
}

export default Container;