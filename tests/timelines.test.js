import { jest } from "@jest/globals";
import { Timelines } from "../lib/endpoints/timelines.js";

const mockedGetEndpointArray = jest.fn(() => [{ test: "test" }]);

jest.unstable_mockModule("../lib/request.js", () => ({
  Request: jest.fn(() => ({
    getEndpointArray: mockedGetEndpointArray,
  })),
}));

const { Request } = await import("../lib/request.js");

const request = new Request({});

describe("Timelines", () => {
  const timelines = new Timelines(request);
  const id = "123";
  const hashtag = "456";
  const options = { test: "test" };

  beforeEach(() => {
    mockedGetEndpointArray.mockClear();
  });

  it("should getStatusesByHashtag", async () => {
    await timelines.getStatusesByHashtag(hashtag, options);
    expect(request.getEndpointArray).toHaveBeenCalledTimes(1);
    expect(request.getEndpointArray).toHaveBeenCalledWith(
      `/api/v1/timelines/tag/${hashtag}`,
      options,
    );
  });

  it("should getLists", async () => {
    await timelines.getLists(options);
    expect(request.getEndpointArray).toHaveBeenCalledTimes(1);
    expect(request.getEndpointArray).toHaveBeenCalledWith(
      "/api/v1/lists",
      options,
    );
  });

  it("should getListAccounts", async () => {
    await timelines.getListAccounts(id, options);
    expect(request.getEndpointArray).toHaveBeenCalledTimes(1);
    expect(request.getEndpointArray).toHaveBeenCalledWith(
      `/api/v1/lists/${id}/accounts`,
      options,
    );
  });
});
