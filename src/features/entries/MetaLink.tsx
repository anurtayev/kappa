import { Characters } from "lib";
import { MouseEventHandler } from "react";
import {
  ContextMenuButton,
  ContextMenuButtonPane,
  ContexMenuPane,
} from "./styles";

type Params = {
  onClickMeta: MouseEventHandler<HTMLDivElement>;
};

export const MetaLink = ({ onClickMeta }: Params) => (
  <ContexMenuPane>
    <ContextMenuButtonPane>
      <ContextMenuButton onClick={onClickMeta}>
        {Characters.ellipsis}
      </ContextMenuButton>
    </ContextMenuButtonPane>
  </ContexMenuPane>
);
