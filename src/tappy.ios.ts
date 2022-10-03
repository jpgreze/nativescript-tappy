import { Common, LockingMode, TappyBleScannerStatus, TappyStatus } from './tappy.common';

// definitions

declare const enum BasicNFCCommandCode {
	Stop = 0,
	GetCommandFamilyVersion = 255,
	LockTag = 8,
	StreamTag = 1,
	ScanTag = 2,
	StreamNDEFMessage = 3,
	ScanNDEFMessage = 4,
	WriteURIRecord = 5,
	WriteTextRecord = 6,
	WriteCustomMessage = 7,
	StreamTagDispatch = 12,
	SingleTagDispatch = 15,
	DetectTagUIDWithRestriction = 13,
	StreamTagUIDWithRestriction = 14,
	StartAutoPolling = 16,
	EmulateURIRecord = 10,
	EmulateTextRecord = 9,
	EmulateCustomNDEFRecord = 11
};

declare const enum BasicNFCErrorCode {
	InvalidParameter = 1,
	ReservedForFutureUse = 2,
	PollingError = 3,
	TooFewParameters = 4,
	NdefMessageExceedsTagStorage = 5,
	ErrorCreatingNDEFContent = 6,
	ErrorWritingNDEFDataToTag = 7,
	ErrorLockingTag = 8,
	UnsupportedCommandCode = 9
}

declare const enum BasicNFCResponseCode {
	TagFound = 1,
	NdefFound = 2,
	Timeout = 3,
	CommandFamilyVersion = 4,
	TagWritten = 5,
	FirmwareVersion = 6,
	AutoPollingTagEntry = 12,
	AutoPollingTagExit = 13,
	EmulationSuccess = 7,
	EmulationStopped = 8,
	Error = 127
};

declare const enum TnfFormatCode {
	TNF_EMPTY = 0,
    TNF_WELL_KNOWN = 0x01,
    TNF_MEDIA = 0x02,
    TNF_ABSOLUTE_URI = 0x03,
    TNF_EXTERNAL = 0x04,
    TNF_UNKNOWN = 0x05,
    TNF_UNCHANGED = 0x06,
    TNF_RESERVED = 0x07,
};

declare class BasicNFCCommandResolver extends NSObject {
	static alloc(): BasicNFCCommandResolver; // inherited from NSObject
	static new(): BasicNFCCommandResolver; // inherited from NSObject
	public FAMILY_ID: NSArray<number>;
	resolveCommandWithMessageError(message: TCMPMessage): TCMPMessage;
	resolveResponseWithMessageError(message: TCMPMessage): TCMPMessage;
	// getNdefTextPayloadJSONWithNdefResponse(ndefResponse: NDEFFoundResponse): string;
}

declare class BasicNfcApplicationErrorMessage extends NSObject implements TCMPMessage {
	static alloc(): BasicNfcApplicationErrorMessage; // inherited from NSObject
	static new(): BasicNfcApplicationErrorMessage; // inherited from NSObject
	public appErrorCode: number;
	public errorDescription: string;
	public internalErrorCode: number;
	public readerStatusCode: number;
	public commandCode: number; // inherited from TCMPMessage
	public commandFamily: NSArray<number>; // inherited from TCMPMessage
	public payload: NSArray<number>; // inherited from TCMPMessage
	parsePayloadWithPayloadError(payload: NSArray<number>): boolean;
}

declare class HDLCParseResult extends NSObject {
	static alloc(): HDLCParseResult; // inherited from NSObject
	static new(): HDLCParseResult; // inherited from NSObject
	constructor(o: { bytes: NSArray<number> | number[]; packets: NSArray<NSArray<number>> | NSArray<number>[]; remainder: NSArray<number> | number[]; });
	getBytes(): NSArray<number>;
	getPackets(): NSArray<NSArray<number>>;
	getRemainder(): NSArray<number>;
	initWithBytesPacketsRemainder(bytes: NSArray<number> | number[], packets: NSArray<NSArray<number>> | NSArray<number>[], remainder: NSArray<number> | number[]): this;
}

