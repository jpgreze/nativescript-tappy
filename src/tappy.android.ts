import { ad } from '@nativescript/core/utils/utils';
import { Common, LockingMode, TappyBleScannerStatus, TappyStatus } from './tappy.common';
import * as applicationModule from "tns-core-modules/application";
const permissions = require("nativescript-permissions");

const NDEF = require('@taptrack/ndef');

export class TappyDevice {
    deviceName: string;
    androidDevice: com.taptrack.tcmptappy2.ble.ParcelableTappyBleDeviceDefinition;
}

export class Tappy extends Common {

    private bluetoothManager: android.bluetooth.BluetoothManager;
    private bluetoothAdapter: android.bluetooth.BluetoothAdapter;

    private scanner: com.taptrack.tcmptappy2.ble.TappyBleScanner;
    private scanning: boolean = false;
    private scannerStatus: TappyBleScannerStatus = TappyBleScannerStatus.STATUS_POWERED_OFF;
    private scannerResults: { [key: string]: com.taptrack.tcmptappy2.ble.ParcelableTappyBleDeviceDefinition };

    private tappyBle: com.taptrack.tcmptappy2.ble.TappyBle;
    private connectTimer: any = undefined;
    private readonly MAX_RECONNECTS: number = 3;
    private reconnects: number = this.MAX_RECONNECTS;
    
    private stopCommand: com.taptrack.tcmptappy2.commandfamilies.basicnfc.commands.StopCommand =
        new com.taptrack.tcmptappy2.commandfamilies.basicnfc.commands.StopCommand();

    private firmwareVersionCommand: com.taptrack.tcmptappy2.commandfamilies.systemfamily.commands.GetFirmwareVersionCommand =
        new com.taptrack.tcmptappy2.commandfamilies.systemfamily.commands.GetFirmwareVersionCommand();

    constructor() {
        super();
        this.bluetoothManager = ad.getApplicationContext().getSystemService(android.content.Context.BLUETOOTH_SERVICE);
        this.bluetoothAdapter = this.bluetoothManager.getAdapter();
        this.setupScanner();
        this.setupBroadastReceiver();
    }

    private isBluetoothEnabled(): boolean {
         return (this.bluetoothAdapter && this.bluetoothAdapter.isEnabled());
    }

    // Setup bluetooth scanner object and listener
    private setupScanner() {
        this.scanner = com.taptrack.tcmptappy2.ble.TappyBleScanner.get();

        let listenerObject: com.taptrack.tcmptappy2.ble.TappyBleFoundListener =
            new com.taptrack.tcmptappy2.ble.TappyBleFoundListener( {
                onTappyBleFound: (tappyDef:com.taptrack.tcmptappy2.ble.ParcelableTappyBleDeviceDefinition) => {
                    // console.log("Tappy Found, Name:  " + tappyDef.getName() + ", Address: " + tappyDef.getAddress());
                    let name:string = tappyDef.getName();
                    // Need to filter out repeats
                    if (this.scannerResults[name] === undefined) {
                        this.scannerResults[name] = tappyDef;
                        let device:TappyDevice = {
                            deviceName:    name,
                            androidDevice: tappyDef
                        };
                        const tappyFoundEvent = {
                            eventName: "tappyFound",
                            object: this,
                            device: device
                        };
                        this.notify(tappyFoundEvent);	
                    }
                }} );

        this.scanner.registerTappyBleFoundListener(listenerObject);

        setTimeout(() => {
            this.updateScannerStatus();
        }, 250);
    }

