import { type FC, useEffect, useRef } from "react";

import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";
import * as THREE from "three";
import { Box } from "@chakra-ui/react";
import { css } from "@emotion/react";

const rootStyle = css({
  position: "relative",
  width: "100%",
  height: "100%",
  "& video": {
    maxWidth: "unset",
  },
});

interface Props {
  anchors: {
    index: number;
    meshes: THREE.Mesh[];
  }[];
}

const MindArRenderer: FC<Props> = ({ anchors }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = document.createElement("div");
    wrapper.style.width = "inherit";
    wrapper.style.height = "inherit";

    const mindArThree = new MindARThree({
      container: wrapper,
      imageTargetSrc: "/data.mind",
      uiScanning: "no",
      uiLoading: "no",
    });

    anchors.map((anchor) => {
      mindArThree.addAnchor(anchor.index).group.add(...anchor.meshes);
    });

    const { renderer, scene, camera } = mindArThree;
    const startPromise = mindArThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });

    containerRef.current?.append(wrapper);

    return () => {
      renderer.setAnimationLoop(null);
      startPromise.then(() => {
        mindArThree.stop();
        wrapper.remove();
      });
    };
  }, [anchors]);

  return <Box css={rootStyle} ref={containerRef} />;
};

export default MindArRenderer;