declare class NDEFFoundResponse extends NSObject implements TCMPMessage {
	static alloc(): NDEFFoundResponse; // inherited from NSObject
	static new(): NDEFFoundResponse; // inherited from NSObject
	public ndefMessage: NSArray<number>;
	public tagCode: NSArray<number>;
	public tagType: TagTypes;
	public commandCode: number; // inherited from TCMPMessage
	public commandFamily: NSArray<number>; // inherited from TCMPMessage
	public payload: NSArray<number>; // inherited from TCMPMessage
	constructor(o: { tagCode: NSArray<number> | number[]; tagType: number; ndefMessage: NSArray<number> | number[]; });
	initWithTagCodeTagTypeNdefMessage(tagCode: NSArray<number> | number[], tagType: number, ndefMessage: NSArray<number> | number[]): this;
	parsePayloadWithPayloadError(payload: NSArray<number> | number[]): boolean;
}

declare const enum PollingMode {
	PollForType1 = 1,
	PollForGeneral = 2
}

declare class RawTCMPMesssage extends NSObject implements TCMPMessage {
	static alloc(): RawTCMPMesssage; // inherited from NSObject
	static new(): RawTCMPMesssage; // inherited from NSObject
	public commandCode: number; // inherited from TCMPMessage
	public commandFamily: NSArray<number>; // inherited from TCMPMessage
	public payload: NSArray<number>; // inherited from TCMPMessage
	constructor(o: { commandCode: number; commandFamily: NSArray<number> | number[]; payload: NSArray<number> | number[]; });
	constructor(o: { message: NSArray<number> | number[]; });
	initWithCommandCodeCommandFamilyPayload(commandCode: number, commandFamily: NSArray<number> | number[], payload: NSArray<number> | number[]): this;
	initWithMessageError(message: NSArray<number> | number[]): this;
	parsePayloadWithPayloadError(payload: NSArray<number> | number[]): boolean;
}

declare class ScanNDEFCommand extends NSObject implements TCMPMessage {
	static alloc(): ScanNDEFCommand; // inherited from NSObject
	static getCommandCode(): number;
	static new(): ScanNDEFCommand; // inherited from NSObject
	public pollingMode: PollingMode;
	public timeout: number;
	public commandCode: number; // inherited from TCMPMessage
	public commandFamily: NSArray<number>; // inherited from TCMPMessage
	public payload: NSArray<number>; // inherited from TCMPMessage
	constructor(o: { timeout: number; pollingMode: PollingMode; });
	initWithPayloadError(payload: NSArray<number> | number[]): this;
	initWithTimeoutPollingMode(timeout: number, pollingMode: PollingMode): this;
	parsePayloadWithPayloadError(payload: NSArray<number> | number[]): boolean;
}

declare class ScanTagCommand extends NSObject implements TCMPMessage {
	static alloc(): ScanTagCommand; // inherited from NSObject
	static getCommandCode(): number;
	static new(): ScanTagCommand; // inherited from NSObject
	public pollingMode: PollingMode;
	public timeout: number;
	public commandCode: number; // inherited from TCMPMessage
	public commandFamily: NSArray<number>; // inherited from TCMPMessage
	public payload: NSArray<number>; // inherited from TCMPMessage
	constructor(o: { timeout: number; pollingMode: PollingMode; });
	initWithPayloadError(payload: NSArray<number> | number[]): this;
	initWithTimeoutPollingMode(timeout: number, pollingMode: PollingMode): this;
	parsePayloadWithPayloadError(payload: NSArray<number> | number[]): boolean;
}

declare class StreamTagCommand extends NSObject implements TCMPMessage {
	static alloc(): StreamTagCommand; // inherited from NSObject
	static getCommandCode(): number;
	static new(): StreamTagCommand; // inherited from NSObject
	public pollingMode: PollingMode;
	public timeout: number;
	public commandCode: number; // inherited from TCMPMessage
	public commandFamily: NSArray<number>; // inherited from TCMPMessage
	public payload: NSArray<number>; // inherited from TCMPMessage
	constructor(o: { timeout: number; pollingMode: PollingMode; });
	initWithPayloadError(payload: NSArray<number> | number[]): this;
	initWithTimeoutPollingMode(timeout: number, pollingMode: PollingMode): this;
	parsePayloadWithPayloadError(payload: NSArray<number> | number[]): boolean;
}

declare class GetFirmwareVersionCommand extends NSObject implements TCMPMessage {
	static alloc(): GetFirmwareVersionCommand; // inherited from NSObject
	static new(): GetFirmwareVersionCommand; // inherited from NSObject
	payload: NSArray<number>;
	readonly commandCode: number; // inherited from TCMPMessage
	readonly commandFamily: NSArray<number>; // inherited from TCMPMessage
	parsePayloadWithPayloadError(payload: NSArray<number> | number[]): boolean;
}

