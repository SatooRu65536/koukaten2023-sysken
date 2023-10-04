import styles from "@/styles/Builds.module.scss";
import { useRouter } from "next/router";
import { getStyle, round } from "../util/util";
import { useCongestion } from "@/hooks/useCongestion";
import _ from "lodash";

export default function Builds() {
  const congestions = useCongestion();
  const router = useRouter();

  return (
    <div className={styles.builds}>
      {congestions.map((congestion) => (
        <div className={styles.build} key={congestion.building}>
          <div
            className={styles.image_container}
            style={{
              ["--width-ratio" as string]: getStyle(congestion.building)
                .widthRatio,
              backgroundImage: `url(/images/${congestion.building}.png)`,
            }}
          ></div>

          <div
            className={styles.selecter}
            style={{
              paddingBottom: `${getStyle(congestion.building).bottomSpace}px`,
            }}
          >
            {congestion.floors.map((floor) => (
              <div
                className={styles.areas}
                style={{ marginTop: `${getStyle(congestion.building).gap}px` }}
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
                    {area.name}{" : "}
                    <span className={styles.congestion}>
                      {round(area.congestion)}%
                    </span>
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