    // Register broadcast receiver to detect when bluetooth is turned on or off
    private setupBroadastReceiver(): void {
        applicationModule.android.registerBroadcastReceiver(android.bluetooth.BluetoothAdapter.ACTION_STATE_CHANGED,
            (context: android.content.Context, intent: android.content.Intent) => {
            const state = intent.getIntExtra(android.bluetooth.BluetoothAdapter.EXTRA_STATE, android.bluetooth.BluetoothAdapter.ERROR);
            if (state === android.bluetooth.BluetoothAdapter.STATE_TURNING_OFF) {
                console.log("Anrdoid Bluetooth State Change: Bluetooth Turning OFF");
                this.disconnect(); // If we are connected to a tappy, disconnect now
            }
            if (state === android.bluetooth.BluetoothAdapter.STATE_ON ||
                state === android.bluetooth.BluetoothAdapter.STATE_OFF) {
                // Notify the app of the change
                this.scannerStatus = (state === android.bluetooth.BluetoothAdapter.STATE_ON) ?
                    TappyBleScannerStatus.STATUS_POWERED_ON : TappyBleScannerStatus.STATUS_POWERED_OFF;
                const statusUpdatedEvent = {
                    eventName: "bleStatusUpdated",
                    object: this,
                    status: this.scannerStatus
                };
                this.notify(statusUpdatedEvent);
            }
        });
    }

    // Update the scanner status, this also has the side effect of telling the app if
    // bluetooth is on or off
    private updateScannerStatus(): void {
        this.scannerStatus = TappyBleScannerStatus.STATUS_POWERED_ON;
        if (this.scanning) {
            this.scannerStatus = TappyBleScannerStatus.STATUS_SCANNING;
        }
        else if (!this.isBluetoothEnabled()) {
            this.scannerStatus = TappyBleScannerStatus.STATUS_POWERED_OFF;
        }
        const statusUpdatedEvent = {
            eventName: "bleStatusUpdated",
            object: this,
            status: this.scannerStatus
        };
        this.notify(statusUpdatedEvent);
    }

