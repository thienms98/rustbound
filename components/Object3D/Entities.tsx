import { Entity, EntityMap } from "@/types/entity";
import { RigidBody } from "@react-three/rapier";

interface EntityManagerProps {
  entities: EntityMap;
}

const ENTITY_CONFIG = {
  tree: { color: "darkgreen", geometry: "cylinder" },
  rock: { color: "gray", geometry: "dodecahedron" },
  crop: { color: "lightgreen", geometry: "box" },
  building: { color: "orange", geometry: "box" },
  machine: { color: "red", geometry: "box" }
};

const EntityItem = ({ entity }: { entity: Entity }) => {
  const { type, position, size } = entity;
  const config = ENTITY_CONFIG[type];

  // Tính toán kích thước (mặc định là 1x1x1)
  const w = size?.width || 1;
  const h = size?.height || 1; // Ở đây height là chiều sâu (z) trong hệ tọa độ của bạn
  const visualHeight = type === "tree" ? 2 : 1; // Chiều cao thực tế trục Y

  // Tính toán vị trí tâm (Center)
  // Vì trong R3F, mesh mặc định có pivot ở tâm,
  // ta cần dịch chuyển để nó khớp với ô Grid nếu size > 1
  const posX = position.x + (w - 1) / 2;
  const posZ = position.z + (h - 1) / 2;
  const posY = visualHeight / 2; // Đẩy lên để chân chạm đất

  return (
    <RigidBody
      type="fixed"
      colliders="cuboid"
      position={[posX, posY, posZ]}
      key={entity.id}
    >
      <mesh castShadow receiveShadow>
        {type === "tree" ? (
          <cylinderGeometry args={[0.2, 0.4, visualHeight]} />
        ) : type === "rock" ? (
          <dodecahedronGeometry args={[0.5]} />
        ) : (
          <boxGeometry args={[w, visualHeight, h]} />
        )}
        <meshStandardMaterial color={config.color} />
      </mesh>
    </RigidBody>
  );
};

export const EntityManager = ({ entities }: EntityManagerProps) => {
  return (
    <group>
      {Object.values(entities).map((entity) => (
        <EntityItem key={entity.id} entity={entity} />
      ))}
    </group>
  );
};
