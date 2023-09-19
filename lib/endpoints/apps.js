export class Apps {
  #request;

  constructor(request) {
    this.#request = request;
  }

  async verifyCredentials() {
    const endpoint = "/api/v1/accounts/verify_credentials";

    return this.#request.getEndpoint(endpoint);
  }
}
