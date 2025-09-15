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
import {
  Form,
  Link,
  redirect,
  useActionData,
  useFetcher,
  useNavigation,
  useParams,
  useSubmit,
} from "react-router-dom";

export async function taskReduxFormAction({ request, params }) {
  const data = await request.formData();
  console.log("taskReduxFormAction", Object.fromEntries(data.entries()), data);
  return data;
  //  return redirect("/todo-redux");
}

export function TaskReduxForm() {
  const params = useParams();
  const submit = useSubmit();
  const data = useSelector<IStoreState, ITask>((state) => state.task.task);
  const navigation = useNavigation();
  const actionData: FormData = useActionData();
  const isSubmitting = navigation.state == "submitting";

  /*   const { getTask } = useTodoQuery();
  const { data, isPending } = getTask(params.taskId || "");
  const [initFormState,setInitFormState] = useState<ITask>(new Task());
 */
  console.log("<TaskReduxForm /> getTaskAction", data?.name, isSubmitting);
  console.log(
    "<TaskReduxForm /> actionData return from taskReduxFormAction",
    actionData && Object.fromEntries(actionData.entries())
  );

  /* 
    const [formState, formAction] = useActionState((prevtate, fd) => {
        console.log("TaskPage ddd",new Task(Object.fromEntries(fd.entries())));

        return { errors: null,flds: new Task(Object.fromEntries(fd.entries())) };
        },
        { errors: null, flds: data || new Task() }
    );

 */

  return (
    <>
      <h1>
        TaskPage {params.taskId} {data?.name}
        <button
          onClick={() => {
            submit(data || {}, { method: "POST" });
            console.log("isSubmitting", isSubmitting);
          }}
          disabled={isSubmitting}
        >
          {" "}
          {isSubmitting ? "Submitting..." : "Submit actioin programaticly"}
        </button>
      </h1>
   
      <Form method="post">
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          size="small"
          name="name"
          fullWidth={true}
          margin="dense"
        />

        <TextField
          id="outlined-basic"
          label="Count"
          variant="outlined"
          size="small"
          name="count"
          fullWidth={true}
          margin="dense"
        />

        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Unit</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="unit"
          >
            {Object.keys(UnitEnum).map((unit) => (
              <FormControlLabel value={unit} control={<Radio />} label={unit} />
            ))}
          </RadioGroup>
        </FormControl>

        <div className=" mb-4">
          <input type="date" name="start" />
          <input type="date" name="end" />
        </div>

        <div className=" mb-4">
          <FormControlLabel name="done" control={<Checkbox />} label="Done" />
        </div>

        <Button
          type="submit"
          label="Save"
          size="small"
          disabled={isSubmitting}
          /*   disabled={formState.isSubmitting} */
        />
      </Form>
      <Link to="../.." relative="path">
        Back
      </Link>
    </>
  );
}
