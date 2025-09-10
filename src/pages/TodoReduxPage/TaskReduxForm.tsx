import { Task, UnitEnum, type ITask } from "@/models/todo.model";
import type { IStoreState } from "@/reduxstore";
import { getTaskAction } from "@/reduxstore/task-slice";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import dayjs from "dayjs";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { useActionState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export function TaskReduxForm() {
  const params = useParams();
  const data = useSelector<IStoreState,ITask>(state=>state.task.task)

/*   const { getTask } = useTodoQuery();
  const { data, isPending } = getTask(params.taskId || "");
  const [initFormState,setInitFormState] = useState<ITask>(new Task());
 */
     console.log("<TaskReduxForm /> getTaskAction",data?.name);



    const [formState, formAction] = useActionState((prevtate, fd) => {
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