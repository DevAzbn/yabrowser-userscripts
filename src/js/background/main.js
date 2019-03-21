'use strict';

(function() {

	var manifest = chrome.runtime.getManifest();
	var isEnabled = true;
	var scope = 'regular';

	// chrome.proxy.onProxyError.addListener(function callback)

	function clearProxy() {
		
		chrome.proxy.settings.clear({
			scope : scope,
		});

	}

	function setProxy(forceReload) {
		if (isEnabled) {
			
			chrome.proxy.settings.get({
				incognito : false,
			}, function(details) {
				
				// var isControllableSettingsRuntime = isControllableProxySettings(details);

				// if (forceReload || isControllableSettingsRuntime !== isControllableSettings) {
					
				// 	// isControllableSettings = isControllableSettingsRuntime;
				// 	// validatePopupIfOpened();
				// 	// processIcon();

				// 	if (isControllableSettings) {
				// 		processProxy();
				// 	}

				// }

				console.log(details);

				var proxy_server = {
					host : 'azbn.ru',
					port : 19128,
				};

				chrome.proxy.settings.set({
					value : {
						//_mode : 'system',
						mode : 'fixed_servers',
						rules : {
							//The proxy.ProxyRules object can contain either a singleProxy attribute or a subset of proxyForHttp, proxyForHttps, proxyForFtp, and fallbackProxy.
							singleProxy : proxy_server,
							// bypassList : [
							// 	'yandex.ru',
							// ],
						}
					},
					scope : scope,
				}, function() {
					console.log('Proxy!');
				});

				/*
				chrome.proxy.settings.set({value: config, scope: 'regular'}, function() {
					console.log('Proxy has been set');

					chrome.browsingData.removeCache({since:getOneDayAgoTimestamp()}, function() {
						console.log('Cache has been cleared');

						chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
							tabs.forEach(function(tab) {
								if (tab.url && isProxyHost(tab.url, proxyHosts)) {
									chrome.tabs.reload(tab.id);
									console.log('Active tab has been reloaded');
								}
							});
						});
					});
				});
				*/

			});

		} else {
			
			

		}
	}

	// setProxy();

})();