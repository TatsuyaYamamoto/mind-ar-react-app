import { type FC, useMemo } from "react";
import { Box } from "@chakra-ui/react";
import { css, Global } from "@emotion/react";

import MindArRenderer from "./components/MindArRenderer.tsx";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

import dairiPng from "./assets/_dairi_fire.png";
import ayumuPng from "./assets/ayumu.png";
import renPng from "./assets/ren.png";
import rubyPng from "./assets/ruby.png";
import { createMesh } from "./utils.ts";

const App: FC = () => {
  const dairiTexture = useLoader(THREE.TextureLoader, dairiPng);
  const ayumuTexture = useLoader(THREE.TextureLoader, ayumuPng);
  const renTexture = useLoader(THREE.TextureLoader, renPng);
  const rubyTexture = useLoader(THREE.TextureLoader, rubyPng);
  const anchors = useMemo(
    () => [
      {
        index: 0,
        meshes: [createMesh(dairiTexture)],
      },
      {
        index: 1,
        meshes: [createMesh(ayumuTexture)],
      },
      {
        index: 2,
        meshes: [createMesh(renTexture)],
      },
      {
        index: 3,
        meshes: [createMesh(rubyTexture)],
      },
    ],
    [dairiTexture, ayumuTexture, renTexture, rubyTexture],
  );

  return (
    <>
      <Global
        styles={css`
          body {
            margin: 0;
          }

          html,
          body,
          div#root {
            height: 100%;
          }
        `}
      />
      <Box position="relative" height="100%" width="100%" overflow="hidden">
        <MindArRenderer anchors={anchors} />
      </Box>
    </>
  );
};

export default App;
