/**
 * Copyright (c) 2022 L018. All rights reserved.
 * Licensed under MIT
 */


const Proxiable = ["Promise", "RegExp",
    "AggregateError", "EvalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError", "globalThis",
    "Intl", "ArrayBuffer", "Int8Array", "Int16Array",
    "Int32Array", "Float32Array", "Float64Array", "Uint8ClampedArray", "BigUint64Array", "BigInt64Array", "DataView", "Map",
    "BigInt", "Set", "WeakMap", "WeakSet", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "escape",
    "unescape", "eval", "Option", "Image", "Audio", "webkitURL", "webkitRTCPeerConnection", "webkitMediaStream",
    "WebKitMutationObserver", "WebKitCSSMatrix", "XPathResult", "XPathExpression", "XPathEvaluator", "XMLSerializer",
    "XMLHttpRequestUpload", "XMLHttpRequestEventTarget", "XMLHttpRequest", "XMLDocument", "WritableStreamDefaultWriter",
    "WritableStream", "Worker", "Window", "WheelEvent", "WebSocket", "WebGLVertexArrayObject", "WebGLUniformLocation",
    "WebGLTransformFeedback", "WebGLTexture", "WebGLSync", "WebGLShaderPrecisionFormat", "WebGLShader", "WebGLSampler",
    "WebGLRenderingContext", "WebGLRenderbuffer", "WebGLQuery", "WebGLProgram", "WebGLFramebuffer", "WebGLContextEvent",
    "WebGLBuffer", "WebGLActiveInfo", "WebGL2RenderingContext", "WaveShaperNode", "VisualViewport", "ValidityState",
    "VTTCue", "UserActivation", "URLSearchParams", "URL", "TreeWalker", "TransitionEvent", "TransformStream",
    "TrackEvent", "TouchList", "TouchEvent", "Touch", "TimeRanges", "TextTrackList", "TextTrackCueList", "TextTrackCue",
    "TextTrack", "TextMetrics", "TextEvent", "TextEncoderStream", "TextEncoder", "TextDecoderStream", "TextDecoder", "Text",
    "TaskAttributionTiming", "SyncManager", "SubmitEvent", "StyleSheetList", "StyleSheet", "StylePropertyMapReadOnly",
    "StylePropertyMap", "StorageEvent", "Storage", "StereoPannerNode", "StaticRange", "ShadowRoot", "Selection",
    "SecurityPolicyViolationEvent", "ScriptProcessorNode", "ScreenOrientation", "Screen", "SVGViewElement", "SVGUseElement",
    "SVGUnitTypes", "SVGTransformList", "SVGTransform", "SVGTitleElement", "SVGTextPositioningElement", "SVGTextPathElement",
    "SVGTextElement", "SVGTextContentElement", "SVGTSpanElement", "SVGSymbolElement", "SVGSwitchElement", "SVGStyleElement",
    "SVGStringList", "SVGStopElement", "SVGSetElement", "SVGScriptElement", "SVGSVGElement", "SVGRectElement", "SVGRect",
    "SVGRadialGradientElement", "SVGPreserveAspectRatio", "SVGPolylineElement", "SVGPolygonElement", "SVGPointList", "SVGPoint",
    "SVGPatternElement", "SVGPathElement", "SVGNumberList", "SVGNumber", "SVGMetadataElement", "SVGMatrix", "SVGMaskElement",
    "SVGMarkerElement", "SVGMPathElement", "SVGLinearGradientElement", "SVGLineElement", "SVGLengthList", "SVGLength",
    "SVGImageElement", "SVGGraphicsElement", "SVGGradientElement", "SVGGeometryElement", "SVGGElement", "SVGForeignObjectElement",
    "SVGFilterElement", "SVGFETurbulenceElement", "SVGFETileElement", "SVGFESpotLightElement", "SVGFESpecularLightingElement",
    "SVGFEPointLightElement", "SVGFEOffsetElement", "SVGFEMorphologyElement", "SVGFEMergeNodeElement", "SVGFEMergeElement",
    "SVGFEImageElement", "SVGFEGaussianBlurElement", "SVGFEFuncRElement", "SVGFEFuncGElement", "SVGFEFuncBElement",
    "SVGFEFuncAElement", "SVGFEFloodElement", "SVGFEDropShadowElement", "SVGFEDistantLightElement", "SVGFEDisplacementMapElement",
    "SVGFEDiffuseLightingElement", "SVGFEConvolveMatrixElement", "SVGFECompositeElement", "SVGFEComponentTransferElement",
    "SVGFEColorMatrixElement", "SVGFEBlendElement", "SVGEllipseElement", "SVGElement", "SVGDescElement", "SVGDefsElement",
    "SVGComponentTransferFunctionElement", "SVGClipPathElement", "SVGCircleElement", "SVGAnimationElement", "SVGAnimatedTransformList",
    "SVGAnimatedString", "SVGAnimatedRect", "SVGAnimatedPreserveAspectRatio", "SVGAnimatedNumberList", "SVGAnimatedNumber",
    "SVGAnimatedLengthList", "SVGAnimatedLength", "SVGAnimatedInteger", "SVGAnimatedEnumeration", "SVGAnimatedBoolean",
    "SVGAnimatedAngle", "SVGAnimateTransformElement", "SVGAnimateMotionElement", "SVGAnimateElement", "SVGAngle",
    "SVGAElement", "Response", "ResizeObserverEntry", "ResizeObserver", "Request", "ReportingObserver", "ReadableStreamDefaultReader",
    "ReadableStreamDefaultController", "ReadableStream", "Range", "RadioNodeList", "RTCTrackEvent", "RTCStatsReport",
    "RTCSessionDescription", "RTCSctpTransport", "RTCRtpTransceiver", "RTCRtpSender", "RTCRtpReceiver",
    "RTCPeerConnectionIceEvent", "RTCPeerConnectionIceErrorEvent", "RTCPeerConnection", "RTCIceCandidate", "RTCErrorEvent",
    "RTCError", "RTCEncodedVideoFrame", "RTCEncodedAudioFrame", "RTCDtlsTransport", "RTCDataChannelEvent", "RTCDataChannel",
    "RTCDTMFToneChangeEvent", "RTCDTMFSender", "RTCCertificate", "PromiseRejectionEvent", "ProgressEvent", "ProcessingInstruction",
    "PopStateEvent", "PointerEvent", "PluginArray", "Plugin", "PeriodicWave", "PerformanceTiming", "PerformanceServerTiming",
    "PerformanceResourceTiming", "PerformancePaintTiming", "PerformanceObserverEntryList", "PerformanceObserver", "PerformanceNavigationTiming",
    "PerformanceNavigation", "PerformanceMeasure", "PerformanceMark", "PerformanceLongTaskTiming", "PerformanceEventTiming",
    "PerformanceEntry", "PerformanceElementTiming", "Performance", "Path2D", "PannerNode", "PageTransitionEvent", "OverconstrainedError",
    "OscillatorNode", "OfflineAudioContext", "OfflineAudioCompletionEvent", "NodeList", "NodeIterator", "NodeFilter", "Node",
    "NetworkInformation", "Navigator", "NamedNodeMap", "MutationRecord", "MutationObserver", "MutationEvent", "MouseEvent",
    "MimeTypeArray", "MimeType", "MessagePort", "MessageEvent", "MessageChannel", "MediaStreamTrackEvent", "MediaStreamTrack",
    "MediaStreamEvent", "MediaStreamAudioSourceNode", "MediaStreamAudioDestinationNode", "MediaStream", "MediaRecorder",
    "MediaQueryListEvent", "MediaQueryList", "MediaList", "MediaError", "MediaEncryptedEvent", "MediaElementAudioSourceNode",
    "MediaCapabilities", "Location", "LayoutShiftAttribution", "LayoutShift", "LargestContentfulPaint", "KeyframeEffect",
    "KeyboardEvent", "IntersectionObserverEntry", "IntersectionObserver", "InputEvent", "InputDeviceInfo", "InputDeviceCapabilities",
    "ImageData", "ImageCapture", "ImageBitmapRenderingContext", "ImageBitmap", "IdleDeadline", "IIRFilterNode", "IDBVersionChangeEvent",
    "IDBTransaction", "IDBRequest", "IDBOpenDBRequest", "IDBObjectStore", "IDBKeyRange", "IDBIndex", "IDBFactory", "IDBDatabase",
    "IDBCursorWithValue", "IDBCursor", "History", "Headers", "HashChangeEvent", "HTMLVideoElement", "HTMLUnknownElement",
    "HTMLUListElement", "HTMLTrackElement", "HTMLTitleElement", "HTMLTimeElement", "HTMLTextAreaElement", "HTMLTemplateElement",
    "HTMLTableSectionElement", "HTMLTableRowElement", "HTMLTableElement", "HTMLTableColElement", "HTMLTableCellElement",
    "HTMLTableCaptionElement", "HTMLStyleElement", "HTMLSpanElement", "HTMLSourceElement", "HTMLSlotElement", "HTMLSelectElement",
    "HTMLScriptElement", "HTMLQuoteElement", "HTMLProgressElement", "HTMLPreElement", "HTMLPictureElement", "HTMLParamElement",
    "HTMLParagraphElement", "HTMLOutputElement", "HTMLOptionsCollection", "HTMLOptionElement", "HTMLOptGroupElement",
    "HTMLObjectElement", "HTMLOListElement", "HTMLModElement", "HTMLMeterElement", "HTMLMetaElement", "HTMLMenuElement",
    "HTMLMediaElement", "HTMLMarqueeElement", "HTMLMapElement", "HTMLLinkElement", "HTMLLegendElement", "HTMLLabelElement",
    "HTMLLIElement", "HTMLInputElement", "HTMLImageElement", "HTMLIFrameElement", "HTMLHtmlElement", "HTMLHeadingElement",
    "HTMLHeadElement", "HTMLHRElement", "HTMLFrameSetElement", "HTMLFrameElement", "HTMLFormElement", "HTMLFormControlsCollection",
    "HTMLFontElement", "HTMLFieldSetElement", "HTMLEmbedElement", "HTMLElement", "HTMLDocument", "HTMLDivElement", "HTMLDirectoryElement",
    "HTMLDialogElement", "HTMLDetailsElement", "HTMLDataListElement", "HTMLDataElement", "HTMLDListElement", "HTMLCollection",
    "HTMLCanvasElement", "HTMLButtonElement", "HTMLBodyElement", "HTMLBaseElement", "HTMLBRElement", "HTMLAudioElement",
    "HTMLAreaElement", "HTMLAnchorElement", "HTMLAllCollection", "GeolocationPositionError", "GeolocationPosition",
    "GeolocationCoordinates", "Geolocation", "GamepadHapticActuator", "GamepadEvent", "GamepadButton", "Gamepad", "GainNode",
    "FormDataEvent", "FormData", "FontFaceSetLoadEvent", "FontFace", "FocusEvent", "FileReader", "FileList", "File",
    "FeaturePolicy", "External", "EventTarget", "EventSource", "Event", "ErrorEvent", "ElementInternals", "Element",
    "DynamicsCompressorNode", "DragEvent", "DocumentType", "DocumentFragment", "Document", "DelayNode", "DecompressionStream",
    "DataTransferItemList", "DataTransferItem", "DataTransfer", "DOMTokenList", "DOMStringMap", "DOMStringList", "DOMRectReadOnly",
    "DOMRectList", "DOMRect", "DOMQuad", "DOMPointReadOnly", "DOMPoint", "DOMParser", "DOMMatrixReadOnly", "DOMMatrix",
    "DOMImplementation", "DOMException", "DOMError", "CustomEvent", "CustomElementRegistry", "Crypto", "CountQueuingStrategy",
    "ConvolverNode", "ConstantSourceNode", "CompressionStream", "CompositionEvent", "Comment", "CloseEvent", "ClipboardItem",
    "ClipboardEvent", "CharacterData", "ChannelSplitterNode", "ChannelMergerNode", "CanvasRenderingContext2D", "CanvasPattern",
    "CanvasGradient", "CanvasCaptureMediaStreamTrack", "CSSVariableReferenceValue", "CSSUnparsedValue", "CSSUnitValue",
    "CSSTranslate", "CSSTransformValue", "CSSTransformComponent", "CSSSupportsRule", "CSSStyleValue", "CSSStyleSheet",
    "CSSStyleRule", "CSSStyleDeclaration", "CSSSkewY", "CSSSkewX", "CSSSkew", "CSSScale", "CSSRuleList", "CSSRule",
    "CSSRotate", "CSSPositionValue", "CSSPerspective", "CSSPageRule", "CSSNumericValue", "CSSNumericArray", "CSSNamespaceRule",
    "CSSMediaRule", "CSSMatrixComponent", "CSSMathValue", "CSSMathSum", "CSSMathProduct", "CSSMathNegate", "CSSMathMin",
    "CSSMathMax", "CSSMathInvert", "CSSKeywordValue", "CSSKeyframesRule", "CSSKeyframeRule", "CSSImportRule", "CSSImageValue",
    "CSSGroupingRule", "CSSFontFaceRule", "CSSConditionRule", "CSS", "CDATASection", "ByteLengthQueuingStrategy", "BroadcastChannel",
    "BlobEvent", "Blob", "BiquadFilterNode", "BeforeUnloadEvent", "BeforeInstallPromptEvent", "BatteryManager", "BaseAudioContext",
    "BarProp", "AudioWorkletNode", "AudioScheduledSourceNode", "AudioProcessingEvent", "AudioParamMap", "AudioParam", "AudioNode",
    "AudioListener", "AudioDestinationNode", "AudioContext", "AudioBufferSourceNode", "AudioBuffer", "Attr", "AnimationEvent",
    "AnimationEffect", "Animation", "AnalyserNode", "AbortSignal", "AbortController", "self", "locationbar", "menubar",
    "personalbar", "scrollbars", "statusbar", "toolbar", "frames", "parent", "external", "screen", "visualViewport",
    "clientInformation", "alert", "atob", "blur", "btoa", "cancelAnimationFrame", "cancelIdleCallback",
    "captureEvents", "clearInterval", "clearTimeout", "close", "confirm", "createImageBitmap", "fetch", "find", "focus",
    "getComputedStyle", "getSelection", "moveBy", "moveTo", "open", "postMessage", "print", "prompt",
    "queueMicrotask", "releaseEvents", "requestAnimationFrame", "requestIdleCallback", "resizeBy", "resizeTo", "scroll",
    "scrollBy", "scrollTo", "stop", "webkitCancelAnimationFrame", "webkitRequestAnimationFrame",
    "SharedArrayBuffer", "Atomics", "FinalizationRegistry", "WeakRef", "chrome", "WebAssembly", "USB", "USBAlternateInterface",
    "USBConfiguration", "USBConnectionEvent", "USBDevice", "USBEndpoint", "USBInTransferResult", "USBInterface",
    "USBIsochronousInTransferPacket", "USBIsochronousInTransferResult", "USBIsochronousOutTransferPacket",
    "USBIsochronousOutTransferResult", "USBOutTransferResult", "AbsoluteOrientationSensor", "Accelerometer", "AudioWorklet",
    "Cache", "CacheStorage", "Clipboard", "CookieChangeEvent", "CookieStore", "CookieStoreManager", "Credential",
    "CredentialsContainer", "CryptoKey", "DeviceMotionEvent", "DeviceMotionEventAcceleration", "DeviceMotionEventRotationRate",
    "DeviceOrientationEvent", "FederatedCredential", "Gyroscope", "Keyboard", "KeyboardLayoutMap", "LinearAccelerationSensor",
    "Lock", "LockManager", "MIDIAccess", "MIDIConnectionEvent", "MIDIInput", "MIDIInputMap", "MIDIMessageEvent", "MIDIOutput",
    "MIDIOutputMap", "MIDIPort", "MediaDeviceInfo", "MediaDevices", "MediaKeyMessageEvent", "MediaKeySession", "MediaKeyStatusMap",
    "MediaKeySystemAccess", "MediaKeys", "NavigationPreloadManager", "OrientationSensor", "PasswordCredential", "RTCIceTransport",
    "RelativeOrientationSensor", "Sensor", "SensorErrorEvent", "ServiceWorker", "ServiceWorkerContainer", "ServiceWorkerRegistration",
    "StorageManager", "SubtleCrypto", "Worklet", "XRDOMOverlayState", "XRLayer", "XRWebGLBinding", "HID", "HIDConnectionEvent",
    "HIDDevice", "HIDInputReportEvent", "Bluetooth", "BluetoothCharacteristicProperties", "BluetoothDevice", "BluetoothRemoteGATTCharacteristic",
    "BluetoothRemoteGATTDescriptor", "BluetoothRemoteGATTServer", "BluetoothRemoteGATTService", "FragmentDirective",
    "XRBoundedReferenceSpace", "XRFrame", "XRInputSource", "XRInputSourceArray", "XRInputSourceEvent", "XRInputSourcesChangeEvent",
    "XRPose", "XRReferenceSpace", "XRReferenceSpaceEvent", "XRRenderState", "XRRigidTransform", "XRSession", "XRSessionEvent",
    "XRSpace", "XRSystem", "XRView", "XRViewerPose", "XRViewport", "XRWebGLLayer", "PaymentAddress", "PaymentRequest",
    "PaymentResponse", "PaymentMethodChangeEvent", "Presentation", "PresentationAvailability", "PresentationConnection",
    "PresentationConnectionAvailableEvent", "PresentationConnectionCloseEvent", "PresentationConnectionList", "PresentationReceiver",
    "PresentationRequest", "FileSystemDirectoryHandle", "FileSystemFileHandle", "FileSystemHandle", "FileSystemWritableFileStream",
    "XRAnchor", "XRAnchorSet", "AuthenticatorAssertionResponse", "AuthenticatorAttestationResponse", "AuthenticatorResponse",
    "PublicKeyCredential", "XRHitTestResult", "XRHitTestSource", "XRRay", "XRTransientInputHitTestResult", "XRTransientInputHitTestSource",
    "WakeLock", "WakeLockSentinel", "Serial", "SerialPort", "Scheduling", "showDirectoryPicker", "showOpenFilePicker", "showSaveFilePicker",
    "Notification", "MediaMetadata", "MediaSession", "CSSPropertyRule", "BackgroundFetchManager", "BackgroundFetchRecord",
    "BackgroundFetchRegistration", "webkitSpeechGrammar", "webkitSpeechGrammarList", "webkitSpeechRecognition", "webkitSpeechRecognitionError",
    "webkitSpeechRecognitionEvent", "TrustedHTML", "TrustedScript", "TrustedScriptURL", "TrustedTypePolicy", "TrustedTypePolicyFactory",
    "EventCounts", "PushManager", "PushSubscription", "PushSubscriptionOptions", "NavigatorUAData", "XSLTProcessor", "PaymentInstruments",
    "PaymentManager", "ResizeObserverSize", "SpeechSynthesisErrorEvent", "SpeechSynthesisEvent", "SpeechSynthesisUtterance",
    "PeriodicSyncManager", "BluetoothUUID", "PictureInPictureEvent", "PictureInPictureWindow", "VideoPlaybackQuality",
    "PaymentRequestUpdateEvent", "RemotePlayback", "AnimationPlaybackEvent", "AnimationTimeline", "CSSAnimation", "CSSTransition",
    "DocumentTimeline", "PermissionStatus", "Permissions", "OffscreenCanvas", "OffscreenCanvasRenderingContext2D", "MediaSource",
    "SourceBuffer", "SourceBufferList", "SharedWorker", "ReadableByteStreamController", "ReadableStreamBYOBReader",
    "ReadableStreamBYOBRequest", "openDatabase", "webkitRequestFileSystem", "webkitResolveLocalFileSystemURL", "dir",
    "dirxml", "profile", "profileEnd", "clear", "table", "keys", "values", "debug", "undebug", "monitor", "unmonitor",
    "inspect", "copy", "queryObjects", "getEventListeners", "monitorEvents", "unmonitorEvents", "$", "$$", "$x"];

