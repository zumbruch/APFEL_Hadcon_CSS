importPackage(Packages.org.csstudio.opibuilder.scriptUtil);

var portsOffset=0;
var typeOffset=8;
var opiPathOffset=7;
var debugOffset=12;

var opiPath  = PVUtil.getString(pvs[opiPathOffset]);
var debug = PVUtil.getLong(pvs[debugOffset]);
types = [  "PIN" , "PORT" ,"DDR" ];
ports = [ "A","B","C","D","E","F","G" ];

widget.removeAllChildren();

for(var i=0; i<ports.length; i++){
	if (0 == PVUtil.getLong(pvs[i + portsOffset]))
	{
		if (0 != debug) { ConsoleUtil.writeInfo("DEBUG: " + "port " + ports[i] + " skipped");}
		continue;
	}
	else
	{
		if (0 != debug) { ConsoleUtil.writeInfo( "DEBUG: " + "port " + ports[i] + " chosen");}
	}
	
	for(var j=0; j<types.length; j++){
 	
	    var insert = PVUtil.getLong(pvs[j + typeOffset] );
		if (0 != debug) {ConsoleUtil.writeInfo( "DEBUG: " + ports[i] + "/" + j + " --- " + types[j] + ports[i] + " (" + pvs[j+typeOffset] + ")");}
		
		if ( 0 == insert) 
		{
			if (0 != debug) {ConsoleUtil.writeInfo( "DEBUG: " + types[j] + "x " + insert + " skip");}
			continue;
		}
		else
		{
			if (0 != debug) {ConsoleUtil.writeInfo( "DEBUG: " + types[j] + "x " + insert + " show");}
		}
		
		//create linking container
		var linkingContainer = WidgetUtil.createWidgetModel("org.csstudio.opibuilder.widgets.linkingContainer");	
		linkingContainer.setPropertyValue("opi_file", opiPath);
		linkingContainer.setPropertyValue("auto_size", true);
		linkingContainer.setPropertyValue("zoom_to_fit", false);
		linkingContainer.setPropertyValue("group_name", "Controls");
		linkingContainer.setPropertyValue("name", ("Controls" + types[j] + ports[i]));
		linkingContainer.setPropertyValue("border_style", 0);
	
		//add macros
		linkingContainer.addMacro("index", i);
		linkingContainer.addMacro("RegName", types[j]+ports[i]);

		//add linking container to widget
		widget.addChildToBottom(linkingContainer);
	}
}

widget.performAutosize();


