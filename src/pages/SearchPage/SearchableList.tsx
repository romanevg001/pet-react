import { useDebounce } from '@/hooks/useDebounce';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';

const arr= [];

console.log('rerender SearchableList 1',arr)

export default function SearchableList({ items, itemKeyFn, children }) {
  const {debounce} = useDebounce();
  const [searchTerm, setSearchTerm] = useState('');

  const searchResults = items.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
  );
console.log('rerender SearchableList 2', arr)

 
  function handleChange(e) {
    debounce((e)=>{
    arr.push(e.target.value);

        setSearchTerm(e.target.value)
    },e);
  } 

  return (
    <div className="searchable-list">
      <div className="p-inputgroup flex-1">
            <InputText type="search" placeholder="Search" onChange={handleChange} />
            <Button icon="pi pi-search" label="Search" />
        </div>
      <ul>
        {searchResults.map((item) => (
          <li key={itemKeyFn(item)}>{children(item)}</li>
        ))}
      </ul>
    </div>
  );
}