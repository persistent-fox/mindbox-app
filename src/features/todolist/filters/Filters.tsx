import { FC, memo } from "react";
import { FlexWrapper } from "../../../components/styled/FlexWrapper.tsx";
import { Button } from "../../../components/button/Button.tsx";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { tasksFilters } from "../../../mock/tasks-filters";
import { setFilter, TFilters } from "../../../store/reducers/TasksReducer.ts";
import { filterSelect } from "../../../store/selectors/TasksSelectors.tsx";

type TFiltersProps = {};

export const Filters: FC<TFiltersProps> = memo(() => {
  const dispatch = useAppDispatch();
  const currentFilter = useAppSelector(filterSelect);

  const onChangeFilter = (filter: TFilters) => {
    dispatch(setFilter(filter));
  };

  return (
    <FlexWrapper $gap="12px">
      {tasksFilters.map(({ id, title, filter }) => (
        <Button
          key={id}
          isActive={filter === currentFilter}
          onClick={() => onChangeFilter(filter)}
        >
          {title}
        </Button>
      ))}
    </FlexWrapper>
  );
});
