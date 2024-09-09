// import React from 'react';
// import { StlViewer } from 'react-stl-viewer';

// const viewerStyle = {
//     width: '80vw', // Adjust as needed
//     height: '80vh', // Adjust as needed
// };

// const containerStyle = {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '10vw',
//     height: '10vh',
//     //background: '#f0f0f0', // Optional background color
// };

// interface StlViewerComponentProps {
//     url: string;
// }

// const StlViewerComponent: React.FC<StlViewerComponentProps> = ({ url }) => {
//     return (
//         <div style={containerStyle}>
//             <StlViewer
//                 style={viewerStyle}
//                 orbitControls
//                 shadows
//                 url={url}
//             />
//         </div>
//     );
// };

// export default StlViewerComponent;
import React from 'react';
import { StlViewer } from 'react-stl-viewer';

interface StlViewerComponentProps {
    url: string;
    width?: number;  // Optional width
    height?: number; // Optional height
    containerStyle?: React.CSSProperties; // Optional container styles
    className?: string; // Optional className for additional styling
}

const StlViewerComponent: React.FC<StlViewerComponentProps> = ({ url, width = '80vw', height = '80vh', containerStyle = {} }) => {
    // Default styles for the viewer
    const viewerStyle: React.CSSProperties = {
        width: width,
        height: height,
    };

    // Default styles for the container, merged with provided containerStyle
    const defaultContainerStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '10vw',
        height: '10vh',
        // background: '#f0f0f0', // Optional background color
    };

    const mergedContainerStyle = { ...defaultContainerStyle, ...containerStyle };

    return (
        <div style={mergedContainerStyle}>
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
