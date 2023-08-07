import { StateValue, createMachine, interpret } from 'xstate';
import { PayloadAction } from '@reduxjs/toolkit';
import { createGameFiltersSlice } from './gameFiltersSlice';
import { remove } from '@/utils/utils';
import { HomeGameFilters } from './types';

export type CorrectFilters = Pick<
  HomeGameFilters,
  'genres' | 'platforms' | 'tags'
>;

export type CorrectFiltersKeys = keyof CorrectFilters;

export type PayloadType = {
  category: CorrectFiltersKeys;
  entry: string;
};

export type StatePayloadType = PayloadType & {
  state: HomeGameFilters;
};

const defaultGameFilters: HomeGameFilters = {
  genres: {
    included: [],
    excluded: [],
  },
  platforms: {
    included: [],
    excluded: [],
  },
  tags: {
    included: [],
    excluded: [],
  },
  year: undefined,
  search: '',
  sortBy: 'name',
};

const stateMachine = createMachine(
  {
    id: 'includeExcludeMachine',
    predictableActionArguments: true,
    preserveActionOrder: true,
    schema: {
      context: {} as {
        entryCache: Map<string, StateValue>;
      },
      events: {} as
        | { type: 'TOGGLE'; payload: StatePayloadType }
        | { type: 'INCREMENT'; payload: StatePayloadType }
        | { type: 'REMOVE_ITEM'; payload: StatePayloadType },
    },
    context: {
      entryCache: new Map<string, StateValue>(),
    },
    initial: 'off',
    states: {
      off: {
        on: {
          TOGGLE: {
            target: 'included',
            actions: ['included'],
          },
          INCREMENT: {
            target: 'included',
            actions: ['included'],
          },
        },
      },

      included: {
        on: {
          TOGGLE: {
            target: 'off',
            actions: ['removeIncluded'],
          },
          INCREMENT: {
            target: 'excluded',
            actions: ['includedToExcluded'],
          },
          REMOVE_ITEM: {
            actions: ['removeIncluded'],
          },
        },
      },

      excluded: {
        on: {
          TOGGLE: {
            target: 'included',
            actions: ['excludedToIncluded'],
          },
          INCREMENT: {
            target: 'off',
            actions: ['removeExcluded'],
          },
          REMOVE_ITEM: {
            actions: ['removeExcluded'],
          },
        },
      },
    },
  },

  {
    actions: {
      included: (_context, event) => {
        const { category, entry, state } = event.payload;
        state[category].included.push(entry);
      },
      removeIncluded: (_context, event) => {
        const { category, entry, state } = event.payload;
        state[category].included = remove(state[category].included, entry);
      },
      removeExcluded: (_context, event) => {
        const { category, entry, state } = event.payload;
        state[category].excluded = remove(state[category].excluded, entry);
      },
      includedToExcluded: (_context, event) => {
        const { category, entry, state } = event.payload;
        state[category].excluded.push(entry);
        state[category].included = remove(state[category].included, entry);
      },
      excludedToIncluded: (_context, event) => {
        const { category, entry, state } = event.payload;
        state[category].included.push(entry);
        state[category].excluded = remove(state[category].excluded, entry);
      },
    },
  }
);

const interpreter = interpret(stateMachine);

export const createHomeGameFiltersSlice = () => {
  const entryCache = new Map<
    string,
    {
      entries: Map<string, StateValue>;
      included: never[];
      excluded: never[];
    }
  >([
    [
      'genres',
      { entries: new Map<string, StateValue>(), included: [], excluded: [] },
    ],
    [
      'platforms',
      { entries: new Map<string, StateValue>(), included: [], excluded: [] },
    ],
    [
      'tags',
      { entries: new Map<string, StateValue>(), included: [], excluded: [] },
    ],
  ]);

  return createGameFiltersSlice({
    name: 'homeGameFilters',
    initialState: defaultGameFilters,
    reducers: {
      // This is a user selecting an item from the dropdown menu, can only be in the 'off' or 'included' state
      toggleItem: (state, action: PayloadAction<PayloadType>) => {
        const { category, entry } = action.payload;

        /*
          1. Lookup category from cache
          2. Lookup entry from cache
            - Create default object if not found
          3. Send through machine
            - Add to included/excluded
            - Set key where it should be (included/excluded)
          4. Update the cache with the new state

          
          categoryCache: {
            entries: new Map<string, StateValue>(),
            included: [],
            excluded: []
          }
        */

        const categoryCache = entryCache.get(category);
        const existingItem =
          categoryCache!.entries.get(entry) ?? stateMachine.initialState;

        // stateMachine.initialState;
        const transition = stateMachine.transition(existingItem, {
          type: 'TOGGLE',
          payload: {
            category,
            entry,
            state,
          },
        });
        interpreter.execute(transition);

        categoryCache!.entries.set(entry, transition.value);
      },

      incrementItem: (state, action: PayloadAction<PayloadType>) => {
        const { category, entry } = action.payload;

        const categoryCache = entryCache.get(category);
        const existingItem =
          categoryCache!.entries.get(entry) ?? stateMachine.initialState;

        const transition = stateMachine.transition(existingItem, {
          type: 'INCREMENT',
          payload: {
            category,
            entry,
            state,
          },
        });
        interpreter.execute(transition);

        categoryCache!.entries.set(entry, transition.value);
      },

      removeItem: (state, action: PayloadAction<PayloadType>) => {
        const { category, entry } = action.payload;
        const categoryCache = entryCache.get(category);
        const existingItem = categoryCache?.entries.get(entry);

        const service = stateMachine.transition(existingItem, {
          type: 'REMOVE_ITEM',
          payload: {
            category,
            entry,
            state,
          },
        });
        interpreter.execute(service);

        categoryCache?.entries.delete(entry);
      },

      clearCategory: (state, action: PayloadAction<keyof CorrectFilters>) => {
        const category = action.payload;
        const categoryCache = entryCache.get(category);

        categoryCache?.entries.forEach((value, key) => {
          if (value === 'included') categoryCache?.entries.delete(key);
        });

        // eslint-disable-next-line no-param-reassign
        state[category].included = [];
      },

      // Overridden from base game filters reducer. We wan't to reset all variables excluding the sortBy filter.
      reset: (state) => {
        entryCache.forEach((e) => e.entries.clear());
        const oldState = state;
        return {
          ...defaultGameFilters,
          sortBy: oldState.sortBy,
        };
      },
    },
  });
};
