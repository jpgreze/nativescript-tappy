import { Common, LockingMode, TappyBleScannerStatus, TappyStatus } from './tappy.common';
export declare class TappyBleDevice extends NSObject {
    static alloc(): TappyBleDevice;
    static new(): TappyBleDevice;
    deviceId: NSUUID;
    deviceName: string;
    name(): string;
}
export declare class TappyDevice {
    deviceName: string;
    iosDevice: TappyBleDevice;
}
export declare class Tappy extends Common {
    private scanner;
    private status;
    private tappyCentralManager;
    private tappyBle;
    private firmwareVersionCommand;
    private stopCommand;
    private connectTimer;
    constructor();
    private setupScanner;
    requestPermissions(): Promise<boolean>;
    getTappyStatus(): TappyStatus;
    getScannerStatus(): TappyBleScannerStatus;
    connect(device: TappyDevice, timeoutSeconds?: number): void;
    setResponseListener(): boolean;
    disconnect(): void;
    startScan(): boolean;
    stopScan(): void;
    writeNDEF(text: string, timeout?: number, lockTag?: LockingMode): boolean;
    streamNDEF(timeout?: number): boolean;
    scanNDEF(timeout?: number): boolean;
    scanTag(timeout?: number): boolean;
    streamTag(timeout?: number): boolean;
    stop(): boolean;
    getFirmwareVersion(): boolean;
    getTCMPTappyVersionNumber(): number;
}
