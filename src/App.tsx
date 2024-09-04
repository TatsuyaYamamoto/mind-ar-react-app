import { type FC } from "react";
import { Box } from "@chakra-ui/react";
import { css, Global } from "@emotion/react";

import MindArRenderer from "./components/MindArRenderer.tsx";

const App: FC = () => {
  return (
    <>
      <Global
        styles={css`
          html,
          body,
          div#root {
            height: 100%;
          }
        `}
      />
      <Box
        position="relative"
        height="100%"
        width="100%"
        display="flex"
        justifyContent="center"
      >
        <Box height="100%" width="100%" overflow="hidden">
          <MindArRenderer />
        </Box>
      </Box>
    </>
  );
};

export default App;