declare class SerialTappy extends NSObject {
	static alloc(): SerialTappy; // inherited from NSObject
	static new(): SerialTappy; // inherited from NSObject
	constructor(o: { communicator: TappySerialCommunicator; });
	close(): void;
	connect(): void;
	disconnect(): void;
	getCommunicator(): TappySerialCommunicator;
	getDeviceDescription(): string;
	getLatestStatus(): TappyStatus;
	// initWithCommunicator(communicator: TappySerialCommunicator): this;
	receiveBytesWithData(data: NSArray<number> | number[]): void;
	removeAllListeners(): void;
	removeResponseListener(): void;
	removeStatusListener(): void;
	removeUnparsablePacketListener(): void;
	sendMessageWithMessage(message: TCMPMessage): void;
	setResponseListenerJSONWithListener(listener: (p1: TCMPMessage, p2: string) => void): void;
	setResponseListenerWithListener(listener: (p1: TCMPMessage, p2: any) => void): void;
	setStatusListenerWithListener(listener: (p1: TappyStatus) => void): void;
	setUnparsablePacketListenerWithListener(listener: (p1: NSArray<number>) => void): void;
}

declare class StreamNDEFCommand extends NSObject implements TCMPMessage {
	static alloc(): StreamNDEFCommand; // inherited from NSObject
	static getCommandCode(): number;
	static new(): StreamNDEFCommand; // inherited from NSObject
	public pollingMode: PollingMode;
	public timeout: number;
	public commandCode: number; // inherited from TCMPMessage
	public commandFamily: NSArray<number>; // inherited from TCMPMessage
	public payload: NSArray<number>; // inherited from TCMPMessage
	constructor(o: { payload: NSArray<number> | number[]; });
	constructor(o: { timeout: number; pollingMode: PollingMode; });
	initWithPayloadError(payload: NSArray<number> | number[]): this;
	initWithTimeoutPollingMode(timeout: number, pollingMode: PollingMode): this;
	parsePayloadWithPayloadError(payload: NSArray<number> | number[]): boolean;
}

declare class StopCommand extends NSObject implements TCMPMessage {
	static alloc(): StopCommand; // inherited from NSObject
	static getCommandCode(): number;
	static new(): StopCommand; // inherited from NSObject
	public commandCode: number; // inherited from TCMPMessage
	public commandFamily: NSArray<number>; // inherited from TCMPMessage
	public payload: NSArray<number>; // inherited from TCMPMessage
	parsePayloadWithPayloadError(payload: NSArray<number> | number[]): boolean;
}

declare class TCMP extends NSObject {
	static alloc(): TCMP; // inherited from NSObject
	static new(): TCMP; // inherited from NSObject
}

declare interface TCMPMessage {
	commandCode: number;
	commandFamily: NSArray<number>;
	payload: NSArray<number>;
	parsePayloadWithPayloadError(payload: NSArray<number> | number[]): boolean;
}
declare var TCMPMessage: {
	prototype: TCMPMessage;
};

declare var TCMPTappyVersionNumber: number;

declare var TCMPTappyVersionString: interop.Reference<number>;

declare class TCMPUtils extends NSObject {
	static alloc(): TCMPUtils; // inherited from NSObject
	static calculateCRCWithData(data: NSArray<number> | number[]): NSArray<number>;
	static containsHdlcEndpointWithPacket(packet: NSArray<number> | number[]): boolean;
	static hdlcDecodePacketWithFrameError(frame: NSArray<number> | number[]): NSArray<number>;
	static hdlcEncodePacketWithPacket(packet: NSArray<number> | number[]): NSArray<number>;
	static new(): TCMPUtils; // inherited from NSObject
}

declare const enum TagTypes {
	TAG_UNKNOWN = 0,
	MIFARE_ULTRALIGHT = 1,
	NTAG203 = 2,
	MIFARE_ULTRALIGHT_C = 3,
	MIFARE_STD_CLASSIC_1K = 4,
	MIFARE_STD_CLASSIC_4K = 5,
	MIFARE_DESFIRE_EV1_2K = 6,
	TYPE_2_TAG = 7,
	MIFARE_PLUS_2K_CL2 = 8,
	MIFARE_PLUS_4K_CL2 = 9,
	MIFARE_MINI = 10,
	OTHER_TYPE4 = 11,
	MIFARE_DESFIRE_EV1_4K = 12,
	MIFARE_DESFIRE_EV1_8K = 13,
	MIFARE_DESFIRE = 14,
	TOPAZ_512 = 15,
	NTAG_210 = 16,
	NTAG_212 = 17,
	NTAG_213 = 18,
	NTAG_215 = 19,
	NTAG_216 = 20,
	TAG_TYPE_NOT_RECOGNIZED = 255
}

