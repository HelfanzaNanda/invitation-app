import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button } from "antd"
import { Header } from "antd/es/layout/layout";

interface IProps {
    colorBgContainer : string;
    collapsed : boolean;
    setCollapsed : Function;
}

const HeaderCommon: React.FC<IProps> = ({colorBgContainer, collapsed, setCollapsed}) => {
    return (
        <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                }}
            />
        </Header>
    )
}

export default HeaderCommon