    // Request permissions from the underlying OS. Required for Android.
    public requestPermissions(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            permissions.requestPermissions(
                [android.Manifest.permission.ACCESS_FINE_LOCATION,
                 android.Manifest.permission.ACCESS_COARSE_LOCATION],
                "App Needs The following permissions to access the Bluetooth device")
                    .then(() => {
                        console.log("Android permissions have been acquired");
                        resolve(true);
                    })
                    .catch ((err) => {
                        console.log("Error in Tappy.requestPermissions: ", err);
                        resolve(false);
                    });    
        });
    }
    
    // Return the status of any currently connected tappy
	public getTappyStatus(): TappyStatus {
        let status: TappyStatus = TappyStatus.STATUS_DISCONNECTED;
        if (this.tappyBle) {
            status = this.tappyBle.getLatestStatus()+1; // Make statuses match
        }
        return status;
	}

    // Return the status of hte scanner
	public getScannerStatus(): TappyBleScannerStatus {
		return this.scannerStatus;
	}

    // Connect to the given tappy device. Timeout will occur if connection does not take place.
    public connect(device:TappyDevice, timeoutSeconds:number = 30) {
        this.updateScannerStatus();

        if (this.scannerStatus == TappyBleScannerStatus.STATUS_POWERED_OFF) {
            throw new Error("Cannot connect: Bluetooth is powered off")
        }

        this.tappyBle = com.taptrack.tcmptappy2.ble.TappyBle.getTappyBle(
            ad.getApplicationContext(), device.androidDevice);

        if (!this.tappyBle) {
            throw new Error("Could not get Tappy Bluetooth device object");            
        }

        try {
            let statusListenerObject: com.taptrack.tcmptappy2.Tappy.StatusListener =
                new com.taptrack.tcmptappy2.Tappy.StatusListener( { statusReceived: (status:TappyStatus) => {

                    status++; // Android statuses are one less than iOS statuses, the need to match

                    if (status == TappyStatus.STATUS_DISCONNECTED) {
                        // Occasionally when intially connecting to the tappy, the device will go from the
                        // STATUS_CONNECTING state to the STATUS_DISCONNECTED state, without passing through
                        // the STATUS_READY state. This is why there is retry logic here.
                        if (this.reconnects < this.MAX_RECONNECTS) {
                            this.reconnects++;
                            console.log("Tappy Disconnected, reconnect attempt: " + this.reconnects);
                            setTimeout(() => {
                                this.tappyBle.connect();
                            }, 500);
                        }
                        else {
                            // console.log("Tappy Disconnected and no more reconnect attempts!");
                            this.tappyBle.removeAllListeners();
                            this.tappyBle.close();
                            this.tappyBle = undefined;
                        }
                    }
                    else if (status == TappyStatus.STATUS_READY) {
                        // console.log("Tappy Connected! connectTimer=", this.connectTimer);
                        this.reconnects = this.MAX_RECONNECTS;
                        if (this.connectTimer != undefined) {
                            clearTimeout(this.connectTimer);
                            this.connectTimer = undefined;
                        }
                    }
                    
                    const tappyStatusUpdatedEvent = {
                        eventName: "tappyStatusUpdated",
                        object: this,
                        status: status
                    };
                    this.notify(tappyStatusUpdatedEvent);                        
                }});

            this.tappyBle.registerStatusListener(statusListenerObject);
            this.reconnects = 0;
            this.tappyBle.connect();

            // Setup connect timeout
            this.connectTimer = setTimeout(() => {
                this.tappyBle.removeAllListeners();
                this.tappyBle.close();
                this.tappyBle = undefined;
                const tappyStatusUpdatedEvent = {
                    eventName: "connectTimeout",
                    object: this,
                    status: TappyStatus.STATUS_DISCONNECTED
                };
                this.notify(tappyStatusUpdatedEvent);
                this.updateScannerStatus();
            }, timeoutSeconds*1000 );
        }
        catch (err) {
            console.log("Error in Tappy.connect: ", err);
        }
    }

    // Convert the native array of signed numbers to a comma delimited
    // list of unsigned number strings.
    private native2String(array:native.Array<number>): string {
        let result: string = "[";
        for (let i=0; i<array.length; i++) {
            if (i > 0) result = result + ", ";
            let v = (array[i] & 0x80) ? 256 + array[i] : array[i];
            result = result + v.toString();
        }
        result = result + "]";
        return result;
    }

    // Convert the native array of signed numbers to an array of unsigned numbers
    private native2UnsignedArray(array:native.Array<number>): Array<number> {
        let result: Array<number> = new Array<number>(array.length);
        for (let i=0; i<array.length; i++) {
            result[i] = (array[i] & 0x80) ? 256 + array[i] : array[i];
        }
        return result;
    }

    private processResponse(tcmpMessage: com.taptrack.tcmptappy2.TCMPMessage) {
        try {
            let commandCode: number = tcmpMessage.getCommandCode();
            let nativeCommandFamily: native.Array<number> = tcmpMessage.getCommandFamily();
            let nativePayload: native.Array<number> = tcmpMessage.getPayload();
    
            // console.log("commandFamily: ", this.native2String(nativeCommandFamily));
            // console.log("commandCode:   ", commandCode);
            // console.log("payload:       ", this.native2String(nativePayload));
    
            let payload:Array<number> = this.native2UnsignedArray(nativePayload);
            let dataObj: any = { };
    
            switch (commandCode) {
              case com.taptrack.tcmptappy2.commandfamilies.basicnfc.responses.NdefFoundResponse.COMMAND_CODE:
                // console.log("NdefFoundResponse");
                let bytesArray = payload.slice(9, payload.length);
                let ndefTagCodeBytes = payload.slice(2,9);
                var message = NDEF.Message.fromBytes(bytesArray);
                var records = message.getRecords();
                var recordContents = NDEF.Utils.resolveTextRecord(records[0]);
                if (recordContents.content) {
                    dataObj.ndefText = recordContents.content;
                }
                if (ndefTagCodeBytes) {
                    dataObj.tagCode = this.tagToHexString(ndefTagCodeBytes);
                    const ndefFoundResponseEvent = {
                        eventName: "ndefFoundResponse",
                        object: this,
                        ndefData: dataObj,
                        timestamp: Date.now()
                    };
                    this.notify(ndefFoundResponseEvent);
                }
                break;
    
              case com.taptrack.tcmptappy2.commandfamilies.basicnfc.responses.TagFoundResponse.COMMAND_CODE:
                // console.log("TagFoundResponse");
                let tagCodeBytes = payload.slice(1, payload.length);
                dataObj.tagCode = this.tagToHexString(tagCodeBytes);
                const ndefFoundResponseEvent = {
                    eventName: "ndefFoundResponse",
                    object: this,
                    ndefData: dataObj,
                    timestamp: Date.now()
                };
                this.notify(ndefFoundResponseEvent);
                break;
    
              case com.taptrack.tcmptappy2.commandfamilies.systemfamily.responses.FirmwareVersionResponse.COMMAND_CODE:
                // console.log("FirmwareVersionResponse");
                const firmwareResponseEvent = {
                    eventName: "firmwareVersion",
                    object: this,
                    majorVersion: payload[0],
                    minorVersion: payload[1]
                };
                this.notify(firmwareResponseEvent);    
                break;
    
              case com.taptrack.tcmptappy2.commandfamilies.basicnfc.responses.BasicNfcErrorResponse.COMMAND_CODE:
                // console.log("BasicNfcErrorResponse");
                const nfcErrorResponseEvent = {
                    eventName: "writtenResponse",
                    object: this,
                    success: false
                };
                this.notify(nfcErrorResponseEvent);
                break;
    
              case com.taptrack.tcmptappy2.commandfamilies.basicnfc.responses.TagWrittenResponse.COMMAND_CODE:
                // console.log("TagWrittenResponse");
                const writeSuccessEvent = {
                    eventName: "writtenResponse",
                    object: this,
                    success: true
                };
                this.notify(writeSuccessEvent);
                break;
    
              case com.taptrack.tcmptappy2.commandfamilies.basicnfc.responses.ScanTimeoutResponse.COMMAND_CODE:
                // console.log("ScanTimeoutResponse");
                const timeoutResponseEvent = {
                    eventName: "TappyTimeout",
                    object: this
                };
                this.notify(timeoutResponseEvent);
                break;
    
              default:
                // console.log("Unexpected Response!");
                const unExpectedResponseEvent = {
                    eventName: "writtenResponse",
                    object: this,
                    success: false
                };
                this.notify(unExpectedResponseEvent);
                break;
            }    
        }
        catch (err) {
            console.log("Error in Tappy.processResponse: ", err);
        }
    }

    public setResponseListener(): boolean {
		let success: boolean = false;
		try {
			if (this.getTappyStatus() === TappyStatus.STATUS_READY) {
                success = true;

                let responseListener: com.taptrack.tcmptappy2.Tappy.ResponseListener = 
                    new com.taptrack.tcmptappy2.Tappy.ResponseListener(
                        { responseReceived: (message: com.taptrack.tcmptappy2.TCMPMessage) => {
                            this.processResponse(message);
                        }});

                this.tappyBle.registerResponseListener(responseListener);
            }
        }
        catch (err) {
            console.log("Error in Tappy.setResponseListener: ", err);
            success = false;
        }
        return success;
    }

    public disconnect() {
		try {
            if (this.connectTimer != undefined) {
                clearTimeout(this.connectTimer);
                this.connectTimer = undefined;
            }
            this.reconnects = this.MAX_RECONNECTS;
            if (this.tappyBle) {
                this.tappyBle.disconnect();
            }
		} catch (err) {
			console.log("Error in Tappy.disconnect: ", err);
		}        
    }

    public startScan(): boolean {
        let success: boolean = true;
        try {
            this.updateScannerStatus();
            if (this.scannerStatus == TappyBleScannerStatus.STATUS_POWERED_ON) {
                this.scannerResults = { }; // Clear duplication filter
                this.scanner.startScan();
                this.scanning = true;
                this.updateScannerStatus();    
            }
        }
        catch (err) {
            console.log("Error in Tappy.startScan: ", err);
            success = false;
        }
        return success;
    }

    public stopScan() {
        this.scanner.stopScan();
        this.scanning = false;
        this.updateScannerStatus();
    }

    public writeNDEF(text: string, timeout = 0, lockTag = LockingMode.DONT_LOCK_TAG): boolean {
		try {
			if (this.getTappyStatus() === TappyStatus.STATUS_READY) {
                let writeCommand : com.taptrack.tcmptappy2.commandfamilies.basicnfc.commands.WriteNdefTextRecordCommand =
                    new com.taptrack.tcmptappy2.commandfamilies.basicnfc.commands.WriteNdefTextRecordCommand(timeout, lockTag, text);
				this.tappyBle.sendMessage(writeCommand);
				return true;
			} else {
				return false;
			}
		} catch (err) {
			console.log("Error in Tappy.writeNDEF:", err);
			return false;
		}
    }

    public streamNDEF(timeout: number = 0): boolean {
		try {
			if (this.getTappyStatus() === TappyStatus.STATUS_READY) {
                let pollingMode:number = com.taptrack.tcmptappy2.commandfamilies.basicnfc.PollingModes.MODE_GENERAL;
                let streamNdefCommand: com.taptrack.tcmptappy2.commandfamilies.basicnfc.commands.StreamNdefCommand =
                    new com.taptrack.tcmptappy2.commandfamilies.basicnfc.commands.StreamNdefCommand(timeout, pollingMode);
				this.tappyBle.sendMessage(streamNdefCommand);
				return true;
			} else {
				return false;
			}
		} catch (err) {
			console.log("Error in Tappy.streamNDEF:", err);
			return false;
		}
    }

	public scanNDEF(timeout: number = 0): boolean {
		try {
			if (this.getTappyStatus() === TappyStatus.STATUS_READY) {
                let pollingMode:number = com.taptrack.tcmptappy2.commandfamilies.basicnfc.PollingModes.MODE_GENERAL;
                let scanNdefCommand: com.taptrack.tcmptappy2.commandfamilies.basicnfc.commands.ScanNdefCommand =
                    new com.taptrack.tcmptappy2.commandfamilies.basicnfc.commands.ScanNdefCommand(timeout, pollingMode);
				this.tappyBle.sendMessage(scanNdefCommand);
				return true;
			} else {
				return false;
			}
		} catch (err) {
			console.log("Error in Tappy.scanNDEF:", err);
			return false;
		}
    }

	public scanTag(timeout: number = 0): boolean {
		try {
			if (this.getTappyStatus() === TappyStatus.STATUS_READY) {
                let pollingMode:number = com.taptrack.tcmptappy2.commandfamilies.basicnfc.PollingModes.MODE_GENERAL;
                let scanTagCommand: com.taptrack.tcmptappy2.commandfamilies.basicnfc.commands.ScanTagCommand =
                    new com.taptrack.tcmptappy2.commandfamilies.basicnfc.commands.ScanTagCommand(timeout, pollingMode);
				this.tappyBle.sendMessage(scanTagCommand);
				return true;
			} else {
				return false;
			}
		} catch (err) {
			console.log("Error in Tappy.scanTag:", err);
			return false;
		}
    }

	public streamTag(timeout:number = 0):boolean {
		try {
			if (this.getTappyStatus() === TappyStatus.STATUS_READY) {
                let pollingMode:number = com.taptrack.tcmptappy2.commandfamilies.basicnfc.PollingModes.MODE_GENERAL;
                let streamTagCommand: com.taptrack.tcmptappy2.commandfamilies.basicnfc.commands.StreamTagsCommand =
                    new com.taptrack.tcmptappy2.commandfamilies.basicnfc.commands.StreamTagsCommand(timeout, pollingMode);
				this.tappyBle.sendMessage(streamTagCommand);
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
			if (this.getTappyStatus() === TappyStatus.STATUS_READY) {
				this.tappyBle.sendMessage(this.stopCommand);
				return true;
			} else {
				return false;
			}
		} catch (err) {
			console.log("Error in Tappy.stop:", err);
			return false;
		}
    }

	public getFirmwareVersion(): boolean {
		try {
			if (this.getTappyStatus() === TappyStatus.STATUS_READY) {
				this.tappyBle.sendMessage(this.firmwareVersionCommand);
				return true;
			} else {
				return false;
			}
		} catch (err) {
			console.log("Error in Tappy.getFirmwareVersion:", err);
			return false;
		}
    }

	public getTCMPTappyVersionNumber(): number {
		return 2;
	}
}
