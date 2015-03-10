importPackage(Packages.org.csstudio.opibuilder.scriptUtil);
importPackage(Packages.java.lang);

//runnable = {
//	run:function()
//	 {
	  var nColumns = 0x2;
	  var chipIdMin = 0x1;
	  var nChips = 0x8;
	  var stepSize = 0x1;
	  
	  var nColumnsIndex = 0;
	  var  chipMinIndex = 1;
	  var   nChipsIndex = 2;
	  var stepSizeIndex = 3;
	  var  opiPathIndex = 4;
	  var  triggerDisplayResizeIndex = 5;
	  
	   nColumns = PVUtil.getLong (pvs[nColumnsIndex]);
	  chipIdMin = PVUtil.getLong (pvs[ chipMinIndex]);
	     nChips = PVUtil.getLong (pvs[  nChipsIndex]);
	  var  stepSize = PVUtil.getLong (pvs[stepSizeIndex]);
	  var opiPath  = PVUtil.getString(pvs[opiPathIndex]);
	  
	  var number = 0;
	  
	  widget.removeAllChildren();
	  var chipCount = 0;
	  
	  while(number < 0xFF && chipCount < nChips  )
	  {
	  	chipCount=chipCount+1;
	  
	  	//create linking container
	  	var linkingContainer = WidgetUtil.createWidgetModel("org.csstudio.opibuilder.widgets.linkingContainer");	
	  	linkingContainer.setPropertyValue("opi_file", "chipId.opi");
	  	linkingContainer.setPropertyValue("auto_size", true);
	  	linkingContainer.setPropertyValue("zoom_to_fit", false);
	  	linkingContainer.setPropertyValue("border_style", 14);
	  	linkingContainer.setPropertyValue("group_name", "ChipId");
	  	linkingContainer.setPropertyValue("border_color", "Header_Background");
	  
	  	//add macros
	  	var chipId = Number(number) + Number(chipIdMin);
	  	linkingContainer.addMacro("chipId", chipId.toString());
	  	linkingContainer.addMacro("chipID", chipId.toString());
	  
	  	linkingContainer.addMacro("chipIdHex", ("0x" + chipId.toString(16).toUpperCase()));
	  	
	  	//add linking container to widget
	  	widget.addChildToBottom(linkingContainer);	
	  
	  	number = Number(number) + Number(stepSize);
	  } 
	  
	  var gridLayout = WidgetUtil.createWidgetModel("org.csstudio.opibuilder.widgets.gridLayout");
	  gridLayout.setPropertyValue("number_of_columns", nColumns);	
	  gridLayout.setPropertyValue("grid_gap", 3);	
	  widget.addChildToBottom(gridLayout);
	  widget.performAutosize();
	  
	  display.performAutosize();
	  display.setPropertyValue("name", "Apfel ChipIds" + nColumns.toString() + " x " + (Math.ceil(nChips/nColumns)));
//	 }	
//	};		
//
//new Thread(new Runnable(runnable)).start();

