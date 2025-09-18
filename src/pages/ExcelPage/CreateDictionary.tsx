import { useEffect, useRef, useState } from "react";

export function CreateDictionary({defaultValue}) {
    const inp = useRef(null);
    const [itemList,setItemList] = useState('');
    const [list,setList] = useState<string[]>([]);

    useEffect(()=>{
        setList(defaultValue);
    },defaultValue)

    function addListEl() {
        if(itemList.trim()){
            setList(l=>[...l,itemList])
        }
    
        if(inp?.current?.value) {inp.current.value ='';}
        
    }

    function delItem(item) {
        setList(l=>l.filter(el=>el !== item))
    }

    return (<>
    <ul className="p-0">{list.map((item,i)=> <li className="flex justify-content-between" key={'id_'+i}>{item} <button onClick={()=>delItem(item)}>&times;</button></li>)}</ul>
    <input type="text" ref={inp} onChange={(e)=>{setItemList(e.target.value)}}  /> <button onClick={addListEl}>Add</button>
    </>);
}