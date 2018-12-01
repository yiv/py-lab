require = function a(s, r, c) {
    function h(e, t) {
        if (!r[e]) {
            if (!s[e]) {
                var i = "function" == typeof require && require;
                if (!t && i) return i(e, !0);
                if (l) return l(e, !0);
                var n = new Error("Cannot find module '" + e + "'");
                throw n.code = "MODULE_NOT_FOUND", n
            }
            var o = r[e] = {exports: {}};
            s[e][0].call(o.exports, function (t) {
                return h(s[e][1][t] || t)
            }, o, o.exports, a, s, r, c)
        }
        return r[e].exports
    }

    for (var l = "function" == typeof require && require, t = 0; t < c.length; t++) h(c[t]);
    return h
}({
    BattleGround: [function (t, e, i) {
        "use strict";
        cc._RF.push(e, "9efabEr7HdHR4NZ6XQ1Aqtx", "BattleGround");
        cc.Class({
            extends: cc.Component,
            properties: {bg: [cc.Sprite], speed: 100, planesPrefab1: [cc.Prefab], planesPrefab2: [cc.Prefab]},
            initResultLayer: function () {
                var i = this.node.getChildByName("ui_result");
                i.active = !1, cc.find("b1", i).on("click", function () {
                    this.showResultLayer(!1), cc.director.loadScene("battle")
                }, this), cc.find("b2", i).on("click", function () {
                    this.showResultLayer(!1), WxSdk.setBannerBattle(!1), cc.director.loadScene("main")
                }, this), cc.find("b3", i).on("click", function () {
                    WxSdk.shareToWx(function () {
                        cc.log("share suc")
                    })
                }, this), cc.find("b4", i).on("click", function () {
                    WxSdk.previewImage()
                }, this);
                var n = cc.find("n1/t1", i).getComponent(cc.Label), o = cc.find("n1/t2", i).getComponent(cc.Label);
                this.showResultLayer = function (t) {
                    if (t) {
                        i.active = !0, n.string = GameData.score;
                        var e = GameData.prop.gold.count - GameData.preGoldCound;
                        o.string = 0 < e ? "+" + e : e, console.log("=========================", GameData.score, GameData.historyScore), GameData.score > GameData.historyScore && (console.log("======3"), GameData.historyScore = GameData.score, cc.sys.localStorage.setItem(GameData.scroeKey, GameData.score.toString()), WxSdk.postUserRankInfoToCloudStorage([{
                            key: "score1",
                            value: GameData.score.toString()
                        }])), NHttp.pushUserInfo("score", GameData.historyScore, function () {
                        }), SubdomainSender.openFirst3Rank()
                    } else i.active = !1, SubdomainSender.closeRank()
                }
            },
            onRevive: function () {
                GameData.reviveCount++, GameData.nLife = 3, this.updateLifeBlock();
                var t = cc.instantiate(this.myPlane);
                t.setPosition(cc.p(0, -350)), t.parent = this.planeBg, t.curControl.setPlaneLv(this.myPlane.curControl.planeLv), t.setLocalZOrder(2), this.myPlane.curControl.onDie(!0), this.myPlane = t, this.myPlane.curControl.usePropShield(3, 2), GameData.onRevive(), this.setPause(!1)
            },
            initFuhuoLayer: function () {
                var e = this, o = this.node.getChildByName("ui_fuhuo");
                o.active = !1;
                var a = cc.find("n1/t1", o).getComponent(cc.Label), s = cc.find("n1/t2", o).getComponent(cc.Label),
                    r = o.getChildByName("t1"), c = function () {
                        var t = r.t--;
                        r.getComponent(cc.Label).string = "是否复活？ " + t, 0 === t && (e.showFuHuoLayer(!1), e.showResultLayer(!0))
                    };
                o.getChildByName("b3").on("click", function () {
                    r.stopAllActions(), e.showFuHuoLayer(!1), e.showResultLayer(!0)
                }, this), o.getChildByName("b1").on("click", function () {
                    WxSdk.playVideoShop(function () {
                        e.onRevive(), e.showFuHuoLayer(!1)
                    })
                }, this);
                var t = o.getChildByName("b2");
                t.on("click", function () {
                    GameData.prop.gold.change(-GameSet.reviveGold) && (e.onRevive(), e.showFuHuoLayer(!1))
                }, this);
                var h = t.getChildByName("t").getComponent(cc.Label);
                this.showFuHuoLayer = function (t) {
                    if (r.stopAllActions(), t) {
                        o.active = !0, a.string = GameData.score, s.string = " " + GameData.prop.gold.count, h.string = GameSet.reviveGold, r.t = 10, c();
                        var e = cc.delayTime(1), i = cc.callFunc(c, this), n = cc.sequence(e, i);
                        r.runAction(cc.repeat(n, 10))
                    } else o.active = !1, cc.director.resume()
                }
            },
            initPauseLayer: function () {
                var e = this.node.getChildByName("box_pause");
                e.active = !1, this.showPauseLayer = function (t) {
                    t ? (e.active = !0, this.setPause(!0)) : (e.active = !1, this.setPause(!1))
                }, this.node.getChildByName("btn_pause").on("click", function () {
                    this.showPauseLayer(!0)
                }, this), cc.find("bg/btn_back", e).on("click", function () {
                    this.showPauseLayer(!1), WxSdk.setBannerBattle(!1), cc.director.loadScene("main")
                }, this), cc.find("bg/btn_jixu", e).on("click", function () {
                    this.showPauseLayer(!1)
                }, this)
            },
            initLibao: function () {
                var a = this, n = this.node.getChildByName("ui_libao");
                n.active = !1;
                for (var s = [], o = [], t = 0; t < 3; ++t) s[t] = n.getChildByName("item" + (t + 1)), s[t].active = !1, o[t] = s[t].getPosition();
                this.closeLibao = function () {
                    for (var t = 0; t < 3; ++t) s[t].active = !1;
                    n.active = !1, this.setPause(!1), WxSdk.setBannerBattle(!0, !0)
                }, n.getChildByName("btn_close").on("click", function () {
                    this.closeLibao()
                }, this);
                var r = [];
                this.showLibao = function () {
                    this.setPause(!0), r.length = 0, n.active = !0;
                    for (var t = RandInt(0, 3), e = 0; e < 3; ++e) e !== t && r.push(e);
                    for (e = 0; e < r.length; ++e) {
                        var i = r[e];
                        s[i].active = !0, s[i].setPosition(o[e])
                    }
                };
                var c = [cc.p(267, 0), cc.p(267, -93), cc.p(267, -189)];
                n.getChildByName("btn_video").on("click", function () {
                    WxSdk.playVideoShop(function () {
                        for (var t = 0; t < r.length; ++t) {
                            var e = r[t], i = s[e].getChildByName("i"), n = i.convertToWorldSpaceAR(cc.p(0, 0));
                            n = a.node.convertToNodeSpaceAR(n);
                            var o = cc.instantiate(i);
                            o.setPosition(n), o.parent = a.node, o.runAction(cc.jumpTo(.5, c[e], 100, 1).easing(cc.easeIn(2))), o.runAction(cc.scaleBy(.5, .5, .5).easing(cc.easeIn(2))), o.runAction(cc.sequence(cc.delayTime(.5), cc.removeSelf())), 0 === e ? GameData.prop.bomb.change(1) : 1 === e ? GameData.prop.shield.change(1) : 2 === e && GameData.prop.fast.change(1)
                        }
                        a.scheduleOnce(function () {
                            a.updatePropNum()
                        }, .6), a.closeLibao()
                    })
                }, this), this.node.on("libao", function (t) {
                    this.showLibao()
                }, this)
            },
            initUI: function () {
                this.labScore = this.node.getChildByName("score").getComponent(cc.Label), this.labGold = this.node.getChildByName("coin").getComponent(cc.Label), this.planeBg = this.node.getChildByName("planeBg"), this.lifeblock = [this.node.getChildByName("hp1"), this.node.getChildByName("hp2"), this.node.getChildByName("hp3")], this.initFuhuoLayer(), this.initResultLayer(), this.initPauseLayer(), this.initLibao(), this.updateLifeBlock = function () {
                    for (var t = 0; t < 3; ++t) this.lifeblock[t].active = GameData.nLife > t
                }, this.node.on("behit", function (t) {
                    this.updateLifeBlock(), WxSdk.vibrate(!1)
                }, this), this.node.on("gameOver", function (t) {
                    this.setPause(!0), WxSdk.vibrate(!1), this.scheduleOnce(function () {
                        GameData.reviveCount < 2 ? this.showFuHuoLayer(!0) : (this.myPlane.curControl.onDie(!0), this.showResultLayer(!0), this.setPause(!0))
                    }, .3)
                }, this)
            },
            setPause: function (t) {
                cc.director.getCollisionManager().enabled = !t, this.isPause = t
            },
            onDestroy: function () {
                GameData.clrBattle()
            },
            onLoad: function () {
                this.scheduleOnce(function () {
                    WxSdk.setBannerBattle(!0, !0)
                }, 5), GameData.resetBattle(), this.initUI(), (this.node.curControl = this).setPause(!1);
                var t = 1 === GameData.planeLaser.inUse ? 3 : 0;
                GameData.planeLaser.inUse = 0, this.changePlane(t), this.pro = new cbNpcPlaneFactory(this.planeBg, this.planesPrefab2), this.addTouch(), this.initProp()
            },
            initProp: function () {
                var t = cc.find("btn_bigbomb", this.node), e = cc.find("btn_shield", this.node),
                    i = cc.find("btn_baozou", this.node), n = t.getChildByName("t"), o = e.getChildByName("t"),
                    a = i.getChildByName("t");
                n.getComponent(cc.Label).string = GameData.prop.bomb.count, o.getComponent(cc.Label).string = GameData.prop.shield.count, a.getComponent(cc.Label).string = GameData.prop.fast.count, this.updatePropNum = function () {
                    n.getComponent(cc.Label).string = GameData.prop.bomb.count, o.getComponent(cc.Label).string = GameData.prop.shield.count, a.getComponent(cc.Label).string = GameData.prop.fast.count
                }, t.on("click", function () {
                    GameData.prop.bomb.change(-1) && (this.myPlane.curControl.usePropBomb(), n.getComponent(cc.Label).string = GameData.prop.bomb.count)
                }, this), e.on("click", function () {
                    GameData.prop.shield.change(-1) && (this.myPlane.curControl.usePropShield(8, 2), o.getComponent(cc.Label).string = GameData.prop.shield.count)
                }, this), i.on("click", function () {
                    GameData.prop.fast.change(-1) && (this.myPlane.curControl.usePropFast(8, 2), a.getComponent(cc.Label).string = GameData.prop.fast.count)
                }, this)
            },
            changePlane: function (t) {
                var e = cc.p(0, -350), i = cc.loader.getRes(GameData.planePrefabPath[t]), n = cc.instantiate(i), o = 0;
                this.myPlane && (e.x = this.myPlane.x, e.y = this.myPlane.y, o = this.myPlane.curControl.planeLv, this.myPlane.curControl.toOtherNode(n), this.myPlane.curControl.onDie(!0)), n.setPosition(e), n.parent = this.planeBg, n.curControl.setPlaneLv(o), n.setLocalZOrder(2), this.myPlane = n
            },
            addTouch: function () {
                var n = this.node.getChildByName("skillmask");
                this.touchIds = [];
                var t = cc.find("touchNode", this.node);
                t.on(cc.Node.EventType.TOUCH_START, function (t) {
                    this.isPause2 = !1, this.touchIds.push(t.getID()), t.stopPropagationImmediate(), n.active = !1
                }, this);
                t.on(cc.Node.EventType.TOUCH_MOVE, function (t) {
                    this.isPause || (this.myPlane.x += t.getDelta().x, this.myPlane.x = cc.clampf(this.myPlane.x, -320, 320), this.myPlane.y += t.getDelta().y, this.myPlane.y = cc.clampf(this.myPlane.y, GameSet.down, 568))
                }, this), t.on(cc.Node.EventType.TOUCH_CANCEL, function (t) {
                    this.isPause2 = !0, n.active = !0;
                    for (var e = t.getID(), i = 0; i < this.touchIds.length; ++i) if (this.touchIds[i] === e) {
                        this.touchIds.splice(i, 1);
                        break
                    }
                }, this), t.on(cc.Node.EventType.TOUCH_END, function (t) {
                    this.isPause2 = !0, n.active = !0;
                    for (var e = t.getID(), i = 0; i < this.touchIds.length; ++i) if (this.touchIds[i] === e) {
                        this.touchIds.splice(i, 1);
                        break
                    }
                }, this)
            },
            updateSprite: function (t) {
                GameData.updateBattle(t)
            },
            start: function () {
                this.height = this.bg[0].node.height, this.top = 3 * this.height, this.cur = 0
            },
            update: function (t) {
                if (this.labScore.string = GameData.score, this.labGold.string = GameData.prop.gold.count, !this.isPause2 && !this.isPause) {
                    this.updateSprite(t), this.pro.update(t);
                    for (var e = t * this.speed, i = 0; i < this.bg.length; ++i) this.bg[i].node.y -= e;
                    var n = this.bg[this.cur].node;
                    n.y < -this.height - 500 && (n.setPositionY(n.y + this.top), this.cur = (this.cur + 1) % this.bg.length)
                }
            }
        }), cc._RF.pop()
    }, {}], Boss506: [function (t, e, i) {
        "use strict";
        cc._RF.push(e, "f70b1xlznBAIq7QF2nYptmO", "Boss506"), cc.Class({
            extends: t("NpcPlane"),
            properties: {},
            preInit: function () {
                this.dts = 0, this.anglex = 0, this.anglexFx = 1, this.waitTime = 4, this.waitTime2 = this.waitTime + .8 + .1 * GameData.enemyPlaneLv, this.scheduleOnce(function () {
                    this.moveSpeed = 100
                }, 1), this.jdt || (this.jdt = this.node.getChildByName("jdt2")), this.jdt.scaleX = 1
            },
            shootCheck: function (t) {
                var i = this;
                if (this.jdt.scaleX = this.life / this.life2, this.dts += t, this.dts > this.waitTime2) this.dts = 0, setTimeout(function () {
                    for (var t = 0; t < 2; ++t) {
                        var e = poolManager.getNode("prefab/plane501");
                        e.x = RandInt(-200, 200), e.y = 700, e.parent = i.node.parent, e.setLocalZOrder(2), e.curControl.init(0, GameData.enemyPlaneLv, 400), e.curControl.life = 5 * (GameData.planeLv + 1)
                    }
                }, 1e3); else if (this.dts > this.waitTime) {
                    if (this._super(.6 * t)) {
                        this.anglex += 1 * this.anglexFx;
                        for (var e = 0; e < this.baseAngle.length; ++e) this.planeCfg.angle[e] = this.baseAngle[e] + this.anglex;
                        3 < this.anglex ? this.anglexFx = -1 : this.anglex < -3 && (this.anglexFx = 1)
                    }
                }
            },
            updatePlaneInfo: function () {
                this.planeCfg = {
                    angle: [90, 90, 90, 90, 90],
                    px: [-30, -15, 0, 15, 30],
                    py: [5, 10, 15, 10, 5],
                    weaponLvOffset: 0
                }, this.baseAngle = this.planeCfg.angle = [180, 165, 150, 135, 120, 105, 90, 75, 60, 45, 30, 15, 0], this.planeCfg.px = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                var t = -50;
                this.planeCfg.py = [t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t];
                this.weaponLv = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], this.weapons1 = [], this.weapons2 = [];
                for (var e = 0; e < this.weaponLv.length; ++e) {
                    this.weapons1.push({interval: 0, refire: 0, coolTime: 0});
                    var i = this.weaponLv[e];
                    this.weapons2[e] = 0 < i ? cbWeaponsConfigMap[i] : null
                }
            }
        }), cc._RF.pop()
    }, {NpcPlane: "NpcPlane"}], Boss507: [function (t, e, i) {
        "use strict";
        cc._RF.push(e, "798eecCXQNP17fCNTEti2LL", "Boss507"), cc.Class({
            extends: t("NpcPlane"),
            properties: {},
            preInit: function () {
                this.dts = 0, this.waitTime = 4, this.waitTime2 = this.waitTime + .6 + .1 * GameData.enemyPlaneLv, this._sssangle = 0, this.anglex = this._sssangle, this.scheduleOnce(function () {
                    this.moveSpeed = 100
                }, 1), this.jdt || (this.jdt = this.node.getChildByName("jdt2")), this.jdt.scaleX = 1
            },
            shootCheck: function (t) {
                if (this.jdt.scaleX = this.life / this.life2, this.dts += t, this.dts > this.waitTime2) {
                    this.dts = 0, this.anglex = this._sssangle;
                    for (var e = 0; e < 3; ++e) {
                        var i = poolManager.getNode("prefab/plane502");
                        i.x = 200 * e - 200, i.y = 700, i.parent = this.node.parent, i.setLocalZOrder(2), i.curControl.init(0, 1, 400), i.curControl.life = 5 * (GameData.planeLv + 1)
                    }
                } else if (this.dts > this.waitTime) {
                    if (this._super(3.3 * t)) {
                        this.anglex += 5;
                        for (e = 0; e < this.baseAngle.length; ++e) this.planeCfg.angle[e] = this.baseAngle[e] + this.anglex
                    }
                }
            },
            updatePlaneInfo: function () {
                this.planeCfg = {
                    angle: [90, 90, 90, 90, 90],
                    px: [-10, -5, 0, 5, 10],
                    py: [5, 10, 15, 10, 5],
                    weaponLvOffset: 0,
                    weaponLv: [[0, 0, 1, 0, 0], [0, 1, 0, 1, 0], [0, 1, 1, 1, 0], [1, 1, 0, 1, 1], [1, 1, 1, 1, 1], [1, 1, 2, 1, 1], [1, 2, 1, 2, 1], [1, 2, 2, 2, 1], [2, 2, 1, 2, 2], [2, 2, 2, 2, 2], [2, 2, 3, 2, 2], [2, 3, 2, 3, 2], [2, 3, 3, 3, 2], [3, 3, 2, 3, 3], [3, 3, 3, 3, 3], [3, 3, 4, 3, 3], [3, 4, 3, 4, 3], [3, 4, 4, 4, 3], [4, 4, 3, 4, 4], [4, 4, 4, 4, 4], [4, 4, 5, 4, 4], [4, 5, 4, 5, 4], [4, 5, 5, 5, 4], [5, 5, 4, 5, 5], [5, 5, 5, 5, 5]]
                }, this.baseAngle = this.planeCfg.angle = [120, 0, 0, 0, 0, 0, 60], this.planeCfg.px = [0, 0, -50, 0, 50, 0, 0];
                this.planeCfg.py = [0, -60, 0, 60, 0, 0, 0];
                this.weaponLv = [0, 5, 5, 5, 5, 5, 0], this.weapons1 = [], this.weapons2 = [];
                for (var t = 0; t < this.weaponLv.length; ++t) {
                    this.weapons1.push({interval: 0, refire: 0, coolTime: 0});
                    var e = this.weaponLv[t];
                    this.weapons2[t] = 0 < e ? cbWeaponsConfigMap[e] : null
                }
            }
        }), cc._RF.pop()
    }, {NpcPlane: "NpcPlane"}], Boss508: [function (t, e, i) {
        "use strict";
        cc._RF.push(e, "935929CGC1HfYSLO1U9blt4", "Boss508"), cc.Class({
            extends: t("NpcPlane"),
            properties: {},
            preInit: function () {
                this.scheduleOnce(function () {
                    this.moveSpeed = 100
                }, 1), this.dts = 0, this.waitTime = 4, this.waitTime2 = this.waitTime + .4 + .1 * GameData.enemyPlaneLv, this.scheduleOnce(function () {
                    this.moveSpeed = 100
                }, 1), this.jdt || (this.jdt = this.node.getChildByName("jdt2")), this.jdt.scaleX = 1
            },
            shootCheck: function (t) {
                if (this.jdt.scaleX = this.life / this.life2, this.dts += t, this.dts > this.waitTime2) this.dts = 0, this.scheduleOnce(function () {
                    for (var t = 0; t < 3; ++t) {
                        var e = 45 + 45 * t, i = cbPForAngle(e + this.baseAngel), n = 200 * t - 200, o = 90 - e,
                            a = poolManager.getNode("prefab/missile500"), s = this.node.getPosition();
                        s.x += n, s.y += -100, a.setPosition(s), a.targetDirection = i, a.rotation = o, a.parent = this.node.parent, a.curControl.init(cbWeaponsConfigMap[11]), a.curControl.moveDistance = 2500, a.curControl.life = 12 + 5 * GameData.planeLv, a.setLocalZOrder(3)
                    }
                }, 1); else if (this.dts > this.waitTime) this._super(t + .02)
            },
            updatePlaneInfo: function () {
                this.planeCfg = {
                    angle: [90, 90, 90, 90, 90],
                    px: [-10, -5, 0, 5, 10],
                    py: [15, 20, 25, 20, 15],
                    weaponLvOffset: 0,
                    weaponLv: [[0, 0, 1, 0, 0], [0, 1, 0, 1, 0], [0, 1, 1, 1, 0], [1, 1, 0, 1, 1], [1, 1, 1, 1, 1], [1, 1, 2, 1, 1], [1, 2, 1, 2, 1], [1, 2, 2, 2, 1], [2, 2, 1, 2, 2], [2, 2, 2, 2, 2], [2, 2, 3, 2, 2], [2, 3, 2, 3, 2], [2, 3, 3, 3, 2], [3, 3, 2, 3, 3], [3, 3, 3, 3, 3], [3, 3, 4, 3, 3], [3, 4, 3, 4, 3], [3, 4, 4, 4, 3], [4, 4, 3, 4, 4], [4, 4, 4, 4, 4], [4, 4, 5, 4, 4], [4, 5, 4, 5, 4], [4, 5, 5, 5, 4], [5, 5, 4, 5, 5], [5, 5, 5, 5, 5]]
                }, this.baseAngle = this.planeCfg.angle = [100, 90, 80], this.planeCfg.px = [-100, 0, 100];
                this.planeCfg.py = [0, 0, 0];
                this.weaponLv = [3, 3, 3], this.weapons1 = [], this.weapons2 = [];
                for (var t = 0; t < this.weaponLv.length; ++t) {
                    this.weapons1.push({interval: 0, refire: 0, coolTime: 0});
                    var e = this.weaponLv[t];
                    this.weapons2[t] = 0 < e ? cbWeaponsConfigMap[e] : null
                }
            }
        }), cc._RF.pop()
    }, {NpcPlane: "NpcPlane"}], Buf: [function (t, e, i) {
        "use strict";
        cc._RF.push(e, "b22f5jNMqdC960VMYch8chH", "Buf"), cc.Class({
            extends: cc.Component,
            properties: {nbuf: 0},
            init: function () {
                this.life = 10, this.moveSpeed = 160, this.moveDistance = 1200, this.isBuf = !0, this.node.targetDirection = cc.p(0, -1), GameData.addBattleSprite(this), this.canRemove = !0
            },
            onDestroy: function () {
                this.canRemove = !1
            },
            removeSelf: function () {
                this.canRemove && (this.canRemove = !1, poolManager.putNode(this))
            },
            onLoad: function () {
                this.node.curControl = this
            },
            onDie: function () {
                GameData.removeBattleSprite(this), this.removeSelf()
            },
            onCollisionEnter: function (t, e) {
                this.life <= 0 || (t.node.curControl.onBuf(this.nbuf), this.life = 0, this.onDie())
            },
            updateMove: function (t) {
                if (this.moveDistance <= 0) this.onDie(); else {
                    var e = this.moveSpeed * t;
                    this.moveDistance -= e;
                    var i = this.node.targetDirection;
                    i && (this.node.x += i.x * e, this.node.y += i.y * e)
                }
            },
            updateSelf: function (t) {
                this.updateMove(t)
            }
        }), cc._RF.pop()
    }, {}], BulletSprite: [function (t, e, i) {
        "use strict";
        cc._RF.push(e, "3ce19OzwNdDWrePmIakDSLq", "BulletSprite"), cc.Class({
            extends: cc.Component,
            properties: {isMy: !1},
            init: function (t, e) {
                void 0 === e && (e = t.moveSpeed), this.atk = t.atk, this.isMy && GameData.boostAtk && (this.atk += GameData.boostAtk), this.life = t.life, this.moveSpeed = this.isMy ? 3 * e : e, this.moveDistance = 1200, this.isBullet = !0, GameData.addBattleSprite(this), this.canRemove = !0
            },
            setUseFastFrame: function (t, e) {
                if (t) {
                    if (!this.cbnormalFrame) {
                        var i = this.node.getComponent(cc.Sprite);
                        this.cbnormalFrame = i.spriteFrame, i.spriteFrame = e
                    }
                } else this.cbnormalFrame && ((i = this.node.getComponent(cc.Sprite)).spriteFrame = this.cbnormalFrame, this.cbnormalFrame = void 0)
            },
            onDestroy: function () {
                this.canRemove = !1
            },
            removeSelf: function () {
                this.canRemove && (this.canRemove = !1, poolManager.putNode(this))
            },
            onLoad: function () {
                this.node.curControl = this
            },
            onDie: function (t) {
                GameData.removeBattleSprite(this), this.life = 0, t || playBulletExplode(this), this.removeSelf()
            },
            onCollisionEnter: function (t, e) {
                if (!(this.life <= 0)) {
                    var i = t.node.curControl;
                    i.life <= 0 || (i.life -= this.atk, i.life <= 0 && i.onDie(), this.life = 0, this.onDie())
                }
            },
            updateMove: function (t) {
                if (this.moveDistance <= 0) this.onDie(); else {
                    var e = this.moveSpeed * t;
                    this.moveDistance -= e;
                    var i = this.node.targetDirection;
                    i && (this.node.x += i.x * e, this.node.y += i.y * e)
                }
            },
            updateSelf: function (t) {
                this.updateMove(t)
            }
        }), cc._RF.pop()
    }, {}], Common: [function (e, t, i) {
        "use strict";
        cc._RF.push(t, "8381drIjOtFiogHvai0IJSJ", "Common"), t.exports = function () {
            window.Common = {}, Common.data = {shareList: ""}, Common.constants = {
                APP_ID: "",
                UUID: "",
                TOKEN: ""
            }, Common.moudleId = {
                SHAKE: 0,
                MORE_GAME: 1,
                RANK: 2,
                INVITE: 3,
                BOOST: 4,
                SIGNIN: 5
            }, Common.moudleUi = {
                SHAKE: null,
                MORE_GAME: null,
                RANK: null,
                INVITE: null,
                BOOST: null,
                SIGNIN: null
            }, Common.path = {
                SHAKE: "component/moudle/Shake/prefab/shake",
                MORE_GAME: "component/moudle/MoreGame/prefab/moreGame",
                RANK: "component/moudle/Rank/prefab/rank",
                INVITE: "component/moudle/InviteFriends/prefab/inviteFriends",
                BOOST: "component/moudle/Help/prefab/friendBoost",
                SIGNIN: "component/moudle/SignIn/prefab/signIn"
            }, Common.init = function (t) {
                e("Util")(), e("Http")(), this.constants.APP_ID = t, Util.setShareMode();
                var i = this;
                Http.getAppShareInfo(t, function (t, e) {
                    i.data.shareList = e
                })
            }, Common.showShake = function (n) {
                if (null == this.moudleUi.SHAKE) {
                    this.moudleUi.SHAKE;
                    var o = this.path.SHAKE;
                    cc.loader.loadRes(o, cc.Prefab, function (t, e) {
                        if (null == t) {
                            var i = cc.instantiate(e);
                            i.setPosition(0, 0), n.addChild(i), i
                        } else console.log("Common.showShake ---\x3e 资源加载失败:" + o)
                    })
                } else this.moudleUi.SHAKE.active = !0
            }, Common.showMoreGame = function (n) {
                if (null == this.moudleUi.MORE_GAME) {
                    var o = this.path.MORE_GAME;
                    cc.loader.loadRes(o, cc.Prefab, function (t, e) {
                        if (null == t) {
                            var i = cc.instantiate(e);
                            i.setPosition(0, 0), n.addChild(i), this.moudleUi.MORE_GAME = i
                        } else console.log("Common.showMoreGame ---\x3e 资源加载失败:" + o)
                    })
                } else this.moudleUi.MORE_GAME.active = !0
            }, Common.showRank = function (n) {
                if (null == this.moudleUi.RANK) {
                    var o = this.path.RANK;
                    cc.loader.loadRes(o, cc.Prefab, function (t, e) {
                        if (null == t) {
                            var i = cc.instantiate(e);
                            i.setPosition(0, 0), n.addChild(i), this.moudleUi.RANK = i
                        } else console.log("Common.showMoreGame ---\x3e 资源加载失败:" + o)
                    })
                } else this.moudleUi.RANK.active = !0
            }, Common.showInviteFriends = function (n, o) {
                if (null == this.moudleUi.INVITE) {
                    var a = this.path.INVITE, s = this;
                    cc.loader.loadRes(a, cc.Prefab, function (t, e) {
                        if (null == t) {
                            var i = cc.instantiate(e);
                            i.setPosition(0, 0), i.rewardCallback = o, n.addChild(i), s.moudleUi.INVITE = i
                        } else console.log("Common.showInviteFriends ---\x3e 资源加载失败:" + a)
                    })
                } else this.moudleUi.INVITE.active = !0
            }, Common.showFriendBoost = function (n, o) {
                if (null == this.moudleUi.BOOST) {
                    var a = this.path.BOOST, s = this;
                    cc.loader.loadRes(a, cc.Prefab, function (t, e) {
                        if (null == t) {
                            var i = cc.instantiate(e);
                            i.setPosition(0, 0), i.rewardCallback = o, n.addChild(i), s.moudleUi.BOOST = i
                        } else console.log("Common.showFriendBoost ---\x3e 资源加载失败:" + a)
                    })
                } else this.moudleUi.BOOST.active = !0
            }, Common.showSignIn = function (n, o) {
                if (null == this.moudleUi.SIGNIN) {
                    var a = this.path.SIGNIN;
                    cc.loader.loadRes(a, cc.Prefab, function (t, e) {
                        if (null == t) {
                            var i = cc.instantiate(e);
                            i.setPosition(0, 0), i.rewardCallback = o, n.addChild(i), this.moudleUi.SIGNIN = i
                        } else console.log("Common.showFriendBoost ---\x3e 资源加载失败:" + a)
                    })
                } else this.moudleUi.SIGNIN.active = !0
            }, Common.share = function (t, e) {
                var i, n;
                if ("" != this.data.shareList) {
                    var o = Math.floor(Math.random() * this.data.shareList.length);
                    i = this.data.shareList[o].title, n = this.data.shareList[o].img, Util.shareToWx(i, n, e, t)
                } else console.log("Common.share ---\x3e 分享列表为空：没有可用的分享图标题和图片")
            }
        }, cc._RF.pop()
    }, {Http: "Http", Util: "Util"}], GameData: [function (l, t, e) {
        "use strict";
        cc._RF.push(t, "96b39bnAJNCyp1v761iDFfz", "GameData"), cc.Class({
            extends: cc.Component, onLoad: function () {
                if (!cc.noFirstEnter) {
                    cc.noFirstEnter = !0, window.gameSize = function () {
                        var t = {width: 640, height: 1136}, e = {
                            width: cc.sys.windowPixelResolution.width,
                            height: cc.sys.windowPixelResolution.height
                        };
                        if (t.width < t.height && e.width > e.height || t.height < t.width && e.width < e.height) {
                            var i = e.width;
                            e.width = e.height, e.height = i
                        }
                        console.log(e.width, e.height);
                        var n;
                        return n = t.width / e.width, e.height = e.height * n, e.width = t.width, {
                            def: t,
                            rel: e,
                            scale: n
                        }
                    }(), l("Common")(), l("SubdomainSender")(), l("NHttp")(), l("WxSdk")(), l("Prop")(), l("MusicManager")(), window.GameSet = {
                        userInfo: null,
                        appid: "wxb24e6230d35f9c37",
                        appname: "小奥飞机大战",
                        appDesc: "",
                        shopRewardVideoGold: 1e3,
                        firstPropNum: 6,
                        reviveGold: 800,
                        propBombPrice: 400,
                        propShieldPrice: 400,
                        propFastPrice: 400,
                        shareFriendRewardGold: 500,
                        down: -568
                    }, Common.init(GameSet.appid), window.cbHttp = {
                        get: function (t, e, i) {
                            var n = new XMLHttpRequest;
                            n.onreadystatechange = function () {
                                if (4 == n.readyState && 200 <= n.status && n.status < 400) {
                                    var t = n.responseText;
                                    console.log("http get return:" + t), i(t)
                                }
                            }, t += this.objToPath(e), n.open("GET", t, !0), n.send(), console.log("http get: " + t)
                        }, objToPath: function (t) {
                            if (!t) return "";
                            var e = "";
                            for (a in t) null != t[a] && (e += "" == e ? a + "=" + t[a] : "&" + a + "=" + t[a]);
                            return "?" + e
                        }, post: function (t, e, i) {
                            var n = new XMLHttpRequest;
                            n.onreadystatechange = function () {
                                if (4 == n.readyState && 200 <= n.status && n.status < 400) {
                                    var t = n.responseText;
                                    console.log("http post return:" + t), i(t)
                                }
                            }, n.open("POST", t, !0), n.send(e), console.log("http post: " + t)
                        }
                    }, window.GameData = new function () {
                        this.planeLv = 0, this.boostAtk = 0, this.enemyPlaneLv = 0, this.scroeKey = "scroe__3", this.historyScore = Number(cc.sys.localStorage.getItem(this.scroeKey)) || 0, this.planePrefabPath = ["prefab/plane100", "prefab/plane101", "prefab/plane102", "prefab/plane103"], this.bufPrefabPath = ["prefab/buff00", "prefab/buff01", "prefab/buff02", "prefab/buff03", "prefab/buff20", "prefab/buff21", "prefab/buff22"], this.allSprite = [], this.prop = {
                            gold: new Prop("123465q", "gold", 0),
                            bomb: new Prop("123456w", "bomb", GameSet.firstPropNum),
                            shield: new Prop("123456e", "shield", GameSet.firstPropNum),
                            fast: new Prop("123465t", "fast", GameSet.firstPropNum)
                        }, this.planeLaser = new Prop("pplldfs121331", "planeLaser", 0), cc.game.on(cc.game.EVENT_HIDE, function () {
                            console.log("游戏进入后台")
                        }, this), this.resetBattle = function () {
                            this.destoryBattleSprite(), this.preGoldCound = this.prop.gold.count, this.reviveCount = 0, this.score = 0, this.nLife = 3, this.isBoos = !1, this.randPropRate = .05 * Math.random(), this.myPlaneSprite = {}, this.youPlaneSprite = {}, this.myMissileSprite = {}, this.youMissileSprite = {}, this.myBulletSprite = {}, this.youBulletSprite = {}, this.otherSprite = {}, this._battleDex = 1e3, this.allSprite = [this.youPlaneSprite, this.youMissileSprite, this.youBulletSprite, this.myPlaneSprite, this.myMissileSprite, this.myBulletSprite, this.otherSprite]
                        }, this.setRewardItem = function (t, e) {
                            if ("number" == typeof e) switch (t) {
                                case 1:
                                    this.prop.gold.change(e);
                                    break;
                                case 2:
                                    this.prop.bomb.change(e);
                                    break;
                                case 3:
                                    this.prop.shield.change(e);
                                    break;
                                case 4:
                                    this.prop.fast.change(e);
                                    break;
                                case 5:
                                    this.planeLaser.set(1)
                            } else console.log("err setRewardItem,count isnot a number", t, e)
                        }, this.destoryBattleSprite = function () {
                            for (var t = this.allSprite, e = 0; e < t.length; ++e) {
                                var i = t[e];
                                for (var n in i) i[n].removeSelf()
                            }
                        }, this.updateBattle = function (t) {
                            for (var e = this.allSprite, i = 0; i < e.length; ++i) {
                                var n = e[i];
                                for (var o in n) n[o].updateSelf(t)
                            }
                        }, this.clrBattle = function () {
                        }, this.onBigBomb = function () {
                            var t = this.youPlaneSprite;
                            for (var e in t) {
                                var i = t[e];
                                i.isBoos && (i.life -= 800, 0 < i.life) || i.onDie()
                            }
                            for (var e in t = this.youBulletSprite) t[e].onDie();
                            for (var e in t = this.youMissileSprite) t[e].onDie()
                        }, this.onRevive = function () {
                            var t = this.youPlaneSprite;
                            for (var e in t) {
                                var i = t[e];
                                i.isBoos || i.onDie(!0)
                            }
                            for (var e in t = this.youBulletSprite) t[e].onDie(!0);
                            for (var e in t = this.youMissileSprite) t[e].onDie(!0)
                        }, this.addBattleSprite = function (t) {
                            var e;
                            t.node || cc.log("err addBattleSprite not node"), e = t.isPlane ? t.isMy ? this.myPlaneSprite : this.youPlaneSprite : t.isMissle ? t.isMy ? this.myMissileSprite : this.youMissileSprite : t.isBullet ? t.isMy ? this.myBulletSprite : this.youBulletSprite : this.otherSprite, t._idKey = this._battleDex++, e[t._idKey] = t
                        }, this.removeBattleSprite = function (t) {
                            delete(t.isPlane ? t.isMy ? this.myPlaneSprite : this.youPlaneSprite : t.isMissle ? t.isMy ? this.myMissileSprite : this.youMissileSprite : t.isBullet ? t.isMy ? this.myBulletSprite : this.youBulletSprite : this.otherSprite)[t._idKey]
                        }, this.getOnePlane = function (t, e) {
                            var i, n = t.isMy ? this.youPlaneSprite : this.myPlaneSprite, o = t.node.x, a = t.node.y,
                                s = null;
                            for (var r in n) if (s && 0 < s.node.y) {
                                var c = n[r].node.x, h = n[r].node.y - a, l = Math.abs(c - o);
                                0 < h && l < i && (s = n[r])
                            } else s = n[r], i = Math.abs(s.node.x - o);
                            return s
                        }, this.getOneMissile = function (t, e) {
                            var i = t.isMy ? this.youMissileSprite : this.myMissileSprite, n = null, o = 0;
                            for (var a in i) if (n = i[a], o++ === e) return n;
                            return n
                        }
                    }, cc.windowSize = {width: 640, height: 1136};
                    var g = .5 * cc.windowSize.height,
                        t = (cc.windowSize.height, cc.windowSize.width, cc.windowSize.width, cc.windowSize.height, cc.windowSize.height, .5 * -cc.windowSize.width + 80),
                        e = .5 * cc.windowSize.width - 80;
                    Math.seed = function (t) {
                        var e = t, i = 987654321, n = 4294967295;
                        return function () {
                            var t = ((i = 36969 * (65535 & i) + (i >> 16) & n) << 16) + (e = 18e3 * (65535 & e) + (e >> 16) & n) & n;
                            return (t /= 4294967296) + .5
                        }
                    }, window.cbPForAngle = function (t) {
                        return cc.pForAngle(Math.PI * t / 180)
                    }, window.cbConfigToMap = function (t, e) {
                        for (var i = {}, n = 0; n < e.length; ++n) {
                            var o = e[n];
                            i[o[t]] = o
                        }
                        return i
                    }, window.poolManager = {}, poolManager.init = function () {
                        this.isinit || (this.isinit = !0, this.allNodePool = {}, this.allNodeRes = {}, this.getNode = function (t) {
                            var e = this.allNodePool[t];
                            e || (e = this.allNodePool[t] = new cc.NodePool, this.allNodeRes[t] = cc.loader.getRes(t));
                            var i = e.get();
                            return i || ((i = cc.instantiate(this.allNodeRes[t]))._pathStr = t), i.rotation = 0, i
                        }, this.putNode = function (t) {
                            var e = t.node, i = e._pathStr;
                            i ? this.allNodePool[i].put(e) : e.removeSelf()
                        })
                    }, window.playBulletExplode = function (t) {
                        var e = poolManager.getNode("prefab/aniBulletExplode");
                        e.x = t.node.x, e.y = t.node.y, e.setLocalZOrder(2), e.parent = t.node.parent
                    }, window.playPlaneExplode = function (t) {
                        var e = poolManager.getNode("prefab/aniPlaneExplode");
                        e.x = t.node.x, e.y = t.node.y, e.setLocalZOrder(2), e.parent = t.node.parent
                    }, window.playLaserExplode = function (t, e) {
                        var i = poolManager.getNode("prefab/aniLaserExplode");
                        i.x = e, i.y = t.node.y, i.setLocalZOrder(4), i.parent = t.node.parent
                    }, window.cbIsLoadResDir = !1, window.cbConfigMyPlane = {
                        0: {
                            angle: [90, 90, 90, 90, 90, 90],
                            px: [-40, -20, 0, 0, 20, 40],
                            py: [0, 30, 0, 60, 30, 0],
                            weaponLvOffset: 0,
                            weaponLv: [[0, 1, 0, 0, 1, 0], [0, 1, 0, 1, 1, 0], [0, 1, 1, 1, 1, 0], [1, 1, 1, 0, 1, 1], [1, 1, 1, 1, 1, 1]]
                        },
                        1: {
                            angle: [114, 106, 98, 90, 82, 74, 66],
                            px: [0, 0, 0, 0, 0, 0, 0],
                            py: [10, 10, 10, 10, 10, 10, 10],
                            weaponLvOffset: 0,
                            weaponLv: [[0, 0, 1, 0, 1, 0, 0], [0, 0, 1, 1, 1, 0, 0], [0, 1, 1, 0, 1, 1, 0], [0, 1, 1, 1, 1, 1, 0], [1, 1, 1, 1, 1, 1, 1]]
                        },
                        2: {
                            angle: [150, 120, 90, 60, 30],
                            px: [-60, -30, 0, 30, 60],
                            py: [10, 20, 30, 20, 10],
                            weaponLvOffset: 10,
                            weaponLv: [[0, 0, 1, 0, 0], [0, 1, 0, 1, 0], [0, 1, 1, 1, 0], [1, 1, 0, 1, 1], [1, 1, 1, 1, 1]]
                        },
                        3: {angle: [90], px: [0], py: [15], weaponLvOffset: 0, weaponLv: [[1], [1], [1], [1], [1]]}
                    };
                    for (var i = 0; i < 4; ++i) {
                        for (var n = cbConfigMyPlane[i].weaponLv, o = [], a = 1; a < 5; ++a) for (var s = 0; s < n.length; ++s) {
                            for (var r = [], c = n[s], h = 0; h < c.length; ++h) r[h] = c[h] + a;
                            o.push(r)
                        }
                        for (a = 0; a < o.length; ++a) n.push(o[a])
                    }
                    window.cbConfigNpcPlane = {
                        0: {
                            angle: [110, 100, 90, 80, 70],
                            px: [0, 0, 0, 0, 0],
                            py: [10, 10, 10, 10, 10],
                            weaponLv: [[0, 0, 0, 0, 0], [0, 0, 1, 0, 0], [0, 2, 0, 0, 0], [0, 0, 0, 3, 0], [4, 0, 0, 0, 0], [0, 0, 0, 0, 5], [1, 1, 0, 0, 0], [2, 2, 0, 0, 0], [3, 3, 0, 0, 0], [4, 4, 0, 0, 0], [5, 5, 0, 0, 0], [1, 1, 1, 0, 0], [2, 2, 0, 0, 2], [3, 0, 0, 3, 3], [4, 4, 0, 4, 0], [5, 5, 0, 5, 0], [1, 1, 0, 1, 1], [2, 2, 0, 2, 2], [3, 3, 0, 3, 3], [4, 4, 0, 4, 4], [4, 4, 0, 4, 4], [1, 1, 1, 1, 1], [2, 2, 2, 2, 2], [3, 3, 3, 3, 3], [4, 4, 4, 4, 4], [5, 5, 5, 5, 5]]
                        }
                    }, window.cbPlanEvent = {
                        stop: 0,
                        moveby: 1,
                        repeat: 3,
                        remove: 4,
                        moveto: 5
                    }, window.cfgPlanePath = {
                        0: [{e: 1, x: 0, y: -1300, r: .15}, {e: 4, x: 0, y: -300, r: .1}],
                        1: [{e: 1, x: 0, y: -200, r: .2}, {e: 0, x: 2, y: 1, r: 1}, {e: 1, x: t, y: 0, r: 1}, {
                            e: 1,
                            x: 2 * e,
                            y: 0,
                            r: 1
                        }, {e: 1, x: t, y: 0, r: 1}, {e: 3, x: -1, y: 1, r: 0}],
                        2: [{e: 1, x: 0, y: -200, r: 0}, {e: 0, x: 0, y: 0, r: 1}]
                    }, window.cbGetPlanePath = function (t, e) {
                        var i = cfgPlanePath[t];
                        if (e) {
                            var n = [];
                            if (i) for (var o = 0; o < i.length; ++o) {
                                var a = i[o], s = {};
                                for (var r in a) s[r] = a[r];
                                n.push(s)
                            }
                            return n
                        }
                        return i
                    }, window.RandInt = function (t, e) {
                        return Math.floor(t + (e - t) * Math.random())
                    }, window.cbNpcPlaneFactory = function (a, t) {
                        var s = ["prefab/plane501", "prefab/plane502", "prefab/plane503", "prefab/plane504", "prefab/plane505"],
                            e = 2, r = 2.2, c = 0, h = 30, l = 120, p = cbConfigNpcPlane[0].weaponLv.length - 1;
                        GameData.enemyPlaneLv = 0;
                        var u = ["prefab/plane506", "prefab/plane507", "prefab/plane508"], o = function (t, e, i, n) {
                                if (c++ > h) return c = 0, GameData.enemyPlaneLv++, r -= .15, GameData.enemyPlaneLv = Math.min(p, GameData.enemyPlaneLv), r = Math.max(.2, r), l += 10, h += 2, cc.log("========", "planeLv:" + GameData.enemyPlaneLv, "planeTime2:" + r, "moveSpeed:" + l, "upPlaneNum:" + h), void(GameData.enemyPlaneLv % 2 == 0 && (GameData.isBoos = !0, setTimeout(function () {
                                    var t = poolManager.getNode(u[Math.floor((GameData.enemyPlaneLv - 2) / 2) % 3]);
                                    t.x = 0, t.y = g, t.parent = a, t.setLocalZOrder(2), t.curControl.init(1, GameData.enemyPlaneLv, 500, cbConfigMyPlane[1], !0)
                                }, 2e3)));
                                var o = poolManager.getNode(s[n]);
                                o.x = t, o.y = e, o.parent = a, o.setLocalZOrder(2), o.curControl.init(i, GameData.enemyPlaneLv, l + 50 * Math.random())
                            }, i = {}, d = 0, f = 0,
                            m = [[cc.p(0, g)], [cc.p(-168, g)], [cc.p(168, g)], [cc.p(-240, g), cc.p(-168, g)], [cc.p(-168, g), cc.p(0, g)], [cc.p(0, g), cc.p(168, g)], [cc.p(168, g), cc.p(240, g)], [cc.p(-240, g), cc.p(-168, g), cc.p(0, g)], [cc.p(-168, g), cc.p(0, g), cc.p(168, g)], [cc.p(0, g), cc.p(168, g), cc.p(240, g)], [cc.p(-240, g), cc.p(-168, g), cc.p(0, g), cc.p(168, g)], [cc.p(-168, g), cc.p(0, g), cc.p(168, g), cc.p(240, g)], [cc.p(-240, g), cc.p(-168, g), cc.p(0, g), cc.p(168, g), cc.p(240, g)]];
                        i[0] = function () {
                            for (var t = RandInt(0, m.length), e = m[t], i = 0; i < e.length; ++i) {
                                var n = e[i];
                                o(n.x - 70 + 140 * Math.random(), n.y, 0, f)
                            }
                            f++, f %= s.length, 9 < ++d && (d = 9)
                        }, this.update = function (t) {
                            cbIsLoadResDir && (GameData.isBoos || r <= (e += t) && i[e = 0]())
                        }
                    }
                }
            }
        }), cc._RF.pop()
    }, {
        Common: "Common",
        MusicManager: "MusicManager",
        NHttp: "NHttp",
        Prop: "Prop",
        SubdomainSender: "SubdomainSender",
        WxSdk: "WxSdk"
    }], Http: [function (t, e, i) {
        "use strict";
        cc._RF.push(e, "3975c7Y0B1NN5fki3COsOji", "Http"), e.exports = function () {
            window.Http = {}, Http.addrList = {
                login: "/user/v1/login",
                pushUserInfo: "/user/v1/pushUserInfo",
                getRank: "/user/v1/getRank",
                getAppPageList: "/activity/v1/getAppPageList",
                getAppHotList: "/activity/v1/getAppHotList",
                getAppShareInfo: "/activity/v1/getAppShareInfo",
                getTaskStatus: "/activity/v1/getTaskStatus",
                getTaskAward: "/activity/v1/getTaskAward",
                ip: "https://520poker.com"
            }, Http.getAppShareInfo = function (t, e) {
                var i = this.addrList.ip + this.addrList.getAppShareInfo, n = {app: t};
                this.connet(i, n, e, void 0, "获取分享列表")
            }, Http.getAppHotList = function (t) {
                var e = this.addrList.ip + this.addrList.getAppHotList;
                this.connet(e, {}, t, void 0, "获取游戏推荐列表")
            }, Http.getTaskStatus = function (t, e) {
                var i = this.addrList.ip + this.addrList.getTaskStatus, n = {ids: t};
                this.connet(i, n, e, "Bearer " + NHttp.token, "获取任务状态")
            }, Http.getTaskAward = function (t, e) {
                var i = this.addrList.ip + this.addrList.getTaskAward, n = {id: t};
                this.connet(i, n, e, "Bearer " + NHttp.token, "用户领取奖励上报")
            }, Http.getAppPageList = function (t) {
                var e = this.addrList.ip + this.addrList.getAppPageList;
                this.connet(e, {}, t, void 0, "获取游戏页列表")
            }, Http.getRank = function (t, e, i) {
                var n = this.addrList.ip + this.addrList.getRank, o = {app: t, page: e};
                this.connet(n, o, i, "Bearer " + NHttp.token, "获取排行榜")
            }, Http.pushUserInfo = function (t, e, i, n) {
                var o = this.addrList.ip + this.addrList.pushUserInfo, a = {key: t, adj: e};
                a.delta = !!i, this.connet(o, a, n, "Bearer " + NHttp.token, "上传用户信息")
            }, Http.connet = function (t, i, n, e, o) {
                var a = new XMLHttpRequest;
                a.timeout = 1e5, a.open("POST", t), a.setRequestHeader("Content-Type", "text/plain;");
                var s = JSON.stringify(i);
                console.log("=================http send==================="), console.log("http send httpAddr:" + t), console.log("http send httpBody:" + s), console.log(""), e && a.setRequestHeader("Authorization", e), a.send(s);
                a.onerror = function (t) {
                    console.log("------------http errres:", o, i), n(o + ",onerror:" + t, i)
                }, a.onreadystatechange = function () {
                    if (4 === a.readyState) {
                        var t = a.response;
                        if (console.log("=========http receive========="), console.log("http receive:" + t + " status:" + a.status), console.log(""), 200 <= a.status && a.status < 300) {
                            var e = JSON.parse(t);
                            n(void 0, e)
                        } else n(o + "失败,code:" + a.status, i)
                    }
                }
            }
        }, cc._RF.pop()
    }, {}], LaserAni: [function (t, e, i) {
        "use strict";
        cc._RF.push(e, "0e30asfA5BLA4KbBjsY5MtO", "LaserAni"), cc.Class({
            extends: cc.Component,
            properties: {frame: cc.SpriteFrame, frame_s: cc.SpriteFrame},
            onLoad: function () {
                this.moveLayer = this.node.getChildByName("s0").getChildByName("s"), this.moveLayerSpeed = 140, this.moveLayerDown = -70, this.light = this.node.getChildByName("s2"), this.light.opacity = 0, this.lightfx = 5, this.speed = 5, (this.node.curControl = this).node.setScale(1)
            },
            setUseFastFrame: function (t, e) {
                this.moveLayer.getComponent(cc.Sprite).spriteFrame = t ? this.frame_s : this.frame
            },
            updateLv: function (t) {
                this.speed = 1 + t % 5 * 2;
                var e = .3 * Math.floor(t / 5) + 1;
                console.log("AAAAAA", e, t), this.node.scale = e
            },
            update: function (t) {
                0 <= this.moveLayer.y && (this.moveLayer.y += this.moveLayerDown), this.moveLayer.y += this.moveLayerSpeed * t * this.speed;
                var e = this.light.opacity + t * this.moveLayerSpeed * this.speed * this.lightfx;
                255 < e ? (e = 255, this.lightfx *= -1) : e < 0 && (e = 0, this.lightfx *= -1), this.light.opacity = Math.floor(e)
            }
        }), cc._RF.pop()
    }, {}], LaserSprite: [function (t, e, i) {
        "use strict";
        cc._RF.push(e, "c0b1cKLkD5PHK/e6LyUDR9F", "LaserSprite"), cc.Class({
            extends: cc.Component,
            properties: {isMy: !1},
            init: function (t) {
                this.atk2 = 2 * t.atk, this.atk = this.atk2, this.life = t.life, this.atkAry = [], this.isLaster = !0, this.canRemove = !0, this.laserAni || (this.laserAni = poolManager.getNode("prefab/laserAni"), this.laserAni.x = 0, this.laserAni.y = 0, this.laserAni.parent = this.node)
            },
            updateLv: function (t) {
                this.atk = this.atk2 * (t + 1), this.laserAni.curControl.updateLv(t)
            },
            setUseFastFrame: function (t, e) {
                this.fastframe = e, this.isFast = t, this.laserAni.curControl.setUseFastFrame(this.isFast, this.fastframe)
            },
            onDestroy: function () {
                this.canRemove = !1
            },
            removeSelf: function () {
                this.canRemove && (this.canRemove = !1, this.laserAni && (this.laserAni.parent = null, this.laserAni = null), poolManager.putNode(this))
            },
            onLoad: function () {
                this.node.curControl = this
            },
            onDie: function (t) {
                this.removeSelf()
            },
            onCollisionEnter: function (t, e) {
                var i = t.node.curControl;
                (i.isPlane || i.isMissile) && this.atkAry.push(i)
            },
            onCollisionExit: function (t, e) {
                for (var i = t.node.curControl, n = 0; n < this.atkAry.length; ++n) if (this.atkAry[n] === i) {
                    this.atkAry.splice(n, 1);
                    break
                }
            },
            updateHit: function (t) {
                for (var e = 0; e < this.atkAry.length; ++e) {
                    var i = this.atkAry[e];
                    if (!(i.life <= 0)) if (i.life -= this.atk * t, i.life <= 0) i.onDie(); else {
                        var n = .5 * (i.node.x + this.node.x);
                        playLaserExplode(i, n)
                    }
                }
            },
            updateSelf: function (t) {
                this.isMy && this.isFast !== GameData.prop.fast.inUse && (this.isFast = GameData.prop.fast.inUse, this.laserAni.curControl.setUseFastFrame(this.isFast, this.fastframe)), this.updateHit(t)
            }
        }), cc._RF.pop()
    }, {}], Main: [function (t, e, i) {
        "use strict";
        cc._RF.push(e, "c0656yVDd5Ig7ePUCOYNjNJ", "Main");
        var c = cc.Class({
            extends: cc.Component,
            properties: {spriteFrameM1: cc.SpriteFrame, spriteFrameM2: cc.SpriteFrame},
            initShop: function () {
                var t = this.node.getChildByName("ui_shop");
                t.active = !1, this.nodeshoplayer = t;
                var e = this.node.getChildByName("ui_reward");
                e.active = !1, e.getChildByName("t").getComponent(cc.Label).string = GameSet.shopRewardVideoGold, e.getChildByName("btn_video").on("click", function () {
                    GameData.prop.gold.change(GameSet.shopRewardVideoGold), e.active = !1, this.updateNum()
                }, this), cc.find("ui_main/btn_shop", this.node).on("click", function () {
                    t.active = !0
                }, this), cc.find("btn_back", t).on("click", function () {
                    t.active = !1
                }, this);
                var i = cc.find("btn_video", t);
                i.getChildByName("t").getComponent(cc.Label).string = GameSet.shopRewardVideoGold, i.on("click", function () {
                    WxSdk.playVideoShop(function () {
                        e.active = !0
                    })
                }, this);
                var n = cc.find("t", t);
                this.updateLabGold2 = function () {
                    n.getComponent(cc.Label).string = GameData.prop.gold.count
                };
                var o = cc.find("item1/btn_buy", t);
                o.getChildByName("t").getComponent(cc.Label).string = GameSet.propBombPrice, o.on("click", function () {
                    GameData.prop.gold.change(-GameSet.propBombPrice) && (GameData.prop.bomb.change(1), this.updateNum(), cc.instantiate(cc.loader.getRes("prefab/succesetips")).parent = this.node)
                }, this);
                var a = cc.find("item2/btn_buy", t);
                a.getChildByName("t").getComponent(cc.Label).string = GameSet.propShieldPrice, a.on("click", function () {
                    GameData.prop.gold.change(-GameSet.propShieldPrice) && (GameData.prop.shield.change(1), this.updateNum(), cc.instantiate(cc.loader.getRes("prefab/succesetips")).parent = this.node)
                }, this);
                var s = cc.find("item3/btn_buy", t);
                s.getChildByName("t").getComponent(cc.Label).string = GameSet.propFastPrice, s.on("click", function () {
                    GameData.prop.gold.change(-GameSet.propFastPrice) && (GameData.prop.fast.change(1), this.updateNum(), cc.instantiate(cc.loader.getRes("prefab/succesetips")).parent = this.node)
                }, this)
            },
            updateNum: function () {
                this.updateLabGold1(), this.updateLabGold2()
            },
            init: function () {
                this.initShop(), this.initMoreLayer();
                var n = this;
                cc.find("ui_main/btn_1", this.node).on("click", function () {
                    WxSdk.playVideoShop(function () {
                        GameData.prop.gold.change(GameSet.shopRewardVideoGold), n.updateNum()
                    })
                }, this), cc.find("ui_main/btn_start", this.node).on("click", function () {
                    cbIsLoadResDir && (WxSdk.setBannerMain(!1), cc.director.loadScene("battle"))
                }, this), GameData.score = 0;
                var t = cc.find("ui_main/check_music", this.node);
                t.getComponent(cc.Sprite).spriteFrame = MusicManager.isPlayBgMusic ? this.spriteFrameM1 : this.spriteFrameM2, t.on("click", function () {
                    this.node.Music.click(), t.getComponent(cc.Sprite).spriteFrame = MusicManager.isPlayBgMusic ? this.spriteFrameM1 : this.spriteFrameM2
                }, this), cc.find("ui_main/btn_task", this.node).on("click", function () {
                }, this), cc.find("ui_main/btn_invite", this.node).on("click", function () {
                    Common.showInviteFriends(this.node, function (t) {
                        for (var e in console.log("好友邀请结果", t), t) {
                            var i = t[e];
                            GameData.setRewardItem(i.id, i.amount)
                        }
                        n.updateNum()
                    })
                }, this), cc.find("ui_main/btn_zhuli", this.node).on("click", function () {
                    Common.showFriendBoost(this.node, function (t) {
                        var e = t[0] / 10;
                        0 < e && (GameData.boostAtk = e), console.log("好友助力：" + GameData.boostAtk, t)
                    })
                }, this), cc.find("ui_main/btn_more", this.node).on("click", function () {
                    this.openMoreLayer()
                }, this);
                var e = cc.find("ui_main", this.node);
                e.active = !0;
                var i = cc.find("ui_rank", this.node);
                i.active = !1, this.noderanknode = i;
                var o = cc.find("ui_rank/btn_1", this.node), a = o.getChildByName("i").getComponent(cc.Sprite), s = !0,
                    r = cc.find("rank/title", i).getComponent(cc.Sprite);
                cc.find("ui_main/btn_rank", this.node).on("click", function () {
                    SubdomainSender.openFriendRank(), r.spriteFrame = cc.loader.getRes("images/txt_kthaoyou.png", cc.SpriteFrame), a.spriteFrame = cc.loader.getRes("images/txt_kshijie.png", cc.SpriteFrame), i.active = !0, e.active = !1
                }, this), o.on("click", function () {
                    s ? (SubdomainSender.openWorldRank(), a.spriteFrame = cc.loader.getRes("images/txt_khaoyou.png", cc.SpriteFrame), r.spriteFrame = cc.loader.getRes("images/txt_ktshijie.png", cc.SpriteFrame), s = !1) : (SubdomainSender.openFriendRank(), a.spriteFrame = cc.loader.getRes("images/txt_kshijie.png", cc.SpriteFrame), r.spriteFrame = cc.loader.getRes("images/txt_kthaoyou.png", cc.SpriteFrame), s = !0)
                }, this), cc.find("ui_rank/btn_2", this.node).on("click", function () {
                    SubdomainSender.openGroupRank(function () {
                        r.spriteFrame = cc.loader.getRes("images/txt_qunpaihangbang.png", cc.SpriteFrame)
                    })
                }, this), cc.find("ui_rank/btn_back", this.node).on("click", function () {
                    i.active = !1, e.active = !0, SubdomainSender.closeRank()
                }, this), cc.find("ui_main/i_score/t", this.node).getComponent(cc.Label).string = GameData.historyScore;
                var c = cc.find("ui_main/gold/t", this.node);
                this.updateLabGold1 = function () {
                    c.getComponent(cc.Label).string = GameData.prop.gold.count
                }
            },
            onDestroy: function () {
                WxSdk.setGameClubButton(!1)
            },
            initShengmi: function () {
                var c = this.node.getChildByName("ui_smzj");
                c.active = !1, this.nodeshengmiNode = c;
                for (var h = [], t = 1; t <= 5; ++t) h[t - 1] = c.getChildByName("f" + t).getComponent(cc.Sprite);
                var l = h[0].node.width, p = c.getChildByName("t3").getComponent(cc.Label),
                    e = cc.find("ui_main/btn_yq", this.node), u = e.active = !1, d = c.getChildByName("btn_video");
                d.on("click", function () {
                    if (u) return GameData.planeLaser.inUse = 1, void cc.director.loadScene("battle");
                    WxSdk.shareToWx(function () {
                    }, "uuid=" + NHttp.uuid + "&taskid=1")
                }, this);
                e.on("click", function () {
                    NHttp.getTaskStatus([1], function (t, e) {
                        if (t) console.log(t); else {
                            c.active = !0;
                            var i = e.tasks[1], n = i.note, o = [];
                            for (var a in n) {
                                var s = n[a];
                                console.log(a, s);
                                var r = JSON.parse(s);
                                o.push(r.avatar)
                            }
                            p.string = o.length.toString(), -2 === i.status && (GameData.planeLaser.set(1), d.getChildByName("l").getComponent(cc.Label).string = "开始游戏", u = !0);
                            for (a = 0; a < o.length && a < h.length; ++a) (function (i) {
                                cc.loader.load({url: o[i], type: "png"}, function (t, e) {
                                    h[i].spriteFrame = new cc.SpriteFrame(e), h[i].node.scale = l / h[i].node.width
                                })
                            })(a)
                        }
                    })
                }, this), this.loginSucShengmi = function () {
                    e.active = !0
                }, c.getChildByName("btn_back").on("click", function () {
                    c.active = !1
                }, this)
            },
            initMoreLayer: function () {
                var t = poolManager.getNode("prefab_more/ui_more");
                (this.nodeMore = t).parent = this.node, t.active = !1;
                var r = cc.find("scroll/content", t);
                t.getChildByName("btn_back").on("click", function () {
                    t.active = !1, WxSdk.setBannerMain(!0)
                }, this);
                var o = !1, i = function () {
                    if (!o && c.appPageInfo.list) {
                        o = !0;
                        for (var t = c.appPageInfo.list, e = 0; e < t.length; ++e) if (t[e].appid === GameSet.appid) {
                            t.splice(e, 1);
                            break
                        }
                        var i = [];
                        for (e = 0; e < t.length; ++e) {
                            var n = t[e];
                            i.push(n.poster), i.push(n.qrcode)
                        }
                        console.log("load 1   " + Date.now()), cc.loader.load(i, function (t, e) {
                            if (t) for (var i = 0; i < t.length; i++) cc.log("Error url [" + t[i] + "]: " + e.getError(t[i])); else if (console.log("load 2   " + Date.now()), c.appPageInfo.loadResults = e, r.isValid) for (i = 0; i < c.appPageInfo.list.length; ++i) {
                                var n = c.appPageInfo.list[i], o = new cc.Node("Button");
                                o.qrcode = n.qrcode;
                                var a = o.addComponent(cc.Sprite);
                                o.addComponent(cc.Button);
                                var s = c.appPageInfo.loadResults.getContent(n.poster);
                                a.spriteFrame = new cc.SpriteFrame(s), r.addChild(o), o.on("click", function (t) {
                                    var e = t.detail.node;
                                    WxSdk.previewImage(e.qrcode)
                                }, this)
                            }
                        })
                    }
                };
                this.getMoreRes = function () {
                    c.appPageInfo.loadResults ? i() : NHttp.getAppPageList(function (t, e) {
                        t || (c.appPageInfo.list = e.list, i())
                    })
                }, this.openMoreLayer = function () {
                    t.active = !0, WxSdk.setBannerMain(!1), i()
                }
            },
            onLogin: function () {
                var e = this;
                c.isLoginSuc ? (e.loginSucShengmi(), e.getMoreRes(), WxSdk.updateShareInfo()) : (WxSdk.showShareMenu(), WxSdk.loginWx(function () {
                    NHttp.login(function (t) {
                        t || (c.isLoginSuc = !0, e.onLogin(), SubdomainSender.onLoginSuc())
                    })
                }))
            },
            update: function (t) {
                var e = !0;
                (this.nodeshoplayer && this.nodeshoplayer.active || this.noderanknode && this.noderanknode.active || this.nodeshengmiNode && this.nodeshengmiNode.active || this.nodeMore && this.nodeMore.active || Common.moudleUi.SIGNIN && Common.moudleUi.SIGNIN.active || Common.moudleUi.BOOST && Common.moudleUi.BOOST.active || Common.moudleUi.INVITE && Common.moudleUi.INVITE.active || Common.moudleUi.RANK && Common.moudleUi.RANK.active || Common.moudleUi.MORE_GAME && Common.moudleUi.MORE_GAME.active) && (e = !1), this.showGameClubButton !== e && (this.showGameClubButton = e, WxSdk.setGameClubButton(this.showGameClubButton))
            },
            onLoad: function () {
                var t = this;
                this.initShengmi(), this.showGameClubButton = !0, WxSdk.setGameClubButton(this.showGameClubButton), WxSdk.setBannerMain(!0), this.loadResDir(function () {
                    t.init(), t.updateNum(), t.initPartner(), t.onLogin()
                })
            },
            loadResDir: function (n) {
                var o = this;
                window.cbIsLoadResDir ? n() : cc.loader.loadResDir("", function (t, e) {
                }, function (t, e, i) {
                    0 !== e.length ? (window.cbIsLoadResDir = !0, window.cbWeaponsConfigAry = cc.loader.getRes("config/weapon"), window.cbWeaponsConfigMap = cbConfigToMap("id", cbWeaponsConfigAry), poolManager.init(), n()) : this.scheduleOnce(function () {
                        o.loadResDir(n)
                    }, .02)
                })
            },
            handIcon: function () {
                if (!this.btnHz) {
                    this.btnHz = cc.find("ui_main/btn_hz", this.node);
                    var t = cc.rotateTo(.2, 20), e = cc.rotateTo(.2, -20), i = cc.rotateTo(.2, 20),
                        n = cc.rotateTo(.2, 0), o = cc.delayTime(3), a = cc.sequence(t, e, i, n, o);
                    this.btnHz.runAction(cc.repeatForever(a))
                }
                var s = this.btnHz, r = function () {
                    for (var t, e = Math.random(), i = 0; i < c.gameInfo.ary2.length; ++i) if (e <= c.gameInfo.ary2[i]) {
                        t = c.gameInfo.ary[i], s.sel = i;
                        break
                    }
                    t && cc.loader.load(t.icon, function (t, e) {
                        t || (console.log("Should load a texture from external url: " + (e instanceof cc.Texture2D)), s.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(e))
                    })
                };
                s.on("click", function () {
                    var t = s.sel;
                    WxSdk.previewImageHz(t, c.gameInfo.ary3), r()
                }, this), c.gameInfo.ary && (console.log("sisize:", cc.winSize.width, cc.winSize.height), r())
            },
            statics: {gameInfo: {}, appPageInfo: {}, isLoginSuc: !1},
            initPartner: function () {
                if (c.gameInfo.ary) this.handIcon(); else {
                    var s = this;
                    NHttp.getAppHotList(function (t, e) {
                        if (!t) {
                            var i = e.list;
                            c.gameInfo = {};
                            for (var n = 0; n < i.length; ++n) if (i[n].appid === GameSet.appid) {
                                i.splice(n, 1);
                                break
                            }
                            console.log(i.length), c.gameInfo.ary = i;
                            var o = 0;
                            for (n = 0; n < i.length; ++n) o += i[n].weight;
                            if (c.gameInfo.ary2 = [], c.gameInfo.ary3 = [], 0 !== o) {
                                var a = 0;
                                for (n = 0; n < i.length; ++n) a += i[n].weight / o, c.gameInfo.ary2[n] = a, c.gameInfo.ary3[n] = i[n].qrcode;
                                s.handIcon()
                            }
                        }
                    })
                }
            }
        });
        cc._RF.pop()
    }, {}], MissileSprite: [function (t, e, i) {
        "use strict";
        cc._RF.push(e, "16c1bW7ve9LKpiWUXax165k", "MissileSprite"), cc.Class({
            extends: cc.Component,
            properties: {isMy: !1},
            init: function (t) {
                this.angle = (this.isMy ? .5 * Math.PI : 1.5 * Math.PI) - this.node.rotation / 180 * Math.PI, this.atk = t.atk, this.isMy && (this.atk += GameData.boostAtk), this.life = t.life, this.moveSpeed = 0, this.moveSpeed1 = this.isMy ? 4 * t.moveSpeed : t.moveSpeed, this.moveSpeed2 = .5 * this.moveSpeed1, this.rotationRate = .75 * Math.PI, this.moveTime = 4, this._mdis = 0, this.isMissile = !0, GameData.addBattleSprite(this), this.gw = [-3, -2], this.canRemove = !0
            },
            setUseFastFrame: function (t, e) {
                if (t) {
                    if (!this.cbnormalFrame) {
                        var i = this.node.getComponent(cc.Sprite);
                        this.cbnormalFrame = i.spriteFrame, i.spriteFrame = e
                    }
                } else this.cbnormalFrame && ((i = this.node.getComponent(cc.Sprite)).spriteFrame = this.cbnormalFrame, this.cbnormalFrame = void 0)
            },
            onDestroy: function () {
                this.canRemove = !1
            },
            removeSelf: function () {
                this.canRemove && (this.canRemove = !1, poolManager.putNode(this))
            },
            onLoad: function () {
                this.node.curControl = this
            },
            onDie: function (t) {
                GameData.removeBattleSprite(this), this.life = 0, t || playPlaneExplode(this), this.removeSelf()
            },
            onCollisionEnter: function (t, e) {
                if (!(this.life <= 0)) {
                    var i = t.node.curControl;
                    if (!(i.isLaster || i.life <= 0)) {
                        if (i.isBullet) i.life = 0, this.life -= i.atk; else if (i.isPlane) i.life -= this.atk, this.life = 0; else if (i.isMissile) {
                            var n = i.life;
                            i.life -= this.life, this.life -= n
                        }
                        i.life <= 0 && i.onDie(), this.life <= 0 && this.onDie()
                    }
                }
            },
            updateMove: function (t) {
                if (this.moveTime <= 0) this.onDie(); else {
                    this.moveTime -= t, this.gw[0] !== this.gw[1] ? this.moveSpeed += (this.moveSpeed1 - this.moveSpeed) * t : this.moveSpeed > this.moveSpeed2 && (this.moveSpeed -= (this.moveSpeed - this.moveSpeed2) * t);
                    var e = this.node.targetDirection;
                    if (e) {
                        var i = this.moveSpeed * t;
                        if (this._mdis += i, 100 < this._mdis && ((!this.targetObj || !this.targetObj.isValid || this.targetObj.life <= 0) && (this.targetObj = GameData.getOnePlane(this, 1800)), this.targetObj && 0 < this.targetObj.life)) {
                            var n = this.node.getPosition(), o = this.targetObj.node.getPosition(),
                                a = 0 < cc.pCross(e, cc.pSub(o, n)) ? 1 : -1;
                            this.gw[0] = this.gw[1], this.gw[1] = a;
                            var s = this.rotationRate * t * a;
                            this.angle += s, this.node.targetDirection = cc.pForAngle(this.angle), this.node.rotation -= 180 * s / Math.PI
                        }
                        this.node.x += this.node.targetDirection.x * i, this.node.y += this.node.targetDirection.y * i
                    } else cc.log("err missilesprite updatemove")
                }
            },
            updateSelf: function (t) {
                this.updateMove(t)
            }
        }), cc._RF.pop()
    }, {}], MusicManager: [function (t, e, i) {
        "use strict";
        cc._RF.push(e, "10dcdiK4XdKW77tVYfEwxqE", "MusicManager"), e.exports = function () {
            window.MusicManager = {
                init: function () {
                    if (!this.isInit) {
                        this.isInit = !0, this.key = "bg_music";
                        var t = cc.sys.localStorage.getItem(this.key);
                        t || (cc.sys.localStorage.setItem(this.key, "true"), t = "true"), this.isPlayBgMusic = "true" === t, this.click = function () {
                            this.isPlayBgMusic = !this.isPlayBgMusic;
                            var t = this.isPlayBgMusic ? "true" : "false";
                            cc.sys.localStorage.setItem(this.key, t)
                        }
                    }
                }, play: function (t, e, i) {
                    if (MusicManager.isPlayBgMusic) {
                        var n = cc.loader.getRes(t);
                        n ? cc.audioEngine.play(n, e, i) : console.log("err music file no exist:" + t)
                    }
                }
            }, MusicManager.init()
        }, cc._RF.pop()
    }, {}], Music: [function (t, e, i) {
        "use strict";
        cc._RF.push(e, "57660M2PhhElIFqzRq5su5F", "Music"), cc.Class({
            extends: cc.Component,
            properties: {bgMusic: {url: cc.AudioClip, default: null}},
            play: function (t) {
                MusicManager.isPlayBgMusic && cc.audioEngine.play(t, !1, .4)
            },
            onLoad: function () {
                this.playBgMusic(), this.node.Music = this
            },
            click: function () {
                MusicManager.click(), MusicManager.isPlayBgMusic ? this.playBgMusic() : this.pauseBgMusic()
            },
            playBgMusic: function () {
                MusicManager.isPlayBgMusic && void 0 === MusicManager.curBgMusicID && (MusicManager.curBgMusicID = cc.audioEngine.play(this.bgMusic, !0, .5))
            },
            pauseBgMusic: function () {
                -1 !== MusicManager.curBgMusicID && (cc.audioEngine.stop(MusicManager.curBgMusicID), MusicManager.curBgMusicID = void 0)
            }
        }), cc._RF.pop()
    }, {}], NHttp: [function (t, e, i) {
        "use strict";
        cc._RF.push(e, "d5689MKedxBCbUMku5cBRPY", "NHttp"), e.exports = function () {
            window.NHttp = {}, NHttp.addrList = {
                login: "/user/v1/login",
                pushUserInfo: "/user/v1/pushUserInfo",
                getRank: "/user/v1/getRank",
                getAppPageList: "/activity/v1/getAppPageList",
                getAppHotList: "/activity/v1/getAppHotList",
                getAppShareInfo: "/activity/v1/getAppShareInfo",
                getTaskStatus: "/activity/v1/getTaskStatus",
                getTaskAward: "/activity/v1/getTaskAward",
                ip: "https://520poker.com"
            }, NHttp.getTaskAward = function (t, e) {
                var i = this.addrList.ip + this.addrList.getTaskAward, n = {id: t};
                this.connet(i, n, e, "Bearer " + NHttp.token, "用户领取奖励上报")
            }, NHttp.getTaskStatus = function (t, e) {
                var i = this.addrList.ip + this.addrList.getTaskStatus, n = {ids: t};
                this.connet(i, n, e, "Bearer " + NHttp.token, "获取任务状态")
            }, NHttp.getAppShareInfo = function (t) {
                var e = this.addrList.ip + this.addrList.getAppShareInfo, i = {app: GameSet.appid};
                this.connet(e, i, t, void 0, "获取分享列表")
            }, NHttp.getAppHotList = function (t) {
                var e = this.addrList.ip + this.addrList.getAppHotList;
                this.connet(e, {}, t, void 0, "获取游戏推荐列表")
            }, NHttp.getAppPageList = function (t) {
                var e = this.addrList.ip + this.addrList.getAppPageList;
                this.connet(e, {}, t, void 0, "获取游戏页列表")
            }, NHttp.getRank = function (t, e) {
                var i = this.addrList.ip + this.addrList.getRank, n = {app: GameSet.appid, page: t};
                this.connet(i, n, e, "Bearer " + NHttp.token, "获取排行榜")
            }, NHttp.pushUserInfo = function (t, e, i, n) {
                var o = this.addrList.ip + this.addrList.pushUserInfo, a = {key: t, adj: e};
                a.delta = !!n, this.connet(o, a, i, "Bearer " + NHttp.token, "上传用户信息")
            }, NHttp.loginT = 0, NHttp.login = function (n) {
                if (GameSet.userInfo) {
                    var t = Date.now();
                    if (t - NHttp.loginT < 36e5) console.log("不用登录"); else {
                        NHttp.loginT = t;
                        var e = this.addrList.ip + this.addrList.login, i = GameSet.userInfo.code,
                            o = GameSet.userInfo.nickName, a = GameSet.userInfo.avatarUrl, s = GameSet.userInfo.gender,
                            r = {jscode: i, app: GameSet.appid, nick: o, avatar: a, gender: 1 === s};
                        if (GameSet.query) {
                            var c = GameSet.query.uuid;
                            c && (r.tnote = c);
                            var h = GameSet.query.taskid;
                            h && (r.tcode = Number(h))
                        }
                        this.connet(e, r, function (t, e) {
                            if (t) {
                                var i = poolManager.getNode("prefab/tishi");
                                return i.parent = cc.director.getScene(), void i.curControl.setString(t)
                            }
                            NHttp.uuid = e.uuid, NHttp.token = e.token, n(t, e)
                        }, void 0, "登录")
                    }
                } else console.log("不用登录 GameSet.userInfo 不存在 ")
            }, NHttp.connet = function (t, i, n, e, o) {
                var a = new XMLHttpRequest;
                a.timeout = 1e5, a.open("POST", t), a.setRequestHeader("Content-Type", "text/plain;");
                var s = JSON.stringify(i);
                console.log("http 请求 " + o + ":"), console.log("地址:" + t), console.log("发送数据:" + s), console.log(""), e && a.setRequestHeader("Authorization", e), a.send(s);
                a.onerror = function (t) {
                    console.log("http 收到" + o + "返回失败," + t), n(o + ",onerror:" + t, i)
                }, a.onreadystatechange = function () {
                    if (4 === a.readyState) {
                        console.log("xhr.status", a.status);
                        var t = a.response;
                        if (200 <= a.status && a.status < 300) {
                            console.log("http " + o + "成功:", t);
                            var e = JSON.parse(t);
                            n(void 0, e)
                        } else console.log("http " + o + "返回错误:", t), n(o + "失败,code:" + a.status, i)
                    }
                }
            }
        }, cc._RF.pop()
    }, {}], NpcPlane: [function (t, e, i) {
        "use strict";
        cc._RF.push(e, "ccf4c8AH85JxrtQ1glAMW9w", "NpcPlane"), cc.Class({
            extends: cc.Component,
            properties: {bulletPrefabPath: "prefab path"},
            onDie: function (t) {
                if (GameData.removeBattleSprite(this), this.life = 0, t) this.removeSelf(); else {
                    this.isAddScore && (this.isBoos ? GameData.score += 20 * GameData.enemyPlaneLv : GameData.score++, this.isAddScore = !1), playPlaneExplode(this);
                    var e = GameData.enemyPlaneLv + 3, i = GameData.planeLv + 3, n = Math.min(e - 2, i - 2);
                    console.log(e, i, n);
                    var o = (e - n) / (i - n);
                    o *= .18 + GameData.randPropRate;
                    for (var a = this.isBoos ? RandInt(5, 30) : RandInt(0, 2), s = this.isBoos ? RandInt(1, 3) : Math.random() < o ? 1 : 0, r = 0; r < a; ++r) {
                        var c = "prefab/buff10", h = poolManager.getNode(c);
                        (l = this.node.getPosition()).x += RandInt(-50, 50), l.y += RandInt(-50, 50), h.setPosition(l), h.parent = this.node.parent, h.curControl.init(), h.setLocalZOrder(2)
                    }
                    for (r = 0; r < s; ++r) {
                        c = GameData.bufPrefabPath[RandInt(0, 4)], h = poolManager.getNode(c);
                        (l = this.node.getPosition()).x += RandInt(-50, 50), l.y += RandInt(-50, 50), h.setPosition(l), h.parent = this.node.parent, h.curControl.init(), h.setLocalZOrder(2)
                    }
                    if (WxSdk.isPlayVideo && Math.random() < .025) {
                        h = poolManager.getNode("prefab/buff11");
                        var l = this.node.getPosition();
                        h.setPosition(l), h.parent = this.node.parent, h.curControl.init(), h.setLocalZOrder(2)
                    }
                    if (Math.random() < .05) {
                        c = GameData.bufPrefabPath[RandInt(4, 7)], h = poolManager.getNode(c);
                        (l = this.node.getPosition()).x += RandInt(-100, 100), l.y += RandInt(-100, 100), h.setPosition(l), h.parent = this.node.parent, h.curControl.init(), h.setLocalZOrder(2)
                    }
                    this.removeSelf()
                }
            },
            onLoad: function () {
                this.node.curControl = this
            },
            onCollisionEnter: function (t, e) {
                if (!(this.isMy || this.life <= 0)) {
                    var i = t.node.curControl;
                    if (!(i.isLaster || i.life <= 0)) {
                        if (i.isPlane) {
                            var n = this.life;
                            this.life -= i.life, i.life -= n
                        } else i.isBullet && (this.life -= i.atk, i.life = 0);
                        i.life <= 0 && i.onDie(), this.life <= 0 && this.onDie()
                    }
                }
            },
            updateMove: function (t) {
                this.pathCur || cc.log("err  updateMove  !this.pathCur"), this.pathCur.updateFunc(t)
            },
            parsePath: function () {
                var t = this.pathCur = this.movePath1[this.pathDex];
                this.atkRate = t.r;
                var o = this;
                switch (t.e) {
                    case cbPlanEvent.stop:
                        (t.t = 0) != t.y && (t.x *= Math.random()), t.updateFunc = function (t) {
                            0 !== this.x && (this.t += t, this.t >= this.x && (++o.pathDex, o.parsePath()))
                        };
                        break;
                    case cbPlanEvent.moveby:
                        t.moveDirection = cc.pNormalize(cc.p(t.x, t.y)), t.cxy = Math.abs(t.x) + Math.abs(t.y), t.updateFunc = function (t) {
                            var e = o.moveSpeed * t, i = this.moveDirection.x * e, n = this.moveDirection.y * e;
                            this.cxy -= Math.abs(i) + Math.abs(n), this.cxy <= 0 ? (o.pathDex++, o.parsePath()) : (o.node.x += i, o.node.y += n)
                        };
                        break;
                    case cbPlanEvent.repeat:
                        -1 === t.x ? (this.pathDex = t.y, this.movePath1 = cbGetPlanePath(this.pathId, !0)) : (--t.x, 0 === t.x ? this.pathDex++ : (this.pathDex = t.y, this.movePath1 = cbGetPlanePath(this.pathId, !0))), this.parsePath();
                        break;
                    case cbPlanEvent.remove:
                        this.isAddScore = !1, this.onDie();
                        break;
                    case cbPlanEvent.moveto:
                        t.updateFunc = function (t) {
                        }
                }
            },
            setMovePath: function (t) {
                this.movePath1 = cbGetPlanePath(t, !0), this.movePath2 = cbGetPlanePath(t, !1), this.pathId = t, this.pathDex = 0, this.parsePath()
            },
            preInit: function () {
            },
            init: function (t, e, i, n, o) {
                this.preInit(), this.isMy = !1, this.isPlane = !0, this.isAddScore = !this.isMy, this.baseAngel = this.isMy ? 0 : 180, this.xfh = this.isMy ? 1 : -1, this.yfh = this.isMy ? 1 : -1, this.atkRate = 0, this.moveSpeed = .6 * i, this.setMovePath(t), this.planeCfg = n || cbConfigNpcPlane[0], this.planeLv = e, this.maxPlanLv = this.planeCfg.weaponLv.length - 1, o ? (GameData.isBoos = !0, this.isBoos = !0, this.life = 800 + 800 * e) : (this.life = 15 + 5 * e, Math.random() < .1 && (this.life *= 3)), this.life2 = this.life, this.updatePlaneInfo(), GameData.addBattleSprite(this), this.canRemove = !0
            },
            onDestroy: function () {
                this.canRemove = !1
            },
            removeSelf: function () {
                this.canRemove && (this.canRemove = !1, poolManager.putNode(this), this.isBoos && (GameData.isBoos = !1))
            },
            changLevel: function (t) {
                this.planeLv += t, this.planeLv = cc.clampf(this.planeLv, 0, this.maxPlanLv), this.updatePlaneInfo()
            },
            updatePlaneInfo: function () {
                this.weaponLv = this.planeCfg.weaponLv[this.planeLv], this.weapons1 = [], this.weapons2 = [];
                for (var t = 0; t < this.weaponLv.length; ++t) {
                    this.weapons1.push({interval: 0, refire: 0, coolTime: 0});
                    var e = this.weaponLv[t];
                    this.weapons2[t] = 0 < e ? cbWeaponsConfigMap[e] : null
                }
            },
            shootCheck: function (t) {
                for (var e = this.weapons2, i = this.weapons1, n = Math.random() < this.atkRate, o = !1, a = 0; a < e.length; ++a) {
                    var s = e[a];
                    if (null !== s) {
                        var r = i[a];
                        0 < s.coolTime ? (r.coolTime += t, r.coolTime >= s.coolTime && (r.coolTime = 0, r.refire = 0, r.interval = s.interval)) : (r.coolTime = 0, r.refire = 0), r.interval += t, r.interval < s.interval || r.refire < s.refire && (++r.refire, r.interval = r.interval - s.interval, n && (this.shoot(a), o = !0))
                    }
                }
                return o
            },
            shoot: function (t) {
                var e = cbPForAngle(this.planeCfg.angle[t] + this.baseAngel + this.node.rotation),
                    i = this.planeCfg.px[t] * this.xfh, n = this.planeCfg.py[t] * this.yfh,
                    o = 90 - this.planeCfg.angle[t], a = poolManager.getNode(this.bulletPrefabPath),
                    s = this.node.getPosition();
                s.x += i, s.y += n, a.setPosition(s), a.targetDirection = e, a.parent = this.node.parent;
                var r = this.isBoos ? 500 : this.moveSpeed + 100;
                a.curControl.init(this.weapons2[t], r), a.rotation = o, a.setLocalZOrder(3)
            },
            updateSelf: function (t) {
                this.shootCheck(t), this.updateMove(t)
            }
        }), cc._RF.pop()
    }, {}], PlayerPlane: [function (t, e, i) {
        "use strict";
        cc._RF.push(e, "488a8zV8zRNS58GwS9ztbp7", "PlayerPlane");
        cc.Class({
            extends: cc.Component,
            properties: {
                bulletPrefabPath: "",
                planeCfgId: 0,
                propBulletFrame: cc.SpriteFrame,
                lasterPlane: !1,
                life: {
                    get: function () {
                        return this._life
                    }, set: function (t) {
                        void 0 === this._life ? this._life = t : GameData.prop.shield.inUse || (this._life = t)
                    }, type: cc.Integer
                }
            },
            onDie: function (t) {
                return t ? (GameData.removeBattleSprite(this), this.life = 0, void this.removeSelf()) : 0 < --GameData.nLife ? (this.life = 1, this.node.dispatchEvent(new cc.Event.EventCustom("behit", !0)), void this.usePropShield(2.1, 2)) : (GameData.removeBattleSprite(this), this.life = 0, playPlaneExplode(this), this.node.dispatchEvent(new cc.Event.EventCustom("gameOver", !0)), void(this.node.parent = null))
            },
            preInit: function () {
            },
            init: function () {
                this.preInit(), this.atk = 10, this.life = 1, this.isMy = !0, this.isPlane = !0, this.node.curControl = this, GameData.addBattleSprite(this), this.baseAngel = this.isMy ? 0 : 180, this.xfh = this.isMy ? 1 : -1, this.yfh = this.isMy ? 1 : -1, this.setPlaneConfig(this.planeCfgId), this.canRemove = !0, this.lasterPlane && this.updateLasterLv(GameData.planeLv)
            },
            updateLasterLv: function (t) {
                var e = Math.floor(t / 5);
                if (this.laster && (this.laster.dex === e ? e = -1 : (this.laster.curControl.onDie(!0), this.laster = null)), -1 !== e) {
                    e = Math.min(4, e), this.laster = poolManager.getNode("prefab/laser103" + e), this.laster.parent = this.node.parent, this.laster.dex = e, this.laster.x = this.node.x, this.laster.y = this.node.y;
                    for (var i = 0; i < this.weapons2.length; ++i) if (this.weapons2[i]) {
                        this.laster.curControl.init(this.weapons2[i]);
                        break
                    }
                    this.laster.curControl.setUseFastFrame(GameData.prop.fast.inUse, this.propBulletFrame)
                }
                this.laster.curControl.updateLv(t)
            },
            onDestroy: function () {
                this.canRemove = !1
            },
            removeSelf: function () {
                this.canRemove && (this.laster && (this.laster.curControl.onDie(!0), this.laster = null), this.node.destroy())
            },
            usePropShield: function (t, e) {
                var i = cc.instantiate(cc.loader.getRes("prefab/propshield"));
                i.setPosition(0, 0), i.parent = this.node, (this.propShield = i).curControl.setLiveTime(t, e)
            },
            usePropBomb: function () {
                var t = cc.instantiate(cc.loader.getRes("prefab/propbomb"));
                t.setPosition(0, 0), t.parent = this.node.parent
            },
            usePropFast: function (t, e) {
                var i = cc.instantiate(cc.loader.getRes("prefab/propFast"));
                i.setPosition(0, 0), i.parent = this.node, (this.propFast = i).curControl.setLiveTime(t, e)
            },
            toOtherNode: function (t) {
                this.propShield && this.propShield.isValid && (this.propShield.parent = null, this.propShield.parent = t), this.propFast && this.propFast.isValid && (this.propFast.parent = null, this.propFast.parent = t)
            },
            onLoad: function () {
                this.planeLv = 0, this.init()
            },
            setPlaneConfig: function (t) {
                this.planeCfg = cbConfigMyPlane[this.planeCfgId], this.maxPlanLv = this.planeCfg.weaponLv.length - 1, this.updatePlaneInfo()
            },
            onBuf: function (t) {
                switch (t) {
                    case 20:
                        this.usePropFast(3, 2);
                        break;
                    case 21:
                        this.usePropBomb();
                        break;
                    case 22:
                        this.usePropShield(3, 2);
                        break;
                    case 10:
                        GameData.prop.gold.change(1), MusicManager.play("sound/getcoin");
                        break;
                    case 11:
                        this.node.dispatchEvent(new cc.Event.EventCustom("libao", !0));
                        break;
                    case 3:
                        if (GameData.planeLaser.count <= 0) return;
                        this.planeCfgId === t ? this.setPlaneLv(this.planeLv + 1) : this.node.parent.parent.curControl.changePlane(t);
                        break;
                    case 0:
                    case 1:
                    case 2:
                        this.planeCfgId === t ? this.setPlaneLv(this.planeLv + 1) : this.node.parent.parent.curControl.changePlane(t)
                }
            },
            setPlaneLv: function (t) {
                this.planeLv = cc.clampf(t, 0, this.maxPlanLv), GameData.planeLv = this.planeLv, this.lasterPlane ? this.updateLasterLv(t) : this.updatePlaneInfo()
            },
            updatePlaneInfo: function () {
                this.weaponLv = this.planeCfg.weaponLv[this.planeLv], this.weaponLvOffset = this.planeCfg.weaponLvOffset, this.weapons1 = [], this.weapons2 = [];
                for (var t = 0; t < this.weaponLv.length; ++t) {
                    this.weapons1.push({interval: 0, refire: 0, coolTime: 0});
                    var e = this.weaponLv[t];
                    this.weapons2[t] = 0 < e ? cbWeaponsConfigMap[e + this.weaponLvOffset] : null
                }
            },
            shootCheck: function (t) {
                if (this.lasterPlane) return this.laster.x = this.node.x, this.laster.y = this.node.y, void this.laster.curControl.updateSelf(t);
                for (var e = this.weapons2, i = this.weapons1, n = 0; n < e.length; ++n) {
                    var o = e[n];
                    if (null !== o) {
                        var a = i[n];
                        0 < o.coolTime ? (a.coolTime += t, a.coolTime >= o.coolTime && (a.coolTime = 0, a.refire = 0, a.interval = o.interval)) : (a.coolTime = 0, a.refire = 0), a.interval += t, a.interval < o.interval || a.refire < o.refire && (++a.refire, a.interval = a.interval - o.interval, this.shoot(n))
                    }
                }
            },
            shoot: function (t) {
                var e = cbPForAngle(this.planeCfg.angle[t] + this.baseAngel + this.node.rotation),
                    i = this.planeCfg.px[t] * this.xfh, n = this.planeCfg.py[t] * this.yfh,
                    o = 90 - this.planeCfg.angle[t], a = poolManager.getNode(this.bulletPrefabPath),
                    s = this.node.getPosition();
                s.x += i, s.y += n, a.setPosition(s), a.targetDirection = e, a.rotation = o, a.parent = this.node.parent, a.curControl.init(this.weapons2[t]), a.curControl.setUseFastFrame(GameData.prop.fast.inUse, this.propBulletFrame), a.setLocalZOrder(3)
            },
            updateSelf: function (t) {
                GameData.prop.fast.inUse && (t *= 3), this.shootCheck(t)
            }
        }), cc._RF.pop()
    }, {}], PropBomb: [function (t, e, i) {
        "use strict";
        cc._RF.push(e, "410c2W1mDlFcbANvvGh19+N", "PropBomb"), cc.Class({
            extends: cc.Component, onLoad: function () {
                GameData.prop.shield.inUse++;
                var t = this.node.getComponent(cc.Animation).play();
                this.scheduleOnce(function () {
                    GameData.onBigBomb(), this.removeSelf()
                }, t.duration), this.canRemove = !0, this.node.curControl = this
            }, setLiveTime: function (t, e) {
            }, removeSelf: function () {
                this.canRemove && this.node.destroy()
            }, onDestroy: function () {
                this.canRemove = !1, GameData.prop.shield.inUse--
            }
        }), cc._RF.pop()
    }, {}], PropFast: [function (t, e, i) {
        "use strict";
        cc._RF.push(e, "08afdH93F1D8YMnudBL3Yik", "PropFast"), cc.Class({
            extends: cc.Component, onLoad: function () {
                GameData.addBattleSprite(this), this.liveTime = 5, this.blinkTime = 2, GameData.prop.fast.inUse++, this.canRemove = !0, this.node.curControl = this
            }, setLiveTime: function (t, e) {
                this.liveTime = t, 0 < e && (this.blinkTime = e)
            }, removeSelf: function () {
                this.canRemove && (this.canRemove = !1, this.node.destroy())
            }, onDie: function () {
                this.removeSelf()
            }, onDestroy: function () {
                GameData.removeBattleSprite(this), this.canRemove = !1, GameData.prop.fast.inUse--
            }, updateSelf: function (t) {
                this.liveTime -= t, this.liveTime < 0 ? this.onDie() : this.liveTime <= this.blinkTime && (this.blinkTime = -999, this.node.runAction(cc.blink(10, 20)))
            }
        }), cc._RF.pop()
    }, {}], PropShield: [function (t, e, i) {
        "use strict";
        cc._RF.push(e, "38c5fe1p5FGoIK7Tno8cSfu", "PropShield"), cc.Class({
            extends: cc.Component, onLoad: function () {
                GameData.addBattleSprite(this), this.liveTime = 5, this.blinkTime = 2, GameData.prop.shield.inUse++, this.canRemove = !0, this.node.curControl = this
            }, setLiveTime: function (t, e) {
                this.liveTime = t, 0 < e && (this.blinkTime = e)
            }, removeSelf: function () {
                this.canRemove && (this.canRemove = !1, this.node.destroy())
            }, onDie: function () {
                this.removeSelf()
            }, onDestroy: function () {
                GameData.removeBattleSprite(this), this.canRemove = !1, GameData.prop.shield.inUse--
            }, updateSelf: function (t) {
                this.liveTime -= t, this.liveTime < 0 ? this.onDie() : this.liveTime <= this.blinkTime && (this.blinkTime = -999, this.node.runAction(cc.blink(10, 20)))
            }
        }), cc._RF.pop()
    }, {}], Prop: [function (t, e, i) {
        "use strict";
        cc._RF.push(e, "ba6c9EbcGxFwJh0qm4hyDTz", "Prop"), e.exports = function () {
            window.Prop = function (t, e, i) {
                this.key = t, this.name = e;
                var n = cc.sys.localStorage.getItem(t);
                this.count = n ? Number(n) : i, this.inUse = 0
            }, Prop.prototype.change = function (t) {
                if ("number" != typeof t) return cc.log("err   Prop.prototype.change num 不是一个数:", t), !1;
                if (this.inUse) return cc.log("err  使用中不能修改:" + this.name), !1;
                var e = this.count + t;
                return 0 < e ? (this.count = e, cc.sys.localStorage.setItem(this.key, this.count.toString()), !0) : (cc.log("change " + this.name + "fail, 数量不够，this.count:" + this.count + " need:" + t), !1)
            }, Prop.prototype.set = function (t) {
                return "number" != typeof t ? (cc.log("err   Prop.prototype.change:" + t), !1) : 0 <= t ? (this.count = t, cc.sys.localStorage.setItem(this.key, this.count.toString()), !0) : (cc.log("set " + this.name + "fail,  num 不能小于0：" + t), !1)
            }
        }, cc._RF.pop()
    }, {}], Rank: [function (t, e, i) {
        "use strict";
        cc._RF.push(e, "1281b1aRvdI45fhwPRqX6Um", "Rank"), cc.Class({
            extends: cc.Component,
            properties: {display: cc.Sprite},
            onLoad: function () {
                this.tex = new cc.Texture2D
            },
            _updaetSubDomainCanvas: function () {
                if (this.tex) {
                    var t = wx.getOpenDataContext().canvas;
                    this.tex.initWithElement(t), this.tex.handleLoadedTexture(), this.display.spriteFrame = new cc.SpriteFrame(this.tex)
                }
            },
            update: function (t) {
                cc.sys.WECHAT_GAME === cc.sys.platform && this._updaetSubDomainCanvas()
            }
        }), cc._RF.pop()
    }, {}], SubdomainSender: [function (t, e, i) {
        "use strict";
        cc._RF.push(e, "9500b8lbMRI4pDyivt/9lmz", "SubdomainSender"), e.exports = function () {
            window.subType = {
                first3: 0,
                friend: 1,
                group: 2,
                world: 3,
                exit: 100
            }, window.SubdomainSender = {
                rankWorldData: null, onLoginSuc: function () {
                    if (!this.rankWorldData) {
                        var i = this;
                        NHttp.getRank(0, function (t, e) {
                            t || (i.rankWorldData = e)
                        })
                    }
                }, onSubdomainLoad: function (a) {
                    var s = [], r = null, t = function (e) {
                        a[e] || (a[e] = function (t) {
                            console.log("请定义" + e + "函数")
                        })
                    };
                    for (var e in["showRank", "showEnd", "removeRank", "onMainGameData", "hideAll"]) t(e);
                    var n = function (t, i) {
                        i = i || 0;
                        var e = t.data;
                        if (0 === e.length) return null;
                        for (var n = [], o = 0; o < e.length; ++o) void 0 !== e[o].KVDataList[i] && n.push(e[o]);
                        return 0 === n.length ? null : (n.sort(function (t, e) {
                            return Number(e.KVDataList[i].value) - Number(t.KVDataList[i].value)
                        }), n.splice(50), n)
                    }, c = function (t) {
                        if (t) {
                            var e = t.type, i = t.msg;
                            switch (e) {
                                case subType.first3:
                                    wx.getFriendCloudStorage({
                                        keyList: ["score1"], success: function (t) {
                                            a.showEnd(n(t, 0))
                                        }, fail: function (t) {
                                            console.log("拉取朋友数据失败 ", t)
                                        }
                                    });
                                    break;
                                case subType.friend:
                                    wx.getFriendCloudStorage({
                                        keyList: ["score1"], success: function (t) {
                                            a.showRank(n(t, 0))
                                        }, fail: function (t) {
                                            console.log("拉取朋友数据失败 ", t)
                                        }
                                    });
                                    break;
                                case subType.group:
                                    wx.getGroupCloudStorage({
                                        keyList: ["score1"],
                                        shareTicket: i,
                                        success: function (t) {
                                            a.showRank(n(t, 0))
                                        },
                                        fail: function (t) {
                                            console.log("拉取群数据失败 ", t)
                                        }
                                    });
                                    break;
                                case subType.world:
                                    a.showRank(i.ary, i.my)
                            }
                        } else a.removeRank()
                    };
                    wx.onMessage(function (t) {
                        var e = t.message;
                        console.log("子域收到消息:", e);
                        var i, n = JSON.parse(e), o = n.type;
                        n.msg;
                        switch (o) {
                            case subType.first3:
                            case subType.friend:
                            case subType.group:
                            case subType.world:
                                i = n, r && r.page !== i.page && (a.hideAll(), s.push(r)), c(r = i);
                                break;
                            case subType.exit:
                                r = s.pop(), a.hideAll(), c(r);
                                break;
                            default:
                                return void a.onMainGameData(n)
                        }
                    })
                }, openFirst3Rank: function () {
                    WxSdk.semdMsgToSubdomain(subType.first3, void 0, 0)
                }, openFriendRank: function () {
                    WxSdk.semdMsgToSubdomain(subType.friend, void 0, 1)
                }, openGroupRank: function (n) {
                    WxSdk.shareToWxGroup(function (t, e) {
                        if (t) {
                            var i = poolManager.getNode("prefab/tishi");
                            return i.parent = cc.director.getScene(), void i.curControl.setString("查看群排行榜需要先分享到群")
                        }
                        WxSdk.semdMsgToSubdomain(subType.group, e, 1), n()
                    })
                }, openWorldRank: function () {
                    if (this.rankWorldData) {
                        for (var t = [], e = 0; e < this.rankWorldData.ranks.length; ++e) {
                            var i = this.rankWorldData.ranks[e];
                            t.push({nickname: i.nick, avatarUrl: i.avatar, KVDataList: [{value: i.score}]})
                        }
                        var n = {
                            nick: GameSet.userInfo.nickName,
                            avatar: GameSet.userInfo.avatarUrl,
                            score: GameData.historyScore,
                            rank: this.rankWorldData.my_rank
                        };
                        WxSdk.semdMsgToSubdomain(subType.world, {ary: t, my: n}, 1)
                    }
                }, closeRank: function () {
                    WxSdk.semdMsgToSubdomain(subType.exit)
                }
            }
        }, cc._RF.pop()
    }, {}], Util: [function (t, e, i) {
        "use strict";
        cc._RF.push(e, "f1ccbmmQEVB57YXfz07lXsE", "Util"), e.exports = function () {
            window.Util = {}, Util.constants = {UUID: "", TOKEN: ""}, Util.setImage = function (e, t) {
                if (cc.sys.platform == cc.sys.WECHAT_GAME) try {
                    var i = wx.createImage();
                    i.onload = function () {
                        try {
                            var t = new cc.Texture2D;
                            t.initWithElement(i), t.handleLoadedTexture(), e.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(t)
                        } catch (t) {
                            console.log("Util.setImage --\x3e set image err [ ", t, " ]")
                        }
                    }, i.src = t
                } catch (t) {
                    console.log("Util.setImage --\x3e set image err [ ", t, " ]")
                } else console.log("Util.setImage --\x3e set image err [ 当前不是微信环境，无法调用微信api ]")
            }, Util.showImage = function (t, e, i) {
                cc.sys.platform == cc.sys.WECHAT_GAME ? wx.previewImage({
                    current: t, urls: e, success: function () {
                        console.log("Util.showImage --\x3e show image success"), void 0 !== i && i && i()
                    }
                }) : console.log("Util.showImage --\x3e show image err [ 当前不是微信环境，无法调用微信api ]")
            }, Util.postUserRankInfoToCloudStorage = function (t, e) {
                if (cc.sys.platform == cc.sys.WECHAT_GAME) {
                    var i = {
                        KVDataList: [{key: t.toString(), value: e.toString()}], success: function (t) {
                            console.log("Util.postUserRankInfoToCloudStorage --\x3e poset rank info success")
                        }, fail: function (t) {
                            console.log("Util.postUserRankInfoToCloudStorage --\x3e poset rank info err [ ", t, " ]")
                        }
                    };
                    wx.setUserCloudStorage(i)
                } else console.log("Util.showImage --\x3e show image err [ 当前不是微信环境，无法调用微信api ]")
            }, Util.sendMsgToSubdomain = function (t) {
                cc.sys.platform == cc.sys.WECHAT_GAME ? wx.getOpenDataContext().postMessage({message: t}) : console.log("Util.showImage --\x3e show image err [ 当前不是微信环境，无法调用微信api ]")
            }, Util.setShareMode = function () {
                cc.sys.platform == cc.sys.WECHAT_GAME ? wx.showShareMenu({withShareTicket: !0}) : console.log("Util.showImage --\x3e show image err [ 当前不是微信环境，无法调用微信api ]")
            }, Util.shareToWx = function (t, e, i, n) {
                cc.sys.platform == cc.sys.WECHAT_GAME ? wx.shareAppMessage({
                    title: t,
                    imageUrl: e,
                    query: "taskid=" + i + "&uuid=" + NHttp.uuid,
                    success: function (t) {
                        "shareAppMessage:ok" == t.errMsg && (console.log("Util.shareToWx---\x3e share success"), n && n(!0, t))
                    },
                    fail: function (t) {
                        n && n(!1, t), "shareAppMessage:fail cancel" == t.errMsg ? console.log("Util.shareToWx---\x3e share cancel") : "shareAppMessage:fail" == t.errMsg && console.log("Util.shareToWx---\x3e share fail")
                    }
                }) : console.log("Util.showImage --\x3e show image err [ 当前不是微信环境，无法调用微信api ]")
            }, Util.dialog = function (t, e, i) {
                cc.sys.platform == cc.sys.WECHAT_GAME ? wx.showModal({
                    title: t,
                    content: e,
                    showCancle: !1,
                    success: function (t) {
                        void 0 !== i && i && (t.confirm ? (console.log("Util.dialog---\x3e user clicked ok"), i(!0)) : (i(!1), console.log("Util.dialog---\x3e user clicked cancel")))
                    }
                }) : console.log("Util.showImage --\x3e show image err [ 当前不是微信环境，无法调用微信api ]")
            }, Util.login = function (a, s, r) {
                if (cc.sys.platform == cc.sys.WECHAT_GAME) {
                    t("Http");
                    var c = this;
                    wx.login({
                        success: function (t) {
                            var o = t.code;
                            wx.getUserInfo({
                                success: function (t) {
                                    t.userInfo;
                                    var e = t.userInfo.nickName, i = t.userInfo.avatarUrl, n = t.userInfo.gender;
                                    Http.login(a, o, e, i, n, s, function (t, e) {
                                        if (t) return c.toast("服务器登录失败！"), void r(!1, e);
                                        r(!0, e)
                                    })
                                }
                            })
                        }
                    })
                } else console.log("Util.showImage --\x3e show image err [ 当前不是微信环境，无法调用微信api ]")
            }, Util.saveDataToWx = function (t, e) {
                cc.sys.platform == cc.sys.WECHAT_GAME ? wx.setStorageSync(t, e) : console.log("Util.showImage --\x3e show image err [ 当前不是微信环境，无法调用微信api ]")
            }, Util.getDataFromWx = function (t, e) {
                if (cc.sys.platform == cc.sys.WECHAT_GAME) {
                    var i = wx.getStorageSync(t);
                    return void 0 === i || null == i || "" === i ? e : i
                }
                console.log("Util.showImage --\x3e show image err [ 当前不是微信环境，无法调用微信api ]")
            }
        }, cc._RF.pop()
    }, {Http: "Http"}], WxSdk: [function (t, e, i) {
        "use strict";
        cc._RF.push(e, "bc79fMKroNJ1Yzm9NgSAoEw", "WxSdk"), e.exports = function () {
            window.WxSdk = {}, window.isWxPlatform = cc.sys.WECHAT_GAME === cc.sys.platform;
            try {
                wx.a
            } catch (t) {
                isWxPlatform = !1
            }
            WxSdk.loginWx = function (i) {
                if (isWxPlatform) {
                    var t = wx.getLaunchOptionsSync();
                    GameSet.query = t.query, GameSet.shareTicket = t.shareTicket, console.log("游戏启动信息：", t);
                    wx.login({
                        success: function (e) {
                            wx.getUserInfo({
                                success: function (t) {
                                    GameSet.userInfo = t.userInfo, GameSet.userInfo.code = e.code, console.log("微信登录成功:", GameSet.userInfo), i && i(!0)
                                }
                            })
                        }
                    })
                }
            }, WxSdk.previewImage = function (t) {
                if (isWxPlatform && wx.previewImage) {
                    t = t || "http://cdn.batwan.cn/res/pickbox.jpg";
                    wx.previewImage({current: t, urls: [t]})
                }
            }, WxSdk.previewImageHz = function (t, e) {
                isWxPlatform && wx.previewImage && wx.previewImage({current: e[t], urls: e})
            }, WxSdk.isPlayVideo = !0, WxSdk.playVideoShop = function (t) {
                var e = this;
                if (isWxPlatform) {
                    if (wx.createRewardedVideoAd) {
                        this._VideoShop || (this._VideoShop = wx.createRewardedVideoAd({adUnitId: "adunit-1827bc8c655b2e6c"}), this._VideoShop.onLoad(function () {
                            console.log("激励视频 广告加载成功"), WxSdk.isPlayVideo = !0
                        }), this._VideoShop.onClose(function (t) {
                            console.log("关闭视频广告 场景恢复"), WxSdk.isPlayVideo = !1, cc.director.resume(), WxSdk.setBannerMain(!0, !0), t && t.isEnded || void 0 === t ? (console.log(" 正常播放结束，可以下发游戏奖励"), e._VideoShopCloseCall()) : console.log("播放中途退出，不下发游戏奖励")
                        }), this._VideoShop.onError(function (t) {
                            console.log(t.errMsg), WxSdk.isPlayVideo = !1, cc.director.resume(), console.log("视频广告错误 场景恢复"), WxSdk.setBannerMain(!0, !0), setTimeout(function () {
                                WxSdk._VideoShop.load()
                            }, 3e4)
                        }), this._VideoShop.load()), console.log("场景暂停"), cc.director.pause(), WxSdk.setBannerMain(!1, !0), this._VideoShopCloseCall = t;
                        var i = this._VideoShop;
                        i.load().then(function () {
                            return i.show()
                        }).then(function () {
                            return console.log("激励视频 广告显示")
                        })
                    }
                } else t()
            }, WxSdk.initBanner = function () {
                if (!this.isInitBanner && (this.isInitBanner = !0, isWxPlatform && wx.createBannerAd)) {
                    var t = 30, i = !1, e = this;
                    setInterval(function () {
                        i && 30 < ++t && (t = 0, e.changeBanner())
                    }, 1e3);
                    var n = 300, o = null, a = wx.getSystemInfoSync(), s = 2;
                    "iPhone X" === a.model && (s += 20), this.showBanner = function (t, e) {
                        i = t, o && (i ? (300 !== n && (console.log("banner width:", 300), n = 300, o && o.style && (o.style.width = 300)), o.show()) : o.hide())
                    }, this.changeBanner = function () {
                        o && o.destroy(), (o = wx.createBannerAd({
                            adUnitId: "adunit-ac9ad849cf8fb3db",
                            style: {left: 0, top: 0, width: n}
                        })).onResize(function (t) {
                            if (o && o.style) {
                                o.style.left = .5 * (a.windowWidth - t.width);
                                var e = a.windowHeight - t.height - s;
                                o.style.top = e, GameSet.down = -(e - .5 * a.windowHeight) * a.pixelRatio * gameSize.scale + 30, console.log(o.style.width, e, .5 * a.windowHeight, gameSize.scale, GameSet.down)
                            }
                        }), o.show().then(function () {
                            return console.log("banner 广告显示小")
                        })
                    }
                }
            }, WxSdk.initBanner(), WxSdk.getPixelRatio = function () {
                return isWxPlatform && wx.getSystemInfoSync ? wx.getSystemInfoSync().pixelRatio : 1
            }, WxSdk.setBannerBattle = function (t, e) {
                isWxPlatform && wx.createBannerAd && this.showBanner(t, 300)
            }, WxSdk.setBannerMain = function (t, e) {
                isWxPlatform && wx.createBannerAd && this.showBanner(t, 350)
            }, WxSdk.setGameClubButton = function (t) {
                if (isWxPlatform && wx.createGameClubButton) {
                    var e = (.5 * gameSize.rel.height - 507) / gameSize.scale / WxSdk.getPixelRatio() - 20;
                    this.mGameClubButton || (this.mGameClubButton = wx.createGameClubButton({
                        icon: "white",
                        style: {left: 80, top: e, width: 40, height: 40}
                    })), t ? this.mGameClubButton.show() : this.mGameClubButton.hide()
                }
            }, WxSdk.postUserRankInfoToCloudStorage = function (t) {
                if (isWxPlatform) {
                    if (wx.setUserCloudStorage) {
                        var e = {
                            KVDataList: t, success: function (t) {
                                console.log(t)
                            }, fail: function (t) {
                                console.log(t)
                            }
                        };
                        wx.setUserCloudStorage(e)
                    }
                } else console.log(t)
            };
            var o = [];
            WxSdk.updateShareInfo = function () {
                0 < o.length || NHttp.getAppShareInfo(function (t, e) {
                    if (!t && e instanceof Array != !1) {
                        Common.data.shareList = e;
                        for (var i = [], n = o.length = 0; n < e.length; ++n) i.push(e[n].img), o.push({
                            url: e[n].img,
                            str: e[n].title
                        });
                        cc.loader.load(i, function (t, e) {
                            console.log("load suc shareinfo---------------")
                        })
                    }
                })
            }, WxSdk.getShareInfo = function () {
                var t = RandInt(0, o.length);
                return o[t]
            }, WxSdk.showShareMenu = function (i) {
                isWxPlatform && wx.showShareMenu && (wx.showShareMenu({withShareTicket: !0}), wx.onShareAppMessage(function (t) {
                    var e = WxSdk.getShareInfo();
                    return {
                        title: e.str, imageUrl: e.url, success: function (t) {
                            console.log(t), i && i()
                        }, fail: function (t) {
                            console.log(t)
                        }
                    }
                }))
            }, WxSdk.semdMsgToSubdomain = function (t, e, i) {
                if (isWxPlatform && wx.getOpenDataContext) {
                    var n = wx.getOpenDataContext();
                    if (console.log(t), n) {
                        var o = {type: t, msg: e, page: i};
                        console.log(o), n.postMessage({message: JSON.stringify(o)})
                    }
                }
            }, WxSdk.shareToWxGroup = function (i) {
                this.shareToWx(function (t) {
                    if (t) {
                        var e = t.shareTickets;
                        e && e[0] ? i(!1, e[0]) : i(!0)
                    }
                })
            }, WxSdk.vibrate = function (t, e) {
                if (isWxPlatform && wx.vibrateShort) {
                    var i = {
                        complete: function () {
                            e && e()
                        }
                    };
                    t ? wx.vibrateShort(i) : wx.vibrateLong(i)
                }
            }, WxSdk.shareToWx = function (e, t) {
                if (isWxPlatform) {
                    if (wx.shareAppMessage) {
                        t = t || "uuid=" + NHttp.uuid + "&taskid=0";
                        var i = WxSdk.getShareInfo();
                        wx.shareAppMessage({
                            title: i.str, query: t, imageUrl: i.url, success: function (t) {
                                console.log(t), e && e(t)
                            }, fail: function (t) {
                                console.log(t)
                            }
                        })
                    }
                } else e({})
            }, isWxPlatform && (wx.setKeepScreenOn && wx.setKeepScreenOn({
                keepScreenOn: !0, success: function (t) {
                    console.log("setKeepScreenOn suc")
                }, fail: function (t) {
                    console.log("setKeepScreenOn fail:" + t)
                }
            }), wx.onShow(function (t) {
                console.log("++++++++++++++++++++++++++++++++++++游戏被显示+++++++++++++++++++++++++++++++++++++++"), console.log(t), GameSet.query = t.query, GameSet.shareTicket = t.shareTicket, WxSdk.loginWx(function () {
                    NHttp.login(function (t) {
                    })
                })
            }))
        }, cc._RF.pop()
    }, {}], aniExplode: [function (t, e, i) {
        "use strict";
        cc._RF.push(e, "8eee3lvaTVP/aBjvmxscDxV", "aniExplode"), cc.Class({
            extends: cc.Component,
            properties: {},
            onLoad: function () {
                var t = this.node.getComponent(cc.Animation).play(), e = t.duration / t.speed;
                this.scheduleOnce(function () {
                    this.node.destroy()
                }, e)
            }
        }), cc._RF.pop()
    }, {}], aniLoopPlay: [function (t, e, i) {
        "use strict";
        cc._RF.push(e, "f911b/XP6dPFZwHZZdpZNv7", "aniLoopPlay"), cc.Class({
            extends: cc.Component, onLoad: function () {
                this.node.getComponent(cc.Animation).play().repeatCount = 9999999999999
            }
        }), cc._RF.pop()
    }, {}], helpJs: [function (t, e, i) {
        "use strict";
        cc._RF.push(e, "51026qIKbdNNqm2+/pdj3Jo", "helpJs"), cc.Class({
            extends: cc.Component,
            properties: {
                btn_back: cc.Node,
                btn_help: cc.Node,
                buff1_txt: cc.Node,
                buff2_txt: cc.Node,
                other_txt: cc.Node,
                bkg: cc.Node
            },
            onLoad: function () {
                this.btn_back.on("touchend", this.back, this), this.btn_help.on("touchend", this.help, this), this.btn_back.on("touchstart", this.handleTouchStart, this), this.btn_help.on("touchstart", this.handleTouchStart, this), this.node.on("touchend", this.break, this), this.bkg.on("touchend", this.break, this), this.node.parent.on("touchend", this.break, this), this.initData(), this.schedule(function () {
                    this.isGetting || this.getTaskStatus()
                }, 5)
            },
            getTaskStatus: function () {
                if (this.boostConfig) {
                    var t = this.boostConfig.task_ids, i = this;
                    Http.getTaskStatus(t, function (t, e) {
                        i.taskStatus = e.tasks, i.updateUi()
                    })
                }
            },
            getBoostConfig: function () {
                var i = this;
                cc.loader.loadRes("component/moudle/Help/boostConfig", function (t, e) {
                    t ? console.log("helpJs.getBoostConfig ---\x3e 好友助力配置文件读取失败:" + t) : (i.boostConfig = e, i.getTaskStatus())
                })
            },
            initData: function () {
                this.getBoostConfig()
            },
            updateUi: function () {
                if (this.boostConfig && this.taskStatus) {
                    for (var t = this.boostConfig.task_ids, e = this.boostConfig.reward.buff1, i = this.boostConfig.reward.buff2, n = this.boostConfig.reward.other, o = 0, a = 0, s = 0, r = 0; r < t.length; r++) {
                        var c = t[r], h = this.taskStatus[c];
                        if (-1 == h.status) {
                            var l = new Array;
                            if (e) {
                                var p = {};
                                p.id = this.boostConfig.reward.buff1.id, p.type = this.boostConfig.reward.buff1.type, p.name = e.name, p.value = e.value, l[0] = p
                            }
                            if (i) {
                                var u = {};
                                u.id = this.boostConfig.reward.buff2.id, u.type = this.boostConfig.reward.buff2.type, u.name = i.name, u.value = i.value, l[1] = u
                            }
                            if (n) {
                                var d = {};
                                d.id = this.boostConfig.reward.other.id, d.type = this.boostConfig.reward.other.type, d.name = n.name, d.amount = n.amount, l[2] = d
                            }
                            Http.getTaskAward(c, function (t, e) {
                                console.log("signJs.getTaskAward ---\x3e 任务领取情况上报", e)
                            })
                        }
                        h.status < 0 && (e && (o += e.value), i && (a += i.value), n && (s += n.amount)), this.updateItemUi(r)
                    }
                    if (e) {
                        var f = e.name + " +" + o;
                        1 == this.boostConfig.reward.buff1.value_type && (f += "%"), this.buff1_txt.getComponent(cc.Label).string = f
                    }
                    if (i) {
                        var m = i.name + " +" + a;
                        1 == this.boostConfig.reward.buff2.value_type && (m += "%"), this.buff2_txt.getComponent(cc.Label).string = m
                    }
                    if (n) {
                        var g = n.name + "：" + s;
                        this.other_txt.getComponent(cc.Label).string = g
                    }
                    this.node.parent.rewardCallback([o, a, s])
                }
            },
            updateItemUi: function (t) {
                var e = "task" + t, i = this.node.getChildByName("list").getChildByName(e);
                i.taskid = this.boostConfig.task_ids[t], i.reward = this.boostConfig.reward, i.active = !1, i.active = !0
            },
            start: function () {
            },
            handleTouchStart: function (t) {
                t.currentTarget.scale = 1.2
            },
            break: function (t) {
                t.stopPropagation()
            },
            back: function (t) {
                t.stopPropagation(), t.currentTarget.scale = 1, this.node.parent.active = !1
            },
            help: function (t) {
                t.stopPropagation(), t.currentTarget.scale = 1;
                for (var e = null, i = this.boostConfig.task_ids, n = 0; n < i.length; n++) {
                    if (-1 < this.taskStatus[i[n]].status) {
                        e = i[n];
                        break
                    }
                }
                Common.share(function (t, e) {
                    t && console.log("分享成功")
                }, e)
            }
        }), cc._RF.pop()
    }, {}], inviteJs: [function (t, e, i) {
        "use strict";
        cc._RF.push(e, "0b08fSweZlIN7YvdrYXBy9R", "inviteJs"), cc.Class({
            extends: cc.Component,
            properties: {bkg: cc.Node, title: cc.Node, btn_back: cc.Node, btn_invite_now: cc.Node, list: cc.Node},
            onLoad: function () {
                this.node.on("touchend", this.break, this), this.bkg.on("touchend", this.break, this), this.node.parent.on("touchend", this.break, this), this.btn_back.on("touchstart", this.handleTouchStart, this), this.btn_invite_now.on("touchstart", this.handleTouchStart, this), this.btn_back.on("touchend", this.back, this), this.btn_invite_now.on("touchend", this.invite, this), this.initData(), this.schedule(function () {
                    this.getTaskStatus()
                }, 5)
            },
            getTaskStatus: function () {
                if (this.inviteConfig) {
                    for (var t = new Array, n = this.inviteConfig.tasks, e = 0; e < n.length; e++) t[e] = n[e].task_id;
                    var o = this;
                    Http.getTaskStatus(t, function (t, e) {
                        console.log(e);
                        var i = e.tasks[n[n.length - 1].task_id].status;
                        console.log(i), o.shareTimes = i < 0 ? 10 : i, o.taskStatus = e.tasks, o.updateItemUi()
                    })
                }
            },
            initData: function () {
                this.getInviteConfig()
            },
            getInviteConfig: function () {
                var i = this;
                cc.loader.loadRes("component/moudle/InviteFriends/inviteConfig", function (t, e) {
                    t ? console.log("inviteJs.getInviteConfig ---\x3e 邀请好友配置文件读取失败:" + t) : (i.inviteConfig = e, i.getTaskStatus())
                })
            },
            invite: function (t) {
                t.stopPropagation(), t.currentTarget.scale = 1, Common.share(function (t, e) {
                    t && console.log("分享成功")
                })
            },
            handleTouchStart: function (t) {
                t.stopPropagation(), t.currentTarget.scale = 1.2
            },
            back: function (t) {
                t.stopPropagation(), t.currentTarget.scale = 1, this.node.parent.active = !1
            },
            break: function (t) {
                t.stopPropagation()
            },
            start: function () {
            },
            updateItemUi: function () {
                for (var t = this.inviteConfig.tasks, e = 0; e < t.length; e++) {
                    var i = "item" + e, n = this.node.getChildByName("list").getChildByName(i);
                    n.task = t[e], n.rewardCallback = this.node.parent.rewardCallback, n.active = !1, n.active = !0
                }
            },
            onEnable: function () {
                this.inviteConfig && this.updateItemUi()
            }
        }), cc._RF.pop()
    }, {}], itemJs: [function (t, e, i) {
        "use strict";
        cc._RF.push(e, "a7b21pJTDZB8osVlBBjQOf3", "itemJs"), cc.Class({
            extends: cc.Component,
            properties: {title: cc.Node, goodsName: cc.Node, status: cc.Node, btn_receive: cc.Node},
            onLoad: function () {
                t("Util"), t("Http"), this.inviteJs = this.node.parent.parent.getComponent("inviteJs"), this.btn_receive.on("touchend", this.receive, this), this.btn_receive.on("touchstart", this.handleTouchStart, this)
            },
            initUi: function () {
                this.title.getComponent(cc.Label).string = "邀请" + this.node.task.friends_amount + "人", this.goodsName.getComponent(cc.Label).string = this.node.task.reward.name + "x" + this.node.task.reward.amount;
                var t = this.inviteJs.taskStatus[this.node.task.task_id].amount;
                if (this.inviteJs.shareTimes < t) this.btn_receive.active = !1, this.status.active = !0, this.status.getComponent(cc.Label).string = this.inviteJs.shareTimes + "/" + this.node.task.friends_amount; else {
                    var e = this.inviteJs.taskStatus[this.node.task.task_id].status;
                    -1 == e ? (this.btn_receive.active = !0, this.status.active = !1) : -2 == e && (this.btn_receive.active = !1, this.status.active = !0, this.status.getComponent(cc.Label).string = "已领取")
                }
            },
            handleTouchStart: function (t) {
                t.stopPropagation(), t.currentTarget.scale = 1.2
            },
            receive: function (t) {
                t.stopPropagation(), t.currentTarget.scale = 1;
                var e = new Array, i = {};
                i.id = this.node.task.reward.id, i.type = this.node.task.reward.type, i.name = this.node.task.reward.name, i.amount = this.node.task.reward.amount, e[0] = i, this.node.rewardCallback(e), this.btn_receive.active = !1, this.status.getComponent(cc.Label).string = "已领取", Http.getTaskAward(this.node.task.task_id, function (t, e) {
                    console.log("signJs.getTaskAward ---\x3e 任务领取情况上报", e)
                })
            },
            start: function () {
            },
            onEnable: function () {
                this.node.task && this.initUi()
            }
        }), cc._RF.pop()
    }, {Http: "Http", Util: "Util"}], md5: [function (t, e, i) {
        "use strict";
        cc._RF.push(e, "b1ecbASvh1JmZjhCCHcQpSH", "md5");
        var o = 0, a = 8;

        function n(t) {
            return h(s(c(t), t.length * a))
        }

        function s(t, e) {
            t[e >> 5] |= 128 << e % 32, t[14 + (e + 64 >>> 9 << 4)] = e;
            for (var i = 1732584193, n = -271733879, o = -1732584194, a = 271733878, s = 0; s < t.length; s += 16) {
                var r = i, c = n, h = o, l = a;
                n = f(n = f(n = f(n = f(n = d(n = d(n = d(n = d(n = u(n = u(n = u(n = u(n = p(n = p(n = p(n = p(n, o = p(o, a = p(a, i = p(i, n, o, a, t[s + 0], 7, -680876936), n, o, t[s + 1], 12, -389564586), i, n, t[s + 2], 17, 606105819), a, i, t[s + 3], 22, -1044525330), o = p(o, a = p(a, i = p(i, n, o, a, t[s + 4], 7, -176418897), n, o, t[s + 5], 12, 1200080426), i, n, t[s + 6], 17, -1473231341), a, i, t[s + 7], 22, -45705983), o = p(o, a = p(a, i = p(i, n, o, a, t[s + 8], 7, 1770035416), n, o, t[s + 9], 12, -1958414417), i, n, t[s + 10], 17, -42063), a, i, t[s + 11], 22, -1990404162), o = p(o, a = p(a, i = p(i, n, o, a, t[s + 12], 7, 1804603682), n, o, t[s + 13], 12, -40341101), i, n, t[s + 14], 17, -1502002290), a, i, t[s + 15], 22, 1236535329), o = u(o, a = u(a, i = u(i, n, o, a, t[s + 1], 5, -165796510), n, o, t[s + 6], 9, -1069501632), i, n, t[s + 11], 14, 643717713), a, i, t[s + 0], 20, -373897302), o = u(o, a = u(a, i = u(i, n, o, a, t[s + 5], 5, -701558691), n, o, t[s + 10], 9, 38016083), i, n, t[s + 15], 14, -660478335), a, i, t[s + 4], 20, -405537848), o = u(o, a = u(a, i = u(i, n, o, a, t[s + 9], 5, 568446438), n, o, t[s + 14], 9, -1019803690), i, n, t[s + 3], 14, -187363961), a, i, t[s + 8], 20, 1163531501), o = u(o, a = u(a, i = u(i, n, o, a, t[s + 13], 5, -1444681467), n, o, t[s + 2], 9, -51403784), i, n, t[s + 7], 14, 1735328473), a, i, t[s + 12], 20, -1926607734), o = d(o, a = d(a, i = d(i, n, o, a, t[s + 5], 4, -378558), n, o, t[s + 8], 11, -2022574463), i, n, t[s + 11], 16, 1839030562), a, i, t[s + 14], 23, -35309556), o = d(o, a = d(a, i = d(i, n, o, a, t[s + 1], 4, -1530992060), n, o, t[s + 4], 11, 1272893353), i, n, t[s + 7], 16, -155497632), a, i, t[s + 10], 23, -1094730640), o = d(o, a = d(a, i = d(i, n, o, a, t[s + 13], 4, 681279174), n, o, t[s + 0], 11, -358537222), i, n, t[s + 3], 16, -722521979), a, i, t[s + 6], 23, 76029189), o = d(o, a = d(a, i = d(i, n, o, a, t[s + 9], 4, -640364487), n, o, t[s + 12], 11, -421815835), i, n, t[s + 15], 16, 530742520), a, i, t[s + 2], 23, -995338651), o = f(o, a = f(a, i = f(i, n, o, a, t[s + 0], 6, -198630844), n, o, t[s + 7], 10, 1126891415), i, n, t[s + 14], 15, -1416354905), a, i, t[s + 5], 21, -57434055), o = f(o, a = f(a, i = f(i, n, o, a, t[s + 12], 6, 1700485571), n, o, t[s + 3], 10, -1894986606), i, n, t[s + 10], 15, -1051523), a, i, t[s + 1], 21, -2054922799), o = f(o, a = f(a, i = f(i, n, o, a, t[s + 8], 6, 1873313359), n, o, t[s + 15], 10, -30611744), i, n, t[s + 6], 15, -1560198380), a, i, t[s + 13], 21, 1309151649), o = f(o, a = f(a, i = f(i, n, o, a, t[s + 4], 6, -145523070), n, o, t[s + 11], 10, -1120210379), i, n, t[s + 2], 15, 718787259), a, i, t[s + 9], 21, -343485551), i = m(i, r), n = m(n, c), o = m(o, h), a = m(a, l)
            }
            return Array(i, n, o, a)
        }

        function r(t, e, i, n, o, a) {
            return m((s = m(m(e, t), m(n, a))) << (r = o) | s >>> 32 - r, i);
            var s, r
        }

        function p(t, e, i, n, o, a, s) {
            return r(e & i | ~e & n, t, e, o, a, s)
        }

        function u(t, e, i, n, o, a, s) {
            return r(e & n | i & ~n, t, e, o, a, s)
        }

        function d(t, e, i, n, o, a, s) {
            return r(e ^ i ^ n, t, e, o, a, s)
        }

        function f(t, e, i, n, o, a, s) {
            return r(i ^ (e | ~n), t, e, o, a, s)
        }

        function m(t, e) {
            var i = (65535 & t) + (65535 & e);
            return (t >> 16) + (e >> 16) + (i >> 16) << 16 | 65535 & i
        }

        function c(t) {
            for (var e = Array(), i = (1 << a) - 1, n = 0; n < t.length * a; n += a) e[n >> 5] |= (t.charCodeAt(n / a) & i) << n % 32;
            return e
        }

        function h(t) {
            for (var e = o ? "0123456789ABCDEF" : "0123456789abcdef", i = "", n = 0; n < 4 * t.length; n++) i += e.charAt(t[n >> 2] >> n % 4 * 8 + 4 & 15) + e.charAt(t[n >> 2] >> n % 4 * 8 & 15);
            return i
        }

        e.exports = {hex_md5: n}, cc._RF.pop()
    }, {}], taskJs: [function (t, e, i) {
        "use strict";
        cc._RF.push(e, "c45e6UWUv1D9bcsC7PwuWsi", "taskJs"), cc.Class({
            extends: cc.Component,
            properties: {avatar: cc.Node, buff1: cc.Node, buff2: cc.Node},
            onLoad: function () {
                this.helpJs = this.node.parent.parent.getComponent("helpJs")
            },
            start: function () {
            },
            initUi: function () {
                var t = this.node.reward.buff1;
                if (t) {
                    var e = t.name + " +" + t.value;
                    1 == t.value_type && (e += "%"), this.buff1.getComponent(cc.Label).string = e
                }
                var i = this.node.reward.buff2;
                if (i) {
                    var n = i.name + " +" + i.value;
                    1 == i.value_type && (n += "%"), this.buff2.getComponent(cc.Label).string = n
                }
                var o = this.helpJs.taskStatus[this.node.taskid].note;
                if (o) {
                    var a = "";
                    for (var s in o) a = o[s];
                    var r = JSON.parse(a).avatar;
                    this.helpJs.taskStatus[this.node.taskid].status < 0 && Util.setImage(this.avatar, r)
                }
            },
            onEnable: function () {
                this.node.taskid && this.node.reward && this.initUi()
            }
        }), cc._RF.pop()
    }, {}], test: [function (t, e, i) {
        "use strict";
        cc._RF.push(e, "e8af1o5RPJAoJy68LC9CGk5", "test"), cc.Class({
            extends: cc.Component,
            properties: {},
            onLoad: function () {
            },
            start: function () {
            }
        }), cc._RF.pop()
    }, {}], tishi: [function (t, e, i) {
        "use strict";
        cc._RF.push(e, "8a1edpY5p5G9YOn7clX+Who", "tishi"), cc.Class({
            extends: cc.Component,
            properties: {},
            onLoad: function () {
                var t = this.node.getComponent(cc.Animation).play(), e = t.duration / t.speed;
                this.scheduleOnce(function () {
                    this.node.destroy()
                }, e), (this.node.curControl = this).node.x = .5 * cc.winSize.width, this.node.y = .5 * cc.winSize.height
            },
            setString: function (t) {
                this.node.getChildByName("t").getComponent(cc.Label).string = t
            }
        }), cc._RF.pop()
    }, {}]
}, {}, ["helpJs", "taskJs", "inviteJs", "itemJs", "Http", "Util", "BattleGround", "Boss506", "Boss507", "Boss508", "Buf", "BulletSprite", "Common", "GameData", "LaserAni", "LaserSprite", "Main", "MissileSprite", "Music", "MusicManager", "NHttp", "NpcPlane", "PlayerPlane", "Prop", "PropBomb", "PropFast", "PropShield", "Rank", "SubdomainSender", "WxSdk", "aniExplode", "aniLoopPlay", "md5", "test", "tishi"]);