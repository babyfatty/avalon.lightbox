define(["avalon",
        "text!avalon.tabs.tab.html", //这是组件用到的VM
        "text!avalon.tabs.panel.html",
        "text!avalon.tabs.close.html"],
    function(avalon, tabHTML, panelHTML, closeHTML) {

        var widget = avalon.ui.tabs = function(element, data, vmodels) {
            var options = data.tabsOptions//★★★取得配置项

            var vmodel = avalon.define(data.tabsId, function(vm) {
                avalon.mix(vm, options)//这视情况使用浅拷贝或深拷贝avalon.mix(true, vm, options)
                vm.$init = function() {//初始化组件的界面，最好定义此方法，让框架对它进行自动化配置
                    avalon(element).addClass("ui-tabs ui-widget ui-widget-content ui-corner-all")
                    // ★★★设置动态模板，注意模块上所有占位符都以“MS_OPTION_XXX”形式实现
                    var tablist = tabHTML
                        .replace("MS_OPTION_EVENT", vmodel.event)
                        .replace("MS_OPTION_REMOVABLE", vmodel.removable ? closeHTML : "")
                    //决定是重复利用已有的元素，还是通过ms-include-src引入新内部
                    var contentType = options.contentType === "content" ? 0 : 1
                    var panels = panelHTML.split("MS_OPTION_CONTENT")[contentType]
                    element.innerHTML = vmodel.bottom ? panels + tablist : tablist + panels
                    element.setAttribute("ms-class-1", "ui-tabs-collapsible:collapsible")
                    element.setAttribute("ms-class-2", "tabs-bottom:bottom")
                    avalon.scan(element, [vmodel].concat(vmodels))

                }
                vm.$remove = function() {//清空构成UI的所有节点，最好定义此方法，让框架对它进行自动化销毁
                    element.innerHTML =  ""
                }
                //其他属性与方法
                vm.tabs = []
                vm.tabpanels = []
                vm.disable = function(index, disable) {
                    //具体实现
                }
                vm.enable = function(index) {
                    //具体实现
                }
                vm.add = function(config) {
                    //具体实现
                }
                vm.remove = function(config) {
                    //具体实现
                }
                vm.activate = function(event, index) {
                    //具体实现
                }
            })
            return vmodel//必须返回组件VM
        }
        widget.defaults = {//默认配置项
            collapsed: false,
            active: 0, //默认打开第几个面板
            event: "click", //切换面板的事件，移过(mouseenter)还是点击(click)
            collapsible: false, //当切换面板的事件为click时，
            bottom: false, //按钮位于上方还是上方
            removable: false, //按钮的左上角是否出现X，用于移除按钮与对应面板
            activate: avalon.noop, // 切换面板后触发的回调
            contentType: "content"
        }
        return avalon
    })