const DocProxiable = ["addEventListener", "adoptNode","append","captureEvents","caretRangeFromPoint","clear","close","createAttribute","createAttributeNS","createCDATASection","createComment","createDocumentFragment","createElement","createElementNS","createEvent","createExpression","createNSResolver","createNodeIterator","createProcessingInstruction","createRange","createTextNode","createTreeWalker","elementFromPoint","elementsFromPoint","evaluate","execCommand","exitFullscreen","exitPointerLock","getElementById","getElementsByClassName","getElementsByName","getElementsByTagName","getElementsByTagNameNS","getSelection","hasFocus","importNode","open","prepend","queryCommandEnabled","queryCommandIndeterm","queryCommandState","queryCommandSupported","queryCommandValue","querySelector","querySelectorAll","releaseEvents","replaceChildren","webkitCancelFullScreen","webkitExitFullscreen","write","writeln","constructor","getAnimations","exitPictureInPicture"];

function codeLocation() {
    var stack = new Error().stack;
    var ss = stack.split(/\n/);
    try {
        for (var i = 1; i++; i < ss.length) {
            if (ss[i].indexOf("injectScript.js") === -1 && ss[i].indexOf("<anonymous>") === -1) {
                return ss[i].trim();
            }
        }
    } catch (error) {
    }
    return "Unable to determine location"
}

