import { fetchCongestion, fetchStaycount } from "@/components/api/api";
import { congestionState } from "@/components/recoil/state";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import _ from "lodash";

export function useCongestion() {
  const [congestion, setCongestion] = useRecoilState(congestionState);
  const mounted = useRef(false);

  useEffect(() => {
    (async () => {
      if (!mounted.current) {
        const tmpRes = await fetchCongestion();
        const res = _.cloneDeep(tmpRes);

        if (res === null) return;
        res.congestions = _.sortBy(res.congestions, "building");
        res.congestions.forEach((building) => {
          building.floors = _.sortBy(building.floors, "floor");
          building.floors.forEach((floor) => {
            floor.areas = _.sortBy(floor.areas, "name");
          });
        });

        setCongestion(res.congestions);
        mounted.current = true;
      }
    })();
  }, [setCongestion]);

  return congestion;
}
