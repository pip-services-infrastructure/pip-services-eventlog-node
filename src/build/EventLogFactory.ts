import { Factory } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';

import { EventLogMongoDbPersistence } from '../persistence/EventLogMongoDbPersistence';
import { EventLogFilePersistence } from '../persistence/EventLogFilePersistence';
import { EventLogMemoryPersistence } from '../persistence/EventLogMemoryPersistence';
import { EventLogController } from '../logic/EventLogController';
import { EventLogRestServiceV1 } from '../services/version1/EventLogRestServiceV1';
import { EventLogSenecaServiceV1 } from '../services/version1/EventLogSenecaServiceV1'; 

export class EventLogFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-eventlog", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("pip-services-eventlog", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("pip-services-eventlog", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("pip-services-eventlog", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-eventlog", "controller", "default", "*", "1.0");
	public static SenecaServiceDescriptor = new Descriptor("pip-services-eventlog", "service", "seneca", "*", "1.0");
	public static RestServiceDescriptor = new Descriptor("pip-services-eventlog", "service", "rest", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(EventLogFactory.MemoryPersistenceDescriptor, EventLogMemoryPersistence);
		this.registerAsType(EventLogFactory.FilePersistenceDescriptor, EventLogFilePersistence);
		this.registerAsType(EventLogFactory.MongoDbPersistenceDescriptor, EventLogMongoDbPersistence);
		this.registerAsType(EventLogFactory.ControllerDescriptor, EventLogController);
		this.registerAsType(EventLogFactory.SenecaServiceDescriptor, EventLogSenecaServiceV1);
		this.registerAsType(EventLogFactory.RestServiceDescriptor, EventLogRestServiceV1);
	}
	
}
