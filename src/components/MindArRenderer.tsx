import { type FC, useEffect, useRef } from "react";

import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";
import * as THREE from "three";

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
    wrapper.style.width = "100%";
    wrapper.style.height = "100%";

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

  return <div style={{ display: "contents" }} ref={containerRef} />;
};

export default MindArRenderer;
