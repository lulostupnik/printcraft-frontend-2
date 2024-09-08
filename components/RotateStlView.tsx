import React from 'react';
import { StlViewer } from 'react-stl-viewer';

const viewerStyle = {
    width: '80vw', // Adjust as needed
    height: '80vh', // Adjust as needed
};

const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '10vw',
    height: '10vh',
    //background: '#f0f0f0', // Optional background color
};

interface StlViewerComponentProps {
    url: string;
}

const StlViewerComponent: React.FC<StlViewerComponentProps> = ({ url }) => {
    return (
        <div style={containerStyle}>
            <StlViewer
                style={viewerStyle}
                orbitControls
                shadows
                url={url}
            />
        </div>
    );
};

export default StlViewerComponent;

