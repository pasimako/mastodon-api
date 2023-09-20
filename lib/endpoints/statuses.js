export class Statuses {
  #request;

  constructor(request) {
    this.#request = request;
  }

  async getStatus(id) {
    const endpoint = `/api/v1/statuses/${id}`;

    return this.#request.getEndpoint(endpoint);
  }

  async getRebloggedBy(id, options = {}) {
    const endpoint = `/api/v1/statuses/${id}/reblogged_by`;

    return this.#request.getEndpointArray(endpoint, options);
  }

  async getFavouritedBy(id, options = {}) {
    const endpoint = `/api/v1/statuses/${id}/favourited_by`;

    return this.#request.getEndpointArray(endpoint, options);
  }

  async getContext(id) {
    const endpoint = `/api/v1/statuses/${id}/context`;

    return this.#request.getEndpoint(endpoint);
  }
}
