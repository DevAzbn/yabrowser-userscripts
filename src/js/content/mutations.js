'use strict';

var imgURL = chrome.runtime.getURL('img/');

(function($){

	//console.log('ext loaded');
	//console.log(window.location.href);

	(function(){
		
		if(/lotinfo\.ru/i.test(window.location.hostname)) {
			var items = $('.extInstall');

			if(items.length) {
				items.remove();
			}
		}

	})();

	(function(){
		
		if(/cian\.ru/i.test(window.location.hostname)) {

			var reFind = function(str, re) {

				var r = str.match(re);
				if (r && r.length && r[1]) {
					if(!r[2]) {
						return r[1];
					} else {
						var a = [];
						for(var i = 1; i < r.length; i++) {
							a.push(r[i]);
						}
						return a;
					}
				} else {
					return null;
				}

			};
			
			var items = $('[data-mark="GKCard"]');

			if(items.length) {
				items.each(function(){

					var item = $(this);

					var a = item.children('[class*="-container-"]').eq(1).find('a[data-mark="Link"][href][class*="-element-"]').eq(0);

					if(a && a.length) {
						
						var t = a.find('span[data-mark="Text"]');

						var href = a.attr('href');
						let external_id = reFind(href, /\-([0-9]{1,})\/$/i);
						
						if(t && t.length) {
							t.each(function() {
								
								var _s = $(this);

								console.log(a.attr('href'), external_id, _s.text().trim());

							});
						}
					}

				});
			}
		}

	})();

	(function(){
		
		if(/hh\.ru/i.test(window.location.hostname)) {
			
			var res = {};
			var ls = $('a[href*="/resume/"]');//$('div[data-hh-resume-hash]');

			ls.each(function(){
				var l = $(this);
				var div = l.closest('[data-hh-resume-hash]');
				if(div) {
					
					var o = {};
					var uid = div.attr('data-hh-resume-hash') || '';

					if(uid && uid != '') {
						
						if(uid in res) {
							
						} else {

							o.uid = div.attr('data-hh-resume-hash') || '';

							var name_div = div.find('.resume-search-item__fullname').eq(0);
							if(name_div && name_div != '') {
								o.name = name_div.text().trim();
								o.link = '/resume_converter/' + o.name + '.doc?hash=' + o.uid + '&type=rtf&hhtmSource=resume_view&hhtmFrom=resume_search_result';
							}

							res[o.uid] = o;

						}

					}

				}
			});

			if(Object.keys(res).length) {
				if(confirm('Найдено вакансий: ' + Object.keys(res).length + '. Скачать их 1?')) {
					var _i = 1;
					for(var i in res) {
						_i++;
						(function(index, counter){

							var _o = res[index];
							setTimeout(function() {
								
								
								// window.open(_o.link, _o.uid);

								var ifr = $('<iframe />', {
									src : _o.link,
									id :  '_' + _o.uid,
									frameborder : 0,
									scrolling : 'no',
								});
								ifr.appendTo($(document.body));


							}, (counter * 1111));

						})(i, _i);
					}
				}
			}

		}
	
	})();

})(jQuery);


/*
<div
data-mark="GKCard"
data-id="gk_card_odd"
class="_0fce717cdb--container--1Gxqr _0fce717cdb--container-background_color--transparent--3pvxk _0fce717cdb--container-display--flex--1HC_d _0fce717cdb--container-border_top_width--0--3VkCa _0fce717cdb--container-border_bottom_width--1--2lVYP _0fce717cdb--container-border_left_width--0--3aE-Z _0fce717cdb--container-border_right_width--0--3xhvh _0fce717cdb--container-border_color--gray_1--3xElu _0fce717cdb--container-justify_content--space-between--21cQu _0fce717cdb--container-break_inside_avoid--11K_O" style="border-style:solid;padding:16px 20px 12px"><div class="_0fce717cdb--container--1Gxqr _0fce717cdb--container-background_color--transparent--3pvxk _0fce717cdb--container-display--block--2QSxe _0fce717cdb--container-position--relative--p71Ml"
>
</div>
*/



/*
Request URL: https://orel.cian.ru/cian-api/site/v1/offers/search/
Request Method: POST
Status Code: 200 OK
Remote Address: 82.202.244.46:443
Referrer Policy: no-referrer-when-downgrade
Access-Control-Allow-Origin: https://orel.cian.ru
Connection: keep-alive
Content-Encoding: gzip
Content-Security-Policy: default-src https:; child-src https:; connect-src https: wss:; form-action https:; frame-ancestors https: http://webvisor.com; media-src https:; object-src https:; img-src https: data: blob:; script-src https: data: 'unsafe-inline' 'unsafe-eval'; style-src https: 'unsafe-inline'; font-src https: data:; report-uri /ajax/csp-report/
Content-Type: application/json
Date: Thu, 21 Mar 2019 08:16:02 GMT
Server: nginx
Set-Cookie: session_main_town_region_id=175604; Domain=.cian.ru; Path=/
Set-Cookie: session_region_id=4601; Domain=.cian.ru; Path=/
Transfer-Encoding: chunked
Vary: Cookie, User-Agent
X-Application: monolith-python
X-Flavour: default;full
X-McsRunEnv: PROD
X-Provided-By: py-27.msk.cian.ru
X-Version: [cian][BUILD-2690][266b15de]
Accept: * /*
Accept-Encoding: gzip, deflate, br
Accept-Language: ru,en;q=0.9
Connection: keep-alive
Content-Length: 307
Content-Type: application/json
Cookie: _CIAN_GK=d48123e9-efe6-46d0-bdf4-6699002762e8; _gcl_au=1.1.1570808157.1550123581; _ga=GA1.2.294381571.1550123581; _ym_uid=1550123581914828727; _ym_d=1550123581; cto_lwid=041fdd98-442a-482a-ab7f-aa2c68ba550c; _fbp=fb.1.1550123581533.245895661; __zzat140=MDA0dBA=Fz2+aQ==; pview=2; flocktory-uuid=d4c4a624-e949-493a-a6f1-6c6bfdd9f317-2; rrpvid=7215110653896; rcuid=5c6505520fcd2c0001d2a1a5; rrlpuid=; cian-subscription-popup-hidden-till=1552393011637; cian-subscription-popup-hidden-for-queries=%5B%7B%22region%22%3A%7B%22type%22%3A%22terms%22%2C%22value%22%3A%5B175604%5D%7D%2C%22_type%22%3A%22flatsale%22%2C%22geo%22%3A%7B%22type%22%3A%22geo%22%2C%22value%22%3A%5B%7B%22type%22%3A%22street%22%2C%22id%22%3A268835%7D%5D%7D%2C%22engine_version%22%3A%7B%22type%22%3A%22term%22%2C%22value%22%3A2%7D%7D%5D; newobject_active=1; newobject_all=1; countCallNowPopupShowed=1:1552364347072; DeviceId_13055007=3511362e-08ab-4112-8b8a-f8dd43e096e5; DMIR_AUTH=kfOpT1ts+yUdaLxyFX+9Jz+/c4OHR/NHWbPz5KW3a2sj9za+5tWcTcDgwvddio6XvLAQJOpQonIDYUZSrd0B24JVrQ/BVPe7+mltLOhxHtzOk9tiC346vKtvqqlrxaTmiJwuQGE/0VqGKd6HoWN6n0tPdI5pdkYDqMZQmvOrQ/w=; cian_ruid=13055007; __ssid=aff6bf9b6bfd6c53c90cddb916a44b5; userLoginAsAgent=1; seen_pins_compressed=IwBgrAnATGB0UgBwBoDsDitmALFIA; _gid=GA1.2.2074952325.1553073327; hide_onboarding=1; cto_idcpy=1f79c7e9-c413-41d8-855f-94e6487f435a; criteo_cookie_header=1; _ym_isad=2; session_region_id=4601; session_main_town_region_id=175604; cookieUserID=13055007; cfids140=XaFbqZ7x0pK/o7xKCH8IEBSe0AjyMvLjJ/hkN1MnpeXW8TPnIIz4D60Jumqi2SaEedl51PiTk/LAfuEZkDVYGZP4yB+FR1jFVMODYoXZO2IfubTnGLBGB3jgyJAcdgAefPQm4MP13Me8yAHklXMDAat3rvOlxfCdncOxwekp4Cw=; rheftjdd=rheftjddVal; newobject_scount=6; newobject_session=session; serp_view_mode=list; jview=8; tmr_detect=0%7C1553156110060
DNT: 1
Host: orel.cian.ru
Origin: https://orel.cian.ru
Referer: https://orel.cian.ru/zhiloy-kompleks-ul-ignatova-37-orel-55968/
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.99 YaBrowser/19.1.0.2494 (beta) Yowser/2.5 Safari/537.36
{
	building_status: {type: "term", value: 2}
	developer_sort_type: {type: "term", value: "price_asc"}
	engine_version: {type: "term", value: 2}
	from_developer: {type: "term", value: true}
	geo: {type: "geo", value: [{type: "newobject", id: 55968}]}
	page: {type: "term", value: 2}
	_type: "flatsale"
}
*/

