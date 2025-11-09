class ImageHotSpot {
    constructor(options) {
        // 定义一个私有变量container，类型为HTMLElement或null
        this.container = null;
        // 定义一个私有变量canvas，类型为HTMLElement或null
        this.canvas = null;
        // 定义一个私有变量isInit，类型为boolean，默认值为false
        this.isInit = false;
        // 定义一个私有变量handleMouseDownFunc，类型为(e: MouseEvent) => void
        this.handleMouseDownFunc = (event) => { };
        // 定义一个私有变量scale，类型为number，默认值为1
        this.scale = 1;
        // 定义一个私有变量hotImgWidth，类型为number
        this.hotImgWidth = 0;
        // 定义一个私有变量hotImgHeight，类型为number
        this.hotImgHeight = 0;
        // 构造函数，接收一个参数options
        this.options = options;
        // 调用init方法
        this.init();
    }
    // Initialize instance
    // 初始化方法
    init() {
        // 如果options.el是字符串，则获取该字符串对应的DOM元素，否则直接赋值给container
        this.container = typeof this.options.el === "string" ? document.querySelector(this.options.el) : this.options.el;
        // 如果container不存在，则抛出错误
        if (!this.container) {
            throw new Error(`${this.options.el || ""} container is not found`);
        }
        // 如果options.addMode不存在，则默认为"default"
        this.options.addMode = this.options.addMode || "default";
        // 初始化默认属性
        this.initDefaultProps();
        // 初始化正方形位置
        this.initSquarePos();
        // 如果options.customUpload不等于true，则重置初始化
        if (this.options.customUpload !== true) {
            this.resetInit();
        }
    }
    // 初始化默认配置属性
    initDefaultProps() {
        var _a, _b, _c, _d, _e, _f, _g, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6;
        // size 存在就使用size，否则使用width和height
        // 从this.options?.handle中解构出size、width、height、borderColor、backgroundColor
        const { size, width = '8px', height = '8px', borderColor = '#1447FF', backgroundColor = '#1447FF' } = ((_a = this.options) === null || _a === void 0 ? void 0 : _a.handle) || {};
        // 定义handleCommonStyle，包含position、border、background-color、box-sizing、width、height
        const handleCommonStyle = `position: absolute;border: 1px solid ${borderColor};background-color: ${backgroundColor};box-sizing: border-box;width: ${size || width};height: ${size || height};`;
        // 定义this.defaultProps，包含canvas、container、square、content、lt、lm、lb、bm、br、rm、tm、rt、seq、del
        this.defaultProps = {
            canvas: Object.assign({ className: "hot-container", cssText: `width: 100%; height: 100%; position: relative; border: 1px dashed #ccc; box-sizing: border-box;` }, (((_c = (_b = this.options) === null || _b === void 0 ? void 0 : _b.style) === null || _c === void 0 ? void 0 : _c.canvas) || {})),
            // 热区最外层容器默认样式
            container: Object.assign({ className: "hot-container", cssText: `width: 100%; height: 100%; position: relative;` }, (((_e = (_d = this.options) === null || _d === void 0 ? void 0 : _d.style) === null || _e === void 0 ? void 0 : _e.container) || {})),
            // 热区包裹默认样式
            square: Object.assign({ className: "hot-square", cssText: `width: 88px; height: 88px; background-color: rgba(20, 71, 255, 0.2); border: 1px dashed ${borderColor}; cursor: move; position: absolute; left: 0px; top: 0px; opacity: 1; box-sizing: border-box;` }, (((_g = (_f = this.options) === null || _f === void 0 ? void 0 : _f.style) === null || _g === void 0 ? void 0 : _g.square) || {})),
            // 热区内容元素默认样式
            content: Object.assign({ className: "hot-content", cssText: `display:none` }, (((_k = (_j = this.options) === null || _j === void 0 ? void 0 : _j.style) === null || _k === void 0 ? void 0 : _k.content) || {})),
            lt: Object.assign({ className: "lt", cssText: `${handleCommonStyle}cursor: nw-resize;top: -4px;left: -4px;` }, (((_m = (_l = this.options) === null || _l === void 0 ? void 0 : _l.style) === null || _m === void 0 ? void 0 : _m.lt) || {})),
            lm: Object.assign({ className: "lm", cssText: `${handleCommonStyle}cursor: e-resize;top: 50%;left: -4px;transform: translateY(-50%);` }, (((_p = (_o = this.options) === null || _o === void 0 ? void 0 : _o.style) === null || _p === void 0 ? void 0 : _p.lm) || {})),
            lb: Object.assign({ className: "lb", cssText: `${handleCommonStyle}cursor: ne-resize;bottom: -4px;left: -4px;` }, (((_r = (_q = this.options) === null || _q === void 0 ? void 0 : _q.style) === null || _r === void 0 ? void 0 : _r.lb) || {})),
            bm: Object.assign({ className: "bm", cssText: `${handleCommonStyle}cursor: n-resize;bottom: -4px;left: 50%;transform: translateX(-50%);` }, (((_t = (_s = this.options) === null || _s === void 0 ? void 0 : _s.style) === null || _t === void 0 ? void 0 : _t.bm) || {})),
            br: Object.assign({ className: "br", cssText: `${handleCommonStyle}cursor: se-resize;bottom: -4px;right: -4px;` }, (((_v = (_u = this.options) === null || _u === void 0 ? void 0 : _u.style) === null || _v === void 0 ? void 0 : _v.br) || {})),
            rm: Object.assign({ className: "rm", cssText: `${handleCommonStyle}cursor: e-resize;top: 50%;right: -4px;transform: translateY(-50%);` }, (((_y = (_x = this.options) === null || _x === void 0 ? void 0 : _x.style) === null || _y === void 0 ? void 0 : _y.rm) || {})),
            tm: Object.assign({ className: "tm", cssText: `${handleCommonStyle}cursor: n-resize;top: -4px;left: 50%;transform: translateX(-50%);` }, (((_0 = (_z = this.options) === null || _z === void 0 ? void 0 : _z.style) === null || _0 === void 0 ? void 0 : _0.tm) || {})),
            rt: Object.assign({ className: "rt", cssText: `${handleCommonStyle}cursor: ne-resize;top: -4px;right: -4px;` }, (((_2 = (_1 = this.options) === null || _1 === void 0 ? void 0 : _1.style) === null || _2 === void 0 ? void 0 : _2.rt) || {})),
            // 热区里面元素默认样式
            seq: Object.assign({ className: "hot-seq", cssText: `min-width: 14px; min-height: 14px; text-align: center; color: #fff; line-height: 14px; position: absolute; top: 0px; left: 0px; background-color: red; font-size: 10px;cursor:default` }, (((_4 = (_3 = this.options) === null || _3 === void 0 ? void 0 : _3.style) === null || _4 === void 0 ? void 0 : _4.seq) || {})),
            del: Object.assign({ className: "hot-del", cssText: `width: 16px; height: 16px; position: absolute; right: -20px; top: -20px; z-index: 2; cursor: pointer;` }, (((_6 = (_5 = this.options) === null || _5 === void 0 ? void 0 : _5.style) === null || _6 === void 0 ? void 0 : _6.del) || {}))
        };
    }
    // 初始化正方形位置
    initSquarePos() {
        // 将正方形位置初始化为一个对象，包含x、y、w、h四个属性
        this.squarePos = Object.assign({ x: 0, y: 0, w: 80, h: 80 }, (this.options.squarePos || {}));
    }
    // 重置初始化
    resetInit() {
        // 将isInit设置为true
        this.isInit = true;
        // 生成容器
        this.generateContainer();
        // 绑定handleMouseDown函数
        this.handleMouseDownFunc = this.handleMouseDown.bind(this);
        // 添加mousedown事件监听器
        this.canvas.addEventListener("mousedown", this.handleMouseDownFunc);
        setTimeout(() => {
            var _a, _b;
            (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.afterInit) === null || _b === void 0 ? void 0 : _b.call(_a);
        });
    }
    // Generate hot area container
    // 生成热区容器
    generateContainer() {
        var _a;
        // 创建一个div元素，并设置其属性为this.defaultProps.canvas
        const canvas = this.createElement("div", Object.assign({}, this.defaultProps.canvas));
        // 将canvas元素添加到this.container中
        (_a = this.container) === null || _a === void 0 ? void 0 : _a.appendChild(canvas);
        // 将canvas元素赋值给this.canvas
        this.canvas = canvas;
    }
    isNum(n) {
        const str = String(n);
        return typeof n == 'symbol' ? false : !isNaN(parseFloat(str)) && isFinite(Number(str));
    }
    // Add hot area
    addHotArea({ x = this.squarePos.x, y = this.squarePos.y, w = this.squarePos.w, h = this.squarePos.h } = {}, isForceAdd) {
        var _a, _b, _c, _d;
        if ((_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.beforeAdd) === null || _b === void 0 ? void 0 : _b.call(_a, this.hasBackgroundImage())) {
            return Promise.reject(new Error("beforeAdd return false"));
        }
        // 添加热区先检测热区画布容器存在不
        if (!this.canvas || !this.container) {
            return Promise.reject(new Error("Please initialize the instance first"));
        }
        if (this.options.addMode === 'default' || isForceAdd) {
            if (this.isNum(this.options.upperLimit) && this.container.querySelectorAll(".hot-square").length >= Number(this.options.upperLimit)) {
                return Promise.reject(new Error("upperLimit is exceeded"));
            }
            const seq = this.container.querySelectorAll(".hot-square").length + 1;
            const square = this.createHotSquare(seq, { style: { left: parseFloat(x) + "px", top: parseFloat(y) + "px", width: parseFloat(w) + "px", height: parseFloat(h) + "px" } });
            this.canvas.appendChild(square);
            (_d = (_c = this.options) === null || _c === void 0 ? void 0 : _c.afterAdd) === null || _d === void 0 ? void 0 : _d.call(_c, { seq, square });
            return Promise.resolve({ index: seq - 1, square });
        }
        else {
            return Promise.reject(new Error("options addMode is not default"));
        }
    }
    // Create hot square element
    createHotSquare(seq, props) {
        return this.createElement("div", Object.assign(Object.assign({}, this.defaultProps.square), props), [this.createElement('div', Object.assign({}, this.defaultProps.content), this.createElement('div', Object.assign({}, this.defaultProps.lt)), this.createElement('div', Object.assign({}, this.defaultProps.lm)), this.createElement('div', Object.assign({}, this.defaultProps.lb)), this.createElement('div', Object.assign({}, this.defaultProps.bm)), this.createElement('div', Object.assign({}, this.defaultProps.br)), this.createElement('div', Object.assign({}, this.defaultProps.rm)), this.createElement('div', Object.assign({}, this.defaultProps.rt)), this.createElement('div', Object.assign({}, this.defaultProps.tm)), this.createElement('div', Object.assign({}, this.defaultProps.del), this.createElement('div', { className: 'lines', cssText: ` width: 16px;height: 16px;position: relative;cursor: pointer;border-radius: 50%;background: #ff4b4b;transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);display: flex;align-items: center;justify-content: center;` }, [
                this.createElement('div', { className: 'line', cssText: ` position: absolute;height: 1px;width: 60%;background: white;border-radius: 1px;transition: all 0.3s ease;top: 50%;transform: translateY(-50%) rotate(45deg);` }),
                this.createElement('div', { className: 'line', cssText: ` position: absolute;height: 1px;width: 60%;background: white;border-radius: 1px;transition: all 0.3s ease;top: 50%;transform: translateY(-50%) rotate(-45deg);` }),
            ]))),
            this.createElement('div', Object.assign({}, this.defaultProps.seq), seq),
        ]);
    }
    createElement(tagName, ...args) {
        // 处理参数解析（支持省略props）
        const props = typeof args[0] === 'object' && !Array.isArray(args[0])
            ? args.shift()
            : {};
        let children = args.flat(Infinity);
        const element = document.createElement(tagName);
        // 新增 cssText 处理逻辑
        const handleStyleAttributes = (element, props) => {
            // 先处理 cssText
            if (props.cssText) {
                element.style.cssText = props.cssText;
                Reflect.deleteProperty(props, 'cssText'); // 处理完就删除避免重复处理
            }
            // 处理常规 style 属性
            if (props.style) {
                if (typeof props.style === 'string') {
                    element.style.cssText = props.style;
                }
                else if (typeof props.style === 'object') {
                    Object.assign(element.style, props.style);
                }
                Reflect.deleteProperty(props, 'style');
            }
        };
        // 在属性处理前先处理样式相关属性
        handleStyleAttributes(element, props);
        // 处理属性配置
        for (const [key, value] of Object.entries(props)) {
            // 处理className
            if (key === 'className' && typeof value === 'string') {
                element.className = value;
                continue;
            }
            // 处理htmlFor
            if (key === 'htmlFor' && typeof value === 'string') {
                element.setAttribute('for', value);
                continue;
            }
            // 处理事件监听器（onClick等形式）
            if (/^on[A-Z]/.test(key) && typeof value === 'function') {
                const eventType = key.slice(2).toLowerCase();
                element.addEventListener(eventType, value);
                continue;
            }
            // 处理style对象
            if (key === 'style') {
                if (typeof value === 'object') {
                    Object.assign(element.style, value);
                }
                else if (typeof value === 'string') {
                    element.style.cssText = value;
                }
                continue;
            }
            // 处理布尔属性
            if (typeof value === 'boolean') {
                value ? element.setAttribute(key, '') : element.removeAttribute(key);
                continue;
            }
            // 默认属性处理
            element.setAttribute(key, value);
        }
        // 处理子节点
        children = children.flat(Infinity).filter((child) => {
            // 过滤无效节点
            return child !== null && child !== undefined && child !== false;
        }).map((child) => {
            // 转换原始值为文本节点
            return typeof child === 'string' || typeof child === 'number'
                ? document.createTextNode(String(child))
                : child;
        });
        // 添加子节点
        children.forEach((child) => {
            if (child instanceof Node) {
                element.appendChild(child);
            }
            else {
                console.warn('Invalid child element:', child);
            }
        });
        return element;
    }
    // Delete hot area
    delHotArea(el) {
        const squareItem = el.closest(".hot-square");
        if (squareItem) {
            const seq = squareItem.querySelector(".hot-seq").innerText * 1;
            const delFunc = () => {
                squareItem.remove();
                this.resetHotSeq(seq);
            };
            if (typeof this.options.beforeDel === "function") {
                this.options.beforeDel(seq, squareItem, delFunc);
            }
            else {
                delFunc();
            }
        }
    }
    // Reset hot area index
    resetHotSeq(seq) {
        if (!this.container)
            return;
        const squares = this.container.querySelectorAll(".hot-square");
        squares.forEach((item) => {
            const indexContent = item.querySelector(".hot-seq");
            if (indexContent) {
                const itemIndex = Number(indexContent.innerText);
                if (itemIndex > seq) {
                    indexContent.innerText = String(itemIndex - 1);
                }
            }
        });
    }
    // Mouse down event
    handleMouseDown(e) {
        e.preventDefault(); // Prevent default behavior
        if (!this.canvas)
            return;
        const { target } = e;
        const className = target.className;
        const delItem = target.closest(".hot-del");
        if (delItem)
            return this.delHotArea(delItem);
        let content = null;
        if (["lt", "lm", "lb", "bm", "br", "rm", "rt", "tm", "hot-square"].includes(className)) {
            const square = className === "hot-square" ? target : target.closest(".hot-square");
            const existContent = this.canvas.querySelector(".hot-active");
            if (existContent && existContent.parentElement !== square) {
                existContent.classList.remove("hot-active");
                existContent.style.display = "none";
            }
            content = square.querySelector(".hot-content");
            if (content && !content.classList.contains("hot-active")) {
                content.classList.add("hot-active");
                content.style.display = "block";
                square.style.zIndex = String(this.getMaxZIndex() + 1);
            }
            this.startDrag(e, square, className, content);
        }
        else if (className === "hot-container" && this.options.addMode === 'manual') {
            const pos = this.canvas.getBoundingClientRect();
            const dix = pos.left;
            const diy = pos.top;
            let recordX = e.clientX - dix;
            let recordY = e.clientY - diy;
            const square = this.createElement("div", { className: "hot-line", style: { left: recordX + "px", top: recordY + "px", width: "0px", height: "0px", border: "1px solid red", boxSizing: 'border-box', position: 'absolute' } });
            this.canvas.appendChild(square);
            let width = 0;
            let height = 0;
            const squareLeft = square.offsetLeft;
            const squareTop = square.offsetTop;
            const maxWidth = this.canvas.offsetWidth - squareLeft;
            const maxHeight = this.canvas.offsetHeight - squareTop;
            const squareWidth = square.offsetWidth;
            const squareHeight = square.offsetHeight;
            document.onmousemove = (ev) => {
                const { clientX, clientY } = ev;
                const deltaX = e.clientX - clientX;
                const deltaY = e.clientY - clientY;
                const w = clientX - dix - recordX;
                const h = clientY - diy - recordY;
                let _w = w;
                let _h = h;
                if (clientX < e.clientX) {
                    _w = squareWidth + deltaX;
                    _w = _w > squareLeft ? squareLeft : _w;
                    recordX = clientX - dix;
                    recordX = recordX < 0 ? 0 : recordX;
                }
                else {
                    _w = w > maxWidth ? maxWidth : w;
                }
                if (clientY < e.clientY) {
                    _h = squareHeight + deltaY;
                    _h = _h > squareTop ? squareTop : _h;
                    recordY = clientY - diy;
                    recordY = recordY < 0 ? 0 : recordY;
                }
                else {
                    _h = h > maxHeight ? maxHeight : h;
                }
                square.style.left = recordX + "px";
                square.style.top = recordY + "px";
                square.style.width = _w + "px";
                square.style.height = _h + "px";
                width = _w;
                height = _h;
            };
            document.onmouseup = (e) => {
                var _a, _b;
                square && ((_a = this.canvas) === null || _a === void 0 ? void 0 : _a.removeChild(square));
                const creat = () => this.addHotArea({
                    x: recordX + 'px',
                    y: recordY + 'px',
                    w: width + 'px',
                    h: height + 'px',
                }, true);
                // 手动触发
                if (((_b = this.options) === null || _b === void 0 ? void 0 : _b.addMode) === 'manual') {
                    // 满足绘制条件尺寸
                    if (width > 16 && height > 16) {
                        // 有传入手动新增函数
                        if (typeof this.options.manualAdd === 'function') {
                            const hasBackgroundImage = this.hasBackgroundImage();
                            // 不需要上传图片
                            if (this.options.customUpload !== true) {
                                this.options.manualAdd(creat) && creat();
                            }
                            else if (this.options.customUpload === true && hasBackgroundImage) {
                                this.options.manualAdd(creat) && creat();
                            }
                        }
                        else {
                            creat();
                        }
                    }
                }
                document.onmousemove = null;
                document.onmouseup = null;
            };
        }
    }
    // Start drag event
    startDrag(e, square, className, content) {
        var _a, _b;
        const { clientX: startX, clientY: startY } = e;
        const startWidth = square.offsetWidth;
        const startHeight = square.offsetHeight;
        const startLeft = parseInt(square.style.left) || 0;
        const startTop = parseInt(square.style.top) || 0;
        const containerWidth = ((_a = this.canvas) === null || _a === void 0 ? void 0 : _a.offsetWidth) || 0;
        const containerHeight = ((_b = this.canvas) === null || _b === void 0 ? void 0 : _b.offsetHeight) || 0;
        const maxLeft = containerWidth - startWidth;
        const maxTop = containerHeight - startHeight;
        const minSize = 20;
        document.onmousemove = (ev) => {
            this.handleMouseMove(ev, className, square, startX, startY, startWidth, startHeight, startLeft, startTop, maxLeft, maxTop, minSize, containerWidth, containerHeight);
        };
        document.onmouseup = () => {
            var _a, _b;
            (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.overlapCallback) === null || _b === void 0 ? void 0 : _b.call(_a, this.areElementsOverlapping(this.canvas));
            if (content)
                content.style.opacity = '1';
            document.onmousemove = null;
            document.onmouseup = null;
        };
    }
    // Handle mouse move event
    handleMouseMove(ev, className, square, startX, startY, startWidth, startHeight, startLeft, startTop, maxLeft, maxTop, minSize, containerWidth, containerHeight) {
        const deltaX = ev.clientX - startX;
        const deltaY = ev.clientY - startY;
        switch (className) {
            case "hot-square":
                this.moveSquare(square, startLeft, startTop, deltaX, deltaY, maxLeft, maxTop);
                break;
            case "lt":
                this.resizeLT(square, startWidth, startHeight, startLeft, startTop, deltaX, deltaY, minSize, containerWidth, containerHeight);
                break;
            case "lb":
                this.resizeLB(square, startWidth, startHeight, startLeft, startTop, deltaX, deltaY, minSize, containerWidth, containerHeight);
                break;
            case "rt":
                this.resizeRT(square, startWidth, startHeight, startLeft, startTop, deltaX, deltaY, minSize, containerWidth, containerHeight);
                break;
            case "br":
                this.resizeBR(square, startWidth, startHeight, startLeft, startTop, deltaX, deltaY, minSize, containerWidth, containerHeight);
                break;
            case "lm":
                this.resizeLM(square, startWidth, startLeft, deltaX, minSize, containerWidth);
                break;
            case "rm":
                this.resizeRM(square, startWidth, startLeft, deltaX, minSize, containerWidth);
                break;
            case "tm":
                this.resizeTM(square, startHeight, startTop, deltaY, minSize, containerHeight);
                break;
            case "bm":
                this.resizeBM(square, startHeight, startTop, deltaY, minSize, containerHeight);
                break;
        }
    }
    // Move square
    moveSquare(square, startLeft, startTop, deltaX, deltaY, maxLeft, maxTop) {
        const newLeft = Math.max(0, Math.min(startLeft + deltaX, maxLeft));
        const newTop = Math.max(0, Math.min(startTop + deltaY, maxTop));
        square.style.left = `${newLeft}px`;
        square.style.top = `${newTop}px`;
    }
    // Resize functions for each handle
    resizeLT(square, startWidth, startHeight, startLeft, startTop, deltaX, deltaY, minSize, containerWidth, containerHeight) {
        deltaY = -deltaY;
        deltaX = -deltaX;
        let newWidth = startWidth + deltaX;
        let newLeft = startLeft - deltaX;
        let newHeight = startHeight + deltaY;
        let newTop = startTop - deltaY;
        if (newWidth < minSize) {
            newWidth = minSize;
            newLeft = startLeft + startWidth - minSize;
        }
        if (newLeft < 0) {
            newLeft = 0;
            newWidth = startWidth + startLeft;
        }
        if (newLeft + newWidth > containerWidth) {
            newWidth = containerWidth - newLeft;
        }
        if (newHeight < minSize) {
            newHeight = minSize;
            newTop = startTop + startHeight - minSize;
        }
        if (newTop < 0) {
            newTop = 0;
            newHeight = startHeight + startTop;
        }
        if (newTop + newHeight > containerHeight) {
            newHeight = containerHeight - newTop;
        }
        square.style.width = `${newWidth}px`;
        square.style.height = `${newHeight}px`;
        square.style.left = `${newLeft}px`;
        square.style.top = `${newTop}px`;
    }
    resizeLB(square, startWidth, startHeight, startLeft, startTop, deltaX, deltaY, minSize, containerWidth, containerHeight) {
        let newWidth = startWidth - deltaX;
        let newLeft = startLeft + deltaX;
        let newHeight = startHeight + deltaY;
        if (newWidth < minSize) {
            newWidth = minSize;
            newLeft = startLeft + (startWidth - minSize);
        }
        if (newLeft < 0) {
            newLeft = 0;
            newWidth = startWidth + startLeft;
        }
        if (newLeft + newWidth > containerWidth) {
            newWidth = containerWidth - newLeft;
        }
        if (newHeight < minSize) {
            newHeight = minSize;
        }
        if (startTop + newHeight > containerHeight) {
            newHeight = containerHeight - startTop;
        }
        square.style.width = `${newWidth}px`;
        square.style.left = `${newLeft}px`;
        square.style.height = `${newHeight}px`;
    }
    resizeRT(square, startWidth, startHeight, startLeft, startTop, deltaX, deltaY, minSize, containerWidth, containerHeight) {
        deltaY = -deltaY;
        let newWidth = startWidth + deltaX;
        let newHeight = startHeight + deltaY;
        let newTop = startTop - deltaY;
        if (newWidth < minSize) {
            newWidth = minSize;
        }
        if (startLeft + newWidth > containerWidth) {
            newWidth = containerWidth - startLeft;
        }
        if (newHeight < minSize) {
            newHeight = minSize;
            newTop = startTop + startHeight - minSize;
        }
        if (newTop < 0) {
            newTop = 0;
            newHeight = startHeight + startTop;
        }
        if (newTop + newHeight > containerHeight) {
            newHeight = containerHeight - newTop;
        }
        square.style.width = `${newWidth}px`;
        square.style.height = `${newHeight}px`;
        square.style.top = `${newTop}px`;
    }
    resizeBR(square, startWidth, startHeight, startLeft, startTop, deltaX, deltaY, minSize, containerWidth, containerHeight) {
        let newWidth = startWidth + deltaX;
        let newHeight = startHeight + deltaY;
        if (newWidth < minSize)
            newWidth = minSize;
        if (startLeft + newWidth > containerWidth) {
            newWidth = containerWidth - startLeft;
        }
        if (newHeight < minSize)
            newHeight = minSize;
        if (startTop + newHeight > containerHeight) {
            newHeight = containerHeight - startTop;
        }
        square.style.width = `${newWidth}px`;
        square.style.height = `${newHeight}px`;
    }
    resizeLM(square, startWidth, startLeft, deltaX, minSize, containerWidth) {
        let newWidth = startWidth - deltaX;
        let newLeft = startLeft + deltaX;
        if (newWidth < minSize) {
            newWidth = minSize;
            newLeft = startLeft + (startWidth - minSize);
        }
        if (newLeft < 0) {
            newLeft = 0;
            newWidth = startWidth + startLeft;
        }
        if (newLeft + newWidth > containerWidth) {
            newWidth = containerWidth - newLeft;
        }
        square.style.width = `${newWidth}px`;
        square.style.left = `${newLeft}px`;
    }
    resizeRM(square, startWidth, startLeft, deltaX, minSize, containerWidth) {
        let newWidth = startWidth + deltaX;
        if (newWidth < minSize) {
            newWidth = minSize;
        }
        if (startLeft + newWidth > containerWidth) {
            newWidth = containerWidth - startLeft;
        }
        square.style.width = `${newWidth}px`;
    }
    resizeTM(square, startHeight, startTop, deltaY, minSize, containerHeight) {
        deltaY = -deltaY;
        let newHeight = startHeight + deltaY;
        let newTop = startTop - deltaY;
        if (newHeight < minSize) {
            newHeight = minSize;
            newTop = startTop + startHeight - minSize;
        }
        if (newTop < 0) {
            newTop = 0;
            newHeight = startHeight + startTop;
        }
        if (newTop + newHeight > containerHeight) {
            newHeight = containerHeight - newTop;
        }
        square.style.height = `${newHeight}px`;
        square.style.top = `${newTop}px`;
    }
    resizeBM(square, startHeight, startTop, deltaY, minSize, containerHeight) {
        let newHeight = startHeight + deltaY;
        if (newHeight < minSize)
            newHeight = minSize;
        if (startTop + newHeight > containerHeight) {
            newHeight = containerHeight - startTop;
        }
        square.style.height = `${newHeight}px`;
    }
    // Upload hot area image
    uploadHotImg(src) {
        return new Promise((resolve, reject) => {
            var _a;
            const img = new Image();
            img.src = src;
            img.style.cssText = "position:absolute;left:0;top:0;opacity:0";
            (_a = this.container) === null || _a === void 0 ? void 0 : _a.appendChild(img);
            img.onload = () => {
                this.scaleCalc(img.offsetWidth, img.offsetHeight, src, resolve);
                img.remove();
            };
            img.onerror = () => {
                img.remove();
                reject(new Error("Image load error"));
            };
        });
    }
    // Scale calculation
    scaleCalc(w, h, src, resolve) {
        var _a, _b;
        if (!this.isInit)
            this.resetInit();
        if (!this.container || !this.canvas)
            return;
        const { offsetWidth: containerWidth, offsetHeight: containerHeight } = this.container;
        const imageAspectRatio = w / h;
        const containerAspectRatio = containerWidth / containerHeight;
        let scale;
        if (this.options.scaleMode === "auto" &&
            w < containerWidth &&
            h < containerHeight) {
            scale = 1;
        }
        else {
            if (imageAspectRatio > containerAspectRatio) {
                scale = containerWidth / w;
            }
            else {
                scale = containerHeight / h;
            }
        }
        this.canvas.style.cssText = `
        position: absolute;
        width: ${w * scale}px;
        height: ${h * scale}px;
        background-image: url(${src});
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        box-sizing: border-box;
        border: 1px dashed #ccc;
      `;
        const canvasStyle = ((_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.style) === null || _b === void 0 ? void 0 : _b.canvas) || {};
        // 覆盖默认的画布样式
        Object.keys(canvasStyle).forEach((k) => {
            if (this.canvas) {
                this.canvas.style[k] = canvasStyle[k];
            }
        });
        this.scale = scale;
        this.hotImgWidth = w * scale;
        this.hotImgHeight = h * scale;
        resolve({ w: this.hotImgWidth, h: this.hotImgHeight, scale: this.scale });
    }
    hasBackgroundImage() {
        if (!this.canvas)
            return false;
        const style = getComputedStyle(this.canvas);
        const bgImage = style.backgroundImage;
        // 检查 backgroundImage 是否为有效图片路径
        return bgImage !== 'none' && bgImage.includes('url(');
    }
    delImage() {
        var _a;
        if (!this.canvas)
            return;
        this.canvas.style.backgroundImage = 'none';
        this.canvas.style.display = 'none';
        (_a = this.container) === null || _a === void 0 ? void 0 : _a.querySelectorAll(".hot-square").forEach((i) => i.remove());
    }
    // Destroy instance
    destroy() {
        var _a, _b, _c;
        (_a = this.container) === null || _a === void 0 ? void 0 : _a.querySelectorAll(".hot-square").forEach((i) => i.remove());
        (_b = this.canvas) === null || _b === void 0 ? void 0 : _b.remove();
        (_c = this.container) === null || _c === void 0 ? void 0 : _c.removeEventListener("mousedown", this.handleMouseDownFunc);
        this.canvas = null;
        this.isInit = false;
        this.container = null;
    }
    delImgHotArea() {
        var _a, _b, _c;
        (_a = this.container) === null || _a === void 0 ? void 0 : _a.querySelectorAll(".hot-square").forEach((i) => i.remove());
        (_b = this.canvas) === null || _b === void 0 ? void 0 : _b.remove();
        (_c = this.container) === null || _c === void 0 ? void 0 : _c.removeEventListener("mousedown", this.handleMouseDownFunc);
    }
    // Get maximum z-index
    getMaxZIndex() {
        var _a;
        const divs = (_a = this.container) === null || _a === void 0 ? void 0 : _a.querySelectorAll(".hot-square");
        if (divs === null || divs === void 0 ? void 0 : divs.length) {
            return Math.max(...Array.from(divs).map((i) => parseInt(getComputedStyle(i).zIndex) || 1));
        }
        return 1;
    }
    /***
     * @description: 校验热区之间是否重叠
     */
    areElementsOverlapping(container = this.canvas) {
        // 获取容器的所有子元素
        const children = container.querySelectorAll(".hot-square");
        const length = children.length;
        // 遍历每个子元素
        for (let i = 0; i < length; i++) {
            const rect1 = children[i].getBoundingClientRect();
            // 遍历剩余的子元素进行比较
            for (let j = i + 1; j < length; j++) {
                const rect2 = children[j].getBoundingClientRect();
                // 检查是否有重叠
                if (!(rect2.left > rect1.right ||
                    rect2.right < rect1.left ||
                    rect2.top > rect1.bottom ||
                    rect2.bottom < rect1.top)) {
                    return true; // 有重叠
                }
            }
        }
        return false; // 无重叠
    }
    // mode: array | object
    getHotAreaData(mode = "array") {
        const container = this.container;
        const list = container.querySelectorAll(".hot-square");
        const hotSquares = Array.from(list);
        const map = hotSquares.reduce((acc, current) => {
            const seqElement = current.querySelector(".hot-seq");
            if (!seqElement)
                return acc;
            const index = parseInt(seqElement.innerText) - 1;
            const x = parseFloat(current.style.left || "0");
            const y = parseFloat(current.style.top || "0");
            // 类型保护：确保在对象模式下操作
            const objAcc = acc;
            objAcc[index] = { x, y, w: current.offsetWidth, h: current.offsetHeight, index };
            return objAcc;
        }, {});
        if (mode === "array") {
            return Object.values(map);
        }
        else {
            return map;
        }
    }
}

export { ImageHotSpot as default };
