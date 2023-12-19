import React from 'react';
import { DatatableResult } from '@/models/Datatable';
import { UserResult } from '@/models/User';
import { Table } from 'antd';
import qs from 'qs';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';

interface IProps {
    datatable?: DatatableResult<UserResult[]>;
    error?: Error;
    handleUpdate: Function;
    handleRemove: Function;
}

interface DataType {
    name: {
        first: string;
        last: string;
    };
    gender: string;
    email: string;
    login: {
        uuid: string;
    };
}

interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Record<string, FilterValue>;
  }

export const UserList: React.FC<IProps> = ({
    datatable,
    error,
    handleUpdate,
    handleRemove,
}) => {

    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: true,
            render: (name) => `${name.first} ${name.last}`,
            width: '20%',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            filters: [
                { text: 'Male', value: 'male' },
                { text: 'Female', value: 'female' },
            ],
            width: '20%',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
    ];

    const [tableParams, setTableParams] = React.useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const getUsers = () => {
        
    }

    const fetchData = () => {

        setLoading(true);
        fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
          .then((res) => res.json())
          .then(({ results }) => {
            setData(results);
            setLoading(false);
            setTableParams({
              ...tableParams,
              pagination: {
                ...tableParams.pagination,
                total: 200,
                // 200 is mock data, you should read it from server
                // total: data.totalCount,
              },
            });
          });
      };


    if (error) return <div className="error">{error.message}</div>;
    if (!datatable?.rows) return <div className="loading">Loading...</div>;

    return (

        <Table
            columns={columns}
            rowKey={(record) => record.id}
            dataSource={datatable.rows}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}

        // <div className="list">
        //     <ul>
        //         {data?.map((task) => (
        //             <li key={task.id}>
        //                 <TaskItem
        //                     task={task}
        //                     handleUpdateTask={handleUpdate}
        //                     handleRemoveTask={handleRemove}
        //                 />
        //             </li>
        //         ))}
        //     </ul>
        // </div>
    );
};