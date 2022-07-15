import { FC, ReactNode, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";

const Loading: FC<{ count?: number; cols: number }> = ({ count = 1, cols }) => {
  let arr: Array<ReactNode> = [];

  for (let i = 0; i < cols; i++) {
    arr.push(
      <td>
        <Skeleton count={count} />
      </td>
    );
  }

  return (
    <SkeletonTheme baseColor="#344981" highlightColor="#969FBB">
      <tr className="dark:bg-opacity-50 even:bg-primary/5 dark:even:bg-white/10">
        {arr.map((skel) => skel)}
      </tr>
    </SkeletonTheme>
  );
};

export default Loading;
