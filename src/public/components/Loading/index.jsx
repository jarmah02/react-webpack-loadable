import React from "react";

export default ({ error, timedOut, pastDelay, ...props }) => {
    if (error) {
        return <div>Error</div>;
    }

    if (timedOut) {
        return <div>Timed out</div>;
    }

    if (pastDelay) {
        return <div>Loading...</div>;
    }

    return null;
};
