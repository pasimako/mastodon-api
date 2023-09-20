export class Accounts {
  #request;

  constructor(request) {
    this.#request = request;
  }

  async getAccount(id) {
    const endpoint = `/api/v1/accounts/${id}`;

    return this.#request.getEndpoint(endpoint);
  }

  async getMutes(options = {}) {
    const endpoint = "/api/v1/mutes";

    return this.#request.getEndpointArray(endpoint, options);
  }

  async getBlocks(options = {}) {
    const endpoint = "/api/v1/blocks";

    return this.#request.getEndpointArray(endpoint, options);
  }

  async getStatuses(id, options = {}) {
    const endpoint = `/api/v1/accounts/${id}/statuses`;

    return this.#request.getEndpointArray(endpoint, options);
  }

  async getFollowing(id, options = {}) {
    const endpoint = `/api/v1/accounts/${id}/following`;

    return this.#request.getEndpointArray(endpoint, options);
  }

  async getFollowers(id, options = {}) {
    const endpoint = `/api/v1/accounts/${id}/followers`;

    return this.#request.getEndpointArray(endpoint, options);
  }

  async followAccount(id) {
    const endpoint = `/api/v1/accounts/${id}/follow`;

    const response = await this.#request.postEndpoint(endpoint);

    return response.json();
  }

  async unfollowAccount(id) {
    const endpoint = `/api/v1/accounts/${id}/unfollow`;

    const response = await this.#request.postEndpoint(endpoint);

    return response.json();
  }
}
