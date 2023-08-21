import type { Meta, StoryObj } from '@storybook/react';
import FormItem from '.';

const meta = {
  title: 'Login/AntFormInputItem',
  component: FormItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FormItem>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Normal input for all cases
 */
export const Default: Story = {
  args: {
    name: 'username',
    rules: [
      {
        required: true,
        message: 'Please input your username!',
        whitespace: true,
      },
    ],
    placeholder: 'username',
  },
};

/**
 * Password input hide characters
 */
export const Password: Story = {
  args: {
    name: 'password',
    rules: [
      { required: true, message: 'Please input your password!' },
      {
        min: 8,
        message: 'Password must be at least 8 characters long',
      },
    ],
    placeholder: 'password',
  },
};
