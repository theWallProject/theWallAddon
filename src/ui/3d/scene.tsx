import { Canvas } from "@react-three/fiber"
import React from "react"

import { LoveEmojiObj } from "./LoveEmojiObj"
import { ScreamEmojiObj } from "./ScreamEmojiObj"
import { WallObj } from "./WallObj"

const Scene = ({
  isSharing,
  isSkipping
}: {
  isSkipping: boolean
  isSharing: boolean
}) => {
  return (
    <Canvas fallback={<div>Sorry no WebGL supported!</div>}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      <WallObj />
      <LoveEmojiObj isActive={isSharing} />
      <ScreamEmojiObj isActive={isSkipping} />

      {/* <OrbitControls /> */}
    </Canvas>
  )
}

export { Scene }
