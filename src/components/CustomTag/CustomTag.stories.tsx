import type { Meta, StoryObj } from '@storybook/react';
import CustomTag from '.';

const meta = {
  title: 'UserGame/Tag',
  component: CustomTag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CustomTag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Action',
  },
};
