var laya;
(function (laya) {
    var Templet = Laya.Templet;
    var Event = Laya.Event;
    var Loader = Laya.Loader;
    var Browser = Laya.Browser;
    var Handler = Laya.Handler;
    var Stat = Laya.Stat;
    var WebGL = Laya.WebGL;
    var PerformanceTest_Skeleton = (function () {
        function PerformanceTest_Skeleton() {
            this.fileName = "Dragon";
            this.rowCount = 10;
            this.colCount = 10;
            this.xOff = 50;
            this.yOff = 100;
            this.mAnimationArray = [];
            this.mActionIndex = 0;
            this.mSpacingX = Browser.width / this.colCount;
            this.mSpacingY = Browser.height / this.rowCount;
            Laya.init(Browser.width, Browser.height, WebGL);
            Stat.show();
            this.mTexturePath = "../../res/skeleton/" + this.fileName + "/" + this.fileName + ".png";
            this.mAniPath = "../../res/skeleton/" + this.fileName + "/" + this.fileName + ".sk";
            Laya.loader.load([{ url: this.mTexturePath, type: Loader.IMAGE }, { url: this.mAniPath, type: Loader.BUFFER }], Handler.create(this, this.onAssetsLoaded));
        }
        PerformanceTest_Skeleton.prototype.onAssetsLoaded = function () {
            var tTexture = Loader.getRes(this.mTexturePath);
            var arraybuffer = Loader.getRes(this.mAniPath);
            this.mFactory = new Templet();
            this.mFactory.on(Event.COMPLETE, this, this.parseComplete);
            this.mFactory.parseData(tTexture, arraybuffer, 10);
        };
        PerformanceTest_Skeleton.prototype.parseComplete = function () {
            for (var i = 0; i < this.rowCount; i++) {
                for (var j = 0; j < this.colCount; j++) {
                    this.mArmature = this.mFactory.buildArmature();
                    this.mArmature.x = this.xOff + j * this.mSpacingX;
                    this.mArmature.y = this.yOff + i * this.mSpacingY;
                    this.mArmature.play(0, true);
                    this.mAnimationArray.push(this.mArmature);
                    Laya.stage.addChild(this.mArmature);
                }
            }
            Laya.stage.on(Event.CLICK, this, this.toggleAction);
        };
        PerformanceTest_Skeleton.prototype.toggleAction = function (e) {
            this.mActionIndex++;
            var tAnimNum = this.mArmature.getAnimNum();
            if (this.mActionIndex >= tAnimNum) {
                this.mActionIndex = 0;
            }
            for (var i = 0, n = this.mAnimationArray.length; i < n; i++) {
                this.mAnimationArray[i].play(this.mActionIndex, true);
            }
        };
        return PerformanceTest_Skeleton;
    }());
    laya.PerformanceTest_Skeleton = PerformanceTest_Skeleton;
})(laya || (laya = {}));
new laya.PerformanceTest_Skeleton();
