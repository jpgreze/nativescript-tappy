import { Observable } from '@nativescript/core/data/observable';

export declare const enum TappyStatus {
	STATUS_DISCONNECTED = 1,
	STATUS_CONNECTING = 2,
	STATUS_READY = 3,
	STATUS_DISCONNECTING = 4,
	STATUS_CLOSED = 5,
	STATUS_ERROR = 6,
	STATUS_NOT_READY_TO_CONNECT = 7,
	STATUS_COMMUNICATOR_ERROR = 8
};

export declare const enum TappyBleScannerStatus {
	STATUS_CLOSED = 1,
	STATUS_SCANNING = 2,
	STATUS_POWERED_OFF = 3,
	STATUS_POWERED_ON = 4,
	STATUS_RESETTING = 5,
	STATUS_NOT_AUTHORIZED = 6,
	STATUS_NOT_SUPPORTED = 7,
	STATUS_UNKNOWN = 8
};

export declare const enum LockingMode {
	DONT_LOCK_TAG = 0,
	LOCK_TAG = 1
}

export class Common extends Observable {

	private tappyStatusMessages: string[] = [
        "<STATUS_INVALID>",
        "STATUS_DISCONNECTED",
        "STATUS_CONNECTING",
        "STATUS_READY",
        "STATUS_DISCONNECTING",
        "STATUS_CLOSED",
        "STATUS_ERROR",
        "STATUS_NOT_READY_TO_CONNECT",
        "STATUS_COMMUNICATOR_ERROR"
	];
	
    private tappyBleScannerStatusMessage: string[] = [
        "<STATUS_INVALID>",
        "STATUS_CLOSED",
        "STATUS_SCANNING",
        "STATUS_POWERED_OFF",
        "STATUS_POWERED_ON",
        "STATUS_RESETTING",
        "STATUS_NOT_AUTHORIZED",
        "STATUS_NOT_SUPPORTED",
        "STATUS_UNKNOWN"
    ];

	constructor() {
		super();
	}

	public tappyStatusToString(status:TappyStatus): string {
		return this.tappyStatusMessages[status];
	}

	public tappyScannerStatusToString(status:TappyBleScannerStatus): string {
		return this.tappyBleScannerStatusMessage[status];
	}

	protected tagToHexString(tagCode: number[]): string {
		let hexString = "";
		tagCode.forEach( code => {
			hexString += code.toString(16);
		});
		return hexString;
	}
}

