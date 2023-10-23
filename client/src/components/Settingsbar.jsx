import React from 'react';
import toolState from "../store/toolState";

const SettingsBar = () => {
    return (
        <div className="setting-bar">
            <label htmlFor="line-width">Thickness</label>
            <input
                onChange={e => toolState.setLineWidth(e.target.value)}
                style={{margin: '0 10px'}}
                id="line-width"
                type="number" defaultValue={1} min={1} max={50}/>
            <label htmlFor="stroke-color">Color</label>
            <input onChange={e => toolState.setStrokeColor(e.target.value)} id="stroke-color" type="color"/>
        </div>
    );
};

export default SettingsBar;