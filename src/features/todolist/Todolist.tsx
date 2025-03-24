import { FlexWrapper } from "../../components/styled/FlexWrapper.tsx";
import { Button } from "../../components/button/Button.tsx";

import { memo, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  getTasksTC,
  setPriorityFilter,
} from "../../store/reducers/TasksReducer.ts";
import { Filters } from "./filters/Filters.tsx";
import {
  activeTasksCount,
  priorityFilterSelect,
  tasksStatusSelect,
  errorSelect,
} from "../../store/selectors/TasksSelectors.tsx";
import { CreateTaskForm } from "./create-task-form/CreateTaskForm.tsx";
import { Arrow } from "../../components/icons/Arrow.tsx";
import { TaskSkeleton } from "./tasks-list/task/task-skeleton/TaskSkeleton.tsx";
import { S } from "./todolist.styled";
import { Toast } from "../../components/toast/Toast.tsx";
import { TasksList } from "./tasks-list/TasksList.tsx";

export const Todolist = memo(() => {
  const dispatch = useAppDispatch();
  const count = useAppSelector(activeTasksCount);
  const tasksStatus = useAppSelector(tasksStatusSelect);
  const priorityFilter = useAppSelector(priorityFilterSelect);
  const tasksError = useAppSelector(errorSelect);

  const onChangePriorityFilter = useCallback(() => {
    dispatch(setPriorityFilter());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTasksTC());
  }, [dispatch]);

  return (
    <S.Todolist>
      <S.Title>Todolist</S.Title>
      <CreateTaskForm />
      {tasksStatus === "loading" ? (
        <div>
          <TaskSkeleton />
          <TaskSkeleton />
          <TaskSkeleton />
        </div>
      ) : (
        <TasksList />
      )}
      <FlexWrapper $wrap="wrap" $justify="space-between">
        <S.CountInfo>Active tasks: {count}</S.CountInfo>
        <Filters />
        <Button onClick={onChangePriorityFilter}>
          <span>Priority</span>
          <S.ArrowOrder $priorityFilter={priorityFilter}>
            <Arrow size={20} color="#5c7282" />
          </S.ArrowOrder>
        </Button>
      </FlexWrapper>
      {tasksError ? <Toast message={tasksError || ""} /> : null}
    </S.Todolist>
  );
});
