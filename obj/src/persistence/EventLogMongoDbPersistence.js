"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let os = require('os');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_data_node_1 = require("pip-services-data-node");
const SystemEventMongoDbSchema_1 = require("./SystemEventMongoDbSchema");
class EventLogMongoDbPersistence extends pip_services_data_node_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('event_log', SystemEventMongoDbSchema_1.SystemEventMongoDbSchema());
    }
    composeFilter(filter) {
        filter = filter || new pip_services_commons_node_1.FilterParams();
        let criteria = [];
        let search = filter.getAsNullableString('search');
        if (search != null) {
            let searchRegex = new RegExp(search, "i");
            criteria.push({ source: { $regex: searchRegex } });
            criteria.push({ type: { $regex: searchRegex } });
            criteria.push({ message: { $regex: searchRegex } });
        }
        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });
        let correlationId = filter.getAsNullableString('correlation_id');
        if (correlationId != null)
            criteria.push({ correlation_id: correlationId });
        let source = filter.getAsNullableString('source');
        if (source != null)
            criteria.push({ source: source });
        let type = filter.getAsNullableString('type');
        if (type != null)
            criteria.push({ type: type });
        let minSeverity = filter.getAsNullableInteger('min_severity');
        if (minSeverity != null)
            criteria.push({ severity: { $gte: minSeverity } });
        let fromTime = filter.getAsNullableDateTime('from_time');
        if (fromTime != null)
            criteria.push({ time: { $gte: fromTime } });
        let toTime = filter.getAsNullableDateTime('to_time');
        if (toTime != null)
            criteria.push({ time: { $lt: toTime } });
        return { $and: criteria };
    }
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, '-time', null, callback);
    }
}
exports.EventLogMongoDbPersistence = EventLogMongoDbPersistence;
//# sourceMappingURL=EventLogMongoDbPersistence.js.map