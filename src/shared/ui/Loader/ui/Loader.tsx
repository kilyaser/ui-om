

import {CircularProgress} from "@mui/material";


export const Loader = () => {
    return (
        <div className="position-relative">
            <div className="position-absolute top-50 start-50 translate-middle">
                <CircularProgress/>
            </div>
        </div>
    );
};
