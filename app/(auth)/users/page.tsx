"use client";

import React, { ContextType } from "react";
import { UserList } from "./components/UserList";
import { useUsers } from "@/hooks/useUsers";
import { UserInput } from "@/models/User";
import { createContext } from "vm";
import { Button, Dropdown, Input, InputRef, MenuProps, Popconfirm, Select, Space, Table, TableColumnsType, TablePaginationConfig, Typography, notification } from "antd";
import { ColumnType, ColumnsType, FilterConfirmProps, FilterValue, SorterResult } from "antd/es/table/interface";
import qs from "qs";
import { formatNormalDate } from "@/lib/date";
import Link from "next/link";
import { DownOutlined, MoreOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from 'react-highlight-words';


// interface 

interface TableParams {
    // pagination?: TablePaginationConfig;
    limit?: number;
    offset?: number;
    sortField?: string;
    sortOrder?: string;
    filters?: Record<string, FilterValue>;
}

interface DataType {
    id: number;
    name: string;
    email: string;
    phone: string;
    emailVerifiedAt: string;
    roles: string[];
}

type DataIndex = keyof DataType;


interface ExpandedDataType {
    key: React.Key;
    // date: string;
    name: string;
    // upgradeNum: string;
}

const Users: React.FC = () => {
    // const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);
    const [tableParams, setTableParams] = React.useState<TableParams>({
        limit: 10,
        offset: 0
    });
    const [searchText, setSearchText] = React.useState('');
    const [searchedColumn, setSearchedColumn] = React.useState('');
    const [searchedOperator, setSearchedOperator] = React.useState('');
    const searchInput = React.useRef<InputRef>(null);

    const { data, error, create, update, remove } = useUsers({ limit: tableParams.limit, offset: tableParams.offset, filter : { searchedColumn, searchText, searchedOperator } });



    function handleUpdate() {

    }


    const handleDelete = (id: number) => {
        console.log('id : ', id);

        notification.success({
            message: `Successfully`,
            description: 'Successfully deleted data'
        });
    }

    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => {
        const items = [
            { value : 'like', label : 'like' },
            { value : 'and', label : 'and' },
            { value : 'or', label : 'or' },
            { value : 'gte', label : 'gte' },
            { value : 'gt', label : 'gt' },
            { value : 'lte', label : 'lte' },
            { value : 'lt', label : 'lt' },
            { value : 'between', label : 'between' },
            { value : 'in', label : 'in' },
            { value : 'eq', label : 'eq' },
            
        ];
        return ({
        
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
              <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <div className="flex mb-4">
                    <Select
                        title="Operator"
                        defaultValue={items[0].value}
                        style={{ width: 120 }}
                        onChange={setSearchedOperator}
                        options={items} />
                    <Input
                        ref={searchInput}
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex, searchedOperator)}
                        style={{ display: 'block' }}
                    />

                </div>
                <Space>
                    <Button type="primary" onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex, searchedOperator)} icon={<SearchOutlined />} size="small" style={{ width: 90 }} >
                            Search
                    </Button>
                    <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }} >
                            Reset
                    </Button>
                    <Button onClick={() => { close(); }} size="small" style={{ width: 90 }} >
                            close
                    </Button>
                </Space>
              </div>
            ),
            filterIcon: (filtered: boolean) => (
                <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
            ),
            render: (text) =>
                searchedColumn === dataIndex ? (
                    <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                    />
                ) : (
                text
              ),
        });
    }

    const columns: ColumnsType<DataType> = [
        {
            title: '#',
            dataIndex: 'key',
            rowScope: 'row',
            render: (value, record, index) => tableParams.offset!! + (index + 1)
        },
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: true,
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: true,
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            sorter: true,
            ...getColumnSearchProps('phone'),
        },
        {
            title: 'Email Verified At',
            dataIndex: 'emailVerifiedAt',
            render: (value) => formatNormalDate(value),
            ...getColumnSearchProps('emailVerifiedAt'),
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: (item) => {
                const items: MenuProps['items'] = [
                    { label: <Link href={`/users/${item.id}`} >Edit</Link>, key: '0', },
                    {
                        label: <Popconfirm
                            title="Delete the data"
                            description="Are you sure to delete this data?"
                            onConfirm={() => handleDelete(item.id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <div>Delete</div>
                        </Popconfirm>,
                        key: '1',
                    },
                ];

                return <Dropdown menu={{ items }} trigger={['click']}>
                    <a onClick={(e) => e.preventDefault()}>
                        <div className="border-2 border-blue-500 rounded-full w-5 h-5 flex items-center justify-center">
                            <MoreOutlined className="bg-white rounded-full " />
                        </div>
                    </a>
                </Dropdown>
            },
        },
    ];

    const handleGeneratePagination = () => {
        const pagination: TablePaginationConfig = {
            total: data?.count,
            pageSize: tableParams.limit,
            current: (tableParams.offset!! / 10) + 1,
        }
        return pagination;
    }

    const handleTableChange = (pagination: TablePaginationConfig, filters: Record<string, FilterValue>, sorter: SorterResult<DataType>,) => {

        console.log('pagination : ', pagination);
        console.log('filters : ', filters);
        console.log('sorter : ', sorter);
        

        let limit = pagination.pageSize;
        let offset = (pagination.current!! - 1) * 10;

        setTableParams({
            limit: limit,
            offset: offset,
            filters, ...sorter
        });
    };

    const expandedRowRender = (item: DataType) => {
        return <div>Roles : {item.roles.map(i => i.name).join(', ')}</div>;
    };

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const handleSearch = ( selectedKeys: string[], confirm: (param?: FilterConfirmProps) => void, dataIndex: DataIndex, operator : string ) => {
        console.log('operator : ', operator);
        
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
        setSearchedOperator(operator)
    };
    
    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
        setSearchedOperator('');
    };

    


    return (
        <div>
            <Table
                title={() => <div className="font-semibold">Users</div>}
                columns={columns}
                rowKey={(record) => record.id}
                dataSource={data?.rows}
                pagination={handleGeneratePagination()}
                loading={loading}
                onChange={handleTableChange}
                bordered
                rowSelection={rowSelection}
                expandable={{
                    expandedRowRender,
                    defaultExpandedRowKeys: ['0']
                }}
            />
            {/* <UserList handleUpdate={handleUpdate} handleRemove={handleRemove} /> */}
        </div>
    )
};

export default Users;
