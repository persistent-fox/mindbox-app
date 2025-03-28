import { TextField } from "../../../components/text-field/TextField.tsx";
import { Button } from "../../../components/button/Button.tsx";
import styled from "styled-components";
import { useAppDispatch } from "../../../store/store";
import { addTasksTC, TTask } from "../../../store/reducers/TasksReducer.ts";
import { ChangeEvent, FormEvent, memo, useState } from "react";
import { FlexWrapper } from "../../../components/styled/FlexWrapper.tsx";
import { Checkbox } from "../../../components/checkbox/Checkbox.tsx";
import { priorityButtons } from "../../../mock/priority-buttons";
import { isTPriority } from "../../../utils/is-tpriority";
import { ValidationError } from "../../../components/validation-error/ValidationError.tsx";

export const CreateTaskForm = memo(() => {
  const [formData, setFormData] = useState<TTask>({
    title: "",
    isDone: false,
    priority: 0,
    status: "idle",
    error: null,
  });
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      title: e.target.value,
    });
    setError(null);
  };

  const onChangePriority = (e: ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;
    if (isTPriority(value))
      setFormData({
        ...formData,
        priority: value,
      });
  };

  const onAddTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.title.trim().length > 90) {
      setError("Задача не должна содержать больше 90 символов");
    } else {
      dispatch(addTasksTC(formData));
      setFormData({
        ...formData,
        priority: 0,
        title: "",
      });
    }
  };

  return (
    <SCreateTaskForm onSubmit={onAddTask}>
      <FlexWrapper $direction="column" $gap="10px">
        <FlexWrapper $align="center" $gap="20px">
          <TextField value={formData.title} onChange={onChangeTitle} />
          <Button
            disabled={formData.title.trim().length < 5 || !!error}
            variant="primary"
          >
            Add task
          </Button>
        </FlexWrapper>
        {error && <ValidationError errorMessage={error} />}
      </FlexWrapper>
      <FlexWrapper $wrap="wrap" $justify="end" $gap="10px">
        Priority:
        {priorityButtons.map((prBtn) => (
          <Checkbox
            onChange={onChangePriority}
            checked={formData.priority === prBtn.value}
            key={prBtn.id}
            name={prBtn.name}
            value={prBtn.value}
            type="radio"
            label={prBtn.title}
          />
        ))}
      </FlexWrapper>
    </SCreateTaskForm>
  );
});

const SCreateTaskForm = styled.form`
  display: flex;
  flex-direction: column-reverse;
  gap: 20px;
  margin-bottom: 20px;
`;
