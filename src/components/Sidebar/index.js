import React, { useState } from "react";
import { Box, Stack } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DnsIcon from "@mui/icons-material/Dns";
import { Menu } from "./menu";
import { ExpandButton } from "./expandButton";
import { Assessment, AttachMoney, Diversity3, LocalShipping, Padding, PeopleAlt, TimeToLeave } from "@mui/icons-material";
import logoImg from '../../assets/logo-dataprocess.png'

const styles = {
    main: {
        display: "flex !important",
        flexDirection: "column !important",
        justifyContent: "space-between !important",
        height: "100vh !important",
        backgroundColor: "var(--primary)",
        color: "white !important",
        padding: "1rem"
    }
}

const SideBar = () => {
    const [expanded, setExpanded] = useState(true);

    const onExpandClick = () => {
        setExpanded(!expanded);
    };

    const menuItems = [
        {
            path: "/home",
            title: "Dashboard",
            icon: <DashboardIcon />,
        },
        {
            path: "/rh",
            title: "Recursos Humanos",
            icon: <Diversity3 />,
        },
        {
            path: "/fretes",
            title: "Fretes",
            icon: <LocalShipping />,
        },
        {
            path: "/financeiro",
            title: "Financeiro",
            icon: <AttachMoney />,
        },
        {
            path: "/clientes",
            title: "Clientes",
            icon: <PeopleAlt />,
        },
        {
            path: "/veiculos",
            title: "Veículos",
            icon: <TimeToLeave />,
        },
        {
            path: "/relatorios",
            title: "Relatórios",
            icon: <Assessment />,
        }
    ];

    return (
        <Box
            sx={styles.main}
            className="sidebar"
        >
            <img style={{width: '2.5rem'}} src={logoImg} width={125} alt="DataProcess"></img>
            <Menu menuItems={menuItems} expanded={expanded} />
            <ExpandButton expanded={expanded} onExpandClick={onExpandClick} />
        </Box>
    );
};

export default SideBar;
