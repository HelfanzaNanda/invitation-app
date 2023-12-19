import { DiffOutlined, UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider"
import { MenuItemType } from "antd/es/menu/hooks/useItems";

const items : MenuItemType[] = [
    { key: 0, label : 'Profile', icon: <UserOutlined/> },
    { key: 1, label : 'Invitation', icon: <DiffOutlined /> },
];

interface IProps {
    collapsed : boolean
}

const SiderCommom: React.FC<IProps> = ({collapsed}) => {
    return (
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical" >
                {!collapsed && (<div className='text-2xl text-white font-semibold text-center pt-4 mb-8'>Invitation</div>)}
                {collapsed && (<div className='text-2xl text-white font-semibold text-center pt-4 mb-8'>IVTN</div>)}
            </div>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={items}
            />
        </Sider>
    )
}

export default SiderCommom;