import { jest } from "@jest/globals";
import { Statuses } from "../lib/endpoints/statuses.js";

const mockedGetEndpoint = jest.fn(() => ({ test: "test" }));
const mockedGetEndpointArray = jest.fn(() => [{ test: "test" }]);

jest.unstable_mockModule("../lib/request.js", () => ({
  Request: jest.fn(() => ({
    getEndpoint: mockedGetEndpoint,
    getEndpointArray: mockedGetEndpointArray,
  })),
}));

const { Request } = await import("../lib/request.js");

const request = new Request({});

describe("Statuses", () => {
  const statuses = new Statuses(request);
  const id = "123";
  const options = { test: "test" };

  beforeEach(() => {
    mockedGetEndpoint.mockClear();
    mockedGetEndpointArray.mockClear();
  });

  it("should getStatus", async () => {
    await statuses.getStatus(id);
    expect(request.getEndpoint).toHaveBeenCalledTimes(1);
    expect(request.getEndpoint).toHaveBeenCalledWith(`/api/v1/statuses/${id}`);
  });

  it("should getRebloggedBy", async () => {
    await statuses.getRebloggedBy(id, options);
    expect(request.getEndpointArray).toHaveBeenCalledTimes(1);
    expect(request.getEndpointArray).toHaveBeenCalledWith(
      `/api/v1/statuses/${id}/reblogged_by`,
      options,
    );
  });

  it("should getFavouritedBy", async () => {
    await statuses.getFavouritedBy(id, options);
    expect(request.getEndpointArray).toHaveBeenCalledTimes(1);
    expect(request.getEndpointArray).toHaveBeenCalledWith(
      `/api/v1/statuses/${id}/favourited_by`,
      options,
    );
  });

  it("should getContext", async () => {
    await statuses.getContext(id);
    expect(request.getEndpoint).toHaveBeenCalledTimes(1);
    expect(request.getEndpoint).toHaveBeenCalledWith(
      `/api/v1/statuses/${id}/context`,
    );
  });
});
