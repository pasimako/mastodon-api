import { jest } from "@jest/globals";
import { Apps } from "../lib/endpoints/apps.js";

const mockedGetEndpoint = jest.fn(() => ({ test: "test" }));

jest.unstable_mockModule("../lib/request.js", () => ({
  Request: jest.fn(() => ({
    getEndpoint: mockedGetEndpoint,
  })),
}));

const { Request } = await import("../lib/request.js");

const request = new Request({});

describe("Apps", () => {
  const apps = new Apps(request);

  beforeEach(() => {
    mockedGetEndpoint.mockClear();
  });

  it("should verifyCredentials", async () => {
    await apps.verifyCredentials();
    expect(request.getEndpoint).toHaveBeenCalledTimes(1);
  });
});