/*
{
  "status": "ok",
  "data": {
    "offerIds": [
      200698110,
      200698066,
      200698116,
      200698144,
      200698085,
      203291737,
      200698075,
      200698118,
      200698048,
      200698136,
      200698139,
      200698130,
      200698141,
      202361669,
      203193116
    ],
    "isTable": false,
    "similarOffersCount": 0,
    "title": "Купить квартиру в Орловской области — 40 объявлений",
    "url": "/cat.php?deal_type=sale&engine_version=2&from_developer=1&newobject%5B0%5D=55968&object_type%5B0%5D=2&offer_type=flat&p=2",
    "breadcrumbs": [
      {
        "url": "https://orel.cian.ru/",
        "title": "Недвижимость в Орле"
      },
      {
        "url": "https://orel.cian.ru/novostrojki/",
        "title": "Новостройки"
      },
      {
        "url": "https://orel.cian.ru/novostroyki/",
        "title": "Новостройки в Орле"
      },
      {
        "url": "https://orel.cian.ru/novostroyki-orlovskaya-oblast-orel-ulica-ignatova-02268503/",
        "title": "улица Игнатова"
      }
    ],
    "bsCenterListUrl": null,
    "h1": "Купить квартиру в Орловской области",
    "offerCount": 40,
    "offersSerialized": {
      "200698048": {
        "status": "published",
        "is_excluded_from_action": false,
        "newbuilding": {
          "showJkReliableFlag": true,
          "isFromDeveloper": true,
          "name": "Ул. Игнатова 37",
          "reliableStatus": "reliable",
          "isFromBuilder": true,
          "house": {
            "isFinished": false,
            "finishDate": {
              "quarter": 2,
              "year": 2020
            },
            "id": 580625,
            "reliableStatus": "reliable",
            "name": "Ул. Игнатова 37"
          },
          "id": "55968",
          "newbuildingFeatures": {
            "imagesCount": 6,
            "firstImageUrl": "https://cdn-p.cian.site/images/0/140/126/ul-ignatova-37-orel-jk-621041032-6.jpg",
            "deadlineInfo": "Сдача в 2 кв. 2020",
            "videosCount": 0
          },
          "isFromSeller": true
        },
        "isByHomeowner": null,
        "floors_count": 16,
        "top3": false,
        "highways": [],
        "colorized": false,
        "deadline": {
          "quarter": 2,
          "is_complete": false,
          "year": 2020
        },
        "basic_profi_score": 1,
        "deal_type": "sale",
        "category": 113,
        "id": 200698048,
        "default_photo_index": 0,
        "showCallbackButton": true,
        "floor": 16,
        "realty_id": 200698048,
        "bedrooms_count": null,
        "note": {
          "text": "",
          "api": [
            "/ajax/sale/flat/notes"
          ]
        },
        "is_new_multioffer": false,
        "isDemolishedInMoscowProgramm": null,
        "underground": [],
        "from_developer": true,
        "work_time_info": {
          "timezone_text": "Московскому",
          "call_to": "19",
          "is_available": true,
          "call_from": "9",
          "user_id": 13465792
        },
        "isInHiddenBase": false,
        "can_booking": null,
        "added": {
          "strict": "сегодня, 01:58",
          "humanized": "9 часов назад"
        },
        "premium": {
          "state": false
        },
        "description": "Продается 2-комнатная квартира, в строящемся доме (Ул. Игнатова 37), срок сдачи: II-кв. 2020, общей площадью 62.00 кв.м., на 16 этаже. Жилой многоквартирный дом по адресу г. Орел, ул. Игнатова 37.\n\nВ пешей доступности школа и детский сад. Орловский юридический институт МВД России, Академия ФСО РФ.\n\nКвартиры с улучшенно отделкой класса \"Комфорт\".\nРасположение в непосредственной близости к центру города.\nРазвитая инфраструктура и транспортная доступность.",
        "promo": null,
        "total_area": 62,
        "price": {
          "rur": 2659800
        },
        "address_string": [
          "Орловская область, Орел, ул. Игнатова, 37"
        ],
        "phone": "+7 804 555-13-34",
        "export": {
          "pdf": {
            "link": "/export/pdf/sale/flat/200698048/"
          },
          "docx": {
            "link": "/export/docx/sale/flat/200698048/"
          }
        },
        "link": "/sale/flat/200698048/",
        "phone_data_layer": {
          "category": "sale/flat_new",
          "brand": "13465792/developer",
          "variant": "paid",
          "id": 200698048,
          "position": 34,
          "price": 2659800,
          "quantity": 1
        },
        "offer_type": "flat",
        "complain": {
          "text": "",
          "api": "/ajax/complaints/add/"
        },
        "rooms_count": 2,
        "center": [
          52.9897,
          36.059552
        ],
        "photos": [
          {
            "thumb": "https://cdn-p.cian.site/images/7/324/236/632423721-2.jpg",
            "img": "https://cdn-p.cian.site/images/7/324/236/632423721-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/7/324/236/632423764-2.jpg",
            "img": "https://cdn-p.cian.site/images/7/324/236/632423764-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/8/324/236/632423804-2.jpg",
            "img": "https://cdn-p.cian.site/images/8/324/236/632423804-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/8/324/236/632423848-2.jpg",
            "img": "https://cdn-p.cian.site/images/8/324/236/632423848-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/8/324/236/632423894-2.jpg",
            "img": "https://cdn-p.cian.site/images/8/324/236/632423894-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/9/324/236/632423956-2.jpg",
            "img": "https://cdn-p.cian.site/images/9/324/236/632423956-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/0/424/236/632424012-2.jpg",
            "img": "https://cdn-p.cian.site/images/0/424/236/632424012-2.jpg"
          }
        ],
        "is_primary": true,
        "client_fee": null,
        "favorite": {
          "state": false,
          "api": "/ajax/sale/flat/favorites"
        },
        "ga_event_action": "/sale/flat/mo_id=0/obl_id=4601/city_id=175604/object_type=2/ga_obj_type=2/spec=company/200698048/from_developer=1/repres=0/owner=0/pod_snos=0/nv=1/",
        "multi_count": 0,
        "deposit": null,
        "is_payed": true,
        "show_recidivist_popup": false,
        "agent_fee": null,
        "new_object_id": 55968,
        "user": {
          "rating": {
            "state": "neutral",
            "api": "/ajax/sale/flat/realtor_ratings"
          },
          "name": "Орелстрой",
          "cianId": 13465792,
          "phones": [
            {
              "number": "8045551334",
              "country_code": "+7"
            }
          ],
          "note": {
            "text": "",
            "api": "/ajax/sale/flat/realtor_notes"
          },
          "link": "/cat.php?id_user=13465792&deal_type=2&flat=yes&engine_version=2",
          "is_fairplay": false,
          "trust": 0,
          "id": 13465792
        }
      },
      "200698066": {
        "status": "published",
        "is_excluded_from_action": false,
        "newbuilding": {
          "showJkReliableFlag": true,
          "isFromDeveloper": true,
          "name": "Ул. Игнатова 37",
          "reliableStatus": "reliable",
          "isFromBuilder": true,
          "house": {
            "isFinished": false,
            "finishDate": {
              "quarter": 2,
              "year": 2020
            },
            "id": 580625,
            "reliableStatus": "reliable",
            "name": "Ул. Игнатова 37"
          },
          "id": "55968",
          "newbuildingFeatures": {
            "imagesCount": 6,
            "firstImageUrl": "https://cdn-p.cian.site/images/0/140/126/ul-ignatova-37-orel-jk-621041032-6.jpg",
            "deadlineInfo": "Сдача в 2 кв. 2020",
            "videosCount": 0
          },
          "isFromSeller": true
        },
        "isByHomeowner": null,
        "floors_count": 16,
        "top3": false,
        "highways": [],
        "colorized": false,
        "deadline": {
          "quarter": 2,
          "is_complete": false,
          "year": 2020
        },
        "basic_profi_score": 1,
        "deal_type": "sale",
        "category": 113,
        "id": 200698066,
        "default_photo_index": 0,
        "showCallbackButton": true,
        "floor": 10,
        "realty_id": 200698066,
        "bedrooms_count": null,
        "note": {
          "text": "",
          "api": [
            "/ajax/sale/flat/notes"
          ]
        },
        "is_new_multioffer": false,
        "isDemolishedInMoscowProgramm": null,
        "underground": [],
        "from_developer": true,
        "work_time_info": {
          "timezone_text": "Московскому",
          "call_to": "19",
          "is_available": true,
          "call_from": "9",
          "user_id": 13465792
        },
        "isInHiddenBase": false,
        "can_booking": null,
        "added": {
          "strict": "вчера, 22:36",
          "humanized": "вчера"
        },
        "premium": {
          "state": false
        },
        "description": "Продается 2-комнатная квартира, в строящемся доме (Ул. Игнатова 37), срок сдачи: II-кв. 2020, общей площадью 60.80 кв.м., на 10 этаже. Жилой многоквартирный дом по адресу г. Орел, ул. Игнатова 37.\n\nВ пешей доступности школа и детский сад. Орловский юридический институт МВД России, Академия ФСО РФ.\n\nКвартиры с улучшенно отделкой класса \"Комфорт\".\nРасположение в непосредственной близости к центру города.\nРазвитая инфраструктура и транспортная доступность.",
        "promo": null,
        "total_area": 60.8,
        "price": {
          "rur": 2620480
        },
        "address_string": [
          "Орловская область, Орел, ул. Игнатова, 37"
        ],
        "phone": "+7 804 555-13-34",
        "export": {
          "pdf": {
            "link": "/export/pdf/sale/flat/200698066/"
          },
          "docx": {
            "link": "/export/docx/sale/flat/200698066/"
          }
        },
        "link": "/sale/flat/200698066/",
        "phone_data_layer": {
          "category": "sale/flat_new",
          "brand": "13465792/developer",
          "variant": "paid",
          "id": 200698066,
          "position": 27,
          "price": 2620480,
          "quantity": 1
        },
        "offer_type": "flat",
        "complain": {
          "text": "",
          "api": "/ajax/complaints/add/"
        },
        "rooms_count": 2,
        "center": [
          52.9897,
          36.059552
        ],
        "photos": [
          {
            "thumb": "https://cdn-p.cian.site/images/7/324/236/632423727-2.jpg",
            "img": "https://cdn-p.cian.site/images/7/324/236/632423727-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/7/324/236/632423765-2.jpg",
            "img": "https://cdn-p.cian.site/images/7/324/236/632423765-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/8/324/236/632423809-2.jpg",
            "img": "https://cdn-p.cian.site/images/8/324/236/632423809-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/8/324/236/632423860-2.jpg",
            "img": "https://cdn-p.cian.site/images/8/324/236/632423860-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/9/324/236/632423904-2.jpg",
            "img": "https://cdn-p.cian.site/images/9/324/236/632423904-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/9/324/236/632423939-2.jpg",
            "img": "https://cdn-p.cian.site/images/9/324/236/632423939-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/9/324/236/632423983-2.jpg",
            "img": "https://cdn-p.cian.site/images/9/324/236/632423983-2.jpg"
          }
        ],
        "is_primary": true,
        "client_fee": null,
        "favorite": {
          "state": false,
          "api": "/ajax/sale/flat/favorites"
        },
        "ga_event_action": "/sale/flat/mo_id=0/obl_id=4601/city_id=175604/object_type=2/ga_obj_type=2/spec=company/200698066/from_developer=1/repres=0/owner=0/pod_snos=0/nv=1/",
        "multi_count": 0,
        "deposit": null,
        "is_payed": true,
        "show_recidivist_popup": false,
        "agent_fee": null,
        "new_object_id": 55968,
        "user": {
          "rating": {
            "state": "neutral",
            "api": "/ajax/sale/flat/realtor_ratings"
          },
          "name": "Орелстрой",
          "cianId": 13465792,
          "phones": [
            {
              "number": "8045551334",
              "country_code": "+7"
            }
          ],
          "note": {
            "text": "",
            "api": "/ajax/sale/flat/realtor_notes"
          },
          "link": "/cat.php?id_user=13465792&deal_type=2&flat=yes&engine_version=2",
          "is_fairplay": false,
          "trust": 0,
          "id": 13465792
        }
      },
      "200698075": {
        "status": "published",
        "is_excluded_from_action": false,
        "newbuilding": {
          "showJkReliableFlag": true,
          "isFromDeveloper": true,
          "name": "Ул. Игнатова 37",
          "reliableStatus": "reliable",
          "isFromBuilder": true,
          "house": {
            "isFinished": false,
            "finishDate": {
              "quarter": 2,
              "year": 2020
            },
            "id": 580625,
            "reliableStatus": "reliable",
            "name": "Ул. Игнатова 37"
          },
          "id": "55968",
          "newbuildingFeatures": {
            "imagesCount": 6,
            "firstImageUrl": "https://cdn-p.cian.site/images/0/140/126/ul-ignatova-37-orel-jk-621041032-6.jpg",
            "deadlineInfo": "Сдача в 2 кв. 2020",
            "videosCount": 0
          },
          "isFromSeller": true
        },
        "isByHomeowner": null,
        "floors_count": 16,
        "top3": false,
        "highways": [],
        "colorized": false,
        "deadline": {
          "quarter": 2,
          "is_complete": false,
          "year": 2020
        },
        "basic_profi_score": 1,
        "deal_type": "sale",
        "category": 113,
        "id": 200698075,
        "default_photo_index": 0,
        "showCallbackButton": true,
        "floor": 6,
        "realty_id": 200698075,
        "bedrooms_count": null,
        "note": {
          "text": "",
          "api": [
            "/ajax/sale/flat/notes"
          ]
        },
        "is_new_multioffer": false,
        "isDemolishedInMoscowProgramm": null,
        "underground": [],
        "from_developer": true,
        "work_time_info": {
          "timezone_text": "Московскому",
          "call_to": "19",
          "is_available": true,
          "call_from": "9",
          "user_id": 13465792
        },
        "isInHiddenBase": false,
        "can_booking": null,
        "added": {
          "strict": "вчера, 22:36",
          "humanized": "вчера"
        },
        "premium": {
          "state": false
        },
        "description": "Продается 2-комнатная квартира, в строящемся доме (Ул. Игнатова 37), срок сдачи: II-кв. 2020, общей площадью 60.90 кв.м., на 6 этаже. Жилой многоквартирный дом по адресу г. Орел, ул. Игнатова 37.\n\nВ пешей доступности школа и детский сад. Орловский юридический институт МВД России, Академия ФСО РФ.\n\nКвартиры с улучшенно отделкой класса \"Комфорт\".\nРасположение в непосредственной близости к центру города.\nРазвитая инфраструктура и транспортная доступность.",
        "promo": null,
        "total_area": 60.9,
        "price": {
          "rur": 2655240
        },
        "address_string": [
          "Орловская область, Орел, ул. Игнатова, 37"
        ],
        "phone": "+7 804 555-13-34",
        "export": {
          "pdf": {
            "link": "/export/pdf/sale/flat/200698075/"
          },
          "docx": {
            "link": "/export/docx/sale/flat/200698075/"
          }
        },
        "link": "/sale/flat/200698075/",
        "phone_data_layer": {
          "category": "sale/flat_new",
          "brand": "13465792/developer",
          "variant": "paid",
          "id": 200698075,
          "position": 32,
          "price": 2655240,
          "quantity": 1
        },
        "offer_type": "flat",
        "complain": {
          "text": "",
          "api": "/ajax/complaints/add/"
        },
        "rooms_count": 2,
        "center": [
          52.9897,
          36.059552
        ],
        "photos": [
          {
            "thumb": "https://cdn-p.cian.site/images/7/324/236/632423743-2.jpg",
            "img": "https://cdn-p.cian.site/images/7/324/236/632423743-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/7/324/236/632423777-2.jpg",
            "img": "https://cdn-p.cian.site/images/7/324/236/632423777-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/8/324/236/632423834-2.jpg",
            "img": "https://cdn-p.cian.site/images/8/324/236/632423834-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/8/324/236/632423880-2.jpg",
            "img": "https://cdn-p.cian.site/images/8/324/236/632423880-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/9/324/236/632423926-2.jpg",
            "img": "https://cdn-p.cian.site/images/9/324/236/632423926-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/9/324/236/632423971-2.jpg",
            "img": "https://cdn-p.cian.site/images/9/324/236/632423971-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/0/424/236/632424010-2.jpg",
            "img": "https://cdn-p.cian.site/images/0/424/236/632424010-2.jpg"
          }
        ],
        "is_primary": true,
        "client_fee": null,
        "favorite": {
          "state": false,
          "api": "/ajax/sale/flat/favorites"
        },
        "ga_event_action": "/sale/flat/mo_id=0/obl_id=4601/city_id=175604/object_type=2/ga_obj_type=2/spec=company/200698075/from_developer=1/repres=0/owner=0/pod_snos=0/nv=1/",
        "multi_count": 0,
        "deposit": null,
        "is_payed": true,
        "show_recidivist_popup": false,
        "agent_fee": null,
        "new_object_id": 55968,
        "user": {
          "rating": {
            "state": "neutral",
            "api": "/ajax/sale/flat/realtor_ratings"
          },
          "name": "Орелстрой",
          "cianId": 13465792,
          "phones": [
            {
              "number": "8045551334",
              "country_code": "+7"
            }
          ],
          "note": {
            "text": "",
            "api": "/ajax/sale/flat/realtor_notes"
          },
          "link": "/cat.php?id_user=13465792&deal_type=2&flat=yes&engine_version=2",
          "is_fairplay": false,
          "trust": 0,
          "id": 13465792
        }
      },
      "200698085": {
        "status": "published",
        "is_excluded_from_action": false,
        "newbuilding": {
          "showJkReliableFlag": true,
          "isFromDeveloper": true,
          "name": "Ул. Игнатова 37",
          "reliableStatus": "reliable",
          "isFromBuilder": true,
          "house": {
            "isFinished": false,
            "finishDate": {
              "quarter": 2,
              "year": 2020
            },
            "id": 580625,
            "reliableStatus": "reliable",
            "name": "Ул. Игнатова 37"
          },
          "id": "55968",
          "newbuildingFeatures": {
            "imagesCount": 6,
            "firstImageUrl": "https://cdn-p.cian.site/images/0/140/126/ul-ignatova-37-orel-jk-621041032-6.jpg",
            "deadlineInfo": "Сдача в 2 кв. 2020",
            "videosCount": 0
          },
          "isFromSeller": true
        },
        "isByHomeowner": null,
        "floors_count": 16,
        "top3": false,
        "highways": [],
        "colorized": false,
        "deadline": {
          "quarter": 2,
          "is_complete": false,
          "year": 2020
        },
        "basic_profi_score": 1,
        "deal_type": "sale",
        "category": 113,
        "id": 200698085,
        "default_photo_index": 0,
        "showCallbackButton": true,
        "floor": 1,
        "realty_id": 200698085,
        "bedrooms_count": null,
        "note": {
          "text": "",
          "api": [
            "/ajax/sale/flat/notes"
          ]
        },
        "is_new_multioffer": false,
        "isDemolishedInMoscowProgramm": null,
        "underground": [],
        "from_developer": true,
        "work_time_info": {
          "timezone_text": "Московскому",
          "call_to": "19",
          "is_available": true,
          "call_from": "9",
          "user_id": 13465792
        },
        "isInHiddenBase": false,
        "can_booking": null,
        "added": {
          "strict": "вчера, 22:36",
          "humanized": "вчера"
        },
        "premium": {
          "state": false
        },
        "description": "Продается 2-комнатная квартира, в строящемся доме (Ул. Игнатова 37), срок сдачи: II-кв. 2020, общей площадью 62.30 кв.м., на 1 этаже. Жилой многоквартирный дом по адресу г. Орел, ул. Игнатова 37.\n\nВ пешей доступности школа и детский сад. Орловский юридический институт МВД России, Академия ФСО РФ.\n\nКвартиры с улучшенно отделкой класса \"Комфорт\".\nРасположение в непосредственной близости к центру города.\nРазвитая инфраструктура и транспортная доступность.",
        "promo": null,
        "total_area": 62.3,
        "price": {
          "rur": 2641520
        },
        "address_string": [
          "Орловская область, Орел, ул. Игнатова, 37"
        ],
        "phone": "+7 804 555-13-34",
        "export": {
          "pdf": {
            "link": "/export/pdf/sale/flat/200698085/"
          },
          "docx": {
            "link": "/export/docx/sale/flat/200698085/"
          }
        },
        "link": "/sale/flat/200698085/",
        "phone_data_layer": {
          "category": "sale/flat_new",
          "brand": "13465792/developer",
          "variant": "paid",
          "id": 200698085,
          "position": 30,
          "price": 2641520,
          "quantity": 1
        },
        "offer_type": "flat",
        "complain": {
          "text": "",
          "api": "/ajax/complaints/add/"
        },
        "rooms_count": 2,
        "center": [
          52.9897,
          36.059552
        ],
        "photos": [
          {
            "thumb": "https://cdn-p.cian.site/images/7/324/236/632423757-2.jpg",
            "img": "https://cdn-p.cian.site/images/7/324/236/632423757-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/8/324/236/632423837-2.jpg",
            "img": "https://cdn-p.cian.site/images/8/324/236/632423837-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/8/324/236/632423888-2.jpg",
            "img": "https://cdn-p.cian.site/images/8/324/236/632423888-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/9/324/236/632423930-2.jpg",
            "img": "https://cdn-p.cian.site/images/9/324/236/632423930-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/9/324/236/632423967-2.jpg",
            "img": "https://cdn-p.cian.site/images/9/324/236/632423967-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/0/424/236/632424008-2.jpg",
            "img": "https://cdn-p.cian.site/images/0/424/236/632424008-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/0/424/236/632424038-2.jpg",
            "img": "https://cdn-p.cian.site/images/0/424/236/632424038-2.jpg"
          }
        ],
        "is_primary": true,
        "client_fee": null,
        "favorite": {
          "state": false,
          "api": "/ajax/sale/flat/favorites"
        },
        "ga_event_action": "/sale/flat/mo_id=0/obl_id=4601/city_id=175604/object_type=2/ga_obj_type=2/spec=company/200698085/from_developer=1/repres=0/owner=0/pod_snos=0/nv=1/",
        "multi_count": 0,
        "deposit": null,
        "is_payed": true,
        "show_recidivist_popup": false,
        "agent_fee": null,
        "new_object_id": 55968,
        "user": {
          "rating": {
            "state": "neutral",
            "api": "/ajax/sale/flat/realtor_ratings"
          },
          "name": "Орелстрой",
          "cianId": 13465792,
          "phones": [
            {
              "number": "8045551334",
              "country_code": "+7"
            }
          ],
          "note": {
            "text": "",
            "api": "/ajax/sale/flat/realtor_notes"
          },
          "link": "/cat.php?id_user=13465792&deal_type=2&flat=yes&engine_version=2",
          "is_fairplay": false,
          "trust": 0,
          "id": 13465792
        }
      },
      "200698110": {
        "status": "published",
        "is_excluded_from_action": false,
        "newbuilding": {
          "showJkReliableFlag": true,
          "isFromDeveloper": true,
          "name": "Ул. Игнатова 37",
          "reliableStatus": "reliable",
          "isFromBuilder": true,
          "house": {
            "isFinished": false,
            "finishDate": {
              "quarter": 2,
              "year": 2020
            },
            "id": 580625,
            "reliableStatus": "reliable",
            "name": "Ул. Игнатова 37"
          },
          "id": "55968",
          "newbuildingFeatures": {
            "imagesCount": 6,
            "firstImageUrl": "https://cdn-p.cian.site/images/0/140/126/ul-ignatova-37-orel-jk-621041032-6.jpg",
            "deadlineInfo": "Сдача в 2 кв. 2020",
            "videosCount": 0
          },
          "isFromSeller": true
        },
        "isByHomeowner": null,
        "floors_count": 16,
        "top3": false,
        "highways": [],
        "colorized": false,
        "deadline": {
          "quarter": 2,
          "is_complete": false,
          "year": 2020
        },
        "basic_profi_score": 1,
        "deal_type": "sale",
        "category": 113,
        "id": 200698110,
        "default_photo_index": 0,
        "showCallbackButton": true,
        "floor": 11,
        "realty_id": 200698110,
        "bedrooms_count": null,
        "note": {
          "text": "",
          "api": [
            "/ajax/sale/flat/notes"
          ]
        },
        "is_new_multioffer": false,
        "isDemolishedInMoscowProgramm": null,
        "underground": [],
        "from_developer": true,
        "work_time_info": {
          "timezone_text": "Московскому",
          "call_to": "19",
          "is_available": true,
          "call_from": "9",
          "user_id": 13465792
        },
        "isInHiddenBase": false,
        "can_booking": null,
        "added": {
          "strict": "вчера, 22:36",
          "humanized": "вчера"
        },
        "premium": {
          "state": false
        },
        "description": "Продается 2-комнатная квартира, в строящемся доме (Ул. Игнатова 37), срок сдачи: II-кв. 2020, общей площадью 60.80 кв.м., на 11 этаже. Жилой многоквартирный дом по адресу г. Орел, ул. Игнатова 37.\n\nВ пешей доступности школа и детский сад. Орловский юридический институт МВД России, Академия ФСО РФ.\n\nКвартиры с улучшенно отделкой класса \"Комфорт\".\nРасположение в непосредственной близости к центру города.\nРазвитая инфраструктура и транспортная доступность.",
        "promo": null,
        "total_area": 60.8,
        "price": {
          "rur": 2620480
        },
        "address_string": [
          "Орловская область, Орел, ул. Игнатова, 37"
        ],
        "phone": "+7 804 555-13-34",
        "export": {
          "pdf": {
            "link": "/export/pdf/sale/flat/200698110/"
          },
          "docx": {
            "link": "/export/docx/sale/flat/200698110/"
          }
        },
        "link": "/sale/flat/200698110/",
        "phone_data_layer": {
          "category": "sale/flat_new",
          "brand": "13465792/developer",
          "variant": "paid",
          "id": 200698110,
          "position": 26,
          "price": 2620480,
          "quantity": 1
        },
        "offer_type": "flat",
        "complain": {
          "text": "",
          "api": "/ajax/complaints/add/"
        },
        "rooms_count": 2,
        "center": [
          52.9897,
          36.059552
        ],
        "photos": [
          {
            "thumb": "https://cdn-p.cian.site/images/2/424/236/632424207-2.jpg",
            "img": "https://cdn-p.cian.site/images/2/424/236/632424207-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/2/424/236/632424290-2.jpg",
            "img": "https://cdn-p.cian.site/images/2/424/236/632424290-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/3/424/236/632424318-2.jpg",
            "img": "https://cdn-p.cian.site/images/3/424/236/632424318-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/3/424/236/632424360-2.jpg",
            "img": "https://cdn-p.cian.site/images/3/424/236/632424360-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/4/424/236/632424440-2.jpg",
            "img": "https://cdn-p.cian.site/images/4/424/236/632424440-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/4/424/236/632424464-2.jpg",
            "img": "https://cdn-p.cian.site/images/4/424/236/632424464-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/4/424/236/632424469-2.jpg",
            "img": "https://cdn-p.cian.site/images/4/424/236/632424469-2.jpg"
          }
        ],
        "is_primary": true,
        "client_fee": null,
        "favorite": {
          "state": false,
          "api": "/ajax/sale/flat/favorites"
        },
        "ga_event_action": "/sale/flat/mo_id=0/obl_id=4601/city_id=175604/object_type=2/ga_obj_type=2/spec=company/200698110/from_developer=1/repres=0/owner=0/pod_snos=0/nv=1/",
        "multi_count": 0,
        "deposit": null,
        "is_payed": true,
        "show_recidivist_popup": false,
        "agent_fee": null,
        "new_object_id": 55968,
        "user": {
          "rating": {
            "state": "neutral",
            "api": "/ajax/sale/flat/realtor_ratings"
          },
          "name": "Орелстрой",
          "cianId": 13465792,
          "phones": [
            {
              "number": "8045551334",
              "country_code": "+7"
            }
          ],
          "note": {
            "text": "",
            "api": "/ajax/sale/flat/realtor_notes"
          },
          "link": "/cat.php?id_user=13465792&deal_type=2&flat=yes&engine_version=2",
          "is_fairplay": false,
          "trust": 0,
          "id": 13465792
        }
      },
      "200698116": {
        "status": "published",
        "is_excluded_from_action": false,
        "newbuilding": {
          "showJkReliableFlag": true,
          "isFromDeveloper": true,
          "name": "Ул. Игнатова 37",
          "reliableStatus": "reliable",
          "isFromBuilder": true,
          "house": {
            "isFinished": false,
            "finishDate": {
              "quarter": 2,
              "year": 2020
            },
            "id": 580625,
            "reliableStatus": "reliable",
            "name": "Ул. Игнатова 37"
          },
          "id": "55968",
          "newbuildingFeatures": {
            "imagesCount": 6,
            "firstImageUrl": "https://cdn-p.cian.site/images/0/140/126/ul-ignatova-37-orel-jk-621041032-6.jpg",
            "deadlineInfo": "Сдача в 2 кв. 2020",
            "videosCount": 0
          },
          "isFromSeller": true
        },
        "isByHomeowner": null,
        "floors_count": 16,
        "top3": false,
        "highways": [],
        "colorized": false,
        "deadline": {
          "quarter": 2,
          "is_complete": false,
          "year": 2020
        },
        "basic_profi_score": 1,
        "deal_type": "sale",
        "category": 113,
        "id": 200698116,
        "default_photo_index": 0,
        "showCallbackButton": true,
        "floor": 9,
        "realty_id": 200698116,
        "bedrooms_count": null,
        "note": {
          "text": "",
          "api": [
            "/ajax/sale/flat/notes"
          ]
        },
        "is_new_multioffer": false,
        "isDemolishedInMoscowProgramm": null,
        "underground": [],
        "from_developer": true,
        "isInHiddenBase": false,
        "can_booking": null,
        "added": {
          "strict": "вчера, 22:36",
          "humanized": "вчера"
        },
        "premium": {
          "state": false
        },
        "description": "Продается 2-комнатная квартира, в строящемся доме (Ул. Игнатова 37), срок сдачи: II-кв. 2020, общей площадью 60.90 кв.м., на 9 этаже. Жилой многоквартирный дом по адресу г. Орел, ул. Игнатова 37.\n\nВ пешей доступности школа и детский сад. Орловский юридический институт МВД России, Академия ФСО РФ.\n\nКвартиры с улучшенно отделкой класса \"Комфорт\".\nРасположение в непосредственной близости к центру города.\nРазвитая инфраструктура и транспортная доступность.",
        "promo": null,
        "total_area": 60.9,
        "price": {
          "rur": 2624790
        },
        "address_string": [
          "Орловская область, Орел, ул. Игнатова, 37"
        ],
        "phone": "+7 804 555-13-34",
        "export": {
          "pdf": {
            "link": "/export/pdf/sale/flat/200698116/"
          },
          "docx": {
            "link": "/export/docx/sale/flat/200698116/"
          }
        },
        "link": "/sale/flat/200698116/",
        "phone_data_layer": {
          "category": "sale/flat_new",
          "brand": "13465792/developer",
          "variant": "paid",
          "id": 200698116,
          "position": 28,
          "price": 2624790,
          "quantity": 1
        },
        "offer_type": "flat",
        "complain": {
          "text": "",
          "api": "/ajax/complaints/add/"
        },
        "rooms_count": 2,
        "center": [
          52.9897,
          36.059552
        ],
        "photos": [
          {
            "thumb": "https://cdn-p.cian.site/images/2/424/236/632424211-2.jpg",
            "img": "https://cdn-p.cian.site/images/2/424/236/632424211-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/2/424/236/632424236-2.jpg",
            "img": "https://cdn-p.cian.site/images/2/424/236/632424236-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/2/424/236/632424266-2.jpg",
            "img": "https://cdn-p.cian.site/images/2/424/236/632424266-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/3/424/236/632424319-2.jpg",
            "img": "https://cdn-p.cian.site/images/3/424/236/632424319-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/3/424/236/632424349-2.jpg",
            "img": "https://cdn-p.cian.site/images/3/424/236/632424349-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/3/424/236/632424389-2.jpg",
            "img": "https://cdn-p.cian.site/images/3/424/236/632424389-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/4/424/236/632424456-2.jpg",
            "img": "https://cdn-p.cian.site/images/4/424/236/632424456-2.jpg"
          }
        ],
        "is_primary": true,
        "client_fee": null,
        "favorite": {
          "state": false,
          "api": "/ajax/sale/flat/favorites"
        },
        "ga_event_action": "/sale/flat/mo_id=0/obl_id=4601/city_id=175604/object_type=2/ga_obj_type=2/spec=company/200698116/from_developer=1/repres=0/owner=0/pod_snos=0/nv=1/",
        "multi_count": 0,
        "deposit": null,
        "is_payed": true,
        "show_recidivist_popup": false,
        "agent_fee": null,
        "new_object_id": 55968,
        "user": {
          "rating": {
            "state": "neutral",
            "api": "/ajax/sale/flat/realtor_ratings"
          },
          "name": "Орелстрой",
          "cianId": 13465792,
          "phones": [
            {
              "number": "8045551334",
              "country_code": "+7"
            }
          ],
          "note": {
            "text": "",
            "api": "/ajax/sale/flat/realtor_notes"
          },
          "link": "/cat.php?id_user=13465792&deal_type=2&flat=yes&engine_version=2",
          "is_fairplay": false,
          "trust": 0,
          "id": 13465792
        }
      },
      "200698118": {
        "status": "published",
        "is_excluded_from_action": false,
        "newbuilding": {
          "showJkReliableFlag": true,
          "isFromDeveloper": true,
          "name": "Ул. Игнатова 37",
          "reliableStatus": "reliable",
          "isFromBuilder": true,
          "house": {
            "isFinished": false,
            "finishDate": {
              "quarter": 2,
              "year": 2020
            },
            "id": 580625,
            "reliableStatus": "reliable",
            "name": "Ул. Игнатова 37"
          },
          "id": "55968",
          "newbuildingFeatures": {
            "imagesCount": 6,
            "firstImageUrl": "https://cdn-p.cian.site/images/0/140/126/ul-ignatova-37-orel-jk-621041032-6.jpg",
            "deadlineInfo": "Сдача в 2 кв. 2020",
            "videosCount": 0
          },
          "isFromSeller": true
        },
        "isByHomeowner": null,
        "floors_count": 16,
        "top3": false,
        "highways": [],
        "colorized": false,
        "deadline": {
          "quarter": 2,
          "is_complete": false,
          "year": 2020
        },
        "basic_profi_score": 1,
        "deal_type": "sale",
        "category": 113,
        "id": 200698118,
        "default_photo_index": 0,
        "showCallbackButton": true,
        "floor": 6,
        "realty_id": 200698118,
        "bedrooms_count": null,
        "note": {
          "text": "",
          "api": [
            "/ajax/sale/flat/notes"
          ]
        },
        "is_new_multioffer": false,
        "isDemolishedInMoscowProgramm": null,
        "underground": [],
        "from_developer": true,
        "work_time_info": {
          "timezone_text": "Московскому",
          "call_to": "19",
          "is_available": true,
          "call_from": "9",
          "user_id": 13465792
        },
        "isInHiddenBase": false,
        "can_booking": null,
        "added": {
          "strict": "сегодня, 01:59",
          "humanized": "9 часов назад"
        },
        "premium": {
          "state": false
        },
        "description": "Продается 2-комнатная квартира, в строящемся доме (Ул. Игнатова 37), срок сдачи: II-кв. 2020, общей площадью 60.90 кв.м., на 6 этаже. Жилой многоквартирный дом по адресу г. Орел, ул. Игнатова 37.\n\nВ пешей доступности школа и детский сад. Орловский юридический институт МВД России, Академия ФСО РФ.\n\nКвартиры с улучшенно отделкой класса \"Комфорт\".\nРасположение в непосредственной близости к центру города.\nРазвитая инфраструктура и транспортная доступность.",
        "promo": null,
        "total_area": 60.9,
        "price": {
          "rur": 2655240
        },
        "address_string": [
          "Орловская область, Орел, ул. Игнатова, 37"
        ],
        "phone": "+7 804 555-13-34",
        "export": {
          "pdf": {
            "link": "/export/pdf/sale/flat/200698118/"
          },
          "docx": {
            "link": "/export/docx/sale/flat/200698118/"
          }
        },
        "link": "/sale/flat/200698118/",
        "phone_data_layer": {
          "category": "sale/flat_new",
          "brand": "13465792/developer",
          "variant": "paid",
          "id": 200698118,
          "position": 33,
          "price": 2655240,
          "quantity": 1
        },
        "offer_type": "flat",
        "complain": {
          "text": "",
          "api": "/ajax/complaints/add/"
        },
        "rooms_count": 2,
        "center": [
          52.9897,
          36.059552
        ],
        "photos": [
          {
            "thumb": "https://cdn-p.cian.site/images/2/424/236/632424202-2.jpg",
            "img": "https://cdn-p.cian.site/images/2/424/236/632424202-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/2/424/236/632424226-2.jpg",
            "img": "https://cdn-p.cian.site/images/2/424/236/632424226-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/2/424/236/632424268-2.jpg",
            "img": "https://cdn-p.cian.site/images/2/424/236/632424268-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/3/424/236/632424306-2.jpg",
            "img": "https://cdn-p.cian.site/images/3/424/236/632424306-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/3/424/236/632424351-2.jpg",
            "img": "https://cdn-p.cian.site/images/3/424/236/632424351-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/3/424/236/632424395-2.jpg",
            "img": "https://cdn-p.cian.site/images/3/424/236/632424395-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/4/424/236/632424445-2.jpg",
            "img": "https://cdn-p.cian.site/images/4/424/236/632424445-2.jpg"
          }
        ],
        "is_primary": true,
        "client_fee": null,
        "favorite": {
          "state": false,
          "api": "/ajax/sale/flat/favorites"
        },
        "ga_event_action": "/sale/flat/mo_id=0/obl_id=4601/city_id=175604/object_type=2/ga_obj_type=2/spec=company/200698118/from_developer=1/repres=0/owner=0/pod_snos=0/nv=1/",
        "multi_count": 0,
        "deposit": null,
        "is_payed": true,
        "show_recidivist_popup": false,
        "agent_fee": null,
        "new_object_id": 55968,
        "user": {
          "rating": {
            "state": "neutral",
            "api": "/ajax/sale/flat/realtor_ratings"
          },
          "name": "Орелстрой",
          "cianId": 13465792,
          "phones": [
            {
              "number": "8045551334",
              "country_code": "+7"
            }
          ],
          "note": {
            "text": "",
            "api": "/ajax/sale/flat/realtor_notes"
          },
          "link": "/cat.php?id_user=13465792&deal_type=2&flat=yes&engine_version=2",
          "is_fairplay": false,
          "trust": 0,
          "id": 13465792
        }
      },
      "200698130": {
        "status": "published",
        "is_excluded_from_action": false,
        "newbuilding": {
          "showJkReliableFlag": true,
          "isFromDeveloper": true,
          "name": "Ул. Игнатова 37",
          "reliableStatus": "reliable",
          "isFromBuilder": true,
          "house": {
            "isFinished": false,
            "finishDate": {
              "quarter": 2,
              "year": 2020
            },
            "id": 580625,
            "reliableStatus": "reliable",
            "name": "Ул. Игнатова 37"
          },
          "id": "55968",
          "newbuildingFeatures": {
            "imagesCount": 6,
            "firstImageUrl": "https://cdn-p.cian.site/images/0/140/126/ul-ignatova-37-orel-jk-621041032-6.jpg",
            "deadlineInfo": "Сдача в 2 кв. 2020",
            "videosCount": 0
          },
          "isFromSeller": true
        },
        "isByHomeowner": null,
        "floors_count": 16,
        "top3": false,
        "highways": [],
        "colorized": false,
        "deadline": {
          "quarter": 2,
          "is_complete": false,
          "year": 2020
        },
        "basic_profi_score": 1,
        "deal_type": "sale",
        "category": 113,
        "id": 200698130,
        "default_photo_index": 0,
        "showCallbackButton": true,
        "floor": 11,
        "realty_id": 200698130,
        "bedrooms_count": null,
        "note": {
          "text": "",
          "api": [
            "/ajax/sale/flat/notes"
          ]
        },
        "is_new_multioffer": false,
        "isDemolishedInMoscowProgramm": null,
        "underground": [],
        "from_developer": true,
        "work_time_info": {
          "timezone_text": "Московскому",
          "call_to": "19",
          "is_available": true,
          "call_from": "9",
          "user_id": 13465792
        },
        "isInHiddenBase": false,
        "can_booking": null,
        "added": {
          "strict": "вчера, 22:36",
          "humanized": "вчера"
        },
        "premium": {
          "state": false
        },
        "description": "Продается 2-комнатная квартира, в строящемся доме (Ул. Игнатова 37), срок сдачи: II-кв. 2020, общей площадью 62.00 кв.м., на 11 этаже. Жилой многоквартирный дом по адресу г. Орел, ул. Игнатова 37.\n\nВ пешей доступности школа и детский сад. Орловский юридический институт МВД России, Академия ФСО РФ.\n\nКвартиры с улучшенно отделкой класса \"Комфорт\".\nРасположение в непосредственной близости к центру города.\nРазвитая инфраструктура и транспортная доступность.",
        "promo": null,
        "total_area": 62,
        "price": {
          "rur": 2721800
        },
        "address_string": [
          "Орловская область, Орел, ул. Игнатова, 37"
        ],
        "phone": "+7 804 555-13-34",
        "export": {
          "pdf": {
            "link": "/export/pdf/sale/flat/200698130/"
          },
          "docx": {
            "link": "/export/docx/sale/flat/200698130/"
          }
        },
        "link": "/sale/flat/200698130/",
        "phone_data_layer": {
          "category": "sale/flat_new",
          "brand": "13465792/developer",
          "variant": "paid",
          "id": 200698130,
          "position": 37,
          "price": 2721800,
          "quantity": 1
        },
        "offer_type": "flat",
        "complain": {
          "text": "",
          "api": "/ajax/complaints/add/"
        },
        "rooms_count": 2,
        "center": [
          52.9897,
          36.059552
        ],
        "photos": [
          {
            "thumb": "https://cdn-p.cian.site/images/2/424/236/632424219-2.jpg",
            "img": "https://cdn-p.cian.site/images/2/424/236/632424219-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/2/424/236/632424283-2.jpg",
            "img": "https://cdn-p.cian.site/images/2/424/236/632424283-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/3/424/236/632424344-2.jpg",
            "img": "https://cdn-p.cian.site/images/3/424/236/632424344-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/3/424/236/632424391-2.jpg",
            "img": "https://cdn-p.cian.site/images/3/424/236/632424391-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/4/424/236/632424414-2.jpg",
            "img": "https://cdn-p.cian.site/images/4/424/236/632424414-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/4/424/236/632424433-2.jpg",
            "img": "https://cdn-p.cian.site/images/4/424/236/632424433-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/4/424/236/632424460-2.jpg",
            "img": "https://cdn-p.cian.site/images/4/424/236/632424460-2.jpg"
          }
        ],
        "is_primary": true,
        "client_fee": null,
        "favorite": {
          "state": false,
          "api": "/ajax/sale/flat/favorites"
        },
        "ga_event_action": "/sale/flat/mo_id=0/obl_id=4601/city_id=175604/object_type=2/ga_obj_type=2/spec=company/200698130/from_developer=1/repres=0/owner=0/pod_snos=0/nv=1/",
        "multi_count": 0,
        "deposit": null,
        "is_payed": true,
        "show_recidivist_popup": false,
        "agent_fee": null,
        "new_object_id": 55968,
        "user": {
          "rating": {
            "state": "neutral",
            "api": "/ajax/sale/flat/realtor_ratings"
          },
          "name": "Орелстрой",
          "cianId": 13465792,
          "phones": [
            {
              "number": "8045551334",
              "country_code": "+7"
            }
          ],
          "note": {
            "text": "",
            "api": "/ajax/sale/flat/realtor_notes"
          },
          "link": "/cat.php?id_user=13465792&deal_type=2&flat=yes&engine_version=2",
          "is_fairplay": false,
          "trust": 0,
          "id": 13465792
        }
      },
      "200698136": {
        "status": "published",
        "is_excluded_from_action": false,
        "newbuilding": {
          "showJkReliableFlag": true,
          "isFromDeveloper": true,
          "name": "Ул. Игнатова 37",
          "reliableStatus": "reliable",
          "isFromBuilder": true,
          "house": {
            "isFinished": false,
            "finishDate": {
              "quarter": 2,
              "year": 2020
            },
            "id": 580625,
            "reliableStatus": "reliable",
            "name": "Ул. Игнатова 37"
          },
          "id": "55968",
          "newbuildingFeatures": {
            "imagesCount": 6,
            "firstImageUrl": "https://cdn-p.cian.site/images/0/140/126/ul-ignatova-37-orel-jk-621041032-6.jpg",
            "deadlineInfo": "Сдача в 2 кв. 2020",
            "videosCount": 0
          },
          "isFromSeller": true
        },
        "isByHomeowner": null,
        "floors_count": 16,
        "top3": false,
        "highways": [],
        "colorized": false,
        "deadline": {
          "quarter": 2,
          "is_complete": false,
          "year": 2020
        },
        "basic_profi_score": 1,
        "deal_type": "sale",
        "category": 113,
        "id": 200698136,
        "default_photo_index": 0,
        "showCallbackButton": true,
        "floor": 15,
        "realty_id": 200698136,
        "bedrooms_count": null,
        "note": {
          "text": "",
          "api": [
            "/ajax/sale/flat/notes"
          ]
        },
        "is_new_multioffer": false,
        "isDemolishedInMoscowProgramm": null,
        "underground": [],
        "from_developer": true,
        "work_time_info": {
          "timezone_text": "Московскому",
          "call_to": "19",
          "is_available": true,
          "call_from": "9",
          "user_id": 13465792
        },
        "isInHiddenBase": false,
        "can_booking": null,
        "added": {
          "strict": "вчера, 22:36",
          "humanized": "вчера"
        },
        "premium": {
          "state": false
        },
        "description": "Продается 2-комнатная квартира, в строящемся доме (Ул. Игнатова 37), срок сдачи: II-кв. 2020, общей площадью 62.00 кв.м., на 15 этаже. Жилой многоквартирный дом по адресу г. Орел, ул. Игнатова 37.\n\nВ пешей доступности школа и детский сад. Орловский юридический институт МВД России, Академия ФСО РФ.\n\nКвартиры с улучшенно отделкой класса \"Комфорт\".\nРасположение в непосредственной близости к центру города.\nРазвитая инфраструктура и транспортная доступность.",
        "promo": null,
        "total_area": 62,
        "price": {
          "rur": 2690800
        },
        "address_string": [
          "Орловская область, Орел, ул. Игнатова, 37"
        ],
        "phone": "+7 804 555-13-34",
        "export": {
          "pdf": {
            "link": "/export/pdf/sale/flat/200698136/"
          },
          "docx": {
            "link": "/export/docx/sale/flat/200698136/"
          }
        },
        "link": "/sale/flat/200698136/",
        "phone_data_layer": {
          "category": "sale/flat_new",
          "brand": "13465792/developer",
          "variant": "paid",
          "id": 200698136,
          "position": 35,
          "price": 2690800,
          "quantity": 1
        },
        "offer_type": "flat",
        "complain": {
          "text": "",
          "api": "/ajax/complaints/add/"
        },
        "rooms_count": 2,
        "center": [
          52.9897,
          36.059552
        ],
        "photos": [
          {
            "thumb": "https://cdn-p.cian.site/images/2/424/236/632424231-2.jpg",
            "img": "https://cdn-p.cian.site/images/2/424/236/632424231-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/2/424/236/632424255-2.jpg",
            "img": "https://cdn-p.cian.site/images/2/424/236/632424255-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/3/424/236/632424302-2.jpg",
            "img": "https://cdn-p.cian.site/images/3/424/236/632424302-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/3/424/236/632424334-2.jpg",
            "img": "https://cdn-p.cian.site/images/3/424/236/632424334-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/3/424/236/632424383-2.jpg",
            "img": "https://cdn-p.cian.site/images/3/424/236/632424383-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/4/424/236/632424438-2.jpg",
            "img": "https://cdn-p.cian.site/images/4/424/236/632424438-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/4/424/236/632424462-2.jpg",
            "img": "https://cdn-p.cian.site/images/4/424/236/632424462-2.jpg"
          }
        ],
        "is_primary": true,
        "client_fee": null,
        "favorite": {
          "state": false,
          "api": "/ajax/sale/flat/favorites"
        },
        "ga_event_action": "/sale/flat/mo_id=0/obl_id=4601/city_id=175604/object_type=2/ga_obj_type=2/spec=company/200698136/from_developer=1/repres=0/owner=0/pod_snos=0/nv=1/",
        "multi_count": 0,
        "deposit": null,
        "is_payed": true,
        "show_recidivist_popup": false,
        "agent_fee": null,
        "new_object_id": 55968,
        "user": {
          "rating": {
            "state": "neutral",
            "api": "/ajax/sale/flat/realtor_ratings"
          },
          "name": "Орелстрой",
          "cianId": 13465792,
          "phones": [
            {
              "number": "8045551334",
              "country_code": "+7"
            }
          ],
          "note": {
            "text": "",
            "api": "/ajax/sale/flat/realtor_notes"
          },
          "link": "/cat.php?id_user=13465792&deal_type=2&flat=yes&engine_version=2",
          "is_fairplay": false,
          "trust": 0,
          "id": 13465792
        }
      },
      "200698139": {
        "status": "published",
        "is_excluded_from_action": false,
        "newbuilding": {
          "showJkReliableFlag": true,
          "isFromDeveloper": true,
          "name": "Ул. Игнатова 37",
          "reliableStatus": "reliable",
          "isFromBuilder": true,
          "house": {
            "isFinished": false,
            "finishDate": {
              "quarter": 2,
              "year": 2020
            },
            "id": 580625,
            "reliableStatus": "reliable",
            "name": "Ул. Игнатова 37"
          },
          "id": "55968",
          "newbuildingFeatures": {
            "imagesCount": 6,
            "firstImageUrl": "https://cdn-p.cian.site/images/0/140/126/ul-ignatova-37-orel-jk-621041032-6.jpg",
            "deadlineInfo": "Сдача в 2 кв. 2020",
            "videosCount": 0
          },
          "isFromSeller": true
        },
        "isByHomeowner": null,
        "floors_count": 16,
        "top3": false,
        "highways": [],
        "colorized": false,
        "deadline": {
          "quarter": 2,
          "is_complete": false,
          "year": 2020
        },
        "basic_profi_score": 1,
        "deal_type": "sale",
        "category": 113,
        "id": 200698139,
        "default_photo_index": 0,
        "showCallbackButton": true,
        "floor": 13,
        "realty_id": 200698139,
        "bedrooms_count": null,
        "note": {
          "text": "",
          "api": [
            "/ajax/sale/flat/notes"
          ]
        },
        "is_new_multioffer": false,
        "isDemolishedInMoscowProgramm": null,
        "underground": [],
        "from_developer": true,
        "work_time_info": {
          "timezone_text": "Московскому",
          "call_to": "19",
          "is_available": true,
          "call_from": "9",
          "user_id": 13465792
        },
        "isInHiddenBase": false,
        "can_booking": null,
        "added": {
          "strict": "вчера, 22:36",
          "humanized": "вчера"
        },
        "premium": {
          "state": false
        },
        "description": "Продается 2-комнатная квартира, в строящемся доме (Ул. Игнатова 37), срок сдачи: II-кв. 2020, общей площадью 62.00 кв.м., на 13 этаже. Жилой многоквартирный дом по адресу г. Орел, ул. Игнатова 37.\n\nВ пешей доступности школа и детский сад. Орловский юридический институт МВД России, Академия ФСО РФ.\n\nКвартиры с улучшенно отделкой класса \"Комфорт\".\nРасположение в непосредственной близости к центру города.\nРазвитая инфраструктура и транспортная доступность.",
        "promo": null,
        "total_area": 62,
        "price": {
          "rur": 2690800
        },
        "address_string": [
          "Орловская область, Орел, ул. Игнатова, 37"
        ],
        "phone": "+7 804 555-13-34",
        "export": {
          "pdf": {
            "link": "/export/pdf/sale/flat/200698139/"
          },
          "docx": {
            "link": "/export/docx/sale/flat/200698139/"
          }
        },
        "link": "/sale/flat/200698139/",
        "phone_data_layer": {
          "category": "sale/flat_new",
          "brand": "13465792/developer",
          "variant": "paid",
          "id": 200698139,
          "position": 36,
          "price": 2690800,
          "quantity": 1
        },
        "offer_type": "flat",
        "complain": {
          "text": "",
          "api": "/ajax/complaints/add/"
        },
        "rooms_count": 2,
        "center": [
          52.9897,
          36.059552
        ],
        "photos": [
          {
            "thumb": "https://cdn-p.cian.site/images/2/424/236/632424209-2.jpg",
            "img": "https://cdn-p.cian.site/images/2/424/236/632424209-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/2/424/236/632424238-2.jpg",
            "img": "https://cdn-p.cian.site/images/2/424/236/632424238-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/2/424/236/632424292-2.jpg",
            "img": "https://cdn-p.cian.site/images/2/424/236/632424292-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/3/424/236/632424332-2.jpg",
            "img": "https://cdn-p.cian.site/images/3/424/236/632424332-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/3/424/236/632424359-2.jpg",
            "img": "https://cdn-p.cian.site/images/3/424/236/632424359-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/4/424/236/632424418-2.jpg",
            "img": "https://cdn-p.cian.site/images/4/424/236/632424418-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/4/424/236/632424443-2.jpg",
            "img": "https://cdn-p.cian.site/images/4/424/236/632424443-2.jpg"
          }
        ],
        "is_primary": true,
        "client_fee": null,
        "favorite": {
          "state": false,
          "api": "/ajax/sale/flat/favorites"
        },
        "ga_event_action": "/sale/flat/mo_id=0/obl_id=4601/city_id=175604/object_type=2/ga_obj_type=2/spec=company/200698139/from_developer=1/repres=0/owner=0/pod_snos=0/nv=1/",
        "multi_count": 0,
        "deposit": null,
        "is_payed": true,
        "show_recidivist_popup": false,
        "agent_fee": null,
        "new_object_id": 55968,
        "user": {
          "rating": {
            "state": "neutral",
            "api": "/ajax/sale/flat/realtor_ratings"
          },
          "name": "Орелстрой",
          "cianId": 13465792,
          "phones": [
            {
              "number": "8045551334",
              "country_code": "+7"
            }
          ],
          "note": {
            "text": "",
            "api": "/ajax/sale/flat/realtor_notes"
          },
          "link": "/cat.php?id_user=13465792&deal_type=2&flat=yes&engine_version=2",
          "is_fairplay": false,
          "trust": 0,
          "id": 13465792
        }
      },
      "200698141": {
        "status": "published",
        "is_excluded_from_action": false,
        "newbuilding": {
          "showJkReliableFlag": true,
          "isFromDeveloper": true,
          "name": "Ул. Игнатова 37",
          "reliableStatus": "reliable",
          "isFromBuilder": true,
          "house": {
            "isFinished": false,
            "finishDate": {
              "quarter": 2,
              "year": 2020
            },
            "id": 580625,
            "reliableStatus": "reliable",
            "name": "Ул. Игнатова 37"
          },
          "id": "55968",
          "newbuildingFeatures": {
            "imagesCount": 6,
            "firstImageUrl": "https://cdn-p.cian.site/images/0/140/126/ul-ignatova-37-orel-jk-621041032-6.jpg",
            "deadlineInfo": "Сдача в 2 кв. 2020",
            "videosCount": 0
          },
          "isFromSeller": true
        },
        "isByHomeowner": null,
        "floors_count": 16,
        "top3": false,
        "highways": [],
        "colorized": false,
        "deadline": {
          "quarter": 2,
          "is_complete": false,
          "year": 2020
        },
        "basic_profi_score": 1,
        "deal_type": "sale",
        "category": 113,
        "id": 200698141,
        "default_photo_index": 0,
        "showCallbackButton": true,
        "floor": 12,
        "realty_id": 200698141,
        "bedrooms_count": null,
        "note": {
          "text": "",
          "api": [
            "/ajax/sale/flat/notes"
          ]
        },
        "is_new_multioffer": false,
        "isDemolishedInMoscowProgramm": null,
        "underground": [],
        "from_developer": true,
        "work_time_info": {
          "timezone_text": "Московскому",
          "call_to": "19",
          "is_available": true,
          "call_from": "9",
          "user_id": 13465792
        },
        "isInHiddenBase": false,
        "can_booking": null,
        "added": {
          "strict": "вчера, 22:35",
          "humanized": "вчера"
        },
        "premium": {
          "state": true
        },
        "description": "Продается 2-комнатная квартира, в строящемся доме (Ул. Игнатова 37), срок сдачи: II-кв. 2020, общей площадью 62.00 кв.м., на 12 этаже. Жилой многоквартирный дом по адресу г. Орел, ул. Игнатова 37.\n\nВ пешей доступности школа и детский сад. Орловский юридический институт МВД России, Академия ФСО РФ.\n\nКвартиры с улучшенно отделкой класса \"Комфорт\".\nРасположение в непосредственной близости к центру города.\nРазвитая инфраструктура и транспортная доступность.",
        "promo": null,
        "total_area": 62,
        "price": {
          "rur": 2721800
        },
        "address_string": [
          "Орловская область, Орел, ул. Игнатова, 37"
        ],
        "phone": "+7 804 555-13-34",
        "export": {
          "pdf": {
            "link": "/export/pdf/sale/flat/200698141/"
          },
          "docx": {
            "link": "/export/docx/sale/flat/200698141/"
          }
        },
        "link": "/sale/flat/200698141/",
        "phone_data_layer": {
          "category": "sale/flat_new",
          "brand": "13465792/developer",
          "variant": "premium",
          "id": 200698141,
          "position": 38,
          "price": 2721800,
          "quantity": 1
        },
        "offer_type": "flat",
        "complain": {
          "text": "",
          "api": "/ajax/complaints/add/"
        },
        "rooms_count": 2,
        "center": [
          52.9897,
          36.059552
        ],
        "photos": [
          {
            "thumb": "https://cdn-p.cian.site/images/2/424/236/632424227-2.jpg",
            "img": "https://cdn-p.cian.site/images/2/424/236/632424227-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/2/424/236/632424264-2.jpg",
            "img": "https://cdn-p.cian.site/images/2/424/236/632424264-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/2/424/236/632424299-2.jpg",
            "img": "https://cdn-p.cian.site/images/2/424/236/632424299-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/3/424/236/632424337-2.jpg",
            "img": "https://cdn-p.cian.site/images/3/424/236/632424337-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/3/424/236/632424373-2.jpg",
            "img": "https://cdn-p.cian.site/images/3/424/236/632424373-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/4/424/236/632424411-2.jpg",
            "img": "https://cdn-p.cian.site/images/4/424/236/632424411-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/4/424/236/632424441-2.jpg",
            "img": "https://cdn-p.cian.site/images/4/424/236/632424441-2.jpg"
          }
        ],
        "is_primary": true,
        "client_fee": null,
        "favorite": {
          "state": false,
          "api": "/ajax/sale/flat/favorites"
        },
        "ga_event_action": "/sale/flat/mo_id=0/obl_id=4601/city_id=175604/object_type=2/ga_obj_type=2/spec=company/200698141/from_developer=1/repres=0/owner=0/pod_snos=0/nv=1/",
        "multi_count": 0,
        "deposit": null,
        "is_payed": false,
        "show_recidivist_popup": false,
        "agent_fee": null,
        "new_object_id": 55968,
        "user": {
          "rating": {
            "state": "neutral",
            "api": "/ajax/sale/flat/realtor_ratings"
          },
          "name": "Орелстрой",
          "cianId": 13465792,
          "phones": [
            {
              "number": "8045551334",
              "country_code": "+7"
            }
          ],
          "note": {
            "text": "",
            "api": "/ajax/sale/flat/realtor_notes"
          },
          "link": "/cat.php?id_user=13465792&deal_type=2&flat=yes&engine_version=2",
          "is_fairplay": false,
          "trust": 0,
          "id": 13465792
        }
      },
      "200698144": {
        "status": "published",
        "is_excluded_from_action": false,
        "newbuilding": {
          "showJkReliableFlag": true,
          "isFromDeveloper": true,
          "name": "Ул. Игнатова 37",
          "reliableStatus": "reliable",
          "isFromBuilder": true,
          "house": {
            "isFinished": false,
            "finishDate": {
              "quarter": 2,
              "year": 2020
            },
            "id": 580625,
            "reliableStatus": "reliable",
            "name": "Ул. Игнатова 37"
          },
          "id": "55968",
          "newbuildingFeatures": {
            "imagesCount": 6,
            "firstImageUrl": "https://cdn-p.cian.site/images/0/140/126/ul-ignatova-37-orel-jk-621041032-6.jpg",
            "deadlineInfo": "Сдача в 2 кв. 2020",
            "videosCount": 0
          },
          "isFromSeller": true
        },
        "isByHomeowner": null,
        "floors_count": 16,
        "top3": false,
        "highways": [],
        "colorized": false,
        "deadline": {
          "quarter": 2,
          "is_complete": false,
          "year": 2020
        },
        "basic_profi_score": 1,
        "deal_type": "sale",
        "category": 113,
        "id": 200698144,
        "default_photo_index": 0,
        "showCallbackButton": true,
        "floor": 9,
        "realty_id": 200698144,
        "bedrooms_count": null,
        "note": {
          "text": "",
          "api": [
            "/ajax/sale/flat/notes"
          ]
        },
        "is_new_multioffer": false,
        "isDemolishedInMoscowProgramm": null,
        "underground": [],
        "from_developer": true,
        "work_time_info": {
          "timezone_text": "Московскому",
          "call_to": "19",
          "is_available": true,
          "call_from": "9",
          "user_id": 13465792
        },
        "isInHiddenBase": false,
        "can_booking": null,
        "added": {
          "strict": "вчера, 22:35",
          "humanized": "вчера"
        },
        "premium": {
          "state": true
        },
        "description": "Продается 2-комнатная квартира, в строящемся доме (Ул. Игнатова 37), срок сдачи: II-кв. 2020, общей площадью 60.90 кв.м., на 9 этаже. Жилой многоквартирный дом по адресу г. Орел, ул. Игнатова 37.\n\nВ пешей доступности школа и детский сад. Орловский юридический институт МВД России, Академия ФСО РФ.\n\nКвартиры с улучшенно отделкой класса \"Комфорт\".\nРасположение в непосредственной близости к центру города.\nРазвитая инфраструктура и транспортная доступность.",
        "promo": null,
        "total_area": 60.9,
        "price": {
          "rur": 2624790
        },
        "address_string": [
          "Орловская область, Орел, ул. Игнатова, 37"
        ],
        "phone": "+7 804 555-13-34",
        "export": {
          "pdf": {
            "link": "/export/pdf/sale/flat/200698144/"
          },
          "docx": {
            "link": "/export/docx/sale/flat/200698144/"
          }
        },
        "link": "/sale/flat/200698144/",
        "phone_data_layer": {
          "category": "sale/flat_new",
          "brand": "13465792/developer",
          "variant": "premium",
          "id": 200698144,
          "position": 29,
          "price": 2624790,
          "quantity": 1
        },
        "offer_type": "flat",
        "complain": {
          "text": "",
          "api": "/ajax/complaints/add/"
        },
        "rooms_count": 2,
        "center": [
          52.9897,
          36.059552
        ],
        "photos": [
          {
            "thumb": "https://cdn-p.cian.site/images/2/424/236/632424213-2.jpg",
            "img": "https://cdn-p.cian.site/images/2/424/236/632424213-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/2/424/236/632424243-2.jpg",
            "img": "https://cdn-p.cian.site/images/2/424/236/632424243-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/2/424/236/632424269-2.jpg",
            "img": "https://cdn-p.cian.site/images/2/424/236/632424269-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/3/424/236/632424300-2.jpg",
            "img": "https://cdn-p.cian.site/images/3/424/236/632424300-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/3/424/236/632424324-2.jpg",
            "img": "https://cdn-p.cian.site/images/3/424/236/632424324-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/3/424/236/632424378-2.jpg",
            "img": "https://cdn-p.cian.site/images/3/424/236/632424378-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/4/424/236/632424416-2.jpg",
            "img": "https://cdn-p.cian.site/images/4/424/236/632424416-2.jpg"
          }
        ],
        "is_primary": true,
        "client_fee": null,
        "favorite": {
          "state": false,
          "api": "/ajax/sale/flat/favorites"
        },
        "ga_event_action": "/sale/flat/mo_id=0/obl_id=4601/city_id=175604/object_type=2/ga_obj_type=2/spec=company/200698144/from_developer=1/repres=0/owner=0/pod_snos=0/nv=1/",
        "multi_count": 0,
        "deposit": null,
        "is_payed": false,
        "show_recidivist_popup": false,
        "agent_fee": null,
        "new_object_id": 55968,
        "user": {
          "rating": {
            "state": "neutral",
            "api": "/ajax/sale/flat/realtor_ratings"
          },
          "name": "Орелстрой",
          "cianId": 13465792,
          "phones": [
            {
              "number": "8045551334",
              "country_code": "+7"
            }
          ],
          "note": {
            "text": "",
            "api": "/ajax/sale/flat/realtor_notes"
          },
          "link": "/cat.php?id_user=13465792&deal_type=2&flat=yes&engine_version=2",
          "is_fairplay": false,
          "trust": 0,
          "id": 13465792
        }
      },
      "202361669": {
        "status": "published",
        "is_excluded_from_action": false,
        "newbuilding": {
          "showJkReliableFlag": true,
          "isFromDeveloper": true,
          "name": "Ул. Игнатова 37",
          "reliableStatus": "reliable",
          "isFromBuilder": true,
          "house": {
            "isFinished": false,
            "finishDate": {
              "quarter": 2,
              "year": 2020
            },
            "id": 580625,
            "reliableStatus": "reliable",
            "name": "Ул. Игнатова 37"
          },
          "id": "55968",
          "newbuildingFeatures": {
            "imagesCount": 6,
            "firstImageUrl": "https://cdn-p.cian.site/images/0/140/126/ul-ignatova-37-orel-jk-621041032-6.jpg",
            "deadlineInfo": "Сдача в 2 кв. 2020",
            "videosCount": 0
          },
          "isFromSeller": true
        },
        "isByHomeowner": null,
        "floors_count": 16,
        "top3": false,
        "highways": [],
        "colorized": false,
        "deadline": {
          "quarter": 2,
          "is_complete": false,
          "year": 2020
        },
        "basic_profi_score": 1,
        "deal_type": "sale",
        "category": 113,
        "id": 202361669,
        "default_photo_index": 0,
        "showCallbackButton": true,
        "floor": 12,
        "realty_id": 202361669,
        "bedrooms_count": null,
        "note": {
          "text": "",
          "api": [
            "/ajax/sale/flat/notes"
          ]
        },
        "is_new_multioffer": false,
        "isDemolishedInMoscowProgramm": null,
        "underground": [],
        "from_developer": true,
        "work_time_info": {
          "timezone_text": "Московскому",
          "call_to": "19",
          "is_available": true,
          "call_from": "9",
          "user_id": 13465792
        },
        "isInHiddenBase": false,
        "can_booking": null,
        "added": {
          "strict": "вчера, 22:36",
          "humanized": "вчера"
        },
        "premium": {
          "state": false
        },
        "description": "Продается 2-комнатная квартира, в строящемся доме (Ул. Игнатова 37), срок сдачи: II-кв. 2020, общей площадью 62.00 кв.м., на 12 этаже. Жилой многоквартирный дом по адресу г. Орел, ул. Игнатова 37.\n\nВ пешей доступности школа и детский сад. Орловский юридический институт МВД России, Академия ФСО РФ.\n\nКвартиры с улучшенно отделкой класса \"Комфорт\".\nРасположение в непосредственной близости к центру города.\nРазвитая инфраструктура и транспортная доступность.",
        "promo": null,
        "total_area": 62,
        "price": {
          "rur": 2721800
        },
        "address_string": [
          "Орловская область, Орел, ул. Игнатова, 37"
        ],
        "phone": "+7 804 555-13-34",
        "export": {
          "pdf": {
            "link": "/export/pdf/sale/flat/202361669/"
          },
          "docx": {
            "link": "/export/docx/sale/flat/202361669/"
          }
        },
        "link": "/sale/flat/202361669/",
        "phone_data_layer": {
          "category": "sale/flat_new",
          "brand": "13465792/developer",
          "variant": "paid",
          "id": 202361669,
          "position": 39,
          "price": 2721800,
          "quantity": 1
        },
        "offer_type": "flat",
        "complain": {
          "text": "",
          "api": "/ajax/complaints/add/"
        },
        "rooms_count": 2,
        "center": [
          52.9897,
          36.059552
        ],
        "photos": [
          {
            "thumb": "https://cdn-p.cian.site/images/2/691/646/646196222-2.jpg",
            "img": "https://cdn-p.cian.site/images/2/691/646/646196222-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/2/691/646/646196225-2.jpg",
            "img": "https://cdn-p.cian.site/images/2/691/646/646196225-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/2/691/646/646196228-2.jpg",
            "img": "https://cdn-p.cian.site/images/2/691/646/646196228-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/2/691/646/646196230-2.jpg",
            "img": "https://cdn-p.cian.site/images/2/691/646/646196230-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/2/691/646/646196234-2.jpg",
            "img": "https://cdn-p.cian.site/images/2/691/646/646196234-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/2/691/646/646196237-2.jpg",
            "img": "https://cdn-p.cian.site/images/2/691/646/646196237-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/2/691/646/646196239-2.jpg",
            "img": "https://cdn-p.cian.site/images/2/691/646/646196239-2.jpg"
          }
        ],
        "is_primary": true,
        "client_fee": null,
        "favorite": {
          "state": false,
          "api": "/ajax/sale/flat/favorites"
        },
        "ga_event_action": "/sale/flat/mo_id=0/obl_id=4601/city_id=175604/object_type=2/ga_obj_type=2/spec=company/202361669/from_developer=1/repres=0/owner=0/pod_snos=0/nv=1/",
        "multi_count": 0,
        "deposit": null,
        "is_payed": true,
        "show_recidivist_popup": false,
        "agent_fee": null,
        "new_object_id": 55968,
        "user": {
          "rating": {
            "state": "neutral",
            "api": "/ajax/sale/flat/realtor_ratings"
          },
          "name": "Орелстрой",
          "cianId": 13465792,
          "phones": [
            {
              "number": "8045551334",
              "country_code": "+7"
            }
          ],
          "note": {
            "text": "",
            "api": "/ajax/sale/flat/realtor_notes"
          },
          "link": "/cat.php?id_user=13465792&deal_type=2&flat=yes&engine_version=2",
          "is_fairplay": false,
          "trust": 0,
          "id": 13465792
        }
      },
      "203193116": {
        "status": "published",
        "is_excluded_from_action": false,
        "newbuilding": {
          "showJkReliableFlag": true,
          "isFromDeveloper": true,
          "name": "Ул. Игнатова 37",
          "reliableStatus": "reliable",
          "isFromBuilder": true,
          "house": {
            "isFinished": false,
            "finishDate": {
              "quarter": 2,
              "year": 2020
            },
            "id": 580625,
            "reliableStatus": "reliable",
            "name": "Ул. Игнатова 37"
          },
          "id": "55968",
          "newbuildingFeatures": {
            "imagesCount": 6,
            "firstImageUrl": "https://cdn-p.cian.site/images/0/140/126/ul-ignatova-37-orel-jk-621041032-6.jpg",
            "deadlineInfo": "Сдача в 2 кв. 2020",
            "videosCount": 0
          },
          "isFromSeller": true
        },
        "isByHomeowner": null,
        "floors_count": 16,
        "top3": false,
        "highways": [],
        "colorized": false,
        "deadline": {
          "quarter": 2,
          "is_complete": false,
          "year": 2020
        },
        "basic_profi_score": 1,
        "deal_type": "sale",
        "category": 113,
        "id": 203193116,
        "default_photo_index": 0,
        "showCallbackButton": true,
        "floor": 11,
        "realty_id": 203193116,
        "bedrooms_count": null,
        "note": {
          "text": "",
          "api": [
            "/ajax/sale/flat/notes"
          ]
        },
        "is_new_multioffer": false,
        "isDemolishedInMoscowProgramm": null,
        "underground": [],
        "from_developer": true,
        "work_time_info": {
          "timezone_text": "Московскому",
          "call_to": "19",
          "is_available": true,
          "call_from": "9",
          "user_id": 13465792
        },
        "isInHiddenBase": false,
        "can_booking": null,
        "added": {
          "strict": "вчера, 22:36",
          "humanized": "вчера"
        },
        "premium": {
          "state": false
        },
        "description": "Продается 2-комнатная квартира, в строящемся доме (Ул. Игнатова 37), срок сдачи: II-кв. 2020, общей площадью 62.00 кв.м., на 11 этаже. Жилой многоквартирный дом по адресу г. Орел, ул. Игнатова 37.\n\nВ пешей доступности школа и детский сад. Орловский юридический институт МВД России, Академия ФСО РФ.\n\nКвартиры с улучшенно отделкой класса \"Комфорт\".\nРасположение в непосредственной близости к центру города.\nРазвитая инфраструктура и транспортная доступность.",
        "promo": null,
        "total_area": 62,
        "price": {
          "rur": 2721800
        },
        "address_string": [
          "Орловская область, Орел, ул. Игнатова, 37"
        ],
        "phone": "+7 804 555-13-34",
        "export": {
          "pdf": {
            "link": "/export/pdf/sale/flat/203193116/"
          },
          "docx": {
            "link": "/export/docx/sale/flat/203193116/"
          }
        },
        "link": "/sale/flat/203193116/",
        "phone_data_layer": {
          "category": "sale/flat_new",
          "brand": "13465792/developer",
          "variant": "paid",
          "id": 203193116,
          "position": 40,
          "price": 2721800,
          "quantity": 1
        },
        "offer_type": "flat",
        "complain": {
          "text": "",
          "api": "/ajax/complaints/add/"
        },
        "rooms_count": 2,
        "center": [
          52.9897,
          36.059552
        ],
        "photos": [
          {
            "thumb": "https://cdn-p.cian.site/images/1/369/256/652963124-2.jpg",
            "img": "https://cdn-p.cian.site/images/1/369/256/652963124-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/1/369/256/652963128-2.jpg",
            "img": "https://cdn-p.cian.site/images/1/369/256/652963128-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/1/369/256/652963151-2.jpg",
            "img": "https://cdn-p.cian.site/images/1/369/256/652963151-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/1/369/256/652963174-2.jpg",
            "img": "https://cdn-p.cian.site/images/1/369/256/652963174-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/1/369/256/652963192-2.jpg",
            "img": "https://cdn-p.cian.site/images/1/369/256/652963192-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/2/369/256/652963200-2.jpg",
            "img": "https://cdn-p.cian.site/images/2/369/256/652963200-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/2/369/256/652963209-2.jpg",
            "img": "https://cdn-p.cian.site/images/2/369/256/652963209-2.jpg"
          }
        ],
        "is_primary": true,
        "client_fee": null,
        "favorite": {
          "state": false,
          "api": "/ajax/sale/flat/favorites"
        },
        "ga_event_action": "/sale/flat/mo_id=0/obl_id=4601/city_id=175604/object_type=2/ga_obj_type=2/spec=company/203193116/from_developer=1/repres=0/owner=0/pod_snos=0/nv=1/",
        "multi_count": 0,
        "deposit": null,
        "is_payed": true,
        "show_recidivist_popup": false,
        "agent_fee": null,
        "new_object_id": 55968,
        "user": {
          "rating": {
            "state": "neutral",
            "api": "/ajax/sale/flat/realtor_ratings"
          },
          "name": "Орелстрой",
          "cianId": 13465792,
          "phones": [
            {
              "number": "8045551334",
              "country_code": "+7"
            }
          ],
          "note": {
            "text": "",
            "api": "/ajax/sale/flat/realtor_notes"
          },
          "link": "/cat.php?id_user=13465792&deal_type=2&flat=yes&engine_version=2",
          "is_fairplay": false,
          "trust": 0,
          "id": 13465792
        }
      },
      "203291737": {
        "status": "published",
        "is_excluded_from_action": false,
        "newbuilding": {
          "showJkReliableFlag": true,
          "isFromDeveloper": true,
          "name": "Ул. Игнатова 37",
          "reliableStatus": "reliable",
          "isFromBuilder": true,
          "house": {
            "isFinished": false,
            "finishDate": {
              "quarter": 2,
              "year": 2020
            },
            "id": 580625,
            "reliableStatus": "reliable",
            "name": "Ул. Игнатова 37"
          },
          "id": "55968",
          "newbuildingFeatures": {
            "imagesCount": 6,
            "firstImageUrl": "https://cdn-p.cian.site/images/0/140/126/ul-ignatova-37-orel-jk-621041032-6.jpg",
            "deadlineInfo": "Сдача в 2 кв. 2020",
            "videosCount": 0
          },
          "isFromSeller": true
        },
        "isByHomeowner": null,
        "floors_count": 16,
        "top3": false,
        "highways": [],
        "colorized": false,
        "deadline": {
          "quarter": 2,
          "is_complete": false,
          "year": 2020
        },
        "basic_profi_score": 1,
        "deal_type": "sale",
        "category": 113,
        "id": 203291737,
        "default_photo_index": 0,
        "showCallbackButton": true,
        "floor": 1,
        "realty_id": 203291737,
        "bedrooms_count": null,
        "note": {
          "text": "",
          "api": [
            "/ajax/sale/flat/notes"
          ]
        },
        "is_new_multioffer": false,
        "isDemolishedInMoscowProgramm": null,
        "underground": [],
        "from_developer": true,
        "work_time_info": {
          "timezone_text": "Московскому",
          "call_to": "19",
          "is_available": true,
          "call_from": "9",
          "user_id": 13465792
        },
        "isInHiddenBase": false,
        "can_booking": null,
        "added": {
          "strict": "вчера, 21:26",
          "humanized": "вчера"
        },
        "premium": {
          "state": true
        },
        "description": "Продается 2-комнатная квартира, в строящемся доме (Ул. Игнатова 37), срок сдачи: II-кв. 2020, общей площадью 62.30 кв.м., на 1 этаже. Жилой многоквартирный дом по адресу г. Орел, ул. Игнатова 37.\n\nВ пешей доступности школа и детский сад. Орловский юридический институт МВД России, Академия ФСО РФ.\n\nКвартиры с улучшенно отделкой класса \"Комфорт\".\nРасположение в непосредственной близости к центру города.\nРазвитая инфраструктура и транспортная доступность.",
        "promo": null,
        "total_area": 62.3,
        "price": {
          "rur": 2641520
        },
        "address_string": [
          "Орловская область, Орел, ул. Игнатова, 37"
        ],
        "phone": "+7 804 555-13-34",
        "export": {
          "pdf": {
            "link": "/export/pdf/sale/flat/203291737/"
          },
          "docx": {
            "link": "/export/docx/sale/flat/203291737/"
          }
        },
        "link": "/sale/flat/203291737/",
        "phone_data_layer": {
          "category": "sale/flat_new",
          "brand": "13465792/developer",
          "variant": "premium",
          "id": 203291737,
          "position": 31,
          "price": 2641520,
          "quantity": 1
        },
        "offer_type": "flat",
        "complain": {
          "text": "",
          "api": "/ajax/complaints/add/"
        },
        "rooms_count": 2,
        "center": [
          52.9897,
          36.059552
        ],
        "photos": [
          {
            "thumb": "https://cdn-p.cian.site/images/2/887/356/653788283-2.jpg",
            "img": "https://cdn-p.cian.site/images/2/887/356/653788283-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/3/887/356/653788362-2.jpg",
            "img": "https://cdn-p.cian.site/images/3/887/356/653788362-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/5/887/356/653788513-2.jpg",
            "img": "https://cdn-p.cian.site/images/5/887/356/653788513-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/6/887/356/653788650-2.jpg",
            "img": "https://cdn-p.cian.site/images/6/887/356/653788650-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/1/987/356/653789137-2.jpg",
            "img": "https://cdn-p.cian.site/images/1/987/356/653789137-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/9/887/356/653788934-2.jpg",
            "img": "https://cdn-p.cian.site/images/9/887/356/653788934-2.jpg"
          },
          {
            "thumb": "https://cdn-p.cian.site/images/7/887/356/653788756-2.jpg",
            "img": "https://cdn-p.cian.site/images/7/887/356/653788756-2.jpg"
          }
        ],
        "is_primary": true,
        "client_fee": null,
        "favorite": {
          "state": false,
          "api": "/ajax/sale/flat/favorites"
        },
        "ga_event_action": "/sale/flat/mo_id=0/obl_id=4601/city_id=175604/object_type=2/ga_obj_type=2/spec=company/203291737/from_developer=1/repres=0/owner=0/pod_snos=0/nv=1/",
        "multi_count": 0,
        "deposit": null,
        "is_payed": false,
        "show_recidivist_popup": false,
        "agent_fee": null,
        "new_object_id": 55968,
        "user": {
          "rating": {
            "state": "neutral",
            "api": "/ajax/sale/flat/realtor_ratings"
          },
          "name": "Орелстрой",
          "cianId": 13465792,
          "phones": [
            {
              "number": "8045551334",
              "country_code": "+7"
            }
          ],
          "note": {
            "text": "",
            "api": "/ajax/sale/flat/realtor_notes"
          },
          "link": "/cat.php?id_user=13465792&deal_type=2&flat=yes&engine_version=2",
          "is_fairplay": false,
          "trust": 0,
          "id": 13465792
        }
      }
    },
    "emptySimilarLinks": null,
    "gaQuerystring": "deal_type=sale&engine_version=2&from_developer=1&newobject%5B0%5D=55968&object_type%5B0%5D=2&offer_type=flat&p=2",
    "isShowModeSwitcher": true,
    "offersHtml": "",
    "topHitsLinks": []
  }
}
*/