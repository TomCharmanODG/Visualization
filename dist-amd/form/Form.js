(function(e,t){typeof define=="function"&&define.amd?define(["d3","../common/HTMLWidget","../common/SVGWidget","../common/WidgetArray","./Input","./Slider","css!./Form"],t):e.form_Form=t(e.d3,e.common_HTMLWidget,e.common_SVGWidget,e.common_WidgetArray,e.form_Input,e.form_Slider)})(this,function(e,t,n,r,i,s){function o(){t.call(this),this._tag="form"}return o.prototype=Object.create(t.prototype),o.prototype._class+=" form_Form",o.prototype.publish("validate",!0,"boolean","Enable/Disable input validation"),o.prototype.publish("inputs",[],"widgetArray","Array of input widgets"),o.prototype.publish("showSubmit",!0,"boolean","Show Submit/Cancel Controls"),o.prototype.publish("omitBlank",!1,"boolean","Drop Blank Fields From Submit"),o.prototype.testData=function(){return this.inputs([(new i).name("textbox-test").label("Alphanumeric").type("textbox").validate("^[A-Za-z0-9]+$").value("SomeString123"),(new i).name("number-test").label("Number Test").type("number").validate("\\d+").value(123),(new i).name("select-test").label("Select Test").type("select").selectOptions(["A","B","C"]).value("B"),(new r).content([(new i).name("textbox-test").label("Only Alpha").type("textbox").validate("^[A-Za-z]+$").value("SomeString"),(new i).name("checkbox-test").label("Checkbox Test").type("checkbox").value(!0)]),(new i).name("textarea-test").label("Textarea Test").type("textarea").value("Textarea Text")]),this},o.prototype.data=function(e){if(!arguments.length){var t=[];return this.inputsForEach(function(e){t.push(e.value())}),t}return this.inputsForEach(function(t,n){e.length>n&&t.value(e[n]).render()}),this},o.prototype.inputsForEach=function(e,t){var n=0;this.inputs().forEach(function(i){var s=i instanceof r?i.content():[i];s.forEach(function(r){t?e.call(t,r,n++):e(r,n++)})})},o.prototype.calcMaxColumns=function(){var e=0;return this.inputs().forEach(function(t){var n=t instanceof r?t.content():[t];n.length>e&&(e=n.length)}),e},o.prototype.values=function(){var e={};return this.inputsForEach(function(t){var n=t.value();if(n||!this.omitBlank())e[t.name()]=t.value()},this),e},o.prototype.submit=function(){var e=!0;this.validate()&&(e=this.checkValidation()),this.click(e?this.values():null)},o.prototype.clear=function(){this.inputsForEach(function(e){e instanceof s?e.allowRange()?e.value([e.low(),e.low()]).render():e.value(e.low()).render():e.type()==="checkbox"?e.value(!1).render():e.value("").render()})},o.prototype.checkValidation=function(){var e=!0,t=[];return this.inputsForEach(function(e){e.isValid()||t.push("'"+e.label()+"'"+" value is invalid.")}),t.length>0&&(alert(t.join("\n")),e=!1),e},o.prototype.enter=function(n,r){t.prototype.enter.apply(this,arguments),r.on("submit",function(){e.event.preventDefault()}),this._parentElement.style("overflow","auto");var s=r.append("table");this.tbody=s.append("tbody"),this.btntd=s.append("tfoot").append("tr").append("td").attr("colspan",2);var o=this,u=[(new i).type("button").value("Submit").on("click",function(){o.submit()},!0),(new i).type("button").value("Clear").on("click",function(){o.clear()},!0)],a=o.btntd.append("div").style("float","right");u.forEach(function(e){var t=a.append("span").style("float","left");e.target(t.node()).render()})},o.prototype.update=function(i,s){t.prototype.update.apply(this,arguments),this._maxCols=this.calcMaxColumns();var o=this,u=this.tbody.selectAll("tr").data(this.inputs());u.enter().append("tr").each(function(t,i){var s=e.select(this),u=t instanceof r?t.content():[t];u.forEach(function(e,t){s.append("td").attr("class","prompt").text(e.label()+":");var r=s.append("td").attr("class","input");t===u.length-1&&u.length<o._maxCols&&r.attr("colspan",(o._maxCols-u.length+1)*2),e.target(r.node()).render();if(e instanceof n){var i=e.element().node().getBBox();r.style("height",i.height+"px"),e.resize().render()}})}),u.exit().remove(),this.btntd.attr("colspan",this._maxCols*2).style("visibility",this.showSubmit()?null:"hidden")},o.prototype.exit=function(e,n){t.prototype.exit.apply(this,arguments)},o.prototype.click=function(e){console.log("Clicked Submit: "+JSON.stringify(e))},o});