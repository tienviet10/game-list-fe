import type { Meta, StoryObj } from '@storybook/react';
import { HeartOutlined } from '@ant-design/icons';
import CustomButton from '.';

const meta = {
  title: 'Login/AntButton',
  component: CustomButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CustomButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Default',
  },
};

export const ImageButton: StoryObj<typeof CustomButton> = {
  render: () => (
    <CustomButton buttonType="text">
      <img
        src="https://images.igdb.com/igdb/image/upload/t_cover_big/co1niz.jpg"
        alt="game"
      />
    </CustomButton>
  ),
};

export const IconButton: Story = {
  args: {
    icon: <HeartOutlined />,
  },
};
