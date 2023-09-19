import { Accounts } from "./endpoints/accounts.js";
import { Apps } from "./endpoints/apps.js";
import { Timelines } from "./endpoints/timelines.js";
import { Request } from "./request.js";

export class API {
  accounts;
  apps;
  timelines;

  constructor({ accessToken, instanceURL, verbose }) {
    const request = new Request({ accessToken, instanceURL, verbose });

    this.accounts = new Accounts(request);
    this.apps = new Apps(request);
    this.timelines = new Timelines(request);
  }
}
