import { useAnimatedGLTF } from "./useAnimatedGLTF"

const LoveEmojiObj = ({ isActive }: { isActive: boolean }) => {
  const { scene, groupRef } = useAnimatedGLTF({
    glbPath: chrome.runtime.getURL("public/3d/love_emoji.glb"),
    isActive
  })

  return (
    <primitive
      ref={groupRef}
      object={scene}
      scale={groupRef.current?.scale}
      position={groupRef.current?.position}
      rotation={groupRef.current?.rotation}
    />
  )
}

export { LoveEmojiObj }