declare class TagWrittenResponse extends NSObject implements TCMPMessage {
	static alloc(): TagWrittenResponse; // inherited from NSObject
	static getCommandCode(): number;
	static new(): TagWrittenResponse; // inherited from NSObject
	readonly tagCode: NSArray<number>;
	readonly tagType: TagTypes;
	readonly commandCode: number; // inherited from TCMPMessage
	readonly commandFamily: NSArray<number>; // inherited from TCMPMessage
	readonly payload: NSArray<number>; // inherited from TCMPMessage
	constructor(o: { payload: NSArray<number> | number[]; });
	constructor(o: { tagCode: NSArray<number> | number[]; tagType: TagTypes; });
	initWithPayloadError(payload: NSArray<number> | number[]): this;
	initWithTagCodeTagType(tagCode: NSArray<number> | number[], tagType: TagTypes): this;
	parsePayloadWithPayloadError(payload: NSArray<number> | number[]): boolean;
}

declare class TappyBle extends SerialTappy {
	static alloc(): TappyBle; // inherited from NSObject
	static getTappyBleWithCentralManagerDevice(centralManager: CBCentralManager, device: TappyBleDevice): TappyBle;
	static new(): TappyBle; // inherited from NSObject
}

declare class TappyBleCommunicator extends NSObject {
	static alloc(): TappyBleCommunicator; // inherited from NSObject
	static getTappyBleCommunicatorWithCentralManagerDeviceId(centralManager: CBCentralManager, deviceId: NSUUID): TappyBleCommunicator;
	static new(): TappyBleCommunicator; // inherited from NSObject
	error: NSError;
	readonly debugDescription: string; // inherited from NSObjectProtocol
	readonly description: string; // inherited from NSObjectProtocol
	readonly hash: number; // inherited from NSObjectProtocol
	readonly isProxy: boolean; // inherited from NSObjectProtocol
	readonly state: TappyStatus; // inherited from TappySerialCommunicator
	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol
	centralManagerDidConnectPeripheral(central: CBCentralManager, peripheral: CBPeripheral): void;
	centralManagerDidDisconnectPeripheralError(central: CBCentralManager, peripheral: CBPeripheral, error: NSError): void;
	centralManagerDidFailToConnectPeripheralError(central: CBCentralManager, peripheral: CBPeripheral, error: NSError): void;
	centralManagerDidUpdateState(central: CBCentralManager): void;
	close(): void;
	connect(): void;
	disconnect(): void;
	getDeviceDescription(): string;
	peripheralDidDiscoverCharacteristicsForServiceError(peripheral: CBPeripheral, service: CBService, error: NSError): void;
	peripheralDidDiscoverServices(peripheral: CBPeripheral, error: NSError): void;
	peripheralDidUpdateValueForCharacteristicError(peripheral: CBPeripheral, characteristic: CBCharacteristic, error: NSError): void;
	peripheralDidWriteValueForCharacteristicError(peripheral: CBPeripheral, characteristic: CBCharacteristic, error: NSError): void;
	removeDataListener(): void;
	removeStatusListener(): void;
	sendBytesWithData(data: NSArray<number>): void;
	setDataListenerWithReceivedBytes(listener: (p1: NSArray<number>) => void): void;
	setStatusListenerWithStatusReceived(listener: (p1: TappyStatus) => void): void;
}

export declare class TappyBleDevice extends NSObject {
	static alloc(): TappyBleDevice; // inherited from NSObject
	static new(): TappyBleDevice; // inherited from NSObject
	deviceId: NSUUID;
	deviceName: string;
	name(): string;
}

declare class TappyBleDeviceDefinition extends NSObject {
	static alloc(): TappyBleDeviceDefinition; // inherited from NSObject
	static getRxCharacteristicUuid(): CBUUID;
	static getSerialServiceUuid(): CBUUID;
	static getTxCharacteristicUuid(): CBUUID;
	static isTappyDeviceNameWithDevice(device: CBPeripheral): boolean;
	static new(): TappyBleDeviceDefinition; // inherited from NSObject
}

