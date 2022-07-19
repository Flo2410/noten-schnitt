import pino, { Level, levels } from "pino";
export const logger = pino();

export const log = (
  level: "error" | "warn" | "info" | "debug",
  method = "missing",
  path = "missing",
  status: number,
  start_time: number,
  end_time: number,
  etc?: Object
) => {
  let fun;
  switch (level) {
    case "debug":
      fun = logger.debug;
      break;
    case "error":
      fun = logger.error;
      break;
    case "info":
      fun = logger.info;
      break;
    case "warn":
      fun = logger.warn;
      break;
    default:
      fun = logger.info;
      break;
  }

  logger.info({
    ...{ method: method, path: path, status: status, duration: end_time - start_time },
    ...etc,
  });
};
