import type { Meta, StoryObj } from '@storybook/react';
import DatePickerField from '.';

const meta = {
  title: 'GameEditor/DatePicker',
  component: DatePickerField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DatePickerField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: undefined,
    fieldName: 'Start',
    onChange: () => {},
  },
};
