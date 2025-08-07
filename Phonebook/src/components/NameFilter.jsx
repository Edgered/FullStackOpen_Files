// import { useState } from 'react'

// const [searchName, setNewSearchName] = useState('')

// const handleSearchNameChange = (event) => {
// console.log('handleSearchNameChange', event.target.value)
// setNewSearchName(event.target.value)
// }

const NameFilter = ({value, handleonChange}) => {
    return (
        <div>
            filter shown with<input value={value} onChange={handleonChange}/>
        </div>
    )
}


export default NameFilter