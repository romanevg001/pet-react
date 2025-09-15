import { FormBuilder, FormFieldTypeEnum } from "@/components/FormBuilder";
import { useHeaderMessages } from "@/hooks/useHeaderMessages";
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

export async function taskActionFormAction({ request, params }) {
  const data = await request.formData();
  console.log("taskReduxFormAction", Object.fromEntries(data.entries()), data);
  return { message: "success!!" };
  //  return redirect("/todo-redux");
}

export function TaskActionForm() {

  const fetcher = useFetcher();
  const { data, state } = fetcher;
  const {addMessage} = useHeaderMessages();

  useEffect(() => {
    console.log("<TaskActionForm /> fetcher", data, state);
    console.log("<TaskActionForm /> ", data?.name, );
    if(state == 'idle' && data?.message) {
        addMessage({ severity:"success", detail: data?.message})
    }
  }, [data, state]);

  return (
    <>
      <h1>TaskPage</h1>

      <FormBuilder config={{
        name: {type: FormFieldTypeEnum.text, label: 'Name' },
        count: {type: FormFieldTypeEnum.number, label:'Count', options:{max: 10, min:0}},
        start: {type: FormFieldTypeEnum.calendar, label: 'Date from'},
        end: {type: FormFieldTypeEnum.calendar, label: 'Date to'}
      }}></FormBuilder>

      <fetcher.Form method="post" action="/todo-redux/todo-add" className="mb-5 ">
        <div className="m-3 gap-3 flex">
          <label>Name</label>
          <input type="text" name="name" />
        </div>
        <div className="m-3 gap-3 flex">
          <label>Count</label>
          <input type="number" name="count" />
        </div>
        <div className="m-3 gap-3 flex">
          <label>Date from</label>
          <input type="date" name="start" />
        </div>
        <div className="m-3 gap-3 flex">
          <label>Date to</label>
          <input type="date" name="end" />
        </div>
        <div className="m-3 gap-3 flex">
          <label>Unit</label>
          {Object.keys(UnitEnum).map((unit) => (
            <span className="mr-3">
              <input type="radio" name="unit" />
              <label>{unit}</label>
            </span>
          ))}
        </div>
        <div className="m-3 gap-3 flex">
          <label>Done</label>
          <input type="checkbox" name="done" />
        </div>

        <button type="submit" disabled={state === "submitting"}>submit</button>
      </fetcher.Form>

      <Link to="../.." relative="path">
        Back
      </Link>
    </>
  );
}
