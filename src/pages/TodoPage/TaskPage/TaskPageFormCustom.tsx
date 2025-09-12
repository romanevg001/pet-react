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
import { Link, useParams } from "react-router-dom";
import useFormCustom from "./useFormHook";

import { useActionState } from "react";
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import Checkbox from '@mui/material/Checkbox';

export default function TaskPageFormCustom() {
  const params = useParams();
  const { getTask } = useTodoQuery();
  const { data } = getTask(params.taskId || "");
  const { formState, setFormState, formStateEvents } = useFormCustom<Omit<ITask, "id" | "i">>(data);

/*   const [formState, formAction] = data && useActionState((prevtate, fd) => {
     console.log("TaskPage ddd",new Task(Object.fromEntries(fd.entries())));

      return { errors: null,fields: new Task(Object.fromEntries(fd.entries())) };
    },
    { errors: null, fields:(data || new Task()) }
  );
 */
  console.log("formState", formState);

    function handleSubmit (e) {
        e.preventDefault();
        const fd= new FormData(e.target);
        console.log("TaskPage ddd",Object.fromEntries(fd.entries()));
        console.log("formState", formState);
    } 

  return (
    <>
      <h1>
        TaskPageFormCustom {params.taskId} {data?.name}
      </h1>
      {/*  <form action={formAction}> */}
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          size="small"
          name="name"
          fullWidth={true}
          margin='dense'
          defaultValue={formState?.name}
          focused
          {...formStateEvents} 
        />
        {/*  <InputText
          name="name"
          placeholder="Name"
          className="w-full  p-inputtext-sm mb-3"
          defaultValue={formState?.fields.name}
              {...formStateEvents} 
        />
 */}
       {/*  <InputNumber
          name="count"
          showButtons
          defaultValue={formState?.count}
         
          placeholder="Count"
          className="w-full p-inputtext-sm mb-4"
        />
 */}
        <TextField
          id="outlined-basic"
          label="Count"
          variant="outlined"
          size="small"
          name="count"
          fullWidth={true}
          margin='dense'
          defaultValue={formState?.count}
          focused
          {...formStateEvents} 
        />
        {/*   <div className="flex flex-wrap gap-3 mb-4">
          {Object.keys(UnitEnum).map((unit) => (
            <div key={unit} className="flex align-items-center">
              <RadioButton
                name="unit"
                inputId={unit}
                defaultValue={unit}
                //   onChange={(e: RadioButtonChangeEvent) => { setFormState({'unit':e.value})}}
                checked={formState.fields.unit === unit}
              />
              <label htmlFor={unit} className="ml-2">
                {unit}
              </label>
            </div>
          ))}
        </div> */}

        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Unit</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="unit"
            {...formStateEvents} 
            value={formState.unit}
          >
            {Object.keys(UnitEnum).map((unit) => (
              <FormControlLabel  value={unit} control={<Radio />}  label={unit} />
            ))}
          </RadioGroup>
        </FormControl>

        <div className=" mb-4">

            <DateRangePicker
                defaultValue={[dayjs(formState.start), dayjs(formState.end)]}
            />
        </div>
        {/* <div className="flex gap-3 mb-4">
          <Calendar
            name="start"
            value={formState.start}
            {...formStateEvents} 
          />
          <Calendar
            name="end"
            value={formState.end}
              {...formStateEvents} 
          />
        </div> */}
        <div className=" mb-4">
          <FormControlLabel name="done" {...formStateEvents}  control={<Checkbox checked={formState.done} />} label="Done" />
       {/*    <Checkbox checked={formState.done} name="done" id="done" {...formStateEvents}  />
          <label htmlFor="done" className="ml-2">
            Done
          </label> */}
        </div>

        <Button
          type="submit"
          label="Save"
          size="small"
          /*   disabled={formState.isSubmitting} */
        />
      </form>

      <Link to="../.." relative="path">Back</Link>
      

    </>
  );
}
