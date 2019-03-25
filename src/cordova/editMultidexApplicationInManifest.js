module.exports = function(context) {
	try {
		if (context.opts.platforms.indexOf('android') < 0) {
	        return;
	    }

		var fs = context.requireCordovaModule('fs');
	    var path = context.requireCordovaModule('path');
	    var elementTree = context.requireCordovaModule('elementtree');

	    var manifestPath = path.join(context.opts.projectRoot, 'platforms/android/app/src/main/AndroidManifest.xml');
	    if (!fs.existsSync(manifestPath)) {
	    	manifestPath = path.join(context.opts.projectRoot, 'platforms/android/AndroidManifest.xml');
	    }
	    if (!fs.existsSync(manifestPath)) {
	    	throw new Error('AdinCube - Cannot find AndroidManifest.xml in output directory.');
	    }

		var manifestContent = fs.readFileSync(manifestPath).toString();
		
		var doc = elementTree.parse(manifestContent);
	    if (doc.getroot().tag !== 'manifest') {
	        throw new Error('AdinCube - ' + manifestPath + ' is not a valid AndroidManifest.xml: No <manifest> tag as root.');
	    }

		var applicationTag = doc.find("./application");
		if (applicationTag === undefined || applicationTag === null) {
			throw new Error('AdinCube - ' + manifestPath + ' is not a valid AndroidManifest.xml: No <application> tag found.');
		}

		var applicationName = applicationTag.attrib['android:name'];
		if (applicationName === undefined || applicationName === null) {
			applicationTag.attrib['android:name'] = "android.support.multidex.MultiDexApplication";
			fs.writeFileSync(manifestPath, doc.write({indent: 4}), 'utf-8');
		}
	} catch (e) {
		throw new Error('AdinCube - Error while editing AndroidManifest.xml: ' + e.message);
	}
}