import { LoadingOutlined } from "@ant-design/icons";
import styled from "styled-components";

const Frame = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const Loading = () => {
  return (
    <Frame>
      <LoadingOutlined style={{ fontSize: "5rem" }} />
    </Frame>
  );
};
