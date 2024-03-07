import { GetGroupsResponse } from "../types";

export const getGroupsMock = (): Promise<GetGroupsResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      import("../mock/groups.json").then((module) => {
        resolve({
          result: 1,
          data: module.default,
        });
      });
    }, 1000);
  });
};
