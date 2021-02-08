// TCMP Tappy system and basic NFC command native interfaces for Tappy Version 2

declare module com {
	export module taptrack {
		export module tcmptappy {
			export module commandfamilies {
				export module basicnfc {
					export class BuildConfig {
						public static class: java.lang.Class<com.taptrack.tcmptappy.commandfamilies.basicnfc.BuildConfig>;
						public static DEBUG: boolean;
						public static APPLICATION_ID: string;
						public static BUILD_TYPE: string;
						public static FLAVOR: string;
						public static VERSION_CODE: number;
						public static VERSION_NAME: string;
						public constructor();
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module basicnfc {
					export abstract class AbstractBasicNfcMessage {
						public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.basicnfc.AbstractBasicNfcMessage>;
						public getCommandFamily(): native.Array<number>;
						public constructor();
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module basicnfc {
					export class AutoPollingConstants {
						public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.basicnfc.AutoPollingConstants>;
					}
					export module AutoPollingConstants {
						export class ResponseTagTypes {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.basicnfc.AutoPollingConstants.ResponseTagTypes>;
							public static TYPE_2: number;
							public static TYPE_1: number;
							public static TYPE_4B: number;
							public static FELICIA: number;
							public static TYPE_4A: number;
							public static UNRECOGNIZED_TYPE: number;
							public constructor();
						}
						export class ScanModes {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.basicnfc.AutoPollingConstants.ScanModes>;
							public static TYPE_2: number;
							public static TYPE_1: number;
							public static TYPE_4B: number;
							public static FELICIA: number;
							public static TYPE_4A: number;
							public static ALL: number;
							public constructor();
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module basicnfc {
					export class BasicNfcCommandResolver {
						public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.basicnfc.BasicNfcCommandResolver>;
						public static FAMILY_ID: native.Array<number>;
						public constructor();
						public getCommandFamilyId(): native.Array<number>;
						public resolveCommand(param0: com.taptrack.tcmptappy2.TCMPMessage): com.taptrack.tcmptappy2.TCMPMessage;
						public resolveResponse(param0: com.taptrack.tcmptappy2.TCMPMessage): com.taptrack.tcmptappy2.TCMPMessage;
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module basicnfc {
					export class LockingModes {
						public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.basicnfc.LockingModes>;
						public static DONT_LOCK: number;
						public static LOCK_TAG: number;
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module basicnfc {
					export class PollingModes {
						public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.basicnfc.PollingModes>;
						public static MODE_TYPE1: number;
						public static MODE_GENERAL: number;
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module basicnfc {
					export class TlvParser {
						public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.basicnfc.TlvParser>;
						public constructor();
						public static parseTlvsFromBinary(param0: native.Array<number>): java.util.List<com.taptrack.tcmptappy2.commandfamilies.basicnfc.TlvParser.Tlv>;
						public static composeBinaryFromTlvs(param0: java.util.List<com.taptrack.tcmptappy2.commandfamilies.basicnfc.TlvParser.Tlv>): native.Array<number>;
					}
					export module TlvParser {
						export class Tlv {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.basicnfc.TlvParser.Tlv>;
							public constructor(param0: number, param1: native.Array<number>);
							public getType(): number;
							public getValue(): native.Array<number>;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module basicnfc {
					export module commands {
						export abstract class AbstractPollingCommand extends com.taptrack.tcmptappy2.commandfamilies.basicnfc.AbstractBasicNfcMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.basicnfc.commands.AbstractPollingCommand>;
							public constructor();
							public parsePayload(param0: native.Array<number>): void;
							public getTimeout(): number;
							public getPayload(): native.Array<number>;
							public constructor(param0: number, param1: number);
							public setPollingMode(param0: number): void;
							public setTimeout(param0: number): void;
							public getPollingMode(): number;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module basicnfc {
					export module commands {
						export class AutoPollCommand extends com.taptrack.tcmptappy2.commandfamilies.basicnfc.AbstractBasicNfcMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.basicnfc.commands.AutoPollCommand>;
							public static COMMAND_CODE: number;
							public constructor();
							public parsePayload(param0: native.Array<number>): void;
							public getPayload(): native.Array<number>;
							public getHeartBeatPeriod(): number;
							public setBuzzerDisabled(param0: boolean): void;
							public getCommandCode(): number;
							public setHeartBeatPeriod(param0: number): void;
							public isBuzzerDisabled(): boolean;
							public constructor(param0: number, param1: number, param2: boolean);
							public getScanModeIndicator(): number;
							public setScanModeIndicator(param0: number): void;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module basicnfc {
					export module commands {
						export class DispatchTagsCommand extends com.taptrack.tcmptappy2.commandfamilies.basicnfc.AbstractBasicNfcMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.basicnfc.commands.DispatchTagsCommand>;
							public static COMMAND_CODE: number;
							public constructor();
							public parsePayload(param0: native.Array<number>): void;
							public getTimeout(): number;
							public getPayload(): native.Array<number>;
							public getCommandCode(): number;
							public setTimeout(param0: number): void;
							public constructor(param0: number);
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module basicnfc {
					export module commands {
						export class GetBasicNfcLibraryVersionCommand extends com.taptrack.tcmptappy2.commandfamilies.basicnfc.AbstractBasicNfcMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.basicnfc.commands.GetBasicNfcLibraryVersionCommand>;
							public static COMMAND_CODE: number;
							public constructor();
							public parsePayload(param0: native.Array<number>): void;
							public getPayload(): native.Array<number>;
							public getCommandCode(): number;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module basicnfc {
					export module commands {
						export class LockTagCommand extends com.taptrack.tcmptappy2.commandfamilies.basicnfc.AbstractBasicNfcMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.basicnfc.commands.LockTagCommand>;
							public static COMMAND_CODE: number;
							public timeout: number;
							public tagCode: native.Array<number>;
							public constructor();
							public constructor(param0: number, param1: native.Array<number>);
							public parsePayload(param0: native.Array<number>): void;
							public getTimeout(): number;
							public getPayload(): native.Array<number>;
							public getTagCode(): native.Array<number>;
							public getCommandCode(): number;
							public setTagCode(param0: native.Array<number>): void;
							public setTimeout(param0: number): void;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module basicnfc {
					export module commands {
						export class ScanNdefCommand extends com.taptrack.tcmptappy2.commandfamilies.basicnfc.commands.AbstractPollingCommand {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.basicnfc.commands.ScanNdefCommand>;
							public static COMMAND_CODE: number;
							public constructor();
							public constructor(param0: number, param1: number);
							public getCommandCode(): number;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module basicnfc {
					export module commands {
						export class ScanTagCommand extends com.taptrack.tcmptappy2.commandfamilies.basicnfc.commands.AbstractPollingCommand {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.basicnfc.commands.ScanTagCommand>;
							public static COMMAND_CODE: number;
							public constructor();
							public constructor(param0: number, param1: number);
							public getCommandCode(): number;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module basicnfc {
					export module commands {
						export class StopCommand extends com.taptrack.tcmptappy2.commandfamilies.basicnfc.AbstractBasicNfcMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.basicnfc.commands.StopCommand>;
							public static COMMAND_CODE: number;
							public constructor();
							public parsePayload(param0: native.Array<number>): void;
							public getPayload(): native.Array<number>;
							public getCommandCode(): number;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module basicnfc {
					export module commands {
						export class StreamNdefCommand extends com.taptrack.tcmptappy2.commandfamilies.basicnfc.commands.AbstractPollingCommand {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.basicnfc.commands.StreamNdefCommand>;
							public static COMMAND_CODE: number;
							public constructor();
							public constructor(param0: number, param1: number);
							public getCommandCode(): number;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module basicnfc {
					export module commands {
						export class StreamTagsCommand extends com.taptrack.tcmptappy2.commandfamilies.basicnfc.commands.AbstractPollingCommand {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.basicnfc.commands.StreamTagsCommand>;
							public static COMMAND_CODE: number;
							public constructor();
							public constructor(param0: number, param1: number);
							public getCommandCode(): number;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module basicnfc {
					export module commands {
						export class WriteNdefCustomMessageCommand extends com.taptrack.tcmptappy2.commandfamilies.basicnfc.AbstractBasicNfcMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.basicnfc.commands.WriteNdefCustomMessageCommand>;
							public static COMMAND_CODE: number;
							public timeout: number;
							public lockflag: number;
							public content: native.Array<number>;
							public constructor();
							public getTimeout(): number;
							public getLockflag(): number;
							public getPayload(): native.Array<number>;
							public getCommandCode(): number;
							public setContent(param0: native.Array<number>): void;
							public setToLock(param0: boolean): void;
							public constructor(param0: number, param1: number, param2: native.Array<number>);
							public setContent(param0: globalAndroid.nfc.NdefMessage): void;
							public getContentBytes(): native.Array<number>;
							public parsePayload(param0: native.Array<number>): void;
							public constructor(param0: number, param1: boolean, param2: native.Array<number>);
							public setLockflag(param0: number): void;
							public constructor(param0: number, param1: number, param2: globalAndroid.nfc.NdefMessage);
							public setTimeout(param0: number): void;
							public willLock(): boolean;
							public getContent(): globalAndroid.nfc.NdefMessage;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module basicnfc {
					export module commands {
						export class WriteNdefTextRecordCommand extends com.taptrack.tcmptappy2.commandfamilies.basicnfc.AbstractBasicNfcMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.basicnfc.commands.WriteNdefTextRecordCommand>;
							public static COMMAND_CODE: number;
							public timeout: number;
							public lockflag: number;
							public text: native.Array<number>;
							public constructor();
							public getTimeout(): number;
							public setText(param0: native.Array<number>): void;
							public getLockflag(): number;
							public getText(): string;
							public getPayload(): native.Array<number>;
							public getCommandCode(): number;
							public setToLock(param0: boolean): void;
							public constructor(param0: number, param1: number, param2: native.Array<number>);
							public parsePayload(param0: native.Array<number>): void;
							public constructor(param0: number, param1: boolean, param2: native.Array<number>);
							public setLockflag(param0: number): void;
							public setTimeout(param0: number): void;
							public getTextBytes(): native.Array<number>;
							public willLock(): boolean;
							public constructor(param0: number, param1: number, param2: string);
							public setText(param0: string): void;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module basicnfc {
					export module commands {
						export class WriteNdefUriRecordCommand extends com.taptrack.tcmptappy2.commandfamilies.basicnfc.AbstractBasicNfcMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.basicnfc.commands.WriteNdefUriRecordCommand>;
							public static COMMAND_CODE: number;
							public timeout: number;
							public lockflag: number;
							public uriCode: number;
							public uri: native.Array<number>;
							public constructor();
							public getTimeout(): number;
							public getLockflag(): number;
							public setUri(param0: string): void;
							public getPayload(): native.Array<number>;
							public getCommandCode(): number;
							public setToLock(param0: boolean): void;
							public setUriCode(param0: number): void;
							public getUri(): string;
							public getUriCode(): number;
							public parsePayload(param0: native.Array<number>): void;
							public setLockflag(param0: number): void;
							public constructor(param0: number, param1: boolean, param2: number, param3: string);
							public setTimeout(param0: number): void;
							public constructor(param0: number, param1: number, param2: number, param3: native.Array<number>);
							public getUriBytes(): native.Array<number>;
							public willLock(): boolean;
							public constructor(param0: number, param1: boolean, param2: number, param3: native.Array<number>);
							public setUri(param0: native.Array<number>): void;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module basicnfc {
					export module responses {
						export class AutoPollTagEnteredResponse extends com.taptrack.tcmptappy2.commandfamilies.basicnfc.AbstractBasicNfcMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.basicnfc.responses.AutoPollTagEnteredResponse>;
							public static COMMAND_CODE: number;
							public constructor();
							public constructor(param0: number, param1: native.Array<number>);
							public parsePayload(param0: native.Array<number>): void;
							public getDetectedTagType(): number;
							public getPayload(): native.Array<number>;
							public setTagMetadata(param0: native.Array<number>): void;
							public getCommandCode(): number;
							public setDetectedTagType(param0: number): void;
							public getTagMetadata(): native.Array<number>;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module basicnfc {
					export module responses {
						export class AutoPollTagExitedResponse extends com.taptrack.tcmptappy2.commandfamilies.basicnfc.AbstractBasicNfcMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.basicnfc.responses.AutoPollTagExitedResponse>;
							public static COMMAND_CODE: number;
							public constructor();
							public constructor(param0: number, param1: native.Array<number>);
							public parsePayload(param0: native.Array<number>): void;
							public getDetectedTagType(): number;
							public getPayload(): native.Array<number>;
							public setTagMetadata(param0: native.Array<number>): void;
							public getCommandCode(): number;
							public setDetectedTagType(param0: number): void;
							public getTagMetadata(): native.Array<number>;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module basicnfc {
					export module responses {
						export class BasicNfcErrorResponse extends com.taptrack.tcmptappy2.commandfamilies.basicnfc.AbstractBasicNfcMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.basicnfc.responses.BasicNfcErrorResponse>;
							public static COMMAND_CODE: number;
							public constructor();
							public setReaderStatus(param0: number): void;
							public setErrorMessage(param0: native.Array<number>): void;
							public getPayload(): native.Array<number>;
							public getCommandCode(): number;
							public getErrorCode(): number;
							public setInternalErrorCode(param0: number): void;
							public getErrorMessage(): string;
							public parsePayload(param0: native.Array<number>): void;
							public setErrorCode(param0: number): void;
							public constructor(param0: number, param1: number, param2: number, param3: string);
							public getInternalErrorCode(): number;
							public getReaderStatus(): number;
							public setErrorMessage(param0: string): void;
						}
						export module BasicNfcErrorResponse {
							export class ErrorCodes {
								public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.basicnfc.responses.BasicNfcErrorResponse.ErrorCodes>;
								/**
								 * Constructs a new instance of the com.taptrack.tcmptappy2.commandfamilies.basicnfc.responses.BasicNfcErrorResponse$ErrorCodes interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
								 */
								public constructor(implementation: {
								});
								public constructor();
								public static TOO_FEW_PARAMETERS: number;
								public static POLLING_ERROR: number;
								public static NDEF_MESSAGE_TOO_LARGE: number;
								public static RFU: number;
								public static ERROR_CREATING_NDEF_CONTENT: number;
								public static ERROR_WRITING_NDEF_CONTENT: number;
								public static ERROR_LOCKING_TAG: number;
								public static INVALID_PARAMETER: number;
							}
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module basicnfc {
					export module responses {
						export class BasicNfcLibraryVersionResponse extends com.taptrack.tcmptappy2.commandfamilies.basicnfc.AbstractBasicNfcMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.basicnfc.responses.BasicNfcLibraryVersionResponse>;
							public static COMMAND_CODE: number;
							public constructor();
							public parsePayload(param0: native.Array<number>): void;
							public getMajorVersion(): number;
							public getPayload(): native.Array<number>;
							public constructor(param0: number, param1: number);
							public getCommandCode(): number;
							public getMinorVersion(): number;
							public setMinorVersion(param0: number): void;
							public setMajorVersion(param0: number): void;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module basicnfc {
					export module responses {
						export class NdefFoundResponse extends com.taptrack.tcmptappy2.commandfamilies.basicnfc.AbstractBasicNfcMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.basicnfc.responses.NdefFoundResponse>;
							public static COMMAND_CODE: number;
							public constructor();
							public parsePayload(param0: native.Array<number>): void;
							public setMessage(param0: globalAndroid.nfc.NdefMessage): void;
							public getPayload(): native.Array<number>;
							public getTagCode(): native.Array<number>;
							public getMessage(): globalAndroid.nfc.NdefMessage;
							public getCommandCode(): number;
							public setTagCode(param0: native.Array<number>): void;
							public getTagType(): number;
							public setTagType(param0: number): void;
							public constructor(param0: native.Array<number>, param1: number, param2: globalAndroid.nfc.NdefMessage);
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module basicnfc {
					export module responses {
						export class ScanTimeoutResponse extends com.taptrack.tcmptappy2.commandfamilies.basicnfc.AbstractBasicNfcMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.basicnfc.responses.ScanTimeoutResponse>;
							public static COMMAND_CODE: number;
							public constructor();
							public parsePayload(param0: native.Array<number>): void;
							public getPayload(): native.Array<number>;
							public getCommandCode(): number;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module basicnfc {
					export module responses {
						export class SignedTagFoundResponse extends com.taptrack.tcmptappy2.commandfamilies.basicnfc.AbstractBasicNfcMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.basicnfc.responses.SignedTagFoundResponse>;
							public static COMMAND_CODE: number;
							public constructor();
							public parsePayload(param0: native.Array<number>): void;
							public getPayload(): native.Array<number>;
							public getTagCode(): native.Array<number>;
							public getCommandCode(): number;
							public getTagType(): number;
							public constructor(param0: native.Array<number>, param1: number);
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module basicnfc {
					export module responses {
						export class TagFoundResponse extends com.taptrack.tcmptappy2.commandfamilies.basicnfc.AbstractBasicNfcMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.basicnfc.responses.TagFoundResponse>;
							public static COMMAND_CODE: number;
							public constructor();
							public parsePayload(param0: native.Array<number>): void;
							public getPayload(): native.Array<number>;
							public getTagCode(): native.Array<number>;
							public getCommandCode(): number;
							public getTagType(): number;
							public constructor(param0: native.Array<number>, param1: number);
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module basicnfc {
					export module responses {
						export class TagLockedResponse extends com.taptrack.tcmptappy2.commandfamilies.basicnfc.AbstractBasicNfcMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.basicnfc.responses.TagLockedResponse>;
							public static COMMAND_CODE: number;
							public constructor();
							public parsePayload(param0: native.Array<number>): void;
							public getPayload(): native.Array<number>;
							public getTagCode(): native.Array<number>;
							public getCommandCode(): number;
							public setTagCode(param0: native.Array<number>): void;
							public getTagType(): number;
							public setTagType(param0: number): void;
							public constructor(param0: native.Array<number>, param1: number);
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module basicnfc {
					export module responses {
						export class TagWrittenResponse extends com.taptrack.tcmptappy2.commandfamilies.basicnfc.AbstractBasicNfcMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.basicnfc.responses.TagWrittenResponse>;
							public static COMMAND_CODE: number;
							public constructor();
							public parsePayload(param0: native.Array<number>): void;
							public getPayload(): native.Array<number>;
							public getTagCode(): native.Array<number>;
							public getCommandCode(): number;
							public setTagCode(param0: native.Array<number>): void;
							public getTagType(): number;
							public setTagType(param0: number): void;
							public constructor(param0: native.Array<number>, param1: number);
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export abstract class AbstractSystemMessage {
						public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.AbstractSystemMessage>;
						public getCommandFamily(): native.Array<number>;
						public constructor();
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export class SystemCommandResolver {
						public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.SystemCommandResolver>;
						public static FAMILY_ID: native.Array<number>;
						public constructor();
						public getCommandFamilyId(): native.Array<number>;
						public resolveCommand(param0: com.taptrack.tcmptappy2.TCMPMessage): com.taptrack.tcmptappy2.TCMPMessage;
						public resolveResponse(param0: com.taptrack.tcmptappy2.TCMPMessage): com.taptrack.tcmptappy2.TCMPMessage;
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export module commands {
						export class ActivateBlueLEDCommand extends com.taptrack.tcmptappy2.commandfamilies.systemfamily.AbstractSystemMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.commands.ActivateBlueLEDCommand>;
							public static COMMAND_CODE: number;
							public constructor();
							public parsePayload(param0: native.Array<number>): void;
							public getPayload(): native.Array<number>;
							public getCommandCode(): number;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export module commands {
						export class ActivateBlueLEDForDurationCommand extends com.taptrack.tcmptappy2.commandfamilies.systemfamily.AbstractSystemMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.commands.ActivateBlueLEDForDurationCommand>;
							public static COMMAND_CODE: number;
							public constructor();
							public parsePayload(param0: native.Array<number>): void;
							public getPayload(): native.Array<number>;
							public setDuration(param0: number): void;
							public getCommandCode(): number;
							public getDuration(): number;
							public constructor(param0: number);
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export module commands {
						export class ActivateBuzzerCommand extends com.taptrack.tcmptappy2.commandfamilies.systemfamily.AbstractSystemMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.commands.ActivateBuzzerCommand>;
							public static COMMAND_CODE: number;
							public constructor();
							public parsePayload(param0: native.Array<number>): void;
							public getPayload(): native.Array<number>;
							public getCommandCode(): number;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export module commands {
						export class ActivateBuzzerForDurationCommand extends com.taptrack.tcmptappy2.commandfamilies.systemfamily.AbstractSystemMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.commands.ActivateBuzzerForDurationCommand>;
							public static COMMAND_CODE: number;
							public constructor();
							public parsePayload(param0: native.Array<number>): void;
							public getPayload(): native.Array<number>;
							public setDuration(param0: number): void;
							public getCommandCode(): number;
							public getDuration(): number;
							public constructor(param0: number);
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export module commands {
						export class ActivateGreenLEDCommand extends com.taptrack.tcmptappy2.commandfamilies.systemfamily.AbstractSystemMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.commands.ActivateGreenLEDCommand>;
							public static COMMAND_CODE: number;
							public constructor();
							public parsePayload(param0: native.Array<number>): void;
							public getPayload(): native.Array<number>;
							public getCommandCode(): number;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export module commands {
						export class ActivateGreenLEDForDurationCommand extends com.taptrack.tcmptappy2.commandfamilies.systemfamily.AbstractSystemMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.commands.ActivateGreenLEDForDurationCommand>;
							public static COMMAND_CODE: number;
							public constructor();
							public parsePayload(param0: native.Array<number>): void;
							public getPayload(): native.Array<number>;
							public setDuration(param0: number): void;
							public getCommandCode(): number;
							public getDuration(): number;
							public constructor(param0: number);
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export module commands {
						export class ActivateRedLEDCommand extends com.taptrack.tcmptappy2.commandfamilies.systemfamily.AbstractSystemMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.commands.ActivateRedLEDCommand>;
							public static COMMAND_CODE: number;
							public constructor();
							public parsePayload(param0: native.Array<number>): void;
							public getPayload(): native.Array<number>;
							public getCommandCode(): number;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export module commands {
						export class ActivateRedLEDForDurationCommand extends com.taptrack.tcmptappy2.commandfamilies.systemfamily.AbstractSystemMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.commands.ActivateRedLEDForDurationCommand>;
							public static COMMAND_CODE: number;
							public constructor();
							public parsePayload(param0: native.Array<number>): void;
							public getPayload(): native.Array<number>;
							public setDuration(param0: number): void;
							public getCommandCode(): number;
							public getDuration(): number;
							public constructor(param0: number);
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export module commands {
						export class ConfigureKioskModeCommand extends com.taptrack.tcmptappy2.commandfamilies.systemfamily.AbstractSystemMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.commands.ConfigureKioskModeCommand>;
							public static COMMAND_CODE: number;
							public static DEFAULT_HEARTBEAT_PERIOD: number;
							public static DEFAULT_SUCCESSFUL_SCAN_LED_TIMEOUT: number;
							public static DEFAULT_FAILED_SCAN_LED_TIMEOUT: number;
							public static DEFAULT_POST_SCAN_DELAY_TIMEOUT: number;
							public static DEFAULT_POST_SUCCESSFUL_SCAN_BEEP_DURATION: number;
							public setScanErrorSetting(param0: number): void;
							public getPostSuccessfulScanBeepDuration(): number;
							public getHeartbeatPeriod(): number;
							public getPayload(): native.Array<number>;
							public getPostScanDelayTimeout(): number;
							public willTransmitSuccessfulScanLedTimeout(): boolean;
							public parsePayload(param0: native.Array<number>): void;
							public setPostScanDelayTimeout(param0: number): void;
							public setNdefSetting(param0: number): void;
							public setPostSuccessfulScanBeepDuration(param0: number): void;
							public disableTransmittingPostScanBeepDuration(): void;
							public constructor(param0: number, param1: number, param2: number, param3: number);
							public constructor();
							public getCommandCode(): number;
							public getFailedScanLedTimeout(): number;
							public disableTransmittingFailedScanLedTimeout(): void;
							public willTransmitPostScanDelayTimeout(): boolean;
							public getSuccessfulScanLedTimeout(): number;
							public setFailedScanLedTimeout(param0: number): void;
							public willTransmitFailedScanLedTimeout(): boolean;
							public setPollingSetting(param0: number): void;
							public setHeartbeatPeriod(param0: number): void;
							public disableTransmittingPostScanDelayTimeout(): void;
							public willTransmitPostScanBeepDuration(): boolean;
							public getScanErrorSetting(): number;
							public getNdefSetting(): number;
							public setSuccessfulScanLedTimeout(param0: number): void;
							public getPollingSetting(): number;
							public disableTransmittingSuccessfulScanLedTimeout(): void;
						}
						export module ConfigureKioskModeCommand {
							export class NdefSettings {
								public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.commands.ConfigureKioskModeCommand.NdefSettings>;
								/**
								 * Constructs a new instance of the com.taptrack.tcmptappy2.commandfamilies.systemfamily.commands.ConfigureKioskModeCommand$NdefSettings interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
								 */
								public constructor(implementation: {
								});
								public constructor();
								public static DISABLE_NDEF_DETECTION: number;
								public static ENABLE_NDEF_DETECTION: number;
								public static NO_CHANGE: number;
							}
							export class PollingSettings {
								public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.commands.ConfigureKioskModeCommand.PollingSettings>;
								/**
								 * Constructs a new instance of the com.taptrack.tcmptappy2.commandfamilies.systemfamily.commands.ConfigureKioskModeCommand$PollingSettings interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
								 */
								public constructor(implementation: {
								});
								public constructor();
								public static ENABLE_DUAL_POLLING: number;
								public static DISABLE_DUAL_POLLING: number;
								public static NO_CHANGE: number;
							}
							export class ScanErrorSettings {
								public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.commands.ConfigureKioskModeCommand.ScanErrorSettings>;
								/**
								 * Constructs a new instance of the com.taptrack.tcmptappy2.commandfamilies.systemfamily.commands.ConfigureKioskModeCommand$ScanErrorSettings interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
								 */
								public constructor(implementation: {
								});
								public constructor();
								public static ENABLE_SCAN_ERROR_MESSAGES: number;
								public static NO_CHANGE: number;
								public static DISABLE_SCAN_ERROR_MESSAGES: number;
							}
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export module commands {
						export class ConfigureOnboardScanCooldownCommand extends com.taptrack.tcmptappy2.commandfamilies.systemfamily.AbstractSystemMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.commands.ConfigureOnboardScanCooldownCommand>;
							public static COMMAND_CODE: number;
							public constructor();
							public parsePayload(param0: native.Array<number>): void;
							public getPayload(): native.Array<number>;
							public constructor(param0: number, param1: number);
							public getCooldownSetting(): number;
							public setBufferSize(param0: number): void;
							public getCommandCode(): number;
							public setCooldownSetting(param0: number): void;
							public getBufferSize(): number;
						}
						export module ConfigureOnboardScanCooldownCommand {
							export class CooldownSettings {
								public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.commands.ConfigureOnboardScanCooldownCommand.CooldownSettings>;
								/**
								 * Constructs a new instance of the com.taptrack.tcmptappy2.commandfamilies.systemfamily.commands.ConfigureOnboardScanCooldownCommand$CooldownSettings interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
								 */
								public constructor(implementation: {
								});
								public constructor();
								public static ENABLE_COOLDOWN: number;
								public static DISABLE_COOLDOWN: number;
								public static NO_CHANGE: number;
							}
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export module commands {
						export class DeactivateBlueLEDCommand extends com.taptrack.tcmptappy2.commandfamilies.systemfamily.AbstractSystemMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.commands.DeactivateBlueLEDCommand>;
							public static COMMAND_CODE: number;
							public constructor();
							public parsePayload(param0: native.Array<number>): void;
							public getPayload(): native.Array<number>;
							public getCommandCode(): number;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export module commands {
						export class DeactivateBuzzerCommand extends com.taptrack.tcmptappy2.commandfamilies.systemfamily.AbstractSystemMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.commands.DeactivateBuzzerCommand>;
							public static COMMAND_CODE: number;
							public constructor();
							public parsePayload(param0: native.Array<number>): void;
							public getPayload(): native.Array<number>;
							public getCommandCode(): number;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export module commands {
						export class DeactivateGreenLEDCommand extends com.taptrack.tcmptappy2.commandfamilies.systemfamily.AbstractSystemMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.commands.DeactivateGreenLEDCommand>;
							public static COMMAND_CODE: number;
							public constructor();
							public parsePayload(param0: native.Array<number>): void;
							public getPayload(): native.Array<number>;
							public getCommandCode(): number;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export module commands {
						export class DeactivateRedLEDCommand extends com.taptrack.tcmptappy2.commandfamilies.systemfamily.AbstractSystemMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.commands.DeactivateRedLEDCommand>;
							public static COMMAND_CODE: number;
							public constructor();
							public parsePayload(param0: native.Array<number>): void;
							public getPayload(): native.Array<number>;
							public getCommandCode(): number;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export module commands {
						export class DisableHostHeartbeatTransmissionCommand extends com.taptrack.tcmptappy2.commandfamilies.systemfamily.AbstractSystemMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.commands.DisableHostHeartbeatTransmissionCommand>;
							public static COMMAND_CODE: number;
							public constructor();
							public parsePayload(param0: native.Array<number>): void;
							public getPayload(): native.Array<number>;
							public getCommandCode(): number;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export module commands {
						export class GetBatteryLevelCommand extends com.taptrack.tcmptappy2.commandfamilies.systemfamily.AbstractSystemMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.commands.GetBatteryLevelCommand>;
							public static COMMAND_CODE: number;
							public constructor();
							public parsePayload(param0: native.Array<number>): void;
							public getPayload(): native.Array<number>;
							public getCommandCode(): number;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export module commands {
						export class GetFirmwareVersionCommand extends com.taptrack.tcmptappy2.commandfamilies.systemfamily.AbstractSystemMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.commands.GetFirmwareVersionCommand>;
							public static COMMAND_CODE: number;
							public constructor();
							public parsePayload(param0: native.Array<number>): void;
							public getPayload(): native.Array<number>;
							public getCommandCode(): number;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export module commands {
						export class GetHardwareVersionCommand extends com.taptrack.tcmptappy2.commandfamilies.systemfamily.AbstractSystemMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.commands.GetHardwareVersionCommand>;
							public static COMMAND_CODE: number;
							public constructor();
							public parsePayload(param0: native.Array<number>): void;
							public getPayload(): native.Array<number>;
							public getCommandCode(): number;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export module commands {
						export class GetIndicatorStatusCommand extends com.taptrack.tcmptappy2.commandfamilies.systemfamily.AbstractSystemMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.commands.GetIndicatorStatusCommand>;
							public static COMMAND_CODE: number;
							public constructor();
							public parsePayload(param0: native.Array<number>): void;
							public getPayload(): native.Array<number>;
							public getCommandCode(): number;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export module commands {
						export class PingCommand extends com.taptrack.tcmptappy2.commandfamilies.systemfamily.AbstractSystemMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.commands.PingCommand>;
							public static COMMAND_CODE: number;
							public constructor();
							public parsePayload(param0: native.Array<number>): void;
							public getPayload(): native.Array<number>;
							public getCommandCode(): number;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export module commands {
						export class SetConfigItemCommand extends com.taptrack.tcmptappy2.commandfamilies.systemfamily.AbstractSystemMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.commands.SetConfigItemCommand>;
							public static COMMAND_CODE: number;
							public constructor();
							public getPayload(): native.Array<number>;
							public constructor(param0: number, param1: number);
							public getCommandCode(): number;
							public static makeBluetoothPINParingCommand(param0: string): com.taptrack.tcmptappy2.commandfamilies.systemfamily.commands.SetConfigItemCommand;
							public setParameter(param0: number): void;
							public setValue(param0: number): void;
							public constructor(param0: number);
							public setMultibyteValue(param0: native.Array<number>): void;
							public constructor(param0: number, param1: native.Array<number>);
							public parsePayload(param0: native.Array<number>): void;
							public getParameter(): number;
							public getMultibyteValue(): native.Array<number>;
							public getValue(): number;
						}
						export module SetConfigItemCommand {
							export class ParameterBytes {
								public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.commands.SetConfigItemCommand.ParameterBytes>;
								/**
								 * Constructs a new instance of the com.taptrack.tcmptappy2.commandfamilies.systemfamily.commands.SetConfigItemCommand$ParameterBytes interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
								 */
								public constructor(implementation: {
								});
								public constructor();
								public static DATA_THROTTLING: number;
								public static BUZZER_DURATION: number;
								public static DUAL_TYPE1_2_DECTION: number;
								public static DISABLE_BLUETOOTH_PIN_PAIRING: number;
								public static TYPE_2_IDENTIFICATION: number;
								public static ENABLE_BLUETOOTH_PIN_PARING: number;
								public static RED_LED_DURATION: number;
								public static DISABLE_BLUE_LIGHT_DURING_TAG_POLLING: number;
								public static ENABLE_BLUE_LIGHT_DURING_TAG_POLLING: number;
								public static GREEN_LED_DURATION: number;
							}
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export module commands {
						export abstract class Utils {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.commands.Utils>;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export module responses {
						export class BlueLEDActivatedResponse extends com.taptrack.tcmptappy2.commandfamilies.systemfamily.AbstractSystemMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.responses.BlueLEDActivatedResponse>;
							public static COMMAND_CODE: number;
							public constructor();
							public setRedLEDActive(param0: boolean): void;
							public isBlueLEDActive(): boolean;
							public getPayload(): native.Array<number>;
							public getCommandCode(): number;
							public constructor(param0: boolean, param1: boolean, param2: boolean, param3: boolean);
							public setGreenLEDActive(param0: boolean): void;
							public parsePayload(param0: native.Array<number>): void;
							public setBlueLEDActive(param0: boolean): void;
							public isGreenLEDActive(): boolean;
							public isBuzzerActive(): boolean;
							public setBuzzerActive(param0: boolean): void;
							public isRedLEDActive(): boolean;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export module responses {
						export class BlueLEDDeactivatedResponse extends com.taptrack.tcmptappy2.commandfamilies.systemfamily.AbstractSystemMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.responses.BlueLEDDeactivatedResponse>;
							public static COMMAND_CODE: number;
							public constructor();
							public setRedLEDActive(param0: boolean): void;
							public isBlueLEDActive(): boolean;
							public getPayload(): native.Array<number>;
							public getCommandCode(): number;
							public constructor(param0: boolean, param1: boolean, param2: boolean, param3: boolean);
							public setGreenLEDActive(param0: boolean): void;
							public parsePayload(param0: native.Array<number>): void;
							public setBlueLEDActive(param0: boolean): void;
							public isGreenLEDActive(): boolean;
							public isBuzzerActive(): boolean;
							public setBuzzerActive(param0: boolean): void;
							public isRedLEDActive(): boolean;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export module responses {
						export class BuzzerActivatedResponse extends com.taptrack.tcmptappy2.commandfamilies.systemfamily.AbstractSystemMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.responses.BuzzerActivatedResponse>;
							public static COMMAND_CODE: number;
							public constructor();
							public setRedLEDActive(param0: boolean): void;
							public isBlueLEDActive(): boolean;
							public getPayload(): native.Array<number>;
							public getCommandCode(): number;
							public constructor(param0: boolean, param1: boolean, param2: boolean, param3: boolean);
							public setGreenLEDActive(param0: boolean): void;
							public parsePayload(param0: native.Array<number>): void;
							public setBlueLEDActive(param0: boolean): void;
							public isGreenLEDActive(): boolean;
							public isBuzzerActive(): boolean;
							public setBuzzerActive(param0: boolean): void;
							public isRedLEDActive(): boolean;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export module responses {
						export class BuzzerDeactivatedResponse extends com.taptrack.tcmptappy2.commandfamilies.systemfamily.AbstractSystemMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.responses.BuzzerDeactivatedResponse>;
							public static COMMAND_CODE: number;
							public constructor();
							public setRedLEDActive(param0: boolean): void;
							public isBlueLEDActive(): boolean;
							public getPayload(): native.Array<number>;
							public getCommandCode(): number;
							public constructor(param0: boolean, param1: boolean, param2: boolean, param3: boolean);
							public setGreenLEDActive(param0: boolean): void;
							public parsePayload(param0: native.Array<number>): void;
							public setBlueLEDActive(param0: boolean): void;
							public isGreenLEDActive(): boolean;
							public isBuzzerActive(): boolean;
							public setBuzzerActive(param0: boolean): void;
							public isRedLEDActive(): boolean;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export module responses {
						export class ConfigItemResponse extends com.taptrack.tcmptappy2.commandfamilies.systemfamily.AbstractSystemMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.responses.ConfigItemResponse>;
							public static COMMAND_CODE: number;
							public constructor();
							public parsePayload(param0: native.Array<number>): void;
							public getPayload(): native.Array<number>;
							public getCommandCode(): number;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export module responses {
						export class ConfigureKioskModeResponse extends com.taptrack.tcmptappy2.commandfamilies.systemfamily.AbstractSystemMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.responses.ConfigureKioskModeResponse>;
							public static COMMAND_CODE: number;
							public setScanErrorSetting(param0: number): void;
							public getHeartbeatPeriod(): number;
							public getPayload(): native.Array<number>;
							public didReceiveSuccessfulScanLedTimeout(): boolean;
							public getPostScanDelayTimeout(): number;
							public unsetDidReceiveFailedScanLedTimeout(): void;
							public parsePayload(param0: native.Array<number>): void;
							public setPostScanDelayTimeout(param0: number): void;
							public setNdefSetting(param0: number): void;
							public didReceiveFailedScanLedTimeout(): boolean;
							public constructor(param0: number, param1: number, param2: number, param3: number);
							public unsetDidReceivePostScanDelayTimeout(): void;
							public constructor();
							public getCommandCode(): number;
							public getFailedScanLedTimeout(): number;
							public getSuccessfulScanLedTimeout(): number;
							public setFailedScanLedTimeout(param0: number): void;
							public setPollingSetting(param0: number): void;
							public setHeartbeatPeriod(param0: number): void;
							public getScanErrorSetting(): number;
							public getNdefSetting(): number;
							public setSuccessfulScanLedTimeout(param0: number): void;
							public getPollingSetting(): number;
							public unsetDidReceiveSuccessfulScanLedTimeout(): void;
							public didReceivePostScanDelayTimeout(): boolean;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export module responses {
						export class ConfigureOnboardScanCooldownResponse extends com.taptrack.tcmptappy2.commandfamilies.systemfamily.AbstractSystemMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.responses.ConfigureOnboardScanCooldownResponse>;
							public static COMMAND_CODE: number;
							public constructor();
							public parsePayload(param0: native.Array<number>): void;
							public getPayload(): native.Array<number>;
							public setBufferSize(param0: number): void;
							public getCommandCode(): number;
							public setCooldownEnabled(param0: boolean): void;
							public getBufferSize(): number;
							public constructor(param0: boolean, param1: number);
							public isCooldownEnabled(): boolean;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export module responses {
						export class CrcMismatchErrorResponse extends com.taptrack.tcmptappy2.commandfamilies.systemfamily.AbstractSystemMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.responses.CrcMismatchErrorResponse>;
							public static COMMAND_CODE: number;
							public mErrorMessage: native.Array<number>;
							public constructor();
							public parsePayload(param0: native.Array<number>): void;
							public getPayload(): native.Array<number>;
							public getCommandCode(): number;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export module responses {
						export class DisableHostHeartbeatTransmissionResponse extends com.taptrack.tcmptappy2.commandfamilies.systemfamily.AbstractSystemMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.responses.DisableHostHeartbeatTransmissionResponse>;
							public static COMMAND_CODE: number;
							public constructor();
							public parsePayload(param0: native.Array<number>): void;
							public getPayload(): native.Array<number>;
							public getCommandCode(): number;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export module responses {
						export class FirmwareVersionResponse extends com.taptrack.tcmptappy2.commandfamilies.systemfamily.AbstractSystemMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.responses.FirmwareVersionResponse>;
							public static COMMAND_CODE: number;
							public constructor();
							public parsePayload(param0: native.Array<number>): void;
							public getMajorVersion(): number;
							public getPayload(): native.Array<number>;
							public constructor(param0: number, param1: number);
							public getCommandCode(): number;
							public getMinorVersion(): number;
							public setMinorVersion(param0: number): void;
							public setMajorVersion(param0: number): void;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export module responses {
						export class GetBatteryLevelResponse extends com.taptrack.tcmptappy2.commandfamilies.systemfamily.AbstractSystemMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.responses.GetBatteryLevelResponse>;
							public static COMMAND_CODE: number;
							public constructor();
							public parsePayload(param0: native.Array<number>): void;
							public getBatteryLevelPercent(): number;
							public getPayload(): native.Array<number>;
							public getCommandCode(): number;
							public setBatteryLevel(param0: number): void;
							public getBatteryLevel(): number;
							public constructor(param0: number);
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export module responses {
						export class GreenLEDActivatedResponse extends com.taptrack.tcmptappy2.commandfamilies.systemfamily.AbstractSystemMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.responses.GreenLEDActivatedResponse>;
							public static COMMAND_CODE: number;
							public constructor();
							public setRedLEDActive(param0: boolean): void;
							public isBlueLEDActive(): boolean;
							public getPayload(): native.Array<number>;
							public getCommandCode(): number;
							public constructor(param0: boolean, param1: boolean, param2: boolean, param3: boolean);
							public setGreenLEDActive(param0: boolean): void;
							public parsePayload(param0: native.Array<number>): void;
							public setBlueLEDActive(param0: boolean): void;
							public isGreenLEDActive(): boolean;
							public isBuzzerActive(): boolean;
							public setBuzzerActive(param0: boolean): void;
							public isRedLEDActive(): boolean;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export module responses {
						export class GreenLEDDeactivatedResponse extends com.taptrack.tcmptappy2.commandfamilies.systemfamily.AbstractSystemMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.responses.GreenLEDDeactivatedResponse>;
							public static COMMAND_CODE: number;
							public constructor();
							public setRedLEDActive(param0: boolean): void;
							public isBlueLEDActive(): boolean;
							public getPayload(): native.Array<number>;
							public getCommandCode(): number;
							public constructor(param0: boolean, param1: boolean, param2: boolean, param3: boolean);
							public setGreenLEDActive(param0: boolean): void;
							public parsePayload(param0: native.Array<number>): void;
							public setBlueLEDActive(param0: boolean): void;
							public isGreenLEDActive(): boolean;
							public isBuzzerActive(): boolean;
							public setBuzzerActive(param0: boolean): void;
							public isRedLEDActive(): boolean;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export module responses {
						export class HardwareVersionResponse extends com.taptrack.tcmptappy2.commandfamilies.systemfamily.AbstractSystemMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.responses.HardwareVersionResponse>;
							public static COMMAND_CODE: number;
							public constructor();
							public parsePayload(param0: native.Array<number>): void;
							public getMajorVersion(): number;
							public getPayload(): native.Array<number>;
							public constructor(param0: number, param1: number);
							public getCommandCode(): number;
							public getMinorVersion(): number;
							public setMinorVersion(param0: number): void;
							public setMajorVersion(param0: number): void;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export module responses {
						export class ImproperMessageFormatResponse extends com.taptrack.tcmptappy2.commandfamilies.systemfamily.AbstractSystemMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.responses.ImproperMessageFormatResponse>;
							public static COMMAND_CODE: number;
							public constructor();
							public parsePayload(param0: native.Array<number>): void;
							public getPayload(): native.Array<number>;
							public getCommandCode(): number;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export module responses {
						export class IndicatorStatusResponse extends com.taptrack.tcmptappy2.commandfamilies.systemfamily.AbstractSystemMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.responses.IndicatorStatusResponse>;
							public static COMMAND_CODE: number;
							public constructor();
							public setRedLEDActive(param0: boolean): void;
							public isBlueLEDActive(): boolean;
							public getPayload(): native.Array<number>;
							public getCommandCode(): number;
							public constructor(param0: boolean, param1: boolean, param2: boolean, param3: boolean);
							public setGreenLEDActive(param0: boolean): void;
							public parsePayload(param0: native.Array<number>): void;
							public setBlueLEDActive(param0: boolean): void;
							public isGreenLEDActive(): boolean;
							public isBuzzerActive(): boolean;
							public setBuzzerActive(param0: boolean): void;
							public isRedLEDActive(): boolean;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export module responses {
						export class LcsMismatchErrorResponse extends com.taptrack.tcmptappy2.commandfamilies.systemfamily.AbstractSystemMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.responses.LcsMismatchErrorResponse>;
							public static COMMAND_CODE: number;
							public constructor();
							public parsePayload(param0: native.Array<number>): void;
							public getPayload(): native.Array<number>;
							public getCommandCode(): number;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export module responses {
						export class LengthMismatchErrorResponse extends com.taptrack.tcmptappy2.commandfamilies.systemfamily.AbstractSystemMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.responses.LengthMismatchErrorResponse>;
							public static COMMAND_CODE: number;
							public constructor();
							public parsePayload(param0: native.Array<number>): void;
							public getPayload(): native.Array<number>;
							public getCommandCode(): number;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export module responses {
						export class PingResponse extends com.taptrack.tcmptappy2.commandfamilies.systemfamily.AbstractSystemMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.responses.PingResponse>;
							public static COMMAND_CODE: number;
							public constructor();
							public parsePayload(param0: native.Array<number>): void;
							public getPayload(): native.Array<number>;
							public getCommandCode(): number;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export module responses {
						export class RedLEDActivatedResponse extends com.taptrack.tcmptappy2.commandfamilies.systemfamily.AbstractSystemMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.responses.RedLEDActivatedResponse>;
							public static COMMAND_CODE: number;
							public constructor();
							public setRedLEDActive(param0: boolean): void;
							public isBlueLEDActive(): boolean;
							public getPayload(): native.Array<number>;
							public getCommandCode(): number;
							public constructor(param0: boolean, param1: boolean, param2: boolean, param3: boolean);
							public setGreenLEDActive(param0: boolean): void;
							public parsePayload(param0: native.Array<number>): void;
							public setBlueLEDActive(param0: boolean): void;
							public isGreenLEDActive(): boolean;
							public isBuzzerActive(): boolean;
							public setBuzzerActive(param0: boolean): void;
							public isRedLEDActive(): boolean;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export module responses {
						export class RedLEDDeactivatedResponse extends com.taptrack.tcmptappy2.commandfamilies.systemfamily.AbstractSystemMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.responses.RedLEDDeactivatedResponse>;
							public static COMMAND_CODE: number;
							public constructor();
							public setRedLEDActive(param0: boolean): void;
							public isBlueLEDActive(): boolean;
							public getPayload(): native.Array<number>;
							public getCommandCode(): number;
							public constructor(param0: boolean, param1: boolean, param2: boolean, param3: boolean);
							public setGreenLEDActive(param0: boolean): void;
							public parsePayload(param0: native.Array<number>): void;
							public setBlueLEDActive(param0: boolean): void;
							public isGreenLEDActive(): boolean;
							public isBuzzerActive(): boolean;
							public setBuzzerActive(param0: boolean): void;
							public isRedLEDActive(): boolean;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export module responses {
						export class SystemErrorResponse extends com.taptrack.tcmptappy2.commandfamilies.systemfamily.AbstractSystemMessage {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.responses.SystemErrorResponse>;
							public static COMMAND_CODE: number;
							public delegate: com.taptrack.tcmptappy2.StandardErrorResponseDelegate;
							public constructor();
							public setReaderStatus(param0: number): void;
							public setErrorMessage(param0: native.Array<number>): void;
							public getPayload(): native.Array<number>;
							public getCommandCode(): number;
							public getErrorCode(): number;
							public setInternalErrorCode(param0: number): void;
							public getErrorMessage(): string;
							public parsePayload(param0: native.Array<number>): void;
							public setErrorCode(param0: number): void;
							public constructor(param0: number, param1: number, param2: number, param3: string);
							public getInternalErrorCode(): number;
							public getReaderStatus(): number;
							public setErrorMessage(param0: string): void;
						}
						export module SystemErrorResponse {
							export class ErrorCodes {
								public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.responses.SystemErrorResponse.ErrorCodes>;
								/**
								 * Constructs a new instance of the com.taptrack.tcmptappy2.commandfamilies.systemfamily.responses.SystemErrorResponse$ErrorCodes interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
								 */
								public constructor(implementation: {
								});
								public constructor();
								public static TOO_FEW_PARAMETERS: number;
								public static UNSUPPORTED_COMMAND_FAMILY: number;
								public static INVALID_PARAMETER: number;
							}
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamilies {
				export module systemfamily {
					export module responses {
						export abstract class Utils {
							public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamilies.systemfamily.responses.Utils>;
						}
					}
				}
			}
		}
	}
}

declare module com {
	export module taptrack {
		export module tcmptappy2 {
			export module commandfamily {
				export module systemfamily {
					export class BuildConfig {
						public static class: java.lang.Class<com.taptrack.tcmptappy2.commandfamily.systemfamily.BuildConfig>;
						public static DEBUG: boolean;
						public static APPLICATION_ID: string;
						public static BUILD_TYPE: string;
						public static FLAVOR: string;
						public static VERSION_CODE: number;
						public static VERSION_NAME: string;
						public constructor();
					}
				}
			}
		}
	}
}

//Generics information:

