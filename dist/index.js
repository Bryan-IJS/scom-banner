var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/scom-banner/global/utils.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("@scom/scom-banner/global/index.ts", ["require", "exports", "@scom/scom-banner/global/utils.ts"], function (require, exports, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(utils_1, exports);
});
define("@scom/scom-banner/index.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.actionButtonStyle = exports.backgroundStyle = exports.containerStyle = void 0;
    const Theme = components_1.Styles.Theme.ThemeVars;
    exports.containerStyle = components_1.Styles.style({
        width: 'var(--layout-container-width)',
        maxWidth: 'var(--layout-container-max_width)',
        overflow: 'var(--layout-container-overflow)',
        textAlign: 'var(--layout-container-text_align)',
        margin: '0 auto'
    });
    exports.backgroundStyle = components_1.Styles.style({
        backgroundPosition: 'center !important',
        backgroundSize: 'cover !important'
    });
    exports.actionButtonStyle = components_1.Styles.style({
        boxShadow: 'none',
        $nest: {
            '&:hover': {
                filter: 'brightness(0.85)'
            },
            '> i-icon:hover': {
                fill: '#fff !important'
            }
        }
    });
});
define("@scom/scom-banner/data.json.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ///<amd-module name='@scom/scom-banner/data.json.ts'/> 
    exports.default = {
        "defaultBuilderData": {
            title: 'Banner title'
        }
    };
});
define("@scom/scom-banner", ["require", "exports", "@ijstech/components", "@scom/scom-banner/index.css.ts", "@scom/scom-banner/data.json.ts"], function (require, exports, components_2, index_css_1, data_json_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_2.Styles.Theme.ThemeVars;
    const propertiesSchema = {
        type: 'object',
        required: ['title'],
        properties: {
            title: {
                type: 'string'
            },
            description: {
                type: 'string'
            },
            backgroundImage: {
                type: 'string'
            },
            linkButtons: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        caption: {
                            type: 'string'
                        },
                        url: {
                            type: 'string'
                        }
                    }
                }
            }
        }
    };
    const defaultColors = {
        titleFontColor: '#565656',
        descriptionFontColor: '#565656'
    };
    let ScomBanner = class ScomBanner extends components_2.Module {
        constructor(parent, options) {
            super(parent, options);
            this._data = { title: '' };
            this.tag = {};
            this.defaultEdit = true;
        }
        static async create(options, parent) {
            let self = new this(parent, options);
            await self.ready();
            return self;
        }
        getData() {
            return this._data;
        }
        async setData(data) {
            this._data = data;
            this.onUpdateBlock(this.tag);
        }
        getTag() {
            return this.tag;
        }
        updateTag(type, value) {
            var _a;
            this.tag[type] = (_a = this.tag[type]) !== null && _a !== void 0 ? _a : {};
            for (let prop in value) {
                if (value.hasOwnProperty(prop))
                    this.tag[type][prop] = value[prop];
            }
        }
        async setTag(value) {
            const newValue = value || {};
            if (newValue.light)
                this.updateTag('light', newValue.light);
            if (newValue.dark)
                this.updateTag('dark', newValue.dark);
            if (newValue.hasOwnProperty('height'))
                this.tag.height = newValue.height;
            if (newValue.hasOwnProperty('textAlign'))
                this.tag.textAlign = newValue.textAlign;
            this.onUpdateBlock(value);
        }
        setTheme(value) {
            this.onUpdateBlock(this.tag);
        }
        getThemeSchema(readOnly = false) {
            const themeSchema = {
                type: 'object',
                properties: {
                    dark: {
                        type: 'object',
                        properties: {
                            titleFontColor: {
                                type: 'string',
                                format: 'color',
                                readOnly
                            },
                            descriptionFontColor: {
                                type: 'string',
                                format: 'color',
                                readOnly
                            },
                            linkButtonStyle: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        captionColor: {
                                            type: 'string',
                                            format: 'color'
                                        },
                                        color: {
                                            type: 'string',
                                            format: 'color'
                                        },
                                        buttonType: {
                                            type: 'string',
                                            enum: [
                                                'filled',
                                                'outlined',
                                                'text'
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    },
                    light: {
                        type: 'object',
                        properties: {
                            titleFontColor: {
                                type: 'string',
                                format: 'color',
                                readOnly
                            },
                            descriptionFontColor: {
                                type: 'string',
                                format: 'color',
                                readOnly
                            },
                            linkButtonStyle: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        captionColor: {
                                            type: 'string',
                                            format: 'color'
                                        },
                                        color: {
                                            type: 'string',
                                            format: 'color'
                                        },
                                        buttonType: {
                                            type: 'string',
                                            enum: [
                                                'filled',
                                                'outlined',
                                                'text'
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    },
                    textAlign: {
                        type: 'string',
                        enum: [
                            'left',
                            'center',
                            'right'
                        ],
                        readOnly
                    },
                    height: {
                        type: 'number'
                    }
                }
            };
            return themeSchema;
        }
        _getActions(propertiesSchema, themeSchema) {
            const actions = [
                {
                    name: 'Settings',
                    icon: 'cog',
                    command: (builder, userInputData) => {
                        let oldData = {};
                        return {
                            execute: async () => {
                                oldData = JSON.parse(JSON.stringify(this._data));
                                if ((userInputData === null || userInputData === void 0 ? void 0 : userInputData.title) !== undefined)
                                    this._data.title = userInputData.title;
                                if ((userInputData === null || userInputData === void 0 ? void 0 : userInputData.description) !== undefined)
                                    this._data.description = userInputData.description;
                                if ((userInputData === null || userInputData === void 0 ? void 0 : userInputData.backgroundImage) !== undefined)
                                    this._data.backgroundImage = userInputData.backgroundImage;
                                if ((userInputData === null || userInputData === void 0 ? void 0 : userInputData.linkButtons) !== undefined)
                                    this._data.linkButtons = userInputData.linkButtons;
                                this.onUpdateBlock(this.tag);
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(this._data);
                            },
                            undo: async () => {
                                this._data = JSON.parse(JSON.stringify(oldData));
                                this.onUpdateBlock(this.tag);
                                if (builder === null || builder === void 0 ? void 0 : builder.setData)
                                    builder.setData(this._data);
                            },
                            redo: () => { }
                        };
                    },
                    userInputDataSchema: propertiesSchema,
                },
                {
                    name: 'Theme Settings',
                    icon: 'palette',
                    command: (builder, userInputData) => {
                        let oldTag = {};
                        return {
                            execute: async () => {
                                if (!userInputData)
                                    return;
                                oldTag = JSON.parse(JSON.stringify(this.tag));
                                if (builder)
                                    builder.setTag(userInputData);
                                else
                                    this.setTag(userInputData);
                            },
                            undo: () => {
                                if (!userInputData)
                                    return;
                                if (builder)
                                    builder.setTag(oldTag);
                                else
                                    this.setTag(oldTag);
                            },
                            redo: () => { }
                        };
                    },
                    userInputDataSchema: themeSchema
                }
            ];
            return actions;
        }
        getConfigurators() {
            return [
                {
                    name: 'Builder Configurator',
                    target: 'Builders',
                    getActions: () => {
                        const themeSchema = this.getThemeSchema();
                        return this._getActions(propertiesSchema, themeSchema);
                    },
                    getData: this.getData.bind(this),
                    setData: async (data) => {
                        const defaultData = data_json_1.default.defaultBuilderData;
                        await this.setData(Object.assign(Object.assign({}, defaultData), data));
                    },
                    getTag: this.getTag.bind(this),
                    setTag: this.setTag.bind(this)
                },
                {
                    name: 'Emdedder Configurator',
                    target: 'Embedders',
                    getActions: () => {
                        const themeSchema = this.getThemeSchema(true);
                        return this._getActions(propertiesSchema, themeSchema);
                    },
                    getData: this.getData.bind(this),
                    setData: this.setData.bind(this),
                    getTag: this.getTag.bind(this),
                    setTag: this.setTag.bind(this)
                }
            ];
        }
        onUpdateBlock(config) {
            var _a, _b;
            const themeVar = document.body.style.getPropertyValue('--theme') || 'dark';
            const { titleFontColor = defaultColors.titleFontColor, descriptionFontColor = defaultColors.descriptionFontColor, linkButtonStyle = [] } = config[themeVar] || {};
            const { textAlign = 'left', height = 'auto' } = config || {};
            this.pnlCardBody.clearInnerHTML();
            const mainStack = (this.$render("i-vstack", { gap: "1.5rem", class: index_css_1.containerStyle },
                this.$render("i-label", { caption: ((_a = this._data) === null || _a === void 0 ? void 0 : _a.title) || '', font: { size: '3rem', bold: true, color: titleFontColor }, lineHeight: 1.5 }),
                this.$render("i-label", { visible: !!this._data.description, caption: this._data.description || '', font: { size: '1.375rem', color: descriptionFontColor }, lineHeight: 1.2 })));
            const buttons = (_b = this._data.linkButtons) === null || _b === void 0 ? void 0 : _b.filter(link => link.caption || link.url);
            if (buttons && buttons.length) {
                const horizontalAlignment = textAlign == 'right' ? 'end' : textAlign == 'left' ? 'start' : textAlign;
                let buttonPanel = (this.$render("i-hstack", { verticalAlignment: 'center', horizontalAlignment: horizontalAlignment, gap: "0.5rem" }));
                buttons.forEach((link, i) => {
                    const buttonOptions = {};
                    const { captionColor = Theme.colors.primary.contrastText, color = Theme.colors.primary.main, buttonType = 'filled' } = linkButtonStyle[i] || {};
                    if (buttonType === 'outlined') {
                        buttonOptions.border = { width: 1, style: 'solid', color: color };
                    }
                    buttonPanel.append(this.$render("i-button", Object.assign({ caption: link.caption || "", padding: { left: '1rem', right: '1rem', top: '0.5rem', bottom: '0.5rem' }, onClick: () => link.url ? window.location.href = link.url : {}, font: { color: captionColor }, background: { color: buttonType === 'filled' ? color : 'transparent' }, class: index_css_1.actionButtonStyle }, buttonOptions)));
                });
                mainStack.append(buttonPanel);
            }
            mainStack.style.textAlign = textAlign || 'left';
            const options = {};
            if (height) {
                options.height = height;
            }
            const item = (this.$render("i-hstack", Object.assign({ background: { image: this._data.backgroundImage || '', color: 'transparent' }, verticalAlignment: "center", minHeight: 150, class: index_css_1.backgroundStyle }, options), mainStack));
            this.pnlCardBody.appendChild(item);
        }
        init() {
            super.init();
            const data = this.getAttribute('data', true);
            data && this.setData(data);
        }
        render() {
            return (this.$render("i-panel", { id: "pnlCard" },
                this.$render("i-hstack", { id: "pnlCardHeader", verticalAlignment: "center", horizontalAlignment: "center" }),
                this.$render("i-panel", { id: "pnlCardBody", minHeight: 48 }),
                this.$render("i-panel", { id: "pnlCardFooter" })));
        }
    };
    ScomBanner = __decorate([
        components_2.customModule,
        components_2.customElements('i-scom-banner')
    ], ScomBanner);
    exports.default = ScomBanner;
});