declare class TappyBleScanner extends NSObject {
	static alloc(): TappyBleScanner; // inherited from NSObject
	static new(): TappyBleScanner; // inherited from NSObject
	// centralManager: CBCentralManager;
	// state: TappyBleScannerStatus;
	getState(): TappyBleScannerStatus;
	statusListener: (p1: TappyBleScannerStatus) => void;
	tappyFoundListener: (p1: TappyBleDevice, p2: string) => void;
	constructor(o: { centralManager: CBCentralManager; });
	centralManagerDidDiscoverPeripheralAdvertisementDataRSSI(central: CBCentralManager, peripheral: CBPeripheral, advertisementData: NSDictionary<string, any>, RSSI: number): void;
	centralManagerDidUpdateState(central: CBCentralManager): void;
	initWithCentralManager(centralManager: CBCentralManager): this;
	removeStatusListener(): void;
	removeTappyFoundListener(): void;
	setStatusListenerWithStatusReceived(listener: (p1: TappyBleScannerStatus) => void): void;
	setTappyFoundListenerJSONWithListener(listener: (p1: TappyBleDevice, p2: string) => void): void;
	setTappyFoundListenerWithListener(listener: (p1: TappyBleDevice, p2: string) => void): void;
	startScan(): boolean;
	stopScan(): void;
}

declare class TappyCentralManagerProvider extends NSObject {
	static alloc(): TappyCentralManagerProvider; // inherited from NSObject
	static new(): TappyCentralManagerProvider; // inherited from NSObject
	static shared(): TappyCentralManagerProvider;
	centralManager: CBCentralManager;
}

declare interface TappySerialCommunicator {
	state: TappyStatus;
	close(): void;
	connect(): void;
	disconnect(): void;
	getDeviceDescription(): string;
	removeDataListener(): void;
	removeStatusListener(): void;
	sendBytesWithData(data: NSArray<number> | number[]): void;
	setDataListenerWithReceivedBytes(listener: (p1: NSArray<number>) => void): void;
	setStatusListenerWithStatusReceived(listener: (p1: TappyStatus) => void): void;
}
declare var TappySerialCommunicator: {
	prototype: TappySerialCommunicator;
};

declare class WriteNDEFTextCommand extends NSObject implements TCMPMessage {
	static alloc(): WriteNDEFTextCommand; // inherited from NSObject
	static new(): WriteNDEFTextCommand; // inherited from NSObject
	public lockFlag: LockingMode;
	public text: NSArray<number>;
	public timeout: number;
	public commandCode: number; // inherited from TCMPMessage
	public commandFamily: NSArray<number>; // inherited from TCMPMessage
	public payload: NSArray<number>; // inherited from TCMPMessage
	constructor(o: { payload: NSArray<number> | number[]; });
	constructor(o: { text: string; });
	constructor(o: { timeout: number; lockTag: LockingMode; text: string; });
	initWithPayloadError(payload: NSArray<number> | number[]): this; // @objc public init(payload: [UInt8]) throws {
	initWithText(text: string): this;								 // @objc public init(text: String) {
	initWithTimeoutLockTagText(timeout: number, lockTag: LockingMode, text: string): this; // @objc public init(timeout: UInt8, lockTag: LockingMode, text: String){
	parsePayloadWithPayloadError(payload: NSArray<number> | number[]): boolean;
}

declare class WriteNDEFUriCommand extends NSObject implements TCMPMessage {
	static alloc(): WriteNDEFTextCommand; // inherited from NSObject
	static new(): WriteNDEFTextCommand; // inherited from NSObject
	public lockFlag: LockingMode;
	public uri: NSArray<number>;
	public uriPrefixCode: number;
	public timeout: number;
	public commandCode: number; // inherited from TCMPMessage
	public commandFamily: NSArray<number>; // inherited from TCMPMessage
	public payload: NSArray<number>; // inherited from TCMPMessage
	constructor(o: { payload: NSArray<number> | number[]; }); // initWithPayloadError
	constructor(o: { timeout: number; lockTag: LockingMode; uriPrefixCode: number; uri: NSArray<number>});
	constructor(o: { timeout: number; lockTag: LockingMode; uriPrefixCode: number; uriStringNoPrefix: string });
	constructor(o: { timeout: number; lockTag: LockingMode; uriStringWithPrefix: string});

	// @objc public var uriString: String
	public uriString(): string;

