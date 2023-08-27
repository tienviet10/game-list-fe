import { Tag } from 'antd';
import React, { useMemo } from 'react';

import { useDispatch } from 'react-redux';
import useArrayMemo from '@hooks/useArrayMemo';
import filterFieldStyles from '@components/FiltersWrapper/FilterField.module.scss';

import { incrementItem } from '@app/store';
import { CorrectFiltersKeys } from '@features/homeGameFiltersSlice';

export type StateObject = {
  values: string[];
  color: string;
};

export type ExclusionFiltersListProps = {
  title: string;
  entries: string[];
  states: StateObject[];
  category: CorrectFiltersKeys;
};

export type EntryProps = {
  title: string;
  category: CorrectFiltersKeys;
  stateIndex: number | undefined;
  states: StateObject[] | undefined;
};

function Entry({ title, category, stateIndex, states }: EntryProps) {
  const dispatch = useDispatch();

  return (
    <Tag
      style={{ userSelect: 'none' }}
      color={
        stateIndex !== undefined && states !== undefined
          ? states[stateIndex].color
          : 'default'
      }
      onClick={() => {
        dispatch(
          incrementItem({
            category,
            entry: title,
          })
        );
      }}
    >
      {title}
    </Tag>
  );
}

const MemoizedEntry = React.memo(Entry);

export default function ExclusionFiltersList({
  title,
  entries,
  states,
  category,
}: ExclusionFiltersListProps) {
  // Checks if the states array has changed
  const statesArrayMemo = useArrayMemo<
    ExclusionFiltersListProps['states'],
    ExclusionFiltersListProps['states']
  >(
    () => states,
    states,
    (prev, next) => {
      if (prev.length !== next.length) return true;

      for (let i = 0; i < prev.length; i += 1) {
        if (prev[i].values !== next[i].values) {
          return true;
        }
      }

      return false;
    }
  );

  const mapMemo = useMemo(() => {
    const map = new Map();
    if (statesArrayMemo) {
      let index = 0;
      // eslint-disable-next-line no-restricted-syntax
      for (const i of statesArrayMemo) {
        // eslint-disable-next-line no-restricted-syntax
        for (const value of i.values) {
          map.set(value, index);
        }
        index += 1;
      }
    }
    return map;
  }, [statesArrayMemo]);

  const entriesMemo = useMemo(() => {
    return entries.map((entry) => {
      return (
        <MemoizedEntry
          key={entry}
          title={entry}
          stateIndex={mapMemo.get(entry)}
          states={statesArrayMemo}
          category={category}
        />
      );
    });
  }, [category, entries, mapMemo, statesArrayMemo]);

  return (
    <div>
      <h3 className={filterFieldStyles.h3FilterFieldTitle}>{title}</h3>
      <div style={{ width: '600px' }}>{entriesMemo}</div>
    </div>
  );
}

export const MemoizedExclusionFiltersList = React.memo(ExclusionFiltersList);
