import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import "./Layout.css";
import logo from "../../assets/wave.svg";
import logoCollapsed from "../../assets/logo_collapsed.webp";
import { Link, useLocation } from "react-router-dom";

const { Header, Sider, Content } = Layout;

interface LayoutProps {
  children: React.ReactNode;
}

const CustomLayout: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation();

  const selectedKey =
    location.pathname.startsWith("/customers") ||
    location.pathname.startsWith("/customer")
      ? "/customers"
      : location.pathname;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        collapsedWidth="80"
        aria-label="Main Navigation"
        onBreakpoint={(broken) => {
          if (broken) {
            setCollapsed(true);
          } else {
            setCollapsed(false);
          }
        }}
      >
        <nav aria-label="Main Navigation">
          <div className="logo-container">
            <img
              src={collapsed ? logoCollapsed : logo}
              alt="Wave logo"
              className="logo"
            />
          </div>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedKey]}
            items={[
              {
                key: "/customers",
                icon: <UserOutlined />,
                label: <Link to="/customers">Customers</Link>,
              },
            ]}
          />
        </nav>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            flex: 1,
            overflow: "auto",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default CustomLayout;