	// @objc public init(payload: [UInt8]) throws
	initWithPayloadError(payload: NSArray<number> | number[]): this;

	// @objc public init(timeout: UInt8, lockTag: LockingMode, uriPrefixCode: UInt8, uri: [UInt8])
	initWithTimeoutLockTagUriPrefixCodeUri(timeout: number, lockTag: LockingMode, uriPrefixCode:number, uri: NSArray<number>): this;

	// @objc public convenience init(timeout: UInt8, lockTag: LockingMode, uriPrefixCode: UInt8, uriStringNoPrefix: String)
	initWithTimeoutLockTagUriPrefixCodeUriStringNoPrefix(timeout: number, lockTag: LockingMode, uriPrefixCode:number, uriStringNoPrefix: string): this;

	// @objc public init(timeout: UInt8, lockTag: LockingMode, uriStringWithPrefix: String)
	initWithTimeoutLockTagUriStringWithPrefix(timeout: number, lockTag: LockingMode, uriStringWithPrefix: string): this;

	parsePayloadWithPayloadError(payload: NSArray<number> | number[]): boolean;
}

const NDEF = require('@taptrack/ndef');

export class TappyDevice {
	deviceName: string;
	iosDevice:  TappyBleDevice;
}

export class Tappy extends Common {

    private scanner: TappyBleScanner;
    private status: number;
    private tappyCentralManager: CBCentralManager;
    private tappyBle: TappyBle;
	private firmwareVersionCommand: GetFirmwareVersionCommand = new GetFirmwareVersionCommand();
	private stopCommand : StopCommand = new StopCommand();
	private connectTimer: any = undefined;

    constructor() {
		super();
		this.setupScanner();
	}
	
	private setupScanner() {

        this.tappyCentralManager = TappyCentralManagerProvider.shared().centralManager;
        this.scanner = new TappyBleScanner( {centralManager: this.tappyCentralManager });
        this.scanner.setStatusListenerWithStatusReceived( ( status: TappyBleScannerStatus ) => {
            this.status = status;
            const statusUpdatedEvent = {
                eventName: "bleStatusUpdated",
                object: this,
                status: this.status
            };
            this.notify(statusUpdatedEvent);
        });
		
        this.scanner.setTappyFoundListenerJSONWithListener( (tappyDevice: TappyBleDevice, json: string) => {
            try {
				if (json) {
					let data = JSON.parse(json);
					let device:TappyDevice = {
						deviceName: data.deviceName,
						iosDevice:  tappyDevice
					};
					device.iosDevice.deviceName = data.deviceName;
					device.iosDevice.deviceId = new NSUUID(data.deviceId);
					const tappyFoundEvent = {
						eventName: "tappyFound",
						object: this,
						device: device
					};
                	this.notify(tappyFoundEvent);	
				}
            } catch( err ) {
                console.log("Error in TappyFoundListener:", JSON.stringify(err));
            }
        });
	}

    public requestPermissions(): Promise<boolean> {
		return Promise.resolve(true);
	}

	public getTappyStatus(): TappyStatus {
        let status: TappyStatus = TappyStatus.STATUS_DISCONNECTED;
        if (this.tappyBle) {
            status = this.tappyBle.getLatestStatus();
        }
        return status;
	}

	public getScannerStatus(): TappyBleScannerStatus {
		return this.scanner.getState();
	}

    public connect(device:TappyDevice, timeoutSeconds:number = 30) {
		try {
			if (device === void 0) { device = null; }
			if (!device) {
				// device = this.device;
				throw new Error("Device is undefined or null");
			}
			let tappyBle = TappyBle.getTappyBleWithCentralManagerDevice(this.tappyCentralManager, device.iosDevice);
			if (tappyBle) {
				this.tappyBle = tappyBle;
				this.tappyBle.setStatusListenerWithListener( (status: TappyStatus) => {

					if (status == TappyStatus.STATUS_DISCONNECTED || status == TappyStatus.STATUS_NOT_READY_TO_CONNECT) {
						this.scanner.removeStatusListener();
						this.scanner.removeTappyFoundListener();
						this.setupScanner();
						this.scanner.stopScan();
						console.log("Reset Tappy scanner");
					}
					else if (status == TappyStatus.STATUS_READY && this.connectTimer != undefined) {
						clearTimeout(this.connectTimer);
						this.connectTimer = undefined;
					}

					const tappyStatusUpdatedEvent = {
						eventName: "tappyStatusUpdated",
						object: this,
						status: status
					};
					this.notify(tappyStatusUpdatedEvent);
				});

				this.tappyBle.connect();

				// Setup connect timeout
				this.connectTimer = setTimeout(() => {
					this.tappyBle.disconnect();
					const tappyStatusUpdatedEvent = {
						eventName: "connectTimeout",
						object: this,
						status: this.tappyBle.getLatestStatus()
					};
                	this.notify(tappyStatusUpdatedEvent);	
				}, timeoutSeconds*1000 );
			}
		} catch (err) {
			console.log("Error in Tappy.connect:", err);
		}
    }

