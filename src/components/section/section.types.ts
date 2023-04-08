import { ReactNode } from "react";

import { BoxLayout } from "../layout";

export interface SectionProps extends BoxLayout {
  title: string;
  content: ReactNode;
}
