import { Task, UnitEnum, type ITask } from "@/models/todo.model";
import { useTodoQuery } from "@/query/useTodoQuery";
import { errorHandler } from "@/services/form.service";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { ProgressSpinner } from "primereact/progressspinner";
import { RadioButton } from "primereact/radiobutton";
import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";

export interface IEditAddTaskDialogProps {
  editedTask: undefined | ITask; 
  setEditedTask: Dispatch<SetStateAction<undefined | ITask>>;
}

export const EditAddTaskDialog =  ({editedTask, setEditedTask}: IEditAddTaskDialogProps) => {
  const isEdit = useRef(Boolean(editedTask?.name));
  const {addTask, editTask} = useTodoQuery();

  const { isPending: isPendingAddTask,   mutate: addTaskStore,   } = addTask(onSuccess);
  const { isPending: isPendingEditTask,   mutate: editTaskStore,   } = editTask(onSuccess);


  const [addTaskData, setAddTaskData] = useState(editedTask || new Task());

  const { handleSubmit, control, reset, formState } = useForm({
    defaultValues: editedTask || new Task(),
  });

  function onSuccess() {
    reset();
    setEditedTask(undefined);
  };

  const onSubmit = (data) => {
    console.log('onSubmit',addTaskData, data)
    if (isEdit.current) {
      editTaskStore({...addTaskData, name: data.name})
    } else {
      addTaskStore(new Task({...addTaskData, name: data.name}));
    }
  };




  return (
    <>
      
      <Dialog
        header={isEdit.current ? "Edit Task":"Add Task"}
        visible={!!editedTask}
        style={{ width: "50vw" }}
        onHide={() => setEditedTask(undefined)}
      >
        {(isPendingAddTask || isPendingEditTask) && (
          <div className="absolute w-full h-full z-3 ">
            <ProgressSpinner />
          </div>
        )}
        <div className="m-0">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (<>
                <span>{console.log('NAME: ',field, fieldState, control )}</span>
                <InputText
                  {...field}
                  placeholder="Task name"
                  {...errorHandler(fieldState)}
               /*    value={addTaskData.name}
                  onChange={(e) => {
                    setAddTaskData((v)=> new Task({ ...v, name: e.target.value }));
                  }} */
                  className="w-full  p-inputtext-sm mb-4"
                />
              </>)}
            />

            <Controller
              name="count"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <InputNumber
                  showButtons
                  {...field}
                  {...errorHandler(fieldState)}
                  value={addTaskData.count}
                  onValueChange={(e) => {
                    setAddTaskData((v)=>(new Task({ ...v, count: Number(e.value) })));
                  }}
                  placeholder="Count"
                  className="w-full p-inputtext-sm mb-4"
                />
              )}
            />

            <Controller
              name="unit"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <div className="flex flex-wrap gap-3">
                  {Object.keys(UnitEnum).map((unit) => (
                    <div key={unit} className="flex align-items-center">
                      <RadioButton
                        inputId={unit}
                        {...field}
                        {...errorHandler(fieldState)}
                        value={unit}
                        onChange={(e) => {
                         
                          setAddTaskData((v)=>{
                             console.log(e.value, v, { ...v, unit: e.value  }, new Task({ ...v, unit: e.value  }))
                            return new Task({ ...v, unit: e.value  })
                          })          
                        }}
                        checked={addTaskData.unit === unit}
                      />
                      <label htmlFor={unit} className="ml-2">
                        {unit}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            />

            <Button
              type="submit"
              label={isEdit.current ? "Edit Task":"Add Task"}
              size="small"
              className="mt-4 "
              disabled={formState.isSubmitting}
            />
          </form>
        </div>
      </Dialog>
    </>
  );
}

