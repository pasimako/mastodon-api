import { jest } from "@jest/globals";
import { Accounts } from "../lib/endpoints/accounts.js";

const mockedGetEndpoint = jest.fn(() => ({ test: "test" }));
const mockedGetEndpointArray = jest.fn(() => [{ test: "test" }]);
const mockedPostEndpoint = jest.fn(() => ({ json: jest.fn() }));

jest.unstable_mockModule("../lib/request.js", () => ({
  Request: jest.fn(() => ({
    getEndpoint: mockedGetEndpoint,
    getEndpointArray: mockedGetEndpointArray,
    postEndpoint: mockedPostEndpoint,
  })),
}));

const { Request } = await import("../lib/request.js");

const request = new Request({});

describe("Accounts", () => {
  const accounts = new Accounts(request);
  const id = "123";
  const options = { test: "test" };

  beforeEach(() => {
    mockedGetEndpoint.mockClear();
    mockedGetEndpointArray.mockClear();
    mockedPostEndpoint.mockClear();
  });

  it("should getAccount", async () => {
    await accounts.getAccount(id);
    expect(request.getEndpoint).toHaveBeenCalledTimes(1);
    expect(request.getEndpoint).toHaveBeenCalledWith(`/api/v1/accounts/${id}`);
  });

  it("should getMutes", async () => {
    await accounts.getMutes(options);
    expect(request.getEndpointArray).toHaveBeenCalledTimes(1);
    expect(request.getEndpointArray).toHaveBeenCalledWith(
      "/api/v1/mutes",
      options,
    );
  });

  it("should getBlocks", async () => {
    await accounts.getBlocks(options);
    expect(request.getEndpointArray).toHaveBeenCalledTimes(1);
    expect(request.getEndpointArray).toHaveBeenCalledWith(
      "/api/v1/blocks",
      options,
    );
  });

  it("should getFollowing", async () => {
    await accounts.getFollowing(id, options);
    expect(request.getEndpointArray).toHaveBeenCalledTimes(1);
    expect(request.getEndpointArray).toHaveBeenCalledWith(
      `/api/v1/accounts/${id}/following`,
      options,
    );
  });

  it("should getFollowers", async () => {
    await accounts.getFollowers(id, options);
    expect(request.getEndpointArray).toHaveBeenCalledTimes(1);
    expect(request.getEndpointArray).toHaveBeenCalledWith(
      `/api/v1/accounts/${id}/followers`,
      options,
    );
  });

  it("should followAccount", async () => {
    await accounts.followAccount(id);
    expect(request.postEndpoint).toHaveBeenCalledTimes(1);
    expect(request.postEndpoint).toHaveBeenCalledWith(
      `/api/v1/accounts/${id}/follow`,
    );
  });

  it("should unfollowAccount", async () => {
    await accounts.unfollowAccount(id);
    expect(request.postEndpoint).toHaveBeenCalledTimes(1);
    expect(request.postEndpoint).toHaveBeenCalledWith(
      `/api/v1/accounts/${id}/unfollow`,
    );
  });
});
