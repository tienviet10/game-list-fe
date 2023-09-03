import type { Meta, StoryObj } from '@storybook/react';
import CustomSocialTab from '.';
import styles from './CustomSocialTab.module.scss';

const meta = {
  title: 'UserProfileSocial/CustomSelect',
  component: CustomSocialTab,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CustomSocialTab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotSelected: Story = {
  args: {
    text: 'Followings',
    activeStyle: '',
  },
};

export const Default: Story = {
  args: {
    text: 'Followings',
    activeStyle: styles.selected,
  },
};