function logWithLoc(){
    console.log(...arguments, codeLocation())
}

/**
 * 使用代理 hook 任意对象
 * 
 * 目前 handler function 有 construct apply get set has
 * 
 * proxy handler functions 详见 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy
 * 
 * hookFunction = function(value, ...arguments){
 *     // do something;
 *     return value
 * }
 * hookFunction.handler = 'apply'
 * 
 * @param {*} obj 需要 hook 对象
 * @param {string=} objName hook 对象自定义名称 (可选)
 * @param {(Function|Array.<Function>)=} hookFunctions 对代理对象不同 handler 的自定义操作函数 (可选)
 * @returns {Proxy} obj 对象的代理
 */
function hookProxy(obj, objName, hookFunctions) {
    if (obj === undefined || obj === null) {
        return obj
    }
    if (objName instanceof Function || objName instanceof Array) {
        hookFunctions = objName;
        objName = undefined;
    }
    objName = objName ? objName : obj[Symbol.toStringTag] ? obj[Symbol.toStringTag] : obj instanceof Function ? obj["name"] : Object.prototype.toString.call(obj).slice(1, -1).split(' ')[1];
    var handler = {
        construct: function (target, argumentsList, newTarget) {
            // new
            logWithLoc(objName, ' .new ', argumentsList);
            return Reflect.construct(target, argumentsList, newTarget)
            // return hookProxy(Reflect.construct(target, argumentsList, newTarget), objName+"Ins")
        },
        apply: function (target, thisArg, argumentsList) {
            // call
            var value = Reflect.apply(target, thisArg, argumentsList);
            switch (objName) {
                case "decodeURIComponent":
                    logWithLoc(objName, ' result ', value);
                    break
                case "btoa":
                    logWithLoc(objName, ' result ', value);
                    break
                case "createElement":
                    // if (["video", "canvas", "iframe"].indexOf(argumentsList[0])>-1) {
                    //     logWithLoc(objName, ...argumentsList);
                    // }
                    logWithLoc(objName, argumentsList);
                    break
                case 'addEventListener':
                    logWithLoc(objName, argumentsList);
                    break
                default:
                    logWithLoc(objName, ' .call ', argumentsList);
            }
            return value;
        },
        get: function (target, property, receiver) {
            // get
            if (property !== "prototype") { // 获取构造函数原型
                logWithLoc(objName, ' .get ', property.toString());
            }
            // if (property === Symbol.toStringTag){
            //     return 'Proxy-' + objName
            // }
            var value = Reflect.get(target, property, target); // 调用上下文绑定到 target // Uncaught TypeError: Illegal invocation
            if(value instanceof Function) return value.bind(target);
            return value
        },
        set: function (target, property, value, receiver) {
            // set
            logWithLoc(objName, ' .set ', property, value);
            return Reflect.set(target, property, value, target);
            // return Reflect.set(target, property, value, receiver);
        },
        has: function (target, prop) {
            // in
            logWithLoc(objName, ' .has ', prop);
            return Reflect.has(target, prop);
        },
        defineProperty: Reflect.defineProperty,
        deleteProperty: Reflect.deleteProperty,
        getOwnPropertyDescriptor: Reflect.getOwnPropertyDescriptor,
        getPrototypeOf: Reflect.getPrototypeOf,
        isExtensible: Reflect.isExtensible,
        ownKeys: Reflect.ownKeys,
        preventExtensions: Reflect.preventExtensions,
        setPrototypeOf: Reflect.setPrototypeOf
    }
    if (hookFunctions instanceof Function) {
        if (hookFunctions.handler && handler[hookFunctions.handler]) {
            let orgFunc = handler[hookFunctions.handler];
            handler[hookFunctions.handler] = function (){
                let value = orgFunc(...arguments);
                return hookFunctions(value, ...arguments)
            }
        }
    }
    if (hookFunctions instanceof Array) {
        for (let hookFunction of hookFunctions) {
            if (hookFunction.handler && handler[hookFunction.handler]) {
                let orgFunc = handler[hookFunction.handler];
                handler[hookFunction.handler] = function (){
                    let value = orgFunc(...arguments);
                    return hookFunction(value, ...arguments)
                }
            }
        }
    }
    return new Proxy(obj, handler);
}

