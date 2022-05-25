import React, { useState } from 'react'
import { AutoComplete, Input } from 'antd';


const mockVal = (str, repeat = 1) => ({
    value: str.repeat(repeat),
});


function SearchBar(props) {
    const [value, setValue] = useState('')
    const [options, setOptions] = useState([])


    const onSearch = (searchText) => {
        setOptions(
            !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]
        )
    }


    const onSelect = (data) => {
        console.log('onSelect', data)
    }

    const onChange = (data) => {
        setValue(data)
    }

    return (
        <AutoComplete
            dropdownMatchSelectWidth={252}
            value={value}
            options={options}
            style={props.style}
            onSelect={onSelect}
            onSearch={onSearch}
            onChange={onChange}
        >
            <Input.Search size="large" placeholder="Search" enterButton />
        </AutoComplete>
    )
}


export default SearchBar;