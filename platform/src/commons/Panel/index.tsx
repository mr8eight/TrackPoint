import { ReactNode } from "react";
import BasePanel from "./BasePanel";

export type BasePanelProps = {
  headerIcon?: ReactNode;
  headerText: string;
  items: ReactNode[];
};

export { BasePanel };
