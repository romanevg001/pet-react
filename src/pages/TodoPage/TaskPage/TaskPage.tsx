import { Task, UnitEnum, type ITask } from "@/models/todo.model";
import { useTodoQuery } from "@/query/useTodoQuery";
import { Button } from "primereact/button";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import dayjs, { Dayjs } from 'dayjs';
import { useParams } from "react-router-dom";
import useFormCustom from "./useFormHook";

import { useActionState, useEffect, useState } from "react";
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import Checkbox from '@mui/material/Checkbox';

export default function TaskPage() {
  const params = useParams();
  const { getTask } = useTodoQuery();
  const { data, isPending } = getTask(params.taskId || "");
  const [initFormState,setInitFormState] = useState<ITask>(new Task());

  const [formState, formAction] = useActionState(async (prevtate, fd) => {
     console.log("TaskPage ddd",new Task(Object.fromEntries(fd.entries())));

      return { errors: null,flds: new Task(Object.fromEntries(fd.entries())) };
    },
    { errors: null, flds: data || new Task() }
  );


  return (  <>
    
      <h1>
        TaskPage {params.taskId} {data?.name}
      </h1>
    <form action={formAction}> 
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          size="small"
          name="name"
          fullWidth={true}
          margin='dense'
          defaultValue={formState?.flds.name}
          focused
        />
    
        <TextField
          id="outlined-basic"
          label="Count"
          variant="outlined"
          size="small"
          name="count"
          fullWidth={true}
          margin='dense'
          defaultValue={formState?.flds.count}
          focused
        />
   

        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Unit</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="unit"
            value={formState?.flds.unit}
          >
            {Object.keys(UnitEnum).map((unit) => (
              <FormControlLabel  value={unit} control={<Radio />}  label={unit} />
            ))}
          </RadioGroup>
        </FormControl>

        <div className=" mb-4">

            <DateRangePicker
                defaultValue={[dayjs(formState?.flds.start), dayjs(formState?.flds.end)]}
            />
        </div>
     
        <div className=" mb-4">
          <FormControlLabel name="done"  control={<Checkbox checked={formState?.flds.done} />} label="Done" />
  
        </div>

        <Button
          type="submit"
          label="Save"
          size="small"
          /*   disabled={formState.isSubmitting} */
        />
      </form>
    </>
  );
}
