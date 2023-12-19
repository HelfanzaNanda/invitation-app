import { METHOD_POST, fetcher, request } from '@/lib/api-instance';
import { DatatableResult } from '@/models/Datatable';
import { UserInput, UserResult } from '@/models/User';
import useSWR from 'swr';
import qs from 'qs';


interface Props {
    callback? : Function;
    limit? : number;
    offset? : number;
    order? : string[];
    filter? : {
        searchedColumn? : string;
        searchedOperator? : string;
        searchText? : string;
    };
    search? : string;
}

export const useUsers = (props : Props) => {

    const { callback, limit, offset, order, filter, search, } = props;

    // console.log('filter : ', filter);
    

    const object : {[key : string] : any} = {
        limit : limit,
        offset : offset,
    };
    if (order?.length) {
        object['order'] = order;
    }

    if (filter?.searchText && filter.searchedColumn) {
        const f  = {
            searchText : filter?.searchText,
            searchedColumn : filter?.searchedColumn,
            searchedOperator : filter?.searchedOperator,
        };
        const objFilter = qs.stringify(f);
        object['filter'] = objFilter;
        
    }
    
    const params = new URLSearchParams(object).toString();
    console.log('params : ', params);

    const { data : response, error, mutate } = useSWR(`users/datatables?${params}`, fetcher, {
        onSuccess: (data, key) => {
            if (callback) callback();
        },
    });

    const data = response?.data as DatatableResult<UserResult[]>;
    

    const create = async (params: UserInput) => {
        if (!data) {
            return false;
        }
        const result = await request<UserResult>('/tasks', METHOD_POST, params);
        mutate([...data, result.data]);
    };

    const update = async (id : Number,  params: UserInput) => {
        if (!data) {
            return false;
        }
        const response = await request<UserResult>( `/tasks/${id}`, params );
        // mutate(
        //     data.map(
        //         (task) => (task.id === updatedTask.id ? updatedTask : task),
        //         false
        //     )
        // );
    };

    const remove = async (id : number) => {
        if (!data) {
            return false;
        }
        await request<UserResult>(`/tasks/${id}`);
        mutate(data.filter((item) => item.id === id, false));
    };

    return { data, error, create, update, remove };
};