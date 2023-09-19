import { URL } from "node:url";
import fetch from "node-fetch";

import { REQUEST_RATE_LIMIT } from "./config.js";
import { sleep } from "./utils.js";
import { RequestError } from "./errors.js";

export class Request {
  #accessToken;
  #instanceURL;
  #verbose;
  #lastRequest = Date.now();

  constructor({ accessToken, instanceURL, verbose = false }) {
    this.#accessToken = accessToken;
    this.#instanceURL = instanceURL;
    this.#verbose = verbose;
  }

  async getEndpoint(endpoint) {
    const url = this.buildEndpointUrl(endpoint);
    const response = await this.get(url);

    return response.json();
  }

  async getEndpointArray(endpoint, options = {}) {
    const { maxPages = -1 } = options;
    const result = [];

    let url = this.buildEndpointUrl(endpoint);
    let page = 0;

    do {
      page++;

      if (maxPages > 0 && page > maxPages) {
        break;
      }

      const response = await this.get(url);
      const data = await response.json();

      result.push.apply(result, data);

      const nextUrl = Request.extractNextLink(response);

      if (nextUrl === url) {
        // Abort if next page URL did not change
        break;
      }

      url = nextUrl;
    } while (url);

    return result;
  }

  async get(url) {
    this.log(`GET ${url}`);

    await this.rateLimit();

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.#accessToken}`,
      },
    });

    this.#lastRequest = Date.now();

    if (!response.ok) {
      throw new RequestError(
        `Failed to GET ${url} (status=${response.status})`,
      );
    }

    return response;
  }

  async postEndpoint(endpoint, body = {}) {
    let url = this.buildEndpointUrl(endpoint);

    return this.post(url, body);
  }

  async post(url, body = {}) {
    this.log(`POST ${url}`);

    await this.rateLimit();

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.#accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    this.#lastRequest = Date.now();

    if (!response.ok) {
      throw new RequestError(
        `Failed to POST ${url} (status=${response.status})`,
      );
    }

    return response;
  }

  async rateLimit() {
    const delay = REQUEST_RATE_LIMIT - (Date.now() - this.#lastRequest);

    if (delay > 0) {
      await sleep(delay);
    }
  }

  buildEndpointUrl(endpoint) {
    const url = new URL(endpoint, this.#instanceURL);

    return url.toString();
  }

  log(message) {
    if (this.#verbose) {
      console.info(message);
    }
  }

  static extractNextLink(response) {
    const linkHeader = response.headers?.get("link");

    return linkHeader?.match(/^<(https:\/\/.*?)>; rel="next"/)?.[1];
  }
}
