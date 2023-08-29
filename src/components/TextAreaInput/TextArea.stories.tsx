import type { Meta, StoryObj } from '@storybook/react';
import TextAreaInput from '.';

const meta = {
  title: 'GameEditor/TextInputArea',
  component: TextAreaInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TextAreaInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MinRow: Story = {
  args: {
    defaultValue: 'Default Notes',
    fieldName: 'Notes',
    minRows: 3,
  },
};

export const AutoRow: Story = {
  args: {
    defaultValue: 'Default Notes',
    fieldName: 'Notes',
  },
};
