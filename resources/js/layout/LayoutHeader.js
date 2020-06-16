import React from "react";
import { Layout, Breadcrumb, Menu } from "antd";
import {} from "antd";
import { Link } from "react-router-dom";
const LayoutHeader = () => {
    const { Header, Footer, Content } = Layout;
    return (
        <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
                <Menu.Item key="1">
                    <Link to="/leads">Leads</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/tasks">Tasks</Link>
                </Menu.Item>
            </Menu>
        </Header>
    );
};

export default LayoutHeader;