// for (let i of Proxiable){
//     // console.log(i);
//     window[i] = hookProxy(window[i]);
// }


function hookCookie(){
    var cookie_setter = document.__lookupSetter__('cookie');
    var cookie_getter = document.__lookupGetter__('cookie');
    Object.defineProperty(document, "cookie", {
        get: function () {
            logWithLoc("cookie.get");
            return cookie_getter.apply(this, arguments);
        },
        set: function (val) {
            logWithLoc("cookie.set", val);
            return cookie_setter.apply(this, arguments);
        }
    });
}

let t2SettingsMeta = document.querySelector("meta[name='t2:settings']");
let t2Settings = JSON.parse(t2SettingsMeta.content);

if (t2Settings.traceCookie){
    hookCookie();
}

if(t2Settings.traceEvent){
    for (let i of ["addEventListener", "createEvent"]){
        document[i] = hookProxy(document[i]);
    }
}

// TODO: 代理 Node 接口衍生对象后调用 Node 方法会发生错误，例如 xxx.appendChild(new Proxy(document.createElement("video"), handler))：Failed to execute 'appendChild' on 'Node': parameter 1 is not of type 'Node'.
// 备选解决方案 重写 Node.appendChild 方法，使其获取到原始 Node 进行添加
// 如果发生错误，请依据情况自行更改 hookProxy 参数 hookFunction, 并通过注入 JS 方式实现追踪
if(t2Settings.traceObject){
    let hookFunc = function(value, ...args){
        if (["video", "canvas", "iframe"].indexOf(args[2][0])>-1) return hookProxy(value)
        return value
    };
    hookFunc.handler = "apply";
    document['createElement'] = hookProxy(document['createElement'], hookFunc);
}

let t2InjectMeta = document.querySelector("meta[name='t2:inject']");
let t2Inject = JSON.parse(t2InjectMeta.content);

if(t2Settings.injectJS){
    try{
        // TODO: 修改文档 Content Security Policy
        // Failed to execute 'write' on 'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.
        // document.write('<script>' + t2Inject[0].code+ '</script>');
        // Refused to execute inline script
        // let script = document.createElement('script');
        // script.innerHTML = t2Inject[0].code;
        // (document.head || document.documentElement).appendChild(script);
        // EvalError: Refused to evaluate a string as JavaScript
        eval(t2Inject[0].code)
    } catch (e) {
        console.log('Inject Code', e)
    }
}