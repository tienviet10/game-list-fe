import type { Meta, StoryObj } from '@storybook/react';
import { DropDownOption } from '@constants/types';
import CustomSelect from '.';

const statusOptions: DropDownOption[] = [
  { label: 'Playing', value: 'Playing' },
  { label: 'Completed', value: 'Completed' },
  { label: 'Paused', value: 'Paused' },
  { label: 'Dropped', value: 'Dropped' },
  { label: 'Planning', value: 'Planning' },
];

const meta = {
  title: 'GameEditor/CustomSelect',
  component: CustomSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CustomSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Status',
    selectedChoice: 'Playing',
    optionsList: statusOptions,
    onPress: (value: string | number) => console.log(value),
  },
};
