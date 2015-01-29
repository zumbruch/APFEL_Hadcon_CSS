importPackage(Packages.org.csstudio.opibuilder.scriptUtil);

widget.removeAllChildren();

for(var row=-1; row<=0xF; row++){
	for(var column=-1; column<=0xF; column++){
		//create linking container
		var linkingContainer = WidgetUtil.createWidgetModel("org.csstudio.opibuilder.widgets.linkingContainer");	
		linkingContainer.setPropertyValue("opi_file", "chipIdStatus.opi");
		linkingContainer.setPropertyValue("auto_size", true);
		linkingContainer.setPropertyValue("zoom_to_fit", false);
		linkingContainer.setPropertyValue("border_style", 0);


        if (-1 == column && -1 == row ) // corner
        {
			linkingContainer.setPropertyValue("group_name", "corner");
			linkingContainer.setPropertyValue("visible", false);
        }
        if (0xF == column && 0xF == row ) // corner
        {
			continue;
        }
		else if ( -1 == column ) // row	
		{
			linkingContainer.setPropertyValue("group_name", "rowLabel");
		}
		else if ( -1 == row ) // column	
		{
			linkingContainer.setPropertyValue("group_name", "columnLabel");
		}
		else
		{
			linkingContainer.setPropertyValue("group_name", "roundStatus");
		}

		//add macros
		var number = (column +  row * 16);
		linkingContainer.addMacro("chipId", number);
		linkingContainer.addMacro("chipIdHex", ("0x" + number.toString(16).toUpperCase()));
		linkingContainer.addMacro("chipIdLow", column);
		linkingContainer.addMacro("chipIdColumnHex", ("0xx" + column.toString(16).toUpperCase()));
		linkingContainer.addMacro("chipIdHigh", row);
		linkingContainer.addMacro("chipIdRowHex", ("0x" + row.toString(16).toUpperCase() + "x"));

		//add linking container to widget
		widget.addChildToBottom(linkingContainer);	
	}
}

var gridLayout = WidgetUtil.createWidgetModel("org.csstudio.opibuilder.widgets.gridLayout");
gridLayout.setPropertyValue("number_of_columns", (16 + 1));	
gridLayout.setPropertyValue("grid_gap", 1);	
widget.addChildToBottom(gridLayout);
widget.performAutosize();


