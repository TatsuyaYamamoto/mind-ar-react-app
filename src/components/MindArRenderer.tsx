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

const MindArRenderer: FC = () => {
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

    const anchor = mindArThree.addAnchor(0);
    const geometry = new THREE.PlaneGeometry(1, 0.55);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.5,
    });
    const plane = new THREE.Mesh(geometry, material);
    anchor.group.add(plane);

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
  }, []);

  return <Box css={rootStyle} ref={containerRef} />;
};

export default MindArRenderer;
