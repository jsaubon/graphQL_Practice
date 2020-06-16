import React, { useEffect, useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout, Breadcrumb } from "antd";
import LayoutHeader from "./LayoutHeader";
import LayoutFooter from "./LayoutFooter";
import LeadsPage from "../pages/LeadsPage";
import TasksPage from "../pages/TasksPage";

const LayoutContent = () => {
    const { Header, Footer, Content } = Layout;

    return (
        <div>
            <Layout>
                <LayoutHeader />
                <Content
                    className="site-layout"
                    style={{ padding: "0 50px", marginTop: 64 }}
                >
                    <div
                        className="site-layout-background"
                        style={{ padding: 24, minHeight: 380 }}
                    >
                        <Switch>
                            <Route exact path="/leads" component={LeadsPage} />
                            <Route exact path="/tasks" component={TasksPage} />
                            <Route path="/" exact>
                                <Redirect to="/leads" />
                            </Route>
                        </Switch>
                    </div>
                </Content>
                <LayoutFooter />
            </Layout>
        </div>
    );
};

export default LayoutContent;
