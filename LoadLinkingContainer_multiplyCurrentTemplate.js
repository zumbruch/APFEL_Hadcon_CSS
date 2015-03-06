importPackage(Packages.org.csstudio.opibuilder.scriptUtil);
importPackage(Packages.java.lang);

var  templateNameOffset=0;
var     nElementsOffset=1;
var macroSettingsOffset=2;
var     vetoArrayOffset=3;
var      nColumnsOffset=4;
var       gridGapOffset=5;

var templateName  = PVUtil.getString(pvs[templateNameOffset]);
var nElements     = PVUtil.getLong(pvs[nElementsOffset]);
var macroSettings = PVUtil.getString(pvs[macroSettingsOffset]);
var vetoArray     = PVUtil.getLongArray(pvs[vetoArrayOffset]);
var nColumns      = PVUtil.getLong(pvs[nColumnsOffset]);
var gridGap       = PVUtil.getLong(pvs[gridGapOffset]);

// e.g. "portName:A,C,F;foo:c,d,e"
var macroSettingsArray   = macroSettings.split(";");

var macroNameArray = []; 
var macroValuesArray = []; 

for (macroIndex=0; macroIndex < macroSettingsArray.length; macroIndex++)
{
		set = macroSettingsArray[macroIndex].split(":");
		if (set.length >= 2)
		{
			macroNameArray.push(set[0]);
			macroValuesArray.push(set[1]);
		}
}

widget.setPropertyValue("lock_children", false);

var opi_file      = widget.getWidget(templateName).getPropertyValue("opi_file");
var group_name    = widget.getWidget(templateName).getPropertyValue("group_name");
var auto_size     = widget.getWidget(templateName).getPropertyValue("auto_size");
var zoom_to_fit   = widget.getWidget(templateName).getPropertyValue("zoom_to_fit");
var border_style  = widget.getWidget(templateName).getPropertyValue("border_style");
var border_color  = widget.getWidget(templateName).getPropertyValue("border_color");
var border_width  = widget.getWidget(templateName).getPropertyValue("border_width");

widget.removeAllChildren();

for (index=0; index < nElements; index++)
{
	if (vetoArray.length < index)
	{
		if (1 == vetoArray[index])
		{ continue; } 
	}
	
	//create linking container
	var linkingContainer = WidgetUtil.createWidgetModel("org.csstudio.opibuilder.widgets.linkingContainer");	
	linkingContainer.setPropertyValue("opi_file", opi_file);
	linkingContainer.setPropertyValue("auto_size", auto_size);
	linkingContainer.setPropertyValue("zoom_to_fit", zoom_to_fit);
	linkingContainer.setPropertyValue("border_style", border_style);
	linkingContainer.setPropertyValue("group_name", group_name);
	linkingContainer.setPropertyValue("border_color", border_color);
	linkingContainer.setPropertyValue("border_width", border_width);
  	
	for (macroIndex=0; macroIndex < macroNameArray.length; macroIndex++)
	{
		var array = macroValuesArray[macroIndex].split(",",nElements);
		if (index < array.length)
		{
			linkingContainer.addMacro(macroNameArray[macroIndex], array[index]);
		}
    }
    
	//add linking container to widget
	widget.addChildToBottom(linkingContainer);	

var gridLayout = WidgetUtil.createWidgetModel("org.csstudio.opibuilder.widgets.gridLayout");
gridLayout.setPropertyValue("number_of_columns", nColumns);	
gridLayout.setPropertyValue("grid_gap", gridGap);	
widget.addChildToBottom(gridLayout);
widget.performAutosize();
}

display.performAutosize();