/// <reference path="../../libs/LayaAir.d.ts" />
var laya;
(function (laya) {
    var Sprite = laya.display.Sprite;
    var Stage = laya.display.Stage;
    var Text = laya.display.Text;
    var Event = laya.events.Event;
    var Browser = laya.utils.Browser;
    var WebGL = laya.webgl.WebGL;
    var Interaction_Mouse = (function () {
        function Interaction_Mouse() {
            // 不支持WebGL时自动切换至Canvas
            Laya.init(Browser.clientWidth, Browser.clientHeight, WebGL);
            Laya.stage.alignV = Stage.ALIGN_MIDDLE;
            Laya.stage.alignH = Stage.ALIGN_CENTER;
            Laya.stage.scaleMode = "showall";
            Laya.stage.bgColor = "#232628";
            this.setup();
        }
        Interaction_Mouse.prototype.setup = function () {
            this.createInteractiveTarget();
            this.createLogger();
        };
        Interaction_Mouse.prototype.createInteractiveTarget = function () {
            var rect = new Sprite();
            rect.graphics.drawRect(0, 0, 200, 200, "#D2691E");
            rect.size(200, 200);
            rect.x = (Laya.stage.width - 200) / 2;
            rect.y = (Laya.stage.height - 200) / 2;
            Laya.stage.addChild(rect);
            //增加鼠标事件
            rect.on(Event.MOUSE_DOWN, this, this.mouseHandler);
            rect.on(Event.MOUSE_UP, this, this.mouseHandler);
            rect.on(Event.CLICK, this, this.mouseHandler);
            rect.on(Event.RIGHT_MOUSE_DOWN, this, this.mouseHandler);
            rect.on(Event.RIGHT_MOUSE_UP, this, this.mouseHandler);
            rect.on(Event.RIGHT_CLICK, this, this.mouseHandler);
            rect.on(Event.MOUSE_MOVE, this, this.mouseHandler);
            rect.on(Event.MOUSE_OVER, this, this.mouseHandler);
            rect.on(Event.MOUSE_OUT, this, this.mouseHandler);
            rect.on(Event.DOUBLE_CLICK, this, this.mouseHandler);
            rect.on(Event.MOUSE_WHEEL, this, this.mouseHandler);
        };
        /**
         * 鼠标响应事件处理
         */
        Interaction_Mouse.prototype.mouseHandler = function (e) {
            switch (e.type) {
                case Event.MOUSE_DOWN:
                    this.appendText("\n————————\n左键按下");
                    break;
                case Event.MOUSE_UP:
                    this.appendText("\n左键抬起");
                    break;
                case Event.CLICK:
                    this.appendText("\n左键点击\n————————");
                    break;
                case Event.RIGHT_MOUSE_DOWN:
                    this.appendText("\n————————\n右键按下");
                    break;
                case Event.RIGHT_MOUSE_UP:
                    this.appendText("\n右键抬起");
                    break;
                case Event.RIGHT_CLICK:
                    this.appendText("\n右键单击\n————————");
                    break;
                case Event.MOUSE_MOVE:
                    // 如果上一个操作是移动，提示信息仅加入.字符
                    if (/鼠标移动\.*$/.test(this.txt.text))
                        this.appendText(".");
                    else
                        this.appendText("\n鼠标移动");
                    break;
                case Event.MOUSE_OVER:
                    this.appendText("\n鼠标经过目标");
                    break;
                case Event.MOUSE_OUT:
                    this.appendText("\n鼠标移出目标");
                    break;
                case Event.DOUBLE_CLICK:
                    this.appendText("\n鼠标左键双击\n————————");
                    break;
                case Event.MOUSE_WHEEL:
                    this.appendText("\n鼠标滚轮滚动");
                    break;
            }
        };
        Interaction_Mouse.prototype.appendText = function (value) {
            this.txt.text += value;
            this.txt.scrollY = this.txt.maxScrollY;
        };
        /**添加提示文本*/
        Interaction_Mouse.prototype.createLogger = function () {
            this.txt = new Text();
            this.txt.overflow = Text.SCROLL;
            this.txt.text = "请把鼠标移到到矩形方块,左右键操作触发相应事件\n";
            this.txt.size(Laya.stage.width, Laya.stage.height);
            this.txt.pos(10, 50);
            this.txt.fontSize = 20;
            this.txt.wordWrap = true;
            this.txt.color = "#FFFFFF";
            Laya.stage.addChild(this.txt);
        };
        return Interaction_Mouse;
    }());
    laya.Interaction_Mouse = Interaction_Mouse;
})(laya || (laya = {}));
new laya.Interaction_Mouse();