    public setResponseListener(): boolean {
		let success: boolean = false;
		try {
			if (this.tappyBle.getLatestStatus() === TappyStatus.STATUS_READY) {
				success = true;
				this.tappyBle.setResponseListenerJSONWithListener( (tcmpResponse: TCMPMessage, data) => {
					try {
						let dataObj = JSON.parse(data);
						if (tcmpResponse.commandCode == BasicNFCResponseCode.NdefFound ||
							tcmpResponse.commandCode == BasicNFCResponseCode.TagFound) {
							let payload = dataObj.payload;
							// now need to parse the payload
							try {
								let tagCode;
								let records:any[] = [];
								if (tcmpResponse.commandCode == BasicNFCResponseCode.NdefFound) {
									let bytesArray = payload.slice(9, payload.length);
									tagCode = payload.slice(2,9);
									var message = NDEF.Message.fromBytes(bytesArray); // Returns an NdefMessage
									records = message.getRecords();				      // Returns NdefRecord[]
									const type = records[0].getType()[0];
									if (type === 0x54) {
										// This is a text record
										var recordContents = NDEF.Utils.resolveTextRecord(records[0]);
										if (recordContents.content) {
											dataObj.ndefText = recordContents.content;
										}
									}
									else if (type === 0x55) {
										// This is a URI Record
										var uriString = NDEF.Utils.resolveUriRecordToString(records[0]);
										if (uriString) {
											dataObj.uriText = uriString;
										}
									}
								} else {
									tagCode = payload.slice(1, payload.length);
								}
								if (tagCode) {
									dataObj.tagCode = this.tagToHexString(tagCode);
								}
								const ndefFoundResponseEvent = {
									eventName: "ndefFoundResponse",
									object: this,
									ndefData: dataObj,
									ndefRecord: records[0],
									timestamp: Date.now()
								};
								this.notify(ndefFoundResponseEvent);
							} catch (err) {
								console.log("Error in processing tappy response: NDEF string error: ", err);
							}
						} else if (tcmpResponse.commandCode == BasicNFCResponseCode.FirmwareVersion) {
							let dataObj = JSON.parse(data);
							const writtenResponseEvent = {
								eventName: "firmwareVersion",
								object: this,
								majorVersion: dataObj.payload[0],
								minorVersion: dataObj.payload[1]
							};
							this.notify(writtenResponseEvent);
						} else if (tcmpResponse.commandCode == BasicNFCResponseCode.Error) {
							// notify error
							const writtenResponseEvent = {
								eventName: "writtenResponse",
								object: this,
								success: false
							};
							this.notify(writtenResponseEvent);
						} else if (tcmpResponse.commandCode == BasicNFCResponseCode.TagWritten) {
							// notify success
							const writtenResponseEvent = {
								eventName: "writtenResponse",
								object: this,
								success: true
							};
							this.notify(writtenResponseEvent);
						} else if (tcmpResponse.commandCode == BasicNFCResponseCode.Timeout) {
							const writtenResponseEvent = {
								eventName: "TappyTimeout",
								object: this
							};
							this.notify(writtenResponseEvent);
						} else {
							// unknown error
							const writtenResponseEvent = {
								eventName: "writtenResponse",
								object: this,
								success: false
							};
							this.notify(writtenResponseEvent);
						}
					} catch (err) {
						console.log("Error in processing tappy response: ", JSON.stringify(err));
					}
				});
			}
		} catch (err) {
			console.log("Error in Tappy.setResponseListener: ", err);
		}
		return (success)
    }


    public disconnect() {
		try {
			this.tappyBle.disconnect();
		} catch (err) {
			console.log("Error in Tappy.disconnect: ", err);
		}
    }

    public startScan(): boolean {
		try {
			let res = this.scanner.startScan();
			return res;
		} catch (err) {
			console.log("Error in Tappy.startScn: ", err);
			return false;
		}
    }

