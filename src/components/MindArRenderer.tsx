import { type FC, useEffect, useRef } from "react";

import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";
import * as THREE from "three";
import { Box } from "@chakra-ui/react";
import { css } from "@emotion/react";

import dairi from "../assets/_dairi_fire.png";
import ayumu from "../assets/ayumu.png";
import ren from "../assets/ren.png";
import ruby from "../assets/ruby.png";

const rootStyle = css({
  position: "relative",
  width: "100%",
  height: "100%",
  "& video": {
    maxWidth: "unset",
  },
});

const loader = new THREE.TextureLoader();

const createMesh = async (src: string) => {
  const map = await loader.loadAsync(src);
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(),
    new THREE.MeshBasicMaterial({
      transparent: true,
      map,
    }),
  );
  return mesh;
};

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

    createMesh(dairi).then((mesh) => {
      mindArThree.addAnchor(0).group.add(mesh);
    });
    createMesh(ayumu).then((mesh) => {
      mindArThree.addAnchor(1).group.add(mesh);
    });
    createMesh(ren).then((mesh) => {
      mindArThree.addAnchor(2).group.add(mesh);
    });
    createMesh(ruby).then((mesh) => {
      mindArThree.addAnchor(3).group.add(mesh);
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
  }, []);

  return <Box css={rootStyle} ref={containerRef} />;
};

export default MindArRenderer;
