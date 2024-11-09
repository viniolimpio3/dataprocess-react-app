import React from "react";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import Button from "@mui/material/Button";


const ExpandButton = ({ expanded, onExpandClick }) => {
    return (
        <Button onClick={onExpandClick} variant="outlined" color="white">
            {expanded ? (
                <KeyboardArrowLeftOutlinedIcon />
            ) : (
                <KeyboardArrowRightOutlinedIcon />
            )}
        </Button>
    );
};

export { ExpandButton };
