var Hs = Object.defineProperty;
var ja = (i) => {
  throw TypeError(i);
};
var Es = (i, t, a) => t in i ? Hs(i, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : i[t] = a;
var me = (i, t, a) => Es(i, typeof t != "symbol" ? t + "" : t, a), Ha = (i, t, a) => t.has(i) || ja("Cannot " + a);
var b = (i, t, a) => (Ha(i, t, "read from private field"), a ? a.call(i) : t.get(i)), y = (i, t, a) => t.has(i) ? ja("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(i) : t.set(i, a), z = (i, t, a, e) => (Ha(i, t, "write to private field"), e ? e.call(i, a) : t.set(i, a), a);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ea = globalThis, ya = ea.ShadowRoot && (ea.ShadyCSS === void 0 || ea.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, za = Symbol(), Ea = /* @__PURE__ */ new WeakMap();
let Ga = class {
  constructor(t, a, e) {
    if (this._$cssResult$ = !0, e !== za) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = a;
  }
  get styleSheet() {
    let t = this.o;
    const a = this.t;
    if (ya && t === void 0) {
      const e = a !== void 0 && a.length === 1;
      e && (t = Ea.get(a)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), e && Ea.set(a, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ss = (i) => new Ga(typeof i == "string" ? i : i + "", void 0, za), ke = (i, ...t) => {
  const a = i.length === 1 ? i[0] : t.reduce((e, s, m) => e + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + i[m + 1], i[0]);
  return new Ga(a, i, za);
}, Vs = (i, t) => {
  if (ya) i.adoptedStyleSheets = t.map((a) => a instanceof CSSStyleSheet ? a : a.styleSheet);
  else for (const a of t) {
    const e = document.createElement("style"), s = ea.litNonce;
    s !== void 0 && e.setAttribute("nonce", s), e.textContent = a.cssText, i.appendChild(e);
  }
}, Sa = ya ? (i) => i : (i) => i instanceof CSSStyleSheet ? ((t) => {
  let a = "";
  for (const e of t.cssRules) a += e.cssText;
  return Ss(a);
})(i) : i;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ds, defineProperty: Os, getOwnPropertyDescriptor: Is, getOwnPropertyNames: As, getOwnPropertySymbols: Ls, getPrototypeOf: Ns } = Object, Qt = globalThis, Va = Qt.trustedTypes, Ps = Va ? Va.emptyScript : "", Bs = Qt.reactiveElementPolyfillSupport, Pi = (i, t) => i, ia = { toAttribute(i, t) {
  switch (t) {
    case Boolean:
      i = i ? Ps : null;
      break;
    case Object:
    case Array:
      i = i == null ? i : JSON.stringify(i);
  }
  return i;
}, fromAttribute(i, t) {
  let a = i;
  switch (t) {
    case Boolean:
      a = i !== null;
      break;
    case Number:
      a = i === null ? null : Number(i);
      break;
    case Object:
    case Array:
      try {
        a = JSON.parse(i);
      } catch {
        a = null;
      }
  }
  return a;
} }, wa = (i, t) => !Ds(i, t), Da = { attribute: !0, type: String, converter: ia, reflect: !1, useDefault: !1, hasChanged: wa };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), Qt.litPropertyMetadata ?? (Qt.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
let bi = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, a = Da) {
    if (a.state && (a.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((a = Object.create(a)).wrapped = !0), this.elementProperties.set(t, a), !a.noAccessor) {
      const e = Symbol(), s = this.getPropertyDescriptor(t, e, a);
      s !== void 0 && Os(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, a, e) {
    const { get: s, set: m } = Is(this.prototype, t) ?? { get() {
      return this[a];
    }, set(n) {
      this[a] = n;
    } };
    return { get: s, set(n) {
      const c = s?.call(this);
      m?.call(this, n), this.requestUpdate(t, c, e);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Da;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Pi("elementProperties"))) return;
    const t = Ns(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Pi("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Pi("properties"))) {
      const a = this.properties, e = [...As(a), ...Ls(a)];
      for (const s of e) this.createProperty(s, a[s]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const a = litPropertyMetadata.get(t);
      if (a !== void 0) for (const [e, s] of a) this.elementProperties.set(e, s);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [a, e] of this.elementProperties) {
      const s = this._$Eu(a, e);
      s !== void 0 && this._$Eh.set(s, a);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const a = [];
    if (Array.isArray(t)) {
      const e = new Set(t.flat(1 / 0).reverse());
      for (const s of e) a.unshift(Sa(s));
    } else t !== void 0 && a.push(Sa(t));
    return a;
  }
  static _$Eu(t, a) {
    const e = a.attribute;
    return e === !1 ? void 0 : typeof e == "string" ? e : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), a = this.constructor.elementProperties;
    for (const e of a.keys()) this.hasOwnProperty(e) && (t.set(e, this[e]), delete this[e]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Vs(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, a, e) {
    this._$AK(t, e);
  }
  _$ET(t, a) {
    const e = this.constructor.elementProperties.get(t), s = this.constructor._$Eu(t, e);
    if (s !== void 0 && e.reflect === !0) {
      const m = (e.converter?.toAttribute !== void 0 ? e.converter : ia).toAttribute(a, e.type);
      this._$Em = t, m == null ? this.removeAttribute(s) : this.setAttribute(s, m), this._$Em = null;
    }
  }
  _$AK(t, a) {
    const e = this.constructor, s = e._$Eh.get(t);
    if (s !== void 0 && this._$Em !== s) {
      const m = e.getPropertyOptions(s), n = typeof m.converter == "function" ? { fromAttribute: m.converter } : m.converter?.fromAttribute !== void 0 ? m.converter : ia;
      this._$Em = s, this[s] = n.fromAttribute(a, m.type) ?? this._$Ej?.get(s) ?? null, this._$Em = null;
    }
  }
  requestUpdate(t, a, e) {
    if (t !== void 0) {
      const s = this.constructor, m = this[t];
      if (e ?? (e = s.getPropertyOptions(t)), !((e.hasChanged ?? wa)(m, a) || e.useDefault && e.reflect && m === this._$Ej?.get(t) && !this.hasAttribute(s._$Eu(t, e)))) return;
      this.C(t, a, e);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, a, { useDefault: e, reflect: s, wrapped: m }, n) {
    e && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t) && (this._$Ej.set(t, n ?? a ?? this[t]), m !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || e || (a = void 0), this._$AL.set(t, a)), s === !0 && this._$Em !== t && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (a) {
      Promise.reject(a);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [s, m] of this._$Ep) this[s] = m;
        this._$Ep = void 0;
      }
      const e = this.constructor.elementProperties;
      if (e.size > 0) for (const [s, m] of e) {
        const { wrapped: n } = m, c = this[s];
        n !== !0 || this._$AL.has(s) || c === void 0 || this.C(s, void 0, m, c);
      }
    }
    let t = !1;
    const a = this._$AL;
    try {
      t = this.shouldUpdate(a), t ? (this.willUpdate(a), this._$EO?.forEach((e) => e.hostUpdate?.()), this.update(a)) : this._$EM();
    } catch (e) {
      throw t = !1, this._$EM(), e;
    }
    t && this._$AE(a);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((a) => a.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((a) => this._$ET(a, this[a]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
bi.elementStyles = [], bi.shadowRootOptions = { mode: "open" }, bi[Pi("elementProperties")] = /* @__PURE__ */ new Map(), bi[Pi("finalized")] = /* @__PURE__ */ new Map(), Bs?.({ ReactiveElement: bi }), (Qt.reactiveElementVersions ?? (Qt.reactiveElementVersions = [])).push("2.1.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Bi = globalThis, aa = Bi.trustedTypes, Oa = aa ? aa.createPolicy("lit-html", { createHTML: (i) => i }) : void 0, Ja = "$lit$", Yt = `lit$${Math.random().toFixed(9).slice(2)}$`, Xa = "?" + Yt, Rs = `<${Xa}>`, hi = document, Fi = () => hi.createComment(""), Zi = (i) => i === null || typeof i != "object" && typeof i != "function", xa = Array.isArray, Us = (i) => xa(i) || typeof i?.[Symbol.iterator] == "function", la = `[ 	
\f\r]`, Vi = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ia = /-->/g, Aa = />/g, ei = RegExp(`>|${la}(?:([^\\s"'>=/]+)(${la}*=${la}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), La = /'/g, Na = /"/g, Ka = /^(?:script|style|textarea|title)$/i, es = (i) => (t, ...a) => ({ _$litType$: i, strings: t, values: a }), x = es(1), pe = es(2), Gt = Symbol.for("lit-noChange"), Fe = Symbol.for("lit-nothing"), Pa = /* @__PURE__ */ new WeakMap(), ni = hi.createTreeWalker(hi, 129);
function ts(i, t) {
  if (!xa(i) || !i.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Oa !== void 0 ? Oa.createHTML(t) : t;
}
const Fs = (i, t) => {
  const a = i.length - 1, e = [];
  let s, m = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = Vi;
  for (let c = 0; c < a; c++) {
    const v = i[c];
    let u, l, r = -1, _ = 0;
    for (; _ < v.length && (n.lastIndex = _, l = n.exec(v), l !== null); ) _ = n.lastIndex, n === Vi ? l[1] === "!--" ? n = Ia : l[1] !== void 0 ? n = Aa : l[2] !== void 0 ? (Ka.test(l[2]) && (s = RegExp("</" + l[2], "g")), n = ei) : l[3] !== void 0 && (n = ei) : n === ei ? l[0] === ">" ? (n = s ?? Vi, r = -1) : l[1] === void 0 ? r = -2 : (r = n.lastIndex - l[2].length, u = l[1], n = l[3] === void 0 ? ei : l[3] === '"' ? Na : La) : n === Na || n === La ? n = ei : n === Ia || n === Aa ? n = Vi : (n = ei, s = void 0);
    const p = n === ei && i[c + 1].startsWith("/>") ? " " : "";
    m += n === Vi ? v + Rs : r >= 0 ? (e.push(u), v.slice(0, r) + Ja + v.slice(r) + Yt + p) : v + Yt + (r === -2 ? c : p);
  }
  return [ts(i, m + (i[a] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), e];
};
class qi {
  constructor({ strings: t, _$litType$: a }, e) {
    let s;
    this.parts = [];
    let m = 0, n = 0;
    const c = t.length - 1, v = this.parts, [u, l] = Fs(t, a);
    if (this.el = qi.createElement(u, e), ni.currentNode = this.el.content, a === 2 || a === 3) {
      const r = this.el.content.firstChild;
      r.replaceWith(...r.childNodes);
    }
    for (; (s = ni.nextNode()) !== null && v.length < c; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) for (const r of s.getAttributeNames()) if (r.endsWith(Ja)) {
          const _ = l[n++], p = s.getAttribute(r).split(Yt), f = /([.?@])?(.*)/.exec(_);
          v.push({ type: 1, index: m, name: f[2], strings: p, ctor: f[1] === "." ? qs : f[1] === "?" ? Ws : f[1] === "@" ? Ys : ra }), s.removeAttribute(r);
        } else r.startsWith(Yt) && (v.push({ type: 6, index: m }), s.removeAttribute(r));
        if (Ka.test(s.tagName)) {
          const r = s.textContent.split(Yt), _ = r.length - 1;
          if (_ > 0) {
            s.textContent = aa ? aa.emptyScript : "";
            for (let p = 0; p < _; p++) s.append(r[p], Fi()), ni.nextNode(), v.push({ type: 2, index: ++m });
            s.append(r[_], Fi());
          }
        }
      } else if (s.nodeType === 8) if (s.data === Xa) v.push({ type: 2, index: m });
      else {
        let r = -1;
        for (; (r = s.data.indexOf(Yt, r + 1)) !== -1; ) v.push({ type: 7, index: m }), r += Yt.length - 1;
      }
      m++;
    }
  }
  static createElement(t, a) {
    const e = hi.createElement("template");
    return e.innerHTML = t, e;
  }
}
function zi(i, t, a = i, e) {
  if (t === Gt) return t;
  let s = e !== void 0 ? a._$Co?.[e] : a._$Cl;
  const m = Zi(t) ? void 0 : t._$litDirective$;
  return s?.constructor !== m && (s?._$AO?.(!1), m === void 0 ? s = void 0 : (s = new m(i), s._$AT(i, a, e)), e !== void 0 ? (a._$Co ?? (a._$Co = []))[e] = s : a._$Cl = s), s !== void 0 && (t = zi(i, s._$AS(i, t.values), s, e)), t;
}
class Zs {
  constructor(t, a) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = a;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: a }, parts: e } = this._$AD, s = (t?.creationScope ?? hi).importNode(a, !0);
    ni.currentNode = s;
    let m = ni.nextNode(), n = 0, c = 0, v = e[0];
    for (; v !== void 0; ) {
      if (n === v.index) {
        let u;
        v.type === 2 ? u = new Yi(m, m.nextSibling, this, t) : v.type === 1 ? u = new v.ctor(m, v.name, v.strings, this, t) : v.type === 6 && (u = new Qs(m, this, t)), this._$AV.push(u), v = e[++c];
      }
      n !== v?.index && (m = ni.nextNode(), n++);
    }
    return ni.currentNode = hi, s;
  }
  p(t) {
    let a = 0;
    for (const e of this._$AV) e !== void 0 && (e.strings !== void 0 ? (e._$AI(t, e, a), a += e.strings.length - 2) : e._$AI(t[a])), a++;
  }
}
class Yi {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, a, e, s) {
    this.type = 2, this._$AH = Fe, this._$AN = void 0, this._$AA = t, this._$AB = a, this._$AM = e, this.options = s, this._$Cv = s?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const a = this._$AM;
    return a !== void 0 && t?.nodeType === 11 && (t = a.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, a = this) {
    t = zi(this, t, a), Zi(t) ? t === Fe || t == null || t === "" ? (this._$AH !== Fe && this._$AR(), this._$AH = Fe) : t !== this._$AH && t !== Gt && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Us(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== Fe && Zi(this._$AH) ? this._$AA.nextSibling.data = t : this.T(hi.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: a, _$litType$: e } = t, s = typeof e == "number" ? this._$AC(t) : (e.el === void 0 && (e.el = qi.createElement(ts(e.h, e.h[0]), this.options)), e);
    if (this._$AH?._$AD === s) this._$AH.p(a);
    else {
      const m = new Zs(s, this), n = m.u(this.options);
      m.p(a), this.T(n), this._$AH = m;
    }
  }
  _$AC(t) {
    let a = Pa.get(t.strings);
    return a === void 0 && Pa.set(t.strings, a = new qi(t)), a;
  }
  k(t) {
    xa(this._$AH) || (this._$AH = [], this._$AR());
    const a = this._$AH;
    let e, s = 0;
    for (const m of t) s === a.length ? a.push(e = new Yi(this.O(Fi()), this.O(Fi()), this, this.options)) : e = a[s], e._$AI(m), s++;
    s < a.length && (this._$AR(e && e._$AB.nextSibling, s), a.length = s);
  }
  _$AR(t = this._$AA.nextSibling, a) {
    for (this._$AP?.(!1, !0, a); t && t !== this._$AB; ) {
      const e = t.nextSibling;
      t.remove(), t = e;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class ra {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, a, e, s, m) {
    this.type = 1, this._$AH = Fe, this._$AN = void 0, this.element = t, this.name = a, this._$AM = s, this.options = m, e.length > 2 || e[0] !== "" || e[1] !== "" ? (this._$AH = Array(e.length - 1).fill(new String()), this.strings = e) : this._$AH = Fe;
  }
  _$AI(t, a = this, e, s) {
    const m = this.strings;
    let n = !1;
    if (m === void 0) t = zi(this, t, a, 0), n = !Zi(t) || t !== this._$AH && t !== Gt, n && (this._$AH = t);
    else {
      const c = t;
      let v, u;
      for (t = m[0], v = 0; v < m.length - 1; v++) u = zi(this, c[e + v], a, v), u === Gt && (u = this._$AH[v]), n || (n = !Zi(u) || u !== this._$AH[v]), u === Fe ? t = Fe : t !== Fe && (t += (u ?? "") + m[v + 1]), this._$AH[v] = u;
    }
    n && !s && this.j(t);
  }
  j(t) {
    t === Fe ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class qs extends ra {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === Fe ? void 0 : t;
  }
}
class Ws extends ra {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== Fe);
  }
}
class Ys extends ra {
  constructor(t, a, e, s, m) {
    super(t, a, e, s, m), this.type = 5;
  }
  _$AI(t, a = this) {
    if ((t = zi(this, t, a, 0) ?? Fe) === Gt) return;
    const e = this._$AH, s = t === Fe && e !== Fe || t.capture !== e.capture || t.once !== e.once || t.passive !== e.passive, m = t !== Fe && (e === Fe || s);
    s && this.element.removeEventListener(this.name, this, e), m && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Qs {
  constructor(t, a, e) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = a, this.options = e;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    zi(this, t);
  }
}
const Gs = Bi.litHtmlPolyfillSupport;
Gs?.(qi, Yi), (Bi.litHtmlVersions ?? (Bi.litHtmlVersions = [])).push("3.3.0");
const Js = (i, t, a) => {
  const e = a?.renderBefore ?? t;
  let s = e._$litPart$;
  if (s === void 0) {
    const m = a?.renderBefore ?? null;
    e._$litPart$ = s = new Yi(t.insertBefore(Fi(), m), m, void 0, a ?? {});
  }
  return s._$AI(i), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ri = globalThis;
let we = class extends bi {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var a;
    const t = super.createRenderRoot();
    return (a = this.renderOptions).renderBefore ?? (a.renderBefore = t.firstChild), t;
  }
  update(t) {
    const a = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Js(a, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Gt;
  }
};
we._$litElement$ = !0, we.finalized = !0, Ri.litElementHydrateSupport?.({ LitElement: we });
const Xs = Ri.litElementPolyfillSupport;
Xs?.({ LitElement: we });
(Ri.litElementVersions ?? (Ri.litElementVersions = [])).push("4.2.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Me = (i) => (t, a) => {
  a !== void 0 ? a.addInitializer(() => {
    customElements.define(i, t);
  }) : customElements.define(i, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ks = { attribute: !0, type: String, converter: ia, reflect: !1, hasChanged: wa }, er = (i = Ks, t, a) => {
  const { kind: e, metadata: s } = a;
  let m = globalThis.litPropertyMetadata.get(s);
  if (m === void 0 && globalThis.litPropertyMetadata.set(s, m = /* @__PURE__ */ new Map()), e === "setter" && ((i = Object.create(i)).wrapped = !0), m.set(a.name, i), e === "accessor") {
    const { name: n } = a;
    return { set(c) {
      const v = t.get.call(this);
      t.set.call(this, c), this.requestUpdate(n, v, i);
    }, init(c) {
      return c !== void 0 && this.C(n, void 0, i, c), c;
    } };
  }
  if (e === "setter") {
    const { name: n } = a;
    return function(c) {
      const v = this[n];
      t.call(this, c), this.requestUpdate(n, v, i);
    };
  }
  throw Error("Unsupported decorator location: " + e);
};
function w(i) {
  return (t, a) => typeof a == "object" ? er(i, t, a) : ((e, s, m) => {
    const n = s.hasOwnProperty(m);
    return s.constructor.createProperty(m, e), n ? Object.getOwnPropertyDescriptor(s, m) : void 0;
  })(i, t, a);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function ft(i) {
  return w({ ...i, state: !0, attribute: !1 });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function is(i) {
  return (t, a) => {
    const e = typeof t == "function" ? t : t[a];
    Object.assign(e, i);
  };
}
var tr = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
}, ir = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
};
(() => {
  var m;
  let i = [Me("discord-action-row")], t, a = [], e, s = we;
  return m = class extends s {
    render() {
      return x`<slot></slot>`;
    }
  }, e = m, (() => {
    const c = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    tr(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: c }, null, a), e = t.value, c && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: c });
  })(), /**
   * @internal
   */
  me(m, "styles", ke`
		:host {
			display: flex;
			flex-wrap: wrap;
		}
	`), ir(e, a), e;
})();
var ar = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
}, sr = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
};
(() => {
  var m;
  let i = [Me("discord-attachments")], t, a = [], e, s = we;
  return m = class extends s {
    render() {
      return x`<slot></slot>`;
    }
  }, e = m, (() => {
    const c = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    ar(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: c }, null, a), e = t.value, c && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: c });
  })(), /**
   * @internal
   */
  me(m, "styles", ke`
		:host {
			display: grid;
			grid-auto-flow: row;
			grid-row-gap: 0.25rem;
			text-indent: 0;
			min-height: 0;
			min-width: 0;
			padding-top: 0.125rem;
			padding-bottom: 0.125rem;
			position: relative;
		}

		:host > * {
			justify-self: start;
			-ms-flex-item-align: start;
			align-self: start;
		}
	`), sr(e, a), e;
})();
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let as = class extends Event {
  constructor(t, a, e, s) {
    super("context-request", { bubbles: !0, composed: !0 }), this.context = t, this.contextTarget = a, this.callback = e, this.subscribe = s ?? !1;
  }
};
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let Ba = class {
  constructor(t, a, e, s) {
    if (this.subscribe = !1, this.provided = !1, this.value = void 0, this.t = (m, n) => {
      this.unsubscribe && (this.unsubscribe !== n && (this.provided = !1, this.unsubscribe()), this.subscribe || this.unsubscribe()), this.value = m, this.host.requestUpdate(), this.provided && !this.subscribe || (this.provided = !0, this.callback && this.callback(m, n)), this.unsubscribe = n;
    }, this.host = t, a.context !== void 0) {
      const m = a;
      this.context = m.context, this.callback = m.callback, this.subscribe = m.subscribe ?? !1;
    } else this.context = a, this.callback = e, this.subscribe = s ?? !1;
    this.host.addController(this);
  }
  hostConnected() {
    this.dispatchRequest();
  }
  hostDisconnected() {
    this.unsubscribe && (this.unsubscribe(), this.unsubscribe = void 0);
  }
  dispatchRequest() {
    this.host.dispatchEvent(new as(this.context, this.host, this.t, this.subscribe));
  }
};
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let rr = class {
  get value() {
    return this.o;
  }
  set value(t) {
    this.setValue(t);
  }
  setValue(t, a = !1) {
    const e = a || !Object.is(t, this.o);
    this.o = t, e && this.updateObservers();
  }
  constructor(t) {
    this.subscriptions = /* @__PURE__ */ new Map(), this.updateObservers = () => {
      for (const [a, { disposer: e }] of this.subscriptions) a(this.o, e);
    }, t !== void 0 && (this.value = t);
  }
  addCallback(t, a, e) {
    if (!e) return void t(this.value);
    this.subscriptions.has(t) || this.subscriptions.set(t, { disposer: () => {
      this.subscriptions.delete(t);
    }, consumerHost: a });
    const { disposer: s } = this.subscriptions.get(t);
    t(this.value, s);
  }
  clearCallbacks() {
    this.subscriptions.clear();
  }
};
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let or = class extends Event {
  constructor(t, a) {
    super("context-provider", { bubbles: !0, composed: !0 }), this.context = t, this.contextTarget = a;
  }
}, Ra = class extends rr {
  constructor(t, a, e) {
    super(a.context !== void 0 ? a.initialValue : e), this.onContextRequest = (s) => {
      if (s.context !== this.context) return;
      const m = s.contextTarget ?? s.composedPath()[0];
      m !== this.host && (s.stopPropagation(), this.addCallback(s.callback, m, s.subscribe));
    }, this.onProviderRequest = (s) => {
      if (s.context !== this.context || (s.contextTarget ?? s.composedPath()[0]) === this.host) return;
      const m = /* @__PURE__ */ new Set();
      for (const [n, { consumerHost: c }] of this.subscriptions) m.has(n) || (m.add(n), c.dispatchEvent(new as(this.context, c, n, !0)));
      s.stopPropagation();
    }, this.host = t, a.context !== void 0 ? this.context = a.context : this.context = a, this.attachListeners(), this.host.addController?.(this);
  }
  attachListeners() {
    this.host.addEventListener("context-request", this.onContextRequest), this.host.addEventListener("context-provider", this.onProviderRequest);
  }
  hostConnected() {
    this.host.dispatchEvent(new or(this.context, this.host));
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function ci({ context: i }) {
  return (t, a) => {
    const e = /* @__PURE__ */ new WeakMap();
    if (typeof a == "object") return { get() {
      return t.get.call(this);
    }, set(s) {
      return e.get(this).setValue(s), t.set.call(this, s);
    }, init(s) {
      return e.set(this, new Ra(this, { context: i, initialValue: s })), s;
    } };
    {
      t.constructor.addInitializer((n) => {
        e.set(n, new Ra(n, { context: i }));
      });
      const s = Object.getOwnPropertyDescriptor(t, a);
      let m;
      if (s === void 0) {
        const n = /* @__PURE__ */ new WeakMap();
        m = { get() {
          return n.get(this);
        }, set(c) {
          e.get(this).setValue(c), n.set(this, c);
        }, configurable: !0, enumerable: !0 };
      } else {
        const n = s.set;
        m = { ...s, set(c) {
          e.get(this).setValue(c), n?.call(this, c);
        } };
      }
      return void Object.defineProperty(t, a, m);
    }
  };
}
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function He({ context: i, subscribe: t }) {
  return (a, e) => {
    typeof e == "object" ? e.addInitializer(function() {
      new Ba(this, { context: i, callback: (s) => {
        a.set.call(this, s);
      }, subscribe: t });
    }) : a.constructor.addInitializer((s) => {
      new Ba(s, { context: i, callback: (m) => {
        s[e] = m;
      }, subscribe: t });
    });
  };
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ka = { ATTRIBUTE: 1, CHILD: 2 }, oa = (i) => (...t) => ({ _$litDirective$: i, values: t });
let Ma = class {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, a, e) {
    this._$Ct = t, this._$AM = a, this._$Ci = e;
  }
  _$AS(t, a) {
    return this.update(t, a);
  }
  update(t, a) {
    return this.render(...a);
  }
};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Le = oa(class extends Ma {
  constructor(i) {
    if (super(i), i.type !== ka.ATTRIBUTE || i.name !== "class" || i.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(i) {
    return " " + Object.keys(i).filter((t) => i[t]).join(" ") + " ";
  }
  update(i, [t]) {
    if (this.st === void 0) {
      this.st = /* @__PURE__ */ new Set(), i.strings !== void 0 && (this.nt = new Set(i.strings.join(" ").split(/\s/).filter((e) => e !== "")));
      for (const e in t) t[e] && !this.nt?.has(e) && this.st.add(e);
      return this.render(t);
    }
    const a = i.element.classList;
    for (const e of this.st) e in t || (a.remove(e), this.st.delete(e));
    for (const e in t) {
      const s = !!t[e];
      s === this.st.has(e) || this.nt?.has(e) || (s ? (a.add(e), this.st.add(e)) : (a.remove(e), this.st.delete(e)));
    }
    return Gt;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const de = (i) => i ?? Fe;
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const lr = (i) => i.strings === void 0;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ui = (i, t) => {
  const a = i._$AN;
  if (a === void 0) return !1;
  for (const e of a) e._$AO?.(t, !1), Ui(e, t);
  return !0;
}, sa = (i) => {
  let t, a;
  do {
    if ((t = i._$AM) === void 0) break;
    a = t._$AN, a.delete(i), i = t;
  } while (a?.size === 0);
}, ss = (i) => {
  for (let t; t = i._$AM; i = t) {
    let a = t._$AN;
    if (a === void 0) t._$AN = a = /* @__PURE__ */ new Set();
    else if (a.has(i)) break;
    a.add(i), hr(t);
  }
};
function nr(i) {
  this._$AN !== void 0 ? (sa(this), this._$AM = i, ss(this)) : this._$AM = i;
}
function cr(i, t = !1, a = 0) {
  const e = this._$AH, s = this._$AN;
  if (s !== void 0 && s.size !== 0) if (t) if (Array.isArray(e)) for (let m = a; m < e.length; m++) Ui(e[m], !1), sa(e[m]);
  else e != null && (Ui(e, !1), sa(e));
  else Ui(this, i);
}
const hr = (i) => {
  i.type == ka.CHILD && (i._$AP ?? (i._$AP = cr), i._$AQ ?? (i._$AQ = nr));
};
class rs extends Ma {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(t, a, e) {
    super._$AT(t, a, e), ss(this), this.isConnected = t._$AU;
  }
  _$AO(t, a = !0) {
    t !== this.isConnected && (this.isConnected = t, t ? this.reconnected?.() : this.disconnected?.()), a && (Ui(this, t), sa(this));
  }
  setValue(t) {
    if (lr(this._$Ct)) this._$Ct._$AI(t, this);
    else {
      const a = [...this._$Ct._$AH];
      a[this._$Ci] = t, this._$Ct._$AI(a, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const yi = () => new dr();
class dr {
}
const na = /* @__PURE__ */ new WeakMap(), Lt = oa(class extends rs {
  render(i) {
    return Fe;
  }
  update(i, [t]) {
    const a = t !== this.G;
    return a && this.G !== void 0 && this.rt(void 0), (a || this.lt !== this.ct) && (this.G = t, this.ht = i.options?.host, this.rt(this.ct = i.element)), Fe;
  }
  rt(i) {
    if (this.isConnected || (i = void 0), typeof this.G == "function") {
      const t = this.ht ?? globalThis;
      let a = na.get(t);
      a === void 0 && (a = /* @__PURE__ */ new WeakMap(), na.set(t, a)), a.get(this.G) !== void 0 && this.G.call(this.ht, void 0), a.set(this.G, i), i !== void 0 && this.G.call(this.ht, i);
    } else this.G.value = i;
  }
  get lt() {
    return typeof this.G == "function" ? na.get(this.ht ?? globalThis)?.get(this.G) : this.G?.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
});
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function J(i, t, a) {
  return i ? t(i) : a?.(i);
}
const os = ke`
	.discord-media-attachment-non-visual-media-item-container {
		justify-self: start;
		align-self: start;
		margin-top: 8px;
		max-width: 100%;
		display: flex;
		flex-direction: column;
		position: relative;
	}

	.discord-media-attachment-mosaic-item-media {
		border-radius: 2px;
		display: flex;
		flex-flow: row nowrap;
		height: 100%;
		max-height: inherit;
		max-width: 100%;
		position: relative;
	}

	.discord-media-attachment-controls {
		width: 100%;
		display: flex;
		align-items: center;
		margin-top: 4px;
		background-color: hsl(0 calc(1 * 0%) 0% / 0.6);
		border-radius: 3px;
	}

	.discord-media-attachment-video-button {
		margin-right: 8px;
	}

	.discord-media-attachment-control-icon {
		display: block;
		width: 24px;
		height: 24px;
		padding: 4px;
		cursor: pointer;
		flex: 0 0 auto;
		opacity: 0.6;
	}

	.discord-media-attachment-duration-time-wrapper {
		flex: 0 0 auto;
		margin: 4px;
		height: 12px;
	}

	.discord-media-attachment-duration-time-display {
		font-weight: 500;
		display: inline-block;
		font-family: 'gg mono', 'Source Code Pro', Consolas, 'Andale Mono WT', 'Andale Mono', 'Lucida Console', 'Lucida Sans Typewriter',
			'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Liberation Mono', 'Nimbus Mono L', Monaco, 'Courier New', Courier, monospace;
		font-size: 12px;
		line-height: 12px;
		vertical-align: text-top;
	}

	.discord-media-attachment-duration-time-separator {
		margin: 0 2px;
	}

	.discord-media-attachment-non-visual-media-item-container:hover .discord-button-download-attachment {
		display: block !important;
	}

	.discord-button-download-attachment {
		display: none;
		position: absolute;
		top: -8px;
		right: -8px;
		border-radius: 5px;
		outline: color-mix(in oklab, hsl(220 calc(1 * 6.5%) 18% / 1) 100%, black 0%);
		background-color: color-mix(in oklab, hsl(223 calc(1 * 6.7%) 20.6% / 1) 100%, black 0%);
	}

	.discord-link-download-attachment {
		color: color-mix(in oklab, hsl(215 calc(1 * 8.8%) 73.3% / 1) 100%, black 0%);
		display: flex;
	}

	.discord-icon-download {
		padding: 6px;
	}
`;
var qt = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
}, Ke = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
};
let ls = (() => {
  var H, te, _e, k, g, N, be, O, T;
  let i = we, t, a = [], e = [], s, m = [], n = [], c, v = [], u = [], l, r = [], _ = [], p, f = [], d = [], o, h = [], F = [], K, M = [], C = [], I, E = [], V = [];
  return T = class extends i {
    constructor() {
      super(...arguments);
      me(this, "mediaComponentRef", yi());
      me(this, "seekSliderRef", yi());
      me(this, "volumeControlRef", yi());
      me(this, "volumeControlInputRef", yi());
      y(this, H, Ke(this, a, "0:00"));
      y(this, te, (Ke(this, e), Ke(this, m, "")));
      y(this, _e, (Ke(this, n), Ke(this, v, !1)));
      y(this, k, (Ke(this, u), Ke(this, r, null)));
      y(this, g, (Ke(this, _), Ke(this, f, !1)));
      y(this, N, (Ke(this, d), Ke(this, h, 1)));
      y(this, be, (Ke(this, F), Ke(this, M, !1)));
      y(this, O, (Ke(this, C), Ke(this, E, !1)));
      me(this, "whilePlaying", (Ke(this, V), () => {
        if (this.mediaComponentRef.value && this.seekSliderRef.value) {
          this.seekSliderRef.value.value = Math.floor(this.mediaComponentRef.value.currentTime).toString();
          const Z = Number(this.seekSliderRef.value.value);
          this.currentPlaybackPosition = this.calculateTime(Z), this.style.setProperty("--seek-before-width", `${Z / Number(this.seekSliderRef.value.max) * 100}%`), this.raf = requestAnimationFrame(this.whilePlaying);
        }
      }));
      me(this, "handleClickPlayPauseIcon", () => {
        this.mediaComponentRef.value && (this.hasEnded && (this.hasEnded = !1), this.isPlaying ? (this.mediaComponentRef.value.pause(), this.raf !== null && cancelAnimationFrame(this.raf), this.isPlaying = !1) : (this.mediaComponentRef.value.play(), requestAnimationFrame(this.whilePlaying), this.isPlaying = !0));
      });
      me(this, "handleSpaceToPlayPause", (Z) => {
        Z.code === "Space" && (Z.preventDefault(), Z.stopPropagation(), this.handleClickPlayPauseIcon());
      });
      me(this, "handleSeekSliderChange", () => {
        this.mediaComponentRef.value && this.seekSliderRef.value && (this.mediaComponentRef.value.currentTime = Number(this.seekSliderRef.value.value), this.mediaComponentRef.value.paused || requestAnimationFrame(this.whilePlaying));
      });
      me(this, "mediaMetadataLoaded", () => {
        this.mediaComponentRef.value && (this.displayMediaDuration(), this.setSliderMax(), this.displayBufferedAmount());
      });
    }
    get currentPlaybackPosition() {
      return b(this, H);
    }
    set currentPlaybackPosition(Z) {
      z(this, H, Z);
    }
    get totalMediaDuration() {
      return b(this, te);
    }
    set totalMediaDuration(Z) {
      z(this, te, Z);
    }
    get isPlaying() {
      return b(this, _e);
    }
    set isPlaying(Z) {
      z(this, _e, Z);
    }
    get raf() {
      return b(this, k);
    }
    set raf(Z) {
      z(this, k, Z);
    }
    get isMuted() {
      return b(this, g);
    }
    set isMuted(Z) {
      z(this, g, Z);
    }
    /**
     * Volume is a fractional value between 0 and 1
     */
    get currentVolume() {
      return b(this, N);
    }
    set currentVolume(Z) {
      z(this, N, Z);
    }
    get hasEnded() {
      return b(this, be);
    }
    set hasEnded(Z) {
      z(this, be, Z);
    }
    get hasRunUpdate() {
      return b(this, O);
    }
    set hasRunUpdate(Z) {
      z(this, O, Z);
    }
    calculateTime(Z) {
      const A = Math.floor(Z / 60), se = Math.floor(Z % 60), ye = se < 10 ? `0${se}` : `${se}`;
      return `${A}:${ye}`;
    }
    displayMediaDuration() {
      this.mediaComponentRef.value && (this.totalMediaDuration = this.calculateTime(this.mediaComponentRef.value.duration));
    }
    setSliderMax() {
      this.mediaComponentRef.value && this.seekSliderRef.value && (this.seekSliderRef.value.max = Math.floor(this.mediaComponentRef.value.duration).toString());
    }
    displayBufferedAmount() {
      if (this.mediaComponentRef.value && this.seekSliderRef.value) {
        const Z = this.mediaComponentRef.value.buffered.length - 1;
        if (Z >= 0) {
          const A = Math.floor(this.mediaComponentRef.value.buffered.end(Z));
          this.style.setProperty("--buffered-width", `${A / Number(this.seekSliderRef.value.max) * 100}%`);
        }
      }
    }
    handleEnded() {
      this.mediaComponentRef.value && (this.mediaComponentRef.value.pause(), this.raf !== null && cancelAnimationFrame(this.raf), this.isPlaying = !1, this.hasEnded = !0);
    }
    handleClickMuteIcon() {
      this.mediaComponentRef.value && (this.isMuted ? (this.mediaComponentRef.value.muted = !1, this.isMuted = !1) : (this.mediaComponentRef.value.muted = !0, this.isMuted = !0));
    }
    handleSeekSliderInput(Z) {
      const A = Z.target;
      this.style.setProperty("--seek-before-width", `${Number(A.value) / Number(A.max) * 100}%`), this.seekSliderRef.value && (this.currentPlaybackPosition = this.calculateTime(Number(this.seekSliderRef.value.value))), this.mediaComponentRef.value && !this.mediaComponentRef.value.paused && this.raf !== null && cancelAnimationFrame(this.raf);
    }
    handleVolumeSliderInput(Z) {
      const A = Z.target, { value: se } = A;
      if (this.mediaComponentRef.value) {
        const ye = Number(se) / 100;
        this.currentVolume = ye, this.mediaComponentRef.value.volume = ye;
      }
    }
    handleVolumeVerticalEnter() {
      this.volumeControlRef.value && this.style.setProperty("--volume-slider-opacity", "1");
    }
    handleVolumeVerticalLeave() {
      this.volumeControlRef.value && this.style.setProperty("--volume-slider-opacity", "0");
    }
    handleVolumeVerticalFocus() {
      this.handleVolumeVerticalEnter(), this.addEventListener("keydown", this.handleVolumeControlKeyboard);
    }
    handleVolumeVerticalBlur() {
      this.handleVolumeVerticalLeave(), this.removeEventListener("keydown", this.handleVolumeControlKeyboard);
    }
    handleVolumeControlKeyboard(Z) {
      let A = 0;
      Z.code === "ArrowDown" ? A = -0.1 : Z.code === "ArrowUp" && (A = 0.1), A !== 0 && this.adjustVolume(A, Z);
    }
    adjustVolume(Z, A) {
      A.preventDefault(), A.stopPropagation();
      let se = this.currentVolume + Z;
      se < 0.1 ? se = 0 : se > 1 && (se = 1), this.mediaComponentRef.value && this.volumeControlInputRef.value && (this.currentVolume = se, this.mediaComponentRef.value.volume = se, this.volumeControlInputRef.value.value = (se * 100).toString());
    }
    shouldUpdate(Z) {
      return Z.has("hasRunUpdate") && Z.size === 1 ? !1 : super.shouldUpdate(Z);
    }
    firstUpdated(Z) {
      this.hasRunUpdate || (this.mediaComponentRef.value && (this.mediaComponentRef.value.readyState > 0 ? (this.displayMediaDuration(), this.setSliderMax(), this.displayBufferedAmount()) : this.mediaComponentRef.value.addEventListener("loadedmetadata", this.mediaMetadataLoaded)), this.hasRunUpdate = !0, super.firstUpdated(Z));
    }
    disconnectedCallback() {
      super.disconnectedCallback(), this.mediaComponentRef.value?.removeEventListener("loadedmetadata", this.mediaMetadataLoaded);
    }
  }, H = new WeakMap(), te = new WeakMap(), _e = new WeakMap(), k = new WeakMap(), g = new WeakMap(), N = new WeakMap(), be = new WeakMap(), O = new WeakMap(), (() => {
    const Z = typeof Symbol == "function" && Symbol.metadata ? Object.create(i[Symbol.metadata] ?? null) : void 0;
    t = [ft()], s = [ft()], c = [ft()], l = [ft()], p = [ft()], o = [ft()], K = [ft()], I = [ft()], qt(T, null, t, { kind: "accessor", name: "currentPlaybackPosition", static: !1, private: !1, access: { has: (A) => "currentPlaybackPosition" in A, get: (A) => A.currentPlaybackPosition, set: (A, se) => {
      A.currentPlaybackPosition = se;
    } }, metadata: Z }, a, e), qt(T, null, s, { kind: "accessor", name: "totalMediaDuration", static: !1, private: !1, access: { has: (A) => "totalMediaDuration" in A, get: (A) => A.totalMediaDuration, set: (A, se) => {
      A.totalMediaDuration = se;
    } }, metadata: Z }, m, n), qt(T, null, c, { kind: "accessor", name: "isPlaying", static: !1, private: !1, access: { has: (A) => "isPlaying" in A, get: (A) => A.isPlaying, set: (A, se) => {
      A.isPlaying = se;
    } }, metadata: Z }, v, u), qt(T, null, l, { kind: "accessor", name: "raf", static: !1, private: !1, access: { has: (A) => "raf" in A, get: (A) => A.raf, set: (A, se) => {
      A.raf = se;
    } }, metadata: Z }, r, _), qt(T, null, p, { kind: "accessor", name: "isMuted", static: !1, private: !1, access: { has: (A) => "isMuted" in A, get: (A) => A.isMuted, set: (A, se) => {
      A.isMuted = se;
    } }, metadata: Z }, f, d), qt(T, null, o, { kind: "accessor", name: "currentVolume", static: !1, private: !1, access: { has: (A) => "currentVolume" in A, get: (A) => A.currentVolume, set: (A, se) => {
      A.currentVolume = se;
    } }, metadata: Z }, h, F), qt(T, null, K, { kind: "accessor", name: "hasEnded", static: !1, private: !1, access: { has: (A) => "hasEnded" in A, get: (A) => A.hasEnded, set: (A, se) => {
      A.hasEnded = se;
    } }, metadata: Z }, M, C), qt(T, null, I, { kind: "accessor", name: "hasRunUpdate", static: !1, private: !1, access: { has: (A) => "hasRunUpdate" in A, get: (A) => A.hasRunUpdate, set: (A, se) => {
      A.hasRunUpdate = se;
    } }, metadata: Z }, E, V), Z && Object.defineProperty(T, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: Z });
  })(), T;
})();
const ns = ke`
	.discord-media-attachment-horizontal {
		width: 100%;
		display: flex;
		align-self: stretch;
	}

	.discord-media-attachment-media-bar-interaction {
		position: relative;
		flex: 1 1 auto;
		align-self: stretch;
		display: flex;
		align-items: center;
		cursor: pointer;
		margin: 0 7px;
	}

	.discord-media-attachment-playback-control {
		position: relative;
		flex: 1 1 auto;
		height: 6px;
		background-color: hsl(210 calc(1 * 9.3%) 78.8% / 0.3);
	}

	.discord-media-attachment-playback-control:hover {
		box-shadow: 0 1px 1px hsl(0 calc(1 * 0%) 0% / 0.3);
	}

	.discord-media-attachment-playback-control::before {
		background-color: hsl(210 calc(1 * 9.3%) 78.8% / 0.3);
		left: -3px;
		border-radius: 3px 0 0 3px;
		content: '';
		position: absolute;
		top: 0;
		height: 100%;
		width: 3px;
		z-index: 1;
	}

	input[type='range'].discord-media-attachment-playback-control::-webkit-slider-runnable-track {
		width: 2.47264%;
		height: 100%;
		cursor: pointer;
		opacity: 1;
		background: linear-gradient(to right, hsl(199 100% calc(1 * 69%) / 1) var(--buffered-width));
	}

	input[type='range'].discord-media-attachment-playback-control::before {
		position: absolute;
		content: '';
		top: 0;
		width: var(--seek-before-width);
		height: 100%;
		z-index: 3;
		background-color: hsl(199 100% calc(1 * 69%) / 1);
		cursor: pointer;
	}

	input[type='range'].discord-media-attachment-playback-control::-webkit-slider-thumb {
		position: relative;
		cursor: pointer;
		border-radius: 3px;
		width: auto;
		height: 18px;
		line-height: 18px;
		text-align: center;
		font-weight: 600;
		font-size: 12px;
		color: hsl(0 calc(1 * 0%) 97.6% / 1);
		opacity: 1;
		transition: opacity.2s ease-out;
		pointer-events: none;
		-webkit-appearance: none;
		box-sizing: content-box;
		background-color: hsl(0 calc(1 * 0%) 0% / 1);
		margin: -5px 0 0 0;
		z-index: 4;
	}

	input[type='range'].discord-media-attachment-playback-control:active::-webkit-slider-thumb {
		transform: scale(1.2);
		filter: brightness(85%);
	}

	input[type='range'].discord-media-attachment-playback-control::-moz-range-track {
		width: 2.47264%;
		height: 100%;
		cursor: pointer;
		opacity: 1;
		background: linear-gradient(to right, hsl(199 100% calc(1 * 69%) / 1) var(--buffered-width));
	}

	input[type='range'].discord-media-attachment-playback-control::-moz-range-progress {
		background-color: hsl(199 100% calc(1 * 69%) / 1);
	}

	input[type='range'].discord-media-attachment-playback-control::-moz-focus-outer {
		border: 0;
	}

	input[type='range'].discord-media-attachment-playback-control::-moz-range-thumb {
		border-radius: 50%;
		position: relative;
		cursor: pointer;
		line-height: 18px;
		text-align: center;
		font-weight: 600;
		font-size: 12px;
		opacity: 1;
		transition: opacity.2s ease-out;
		pointer-events: none;
		-webkit-appearance: none;
		box-sizing: content-box;
		background: #007db5;
		margin: -5px 0 0 0;
	}

	input[type='range'].discord-media-attachment-playback-control:active::-moz-range-thumb {
		transform: scale(1.2);
		filter: brightness(85%);
	}
`, cs = ke`
	.discord-media-attachment-flex {
		display: flex;
	}

	.discord-media-attachment-flex-container {
		justify-content: flex-end;
		align-items: center;
		flex-direction: column;
		display: flex;
		position: relative;
	}

	.discord-media-attachment-button-slider {
		margin-bottom: 4px;
		margin-left: -4px;
		position: absolute;
		bottom: calc(100% + 16px);
		left: -78px;
		right: 0;
		height: 50px;
		opacity: var(--volume-slider-opacity);
		-webkit-app-region: no-drag;
	}

	.discord-media-attachment-volume-vertical {
		display: flex;
		align-items: center;
		transform-origin: top;
		transform: rotate(270deg);
		height: 54px;
		width: 140px;
	}

	.discord-media-attachment-button {
		cursor: pointer;
		line-height: 0;
		width: auto;
		background: transparent;
		color: currentColor;
		border: 0;
		padding: 0;
		margin: 0;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		border-radius: 3px;
		font-size: 14px;
		font-weight: 500;
		-webkit-user-select: none;
		-moz-user-select: none;
		user-select: none;
	}

	.discord-media-attachment-button-content {
		--custom-button-link-underline-offset: 1px;
		--button--underline-color: transparent;
		--custom-button-link-underline-width: 1px;
		--custom-button-link-underline-stop: calc(var(--custom-button-link-underline-width) + var(--custom-button-link-underline-offset));

		background-image: linear-gradient(
			to top,
			transparent,
			transparent var(--custom-button-link-underline-offset),
			var(--button--underline-color) var(--custom-button-link-underline-offset),
			var(--button--underline-color) var(--custom-button-link-underline-stop),
			transparent var(--custom-button-link-underline-stop)
		);
	}

	.discord-media-attachment-button-control-icon {
		display: block;
		width: 24px;
		height: 24px;
		padding: 4px;
		cursor: pointer;
		flex: 0 0 auto;
		opacity: 0.6;
	}

	.discord-media-attachment-volume-slider {
		position: relative;
		height: 6px;
		background-color: hsl(210 calc(1 * 9.3%) 78.8% / 0.3);
		width: 88px;
	}

	.discord-media-attachment-volume-slider:hover {
		box-shadow: 0 1px 1px hsl(0 calc(1 * 0%) 0% / 0.3);
	}

	.discord-media-attachment-volume-slider::before {
		background-color: hsl(210 calc(1 * 9.3%) 78.8%/0.3);
		left: 0px;
		border-radius: 3px 0 0 3px;
		content: '';
		position: absolute;
		top: 0;
		height: 6px;
		width: 100%;
		z-index: 3;
	}

	input[type='range'].discord-media-attachment-volume-slider::-webkit-slider-runnable-track {
		background-color: hsl(210 calc(1 * 9.3%) 78.8%/0.3);
		height: 2.47264%;
		width: 100%;
		cursor: grab;
		border-radius: 8px;
	}

	input[type='range'].discord-media-attachment-volume-slider::-webkit-slider-thumb {
		position: relative;
		bottom: 8px;
		z-index: 4;
	}

	input[type='range'].discord-media-attachment-volume-slider:active::-webkit-slider-thumb {
		transform: scale(1.2);
		filter: brightness(85%);
	}
`;
class mr extends rs {
  constructor() {
    super(...arguments);
    me(this, "host");
    me(this, "element");
    me(this, "prevData", {});
    me(this, "eventData", {});
  }
  render(a) {
    return Fe;
  }
  update(a, [e]) {
    this.element !== a.element && (this.element = a.element), this.host = a.options?.host ?? this.element, this.apply(e), this.groom(e), this.prevData = { ...e };
  }
  apply(a) {
    if (!a)
      return;
    const { prevData: e, element: s } = this;
    for (const [m, n] of Object.entries(a)) {
      if (n === e[m])
        continue;
      const c = m.slice(1);
      switch (m[0]) {
        case "@":
          this.eventData[c] = n, this.applyEvent(c, n);
          break;
        case ".":
          s[c] = n;
          break;
        case "?":
          n ? s.setAttribute(c, "") : s.removeAttribute(c);
          break;
        default:
          n === null ? s.removeAttribute(m) : s.setAttribute(m, String(n));
          break;
      }
    }
  }
  groom(a) {
    const { prevData: e, element: s } = this;
    if (e)
      for (const [m, n] of Object.entries(e)) {
        const c = m.slice(1);
        if (!a || !(m in a) && s[c] === n)
          switch (m[0]) {
            case "@":
              this.groomEvent(c, n);
              break;
            case ".":
              s[c] = void 0;
              break;
            case "?":
              s.removeAttribute(c);
              break;
            default:
              s.removeAttribute(m);
              break;
          }
      }
  }
  applyEvent(a, e) {
    const { prevData: s, element: m } = this;
    this.eventData[a] = e, s[a] && m.removeEventListener(a, this, e), m.addEventListener(a, this, e);
  }
  groomEvent(a, e) {
    const { element: s } = this;
    Reflect.deleteProperty(this.eventData, a), s.removeEventListener(a, this, e);
  }
  handleEvent(a) {
    const e = this.eventData[a.type];
    typeof e == "function" ? e.call(this.host, a) : e.handleEvent(a);
  }
  disconnected() {
    const { eventData: a, element: e } = this;
    for (const [s, m] of Object.entries(a)) {
      const n = s.slice(1);
      e.removeEventListener(n, this, m);
    }
  }
  reconnected() {
    const { eventData: a, element: e } = this;
    for (const [s, m] of Object.entries(a)) {
      const n = s.slice(1);
      e.addEventListener(n, this, m);
    }
  }
}
const ve = oa(mr), ur = pe`
	<path d="M5.688 3.5v.438H5.25v.438h-.438V1.313h-.438V.875h-.436V.438H3.5v6.125h2.625v-.438H5.25v-.438h.438v-.438h.438v-.438h.438V3.5z" fill="#b79cf8"/>
	<path d="M3.063.438v.438h-.438v.438h-.437v3.5h-.875v-.438H.438v1.75h.438v.438h2.625V.438z" fill="#ff7fc0"/>
	<path d="M3.938 0h-.875v.438h.875zm-.875.438h-.438v.438h.438z" fill="#000"/>
	<path d="M3.938.438h-.875v.438h.875zm-.875.437h-.438v.438h.438zm0 1.75h-.438v.438h.438z" fill="#f0f0f0"/>
	<path d="M2.188 5.25H1.75v.438h.438z" fill="#ffa5d3"/>
	<path d="M2.625 5.25h-.437v.438h.438zm-1.75.438H.438v.438h.438zm2.625.438H.875v.438H3.5z" fill="#ff1c90"/>
	<path d="M1.75 5.688h-.437v.438h.438zm-.438-.438H.875v.438h.438zm1.313-.875V3.5h-.437v1.313h.438v1.313h.438v-1.75zm.438-3.5v1.313h-.438v.438h.438v1.313h.438V.875z" fill="#ffa5d3"/>
	<path d="M6.125 3.5h-.438v.438h.438zm-.438.438h-.438v.438h.438zm-3.5.875h-.874v.438h.875zm-.875-.438H.438v.438h.875z" fill="#f0f0f0"/>
	<path d="M.875 5.25v-.875H.438v.875z" fill="#f0f0f0"/>
	<path d="M4.813 1.313h-.438v.438h.438z" fill="#cdbafa"/>
	<path d="M2.625 1.313h-.437v1.313h.438z" fill="#f0f0f0"/>
	<path d="M4.375.438h-.437v.438h.438zm.438.438h-.438v.438h.438zM2.625 4.814h-.437v.438h.438zm3.938 0h-.438v.438h.438zm-.875.438v.438H5.25v.438h.875v-.875zm.438.875v.438H.875v.438h5.688v-.875zM.875 6.125H.438v.438h.438zM7 3.062H5.687V3.5H7zm-5.687.876H0v.438h1.313z" fill="#000"/>
	<path d="M.438 6.125V3.938H0v2.188zm6.563-1.313V3.5h-.438v1.313zM2.625.875h-.437v.438h.438zm-.875.438v3.063h-.437v.438h.875V1.313zm3.5 2.188V1.313h-.438v3.063h.438v-.438h.438V3.5z" fill="#000"/>
	<path d="M3.938.875H3.5v.875h.438zm.438 1.75V1.75h-.438V3.5h.438v.438h.438V2.625zm.875 1.75h-.438v.438h.438zm-1.313 0H3.5v1.313h.438zm.875 1.313h-.438v.438h.438zm0-.875h-.438v.438h.438zm.438.438h-.438v.438h.438z" fill="#cdbafa"/>
	<path d="M5.25 6.125v-.438h-.438v.438H3.5v.438h2.625v-.438zm.438-.875H5.25v.438h.438zm.438-.438h-.438v.438h.438z" fill="#816bee"/>
`;
function fr(i = {}) {
  return x`<svg
		${ve(i)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${ur}
	</svg>`;
}
const pr = pe`
	<path d="M4.375 1.75v-.437h-.437V.438h-.875v.875h-.438v.438h-.437v.438h.438v.438h.438v.438h.875v-.44h.438v-.437h.438V1.75z" fill="#47baff"/>
	<path d="M4.375 5.25v.438h-.437v.875h-.875v-.875h-.438V5.25h-.437v-.438h.438v-.438h.438v-.436h.875v.438h.438v.438h.438v.438z" fill="#ff2c52"/>
	<path d="M3.063 0v.438h.875V0z" fill="#000"/>
	<path d="M3.063.438v.438h.875V.438z" fill="#f0f0f0"/>
	<path d="M3.063 2.625v.438h.875v-.438z" fill="#4282d8"/>
	<path d="M3.063.438h-.438v.875h.438zM.438 3.063H0v.875h.438zm.875 0v-.438H.438v.438zm1.313-1.75h-.438v.438h.438z" fill="#000"/>
	<path d="M2.625 1.75h-.437v.438h.438zm.438-.438h-.438v.438h.438zm0 2.625v.438h.875v-.437z" fill="#f0f0f0"/>
	<path d="M3.063 6.125v.438h.875v-.438zm0-.875h-.438v.438h.438zm-.438-.438h-.437v.438h.438z" fill="#be0351"/>
	<path d="M3.063 4.375h-.438v.438h.438z" fill="#f0f0f0"/>
	<path d="M3.938 5.688h.438V5.25h-.438zm.438-.438h.438v-.438h-.438zm-.438-.438h.438v-.438h-.438z" fill="#be0351"/>
	<path d="M3.5 1.75h-.437v.438h.438z" fill="#f0f0f0"/>
	<path d="M4.375 2.188h-.437v.438h.438zm.438-.438h-.438v.438h.438z" fill="#4282d8"/>
	<path d="M5.25 4.375h.438v-.437h.875v-.875h-.875v-.438H5.25v-.437h-.438v.438h-.438v.438h-.436v.875h.438v.438h.438v.438h.438z" fill="#C7C7C7"/>
	<path d="M6.563 3.063h-.438v.875h.438z" fill="#707070"/>
	<path d="M5.25 2.625v-.437h-.438v.438zm-.438.438v-.438h-.438v.438z" fill="#fff"/>
	<path d="M4.813 4.375v-.437h-.438v.438zm-.438-.438V3.5h-.437v.438zm1.313.438v-.437H5.25v.438zm-.438.438v-.438h-.438v.438z" fill="#707070"/>
	<path d="M1.75 4.375h-.437v-.437H.438v-.875h.875v-.438h.438v-.437h.438v.438h.438v.438h.438v.875h-.44v.438h-.437v.438H1.75z" fill="#C7C7C7"/>
	<path d="M.438 3.938h.438v-.875H.438z" fill="#fff"/>
	<path d="M2.625 3.938h.438v-.875h-.438z" fill="#707070"/>
	<path d="M2.188 2.625v-.437H1.75v.438zm-.438.438v-.438h-.437v.438zm.438.438v-.438H1.75v.438z" fill="#fff"/>
	<path d="M2.625 4.375v-.437h-.437v.438zm-.438.438v-.438H1.75v.438z" fill="#707070"/>
	<path d="M2.188 1.75H1.75v.438h.438zm.438.438h-.438v.438h.438zm.438.438h-.439v.438h.438zm.875.438h-.876v.875h.875zm.438.875h-.439v.438h.438zm.438.438h-.438v.438h.438zM1.75 2.188h-.437v.438h.438zm2.188 4.813v-.438h-.875v.438zm-.875-1.313h-.438v.875h.438zM.438 3.938v.438h.875v-.438zm2.188 1.313h-.438v.438h.438zm-.438-.438H1.75v.438h.438zm-.438-.438h-.437v.438h.438zm2.188-3.063h.438V.438h-.438zm2.625 2.625h.438v-.874h-.438zm0-.875v-.437h-.875v.438zM4.375 1.749h.438v-.436h-.438zm.438.438h.438V1.75h-.438zm-.438.438h.438v-.437h-.438zm-.437.438h.438v-.438h-.438zM2.625 4.376h.438v-.438h-.438zm-.438.438h.438v-.438h-.437z" fill="#000"/>
	<path d="M4.813 2.188h.438V1.75h-.438zm.438.438h.438v-.438h-.438zM3.938 6.564h.438v-.875h-.438zm1.75-2.625v.438h.875v-.439zm-1.313 1.75h.438v-.438h-.438zm.438-.438h.438v-.438h-.438zm.438-.438h.438v-.438h-.438z" fill="#000"/>
`;
function vr(i = {}) {
  return x`<svg
		${ve(i)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${pr}
	</svg>`;
}
const gr = pe`
	<path d="M6.125 3.063v-.438h-.438v.438H4.374v-.438h-.436V1.313h.438V.875H3.063v1.75h-.438v.438H.438v.875h.438v.438h.438v-.438h1.313v.438h.438v1.313h-.44v.438h.438v.438h.875v-.438h.438v-.438h-.438V4.376h.438v-.438h1.313v.438h.438v-.438h.438v-.875z" fill="#ffb84b"/>
	<path d="M3.938 0h-.875v.438h.875zM2.625.875H1.313v.438h1.313zm-1.312.438H.875v1.313h.438zm1.75 0h-.438v1.313h.438zm1.313 0h-.438v1.313h.438zm1.75 0h-.438v1.313h.438zM5.688.875H4.375v.438h1.313zm-3.063 1.75H1.313v.438h1.313zm3.063 0H4.375v.438h1.313zM3.063.438h-.438v.438h.438z" fill="#000"/>
	<path d="M2.625 1.313h-.437v.438h.438zm-.437.437H1.75v.438h.438zm3.5-.438H5.25v.438h.438zm-.438.438h-.438v.438h.438zm.438 2.625H5.25v.438h.438zm-.438.438h-.438v.438h.438zm-2.625-.438h-.437v.438h.438zm-.438.438H1.75v.438h.438z" fill="#57595f"/>
	<path d="M4.375.438h-.437v.438h.438zM.438 3.063H0v.875h.438z" fill="#000"/>
	<path d="M2.188 1.75v.438h-.875v.438h1.313V1.75zm3.063 0v.438h-.875v.438h1.313V1.75zM2.188 4.813v.438h-.875v.438h1.313v-.875zm3.063 0v.438h-.875v.438h1.313v-.875z" fill="#35363a"/>
	<path d="M.875 3.938H.438v.438h.438zm0-1.313H.438v.438h.438zM7 3.063h-.438v.875H7z" fill="#000"/>
	<path d="M6.563 3.063h-.438v.875h.438z" fill="#ba3500"/>
	<path d="M.875 3.063H.438v.875h.438z" fill="#f0f0f0"/>
	<path d="M6.563 2.625h-.438v.438h.438zm0 1.313h-.438v.438h.438z" fill="#000"/>
	<path d="M6.125 3.938h-.438v.438h.438zm-3.062 0h-.438v.438h.438zm-1.75 0H.875v.438h.438zm3.063 0h-.438v.438h.438z" fill="#ba3500"/>
	<path d="M3.938 6.563h-.875v.438h.875zm-1.313-.875H1.313v.438h1.313zM1.312 4.375H.875v1.313h.438zm1.75 0h-.437v1.313h.438zm1.313 0h-.437v1.313h.438zm1.75 0h-.438v1.313h.438zm-.438 1.313H4.374v.438h1.313zm-3.062-1.75H1.313v.438h1.313zm3.063 0H4.375v.438h1.313z" fill="#000"/>
	<path d="M2.625 3.5H1.313v.438h1.313zm3.063 0H4.375v.438h1.313z" fill="#ba3500"/>
	<path d="M3.063 6.125h-.438v.438h.438zm1.313 0h-.438v.438h.438z" fill="#000"/>
	<path d="M3.938 6.125h-.875v.438h.875z" fill="#ba3500"/>
	<path d="M3.938.438h-.875v.438h.875zm-.875.437h-.438v.438h.438V.438Z" fill="#f0f0f0"/>
	<path d="M4.375 5.688h-.437v.438h.438z" fill="#ba3500"/>
	<path d="M2.188 1.313h-.875v.875h.438V1.75h.438zm3.063 0h-.875v.875h.438V1.75h.438zM2.188 4.376h-.875v.875h.438v-.438h.438zm3.063 0h-.875v.875h.438v-.438h.438z" fill="#d8d8d8"/>
	<path d="M3.938 2.188V1.75H3.5V.875h-.437v1.313zm0 .438H3.5v.438h-.437v.438h-.438v.438h.438v.875h.438v1.313h.438v-1.75H3.5V3.5h.875v-.437h-.437zm2.188.438h-.438v.438h.438zm-3.063-.439h-.438v.438h.438zm-1.75.438H.875v.438h.438zm.875 0H1.75v.438h.438z" fill="#fd6214"/>
`;
function _r(i = {}) {
  return x`<svg
		${ve(i)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${gr}
	</svg>`;
}
const br = pe`
	<path d="M5.688 2.625V1.75H5.25V.438h-.438v.438h-.438v.438h-.436v.438H3.5v.438H1.313v.438H.875v.875H.438v1.75h.438v.438h.438v.438h.438v.438h3.5v-.438h.438v-.438h.438V2.625z" fill="#fd6214"/>
	<path d="M0 3.5v1.75h.438V3.5zm6.563.438v1.313h.438V3.938zm-.438-1.313v1.313h.438V2.625zm-.438-.875v.875h.438V1.75z" fill="#000"/>
	<path d="M6.125 3.938v1.313h.438V3.938zm-.438-1.313v1.313h.438V2.625zm-.438-.875v.875h.438V1.75z" fill="#ba3500"/>
	<path d="M.438 2.625V3.5h.438v-.875zm2.625-1.313h-.438v.438h.438zm.875 0H3.5v.438h.438zM3.5 1.75h-.437v.438h.438zm-2.625.438v.438h.438v-.438zM.437 5.251v.438h.438v-.438zm.438.438v.438h.438v-.438zm.438.438v.438h.438v-.438zm4.813-.875v.438h.438v-.438zm-.438.438v.438h.438V5.69zm-.438.438v.438h.438v-.438zm-3.5.438v.438h3.5v-.438zM1.313 1.75v.438h.438V1.75zm.438-.438v.438h.438v-.437zm.438-.438v.438h.438V.875zm1.75 0v.438h.438V.875zm.438-.438v.438h.438V.438zm.438-.438v.438h.438V0z" fill="#000"/>
	<path d="M4.813.438v.438h.438V.438zm-.438.438v.438h.438V.875zm-.437.437v.438h.438v-.438zM3.5 1.75v.438h.438V1.75zm-1.312-.437v.438h.438v-.438zm-.438.437v.438h.438V1.75zm.875 0v.438h.438V1.75z" fill="#f0f0f0"/>
	<path d="M2.188 1.75v.438h.438V1.75z" fill="#fd6214"/>
	<path opacity=".5" d="M4.813 1.75v.438h.438V1.75zm.438 2.188V3.5h-.438v-.875h-.438v.438h-.437v.438H2.625v-.438h-.437v.875h-.875v.875h.438v.875h.438v.438h2.625v-.438h.438v-.875h.438v-.875z" fill="#fff"/>
	<path d="M1.313 2.188v.438h.438v-.438zm-.438.437V3.5h.438v-.875zm.875.875v.438h.438V3.5z" fill="#f0f0f0"/>
	<path d="M.875 5.25v.438h.438V5.25zm.438.438v.438h.438v-.438zm3.938 0v.438h.438v-.438zm.438-.438v.438h.438V5.25zm-3.938.875v.438h3.5v-.438z" fill="#ba3500"/>
	<path d="M.438 3.5v.875h.438V3.5zm4.375.875h-.438v-.437h-1.75v.438h-.437v.875h.438v.438h1.75v-.438h.438z" fill="#f0f0f0"/>
	<path d="M5.25.438v1.313h.438V.438z" fill="#000"/>
`;
function yr(i = {}) {
  return x`<svg
		${ve(i)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${br}
	</svg>`;
}
const zr = pe`
	<path d="M6.563.875h-.438V.438H4.812v1.313h-.438V.875h-.436V.438h-.875v.438h-.438v.875h-.437V.438H.875v.438H.438v1.75h.438v.438h.875v.438h.438v.875h.438v.438h.438v.438h.875v-.438h.438v-.438h.438V3.5h.438v-.437h.875v-.438h.438z" fill="#ff7fc0"/>
	<path d="M3.938 0h-.875v.438h.875zm-1.75 0H.875v.438h1.313zm3.938 0H4.813v.438h1.313zm.438.438h-.438v.438h.438zm.438.438h-.438v1.75h.438zM4.377.438h-.439v.438h.438v.875h.438V.438zm-2.189 0v1.313h.438V.875h.438V.438zm-1.313 0H.438v.438h.438zM.438.875H0v1.75h.438zm.438 1.75H.438v.438h.438zm.875.438H.875v.438h.875zm4.375 0h-.875v.438h.875zm.438-.438h-.438v.438h.438zM5.251 3.938V3.5h-.438v.875h1.75v-.437zM1.75 3.5v.438H.438v.438h1.75V3.5zm-1.313.875H0v1.75h.438zm.438 1.75H.438v.438h.438zm5.25.438H.875v.438h5.25zm.438-.438h-.438v.438h.438zm.438-1.75h-.438v1.75h.438zm-4.376 0h-.437v.438h.438zm.438.438h-.438v.438h.438zm1.313 0h-.438v.438h.438zm.438-.438h-.438v.438h.438zm-.875.875h-.876v.438h.875z" fill="#000"/>
	<path d="M4.813 4.375v.438h-.438v.438h-.437v.438h-.875v-.438h-.438v-.438h-.437v-.438H.438v1.75h.438v.438h5.25v-.438h.438v-1.75z" fill="#6be473"/>
	<path d="M1.75 5.25h-.437v.438h.438zm-.438-.438H.875v.438h.438zM5.25 6.125v-.438h-.438v.438h-.874v-.438h-.875v.438h-.875v-.438H1.75v.438H.875v.438h5.25v-.438zm.438-.875H5.25v.438h.438zm.438-.438h-.438v.438h.438zm.438.875h-.438v.438h.438z" fill="#008456"/>
	<path d="M2.625 3.938h-.437v.438h.438zm.438.438h-.438v.438h.438zm1.313 0h-.438v.438h.438zm.438-.438h-.438v.438h.438zm.438-.875h-.438v.438h.438zm.875-.438h-.438v.438h.438zm.438-.875h-.438v.875h.438zM3.94 4.813h-.877v.438h.875z" fill="#ff1c90"/>
	<path d="M4.375 5.25h-.437v.438h.438zm.438-.438h-.438v.438h.438zm.438-.438h-.438v.438h.438zm-4.813.001v.875h.438v-.438h1.313v-.438zm.438-3.5H.438v.875h.438zM2.189.437H.875v.438h1.313zm.875.438h-.439v.438h.438zm.875-.438h-.876v.438h.875zm1.313 0h-.438v.875h.438V.875h.875V.438z" fill="#f0f0f0"/>
`;
function wr(i = {}) {
  return x`<svg
		${ve(i)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${zr}
	</svg>`;
}
const xr = pe`
	<path d="M3.063.875v.438h.875V.875zm.875-.438v.438h1.75V.438zm1.75.438v.438h.438V.875zm.438.438v.438h.438v-.438zm.438.438v2.188h.438V1.75zm-.438 2.188v.875h.438v-.876zm-.438.875v.438h.438v-.438zm-.875.438v.438h.875v-.438zm-.875.438v.438h.875V5.69zm-.875.438v.438h.875v-.438z" fill="#000"/>
	<path d="M6.563 1.75h-.438v-.437h-.438V.875H3.938v.438h-.875V.875h-1.75v.438H.875v.438H.438v2.188h.438v.875h.438v.438h.875v.438h.875v.438h.875V5.69h.875v-.438h.875v-.438h.438v-.876h.438z" fill="#ff7fc0"/>
	<path d="M6.563 1.75h-.438v2.188h.438zm-.438 2.188h-.438v.875h.438zm-4.812 0H.875v.875h.438zm4.375.875h-.875v.438h.875zm-.875.438h-.875v.438h.875zm-.875.438h-.875v.438h.875zm-.875-.438h-.875v.438h.875zm-.875-.438h-.875v.438h.875z" fill="#ff1b90"/>
	<path d="M1.313.438v.438h1.75V.438zM.875.875v.438h.438V.875zm-.437.438v.438h.438v-.438zM0 1.75v2.188h.438V1.75zm.438 2.188v.875h.438v-.875zm.438.875v.438h.438v-.438zm.438.438v.438h.875v-.438zm.875.438v.438h.875v-.438z" fill="#000"/>
	<path d="M1.313.875v.438h1.75V.875zm2.625 0v.438h1.75V.875zm-.875.438v.438h.875v-.438z" fill="#f0f0f0"/>
	<path opacity=".6" d="M4.813 2.625v-.437h-.875v.438h-.875v-.438h-.875v.438H1.75v1.313h.438v.438h.879v.438h.875v-.438h.871v-.439h.438V2.625z" fill="#fff"/>
	<path d="M5.688 1.313v.438h.438v-.438zm-4.813 0v.438h.438v-.438zm.438.438v.438h.438V1.75zM.438 1.75v.875h.438V1.75z" fill="#f0f0f0"/>
`;
function kr(i = {}) {
  return x`<svg
		${ve(i)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${xr}
	</svg>`;
}
const Mr = pe`
	<path d="M6.125 2.625v.438H4.812v-.438h-.438v-.437h-.436V.875h.438V.438H.438v.438h.875v.438h.438v.438h.875v.875h-.438v.438H1.75v.875h-.437v.875H.875v.875H.438v.875h1.313v-.438h.875v-.438h.438v-.438h.438v-.438h.875v-.438h.438v-.437h.438v.438h.438v.438h.438v.438h.438V2.625z" fill="#ffe361"/>
	<path d="M6.125 0H4.812v.438h1.313zM1.75 6.563H.438v.438h1.313zm.875-.438H1.75v.438h.875zM1.313.875H.438v.438h.875zm.438.875v.438h.438v.438h.438V1.75zm0 1.313h-.438v.875h.438zm-.438.875H.875v.875h.438zm-.438.875H.438v.875h.438zm-.438.875H0v.875h.438zm3.938-.875H3.5v.438h.875zm0-4.813H.438v.438h3.938z" fill="#000"/>
	<path d="M4.375.438H.438v.438h3.938z" fill="#f0f0f0"/>
	<path d="M6.125 2.625H4.812v.438h1.313zM4.812.437h-.438v.438h.438z" fill="#000"/>
	<path d="M4.813.875h-.438v.875h.438zM6.126.437H4.813v.438h1.313z" fill="#f0f0f0"/>
	<path d="M6.125 2.188H4.812v.438h1.313z" fill="#ba3500"/>
	<path d="M.438.438H0v.438h.438zm1.313.875h-.438v.438h.438zm.438 1.313H1.75v.438h.438zM6.564.438h-.438v.438h.438zm.438.438h-.438v1.313h.438z" fill="#000"/>
	<path d="M6.563.875h-.438v1.313h.438z" fill="#ba3500"/>
	<path d="M7 2.625h-.438V5.25H7z" fill="#000"/>
	<path d="M6.563 2.625h-.438V5.25h.438z" fill="#ffb84b"/>
	<path d="M6.563 2.188h-.438v.438h.438zM4.375.875h-.437v1.313h.438zm.438 1.313h-.438v.438h.438z" fill="#000"/>
	<path d="M4.813 1.75h-.438v.438h.438z" fill="#ba3500"/>
	<path d="M3.063 5.688h-.438v.438h.438z" fill="#000"/>
	<path d="M4.375 3.063v.438h-.437v.438H3.5v.438h-.437v.438h-.438v.438h-.437v.438H1.75v.438h.875v-.438h.438v-.438h.438v-.438h.875v-.438h.438V3.063zM1.75 6.126h-.437v.438h.438z" fill="#ffb84b"/>
	<path d="M3.5 5.25h-.437v.438h.438z" fill="#000"/>
	<path d="M2.188 3.063H1.75v.438h.438zm.438-.438h-.438v.438h.438z" fill="#f0f0f0"/>
	<path d="M3.063 2.188h-.438v.438h.438zm.438-.438h-.438v.438h.438z" fill="#ffb84b"/>
	<path d="M2.625 3.5h-.437v.438h.438zm-.875.438h-.437v.438h.438zm-.438.875H.875v.438h.438zm-.438.875H.438v.438h.438z" fill="#f0f0f0"/>
	<path d="M4.813 4.375h-.438v.438h.438zm.438-.438h-.438v.438h.438zm.438.438h-.438v.438h.438zm.438.438h-.438v.438h.438zm.438.438h-.438v.438h.438z" fill="#000"/>
	<path d="M6.125.875H4.812v1.313h1.313z" fill="#fd6214"/>
`;
function $r(i = {}) {
  return x`<svg
		${ve(i)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${Mr}
	</svg>`;
}
const Tr = pe`
	<path d="M6.563 0.876V0.437H3.937v0.437H1.313v2.187H0.437v2.187h5.25v-2.186h0.876z" fill="#bcef42"/>
	<path d="M4.813 5.687v-0.437H2.187v0.437z" fill="#7fb134"/>
	<path d="M6.563 0.876V0.437H3.937v0.437zm-2.626 0.437V0.876H2.187v0.437z" fill="#fff"/>
	<path d="M1.313 4.813v0.437h0.876v-0.437zm4.376 -0.437h-0.437v0.876h0.437zm0.876 -2.187h-0.437v0.876h0.437zm-0.437 0.876h-0.437v1.313h0.437z" fill="#7fb134"/>
	<path d="M7 0.437h-0.437v2.626H7z" fill="#000"/>
	<path d="M1.313 3.937H0.876v2.626h0.437z" fill="#4a8359"/>
	<path d="M6.563 0H3.937v0.437h2.626zM4.813 5.687H2.187v0.437h2.626zM3.937 0.437H2.187v0.437h1.75zM2.187 0.876h-0.874v0.437h0.876zm-0.874 0.437H0.876v0.876h0.437zM0.437 3.063H0v2.187h0.437v1.313h0.437V5.25H0.437zh0.437v-0.876H0.437zm5.25 2.187h-0.876v0.437h0.876zm0.437 -0.876h-0.437v0.876h0.437zh0.437V3.063h-0.437zM1.75 5.687h0.437v-0.437h-0.874v1.313h0.437zm-0.437 0.876H0.876V7h0.437z" fill="#000"/>
	<path d="M0.876 3.063h0.437v-0.876H0.876zm-0.438 0.874h0.437v-0.874H0.437zm1.75 -2.626h-0.874v0.876h0.437v-0.437h0.437z" fill="#fff"/>
	<path d="M1.75 3.5h0.876v-0.437h-0.876zm0.876 -0.437h0.876v-0.437h-0.876zm0.876 -0.437h0.876v-0.438H3.5zm0.876 -0.437h0.437v-0.438h-0.437zm0.437 -0.437h0.437v-0.438H4.814z" fill="#4a8359"/>
	<path d="M2.187 1.75v0.437h0.437v-0.437z" fill="#fff"/>
	<path d="M1.313 3.5v0.437h0.437V3.5z" fill="#4a8359"/>
`;
function Cr(i = {}) {
  return x`<svg
		${ve(i)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${Tr}
	</svg>`;
}
const jr = pe`
	<path d="M2.188 2.625H1.75v.438H.875v.875H3.5v.875h-.437v.438h-.438v.438h-.437v.438H1.75v.438h.875v-.438h.438v-.438h.438v-.438h.438v-.438h.875v-.438h.438v-.437h.875v-.875H3.063v-.438h.438v-.437h.438V1.75h.438v-.437H3.5v.438h-.437v.438h-.875z" fill="#ffe361"/>
	<path d="M.438 3.063H0v.875h.438z" fill="#000"/>
	<path d="M.875 3.063H.438v.875h.438z" fill="#f0f0f0"/>
	<path d="M7 3.063h-.438v.875H7zm-5.687-.438H.438v.438h.875zm1.313-.875H1.75v.438h.875zm-.876.438h-.437v.438h.438z" fill="#000"/>
	<path d="M1.75 2.625h-.437v.438h.438zm.438-.438H1.75v.438h.438zm.438.438h-.438v.438h.438zm.438-.875h-.439v.438h.438zm.438-.438h-.439v.438h.438zm0 3.063h-.439v.438h.438zm-.438.438h-.439v.438h.438zm-.438.438h-.438v.438h.438zm-.438.438H1.75v.438h.438zm-.438.438h-.437v.438h.438z" fill="#f0f0f0"/>
	<path d="M5.25.875h-.438v.438h.438zm.438 3.063H5.25v.438h.438zm-.438.438h-.438v.438h.438zm-.875.438h-.437v.438h.438zm-.438.438H3.5v.438h.438zm2.625-1.75h-.438v.438h.438z" fill="#ffb84b"/>
	<path d="M6.563 3.063h-.438v.438h.438z" fill="#f0f0f0"/>
	<path d="M4.813 1.313h-.438v.438h.438zm-.438.438h-.437v.438h.438zm-.437.437H3.5v.438h.438zm-.438.437h-.437v.438h.438z" fill="#ffb84b"/>
	<path d="M4.375.875h-.437v.438h.438z" fill="#f0f0f0"/>
	<path d="M3.938.875h-.875v.438h.875zm-.875.438h-.438v.438h.438zM5.688 0H4.375v.438h1.313z" fill="#000"/>
	<path d="M5.688.438H4.375v.438h1.313z" fill="#f0f0f0"/>
	<path d="M6.563 2.625H3.5v.438h3.063zM4.375.437h-.437v.438h.438zm1.75 0h-.438v.438h.438zm-.438.438h-.438v.438h.438zm-.438.438h-.438v.438h.438zm-.438.438h-.438v.438h.438zm-.438.438h-.435v.438h.438zm2.188 1.75h-.875v.438h.875zm-1.313.875h-.875v.438h.875zm.438-.438h-.438v.438h.438zm-1.75 1.313h-.873v.438h.875zm.438-.438h-.436v.438h.438zm-1.75 1.313H1.313v.438h1.313zm.875-2.625H.438v.438h3.063zm-.438 2.188h-.436v.438h.438zm-1.75 0H.875v.438h.438zm.438-.438h-.436v.438h.438zm.438-.438H1.75v.438h.438zm.438-.438h-.437v.438h.438zm.438-.438h-.438v.438h.438z" fill="#000"/>
	<path d="M4.813.875h-.438v.438h.438z" fill="#ffe361"/>
`;
function Hr(i = {}) {
  return x`<svg
		${ve(i)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${jr}
	</svg>`;
}
const Er = pe`
	<path d="M6.125 1.75v-.437H5.25V.438H3.5v.438h-.437v.438h-.438V.875H1.313v.438H.875v1.75H.438v1.313h.438v-.438h.438V3.5h2.188v-.875h.438v-.437h2.188v.438h.438V1.75z" fill="#b79cf8"/>
	<path d="M3.938 2.625v.438H3.5v.875h.438v.875h.875v.438h1.313v-.438h.438V2.625z" fill="#9af4dc"/>
	<path d="M1.75 4.375v1.75h.438v.438h1.313v-.438h.438v-1.75z" fill="#9af4dc"/>
	<path d="M3.5 6.125H2.188v.438h1.313zm2.625-1.313H4.812v.438h1.313zm.438-.438h-.438v.438h.438zM3.938 5.687H3.5v.438h.438z" fill="#6c9ca6"/>
	<path d="M3.938 3.063H3.5v.438h.438zm.875.438h-.438v.438h.438zm1.313-.875H3.938v.438h2.188z" fill="#f0f0f0"/>
	<path d="M3.5.438h-.437v.438h.438zm3.063.875h-.438v.438h.438zm-.438 2.188h-.438v.875h.438zm-2.187-.876H3.5v.438h.438z" fill="#000"/>
	<path d="M3.938 2.188H3.5v.438h.438z" fill="#816bee"/>
	<path d="M1.313 3.938H.875v.438h.438zm1.75 1.75h-.438v.438h.438zm-.438-.438h-.437v.438h.438z" fill="#000"/>
	<path d="M2.625 5.25h-.437v.438h.438zm3.063-.875H5.25v.438h.438zm-.438-.438h-.438v.438h.438zM2.187 6.125H1.75v.438h.438zm1.75 0H3.5v.438h.438zM.874 4.375H.438v.438h.438zm.438 1.75H.875v.438h.438zm-.438.438H.438v.438h.438zM6.563 1.75v.875h-.438v.438h.438v1.75h.438V1.75zM5.688.875V.438H5.25v.875h.875V.875zM2.625.438H1.313v.438h1.313zm3.063 2.625H4.375v.438h1.313zM3.063 4.376H1.75v.438h1.313zm.438 2.188H2.188v.438h1.313zM3.063.875h-.438v.438h.438zm-1.75 0H.875v.438h.438z" fill="#000"/>
	<path d="M2.625.875H1.313v.438h1.313zm.438.438h-.438v.438h.438zm-1.313.875h-.437v.438h.438zm-.875.875H.438v.438h.438zm.438-1.75H.875v.438h.438z" fill="#f0f0f0"/>
	<path d="M6.125 5.25H4.812v.438h1.313zm-1.75-.438V3.5h-.437v.438H3.5v.438h.438v1.75h.438v-.875h.438v-.438zm2.188 0h-.438v.438h.438zM.875 1.313H.438v1.75h.438zm-.437 1.75H0v1.313h.438zm1.313 1.75h-.438v1.313h.438zm1.75 0h-.438v.875h.438zm-3.063 0H0v1.75h.438zM5.25 0H3.5v.438h1.75z" fill="#000"/>
	<path d="M3.5.875h-.437v.438h.438zM5.25.437H3.5v.438h1.75z" fill="#f0f0f0"/>
	<path d="M6.125 2.188H3.938v.438h2.188z" fill="#000"/>
	<path d="M6.125 1.75v-.437h-.438v.438H3.938v.438h2.188v.438h.438V1.75z" fill="#816bee"/>
	<path d="M2.188 4.813H1.75v.438h.438z" fill="#f0f0f0"/>
	<path d="M3.063 2.625v.438h-1.75v.438h2.188v-.876z" fill="#816bee"/>
	<path d="M3.063 3.063v.438h-1.75v.438h2.188v-.876z" fill="#000"/>
	<path d="M1.313 3.5H.875v.438h.438zm-.438.438H.438v.438h.438z" fill="#816bee"/>
	<path d="M1.313 3.938v.438H.875v.438H.438v1.75h.438v-.438h.438V4.813h.438v-.438h1.75v-.437z" fill="#9af4dc"/>
	<path d="M1.313 4.375H.875v.438h.438zm-.438.438H.438v.438h.438z" fill="#f0f0f0"/>
	<path d="M1.313 5.688H.875v.438h.438zm-.438.438H.438v.438h.438z" fill="#6c9ca6"/>
	<path d="M3.5 3.938H1.313v.438h2.188z" fill="#f0f0f0"/>
`;
function Sr(i = {}) {
  return x`<svg
		${ve(i)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${Er}
	</svg>`;
}
const Vr = pe`
	<path d="M6.125 2.188v-.875h-.438V.875h-.438V.438h-.875v.438h.438v.438h.438v1.75h-.438v.438h-.438v.438H2.625V3.5h-.437v-.437H1.75v-1.75h.438V.875h.438V.438H1.75v.438h-.437v.438H.875v.875H.438v2.625h.438v.875h.438v.438h.875v.438h2.625v-.438h.875v-.438h.438v-.875h.438V2.188z" fill="#b79cf8"/>
	<path d="M2.625 0H1.75v.438h.875zM.875 1.313H.438v.875h.438zm1.313 0H1.75v1.75h.438zm2.188 2.188H2.625v.438h1.75z" fill="#000"/>
	<path d="M4.375 3.938h-1.75v.438h1.75z" fill="#f0f0f0"/>
	<path d="M.438 2.188H0v2.625h.438zm4.375 4.375H2.188v.438h2.625z" fill="#000"/>
	<path d="M.875 4.375H.438v.438h.438zm4.813.875h-.875v.438H2.188V5.25h-.875v-.438H.875v.875h.438v.438h.875v.438h2.625v-.438h.875v-.438h.438v-.875h-.438zm.875-.875h-.438v.438h.438z" fill="#816bee"/>
	<path d="M1.75.438h-.437v.438h.438zm-.437.437H.875v.438h.438z" fill="#000"/>
	<path d="M2.625.438H1.75v.438h.875zM1.75.875h-.437v.438h.438zm-.437.438H.875v.438h.438zm-.438.875H.438v.438h.438zm.438.438H.875v.438h.438zm.875.438H1.75v.438h.438zm.438.438h-.438v.438h.438zm2.625-.438h-.438v.438h.438zM4.813.439h-.438v.438h.438zm0 3.063h-.438v.438h.438z" fill="#f0f0f0"/>
	<path d="M3.063.438h-.438v.438h.438zm-.438.437h-.437v.438h.438zm0 2.188h-.437v.438h.438zm-1.75 1.75H.438v.875h.438zm.438.875H.875v.438h.438zM5.251 0h-.875v.438h.875zm.438 6.125h-.875v.438h.875zm-3.5 0h-.876v.438h.875zm4.374-4.812h-.438v.875h.438zm-1.313 0h-.438v1.75h.438zM7 2.188h-.438v2.625H7zM5.687.438h-.438v.438h.438zm.438.438h-.438v.438h.438zM4.375.438h-.437v.438h.438zm.438.438h-.438v.438h.438zm0 2.188h-.438v.438h.438zm1.75 1.75h-.438v.875h.438zm-.438.875h-.438v.438h.438z" fill="#000"/>
	<path d="M2.188.875H1.75v.438h.438z" fill="#b79cf8"/>
`;
function Dr(i = {}) {
  return x`<svg
		${ve(i)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${Vr}
	</svg>`;
}
const Or = pe`
	<path d="M4.813 5.25v-.875h-.438v-.437h-1.75v.438h-.437v.875H1.75v1.313h3.5V5.251z" fill="#ffe361"/>
	<path d="M6.125 1.313V.875H5.25V.438h-3.5v.438H.875v.438H.438v2.625h.438v.438h.875v-.439h3.5v.438h.875v-.438h.438V1.313z" fill="#ff2c52"/>
	<path d="M5.25 0h-3.5v.438h3.5z" fill="#000"/>
	<path d="M5.25.438h-3.5v.438h3.5zm-3.5.437H.875v.438h.875zm4.375 0H5.25v.438h.875z" fill="#fff"/>
	<path d="M5.25 6.563h-3.5v.438h3.5zM.438 1.313H0v2.625h.438zM1.751.438H.875v.438h.875z" fill="#000"/>
	<path d="M.875 3.063v-1.75H.438v2.625h.875v-.875z" fill="#fff"/>
	<path d="M6.563 1.313h-.438v2.625h.438z" fill="#be0351"/>
	<path d="M6.563 2.625h-.875V3.5h.875zM5.25.875h-.875v.875h.875z" fill="#fff"/>
	<path opacity=".5" d="M6.563 2.625h-.438V3.5h.438z" fill="#be0351"/>
	<path d="M4.375 3.063h-1.75v.438h1.75zm.875.438h-.875v.438h.875zM2.625 3.5H1.75v.438h.875z" fill="#be0351"/>
	<path d="M2.625 4.375h-.437v.875h.438z" fill="#fff"/>
	<path d="M4.813 4.375h-.438v.875h.438zm0 .875v.875H1.75v.438h3.5V5.25z" fill="#ffb84b"/>
	<path d="M2.188 5.25H1.75v.875h.438z" fill="#fff"/>
	<path d="M1.75 3.938H.875v.438h.875zm4.375 0H5.25v.438h.875z" fill="#be0351"/>
	<path d="M3.5 2.625h-.875V3.5H3.5z" fill="#fff"/>
	<path opacity=".5" d="M3.5 3.063h-.875v.438H3.5z" fill="#be0351"/>
	<path d="M4.375 3.5h-1.75v.438h1.75z" fill="#000"/>
	<path d="M4.375 3.938h-1.75v.438h1.75z" fill="#fff"/>
	<path d="M.875.875H.438v.438h.438z" fill="#000"/>
	<path d="M2.188 1.313H1.75v.438h.438z" fill="#fff"/>
	<path d="M1.75 5.25h-.437v1.313h.438zm.438-.875h.438v-.437H1.75v.438H.875v.438h.875v.438h.438zM.875 3.938H.438v.438h.438zM7 1.313h-.438v2.625H7zM6.125.438H5.25v.438h.875zm.438.438h-.438v.438h.438zm-.438 3.5H5.25v-.438h-.875v.438h.438v.875h.438v1.313h.438V5.251h-.438v-.438h.875zh.438v-.438h-.438z" fill="#000"/>
`;
function Ir(i = {}) {
  return x`<svg
		${ve(i)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${Or}
	</svg>`;
}
const Ar = pe`
	<path d="M6.125 3.063v-.438H5.25v-.437h-.438V1.75h-.438V.875h-.436V.438h-.875v.438h-.438v.875h-.437v.438H1.75v.438H.875v.438H.438v.875h.438v.438h.875v.438h.438v.438h.438v.875h.438v.438h.875v-.438h.438v-.875h.438v-.438h.438v-.438h.875v-.44h.438v-.875z" fill="#47baff"/>
	<path d="M4.813 3.063h-.875v-.438h-.875v.438h-.875v.875h.875v.438h.875v-.438h.875z" fill="#b5e3ff"/>
	<path d="M1.313 0H.438v.438h.875zm.875.438h-.875v.438h.875zm-.438 1.75H.875v.438h.875zM.438.438H0v.875h.438z" fill="#000"/>
	<path d="M1.313.438H.438v.875h.438V.875h.438z" fill="#f0f0f0"/>
	<path d="M.438 3.063H0v.875h.438zM7.001.438h-.438v.875h.438zm-.438.875h-.438v.875h.438zm-5.688 0H.438v.875h.438zm1.75-.438h-.437v.875h.438zm2.188 0h-.438v.875h.438zM3.063.438h-.438v.438h.438z" fill="#000"/>
	<path d="M3.063.875h-.438v.438h.438zm.438.438h-.438v.438h.438zm-1.313.875H1.75v.438h.438zm-.875.437H.875v.438h.438zm-.438.438H.438v.438h.438z" fill="#f0f0f0"/>
	<path d="M1.313 6.563v-.438h.875V5.25H1.75v-.438H.875v.875H.438v.875z" fill="#b79cf8"/>
	<path d="M.875 5.688H.438v.438h.438z" fill="#f0f0f0"/>
	<path d="M2.188 1.75H1.75v.438h.438z" fill="#000"/>
	<path d="M2.188.875H.875v1.313h.875V1.75h.438zm3.938 1.313V.875H4.813v.875h.438v.438z" fill="#b79cf8"/>
	<path d="M2.188.875H1.75v.875h.438zm-.438.875h-.437v.438h.438zm4.375-.438h-.438v.875h.438zm.438-.438h-.438v.438h.438z" fill="#816bee"/>
	<path d="M5.688 6.563v-.438h-.875V5.25h.438v-.438h.875v.875h.438v.875z" fill="#b79cf8"/>
	<path d="M6.563 5.688h-.438v.438h.438zm-.438-.875h-.438v.438h.438z" fill="#816bee"/>
	<path d="M.875 2.625H.438v.438h.438zM7 3.063h-.438v.875H7zm-.438-.438h-.438v.438h.438zM4.374.437h-.436v.438h.438zm.875 1.313h-.438v.438h.438zM3.938 0h-.875v.438h.875z" fill="#000"/>
	<path d="M3.938.438h-.875v.438h.875zm0 2.625h-.875v.875h.875zM6.563.438h-.875v.438h.875zm-.875.438h-.875v.438h.875z" fill="#f0f0f0"/>
	<path d="M3.938 2.188h-.875v.438h.875zm0 2.188h-.875v.438h.875zM6.563.001h-.875v.438h.875zm-.875.438h-.875v.438h.875zm.438 1.75h-.875v.438h.875zM1.313 6.563H.438v.438h.875zm.875-.438h-.875v.438h.875zm-.438-1.75H.875v.438h.875zM.437 5.688H0v.875h.438zm6.563 0h-.438v.875H7zm-.438-.875h-.438v.875h.438zm-5.687 0H.438v.875h.438zm1.75.438h-.437v.875h.438zm2.188 0h-.438v.875h.438zm-1.75.875h-.438v.438h.438zm-.875-1.313H1.75v.438h.438z" fill="#000"/>
	<path d="M2.188 5.25H1.75v.875h.438zm-.438-.438h-.437v.438h.438z" fill="#816bee"/>
	<path d="M.875 3.938H.438v.438h.438zm1.313-.875H1.75v.875h.438zm.875-.438h-.875v.438h.875zm0 1.313h-.875v.438h.875zm2.188-.875h-.438v.875h.438zm-.438-.438h-.875v.438h.875zm0 1.313h-.875v.438h.875zm1.75 0h-.438v.438h.438z" fill="#000"/>
	<path d="M6.563 3.063h-.438v.875h.438zm-.438-.438h-.438v.438h.438zm0 1.313h-.438v.438h.438zm-.875 0h-.438v.438h.438zm-1.313.875h-.874v.438h.875zm.438-.438h-.437v.438h.438zm-1.313 0h-.437v.438h.438zm.875 1.75h-.874v.438h.875zm.438-.438h-.437v.438h.438zm-1.313 0h-.437v.438h.438zm-.874-1.749H1.75v.438h.438zM.875 3.5H.438v.438h.438zm.438.438H.875v.438h.438z" fill="#4282d8"/>
	<path d="M4.375 6.125h-.437v.438h.438zm.875-1.313h-.438v.438h.438zm-1.313 1.75h-.874V7h.875zm2.625 0h-.875V7h.875zm-.875-.438h-.875v.438h.875zm.438-1.75H5.25v.438h.875z" fill="#000"/>
`;
function Lr(i = {}) {
  return x`<svg
		${ve(i)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${Ar}
	</svg>`;
}
const Nr = pe`
	<path d="M3.938.438h-.875v1.75h.875zm.875 2.625v-.438h-.438v-.437h-1.75v.438h-.437v.438H.438v.875h1.75v.438h.438v.438h.438v1.75h.875v-1.75h.438v-.438h.438v-.439h1.75v-.875z" fill="#bcef42"/>
	<path d="M1.75 0h-.437v.438h.438zm.875 2.188h-.437v.438h.438zm2.188 0h-.438v.438h.438zM5.688 0H5.25v.438h.438zm.438.438h-.438v.438h.438zm.438.438h-.438v.438h.438zm.438.438h-.438v.438h.438zM3.938 0h-.875v.438h.875z" fill="#000"/>
	<path d="M3.938.438h-.875v.438h.875z" fill="#f0f0f0"/>
	<path d="M3.938 1.313h-.875v.438h.875zm0 .438h-.875v.438h.875z" fill="#7fb134"/>
	<path d="M3.938 5.25h-.875v.438h.875z" fill="#f0f0f0"/>
	<path d="M3.938 6.125h-.875v.438h.875zm0-1.313h-.875v.438h.875z" fill="#7fb134"/>
	<path d="M3.938 2.625h-.875v.438h.875zm0 1.313h-.875v.438h.875zm.438-.875h-.438v.875h.438z" fill="#000"/>
	<path d="M5.25 3.063h-.438v.875h.438z" fill="#7fb134"/>
	<path d="M3.063 3.063h-.438v.875h.438z" fill="#000"/>
	<path d="M2.625 2.625h-.437V3.5h.438z" fill="#f0f0f0"/>
	<path d="M1.313.438H.875v.438h.438z" fill="#000"/>
	<path d="M1.313.438v.438H.875v.438H.438v.438h1.313V.438z" fill="#6be473"/>
	<path d="M1.75.438h-.437v.438h.438zm-.437.437H.875v.438h.438z" fill="#f0f0f0"/>
	<path d="M1.75 1.313H.438v.438h1.313z" fill="#008456"/>
	<path d="M5.25 5.25v1.313h.438v-.438h.438v-.438h.438v-.438zm-4.812 0v.438h.438v.438h.438v.438h.438V5.251z" fill="#6be473"/>
	<path d="M1.75 5.25H.438v.438h1.313z" fill="#f0f0f0"/>
	<path d="M1.313 5.688v.875h.438v-.875z" fill="#008456"/>
	<path d="M6.125 1.313V.875h-.438V.438h-.438v1.313h1.313v-.438z" fill="#6be473"/>
	<path d="M5.688.438H5.25v.438h.438zm0 2.625H5.25v.438h.438z" fill="#f0f0f0"/>
	<path d="M6.563 3.5H5.25v.438h1.313z" fill="#7fb134"/>
	<path d="M6.563 1.313H5.25v.438h1.313z" fill="#008456"/>
	<path d="M.875.875H.438v.438h.438zM3.063.437h-.438v1.75h.438zm1.313 0h-.438v1.75h.438zm2.625 2.625h-.438v.875h.438zm-.438-.438h-1.75v.438h1.75zm0 1.313h-1.75v.438h1.75zM.438 3.063H0v.875h.438zm1.75-.438H.438v.438h1.75z" fill="#000"/>
	<path d="M1.75 3.063H.438v.875h.438V3.5h.875z" fill="#f0f0f0"/>
	<path d="M2.188 3.938H.438v.438h1.75zM.438 1.313H0v.438h.438zm1.313 5.25h-.438v.438h.438zm.875-2.188h-.438v.438h.438z" fill="#000"/>
	<path d="M1.75 3.5h-.437v.438h.438zm.438-.438H1.75v.875h.438z" fill="#7fb134"/>
	<path d="M2.188 3.063H1.75v.875h.438z" fill="#3f581a"/>
	<path d="M4.375 4.375h-1.75v.438h1.75z" fill="#7fb134"/>
	<path d="M4.375 2.188h-1.75v.438h1.75z" fill="#f0f0f0"/>
	<path d="M4.813 4.375h-.438v.438h.438z" fill="#000"/>
	<path d="M4.813 3.938h-.438v.438h.438z" fill="#7fb134"/>
	<path d="M5.688 6.563H5.25v.438h.438zm.438-.438h-.438v.438h.438zm.438-.438h-.438v.438h.438zm.438-.438h-.438v.438h.438zM3.939 6.562h-.876V7h.875zm-2.625-.438H.875v.438h.438zm-.438-.438H.438v.438h.438zm2.188-.875h-.439v1.75h.438zm1.313 0h-.439v1.75h.438zM1.75 1.75H.438v.438h1.75V.438H1.75zm3.5 0V.438h-.438v1.75h1.75V1.75z" fill="#000"/>
	<path d="M.438 4.813v.438h1.313v1.313h.438v-1.75zm4.375 0v1.75h.438V5.25h1.313v-.438zM.438 5.25H0v.438h.438z" fill="#000"/>
	<path d="M5.688 6.125H5.25v.438h.438zm.438-.438h-.438v.438h.438zm.438-.438h-.438v.438h.438z" fill="#008456"/>
	<path d="M5.688 5.25H5.25v.438h.438z" fill="#f0f0f0"/>
	<path d="M3.938 3.063h-.875v.875h.875z" fill="#7fb134"/>
	<path d="M3.938 1.75h-.875v.438h.875zm0 3.063h-.875v.438h.875zm1.313-1.75h-.438v.875h.438z" fill="#3f581a"/>
`;
function Pr(i = {}) {
  return x`<svg
		${ve(i)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${Nr}
	</svg>`;
}
const Br = pe`
	<path d="M4.813 4.375h.438v-.437h1.313V3.5H5.251v-.437h-.438V1.75h.875v-.437H4.375v.438H3.063v-.438h-.438V.875H1.75v.438h-.437v.438H.875v.438H.438v2.625h.438v.438h.438v.438h.438v-.875h1.75v.438h-.439v.438h.438v.438h.875v-.438h1.313v-.438h-.875z" fill="#54cfff"/>
	<path d="M3.938 4.813H3.5v.438h.438zm1.75.438H5.25v.438h.438zm.875-1.75h-.438v.438h.438zM5.25 3.063h-.438v.438h.438zM1.312 4.376H.875v.438h.438zm.438.438h-.437v.875h.438zm2.625.875H3.063v.438h1.313zm0-1.313h-.437v.438h.438z" fill="#4282D8"/>
	<path d="M3.938 0H3.5v.438h.438zm.438.438h-.438v.438h.438zm-.876 0H1.75v.438H3.5zM1.75.875h-.437v.438h.438zm1.313 0h-.438v.438h.438zm.438.438h-.438v.438h.438zm.875 0h-.438v.438h.438zM5.689.875H4.376v.438h1.313zm.438.438h-.438v.438h.438zm-4.814 0H.875v.438h.438zm-.438.437H.438v.438h.438zm-.437.438H0v2.625h.438zm.875.438H.875v1.75h.438zm.438-.438h-.438v.438h.438zm2.188-.438H1.75v.438h2.188z" fill="#000"/>
	<path d="M3.938 1.75H3.5v.875h.438zm1.75 0h-.875v.438h.875z" fill="#000"/>
	<path d="M5.25 1.75h-.438v1.313h.438zm1.313 1.313H5.25v.438h1.313zm.438.438h-.438v.438h.438zm-2.625-.875h-.438v1.75h.438zm2.188 1.313H5.251v.438h1.313zm-1.313.438h-.438v.875h.438z" fill="#000"/>
	<path d="M5.688 4.813h-.875v.438h.875zm.438.438h-.438v.438h.438zm-.438.438H4.375v.438h1.313zm-1.313.438h-1.75v.438h1.75zM3.5 4.814H1.75v.438H3.5zm-.875 1.75h-.437v.438h.438zm-.438-.438H1.75v.438h.438zm-.438-.438h-.436v.438h.438zm.438-.438H1.75v.438h.438zm.875 0h-.437v.438h.438zm-1.75 0H.875v.438h.438zm-.438-.438H.438v.438h.438zm.875-.438h-.436v.438h.438zm2.188 0H3.5v.438h.438z" fill="#000"/>
	<path d="M3.938 2.625H3.5v-.437H1.75v.438h-.437v1.75h.438v.438h1.75v-.438h.438z" fill="#9af4dc"/>
	<path d="M3.5 4.375H1.75v.438H3.5zm-1.75-.437h-.437v.438h.438zm2.188 0H3.5v.438h.438z" fill="#6c9ca6"/>
	<path d="M1.75 2.625h-.437v.438h.438zm.875.438h-.437v.438h.438zm.875-.875H1.75v.438H3.5z" fill="#f0f0f0"/>
	<path d="M3.5 5.688h-.437v.438h.438z" fill="#000"/>
	<path d="M.875 2.188H.438v.875h.438zm.875-.875h-.437v.438h.438zm.875-.438H1.75v.438h.875zm3.063.438H4.375v.438h1.313zM3.938.438H3.5v.438h-.437v.438h.438v.438h.438v-.439h.438V.875h-.439zM2.625 5.25h-.437v.438H1.75v.438h.438v.438h.438v-.438h.438v-.438h-.439z" fill="#f0f0f0"/>
`;
function Rr(i = {}) {
  return x`<svg
		${ve(i)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${Br}
	</svg>`;
}
const Ur = pe`
	<path d="M5.688 1.313V.875h-.875v.438h-.438V.875h-.437V.438h-.875v.438h-.438v.438h-.437V.875h-.875v.438H.875v1.75h.875v.438h.438v-.438h2.625v.438h.438v-.438h.875v-1.75z" fill="#d1cdd5"/>
	<path d="M6.125 3.938V3.5h-1.75v-.437h-1.75v.438H.875v.438H.438v1.313h.438v.438h1.75v.438h.438v.438h.875v-.438h.438V5.69h1.75v-.438h.438V3.938z" fill="#57595f"/>
	<path d="M3.938 0h-.875v.438h.875zm-.875.438h-.438v.438h.438zm1.313 0h-.438v.438h.438zm1.313 0h-.875v.438h.875zm.438.438h-.438v.438h.438zm-1.313 0h-.438v.438h.438zM2.625.875h-.437v.438h.438zM2.188.438h-.875v.438h.875zm-1.313.875H.438v1.75h.438zm.438-.438H.875v.438h.438zM.875 3.5H.438v.438h.438zm-.437.438H0v1.313h.438zm.438 1.313H.438v.438h.438zm1.75.438H.875v.438h1.75zm.438.438h-.439v.438h.438zm.875.438h-.876v.438h.875zm.438-.438h-.439v.438h.438zm1.75-.438h-1.75v.438h1.75zm.438-.438h-.438v.438h.438zm.438-1.313h-.438v1.313h.438zM6.565 3.5h-.438v.438h.438zm0-2.188h-.438v1.75h.438zM2.188 3.5H1.75v.438h.438zm.438-.438h-.438V3.5h.438zm1.75-.438H2.625v.438h1.75zm.438.438h-.438V3.5h.438zm.438.438h-.438v.438h.438zm.438-.438h-.438V3.5h.875v-.437zm-4.377.001H.875v.438h.875v-.438z" fill="#000"/>
	<path d="M.875 4.813H.438v.438h.438zm.438.438H.875v.438h.438zm1.75.438h-.438v.438h.438zm1.313 0h-.438v.438h.438zm-.438.438h-.875v.438h.875zm2.188-.875h-.438v.438h.438zm.438-1.313h-.438v1.313h.438z" fill="#35363a"/>
	<path d="M1.313 2.625H.875v.438h.438zm.875.438H1.75v.438h.438zm3.063 0h-.438v.438h.438zm-2.626-.438h-.437v.438h.438zm2.188 0h-.438v.438h.438z" fill="#847d8b"/>
	<path d="M5.25 3.063h-.438v.438h.438zm-.875-.875h-1.75v.438h1.75zm1.75-.438h-.438v1.313h.438z" fill="#847d8b"/>
	<path d="M1.75 1.75h-.437v.438h.438zm-.437-.437H.875v.438h.438zm.875-.438h-.875v.438h.875zm.875 0h-.438v.438h.438zm.875-.438h-.875v.438h.875zm.438.438h-.438v.438h.438zm1.313 0h-.875v.438h.875zm.438.438h-.438v.438h.438z" fill="#f0f0f0"/>
	<path d="M.875 3.938H.438v.438h.438zm.438-.438H.875v.438h.438zm1.313 0h-.438v.438h.438zm1.75-.438H2.625V3.5h1.75zm.875.875h-.438v.438h.438zm.875-.438h-.875v.438h.875z" fill="#d8d8d8"/>
`;
function Fr(i = {}) {
  return x`<svg
		${ve(i)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${Ur}
	</svg>`;
}
const Zr = pe`
	<path d="M6.125 1.75v-.437h-.438V.875h-.438V.438H2.625v.438H1.75v.438h-.437v.438H.875v.875H.438v2.188h.438v.438h.438v.438h.438v.438h.438v.438h2.188v-.438h.875v-.438h.438v-.438h.438v-.875h.438V1.75z" fill="#bcef42"/>
	<path d="M6.563.438h-.875v.438h.875z" fill="#f0f0f0"/>
	<path d="M1.313 5.688H.438v.438h.875z" fill="#bcef42"/>
	<path d="M1.75 6.125H.438v.438h1.313z" fill="#7fb134"/>
	<path d="M6.563 3.5h-.438v.875h.438z" fill="#816bee"/>
	<path d="M5.25.438H2.625v.438H5.25z" fill="#f0f0f0"/>
	<path d="M5.25.875H2.625v.438H5.25z" fill="#b79cf8"/>
	<path d="M4.375 6.125H2.188v.438h2.188z" fill="#816bee"/>
	<path d="M6.563.875h-.438v.438h.438z" fill="#bcef42"/>
	<path d="M2.625 2.188h-.437v.438h.438zM1.313 1.75H.875v.438h.438zm.438-.438h-.438v.438h.438z" fill="#f0f0f0"/>
	<path d="M2.625 1.313h-.437v.438h.438zm3.063 0H5.25v.438h.438z" fill="#b79cf8"/>
	<path d="M2.188.875H1.75v.438h.438zm.875 1.75h-.438v.438h.438zM.875 5.25H.438v.438h.438z" fill="#f0f0f0"/>
	<path d="M6.125 4.813h-.438v.438h.438zm-.438.438h-.438v.438h.438zm-.438.438h-.438v.438h.438z" fill="#816bee"/>
	<path d="M6.563.438v.875h-.438V.875h-.438v.438h.438v.438h.438v2.625h.438V.438zm-5.25.875H.875v.438h.438zm.438-.438h.875V.438H1.75zh-.438v.438h.438zm4.813 3.5h-.438v.875h.438zM.875 1.75H.438v.875h.438zM5.25 6.125h-.875v.438h.875zm.875-.875h-.438v.438h.438zm-4.812 0H.875v.438h.438zm.438.438h-.438v.438h.438zm-.875-.875H.438v.438h.438zm4.813.875h-.438v.438h.438zM.438 2.625H0v3.938h.438z" fill="#000"/>
	<path d="M5.25.875h.438V.438h.875V0H2.625v.438H5.25zM2.188 6.563v-.438H1.75v.438H.438v.438h3.938v-.438z" fill="#000"/>
	<path d="M.875 2.625H.438V3.5h.438z" fill="#f0f0f0"/>
	<path d="M4.375 2.625H3.5v.438h.875zm-.438 1.75h-.874v.438h.875zm.875-1.313h-.438v.875h.438zm-3.5 1.75h.875v-.438H1.75V2.188h-.437zm3.5-3.063H3.063v.438h1.75zm-.438 3.5H2.625v.438h1.75zm2.188-3.063h-.438v1.313h.438zM.875 3.5H.438v1.313h.438zm1.313-1.75H1.75v.438h.438zm1.313 1.313h-.438v.438h.438zm-.438.875h-.438v.438h.438zm-.438.875h-.437v.438h.438zm1.75-.875h-.437v.438h.438zm.438.875h-.438v.438h.438zm.438-.438h-.438v.438h.438zm-2.188-1.75v-.437h-.438v.438h-.437v1.313h.438V2.625zm3.063-.875h-.438v.438h.438zm-.875.438h-.438v.438h.438zm.438.438h-.438v1.75h.438zM1.313 4.813H.875v.438h.438zm.438.438h-.438v.438h.438zm.438.438H1.75v.438h.438z" fill="#b79cf8"/>
`;
function qr(i = {}) {
  return x`<svg
		${ve(i)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${Zr}
	</svg>`;
}
const Wr = pe`
	<path d="M6.125 1.75v-.437h-.438V.875h-.438V.438H1.75v.438h-.437v.438H.875v.438H.438v2.625h.438v.438h.438v.438h.438v.875h.438v.438h2.625v-.438h.438v-.875h.438v-.438h.438v-.438h.438V1.75z" fill="#d1cdd5"/>
	<path d="M1.75.438h-.437v.438h.438zm-.437.437H.875v.438h.438zm-.438.438H.438v.438h.438zm.875 3.938h-.437v.875h.438zm-.438-.438H.875v.438h.438zm.875 1.313H1.75v.438h.438zM.874 4.376H.438v.438h.438z" fill="#000"/>
	<path d="M1.75 4.813h-.437v.438h.438zm.438.875H1.75v.438h.438zm-.875-1.313H.875v.438h.438zm1.75-1.313H1.75v1.313h1.313z" fill="#847d8b"/>
	<path d="M3.063 3.5h-.875v.875h.875z" fill="#57595f"/>
	<path d="M5.25 3.063H3.938v1.313h1.313z" fill="#847d8b"/>
	<path d="M5.25 3.5h-.875v.875h.875z" fill="#57595f"/>
	<path d="M5.25 5.254h.438v-.438H5.25zm-.438.875h.438v-.438h-.438zm.875-1.313h.438v-.438h-.438z" fill="#847d8b"/>
	<path d="M.438 1.75H0v2.625h.438z" fill="#000"/>
	<path d="M.875 1.75H.438v2.625h.438z" fill="#fff"/>
	<path d="M5.25.879h.438V.441H5.25zm.438.438h.438V.879h-.438zm.438.438h.438v-.438h-.438zM5.251 6.13h.438v-.875h-.438zm.438-.875h.438v-.438h-.438zm-.875 1.313h.438V6.13h-.438zm1.313-1.75h.438V4.38h-.438zm.438-.438h.438V1.755h-.438z" fill="#000"/>
	<path d="M6.125 4.379h.438V1.754h-.438z" fill="#847d8b"/>
	<path d="M1.75 0v.438h3.5V0z" fill="#000"/>
	<path d="M1.75.875h-.437v.438h.438zm-.437.438H.875v.438h.438zm.438.438h-.438v.438h.438zm3.5-.433h.438V.88h-.438zm.438.438h.438v-.438h-.438zM1.75.438v.438h3.5V.438z" fill="#fff"/>
	<path d="M2.188 6.563v.438h2.625v-.438z" fill="#000"/>
	<path d="M2.188 6.125v.438h2.625v-.438z" fill="#847d8b"/>
	<path d="M3.063 5.688h-.438v.875h.438zm1.313 0h-.438v.875h.438z" fill="#57595f"/>
`;
function Yr(i = {}) {
  return x`<svg
		${ve(i)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${Wr}
	</svg>`;
}
const Qr = pe`
	<path d="M3.063 0H1.75v.438h1.313zm1.75.438h-1.75v.438h1.75zm-.875 2.187H3.5v1.75h.438zm-3.5-.437H0v2.625h.438zM6.563.875h-1.75v.438h1.75z" fill="#000"/>
	<path d="M3.063.438H1.75v.438h1.313zm1.75.438h-1.75v.438h1.75zm1.75.438h-1.75v.438h1.75z" fill="#f0f0f0"/>
	<path d="M3.063 6.563H1.75v.438h1.313z" fill="#000"/>
	<path d="M2.625 6.125v-.438h-.437v-.875H1.75V2.188h.438v-.875h.438V.875H1.75v.438H.875v1.75H.438v1.75h.438v.875h.438v.438h.438v.438h1.313v-.438z" fill="#ffe361"/>
	<path d="M3.063 6.125H1.75v.438h1.313z" fill="#ffb84b"/>
	<path d="M4.813 6.125h-1.75v.438h1.75z" fill="#000"/>
	<path d="M4.375 5.688V5.25h-.437v-.875H3.5v-1.75h.438V1.75h.438v-.437H3.063v.438h-.438v1.313h-.437v1.75h.438v.875h.438v.438h1.75v-.438z" fill="#ffe361"/>
	<path d="M6.563 5.688h-1.75v.438h1.75zM1.75.438h-.437v.438h.438zm-.437.437H.875v.438h.438zm-.438.438H.438v.875h.438zm6.125 0h-.438v.438H7zm-.438.438h-.438v.438h.438zm-.438.438h-.438v.875h.438zm.875 3.063h-.438v.438h.438zm-.438-.438h-.438v.438h.438zm-.438-.875h-.438v.875h.438zm-.438-.875h-.438v.875h.438zM1.747 6.127h-.434v.438h.438zm-.438-.438H.875v.438h.438zm-.438-.875H.438v.875h.438zm1.313-2.625H1.75v2.625h.438zM3.059.876h-.434v.438h.438zm-.434.437h-.437v.875h.438z" fill="#000"/>
	<path d="M.875 2.188H.438v.875h.438zm1.75 0h-.437v.875h.438z" fill="#f0f0f0"/>
	<path d="M2.188 1.313H1.75v.875h.438z" fill="#ffb84b"/>
	<path d="M4.813 1.313h-.438v.438h.438z" fill="#000"/>
	<path d="M1.75.875h-.437v.438h.438z" fill="#f0f0f0"/>
	<path d="M2.625.875h-.437v.438h.438zm1.313.875H3.5v.875h.438zm.438-.438h-.438v.438h.438zm-2.188 3.5H1.75v.438h.438zm-.438.875h-.437v.438h.438zm-.438-.875H.875v.875h.438zm2.188.875v-.438h-.437v-.438h-.438v.875h.438v.438h1.75v-.438zm.438-1.313H3.5v.438h.438z" fill="#ffb84b"/>
	<path d="M4.375 5.688V5.25h-.437v-.875H3.5v-1.75h.438V1.75h.438v-.437H3.063v.438h-.438v1.313h-.437v1.75h.438v.875h.438v.438h1.75v-.438z" fill="url(#a)"/>
	<path d="M6.125 5.25v-.438h-.438v-.874h-.438v-.875h.438v-.875h.438V1.75H4.812v.438h-.438v.438h-.436v1.75h.438v.875h.438v.438h1.75v-.438z" fill="#ff2c52"/>
	<path d="M5.688 2.188H5.25v.875h.438zm.438-.438h-.438v.438h.438zm-.438 2.188H5.25v.438h.438zM5.25 5.251v-.438h-.875v.438h.438v.438h1.75v-.438z" fill="#be0351"/>
	<path d="M1.313 1.313H.875v.438h.438zm0 1.75H.875v.438h.438zm1.75-1.75h-.438v.438h.438zm1.75.438h-.438v.438h.438zm-.438.875h-.437v.438h.438z" fill="#f0f0f0"/>
	<path d="M4.375 1.75h-.437v.875h.438zM3.062 5.688h-.437v.438h.438zm-.438-.875h-.436v.875h.438zm2.188.438h-.438v.438h.438zm-.438-.875h-.436v.875h.438z" fill="#000"/>
	<defs>
		<radialGradient id="a" cx=".75" cy=".5" r="1" fx=".75" fy=".5">
		<stop stop-color="#ff2c52" offset="30%"/>
		<stop stop-color="#ffe361" offset="70%"/>
		</radialGradient>
	</defs>
`;
function Gr(i = {}) {
  return x`<svg
		${ve(i)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${Qr}
	</svg>`;
}
const Jr = pe`
	<path d="M4.813.438v.438h-.438v.438h-.437v.438H3.5v.438h-.437v.875h-.438v.438H3.5v.875h.438v-.44h.875V3.5h.438v-.437h.438v-.438h.438v-.437h.438V.438z" fill="#d1cdd5"/>
	<path d="M1.313 3.938h.438v.438h.875v.875h.438v.438h.875v.438h.875v-.875h-.876v-.438H3.5v-.438h-.437v-.438h-.438V3.5h-.437v-.437H1.75v-.875H.875v.875h.438z" fill="#ffe361"/>
	<path d="M2.188 4.813h-.875v.875h.875zm-.875.875H.438v.875h.875z" fill="#ffe361"/>
	<path d="M4.813.438h-.438v.438h.438zm-.438.438h-.437v.438h.438zm-.437.437H3.5v.438h.438zM3.5 1.75h-.437v.438h.438zm-.437.438h-.438v.875h.438zm-.875 0H1.75v.875h.438zm-1.313 0H.438v.875h.438zm.438.875H.875v.875h.438zm3.5.875h-.875v.438h.875zm0 .875h-.875v.438h.875zm.438.438h-.438v.875h.438z" fill="#000"/>
	<path d="M6.563.438h-.438v1.75h.438z" fill="#847d8b"/>
	<path d="M.438 5.688H0v.875h.438zm4.375.438h-.875v.438h.875zm-.875-.438h-.875v.438h.875z" fill="#000"/>
	<path d="M2.188 5.25h-.875v.438h.875zm-.875.875H.438v.438h.875z" fill="#ffb84b"/>
	<path d="M1.313 6.125v.438h.438v-.438h.438v-.438h-.876zm1.313-.875v-.875H1.75v-.437h-.437v.875h.875v.875h.875V5.25zm-1.313 0v-.438H.875v.438H.438v.438h.875zm0 1.313H.438v.438h.875zM1.75 1.75H.875v.438h.875zm1.313 2.188v.438h.438V3.5h-.876v.438z" fill="#000"/>
	<path d="M5.688 1.313H5.25v.438h.438zm-.438.438h-.438v.438h.438zm-.438.438h-.438v.438h.438zm-.438.438h-.436v.438h.438zm-.436.436H3.5v.438h.438z" fill="#847d8b"/>
	<path d="M3.063 3.063h-.438v.438h.438z" fill="#f0f0f0"/>
	<path d="M1.75 3.5h-.437v.438h.438zm-.437-.875H.875v.438h.438zm.875 1.313H1.75v.438h.438zm.875.875h-.438v.438h.438zm.438.438h-.438v.438h.438zm.875.438h-.438v.438h.438z" fill="#ffb84b"/>
	<path d="M3.938 4.375H3.5v.438h.438zM2.625 3.063h-.437v.438h.438zm3.938-.875h-.438v.438h.438zm-.438.438h-.438v.438h.438zm-.438.438h-.438v.438h.438zm-.438.438h-.438v.438h.438zm-.438-3.5V.44h1.75v1.75h.438V0z" fill="#000"/>
	<path d="M4.813 5.25h-.438v.438h.438zm-.875-.438H3.5v.438h.438zM3.5 4.374h-.437v.438h.438zm-.437-.436h-.438v.438h.438zM2.625 3.5h-.437v.438h.438zm-.437-.437H1.75v.438h.438zM3.5 2.188h-.437v.438h1.313v-.438h-.438V1.75H3.5zM4.375.875v.438h-.437v.438h1.313v-.438h-.438V.875zm1.75-.438H4.812v.438h1.313z" fill="#f0f0f0"/>
	<path d="M6.125 2.188h-.438v.438h.438zm-.438.438h-.438v.438h.438zm-.438.438h-.438v.438h.438zm-.438.438h-.438v.438h.438zm-.873.436H3.5v.438h.438z" fill="#847d8b"/>
	<path d="M1.75 2.188h-.437v.438h.438zm0 2.625h-.437v.438h.438zm-.875.875H.438v.438h.438z" fill="#f0f0f0"/>
`;
function Xr(i = {}) {
  return x`<svg
		${ve(i)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${Jr}
	</svg>`;
}
const Kr = pe`
	<path d="M5.688 2.625v-.437H5.25V1.75h-.438v-.437h-.438V.875h-.436V.438h-.875v.438h-.438v.438h-.437v.438H1.75v.438h-.437v.438H.875v.875H.438v2.188h.438v.438h.875v.438h3.5v-.438h.875v-.438h.438V3.5h-.438v-.875z" fill="#0abbff"/>
	<path d="M3.063 0v.438h.875V0zm-.438.438v.438h.438V.438zm1.313 0v.438h.438V.438zm.438.438v.438h.438V.875zm.438.438v.438h.438v-.439zm.438.438v.438h.438v-.44zm.438.438v.438h.438v-.44zm.438.438v.875h.438v-.878zm-5.69-.003V3.5h.438v-.875zM0 3.5v2.188h.438V3.5zm6.563 0v2.188h.438V3.5zM2.188.875v.438h.438V.875zm-.438.438v.438h.438v-.438zm-.437.437v.438h.438V1.75zm-.438.438v.438h.438v-.438zm-.438 3.5v.438h.438v-.438zm5.688 0v.438h.438v-.438zm-4.375.875v.438h3.5v-.438z" fill="#000"/>
	<path d="M1.75 6.125v.438h3.5v-.438z" fill="#4282d8"/>
	<path d="M.875 6.125v.438h.875v-.438zm5.25.438v-.438H5.25v.438z" fill="#000"/>
	<path d="M3.063.438v.438h.875V.438z" fill="#fff"/>
	<path opacity=".5" d="M4.813 3.5v-.437h-.438v-.438h-.437v-.437h-.875v.438h-.438v.438h-.437v.438H1.75v1.313h.438v.438h2.625v-.438h.438V3.5z" fill="#fff"/>
	<path d="M2.625.875v.438h.438V.875zm-.437.438v.438h.438v-.438zm.438.438v.438h.438V1.75zM1.75 1.75v.438h.438V1.75zm-.437.438v.438h.438v-.438zm-.438.437V3.5h.438v-.875zM.438 3.5v.875h.438V3.5z" fill="#fff"/>
	<path d="M5.25 2.188v.438h.438v-.438zm.438.438v.875h.438v-.876zm.438.875v1.75h-.438v.438H5.25v.438h.875v-.438h.438V3.5zM.875 6.125h.875v-.438H.875z" fill="#4282d8"/>
`;
function eo(i = {}) {
  return x`<svg
		${ve(i)}
		aria-hidden="true"
		role="img"
		width="14"
		height="14"
		viewBox="0 0 7 7"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		${Kr}
	</svg>`;
}
let to = globalThis.$discordMessage ?? {};
function xi() {
  return to;
}
const ta = {
  blue: "https://cdn.discordapp.com/embed/avatars/0.png",
  gray: "https://cdn.discordapp.com/embed/avatars/1.png",
  green: "https://cdn.discordapp.com/embed/avatars/2.png",
  orange: "https://cdn.discordapp.com/embed/avatars/3.png",
  red: "https://cdn.discordapp.com/embed/avatars/4.png",
  pink: "https://cdn.discordapp.com/embed/avatars/5.png"
}, ca = xi().avatars ?? {}, wt = Object.assign(ta, ca, {
  default: ta[ca.default] ?? ca.default ?? ta.blue
}), wi = xi().profiles ?? {}, io = xi().defaultTheme === "light" ? "light" : "dark", ao = xi().defaultMode === "compact" ? "compact" : "cozy", so = xi().defaultBackground === "none" ? "none" : "discord", ro = /* @__PURE__ */ new Map([
  ["heart", kr()],
  ["crystal", fr()],
  ["diamond", vr()],
  ["explosion", _r()],
  ["flame", yr()],
  ["flower", wr()],
  ["key", $r()],
  ["leaf", Cr()],
  ["lightning", Hr()],
  ["magic", Sr()],
  ["moon", Dr()],
  ["mushroom", Ir()],
  ["mythical", Lr()],
  ["ornament", Pr()],
  ["plasma", Rr()],
  ["rock", Fr()],
  ["shell", qr()],
  ["skull", Yr()],
  ["sun", Gr()],
  ["sword", Xr()],
  ["water", eo()]
]), oo = pe`
	<path
		fill="currentColor"
		d="M18.91 12.98a5.45 5.45 0 0 1 2.18 6.2c-.1.33-.09.68.1.96l.83 1.32a1 1 0 0 1-.84 1.54h-5.5A5.6 5.6 0 0 1 10 17.5a5.6 5.6 0 0 1 5.68-5.5c1.2 0 2.32.36 3.23.98Z"
	/>
	<path
		fill="currentColor"
		d="M19.24 10.86c.32.16.72-.02.74-.38L20 10c0-4.42-4.03-8-9-8s-9 3.58-9 8c0 1.5.47 2.91 1.28 4.11.14.21.12.49-.06.67l-1.51 1.51A1 1 0 0 0 2.4 18h5.1a.5.5 0 0 0 .49-.5c0-4.2 3.5-7.5 7.68-7.5 1.28 0 2.5.3 3.56.86Z"
	/>
`;
function hs(i = {}) {
  return x`<svg
		${ve(i)}
		class="discord-mention-icon"
		aria-hidden="false"
		width="24"
		height="24"
		viewBox="0 0 20 20"
		xmlns="http://www.w3.org/2000/svg"
	>
		${oo}
	</svg>`;
}
const lo = pe`
	<path
		fill="currentColor"
		fill-rule="evenodd"
		clip-rule="evenodd"
		d="M10.99 3.16A1 1 0 1 0 9 2.84L8.15 8H4a1 1 0 0 0 0 2h3.82l-.67 4H3a1 1 0 1 0 0 2h3.82l-.8 4.84a1 1 0 0 0 1.97.32L8.85 16h4.97l-.8 4.84a1 1 0 0 0 1.97.32l.86-5.16H20a1 1 0 1 0 0-2h-3.82l.67-4H21a1 1 0 1 0 0-2h-3.82l.8-4.84a1 1 0 1 0-1.97-.32L15.15 8h-4.97l.8-4.84ZM14.15 14l.67-4H9.85l-.67 4h4.97Z"
	/>
`;
function ds(i = {}) {
  return x`<svg
		${ve(i)}
		class="discord-mention-icon"
		aria-hidden="false"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		${lo}
	</svg>`;
}
const no = pe`
	<path
		fill="currentColor"
		d="M12 2.81a1 1 0 0 1 0-1.41l.36-.36a1 1 0 0 1 1.41 0l9.2 9.2a1 1 0 0 1 0 1.4l-.7.7a1 1 0 0 1-1.3.13l-9.54-6.72a1 1 0 0 1-.08-1.58l1-1L12 2.8ZM12 21.2a1 1 0 0 1 0 1.41l-.35.35a1 1 0 0 1-1.41 0l-9.2-9.19a1 1 0 0 1 0-1.41l.7-.7a1 1 0 0 1 1.3-.12l9.54 6.72a1 1 0 0 1 .07 1.58l-1 1 .35.36ZM15.66 16.8a1 1 0 0 1-1.38.28l-8.49-5.66A1 1 0 1 1 6.9 9.76l8.49 5.65a1 1 0 0 1 .27 1.39ZM17.1 14.25a1 1 0 1 0 1.11-1.66L9.73 6.93a1 1 0 0 0-1.11 1.66l8.49 5.66Z"
	/>
`;
function ms(i = {}) {
  return x`<svg
		${ve(i)}
		class="discord-mention-icon"
		aria-hidden="false"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		${no}
	</svg>`;
}
const co = pe`
	<path
		fill="currentColor"
		fill-rule="evenodd"
		clip-rule="evenodd"
		d="M6 9h1V6a5 5 0 0 1 10 0v3h1a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3Zm9-3v3H9V6a3 3 0 1 1 6 0Zm-1 8a2 2 0 0 1-1 1.73V18a1 1 0 1 1-2 0v-2.27A2 2 0 1 1 14 14Z"
	/>
`;
function us(i = {}) {
  return x`<svg
		${ve(i)}
		class="discord-mention-icon"
		aria-hidden="false"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		${co}
	</svg>`;
}
const ho = pe`
	<path
		fill="currentColor"
		d="M12 3a1 1 0 0 0-1-1h-.06a1 1 0 0 0-.74.32L5.92 7H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2.92l4.28 4.68a1 1 0 0 0 .74.32H11a1 1 0 0 0 1-1V3ZM15.1 20.75c-.58.14-1.1-.33-1.1-.92v-.03c0-.5.37-.92.85-1.05a7 7 0 0 0 0-13.5A1.11 1.11 0 0 1 14 4.2v-.03c0-.6.52-1.06 1.1-.92a9 9 0 0 1 0 17.5Z"
	/>
	<path
		fill="currentColor"
		d="M15.16 16.51c-.57.28-1.16-.2-1.16-.83v-.14c0-.43.28-.8.63-1.02a3 3 0 0 0 0-5.04c-.35-.23-.63-.6-.63-1.02v-.14c0-.63.59-1.1 1.16-.83a5 5 0 0 1 0 9.02Z"
	/>
`;
function fs(i = {}) {
  return x`<svg
		${ve(i)}
		class="discord-mention-icon"
		aria-hidden="false"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		${ho}
	</svg>`;
}
var mi = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
}, Ct = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
};
const Oe = "light-theme", Jt = "compact-mode", ps = "no-background";
(() => {
  var M, C, I, E, V, H;
  let i = [Me("discord-messages")], t, a = [], e, s = we, m, n = [], c = [], v, u = [], l = [], r, _ = [], p = [], f, d = [], o = [], h, F = [], K = [];
  return M = class extends s {
    constructor() {
      super(...arguments);
      y(this, C, Ct(this, n, !1));
      y(this, I, (Ct(this, c), Ct(this, u, !1)));
      y(this, E, (Ct(this, l), Ct(this, _, !1)));
      y(this, V, (Ct(this, p), Ct(this, d, void 0)));
      y(this, H, (Ct(this, o), Ct(this, F, void 0)));
      Ct(this, K);
    }
    /**
     * Whether to use light theme or not.
     */
    get lightTheme() {
      return b(this, C);
    }
    set lightTheme(k) {
      z(this, C, k);
    }
    /**
     * Whether to exclude the background or not.
     */
    get noBackground() {
      return b(this, I);
    }
    set noBackground(k) {
      z(this, I, k);
    }
    /**
     * Whether to use compact mode or not.
     */
    get compactMode() {
      return b(this, E);
    }
    set compactMode(k) {
      z(this, E, k);
    }
    /**
     * The type of channel this should be, this will be displayed above the message and only applies if {@link DiscordMessages.channelName} is set.
     * Valid values are: `text`, `forum`, `locked`, `thread`, and `voice`.
     */
    get channelType() {
      return b(this, V);
    }
    set channelType(k) {
      z(this, V, k);
    }
    /**
     * The name of the channel, this will be displayed above the message and only applies if {@link DiscordMessages.channelType} is set.
     */
    get channelName() {
      return b(this, H);
    }
    set channelName(k) {
      z(this, H, k);
    }
    connectedCallback() {
      super.connectedCallback(), (this.lightTheme || io === "light" && this.lightTheme) && (this.lightTheme = !0), (this.compactMode || ao === "compact" && this.compactMode) && (this.compactMode = !0), (this.noBackground || so === "none" && this.noBackground) && (this.noBackground = !0);
    }
    render() {
      let k;
      switch (this.channelType) {
        case "text":
          k = x`${ds()}`;
          break;
        case "voice":
          k = x`${fs()}`;
          break;
        case "locked":
          k = x`${us()}`;
          break;
        case "thread":
          k = x`${ms()}`;
          break;
        case "forum":
          k = x`${hs()}`;
          break;
      }
      return x`
			${J(this.channelType && this.channelName, () => x`<div class="discord-channel-header">
						<div class="discord-channel-icon">${k}</div>
						<div class="discord-channel-name">${this.channelName}</div>
					</div>`)}
			<slot></slot>
		`;
    }
  }, C = new WeakMap(), I = new WeakMap(), E = new WeakMap(), V = new WeakMap(), H = new WeakMap(), e = M, (() => {
    const k = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    m = [ci({ context: Oe }), w({ type: Boolean, reflect: !0, attribute: "light-theme" })], v = [ci({ context: ps }), w({ type: Boolean, reflect: !0, attribute: "no-background" })], r = [ci({ context: Jt }), w({ type: Boolean, reflect: !0, attribute: "compact-mode" })], f = [w({ reflect: !0, attribute: "channel-type" })], h = [w({ reflect: !0, attribute: "channel-name" })], mi(M, null, m, { kind: "accessor", name: "lightTheme", static: !1, private: !1, access: { has: (g) => "lightTheme" in g, get: (g) => g.lightTheme, set: (g, N) => {
      g.lightTheme = N;
    } }, metadata: k }, n, c), mi(M, null, v, { kind: "accessor", name: "noBackground", static: !1, private: !1, access: { has: (g) => "noBackground" in g, get: (g) => g.noBackground, set: (g, N) => {
      g.noBackground = N;
    } }, metadata: k }, u, l), mi(M, null, r, { kind: "accessor", name: "compactMode", static: !1, private: !1, access: { has: (g) => "compactMode" in g, get: (g) => g.compactMode, set: (g, N) => {
      g.compactMode = N;
    } }, metadata: k }, _, p), mi(M, null, f, { kind: "accessor", name: "channelType", static: !1, private: !1, access: { has: (g) => "channelType" in g, get: (g) => g.channelType, set: (g, N) => {
      g.channelType = N;
    } }, metadata: k }, d, o), mi(M, null, h, { kind: "accessor", name: "channelName", static: !1, private: !1, access: { has: (g) => "channelName" in g, get: (g) => g.channelName, set: (g, N) => {
      g.channelName = N;
    } }, metadata: k }, F, K), mi(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: k }, null, a), e = t.value, k && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: k });
  })(), /**
   * @internal
   */
  me(M, "styles", ke`
		:host {
			color: #fff;
			background-color: #36393e;
			display: block;
			font-size: 16px;
			font-family: 'gg sans', 'Noto Sans', Whitney, 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;
			line-height: 170%;
			border: 1px solid rgba(255, 255, 255, 0.05);
		}

		:host([light-theme]) {
			color: #747f8d;
			background-color: #fff;
			border-color: #dedede;
		}

		:host([no-background]) {
			background-color: unset;
		}

		::slotted(*) {
			padding-top: 0.125rem;
			padding-bottom: 0.125rem;
		}

		::slotted(*:first-child) {
			margin-top: 0.5rem;
		}

		::slotted(*:not(:first-child)) {
			margin-top: 1.0625rem;
		}

		:host([compact-mode]) ::slotted(*:not(:first-child)) {
			margin-top: unset;
		}

		::slotted(*:last-child) {
			margin-bottom: 0.5rem;
			border-bottom-width: 0;
		}

		:host .discord-channel-header {
			display: flex;
			align-items: center;
			padding: 0.5rem 1rem;
			box-shadow:
				0 2px 0 0 rgba(0, 0, 0, 0.05),
				0 1.5px 0 0 rgba(0, 0, 0, 0.05),
				0 1px 0 0 rgba(0, 0, 0, 0.16);
		}

		:host .discord-channel-icon {
			height: 24px;
			width: auto;
			margin: 0 8px;
			position: relative;
			flex: 0 0 auto;
			color: #80848e;
		}

		:host([light-theme]) .discord-channel-icon {
			color: #6d6f78;
		}

		:host .discord-channel-name {
			margin: 0 8px 0 0;
			flex: 0 0 auto;
			min-width: auto;
		}
	`), Ct(e, a), e;
})();
var ui = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
}, jt = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
};
(() => {
  var M, C, I, E, V, H;
  let i = [Me("discord-link")], t, a = [], e, s = we, m, n = [], c = [], v, u = [], l = [], r, _ = [], p = [], f, d = [], o = [], h, F = [], K = [];
  return M = class extends s {
    constructor() {
      super(...arguments);
      y(this, C, jt(this, n, !1));
      y(this, I, (jt(this, c), jt(this, u, void 0)));
      y(this, E, (jt(this, l), jt(this, _, void 0)));
      y(this, V, (jt(this, p), jt(this, d, void 0)));
      y(this, H, (jt(this, o), jt(this, F, void 0)));
      jt(this, K);
    }
    get lightTheme() {
      return b(this, C);
    }
    set lightTheme(k) {
      z(this, C, k);
    }
    /**
     * The URL to link
     *
     * @example
     * ```ts
     * 'https://example.com/example.txt'
     * ```
     */
    get href() {
      return b(this, I);
    }
    set href(k) {
      z(this, I, k);
    }
    /**
     * The `<a>` tag {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#rel | `rel`}
     */
    get rel() {
      return b(this, E);
    }
    set rel(k) {
      z(this, E, k);
    }
    /**
     * The `<a>` tag {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#target | `target`}
     */
    get target() {
      return b(this, V);
    }
    set target(k) {
      z(this, V, k);
    }
    /**
     * The `<a>` tag {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#type | `type`}
     */
    get type() {
      return b(this, H);
    }
    set type(k) {
      z(this, H, k);
    }
    render() {
      return x`<a
			href=${de(this.href)}
			rel=${de(this.rel)}
			target=${de(this.target)}
			type=${de(this.type)}
			class=${Le({ "discord-link-light-theme": this.lightTheme })}
			><slot></slot
		></a>`;
    }
  }, C = new WeakMap(), I = new WeakMap(), E = new WeakMap(), V = new WeakMap(), H = new WeakMap(), e = M, (() => {
    const k = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    m = [He({ context: Oe, subscribe: !0 }), w({ type: Boolean, reflect: !0, attribute: "light-theme" })], v = [w()], r = [w()], f = [w()], h = [w()], ui(M, null, m, { kind: "accessor", name: "lightTheme", static: !1, private: !1, access: { has: (g) => "lightTheme" in g, get: (g) => g.lightTheme, set: (g, N) => {
      g.lightTheme = N;
    } }, metadata: k }, n, c), ui(M, null, v, { kind: "accessor", name: "href", static: !1, private: !1, access: { has: (g) => "href" in g, get: (g) => g.href, set: (g, N) => {
      g.href = N;
    } }, metadata: k }, u, l), ui(M, null, r, { kind: "accessor", name: "rel", static: !1, private: !1, access: { has: (g) => "rel" in g, get: (g) => g.rel, set: (g, N) => {
      g.rel = N;
    } }, metadata: k }, _, p), ui(M, null, f, { kind: "accessor", name: "target", static: !1, private: !1, access: { has: (g) => "target" in g, get: (g) => g.target, set: (g, N) => {
      g.target = N;
    } }, metadata: k }, d, o), ui(M, null, h, { kind: "accessor", name: "type", static: !1, private: !1, access: { has: (g) => "type" in g, get: (g) => g.type, set: (g, N) => {
      g.type = N;
    } }, metadata: k }, F, K), ui(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: k }, null, a), e = t.value, k && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: k });
  })(), /**
   * @internal
   */
  me(M, "styles", ke`
		a {
			color: #00aff4;
			text-decoration: none;
		}

		a:hover {
			text-decoration: underline;
		}

		.discord-link-light-theme a {
			color: #00b0f4;
		}
	`), jt(e, a), e;
})();
const mo = pe`
	<path
		fill="currentColor"
		d="M12 2a1 1 0 0 1 1 1v10.59l3.3-3.3a1 1 0 1 1 1.4 1.42l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 1 1 1.4-1.42l3.3 3.3V3a1 1 0 0 1 1-1ZM3 20a1 1 0 1 0 0 2h18a1 1 0 1 0 0-2H3Z"
	/>
`;
function $a(i = {}) {
  return x`<svg
		${ve(i)}
		class="discord-icon-download"
		aria-hidden="true"
		role="img"
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		fill="none"
		viewBox="0 0 24 24"
	>
		${mo}
	</svg>`;
}
const uo = pe`
	<path fill="currentColor" d="M6 4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H6ZM15 4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-3Z"></path>
`;
function vs(i = {}) {
  return x`<svg ${ve(i)} aria-hidden="true" role="img" width="16" height="16" fill="none" viewBox="0 0 24 24">${uo}</svg>`;
}
const fo = pe`
	<path fill="currentColor" d="M9.25 3.35C7.87 2.45 6 3.38 6 4.96v14.08c0 1.58 1.87 2.5 3.25 1.61l10.85-7.04a1.9 1.9 0 0 0 0-3.22L9.25 3.35Z"></path>
`;
function gs(i = {}) {
  return x`<svg ${ve(i)} aria-hidden="true" role="img" width="16" height="16" fill="none" viewBox="0 0 24 24">${fo}</svg>`;
}
const po = pe`
	<path fill="currentColor" d="M12,5 L12,1 L7,6 L12,11 L12,7 C15.31,7 18,9.69 18,13 C18,16.31 15.31,19 12,19 C8.69,19 6,16.31 6,13 L4,13 C4,17.42 7.58,21 12,21 C16.42,21 20,17.42 20,13 C20,8.58 16.42,5 12,5 L12,5 Z"></path>
`;
function _s(i = {}) {
  return x`<svg ${ve(i)} aria-hidden="true" role="img" width="16" height="16" fill="none" viewBox="0 0 24 24">${po}</svg>`;
}
const vo = pe`
	<path fill="currentColor" d="M12 3a1 1 0 0 0-1-1h-.06a1 1 0 0 0-.74.32L5.92 7H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2.92l4.28 4.68a1 1 0 0 0 .74.32H11a1 1 0 0 0 1-1V3ZM15.1 20.75c-.58.14-1.1-.33-1.1-.92v-.03c0-.5.37-.92.85-1.05a7 7 0 0 0 0-13.5A1.11 1.11 0 0 1 14 4.2v-.03c0-.6.52-1.06 1.1-.92a9 9 0 0 1 0 17.5Z"></path>
	<path fill="currentColor" d="M15.16 16.51c-.57.28-1.16-.2-1.16-.83v-.14c0-.43.28-.8.63-1.02a3 3 0 0 0 0-5.04c-.35-.23-.63-.6-.63-1.02v-.14c0-.63.59-1.1 1.16-.83a5 5 0 0 1 0 9.02Z"></path>
`;
function bs(i = {}) {
  return x`<svg ${ve(i)} aria-hidden="true" role="img" width="24" height="24" fill="none" viewBox="0 0 24 24">${vo}</svg>`;
}
const go = pe`
	<path fill="currentColor" d="M12 3a1 1 0 0 0-1-1h-.06a1 1 0 0 0-.74.32L5.92 7H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2.92l4.28 4.68a1 1 0 0 0 .74.32H11a1 1 0 0 0 1-1V3ZM15.18 15.36c-.55.35-1.18-.12-1.18-.78v-.27c0-.36.2-.67.45-.93a2 2 0 0 0 0-2.76c-.24-.26-.45-.57-.45-.93v-.27c0-.66.63-1.13 1.18-.78a4 4 0 0 1 0 6.72Z"></path>
`;
function ys(i = {}) {
  return x`<svg ${ve(i)} aria-hidden="true" role="img" width="24" height="24" fill="none" viewBox="0 0 24 24">${go}</svg>`;
}
const _o = pe`
	<path fill="currentColor" d="M12 3a1 1 0 0 0-1-1h-.06a1 1 0 0 0-.74.32L5.92 7H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2.92l4.28 4.68a1 1 0 0 0 .74.32H11a1 1 0 0 0 1-1V3ZM22.7 8.3a1 1 0 0 0-1.4 0L19 10.58l-2.3-2.3a1 1 0 1 0-1.4 1.42L17.58 12l-2.3 2.3a1 1 0 0 0 1.42 1.4L19 13.42l2.3 2.3a1 1 0 0 0 1.4-1.42L20.42 12l2.3-2.3a1 1 0 0 0 0-1.4Z"></path>
`;
function zs(i = {}) {
  return x`<svg ${ve(i)} aria-hidden="true" role="img" width="24" height="24" fill="none" viewBox="0 0 24 24">${_o}</svg>`;
}
var fi = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
}, Ht = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
};
(() => {
  var M, C, I, E, V, H;
  let i = [Me("discord-audio-attachment")], t, a = [], e, s = ls, m, n = [], c = [], v, u = [], l = [], r, _ = [], p = [], f, d = [], o = [], h, F = [], K = [];
  return M = class extends s {
    constructor() {
      super(...arguments);
      y(this, C, Ht(this, n, void 0));
      y(this, I, (Ht(this, c), Ht(this, u, void 0)));
      y(this, E, (Ht(this, l), Ht(this, _, void 0)));
      y(this, V, (Ht(this, p), Ht(this, d, void 0)));
      y(this, H, (Ht(this, o), Ht(this, F, !1)));
      Ht(this, K);
    }
    /**
     * The URL to audio file
     *
     * @example
     * ```ts
     * 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3'
     * ```
     */
    get href() {
      return b(this, C);
    }
    set href(k) {
      z(this, C, k);
    }
    /**
     * The name of the audio file
     *
     * @remarks Spaces will be replaced with underscores and any non-alphanumeric characters will be removed
     */
    get name() {
      return b(this, I);
    }
    set name(k) {
      z(this, I, k);
    }
    /**
     * The size of the audio file in bytes
     *
     * @remarks The unit is not automatically calculated,
     * you should provide it manually through {@link DiscordAudioAttachment.bytesUnit | `bytesUnit`}
     * @example
     * ```ts
     * 1024
     * ```
     */
    get bytes() {
      return b(this, E);
    }
    set bytes(k) {
      z(this, E, k);
    }
    /**
     * The unit of the audio file in a human-readable format
     *
     * @example
     * ```ts
     * 'KB'
     * ```
     */
    get bytesUnit() {
      return b(this, V);
    }
    set bytesUnit(k) {
      z(this, V, k);
    }
    get lightTheme() {
      return b(this, H);
    }
    set lightTheme(k) {
      z(this, H, k);
    }
    render() {
      const k = this.name?.replaceAll(/\s/g, "_")?.replaceAll(/[^\w-]/g, "");
      return x`<div class="discord-media-attachment-non-visual-media-item-container">
			<div class="discord-audio-attachment-non-visual-media-item">
				<div class="discord-media-attachment-mosaic-item-media">
					<div
						class=${Le({ "discord-audio-attachment-wrapper-audio": !0, "discord-audio-attachment-light-theme": this.lightTheme })}
					>
						<div class="discord-audio-attachment-audio-metadata">
							<div class="discord-audio-attachment-audio-metadata-content">
								<discord-link
									href=${de(this.href)}
									ref="noreferrer noopener"
									target="_blank"
									role="button"
									aria-label="Download"
								>
									${k}
								</discord-link>
								<div class="discord-audio-attachment-audio-metadata-size">
									${this.bytes}${J(this.bytesUnit, () => x` ${this.bytesUnit}`, () => null)}
								</div>
							</div>
						</div>
						<audio
							${Lt(this.mediaComponentRef)}
							class="discord-audio-attachment-audio-element"
							preload="metadata"
							@progress=${this.displayBufferedAmount}
							@ended=${this.handleEnded}
						>
							<source src=${de(this.href)} />
						</audio>
						<div class="discord-media-attachment-controls" style="transform: translateY(0%)">
							<div
								class="discord-media-attachment-video-button"
								tabindex="0"
								aria-label="${this.isPlaying ? "Pause" : "Play"}"
								role="button"
								@click=${this.handleClickPlayPauseIcon}
								@keydown=${this.handleSpaceToPlayPause}
							>
								${J(this.hasEnded, () => _s({ class: "discord-media-attachment-control-icon" }), () => J(this.isPlaying, () => vs({ class: "discord-media-attachment-control-icon" }), () => gs({ class: "discord-media-attachment-control-icon" })))}
							</div>
							<div class="discord-media-attachment-duration-time-wrapper">
								<span role="status" class="discord-media-attachment-duration-time-display">${this.currentPlaybackPosition}</span>
								<span
									role="separator"
									class="discord-media-attachment-duration-time-display discord-media-attachment-duration-time-separator"
									>/</span
								>
								<span class="discord-media-attachment-duration-time-display">${this.totalMediaDuration}</span>
							</div>
							<div class="discord-media-attachment-horizontal">
								<div class="discord-media-attachment-media-bar-interaction">
									<input
										type="range"
										${Lt(this.seekSliderRef)}
										class="discord-media-attachment-playback-control"
										@input=${this.handleSeekSliderInput}
										@change=${this.handleSeekSliderChange}
										max="100"
										value="0"
									/>
								</div>
							</div>
							<div class="discord-media-attachment-flex">
								<div class="discord-media-attachment-flex-container">
									<div ${Lt(this.volumeControlRef)} class="discord-media-attachment-button-slider">
										<div
											class="discord-media-attachment-volume-vertical"
											@mouseenter=${this.handleVolumeVerticalEnter}
											@mouseleave=${this.handleVolumeVerticalLeave}
										>
											<input
												${Lt(this.volumeControlInputRef)}
												type="range"
												class="discord-media-attachment-volume-slider"
												@input=${this.handleVolumeSliderInput}
												max="100"
												value="100"
											/>
										</div>
									</div>
									<button
										aria-label="Control volume"
										type="button"
										class="discord-media-attachment-button"
										@focus=${this.handleVolumeVerticalFocus}
										@blur=${this.handleVolumeVerticalBlur}
										@mouseover=${this.handleVolumeVerticalEnter}
										@mouseout=${this.handleVolumeVerticalLeave}
										@click=${this.handleClickMuteIcon}
									>
										<div class="discord-media-attachment-button-content">
											${J(this.currentVolume === 0 || this.isMuted, () => zs({ class: "discord-media-attachment-button-control-icon" }), () => J(this.currentVolume <= 0.5, () => ys({
        class: "discord-media-attachment-button-control-icon"
      }), () => bs({
        class: "discord-media-attachment-button-control-icon"
      })))}
										</div>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="discord-button-download-attachment">
				<a
					class="discord-link-download-attachment"
					aria-label="Download"
					href="${de(this.href)}"
					rel="noreferrer noopener"
					target="_blank"
					role="button"
					tabindex="0"
				>
					${$a()}
				</a>
			</div>
		</div>`;
    }
  }, C = new WeakMap(), I = new WeakMap(), E = new WeakMap(), V = new WeakMap(), H = new WeakMap(), e = M, (() => {
    const k = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    m = [w()], v = [w()], r = [w({ type: Number })], f = [w({ attribute: "bytes-unit" })], h = [He({ context: Oe, subscribe: !0 }), w({ type: Boolean, reflect: !0, attribute: "light-theme" })], fi(M, null, m, { kind: "accessor", name: "href", static: !1, private: !1, access: { has: (g) => "href" in g, get: (g) => g.href, set: (g, N) => {
      g.href = N;
    } }, metadata: k }, n, c), fi(M, null, v, { kind: "accessor", name: "name", static: !1, private: !1, access: { has: (g) => "name" in g, get: (g) => g.name, set: (g, N) => {
      g.name = N;
    } }, metadata: k }, u, l), fi(M, null, r, { kind: "accessor", name: "bytes", static: !1, private: !1, access: { has: (g) => "bytes" in g, get: (g) => g.bytes, set: (g, N) => {
      g.bytes = N;
    } }, metadata: k }, _, p), fi(M, null, f, { kind: "accessor", name: "bytesUnit", static: !1, private: !1, access: { has: (g) => "bytesUnit" in g, get: (g) => g.bytesUnit, set: (g, N) => {
      g.bytesUnit = N;
    } }, metadata: k }, d, o), fi(M, null, h, { kind: "accessor", name: "lightTheme", static: !1, private: !1, access: { has: (g) => "lightTheme" in g, get: (g) => g.lightTheme, set: (g, N) => {
      g.lightTheme = N;
    } }, metadata: k }, F, K), fi(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: k }, null, a), e = t.value, k && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: k });
  })(), /**
   * @internal
   */
  me(M, "styles", [
    cs,
    ns,
    os,
    ke`
			:host {
				display: grid;
				height: -moz-fit-content;
				height: fit-content;
				grid-auto-flow: row;
				grid-row-gap: 0.25rem;
				grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
				text-indent: 0;
				min-height: 0;
				min-width: 0;
				padding-top: 0.125rem;
				padding-bottom: 0.125rem;
				position: relative;

				--seek-before-width: 0%;
				--buffered-width: 0%;
				--volume-slider-opacity: 0;
			}

			.discord-audio-attachment-non-visual-media-item {
				width: -moz-fit-content;
				width: fit-content;
				max-width: 100%;
			}

			.discord-media-attachment-mosaic-item-media {
				width: 100%;
			}

			.discord-audio-attachment-wrapper-audio {
				background-color: #282828;
				border-color: #202020;
				border-radius: 8px;
				border-style: solid;
				border-width: 1px;
				box-sizing: border-box;
				color: hsl(0 calc(1 * 0%) 100% / 1);
				display: flex;
				flex-direction: column;
				flex: auto;
				height: auto;
				justify-content: space-between;
				max-width: 100%;
				overflow: visible;
				padding: 16px;
				position: relative;
				user-select: none;
				width: 432px;
			}

			.discord-audio-attachment-light-theme.discord-audio-attachment-wrapper-audio {
				border-color: #f3f3f3;
				background-color: #f9f9f9;
			}

			.discord-audio-attachment-audio-metadata {
				display: flex;
			}

			.discord-audio-attachment-audio-metadata::before {
				width: 24px;
				height: 40px;
				content: '';
				background-image: url('data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9Ijk2IiB2aWV3Qm94PSIwIDAgNzIgOTYiIHdpZHRoPSI3MiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtNzIgMjkuM3Y2MC4zYzAgMi4yNCAwIDMuMzYtLjQ0IDQuMjItLjM4Ljc0LTEgMS4zNi0xLjc0IDEuNzQtLjg2LjQ0LTEuOTguNDQtNC4yMi40NGgtNTkuMmMtMi4yNCAwLTMuMzYgMC00LjIyLS40NC0uNzQtLjM4LTEuMzYtMS0xLjc0LTEuNzQtLjQ0LS44Ni0uNDQtMS45OC0uNDQtNC4yMnYtODMuMmMwLTIuMjQgMC0zLjM2LjQ0LTQuMjIuMzgtLjc0IDEtMS4zNiAxLjc0LTEuNzQuODYtLjQ0IDEuOTgtLjQ0IDQuMjItLjQ0aDM2LjNjMS45NiAwIDIuOTQgMCAzLjg2LjIyLjUuMTIuOTguMjggMS40NC41djE2Ljg4YzAgMi4yNCAwIDMuMzYuNDQgNC4yMi4zOC43NCAxIDEuMzYgMS43NCAxLjc0Ljg2LjQ0IDEuOTguNDQgNC4yMi40NGgxNi44OGMuMjIuNDYuMzguOTQuNSAxLjQ0LjIyLjkyLjIyIDEuOS4yMiAzLjg2eiIgZmlsbD0iI2QzZDZmZCIvPjxwYXRoIGQ9Im02OC4yNiAyMC4yNmMxLjM4IDEuMzggMi4wNiAyLjA2IDIuNTYgMi44OC4xOC4yOC4zMi41Ni40Ni44NmgtMTYuODhjLTIuMjQgMC0zLjM2IDAtNC4yMi0uNDQtLjc0LS4zOC0xLjM2LTEtMS43NC0xLjc0LS40NC0uODYtLjQ0LTEuOTgtLjQ0LTQuMjJ2LTE2Ljg4MDAyOWMuMy4xNC41OC4yOC44Ni40NTk5OTkuODIuNSAxLjUgMS4xOCAyLjg4IDIuNTZ6IiBmaWxsPSIjOTM5YmY5Ii8+PHBhdGggY2xpcC1ydWxlPSJldmVub2RkIiBkPSJtMzQuNzYgNDIuMTZjLS43NC0uMy0xLjYtLjE0LTIuMTguNDRsLTguNTggOS40aC02Yy0xLjEgMC0yIC45LTIgMnYxMmMwIDEuMS45IDIgMiAyaDZsOC41OCA5LjQyYy41OC41OCAxLjQ0Ljc0IDIuMTguNDQuNzYtLjMyIDEuMjQtMS4wNiAxLjI0LTEuODZ2LTMyYzAtLjgtLjQ4LTEuNTQtMS4yNC0xLjg0em01LjI0IDMuODR2NGM1LjUyIDAgMTAgNC40OCAxMCAxMHMtNC40OCAxMC0xMCAxMHY0YzcuNzIgMCAxNC02LjI4IDE0LTE0cy02LjI4LTE0LTE0LTE0em0wIDhjMy4zIDAgNiAyLjcgNiA2cy0yLjcgNi02IDZ2LTRjMS4xIDAgMi0uOSAyLTJzLS45LTItMi0yeiIgZmlsbD0iIzU4NjVmMiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+');
				background-size: 100%auto;
				background-repeat: no-repeat;
			}

			.discord-audio-attachment-audio-metadata-content {
				padding: 0 8px;
				flex: 1 1 auto;
				white-space: nowrap;
				overflow: hidden;
			}

			.discord-audio-attachment-audio-metadata-size {
				color: color-mix(in oklab, hsl(214 calc(1 * 8.1%) 61.2% / 1) 100%, black 0%);
				font-size: 12px;
				line-height: 16px;
				font-weight: 500;
				opacity: 0.7;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}

			.discord-audio-attachment-audio-element {
				display: none !important;
				position: absolute;
				width: 0;
				height: 0;
			}
		`
  ]), Ht(e, a), e;
})();
const bo = pe`
	<path d="M7.4,11.17,4,8.62,5,7.26l2,1.53L10.64,4l1.36,1Z" fill="currentColor" />
`;
function zt(i = {}) {
  return x`<svg
		${ve(i)}
		class="discord-application-tag-verified"
		aria-label="Verified App"
		aria-hidden="false"
		width="16"
		height="16"
		viewBox="0 0 16 15.2"
		xmlns="http://www.w3.org/2000/svg"
	>
		${bo}
	</svg>`;
}
var ha = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
}, Di = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
};
(() => {
  var r, _, p;
  let i = [Me("discord-verified-author-tag")], t, a = [], e, s = we, m, n = [], c = [], v, u = [], l = [];
  return r = class extends s {
    constructor() {
      super(...arguments);
      y(this, _, Di(this, n, !1));
      y(this, p, (Di(this, c), Di(this, u, !1)));
      Di(this, l);
    }
    /**
     * Whether this bot is verified by Discord. Only works if `bot` is `true`
     */
    get verified() {
      return b(this, _);
    }
    set verified(o) {
      z(this, _, o);
    }
    /**
     * Whether to reverse the order of the author info for compact mode.
     */
    get compactMode() {
      return b(this, p);
    }
    set compactMode(o) {
      z(this, p, o);
    }
    render() {
      return x`${J(this.verified, () => zt())}App`;
    }
  }, _ = new WeakMap(), p = new WeakMap(), e = r, (() => {
    const o = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    m = [w({ type: Boolean })], v = [He({ context: Jt }), w({ type: Boolean, reflect: !0, attribute: "compact-mode" })], ha(r, null, m, { kind: "accessor", name: "verified", static: !1, private: !1, access: { has: (h) => "verified" in h, get: (h) => h.verified, set: (h, F) => {
      h.verified = F;
    } }, metadata: o }, n, c), ha(r, null, v, { kind: "accessor", name: "compactMode", static: !1, private: !1, access: { has: (h) => "compactMode" in h, get: (h) => h.compactMode, set: (h, F) => {
      h.compactMode = F;
    } }, metadata: o }, u, l), ha(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: o }, null, a), e = t.value, o && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: o });
  })(), me(r, "styles", ke`
		:host {
			background-color: #5865f2;
			color: #fff;
			font-size: 0.625em;
			margin-left: 4px;
			border-radius: 3px;
			line-height: 100%;
			text-transform: uppercase;
			display: inline-flex;
			align-items: center;
			height: 0.9375rem;
			padding: 0 0.275rem;
			margin-top: 0.075em;
			border-radius: 0.1875rem;
		}

		:host .discord-application-tag-verified {
			display: inline-block;
			width: 0.9375rem;
			height: 0.9375rem;
			margin-left: -0.25rem;
		}

		:host([compact-mode]) {
			padding-left: 10px;
			padding-right: 4px;
			margin-right: 0.25rem;
			margin-left: 0px !important;
			margin-top: 0px !important;
		}

		:host([compact-mode]) .discord-application-tag-verified {
			margin-right: 0.7em;
			margin-left: -0.7em;
		}
	`), Di(e, a), e;
})();
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ws = "important", yo = " !" + ws, Ut = oa(class extends Ma {
  constructor(i) {
    if (super(i), i.type !== ka.ATTRIBUTE || i.name !== "style" || i.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(i) {
    return Object.keys(i).reduce((t, a) => {
      const e = i[a];
      return e == null ? t : t + `${a = a.includes("-") ? a : a.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${e};`;
    }, "");
  }
  update(i, [t]) {
    const { style: a } = i.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(t)), this.render(t);
    for (const e of this.ft) t[e] == null && (this.ft.delete(e), e.includes("-") ? a.removeProperty(e) : a[e] = null);
    for (const e in t) {
      const s = t[e];
      if (s != null) {
        this.ft.add(e);
        const m = typeof s == "string" && s.endsWith(yo);
        e.includes("-") || m ? a.setProperty(e, m ? s.slice(0, -11) : s, m ? ws : "") : a[e] = s;
      }
    }
    return Gt;
  }
});
class Ft extends Error {
  constructor(t) {
    super(t), this.name = "DiscordComponentsError";
  }
}
const zo = new Intl.DateTimeFormat("en-US", { day: "2-digit", month: "2-digit", year: "numeric" }), wo = new Intl.DateTimeFormat("en-US", { hour12: !0, hour: "2-digit", minute: "2-digit" }), xo = new Intl.DateTimeFormat("en-US", { hour12: !1, hour: "2-digit", minute: "2-digit" }), ko = (i) => i instanceof Date ? zo.format(i) : i, Mo = (i, t = !1) => i instanceof Date ? t ? xo.format(i) : wo.format(i) : i;
function Wi(i, t = !1, a = !1) {
  if (!(i instanceof Date) && typeof i != "string")
    throw new TypeError("Timestamp prop must be a Date object or a string.");
  return t ? Mo(i, a) : ko(i);
}
const Ua = /\.(?<ext>bmp|jpe?g|png|gif|webp|tiff)$/i;
function $o(i) {
  if (!Ua.test(i))
    throw new Ft(`The url of an image for discord-image-attachment should match the regex ${Ua}`);
}
const To = /(?:<(?<animated>a)?:(?<name>\w{2,32}):)?(?<id>\d{17,21})>?/;
function Ta(i) {
  const t = xi().emojis?.[i];
  if (t)
    return t;
  const a = To.exec(i);
  if (a?.groups) {
    const { name: e, id: s, animated: m } = a.groups;
    return {
      name: e,
      url: `https://cdn.discordapp.com/emojis/${s}.${m ? "gif" : "png"}`
    };
  }
}
function xs(i) {
  if (i)
    return ro.get(i) ?? i;
}
var ut = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
}, Ae = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
};
(() => {
  var U, q, ge, je, R, j, ie, De, Ie, Ne, le, W, D, $;
  let i = [Me("discord-author-info")], t, a = [], e, s = we, m, n = [], c = [], v, u = [], l = [], r, _ = [], p = [], f, d = [], o = [], h, F = [], K = [], M, C = [], I = [], E, V = [], H = [], te, _e = [], k = [], g, N = [], be = [], O, T = [], ee = [], ae, Z = [], A = [], se, ye = [], he = [], P, Y = [], G = [];
  return U = class extends s {
    constructor() {
      super(...arguments);
      y(this, q, Ae(this, n, void 0));
      y(this, ge, (Ae(this, c), Ae(this, u, !1)));
      y(this, je, (Ae(this, l), Ae(this, _, !1)));
      y(this, R, (Ae(this, p), Ae(this, d, !1)));
      y(this, j, (Ae(this, o), Ae(this, F, !1)));
      y(this, ie, (Ae(this, K), Ae(this, C, void 0)));
      y(this, De, (Ae(this, I), Ae(this, V, void 0)));
      y(this, Ie, (Ae(this, H), Ae(this, _e, void 0)));
      y(this, Ne, (Ae(this, k), Ae(this, N, void 0)));
      y(this, le, (Ae(this, be), Ae(this, T, void 0)));
      y(this, W, (Ae(this, ee), Ae(this, Z, !1)));
      y(this, D, (Ae(this, A), Ae(this, ye, !1)));
      y(this, $, (Ae(this, he), Ae(this, Y, !1)));
      Ae(this, G);
    }
    /**
     * The name of the author
     */
    get author() {
      return b(this, q);
    }
    set author(ue) {
      z(this, q, ue);
    }
    /**
     * Whether this author is a bot. Only works if `server` and `officialApp` is `false` or `undefined`.
     */
    get bot() {
      return b(this, ge);
    }
    set bot(ue) {
      z(this, ge, ue);
    }
    /**
     * Whether this author is a `server` crosspost webhook. Only works if `bot` and `officialApp` is `false` or `undefined`.
     */
    get server() {
      return b(this, je);
    }
    set server(ue) {
      z(this, je, ue);
    }
    /**
     * Whether this author is a `official app` crosspost webhook. Only works if `bot` and `server` is `false` or `undefined`.
     */
    get officialApp() {
      return b(this, R);
    }
    set officialApp(ue) {
      z(this, R, ue);
    }
    /**
     * Whether this author is the original poster.
     */
    get op() {
      return b(this, j);
    }
    set op(ue) {
      z(this, j, ue);
    }
    /**
     * The colour of the author, which comes from their highest role
     */
    get roleColor() {
      return b(this, ie);
    }
    set roleColor(ue) {
      z(this, ie, ue);
    }
    /**
     * The role icon of the author, which comes from their highest role
     */
    get roleIcon() {
      return b(this, De);
    }
    set roleIcon(ue) {
      z(this, De, ue);
    }
    /**
     * The role name of the author, which comes from their highest role
     */
    get roleName() {
      return b(this, Ie);
    }
    set roleName(ue) {
      z(this, Ie, ue);
    }
    /**
     * The clan icon of the author, which comes from the enabled clan tag
     */
    get clanIcon() {
      return b(this, Ne);
    }
    set clanIcon(ue) {
      z(this, Ne, ue);
    }
    /**
     * The clan name of the author, which comes from the enabled clan tag
     */
    get clanTag() {
      return b(this, le);
    }
    set clanTag(ue) {
      z(this, le, ue);
    }
    /**
     * Whether this bot is verified by Discord. Only works if `bot` is `true`
     */
    get verified() {
      return b(this, W);
    }
    set verified(ue) {
      z(this, W, ue);
    }
    /**
     * Whether to reverse the order of the author info for compact mode.
     */
    get compactMode() {
      return b(this, D);
    }
    set compactMode(ue) {
      z(this, D, ue);
    }
    get lightTheme() {
      return b(this, $);
    }
    set lightTheme(ue) {
      z(this, $, ue);
    }
    render() {
      const ue = xs(this.clanIcon), Q = this.clanTag?.slice(0, 4);
      return x`${J(this.compactMode, () => null, () => x`<span class="discord-author-username" style="${Ut({ color: this.roleColor ?? void 0 })}">${this.author}</span>`)}
		${J(this.roleIcon && !this.compactMode, () => x`<img
					class="discord-author-role-icon"
					src=${de(this.roleIcon)}
					height="20"
					width="20"
					alt=${de(this.roleName)}
					draggable="false"
				/>`)}
		${J(this.bot && !this.server && !this.officialApp, () => x`<discord-verified-author-tag .verified=${this.verified}></discord-verified-author-tag>`)}
		${J(this.server && !this.bot && !this.officialApp, () => x`<span class="discord-application-tag">Server</span>`)}
		${J(this.officialApp && !this.server && !this.bot, () => x`<span class="discord-official-application">${zt()}OFFICIAL</span>`)}
		${J(this.op, () => x`<span class="discord-application-tag discord-application-tag-op">OP</span>`)}
		${J(this.compactMode, () => x`<span class="discord-author-username" style="${Ut({ color: this.roleColor ?? void 0 })}">${this.author}</span>`)}
		${J(this.clanIcon && this.clanTag && this.clanTag?.length > 0, () => x`
				<span class="discord-clan-tag">
					${ue === "string" ? x`<img srcset=${de(ue)} alt=${de(Q)} width="12" height="12" draggable="false" />` : ue}
					<span>${Q}</span>
				</span>
			`)} `;
    }
  }, q = new WeakMap(), ge = new WeakMap(), je = new WeakMap(), R = new WeakMap(), j = new WeakMap(), ie = new WeakMap(), De = new WeakMap(), Ie = new WeakMap(), Ne = new WeakMap(), le = new WeakMap(), W = new WeakMap(), D = new WeakMap(), $ = new WeakMap(), e = U, (() => {
    const ue = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    m = [w()], v = [w({ type: Boolean })], r = [w({ type: Boolean })], f = [w({ type: Boolean, attribute: "official-app" })], h = [w({ type: Boolean })], M = [w({ attribute: "role-color" })], E = [w({ attribute: "role-icon" })], te = [w({ attribute: "role-name" })], g = [w({ attribute: "clan-icon" })], O = [w({ attribute: "clan-tag" })], ae = [w({ type: Boolean })], se = [He({ context: Jt }), w({ type: Boolean, reflect: !0, attribute: "compact-mode" })], P = [He({ context: Oe }), w({ type: Boolean, reflect: !0, attribute: "light-theme" })], ut(U, null, m, { kind: "accessor", name: "author", static: !1, private: !1, access: { has: (Q) => "author" in Q, get: (Q) => Q.author, set: (Q, Ee) => {
      Q.author = Ee;
    } }, metadata: ue }, n, c), ut(U, null, v, { kind: "accessor", name: "bot", static: !1, private: !1, access: { has: (Q) => "bot" in Q, get: (Q) => Q.bot, set: (Q, Ee) => {
      Q.bot = Ee;
    } }, metadata: ue }, u, l), ut(U, null, r, { kind: "accessor", name: "server", static: !1, private: !1, access: { has: (Q) => "server" in Q, get: (Q) => Q.server, set: (Q, Ee) => {
      Q.server = Ee;
    } }, metadata: ue }, _, p), ut(U, null, f, { kind: "accessor", name: "officialApp", static: !1, private: !1, access: { has: (Q) => "officialApp" in Q, get: (Q) => Q.officialApp, set: (Q, Ee) => {
      Q.officialApp = Ee;
    } }, metadata: ue }, d, o), ut(U, null, h, { kind: "accessor", name: "op", static: !1, private: !1, access: { has: (Q) => "op" in Q, get: (Q) => Q.op, set: (Q, Ee) => {
      Q.op = Ee;
    } }, metadata: ue }, F, K), ut(U, null, M, { kind: "accessor", name: "roleColor", static: !1, private: !1, access: { has: (Q) => "roleColor" in Q, get: (Q) => Q.roleColor, set: (Q, Ee) => {
      Q.roleColor = Ee;
    } }, metadata: ue }, C, I), ut(U, null, E, { kind: "accessor", name: "roleIcon", static: !1, private: !1, access: { has: (Q) => "roleIcon" in Q, get: (Q) => Q.roleIcon, set: (Q, Ee) => {
      Q.roleIcon = Ee;
    } }, metadata: ue }, V, H), ut(U, null, te, { kind: "accessor", name: "roleName", static: !1, private: !1, access: { has: (Q) => "roleName" in Q, get: (Q) => Q.roleName, set: (Q, Ee) => {
      Q.roleName = Ee;
    } }, metadata: ue }, _e, k), ut(U, null, g, { kind: "accessor", name: "clanIcon", static: !1, private: !1, access: { has: (Q) => "clanIcon" in Q, get: (Q) => Q.clanIcon, set: (Q, Ee) => {
      Q.clanIcon = Ee;
    } }, metadata: ue }, N, be), ut(U, null, O, { kind: "accessor", name: "clanTag", static: !1, private: !1, access: { has: (Q) => "clanTag" in Q, get: (Q) => Q.clanTag, set: (Q, Ee) => {
      Q.clanTag = Ee;
    } }, metadata: ue }, T, ee), ut(U, null, ae, { kind: "accessor", name: "verified", static: !1, private: !1, access: { has: (Q) => "verified" in Q, get: (Q) => Q.verified, set: (Q, Ee) => {
      Q.verified = Ee;
    } }, metadata: ue }, Z, A), ut(U, null, se, { kind: "accessor", name: "compactMode", static: !1, private: !1, access: { has: (Q) => "compactMode" in Q, get: (Q) => Q.compactMode, set: (Q, Ee) => {
      Q.compactMode = Ee;
    } }, metadata: ue }, ye, he), ut(U, null, P, { kind: "accessor", name: "lightTheme", static: !1, private: !1, access: { has: (Q) => "lightTheme" in Q, get: (Q) => Q.lightTheme, set: (Q, Ee) => {
      Q.lightTheme = Ee;
    } }, metadata: ue }, Y, G), ut(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: ue }, null, a), e = t.value, ue && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: ue });
  })(), /**
   * @internal
   */
  me(U, "styles", ke`
		:host {
			display: inline-flex;
			align-items: center;
			font-size: 16px;
			text-underline-offset: 1px;
			margin-right: 0.25rem;
		}

		:host .discord-author-username {
			color: #fff;
			font-size: 1em;
			font-weight: 500;
		}

		:host .discord-author-username:hover {
			text-decoration: underline;
			cursor: pointer;
		}

		:host([light-theme]) .discord-author-username {
			color: #23262a;
		}

		:host .discord-clan-tag {
			background-color: oklab(0.431937 0.00109309 -0.0132537 / 0.54);
			color: #fff;
			font-size: 12px;
			font-weight: 500;
			margin-left: 0.25rem;
			border-radius: 4px;
			line-height: 100%;
			text-transform: uppercase;
			display: inline-flex;
			width: max-content;
			gap: 0.25rem;
			justify-content: space-between;
			align-items: center;
			padding: 0 0.275rem;
			margin-top: 0.075em;
			height: 1.2rem;
			min-width: 45px;
			line-height: 1rem !important;
			transition: background-color 100ms ease-in-out;
			cursor: pointer;
		}

		:host .discord-clan-tag:hover {
			background-color: oklab(0.431937 0.00109309 -0.0132537 / 0.34);
		}

		:host([light-theme]) .discord-clan-tag {
			background-color: hsl(0 calc(1 * 0%) 0.8%/0.09);
			color: #000;
		}

		:host([light-theme]) .discord-clan-tag:hover {
			background-color: hsl(0 calc(1 * 0%) 0.8%/0.03);
		}

		:host([compact-mode]) .discord-clan-tag {
			margin-left: 0rem;
		}

		:host .discord-clan-tag span,
		:host .discord-clan-tag svg,
		:host .discord-clan-tag img {
			user-select: none;
			-webkit-user-select: none;
		}

		:host .discord-application-tag {
			background-color: #5865f2;
			color: #fff;
			font-size: 0.625em;
			border-radius: 3px;
			line-height: 100%;
			text-transform: uppercase;

			/* Use flex layout to ensure both verified icon and "BOT" text are aligned to center */
			display: inline-flex;
			align-items: center;

			/* Styling taken through Inspect Element on Discord client for Windows */
			height: 0.9375rem;
			padding: 0 0.275rem;
			margin-top: 0.075em;
			border-radius: 0.1875rem;
		}

		:host .discord-official-application {
			background-color: #5865f2;
			color: #fff;
			font-size: 0.625em;
			margin-left: 4px;
			border-radius: 3px;
			line-height: 100%;
			text-transform: uppercase;

			/* Use flex layout to ensure both verified icon and "BOT" text are aligned to center */
			display: flex;
			align-items: center;

			/* Styling taken through Inspect Element on Discord client for Windows */
			height: 0.9375rem;
			padding: 0 0.275rem;
			margin-top: 0.075em;
			border-radius: 0.1875rem;
		}

		:host([compact-mode]) .discord-official-application {
			margin-right: 5px;
			margin-left: 0px !important;
		}

		:host .discord-application-tag.discord-application-tag-op {
			background-color: #c9cdfb;
			color: #4752c4;
			border-radius: 0.4rem;
		}

		:host .discord-author-role-icon {
			margin-left: 0.25rem;
			vertical-align: top;
			height: calc(1rem + 4px);
			width: calc(1rem + 4px);
		}

		:host([compact-mode]) .discord-author-username {
			margin-right: 0.25rem;
		}

		:host([compact-mode]) .discord-application-tag {
			padding-left: 10px;
			padding-right: 4px;
			margin-right: 0.25rem;
		}
	`), Ae(e, a), e;
})();
var Co = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
}, jo = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
};
(() => {
  var m;
  let i = [Me("discord-bold")], t, a = [], e, s = we;
  return m = class extends s {
    render() {
      return x`
			<strong>
				<slot></slot>
			</strong>
		`;
    }
  }, e = m, (() => {
    const c = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    Co(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: c }, null, a), e = t.value, c && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: c });
  })(), /**
   * @internal
   */
  me(m, "styles", ke`
		:host > strong {
			font-weight: 700;
		}
	`), jo(e, a), e;
})();
const Ho = pe`
	<path
		fill="currentColor"
		d="M10 5V3H5.375C4.06519 3 3 4.06519 3 5.375V18.625C3 19.936 4.06519 21 5.375 21H18.625C19.936 21 21 19.936 21 18.625V14H19V19H5V5H10Z"
	/>
	<path fill="currentColor" d="M21 2.99902H14V4.99902H17.586L9.29297 13.292L10.707 14.706L19 6.41302V9.99902H21V2.99902Z"
	/>
`;
function Eo(i = {}) {
  return x`<svg ${ve(i)} class="discord-button-launch" aria-hidden="false" width="16" height="16" viewBox="0 0 24 24">
		${Ho}
	</svg>`;
}
var ti = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
}, vt = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
};
(() => {
  var E, V, H, te, _e, k, g;
  let i = [Me("discord-button")], t, a = [], e, s = we, m, n = [], c = [], v, u = [], l = [], r, _ = [], p = [], f, d = [], o = [], h, F = [], K = [], M, C = [], I = [];
  return E = class extends s {
    constructor() {
      super(...arguments);
      y(this, V, vt(this, n, void 0));
      y(this, H, (vt(this, c), vt(this, u, "emoji")));
      y(this, te, (vt(this, l), vt(this, _, void 0)));
      y(this, _e, (vt(this, p), vt(this, d, !1)));
      y(this, k, (vt(this, o), vt(this, F, "secondary")));
      y(this, g, (vt(this, K), vt(this, C, void 0)));
      me(this, "validButtonTypes", (vt(this, I), /* @__PURE__ */ new Set(["primary", "secondary", "success", "destructive"])));
    }
    /**
     * The emoji URL to use in the button.
     */
    get emoji() {
      return b(this, V);
    }
    set emoji(O) {
      z(this, V, O);
    }
    /**
     * The name of the emoji used in the button.
     */
    get emojiName() {
      return b(this, H);
    }
    set emojiName(O) {
      z(this, H, O);
    }
    /**
     * The URL for the button. Setting this will force the button type to be `secondary`.
     */
    get url() {
      return b(this, te);
    }
    set url(O) {
      z(this, te, O);
    }
    /**
     * Whether to show the button as disabled.
     */
    get disabled() {
      return b(this, _e);
    }
    set disabled(O) {
      z(this, _e, O);
    }
    /**
     * The type of button this is, this will change the color of the button.
     * Valid values: `primary`, `secondary`, `success`, `destructive`.
     */
    get type() {
      return b(this, k);
    }
    set type(O) {
      z(this, k, O);
    }
    /**
     * An `id` of a modal that should be opened when this button is clicked. This should match the `modal-id` of a `discord-modal` element.
     *
     * @remarks
     * - `discord-modal`s use the HTML [dialog](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) element. and are opened through `<ref>.showModal()`
     * - If {@link DiscordButton.url} is set this will be ignored.
     * - If {@link DiscordButton.disabled} is set this will be ignored.
     */
    get modalId() {
      return b(this, g);
    }
    set modalId(O) {
      z(this, g, O);
    }
    checkType() {
      if (this.type) {
        if (typeof this.type != "string")
          throw new TypeError("DiscordButton `type` prop must be a string.");
        if (!this.validButtonTypes.has(this.type))
          throw new RangeError("DiscordButton `type` prop must be one of: 'primary', 'secondary', 'success', 'destructive'");
      }
    }
    checkParentElement() {
      if (this.parentElement?.tagName.toLowerCase() !== "discord-action-row")
        throw new Ft("All <discord-button> components must be direct children of <discord-action-row>.");
    }
    handleButtonClick() {
      if (this.modalId) {
        const O = this.parentElement?.parentElement?.parentElement?.parentElement;
        if (O?.tagName?.toLowerCase() === "discord-messages") {
          const T = O?.querySelector("discord-modal"), ee = T?.shadowRoot?.querySelector(`dialog#${this.modalId}`), ae = ee?.querySelector("div.discord-modal-box");
          if (ee instanceof HTMLDialogElement && ae instanceof HTMLDivElement && (ee.showModal(), ae.style.display = "flex", T)) {
            const Z = globalThis.getComputedStyle(globalThis.document.body).overflow;
            T.originalBodyOverflow = Z, globalThis.document.body.style.overflow = "hidden";
          }
        }
      }
    }
    render() {
      this.checkType(), this.checkParentElement();
      const O = this.url && !this.disabled, T = x`
			${J(this.emoji, () => x`<img src=${this.emoji} alt=${this.emojiName} draggable="true" class="emoji" />`)}
			<span>
				<slot></slot>
			</span>
			${J(this.url, () => Eo())}
		`;
      return O ? x`<a class="secondary" href=${this.url} target="_blank" rel="noopener noreferrer">${T}</a>` : x`<button
			class=${Le({
        [this.type]: !0,
        disabled: this.disabled,
        hoverable: !this.disabled
      })}
			@click=${this.handleButtonClick}
		>
			${T}
		</button>`;
    }
  }, V = new WeakMap(), H = new WeakMap(), te = new WeakMap(), _e = new WeakMap(), k = new WeakMap(), g = new WeakMap(), e = E, (() => {
    const O = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    m = [w({ reflect: !0, attribute: "emoji" })], v = [w({ reflect: !0, attribute: "emoji-name" })], r = [w({ reflect: !0, attribute: "url" })], f = [w({ type: Boolean, reflect: !0, attribute: "disabled" })], h = [w({ reflect: !0, attribute: "type" })], M = [w({ reflect: !0, attribute: "modal-id" })], ti(E, null, m, { kind: "accessor", name: "emoji", static: !1, private: !1, access: { has: (T) => "emoji" in T, get: (T) => T.emoji, set: (T, ee) => {
      T.emoji = ee;
    } }, metadata: O }, n, c), ti(E, null, v, { kind: "accessor", name: "emojiName", static: !1, private: !1, access: { has: (T) => "emojiName" in T, get: (T) => T.emojiName, set: (T, ee) => {
      T.emojiName = ee;
    } }, metadata: O }, u, l), ti(E, null, r, { kind: "accessor", name: "url", static: !1, private: !1, access: { has: (T) => "url" in T, get: (T) => T.url, set: (T, ee) => {
      T.url = ee;
    } }, metadata: O }, _, p), ti(E, null, f, { kind: "accessor", name: "disabled", static: !1, private: !1, access: { has: (T) => "disabled" in T, get: (T) => T.disabled, set: (T, ee) => {
      T.disabled = ee;
    } }, metadata: O }, d, o), ti(E, null, h, { kind: "accessor", name: "type", static: !1, private: !1, access: { has: (T) => "type" in T, get: (T) => T.type, set: (T, ee) => {
      T.type = ee;
    } }, metadata: O }, F, K), ti(E, null, M, { kind: "accessor", name: "modalId", static: !1, private: !1, access: { has: (T) => "modalId" in T, get: (T) => T.modalId, set: (T, ee) => {
      T.modalId = ee;
    } }, metadata: O }, C, I), ti(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: O }, null, a), e = t.value, O && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: O });
  })(), /**
   * @internal
   */
  me(E, "styles", ke`
		:host > *:first-child {
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			margin: 4px 8px 4px 0;
			padding: 2px 16px;
			width: auto;
			height: 32px;
			min-width: 60px;
			min-height: 32px;
			-webkit-transition:
				background-color 0.17s ease,
				color 0.17s ease;
			transition:
				background-color 0.17s ease,
				color 0.17s ease;
			border-radius: 3px;
			font-size: 14px;
			font-weight: 500;
			line-height: 16px;
			text-decoration: none !important;
			/* CSS Reset to unset button styling */
			border-width: unset;
			border-style: unset;
			border-color: unset;
			border-image: unset;
			box-sizing: unset;
			font-family: 'gg sans', 'Noto Sans', Whitney, 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;
		}

		.success {
			color: #fff;
			background-color: #3ba55d;
		}

		.success.hoverable:hover {
			background-color: #2d7d46;
		}

		.destructive {
			color: #fff;
			background-color: #ed4245;
		}

		.destructive.hoverable:hover {
			background-color: #c03537;
		}

		.primary {
			color: #fff;
			background-color: #5865f2;
		}

		.primary.hoverable:hover {
			background-color: #4752c4;
		}

		.secondary {
			color: #fff;
			background-color: #4f545c;
		}

		.secondary.hoverable:hover {
			background-color: #5d6269;
		}

		.disabled {
			cursor: not-allowed !important;
			opacity: 0.5;
		}

		.launch {
			margin-left: 8px;
		}

		.emoji {
			margin-right: 4px;
			object-fit: contain;
			width: 1.375em;
			height: 1.375em;
			vertical-align: bottom;
		}
	`), vt(e, a), e;
})();
var Qi = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
}, ii = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
};
(() => {
  var f, d, o, h;
  let i = [Me("discord-code")], t, a = [], e, s = we, m, n = [], c = [], v, u = [], l = [], r, _ = [], p = [];
  return f = class extends s {
    constructor() {
      super(...arguments);
      y(this, d, ii(this, n, !1));
      y(this, o, (ii(this, c), ii(this, u, !1)));
      y(this, h, (ii(this, l), ii(this, _, !1)));
      ii(this, p);
    }
    /**
     * Whether this code block is a multi-line code block
     */
    get multiline() {
      return b(this, d);
    }
    set multiline(M) {
      z(this, d, M);
    }
    get lightTheme() {
      return b(this, o);
    }
    set lightTheme(M) {
      z(this, o, M);
    }
    /**
     * Whether this code block exists within a `discord-embed` component.
     */
    get embed() {
      return b(this, h);
    }
    set embed(M) {
      z(this, h, M);
    }
    render() {
      return this.multiline ? x`<discord-pre ?embed=${this.embed}
				><code><slot></slot></code
			></discord-pre>` : x`<code><slot></slot></code>`;
    }
  }, d = new WeakMap(), o = new WeakMap(), h = new WeakMap(), e = f, (() => {
    const M = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    m = [w({ type: Boolean, reflect: !0 })], v = [He({ context: Oe, subscribe: !0 }), w({ type: Boolean, reflect: !0, attribute: "light-theme" })], r = [w({ type: Boolean, reflect: !0 })], Qi(f, null, m, { kind: "accessor", name: "multiline", static: !1, private: !1, access: { has: (C) => "multiline" in C, get: (C) => C.multiline, set: (C, I) => {
      C.multiline = I;
    } }, metadata: M }, n, c), Qi(f, null, v, { kind: "accessor", name: "lightTheme", static: !1, private: !1, access: { has: (C) => "lightTheme" in C, get: (C) => C.lightTheme, set: (C, I) => {
      C.lightTheme = I;
    } }, metadata: M }, u, l), Qi(f, null, r, { kind: "accessor", name: "embed", static: !1, private: !1, access: { has: (C) => "embed" in C, get: (C) => C.embed, set: (C, I) => {
      C.embed = I;
    } }, metadata: M }, _, p), Qi(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: M }, null, a), e = t.value, M && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: M });
  })(), /**
   * @internal
   */
  me(f, "styles", ke`
		:host {
			background-color: #2f3136;
			white-space: break-spaces;
			font-family:
				Consolas,
				Andale Mono WT,
				Andale Mono,
				Lucida Console,
				Lucida Sans Typewriter,
				DejaVu Sans Mono,
				Bitstream Vera Sans Mono,
				Liberation Mono,
				Nimbus Mono L,
				Monaco,
				Courier New,
				Courier,
				monospace;
			border-radius: 3px;
		}

		code {
			padding: 0.2em;
			margin: -0.2em;
			border-radius: 3px;
			border: none;
			font-size: 85%;
			text-indent: 0;
			white-space: pre-wrap;
		}

		:host([multiline]) code {
			display: block;
			width: 90%;
			font-size: 0.875rem;
			line-height: 1.125rem;
			padding: 0.5em;
			background: #2b2d31;
			border: 1px solid #1e1f22;
		}

		:host([embed]) code {
			background-color: #1e1f22;
		}

		:host([embed][multiline]) code {
			display: block;
			width: 100%;
			padding: 7px;
			border-radius: 4px;
			background: #1e1f22;
		}

		:host([light-theme]) code {
			border-color: #e3e5e8;
			background-color: #f2f3f5;
		}

		:host([light-theme][embed]) code {
			background-color: #e3e5e8;
		}
	`), ii(e, a), e;
})();
const So = pe`
	<path
		fill="currentColor"
		d="M56 50.6667V13.3333C56 10.4 53.6 8 50.6667 8H13.3333C10.4 8 8 10.4 8 13.3333V50.6667C8 53.6 10.4 56 13.3333 56H50.6667C53.6 56 56 53.6 56 50.6667ZM22.6667 36L29.3333 44.0267L38.6667 32L50.6667 48H13.3333L22.6667 36Z"
	/>
`;
function ks(i = {}) {
  return x`<svg ${ve(i)} aria-hidden="false" width="64" height="64" viewBox="0 0 64 64">${So}</svg>`;
}
const Vo = pe`
	<path
		fill="currentColor"
		fill-rule="evenodd"
		clip-rule="evenodd"
		d="M5 3C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5ZM16.8995 8.41419L15.4853 6.99998L7 15.4853L8.41421 16.8995L16.8995 8.41419Z"
	/>
`;
function Ms(i) {
  return x`<svg ${ve(i || {})} class="discord-command-icon" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">
		${Vo}
	</svg>`;
}
const Do = pe`
	<path
		d="M0.809739 3.59646L5.12565 0.468433C5.17446 0.431163 5.23323 0.408043 5.2951 0.401763C5.35698 0.395482 5.41943 0.406298 5.4752 0.432954C5.53096 0.45961 5.57776 0.50101 5.61013 0.552343C5.64251 0.603676 5.65914 0.662833 5.6581 0.722939V2.3707C10.3624 2.3707 11.2539 5.52482 11.3991 7.21174C11.4028 7.27916 11.3848 7.34603 11.3474 7.40312C11.3101 7.46021 11.2554 7.50471 11.1908 7.53049C11.1262 7.55626 11.0549 7.56204 10.9868 7.54703C10.9187 7.53201 10.857 7.49695 10.8104 7.44666C8.72224 5.08977 5.6581 5.63359 5.6581 5.63359V7.28135C5.65831 7.34051 5.64141 7.39856 5.60931 7.44894C5.5772 7.49932 5.53117 7.54004 5.4764 7.5665C5.42163 7.59296 5.3603 7.60411 5.29932 7.59869C5.23834 7.59328 5.18014 7.57151 5.13128 7.53585L0.809739 4.40892C0.744492 4.3616 0.691538 4.30026 0.655067 4.22975C0.618596 4.15925 0.599609 4.08151 0.599609 4.00269C0.599609 3.92386 0.618596 3.84612 0.655067 3.77562C0.691538 3.70511 0.744492 3.64377 0.809739 3.59646Z"
		fill="currentColor"
	/>
`;
function Oo(i = {}) {
  return x`<svg ${ve(i)} class="discord-reply-icon" aria-hidden="false" width="12" height="8" viewBox="0 0 12 8">${Do}</svg>`;
}
var Ye = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
}, Se = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
};
let Io = (() => {
  var Te, ue, Q, Ee, Mt, $t, Ve, tt, it, at, st, rt, ot, lt, nt, ct, ht, dt, $e;
  let i = [Me("discord-reply")], t, a = [], e, s = we, m, n = [], c = [], v, u = [], l = [], r, _ = [], p = [], f, d = [], o = [], h, F = [], K = [], M, C = [], I = [], E, V = [], H = [], te, _e = [], k = [], g, N = [], be = [], O, T = [], ee = [], ae, Z = [], A = [], se, ye = [], he = [], P, Y = [], G = [], U, q = [], ge = [], je, R = [], j = [], ie, De = [], Ie = [], Ne, le = [], W = [], D, $ = [], ce = [];
  return Te = class extends s {
    constructor() {
      super(...arguments);
      y(this, ue, Se(this, n, void 0));
      y(this, Q, (Se(this, c), Se(this, u, "User")));
      y(this, Ee, (Se(this, l), Se(this, _, void 0)));
      y(this, Mt, (Se(this, p), Se(this, d, !1)));
      y(this, $t, (Se(this, o), Se(this, F, !1)));
      y(this, Ve, (Se(this, K), Se(this, C, !1)));
      y(this, tt, (Se(this, I), Se(this, V, !1)));
      y(this, it, (Se(this, H), Se(this, _e, !1)));
      y(this, at, (Se(this, k), Se(this, N, !1)));
      y(this, st, (Se(this, be), Se(this, T, void 0)));
      y(this, rt, (Se(this, ee), Se(this, Z, !1)));
      y(this, ot, (Se(this, A), Se(this, ye, !1)));
      y(this, lt, (Se(this, he), Se(this, Y, !1)));
      y(this, nt, (Se(this, G), Se(this, q, void 0)));
      y(this, ct, (Se(this, ge), Se(this, R, void 0)));
      y(this, ht, (Se(this, j), Se(this, De, !1)));
      y(this, dt, (Se(this, Ie), Se(this, le, !1)));
      y(this, $e, (Se(this, W), Se(this, $, !1)));
      Se(this, ce);
    }
    /**
     * The id of the profile data to use.
     */
    get profile() {
      return b(this, ue);
    }
    set profile(re) {
      z(this, ue, re);
    }
    /**
     * The message author's username.
     *
     * @defaultValue 'User'
     */
    get author() {
      return b(this, Q);
    }
    set author(re) {
      z(this, Q, re);
    }
    /**
     * The message author's avatar. Can be an avatar shortcut, relative path, or external link.
     */
    get avatar() {
      return b(this, Ee);
    }
    set avatar(re) {
      z(this, Ee, re);
    }
    /**
     * Whether the message author is a bot or not.
     * Only works if `server` and `officialApp` is `false` or `undefined`.
     */
    get bot() {
      return b(this, Mt);
    }
    set bot(re) {
      z(this, Mt, re);
    }
    /**
     * Whether the message author is a server crosspost webhook or not.
     * Only works if `bot` and `officialApp` is `false` or `undefined`.
     */
    get server() {
      return b(this, $t);
    }
    set server(re) {
      z(this, $t, re);
    }
    /**
     * Whether the message author is a server crosspost webhook or not.
     * Only works if `bot` and `server` is `false` or `undefined`.
     */
    get officialApp() {
      return b(this, Ve);
    }
    set officialApp(re) {
      z(this, Ve, re);
    }
    /**
     * Whether the author is the original poster.
     */
    get op() {
      return b(this, tt);
    }
    set op(re) {
      z(this, tt, re);
    }
    /**
     * Whether the bot is verified or not.
     * Only works if `bot` is `true`
     */
    get verified() {
      return b(this, it);
    }
    set verified(re) {
      z(this, it, re);
    }
    /**
     * Whether the message has been edited or not.
     */
    get edited() {
      return b(this, at);
    }
    set edited(re) {
      z(this, at, re);
    }
    /**
     * The message author's primary role color. Can be any [CSS color value](https://www.w3schools.com/cssref/css_colors_legal.asp).
     */
    get roleColor() {
      return b(this, st);
    }
    set roleColor(re) {
      z(this, st, re);
    }
    /**
     * Whether the referenced message is from a response of a slash command.
     */
    get command() {
      return b(this, rt);
    }
    set command(re) {
      z(this, rt, re);
    }
    /**
     * Whether the referenced message contains attachments.
     */
    get attachment() {
      return b(this, ot);
    }
    set attachment(re) {
      z(this, ot, re);
    }
    /**
     * Whether this reply pings the original message sender, prepending an "\@" on the author's username.
     */
    get mentions() {
      return b(this, lt);
    }
    set mentions(re) {
      z(this, lt, re);
    }
    /**
     * The clan icon of the author, which comes from the enabled clan tag
     */
    get clanIcon() {
      return b(this, nt);
    }
    set clanIcon(re) {
      z(this, nt, re);
    }
    /**
     * The clan name of the author, which comes from the enabled clan tag
     */
    get clanTag() {
      return b(this, ct);
    }
    set clanTag(re) {
      z(this, ct, re);
    }
    /**
     * Whether this reply is a deleted message.
     * When set to true, any content inside the tags is ignored as no `slot` is rendered.
     * The message will always be `"Original message was deleted"`.
     * Furthermore, the following properties are ignored:
     *
     * - {@link DiscordReply.profile | profile}
     * - {@link DiscordReply.author | author}
     * - {@link DiscordReply.avatar | avatar}
     * - {@link DiscordReply.bot | bot}
     * - {@link DiscordReply.server | server}
     * - {@link DiscordReply.op | op}
     * - {@link DiscordReply.verified | verified}
     * - {@link DiscordReply.edited | edited}
     * - {@link DiscordReply.roleColor | roleColor}
     * - {@link DiscordReply.command | command}
     * - {@link DiscordReply.attachment | attachment}
     * - {@link DiscordReply.mentions | mentions}
     * - {@link DiscordReply.clanIcon | clanIcon}
     * - {@link DiscordReply.clanTag | clanTag}
     */
    get deleted() {
      return b(this, ht);
    }
    set deleted(re) {
      z(this, ht, re);
    }
    get lightTheme() {
      return b(this, dt);
    }
    set lightTheme(re) {
      z(this, dt, re);
    }
    /**
     * Whether to use compact mode or not.
     */
    get compactMode() {
      return b(this, $e);
    }
    set compactMode(re) {
      z(this, $e, re);
    }
    resolveAvatar(re) {
      return wt[re] ?? re ?? wt.default;
    }
    render() {
      const re = {
        author: this.author,
        bot: this.bot,
        verified: this.verified,
        officialApp: this.officialApp,
        op: this.op,
        server: this.server,
        roleColor: this.roleColor,
        clanIcon: this.clanIcon,
        clanTag: this.clanTag
      }, B = Reflect.get(wi, this.profile) ?? {}, fe = { ...re, ...B, avatar: this.resolveAvatar(B.avatar ?? this.avatar) }, et = xs(fe.clanIcon), mt = fe.clanTag?.slice(0, 4), pt = x`
			${J(fe.bot && !fe.server && !fe.officialApp, () => x`<span class="discord-application-tag">${fe.verified ? zt() : ""}App</span>`)}
			${J(fe.server && !fe.bot && !fe.officialApp, () => x`<span class="discord-application-tag">Server</span>`)}
			${J(fe.officialApp && !fe.server && !fe.bot, () => x`<span class="discord-application-tag">${zt()}OFFICIAL</span>`)}
		`;
      return x`${J(this.compactMode || this.deleted, () => x`<div class="discord-reply-badge">${Oo()}</div>`, () => x`<img class="discord-replied-message-avatar" src="${de(fe.avatar)}" alt="${de(fe.author)}" />`)}
		${J(this.deleted, () => x`<div class="discord-replied-deleted-message-content"><em>Original message was deleted</em></div>`, () => x`${pt}
					<span class="discord-replied-message-username" style=${Ut({ color: fe.roleColor })}
						>${J(this.mentions, () => "@")}${fe.author}</span
					>
					${J(fe.clanIcon && fe.clanTag && fe.clanTag?.length > 0, () => x`<span class="discord-clan-tag">
								${et === "string" ? x`<img
											srcset=${de(et)}
											alt=${de(mt)}
											width="12"
											height="12"
											draggable="false"
										/>` : et}
								<span>${mt}</span>
							</span>`)}
					<!-- display: inline -->
					<div class="discord-replied-message-content"
						><slot></slot>${J(this.edited, () => x`<span class="discord-message-edited">(edited)</span>`)}</div
					>
					${J(this.command, () => Ms({ class: "discord-replied-message-content-icon" }), () => J(this.attachment, () => ks({ class: "discord-replied-message-content-icon" })))}`)}`;
    }
  }, ue = new WeakMap(), Q = new WeakMap(), Ee = new WeakMap(), Mt = new WeakMap(), $t = new WeakMap(), Ve = new WeakMap(), tt = new WeakMap(), it = new WeakMap(), at = new WeakMap(), st = new WeakMap(), rt = new WeakMap(), ot = new WeakMap(), lt = new WeakMap(), nt = new WeakMap(), ct = new WeakMap(), ht = new WeakMap(), dt = new WeakMap(), $e = new WeakMap(), e = Te, (() => {
    const re = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    m = [w()], v = [w()], r = [w()], f = [w({ type: Boolean })], h = [w({ type: Boolean })], M = [w({ type: Boolean, attribute: "official-app" })], E = [w({ type: Boolean })], te = [w({ type: Boolean })], g = [w({ type: Boolean })], O = [w({ attribute: "role-color" })], ae = [w({ type: Boolean })], se = [w({ type: Boolean })], P = [w({ type: Boolean })], U = [w({ attribute: "clan-icon" })], je = [w({ attribute: "clan-tag" })], ie = [w({ type: Boolean, reflect: !0 })], Ne = [He({ context: Oe }), w({ type: Boolean, reflect: !0, attribute: "light-theme" })], D = [He({ context: Jt }), w({ type: Boolean, reflect: !0, attribute: "compact-mode" })], Ye(Te, null, m, { kind: "accessor", name: "profile", static: !1, private: !1, access: { has: (B) => "profile" in B, get: (B) => B.profile, set: (B, fe) => {
      B.profile = fe;
    } }, metadata: re }, n, c), Ye(Te, null, v, { kind: "accessor", name: "author", static: !1, private: !1, access: { has: (B) => "author" in B, get: (B) => B.author, set: (B, fe) => {
      B.author = fe;
    } }, metadata: re }, u, l), Ye(Te, null, r, { kind: "accessor", name: "avatar", static: !1, private: !1, access: { has: (B) => "avatar" in B, get: (B) => B.avatar, set: (B, fe) => {
      B.avatar = fe;
    } }, metadata: re }, _, p), Ye(Te, null, f, { kind: "accessor", name: "bot", static: !1, private: !1, access: { has: (B) => "bot" in B, get: (B) => B.bot, set: (B, fe) => {
      B.bot = fe;
    } }, metadata: re }, d, o), Ye(Te, null, h, { kind: "accessor", name: "server", static: !1, private: !1, access: { has: (B) => "server" in B, get: (B) => B.server, set: (B, fe) => {
      B.server = fe;
    } }, metadata: re }, F, K), Ye(Te, null, M, { kind: "accessor", name: "officialApp", static: !1, private: !1, access: { has: (B) => "officialApp" in B, get: (B) => B.officialApp, set: (B, fe) => {
      B.officialApp = fe;
    } }, metadata: re }, C, I), Ye(Te, null, E, { kind: "accessor", name: "op", static: !1, private: !1, access: { has: (B) => "op" in B, get: (B) => B.op, set: (B, fe) => {
      B.op = fe;
    } }, metadata: re }, V, H), Ye(Te, null, te, { kind: "accessor", name: "verified", static: !1, private: !1, access: { has: (B) => "verified" in B, get: (B) => B.verified, set: (B, fe) => {
      B.verified = fe;
    } }, metadata: re }, _e, k), Ye(Te, null, g, { kind: "accessor", name: "edited", static: !1, private: !1, access: { has: (B) => "edited" in B, get: (B) => B.edited, set: (B, fe) => {
      B.edited = fe;
    } }, metadata: re }, N, be), Ye(Te, null, O, { kind: "accessor", name: "roleColor", static: !1, private: !1, access: { has: (B) => "roleColor" in B, get: (B) => B.roleColor, set: (B, fe) => {
      B.roleColor = fe;
    } }, metadata: re }, T, ee), Ye(Te, null, ae, { kind: "accessor", name: "command", static: !1, private: !1, access: { has: (B) => "command" in B, get: (B) => B.command, set: (B, fe) => {
      B.command = fe;
    } }, metadata: re }, Z, A), Ye(Te, null, se, { kind: "accessor", name: "attachment", static: !1, private: !1, access: { has: (B) => "attachment" in B, get: (B) => B.attachment, set: (B, fe) => {
      B.attachment = fe;
    } }, metadata: re }, ye, he), Ye(Te, null, P, { kind: "accessor", name: "mentions", static: !1, private: !1, access: { has: (B) => "mentions" in B, get: (B) => B.mentions, set: (B, fe) => {
      B.mentions = fe;
    } }, metadata: re }, Y, G), Ye(Te, null, U, { kind: "accessor", name: "clanIcon", static: !1, private: !1, access: { has: (B) => "clanIcon" in B, get: (B) => B.clanIcon, set: (B, fe) => {
      B.clanIcon = fe;
    } }, metadata: re }, q, ge), Ye(Te, null, je, { kind: "accessor", name: "clanTag", static: !1, private: !1, access: { has: (B) => "clanTag" in B, get: (B) => B.clanTag, set: (B, fe) => {
      B.clanTag = fe;
    } }, metadata: re }, R, j), Ye(Te, null, ie, { kind: "accessor", name: "deleted", static: !1, private: !1, access: { has: (B) => "deleted" in B, get: (B) => B.deleted, set: (B, fe) => {
      B.deleted = fe;
    } }, metadata: re }, De, Ie), Ye(Te, null, Ne, { kind: "accessor", name: "lightTheme", static: !1, private: !1, access: { has: (B) => "lightTheme" in B, get: (B) => B.lightTheme, set: (B, fe) => {
      B.lightTheme = fe;
    } }, metadata: re }, le, W), Ye(Te, null, D, { kind: "accessor", name: "compactMode", static: !1, private: !1, access: { has: (B) => "compactMode" in B, get: (B) => B.compactMode, set: (B, fe) => {
      B.compactMode = fe;
    } }, metadata: re }, $, ce), Ye(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: re }, null, a), e = t.value, re && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: re });
  })(), /**
   * @internal
   */
  me(Te, "styles", ke`
		:host {
			color: #b9bbbe;
			display: flex;
			font-size: 0.875rem;
			font-family: 'gg sans', 'Noto Sans', Whitney, 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;

			padding-top: 2px;
			margin-left: 56px;
			margin-bottom: 4px;
			align-items: center;
			line-height: 1.125rem;
			position: relative;
			white-space: pre;
			user-select: none;
		}

		:host([light-theme]) {
			color: #4f5660;
		}

		:host([compact-mode]),
		:host([deleted]) {
			margin-left: 62px;
			margin-bottom: 0;
		}

		:host:before {
			content: '';
			display: block;
			position: absolute;
			top: 50%;
			right: 100%;
			bottom: 0;
			left: -36px;
			margin-right: 4px;
			margin-top: -1px;
			margin-left: -1px;
			margin-bottom: -2px;
			border-left: 2px solid #4f545c !important;
			border-bottom: 0 solid #4f545c !important;
			border-right: 0 solid #4f545c !important;
			border-top: 2px solid #4f545c !important;
			border-top-left-radius: 6px;
		}

		:host([light-theme]):before {
			border-color: #747f8d !important;
		}

		.discord-replied-message-avatar,
		.discord-reply-badge {
			-webkit-box-flex: 0;
			-ms-flex: 0 0 auto;
			flex: 0 0 auto;
			width: 16px;
			height: 16px;
			border-radius: 50%;
			user-select: none;
			margin-right: 0.25rem;
		}

		.discord-reply-badge {
			display: flex;
			align-items: center;
			justify-content: center;
			color: #b9bbbe;
			background: #202225;
		}

		:host([light-theme]) .discord-reply-badge {
			color: #4f5660;
			background: #e3e5e8;
		}

		:host .discord-clan-tag {
			background-color: oklab(0.431937 0.00109309 -0.0132537 / 0.8);
			color: #fff;
			font-size: 12px;
			font-weight: 500;
			margin-right: 0.25rem;
			border-radius: 4px;
			line-height: 100%;
			text-transform: uppercase;
			justify-content: space-between;
			display: inline-flex;
			align-items: center;
			padding: 0 0.275rem;
			margin-top: 0.075em;
			height: 1.2rem;
			opacity: 0.55;
			transition: background-color 100ms ease-in-out;
			cursor: pointer;
		}

		:host .discord-clan-tag:hover {
			background-color: oklab(0.431937 0.00109309 -0.0132537 / 0.5);
		}

		:host([light-theme]) .discord-clan-tag {
			opacity: 0.65;
			background-color: hsl(0 calc(1 * 0%) 0.8%/0.09);
			color: #000;
		}

		:host([light-theme]) .discord-clan-tag:hover {
			background-color: hsl(0 calc(1 * 0%) 0.8%/0.03);
		}

		:host .discord-clan-tag svg,
		:host .discord-clan-tag img {
			display: inline-flex;
			align-items: center;
			margin-right: 0.25rem;
			right: 0.25rem;
		}

		:host .discord-clan-tag span {
			display: inline-flex;
			align-items: center;
			user-select: none;
			-webkit-user-select: none;
			line-height: 1rem !important;
		}

		.discord-application-tag {
			background-color: hsl(235, 85.6%, 64.7%);
			color: #fff;
			font-size: 0.625rem;
			margin-right: 0.25rem;
			line-height: 100%;
			text-transform: uppercase;

			/* Use flex layout to ensure both verified icon and "BOT" text are aligned to center */
			display: flex;
			align-items: center;

			/* Styling taken through Inspect Element on Discord client for Windows */
			height: 0.9375rem;
			padding: 0 0.275rem;
			margin-top: 0.075em;
			border-radius: 0.1875rem;
		}

		:host([compact-mode]) .discord-application-tag {
			margin-right: 0.25rem;
		}

		.discord-application-tag .discord-application-tag-verified {
			width: 0.9375rem;
			height: 0.9375rem;
			margin-left: -0.1rem;
		}

		.discord-application-tag.discord-application-tag-op {
			background-color: #c9cdfb;
			color: #4752c4;
			border-radius: 0.4rem;
		}

		.discord-replied-message-username {
			flex-shrink: 0;
			font-size: inherit;
			line-height: inherit;
			margin-right: 0.25rem;
			opacity: 0.64;
			font-weight: 500;
			color: #fff;
		}

		.discord-replied-message-username:hover {
			text-decoration: underline;
			cursor: pointer;
		}

		.discord-replied-message-content {
			color: inherit;
			font-size: inherit;
			line-height: inherit;
			white-space: pre;
			text-overflow: ellipsis;
			user-select: none;
			cursor: pointer;
		}

		.discord-replied-deleted-message-content {
			color: inherit;
			font-size: inherit;
			line-height: inherit;
			white-space: pre;
			text-overflow: ellipsis;
		}

		.discord-message-edited {
			color: #72767d;
			font-size: 10px;
		}

		:host([light-theme]) .discord-message-edited {
			color: #99aab5;
		}

		.discord-replied-message-content:hover {
			color: #fff;
		}

		:host([light-theme]) .discord-replied-message-content:hover {
			color: #000;
		}

		:host .discord-replied-message-content .discord-message-edited {
			margin-left: 0.25rem;
		}

		.discord-replied-message-content-icon {
			-webkit-box-flex: 0;
			-ms-flex: 0 0 auto;
			flex: 0 0 auto;
			width: 20px;
			height: 20px;
			margin-left: 4px;
		}
	`), Se(e, a), e;
})();
const Ao = pe`
	<path d="M4.61241 0L6 0.845294L1.38759 10L0 9.15471L4.61241 0Z" fill="currentColor" />
`;
function Lo(i = {}) {
  return x`<svg ${ve(i)} class="discord-command-icon" aria-hidden="false" width="6" height="10" viewBox="0 0 6 10" fill="none">
		${Ao}
	</svg>`;
}
const No = pe`
	<path fill="currentColor" d="M2.06 7.61c-.25.95.31 1.92 1.26 2.18l4.3 1.15c.94.25 1.91-.31 2.17-1.26l1.15-4.3c.25-.94-.31-1.91-1.26-2.17l-4.3-1.15c-.94-.25-1.91.31-2.17 1.26l-1.15 4.3ZM12.98 7.87a2 2 0 0 0 1.75 2.95H20a2 2 0 0 0 1.76-2.95l-2.63-4.83a2 2 0 0 0-3.51 0l-2.63 4.83ZM5.86 13.27a.89.89 0 0 1 1.28 0l.75.77a.9.9 0 0 0 .54.26l1.06.12c.5.06.85.52.8 1.02l-.13 1.08c-.02.2.03.42.14.6l.56.92c.27.43.14 1-.28 1.26l-.9.58a.92.92 0 0 0-.37.48l-.36 1.02a.9.9 0 0 1-1.15.57l-1-.36a.89.89 0 0 0-.6 0l-1 .36a.9.9 0 0 1-1.15-.57l-.36-1.02a.92.92 0 0 0-.37-.48l-.9-.58a.93.93 0 0 1-.28-1.26l.56-.93c.11-.17.16-.38.14-.59l-.12-1.08c-.06-.5.3-.96.8-1.02l1.05-.12a.9.9 0 0 0 .54-.26l.75-.77ZM18.52 13.71a1.1 1.1 0 0 0-2.04 0l-.46 1.24c-.19.5-.57.88-1.07 1.07l-1.24.46a1.1 1.1 0 0 0 0 2.04l1.24.46c.5.19.88.57 1.07 1.07l.46 1.24c.35.95 1.7.95 2.04 0l.46-1.24c.19-.5.57-.88 1.07-1.07l1.24-.46a1.1 1.1 0 0 0 0-2.04l-1.24-.46a1.8 1.8 0 0 1-1.07-1.07l-.46-1.24Z">
	</path>
`;
function Po(i = {}) {
  return x`<svg ${ve(i)} class="discord-command-icon-name" aria-hidden="false" width="10" height="10" viewBox="0 0 24 24" fill="none">
		${No}
	</svg>`;
}
const Bo = pe`
	<path fill="currentColor" d="M5.3 9.3a1 1 0 0 1 1.4 0l5.3 5.29 5.3-5.3a1 1 0 1 1 1.4 1.42l-6 6a1 1 0 0 1-1.4 0l-6-6a1 1 0 0 1 0-1.42Z"></path>
`;
function ba(i = {}) {
  return x`<svg ${ve(i)} aria-hidden="false" width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		${Bo}
	</svg>`;
}
const Ro = pe`
	<path fill="color-mix( in oklab, hsl(215 calc(1 * 8.8%) 73.3% / 1) 100%, black 0%" d="M12 22a10 10 0 1 0-8.45-4.64c.13.19.11.44-.04.61l-2.06 2.37A1 1 0 0 0 2.2 22H12Z" class="">
    </path>
`;
function Uo(i = {}) {
  return x`<svg ${ve(i)} aria-hidden="false" width="16" height="16" viewBox="0 0 24 24" fill="none">${Ro}</svg>`;
}
var Ze = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
}, Ce = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
};
(() => {
  var Ve, tt, it, at, st, rt, ot, lt, nt, ct, ht, dt, $e, xt, Tt, re, B, fe, et, mt, pt;
  let i = [Me("discord-command")], t, a = [], e, s = we, m, n = [], c = [], v, u = [], l = [], r, _ = [], p = [], f, d = [], o = [], h, F = [], K = [], M, C = [], I = [], E, V = [], H = [], te, _e = [], k = [], g, N = [], be = [], O, T = [], ee = [], ae, Z = [], A = [], se, ye = [], he = [], P, Y = [], G = [], U, q = [], ge = [], je, R = [], j = [], ie, De = [], Ie = [], Ne, le = [], W = [], D, $ = [], ce = [], Te, ue = [], Q = [], Ee, Mt = [], $t = [];
  return Ve = class extends s {
    constructor() {
      super(...arguments);
      y(this, tt, Ce(this, n, void 0));
      y(this, it, (Ce(this, c), Ce(this, u, "User")));
      y(this, at, (Ce(this, l), Ce(this, _, void 0)));
      y(this, st, (Ce(this, p), Ce(this, d, void 0)));
      y(this, rt, (Ce(this, o), Ce(this, F, void 0)));
      y(this, ot, (Ce(this, K), Ce(this, C, "slash_command")));
      y(this, lt, (Ce(this, I), Ce(this, V, void 0)));
      y(this, nt, (Ce(this, H), Ce(this, _e, "User")));
      y(this, ct, (Ce(this, k), Ce(this, N, void 0)));
      y(this, ht, (Ce(this, be), Ce(this, T, void 0)));
      y(this, dt, (Ce(this, ee), Ce(this, Z, !1)));
      y(this, $e, (Ce(this, A), Ce(this, ye, !1)));
      y(this, xt, (Ce(this, he), Ce(this, Y, !1)));
      y(this, Tt, (Ce(this, G), Ce(this, q, !1)));
      y(this, re, (Ce(this, ge), Ce(this, R, void 0)));
      y(this, B, (Ce(this, j), Ce(this, De, !1)));
      y(this, fe, (Ce(this, Ie), Ce(this, le, !1)));
      y(this, et, (Ce(this, W), Ce(this, $, !1)));
      y(this, mt, (Ce(this, ce), Ce(this, ue, !1)));
      y(this, pt, (Ce(this, Q), Ce(this, Mt, !1)));
      me(this, "validCommandTypes", (Ce(this, $t), /* @__PURE__ */ new Set(["user_command", "message_command", "slash_command"])));
    }
    /**
     * The id of the profile data to use.
     */
    get profile() {
      return b(this, tt);
    }
    set profile(oe) {
      z(this, tt, oe);
    }
    /**
     * The message author's username.
     *
     * @defaultValue 'User'
     */
    get author() {
      return b(this, it);
    }
    set author(oe) {
      z(this, it, oe);
    }
    /**
     * The message author's avatar. Can be an avatar shortcut, relative path, or external link.
     */
    get avatar() {
      return b(this, at);
    }
    set avatar(oe) {
      z(this, at, oe);
    }
    /**
     * The message author's primary role color.
     * Can be any [CSS color value](https://www.w3schools.com/cssref/css_colors_legal.asp).
     */
    get roleColor() {
      return b(this, st);
    }
    set roleColor(oe) {
      z(this, st, oe);
    }
    /**
     * The name of the command invoked.
     */
    get command() {
      return b(this, rt);
    }
    set command(oe) {
      z(this, rt, oe);
    }
    /**
     * The type of command
     */
    get type() {
      return b(this, ot);
    }
    set type(oe) {
      z(this, ot, oe);
    }
    /**
     * The id of the profile data to use.
     */
    get contextUserProfile() {
      return b(this, lt);
    }
    set contextUserProfile(oe) {
      z(this, lt, oe);
    }
    /**
     * The name of user mentioned in context menu
     */
    get contextUserName() {
      return b(this, nt);
    }
    set contextUserName(oe) {
      z(this, nt, oe);
    }
    /**
     * The image of user mentioned in context menu
     */
    get contextUserAvatar() {
      return b(this, ct);
    }
    set contextUserAvatar(oe) {
      z(this, ct, oe);
    }
    /**
     * The role color of user mentioned in context menu
     */
    get contextUserRoleColor() {
      return b(this, ht);
    }
    set contextUserRoleColor(oe) {
      z(this, ht, oe);
    }
    /**
     * If the message command user  are bot
     */
    get contextUserBot() {
      return b(this, dt);
    }
    set contextUserBot(oe) {
      z(this, dt, oe);
    }
    /**
     * If the user bot are verified
     */
    get contextUserBotVerified() {
      return b(this, $e);
    }
    set contextUserBotVerified(oe) {
      z(this, $e, oe);
    }
    /**
     * Whether the referenced context message is from a response of a slash command.
     */
    get contextCommandReply() {
      return b(this, xt);
    }
    set contextCommandReply(oe) {
      z(this, xt, oe);
    }
    /**
     * Whether the referenced context message contains attachments.
     */
    get contextAttachmentReply() {
      return b(this, Tt);
    }
    set contextAttachmentReply(oe) {
      z(this, Tt, oe);
    }
    /**
     * The referenced message in message command
     */
    get contextMessageReply() {
      return b(this, re);
    }
    set contextMessageReply(oe) {
      z(this, re, oe);
    }
    /**
     * If the referenced messaga has deleted
     */
    get contextMessageDeleted() {
      return b(this, B);
    }
    set contextMessageDeleted(oe) {
      z(this, B, oe);
    }
    /**
     * If the context user is a application official of discord
     */
    get contextUserOfficialApplication() {
      return b(this, fe);
    }
    set contextUserOfficialApplication(oe) {
      z(this, fe, oe);
    }
    /**
     * If the context user is a server
     */
    get contextUserServer() {
      return b(this, et);
    }
    set contextUserServer(oe) {
      z(this, et, oe);
    }
    /**
     * Whether to use compact mode or not.
     */
    get compactMode() {
      return b(this, mt);
    }
    set compactMode(oe) {
      z(this, mt, oe);
    }
    get lightTheme() {
      return b(this, pt);
    }
    set lightTheme(oe) {
      z(this, pt, oe);
    }
    checkType() {
      if (this.type) {
        if (typeof this.type != "string")
          throw new TypeError("DiscordCommand `type` prop must be a string.");
        if (!this.validCommandTypes.has(this.type))
          throw new RangeError("DiscordCommand `type` prop must be one of: 'uer_command', 'message_command' or 'slash_command'");
      }
    }
    resolveAvatar(oe) {
      return wt[oe] ?? oe ?? wt.default;
    }
    render() {
      this.checkType();
      const oe = { author: this.author, bot: !1, verified: !1, server: !1, roleColor: this.roleColor }, L = Reflect.get(wi, this.profile) ?? {}, ze = { ...oe, ...L, avatar: this.resolveAvatar(L.avatar ?? this.avatar) }, Xt = {
        author: this.contextUserName,
        bot: this.contextUserBot,
        verified: this.contextUserBotVerified,
        server: !1,
        roleColor: this.contextUserRoleColor
      }, Zt = Reflect.get(wi, this.contextUserProfile) ?? {}, Xe = {
        ...Xt,
        ...Zt,
        avatar: this.resolveAvatar(Zt.avatar ?? this.contextUserAvatar)
      }, Kt = this.contextMessageDeleted ? x`<em class="discord-message-deleted">Original message was deleted</em>` : this.contextMessageReply;
      return x`
			${J(this.compactMode, () => x`<div class="discord-reply-badge">${Lo()}</div>`, () => x`<img class="discord-replied-message-avatar" src="${de(ze.avatar)}" alt="${de(ze.author)}" />`)}
			<span class="discord-replied-message-username" style=${Ut({ color: ze.roleColor ?? "" })}>${ze.author}</span>
			<span> used </span>
			${J(this.type === "slash_command", () => x`<div class="discord-replied-message-content discord-slash-command-name">
						${Po()}<span>${this.command}</span>
					</div>`)}
			${J(this.type === "user_command", () => x`<div class="discord-replied-message-content discord-context-command-name"><span>${this.command}</span></div>
						${ba({ class: "discord-arrow-right-icon" })}
						<div class="discord-context-user">
							${J(!this.compactMode, () => x`<img
										class="discord-replied-message-avatar"
										src="${de(Xe.avatar)}"
										alt="${de(Xe.author)}"
									/>`)}
							<span class="discord-replied-message-username" style=${Ut({ color: Xe.roleColor ?? "" })}
								>${Xe.author}</span
							>
						</div>`)}
			${J(this.type === "message_command", () => x`<div class="discord-replied-message-content discord-context-command-name"><span>${this.command}</span></div>
						${ba({ class: "discord-arrow-right-icon" })}
						${J(!this.contextMessageDeleted, () => x`<div class="discord-context-user">
									${J(!this.compactMode, () => J(!this.contextUserOfficialApplication, () => x`<img
													class="discord-replied-message-avatar"
													src="${de(Xe.avatar)}"
													alt="${de(Xe.author)}"
												/>`, () => x`<img
													class="discord-replied-message-avatar"
													src="${de(wt.blue)}"
													alt="OFFICIALAPPLICATION"
												/>`))}
									${J(Xe.bot, () => x`<span class="discord-application-tag">${Xe.verified ? zt() : ""}App</span>`, () => J(this.contextUserServer, () => x`<span class="discord-application-tag">SERVER</span>`, () => J(this.contextUserOfficialApplication, () => x`<span class="discord-application-tag">${zt()}OFFICIAL</span>`)))}
									<span class="discord-replied-message-username" style=${Ut({ color: Xe.roleColor ?? "" })}
										>${Xe.author}</span
									><span></span>
								</div>`, () => J(this.contextMessageDeleted, () => Uo({ class: "discord-message-margintop", style: "margin-right: 3px;" })))}
						<div class="discord-replied-message-content discord-message-margintop">${Kt}</div>
						${J(this.contextCommandReply && !this.contextMessageDeleted, () => Ms({ class: "discord-replied-message-content-icon discord-message-margintop" }), () => J(this.contextAttachmentReply, () => ks({ class: "discord-replied-message-content-icon discord-message-margintop" })))} `)}
		`;
    }
  }, tt = new WeakMap(), it = new WeakMap(), at = new WeakMap(), st = new WeakMap(), rt = new WeakMap(), ot = new WeakMap(), lt = new WeakMap(), nt = new WeakMap(), ct = new WeakMap(), ht = new WeakMap(), dt = new WeakMap(), $e = new WeakMap(), xt = new WeakMap(), Tt = new WeakMap(), re = new WeakMap(), B = new WeakMap(), fe = new WeakMap(), et = new WeakMap(), mt = new WeakMap(), pt = new WeakMap(), e = Ve, (() => {
    const oe = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    m = [w({ attribute: "profile" })], v = [w({ attribute: "author" })], r = [w({ attribute: "avatar" })], f = [w({ attribute: "role-color" })], h = [w({ attribute: "command" })], M = [w({ attribute: "type" })], E = [w({ attribute: "context-user-profile" })], te = [w({ attribute: "context-user-name" })], g = [w({ attribute: "context-user-image" })], O = [w({ attribute: "context-user-role-color" })], ae = [w({ type: Boolean, attribute: "context-user-bot" })], se = [w({ type: Boolean, attribute: "context-user-bot-verified" })], P = [w({ type: Boolean, attribute: "context-command-reply" })], U = [w({ type: Boolean, attribute: "context-attachment-reply" })], je = [w({ type: String, attribute: "context-message-reply" })], ie = [w({ type: Boolean, attribute: "context-message-deleted" })], Ne = [w({ type: Boolean, attribute: "context-user-application-official" })], D = [w({ type: Boolean, attribute: "context-user-server" })], Te = [He({ context: Jt }), w({ type: Boolean, reflect: !0, attribute: "compact-mode" })], Ee = [He({ context: Oe }), w({ type: Boolean, reflect: !0, attribute: "light-theme" })], Ze(Ve, null, m, { kind: "accessor", name: "profile", static: !1, private: !1, access: { has: (L) => "profile" in L, get: (L) => L.profile, set: (L, ze) => {
      L.profile = ze;
    } }, metadata: oe }, n, c), Ze(Ve, null, v, { kind: "accessor", name: "author", static: !1, private: !1, access: { has: (L) => "author" in L, get: (L) => L.author, set: (L, ze) => {
      L.author = ze;
    } }, metadata: oe }, u, l), Ze(Ve, null, r, { kind: "accessor", name: "avatar", static: !1, private: !1, access: { has: (L) => "avatar" in L, get: (L) => L.avatar, set: (L, ze) => {
      L.avatar = ze;
    } }, metadata: oe }, _, p), Ze(Ve, null, f, { kind: "accessor", name: "roleColor", static: !1, private: !1, access: { has: (L) => "roleColor" in L, get: (L) => L.roleColor, set: (L, ze) => {
      L.roleColor = ze;
    } }, metadata: oe }, d, o), Ze(Ve, null, h, { kind: "accessor", name: "command", static: !1, private: !1, access: { has: (L) => "command" in L, get: (L) => L.command, set: (L, ze) => {
      L.command = ze;
    } }, metadata: oe }, F, K), Ze(Ve, null, M, { kind: "accessor", name: "type", static: !1, private: !1, access: { has: (L) => "type" in L, get: (L) => L.type, set: (L, ze) => {
      L.type = ze;
    } }, metadata: oe }, C, I), Ze(Ve, null, E, { kind: "accessor", name: "contextUserProfile", static: !1, private: !1, access: { has: (L) => "contextUserProfile" in L, get: (L) => L.contextUserProfile, set: (L, ze) => {
      L.contextUserProfile = ze;
    } }, metadata: oe }, V, H), Ze(Ve, null, te, { kind: "accessor", name: "contextUserName", static: !1, private: !1, access: { has: (L) => "contextUserName" in L, get: (L) => L.contextUserName, set: (L, ze) => {
      L.contextUserName = ze;
    } }, metadata: oe }, _e, k), Ze(Ve, null, g, { kind: "accessor", name: "contextUserAvatar", static: !1, private: !1, access: { has: (L) => "contextUserAvatar" in L, get: (L) => L.contextUserAvatar, set: (L, ze) => {
      L.contextUserAvatar = ze;
    } }, metadata: oe }, N, be), Ze(Ve, null, O, { kind: "accessor", name: "contextUserRoleColor", static: !1, private: !1, access: { has: (L) => "contextUserRoleColor" in L, get: (L) => L.contextUserRoleColor, set: (L, ze) => {
      L.contextUserRoleColor = ze;
    } }, metadata: oe }, T, ee), Ze(Ve, null, ae, { kind: "accessor", name: "contextUserBot", static: !1, private: !1, access: { has: (L) => "contextUserBot" in L, get: (L) => L.contextUserBot, set: (L, ze) => {
      L.contextUserBot = ze;
    } }, metadata: oe }, Z, A), Ze(Ve, null, se, { kind: "accessor", name: "contextUserBotVerified", static: !1, private: !1, access: { has: (L) => "contextUserBotVerified" in L, get: (L) => L.contextUserBotVerified, set: (L, ze) => {
      L.contextUserBotVerified = ze;
    } }, metadata: oe }, ye, he), Ze(Ve, null, P, { kind: "accessor", name: "contextCommandReply", static: !1, private: !1, access: { has: (L) => "contextCommandReply" in L, get: (L) => L.contextCommandReply, set: (L, ze) => {
      L.contextCommandReply = ze;
    } }, metadata: oe }, Y, G), Ze(Ve, null, U, { kind: "accessor", name: "contextAttachmentReply", static: !1, private: !1, access: { has: (L) => "contextAttachmentReply" in L, get: (L) => L.contextAttachmentReply, set: (L, ze) => {
      L.contextAttachmentReply = ze;
    } }, metadata: oe }, q, ge), Ze(Ve, null, je, { kind: "accessor", name: "contextMessageReply", static: !1, private: !1, access: { has: (L) => "contextMessageReply" in L, get: (L) => L.contextMessageReply, set: (L, ze) => {
      L.contextMessageReply = ze;
    } }, metadata: oe }, R, j), Ze(Ve, null, ie, { kind: "accessor", name: "contextMessageDeleted", static: !1, private: !1, access: { has: (L) => "contextMessageDeleted" in L, get: (L) => L.contextMessageDeleted, set: (L, ze) => {
      L.contextMessageDeleted = ze;
    } }, metadata: oe }, De, Ie), Ze(Ve, null, Ne, { kind: "accessor", name: "contextUserOfficialApplication", static: !1, private: !1, access: { has: (L) => "contextUserOfficialApplication" in L, get: (L) => L.contextUserOfficialApplication, set: (L, ze) => {
      L.contextUserOfficialApplication = ze;
    } }, metadata: oe }, le, W), Ze(Ve, null, D, { kind: "accessor", name: "contextUserServer", static: !1, private: !1, access: { has: (L) => "contextUserServer" in L, get: (L) => L.contextUserServer, set: (L, ze) => {
      L.contextUserServer = ze;
    } }, metadata: oe }, $, ce), Ze(Ve, null, Te, { kind: "accessor", name: "compactMode", static: !1, private: !1, access: { has: (L) => "compactMode" in L, get: (L) => L.compactMode, set: (L, ze) => {
      L.compactMode = ze;
    } }, metadata: oe }, ue, Q), Ze(Ve, null, Ee, { kind: "accessor", name: "lightTheme", static: !1, private: !1, access: { has: (L) => "lightTheme" in L, get: (L) => L.lightTheme, set: (L, ze) => {
      L.lightTheme = ze;
    } }, metadata: oe }, Mt, $t), Ze(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: oe }, null, a), e = t.value, oe && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: oe });
  })(), /**
   * @internal
   */
  me(Ve, "styles", [
    Io.styles,
    ke`
			:host .discord-slash-command-name {
				color: color-mix(in oklab, hsl(200 calc(1 * 100%) 49.4% / 1) 100%, black 0%) !important;
				font-weight: 500;
				background-color: #3c4270;
				border-radius: 3px;
				display: flex;
				padding: 0 5px;
				align-items: center;
				gap: 2px;
				cursor: default;
			}

			:host .discord-slash-command-name:hover {
				color: #fffffd !important;
				background-color: #5865f2;
			}

			.discord-context-command-name {
				color: color-mix(in oklab, hsl(200 calc(1 * 100%) 49.4% / 1) 100%, black 0%) !important;
				opacity: 0.64;
				cursor: default;
				font-weight: 500;
			}

			.discord-arrow-right-icon {
				transform: rotate(267deg);
				width: 12px;
				height: 12px;
				fill: none;
				margin-right: 2px;
				margin-left: 2px;
				margin-top: 3px;
			}

			.discord-context-user {
				display: flex;
				align-items: center;
				margin-top: 3px;
			}

			.discord-message-margintop {
				margin-top: 3px;
			}

			:host .discord-message-deleted {
				color: rgb(185, 187, 190) !important;
				cursor: default;
			}

			:host .discord-replied-message-username {
				margin-right: 0;
			}

			:host([light-theme]) .discord-replied-message-username {
				color: rgb(46, 51, 56);
			}

			:host([compact-mode]) .discord-context-user {
				display: flex;
				align-items: center;
				margin: 0 !important;
			}

			:host([compact-mode]) .discord-message-margintop {
				margin-top: 0 !important;
			}
		`
  ]), Ce(e, a), e;
})();
var pi = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
}, Et = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
};
(() => {
  var M, C, I, E, V, H;
  let i = [Me("discord-custom-emoji")], t, a = [], e, s = we, m, n = [], c = [], v, u = [], l = [], r, _ = [], p = [], f, d = [], o = [], h, F = [], K = [];
  return M = class extends s {
    constructor() {
      super(...arguments);
      y(this, C, Et(this, n, void 0));
      y(this, I, (Et(this, c), Et(this, u, void 0)));
      y(this, E, (Et(this, l), Et(this, _, {})));
      y(this, V, (Et(this, p), Et(this, d, void 0)));
      y(this, H, (Et(this, o), Et(this, F, void 0)));
      Et(this, K);
    }
    /**
     * The name of the emoji
     */
    get name() {
      return b(this, C);
    }
    set name(k) {
      z(this, C, k);
    }
    /**
     * The emoji URL to use in the message.
     */
    get url() {
      return b(this, I);
    }
    set url(k) {
      z(this, I, k);
    }
    /**
     * A map of emoji names and their data {@link DiscordCustomEmoji.name | name}.
     *
     * This should be keyed as `{ key: { emojiData } }` wherein `key`
     * should occur in the {@link DiscordCustomEmoji.name | name}.
     *
     * By default this component will use the global emojis from
     * {@link getGlobalEmojiUrl}, however on SSR frameworks like Nuxt 3 global config doesn't
     * work so we provide this as an alternative method.
     */
    get customEmojisMap() {
      return b(this, E);
    }
    set customEmojisMap(k) {
      z(this, E, k);
    }
    /**
     * Determines whether or not the emoji is used in an embed, or a message.
     * If it is used in an embed, the sizing is adjusted accordingly.
     */
    get embedEmoji() {
      return b(this, V);
    }
    set embedEmoji(k) {
      z(this, V, k);
    }
    /**
     * Determines whether or not the emoji is of "jumbo size",
     * This means it is larger and is what Discord uses when the message exclusively has emojis,
     * up to a maximum of 30 emojis.
     */
    get jumbo() {
      return b(this, H);
    }
    set jumbo(k) {
      z(this, H, k);
    }
    willUpdate() {
      if (!this.url && this.name) {
        const k = Ta(this.name) ?? this.customEmojisMap[this.name];
        k && (this.url ?? (this.url = k.url ?? ""), this.embedEmoji ?? (this.embedEmoji = k.embedEmoji ?? !1));
      }
    }
    render() {
      const k = `:${this.name}:`;
      return x`<span
			class=${Le({
        "discord-embed-custom-emoji": this.embedEmoji,
        "discord-custom-emoji": !this.embedEmoji
      })}
			><img
				aria-label=${k}
				src=${de(this.url)}
				alt=${k}
				draggable="false"
				class=${Le({
        "discord-embed-custom-emoji-image": this.embedEmoji,
        "discord-custom-emoji-image": !this.embedEmoji,
        "discord-custom-jumbo-emoji-image": this.jumbo
      })}
		/></span> `;
    }
  }, C = new WeakMap(), I = new WeakMap(), E = new WeakMap(), V = new WeakMap(), H = new WeakMap(), e = M, (() => {
    const k = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    m = [w()], v = [w()], r = [w({ attribute: !1 })], f = [w({ type: Boolean, attribute: "embed-emoji" })], h = [w({ type: Boolean, attribute: "jumbo" })], pi(M, null, m, { kind: "accessor", name: "name", static: !1, private: !1, access: { has: (g) => "name" in g, get: (g) => g.name, set: (g, N) => {
      g.name = N;
    } }, metadata: k }, n, c), pi(M, null, v, { kind: "accessor", name: "url", static: !1, private: !1, access: { has: (g) => "url" in g, get: (g) => g.url, set: (g, N) => {
      g.url = N;
    } }, metadata: k }, u, l), pi(M, null, r, { kind: "accessor", name: "customEmojisMap", static: !1, private: !1, access: { has: (g) => "customEmojisMap" in g, get: (g) => g.customEmojisMap, set: (g, N) => {
      g.customEmojisMap = N;
    } }, metadata: k }, _, p), pi(M, null, f, { kind: "accessor", name: "embedEmoji", static: !1, private: !1, access: { has: (g) => "embedEmoji" in g, get: (g) => g.embedEmoji, set: (g, N) => {
      g.embedEmoji = N;
    } }, metadata: k }, d, o), pi(M, null, h, { kind: "accessor", name: "jumbo", static: !1, private: !1, access: { has: (g) => "jumbo" in g, get: (g) => g.jumbo, set: (g, N) => {
      g.jumbo = N;
    } }, metadata: k }, F, K), pi(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: k }, null, a), e = t.value, k && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: k });
  })(), /**
   * @internal
   */
  me(M, "styles", ke`
		.discord-custom-emoji {
			display: inline-block;
			cursor: pointer;
		}

		.discord-custom-emoji .discord-custom-emoji-image {
			object-fit: contain;
			width: 1.375rem;
			height: 1.375rem;
			vertical-align: bottom;
		}

		.discord-custom-emoji .discord-custom-jumbo-emoji-image {
			width: 3rem;
			height: 3rem;
			min-height: 3rem;
		}

		.discord-embed-custom-emoji {
			display: inline-block;
		}

		.discord-embed-custom-emoji .discord-embed-custom-emoji-image {
			width: 18px;
			height: 18px;
			vertical-align: bottom;
		}
	`), Et(e, a), e;
})();
var gt = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
}, Pe = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
};
(() => {
  var P, Y, G, U, q, ge, je, R, j, ie, De, Ie, Ne;
  let i = [Me("discord-embed")], t, a = [], e, s = we, m, n = [], c = [], v, u = [], l = [], r, _ = [], p = [], f, d = [], o = [], h, F = [], K = [], M, C = [], I = [], E, V = [], H = [], te, _e = [], k = [], g, N = [], be = [], O, T = [], ee = [], ae, Z = [], A = [], se, ye = [], he = [];
  return P = class extends s {
    constructor() {
      super(...arguments);
      y(this, Y, Pe(this, n, void 0));
      y(this, G, (Pe(this, c), Pe(this, u, void 0)));
      y(this, U, (Pe(this, l), Pe(this, _, void 0)));
      y(this, q, (Pe(this, p), Pe(this, d, void 0)));
      y(this, ge, (Pe(this, o), Pe(this, F, void 0)));
      y(this, je, (Pe(this, K), Pe(this, C, {})));
      y(this, R, (Pe(this, I), Pe(this, V, void 0)));
      y(this, j, (Pe(this, H), Pe(this, _e, void 0)));
      y(this, ie, (Pe(this, k), Pe(this, N, void 0)));
      y(this, De, (Pe(this, be), Pe(this, T, void 0)));
      y(this, Ie, (Pe(this, ee), Pe(this, Z, void 0)));
      y(this, Ne, (Pe(this, A), Pe(this, ye, !1)));
      Pe(this, he);
    }
    /**
     * The color to use for the embed's left border.
     * Can be any [CSS color value](https://www.w3schools.com/cssref/css_colors_legal.asp).
     */
    get color() {
      return b(this, Y);
    }
    set color(D) {
      z(this, Y, D);
    }
    /**
     * The author's name.
     */
    get authorName() {
      return b(this, G);
    }
    set authorName(D) {
      z(this, G, D);
    }
    /**
     * The author's avatar URL.
     */
    get authorImage() {
      return b(this, U);
    }
    set authorImage(D) {
      z(this, U, D);
    }
    /**
     * The URL to open when you click on the author's name.
     */
    get authorUrl() {
      return b(this, q);
    }
    set authorUrl(D) {
      z(this, q, D);
    }
    /**
     * The embed title.
     */
    get embedTitle() {
      return b(this, ge);
    }
    set embedTitle(D) {
      z(this, ge, D);
    }
    /**
     * An emoji that is prefixed to {@link DiscordEmbed.embedTitle | embedTitle}.
     *
     * This should be keyed as `{ key: { emojiData } }` wherein `key`
     * should occur in the {@link DiscordEmbed.embedTitle | embedTitle}.
     *
     * By default this component will use the global emojis from
     * {@link getGlobalEmojiUrl}, however on SSR frameworks like Nuxt 3 global config doesn't
     * work so we provide this as an alternative method.
     */
    get embedEmojisMap() {
      return b(this, je);
    }
    set embedEmojisMap(D) {
      z(this, je, D);
    }
    /**
     * The URL to open when you click on the embed title.
     */
    get url() {
      return b(this, R);
    }
    set url(D) {
      z(this, R, D);
    }
    /**
     * The thumbnail image to use.
     */
    get thumbnail() {
      return b(this, j);
    }
    set thumbnail(D) {
      z(this, j, D);
    }
    /**
     * The embed image to use (displayed at the bottom).
     */
    get image() {
      return b(this, ie);
    }
    set image(D) {
      z(this, ie, D);
    }
    /**
     * The embed video to use (displayed at the bottom, same slot as the image).
     *
     * @remarks
     * - YouTube videos will not be playable on your projects, this is due to YouTube using DASH to play their videos rather
     * than providing the raw media stream (in a container such as mp4 or ogg). Links to regular MP4 files (such as on a CDN) however
     * will autoplay!
     * - Video takes priority over image.
     * - Providing both a video and an image will ensure the image is shown to users with browsers
     * that do not support HTML5 video playback.
     * @example https://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_1080p_stereo.ogg
     */
    get video() {
      return b(this, De);
    }
    set video(D) {
      z(this, De, D);
    }
    /**
     * The provider to show above the embed, for example for YouTube videos it will show "YouTube" at the top of the embed (above the author)
     *
     * @example YouTube
     */
    get provider() {
      return b(this, Ie);
    }
    set provider(D) {
      z(this, Ie, D);
    }
    get lightTheme() {
      return b(this, Ne);
    }
    set lightTheme(D) {
      z(this, Ne, D);
    }
    render() {
      const D = this.parseTitle(this.authorName), $ = this.parseTitle(this.embedTitle);
      return x`<div style=${Ut({ "background-color": this.color })} class="discord-left-border"></div>
			<div class="discord-embed-root">
				<div class="discord-embed-wrapper">
					<div class="discord-embed-grid">
						${J(this.provider, () => x`<div class="discord-embed-provider">${this.provider}</div>`)}
						${J(D, () => x`<div class="discord-embed-author">
									${J(this.authorImage, () => x`<img src=${de(this.authorImage)} alt="" class="discord-author-image" />`)}
									${J(this.authorUrl, () => x`<a
												href=${de(this.authorUrl)}
												target="_blank"
												rel="noopener noreferrer"
												class="discord-embed-author-block"
											>
												<span class="discord-embed-author-block">${D}</span>
											</a>`, () => x`<span class="discord-embed-author-block">${D}</span>`)}
								</div>`)}
						${J($, () => x`<div class="discord-embed-title">
									${this.url ? x`<a href="${this.url}" target="_blank" rel="noopener noreferrer"> ${$} </a>` : x`${$}`}
								</div>`)}
						<slot name="description"></slot>
						<slot name="fields"></slot>
						${J(this.image || this.video, () => x`<div class=${Le({ "discord-embed-media": !0, "discord-embed-media-video": !!this.video })}>
									${this.renderMedia()}
								</div>`)}
						${J(this.thumbnail, () => x`<img src=${de(this.thumbnail)} alt="" class="discord-embed-thumbnail" />`)}
						<slot name="footer"></slot>
					</div>
				</div>
			</div>`;
    }
    renderMedia() {
      return this.video ? x`
				<video
					controls
					muted
					preload="none"
					poster=${de(this.image)}
					src=${de(this.video)}
					height="225"
					width="400"
					class="discord-embed-video"
				>
					<img src=${de(this.image)} alt="Discord embed media" class="discord-embed-image" />
				</video>
			` : this.image ? x`<img src=${de(this.image)} alt="Discord embed media" class="discord-embed-image" />` : null;
    }
    parseTitle(D) {
      if (!D)
        return null;
      const $ = [];
      let ce = "";
      for (const Te of D.split(`
`)) {
        for (const ue of Te.split(" ")) {
          const Q = Ta(ue) ?? this.embedEmojisMap[ue] ?? {};
          Q.name ? $.push(x`<discord-custom-emoji name=${Q.name} url=${de(Q.url)} embed-emoji></discord-custom-emoji>`) : ce += `${ue} `, ce === " " && $.push(x`<br />`);
        }
        $.push(ce), ce = "";
      }
      return $.map((Te) => typeof Te == "string" ? x`<span>${Te}</span>` : Te);
    }
  }, Y = new WeakMap(), G = new WeakMap(), U = new WeakMap(), q = new WeakMap(), ge = new WeakMap(), je = new WeakMap(), R = new WeakMap(), j = new WeakMap(), ie = new WeakMap(), De = new WeakMap(), Ie = new WeakMap(), Ne = new WeakMap(), e = P, (() => {
    const D = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    m = [w()], v = [w({ attribute: "author-name" })], r = [w({ attribute: "author-image" })], f = [w({ attribute: "author-url" })], h = [w({ attribute: "embed-title" })], M = [w({ attribute: !1 })], E = [w()], te = [w()], g = [w()], O = [w()], ae = [w()], se = [He({ context: Oe, subscribe: !0 }), w({ type: Boolean, reflect: !0, attribute: "light-theme" })], gt(P, null, m, { kind: "accessor", name: "color", static: !1, private: !1, access: { has: ($) => "color" in $, get: ($) => $.color, set: ($, ce) => {
      $.color = ce;
    } }, metadata: D }, n, c), gt(P, null, v, { kind: "accessor", name: "authorName", static: !1, private: !1, access: { has: ($) => "authorName" in $, get: ($) => $.authorName, set: ($, ce) => {
      $.authorName = ce;
    } }, metadata: D }, u, l), gt(P, null, r, { kind: "accessor", name: "authorImage", static: !1, private: !1, access: { has: ($) => "authorImage" in $, get: ($) => $.authorImage, set: ($, ce) => {
      $.authorImage = ce;
    } }, metadata: D }, _, p), gt(P, null, f, { kind: "accessor", name: "authorUrl", static: !1, private: !1, access: { has: ($) => "authorUrl" in $, get: ($) => $.authorUrl, set: ($, ce) => {
      $.authorUrl = ce;
    } }, metadata: D }, d, o), gt(P, null, h, { kind: "accessor", name: "embedTitle", static: !1, private: !1, access: { has: ($) => "embedTitle" in $, get: ($) => $.embedTitle, set: ($, ce) => {
      $.embedTitle = ce;
    } }, metadata: D }, F, K), gt(P, null, M, { kind: "accessor", name: "embedEmojisMap", static: !1, private: !1, access: { has: ($) => "embedEmojisMap" in $, get: ($) => $.embedEmojisMap, set: ($, ce) => {
      $.embedEmojisMap = ce;
    } }, metadata: D }, C, I), gt(P, null, E, { kind: "accessor", name: "url", static: !1, private: !1, access: { has: ($) => "url" in $, get: ($) => $.url, set: ($, ce) => {
      $.url = ce;
    } }, metadata: D }, V, H), gt(P, null, te, { kind: "accessor", name: "thumbnail", static: !1, private: !1, access: { has: ($) => "thumbnail" in $, get: ($) => $.thumbnail, set: ($, ce) => {
      $.thumbnail = ce;
    } }, metadata: D }, _e, k), gt(P, null, g, { kind: "accessor", name: "image", static: !1, private: !1, access: { has: ($) => "image" in $, get: ($) => $.image, set: ($, ce) => {
      $.image = ce;
    } }, metadata: D }, N, be), gt(P, null, O, { kind: "accessor", name: "video", static: !1, private: !1, access: { has: ($) => "video" in $, get: ($) => $.video, set: ($, ce) => {
      $.video = ce;
    } }, metadata: D }, T, ee), gt(P, null, ae, { kind: "accessor", name: "provider", static: !1, private: !1, access: { has: ($) => "provider" in $, get: ($) => $.provider, set: ($, ce) => {
      $.provider = ce;
    } }, metadata: D }, Z, A), gt(P, null, se, { kind: "accessor", name: "lightTheme", static: !1, private: !1, access: { has: ($) => "lightTheme" in $, get: ($) => $.lightTheme, set: ($, ce) => {
      $.lightTheme = ce;
    } }, metadata: D }, ye, he), gt(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: D }, null, a), e = t.value, D && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: D });
  })(), /**
   * @internal
   */
  me(P, "styles", ke`
		:host {
			color: #dcddde;
			display: flex;
			font-size: 13px;
			line-height: 150%;
			margin-bottom: 8px;
			margin-top: 8px;
		}

		:host([light-theme]) {
			color: #2e3338;
		}

		:host .discord-left-border {
			background-color: #202225;
			border-radius: 4px 0 0 4px;
			flex-shrink: 0;
			width: 4px;
		}

		:host([light-theme]) .discord-left-border {
			background-color: #e3e5e8;
		}

		:host .discord-embed-root {
			display: grid;
			grid-auto-flow: row;
			grid-row-gap: 0.25rem;
			min-height: 0;
			min-width: 0;
			text-indent: 0;
		}

		:host .discord-embed-wrapper {
			background-color: #2f3136;
			max-width: 520px;
			border: 1px solid rgba(46, 48, 54, 0.6);
			border-radius: 0 4px 4px 0;
			justify-self: start;
			align-self: start;
			display: grid;
			box-sizing: border-box;
		}

		:host([light-theme]) .discord-embed-wrapper {
			background-color: rgb(242, 243, 245);
			border-color: rgba(205, 205, 205, 0.3);
		}

		:host .discord-embed-wrapper .discord-embed-grid {
			display: inline-grid;
			grid-template-columns: auto -webkit-min-content;
			grid-template-columns: auto min-content;
			grid-template-columns: auto;
			grid-template-rows: auto;
			padding: 0.5rem 1rem 1rem 0.75rem;
		}

		:host .discord-embed-thumbnail {
			border-radius: 4px;
			flex-shrink: 0;
			grid-column: 2/2;
			grid-row: 1/8;
			justify-self: end;
			margin-left: 16px;
			margin-top: 8px;
			max-height: 80px;
			max-width: 80px;
			object-fit: contain;
			object-position: top center;
		}

		:host .discord-embed-author {
			-webkit-box-align: center;
			align-items: center;
			color: #fff;
			font-size: 14px;
			display: flex;
			font-weight: 600;
			grid-column: 1 / 1;
			margin-top: 8px;
			min-width: 0;
		}

		:host([light-theme]) .discord-embed-author {
			color: #060607;
		}

		:host .discord-embed-author a {
			color: #fff;
			font-weight: 600;
			text-decoration: none;
		}

		:host .discord-embed-author a:hover {
			text-decoration: underline;
		}

		:host([light-theme]) .discord-embed-author a {
			color: #060607;
		}

		:host .discord-embed-author .discord-author-image {
			border-radius: 50%;
			height: 24px;
			margin-right: 8px;
			width: 24px;
		}

		:host .discord-embed-author-block,
		:host .discord-embed-author-block > span {
			max-width: 95%;
		}

		:host .discord-embed-provider {
			font-size: 0.75rem;
			line-height: 1rem;
			font-weight: 400;
			grid-column: 1/1;
			margin-top: 8px;
			unicode-bidi: plaintext;
			text-align: left;
		}

		:host([light-theme]) .discord-embed-provider {
			color: #4f545c;
		}

		:host .discord-embed-title {
			-webkit-box-align: center;
			align-items: center;
			color: #fff;
			display: inline-block;
			font-size: 1rem;
			font-weight: 600;
			grid-column: 1 / 1;
			margin-top: 8px;
			min-width: 0;
		}

		:host([light-theme]) .discord-embed-title {
			color: #060607;
		}

		:host .discord-embed-title a {
			color: #00aff4;
			font-weight: 600;
			text-decoration: none;
		}

		:host .discord-embed-title a:hover {
			text-decoration: underline;
		}

		:host .discord-embed-image {
			border-radius: 4px;
			max-width: 300px;
			max-height: 300px;
		}

		:host .discord-embed-media {
			border-radius: 4px;
			contain: paint;
			display: block;
			grid-column: 1/1;
			margin-top: 16px;
		}

		:host .discord-embed-media.discord-embed-media-video {
			height: 225px;
		}

		:host .discord-embed.media .discord-embed-image {
			overflow: hidden;
			position: relative;
			user-select: text;
		}

		:host .discord-embed-media .discord-embed-video {
			-webkit-box-align: center;
			-webkit-box-pack: center;
			align-items: center;
			border-radius: 0;
			cursor: pointer;
			display: flex;
			height: 100%;
			justify-content: center;
			max-height: 100%;
			width: 100%;

			width: 400px;
			height: 225px;
			left: 0px;
			top: 0px;
		}

		.discord-embed-custom-emoji {
			display: inline-block;
		}

		.discord-embed-custom-emoji .discord-embed-custom-emoji-image {
			width: 18px;
			height: 18px;
			vertical-align: bottom;
		}

		slot[name='footer']::slotted(*) {
			grid-column: 1/3;
			grid-row: auto/auto;
		}
	`), Pe(e, a), e;
})();
var Fo = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
}, Zo = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
};
(() => {
  var m;
  let i = [Me("discord-embed-description")], t, a = [], e, s = we;
  return m = class extends s {
    render() {
      return x`<slot></slot>`;
    }
  }, e = m, (() => {
    const c = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    Fo(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: c }, null, a), e = t.value, c && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: c });
  })(), /**
   * @internal
   */
  me(m, "styles", ke`
		:host {
			font-size: 0.875rem;
			font-weight: 400;
			grid-column: 1/1;
			line-height: 1.125rem;
			margin-top: 8px;
			min-width: 0;
		}
	`), Zo(e, a), e;
})();
var vi = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
}, St = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
};
(() => {
  var M, C, I, E, V, H;
  let i = [Me("discord-embed-field")], t, a = [], e, s = we, m, n = [], c = [], v, u = [], l = [], r, _ = [], p = [], f, d = [], o = [], h, F = [], K = [];
  return M = class extends s {
    constructor() {
      super(...arguments);
      y(this, C, St(this, n, void 0));
      y(this, I, (St(this, c), St(this, u, {})));
      y(this, E, (St(this, l), St(this, _, !1)));
      y(this, V, (St(this, p), St(this, d, void 0)));
      y(this, H, (St(this, o), St(this, F, !1)));
      me(this, "validInlineIndices", (St(this, K), /* @__PURE__ */ new Set([1, 2, 3])));
    }
    get fieldTitle() {
      return b(this, C);
    }
    set fieldTitle(k) {
      z(this, C, k);
    }
    /**
     * An emoji that is prefixed to {@link DiscordEmbedField.fieldTitle | fieldTitle}.
     *
     * This should be keyed as `{ key: { emojiData } }` wherein `key`
     * should occur in the {@link DiscordEmbedField.fieldTitle | fieldTitle}.
     *
     * By default this component will use the global emojis from
     * {@link getGlobalEmojiUrl}, however on SSR frameworks like Nuxt 3 global config doesn't
     * work so we provide this as an alternative method.
     */
    get embedFieldEmojisMap() {
      return b(this, I);
    }
    set embedFieldEmojisMap(k) {
      z(this, I, k);
    }
    /**
     * Whether this field should be displayed inline or not.
     */
    get inline() {
      return b(this, E);
    }
    set inline(k) {
      z(this, E, k);
    }
    /**
     * The index of this inline field
     *
     * @remarks
     * - This defines the position of this inline field. 1 is left, 2 is middle and 3 is right.
     * - one of `[1, 2, 3]`
     * @defaultValue 1
     */
    get inlineIndex() {
      return b(this, V);
    }
    set inlineIndex(k) {
      z(this, V, k);
    }
    get lightTheme() {
      return b(this, H);
    }
    set lightTheme(k) {
      z(this, H, k);
    }
    checkInlineIndex() {
      if (this.inlineIndex) {
        const k = Number(this.inlineIndex);
        if (!Number.isNaN(k) && !this.validInlineIndices.has(k))
          throw new RangeError("DiscordEmbedField `inlineIndex` prop must be one of: 1, 2, or 3");
      }
    }
    render() {
      this.checkInlineIndex();
      const k = this.parseTitle(this.fieldTitle), g = J(k, () => x`<div class="discord-field-title">${[...k]}</div>`);
      return x`${g}<slot></slot>`;
    }
    parseTitle(k) {
      if (!k)
        return null;
      const g = [];
      let N = "";
      for (const be of k.split(`
`)) {
        for (const O of be.split(" ")) {
          const T = Ta(O) ?? this.embedFieldEmojisMap[O] ?? {};
          T.name ? g.push(x`<discord-custom-emoji name=${T.name} url=${de(T.url)} embed-emoji></discord-custom-emoji>`) : N += `${O} `, N === " " && g.push(x`<br />`);
        }
        g.push(N), N = "";
      }
      return g.map((be) => typeof be == "string" ? x`<span>${be}</span>` : be);
    }
  }, C = new WeakMap(), I = new WeakMap(), E = new WeakMap(), V = new WeakMap(), H = new WeakMap(), e = M, (() => {
    const k = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    m = [w({ reflect: !0, attribute: "field-title" })], v = [w({ attribute: !1 })], r = [w({ type: Boolean, reflect: !0, attribute: "inline" })], f = [w({ type: Number, reflect: !0, attribute: "inline-index" })], h = [He({ context: Oe, subscribe: !0 }), w({ type: Boolean, reflect: !0, attribute: "light-theme" })], vi(M, null, m, { kind: "accessor", name: "fieldTitle", static: !1, private: !1, access: { has: (g) => "fieldTitle" in g, get: (g) => g.fieldTitle, set: (g, N) => {
      g.fieldTitle = N;
    } }, metadata: k }, n, c), vi(M, null, v, { kind: "accessor", name: "embedFieldEmojisMap", static: !1, private: !1, access: { has: (g) => "embedFieldEmojisMap" in g, get: (g) => g.embedFieldEmojisMap, set: (g, N) => {
      g.embedFieldEmojisMap = N;
    } }, metadata: k }, u, l), vi(M, null, r, { kind: "accessor", name: "inline", static: !1, private: !1, access: { has: (g) => "inline" in g, get: (g) => g.inline, set: (g, N) => {
      g.inline = N;
    } }, metadata: k }, _, p), vi(M, null, f, { kind: "accessor", name: "inlineIndex", static: !1, private: !1, access: { has: (g) => "inlineIndex" in g, get: (g) => g.inlineIndex, set: (g, N) => {
      g.inlineIndex = N;
    } }, metadata: k }, d, o), vi(M, null, h, { kind: "accessor", name: "lightTheme", static: !1, private: !1, access: { has: (g) => "lightTheme" in g, get: (g) => g.lightTheme, set: (g, N) => {
      g.lightTheme = N;
    } }, metadata: k }, F, K), vi(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: k }, null, a), e = t.value, k && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: k });
  })(), /**
   * @internal
   */
  me(M, "styles", ke`
		:host {
			font-size: 0.875rem;
			line-height: 1.125rem;
			min-width: 0;
			font-weight: 400;
			grid-column: 1/13;
			word-break: break-word;
		}

		:host .discord-field-title {
			color: #ffffff;
			font-weight: 600;
			font-size: 0.875rem;
			line-height: 1.125rem;
			min-width: 0;
			margin-bottom: 2px;
		}

		:host .discord-inline-field {
			flex-grow: 1;
			flex-basis: auto;
			min-width: 150px;
		}

		:host([light-theme]) .discord-field-title {
			color: #313338;
		}
	`), St(e, a), e;
})();
var qo = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
}, Wo = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
};
(() => {
  var m;
  let i = [Me("discord-embed-fields")], t, a = [], e, s = we;
  return m = class extends s {
    render() {
      return x`<slot></slot>`;
    }
  }, e = m, (() => {
    const c = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    qo(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: c }, null, a), e = t.value, c && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: c });
  })(), /**
   * @internal
   */
  me(m, "styles", ke`
		:host {
			display: grid;
			grid-column: 1/1;
			margin-top: 8px;
			grid-gap: 8px;
		}

		::slotted([inline-index='1']) {
			grid-column: 1/5 !important;
		}

		::slotted([inline-index='2']) {
			grid-column: 5/9 !important;
		}

		::slotted([inline-index='3']) {
			grid-column: 9/13 !important;
		}
	`), Wo(e, a), e;
})();
var Oi = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
}, Nt = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
};
(() => {
  var h, F, K, M, C;
  let i = [Me("discord-embed-footer")], t, a = [], e, s = we, m, n = [], c = [], v, u = [], l = [], r, _ = [], p = [], f, d = [], o = [];
  return h = class extends s {
    constructor() {
      super(...arguments);
      y(this, F, Nt(this, n, void 0));
      y(this, K, (Nt(this, c), Nt(this, u, void 0)));
      y(this, M, (Nt(this, l), Nt(this, _, void 0)));
      y(this, C, (Nt(this, p), Nt(this, d, !1)));
      Nt(this, o);
    }
    /**
     * The image to use next to the footer text.
     */
    get footerImage() {
      return b(this, F);
    }
    set footerImage(V) {
      z(this, F, V);
    }
    /**
     * The alt attribute to use for the {@link DiscordEmbedFooter.footerImage}
     */
    get footerImageAlt() {
      return b(this, K);
    }
    set footerImageAlt(V) {
      z(this, K, V);
    }
    /**
     * The timestamp to use for the message date. When supplying a string, the format must be `01/31/2000`.
     */
    get timestamp() {
      return b(this, M);
    }
    set timestamp(V) {
      z(this, M, V);
    }
    get lightTheme() {
      return b(this, C);
    }
    set lightTheme(V) {
      z(this, C, V);
    }
    updateTimestamp(V) {
      V && !Number.isNaN(new Date(V).getTime()) && (this.timestamp = Wi(V));
    }
    render() {
      return this.updateTimestamp(this.timestamp), x`${J(this.footerImage, () => x`<img src=${de(this.footerImage)} alt=${de(this.footerImageAlt)} class="discord-footer-image" />`)}
			<slot></slot>
			${J(this.timestamp, () => x`<span class="discord-footer-separator">&bull;</span>`)}
			${J(this.timestamp, () => ` ${this.timestamp}`, () => null)}`;
    }
  }, F = new WeakMap(), K = new WeakMap(), M = new WeakMap(), C = new WeakMap(), e = h, (() => {
    const V = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    m = [w({ attribute: "footer-image" })], v = [w({ attribute: "footer-image-alt" })], r = [w({
      type: String,
      reflect: !0,
      converter: (H) => Wi(H),
      attribute: !0
    })], f = [He({ context: Oe, subscribe: !0 }), w({ type: Boolean, reflect: !0, attribute: "light-theme" })], Oi(h, null, m, { kind: "accessor", name: "footerImage", static: !1, private: !1, access: { has: (H) => "footerImage" in H, get: (H) => H.footerImage, set: (H, te) => {
      H.footerImage = te;
    } }, metadata: V }, n, c), Oi(h, null, v, { kind: "accessor", name: "footerImageAlt", static: !1, private: !1, access: { has: (H) => "footerImageAlt" in H, get: (H) => H.footerImageAlt, set: (H, te) => {
      H.footerImageAlt = te;
    } }, metadata: V }, u, l), Oi(h, null, r, { kind: "accessor", name: "timestamp", static: !1, private: !1, access: { has: (H) => "timestamp" in H, get: (H) => H.timestamp, set: (H, te) => {
      H.timestamp = te;
    } }, metadata: V }, _, p), Oi(h, null, f, { kind: "accessor", name: "lightTheme", static: !1, private: !1, access: { has: (H) => "lightTheme" in H, get: (H) => H.lightTheme, set: (H, te) => {
      H.lightTheme = te;
    } }, metadata: V }, d, o), Oi(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: V }, null, a), e = t.value, V && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: V });
  })(), /**
   * @internal
   */
  me(h, "styles", ke`
		:host {
			-webkit-box-align: center;
			align-items: center;
			display: flex;
			font-size: 12px;
			line-height: 16px;
			font-weight: 500;
			margin-top: 8px;
		}

		:host([light-theme]) {
			color: #747f8d;
		}

		:host .discord-footer-image {
			border-radius: 50%;
			flex-shrink: 0;
			height: 20px;
			margin-right: 8px;
			width: 20px;
		}

		:host .discord-footer-separator {
			color: #dcddde;
			font-weight: 500;
			display: inline-block;
			margin: 0 4px;
		}

		:host([light-theme]) .discord-footer-separator {
			color: #5c5e66;
		}
	`), Nt(e, a), e;
})();
const Yo = pe`
	<path
	fill="#939bf9"
	d="m72 29.3v60.3c0 2.24 0 3.36-.44 4.22-.38.74-1 1.36-1.74 1.74-.86.44-1.98.44-4.22.44h-59.2c-2.24 0-3.36 0-4.22-.44-.74-.38-1.36-1-1.74-1.74-.44-.86-.44-1.98-.44-4.22v-83.2c0-2.24 0-3.36.44-4.22.38-.74 1-1.36 1.74-1.74.86-.44 1.98-.44 4.22-.44h36.3c1.96 0 2.94 0 3.86.22.5.12.98.28 1.44.5v16.88c0 2.24 0 3.36.44 4.22.38.74 1 1.36 1.74 1.74.86.44 1.98.44 4.22.44h16.88c.22.46.38.94.5 1.44.22.92.22 1.9.22 3.86z" fill="#d3d6fd"/><path d="m68.26 20.26c1.38 1.38 2.06 2.06 2.56 2.88.18.28.32.56.46.86h-16.88c-2.24 0-3.36 0-4.22-.44-.74-.38-1.36-1-1.74-1.74-.44-.86-.44-1.98-.44-4.22v-16.880029c.3.14.58.28.86.459999.82.5 1.5 1.18 2.88 2.56z" />
`;
function Qo(i = {}) {
  return x`<svg ${ve(i)} aria-hidden="false" fill="none" width="72" height="96" viewBox="0 0 72 96">${Yo}</svg>`;
}
var Pt = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
}, Ge = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
};
(() => {
  var g, N, be, O, T, ee, ae, Z, A;
  let i = [Me("discord-file-attachment")], t, a = [], e, s = we, m, n = [], c = [], v, u = [], l = [], r, _ = [], p = [], f, d = [], o = [], h, F = [], K = [], M, C = [], I = [], E, V = [], H = [], te, _e = [], k = [];
  return g = class extends s {
    constructor() {
      super(...arguments);
      y(this, N, Ge(this, n, void 0));
      y(this, be, (Ge(this, c), Ge(this, u, void 0)));
      y(this, O, (Ge(this, l), Ge(this, _, void 0)));
      y(this, T, (Ge(this, p), Ge(this, d, void 0)));
      y(this, ee, (Ge(this, o), Ge(this, F, void 0)));
      y(this, ae, (Ge(this, K), Ge(this, C, void 0)));
      y(this, Z, (Ge(this, I), Ge(this, V, void 0)));
      y(this, A, (Ge(this, H), Ge(this, _e, !1)));
      Ge(this, k);
    }
    /**
     * The name of the file
     *
     * @example
     * ```ts
     * 'example.txt'
     * ```
     */
    get name() {
      return b(this, N);
    }
    set name(he) {
      z(this, N, he);
    }
    /**
     * The size of the file in bytes
     *
     * @remarks The unit is not automatically calculated,
     * you should provide it manually through {@link DiscordFileAttachment.bytesUnit | `bytesUnit`}
     * @example
     * ```ts
     * 1024
     * ```
     */
    get bytes() {
      return b(this, be);
    }
    set bytes(he) {
      z(this, be, he);
    }
    /**
     * The unit of the file in a human-readable format
     *
     * @example
     * ```ts
     * 'KB'
     * ```
     */
    get bytesUnit() {
      return b(this, O);
    }
    set bytesUnit(he) {
      z(this, O, he);
    }
    /**
     * The URL to the file, this is passed to `<discord-link>`
     *
     * @example
     * ```ts
     * 'https://example.com/example.txt'
     * ```
     */
    get href() {
      return b(this, T);
    }
    set href(he) {
      z(this, T, he);
    }
    /**
     * The `<a>` tag {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#rel | `rel`},
     * this is passed to `<discord-link>`
     */
    get rel() {
      return b(this, ee);
    }
    set rel(he) {
      z(this, ee, he);
    }
    /**
     * The `<a>` tag {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#target | `target`},
     * this is passed to `<discord-link>`
     */
    get target() {
      return b(this, ae);
    }
    set target(he) {
      z(this, ae, he);
    }
    /**
     * The `<a>` tag {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#type | `type`},
     * this is passed to `<discord-link>`
     */
    get type() {
      return b(this, Z);
    }
    set type(he) {
      z(this, Z, he);
    }
    get lightTheme() {
      return b(this, A);
    }
    set lightTheme(he) {
      z(this, A, he);
    }
    render() {
      return x`<div class="discord-file-attachment-non-visual-media-item-container">
			<div class="discord-file-attachment-non-visual-media-item">
				<div class="discord-file-attachment-mosaic-item-media">
					<div class=${Le({ "discord-file-attachment-mosaic-style": !0, "discord-file-attachment-light-theme": this.lightTheme })}>
						${Qo({ class: "discord-file-attachment-icon", alt: "Attachment file type: unknown", title: "unknown" })}
						<div class="discord-file-attachment-inner">
							<div class="discord-file-attachment-filename-link-wrapper">
								<discord-link
									href=${de(this.href)}
									rel=${de(this.rel)}
									target=${de(this.target)}
									type=${de(this.type)}
								>
									${this.name}
								</discord-link>
							</div>
							<div class="discord-file-attachment-metadata">
								${this.bytes}${J(this.bytesUnit, () => x` ${this.bytesUnit}`, () => null)}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="discord-button-download-attachment">
				<a
					class="discord-link-download-attachment"
					aria-label="Download"
					href="${de(this.href)}"
					rel="noreferrer noopener"
					target="_blank"
					role="button"
					tabindex="0"
				>
					${$a()}
				</a>
			</div>
		</div>`;
    }
  }, N = new WeakMap(), be = new WeakMap(), O = new WeakMap(), T = new WeakMap(), ee = new WeakMap(), ae = new WeakMap(), Z = new WeakMap(), A = new WeakMap(), e = g, (() => {
    const he = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    m = [w()], v = [w({ type: Number })], r = [w({ attribute: "bytes-unit" })], f = [w()], h = [w()], M = [w()], E = [w()], te = [He({ context: Oe, subscribe: !0 }), w({ type: Boolean, reflect: !0, attribute: "light-theme" })], Pt(g, null, m, { kind: "accessor", name: "name", static: !1, private: !1, access: { has: (P) => "name" in P, get: (P) => P.name, set: (P, Y) => {
      P.name = Y;
    } }, metadata: he }, n, c), Pt(g, null, v, { kind: "accessor", name: "bytes", static: !1, private: !1, access: { has: (P) => "bytes" in P, get: (P) => P.bytes, set: (P, Y) => {
      P.bytes = Y;
    } }, metadata: he }, u, l), Pt(g, null, r, { kind: "accessor", name: "bytesUnit", static: !1, private: !1, access: { has: (P) => "bytesUnit" in P, get: (P) => P.bytesUnit, set: (P, Y) => {
      P.bytesUnit = Y;
    } }, metadata: he }, _, p), Pt(g, null, f, { kind: "accessor", name: "href", static: !1, private: !1, access: { has: (P) => "href" in P, get: (P) => P.href, set: (P, Y) => {
      P.href = Y;
    } }, metadata: he }, d, o), Pt(g, null, h, { kind: "accessor", name: "rel", static: !1, private: !1, access: { has: (P) => "rel" in P, get: (P) => P.rel, set: (P, Y) => {
      P.rel = Y;
    } }, metadata: he }, F, K), Pt(g, null, M, { kind: "accessor", name: "target", static: !1, private: !1, access: { has: (P) => "target" in P, get: (P) => P.target, set: (P, Y) => {
      P.target = Y;
    } }, metadata: he }, C, I), Pt(g, null, E, { kind: "accessor", name: "type", static: !1, private: !1, access: { has: (P) => "type" in P, get: (P) => P.type, set: (P, Y) => {
      P.type = Y;
    } }, metadata: he }, V, H), Pt(g, null, te, { kind: "accessor", name: "lightTheme", static: !1, private: !1, access: { has: (P) => "lightTheme" in P, get: (P) => P.lightTheme, set: (P, Y) => {
      P.lightTheme = Y;
    } }, metadata: he }, _e, k), Pt(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: he }, null, a), e = t.value, he && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: he });
  })(), /**
   * @internal
   */
  me(g, "styles", ke`
		:host {
			display: grid;
			height: -moz-fit-content;
			height: fit-content;
			grid-auto-flow: row;
			grid-row-gap: 0.25rem;
			grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
			text-indent: 0;
			min-height: 0;
			min-width: 0;
			padding-top: 0.125rem;
			padding-bottom: 0.125rem;
			position: relative;
		}

		:host > * {
			justify-self: start;
			align-self: start;
		}

		.discord-file-attachment-non-visual-media-item-container:hover .discord-button-download-attachment {
			display: block !important;
		}

		.discord-button-download-attachment {
			display: none;
			position: absolute;
			top: -8px;
			right: -8px;
			border-radius: 5px;
			outline: color-mix(in oklab, hsl(220 calc(1 * 6.5%) 18% / 1) 100%, black 0%);
			background-color: color-mix(in oklab, hsl(223 calc(1 * 6.7%) 20.6% / 1) 100%, black 0%);
		}

		.discord-link-download-attachment {
			color: color-mix(in oklab, hsl(215 calc(1 * 8.8%) 73.3% / 1) 100%, black 0%);
			display: flex;
		}

		.discord-icon-download {
			padding: 6px;
		}

		.discord-file-attachment-non-visual-media-item-container {
			margin-top: 8px;
			max-width: 100%;
			display: flex;
			flex-direction: column;
			position: relative;
		}

		.discord-file-attachment-non-visual-media-item {
			width: -moz-fit-content;
			width: fit-content;
			max-width: 100%;
		}

		.discord-file-attachment-mosaic-item-media {
			position: relative;
			max-height: inherit;
			border-radius: 2px;
			width: 100%;
			align-items: center;
			display: flex;
			flex-flow: row nowrap;
			max-width: 100%;
			height: 100%;
		}

		.discord-file-attachment-mosaic-style {
			padding: 16px;
			border-radius: 8px;
			width: 432px;
			max-width: 100%;
			flex: auto;
			border-color: #202020;
			background-color: #282828;

			align-items: center;
			flex-direction: row;
			display: flex;
			box-sizing: border-box;
			letter-spacing: 0;
			border: 1px solid transparent;
		}

		.discord-file-attachment-light-theme.discord-file-attachment-mosaic-style {
			border-color: #f3f3f3;
			background-color: #f9f9f9;
		}

		.discord-file-attachment-icon {
			width: 30px;
			height: 40px;
			margin-right: 8px;
			flex-shrink: 0;
		}

		.discord-file-attachment-inner {
			flex: 1;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}

		.discord-file-attachment-filename-link-wrapper {
			color: #00aff4;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}

		.discord-file-attachment-metadata {
			line-height: 16px;
			font-size: 12px;
			font-weight: 400;
			color: hsl(223 calc(1 * 5.8%) 52.9% / 1);
			margin-right: 8px;
		}
	`), Ge(e, a), e;
})();
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ca = (i, t, a) => {
  for (const e of t) if (e[0] === i) return (0, e[1])();
  return a?.();
};
var Fa = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
}, da = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
};
(() => {
  var v, u;
  let i = [Me("discord-header")], t, a = [], e, s = we, m, n = [], c = [];
  return v = class extends s {
    constructor() {
      super(...arguments);
      y(this, u, da(this, n, 1));
      da(this, c);
    }
    /**
     * The header level, this should be a number between 1 and 3 (inclusive).
     * If a number outside of this range is provided, an error is thrown.
     */
    get level() {
      return b(this, u);
    }
    set level(_) {
      z(this, u, _);
    }
    ensureLevelIsNumber() {
      this.level && !Number.isNaN(this.level) && (this.level = Number(this.level));
    }
    checkLevel() {
      if (this.level < 1 || this.level > 3)
        throw new RangeError("The level property must be a number between 1 and 3 (inclusive)");
    }
    render() {
      return this.ensureLevelIsNumber(), this.checkLevel(), Ca(this.level, [
        [1, () => x`<h1><slot></slot></h1>`],
        [2, () => x`<h2><slot></slot></h2>`],
        [3, () => x`<h3><slot></slot></h3>`]
      ], () => x`<slot></slot>`);
    }
  }, u = new WeakMap(), e = v, (() => {
    const _ = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    m = [w({ type: Number, reflect: !0 })], Fa(v, null, m, { kind: "accessor", name: "level", static: !1, private: !1, access: { has: (p) => "level" in p, get: (p) => p.level, set: (p, f) => {
      p.level = f;
    } }, metadata: _ }, n, c), Fa(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: _ }, null, a), e = t.value, _ && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: _ });
  })(), /**
   * @internal
   */
  me(v, "styles", ke`
		:host > * {
			margin: 16px 0 8px;
			font-weight: 700;
			line-height: 1.375em;
		}

		:host([level='1']) > h1 {
			font-size: 1.5rem;
		}

		:host([level='2']) > h2 {
			font-size: 1.25rem;
		}

		:host([level='3']) > h3 {
			font-size: 1rem;
		}

		:host([level='1']):first-child() > h1,
		:host([level='2']):first-child() > h2 {
			margin-top: 8px;
		}

		:host([level='3']):first-child() > h3 {
			margin-top: 4px;
		}
	`), da(e, a), e;
})();
var gi = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
}, Vt = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
};
(() => {
  var M, C, I, E, V, H;
  let i = [Me("discord-image-attachment")], t, a = [], e, s = we, m, n = [], c = [], v, u = [], l = [], r, _ = [], p = [], f, d = [], o = [], h, F = [], K = [];
  return M = class extends s {
    constructor() {
      super(...arguments);
      y(this, C, Vt(this, n, void 0));
      y(this, I, (Vt(this, c), Vt(this, u, void 0)));
      y(this, E, (Vt(this, l), Vt(this, _, void 0)));
      y(this, V, (Vt(this, p), Vt(this, d, "discord image attachment")));
      y(this, H, (Vt(this, o), Vt(this, F, !1)));
      Vt(this, K);
    }
    /**
     * The URL for the image attachment
     *
     * @remarks Should be a valid image URL, i.e. matching the regex `/\.(bmp|jpe?g|png|gif|webp|tiff)$/i`
     */
    get url() {
      return b(this, C);
    }
    set url(k) {
      z(this, C, k);
    }
    /**
     * The height of the image in pixels
     */
    get height() {
      return b(this, I);
    }
    set height(k) {
      z(this, I, k);
    }
    /**
     * The width of the image in pixels
     */
    get width() {
      return b(this, E);
    }
    set width(k) {
      z(this, E, k);
    }
    /**
     * The alt text to show in case the image was unable to load
     *
     * @defaultValue 'discord attachment'
     */
    get alt() {
      return b(this, V);
    }
    set alt(k) {
      z(this, V, k);
    }
    /**
     * Indicates that you intend to use a custom image element,
     * useful if you want to use something like
     * {@link https://nextjs.org/docs/pages/api-reference/components/image | `next/image`}
     *
     * Once this property is set, use the child element (default slot) to insert
     * the code for the desired image component
     *
     * @remarks Setting this will disable the
     * {@link DiscordImageAttachment.url | `url`}, and {@link DiscordImageAttachment.alt | `alt`} properties.
     */
    get customImageElement() {
      return b(this, H);
    }
    set customImageElement(k) {
      z(this, H, k);
    }
    componentWillRender() {
      this.customImageElement || $o(this.url);
    }
    render() {
      return x`
			<div class="discord-image-attachment">
				<div class="discord-image-wrapper" style="${Ut({ height: `${this.height}px`, width: `${this.width}px` })}">
					${J(this.customImageElement, () => x`<slot></slot>`, () => x`<img
								alt=${de(this.alt)}
								src=${de(this.url)}
								height=${de(this.height)}
								width=${de(this.width)}
							/>`)}
				</div>
			</div>
		`;
    }
  }, C = new WeakMap(), I = new WeakMap(), E = new WeakMap(), V = new WeakMap(), H = new WeakMap(), e = M, (() => {
    const k = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    m = [w({ reflect: !0, attribute: "url" })], v = [w({ type: Number, reflect: !0, attribute: "height" })], r = [w({ type: Number, reflect: !0, attribute: "width" })], f = [w({ reflect: !0, attribute: "alt" })], h = [w({ type: Boolean, attribute: "custom-image-element" })], gi(M, null, m, { kind: "accessor", name: "url", static: !1, private: !1, access: { has: (g) => "url" in g, get: (g) => g.url, set: (g, N) => {
      g.url = N;
    } }, metadata: k }, n, c), gi(M, null, v, { kind: "accessor", name: "height", static: !1, private: !1, access: { has: (g) => "height" in g, get: (g) => g.height, set: (g, N) => {
      g.height = N;
    } }, metadata: k }, u, l), gi(M, null, r, { kind: "accessor", name: "width", static: !1, private: !1, access: { has: (g) => "width" in g, get: (g) => g.width, set: (g, N) => {
      g.width = N;
    } }, metadata: k }, _, p), gi(M, null, f, { kind: "accessor", name: "alt", static: !1, private: !1, access: { has: (g) => "alt" in g, get: (g) => g.alt, set: (g, N) => {
      g.alt = N;
    } }, metadata: k }, d, o), gi(M, null, h, { kind: "accessor", name: "customImageElement", static: !1, private: !1, access: { has: (g) => "customImageElement" in g, get: (g) => g.customImageElement, set: (g, N) => {
      g.customImageElement = N;
    } }, metadata: k }, F, K), gi(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: k }, null, a), e = t.value, k && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: k });
  })(), /**
   * @internal
   */
  me(M, "styles", ke`
		:host {
			display: block;
			position: relative;
			-webkit-user-select: text;
			-moz-user-select: text;
			-ms-user-select: text;
			user-select: text;
			overflow: hidden;
			border-radius: 3px;
		}

		.discord-image-attachment {
			color: #dcddde;
			display: flex;
			font-size: 13px;
			line-height: 150%;
			margin-bottom: 8px;
			margin-top: 8px;
		}
	`), Vt(e, a), e;
})();
var _t = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
}, Be = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
};
let Za = (() => {
  var P, Y, G, U, q, ge, je, R, j, ie, De, Ie, Ne;
  let i = [Me("discord-input-text")], t, a = [], e, s = we, m, n = [], c = [], v, u = [], l = [], r, _ = [], p = [], f, d = [], o = [], h, F = [], K = [], M, C = [], I = [], E, V = [], H = [], te, _e = [], k = [], g, N = [], be = [], O, T = [], ee = [], ae, Z = [], A = [], se, ye = [], he = [];
  return P = class extends s {
    constructor() {
      super(...arguments);
      y(this, Y, Be(this, n, "paragraph"));
      y(this, G, (Be(this, c), Be(this, u, !1)));
      y(this, U, (Be(this, l), Be(this, _, void 0)));
      y(this, q, (Be(this, p), Be(this, d, void 0)));
      y(this, ge, (Be(this, o), Be(this, F, 0)));
      y(this, je, (Be(this, K), Be(this, C, 4e3)));
      y(this, R, (Be(this, I), Be(this, V, !1)));
      y(this, j, (Be(this, H), Be(this, _e, "")));
      y(this, ie, (Be(this, k), Be(this, N, "")));
      y(this, De, (Be(this, be), Be(this, T, !1)));
      y(this, Ie, (Be(this, ee), Be(this, Z, null)));
      y(this, Ne, (Be(this, A), Be(this, ye, 0)));
      me(this, "validInputTextTypes", (Be(this, he), /* @__PURE__ */ new Set(["short", "paragraph"])));
    }
    /**
     * The type of input text
     */
    get type() {
      return b(this, Y);
    }
    set type(D) {
      z(this, Y, D);
    }
    /**
     * if the input text is required
     */
    get required() {
      return b(this, G);
    }
    set required(D) {
      z(this, G, D);
    }
    /**
     * The label of input text
     */
    get label() {
      return b(this, U);
    }
    set label(D) {
      z(this, U, D);
    }
    /**
     * The place of input text
     */
    get placeholder() {
      return b(this, q);
    }
    set placeholder(D) {
      z(this, q, D);
    }
    /**
     * The minimal length of input text
     */
    get minLength() {
      return b(this, ge);
    }
    set minLength(D) {
      z(this, ge, D);
    }
    /**
     * The maximal length of input text
     */
    get maxLength() {
      return b(this, je);
    }
    set maxLength(D) {
      z(this, je, D);
    }
    /**
     * The theme of modal
     */
    get lightTheme() {
      return b(this, R);
    }
    set lightTheme(D) {
      z(this, R, D);
    }
    /**
     * The default value of modal
     */
    get defaultValue() {
      return b(this, j);
    }
    set defaultValue(D) {
      z(this, j, D);
    }
    get value() {
      return b(this, ie);
    }
    set value(D) {
      z(this, ie, D);
    }
    get hasWarning() {
      return b(this, De);
    }
    set hasWarning(D) {
      z(this, De, D);
    }
    get calculatedMaxLength() {
      return b(this, Ie);
    }
    set calculatedMaxLength(D) {
      z(this, Ie, D);
    }
    get calculatedCharactersCount() {
      return b(this, Ne);
    }
    set calculatedCharactersCount(D) {
      z(this, Ne, D);
    }
    connectedCallback() {
      super.connectedCallback(), this.defaultValue && (this.value = this.defaultValue, this.calculatedCharactersCount = this.value.length);
    }
    resetState() {
      this.hasWarning = !1, this.calculatedMaxLength = null, this.calculatedCharactersCount = 0, this.defaultValue ? this.value = this.defaultValue : this.value = "";
    }
    render() {
      return this.checkNeededArgument(), this.checkType(), x`
			<div class="discord-input-text">
				<div class=${Le({ "discord-text-input-warning-length": this.hasWarning })}>
					<h2 class="discord-label-input-text">
						${this.label.slice(0, 45)}${J(this.required && !this.hasWarning, () => x`<span class="discord-text-input-required">*</span>`)}
					</h2>
					${J(this.hasWarning, () => x`<span class="discord-text-input-warning-length discord-text-input-warning-error-text">
								- Must be between ${this.minLength} and ${this.maxLength} in length.</span
							>`)}
				</div>
				<div class="discord-text-input-container">
					${J(this.type === "paragraph", () => x`
							<div class="discord-text-input-container">
								<textarea
									@input=${(D) => this.handleInputChange(D)}
									.required=${this.required}
									.value=${this.value}
									class="discord-text-input-paragraph"
									type="text"
									minlength="${this.minLength}"
									maxlength="${this.maxLength}"
									placeholder="${de(this.placeholder)}"
									rows="3"
								></textarea>
								<div class="discord-text-input-textarea-max-length">
									<span
										>${J(this.valueIsNotNullOrUndefined(this.calculatedMaxLength), () => this.calculatedMaxLength, () => J(this.value, () => this.maxLength - this.value.length, () => this.maxLength))}</span
									>
								</div>
							</div>
						`)}
					${J(this.type === "short", () => x`<input
								@input=${(D) => this.handleInputChange(D)}
								.required=${this.required}
								.value=${this.value}
								class="discord-text-input-short"
								type="text"
								minlength="${this.minLength}"
								maxlength="${this.maxLength}"
								placeholder="${de(this.placeholder)}"
								rows="3"
							/>`)}
				</div>
				${J(this.required, () => x`
						<div class="discord-text-input-message-needed-input">
							<div class="icon">
								<div class="exclamation">!</div>
							</div>
							<span>Please fill out this field.</span>
						</div>
					`)}
				${J(this.valueIsNotNullOrUndefined(this.minLength), () => x`
						<div class="discord-text-input-message-needed-min-length">
							<div class="icon">
								<div class="exclamation">!</div>
							</div>
							<span
								>Increase this text to ${this.minLength} characters or more. You are currently using ${this.calculatedCharactersCount}
								characters</span
							>
						</div>
					`)}
				<div class=${Le({ "discord-text-input-warning-length": this.hasWarning })}>
					<h2 class="discord-text-input-warning-length">
						${J(this.hasWarning && this.valueIsNotNullOrUndefined(this.minLength), () => x`<span class="discord-text-input-warning-bottom-error-text"
									>Must be ${this.minLength} characters or more in length.</span
								>`)}
					</h2>
				</div>
			</div>
		`;
    }
    checkNeededArgument() {
      if (this.label) {
        if (!this.type)
          throw new Ft("Type is required to input text");
      } else throw new Ft("Label is required to input text");
    }
    checkType() {
      if (typeof this.type != "string")
        throw new TypeError("DiscordInputText `type` prop must be a string.");
      if (!this.validInputTextTypes.has(this.type))
        throw new RangeError("DiscordInputText `type` prop must be one of: 'short', 'paragraph'");
    }
    /**
     * Check if the value is not null or undefined
     *
     * @param value - The value to check if it is not null or undefined
     * @returns If the value is not null or undefined
     */
    valueIsNotNullOrUndefined(D) {
      return D != null;
    }
    handleInputChange(D) {
      const $ = D?.target;
      if (this.value = $ instanceof HTMLTextAreaElement || $ instanceof HTMLInputElement ? $.value : "", $ instanceof HTMLTextAreaElement || $ instanceof HTMLInputElement) {
        const ue = $.value.length;
        ue === 0 && this.minLength === 0 && this.valueIsNotNullOrUndefined(this.maxLength) && this.required ? this.hasWarning = !0 : this.hasWarning = ue < this.minLength, this.calculatedMaxLength = this.maxLength - ue, this.calculatedCharactersCount = ue;
      }
      const ce = this.shadowRoot?.querySelector("div.discord-text-input-message-needed-input"), Te = this.shadowRoot?.querySelector("div.discord-text-input-message-needed-min-length");
      $.value.length >= this.minLength && Te instanceof HTMLDivElement && Te.style.display && (Te.style.opacity = "0", globalThis.setTimeout(() => {
        Te.style.display = "";
      }, 1e3)), ce instanceof HTMLDivElement && ce.style.display && (ce.style.opacity = "0", globalThis.setTimeout(() => {
        ce.style.display = "";
      }, 1e3));
    }
  }, Y = new WeakMap(), G = new WeakMap(), U = new WeakMap(), q = new WeakMap(), ge = new WeakMap(), je = new WeakMap(), R = new WeakMap(), j = new WeakMap(), ie = new WeakMap(), De = new WeakMap(), Ie = new WeakMap(), Ne = new WeakMap(), e = P, (() => {
    const D = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    m = [w({ reflect: !0, attribute: "type", type: String })], v = [w({ reflect: !0, attribute: "required", type: Boolean })], r = [w({ reflect: !0, attribute: "label", type: String })], f = [w({ reflect: !0, attribute: "placeholder", type: String })], h = [w({ reflect: !0, attribute: "min-length", type: Number })], M = [w({ reflect: !0, attribute: "max-length", type: Number })], E = [He({ context: Oe, subscribe: !0 }), w({ type: Boolean, reflect: !0, attribute: "light-theme" })], te = [w({ type: String, reflect: !0, attribute: "default-value" })], g = [ft()], O = [ft()], ae = [ft()], se = [ft()], _t(P, null, m, { kind: "accessor", name: "type", static: !1, private: !1, access: { has: ($) => "type" in $, get: ($) => $.type, set: ($, ce) => {
      $.type = ce;
    } }, metadata: D }, n, c), _t(P, null, v, { kind: "accessor", name: "required", static: !1, private: !1, access: { has: ($) => "required" in $, get: ($) => $.required, set: ($, ce) => {
      $.required = ce;
    } }, metadata: D }, u, l), _t(P, null, r, { kind: "accessor", name: "label", static: !1, private: !1, access: { has: ($) => "label" in $, get: ($) => $.label, set: ($, ce) => {
      $.label = ce;
    } }, metadata: D }, _, p), _t(P, null, f, { kind: "accessor", name: "placeholder", static: !1, private: !1, access: { has: ($) => "placeholder" in $, get: ($) => $.placeholder, set: ($, ce) => {
      $.placeholder = ce;
    } }, metadata: D }, d, o), _t(P, null, h, { kind: "accessor", name: "minLength", static: !1, private: !1, access: { has: ($) => "minLength" in $, get: ($) => $.minLength, set: ($, ce) => {
      $.minLength = ce;
    } }, metadata: D }, F, K), _t(P, null, M, { kind: "accessor", name: "maxLength", static: !1, private: !1, access: { has: ($) => "maxLength" in $, get: ($) => $.maxLength, set: ($, ce) => {
      $.maxLength = ce;
    } }, metadata: D }, C, I), _t(P, null, E, { kind: "accessor", name: "lightTheme", static: !1, private: !1, access: { has: ($) => "lightTheme" in $, get: ($) => $.lightTheme, set: ($, ce) => {
      $.lightTheme = ce;
    } }, metadata: D }, V, H), _t(P, null, te, { kind: "accessor", name: "defaultValue", static: !1, private: !1, access: { has: ($) => "defaultValue" in $, get: ($) => $.defaultValue, set: ($, ce) => {
      $.defaultValue = ce;
    } }, metadata: D }, _e, k), _t(P, null, g, { kind: "accessor", name: "value", static: !1, private: !1, access: { has: ($) => "value" in $, get: ($) => $.value, set: ($, ce) => {
      $.value = ce;
    } }, metadata: D }, N, be), _t(P, null, O, { kind: "accessor", name: "hasWarning", static: !1, private: !1, access: { has: ($) => "hasWarning" in $, get: ($) => $.hasWarning, set: ($, ce) => {
      $.hasWarning = ce;
    } }, metadata: D }, T, ee), _t(P, null, ae, { kind: "accessor", name: "calculatedMaxLength", static: !1, private: !1, access: { has: ($) => "calculatedMaxLength" in $, get: ($) => $.calculatedMaxLength, set: ($, ce) => {
      $.calculatedMaxLength = ce;
    } }, metadata: D }, Z, A), _t(P, null, se, { kind: "accessor", name: "calculatedCharactersCount", static: !1, private: !1, access: { has: ($) => "calculatedCharactersCount" in $, get: ($) => $.calculatedCharactersCount, set: ($, ce) => {
      $.calculatedCharactersCount = ce;
    } }, metadata: D }, ye, he), _t(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: D }, null, a), e = t.value, D && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: D });
  })(), me(P, "styles", ke`
		.discord-input-text {
			width: 100%;
			margin-bottom: 1em;
		}

		.discord-label-input-text {
			margin-bottom: 8px;
			font-size: 12px;
			line-height: 1.3333333333333333;
			font-weight: 700;
			text-transform: uppercase;
			letter-spacing: 0.02em;
			color: color-mix(in oklab, hsl(215 calc(1 * 8.8%) 73.3% / 1) 100%, black 0%);
		}

		.discord-text-input-warning-length {
			display: flex;
			align-items: center;
			font-size: 12px;
			line-height: 1.3333333333333333;
			font-weight: 700;
			text-transform: normal !important;
			letter-spacing: 0.02em;
			color: #b0b5bc;
			gap: 3px;
		}

		.discord-text-input-warning-error-text {
			font-size: 12px;
			font-weight: 500;
			font-style: italic;
			text-transform: none;
		}

		.discord-text-input-warning-bottom-error-text {
			font-size: 12px;
			line-height: 1.3333333333333333;
			font-weight: 400;
		}

		.discord-text-input-required {
			padding-left: 4px;
			color: hsl(359 calc(1 * 87.3%) 59.8% / 1);
		}

		.discord-text-input-container {
			width: 100%;
			display: flex;
			flex-direction: column;
			position: relative;
		}

		.discord-text-input-paragraph {
			width: 100%;
			resize: none;
			box-sizing: border-box;
			height: 83px;
			padding: 8px 38.92px 8px 8px;
			border-radius: 3px;
			border: medium;
			background-color: #1e1f22;
			color: #b0b5bc;
			font-family: 'gg sans', 'Noto Sans', Whitney, 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;
		}

		.discord-text-input-short {
			width: 100%;
			resize: none;
			box-sizing: border-box;
			height: 40px;
			padding: 8px 38.92px 8px 8px;
			border-radius: 3px;
			border: medium;
			background-color: #1e1f22;
			color: #b0b5bc;
			font-family: 'gg sans', 'Noto Sans', Whitney, 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;
		}

		input,
		textarea,
		::placeholder {
			font-weight: 400;
			font-size: 16px;
			color: #b0b5bc;
			opacity: 0.8;
		}

		.discord-text-input-paragraph::-webkit-scrollbar {
			width: 8px;
			margin-right: 5px;
			background-color: transparent;
		}

		.discord-text-input-paragraph::-webkit-scrollbar-track {
			background-color: rgba(255, 255, 255, 0.2);
			margin-right: 1em auto;
			border-radius: 10px;
		}

		.discord-text-input-paragraph::-webkit-scrollbar-thumb {
			border-radius: 10px;
			background-color: rgba(0, 0, 0, 0.5);
			margin-right: 1em auto;
		}

		.discord-text-input-textarea-max-length {
			font-size: small;
			position: absolute;
			display: flex;
			color: #b0b5bc;
			right: 0;
			bottom: 0;
			padding-right: 16px;
		}

		:host .discord-text-input-warning-length * {
			color: color-mix(in oklab, hsl(358 calc(1 * 92.9%) 72.4% / 1) 100%, black 0%) !important;
		}

		:host([light-theme]) .discord-text-input-warning-length * {
			color: color-mix(in oklab, hsl(360 calc(1 * 60.2%) 39.4% / 1) 100%, black 0%) !important;
		}

		:host([light-theme]) .discord-text-input-short,
		:host([light-theme]) .discord-label-input-text {
			color: color-mix(in oklab, hsl(228 calc(1 * 6%) 32.5% / 1) 100%, black 0%);
		}

		:host([light-theme]) .discord-text-input-paragraph,
		:host([light-theme]) .discord-text-input-short {
			background-color: rgb(253, 253, 253);
			border: 1px solid #b0b5bc;
		}

		:host([light-theme]) input,
		:host([light-theme]) textarea,
		:host([light-theme]) ::placeholder {
			font-weight: 400;
			font-size: 16px;
			color: color-mix(in oklab, hsl(223 calc(1 * 6.7%) 20.6% / 1) 100%, black 0%);
			opacity: 0.8;
		}

		.discord-text-input-message-needed-input,
		.discord-text-input-message-needed-min-length {
			background-color: white;
			position: absolute;
			align-items: center;
			gap: 5px;
			left: 50%;
			transform: translateX(-50%);
			opacity: 0;
			display: none;
			transition: 0.5s;
			color: black;
			border-radius: 5px;
			text-align: center;
			font-family: system-ui;
			pointer-events: none;
			padding: 10px;
			min-width: 50%;
			border: black solid 1px;
			z-index: 25;
		}

		.discord-text-input-message-needed-input::after,
		.discord-text-input-message-needed-min-length::after {
			content: '';
			position: absolute;
			bottom: 100%; /* Positions the arrow above the div */
			left: 0;
			transform: translateX(50%);
			border-width: 10px !important; /* Arrow size */
			border-style: solid !important;
			border-color: transparent transparent white transparent !important; /* Arrow pointing up */
		}

		:host([light-theme]) .discord-text-input-message-needed-input::after,
		:host([light-theme]) .discord-text-input-message-needed-min-length::after {
			border-color: transparent transparent #bfbfbf transparent !important; /* Arrow pointing up */
		}

		.discord-text-input-message-needed-min-length::after {
			transform: translate(500%);
		}

		.discord-text-input-message-needed-min-length {
			left: 50% !important;
			width: max-content;
		}

		.icon {
			width: 25px;
			height: 25px;
			background-color: darkorange;
			border-radius: 5px;
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			color: white;
			font-weight: bold;
			font-size: 18px;
			line-height: 1;
			text-align: center;
		}

		.exclamation {
			display: flex;
			flex-direction: column;
			align-items: center;
			line-height: 1;
		}
	`), Be(e, a), e;
})();
const Go = pe`
<path
	fill="currentColor"
	fill-rule="evenodd"
	d="m16 7.6c0 .79-1.28 1.38-1.52 2.09s.44 2 0 2.59-1.84.35-2.46.8-.79 1.84-1.54 2.09-1.67-.8-2.47-.8-1.75 1-2.47.8-.92-1.64-1.54-2.09-2-.18-2.46-.8.23-1.84 0-2.59-1.54-1.3-1.54-2.09 1.28-1.38 1.52-2.09-.44-2 0-2.59 1.85-.35 2.48-.8.78-1.84 1.53-2.12 1.67.83 2.47.83 1.75-1 2.47-.8.91 1.64 1.53 2.09 2 .18 2.46.8-.23 1.84 0 2.59 1.54 1.3 1.54 2.09z"
/>
`;
function Jo(i) {
  return x`<svg ${ve(i)} class="discord-guild-badge" aria-hidden="false" width="16" height="16" viewBox="0 0 16 15.2">
		${Go}
	</svg>`;
}
const Xo = pe`
	<path
		d="M10.5906 6.39993L9.19223 7.29993C8.99246 7.39993 8.89258 7.39993 8.69281 7.29993C8.59293 7.19993 8.39317 7.09993 8.29328 6.99993C7.89375 6.89993 7.5941 6.99993 7.29445 7.19993L6.79504 7.49993L4.29797 9.19993C3.69867 9.49993 2.99949 9.39993 2.69984 8.79993C2.30031 8.29993 2.50008 7.59993 2.99949 7.19993L5.99598 5.19993C6.79504 4.69993 7.79387 4.49993 8.69281 4.69993C9.49188 4.89993 10.0912 5.29993 10.5906 5.89993C10.7904 6.09993 10.6905 6.29993 10.5906 6.39993Z"
		fill="currentColor"
	/>
	<path
		d="M13.4871 7.79985C13.4871 8.19985 13.2874 8.59985 12.9877 8.79985L9.89135 10.7999C9.29206 11.1999 8.69276 11.3999 7.99358 11.3999C7.69393 11.3999 7.49417 11.3999 7.19452 11.2999C6.39545 11.0999 5.79616 10.6999 5.29674 10.0999C5.19686 9.89985 5.29674 9.69985 5.39663 9.59985L6.79499 8.69985C6.89487 8.59985 7.09463 8.59985 7.19452 8.69985C7.39428 8.79985 7.59405 8.89985 7.69393 8.99985C8.09346 8.99985 8.39311 8.99985 8.69276 8.79985L9.39194 8.39985L11.3896 6.99985L11.6892 6.79985C12.1887 6.49985 12.9877 6.59985 13.2874 7.09985C13.4871 7.39985 13.4871 7.59985 13.4871 7.79985Z"
		fill="currentColor"
	/>
`;
function Ko(i = {}) {
  return x`<svg ${ve(i)} class="partner-badge-overlay" aria-hidden="false" width="16" height="16" viewBox="0 0 16 16">
		${Xo}
	</svg>`;
}
const el = pe`
	<path d="M7.4,11.17,4,8.62,5,7.26l2,1.53L10.64,4l1.36,1Z" fill="currentColor" />
`;
function tl(i = {}) {
  return x`<svg ${ve(i)} class="verified-badge-overlay" aria-hidden="false" width="16" height="16" viewBox="0 0 16 15.2">
		${el}
	</svg>`;
}
var Dt = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
}, qe = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
};
(() => {
  var ae, Z, A, se, ye, he, P, Y, G, U, q;
  let i = [Me("discord-invite")], t, a = [], e, s = we, m, n = [], c = [], v, u = [], l = [], r, _ = [], p = [], f, d = [], o = [], h, F = [], K = [], M, C = [], I = [], E, V = [], H = [], te, _e = [], k = [], g, N = [], be = [], O, T = [], ee = [];
  return ae = class extends s {
    constructor() {
      super(...arguments);
      y(this, Z, qe(this, n, ta.blue));
      y(this, A, (qe(this, c), qe(this, u, "Discord Server")));
      y(this, se, (qe(this, l), qe(this, _, void 0)));
      y(this, ye, (qe(this, p), qe(this, d, 0)));
      y(this, he, (qe(this, o), qe(this, F, 0)));
      y(this, P, (qe(this, K), qe(this, C, !1)));
      y(this, Y, (qe(this, I), qe(this, V, !1)));
      y(this, G, (qe(this, H), qe(this, _e, "You've been invited to join a server")));
      y(this, U, (qe(this, k), qe(this, N, "Join")));
      y(this, q, (qe(this, be), qe(this, T, !1)));
      qe(this, ee);
    }
    /**
     * The server icon to display for the invite.
     */
    get icon() {
      return b(this, Z);
    }
    set icon(R) {
      z(this, Z, R);
    }
    /**
     * The server's name.
     *
     * @defaultValue 'Discord Server'
     */
    get name() {
      return b(this, A);
    }
    set name(R) {
      z(this, A, R);
    }
    /**
     * The URL to open when you click on the join button.
     */
    get url() {
      return b(this, se);
    }
    set url(R) {
      z(this, se, R);
    }
    /**
     * The number of members online on the server.
     *
     * @defaultValue 0
     */
    get online() {
      return b(this, ye);
    }
    set online(R) {
      z(this, ye, R);
    }
    /**
     * The number of members on the server.
     *
     * @defaultValue 0
     */
    get members() {
      return b(this, he);
    }
    set members(R) {
      z(this, he, R);
    }
    /**
     * Whether the server is verified.
     * Only works if `partnered` is `false` or `undefined`.
     */
    get verified() {
      return b(this, P);
    }
    set verified(R) {
      z(this, P, R);
    }
    /**
     * Whether the server is partnered.
     * Only works if `verified` is `false` or `undefined`.
     */
    get partnered() {
      return b(this, Y);
    }
    set partnered(R) {
      z(this, Y, R);
    }
    /**
     * Invitation embed title.
     *
     * @defaultValue "You've been invited to join a server"
     */
    get inviteTitle() {
      return b(this, G);
    }
    set inviteTitle(R) {
      z(this, G, R);
    }
    /**
     * The join button.
     *
     * @defaultValue 'Join'
     */
    get joinBtn() {
      return b(this, U);
    }
    set joinBtn(R) {
      z(this, U, R);
    }
    get lightTheme() {
      return b(this, q);
    }
    set lightTheme(R) {
      z(this, q, R);
    }
    render() {
      return x`<div class="discord-invite-header">${this.inviteTitle}</div>
			<div class="discord-invite-root">
				<div class="discord-invite-info">
					<img class="discord-invite-icon" src=${de(this.icon)} alt=${de(this.name)} />
					<div class="discord-invite-info-text-ellipsis">
						<div class="discord-invite-title">
							${J(this.verified && !this.partnered || !this.verified && this.partnered, () => x`<div class="discord-invite-badge">
										${Jo({
        "aria-label": this.partnered ? "Discord Partner" : "Verified",
        class: `discord-invite-badge-${this.partnered ? "partnered" : "verified"}`
      })}
										<div class="discord-invite-badge-container">
											${this.partnered ? Ko() : tl()}
										</div>
									</div>`)}
							<span class="discord-invite-name">${this.name}</span>
						</div>
						<div class="discord-invite-counts">
							<div class="discord-invite-counts-info">
								<i class="discord-invite-status discord-invite-status-online"></i>
								<span class="discord-invite-count">${this.online.toLocaleString()} Online</span>
							</div>
							<div class="discord-invite-counts-info">
								<i class="discord-invite-status"></i>
								<span class="discord-invite-count">${this.members.toLocaleString()} Members</span>
							</div>
						</div>
					</div>
				</div>
				<a class="discord-invite-join" href=${de(this.url)} target="_blank" rel="noopener noreferrer">${this.joinBtn}</a>
			</div>`;
    }
  }, Z = new WeakMap(), A = new WeakMap(), se = new WeakMap(), ye = new WeakMap(), he = new WeakMap(), P = new WeakMap(), Y = new WeakMap(), G = new WeakMap(), U = new WeakMap(), q = new WeakMap(), e = ae, (() => {
    const R = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    m = [w()], v = [w()], r = [w()], f = [w({ type: Number })], h = [w({ type: Number })], M = [w({ type: Boolean })], E = [w({ type: Boolean })], te = [w({ attribute: "invite-title" })], g = [w({ attribute: "join-btn" })], O = [He({ context: Oe }), w({ type: Boolean, reflect: !0, attribute: "light-theme" })], Dt(ae, null, m, { kind: "accessor", name: "icon", static: !1, private: !1, access: { has: (j) => "icon" in j, get: (j) => j.icon, set: (j, ie) => {
      j.icon = ie;
    } }, metadata: R }, n, c), Dt(ae, null, v, { kind: "accessor", name: "name", static: !1, private: !1, access: { has: (j) => "name" in j, get: (j) => j.name, set: (j, ie) => {
      j.name = ie;
    } }, metadata: R }, u, l), Dt(ae, null, r, { kind: "accessor", name: "url", static: !1, private: !1, access: { has: (j) => "url" in j, get: (j) => j.url, set: (j, ie) => {
      j.url = ie;
    } }, metadata: R }, _, p), Dt(ae, null, f, { kind: "accessor", name: "online", static: !1, private: !1, access: { has: (j) => "online" in j, get: (j) => j.online, set: (j, ie) => {
      j.online = ie;
    } }, metadata: R }, d, o), Dt(ae, null, h, { kind: "accessor", name: "members", static: !1, private: !1, access: { has: (j) => "members" in j, get: (j) => j.members, set: (j, ie) => {
      j.members = ie;
    } }, metadata: R }, F, K), Dt(ae, null, M, { kind: "accessor", name: "verified", static: !1, private: !1, access: { has: (j) => "verified" in j, get: (j) => j.verified, set: (j, ie) => {
      j.verified = ie;
    } }, metadata: R }, C, I), Dt(ae, null, E, { kind: "accessor", name: "partnered", static: !1, private: !1, access: { has: (j) => "partnered" in j, get: (j) => j.partnered, set: (j, ie) => {
      j.partnered = ie;
    } }, metadata: R }, V, H), Dt(ae, null, te, { kind: "accessor", name: "inviteTitle", static: !1, private: !1, access: { has: (j) => "inviteTitle" in j, get: (j) => j.inviteTitle, set: (j, ie) => {
      j.inviteTitle = ie;
    } }, metadata: R }, _e, k), Dt(ae, null, g, { kind: "accessor", name: "joinBtn", static: !1, private: !1, access: { has: (j) => "joinBtn" in j, get: (j) => j.joinBtn, set: (j, ie) => {
      j.joinBtn = ie;
    } }, metadata: R }, N, be), Dt(ae, null, O, { kind: "accessor", name: "lightTheme", static: !1, private: !1, access: { has: (j) => "lightTheme" in j, get: (j) => j.lightTheme, set: (j, ie) => {
      j.lightTheme = ie;
    } }, metadata: R }, T, ee), Dt(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: R }, null, a), e = t.value, R && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: R });
  })(), /**
   * @internal
   */
  me(ae, "styles", ke`
		:host {
			background-color: #2f3136;
			border-radius: 4px;
			padding: 16px;
			max-width: 432px;
			min-width: 160px;
			width: 100%;
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
		}

		:host([light-theme]) {
			background-color: #f2f3f5;
		}

		:host .discord-invite-header {
			font-weight: 700;
			font-size: 12px;
			line-height: 16px;
			margin-bottom: 12px;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			text-transform: uppercase;
			color: #b9bbbe;
		}

		:host([light-theme]) .discord-invite-header {
			color: #4f5660;
		}

		:host .discord-invite-root {
			display: flex;
			flex-flow: row wrap;
			gap: 16px;
		}

		:host .discord-invite-icon {
			background-color: #36393f;
			border-radius: 15px;
			margin-right: 16px;
			-webkit-box-flex: 0;
			-ms-flex: 0 0 auto;
			flex: 0 0 auto;
			width: 50px;
			height: 50px;
		}

		:host([light-theme]) .discord-invite-icon {
			background-color: #fff;
		}

		:host .discord-invite-info {
			font-family: 'gg sans', 'Noto Sans', WhitneyMedium, Whitney, 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;
			display: flex;
			flex: 1000 0 auto;
			align-items: center;
			max-width: 100%;
			display: flex;
		}

		.discord-invite-info-text-ellipsis {
			overflow: hidden;
			text-overflow: ellipsis;
		}

		:host .discord-invite-title {
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			margin-bottom: 2px;
			color: white;
			font-size: 16px;
			line-height: 20px;
			font-weight: 700;
			display: flex;
			flex-direction: row;
		}

		:host([light-theme]) .discord-invite-title {
			color: #060607;
		}

		:host .discord-invite-name {
			flex: 1 1 auto;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		:host .discord-invite-counts {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			font-size: 14px;
			font-weight: 600;
			text-overflow: ellipsis;
			overflow: hidden;
			color: #b9bbbe;
			line-height: 16px;
		}

		:host .discord-invite-counts-info {
			text-overflow: ellipsis;
			overflow: hidden;
			display: flex;
			align-items: center;
		}

		:host .discord-invite-status {
			display: block;
			margin-right: 4px;
			width: 8px;
			height: 8px;
			border-radius: 50%;
			background-color: #747f8d;
		}

		:host .discord-invite-status-online {
			background-color: #3ba55d;
		}

		:host .discord-invite-count {
			-webkit-box-flex: 0;
			-ms-flex: 0 1 auto;
			flex: 0 1 auto;
			margin-right: 8px;
			color: #b9bbbe;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}

		:host .discord-invite-join {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 40px;
			padding: 0 20px;
			align-self: center;
			-webkit-box-flex: 0;
			-ms-flex: 0 0 auto;
			flex: 0 0 auto;
			line-height: 20px;
			border-radius: 3px;
			font-size: 14px;
			font-weight: 600;
			color: white !important;
			background-color: #3ba55d;
			-webkit-transition: background-color 0.17s ease;
			transition: background-color 0.17s ease;
			text-decoration: none;
			box-sizing: border-box;
			flex: 1 0 auto;
		}

		:host .discord-invite-join:hover {
			background-color: #2d7d46;
		}

		:host .discord-invite-badge {
			-webkit-box-flex: 0;
			-ms-flex: 0 0 auto;
			flex: 0 0 auto;
			margin-right: 8px;
			width: 16px;
			height: 16px;
			align-self: center;
			position: relative;
		}

		:host .discord-invite-badge-verified {
			color: #3ba55d;
		}

		:host .discord-invite-badge-partnered {
			color: #5865f2;
		}

		:host .discord-invite-badge-container {
			position: absolute;
			top: -0.05px;
			left: 0.05px;
			right: 0;
			bottom: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			pointer-events: none;
			color: white;
		}

		:host([light-theme]) .discord-invite-counts,
		:host([light-theme]) .discord-invite-count {
			color: #4f5660;
		}
	`), qe(e, a), e;
})();
var il = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
}, al = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
};
(() => {
  var m;
  let i = [Me("discord-italic")], t, a = [], e, s = we;
  return m = class extends s {
    render() {
      return x`
			<em>
				<slot></slot>
			</em>
		`;
    }
  }, e = m, (() => {
    const c = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    il(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: c }, null, a), e = t.value, c && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: c });
  })(), /**
   * @internal
   */
  me(m, "styles", ke`
		:host > em {
			font-style: italic;
		}
	`), al(e, a), e;
})();
var sl = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
}, rl = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
};
(() => {
  var m;
  let i = [Me("discord-list-item")], t, a = [], e, s = we;
  return m = class extends s {
    checkParentElement() {
      if (this.parentElement?.tagName.toLowerCase() !== "discord-unordered-list" && this.parentElement?.tagName.toLowerCase() !== "discord-ordered-list")
        throw new Ft("All <discord-list-item> components must be direct children of <discord-unordered-list> or <discord-ordered-list>.");
    }
    render() {
      return this.checkParentElement(), x`<li><slot></slot></li>`;
    }
  }, e = m, (() => {
    const c = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    sl(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: c }, null, a), e = t.value, c && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: c });
  })(), /**
   * @internal
   */
  me(m, "styles", ke`
		:host > li {
			margin-bottom: 4px;
		}
	`), rl(e, a), e;
})();
function ol(i) {
  return i.startsWith("#") ? i.slice(1) : i;
}
function ll(i) {
  const t = i.length === 3 || i.length === 4, a = t ? `${i.slice(0, 1)}${i.slice(0, 1)}` : i.slice(0, 2), e = t ? `${i.slice(1, 2)}${i.slice(1, 2)}` : i.slice(2, 4), s = t ? `${i.slice(2, 3)}${i.slice(2, 3)}` : i.slice(4, 6), m = (t ? `${i.slice(3, 4)}${i.slice(3, 4)}` : i.slice(6, 8)) || "ff";
  return {
    r: a,
    g: e,
    b: s,
    a: m
  };
}
function Gi(i) {
  return Number.parseInt(i, 16);
}
function nl({ r: i, g: t, b: a, a: e }) {
  return {
    r: Gi(i),
    g: Gi(t),
    b: Gi(a),
    a: Number((Gi(e) / 255).toFixed(2))
  };
}
function cl(i) {
  return typeof i == "number" || typeof i == "string" && Number.isFinite(Number(i));
}
function hl(i, t) {
  const { r: a, g: e, b: s, a: m } = i, n = cl(t) ? t : m;
  return `rgba(${a}, ${e}, ${s}, ${n})`;
}
function ma(i, t) {
  const a = ol(i), e = ll(a), s = nl(e);
  return hl(s, t);
}
const dl = pe`
	<path
		fill-rule="evenodd"
		clip-rule="evenodd"
		fill="currentColor"
		d="M18.5 23c.88 0 1.7-.25 2.4-.69l1.4 1.4a1 1 0 0 0 1.4-1.42l-1.39-1.4A4.5 4.5 0 1 0 18.5 23Zm0-2a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
	/>
	<path
		fill="currentColor"
		d="M3 3a1 1 0 0 0 0 2h18a1 1 0 1 0 0-2H3ZM2 8a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1ZM3 11a1 1 0 1 0 0 2h11a1 1 0 1 0 0-2H3ZM2 16a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1ZM3 19a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2H3Z"
	/>
`;
function ml(i = {}) {
  return x`<svg
		${ve(i)}
		class="discord-mention-icon"
		aria-label="Browse Channels"
		aria-hidden="false"
		role="img"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		${dl}
	</svg>`;
}
const ul = pe`
	<path
		fill="currentColor"
		d="M21.487 5.126L12.487 0.126C12.184 -0.042 11.818 -0.042 11.515 0.126L2.51498 5.126C2.19798 5.302 2.00098 5.636 2.00098 5.999C2.00098 6.693 2.11498 22.999 12.001 22.999C21.887 22.999 22.001 6.693 22.001 5.999C22.001 5.636 21.804 5.302 21.487 5.126ZM12.001 5.999C13.382 5.999 14.501 7.118 14.501 8.499C14.501 9.88 13.382 10.999 12.001 10.999C10.62 10.999 9.50098 9.88 9.50098 8.499C9.50098 7.118 10.62 5.999 12.001 5.999ZM8.25098 16C8.25098 13.699 9.69998 12.25 12.001 12.25C14.302 12.25 15.751 13.699 15.751 16H8.25098Z"
	/>
`;
function fl(i = {}) {
  return x`<svg
		${ve(i)}
		class="discord-mention-icon"
		aria-label="Customise Community"
		aria-hidden="false"
		role="img"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		${ul}
	</svg>`;
}
const pl = pe`
	<path
		d="M11 3a1 1 0 1 1 2 0v2h5.75c.16 0 .3.07.4.2l2.63 3.5a.5.5 0 0 1 0 .6l-2.63 3.5a.5.5 0 0 1-.4.2H13v5h2a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-1c0-1.1.9-2 2-2h2v-5H2.8a.5.5 0 0 1-.44-.72L3.9 9.22a.5.5 0 0 0 0-.44L2.36 5.72A.5.5 0 0 1 2.81 5H11V3Z"
		fill="currentColor"
	/>
`;
function vl(i = {}) {
  return x`<svg
		${ve(i)}
		class="discord-mention-icon"
		aria-label="Server Guide"
		aria-hidden="false"
		role="img"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		${pl}
	</svg>`;
}
var Ii = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
}, Bt = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
};
(() => {
  var h, F, K, M, C;
  let i = [Me("discord-mention")], t, a = [], e, s = we, m, n = [], c = [], v, u = [], l = [], r, _ = [], p = [], f, d = [], o = [];
  return h = class extends s {
    constructor() {
      super(...arguments);
      y(this, F, Bt(this, n, !1));
      y(this, K, (Bt(this, c), Bt(this, u, "user")));
      y(this, M, (Bt(this, l), Bt(this, _, void 0)));
      me(this, "setHoverColor", (Bt(this, p), () => {
        this.color && (this.style.backgroundColor = ma(this.color, 0.3));
      }));
      me(this, "resetHoverColor", () => {
        this.color && (this.style.backgroundColor = ma(this.color, 0.1));
      });
      y(this, C, Bt(this, d, !1));
      Bt(this, o);
    }
    /**
     * Whether this entire message block should be highlighted (to emulate the "logged in user" being pinged).
     */
    get highlight() {
      return b(this, F);
    }
    set highlight(V) {
      z(this, F, V);
    }
    /**
     * The type of mention this should be. This will prepend the proper prefix character.
     * Valid values:
     * - `'user'`
     * - `'channel'`
     * - `'role'`
     * - `'voice'`
     * - `'locked'`
     * - `'thread'`
     * - `'forum'`
     * - `'slash'`
     * - `'server-guide'`
     * - `'channels-and-roles'`
     * - `'customize-community'`
     */
    get type() {
      return b(this, K);
    }
    set type(V) {
      z(this, K, V);
    }
    get color() {
      return b(this, M);
    }
    set color(V) {
      z(this, M, V);
    }
    get lightTheme() {
      return b(this, C);
    }
    set lightTheme(V) {
      z(this, C, V);
    }
    connectedCallback() {
      super.connectedCallback(), this.color && this.type === "role" && (this.addEventListener("mouseover", this.setHoverColor), this.addEventListener("mouseout", this.resetHoverColor));
    }
    disconnectedCallback() {
      this.removeEventListener("mouseover", this.setHoverColor), this.removeEventListener("mouseout", this.resetHoverColor), super.disconnectedCallback();
    }
    willUpdate() {
      this.color && (this.style.color = this.color, this.type === "role" && (this.style.backgroundColor = ma(this.color, 0.1)));
    }
    render() {
      return x`<span class="no-wrap"
				>${Ca(this.type, [
        ["channel", () => ds()],
        ["user", () => x`@`],
        ["role", () => x`@`],
        ["voice", () => fs()],
        ["locked", () => us()],
        ["thread", () => ms()],
        ["forum", () => hs()],
        ["server-guide", () => vl()],
        ["channels-and-roles", () => ml()],
        ["customize-community", () => fl()],
        ["slash", () => x`/`]
      ])}</span
			><slot></slot>`;
    }
  }, F = new WeakMap(), K = new WeakMap(), M = new WeakMap(), C = new WeakMap(), e = h, (() => {
    const V = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    m = [w({ type: Boolean, reflect: !0 })], v = [w({ reflect: !0 })], r = [w({ reflect: !0 })], f = [He({ context: Oe, subscribe: !0 }), w({ type: Boolean, reflect: !0, attribute: "light-theme" })], Ii(h, null, m, { kind: "accessor", name: "highlight", static: !1, private: !1, access: { has: (H) => "highlight" in H, get: (H) => H.highlight, set: (H, te) => {
      H.highlight = te;
    } }, metadata: V }, n, c), Ii(h, null, v, { kind: "accessor", name: "type", static: !1, private: !1, access: { has: (H) => "type" in H, get: (H) => H.type, set: (H, te) => {
      H.type = te;
    } }, metadata: V }, u, l), Ii(h, null, r, { kind: "accessor", name: "color", static: !1, private: !1, access: { has: (H) => "color" in H, get: (H) => H.color, set: (H, te) => {
      H.color = te;
    } }, metadata: V }, _, p), Ii(h, null, f, { kind: "accessor", name: "lightTheme", static: !1, private: !1, access: { has: (H) => "lightTheme" in H, get: (H) => H.lightTheme, set: (H, te) => {
      H.lightTheme = te;
    } }, metadata: V }, d, o), Ii(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: V }, null, a), e = t.value, V && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: V });
  })(), /**
   * @internal
   */
  me(h, "styles", ke`
		:host {
			color: #e3e7f8;
			background-color: hsla(235, 85.6%, 64.7%, 0.3);
			font-weight: 500;
			padding: 0 2px;
			border-radius: 3px;
			unicode-bidi: -moz-plaintext;
			unicode-bidi: plaintext;
			-webkit-transition:
				background-color 50ms ease-out,
				color 50ms ease-out;
			transition:
				background-color 50ms ease-out,
				color 50ms ease-out;
			cursor: pointer;
		}

		:host([type='role']) {
			background-color: rgba(#e3e7f8, 0.1);
		}

		:host([type='channel']) {
			position: relative;
		}

		:host([type='voice']),
		:host([type='locked']),
		:host([type='thread']),
		:host([type='forum']) {
			position: relative;
		}

		:host(:hover) {
			color: #fff;
			background-color: hsl(235, 85.6%, 64.7%);
		}

		:host([highlight][type='user']:hover) {
			text-decoration: underline;
			text-underline-offset: 1px;
		}

		:host([light-theme]) {
			color: #5865f2;
			background-color: hsla(235, 85.6%, 64.7%, 0.15);
		}

		:host([light-theme]:hover) {
			color: #ffffff;
			background-color: hsl(235, 85.6%, 64.7%);
		}

		.discord-mention-icon {
			width: 1rem;
			height: 1rem;
			margin-right: 4px;
			vertical-align: middle;
			margin-bottom: 0.2rem;
		}

		.no-wrap {
			white-space: nowrap;
		}
	`), Bt(e, a), e;
})();
const gl = pe`
 	<path 
		fill="currentColor" 
 		d="M15.56 11.77c.2-.1.44.02.44.23a4 4 0 1 1-4-4c.21 0 .33.25.23.44a2.5 2.5 0 0 0 3.32 3.32Z"
 	/>
  	<path 
		fill="currentColor" 
  		fill-rule="evenodd" 
  		d="M22.89 11.7q.105.3 0 .6C22.27 13.9 19.1 21 12 21c-7.11 0-10.27-7.11-10.89-8.7a.83.83 0 0 1 0-.6C1.73 10.1 4.9 3 12 3c7.11 0 10.27 7.11 10.89 8.7m-4.5-3.62A15.1 15.1 0 0 1 20.85 12c-.38.88-1.18 2.47-2.46 3.92C16.87 17.62 14.8 19 12 19s-4.87-1.38-6.39-3.08A15.1 15.1 0 0 1 3.15 12c.38-.88 1.18-2.47 2.46-3.92C7.13 6.38 9.2 5 12 5s4.87 1.38 6.39 3.08" 
  		clip-rule="evenodd"
  	/>
`;
function _l(i = {}) {
  return x`<svg
		${ve(i)}
		class="discord-message-ephemeral-icon"
		aria-hidden="false"
		width="16"
		height="16"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
	>
		${gl}
	</svg>`;
}
var Re = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
}, xe = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
};
(() => {
  var $e, xt, Tt, re, B, fe, et, mt, pt, di, ki, oe, L, ze, Xt, Zt, Xe, Kt, Mi, $i, Ti, Ci, ji, Hi, Ei;
  let i = [Me("discord-message")], t, a = [], e, s = we, m, n = [], c = [], v, u = [], l = [], r, _ = [], p = [], f, d = [], o = [], h, F = [], K = [], M, C = [], I = [], E, V = [], H = [], te, _e = [], k = [], g, N = [], be = [], O, T = [], ee = [], ae, Z = [], A = [], se, ye = [], he = [], P, Y = [], G = [], U, q = [], ge = [], je, R = [], j = [], ie, De = [], Ie = [], Ne, le = [], W = [], D, $ = [], ce = [], Te, ue = [], Q = [], Ee, Mt = [], $t = [], Ve, tt = [], it = [], at, st = [], rt = [], ot, lt = [], nt = [], ct, ht = [], dt = [];
  return $e = class extends s {
    constructor() {
      super(...arguments);
      y(this, xt, xe(this, n, void 0));
      y(this, Tt, (xe(this, c), xe(this, u, "User")));
      y(this, re, (xe(this, l), xe(this, _, void 0)));
      y(this, B, (xe(this, p), xe(this, d, !1)));
      y(this, fe, (xe(this, o), xe(this, F, !1)));
      y(this, et, (xe(this, K), xe(this, C, !1)));
      y(this, mt, (xe(this, I), xe(this, V, !1)));
      y(this, pt, (xe(this, H), xe(this, _e, !1)));
      y(this, di, (xe(this, k), xe(this, N, !1)));
      y(this, ki, (xe(this, be), xe(this, T, void 0)));
      y(this, oe, (xe(this, ee), xe(this, Z, void 0)));
      y(this, L, (xe(this, A), xe(this, ye, void 0)));
      y(this, ze, (xe(this, he), xe(this, Y, void 0)));
      y(this, Xt, (xe(this, G), xe(this, q, void 0)));
      y(this, Zt, (xe(this, ge), xe(this, R, !1)));
      y(this, Xe, (xe(this, j), xe(this, De, !1)));
      y(this, Kt, (xe(this, Ie), xe(this, le, /* @__PURE__ */ new Date())));
      y(this, Mi, (xe(this, W), xe(this, $, !1)));
      y(this, $i, (xe(this, ce), xe(this, ue, !1)));
      y(this, Ti, (xe(this, Q), xe(this, Mt, !1)));
      y(this, Ci, (xe(this, $t), xe(this, tt, !1)));
      y(this, ji, (xe(this, it), xe(this, st, !1)));
      y(this, Hi, (xe(this, rt), xe(this, lt, !1)));
      y(this, Ei, (xe(this, nt), xe(this, ht, () => {
      })));
      xe(this, dt);
    }
    /**
     * The id of the profile data to use.
     */
    get profile() {
      return b(this, xt);
    }
    set profile(X) {
      z(this, xt, X);
    }
    /**
     * The message author's username.
     *
     * @defaultValue 'User'
     */
    get author() {
      return b(this, Tt);
    }
    set author(X) {
      z(this, Tt, X);
    }
    /**
     * The message author's avatar. Can be an avatar shortcut, relative path, or external link.
     */
    get avatar() {
      return b(this, re);
    }
    set avatar(X) {
      z(this, re, X);
    }
    /**
     * Whether the message author is a bot or not.
     * Only works if `server` and `officialApp` is `false` or `undefined`.
     */
    get bot() {
      return b(this, B);
    }
    set bot(X) {
      z(this, B, X);
    }
    /**
     * Whether the message author is a server crosspost webhook or not.
     * Only works if `bot` and `officialApp` is `false` or `undefined`.
     */
    get server() {
      return b(this, fe);
    }
    set server(X) {
      z(this, fe, X);
    }
    /**
     * Whether the message author is official app.
     * Only works if `bot` and `server` is `falns`
     */
    get officialApp() {
      return b(this, et);
    }
    set officialApp(X) {
      z(this, et, X);
    }
    /**
     * Whether the bot is verified or not.
     * Only works if `bot` is `true`
     */
    get verified() {
      return b(this, mt);
    }
    set verified(X) {
      z(this, mt, X);
    }
    /**
     * Whether the author is the original poster.
     */
    get op() {
      return b(this, pt);
    }
    set op(X) {
      z(this, pt, X);
    }
    /**
     * Whether the message has been edited or not.
     */
    get edited() {
      return b(this, di);
    }
    set edited(X) {
      z(this, di, X);
    }
    /**
     * The message author's primary role color. Can be any [CSS color value](https://www.w3schools.com/cssref/css_colors_legal.asp).
     */
    get roleColor() {
      return b(this, ki);
    }
    set roleColor(X) {
      z(this, ki, X);
    }
    /**
     * The message author's role icon URL.
     */
    get roleIcon() {
      return b(this, oe);
    }
    set roleIcon(X) {
      z(this, oe, X);
    }
    /**
     * The name of the role to use as alternative image text.
     */
    get roleName() {
      return b(this, L);
    }
    set roleName(X) {
      z(this, L, X);
    }
    /**
     * The clan's tag icon URL.
     */
    get clanIcon() {
      return b(this, ze);
    }
    set clanIcon(X) {
      z(this, ze, X);
    }
    /**
     * The name of the clan you are part of
     */
    get clanTag() {
      return b(this, Xt);
    }
    set clanTag(X) {
      z(this, Xt, X);
    }
    /**
     * Whether to highlight this message.
     */
    get highlight() {
      return b(this, Zt);
    }
    set highlight(X) {
      z(this, Zt, X);
    }
    /**
     * Whether to make this message ephemeral.
     */
    get ephemeral() {
      return b(this, Xe);
    }
    set ephemeral(X) {
      z(this, Xe, X);
    }
    /**
     * The timestamp to use for the message date.
     *
     * if {@link DiscordMessage.messageBodyOnly} is `true`, this will be shown in the gutter before the message on hover.
     */
    get timestamp() {
      return b(this, Kt);
    }
    set timestamp(X) {
      z(this, Kt, X);
    }
    /**
     * Whether to use 24-hour format for the timestamp.
     */
    get twentyFour() {
      return b(this, Mi);
    }
    set twentyFour(X) {
      z(this, Mi, X);
    }
    get messageBodyOnly() {
      return b(this, $i);
    }
    set messageBodyOnly(X) {
      z(this, $i, X);
    }
    get lightTheme() {
      return b(this, Ti);
    }
    set lightTheme(X) {
      z(this, Ti, X);
    }
    get compactMode() {
      return b(this, Ci);
    }
    set compactMode(X) {
      z(this, Ci, X);
    }
    get noBackground() {
      return b(this, ji);
    }
    set noBackground(X) {
      z(this, ji, X);
    }
    get hasThread() {
      return b(this, Hi);
    }
    set hasThread(X) {
      z(this, Hi, X);
    }
    get dismissMessageClicked() {
      return b(this, Ei);
    }
    set dismissMessageClicked(X) {
      z(this, Ei, X);
    }
    willUpdate() {
      this.hasThread = Array.from(this.children).some((X) => X.tagName.toLowerCase() === "discord-thread"), this.highlight = this.highlight || Array.from(this.children).some((X) => X.tagName.toLowerCase() === "discord-mention" && X.hasAttribute("highlight") && (X.type === "user" || X.type === "role"));
    }
    handleSpaceToDismissMessage(X) {
      X.code === "Space" && (X.preventDefault(), X.stopPropagation(), this.dismissMessageClicked?.());
    }
    render() {
      const X = {
        author: this.author,
        bot: this.bot,
        officialApp: this.officialApp,
        verified: this.verified,
        server: this.server,
        op: this.op,
        roleColor: this.roleColor,
        roleIcon: this.roleIcon,
        clanIcon: this.clanIcon,
        clanTag: this.clanTag,
        roleName: this.roleName
      }, S = this.profile !== void 0 && Reflect.get(wi, this.profile) || {}, ne = { ...X, ...S, avatar: this.resolveAvatar(S.avatar ?? this.avatar) }, Si = Wi(this.timestamp, this.compactMode, this.twentyFour) ?? void 0;
      return x`
			<slot name="reply"></slot>
			<div
				class=${Le({
        "discord-message-inner": !0,
        "discord-message-inner-center": this.messageBodyOnly
      })}
			>
				${J(this.compactMode && !this.messageBodyOnly, () => x`<time datetime="${de(Si)}" class="discord-message-timestamp">${Si}</time>`, () => null)}
				${J(this.messageBodyOnly, () => x`<time
							datetime="${de(Si)}"
							class=${Le({
        "discord-message-timestamp": !0,
        "discord-message-timestamp-hover": !0,
        "discord-message-body-only-indent": !this.compactMode
      })}
						></time>`, () => null)}
				${J(this.compactMode || this.messageBodyOnly, () => null, () => x`<div class="discord-author-avatar">
							<img src="${de(ne.avatar)}" alt="${de(ne.author)}" />
						</div>`)}

				<div class="discord-message-content">
					${J(this.compactMode || this.messageBodyOnly, () => null, () => x`
							<discord-author-info
								author=${ne.author ?? ""}
								?bot=${ne.bot ?? !1}
								?server=${ne.server ?? !1}
								?official-app=${ne.officialApp ?? !1}
								?verified=${ne.verified ?? !1}
								?op=${ne.op ?? !1}
								role-color=${ne.roleColor ?? ""}
								role-icon=${ne.roleIcon ?? ""}
								role-name=${ne.roleName ?? ""}
								clan-icon=${ne.clanIcon ?? ""}
								clan-tag=${ne.clanTag ?? ""}
							></discord-author-info
							><time datetime="${de(Si)}" class="discord-message-timestamp">${Si}</time>
						`)}
					<div class="discord-message-body">
						${J(this.compactMode, () => x`<discord-author-info
									author=${ne.author ?? ""}
									?bot=${ne.bot ?? !1}
									?server=${ne.server ?? !1}
									?official-app=${ne.officialApp ?? !1}
									?verified=${ne.verified ?? !1}
									?op=${ne.op ?? !1}
									role-color=${ne.roleColor ?? ""}
									role-icon=${ne.roleIcon ?? ""}
									role-name=${ne.roleName ?? ""}
									clan-icon=${ne.clanIcon ?? ""}
									clan-tag=${ne.clanTag ?? ""}
								></discord-author-info>`, () => null)}<span class="discord-message-markup"><slot></slot></span>
						${J(this.edited, () => x`<span class="discord-message-edited">(edited)</span>`, () => null)}
					</div>
					<div class="discord-message-compact-indent">
						<slot name="attachments"></slot>
						<slot name="embeds"></slot>
						<slot name="components"></slot>
						<slot name="reactions"></slot>
						<slot name="thread"></slot>
						${J(this.ephemeral, () => x`
								<div class="discord-message-ephemeral">
									${_l()} Only you can see this •
									<span
										role="button"
										class="discord-message-ephemeral-link"
										@click=${this.dismissMessageClicked}
										@keydown=${this.handleSpaceToDismissMessage}
										>Dismiss message</span
									>
								</div>
							`, () => null)}
					</div>
				</div>
			</div>
		`;
    }
    resolveAvatar(X) {
      return X === void 0 ? wt.default : wt[X] ?? X ?? wt.default;
    }
  }, xt = new WeakMap(), Tt = new WeakMap(), re = new WeakMap(), B = new WeakMap(), fe = new WeakMap(), et = new WeakMap(), mt = new WeakMap(), pt = new WeakMap(), di = new WeakMap(), ki = new WeakMap(), oe = new WeakMap(), L = new WeakMap(), ze = new WeakMap(), Xt = new WeakMap(), Zt = new WeakMap(), Xe = new WeakMap(), Kt = new WeakMap(), Mi = new WeakMap(), $i = new WeakMap(), Ti = new WeakMap(), Ci = new WeakMap(), ji = new WeakMap(), Hi = new WeakMap(), Ei = new WeakMap(), e = $e, (() => {
    const X = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    m = [w()], v = [w()], r = [w()], f = [w({ type: Boolean })], h = [w({ type: Boolean })], M = [w({ type: Boolean, attribute: "official-app" })], E = [w({ type: Boolean })], te = [w({ type: Boolean })], g = [w({ type: Boolean })], O = [w({ attribute: "role-color" })], ae = [w({ attribute: "role-icon" })], se = [w({ attribute: "role-name" })], P = [w({ attribute: "clan-icon" })], U = [w({ attribute: "clan-tag" })], je = [w({ type: Boolean, reflect: !0 })], ie = [w({ type: Boolean, reflect: !0 })], Ne = [w({
      type: String,
      converter: (S) => Wi(S, !1, !1),
      attribute: !0
    })], D = [w({ type: Boolean, attribute: "twenty-four" })], Te = [w({ type: Boolean, attribute: "message-body-only" })], Ee = [He({ context: Oe }), w({ type: Boolean, reflect: !0, attribute: "light-theme" })], Ve = [He({ context: Jt }), w({ type: Boolean, reflect: !0, attribute: "compact-mode" })], at = [He({ context: ps }), w({ type: Boolean, reflect: !0, attribute: "no-background" })], ot = [w({ type: Boolean, reflect: !0, attribute: "has-thread" })], ct = [w({ reflect: !1, attribute: "dismiss-message-clicked" })], Re($e, null, m, { kind: "accessor", name: "profile", static: !1, private: !1, access: { has: (S) => "profile" in S, get: (S) => S.profile, set: (S, ne) => {
      S.profile = ne;
    } }, metadata: X }, n, c), Re($e, null, v, { kind: "accessor", name: "author", static: !1, private: !1, access: { has: (S) => "author" in S, get: (S) => S.author, set: (S, ne) => {
      S.author = ne;
    } }, metadata: X }, u, l), Re($e, null, r, { kind: "accessor", name: "avatar", static: !1, private: !1, access: { has: (S) => "avatar" in S, get: (S) => S.avatar, set: (S, ne) => {
      S.avatar = ne;
    } }, metadata: X }, _, p), Re($e, null, f, { kind: "accessor", name: "bot", static: !1, private: !1, access: { has: (S) => "bot" in S, get: (S) => S.bot, set: (S, ne) => {
      S.bot = ne;
    } }, metadata: X }, d, o), Re($e, null, h, { kind: "accessor", name: "server", static: !1, private: !1, access: { has: (S) => "server" in S, get: (S) => S.server, set: (S, ne) => {
      S.server = ne;
    } }, metadata: X }, F, K), Re($e, null, M, { kind: "accessor", name: "officialApp", static: !1, private: !1, access: { has: (S) => "officialApp" in S, get: (S) => S.officialApp, set: (S, ne) => {
      S.officialApp = ne;
    } }, metadata: X }, C, I), Re($e, null, E, { kind: "accessor", name: "verified", static: !1, private: !1, access: { has: (S) => "verified" in S, get: (S) => S.verified, set: (S, ne) => {
      S.verified = ne;
    } }, metadata: X }, V, H), Re($e, null, te, { kind: "accessor", name: "op", static: !1, private: !1, access: { has: (S) => "op" in S, get: (S) => S.op, set: (S, ne) => {
      S.op = ne;
    } }, metadata: X }, _e, k), Re($e, null, g, { kind: "accessor", name: "edited", static: !1, private: !1, access: { has: (S) => "edited" in S, get: (S) => S.edited, set: (S, ne) => {
      S.edited = ne;
    } }, metadata: X }, N, be), Re($e, null, O, { kind: "accessor", name: "roleColor", static: !1, private: !1, access: { has: (S) => "roleColor" in S, get: (S) => S.roleColor, set: (S, ne) => {
      S.roleColor = ne;
    } }, metadata: X }, T, ee), Re($e, null, ae, { kind: "accessor", name: "roleIcon", static: !1, private: !1, access: { has: (S) => "roleIcon" in S, get: (S) => S.roleIcon, set: (S, ne) => {
      S.roleIcon = ne;
    } }, metadata: X }, Z, A), Re($e, null, se, { kind: "accessor", name: "roleName", static: !1, private: !1, access: { has: (S) => "roleName" in S, get: (S) => S.roleName, set: (S, ne) => {
      S.roleName = ne;
    } }, metadata: X }, ye, he), Re($e, null, P, { kind: "accessor", name: "clanIcon", static: !1, private: !1, access: { has: (S) => "clanIcon" in S, get: (S) => S.clanIcon, set: (S, ne) => {
      S.clanIcon = ne;
    } }, metadata: X }, Y, G), Re($e, null, U, { kind: "accessor", name: "clanTag", static: !1, private: !1, access: { has: (S) => "clanTag" in S, get: (S) => S.clanTag, set: (S, ne) => {
      S.clanTag = ne;
    } }, metadata: X }, q, ge), Re($e, null, je, { kind: "accessor", name: "highlight", static: !1, private: !1, access: { has: (S) => "highlight" in S, get: (S) => S.highlight, set: (S, ne) => {
      S.highlight = ne;
    } }, metadata: X }, R, j), Re($e, null, ie, { kind: "accessor", name: "ephemeral", static: !1, private: !1, access: { has: (S) => "ephemeral" in S, get: (S) => S.ephemeral, set: (S, ne) => {
      S.ephemeral = ne;
    } }, metadata: X }, De, Ie), Re($e, null, Ne, { kind: "accessor", name: "timestamp", static: !1, private: !1, access: { has: (S) => "timestamp" in S, get: (S) => S.timestamp, set: (S, ne) => {
      S.timestamp = ne;
    } }, metadata: X }, le, W), Re($e, null, D, { kind: "accessor", name: "twentyFour", static: !1, private: !1, access: { has: (S) => "twentyFour" in S, get: (S) => S.twentyFour, set: (S, ne) => {
      S.twentyFour = ne;
    } }, metadata: X }, $, ce), Re($e, null, Te, { kind: "accessor", name: "messageBodyOnly", static: !1, private: !1, access: { has: (S) => "messageBodyOnly" in S, get: (S) => S.messageBodyOnly, set: (S, ne) => {
      S.messageBodyOnly = ne;
    } }, metadata: X }, ue, Q), Re($e, null, Ee, { kind: "accessor", name: "lightTheme", static: !1, private: !1, access: { has: (S) => "lightTheme" in S, get: (S) => S.lightTheme, set: (S, ne) => {
      S.lightTheme = ne;
    } }, metadata: X }, Mt, $t), Re($e, null, Ve, { kind: "accessor", name: "compactMode", static: !1, private: !1, access: { has: (S) => "compactMode" in S, get: (S) => S.compactMode, set: (S, ne) => {
      S.compactMode = ne;
    } }, metadata: X }, tt, it), Re($e, null, at, { kind: "accessor", name: "noBackground", static: !1, private: !1, access: { has: (S) => "noBackground" in S, get: (S) => S.noBackground, set: (S, ne) => {
      S.noBackground = ne;
    } }, metadata: X }, st, rt), Re($e, null, ot, { kind: "accessor", name: "hasThread", static: !1, private: !1, access: { has: (S) => "hasThread" in S, get: (S) => S.hasThread, set: (S, ne) => {
      S.hasThread = ne;
    } }, metadata: X }, lt, nt), Re($e, null, ct, { kind: "accessor", name: "dismissMessageClicked", static: !1, private: !1, access: { has: (S) => "dismissMessageClicked" in S, get: (S) => S.dismissMessageClicked, set: (S, ne) => {
      S.dismissMessageClicked = ne;
    } }, metadata: X }, ht, dt), Re(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: X }, null, a), e = t.value, X && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: X });
  })(), /**
   * @internal
   */
  me($e, "styles", ke`
		:host {
			color: #dcddde;
			display: flex;
			flex-direction: column;
			font-size: 0.9em;
			font-family: 'gg sans', 'Noto Sans', Whitney, 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;

			position: relative;
			word-wrap: break-word;
			-webkit-user-select: text;
			-moz-user-select: text;
			-ms-user-select: text;
			user-select: text;
			-webkit-box-flex: 0;
			-ms-flex: 0 0 auto;
			flex: 0 0 auto;
			min-height: 1.375rem;
			padding-left: 1em;
			padding-right: 48px;
			margin-top: inherit;
			margin-bottom: inherit;
			line-height: 16px;
		}

		.discord-message-inner {
			display: flex;
			position: relative;
			-webkit-box-flex: 0;
			-ms-flex: 0 0 auto;
			flex: 0 0 auto;
		}

		.discord-message-inner-center {
			align-items: center;
		}

		:host([message-body-only]) {
			margin-top: 0px !important;
			padding-top: 0.125rem !important;
			padding-bottom: 0.0625rem !important;
		}

		:host([highlight]),
		:host([ephemeral]) {
			padding-right: 5px;
			position: relative;
		}

		:host([highlight])::before,
		:host([ephemeral])::before {
			content: '';
			position: absolute;
			display: block;
			top: 0;
			left: 0;
			bottom: 0;
			pointer-events: none;
			width: 2px;
		}

		:host([highlight]) {
			background-color: rgba(250, 166, 26, 0.1);
		}

		:host([highlight][light-theme]) {
			background-color: rgba(250, 166, 26, 0.1);
		}

		:host([highlight])::before {
			background-color: #faa61a;
		}

		:host([light-theme][highlight])::before {
			background-color: #af7615;
		}

		:host([ephemeral]) {
			background-color: rgba(88, 101, 242, 0.05);
		}

		:host([ephemeral]:hover) {
			background-color: rgba(88, 101, 242, 0.1);
		}

		:host([ephemeral])::before {
			background-color: #5865f2;
		}

		:host([light-theme]) {
			color: #2e3338;
			border-color: #eceeef;
		}

		.discord-author-avatar {
			margin-right: 16px;
			margin-top: 5px;
			min-width: 40px;
			z-index: 1;
			display: flex;
		}

		.discord-author-avatar img {
			width: 40px;
			height: 40px;
			border-radius: 50%;
			cursor: pointer;
		}

		.discord-message-timestamp {
			color: #72767d;
			font-size: 12px;
			margin-left: 3px;
		}

		.discord-message-body-only-indent {
			width: 56px;
		}

		:host(:hover) .discord-message-timestamp-hover::before {
			content: attr(datetime);
		}

		:host([light-theme]) .discord-message-timestamp {
			color: #747f8d;
		}

		.discord-message-edited {
			color: #72767d;
			font-size: 10px;
		}

		:host([light-theme]) .discord-message-edited {
			color: #99aab5;
		}

		.discord-message-content {
			width: 100%;
			line-height: 160%;
			font-weight: normal;
			padding-top: 2px;
		}

		.discord-message-body {
			font-size: 1rem;
			font-weight: 400;
			word-break: break-word;
			position: relative;
		}

		:host([light-theme]) .discord-message-timestamp,
		:host([compact-mode]) .discord-message:hover .discord-message-timestamp {
			color: #99aab5;
		}

		:host([light-theme][compact-mode]).discord-message-timestamp {
			color: #d1d9de;
		}

		:host([compact-mode]) .discord-message-timestamp {
			display: inline-block;
			width: 3.1rem;
			text-align: right;
			font-size: 0.6875rem;
			line-height: 1.375rem;
			margin-right: 0.375rem;
			margin-left: 0;
			text-indent: 0;
		}

		:host([compact-mode]) .discord-message-body {
			line-height: 1.375rem;
			padding-left: 10px;
			margin-left: -6px;
		}

		:host([compact-mode]) .discord-message-compact-indent {
			padding-left: 10px;
		}

		:host .discord-message-markup {
			font-size: 1rem;
			line-height: 1.375rem;
			word-wrap: break-word;
			user-select: text;
			font-weight: 400;
			display: inline;
		}

		:host(:hover) {
			background-color: hsl(0 calc(1 * 0%) 0.8%/0.03);
		}

		:host([highlight]:hover) {
			background-color: hsl(40 calc(1 * 86.4%) 56.9%/0.08);
		}

		:host([has-thread]):after {
			width: 2rem;
			left: 2.2rem;
			top: 4.8rem;
			border-left: 2px solid #4f545c !important;
			border-bottom: 2px solid #4f545c !important;
			border-bottom-left-radius: 8px !important;
			bottom: 29px;
			content: '';
			position: absolute;
		}

		:host([light-theme][has-Thread]):after {
			border-color: #747f8d !important;
		}

		.discord-message-ephemeral {
			margin-top: 4px;
			font-size: 12px;
			font-weight: 400;
			color: #72767d;
		}

		:host([light-theme]) .discord-message-ephemeral {
			color: #747f8d;
		}

		.discord-message-ephemeral .discord-message-ephemeral-link {
			color: #00aff4;
			font-weight: 500;
			cursor: pointer;
		}

		.discord-message-ephemeral .discord-message-ephemeral-link:hover {
			text-decoration: underline;
		}

		.discord-message-ephemeral .discord-message-ephemeral-icon {
			margin-right: 4px;
			vertical-align: text-bottom;
		}
	`), xe(e, a), e;
})();
const bl = pe`
	<path fill="currentColor" d="M17.3 18.7a1 1 0 0 0 1.4-1.4L13.42 12l5.3-5.3a1 1 0 0 0-1.42-1.4L12 10.58l-5.3-5.3a1 1 0 0 0-1.4 1.42L10.58 12l-5.3 5.3a1 1 0 1 0 1.42 1.4L12 13.42l5.3 5.3Z"></path>
`;
function yl(i = {}) {
  return x`<svg ${ve(i)} aria-hidden="false" aria-label="Close" role="img" width="24" height="24" fill="none" viewBox="0 0 24 24">
		${bl}
	</svg>`;
}
const zl = pe`
	<circle cx="12" cy="12" r="10" fill="transparent"></circle>
	<path fill="color-mix(in oklab, hsl(215 calc(1 * 8.8%) 73.3% / 1) 100%, black 0%)" fill-rule="evenodd" d="M12 23a11 11 0 1 0 0-22 11 11 0 0 0 0 22Zm1.44-15.94L13.06 14a1.06 1.06 0 0 1-2.12 0l-.38-6.94a1 1 0 0 1 1-1.06h.88a1 1 0 0 1 1 1.06Zm-.19 10.69a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Z" clip-rule="evenodd"></path>
`;
function wl(i = {}) {
  return x`<svg ${ve(i)} aria-hidden="false" aria-label="Warning" role="img" width="24" height="24" fill="none" viewBox="0 0 24 24">
		${zl}
	</svg>`;
}
var At = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
}, Qe = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
};
(() => {
  var O, T, ee, ae, Z, A, se, ye, he, P;
  let i = [Me("discord-modal")], t, a = [], e, s = we, m, n = [], c = [], v, u = [], l = [], r, _ = [], p = [], f, d = [], o = [], h, F = [], K = [], M, C = [], I = [], E, V = [], H = [], te, _e = [], k = [], g, N = [], be = [];
  return O = class extends s {
    constructor() {
      super(...arguments);
      y(this, T, Qe(this, n, void 0));
      y(this, ee, (Qe(this, c), Qe(this, u, "User")));
      y(this, ae, (Qe(this, l), Qe(this, _, void 0)));
      y(this, Z, (Qe(this, p), Qe(this, d, void 0)));
      y(this, A, (Qe(this, o), Qe(this, F, void 0)));
      y(this, se, (Qe(this, K), Qe(this, C, void 0)));
      y(this, ye, (Qe(this, I), Qe(this, V, void 0)));
      y(this, he, (Qe(this, H), Qe(this, _e, !1)));
      y(this, P, (Qe(this, k), Qe(this, N, void 0)));
      me(this, "dialogRef", (Qe(this, be), yi()));
    }
    /**
     * The id of the profile data to use.
     */
    get profile() {
      return b(this, T);
    }
    set profile(U) {
      z(this, T, U);
    }
    /**
     * The message author's username.
     *
     * @defaultValue 'User'
     */
    get author() {
      return b(this, ee);
    }
    set author(U) {
      z(this, ee, U);
    }
    /**
     * The modal's author's avatar. Can be an avatar shortcut, relative path, or external link.
     */
    get avatar() {
      return b(this, ae);
    }
    set avatar(U) {
      z(this, ae, U);
    }
    /**
     * The `id` property of the `dialog` component. This is used to open the modal from the button and should match with `modal-id` on the button.
     */
    get modalId() {
      return b(this, Z);
    }
    set modalId(U) {
      z(this, Z, U);
    }
    /**
     * The title of the modal, displayed at the top
     */
    get modalTitle() {
      return b(this, A);
    }
    set modalTitle(U) {
      z(this, A, U);
    }
    get submitForm() {
      return b(this, se);
    }
    set submitForm(U) {
      z(this, se, U);
    }
    get closeForm() {
      return b(this, ye);
    }
    set closeForm(U) {
      z(this, ye, U);
    }
    get lightTheme() {
      return b(this, he);
    }
    set lightTheme(U) {
      z(this, he, U);
    }
    get originalBodyOverflow() {
      return b(this, P);
    }
    set originalBodyOverflow(U) {
      z(this, P, U);
    }
    handleClickCloseIcon() {
      this.dialogRef.value && this.dialogRef.value.close();
    }
    handleFormSubmit(U) {
      U.preventDefault(), U.stopPropagation();
      const q = this.shadowRoot?.querySelector("slot")?.assignedElements() ?? [];
      for (const ge of q)
        if (ge instanceof Za) {
          const je = ge.shadowRoot, R = je?.querySelector("input") ?? je?.querySelector("textarea");
          if (R?.attributes.getNamedItem("required") && !R.value) {
            const j = je?.querySelector("div.discord-text-input-message-needed-input");
            j instanceof HTMLDivElement && !j.style.display && (j.style.display = "flex", globalThis.setTimeout(() => {
              j.style.opacity = "1";
            }, 1));
            return;
          }
          if (R instanceof HTMLTextAreaElement && R.value.length < Number(R.attributes.getNamedItem("minlength")?.value) && R.value.length > 0 || R instanceof HTMLTextAreaElement && R.value.length < Number(R.attributes.getNamedItem("minlength")?.value) && R?.attributes.getNamedItem("required")) {
            const j = je?.querySelector("div.discord-text-input-message-needed-min-length");
            j instanceof HTMLDivElement && !j.style.display && (j.style.display = "flex", ge.hasWarning = !0, globalThis.setTimeout(() => {
              j.style.opacity = "1";
            }, 1));
            return;
          }
        }
      this.submitForm?.(), this.handleClickCloseIcon();
    }
    onCloseDialog() {
      globalThis.document.body.style.overflow = this.originalBodyOverflow ?? "scroll";
      const U = this.shadowRoot?.querySelector("div.discord-modal-box");
      U instanceof HTMLDivElement && (U.style.display = "none");
      const q = this.shadowRoot?.querySelector("slot")?.assignedElements() ?? [];
      for (const ge of q)
        if (ge instanceof Za) {
          ge.resetState();
          const je = ge.shadowRoot, R = je?.querySelector("div.discord-text-input-message-needed-input"), j = je?.querySelector("div.discord-text-input-message-needed-min-length");
          R instanceof HTMLDivElement && R.style.display && (R.style.display = "", R.style.opacity = "0"), j instanceof HTMLDivElement && j.style.display && (j.style.display = "", j.style.opacity = "0");
        }
      this.closeForm?.();
    }
    render() {
      const U = {
        author: this.author
      }, q = this.profile !== void 0 && Reflect.get(wi, this.profile) || {}, ge = { ...U, ...q, avatar: this.resolveAvatar(q.avatar ?? this.avatar) };
      return x`
			<dialog
				${Lt(this.dialogRef)}
				id="${de(this.modalId)}"
				class=${Le({ "discord-modal": !0, "discord-modal-light-theme": this.lightTheme })}
				@close=${this.onCloseDialog}
			>
				<div class="discord-modal-box">
					<form @submit=${this.handleFormSubmit}>
						<div aria-labelledby="discord-modal-title" role="dialog" tabindex="-1" aria-modal="true">
							<div class=${Le({ "discord-modal-root": !0, "discord-modal-root-light-theme": this.lightTheme })}>
								<div class="discord-modal-header-container">
									<div class="discord-modal-avatar">
										<img src="${de(ge.avatar)}" alt="${de(ge.author)}" />
									</div>
									<div
										id="discord-modal-title"
										class=${Le({ "discord-modal-title": !0, "discord-modal-title-light-theme": this.lightTheme })}
									>
										${this.modalTitle}
									</div>
									<button
										aria-label="Close"
										@click=${this.handleClickCloseIcon}
										type="button"
										class=${Le({
        "discord-modal-close-button": !0,
        "discord-modal-close-button-light-theme": this.lightTheme
      })}
									>
										<div class="discord-modal-close-button-content">${yl()}</div>
									</button>
								</div>
								<div
									class=${Le({
        "discord-modal-content-container": !0,
        "discord-modal-content-container-light-theme": this.lightTheme
      })}
								>
									<div class="discord-modal-warning-container">
										<div class="discord-modal-warning-icon">
											${wl({
        class: "discord-modal-warning-icon-svg" + (this.lightTheme ? " discord-modal-warning-icon-svg-light-theme" : "")
      })}
										</div>
										<div
											class=${Le({
        "discord-modal-warning": !0,
        "discord-modal-warning-light-theme": this.lightTheme
      })}
										>
											This form will be submitted to <strong class="discord-modal-warning-author">${ge.author}</strong>. Do
											not share passwords or other sensitive information.
										</div>
									</div>
									<div
										aria-hidden="true"
										style="position: absolute; pointer-events: none; min-height: 0px; min-width: 1px; flex: 0 0 auto; height: 0px;"
									></div>
								</div>
								<div class="discord-modal-slot-input-text">
									<slot></slot>
								</div>
								<div
									class=${Le({
        "discord-modal-actions-container": !0,
        "discord-modal-actions-container-light-theme": this.lightTheme
      })}
								>
									<button type="submit" class="discord-modal-button discord-modal-button-submit">
										<div class="discord-modal-button-content">Submit</div>
									</button>
									<button
										type="button"
										class=${Le({
        "discord-modal-button": !0,
        "discord-modal-button-cancel": !0,
        "discord-modal-button-cancel-light-theme": this.lightTheme
      })}
										@click=${this.handleClickCloseIcon}
									>
										<div
											class=${Le({
        "discord-modal-button-content": !0,
        "discord-modal-button-content-light-theme": this.lightTheme
      })}
										>
											Cancel
										</div>
									</button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</dialog>
		`;
    }
    resolveAvatar(U) {
      return U === void 0 ? wt.default : wt[U] ?? U ?? wt.default;
    }
  }, T = new WeakMap(), ee = new WeakMap(), ae = new WeakMap(), Z = new WeakMap(), A = new WeakMap(), se = new WeakMap(), ye = new WeakMap(), he = new WeakMap(), P = new WeakMap(), e = O, (() => {
    const U = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    m = [w()], v = [w()], r = [w()], f = [w({ reflect: !0, attribute: "modal-id" })], h = [w({ reflect: !0, attribute: "modal-title" })], M = [w({ reflect: !1, noAccessor: !0, attribute: !1 })], E = [w({ reflect: !1, noAccessor: !0, attribute: !1 })], te = [He({ context: Oe, subscribe: !0 }), w({ type: Boolean, reflect: !0, attribute: "light-theme" })], g = [ft()], At(O, null, m, { kind: "accessor", name: "profile", static: !1, private: !1, access: { has: (q) => "profile" in q, get: (q) => q.profile, set: (q, ge) => {
      q.profile = ge;
    } }, metadata: U }, n, c), At(O, null, v, { kind: "accessor", name: "author", static: !1, private: !1, access: { has: (q) => "author" in q, get: (q) => q.author, set: (q, ge) => {
      q.author = ge;
    } }, metadata: U }, u, l), At(O, null, r, { kind: "accessor", name: "avatar", static: !1, private: !1, access: { has: (q) => "avatar" in q, get: (q) => q.avatar, set: (q, ge) => {
      q.avatar = ge;
    } }, metadata: U }, _, p), At(O, null, f, { kind: "accessor", name: "modalId", static: !1, private: !1, access: { has: (q) => "modalId" in q, get: (q) => q.modalId, set: (q, ge) => {
      q.modalId = ge;
    } }, metadata: U }, d, o), At(O, null, h, { kind: "accessor", name: "modalTitle", static: !1, private: !1, access: { has: (q) => "modalTitle" in q, get: (q) => q.modalTitle, set: (q, ge) => {
      q.modalTitle = ge;
    } }, metadata: U }, F, K), At(O, null, M, { kind: "accessor", name: "submitForm", static: !1, private: !1, access: { has: (q) => "submitForm" in q, get: (q) => q.submitForm, set: (q, ge) => {
      q.submitForm = ge;
    } }, metadata: U }, C, I), At(O, null, E, { kind: "accessor", name: "closeForm", static: !1, private: !1, access: { has: (q) => "closeForm" in q, get: (q) => q.closeForm, set: (q, ge) => {
      q.closeForm = ge;
    } }, metadata: U }, V, H), At(O, null, te, { kind: "accessor", name: "lightTheme", static: !1, private: !1, access: { has: (q) => "lightTheme" in q, get: (q) => q.lightTheme, set: (q, ge) => {
      q.lightTheme = ge;
    } }, metadata: U }, _e, k), At(O, null, g, { kind: "accessor", name: "originalBodyOverflow", static: !1, private: !1, access: { has: (q) => "originalBodyOverflow" in q, get: (q) => q.originalBodyOverflow, set: (q, ge) => {
      q.originalBodyOverflow = ge;
    } }, metadata: U }, N, be), At(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: U }, null, a), e = t.value, U && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: U });
  })(), me(O, "styles", ke`
		@keyframes modal-pop {
			0% {
				opacity: 0;
			}
		}

		*,
		:before,
		:after {
			border-width: 0 !important;
		}

		/* This does positioning, sizing, and transition */
		.discord-modal {
			pointer-events: none;
			position: fixed;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			margin: 0;
			display: grid;
			height: 100%;
			width: 100%;
			max-height: none;
			max-width: none;
			justify-items: center;
			padding: 0;
			opacity: 0;
			overscroll-behavior: contain;
			z-index: 1002;
			background-color: transparent;
			color: inherit;
			transition-duration: 0.2s;
			transition-timing-function: ease;
			transition-property: all;
			overflow: hidden;
		}

		.discord-modal-open,
		.discord-modal:target,
		.discord-modal-toggle:checked + .discord-modal,
		.discord-modal[open] {
			pointer-events: auto;
			visibility: visible;
			opacity: 1;
		}

		:where(.discord-modal) {
			align-items: center;
		}

		.discord-modal-box {
			display: none;
			flex-direction: column;
			min-height: 0;
			max-width: 100%;
			background-color: oklab(0.321088 -0.000220731 -0.00934622);
			transform: translate(0, 0) rotate(0) skew(0) skewY(0) scaleX(0.9) scaleY(0.9);
			transition-property: all;
			transition-timing-function: ease;
			transition-duration: 0.2s;
			box-shadow: none;
			overflow-y: visible;
			border-radius: 4px;
		}

		.discord-modal-box:focus {
			outline: none;
			border: none;
		}

		.discord-modal-open .discord-modal-box,
		.discord-modal-toggle:checked + .discord-modal .discord-modal-box,
		.discord-modal:target .discord-modal-box,
		.discord-modal[open] .discord-modal-box {
			transform: translate(0, 0px) rotate(0) skew(0) skewY(0) scaleX(1) scaleY(1);
		}

		.discord-modal:not(dialog:not(.discord-modal-open)),
		.discord-modal::backdrop {
			background-color: rgba(0, 0, 0, 0.7);
			animation: modal-pop 0.2s ease-out;
		}

		.discord-modal-light-theme:not(dialog:not(.discord-modal-open)),
		.discord-modal-light-theme::backdrop {
			background-color: rgba(0, 0, 0, 0.54);
			backdrop-filter: blur(0px);
		}

		.discord-modal-root {
			background-color: oklab(0.321088 -0.000220731 -0.00934622);
			border-radius: 4px;
			display: flex;
			flex-direction: column;
			margin: 0 auto;
			pointer-events: all;
			position: relative;
			box-shadow:
				rgba(30, 31, 34, 0.6) 0px 0px 0px 1px,
				rgba(0, 0, 0, 0.2) 0px 2px 10px 0px;
			opacity: 1;
			transform: scale(1);
			width: 440px;
			max-height: 720px;
			min-height: 200px;
		}

		.discord-modal-content-container::-webkit-scrollbar {
			width: 5px;
			background-color: transparent;
		}

		.discord-modal-content-container::-webkit-scrollbar-track {
			background-color: transparent;
		}

		.discord-modal-content-container::-webkit-scrollbar-thumb {
			border-radius: 10px;
			background-color: rgba(0, 0, 0, 0.5);
		}

		.discord-modal-root-light-theme {
			box-shadow:
				0 0 0 1px hsl(210 calc(1 * 9.3%) 78.8% / 0.3),
				0 2px 10px 0 hsl(0 calc(1 * 0%) 0% / 0.1);
			background-color: color-mix(in oklab, hsl(0 calc(1 * 0%) 100% / 1) 100%, black 0%);
		}

		.discord-modal-header-container {
			flex: 0 0 auto;
			border-radius: 4px 4px 0 0;
			transition: box-shadow 0.1s ease-out;
			word-wrap: break-word;
			position: relative;
			padding: 16px;
			z-index: 1;
			overflow: hidden;
			flex-wrap: nowrap;
			justify-content: flex-start;
			align-items: center;
			flex-direction: row;
			display: flex;
		}

		.discord-modal-content-container {
			overflow: hidden auto;
			padding-right: 8px;
			position: relative;
			z-index: 0;
			border-radius: 5px 5px 0 0;
			padding-left: 16px;
			position: relative;
			z-index: 0;
			border-radius: 5px 5px 0 0;
			padding-left: 16px;
		}

		.discord-modal-actions-container {
			flex: 0 0 auto;
			box-shadow: inset 0 1px 0 hsl(220 calc(1 * 6.5%) 18% / 0.6);
			border-radius: 0 0 5px 5px;
			background-color: color-mix(in oklab, hsl(220 calc(1 * 6.5%) 18% / 1) 100%, black 0%);
			position: relative;
			padding: 16px;
			z-index: 1;
			overflow-x: hidden;
			flex-wrap: nowrap;
			justify-content: flex-start;
			align-items: center;
			flex-direction: row-reverse;
			display: flex;
		}

		.discord-modal-actions-container-light-theme {
			box-shadow: inset 0 1px 0 hsl(0 calc(1 * 0%) 97.6% / 0.6);
			background-color: color-mix(in oklab, hsl(220 calc(1 * 13%) 95.5% / 1) 100%, black 0%);
		}

		.discord-modal-avatar {
			margin-right: 0.5em;
			position: relative;
			min-width: 24px;
			width: 24px;
			height: 24px;
			border-radius: 50%;
		}

		.discord-modal-avatar img {
			width: 24px;
			height: 24px;
			border-radius: 50%;
		}

		.discord-modal-title {
			font-size: 24px;
			line-height: 30px;
			color: color-mix(in oklab, hsl(220 calc(1 * 13%) 95.5% / 1) 100%, black 0%);
		}

		.discord-modal-title-light-theme {
			color: color-mix(in oklab, hsl(240 calc(1 * 7.7%) 2.5% / 1) 100%, black 0%);
		}

		.discord-modal-close-button {
			position: absolute;
			top: 16px;
			right: 16px;
			height: 26px;
			padding: 4px;
			transition: opacity.2s ease-in-out;
			opacity: 0.5;
			cursor: pointer;
			border-radius: 3px;
			color: color-mix(in oklab, hsl(215 calc(1 * 8.8%) 73.3% / 1) 100%, black 0%);
			box-sizing: content-box;
			width: auto;
			background: transparent;
			border: 0;
			margin: 0;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 14px;
			font-weight: 500;
			line-height: 16px;
			-moz-user-select: none;
			user-select: none;
			outline: 0;
			font-family: 'gg sans', 'Noto Sans', Whitney, 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;
			text-rendering: optimizeLegibility;
		}

		.discord-modal-close-button-light-theme {
			color: color-mix(in oklab, hsl(228 calc(1 * 6%) 32.5% / 1) 100%, black 0%);
		}

		.discord-modal-close-button:hover {
			opacity: 1;
			color: oklab(0.899401 -0.00192499 -0.00481987);
		}

		.discord-modal-close-button-light-theme:hover {
			color: color-mix(in oklab, hsl(223 calc(1 * 6.7%) 20.6% / 1) 100%, black 0%);
		}

		.discord-modal-close-button-content {
			background-image: linear-gradient(
				to top,
				transparent,
				transparent 1px,
				transparent 1px,
				transparent calc(1px + 1px),
				transparent calc(1px + 1px)
			);
		}

		.discord-modal-warning-container {
			margin-bottom: 8px;
			background: color-mix(in oklab, hsl(40 calc(1 * 86.4%) 56.9% / 0.1) 100%, hsl(0 0% 0% / 0.1) 0%);
			border: 1px solid color-mix(in oklab, hsl(40 calc(1 * 86.4%) 56.9% / 1) 100%, black 0%);
			color: color-mix(in oklab, hsl(0 calc(1 * 0%) 100% / 1) 100%, black 0%);
			display: flex;
			border-radius: 4px;
			font-weight: 500;
			padding: 8px;
			width: 100%;
			box-sizing: border-box;
		}

		.discord-modal-warning-container-light-theme {
			background: color-mix(in oklab, hsl(38 calc(1 * 78.6%) 38.4% / 0.1) 100%, hsl(0 0% 0% / 0.1) 0%);
			border: color-mix(in oklab, hsl(38 calc(1 * 78.6%) 38.4% / 1) 100%, black 0%);
			color: color-mix(in oklab, hsl(0 calc(1 * 0%) 0% / 1) 100%, black 0%);
		}

		.discord-modal-warning-icon {
			display: flex;
		}

		.discord-modal-warning {
			color: color-mix(in oklab, hsl(210 calc(1 * 9.1%) 87.1% / 1) 100%, black 0%);
			margin-left: 10px;
			flex: 1;
			align-self: center;
			font-family: 'gg sans', 'Noto Sans', Whitney, 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;
			font-size: 14px;
			line-height: 1.2857142857142858;
			font-weight: 500;
		}

		.discord-modal-warning-light-theme {
			color: color-mix(in oklab, hsl(223 calc(1 * 6.7%) 20.6% / 1) 100%, black 0%);
		}

		.discord-modal-warning-icon-svg {
			fill: color-mix(in oklab, hsl(215 calc(1 * 8.8%) 73.3% / 1) 100%, black 0%);
			color: color-mix(in oklab, hsl(40 calc(1 * 86.4%) 56.9% / 1) 100%, black 0%);
			width: 24px;
			height: 24px;
			flex-shrink: 0;
		}

		.discord-modal-warning-icon-svg-light-theme {
			color: color-mix(in oklab, hsl(38 calc(1 * 78.6%) 38.4% / 1) 100%, black 0%);
			fill: none;
		}

		.discord-modal-warning-icon-svg-light-theme > path {
			fill: color-mix(in oklab, hsl(228 calc(1 * 6%) 32.5% / 1) 100%, black 0%);
		}

		.discord-modal-warning-author {
			font-weight: 600;
		}

		.discord-modal-button {
			align-items: center;
			background: none;
			border-radius: 3px;
			border: none;
			box-sizing: border-box;
			color: hsl(0 calc(1 * 0%) 100% / 1);
			display: flex;
			font-size: 14px;
			font-weight: 500;
			height: 38px;
			justify-content: center;
			line-height: 16px;
			min-height: 38px;
			min-width: 96px;
			padding: 2px 16px;
			position: relative;
			-moz-user-select: none;
			user-select: none;
			width: auto;
			cursor: pointer;
		}

		.discord-modal-button-submit {
			background-color: hsl(235 calc(1 * 85.6%) 64.7% / 1);
			transition:
				background-color 170ms ease,
				color 170ms ease;
		}

		.discord-modal-button-submit:hover {
			background-color: hsl(235 calc(1 * 51.4%) 52.4% / 1);
		}

		.discord-modal-button-submit:active {
			background-color: hsl(235 calc(1 * 46.7%) 44.1% / 1);
		}

		.discord-modal-button-cancel-light-theme {
			color: hsl(223 calc(1 * 5.8%) 52.9% / 1);
		}

		.discord-modal-button-cancel:hover > .discord-modal-button-content {
			--button--underline-color: hsl(0 calc(1 * 0%) 100% / 1);
		}

		.discord-modal-button-cancel-light-theme:hover > .discord-modal-button-content-light-theme {
			--button--underline-color: hsl(223 calc(1 * 5.8%) 52.9% / 1);
		}

		.discord-modal-button-content {
			--button--underline-color: transparent;
			margin: 0 auto;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			background-image: linear-gradient(
				to top,
				transparent,
				transparent 1px,
				var(--button--underline-color) 1px,
				var(--button--underline-color) calc(1px + 1px),
				transparent calc(1px + 1px)
			);
		}

		.discord-modal-slot-input-text {
			padding-right: 8px;
			padding-left: 20px;
			position: sticky;
			z-index: 3;
		}
	`), Qe(e, a), e;
})();
var ua = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
}, Ai = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
};
(() => {
  var r, _, p;
  let i = [Me("discord-ordered-list")], t, a = [], e, s = we, m, n = [], c = [], v, u = [], l = [];
  return r = class extends s {
    constructor() {
      super(...arguments);
      y(this, _, Ai(this, n, 1));
      y(this, p, (Ai(this, c), Ai(this, u, 1)));
      Ai(this, l);
    }
    /**
     * The starting number for the ordered list.
     *
     * You can set this to start the list at a specific number
     *
     * @defaultValue 1
     */
    get start() {
      return b(this, _);
    }
    set start(o) {
      z(this, _, o);
    }
    get startLength() {
      return b(this, p);
    }
    set startLength(o) {
      z(this, p, o);
    }
    checkChildren() {
      if (!Array.from(this.children).every((h) => {
        const F = h.tagName.toLowerCase();
        return F === "discord-list-item" || F === "discord-unordered-list" || F === "discord-ordered-list";
      }))
        throw new Ft("All direct children inside of a <discord-ordered-list> components must be one of <discord-unordered-list>, <discord-ordered-list>, or <discord-list-item>.");
    }
    /**
     * Checks how many children of `<discord-list-item>` this component has and updates
     * the {@link DiscordOrderedList.startLength | startLength} state.
     */
    willUpdate() {
      const o = Array.from(this.children).filter((F) => F.tagName.toLowerCase() === "discord-list-item").length, h = this.start + o;
      this.startLength = h.toString().length;
    }
    render() {
      return this.checkChildren(), x`<ol start=${this.start} style="--totalCharacters:${this.startLength}">
			<slot></slot>
		</ol>`;
    }
  }, _ = new WeakMap(), p = new WeakMap(), e = r, (() => {
    const o = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    m = [w({ type: Number, reflect: !0 })], v = [ft()], ua(r, null, m, { kind: "accessor", name: "start", static: !1, private: !1, access: { has: (h) => "start" in h, get: (h) => h.start, set: (h, F) => {
      h.start = F;
    } }, metadata: o }, n, c), ua(r, null, v, { kind: "accessor", name: "startLength", static: !1, private: !1, access: { has: (h) => "startLength" in h, get: (h) => h.startLength, set: (h, F) => {
      h.startLength = F;
    } }, metadata: o }, u, l), ua(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: o }, null, a), e = t.value, o && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: o });
  })(), /**
   * @internal
   */
  me(r, "styles", ke`
		:host > ol {
			list-style-image: initial;
			list-style-type: decimal;
			list-style-position: outside;
			margin-bottom: 0px;
			margin-top: 4px;
			margin-right: 0px;
			margin-left: calc(0.4em + 0.6em * var(--totalCharacters));
			padding: 0px;
		}
	`), Ai(e, a), e;
})();
var Rt = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
}, Je = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
};
const $s = "multiple-answers", Ts = "ended", Cs = "voted", js = "show-votes";
(() => {
  var g, N, be, O, T, ee, ae, Z, A, se, ye;
  let i = [Me("discord-poll")], t, a = [], e, s = we, m, n = [], c = [], v, u = [], l = [], r, _ = [], p = [], f, d = [], o = [], h, F = [], K = [], M, C = [], I = [], E, V = [], H = [], te, _e = [], k = [];
  return g = class extends s {
    constructor() {
      super(...arguments);
      y(this, N, Je(this, n, void 0));
      y(this, be, (Je(this, c), Je(this, u, "24h")));
      y(this, O, (Je(this, l), Je(this, _, !1)));
      y(this, T, (Je(this, p), Je(this, d, !1)));
      y(this, ee, (Je(this, o), Je(this, F, !1)));
      y(this, ae, (Je(this, K), Je(this, C, !1)));
      y(this, Z, (Je(this, I), Je(this, V, !1)));
      y(this, A, (Je(this, H), Je(this, _e, !1)));
      y(this, se, (Je(this, k), !1));
      y(this, ye, 0);
    }
    get question() {
      return b(this, N);
    }
    set question(Y) {
      z(this, N, Y);
    }
    get timeEnd() {
      return b(this, be);
    }
    set timeEnd(Y) {
      z(this, be, Y);
    }
    get pollEnded() {
      return b(this, O);
    }
    set pollEnded(Y) {
      z(this, O, Y);
    }
    get multipleAnswers() {
      return b(this, T);
    }
    set multipleAnswers(Y) {
      z(this, T, Y);
    }
    get pollVoted() {
      return b(this, ee);
    }
    set pollVoted(Y) {
      z(this, ee, Y);
    }
    get showResults() {
      return b(this, ae);
    }
    set showResults(Y) {
      z(this, ae, Y);
    }
    /**
     * Whether to use compact mode or not.
     */
    get compactMode() {
      return b(this, Z);
    }
    set compactMode(Y) {
      z(this, Z, Y);
    }
    /**
     * Whether to use light theme or not.
     */
    get lightTheme() {
      return b(this, A);
    }
    set lightTheme(Y) {
      z(this, A, Y);
    }
    get selected() {
      return b(this, se);
    }
    set selected(Y) {
      z(this, se, Y);
    }
    get totVotes() {
      return b(this, ye);
    }
    set totVotes(Y) {
      z(this, ye, Y);
    }
    connectedCallback() {
      super.connectedCallback();
      const Y = this.parentElement?.querySelectorAll("discord-poll-answer");
      if (Y)
        for (let G = 0; G < Y?.length; G++)
          Y[G].attributes.getNamedItem("selected") && (this.selected = !0), this.totVotes += Y[G].attributes.getNamedItem("votes")?.nodeValue ? Number(Y[G].attributes.getNamedItem("votes")?.nodeValue) : 0;
    }
    render() {
      const Y = this.multipleAnswers ? "Select one or more answers" : "Select one answer";
      return x`<div>
			<h4 class="discord-poll-question">${this.question}</h4>
			<div class="discord-poll-select">${Y}</div>
			<div class="discord-poll-answers">
				<slot></slot>
			</div>
			<div class="discord-poll-footer">
				<div class="discord-poll-footer-votes-time">
					<span class="discord-poll-footer-hover">${this.totVotes} votes</span>
					<div class="discord-poll-footer-time">${this.pollEnded ? "Poll closed" : `${this.timeEnd} left`}</div>
				</div>
				${J(!this.pollEnded && !this.pollVoted && !this.showResults, () => x`<div class="discord-poll-result-vote">
							<div class="discord-poll-footer-hover discord-poll-color-show-results">Show results</div>
							<button
								type="button"
								class="${Le({ "discord-poll-button-vote": !0, "discord-poll-button-vote-disabled": !this.selected })}"
							>
								<div>Vote</div>
							</button>
						</div>`)}
				${J(!this.pollEnded && this.pollVoted || this.showResults, () => x`
						<button type="button" class="discord-poll-button-remove-vote">
							<div>${!this.pollEnded && this.pollVoted ? "Remove vote" : "Go back to vote"}</div>
						</button>
					`)}
			</div>
		</div> `;
    }
  }, N = new WeakMap(), be = new WeakMap(), O = new WeakMap(), T = new WeakMap(), ee = new WeakMap(), ae = new WeakMap(), Z = new WeakMap(), A = new WeakMap(), se = new WeakMap(), ye = new WeakMap(), e = g, (() => {
    const Y = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    m = [w({ type: String, attribute: "question", reflect: !0 })], v = [w({ type: String, attribute: "time-end", reflect: !0 })], r = [ci({ context: Ts }), w({ type: Boolean, attribute: "ended", reflect: !0 })], f = [ci({ context: $s }), w({ type: Boolean, reflect: !0, attribute: "multiple-answers" })], h = [ci({ context: Cs }), w({ type: Boolean, reflect: !0, attribute: "voted" })], M = [ci({ context: js }), w({ type: Boolean, reflect: !0, attribute: "show-results" })], E = [He({ context: Jt }), w({ type: Boolean, reflect: !0, attribute: "compact-mode" })], te = [He({ context: Oe }), w({ type: Boolean, reflect: !0, attribute: "light-theme" })], Rt(g, null, m, { kind: "accessor", name: "question", static: !1, private: !1, access: { has: (G) => "question" in G, get: (G) => G.question, set: (G, U) => {
      G.question = U;
    } }, metadata: Y }, n, c), Rt(g, null, v, { kind: "accessor", name: "timeEnd", static: !1, private: !1, access: { has: (G) => "timeEnd" in G, get: (G) => G.timeEnd, set: (G, U) => {
      G.timeEnd = U;
    } }, metadata: Y }, u, l), Rt(g, null, r, { kind: "accessor", name: "pollEnded", static: !1, private: !1, access: { has: (G) => "pollEnded" in G, get: (G) => G.pollEnded, set: (G, U) => {
      G.pollEnded = U;
    } }, metadata: Y }, _, p), Rt(g, null, f, { kind: "accessor", name: "multipleAnswers", static: !1, private: !1, access: { has: (G) => "multipleAnswers" in G, get: (G) => G.multipleAnswers, set: (G, U) => {
      G.multipleAnswers = U;
    } }, metadata: Y }, d, o), Rt(g, null, h, { kind: "accessor", name: "pollVoted", static: !1, private: !1, access: { has: (G) => "pollVoted" in G, get: (G) => G.pollVoted, set: (G, U) => {
      G.pollVoted = U;
    } }, metadata: Y }, F, K), Rt(g, null, M, { kind: "accessor", name: "showResults", static: !1, private: !1, access: { has: (G) => "showResults" in G, get: (G) => G.showResults, set: (G, U) => {
      G.showResults = U;
    } }, metadata: Y }, C, I), Rt(g, null, E, { kind: "accessor", name: "compactMode", static: !1, private: !1, access: { has: (G) => "compactMode" in G, get: (G) => G.compactMode, set: (G, U) => {
      G.compactMode = U;
    } }, metadata: Y }, V, H), Rt(g, null, te, { kind: "accessor", name: "lightTheme", static: !1, private: !1, access: { has: (G) => "lightTheme" in G, get: (G) => G.lightTheme, set: (G, U) => {
      G.lightTheme = U;
    } }, metadata: Y }, _e, k), Rt(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: Y }, null, a), e = t.value, Y && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: Y });
  })(), /**
   * @internal
   */
  me(g, "styles", ke`
		:host {
			display: flex;
			flex-direction: column;
			background-color: color-mix(in oklab, hsl(220 calc(1 * 6.5%) 18% / 1) 100%, black 0%);
			border-radius: 8px;
			padding: 16px;
			width: 100%;
			max-width: 472px;
			min-width: 302px;
			box-sizing: border-box;
			position: relative;
			overflow: hidden;
		}

		:host([light-theme]) {
			border: 1px solid color-mix(in oklab, hsl(0 calc(1 * 0%) 0% / 0.08) 100%, hsl(0 0% 0% / 0.08) 0%);
			background-color: color-mix(in oklab, hsl(0 calc(1 * 0%) 100% / 1) 100%, black 0%) !important;
		}

		:host([light-theme]) * {
			color: black;
		}

		.discord-poll-question {
			color: color-mix(in oklab, hsl(210 calc(1 * 9.1%) 87.1% / 1) 100%, black 0%);
			margin: 0;
			font-size: 1rem;
			word-break: break-word;
			line-height: 1.25;
			font-weight: 500;
		}

		.discord-poll-select {
			font-size: 0.875rem;
			grid-area: prompt;
			color: color-mix(in oklab, hsl(214 calc(1 * 8.1%) 61.2% / 1) 100%, black 0%) !important;
		}

		.discord-poll-answers {
			display: grid;
			grid-template-columns: 1fr;
			grid-auto-rows: 1fr;
			grid-gap: 8px;
			gap: 8px;
			margin: 8px 0 16px;
		}

		.discord-poll-footer {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.discord-poll-footer-votes-time {
			display: flex;
			align-items: center;
			color: color-mix(in oklab, hsl(214 calc(1 * 8.1%) 61.2% / 1) 100%, black 0%);
			font-size: 0.875rem;
			line-height: 1.2857142857142858;
			font-weight: 400;
		}

		.discord-poll-footer-time::before {
			content: '∙';
			margin: 0px 0.5rem;
			font-weight: 800;
		}

		.discord-poll-footer-time {
			display: flex;
			align-items: center;
		}

		.discord-poll-footer-hover:hover {
			color: #fff;
			text-decoration: underline;
			cursor: pointer;
		}

		:host([light-theme]) .discord-poll-footer-hover:hover {
			color: black;
			text-decoration: underline;
			cursor: pointer;
		}

		:host([light-theme]) .discord-poll-color-show-results {
			color: black !important;
		}

		.discord-poll-color-show-results {
			color: #fff !important;
			font-size: 0.875rem;
			font-weight: 600;
		}

		.discord-poll-result-vote {
			display: flex;
			align-items: center;
			gap: 15px;
		}

		:host .discord-poll-button-vote {
			cursor: pointer;
			background-color: hsl(235 calc(1 * 85.6%) 64.7% / 1) !important;
			color: hsl(0 calc(1 * 0%) 100% / 1) !important;
			padding: 9px 16px;
			border: none;
			border-radius: 3px;
			font-weight: 600;
		}

		:host .discord-poll-button-remove-vote {
			cursor: pointer;
			background-color: color-mix(in oklab, hsl(228 calc(1 * 6.7%) 14.7% / 1) 100%, black 0%) !important;
			color: color-mix(in oklab, hsl(210 calc(1 * 9.1%) 87.1% / 1) 100%, black 0%) !important;
			padding: 9px 16px;
			border: none;
			border-radius: 3px;
			font-weight: 600;
		}

		:host([light-theme]) button * {
			color: white !important;
		}

		:host .discord-poll-button-vote-disabled {
			cursor: no-drop;
			opacity: 0.5;
		}
	`), Je(e, a), e;
})();
var Ue = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
}, kt = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
};
(() => {
  var A, se, ye, he, P, Y, G, U, q, ge, je, R, j, ie, De;
  let i = [Me("discord-poll-answer")], t, a = [], e, s = we, m = [], n, c = [], v = [], u, l = [], r = [], _, p = [], f = [], d, o = [], h = [], F, K = [], M = [], C, I = [], E = [], V, H = [], te = [], _e, k = [], g = [], N, be = [], O = [], T, ee = [], ae = [], Z;
  return A = class extends s {
    constructor() {
      super(...arguments);
      y(this, se, (Ue(this, m), Ue(this, c, void 0)));
      y(this, ye, (Ue(this, v), Ue(this, l, void 0)));
      y(this, he, (Ue(this, r), Ue(this, p, 0)));
      y(this, P, (Ue(this, f), Ue(this, o, !1)));
      y(this, Y, (Ue(this, h), Ue(this, K, !1)));
      y(this, G, (Ue(this, M), Ue(this, I, !1)));
      y(this, U, (Ue(this, E), Ue(this, H, !1)));
      y(this, q, (Ue(this, te), Ue(this, k, !1)));
      y(this, ge, (Ue(this, g), Ue(this, be, !1)));
      y(this, je, (Ue(this, O), Ue(this, ee, !1)));
      y(this, R, (Ue(this, ae), 0));
      y(this, j);
      y(this, ie, []);
      y(this, De, []);
    }
    get emoji() {
      return b(this, se);
    }
    set emoji(le) {
      z(this, se, le);
    }
    get answer() {
      return b(this, ye);
    }
    set answer(le) {
      z(this, ye, le);
    }
    get votes() {
      return b(this, he);
    }
    set votes(le) {
      z(this, he, le);
    }
    get selected() {
      return b(this, P);
    }
    set selected(le) {
      z(this, P, le);
    }
    /**
     * Whether to use compact mode or not.
     */
    get compactMode() {
      return b(this, Y);
    }
    set compactMode(le) {
      z(this, Y, le);
    }
    get multipleAnswers() {
      return b(this, G);
    }
    set multipleAnswers(le) {
      z(this, G, le);
    }
    get pollEnded() {
      return b(this, U);
    }
    set pollEnded(le) {
      z(this, U, le);
    }
    get pollVoted() {
      return b(this, q);
    }
    set pollVoted(le) {
      z(this, q, le);
    }
    get showResult() {
      return b(this, ge);
    }
    set showResult(le) {
      z(this, ge, le);
    }
    /**
     * Whether to use ligth theme or not.
     */
    get lightTheme() {
      return b(this, je);
    }
    set lightTheme(le) {
      z(this, je, le);
    }
    get totalVotesPoll() {
      return b(this, R);
    }
    set totalVotesPoll(le) {
      z(this, R, le);
    }
    get percentageVoted() {
      return b(this, j);
    }
    set percentageVoted(le) {
      z(this, j, le);
    }
    get arrayAnswers() {
      return b(this, ie);
    }
    set arrayAnswers(le) {
      z(this, ie, le);
    }
    get winners() {
      return b(this, De);
    }
    set winners(le) {
      z(this, De, le);
    }
    connectedCallback() {
      super.connectedCallback();
      const le = this.parentElement?.getElementsByTagName("discord-poll-answer");
      if (le)
        for (let W = 0; W < le?.length; W++) {
          const D = le[W].attributes.getNamedItem("votes") ? Number(le[W].attributes.getNamedItem("votes")?.nodeValue) : 0;
          this.arrayAnswers.push({ answer: le[W].attributes.getNamedItem("answer")?.nodeValue, value: D }), this.arrayAnswers = this.arrayAnswers.toSorted(($, ce) => ce.value - $.value), this.totalVotesPoll += D;
        }
      for (let W = 0; W < this.arrayAnswers?.length; W++)
        if (this.winners.includes(this.arrayAnswers[W].answer) || this.winners.push(this.arrayAnswers[W].answer), this.arrayAnswers[W + 1])
          if (this.arrayAnswers[W].value === this.arrayAnswers[W + 1].value)
            this.winners.includes(this.arrayAnswers[W + 1].answer) || this.winners.push(this.arrayAnswers[W + 1].answer);
          else
            break;
      if (this.parentElement?.getAttribute("multiple-answers") !== "") {
        let W = 0;
        if (le)
          for (const D of le)
            D.selected && W++;
        if (W > 1)
          throw new Ft("<discord-poll> single vote was selected more than 1 answer");
      }
      this.percentageVoted = this.votes / this.totalVotesPoll * 100;
    }
    render() {
      return this.percentageVoted = this.percentageVoted.toPrecision(3).split(".")[1] === "0" ? Number(this.percentageVoted.toPrecision(3).split(".")[0]) : Number(this.percentageVoted.toPrecision(3)), x`
			<label>
				<div class="${Le({ "discord-answer-container": !this.pollVoted && !this.pollEnded && !this.showResult })}">
					<div
						class="${Le({
        "discord-answer": !0,
        "discord-answer-selected": this.selected && !this.pollEnded && !this.showResult,
        "discord-answer-selected-ended": this.pollEnded && this.winners.includes(this.answer)
      })}"
					>
						<div
							class=${Le({
        "discord-answer-backdround-color": !0,
        "discord-background-color-selected": !this.pollEnded && this.selected && this.pollVoted,
        "discord-background-color-winner": this.pollEnded && this.winners.includes(this.answer),
        "discord-background-color-default": this.pollEnded && !this.winners.includes(this.answer) || !this.pollEnded && !this.selected && this.pollVoted || this.showResult
      })}
							style="width:${this.percentageVoted}%;"
						></div>
						<div class="discord-answer-flex">
							${J(this.emoji, () => x`<img class="discord-answer-emoji" src="${this.emoji}" alt="emoji" />`)}
							<div class="discord-awnswer-title">${this.answer}</div>
						</div>
						<div class="discord-answer-flex">
							${J(this.pollVoted || this.pollEnded || this.showResult, () => x`<h5 class="discord-answer-no-margin discord-quantity-votes">
										${this.votes} ${this.votes > 1 || this.votes === 0 ? "votes" : "vote"}
									</h5>`)}
							${J(this.pollVoted || this.pollEnded || this.showResult, () => x`<h4 class="discord-answer-no-margin discord-percentage-votes">${this.percentageVoted}%</h4>`)}
							${J(this.selected && !this.showResult, () => J(this.multipleAnswers, () => J(this.pollEnded, () => J(this.winners.includes(this.answer), () => x`<div class="discord-checkbox-div-answer-selected-ended-winner">
																${zt({ style: "width:24px;height:24px;" })}
															</div>`, () => x`<div class="discord-checkbox-div-answer-selected-ended-no-winner">
																${zt({ style: "width:24px;height:24px;" })}
															</div>`), () => J(!this.pollVoted, () => x`<div class="discord-checkbox-div-multiple-answer-selected">
																${zt({ style: "width:24px;height:24px;" })}
															</div>`, () => x`<div class="discord-checkbox-div-answer-selected-voted">
																${zt({ style: "width:24px;height:24px;" })}
															</div>`)), () => J(this.pollEnded, () => x`<div class="discord-checkbox-div-answer-selected-ended-winner">
														${zt({ style: "width:24px;height:24px;" })}
													</div>`, () => J(!this.pollVoted, () => x`
															<div class="discord-checkbox-div-answer">
																<div class="discord-checkbox-div-answer-selected"></div>
															</div>
														`, () => x`<div class="discord-checkbox-div-answer-selected-voted">
																${zt({ style: "width:24px;height:24px;" })}
															</div>`))), () => J(!this.pollEnded && !this.pollVoted && !this.showResult, () => x`<div
												class="${Le({
        "discord-checkbox-div-multiple-answer": this.multipleAnswers,
        "discord-checkbox-div-answer": !this.multipleAnswers
      })}"
											></div>`))}
						</div>
					</div>
					<span class="discord-answer-hidden"><input type="checkbox" @click=${() => this._onClick()} /></span>
				</div>
			</label>
		`;
    }
    _onClick() {
      if (this.pollEnded || this.pollVoted)
        return;
      const le = this.parentElement, W = le?.shadowRoot?.querySelector("button.discord-poll-button-vote"), D = le?.getElementsByTagName("discord-poll-answer");
      if (this.selected) {
        if (this.selected = !1, W) {
          if (le?.getAttribute("multiple-answers") === "") {
            let $ = 0;
            if (D)
              for (const ce of D)
                ce.selected && $++;
            if ($ > 0) {
              W.className = "discord-poll-button-vote";
              return;
            }
          }
          W.className = "discord-poll-button-vote discord-poll-button-vote-disabled";
        }
        return;
      }
      if (le?.getAttribute("multiple-answers") !== "" && D)
        for (const $ of D)
          $.selected = !1;
      W && (W.className = "discord-poll-button-vote"), this.selected = !0;
    }
  }, se = new WeakMap(), ye = new WeakMap(), he = new WeakMap(), P = new WeakMap(), Y = new WeakMap(), G = new WeakMap(), U = new WeakMap(), q = new WeakMap(), ge = new WeakMap(), je = new WeakMap(), R = new WeakMap(), j = new WeakMap(), ie = new WeakMap(), De = new WeakMap(), e = A, (() => {
    const le = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    n = [w({ type: String, attribute: "emoji", reflect: !0 })], u = [w({ type: String, attribute: "answer", reflect: !0 })], _ = [w({ type: Number, attribute: "votes", reflect: !0 })], d = [w({ type: Boolean, attribute: "selected", reflect: !0 })], F = [He({ context: Jt })], C = [He({ context: $s })], V = [He({ context: Ts })], _e = [He({ context: Cs })], N = [He({ context: js })], T = [He({ context: Oe }), w({ type: Boolean, reflect: !0, attribute: "light-theme" })], Z = [is({ once: !1, capture: !0, passive: !0 })], kt(A, null, n, { kind: "accessor", name: "emoji", static: !1, private: !1, access: { has: (W) => "emoji" in W, get: (W) => W.emoji, set: (W, D) => {
      W.emoji = D;
    } }, metadata: le }, c, v), kt(A, null, u, { kind: "accessor", name: "answer", static: !1, private: !1, access: { has: (W) => "answer" in W, get: (W) => W.answer, set: (W, D) => {
      W.answer = D;
    } }, metadata: le }, l, r), kt(A, null, _, { kind: "accessor", name: "votes", static: !1, private: !1, access: { has: (W) => "votes" in W, get: (W) => W.votes, set: (W, D) => {
      W.votes = D;
    } }, metadata: le }, p, f), kt(A, null, d, { kind: "accessor", name: "selected", static: !1, private: !1, access: { has: (W) => "selected" in W, get: (W) => W.selected, set: (W, D) => {
      W.selected = D;
    } }, metadata: le }, o, h), kt(A, null, F, { kind: "accessor", name: "compactMode", static: !1, private: !1, access: { has: (W) => "compactMode" in W, get: (W) => W.compactMode, set: (W, D) => {
      W.compactMode = D;
    } }, metadata: le }, K, M), kt(A, null, C, { kind: "accessor", name: "multipleAnswers", static: !1, private: !1, access: { has: (W) => "multipleAnswers" in W, get: (W) => W.multipleAnswers, set: (W, D) => {
      W.multipleAnswers = D;
    } }, metadata: le }, I, E), kt(A, null, V, { kind: "accessor", name: "pollEnded", static: !1, private: !1, access: { has: (W) => "pollEnded" in W, get: (W) => W.pollEnded, set: (W, D) => {
      W.pollEnded = D;
    } }, metadata: le }, H, te), kt(A, null, _e, { kind: "accessor", name: "pollVoted", static: !1, private: !1, access: { has: (W) => "pollVoted" in W, get: (W) => W.pollVoted, set: (W, D) => {
      W.pollVoted = D;
    } }, metadata: le }, k, g), kt(A, null, N, { kind: "accessor", name: "showResult", static: !1, private: !1, access: { has: (W) => "showResult" in W, get: (W) => W.showResult, set: (W, D) => {
      W.showResult = D;
    } }, metadata: le }, be, O), kt(A, null, T, { kind: "accessor", name: "lightTheme", static: !1, private: !1, access: { has: (W) => "lightTheme" in W, get: (W) => W.lightTheme, set: (W, D) => {
      W.lightTheme = D;
    } }, metadata: le }, ee, ae), kt(A, null, Z, { kind: "method", name: "_onClick", static: !1, private: !1, access: { has: (W) => "_onClick" in W, get: (W) => W._onClick }, metadata: le }, null, m), kt(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: le }, null, a), e = t.value, le && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: le });
  })(), /**
   * @internal
   */
  me(A, "styles", ke`
		.discord-answer-container {
			display: flex;
			cursor: pointer;
		}

		.discord-answer-emoji {
			width: 24px;
			height: 24px;
			margin-right: 2px;
			border-radius: 3px;
		}

		.discord-checkbox-div-multiple-answer {
			flex-shrink: 0;
			width: 20px;
			height: 20px;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 3px;
			background-color: transparent;
			border: 2px solid color-mix(in oklab, hsl(210 calc(1 * 9.1%) 87.1% / 1) 100%, black 0%);
		}

		.discord-checkbox-div-multiple-answer-selected {
			width: 20px;
			height: 20px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 3px;
			background-color: hsl(235 calc(1 * 85.6%) 64.7% / 1);
		}

		.discord-checkbox-div-answer-selected-ended-winner {
			width: 24px;
			height: 24px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 99px;
			background-color: seagreen;
		}

		.discord-checkbox-div-answer-selected-ended-no-winner {
			width: 24px;
			height: 24px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 99px;
			background-color: white;
			color: black !important;
		}

		.discord-checkbox-div-answer-selected-voted {
			width: 24px;
			height: 24px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 99px;
			background-color: hsl(235 calc(1 * 85.6%) 64.7% / 1);
		}

		.discord-checkbox-div-answer {
			flex-shrink: 0;
			width: 20px;
			height: 20px;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 99px;
			background-color: transparent;
			border: 2px solid color-mix(in oklab, hsl(210 calc(1 * 9.1%) 87.1% / 1) 100%, black 0%);
		}

		.discord-checkbox-div-answer-selected {
			margin: 2px;
			width: 10px;
			height: 10px;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 99px;
			border: 2px solid transparent;
			background-color: color-mix(in oklab, hsl(235 calc(1 * 86.1%) 77.5% / 1) 100%, black 0%);
		}

		.discord-answer-hidden {
			display: none;
		}

		.discord-answer-flex {
			display: flex;
			align-items: center;
			gap: 8px;
		}

		.discord-answer-selected {
			outline: 1px solid color-mix(in oklab, hsl(235 calc(1 * 86.1%) 77.5% / 1) 100%, black 0%) !important;
		}

		.discord-answer-selected-ended {
			outline: 1px solid hsl(145 calc(1 * 65%) 39.2% / 1) !important;
		}

		.discord-answer {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			min-height: 50px;
			padding: 8px 16px;
			box-sizing: border-box;
			background-color: color-mix(in oklab, hsl(228 calc(1 * 6%) 32.5% / 0.3) 100%, hsl(0 0% 0% / 0.3) 0%);
			border-radius: 8px;
			color: color-mix(in oklab, hsl(210 calc(1 * 9.1%) 87.1% / 1) 100%, black 0%);
			word-break: break-word;
			overflow: hidden;
			outline: 1px solid transparent;
			z-index: 1;
			transition:
				background-color 170ms ease,
				outline-color 170ms ease;
		}

		:host([light-theme]) .discord-answer {
			background-color: color-mix(in oklab, hsl(223 calc(1 * 5.8%) 52.9% / 0.08) 100%, hsl(0 0% 0% / 0.08) 0%) !important;
		}

		:host([light-theme]) .discord-background-color-default {
			background-color: color-mix(in oklab, hsl(223 calc(1 * 5.8%) 52.9% / 0.2) 100%, hsl(0 0% 0% / 0.2) 0%) !important;
		}

		:host([light-theme]) .discord-awnswer-title,
		:host([light-theme]) .discord-quantity-votes,
		:host([light-theme]) .discord-percentage-votes {
			color: color-mix(in oklab, hsl(223 calc(1 * 6.7%) 20.6% / 1) 100%, black 0%) !important;
		}

		:host([light-theme]) .discord-checkbox-div-answer,
		:host([light-theme]) .discord-checkbox-div-multiple-answer {
			border-color: color-mix(in oklab, hsl(223 calc(1 * 6.7%) 20.6% / 1) 100%, black 0%) !important;
		}

		:host([light-theme]) .discord-checkbox-div-answer-selected-ended-no-winner {
			background-color: color-mix(in oklab, hsl(223 calc(1 * 6.7%) 20.6% / 1) 100%, black 0%);
			color: white !important;
		}

		.discord-answer-no-margin {
			margin: 0;
		}

		.discord-quantity-votes:hover {
			cursor: pointer;
			text-decoration: underline;
		}

		.discord-answer-backdround-color {
			content: '';
			position: absolute;
			height: 100%;
			left: 0;
			z-index: -1;
		}

		.discord-background-color-winner {
			background-color: color-mix(in oklab, hsl(145 calc(1 * 65%) 39.2% / 0.2) 100%, hsl(0 0% 0% / 0.2) 0%);
		}

		.discord-background-color-default {
			background-color: color-mix(in oklab, hsl(228 calc(1 * 6%) 32.5% / 0.48) 100%, hsl(0 0% 0% / 0.48) 0%);
		}

		.discord-background-color-selected {
			background-color: color-mix(in oklab, hsl(235 calc(1 * 85.6%) 64.7% / 0.2) 100%, hsl(0 0% 0% / 0.2) 0%);
		}
	`), Ue(e, a), e;
})();
var qa = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
}, fa = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
};
(() => {
  var v, u;
  let i = [Me("discord-pre")], t, a = [], e, s = we, m, n = [], c = [];
  return v = class extends s {
    constructor() {
      super(...arguments);
      y(this, u, fa(this, n, !1));
      fa(this, c);
    }
    get embed() {
      return b(this, u);
    }
    set embed(_) {
      z(this, u, _);
    }
    render() {
      return x`<pre><slot></slot
		></pre>`;
    }
  }, u = new WeakMap(), e = v, (() => {
    const _ = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    m = [w({ type: Boolean, reflect: !0 })], qa(v, null, m, { kind: "accessor", name: "embed", static: !1, private: !1, access: { has: (p) => "embed" in p, get: (p) => p.embed, set: (p, f) => {
      p.embed = f;
    } }, metadata: _ }, n, c), qa(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: _ }, null, a), e = t.value, _ && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: _ });
  })(), /**
   * @internal
   */
  me(v, "styles", ke`
		:host pre {
			border-radius: 4px;
			padding: 0;
			font-size: 0.75rem;
			line-height: 1rem;
			margin-top: 6px;
			white-space: pre-wrap;
			background-clip: border-box;
			width: 90%;
			border: none;
		}

		:host([embed]) pre {
			margin: 0;
			margin-top: 6px;
			width: 100%;
		}
	`), fa(e, a), e;
})();
var Wa = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
}, pa = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
};
(() => {
  var v, u;
  let i = [Me("discord-quote")], t, a = [], e, s = we, m, n = [], c = [];
  return v = class extends s {
    constructor() {
      super(...arguments);
      y(this, u, pa(this, n, !1));
      pa(this, c);
    }
    get lightTheme() {
      return b(this, u);
    }
    set lightTheme(_) {
      z(this, u, _);
    }
    render() {
      return x`
			<div class="discord-quote-divider"></div>
			<!-- display: inline -->
			<blockquote><slot></slot></blockquote>
		`;
    }
  }, u = new WeakMap(), e = v, (() => {
    const _ = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    m = [He({ context: Oe, subscribe: !0 }), w({ type: Boolean, reflect: !0, attribute: "light-theme" })], Wa(v, null, m, { kind: "accessor", name: "lightTheme", static: !1, private: !1, access: { has: (p) => "lightTheme" in p, get: (p) => p.lightTheme, set: (p, f) => {
      p.lightTheme = f;
    } }, metadata: _ }, n, c), Wa(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: _ }, null, a), e = t.value, _ && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: _ });
  })(), /**
   * @internal
   */
  me(v, "styles", ke`
		:host {
			display: flex;
		}

		.discord-quote-divider {
			background-color: #4f545c;
			border-radius: 4px;
			font-size: 0.9em;
			font-style: normal;
			font-weight: 400;
			margin: 0;
			padding: 0;
			width: 4px;
		}

		:host([light-theme]) .discord-quote-divider {
			background-color: #c4c9ce;
		}

		blockquote {
			margin-block-end: unset;
			margin-block-start: unset;
			margin-inline-end: unset;
			margin-inline-start: unset;
			padding: 0 8px 0 12px;
		}
	`), pa(e, a), e;
})();
var ai = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
}, bt = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
};
(() => {
  var E, V, H, te, _e, k, g;
  let i = [Me("discord-reaction")], t, a = [], e, s = we, m, n = [], c = [], v, u = [], l = [], r, _ = [], p = [], f, d = [], o = [], h, F = [], K = [], M, C = [], I = [];
  return E = class extends s {
    constructor() {
      super(...arguments);
      y(this, V, bt(this, n, void 0));
      y(this, H, (bt(this, c), bt(this, u, ":emoji:")));
      y(this, te, (bt(this, l), bt(this, _, 1)));
      y(this, _e, (bt(this, p), bt(this, d, !1)));
      y(this, k, (bt(this, o), bt(this, F, !1)));
      y(this, g, (bt(this, K), bt(this, C, !1)));
      me(this, "handleReactionClick", (bt(this, I), (O) => {
        this.interactive && (O.shiftKey ? this.count-- : this.count++, this.count <= 0 && (this.count = 1));
      }));
    }
    /**
     * The reaction emoji image URL.
     */
    get emoji() {
      return b(this, V);
    }
    set emoji(O) {
      z(this, V, O);
    }
    /**
     * The name of the emoji to use as alternative image text.
     *
     * @defaultValue ':emoji'
     */
    get name() {
      return b(this, H);
    }
    set name(O) {
      z(this, H, O);
    }
    /**
     * The number of people who reacted.
     *
     * @defaultValue 1
     */
    get count() {
      return b(this, te);
    }
    set count(O) {
      z(this, te, O);
    }
    /**
     * Whether the reaction should show as reacted by the user.
     *
     * @defaultValue false
     */
    get reacted() {
      return b(this, _e);
    }
    set reacted(O) {
      z(this, _e, O);
    }
    /**
     * Whether the reaction should be reactive.
     *
     * @remarks When the reaction is interactive left clicking it will add 1 to the counter.
     * Whereas when holding the Shift key and left clicking it will decrease the counter.
     * The counter cannot go below 1.
     * @defaultValue false
     */
    get interactive() {
      return b(this, k);
    }
    set interactive(O) {
      z(this, k, O);
    }
    get lightTheme() {
      return b(this, g);
    }
    set lightTheme(O) {
      z(this, g, O);
    }
    render() {
      return x`<div class="discord-reaction-inner" @click=${this.handleReactionClick} @keydown=${this.handleReactionClick}>
			${J(this.emoji.includes("http") || this.emoji.startsWith("/") || this.emoji.startsWith("./"), () => x`<img src=${de(this.emoji)} alt=${de(this.name)} draggable="false" />`, () => x`<span>${this.emoji}</span>`)}
			<span class="discord-reaction-count">${this.count}</span>
		</div>`;
    }
  }, V = new WeakMap(), H = new WeakMap(), te = new WeakMap(), _e = new WeakMap(), k = new WeakMap(), g = new WeakMap(), e = E, (() => {
    const O = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    m = [w()], v = [w()], r = [w({ type: Number })], f = [w({ type: Boolean, reflect: !0 })], h = [w({ type: Boolean })], M = [He({ context: Oe }), w({ type: Boolean, reflect: !0, attribute: "light-theme" })], ai(E, null, m, { kind: "accessor", name: "emoji", static: !1, private: !1, access: { has: (T) => "emoji" in T, get: (T) => T.emoji, set: (T, ee) => {
      T.emoji = ee;
    } }, metadata: O }, n, c), ai(E, null, v, { kind: "accessor", name: "name", static: !1, private: !1, access: { has: (T) => "name" in T, get: (T) => T.name, set: (T, ee) => {
      T.name = ee;
    } }, metadata: O }, u, l), ai(E, null, r, { kind: "accessor", name: "count", static: !1, private: !1, access: { has: (T) => "count" in T, get: (T) => T.count, set: (T, ee) => {
      T.count = ee;
    } }, metadata: O }, _, p), ai(E, null, f, { kind: "accessor", name: "reacted", static: !1, private: !1, access: { has: (T) => "reacted" in T, get: (T) => T.reacted, set: (T, ee) => {
      T.reacted = ee;
    } }, metadata: O }, d, o), ai(E, null, h, { kind: "accessor", name: "interactive", static: !1, private: !1, access: { has: (T) => "interactive" in T, get: (T) => T.interactive, set: (T, ee) => {
      T.interactive = ee;
    } }, metadata: O }, F, K), ai(E, null, M, { kind: "accessor", name: "lightTheme", static: !1, private: !1, access: { has: (T) => "lightTheme" in T, get: (T) => T.lightTheme, set: (T, ee) => {
      T.lightTheme = ee;
    } }, metadata: O }, C, I), ai(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: O }, null, a), e = t.value, O && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: O });
  })(), /**
   * @internal
   */
  me(E, "styles", ke`
		:host > *:first-child {
			border-radius: 0.5rem;
			cursor: pointer;
			flex-shrink: 0;
			margin-right: 0.25rem;
			margin-bottom: 0.25rem;
			user-select: none;
			transition: none 0.1s ease;
			transition-property: background-color, border-color;
			background-color: #2f3136;
			border: 1px solid transparent;
		}

		:host([light-theme]) > *:first-child {
			background-color: #f2f3f5;
		}

		:host > *:first-child:hover {
			background-color: #36393f;
			border-color: #fff2;
		}

		:host([light-theme]:not([reacted])) > *:first-child:hover {
			background-color: white;
			border-color: #0003;
		}

		:host([reacted]) > *:first-child {
			background-color: rgba(88, 101, 242, 0.15);
			border-color: #5865f2;
		}

		:host([light-theme][reacted]) > *:first-child {
			background-color: #e7e9fd;
		}

		:host .discord-reaction-inner {
			display: flex;
			align-items: center;
			padding: 0.125rem 0.375rem;
		}

		:host img {
			width: 1rem;
			height: 1rem;
			margin: 0.125rem 0;
			min-width: auto;
			min-height: auto;
			object-fit: contain;
			vertical-align: bottom;
		}

		:host .discord-reaction-count {
			font-size: 0.875rem;
			font-weight: 500;
			margin-left: 0.375rem;
			text-align: center;
			color: #b9bbbe;
		}

		:host([light-theme]) .discord-reaction-count {
			color: #4f5660;
		}

		:host([reacted]) .discord-reaction-count {
			color: #dee0fc;
		}

		:host([light-theme][reacted]) .discord-reaction-count {
			color: #5865f2;
		}
	`), bt(e, a), e;
})();
var xl = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
}, kl = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
};
(() => {
  var m;
  let i = [Me("discord-reactions")], t, a = [], e, s = we;
  return m = class extends s {
    render() {
      return x`<slot></slot>`;
    }
  }, e = m, (() => {
    const c = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    xl(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: c }, null, a), e = t.value, c && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: c });
  })(), /**
   * @internal
   */
  me(m, "styles", ke`
		:host {
			display: flex;
			-webkit-box-flex: 1;
			-ms-flex: 1 0 auto;
			flex: 1 0 auto;
			align-items: center;
			flex-wrap: wrap;
		}
	`), kl(e, a), e;
})();
var va = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
}, Li = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
};
(() => {
  var r, _, p;
  let i = [Me("discord-spoiler")], t, a = [], e, s = we, m, n = [], c = [], v, u = [], l = [];
  return r = class extends s {
    constructor() {
      super(...arguments);
      y(this, _, Li(this, n, !1));
      y(this, p, (Li(this, c), Li(this, u, !1)));
      Li(this, l);
    }
    get activated() {
      return b(this, _);
    }
    set activated(o) {
      z(this, _, o);
    }
    /**
     * Whether to use light theme or not.
     */
    get lightTheme() {
      return b(this, p);
    }
    set lightTheme(o) {
      z(this, p, o);
    }
    render() {
      return x`<slot
			@click=${() => {
        this.activated = !0;
      }}
			@keydown=${() => {
        this.activated = !0;
      }}
		></slot>`;
    }
  }, _ = new WeakMap(), p = new WeakMap(), e = r, (() => {
    const o = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    m = [w({ type: Boolean, reflect: !0 })], v = [He({ context: Oe }), w({ type: Boolean, reflect: !0, attribute: "light-theme" })], va(r, null, m, { kind: "accessor", name: "activated", static: !1, private: !1, access: { has: (h) => "activated" in h, get: (h) => h.activated, set: (h, F) => {
      h.activated = F;
    } }, metadata: o }, n, c), va(r, null, v, { kind: "accessor", name: "lightTheme", static: !1, private: !1, access: { has: (h) => "lightTheme" in h, get: (h) => h.lightTheme, set: (h, F) => {
      h.lightTheme = F;
    } }, metadata: o }, u, l), va(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: o }, null, a), e = t.value, o && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: o });
  })(), /**
   * @internal
   */
  me(r, "styles", ke`
		:host {
			background-color: #202225;
			border-radius: 3px;
			color: transparent;
			cursor: pointer;
		}

		:host([light-theme]) {
			background-color: #c4c9ce;
		}

		:host(:hover) {
			background-color: rgba(32, 34, 37, 0.8);
		}

		:host([light-theme]:hover) {
			background-color: #cfd3d7;
		}

		:host([activated]) {
			color: inherit;
			background-color: hsla(0, 0%, 100%, 0.1);
		}

		:host([light-theme][activated]) {
			background-color: #e5e5e5;
		}
	`), Li(e, a), e;
})();
var Wt = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
}, Ni = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
};
(() => {
  var o, h, F, K;
  let i = [Me("discord-string-select-menu")], t, a = [], e, s = we, m = [], n, c = [], v = [], u, l = [], r = [], _, p = [], f = [], d;
  return o = class extends s {
    constructor() {
      super(...arguments);
      y(this, h, (Wt(this, m), Wt(this, c, void 0)));
      y(this, F, (Wt(this, v), Wt(this, l, "Make a selection")));
      y(this, K, (Wt(this, r), Wt(this, p, !1)));
      Wt(this, f);
    }
    /**
     * Whether to show the `discord-string-select-menu` as disabled.
     */
    get disabled() {
      return b(this, h);
    }
    set disabled(I) {
      z(this, h, I);
    }
    /**
     * The placeholder of the select-menu
     */
    get placeholder() {
      return b(this, F);
    }
    set placeholder(I) {
      z(this, F, I);
    }
    get lightTheme() {
      return b(this, K);
    }
    set lightTheme(I) {
      z(this, K, I);
    }
    render() {
      return x`
			<label
				class="${Le({
        "discord-string-select-menu-label": !0,
        "discord-string-select-menu": !0,
        "discord-string-select-menu-disabled": this.disabled
      })}"
			>
				<span>${this.placeholder}</span> ${ba({ class: "discord-expand-more-icon" })}
				<span class="discord-string-select-menu-hidden"><input type="checkbox" @click=${this._onClick} /></span>
			</label>
			<div class="discord-string-select-menu-option-slot discord-string-select-menu-hidden"><slot></slot></div>
		`;
    }
    _onClick() {
      const I = this.shadowRoot?.querySelectorAll("svg.discord-expand-more-icon").item(0), E = this.shadowRoot?.querySelectorAll("div.discord-string-select-menu-option-slot").item(0);
      this.shadowRoot?.querySelectorAll("label.discord-string-select-menu").item(0)?.className.includes("discord-string-select-menu-disabled") || (E?.className.includes("discord-string-select-menu-hidden") ? (E?.setAttribute("class", "discord-string-select-menu-option-slot"), I?.setAttribute("class", "discord-expand-more-icon discord-string-select-menu-rotated")) : (E?.setAttribute("class", "discord-string-select-menu-option-slot discord-string-select-menu-hidden"), I?.setAttribute("class", "discord-expand-more-icon")));
    }
  }, h = new WeakMap(), F = new WeakMap(), K = new WeakMap(), e = o, (() => {
    const I = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    n = [w({ type: Boolean, attribute: "disabled" })], u = [w({ attribute: "placeholder" })], _ = [He({ context: Oe }), w({ type: Boolean, reflect: !0, attribute: "light-theme" })], d = [is({ once: !1, capture: !0, passive: !0 })], Ni(o, null, n, { kind: "accessor", name: "disabled", static: !1, private: !1, access: { has: (E) => "disabled" in E, get: (E) => E.disabled, set: (E, V) => {
      E.disabled = V;
    } }, metadata: I }, c, v), Ni(o, null, u, { kind: "accessor", name: "placeholder", static: !1, private: !1, access: { has: (E) => "placeholder" in E, get: (E) => E.placeholder, set: (E, V) => {
      E.placeholder = V;
    } }, metadata: I }, l, r), Ni(o, null, _, { kind: "accessor", name: "lightTheme", static: !1, private: !1, access: { has: (E) => "lightTheme" in E, get: (E) => E.lightTheme, set: (E, V) => {
      E.lightTheme = V;
    } }, metadata: I }, p, f), Ni(o, null, d, { kind: "method", name: "_onClick", static: !1, private: !1, access: { has: (E) => "_onClick" in E, get: (E) => E._onClick }, metadata: I }, null, m), Ni(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: I }, null, a), e = t.value, I && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: I });
  })(), /**
   * @internal
   */
  me(o, "styles", ke`
		.discord-string-select-menu {
			height: 36px;
			min-height: 36px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;
			cursor: pointer;
			color: color-mix(in oklab, hsl(210 calc(1 * 9.1%) 87.1% / 1) 100%, black 0%);
			border: 1px solid;
			border-radius: 4px;
			background-color: color-mix(in oklab, hsl(225 calc(1 * 6.3%) 12.5% / 1) 100%, black 0%);
			border-color: color-mix(in oklab, hsl(225 calc(1 * 6.3%) 12.5% / 1) 100%, black 0%);
			padding: 8px !important;
			width: 90%;
			max-width: 400px;
			margin-right: 16px;
			transition: border 0.2s ease;
			font-weight: 500;
		}

		:host([light-theme]) .discord-string-select-menu {
			background-color: #ebebeb !important;
			border-color: #b5b5b5 !important;
			border: 1px solid;
			color: #2e3338;
		}

		:host([light-theme]) .discord-string-select-menu-option-slot {
			background-color: #ebebeb !important;
			border-color: #b5b5b5 !important;
			border: 1px solid;
			color: #2e3338;
		}

		.discord-string-select-menu-option-slot {
			overflow-y: auto;
			overflow-x: hidden;
			color: currentColor;
			border: none;
			border-top-left-radius: 0px;
			border-top-right-radius: 0px;
			border-color: color-mix(in oklab, hsl(225 calc(1 * 6.3%) 12.5% / 1) 100%, black 0%);
			background-color: color-mix(in oklab, hsl(220 calc(1 * 6.5%) 18% / 1) 100%, black 0%);
			cursor: pointer;
			box-sizing: border-box;
			border-radius: 4px;
			gap: 10px;
			display: block;
			max-height: 190px;
			position: absolute;
			width: 90%;
			max-width: 400px;
			z-index: 1002;
		}

		.discord-string-select-menu-option-slot::-webkit-scrollbar {
			width: 5px;
			background-color: transparent;
		}

		.discord-string-select-menu-option-slot::-webkit-scrollbar-track {
			background-color: transparent;
		}

		.discord-string-select-menu-option-slot::-webkit-scrollbar-thumb {
			border-radius: 10px;
			background-color: rgba(0, 0, 0, 0.3);
		}

		.discord-string-select-menu-label {
			width: 100%;
		}

		.discord-string-select-inside-menu {
			padding: 8px 8px 8px 12px;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.discord-string-select-menu-hidden {
			display: none;
		}

		.discord-string-select-menu-disabled {
			cursor: not-allowed !important;
			opacity: 0.5;
		}

		.discord-string-select-inside-menu:hover {
			border-color: black;
			cursor: pointer;
		}

		.discord-string-select-menu-rotated {
			transform: rotate(-180deg);
		}

		.discord-expand-more-icon {
			margin-left: auto;
		}
	`), Wt(e, a), e;
})();
var si = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
}, yt = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
};
(() => {
  var E, V, H, te, _e, k, g;
  let i = [Me("discord-string-select-menu-option")], t, a = [], e, s = we, m, n = [], c = [], v, u = [], l = [], r, _ = [], p = [], f, d = [], o = [], h, F = [], K = [], M, C = [], I = [];
  return E = class extends s {
    constructor() {
      super(...arguments);
      y(this, V, yt(this, n, void 0));
      y(this, H, (yt(this, c), yt(this, u, "emoji")));
      y(this, te, (yt(this, l), yt(this, _, void 0)));
      y(this, _e, (yt(this, p), yt(this, d, void 0)));
      y(this, k, (yt(this, o), yt(this, F, void 0)));
      y(this, g, (yt(this, K), yt(this, C, !1)));
      yt(this, I);
    }
    /**
     * The emoji URL to use in the SelectMenu.
     */
    get emoji() {
      return b(this, V);
    }
    set emoji(O) {
      z(this, V, O);
    }
    /**
     * The name of the emoji used in the SelectMenu.
     */
    get emojiName() {
      return b(this, H);
    }
    set emojiName(O) {
      z(this, H, O);
    }
    /**
     * The label of the option
     */
    get label() {
      return b(this, te);
    }
    set label(O) {
      z(this, te, O);
    }
    /**
     * The description of the option
     */
    get description() {
      return b(this, _e);
    }
    set description(O) {
      z(this, _e, O);
    }
    get selectOption() {
      return b(this, k);
    }
    set selectOption(O) {
      z(this, k, O);
    }
    checkLabelIsProvided() {
      if (!this.label)
        throw new Ft("The label of option is required");
    }
    get lightTheme() {
      return b(this, g);
    }
    set lightTheme(O) {
      z(this, g, O);
    }
    render() {
      return this.checkLabelIsProvided(), x`
			<label>
				${J(this.emoji, () => J(this.emoji.includes("http") || this.emoji.startsWith("/") || this.emoji.startsWith("./"), () => x`<img
								src=${this.emoji}
								alt=${de(this.emojiName)}
								draggable="true"
								class="discord-string-select-menu-option-emoji"
							/>`, () => x`<span class="discord-string-select-menu-option-emoji">${this.emoji}</span>`))}
				<div class="discord-string-select-menu-option-ellipsis-text">
					<div class="discord-string-select-menu-option-ellipsis-text">
						<strong>${this.label}</strong>
					</div>
					${J(this.description, () => x`<span>${this.description}</span>`)}
				</div>
				<span class="discord-string-select-menu-option-hidden"><input type="checkbox" @click=${() => this.selectOption?.()} /></span>
			</label>
		`;
    }
  }, V = new WeakMap(), H = new WeakMap(), te = new WeakMap(), _e = new WeakMap(), k = new WeakMap(), g = new WeakMap(), e = E, (() => {
    const O = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    m = [w({ reflect: !0, attribute: "emoji" })], v = [w({ reflect: !0, attribute: "emoji-name" })], r = [w({ attribute: "label" })], f = [w({ attribute: "description" })], h = [w({ reflect: !1, noAccessor: !0, attribute: !1 })], M = [He({ context: Oe }), w({ type: Boolean, reflect: !0, attribute: "light-theme" })], si(E, null, m, { kind: "accessor", name: "emoji", static: !1, private: !1, access: { has: (T) => "emoji" in T, get: (T) => T.emoji, set: (T, ee) => {
      T.emoji = ee;
    } }, metadata: O }, n, c), si(E, null, v, { kind: "accessor", name: "emojiName", static: !1, private: !1, access: { has: (T) => "emojiName" in T, get: (T) => T.emojiName, set: (T, ee) => {
      T.emojiName = ee;
    } }, metadata: O }, u, l), si(E, null, r, { kind: "accessor", name: "label", static: !1, private: !1, access: { has: (T) => "label" in T, get: (T) => T.label, set: (T, ee) => {
      T.label = ee;
    } }, metadata: O }, _, p), si(E, null, f, { kind: "accessor", name: "description", static: !1, private: !1, access: { has: (T) => "description" in T, get: (T) => T.description, set: (T, ee) => {
      T.description = ee;
    } }, metadata: O }, d, o), si(E, null, h, { kind: "accessor", name: "selectOption", static: !1, private: !1, access: { has: (T) => "selectOption" in T, get: (T) => T.selectOption, set: (T, ee) => {
      T.selectOption = ee;
    } }, metadata: O }, F, K), si(E, null, M, { kind: "accessor", name: "lightTheme", static: !1, private: !1, access: { has: (T) => "lightTheme" in T, get: (T) => T.lightTheme, set: (T, ee) => {
      T.lightTheme = ee;
    } }, metadata: O }, C, I), si(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: O }, null, a), e = t.value, O && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: O });
  })(), /**
   * @internal
   */
  me(E, "styles", ke`
		label {
			display: flex;
			align-items: center;
			max-width: 400px;
			padding: 8px 8px 8px 12px;
			gap: 10px;
			font-size: small;
			cursor: pointer;
		}

		label:hover {
			background-color: rgba(255, 255, 255, 0.1);
		}

		:host([light-theme]) {
			background-color: #f2f3f5 !important;
			border-color: #d9d9d9 !important;
			color: #2e3338;
		}

		:host([light-theme]) label:hover {
			background-color: rgba(204, 204, 204, 2) !important;
		}

		.discord-string-select-menu-option-emoji {
			margin-right: 4px;
			object-fit: contain;
			width: 1.375em;
			height: 1.375em;
			vertical-align: bottom;
		}

		.discord-string-select-menu-option-ellipsis-text {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.discord-string-select-menu-option-hidden {
			display: none;
		}
	`), yt(e, a), e;
})();
var Ya = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
}, ga = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
};
(() => {
  var v, u;
  let i = [Me("discord-subscript")], t, a = [], e, s = we, m, n = [], c = [];
  return v = class extends s {
    constructor() {
      super(...arguments);
      y(this, u, ga(this, n, !1));
      ga(this, c);
    }
    get lightTheme() {
      return b(this, u);
    }
    set lightTheme(_) {
      z(this, u, _);
    }
    render() {
      return x`
			<small>
				<span>
					<slot></slot>
				</span>
			</small>
		`;
    }
  }, u = new WeakMap(), e = v, (() => {
    const _ = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    m = [He({ context: Oe }), w({ type: Boolean, reflect: !0, attribute: "light-theme" })], Ya(v, null, m, { kind: "accessor", name: "lightTheme", static: !1, private: !1, access: { has: (p) => "lightTheme" in p, get: (p) => p.lightTheme, set: (p, f) => {
      p.lightTheme = f;
    } }, metadata: _ }, n, c), Ya(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: _ }, null, a), e = t.value, _ && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: _ });
  })(), /**
   * @internal
   */
  me(v, "styles", ke`
		small {
			display: block;
			color: color-mix(in oklab, hsl(214 calc(1 * 8.1%) 61.2% / 1) 100%, black 0%);
			font-size: 0.8125rem;
			line-height: 1.11719rem;
		}

		:host([light-theme]) > small {
			color: color-mix(in oklab, hsl(228 calc(1 * 5.2%) 38% / 1) 100%, black 0%);
		}
	`), ga(e, a), e;
})();
const Ml = pe`
	<path d="M4 0L0 4V8L4 12L8 8V4L4 0ZM7 7.59L4 10.59L1 7.59V4.41L4 1.41L7 4.41V7.59Z" fill="currentColor" />
	<path d="M2 4.83V7.17L4 9.17L6 7.17V4.83L4 2.83L2 4.83Z" fill="currentColor" />
`;
function $l(i = {}) {
  return x`<svg ${ve(i)} aria-hidden="false" width="24" height="24" viewBox="0 0 8 12">${Ml}</svg>`;
}
const Tl = pe`
	<path
		fill="#3ba55c"
		fill-rule="evenodd"
		d="M17.7163041 15.36645368c-.0190957.02699568-1.9039523 2.6680735-2.9957762 2.63320406-3.0676659-.09785935-6.6733809-3.07188394-9.15694343-5.548738C3.08002193 9.9740657.09772497 6.3791404 0 3.3061316v-.024746C0 2.2060575 2.61386252.3152347 2.64082114.2972376c.7110335-.4971705 1.4917101-.3149497 1.80959713.1372281.19320342.2744561 2.19712724 3.2811005 2.42290565 3.6489167.09884826.1608492.14714912.3554431.14714912.5702838 0 .2744561-.07975258.5770327-.23701117.8751101-.1527655.2902036-.65262318 1.1664385-.89862055 1.594995.2673396.3768148.94804468 1.26429792 2.351016 2.66357424 1.39173858 1.39027775 2.28923588 2.07641807 2.67002628 2.34187563.4302146-.2452108 1.3086162-.74238132 1.5972981-.89423205.5447887-.28682915 1.0907006-.31944893 1.4568885-.08661115.3459689.2182151 3.3383754 2.21027167 3.6225641 2.41611376.2695862.19234426.4144887.5399137.4144887.91672846 0 .2969525-.089862.61190215-.2808189.88523346"
	/>
`;
function Cl(i = {}) {
  return x`<svg ${ve(i)} aria-hidden="false" width="18" height="18" viewBox="0 0 18 18">${Tl}</svg>`;
}
const jl = pe`
	<g fill="none" fill-rule="evenodd">
		<path
			fill="#99AAB5"
			d="M0 14.25V18h3.75L14.81 6.94l-3.75-3.75L0 14.25zM17.71 4.04c.39-.39.39-1.02 0-1.41L15.37.29c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
		/>
		<path d="M0 0h18v18H0" />
	</g>
`;
function Hl(i = {}) {
  return x`<svg ${ve(i)} aria-hidden="false" width="18" height="18" viewBox="0 0 18 18">${jl}</svg>`;
}
const El = pe`
	<g fill="none" fill-rule="evenodd">
		<path d="M0 0h18v18H0z" />
		<path
			fill="#99AAB5"
			d="M3.2765961.00034226C6.344262.0982016 9.949977 3.0722262 12.43353953 5.54908026c2.48356254 2.47685405 5.4658595 6.07177934 5.56358447 9.14478814 0 1.1000741-2.61386252 2.9908969-2.64082114 3.008894-.7110335.4971705-1.4917101.3149497-1.80959713-.1372281-.19320342-.2744561-2.19712724-3.2811005-2.42290565-3.6489167-.09884826-.1608492-.14714912-.3554431-.14714912-.5702838 0-.2744561.07975258-.5770327.23701117-.8751101.1527655-.2902036.65262318-1.1664385.89862055-1.594995-.2673396-.3768148-.94804468-1.26429792-2.351016-2.66357424C8.3695281 6.8223767 7.4720308 6.1362364 7.0912404 5.87077883c-.4302146.2452108-1.3086162.74238132-1.5972981.89423205-.5447887.28682915-1.0907006.31944893-1.4568885.08661115C3.6910849 6.63340693.6986784 4.64135036.4144897 4.43550827.1449035 4.243164.000001 3.89559457.000001 3.5187798c0-.29695252.089862-.61190217.2808189-.88523348.0190957-.02699568 1.9039523-2.6680735 2.9957762-2.63320406z"
		/>
	</g>
`;
function Sl(i = {}) {
  return x`<svg ${ve(i)} aria-hidden="false" width="18" height="18" viewBox="0 0 18 18">${El}</svg>`;
}
const Vl = pe`
	<path
		d="m16.908 8.39684-8.29587-8.295827-1.18584 1.184157 1.18584 1.18584-4.14834 4.1475v.00167l-1.18583-1.18583-1.185 1.18583 3.55583 3.55502-4.740831 4.74 1.185001 1.185 4.74083-4.74 3.55581 3.555 1.185-1.185-1.185-1.185 4.1475-4.14836h.0009l1.185 1.185z"
		fill="#b9bbbe"
	/>
`;
function Dl(i = {}) {
  return x`<svg ${ve(i)} aria-hidden="false" width="18" height="18" viewBox="0 0 18 18">${Vl}</svg>`;
}
const Ol = pe`
	<path
		fill="#b9bbbe"
		fill-rule="evenodd"
		d="M1.575 9a2.25 2.25 0 0 0 0 3.18l.345.345c.128.128.323.15.488.075a2.25 2.25 0 0 1 3 3 .43.43 0 0 0 .06.48l.352.345a2.25 2.25 0 0 0 3.18 0l5.077-5.077a.75.75 0 0 1 1.02-1.02L16.425 9a2.25 2.25 0 0 0 0-3.18l-.345-.352a.42.42 0 0 0-.488-.06 2.25 2.25 0 0 1-3-3 .42.42 0 0 0-.068-.488l-.345-.345a2.25 2.25 0 0 0-3.18 0L7.671 2.903a.75.75 0 0 1-1.02 1.02zm7.508-4.725a.75.75 0 1 0-1.057 1.05l.517.525A.75.75 0 1 0 9.6 4.785l-.517-.525Zm2.063 2.063a.75.75 0 1 0-1.057 1.057l.517.525a.75.75 0 0 0 1.057-1.065l-.517-.525Zm2.063 2.063a.75.75 0 0 0-1.057 1.057l.517.525a.75.75 0 0 0 1.057-1.065l-.517-.525Z"
		clip-rule="evenodd"
	/>
`;
function Il(i = {}) {
  return x`<svg ${ve(i)} aria-hidden="false" width="18" height="18" viewBox="0 0 18 18">${Ol}</svg>`;
}
const Al = pe`
	<path
		d="M10 0C4.486 0 0 4.486 0 10C0 15.515 4.486 20 10 20C15.514 20 20 15.515 20 10C20 4.486 15.514 0 10 0ZM9 4H11V11H9V4ZM10 15.25C9.31 15.25 8.75 14.691 8.75 14C8.75 13.31 9.31 12.75 10 12.75C10.69 12.75 11.25 13.31 11.25 14C11.25 14.691 10.69 15.25 10 15.25Z"
		fill-rule="evenodd"
		clip-rule="evenodd"
		fill="currentColor"
	/>
`;
function Ll(i = {}) {
  return x`<svg ${ve(i)} aria-hidden="false" width="20" height="20" viewBox="0 0 20 20">${Al}</svg>`;
}
const Nl = pe`
	<path
		xmlns="http://www.w3.org/2000/svg"
		d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
		fill="#ed4245"
	/>
`;
function Pl(i = {}) {
  return x`<svg ${ve(i)} aria-hidden="false" width="20" height="20" viewBox="0 0 20 20">${Nl}</svg>`;
}
const Bl = pe`
	<path
		fill="currentColor"
		d="M5.43309 21C5.35842 21 5.30189 20.9325 5.31494 20.859L5.99991 17H2.14274C2.06819 17 2.01168 16.9327 2.02453 16.8593L2.33253 15.0993C2.34258 15.0419 2.39244 15 2.45074 15H6.34991L7.40991 9H3.55274C3.47819 9 3.42168 8.93274 3.43453 8.85931L3.74253 7.09931C3.75258 7.04189 3.80244 7 3.86074 7H7.75991L8.45234 3.09903C8.46251 3.04174 8.51231 3 8.57049 3H10.3267C10.4014 3 10.4579 3.06746 10.4449 3.14097L9.75991 7H15.7599L16.4523 3.09903C16.4625 3.04174 16.5123 3 16.5705 3H18.3267C18.4014 3 18.4579 3.06746 18.4449 3.14097L17.7599 7H21.6171C21.6916 7 21.7481 7.06725 21.7353 7.14069L21.4273 8.90069C21.4172 8.95811 21.3674 9 21.3091 9H17.4099L17.0495 11.04H15.05L15.4104 9H9.41035L8.35035 15H10.5599V17H7.99991L7.30749 20.901C7.29732 20.9583 7.24752 21 7.18934 21H5.43309Z"
	/>
	<path
		fill="currentColor"
		d="M13.4399 12.96C12.9097 12.96 12.4799 13.3898 12.4799 13.92V20.2213C12.4799 20.7515 12.9097 21.1813 13.4399 21.1813H14.3999C14.5325 21.1813 14.6399 21.2887 14.6399 21.4213V23.4597C14.6399 23.6677 14.8865 23.7773 15.0408 23.6378L17.4858 21.4289C17.6622 21.2695 17.8916 21.1813 18.1294 21.1813H22.5599C23.0901 21.1813 23.5199 20.7515 23.5199 20.2213V13.92C23.5199 13.3898 23.0901 12.96 22.5599 12.96H13.4399Z"
	/>
`;
function Rl(i = {}) {
  return x`<svg ${ve(i)} aria-hidden="false" width="24" height="24" viewBox="0 0 24 24">${Bl}</svg>`;
}
const Ul = pe`
	<g fill="none" fill-rule="evenodd">
		<path d="M18 0H0v18h18z" />
		<path fill="#3ba55c" d="M0 8h14.2l-3.6-3.6L12 3l6 6-6 6-1.4-1.4 3.6-3.6H0" />
	</g>
`;
function Fl(i = {}) {
  return x`<svg ${ve(i)} aria-hidden="false" width="18" height="18" viewBox="0 0 18 18">${Ul}</svg>`;
}
const Zl = pe`
	<g fill="none" fill-rule="evenodd" stroke="none" stroke-width="1">
		<path d="M18 0H0v18h18z" />
		<path fill="#ed4245" d="M3.8 8l3.6-3.6L6 3 0 9l6 6 1.4-1.4L3.8 10H18V8" />
	</g>
`;
function ql(i = {}) {
  return x`<svg ${ve(i)} aria-hidden="false" width="18" height="18" viewBox="0 0 18 18">${Zl}</svg>`;
}
var _i = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
}, Ot = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
};
(() => {
  var M, C, I, E, V, H;
  let i = [Me("discord-system-message")], t, a = [], e, s = we, m, n = [], c = [], v, u = [], l = [], r, _ = [], p = [], f, d = [], o = [], h, F = [], K = [];
  return M = class extends s {
    constructor() {
      super(...arguments);
      y(this, C, Ot(this, n, /* @__PURE__ */ new Date()));
      y(this, I, (Ot(this, c), Ot(this, u, "join")));
      y(this, E, (Ot(this, l), Ot(this, _, !1)));
      y(this, V, (Ot(this, p), Ot(this, d, !1)));
      y(this, H, (Ot(this, o), Ot(this, F, !1)));
      Ot(this, K);
    }
    /**
     * The timestamp to use for the message date.
     */
    get timestamp() {
      return b(this, C);
    }
    set timestamp(k) {
      z(this, C, k);
    }
    /**
     * The type of system message this is, this will change the icon shown.
     * Valid values: `join`, `leave`, `call`, `missed-call`, `boost`, `edit`, `thread`, `pin`, `alert`, `upgrade` and `error`.
     */
    get type() {
      return b(this, I);
    }
    set type(k) {
      z(this, I, k);
    }
    /**
     * Whether this message is to show channel name changes, used to match Discord's style.
     */
    get channelName() {
      return b(this, E);
    }
    set channelName(k) {
      z(this, E, k);
    }
    get hasThread() {
      return b(this, V);
    }
    set hasThread(k) {
      z(this, V, k);
    }
    get lightTheme() {
      return b(this, H);
    }
    set lightTheme(k) {
      z(this, H, k);
    }
    checkType() {
      if (typeof this.type != "string")
        throw new TypeError("DiscordSystemMessage `type` prop must be a string.");
      if (!["join", "leave", "call", "missed-call", "boost", "edit", "thread", "pin", "alert", "error", "upgrade"].includes(this.type))
        throw new RangeError("DiscordSystemMessage `type` prop must be one of: 'join', 'leave', 'call', 'missed-call', 'boost', 'edit', 'thread', 'pin', 'alert', 'upgrade', 'error'");
    }
    willUpdate() {
      this.hasThread = Array.from(this.children).some((k) => k.tagName.toLowerCase() === "discord-thread");
    }
    render() {
      return this.timestamp = Wi(this.timestamp), this.checkType(), x`<div class="discord-message-icon">
				${Ca(this.type, [
        ["join", () => Fl()],
        ["leave", () => ql()],
        ["call", () => Cl()],
        ["missed-call", () => Sl()],
        ["edit", () => Hl()],
        ["boost", () => $l()],
        ["thread", () => Rl()],
        ["pin", () => Dl()],
        ["alert", () => Ll()],
        // eslint-disable-next-line unicorn/throw-new-error
        ["error", () => Pl()],
        ["upgrade", () => Il()]
      ])}
			</div>
			<div class="discord-message-content">
				<span>
					<slot></slot>
					<span class="discord-message-timestamp">${this.timestamp}</span>
				</span>
				<slot name="reactions"></slot>
				<slot name="thread"></slot>
			</div>`;
    }
  }, C = new WeakMap(), I = new WeakMap(), E = new WeakMap(), V = new WeakMap(), H = new WeakMap(), e = M, (() => {
    const k = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    m = [w({ type: String })], v = [w({ reflect: !0, attribute: "type" })], r = [w({ type: Boolean, reflect: !0, attribute: "channel-name" })], f = [w({ type: Boolean, reflect: !0, attribute: "has-thread" })], h = [He({ context: Oe }), w({ type: Boolean, reflect: !0, attribute: "light-theme" })], _i(M, null, m, { kind: "accessor", name: "timestamp", static: !1, private: !1, access: { has: (g) => "timestamp" in g, get: (g) => g.timestamp, set: (g, N) => {
      g.timestamp = N;
    } }, metadata: k }, n, c), _i(M, null, v, { kind: "accessor", name: "type", static: !1, private: !1, access: { has: (g) => "type" in g, get: (g) => g.type, set: (g, N) => {
      g.type = N;
    } }, metadata: k }, u, l), _i(M, null, r, { kind: "accessor", name: "channelName", static: !1, private: !1, access: { has: (g) => "channelName" in g, get: (g) => g.channelName, set: (g, N) => {
      g.channelName = N;
    } }, metadata: k }, _, p), _i(M, null, f, { kind: "accessor", name: "hasThread", static: !1, private: !1, access: { has: (g) => "hasThread" in g, get: (g) => g.hasThread, set: (g, N) => {
      g.hasThread = N;
    } }, metadata: k }, d, o), _i(M, null, h, { kind: "accessor", name: "lightTheme", static: !1, private: !1, access: { has: (g) => "lightTheme" in g, get: (g) => g.lightTheme, set: (g, N) => {
      g.lightTheme = N;
    } }, metadata: k }, F, K), _i(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: k }, null, a), e = t.value, k && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: k });
  })(), /**
   * @internal
   */
  me(M, "styles", ke`
		:host {
			color: #8e9297;
			display: flex;
			font-weight: 400;
			font-size: 1rem;
			font-family: 'gg sans', 'Noto Sans', Whitney, 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif;
			padding: 0px 1em;

			position: relative;
			word-wrap: break-word;
			-webkit-user-select: text;
			-moz-user-select: text;
			-ms-user-select: text;
			user-select: text;
			-webkit-box-flex: 0;
			-ms-flex: 0 0 auto;
			flex: 0 0 auto;
			padding-right: 0;
			min-height: 1.375rem;
			padding-right: 48px !important;
			margin-top: 1.0625rem;
		}

		:host([light-theme]) {
			color: #2e3338;
			border-color: #eceeef;
		}

		:host([channel-name]) {
			color: #fff;
		}

		:host([light-theme][channel-name]) {
			color: #060607;
		}

		:host([type='boost']) svg {
			color: #ff73fa;
		}

		:host([type='alert']) svg {
			color: #faa81a;
		}

		:host([type='error']) svg {
			color: #faa81a;
		}

		:host .discord-message-icon {
			margin-right: 16px;
			margin-top: 5px;
			min-width: 40px;
			display: flex;
			align-items: flex-start;
			justify-content: center;
		}

		:host .discord-message-icon svg {
			width: 16px;
			height: 16px;
		}

		:host .discord-message-timestamp {
			color: #72767d;
			font-size: 12px;
			margin-left: 3px;
		}

		:host([light-theme]) .discord-message-timestamp {
			color: #747f8d;
		}

		:host .discord-message-content {
			width: 100%;
			line-height: 160%;
			font-weight: normal;
			padding-top: 2px;
			display: flex;
			flex-direction: column;
		}

		:host .discord-message-content ::slotted(i) {
			font-style: normal;
			cursor: pointer;
			color: white;
			font-weight: 500;
		}

		:host([light-theme]) .discord-message-content ::slotted(i) {
			color: #060607;
		}

		:host .discord-message-content ::slotted(i:hover) {
			text-decoration: underline;
		}

		:host(:hover) {
			background-color: rgba(4, 4, 5, 0.07);
		}

		:host([light-theme]:hover) {
			background-color: rgba(6, 6, 7, 0.02);
		}

		:host([has-thread]):after {
			width: 2rem;
			left: 2.2rem;
			top: 1.75rem;
			border-left: 2px solid #4f545c !important;
			border-bottom: 2px solid #4f545c !important;
			border-bottom-left-radius: 8px !important;
			bottom: 29px;
			content: '';
			position: absolute;
		}

		:host([light-theme][has-thread]):after {
			border-color: #747f8d !important;
		}
	`), Ot(e, a), e;
})();
var Ji = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
}, ri = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
};
(() => {
  var f, d, o, h;
  let i = [Me("discord-tenor-video")], t, a = [], e, s = we, m, n = [], c = [], v, u = [], l = [], r, _ = [], p = [];
  return f = class extends s {
    constructor() {
      super(...arguments);
      y(this, d, ri(this, n, void 0));
      y(this, o, (ri(this, c), ri(this, u, void 0)));
      y(this, h, (ri(this, l), ri(this, _, void 0)));
      ri(this, p);
    }
    /**
     * The URL for the video
     */
    get url() {
      return b(this, d);
    }
    set url(M) {
      z(this, d, M);
    }
    /**
     * The height of the video in pixels
     */
    get height() {
      return b(this, o);
    }
    set height(M) {
      z(this, o, M);
    }
    /**
     * The width of the video in pixels
     */
    get width() {
      return b(this, h);
    }
    set width(M) {
      z(this, h, M);
    }
    render() {
      return x`
			<div class="discord-tenor-video-wrapper" height=${de(this.height)} width=${de(this.width)}>
				<a target="_blank" class="discord-tenor-video-original-link" href=${de(this.url)}> </a>
				<video
					autoplay
					muted
					loop
					preload="auto"
					src=${de(this.url)}
					class="discord-tenor-video"
					height=${de(this.height)}
					width=${de(this.width)}
				></video>
				<div class="discord-tenor-video-image-accessory">
					<div class="discord-tenor-video-gif-tag"></div>
				</div>
			</div>
		`;
    }
  }, d = new WeakMap(), o = new WeakMap(), h = new WeakMap(), e = f, (() => {
    const M = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    m = [w()], v = [w({ type: Number })], r = [w({ type: Number })], Ji(f, null, m, { kind: "accessor", name: "url", static: !1, private: !1, access: { has: (C) => "url" in C, get: (C) => C.url, set: (C, I) => {
      C.url = I;
    } }, metadata: M }, n, c), Ji(f, null, v, { kind: "accessor", name: "height", static: !1, private: !1, access: { has: (C) => "height" in C, get: (C) => C.height, set: (C, I) => {
      C.height = I;
    } }, metadata: M }, u, l), Ji(f, null, r, { kind: "accessor", name: "width", static: !1, private: !1, access: { has: (C) => "width" in C, get: (C) => C.width, set: (C, I) => {
      C.width = I;
    } }, metadata: M }, _, p), Ji(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: M }, null, a), e = t.value, M && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: M });
  })(), /**
   * @internal
   */
  me(f, "styles", ke`
		:host {
			color: #dcddde;
			display: flex;
			font-size: 13px;
			line-height: 150%;
			margin-bottom: 8px;
			margin-top: 8px;
		}

		.discord-tenor-video-wrapper {
			max-width: 169px;
			width: 100%;
			cursor: pointer;
			display: block;
			position: relative;
			-webkit-user-select: text;
			-moz-user-select: text;
			user-select: text;
			overflow: hidden;
			border-radius: 3px;
		}

		.discord-tenor-video {
			-webkit-box-align: center;
			-webkit-box-pack: center;
			align-items: center;
			border-radius: 0;
			cursor: pointer;
			display: flex;
			height: 100%;
			justify-content: center;
			max-height: 100%;
			width: 100%;
			left: 0px;
			top: 0px;
		}

		.discord-tenor-video-original-link {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			z-index: 1;
		}

		.discord-tenor-video-image-accessory {
			position: absolute;
			top: 6px;
			left: 6px;
			z-index: 3;
		}

		.discord-tenor-video-gif-tag {
			background-image: url('data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjIyIiB2aWV3Qm94PSIwIDAgMjkgMjIiIHdpZHRoPSIyOSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGNsaXBQYXRoIGlkPSJhIj48cGF0aCBkPSJtMCAwaDI5djIyaC0yOXoiLz48L2NsaXBQYXRoPjxnIGNsaXAtcGF0aD0idXJsKCNhKSI+PHBhdGggZD0ibTI2IDBoLTIzYy0xLjY1Njg1IDAtMyAxLjM0MzE1LTMgM3YxNmMwIDEuNjU2OSAxLjM0MzE1IDMgMyAzaDIzYzEuNjU2OSAwIDMtMS4zNDMxIDMtM3YtMTZjMC0xLjY1Njg1LTEuMzQzMS0zLTMtM3oiIGZpbGw9IiMyMDIyMjUiIGZpbGwtb3BhY2l0eT0iLjgiLz48ZyBmaWxsPSIjZmZmIj48cGF0aCBkPSJtOC4wMTcyNSAxNi4yMDU0Yy0uODQxIDAtMS41ODUzNC0uMjE3NS0yLjIzMy0uNjUyNS0uNjQ3NjctLjQzNS0xLjE1MDM0LTEuMDQ0LTEuNTA4LTEuODI3LS4zNTc2Ny0uNzkyNi0uNTM2NS0xLjcwMTMtLjUzNjUtMi43MjYgMC0xLjAxNDk3LjE4ODUtMS45MTM5Ny41NjU1LTIuNjk2OTcuMzg2NjYtLjc4My45NDI1LTEuMzk2ODMgMS42Njc1LTEuODQxNS43MzQ2Ni0uNDQ0NjYgMS42MDk1LS42NjcgMi42MjQ1LS42NjcuODYwMzMgMCAxLjYyODg1LjE4MzY3IDIuMzA1NDUuNTUxLjY4NjQuMzY3MzQgMS4yMDM1Ljg4NDUgMS41NTE1IDEuNTUxNWwtMS42Mzg1IDEuMTc0NWMtLjQ5My0uOTA4NjYtMS4yMjc2Mi0xLjM2My0yLjIwMzk1LTEuMzYzLS44ODkzNCAwLTEuNTcwODQuMjktMi4wNDQ1Ljg3LS40NzM2Ny41NzAzNC0uNzEwNSAxLjM3NzUtLjcxMDUgMi40MjE0NyAwIDEuMDUzNy4yMzY4MyAxLjg2NTcuNzEwNSAyLjQzNi40NzM2Ni41NzA0IDEuMTU1MTYuODU1NSAyLjA0NDUuODU1NS4zOTYzMyAwIC43NTg4My0uMDcyNSAxLjA4NzUtLjIxNzUuMzM4MzUtLjE1NDYuNTk5MzUtLjM2MjUuNzgyOTUtLjYyMzV2LTEuMjQ3aC0yLjMwNTQ1di0xLjg4NWg0LjM2NDQ1djUuNjg0aC0xLjcxMWwtLjI3NTUtLjk1N2MtLjU3MDI5Ljc3MzQtMS40MTYxMiAxLjE2LTIuNTM3NDUgMS4xNnoiLz48cGF0aCBkPSJtMTYuNTQ0NCAxNi4wMDI0aC0yLjExN3YtMTAuMDA0OTdoMi4xMTd6Ii8+PHBhdGggZD0ibTIwLjY5MzMgMTYuMDAyNGgtMi4xMTd2LTEwLjAwNDk3aDYuNjg0NXYxLjkxNGgtNC41Njc1djIuMzc3OTdoMy43MTJ2MS45MTRoLTMuNzEyeiIvPjwvZz48L2c+PC9zdmc+');
			width: 29px;
			height: 22px;
		}
	`), ri(e, a), e;
})();
var Xi = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
}, oi = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
};
(() => {
  var f, d, o, h;
  let i = [Me("discord-thread")], t, a = [], e, s = we, m, n = [], c = [], v, u = [], l = [], r, _ = [], p = [];
  return f = class extends s {
    constructor() {
      super(...arguments);
      y(this, d, oi(this, n, "Thread"));
      y(this, o, (oi(this, c), oi(this, u, "See Thread")));
      y(this, h, (oi(this, l), oi(this, _, !1)));
      oi(this, p);
    }
    /**
     * The name of the thread.
     */
    get name() {
      return b(this, d);
    }
    set name(M) {
      z(this, d, M);
    }
    /**
     * The the text within the call to action text. (i.e. 'See Thread' or 'x Messages')
     */
    get cta() {
      return b(this, o);
    }
    set cta(M) {
      z(this, o, M);
    }
    get lightTheme() {
      return b(this, h);
    }
    set lightTheme(M) {
      z(this, h, M);
    }
    render() {
      return x`
			<div class="discord-thread-top">
				<span class="discord-thread-name">${this.name}</span>
				<span class="discord-thread-cta" aria-hidden="true"> ${this.cta} › </span>
			</div>
			<span class="discord-thread-bottom">
				<slot></slot>
			</span>
		`;
    }
  }, d = new WeakMap(), o = new WeakMap(), h = new WeakMap(), e = f, (() => {
    const M = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    m = [w()], v = [w()], r = [He({ context: Oe }), w({ type: Boolean, reflect: !0, attribute: "light-theme" })], Xi(f, null, m, { kind: "accessor", name: "name", static: !1, private: !1, access: { has: (C) => "name" in C, get: (C) => C.name, set: (C, I) => {
      C.name = I;
    } }, metadata: M }, n, c), Xi(f, null, v, { kind: "accessor", name: "cta", static: !1, private: !1, access: { has: (C) => "cta" in C, get: (C) => C.cta, set: (C, I) => {
      C.cta = I;
    } }, metadata: M }, u, l), Xi(f, null, r, { kind: "accessor", name: "lightTheme", static: !1, private: !1, access: { has: (C) => "lightTheme" in C, get: (C) => C.lightTheme, set: (C, I) => {
      C.lightTheme = I;
    } }, metadata: M }, _, p), Xi(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: M }, null, a), e = t.value, M && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: M });
  })(), /**
   * @internal
   */
  me(f, "styles", ke`
		:host {
			background-color: #2f3136;
			border-radius: 4px;
			cursor: pointer;
			margin-top: 8px;
			max-width: 480px;
			min-width: 0;
			padding: 8px;
			display: inline-flex;
			width: fit-content;
			flex-direction: column;
		}

		:host([light-theme]) {
			background-color: #f2f3f5;
		}

		:host .discord-thread-top {
			display: flex;
		}

		:host .discord-thread-bottom {
			font-size: 0.875rem;
			line-height: 1.125rem;
			align-items: center;
			color: #b9bbbe;
			display: flex;
			margin-top: 2px;
			white-space: nowrap;
		}

		:host([light-theme]) .discord-thread-bottom {
			color: #4f5660;
		}

		:host .discord-thread-name {
			font-size: 0.875rem;
			font-weight: 600;
			line-height: 1.125rem;
			color: white;
			margin-right: 8px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		:host([light-theme]) .discord-thread-name {
			color: #060607;
		}

		:host .discord-thread-cta {
			color: #00aff4;
			flex-shrink: 0;
			font-size: 0.875rem;
			font-weight: 600;
			line-height: 1.125rem;
		}

		:host .discord-thread-cta:hover {
			text-decoration: underline;
		}

		.discord-thread:hover .discord-thread-cta {
			text-decoration: underline;
		}
	`), oi(e, a), e;
})();
var It = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
}, We = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
};
(() => {
  var ae, Z, A, se, ye, he, P, Y, G, U, q;
  let i = [Me("discord-thread-message")], t, a = [], e, s = we, m, n = [], c = [], v, u = [], l = [], r, _ = [], p = [], f, d = [], o = [], h, F = [], K = [], M, C = [], I = [], E, V = [], H = [], te, _e = [], k = [], g, N = [], be = [], O, T = [], ee = [];
  return ae = class extends s {
    constructor() {
      super(...arguments);
      y(this, Z, We(this, n, void 0));
      y(this, A, (We(this, c), We(this, u, "User")));
      y(this, se, (We(this, l), We(this, _, void 0)));
      y(this, ye, (We(this, p), We(this, d, !1)));
      y(this, he, (We(this, o), We(this, F, !1)));
      y(this, P, (We(this, K), We(this, C, !1)));
      y(this, Y, (We(this, I), We(this, V, !1)));
      y(this, G, (We(this, H), We(this, _e, void 0)));
      y(this, U, (We(this, k), We(this, N, "1m ago")));
      y(this, q, (We(this, be), We(this, T, !1)));
      We(this, ee);
    }
    /**
     * The id of the profile data to use.
     */
    get profile() {
      return b(this, Z);
    }
    set profile(R) {
      z(this, Z, R);
    }
    /**
     * The message author's username.
     *
     * @defaultValue 'User'
     */
    get author() {
      return b(this, A);
    }
    set author(R) {
      z(this, A, R);
    }
    /**
     * The message author's avatar. Can be an avatar shortcut, relative path, or external link.
     */
    get avatar() {
      return b(this, se);
    }
    set avatar(R) {
      z(this, se, R);
    }
    /**
     * Whether the message author is a bot or not.
     * Only works if `server` is `false` or `undefined`.
     */
    get bot() {
      return b(this, ye);
    }
    set bot(R) {
      z(this, ye, R);
    }
    /**
     * Whether the message author is a server crosspost webhook or not.
     * Only works if `bot` is `false` or `undefined`.
     */
    get server() {
      return b(this, he);
    }
    set server(R) {
      z(this, he, R);
    }
    /**
     * Whether the bot is verified or not.
     * Only works if `bot` is `true`
     */
    get verified() {
      return b(this, P);
    }
    set verified(R) {
      z(this, P, R);
    }
    /**
     * Whether the message has been edited or not.
     */
    get edited() {
      return b(this, Y);
    }
    set edited(R) {
      z(this, Y, R);
    }
    /**
     * The message author's primary role color. Can be any [CSS color value](https://www.w3schools.com/cssref/css_colors_legal.asp).
     */
    get roleColor() {
      return b(this, G);
    }
    set roleColor(R) {
      z(this, G, R);
    }
    /**
     * The relative timestamp of the message.
     */
    get relativeTimestamp() {
      return b(this, U);
    }
    set relativeTimestamp(R) {
      z(this, U, R);
    }
    get lightTheme() {
      return b(this, q);
    }
    set lightTheme(R) {
      z(this, q, R);
    }
    resolveAvatar(R) {
      return wt[R] ?? R ?? wt.default;
    }
    render() {
      const R = { author: this.author, bot: this.bot, verified: this.verified, server: this.server, roleColor: this.roleColor }, j = Reflect.get(wi, this.profile) ?? {}, ie = { ...R, ...j, avatar: this.resolveAvatar(j.avatar ?? this.avatar) };
      return x`<img src=${de(ie.avatar)} class="discord-thread-message-avatar" alt=${de(ie.author)} />
			${J(ie.bot && !ie.server, () => x`<span class="discord-application-tag"> ${ie.verified ? zt() : null} App </span>`)}
			${J(ie.server && !ie.bot, () => x`<span class="discord-application-tag">Server</span>`)}
			<span class="discord-thread-message-username" style=${Ut({ color: ie.roleColor })}> ${ie.author} </span>
			<div class="discord-thread-message-content">
				<slot></slot>
				${J(this.edited, () => x`<span class="discord-message-edited">(edited)</span>`)}
			</div>
			<span class="discord-thread-message-timestamp">${this.relativeTimestamp}</span>`;
    }
  }, Z = new WeakMap(), A = new WeakMap(), se = new WeakMap(), ye = new WeakMap(), he = new WeakMap(), P = new WeakMap(), Y = new WeakMap(), G = new WeakMap(), U = new WeakMap(), q = new WeakMap(), e = ae, (() => {
    const R = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    m = [w()], v = [w()], r = [w()], f = [w({ type: Boolean })], h = [w({ type: Boolean })], M = [w({ type: Boolean })], E = [w({ type: Boolean })], te = [w({ attribute: "role-color" })], g = [w({ attribute: "relative-timestamp" })], O = [He({ context: Oe }), w({ type: Boolean, reflect: !0, attribute: "light-theme" })], It(ae, null, m, { kind: "accessor", name: "profile", static: !1, private: !1, access: { has: (j) => "profile" in j, get: (j) => j.profile, set: (j, ie) => {
      j.profile = ie;
    } }, metadata: R }, n, c), It(ae, null, v, { kind: "accessor", name: "author", static: !1, private: !1, access: { has: (j) => "author" in j, get: (j) => j.author, set: (j, ie) => {
      j.author = ie;
    } }, metadata: R }, u, l), It(ae, null, r, { kind: "accessor", name: "avatar", static: !1, private: !1, access: { has: (j) => "avatar" in j, get: (j) => j.avatar, set: (j, ie) => {
      j.avatar = ie;
    } }, metadata: R }, _, p), It(ae, null, f, { kind: "accessor", name: "bot", static: !1, private: !1, access: { has: (j) => "bot" in j, get: (j) => j.bot, set: (j, ie) => {
      j.bot = ie;
    } }, metadata: R }, d, o), It(ae, null, h, { kind: "accessor", name: "server", static: !1, private: !1, access: { has: (j) => "server" in j, get: (j) => j.server, set: (j, ie) => {
      j.server = ie;
    } }, metadata: R }, F, K), It(ae, null, M, { kind: "accessor", name: "verified", static: !1, private: !1, access: { has: (j) => "verified" in j, get: (j) => j.verified, set: (j, ie) => {
      j.verified = ie;
    } }, metadata: R }, C, I), It(ae, null, E, { kind: "accessor", name: "edited", static: !1, private: !1, access: { has: (j) => "edited" in j, get: (j) => j.edited, set: (j, ie) => {
      j.edited = ie;
    } }, metadata: R }, V, H), It(ae, null, te, { kind: "accessor", name: "roleColor", static: !1, private: !1, access: { has: (j) => "roleColor" in j, get: (j) => j.roleColor, set: (j, ie) => {
      j.roleColor = ie;
    } }, metadata: R }, _e, k), It(ae, null, g, { kind: "accessor", name: "relativeTimestamp", static: !1, private: !1, access: { has: (j) => "relativeTimestamp" in j, get: (j) => j.relativeTimestamp, set: (j, ie) => {
      j.relativeTimestamp = ie;
    } }, metadata: R }, N, be), It(ae, null, O, { kind: "accessor", name: "lightTheme", static: !1, private: !1, access: { has: (j) => "lightTheme" in j, get: (j) => j.lightTheme, set: (j, ie) => {
      j.lightTheme = ie;
    } }, metadata: R }, T, ee), It(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: R }, null, a), e = t.value, R && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: R });
  })(), /**
   * @internal
   */
  me(ae, "styles", ke`
		:host {
			height: 18px;
			min-width: 0;
			display: flex;
			align-items: center;
			font-size: 0.875rem;
			line-height: 1.125rem;
		}

		:host .discord-thread-message-avatar {
			margin-right: 8px;
			flex: 0 0 auto;
			width: 16px;
			height: 16px;
			border-radius: 50%;
			user-select: none;
		}

		:host .discord-thread-message-username {
			flex-shrink: 0;
			font-size: inherit;
			line-height: inherit;
			margin-right: 0.25rem;
			opacity: 0.64;
			color: white;
			display: inline;
			vertical-align: baseline;
			position: relative;
			overflow: hidden;
		}

		:host([light-theme]) .discord-thread-message-username {
			color: #060607;
		}

		:host .discord-application-tag {
			background-color: #5865f2;
			color: #fff;
			font-size: 0.65em;
			margin-right: 5px;
			border-radius: 3px;
			line-height: 100%;
			text-transform: uppercase;
			display: flex;
			align-items: center;
			height: 0.9375rem;
			padding: 0 0.275rem;
			margin-top: 0.075em;
			border-radius: 0.1875rem;
		}

		:host .discord-application-tag-verified {
			display: inline-block;
			width: 0.9375rem;
			height: 0.9375rem;
			margin-left: -0.25rem;
		}

		:host .discord-thread-message-content {
			display: flex;
			align-items: baseline;
		}

		:host .discord-message-edited {
			color: #72767d;
			font-size: 10px;
			margin-left: 5px;
		}

		:host .discord-thread-message-timestamp {
			color: #72767d;
			flex-shrink: 0;
			margin-left: 8px;
			font-size: 0.875rem;
			line-height: 1.125rem;
		}

		:host([light-theme]) .discord-thread-message-timestamp,
		:host([light-theme]) .discord-message-edited {
			color: #747f8d;
		}
	`), We(e, a), e;
})();
var Wl = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
}, Yl = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
};
(() => {
  var m;
  let i = [Me("discord-time")], t, a = [], e, s = we;
  return m = class extends s {
    render() {
      return x`<slot></slot>`;
    }
  }, e = m, (() => {
    const c = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    Wl(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: c }, null, a), e = t.value, c && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: c });
  })(), /**
   * @internal
   */
  me(m, "styles", ke`
		:host {
			white-space: nowrap;
			background-color: #ffffff0f;
			border-radius: 3px;
			padding: 0 2px;
		}
	`), Yl(e, a), e;
})();
var Ql = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
}, Gl = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
};
(() => {
  var m;
  let i = [Me("discord-underlined")], t, a = [], e, s = we;
  return m = class extends s {
    render() {
      return x`
			<u>
				<slot></slot>
			</u>
		`;
    }
  }, e = m, (() => {
    const c = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    Ql(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: c }, null, a), e = t.value, c && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: c }), Gl(e, a);
  })(), e;
})();
var Qa = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
}, _a = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
};
(() => {
  var v, u;
  let i = [Me("discord-unordered-list")], t, a = [], e, s = we, m, n = [], c = [];
  return v = class extends s {
    constructor() {
      super(...arguments);
      y(this, u, _a(this, n, !1));
      _a(this, c);
    }
    /**
     * Whether this is a nested list or not, this will change the style of the list-style.
     *
     * The library will try to guess this automatically based on the component tree, but
     * you can also set this manually.
     *
     * @defaultValue false
     */
    get nested() {
      return b(this, u);
    }
    set nested(_) {
      z(this, u, _);
    }
    checkChildren() {
      if (!Array.from(this.children).every((p) => {
        const f = p.tagName.toLowerCase();
        return f === "discord-list-item" || f === "discord-unordered-list" || f === "discord-ordered-list";
      }))
        throw new Ft("All direct children inside of a <discord-unordered-list> components must be one of <discord-unordered-list>, <discord-ordered-list>, or <discord-list-item>.");
    }
    /**
     * Sets {@link DiscordUnorderedList.nested | nested} to true if the parent is either
     * `<discord-unordered-list>` or `<discord-ordered-list>`.
     */
    willUpdate() {
      (this.parentElement?.tagName.toLowerCase() === "discord-unordered-list" || this.parentElement?.tagName.toLowerCase() === "discord-ordered-list") && (this.nested = !0);
    }
    render() {
      return this.checkChildren(), x`<ul>
			<slot></slot>
		</ul>`;
    }
  }, u = new WeakMap(), e = v, (() => {
    const _ = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    m = [w({ type: Boolean, reflect: !0 })], Qa(v, null, m, { kind: "accessor", name: "nested", static: !1, private: !1, access: { has: (p) => "nested" in p, get: (p) => p.nested, set: (p, f) => {
      p.nested = f;
    } }, metadata: _ }, n, c), Qa(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: _ }, null, a), e = t.value, _ && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: _ });
  })(), /**
   * @internal
   */
  me(v, "styles", ke`
		:host > ul {
			list-style-image: initial;
			list-style: disc;
			list-style-position: outside;
			margin: 4px 0 0 16px;
			padding: 0px;
		}

		:host([nested]) > ul {
			list-style: circle;
		}
	`), _a(e, a), e;
})();
const Jl = pe`
	<path fill="currentColor" d="M4 6c0-1.1.9-2 2-2h3a1 1 0 0 0 0-2H6a4 4 0 0 0-4 4v3a1 1 0 0 0 2 0V6ZM4 18c0 1.1.9 2 2 2h3a1 1 0 1 1 0 2H6a4 4 0 0 1-4-4v-3a1 1 0 1 1 2 0v3ZM18 4a2 2 0 0 1 2 2v3a1 1 0 1 0 2 0V6a4 4 0 0 0-4-4h-3a1 1 0 1 0 0 2h3ZM20 18a2 2 0 0 1-2 2h-3a1 1 0 1 0 0 2h3a4 4 0 0 0 4-4v-3a1 1 0 1 0-2 0v3Z"></path>
`;
function Xl(i = {}) {
  return x`<svg ${ve(i)} aria-hidden="true" role="img" width="24" height="24" fill="none" viewBox="0 0 24 24">${Jl}</svg>`;
}
const Kl = pe`
	<path fill="currentColor" d="M6 4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H6ZM15 4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-3Z"></path>
`;
function en(i = {}) {
  return x`<svg ${ve(i)} aria-hidden="true" role="img" width="16" height="16" fill="none" viewBox="0 0 24 24">${Kl}</svg>`;
}
var Ki = function(i, t, a, e, s, m) {
  function n(h) {
    if (h !== void 0 && typeof h != "function") throw new TypeError("Function expected");
    return h;
  }
  for (var c = e.kind, v = c === "getter" ? "get" : c === "setter" ? "set" : "value", u = !t && i ? e.static ? i : i.prototype : null, l = t || (u ? Object.getOwnPropertyDescriptor(u, e.name) : {}), r, _ = !1, p = a.length - 1; p >= 0; p--) {
    var f = {};
    for (var d in e) f[d] = d === "access" ? {} : e[d];
    for (var d in e.access) f.access[d] = e.access[d];
    f.addInitializer = function(h) {
      if (_) throw new TypeError("Cannot add initializers after decoration has completed");
      m.push(n(h || null));
    };
    var o = (0, a[p])(c === "accessor" ? { get: l.get, set: l.set } : l[v], f);
    if (c === "accessor") {
      if (o === void 0) continue;
      if (o === null || typeof o != "object") throw new TypeError("Object expected");
      (r = n(o.get)) && (l.get = r), (r = n(o.set)) && (l.set = r), (r = n(o.init)) && s.unshift(r);
    } else (r = n(o)) && (c === "field" ? s.unshift(r) : l[v] = r);
  }
  u && Object.defineProperty(u, e.name, l), _ = !0;
}, li = function(i, t, a) {
  for (var e = arguments.length > 2, s = 0; s < t.length; s++)
    a = e ? t[s].call(i, a) : t[s].call(i);
  return e ? a : void 0;
};
(() => {
  var f, d, o, h;
  let i = [Me("discord-video-attachment")], t, a = [], e, s = ls, m, n = [], c = [], v, u = [], l = [], r, _ = [], p = [];
  return f = class extends s {
    constructor() {
      super(...arguments);
      y(this, d, li(this, n, void 0));
      y(this, o, (li(this, c), li(this, u, void 0)));
      y(this, h, (li(this, l), li(this, _, !1)));
      me(this, "playPausePopAnimationContainerRef", (li(this, p), yi()));
    }
    /**
     * The URL to vidoe file
     *
     * @example
     * ```ts
     * 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm'
     * ```
     */
    get href() {
      return b(this, d);
    }
    set href(M) {
      z(this, d, M);
    }
    /**
     * A poster of the video, this is a static image of the video that is used as thumbnail when not yet having played the video
     *
     * @example
     * ```ts
     * 'https://favna.s-ul.eu/On2pqpAq.png'
     * ```
     */
    get poster() {
      return b(this, o);
    }
    set poster(M) {
      z(this, o, M);
    }
    get lightTheme() {
      return b(this, h);
    }
    set lightTheme(M) {
      z(this, h, M);
    }
    async handleFullScreenClicked() {
      this.mediaComponentRef.value && await this.mediaComponentRef.value.requestFullscreen();
    }
    handleHasStartedPlayingOrHasPaused() {
      this.playPausePopAnimationContainerRef.value && this.playPausePopAnimationContainerRef.value.classList.add("discord-video-attachment-overlay-content-hidden"), globalThis.setTimeout(() => {
        this.playPausePopAnimationContainerRef.value && this.playPausePopAnimationContainerRef.value.classList.remove("discord-video-attachment-overlay-content-hidden");
      }, 200);
    }
    render() {
      return x`<div class="discord-media-attachment-non-visual-media-item-container">
			<div class="discord-video-attachment-one-by-one-grid">
				<div class="discord-media-attachment-mosaic-item-media">
					<div class="discord-video-attachment-image-wrapper">
						<div class="discord-video-attachment-loading-overlay">
							<div
								class=${Le({
        "discord-video-attachment-wrapper": !0,
        "discord-video-attachment-wrapper-light-theme": this.lightTheme
      })}
							>
								<video
									${Lt(this.mediaComponentRef)}
									class="discord-video-attachment-video-container"
									playsinline
									height="315"
									preload="metadata"
									width="550"
									role="button"
									poster=${de(this.poster)}
									@play=${this.handleHasStartedPlayingOrHasPaused}
									@pause=${this.handleHasStartedPlayingOrHasPaused}
									@progress=${this.displayBufferedAmount}
									@click=${this.handleClickPlayPauseIcon}
									@ended=${this.handleEnded}
								>
									<source src=${de(this.href)} />
								</video>
								<div class="discord-video-attachment-video-controls">
									<div class="discord-media-attachment-controls" style="transform: translateY(0%)">
										<div
											class="discord-media-attachment-video-button"
											tabindex="0"
											aria-label="${this.isPlaying ? "Pause" : "Play"}"
											role="button"
											@click=${this.handleClickPlayPauseIcon}
											@keydown=${this.handleSpaceToPlayPause}
										>
											${J(this.hasEnded, () => _s({ class: "discord-media-attachment-control-icon" }), () => J(this.isPlaying, () => vs({ class: "discord-media-attachment-control-icon" }), () => gs({ class: "discord-media-attachment-control-icon" })))}
										</div>
										<div class="discord-media-attachment-duration-time-wrapper">
											<span role="status" class="discord-media-attachment-duration-time-display"
												>${this.currentPlaybackPosition}</span
											>
											<span
												role="separator"
												class="discord-media-attachment-duration-time-display discord-media-attachment-duration-time-separator"
												>/</span
											>
											<span class="discord-media-attachment-duration-time-display">${this.totalMediaDuration}</span>
										</div>
										<div class="discord-media-attachment-horizontal">
											<div class="discord-media-attachment-media-bar-interaction">
												<input
													type="range"
													${Lt(this.seekSliderRef)}
													class="discord-media-attachment-playback-control"
													@input=${this.handleSeekSliderInput}
													@change=${this.handleSeekSliderChange}
													max="100"
													value="0"
												/>
											</div>
										</div>
										<div class="discord-media-attachment-flex">
											<div class="discord-media-attachment-flex-container">
												<div ${Lt(this.volumeControlRef)} class="discord-media-attachment-button-slider">
													<div
														class="discord-media-attachment-volume-vertical"
														@mouseenter=${this.handleVolumeVerticalEnter}
														@mouseleave=${this.handleVolumeVerticalLeave}
													>
														<input
															${Lt(this.volumeControlInputRef)}
															type="range"
															class="discord-media-attachment-volume-slider"
															@input=${this.handleVolumeSliderInput}
															max="100"
															value="100"
														/>
													</div>
												</div>
												<button
													aria-label="Control volume"
													type="button"
													class="discord-media-attachment-button"
													@focus=${this.handleVolumeVerticalFocus}
													@blur=${this.handleVolumeVerticalBlur}
													@mouseover=${this.handleVolumeVerticalEnter}
													@mouseout=${this.handleVolumeVerticalLeave}
													@click=${this.handleClickMuteIcon}
												>
													<div class="discord-media-attachment-button-content">
														${J(this.currentVolume === 0 || this.isMuted, () => zs({
        class: "discord-media-attachment-button-control-icon"
      }), () => J(this.currentVolume <= 0.5, () => ys({
        class: "discord-media-attachment-button-control-icon"
      }), () => bs({
        class: "discord-media-attachment-button-control-icon"
      })))}
													</div>
												</button>
											</div>
										</div>
										<div>
											<button
												aria-label="Full screen"
												type="button"
												class="discord-media-attachment-button"
												@click=${this.handleFullScreenClicked}
											>
												<div class="discord-media-attachment-button-content">
													${Xl({ class: "discord-media-attachment-button-control-icon" })}
												</div>
											</button>
										</div>
									</div>
								</div>
								<div class="discord-video-attachment-play-pause-pop">
									${en({ class: "discord-video-attachment-play-pause-pop-icon" })}
								</div>
								<div ${Lt(this.playPausePopAnimationContainerRef)}></div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="discord-button-download-attachment">
				<a
					class="discord-link-download-attachment"
					aria-label="Download"
					href="${de(this.href)}"
					rel="noreferrer noopener"
					target="_blank"
					role="button"
					tabindex="0"
				>
					${$a()}
				</a>
			</div>
		</div>`;
    }
  }, d = new WeakMap(), o = new WeakMap(), h = new WeakMap(), e = f, (() => {
    const M = typeof Symbol == "function" && Symbol.metadata ? Object.create(s[Symbol.metadata] ?? null) : void 0;
    m = [w()], v = [w()], r = [He({ context: Oe, subscribe: !0 }), w({ type: Boolean, reflect: !0, attribute: "light-theme" })], Ki(f, null, m, { kind: "accessor", name: "href", static: !1, private: !1, access: { has: (C) => "href" in C, get: (C) => C.href, set: (C, I) => {
      C.href = I;
    } }, metadata: M }, n, c), Ki(f, null, v, { kind: "accessor", name: "poster", static: !1, private: !1, access: { has: (C) => "poster" in C, get: (C) => C.poster, set: (C, I) => {
      C.poster = I;
    } }, metadata: M }, u, l), Ki(f, null, r, { kind: "accessor", name: "lightTheme", static: !1, private: !1, access: { has: (C) => "lightTheme" in C, get: (C) => C.lightTheme, set: (C, I) => {
      C.lightTheme = I;
    } }, metadata: M }, _, p), Ki(null, t = { value: e }, i, { kind: "class", name: e.name, metadata: M }, null, a), e = t.value, M && Object.defineProperty(e, Symbol.metadata, { enumerable: !0, configurable: !0, writable: !0, value: M });
  })(), /**
   * @internal
   */
  me(f, "styles", [
    cs,
    ns,
    os,
    ke`
			:host {
				display: grid;
				height: -moz-fit-content;
				height: fit-content;
				grid-auto-flow: row;
				grid-row-gap: 0.25rem;
				grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
				text-indent: 0;
				min-height: 0;
				min-width: 0;
				padding-top: 0.125rem;
				padding-bottom: 0.125rem;
				position: relative;

				--seek-before-width: 0%;
				--buffered-width: 0%;
				--volume-slider-opacity: 0;
			}

			:host .discord-button-download-attachment {
				top: 5px !important;
				right: 8px !important;
			}

			.discord-video-attachment-one-by-one-grid {
				max-width: 100%;
				border-radius: 8px;
				overflow: hidden;
				display: inline-block;
				width: -moz-fit-content;
				width: fit-content;
				max-height: 350px;
			}

			.discord-media-attachment-mosaic-item-media {
				overflow: hidden;
				align-items: start;
				justify-self: auto !important;
			}

			.discord-video-attachment-image-wrapper {
				display: block;
				max-height: inherit;
				margin: auto;
				width: 550px;
				height: 100%;
				flex: auto;
				position: relative;
				-webkit-user-select: text;
				-moz-user-select: text;
				user-select: text;
				overflow: hidden;
				border-radius: 3px;
			}

			.discord-video-attachment-loading-overlay {
				aspect-ratio: 1.74603 / 1;
				width: 100%;
				height: 100%;
			}

			.discord-video-attachment-wrapper {
				height: 100%;
				width: 100%;
				max-height: inherit;
				position: relative;
				overflow: hidden;
				border-radius: 3px;
				color: hsl(0 calc(1 * 0%) 100% / 1);
				-webkit-user-select: none;
				-moz-user-select: none;
				user-select: none;
				background-color: hsl(225 calc(1 * 6.3%) 12.5% / 1);
			}

			.discord-video-attachment-wrapper-light-theme.discord-video-attachment-wrapper {
				background-color: hsl(0 calc(1 * 0%) 97.6% / 1);
			}

			.discord-video-attachment-video-container {
				width: 100%;
				height: 100%;
				max-height: inherit;
				object-fit: cover;
				position: relative;
				display: block;
				-o-object-fit: cover;
				border-radius: 3px;
			}

			.discord-video-attachment-video-container::-webkit-media-controls-enclosure {
				display: none !important;
			}

			.discord-video-attachment-video-controls {
				position: absolute;
				left: 0;
				right: 0;
				bottom: -10px;
				padding-bottom: 10px;
				width: 100%;
				display: flex;
				align-items: center;
				background-color: hsl(0 calc(1 * 0%) 0% / 0.6);
				height: 32px;
			}

			.discord-video-attachment-video-button {
				margin-right: 8px;
			}

			.discord-video-attachment-control-icon {
				display: block;
				width: 24px;
				height: 24px;
				padding: 4px;
				cursor: pointer;
				flex: 0 0 auto;
				opacity: 0.6;
			}

			.discord-video-attachment-duration-time-wrapper {
				flex: 0 0 auto;
				margin: 4px;
				height: 12px;
			}

			.discord-video-attachment-duration-time-display {
				font-weight: 500;
				display: inline-block;
				font-family: 'gg mono', 'Source Code Pro', Consolas, 'Andale Mono WT', 'Andale Mono', 'Lucida Console', 'Lucida Sans Typewriter',
					'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', 'Liberation Mono', 'Nimbus Mono L', Monaco, 'Courier New', Courier, monospace;
				font-size: 12px;
				line-height: 12px;
				vertical-align: text-top;
			}

			.discord-video-attachment-duration-time-separator {
				margin: 0 2px;
			}

			.discord-video-attachment-full-screen-button {
				cursor: pointer;
				margin-right: 8px;
				width: auto;
				background: transparent;
				color: currentColor;
				border: 0;
				padding: 0;
				margin: 0;
				position: relative;
				display: flex;
				justify-content: center;
				align-items: center;
				box-sizing: border-box;
				border-radius: 3px;
				font-size: 14px;
				font-weight: 500;
				line-height: 16px;
				-webkit-user-select: none;
				-moz-user-select: none;
				user-select: none;
			}

			.discord-video-attachment-play-pause-pop {
				opacity: 0;
				transform: scale(2.5) translateZ(0px);
				position: absolute;
				top: 50%;
				left: 50%;
				margin-left: -23px;
				margin-top: -23px;
				padding: 12px;
				width: 24px;
				height: 24px;
				background-color: hsl(0 calc(1 * 0%) 0% / 0.6);
				color: hsl(0 calc(1 * 0%) 100% / 1);
				border-radius: 50%;
				pointer-events: none;
			}

			.discord-video-attachment-play-pause-pop-icon {
				width: 24px;
				height: 24px;
				display: block;
			}

			.discord-video-attachment-horizontal {
				width: 100%;
				display: flex;
				align-self: stretch;
			}

			.discord-video-attachment-media-bar-interaction {
				position: relative;
				flex: 1 1 auto;
				align-self: stretch;
				display: flex;
				align-items: center;
				cursor: pointer;
				margin: 0 7px;
			}

			@keyframes playPausePopIconKeyframes {
				0% {
					opacity: 0;
				}
				100% {
					opacity: 0;
				}
			}

			.discord-video-attachment-overlay-content-hidden {
				animation: playPausePopIconKeyframes 0.2s ease-in-out infinite;
			}
		`
  ]), li(e, a), e;
})();
