import BasePanel from "./BasePanel";

interface BasePanelCommonProps {
  headerIcon?: React.ReactNode;
  headerText: string;
}

interface BasePanelItemsProps extends BasePanelCommonProps {
  items: React.ReactNode[];
  children?: never;
}

interface BasePanelChildrenProps extends BasePanelCommonProps {
  items?: never;
  children: React.ReactNode;
}

export type BasePanelProps = BasePanelItemsProps | BasePanelChildrenProps;

export { BasePanel };
