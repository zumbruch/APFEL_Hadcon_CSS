importPackage(Packages.org.csstudio.opibuilder.scriptUtil);

			var nColumns = 0x2;
			var chipIdMin = 0x1;
			var nChips = 0x8;
			var stepSize = 0x1;
			
			var   nChipsIndex = 0;
//			var nColumnsIndex = 0;
//			var  chipMinIndex = 1;
//			var stepSizeIndex = 3;
//			var  opiPathIndex = 4;
//			var  triggerDisplayResizeIndex = 5;
			
			   nChips = PVUtil.getLong (pvs[  nChipsIndex]);
//			 nColumns = PVUtil.getLong (pvs[nColumnsIndex]);
//			chipIdMin = PVUtil.getLong (pvs[ chipMinIndex]);
//			var stepSize = PVUtil.getLong (pvs[stepSizeIndex]);
//			var opiPath  = PVUtil.getString(pvs[opiPathIndex]);

var number;



widget.removeAllChildren();

for(var row=-1; row<=0xF; row++){
	for(var column=-1; column<=0xF; column++){
		number = (column +  row * 16);
		if (number > nChips) 
	    {
	       	break;
		}
		if ( 0xF > nChips && column > nChips  )
		{
			break;
		}
			
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
        if (0x0 == column && 0x0 == row ) // corner
        {
			linkingContainer.setPropertyValue("group_name", "corner");
			linkingContainer.setPropertyValue("visible", false);
        }
		else if ( -1 == column ) // row	
		{
			linkingContainer.setPropertyValue("group_name", "rowLabel");
			linkingContainer.addMacro("chipIdMin", ((row==0)? 1 : row << 4).toString());
			linkingContainer.addMacro("stepSize", "1");
			linkingContainer.addMacro("nChips", (row==0|row==0xF)?"15":"16");
			linkingContainer.addMacro("nColumns", "4");
		}
		else if ( -1 == row ) // column	
		{
			linkingContainer.setPropertyValue("group_name", "columnLabel");
			linkingContainer.addMacro("chipIdMin", ((column==0)? 0x10 : column ).toString());
			linkingContainer.addMacro("stepSize", "16");
			linkingContainer.addMacro("nChips", (column==0|column==0xF)?"15":"16");
			linkingContainer.addMacro("nColumns", "4");
		}
		else
		{
	        if (0xF == column && 0xF == row ) // corner
	        {
				linkingContainer.setPropertyValue("border_style", "1");
				linkingContainer.setPropertyValue("border_width", "2");
				linkingContainer.setPropertyValue("border_color",ColorFontUtil.getColorFromRGB(0,128,255));
	        }
			linkingContainer.setPropertyValue("group_name", "roundStatus");
		}

		//add macros
		linkingContainer.addMacro("chipId", number);
		linkingContainer.addMacro("chipIdHex", ("0x" + number.toString(16).toUpperCase()));
		linkingContainer.addMacro("chipIdLow", column);
		linkingContainer.addMacro("chipIdColumnHex", ("0xx" + column.toString(16).toUpperCase()));
		linkingContainer.addMacro("chipIdHigh", row);
		linkingContainer.addMacro("chipIdRowHex", ("0x" + row.toString(16).toUpperCase() + "x"));

		//add linking container to widget
		widget.addChildToBottom(linkingContainer);	
	}
		if (number > nChips) 
	        {
	        	break;
			}
}

var gridLayout = WidgetUtil.createWidgetModel("org.csstudio.opibuilder.widgets.gridLayout");
gridLayout.setPropertyValue("number_of_columns", (nChips%16 + 2));	
gridLayout.setPropertyValue("grid_gap", 1);	
widget.addChildToBottom(gridLayout);
widget.performAutosize();


