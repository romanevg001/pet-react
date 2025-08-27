
import { useTodoQuery } from "@/query/useTodoQuery";
import { Paginator } from "primereact/paginator";
import { useState,  } from "react";

  
  export function PaginatorComponent({setPage}) {
    const {getTodo } = useTodoQuery();
    const {  data: tasks } = getTodo();
    
    const [first, setFirst] = useState(tasks?.first);
    const [rows, setRows] = useState(10);
    console.log('PaginatorComponent tasks',tasks, first,rows, tasks?.items)



    const onPageChange = (event) => {
        console.log('PaginatorComponent onPageChange event',event)

        setFirst(event.first);
        setRows(event.rows);

        setPage(event.page+1);
    };
    
    return (
        <Paginator first={first} rows={rows} totalRecords={tasks?.items} onPageChange={onPageChange} />

    );
  }
        