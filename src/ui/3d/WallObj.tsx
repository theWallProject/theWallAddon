import { useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { Group } from "three"

const INITIAL_X_ROTATION = 0 * (Math.PI / 180)
const INITIAL_Y_ROTATION = 90 * (Math.PI / 180)

const ROTATION_SENSITIVITY = 0.5
const ROTATION_SMOOTHING = 0.1
const MAX_ROTATION_Y = 0.2
const MAX_ROTATION_X = 0.2
// const SCALE_MULTIPLIER = 0.001

const WallObj = () => {
  const { scene } = useGLTF(chrome.runtime.getURL("public/3d/wall.glb"))
  const wallRef = useRef<Group>(null)
  const mousePosition = useRef({ x: 0, y: 0 })
  const lastRotation = useRef({ x: INITIAL_X_ROTATION, y: INITIAL_Y_ROTATION })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mousePosition.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useFrame(() => {
    if (wallRef.current) {
      const targetRotationY =
        INITIAL_Y_ROTATION + mousePosition.current.x * ROTATION_SENSITIVITY
      const targetRotationX =
        INITIAL_X_ROTATION - mousePosition.current.y * ROTATION_SENSITIVITY

      const smoothedRotationY =
        lastRotation.current.y +
        (targetRotationY - lastRotation.current.y) * ROTATION_SMOOTHING
      const smoothedRotationX =
        lastRotation.current.x +
        (targetRotationX - lastRotation.current.x) * ROTATION_SMOOTHING

      lastRotation.current.y = Math.max(
        INITIAL_Y_ROTATION - MAX_ROTATION_Y,
        Math.min(INITIAL_Y_ROTATION + MAX_ROTATION_Y, smoothedRotationY)
      )
      lastRotation.current.x = Math.max(
        INITIAL_X_ROTATION - MAX_ROTATION_X,
        Math.min(INITIAL_X_ROTATION + MAX_ROTATION_X, smoothedRotationX)
      )

      wallRef.current.rotation.y = lastRotation.current.y
      wallRef.current.rotation.x = lastRotation.current.x
    }
  })

  return (
    <primitive
      ref={wallRef}
      object={scene}
      position={[0, -2, 0]}
      // onClick={() => console.log("Wall clicked!")}
    />
  )
}

export { WallObj }
