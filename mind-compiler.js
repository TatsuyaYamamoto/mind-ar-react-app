#! /usr/bin/env node
import { writeFile } from "node:fs/promises";
import { OfflineCompiler } from "mind-ar/src/image-target/offline-compiler.js";
import { loadImage } from "canvas";

const [_node, _compileJs, ...filePaths] = process.argv;

const compiler = new OfflineCompiler();

const images = await Promise.all(
  filePaths.map((filePath, index) => {
    console.log(`image[${index}]: ${filePath}`);
    return loadImage(filePath);
  }),
);
await compiler.compileImageTargets(images, (progress) => {
  console.log("progress", progress);
});
const exportedBuffer = await compiler.exportData();

await writeFile("./public/data.mind", exportedBuffer);
