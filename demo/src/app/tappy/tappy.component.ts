import { Component, NgZone, OnInit } from "@angular/core";
import { Tappy, TappyDevice } from 'nativescript-tappy';
import { TappyBleScannerStatus, TappyStatus } from "nativescript-tappy/tappy.common";
import * as Dialogs from "tns-core-modules/ui/dialogs";

@Component({
    selector: "ns-items",
    templateUrl: "./tappy.component.html"
})
export class TappyComponent implements OnInit {

    private tappy: Tappy;
    private connectedDevice: TappyDevice;
    private discoveredDevices: { [name: string]: TappyDevice };
    private discoveredDeviceNames: string[] = [];

    canScan: boolean = true;
    isScanning: boolean = false;
    canConnect: boolean = false;
    isConnected: boolean = false;
    canPerformIO: boolean = false;
    canStop: boolean = false;
    isStreaming: boolean = false;
    continueAfterTimeout: boolean = false;

    message:  string = "Press Start Scan to scan for a Tappy";
    tagText:  string = "";
    ndefText: string = "";
    tappyFound: boolean = false;
    timestamp: number = Date.now();
    tagCounter: number = 0;

    constructor(private zone: NgZone) {
    }

    ngOnInit(): void {
        this.tappy = new Tappy();
        this.defineListeners();
        this.tappy.requestPermissions();
    }

    private sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private defineListeners() {

        // Status received during bluetooth scans
        this.tappy.on("bleStatusUpdated", (eventData: any) => {
            this.zone.run(() => {
                let status = eventData.status;
                this.canScan = false;
                this.isScanning = false;
                this.isConnected = false;
                this.canStop = false;

                console.log("Tappy BLE SCANNING STATUS: " + this.tappy.tappyScannerStatusToString(status));

                if (status === TappyBleScannerStatus.STATUS_POWERED_ON) {
                    this.canScan = true;
                    this.message = "Bluetooth Enabled. Tap to scan";
                } else if (status === TappyBleScannerStatus.STATUS_POWERED_OFF ) {
                    this.message = "Bluetooth Disabled. Enable bluetooth to scan!";
                } else if (status === TappyBleScannerStatus.STATUS_SCANNING) {
                    this.message = "Scanning for TappyBle devices ...";
                    this.isScanning = true;
                } else {
                    console.log("Received UNKNOWN STATUS event");
                    this.message = "Could not access bluetooth. Error code: " + status;
                }
            });
        });

        // Status received during scanning when a tappy is found
        this.tappy.on("tappyFound", (eventData: any) => {
          let device: TappyDevice = eventData.device;
          let name = device.deviceName;
          this.discoveredDevices[name] = device;
          this.discoveredDeviceNames.push(name);
          this.tappyFound = true;
          console.log("Found device: " + JSON.stringify(device));
          this.zone.run(() => {
            this.message = "Found device(s): " + JSON.stringify(this.discoveredDeviceNames);
          });
        });

        // Status during and after connection
        this.tappy.on("tappyStatusUpdated", (eventData: any) => {
           let status: TappyStatus = eventData.status;
           console.log("Tappy STATUS CHANGE: " + this.tappy.tappyStatusToString(status));
           if (status === TappyStatus.STATUS_CONNECTING) {
             this.zone.run(() => {
                this.message = "Connecting to " + this.connectedDevice.deviceName;
             });
           }
           else if (status === TappyStatus.STATUS_READY) {
             this.tappy.setResponseListener();
             setTimeout(() => {
                this.tappy.getFirmwareVersion();
             }, 1000);
             this.zone.run(() => {
                this.message = "Connected to " + this.connectedDevice.deviceName;
                this.canScan = false;
                this.isConnected = true;
                this.isScanning = false;
                this.canConnect = false;
                this.canPerformIO = true;
                this.canStop = false;
                this.continueAfterTimeout = false;
            });
           }
           else if (status === TappyStatus.STATUS_DISCONNECTED) {
             this.zone.run(() => {
                this.message = "Disconnected from " + this.connectedDevice.deviceName;
                this.canScan = true;
                this.isConnected = false;
                this.isScanning = false;
                this.canConnect = this.tappyFound;
                this.canPerformIO = false;
                this.canStop = false;
             });
           }
        });

        // Tappy Response after a write
        this.tappy.on("writtenResponse", (eventData: any) => {
          let success = eventData.success;
          console.log("Written response:");
          console.log(eventData.success);
          this.zone.run(() => {
            if (success) {
                this.message = "Write was successful";
            } else {
                this.message = "Error writing to NFC. Please try again.";
            }
            this.canPerformIO = true;
            this.canStop = false;
          });
        });

        // on wristband data read
        this.tappy.on("ndefFoundResponse", (eventData: any) => {
            console.log("Tag Read Successful!");
            let copyEventData = {...eventData};
            copyEventData.object = undefined;
            for (let key in copyEventData) {
                console.log("  "+key);
            }
            let duration = eventData.timestamp - this.timestamp;
            this.timestamp = eventData.timestamp;
            console.log("Time duration: ", duration);
            let data = eventData.ndefData;
            console.log("eventData.ndefData=", data);
            let text = this.tagCounter + ": " + JSON.stringify(data);
            this.tagCounter++;
            let ndef = "No NDEF Records found";
            console.log(text);
            if (data.ndefText) {
                ndef = "TEXT: " + data.ndefText;
            }
            if (data.uriText) {
                ndef = "URI: " + data.uriText;
            }
            // if (eventData.ndefRecord) {
            //     console.log("NdefRecord: " + JSON.stringify(eventData.ndefRecord));
            // }
            this.zone.run(async () => {
                this.tagText = text;
                this.ndefText = ndef;
            });
            if (!this.isStreaming) {
                this.zone.run(() => {
                    this.canPerformIO = true;
                    this.canStop = false;
                });
            }
        });

        this.tappy.on("firmwareVersion", (eventData: any) => {
            console.log("Get Firmware version response");
            this.zone.run(() => {
                this.message = "Firmware Version Response: v" + eventData.majorVersion + "." + eventData.minorVersion;
            });
        });

        this.tappy.on("TappyTimeout", (eventData: any) => {
            console.log("Tappy has timed out");
            if (this.continueAfterTimeout) {
                this.tappy.scanTag(10);
            }
            else {
                this.zone.run(() => {
                    this.message = "Tappy has timed out";
                    this.canPerformIO = true;
                    this.canStop = false;
                });
            }
        });

        this.tappy.on("connectTimeout", (eventData: any) => {
            console.log("Connect timeout, could not connect to the tappy");
            console.log("TappyStatus=", this.tappy.tappyStatusToString(this.tappy.getTappyStatus()));
            this.zone.run(() => {
                this.message = "Could not connect to the Tappy; connection has timed out.";
                this.canScan = true;
            });
        });
    }

