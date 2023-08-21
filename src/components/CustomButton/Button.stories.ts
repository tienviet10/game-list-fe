import type { Meta, StoryObj } from '@storybook/react';
import Button from '.';

const meta = {
  title: 'Login/AntButton',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Default',
  },
};
