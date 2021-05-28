import React from 'react';
import { XGrid, GridColDef, GridValueGetterParams, GridFilterOperator, GridFilterItem, GridFilterInputValue } from '@material-ui/x-grid';
import { renderUser, } from './grid-renderer/renderUser';
import { renderStatus, } from './grid-renderer/renderStatus';
import { LabelData, renderLabels, } from './grid-renderer/renderLabels';
const labelsOnlyOperators: GridFilterOperator[] = [
    {
        label: 'name equals',
        value: 'NameEquals',
        getApplyFilterFn: (filterItem: GridFilterItem) => {
            if (
                !filterItem.columnField ||
                !filterItem.value ||
                !filterItem.operatorValue
            ) {
                return null;
            }

            return (params: any): boolean => {
                return (params.value as Array<LabelData>).some(e => e.name === filterItem.value);
            };
        },
        InputComponent: GridFilterInputValue,
        InputComponentProps: { type: 'string' },
    },
    {
        label: 'description contains',
        value: 'DescriptionContains',
        getApplyFilterFn: (filterItem: GridFilterItem) => {
            if (
                !filterItem.columnField ||
                !filterItem.value ||
                !filterItem.operatorValue
            ) {
                return null;
            }

            return (params: any): boolean => {
                return (params.value as Array<LabelData>).some(e => e.description.includes(filterItem.value ?? ''));
            };
        },
        InputComponent: GridFilterInputValue,
        InputComponentProps: { type: 'string' },
    },
];
const statusOnlyOperators: GridFilterOperator[] = [
    {
        label: 'status equals',
        value: 'StatusEquals',
        getApplyFilterFn: (filterItem: GridFilterItem) => {
            if (
                !filterItem.columnField ||
                !filterItem.value ||
                !filterItem.operatorValue
            ) {
                return null;
            }

            return (params: any): boolean => {
                return params.value === filterItem.value;
            };
        },
        InputComponent: GridFilterInputValue,
        InputComponentProps: { type: 'string' },
    },
];
const columns: GridColDef[] = [
    { filterable: false, resizable: true, headerName: 'PR number', field: 'number', width: 150 },
    { filterable: false, resizable: true, headerName: 'Title', field: 'title', width: 150 },
    { filterable: false, resizable: true, headerName: 'Description', sortable: false, field: 'body', width: 150 },
    { filterable: false, resizable: true, headerName: 'User', sortable: false, field: 'user', width: 200, renderCell: renderUser },
    { filterable: true, resizable: true, filterOperators: statusOnlyOperators, headerName: 'Status', sortable: false, field: 'state', width: 100, renderCell: renderStatus },
    { filterable: true, resizable: true, filterOperators: labelsOnlyOperators, headerName: 'Labels', sortable: false, field: 'labels', width: 150, renderCell: renderLabels },
    { filterable: false, resizable: true, headerName: 'Creation Date', sortable: false, field: 'created_at', width: 150, valueGetter: (params: GridValueGetterParams) => new Date(params.value as string).toLocaleString() },
]

interface PRListState {
    rows: Array<any>
}   

interface PRListProps {
}

class PRList extends React.Component<PRListProps, PRListState> {
    constructor(props: PRListProps) {
        super(props);

        this.state = {
            rows: []
        };
    }

    componentDidMount() {
        // Simple GET request using fetch
        fetch('http://localhost:3000/api/vcs/prs')
            .then(response => response.json())
            .then(data => this.setState({ rows: data }));
    }

    render() {
        const { rows } = this.state;
        return (
            <div style={{ height: '100%', width: '100%' }}>
                <XGrid autoHeight={true} rows={rows} columns={columns} />
            </div>
        );
    }
}

export { PRList };