    startScan(): void {
        if (this.tappy.startScan()) {
            this.discoveredDevices = { };
            this.discoveredDeviceNames = [ ];
            this.isScanning = true;
            this.tappyFound = false;
        }
        else {
            Dialogs.alert("this.tappy.startScan() failed");
        }
    }

    stopScan(): void {
        this.tappy.stopScan();
        this.isScanning = false;
        if (this.tappyFound) {
            this.canConnect = true;
        }
    }

    connectTappy(): void {
        if (this.isScanning) {
            this.stopScan();
        }
        Dialogs.action({
            message: "Select a Tappy",
            cancelButtonText: "Cancel",
            actions: this.discoveredDeviceNames
        }).then((result) => {
            console.log("Dialog result: " + result);
            if (result) {
                this.connectedDevice = this.discoveredDevices[result];
                try {
                    this.tappy.connect(this.connectedDevice,120);
                    this.canScan = false;
                }
                catch (err) {
                    Dialogs.alert(err);
                }
            }
        });
    }

    disconnectTappy(): void {
        this.tappy.disconnect();
        this.canScan = true;
        this.canConnect = true;
        this.isConnected = false;
        this.canPerformIO = false;
        this.canStop = false;
        this.message = "Disconnecting...";
    }

    readNDEF(): void {
        this.tappy.streamNDEF();
        this.canPerformIO = false;
        this.isStreaming = true;
        this.canStop = true;
        this.tagText = "";
        this.ndefText = "";
    }

    streamTag(): void {
        this.tappy.streamTag();
        this.canPerformIO = false;
        this.isStreaming = true;
        this.canStop = true;
        this.tagText = "";
        this.ndefText = "";
    }

    writeNDEF(): void {
        console.log("Write some text");
        let text = "This is a test of the emergency broadcast system. This is only a test.";
        // let text = '12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678';
        // let text = "aosdksaod,sa19292msakdheendishere!";
        // "70cbe99a-3764-11e8-b467-0ed5f89f718b";
        this.message = "Writing text " + text + " ...";
        this.tappy.writeNDEF(text);
        this.canPerformIO = false;
        this.isStreaming = false;
        this.tagText = "";
        this.ndefText = "";
    }

    writeURI(): void {
        console.log("Do Write long url");
        let uri = "https://funfangle.com/camps/";
        // let text = "aosdksaod,sa19292msakdheendishere!";
        // "70cbe99a-3764-11e8-b467-0ed5f89f718b";
        this.message = "Writing text " + uri + " ...";
        this.tappy.writeUri(uri);
        this.canPerformIO = false;
        this.isStreaming = false;
        this.tagText = "";
        this.ndefText = "";
    }

    scanTag(): void {
        this.tappy.scanTag();
        this.canPerformIO = false;
        this.isStreaming = false;
        this.canStop = true;
        this.tagText = "";
        this.ndefText = "";
    }

    scanTagTimeout(): void {
        this.continueAfterTimeout = true;
        this.tappy.scanTag(10);
        this.canPerformIO = false;
        this.isStreaming = false;
        this.canStop = true;
        this.tagText = "";
        this.ndefText = "";
    }

    scanNDEF(): void {
        this.tappy.scanNDEF();
        this.canPerformIO = false;
        this.isStreaming = false;
        this.canStop = true;
        this.tagText = "";
        this.ndefText = "";
    }

    stop(): void {
        this.tappy.stop();
        this.canPerformIO = true;
        this.isStreaming = false;
        this.canStop = false;
        this.continueAfterTimeout = false;
    }
}
