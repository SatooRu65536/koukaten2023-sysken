import styles from "@/styles/Builds.module.scss";
import { useRouter } from "next/router";
import { getStyle } from "../util/util";
import { useStaycount } from "@/hooks/useStaycount";
import _ from "lodash";
import { useEffect } from "react";

export default function Builds() {
  const staycounts = useStaycount();
  const router = useRouter();

  return (
    <div className={styles.builds}>
      {staycounts.map((staycount) => (
        <div className={styles.build} key={staycount.building}>
          <div
            className={styles.image_container}
            style={{
              ["--width-ratio" as string]: getStyle(staycount.building)
                .widthRatio,
              backgroundImage: `url(/images/${staycount.building}.png)`,
            }}
          ></div>

          <div
            className={styles.selecter}
            style={{
              paddingBottom: `${getStyle(staycount.building).bottomSpace}px`,
            }}
          >
            {staycount.floors.map((floor) => (
              <div
                className={styles.areas}
                style={{ marginTop: `${getStyle(staycount.building).gap}px` }}
                key={floor.floor}
              >
                <h2 className={styles.area_name}>{floor.floor}F</h2>

                {floor.areas.map((area) => (
                  <span
                    className={styles.area}
                    onClick={() =>
                      router.push({
                        pathname: "/congestion",
                        query: { areaId: `${area.id}` },
                      })
                    }
                    key={area.name}
                  >
                    {area.name}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
