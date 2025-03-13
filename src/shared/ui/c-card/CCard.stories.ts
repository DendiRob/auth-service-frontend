import type { Meta, StoryObj } from "@nuxtjs/storybook";

import CCard from "./CCard.vue";

const meta = {
  title: "ui/CCard",
  component: CCard,
  tags: ["autodocs"],
} satisfies Meta<typeof CCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CCardStory: Story = {
  args: {
    uiProps: {},
  },
};
