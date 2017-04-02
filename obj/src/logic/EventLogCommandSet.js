"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
class EventLogCommandSet extends pip_services_commons_node_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetEventsCommand());
        this.addCommand(this.makeLogEventCommand());
    }
    makeGetEventsCommand() {
        return new pip_services_commons_node_2.Command("get_events", null, (correlationId, args, callback) => {
            let filter = pip_services_commons_node_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services_commons_node_4.PagingParams.fromValue(args.get("paging"));
            this._logic.getEvents(correlationId, filter, paging, callback);
        });
    }
    makeLogEventCommand() {
        return new pip_services_commons_node_2.Command("log_event", null, (correlationId, args, callback) => {
            let event = args.get("event");
            this._logic.logEvent(correlationId, event, callback);
        });
    }
}
exports.EventLogCommandSet = EventLogCommandSet;
//# sourceMappingURL=EventLogCommandSet.js.map