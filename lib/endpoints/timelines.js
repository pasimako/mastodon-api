export class Timelines {
  #request;

  constructor(request) {
    this.#request = request;
  }

  async getStatusesByHashtag(hashtag, options = {}) {
    const endpoint = `/api/v1/timelines/tag/${hashtag}`;

    return this.#request.getEndpointArray(endpoint, options);
  }

  async getLists(options = {}) {
    const endpoint = "/api/v1/lists";

    return this.#request.getEndpointArray(endpoint, options);
  }

  async getListAccounts(id, options = {}) {
    const endpoint = `/api/v1/lists/${id}/accounts`;

    return this.#request.getEndpointArray(endpoint, options);
  }
}
