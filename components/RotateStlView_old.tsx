import React from 'react';
import { StlViewer } from 'react-stl-viewer';

interface StlViewerComponentProps {
    url: string;
    width?: string | number;  // Optional width
    height?: string | number; // Optional height
    containerStyle?: React.CSSProperties; // Optional container styles
    className?: string; // Optional className for additional styling
}

const StlViewerComponent: React.FC<StlViewerComponentProps> = ({
    url,
    width = '100%',  // Default to 100% to fit container
    height = '100%', // Default to 100% to fit container
    containerStyle = {},
    className = '',
}) => {
    // Default styles for the viewer
    const viewerStyle: React.CSSProperties = {
        width: '100%',  // Fit to container width
        height: '100%', // Fit to container height
    };

    // Default styles for the container, merged with provided containerStyle
    const defaultContainerStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',  // Full width to fit the parent
        height: '100%', // Full height to fit the parent
        overflow: 'hidden',  // Hide overflow to prevent content from spilling out
    };

    const mergedContainerStyle = { ...defaultContainerStyle, ...containerStyle };

    return (
        <div style={mergedContainerStyle} className={className}>
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
