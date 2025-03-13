import type { Meta, StoryObj } from "@nuxtjs/storybook";

import CButton from "./CButton.vue";

const meta = {
  title: "ui/CButton",
  component: CButton,
  tags: ["autodocs"],
} satisfies Meta<typeof CButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CButtonStory: Story = {
  args: {
    label: "Название кнопки",
    uiProps: {},
  },
};
