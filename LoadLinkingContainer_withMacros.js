importPackage(Packages.org.csstudio.opibuilder.scriptUtil);
importPackage(Packages.java.lang);

	  var opiPathIndex = 0;
	  var opiPath  = PVUtil.getString(pvs[opiPathIndex]);
	  var groupNameIndex = 1;
	  var groupName  = PVUtil.getString(pvs[groupNameIndex]);
	  var macroNameIndex = 2;
	  var macroName  = PVUtil.getString(pvs[macroNameIndex]);
	  var macroValueIndex = 3;
	  var macroValue  = PVUtil.getString(pvs[macroValueIndex]);
	  
	  widget.removeAllChildren();
	  
       //create linking container
	 	var linkingContainer = WidgetUtil.createWidgetModel("org.csstudio.opibuilder.widgets.linkingContainer");	
	  	linkingContainer.setPropertyValue("opi_file", opiPath.toString());
	  	linkingContainer.setPropertyValue("auto_size", true);
	  	linkingContainer.setPropertyValue("zoom_to_fit", false);
	  	linkingContainer.setPropertyValue("border_style", 14);
	  	linkingContainer.setPropertyValue("group_name", groupName.toString());
	  	linkingContainer.setPropertyValue("border_color", "Header_Background");
	  
	  	//add macros
	  	linkingContainer.addMacro(macroName.toString(), macroValue.toString());
	  	
	  	//add linking container to widget
	  	widget.addChildToBottom(linkingContainer);	
	  
	  widget.performAutosize();  
	  display.performAutosize();

