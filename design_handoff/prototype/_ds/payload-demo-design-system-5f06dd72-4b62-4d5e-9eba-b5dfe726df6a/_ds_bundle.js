/* @ds-bundle: {"format":4,"namespace":"RootLevelDesignSystem_5f06dd","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"ProductCard","sourcePath":"components/core/ProductCard.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"Dialog","sourcePath":"components/overlay/Dialog.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"6c4ffe7f2091","components/core/Button.jsx":"5c92a5c66341","components/core/Card.jsx":"61a5eed37579","components/core/IconButton.jsx":"efc713f26e61","components/core/ProductCard.jsx":"a5c2ff0ae3ca","components/core/Tag.jsx":"30dde10b65e5","components/feedback/Toast.jsx":"d0a2001ad9cd","components/feedback/Tooltip.jsx":"d8cc6e8d71d1","components/forms/Checkbox.jsx":"46e8d98c6a4a","components/forms/Input.jsx":"4a995947523f","components/forms/Radio.jsx":"28de24db4c44","components/forms/Select.jsx":"98387d108b68","components/forms/Switch.jsx":"b89c4c0a6431","components/navigation/Tabs.jsx":"599410a9b1cd","components/overlay/Dialog.jsx":"f6edf8336206","ui_kits/website/Collection.jsx":"60fae0dca54f","ui_kits/website/Footer.jsx":"94b3c4ef6277","ui_kits/website/Header.jsx":"a9f9fac7a822","ui_kits/website/Home.jsx":"3521ccfc1fc4","ui_kits/website/PhotoPlaceholder.jsx":"e2937e903b35","ui_kits/website/ProductDetail.jsx":"6c895179c025","ui_kits/website/data.js":"d6942414e0b3"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.RootLevelDesignSystem_5f06dd = window.RootLevelDesignSystem_5f06dd || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function Badge({
  children,
  tone = 'brass'
}) {
  const toneStyle = tone === 'ink' ? {
    color: 'var(--color-ink)',
    border: '1px solid var(--color-ink)'
  } : {
    color: 'var(--color-brass)',
    border: '1px solid var(--color-brass)'
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      fontFamily: 'var(--font-sans)',
      fontSize: '10px',
      fontWeight: 600,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      padding: '3px 10px',
      borderRadius: 'var(--radius-pill)',
      ...toneStyle
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZE_PAD = {
  sm: 'var(--space-2) var(--space-4)',
  md: 'var(--padding-button-y) var(--padding-button-x)',
  lg: 'var(--space-4) var(--space-7)'
};
const SIZE_FONT = {
  sm: '12px',
  md: '13px',
  lg: '14px'
};
function variantStyle(variant) {
  switch (variant) {
    case 'secondary':
      return {
        background: 'transparent',
        color: 'var(--text-primary)',
        border: '1px solid var(--color-ink)'
      };
    case 'ghost':
      return {
        background: 'transparent',
        color: 'var(--text-primary)',
        border: '1px solid transparent'
      };
    case 'brass':
      return {
        background: 'var(--color-brass)',
        color: 'var(--color-bg)',
        border: '1px solid var(--color-brass)'
      };
    default:
      return {
        background: 'var(--color-ink)',
        color: 'var(--color-bg)',
        border: '1px solid var(--color-ink)'
      };
  }
}
function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  style,
  ...rest
}) {
  const base = variantStyle(variant);
  const [hover, setHover] = React.useState(false);
  const hoverStyle = (() => {
    if (disabled) return {};
    if (variant === 'primary') return hover ? {
      background: 'var(--color-espresso)',
      borderColor: 'var(--color-espresso)'
    } : {};
    if (variant === 'secondary') return hover ? {
      background: 'var(--color-ink)',
      color: 'var(--color-bg)'
    } : {};
    if (variant === 'ghost') return hover ? {
      color: 'var(--color-brass)'
    } : {};
    if (variant === 'brass') return hover ? {
      background: 'var(--color-brass-dark)',
      borderColor: 'var(--color-brass-dark)'
    } : {};
    return {};
  })();
  return /*#__PURE__*/React.createElement("button", _extends({
    onClick: disabled ? undefined : onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    disabled: disabled,
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: SIZE_FONT[size],
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      padding: SIZE_PAD[size],
      borderRadius: 'var(--radius-sm)',
      cursor: disabled ? 'default' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      transition: 'var(--transition-hover)',
      ...base,
      ...hoverStyle,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function Card({
  children,
  padded = true,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-md)',
      padding: padded ? 'var(--padding-card)' : 0,
      border: '1px solid transparent',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function IconButton({
  icon,
  label,
  size = 40,
  onClick,
  active = false,
  style
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    "aria-label": label,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: size,
      height: size,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'transparent',
      border: 'none',
      borderRadius: 'var(--radius-sm)',
      color: hover || active ? 'var(--color-brass)' : 'var(--color-ink)',
      cursor: 'pointer',
      transition: 'var(--transition-hover)',
      ...style
    }
  }, icon);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/ProductCard.jsx
try { (() => {
function ProductCard({
  image,
  name,
  dimensions,
  sku,
  price,
  isNew = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--color-surface)',
      aspectRatio: '1 / 1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 'var(--space-4)',
      position: 'relative'
    }
  }, isNew && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 'var(--space-3)',
      left: 'var(--space-3)',
      fontSize: '10px',
      fontWeight: 600,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--color-brass)',
      border: '1px solid var(--color-brass)',
      borderRadius: 'var(--radius-pill)',
      padding: '3px 10px'
    }
  }, "New"), image ? /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--color-border)',
      fontSize: 12,
      textTransform: 'uppercase',
      letterSpacing: '0.08em'
    }
  }, "Product image")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-serif-display)',
      fontSize: 17,
      color: 'var(--color-ink)',
      marginBottom: 4
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--color-text-secondary)',
      marginBottom: 2
    }
  }, dimensions), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--color-text-secondary)',
      letterSpacing: '0.04em'
    }
  }, "SKU ", sku), price && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--color-ink)',
      marginTop: 'var(--space-2)'
    }
  }, price));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ProductCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function Tag({
  children,
  selected = false,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: '12px',
      letterSpacing: '0.04em',
      padding: '8px 16px',
      borderRadius: 'var(--radius-pill)',
      border: `1px solid ${selected ? 'var(--color-ink)' : 'var(--color-border)'}`,
      background: selected ? 'var(--color-ink)' : 'transparent',
      color: selected ? 'var(--color-bg)' : 'var(--color-ink)',
      cursor: 'pointer',
      transition: 'var(--transition-hover)',
      borderColor: hover && !selected ? 'var(--color-brass)' : undefined
    }
  }, children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function Toast({
  message,
  tone = 'ink',
  onClose
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--space-5)',
      background: tone === 'ink' ? 'var(--color-espresso)' : 'var(--color-bg)',
      color: tone === 'ink' ? 'var(--color-bg-alt)' : 'var(--color-ink)',
      border: tone === 'ink' ? 'none' : '1px solid var(--color-border)',
      borderRadius: 'var(--radius-sm)',
      padding: 'var(--space-4) var(--space-5)',
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      minWidth: 280,
      boxShadow: 'var(--shadow-overlay)'
    }
  }, /*#__PURE__*/React.createElement("span", null, message), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      background: 'none',
      border: 'none',
      color: 'inherit',
      cursor: 'pointer',
      fontSize: 13
    }
  }, "\u2715"));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function Tooltip({
  children,
  label
}) {
  const [show, setShow] = React.useState(false);
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-block'
    },
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false)
  }, children, show && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      bottom: '130%',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'var(--color-espresso)',
      color: 'var(--color-bg-alt)',
      fontFamily: 'var(--font-sans)',
      fontSize: 11,
      letterSpacing: '0.04em',
      padding: '6px 10px',
      borderRadius: 'var(--radius-sm)',
      whiteSpace: 'nowrap',
      opacity: show ? 1 : 0,
      transition: 'var(--transition-hover)',
      pointerEvents: 'none'
    }
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function Checkbox({
  label,
  checked,
  onChange
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: 'var(--color-ink)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => onChange && onChange(!checked),
    style: {
      width: 16,
      height: 16,
      border: `1px solid ${checked ? 'var(--color-ink)' : 'var(--color-border)'}`,
      background: checked ? 'var(--color-ink)' : 'transparent',
      borderRadius: 'var(--radius-none)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'var(--transition-hover)',
      flexShrink: 0
    }
  }, checked && /*#__PURE__*/React.createElement("svg", {
    width: "10",
    height: "8",
    viewBox: "0 0 10 8",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 4L3.5 6.5L9 1",
    stroke: "var(--color-bg)",
    strokeWidth: "1.5"
  }))), label);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function Input({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  style
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--color-text-secondary)',
      marginBottom: 'var(--space-2)'
    }
  }, label), /*#__PURE__*/React.createElement("input", {
    type: type,
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    style: {
      width: '100%',
      fontFamily: 'var(--font-sans)',
      fontSize: 15,
      color: 'var(--color-ink)',
      background: 'transparent',
      border: 'none',
      borderBottom: '1px solid var(--color-border)',
      padding: '10px 2px',
      outline: 'none',
      transition: 'var(--transition-hover)'
    },
    onFocus: e => e.target.style.borderBottomColor = 'var(--color-brass)',
    onBlur: e => e.target.style.borderBottomColor = 'var(--color-border)'
  }));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function Radio({
  label,
  checked,
  onChange
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: 'var(--color-ink)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => onChange && onChange(),
    style: {
      width: 16,
      height: 16,
      borderRadius: '50%',
      border: `1px solid ${checked ? 'var(--color-ink)' : 'var(--color-border)'}`,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      transition: 'var(--transition-hover)'
    }
  }, checked && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: 'var(--color-ink)'
    }
  })), label);
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function Select({
  label,
  options = [],
  value,
  onChange,
  style
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--color-text-secondary)',
      marginBottom: 'var(--space-2)'
    }
  }, label), /*#__PURE__*/React.createElement("select", {
    value: value,
    onChange: onChange,
    style: {
      width: '100%',
      fontFamily: 'var(--font-sans)',
      fontSize: 15,
      color: 'var(--color-ink)',
      background: 'transparent',
      border: 'none',
      borderBottom: '1px solid var(--color-border)',
      borderRadius: 0,
      padding: '10px 2px',
      outline: 'none',
      appearance: 'none'
    }
  }, options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function Switch({
  checked,
  onChange,
  label
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: 'var(--color-ink)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => onChange && onChange(!checked),
    style: {
      width: 36,
      height: 18,
      borderRadius: 'var(--radius-pill)',
      background: checked ? 'var(--color-ink)' : 'var(--color-border)',
      position: 'relative',
      transition: 'var(--transition-hover)',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 2,
      left: checked ? 20 : 2,
      width: 14,
      height: 14,
      borderRadius: '50%',
      background: 'var(--color-bg)',
      transition: 'left var(--duration-standard) var(--ease-standard)'
    }
  })), label);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function Tabs({
  tabs = [],
  active,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-7)',
      borderBottom: '1px solid var(--color-border)',
      fontFamily: 'var(--font-sans)'
    }
  }, tabs.map(t => {
    const isActive = t === active;
    return /*#__PURE__*/React.createElement("button", {
      key: t,
      onClick: () => onChange && onChange(t),
      style: {
        background: 'none',
        border: 'none',
        borderBottom: `2px solid ${isActive ? 'var(--color-ink)' : 'transparent'}`,
        padding: '14px 0',
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: isActive ? 'var(--color-ink)' : 'var(--color-text-secondary)',
        cursor: 'pointer',
        transition: 'var(--transition-hover)'
      }
    }, t);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/overlay/Dialog.jsx
try { (() => {
function Dialog({
  open,
  title,
  children,
  onClose
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      background: 'var(--overlay-scrim)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      background: 'var(--color-bg)',
      padding: 'var(--space-7)',
      minWidth: 360,
      maxWidth: 480,
      boxShadow: 'var(--shadow-overlay)',
      fontFamily: 'var(--font-sans)'
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-serif-display)',
      fontSize: 22,
      color: 'var(--color-ink)',
      marginBottom: 'var(--space-5)'
    }
  }, title), children));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/overlay/Dialog.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Collection.jsx
try { (() => {
const {
  ProductCard,
  Tag
} = window.RootLevelDesignSystem_5f06dd;
const PRODUCTS = window.PRODUCTS;
function Collection({
  onNavigate
}) {
  const [filter, setFilter] = React.useState('All');
  const cats = ['All', 'Lighting', 'Seating', 'Tables', 'Storage'];
  const shown = filter === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1440,
      margin: '0 auto',
      padding: '56px 48px 120px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--color-brass)',
      marginBottom: 12
    }
  }, "The Full Collection"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-serif-display)',
      fontSize: 40,
      color: 'var(--color-ink)'
    }
  }, "Shop All Furniture & Decor")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      justifyContent: 'center',
      marginBottom: 56
    }
  }, cats.map(c => /*#__PURE__*/React.createElement(Tag, {
    key: c,
    selected: filter === c,
    onClick: () => setFilter(c)
  }, c))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 24
    }
  }, shown.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.id,
    onClick: () => onNavigate('product', p),
    style: {
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(ProductCard, p)))));
}
window.Collection = Collection;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Collection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Footer.jsx
try { (() => {
function Footer() {
  const cols = [{
    h: 'Shop',
    items: ['Lighting', 'Seating', 'Tables', 'Storage', 'Gift Cards']
  }, {
    h: 'About',
    items: ['Our Story', 'Craftsmanship', 'Sustainability', 'The Journal']
  }, {
    h: 'Support',
    items: ['Contact', 'Shipping & Returns', 'Care Guide', 'Trade Program']
  }];
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--color-espresso)',
      color: 'var(--color-bg-alt)',
      padding: '80px 48px 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1440,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
      gap: 48
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-serif-display)',
      fontSize: 24,
      marginBottom: 16
    }
  }, "Root Level"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      lineHeight: 1.7,
      color: 'var(--color-border)',
      maxWidth: 280
    }
  }, "Twenty years of meticulous craftsmanship. Furniture and decor built to be lived with for generations.")), cols.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.h
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--color-brass)',
      marginBottom: 16
    }
  }, c.h), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, c.items.map(i => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: "#",
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      color: 'var(--color-bg-alt)',
      textDecoration: 'none',
      opacity: 0.85
    }
  }, i)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1440,
      margin: '48px auto 0',
      borderTop: '1px solid rgba(239,235,227,0.18)',
      paddingTop: 24,
      fontFamily: 'var(--font-sans)',
      fontSize: 11,
      letterSpacing: '0.04em',
      color: 'var(--color-border)'
    }
  }, "\xA9 2026 Root Level. All rights reserved."));
}
window.Footer = Footer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Header.jsx
try { (() => {
function Header({
  view,
  onNavigate
}) {
  const [hover, setHover] = React.useState(null);
  const links = ['Lighting', 'Seating', 'Tables', 'Storage', 'The Journal'];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      background: 'var(--color-bg)',
      borderBottom: '1px solid var(--color-border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--color-espresso)',
      color: 'var(--color-bg-alt)',
      fontFamily: 'var(--font-sans)',
      fontSize: 11,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      textAlign: 'center',
      padding: '8px 0'
    }
  }, "Complimentary White-Glove Delivery on Orders Over $2,000"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px 48px',
      maxWidth: 1440,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate('home'),
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'var(--font-serif-display)',
      fontSize: 22,
      letterSpacing: '0.03em',
      color: 'var(--color-ink)'
    }
  }, "Root Level"), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 40
    }
  }, links.map(l => /*#__PURE__*/React.createElement("button", {
    key: l,
    onClick: () => onNavigate('collection'),
    onMouseEnter: () => setHover(l),
    onMouseLeave: () => setHover(null),
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: hover === l ? 'var(--color-brass)' : 'var(--color-ink)',
      transition: 'var(--transition-hover)'
    }
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20
    }
  }, ['Search', 'Account', 'Cart'].map(label => /*#__PURE__*/React.createElement("button", {
    key: label,
    "aria-label": label,
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--color-ink)',
      fontFamily: 'var(--font-sans)',
      fontSize: 11,
      letterSpacing: '0.06em',
      textTransform: 'uppercase'
    }
  }, label)))));
}
window.Header = Header;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Home.jsx
try { (() => {
const {
  Button,
  Badge,
  ProductCard
} = window.RootLevelDesignSystem_5f06dd;
const PhotoPlaceholder = window.PhotoPlaceholder;
const PRODUCTS = window.PRODUCTS;
function Home({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(PhotoPlaceholder, {
    ratio: "21 / 9",
    label: "Full-bleed hero \u2014 styled interior vignette"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 56,
      left: 56,
      color: 'var(--color-ink)',
      maxWidth: 480
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--color-brass)',
      marginBottom: 12
    }
  }, "A Heritage of Distinction"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-serif-display)',
      fontSize: 48,
      lineHeight: 1.1,
      marginBottom: 24
    }
  }, "Design, Delivered."), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => onNavigate('collection')
  }, "Explore the Collection"))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '96px 48px 56px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--color-brass)',
      marginBottom: 16
    }
  }, "Shop by Category"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-serif-display)',
      fontSize: 36,
      color: 'var(--color-ink)',
      marginBottom: 16
    }
  }, "Inspiration Lives Here"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 15,
      color: 'var(--color-text-secondary)',
      maxWidth: 480,
      margin: '0 auto',
      lineHeight: 1.6
    }
  }, "Each piece is meticulously hand-finished \u2014 built to be lived with for decades, not seasons.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 16,
      padding: '0 48px 96px',
      maxWidth: 1440,
      margin: '0 auto',
      boxSizing: 'border-box'
    }
  }, ['Lighting', 'Seating', 'Tables'].map(cat => /*#__PURE__*/React.createElement("div", {
    key: cat,
    style: {
      position: 'relative',
      cursor: 'pointer'
    },
    onClick: () => onNavigate('collection')
  }, /*#__PURE__*/React.createElement(PhotoPlaceholder, {
    ratio: "4 / 5",
    label: cat + ' — lifestyle shot'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 20,
      left: 20,
      fontFamily: 'var(--font-serif-display)',
      fontSize: 22,
      color: 'var(--color-ink)'
    }
  }, cat)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 48px 120px',
      maxWidth: 1440,
      margin: '0 auto',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-serif-display)',
      fontSize: 32,
      color: 'var(--color-ink)',
      marginBottom: 40,
      textAlign: 'center'
    }
  }, "The New Arrivals"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 24
    }
  }, PRODUCTS.slice(0, 4).map(p => /*#__PURE__*/React.createElement("div", {
    key: p.id,
    onClick: () => onNavigate('product', p),
    style: {
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(ProductCard, p))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--color-bg-alt)',
      padding: '96px 48px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 64,
      alignItems: 'center',
      maxWidth: 1440,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(PhotoPlaceholder, {
    ratio: "4 / 3",
    label: "Heritage storytelling \u2014 desaturated",
    tone: "cool"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--color-brass)',
      marginBottom: 16
    }
  }, "Twenty Years of Craft"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-serif-display)',
      fontSize: 32,
      color: 'var(--color-ink)',
      marginBottom: 20,
      lineHeight: 1.2
    }
  }, "Every joint cut and finished by hand"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 15,
      color: 'var(--color-text-secondary)',
      lineHeight: 1.7,
      marginBottom: 28,
      maxWidth: 420
    }
  }, "Our workshop pairs kiln-dried hardwoods with time-honored joinery \u2014 no shortcuts, no particleboard, no compromise."), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary"
  }, "Our Story"))));
}
window.Home = Home;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/PhotoPlaceholder.jsx
try { (() => {
function PhotoPlaceholder({
  ratio = '1 / 1',
  label = 'Editorial photography',
  tone = 'warm'
}) {
  const bg = tone === 'warm' ? 'linear-gradient(135deg, #E4DCCB 0%, #C9BBA0 100%)' : 'linear-gradient(135deg, #FFFFFF 0%, #EDE9E1 100%)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: ratio,
      background: bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'rgba(25,23,20,0.35)',
      fontFamily: 'var(--font-sans)',
      fontSize: 11,
      letterSpacing: '0.08em',
      textTransform: 'uppercase'
    }
  }, label);
}
window.PhotoPlaceholder = PhotoPlaceholder;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/PhotoPlaceholder.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ProductDetail.jsx
try { (() => {
const {
  Button,
  Badge,
  Select,
  Tabs,
  Toast
} = window.RootLevelDesignSystem_5f06dd;
const PhotoPlaceholder = window.PhotoPlaceholder;
function ProductDetail({
  product,
  onNavigate
}) {
  const [tab, setTab] = React.useState('Description');
  const [finish, setFinish] = React.useState('Walnut');
  const [showToast, setShowToast] = React.useState(false);
  if (!product) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1440,
      margin: '0 auto',
      padding: '56px 48px 120px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate('collection'),
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--color-text-secondary)',
      marginBottom: 32
    }
  }, "\u2190 Back to Collection"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.2fr 1fr',
      gap: 72
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, product.isNew && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 16,
      left: 16,
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "brass"
  }, "New")), /*#__PURE__*/React.createElement(PhotoPlaceholder, {
    ratio: "1 / 1",
    label: "Product photography \u2014 white ground"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-serif-display)',
      fontSize: 36,
      color: 'var(--color-ink)',
      marginBottom: 12
    }
  }, product.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 20,
      color: 'var(--color-ink)',
      marginBottom: 24
    }
  }, product.price), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      letterSpacing: '0.04em',
      color: 'var(--color-text-secondary)',
      marginBottom: 32
    }
  }, product.dimensions, " \xA0\xB7\xA0 SKU ", product.sku), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 28,
      maxWidth: 260
    }
  }, /*#__PURE__*/React.createElement(Select, {
    label: "Finish",
    options: ['Walnut', 'Oak', 'Ebony'],
    value: finish,
    onChange: e => setFinish(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    onClick: () => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2200);
    }
  }, "Add to Cart"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary"
  }, "Save")), /*#__PURE__*/React.createElement(Tabs, {
    tabs: ['Description', 'Dimensions', 'Care'],
    active: tab,
    onChange: setTab
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      lineHeight: 1.7,
      color: 'var(--color-text-secondary)',
      paddingTop: 24,
      maxWidth: 440
    }
  }, tab === 'Description' && 'Hand-finished in kiln-dried solid hardwood by our in-house joinery. Each piece carries the subtle variation of natural grain — no two are exactly alike.', tab === 'Dimensions' && product.dimensions, tab === 'Care' && 'Dust with a dry, soft cloth. Avoid direct sunlight and moisture. Re-oil the finish annually to preserve luster.'))), showToast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      bottom: 32,
      right: 32,
      zIndex: 1000
    }
  }, /*#__PURE__*/React.createElement(Toast, {
    message: "Added to Cart",
    onClose: () => setShowToast(false)
  })));
}
window.ProductDetail = ProductDetail;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ProductDetail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/data.js
try { (() => {
window.PRODUCTS = [{
  id: 'rl-1042',
  name: 'Marlowe Armchair',
  category: 'Seating',
  dimensions: '32" W x 34" D x 30" H',
  sku: 'RL-1042',
  price: '$2,480',
  isNew: true
}, {
  id: 'rl-0871',
  name: 'Aldrich Pendant',
  category: 'Lighting',
  dimensions: '18" Dia x 22" H',
  sku: 'RL-0871',
  price: '$640',
  isNew: false
}, {
  id: 'rl-2201',
  name: 'Hollis Dining Table',
  category: 'Tables',
  dimensions: '84" L x 40" W x 30" H',
  sku: 'RL-2201',
  price: '$4,120',
  isNew: false
}, {
  id: 'rl-0552',
  name: 'Thornbury Sideboard',
  category: 'Storage',
  dimensions: '68" W x 18" D x 32" H',
  sku: 'RL-0552',
  price: '$3,260',
  isNew: true
}, {
  id: 'rl-1890',
  name: 'Winslow Floor Lamp',
  category: 'Lighting',
  dimensions: '14" Dia x 62" H',
  sku: 'RL-1890',
  price: '$890',
  isNew: false
}, {
  id: 'rl-0334',
  name: 'Bramwell Bench',
  category: 'Seating',
  dimensions: '48" W x 16" D x 18" H',
  sku: 'RL-0334',
  price: '$1,240',
  isNew: false
}];
const PRODUCTS = window.PRODUCTS;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Dialog = __ds_scope.Dialog;

})();