    public stopScan() {
		try {
			this.scanner.stopScan();
		} catch (err) {
			console.log("Error in Tappy.stopScan: ", err);
		}
    }

    public writeNDEF(text: string, timeout = 0, lockTag = LockingMode.DONT_LOCK_TAG): boolean {
		try {
			if (this.tappyBle.getLatestStatus() === TappyStatus.STATUS_READY) {
				let writeCommand : WriteNDEFTextCommand = new WriteNDEFTextCommand({timeout, lockTag, text});
				this.tappyBle.sendMessageWithMessage(writeCommand);
				return true;
			} else {
				return false;
			}
		} catch (err) {
			console.log("Error in Tappy.writeNDEF: ", err);
			return false;
		}
    }

    public writeUri(uriStringWithPrefix: string, timeout = 0, lockTag = LockingMode.DONT_LOCK_TAG): boolean {
		try {
			if (this.tappyBle.getLatestStatus() === TappyStatus.STATUS_READY) {
				let writeCommand : WriteNDEFUriCommand = new WriteNDEFUriCommand({timeout, lockTag, uriStringWithPrefix});
				this.tappyBle.sendMessageWithMessage(writeCommand);
				return true;
			} else {
				return false;
			}
		} catch (err) {
			console.log("Error in Tappy.writeNDEF: ", err);
			return false;
		}
    }

    public streamNDEF(timeout: number = 0): boolean {
		try {
			if (this.tappyBle.getLatestStatus() === TappyStatus.STATUS_READY) {
				let readWristbandCommand : StreamNDEFCommand = new StreamNDEFCommand({timeout: timeout, pollingMode: PollingMode.PollForGeneral});
				this.tappyBle.sendMessageWithMessage(readWristbandCommand);
				return true;
			} else {
				return false;
			}
		} catch (err) {
			console.log("Error in Tappy.streamNDEF: ", err);
			return false;
		}
    }

	public scanNDEF(timeout: number = 0): boolean {
		try {
			if (this.tappyBle.getLatestStatus() === TappyStatus.STATUS_READY) {
				let scanTagCommand : ScanNDEFCommand = new ScanNDEFCommand({timeout: timeout, pollingMode: PollingMode.PollForGeneral});
				this.tappyBle.sendMessageWithMessage(scanTagCommand);
				return true;
			} else {
				return false;
			}
		} catch (err) {
			console.log("Error in Tappy.scanNDEF: ", err);
			return false;
		}
	}

	public scanTag(timeout: number = 0): boolean {
		try {
			if (this.tappyBle.getLatestStatus() === TappyStatus.STATUS_READY) {
				let scanTagCommand : ScanTagCommand = new ScanTagCommand({timeout: timeout, pollingMode: PollingMode.PollForGeneral});
				this.tappyBle.sendMessageWithMessage(scanTagCommand);
				return true;
			} else {
				return false;
			}
		} catch (err) {
			console.log("Error in Tappy.scanTag: ", err);
			return false;
		}
	}

	public streamTag(timeout:number = 0):boolean {
		try {
			if (this.tappyBle.getLatestStatus() === TappyStatus.STATUS_READY) {
				let streamTagCommand: StreamTagCommand = new StreamTagCommand({timeout: timeout, pollingMode: PollingMode.PollForGeneral});
				this.tappyBle.sendMessageWithMessage(streamTagCommand);
				return true;
			} else {
				return false;
			}
		} catch (err) {
			console.log("Error in Tappy.streamTag:", err);
			return false;
		}
	}

	public stop(): boolean {
		try {
			if (this.tappyBle.getLatestStatus() === TappyStatus.STATUS_READY) {
				this.tappyBle.sendMessageWithMessage(this.stopCommand);
				return true;
			} else {
				return false;
			}
		} catch (err) {
			console.log("Error in Tappy.stop: ", err);
			return false;
		}
	}

	public getFirmwareVersion(): boolean {
		try {
			if (this.tappyBle.getLatestStatus() === TappyStatus.STATUS_READY) {
				this.tappyBle.sendMessageWithMessage(this.firmwareVersionCommand);
				return true;
			} else {
				return false;
			}
		} catch (err) {
			console.log("Error in Tappy.getFirmwareVersion: ", err);
			return false;
		}
	}

	public getTCMPTappyVersionNumber(): number {
		return 2.0;
	}
}
