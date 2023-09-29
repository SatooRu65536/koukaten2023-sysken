import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styles from "@/styles/Congestion.module.scss";
import Room from "@/components/ui/area/area";
import { useStaycount } from "@/hooks/useStaycount";
import { useLocalStorage } from "@mantine/hooks";
import { useHistories } from "@/hooks/useHistories";

export default function CongestionComponent() {
  const [_, { init }] = useHistories();
  const [areaId, setAreaId] = useState<undefined | string>(undefined);
  const staycounts = useStaycount();
  const [stars, setStars] = useLocalStorage<string[]>({
    key: "stars",
    defaultValue: [],
  });
  const router = useRouter();
  const mounted = useRef(false);

  function addStar(areaId: string) {
    setStars((s) => [...s, areaId]);
  }

  function removeStar(areaId: string) {
    setStars((s) => s.filter((star) => star !== areaId));
  }

  useEffect(() => {
    if (!mounted.current) {
      void init();
      mounted.current = true;
    }
  }, [init]);

  useEffect(() => {
    if (router.isReady) {
      setAreaId(router.query.areaId as string);
    }
  }, [router]);

  useEffect(() => {
    if (areaId) {
      document.getElementById(areaId)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [areaId]);

  return (
    <div className={styles.congestion}>
      {staycounts.map((staycount) => (
        <div key={staycount.building}>
          <h2 className={styles.building_name}>{staycount.building}</h2>

          <div className={styles.building} key={staycount.building}>
            {staycount.floors.map((floor) =>
              floor.areas.map((area) => {
                return (
                  <Room
                    key={area.name}
                    id={area.id}
                    name={area.name}
                    building={staycount.building}
                    staycount={area.staycount}
                    isSelect={areaId === area.id.toString()}
                    isStar={stars.includes(area.id.toString())}
                    addStar={addStar}
                    removeStar={removeStar}
                  />
                );
              })
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
