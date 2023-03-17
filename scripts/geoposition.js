$(() => {
	ymaps.ready(init);

	function init() {
		var geolocation = ymaps.geolocation;

		geolocation.get({
			provider: 'yandex',
			mapStateAutoApply: true
		}).then(function (result) {
			var metaDataProperty = result.geoObjects.get(0).properties.get('metaDataProperty');

			let country = countries_data.find(country => country.code === metaDataProperty.GeocoderMetaData.Address.country_code);

			$('.input-wrapper input[name="country"]').val(country.name);
			shippingTo(country);

			if (country.name.toLocaleUpperCase() == 'RUSSIA' || country.name.toLocaleUpperCase() == 'РОССИЯ') {
				$('.js-hide-paypal').addClass('display_none');
			}
		});
	}

	$('.input-wrapper input[name="country"]').on('change, keyup', function () {
		let country = countries_data.find(country => country.name.toLowerCase() == $(this).val().trim().toLowerCase());

		if (country)
			$('.input-wrapper input[name="country"]').val(country.name);

		shippingTo(country);
	})

	$('.input-wrapper input[name="state"]').on('change, keyup', function () {
		shippingToCity($(this).val());
	})

	$('body').on('click', '.checkout-wrapper .minus, .checkout-wrapper .plus', () => {
		let country = countries_data.find(country => country.name.toLowerCase() == $('.input-wrapper input[name="country"]').val().trim().toLowerCase()),
			city = $('.input-wrapper input[name="state"]').val();

		shippingTo(country);

		if (country && city)
			shippingToCity(city);
	})
})

var countries_data = [
	// Русский язык.
	{
		name: 'Беларусь',
		timing: 2,
		code: 'BY'
	},
	{
		name: 'Казахстан',
		timing: 9,
		code: 'KZ'
	},
	{
		name: 'Россия',
		timing: 1,
		code: 'RU'
	},
	// Английский язык.
	{
		name: 'Australia',
		timing: 6,
		code: 'AU'
	},
	{
		name: 'Azerbaijan',
		timing: 6,
		code: 'AZ'
	},
	{
		name: 'Azores',
		timing: 8,
		code: ''
	},
	{
		name: 'Albania',
		timing: 6,
		code: 'AL'
	},
	{
		name: 'Algeria',
		timing: 6,
		code: 'DZ'
	},
	{
		name: 'American virgin islands',
		timing: 8,
		code: 'VI'
	},
	{
		name: 'American samoa',
		timing: 8,
		code: 'AS'
	},
	{
		name: 'Anguilla',
		timing: 8,
		code: 'AI'
	},
	{
		name: 'Andorra',
		timing: 7,
		code: 'AD'
	},
	{
		name: 'Antigua and Barbuda',
		timing: 8,
		code: 'AG'
	},
	{
		name: 'Antilles',
		timing: 8,
		code: ''
	},
	{
		name: 'Argentina',
		timing: 6,
		code: 'AR'
	},
	{
		name: 'Armenia',
		timing: 6,
		code: 'AM'
	},
	{
		name: 'Aruba',
		timing: 8,
		code: 'AW'
	},
	{
		name: 'Bahamas',
		timing: 6,
		code: 'BS'
	},
	{
		name: 'Bangladesh',
		timing: 8,
		code: 'BD'
	},
	{
		name: 'Barbados',
		timing: 8,
		code: 'BB'
	},
	{
		name: 'Barbuda',
		timing: 8,
		code: ''
	},
	{
		name: 'Belize',
		timing: 8,
		code: 'BZ'
	},
	{
		name: 'Belarus',
		timing: 2,
		code: 'BY'
	},
	{
		name: 'Belgium',
		timing: 5,
		code: 'BE'
	},
	{
		name: 'Benin',
		timing: 6,
		code: 'BJ'
	},
	{
		name: 'Ivory Coast',
		timing: 6,
		code: ''
	},
	{
		name: 'Bermuda',
		timing: 8,
		code: 'BM'
	},
	{
		name: 'Bulgaria',
		timing: 6,
		code: 'BG'
	},
	{
		name: 'Bolivia',
		timing: 8,
		code: 'BO'
	},
	{
		name: 'Bonaire',
		timing: 8,
		code: 'BQ'
	},
	{
		name: 'Bosnia and Herzegovina',
		timing: 6,
		code: 'BA'
	},
	{
		name: 'Botswana',
		timing: 6,
		code: 'BW'
	},
	{
		name: 'Brazil',
		timing: 6,
		code: 'BR'
	},
	{
		name: 'British Virgin Islands',
		timing: 8,
		code: 'VG'
	},
	{
		name: 'Brunei',
		timing: 8,
		code: 'BN'
	},
	{
		name: 'Burkina Faso',
		timing: 6,
		code: 'BF'
	},
	{
		name: 'Burundi',
		timing: 6,
		code: 'BI'
	},
	{
		name: 'Butane',
		timing: 8,
		code: 'BT'
	},
	{
		name: 'Wallis and Futuna Islands',
		timing: 8,
		code: 'WF'
	},
	{
		name: 'Vanuatu',
		timing: 8,
		code: 'VU'
	},
	{
		name: 'Vatican',
		timing: 6,
		code: 'VA'
	},
	{
		name: 'United Kingdom',
		timing: 4,
		code: 'GB'
	},
	{
		name: 'Hungary',
		timing: 6,
		code: 'HU'
	},
	{
		name: 'Venezuela',
		timing: 8,
		code: 'VE'
	},
	{
		name: 'Virgin Islands',
		timing: 8,
		code: ''
	},
	{
		name: 'East Timor',
		timing: 8,
		code: 'TL'
	},
	{
		name: 'Vietnam',
		timing: 6,
		code: 'VN'
	},
	{
		name: 'Gaza (West Bank)',
		timing: 8,
		code: ''
	},
	{
		name: 'Haiti',
		timing: 8,
		code: 'HT'
	},
	{
		name: 'Guyana',
		timing: 8,
		code: 'GY'
	},
	{
		name: 'Gambia',
		timing: 6,
		code: 'GM'
	},
	{
		name: 'Ghana',
		timing: 6,
		code: 'GH'
	},
	{
		name: 'Guadeloupe',
		timing: 8,
		code: 'GP'
	},
	{
		name: 'Guatemala',
		timing: 8,
		code: 'GT'
	},
	{
		name: 'Guinea',
		timing: 6,
		code: 'GN'
	},
	{
		name: 'Guinea Bissau',
		timing: 6,
		code: 'GW'
	},
	{
		name: 'Germany',
		timing: 4,
		code: 'DE'
	},
	{
		name: 'Guernsey Islands',
		timing: 6,
		code: 'GG'
	},
	{
		name: 'Gibraltar',
		timing: 6,
		code: 'GI'
	},
	{
		name: 'Holland',
		timing: 4,
		code: 'NL'
	},
	{
		name: 'Honduras',
		timing: 8,
		code: 'HN'
	},
	{
		name: 'Hong Kong',
		timing: 4,
		code: 'HK'
	},
	{
		name: 'Grenada',
		timing: 8,
		code: 'GD'
	},
	{
		name: 'Greenland',
		timing: 6,
		code: 'GL'
	},
	{
		name: 'Greece',
		timing: 4,
		code: 'GR'
	},
	{
		name: 'Georgia',
		timing: 6,
		code: 'GE'
	},
	{
		name: 'Guam',
		timing: 8,
		code: 'GU'
	},
	{
		name: 'Denmark',
		timing: 4,
		code: 'DK'
	},
	{
		name: 'Jersey Islands',
		timing: 6,
		code: 'JE'
	},
	{
		name: 'Djibouti',
		timing: 6,
		code: 'DJ'
	},
	{
		name: 'Dominica',
		timing: 6,
		code: 'DM'
	},
	{
		name: 'Dominican Republic',
		timing: 6,
		code: 'DO'
	},
	{
		name: 'Egypt',
		timing: 6,
		code: 'EG'
	},
	{
		name: 'Zambia',
		timing: 6,
		code: 'ZM'
	},
	{
		name: 'West Bank (Gaza)',
		timing: 8,
		code: ''
	},
	{
		name: 'Cape Verde island',
		timing: 6,
		code: ''
	},
	{
		name: 'Zimbabwe',
		timing: 6,
		code: 'ZW'
	},
	{
		name: 'Israel',
		timing: 6,
		code: 'IL'
	},
	{
		name: 'India',
		timing: 6,
		code: 'IN'
	},
	{
		name: 'Indonesia',
		timing: 6,
		code: 'ID'
	},
	{
		name: 'Jordan',
		timing: 3,
		code: 'JO'
	},
	{
		name: 'Iraq',
		timing: 5,
		code: 'IQ'
	},
	{
		name: 'Ireland',
		timing: 4,
		code: 'IE'
	},
	{
		name: 'Iceland',
		timing: 6,
		code: 'IS'
	},
	{
		name: 'Spain',
		timing: 4,
		code: 'ES'
	},
	{
		name: 'Italy',
		timing: 4,
		code: 'IT'
	},
	{
		name: 'Yap (Micronesia, Federal States)',
		timing: 8,
		code: ''
	},
	{
		name: 'Yemen',
		timing: 8,
		code: 'YE'
	},
	{
		name: 'Cape Verde',
		timing: 6,
		code: 'CV'
	},
	{
		name: 'Kazakhstan',
		timing: 9,
		code: 'KZ'
	},
	{
		name: 'Cayman islands',
		timing: 8,
		code: 'KY'
	},
	{
		name: 'Cambodia',
		timing: 8,
		code: 'KH'
	},
	{
		name: 'Cameroon',
		timing: 6,
		code: 'CM'
	},
	{
		name: 'Canada',
		timing: 4,
		code: 'CA'
	},
	{
		name: 'Canary Islands',
		timing: 6,
		code: 'IC'
	},
	{
		name: 'Kenya',
		timing: 6,
		code: 'KE'
	},
	{
		name: 'Cyprus',
		timing: 6,
		code: 'CY'
	},
	{
		name: 'Kiribati',
		timing: 8,
		code: 'KI'
	},
	{
		name: 'China',
		timing: 6,
		code: 'CN'
	},
	{
		name: 'Colombia',
		timing: 6,
		code: 'CO'
	},
	{
		name: 'Comoros',
		timing: 6,
		code: 'KM'
	},
	{
		name: 'Congo',
		timing: 6,
		code: 'CG'
	},
	{
		name: 'Congo, Democratic Republic',
		timing: 6,
		code: 'CD'
	},
	{
		name: 'Korea, South',
		timing: 4,
		code: 'KR'
	},
	{
		name: 'Kosovo',
		timing: 6,
		code: 'XK'
	},
	{
		name: 'Kosray (Micronesia, Federal States)',
		timing: 8,
		code: ''
	},
	{
		name: 'Costa Rica',
		timing: 8,
		code: 'CR'
	},
	{
		name: 'Ivory Coast',
		timing: 6,
		code: 'CI'
	},
	{
		name: 'Kuwait',
		timing: 8,
		code: 'KW'
	},
	{
		name: 'Cook Islands',
		timing: 8,
		code: 'CK'
	},
	{
		name: 'Curacao',
		timing: 8,
		code: 'CW'
	},
	{
		name: 'Laos',
		timing: 8,
		code: 'LA'
	},
	{
		name: 'Latvia',
		timing: 6,
		code: 'LV'
	},
	{
		name: 'Lesotho',
		timing: 6,
		code: 'LS'
	},
	{
		name: 'Liberia',
		timing: 6,
		code: 'LR'
	},
	{
		name: 'Lebanon',
		timing: 8,
		code: 'LB'
	},
	{
		name: 'Libya',
		timing: 6,
		code: 'LY'
	},
	{
		name: 'Lithuania',
		timing: 6,
		code: 'LT'
	},
	{
		name: 'Liechtenstein',
		timing: 6,
		code: 'LI'
	},
	{
		name: 'Luxembourg',
		timing: 6,
		code: 'LU'
	},
	{
		name: 'Mauritius',
		timing: 8,
		code: 'MU'
	},
	{
		name: 'Mauritania',
		timing: 6,
		code: 'MR'
	},
	{
		name: 'Madagascar',
		timing: 6,
		code: 'MG'
	},
	{
		name: 'Madeira',
		timing: 8,
		code: ''
	},
	{
		name: 'Mayotte',
		timing: 6,
		code: 'YT'
	},
	{
		name: 'Macau',
		timing: 8,
		code: 'MO'
	},
	{
		name: 'Macedonia',
		timing: 6,
		code: 'MK'
	},
	{
		name: 'Malawi',
		timing: 6,
		code: 'MW'
	},
	{
		name: 'Malaysia',
		timing: 6,
		code: 'MY'
	},
	{
		name: 'Mali',
		timing: 6,
		code: 'ML'
	},
	{
		name: 'Maldives',
		timing: 8,
		code: 'MV'
	},
	{
		name: 'Morocco',
		timing: 6,
		code: 'MA'
	},
	{
		name: 'Martinique',
		timing: 8,
		code: 'MQ'
	},
	{
		name: 'Marshall Islands',
		timing: 8,
		code: 'MH'
	},
	{
		name: 'Mexico',
		timing: 4,
		code: 'MX'
	},
	{
		name: 'Melilla',
		timing: 6,
		code: ''
	},
	{
		name: 'Mozambique',
		timing: 6,
		code: 'MZ'
	},
	{
		name: 'Moldavia',
		timing: 6,
		code: 'MD'
	},
	{
		name: 'Monaco',
		timing: 6,
		code: 'MC'
	},
	{
		name: 'Mongolia',
		timing: 8,
		code: 'MN'
	},
	{
		name: 'Montserrat',
		timing: 8,
		code: 'MS'
	},
	{
		name: 'Myanmar (Burma)',
		timing: 8,
		code: 'MM'
	},
	{
		name: 'Maine island',
		timing: 6,
		code: 'IM'
	},
	{
		name: 'Namibia',
		timing: 6,
		code: 'NA'
	},
	{
		name: 'Nevis (Saint Kitts)',
		timing: 8,
		code: 'KN'
	},
	{
		name: 'Nepal',
		timing: 8,
		code: 'NP'
	},
	{
		name: 'Niger',
		timing: 6,
		code: 'NE'
	},
	{
		name: 'Nigeria',
		timing: 6,
		code: 'NG'
	},
	{
		name: 'Netherlands antilles',
		timing: 8,
		code: ''
	},
	{
		name: 'Netherlands',
		timing: 4,
		code: 'NL'
	},
	{
		name: 'Nicaragua',
		timing: 3,
		code: 'NI'
	},
	{
		name: 'New Zealand',
		timing: 6,
		code: 'NZ'
	},
	{
		name: 'New Caledonia',
		timing: 8,
		code: 'NC'
	},
	{
		name: 'Norway',
		timing: 4,
		code: 'NO'
	},
	{
		name: 'Channel Islands',
		timing: 6,
		code: ''
	},
	{
		name: 'Norfolk island',
		timing: 8,
		code: 'NF'
	},
	{
		name: 'UAE',
		timing: 6,
		code: 'AE'
	},
	{
		name: 'Oman',
		timing: 6,
		code: 'OM'
	},
	{
		name: 'Pakistan',
		timing: 8,
		code: 'PK'
	},
	{
		name: 'Palau',
		timing: 8,
		code: 'PW'
	},
	{
		name: 'Panama',
		timing: 8,
		code: 'PA'
	},
	{
		name: 'Papua New Guinea',
		timing: 8,
		code: 'PG'
	},
	{
		name: 'Paraguay',
		timing: 6,
		code: 'PY'
	},
	{
		name: 'Peru',
		timing: 6,
		code: 'PE'
	},
	{
		name: 'Poland',
		timing: 6,
		code: 'PL'
	},
	{
		name: 'Ponape (Micronesia, Federal States)',
		timing: 8,
		code: ''
	},
	{
		name: 'Portugal',
		timing: 4,
		code: 'PT'
	},
	{
		name: 'Reunion',
		timing: 6,
		code: 'RE'
	},
	{
		name: 'Russia',
		timing: 1,
		code: 'RU'
	},
	{
		name: 'Rota (Northern Mariana Islands)',
		timing: 6,
		code: ''
	},
	{
		name: 'Rwanda',
		timing: 6,
		code: 'RW'
	},
	{
		name: 'Romania',
		timing: 6,
		code: 'RO'
	},
	{
		name: 'San marino',
		timing: 6,
		code: 'SM'
	},
	{
		name: 'Saudi Arabia',
		timing: 6,
		code: 'SA'
	},
	{
		name: 'Swaziland (eswatini)',
		timing: 6,
		code: 'SZ'
	},
	{
		name: 'Northern Ireland',
		timing: 6,
		code: 'GB'
	},
	{
		name: 'Northern Mariana Islands',
		timing: 8,
		code: 'MP'
	},
	{
		name: 'Seychelles',
		timing: 8,
		code: 'SC'
	},
	{
		name: 'Saint Bartheleme',
		timing: 8,
		code: ''
	},
	{
		name: 'Senegal',
		timing: 6,
		code: 'SN'
	},
	{
		name: 'Saint Lucia',
		timing: 8,
		code: 'LC'
	},
	{
		name: 'Saint Vincent',
		timing: 8,
		code: 'VC'
	},
	{
		name: 'Saint John (US Virgin Islands)',
		timing: 8,
		code: ''
	},
	{
		name: 'Saint Kitts',
		timing: 8,
		code: 'KN'
	},
	{
		name: 'Saint Christopher (Saint Kitts)',
		timing: 8,
		code: ''
	},
	{
		name: 'Saint Croix (US Virgin Islands)',
		timing: 8,
		code: ''
	},
	{
		name: 'Saint Maarten',
		timing: 8,
		code: ''
	},
	{
		name: 'Saint Martin (Guadeloupe)',
		timing: 8,
		code: 'GP'
	},
	{
		name: 'Saint Thomas (US Virgin Islands)',
		timing: 8,
		code: ''
	},
	{
		name: 'Serbia',
		timing: 6,
		code: 'RS'
	},
	{
		name: 'Ceuta',
		timing: 6,
		code: ''
	},
	{
		name: 'Singapore',
		timing: 6,
		code: 'SG'
	},
	{
		name: 'Sint Eustatius',
		timing: 8,
		code: 'BQ'
	},
	{
		name: 'Slovakia',
		timing: 6,
		code: 'SK'
	},
	{
		name: 'Solomon islands',
		timing: 7,
		code: 'SB'
	},
	{
		name: 'Suriname',
		timing: 8,
		code: 'SR'
	},
	{
		name: 'USA',
		timing: 4,
		code: 'US'
	},
	{
		name: 'Sierra leone',
		timing: 6,
		code: 'SL'
	},
	{
		name: 'Tajikistan',
		timing: 8,
		code: 'TJ'
	},
	{
		name: 'Tahiti',
		timing: 8,
		code: ''
	},
	{
		name: 'Taiwan',
		timing: 6,
		code: 'TW'
	},
	{
		name: 'Thailand',
		timing: 6,
		code: 'TH'
	},
	{
		name: 'Tanzania',
		timing: 6,
		code: 'TZ'
	},
	{
		name: 'Tignan (Northern Mariana Islands)',
		timing: 8,
		code: ''
	},
	{
		name: 'Togo',
		timing: 6,
		code: 'TG'
	},
	{
		name: 'Tonga',
		timing: 8,
		code: 'TO'
	},
	{
		name: 'Trinidad and Tobago',
		timing: 8,
		code: 'TT'
	},
	{
		name: 'Truk (Micronesia, Federal States)',
		timing: 8,
		code: ''
	},
	{
		name: 'Tuvalu',
		timing: 8,
		code: 'TV'
	},
	{
		name: 'Tunisia',
		timing: 6,
		code: 'TN'
	},
	{
		name: 'Turks and Caicos Islands',
		timing: 8,
		code: 'TC'
	},
	{
		name: 'Turkey',
		timing: 6,
		code: 'TR'
	},
	{
		name: 'Uzbekistan',
		timing: 8,
		code: 'UZ'
	},
	{
		name: 'Wales',
		timing: 6,
		code: ''
	},
	{
		name: 'Philippines',
		timing: 6,
		code: 'PH'
	},
	{
		name: 'Finland',
		timing: 6,
		code: 'FI'
	},
	{
		name: 'France',
		timing: 4,
		code: 'FR'
	},
	{
		name: 'French guiana',
		timing: 8,
		code: 'GF'
	},
	{
		name: 'French polynesia',
		timing: 8,
		code: 'PF'
	},
	{
		name: 'Croatia',
		timing: 6,
		code: 'HR'
	},
	{
		name: 'Central African Republic',
		timing: 6,
		code: 'CF'
	},
	{
		name: 'Chad',
		timing: 6,
		code: 'TD'
	},
	{
		name: 'Montenegro',
		timing: 6,
		code: 'ME'
	},
	{
		name: 'Chile',
		timing: 8,
		code: 'CL'
	},
	{
		name: 'Scotland',
		timing: 4,
		code: ''
	},
	{
		name: 'Sri Lanka',
		timing: 8,
		code: 'LK'
	},
	{
		name: 'Ecuador',
		timing: 8,
		code: 'EC'
	},
	{
		name: 'Equatorial Guinea',
		timing: 6,
		code: 'GQ'
	},
	{
		name: 'Eritrea',
		timing: 6,
		code: 'ER'
	},
	{
		name: 'Estonia',
		timing: 6,
		code: 'EE'
	},
	{
		name: 'Ethiopia',
		timing: 6,
		code: 'ET'
	},
	{
		name: 'South Africa',
		timing: 6,
		code: ''
	},
	{
		name: 'Union island',
		timing: 8,
		code: ''
	},
	{
		name: 'Jamaica',
		timing: 8,
		code: 'JM'
	},
	{
		name: 'Japan',
		timing: 4,
		code: 'JP'
	},
];

var cities_data = {
	"RU": [
		{
			"name": "Москва",
			"timing": 3
		},
		{
			"name": "40 лет Октября",
			"timing": 4
		},
		{
			"name": "Абакан",
			"timing": 4
		},
		{
			"name": "Абинск",
			"timing": 5
		},
		{
			"name": "Абрамовка",
			"timing": 4
		},
		{
			"name": "Абрамцево",
			"timing": 4
		},
		{
			"name": "Абрау-Дюрсо",
			"timing": 3
		},
		{
			"name": "Авдеево",
			"timing": 4
		},
		{
			"name": "Авдотьино",
			"timing": 3
		},
		{
			"name": "Авсюнино",
			"timing": 4
		},
		{
			"name": "Агой",
			"timing": 3
		},
		{
			"name": "Агрия",
			"timing": 4
		},
		{
			"name": "Агрыз",
			"timing": 5
		},
		{
			"name": "Адыгейск",
			"timing": 5
		},
		{
			"name": "Азнакаево",
			"timing": 4
		},
		{
			"name": "Азов",
			"timing": 5
		},
		{
			"name": "Акатьево",
			"timing": 4
		},
		{
			"name": "Аксай",
			"timing": 5
		},
		{
			"name": "Аксинино",
			"timing": 4
		},
		{
			"name": "Аксиньино",
			"timing": 2
		},
		{
			"name": "Алабино",
			"timing": 4
		},
		{
			"name": "Алабушево",
			"timing": 4
		},
		{
			"name": "Алапаевск",
			"timing": 6
		},
		{
			"name": "Алдан",
			"timing": 11
		},
		{
			"name": "Алейск",
			"timing": 6
		},
		{
			"name": "Александров",
			"timing": 3
		},
		{
			"name": "Александрово",
			"timing": 4
		},
		{
			"name": "Александровск",
			"timing": 3
		},
		{
			"name": "Алексеевка",
			"timing": 5
		},
		{
			"name": "Алексеевка, Алексеевский район, Белгородская обл.",
			"timing": 4
		},
		{
			"name": "Алексин",
			"timing": 3
		},
		{
			"name": "Алексино",
			"timing": 4
		},
		{
			"name": "Алексино-шатур",
			"timing": 4
		},
		{
			"name": "Алешня",
			"timing": 3
		},
		{
			"name": "Алпатьево",
			"timing": 4
		},
		{
			"name": "Алтайское, Алтайский край",
			"timing": 4
		},
		{
			"name": "Алушта",
			"timing": 4
		},
		{
			"name": "Алферьево",
			"timing": 4
		},
		{
			"name": "Алфимово",
			"timing": 4
		},
		{
			"name": "Альметьевск",
			"timing": 4
		},
		{
			"name": "Амурск",
			"timing": 7
		},
		{
			"name": "Анапа",
			"timing": 5
		},
		{
			"name": "Анапская",
			"timing": 5
		},
		{
			"name": "Ангарск",
			"timing": 6
		},
		{
			"name": "Анджиевский",
			"timing": 2
		},
		{
			"name": "Андреевка",
			"timing": 2
		},
		{
			"name": "Андрейково",
			"timing": 2
		},
		{
			"name": "Анжеро-Судженск",
			"timing": 5
		},
		{
			"name": "Анива",
			"timing": 4
		},
		{
			"name": "Апатиты",
			"timing": 6
		},
		{
			"name": "Апрелевка",
			"timing": 4
		},
		{
			"name": "Апшеронск",
			"timing": 4
		},
		{
			"name": "Арамиль",
			"timing": 5
		},
		{
			"name": "Аргун",
			"timing": 3
		},
		{
			"name": "Арзамас",
			"timing": 4
		},
		{
			"name": "Армавир",
			"timing": 5
		},
		{
			"name": "Армянск",
			"timing": 4
		},
		{
			"name": "Арсеньев",
			"timing": 7
		},
		{
			"name": "Арск",
			"timing": 4
		},
		{
			"name": "Артем",
			"timing": 7
		},
		{
			"name": "Артём",
			"timing": 6
		},
		{
			"name": "Артемовский",
			"timing": 6
		},
		{
			"name": "Арти, Свердловская обл.",
			"timing": 6
		},
		{
			"name": "Архангельск",
			"timing": 4
		},
		{
			"name": "Архангельское",
			"timing": 4
		},
		{
			"name": "Архипо-Осиповка",
			"timing": 5
		},
		{
			"name": "Асбест",
			"timing": 5
		},
		{
			"name": "Асино",
			"timing": 6
		},
		{
			"name": "Астапово",
			"timing": 4
		},
		{
			"name": "Астрахань",
			"timing": 4
		},
		{
			"name": "Атепцево",
			"timing": 4
		},
		{
			"name": "Афанасовка",
			"timing": 4
		},
		{
			"name": "Афипский",
			"timing": 4
		},
		{
			"name": "Ахтубинск",
			"timing": 5
		},
		{
			"name": "Ачинск",
			"timing": 4
		},
		{
			"name": "Аша, Ашинский р-н",
			"timing": 6
		},
		{
			"name": "Ашитково",
			"timing": 4
		},
		{
			"name": "Ашукино",
			"timing": 2
		},
		{
			"name": "Бабенки",
			"timing": 4
		},
		{
			"name": "Бабяково",
			"timing": 2
		},
		{
			"name": "Бавлы",
			"timing": 4
		},
		{
			"name": "Баксан",
			"timing": 6
		},
		{
			"name": "Бакшеево",
			"timing": 4
		},
		{
			"name": "Балабаново",
			"timing": 3
		},
		{
			"name": "Балаково",
			"timing": 5
		},
		{
			"name": "Балахна",
			"timing": 3
		},
		{
			"name": "Балашиха",
			"timing": 3
		},
		{
			"name": "Балашов",
			"timing": 5
		},
		{
			"name": "Балезино",
			"timing": 6
		},
		{
			"name": "Барабаново",
			"timing": 4
		},
		{
			"name": "Барановское",
			"timing": 4
		},
		{
			"name": "Барвиха",
			"timing": 2
		},
		{
			"name": "Барвиха Санаторий",
			"timing": 2
		},
		{
			"name": "Барда, Бардымский р-н",
			"timing": 5
		},
		{
			"name": "Барнаул",
			"timing": 4
		},
		{
			"name": "Барсово",
			"timing": 3
		},
		{
			"name": "Барсуки",
			"timing": 4
		},
		{
			"name": "Барынино",
			"timing": 4
		},
		{
			"name": "Барышево",
			"timing": 3
		},
		{
			"name": "Батайск",
			"timing": 4
		},
		{
			"name": "Батырево, Батыревский р-н",
			"timing": 5
		},
		{
			"name": "Бахчисарай",
			"timing": 4
		},
		{
			"name": "Безенчук",
			"timing": 5
		},
		{
			"name": "Беззубово",
			"timing": 4
		},
		{
			"name": "Бекасово",
			"timing": 4
		},
		{
			"name": "Белая Глина",
			"timing": 8
		},
		{
			"name": "Белая дача",
			"timing": 2
		},
		{
			"name": "Белая Калитва",
			"timing": 5
		},
		{
			"name": "Белая Колпь",
			"timing": 4
		},
		{
			"name": "Белгород",
			"timing": 4
		},
		{
			"name": "Белебей",
			"timing": 5
		},
		{
			"name": "Белово",
			"timing": 4
		},
		{
			"name": "Белогорск",
			"timing": 6
		},
		{
			"name": "Белогорск (Крым)",
			"timing": 5
		},
		{
			"name": "Белозерский",
			"timing": 4
		},
		{
			"name": "Белокуриха",
			"timing": 4
		},
		{
			"name": "Белоозерский",
			"timing": 4
		},
		{
			"name": "Белоомут",
			"timing": 4
		},
		{
			"name": "Белорецк",
			"timing": 6
		},
		{
			"name": "Белореченск",
			"timing": 5
		},
		{
			"name": "Белые Колодези",
			"timing": 4
		},
		{
			"name": "Белые Столбы",
			"timing": 4
		},
		{
			"name": "Белый Раст",
			"timing": 3
		},
		{
			"name": "Белый Яр",
			"timing": 3
		},
		{
			"name": "Беляная Гора",
			"timing": 4
		},
		{
			"name": "Беляниново",
			"timing": 2
		},
		{
			"name": "Бердск",
			"timing": 3
		},
		{
			"name": "Береговое",
			"timing": 3
		},
		{
			"name": "Березка Дом отдыха",
			"timing": 4
		},
		{
			"name": "Березники",
			"timing": 6
		},
		{
			"name": "Березняки",
			"timing": 4
		},
		{
			"name": "Березовка, Красноярский край",
			"timing": 5
		},
		{
			"name": "Березовский",
			"timing": 5
		},
		{
			"name": "Березовский (Кузбасс)",
			"timing": 4
		},
		{
			"name": "Берники",
			"timing": 4
		},
		{
			"name": "Беслан, Северная Осетия респ.",
			"timing": 5
		},
		{
			"name": "Бессоновка",
			"timing": 3
		},
		{
			"name": "Бетта",
			"timing": 4
		},
		{
			"name": "Бийск",
			"timing": 4
		},
		{
			"name": "Бикей",
			"timing": 4
		},
		{
			"name": "Бикин",
			"timing": 7
		},
		{
			"name": "Биорки",
			"timing": 4
		},
		{
			"name": "Бирево",
			"timing": 4
		},
		{
			"name": "Биробиджан",
			"timing": 5
		},
		{
			"name": "Бирск",
			"timing": 5
		},
		{
			"name": "Бисерово",
			"timing": 3
		},
		{
			"name": "Благовещенка, Алтайский край",
			"timing": 6
		},
		{
			"name": "Благовещенск",
			"timing": 6
		},
		{
			"name": "Благовещенск, Башкортостан респ.",
			"timing": 5
		},
		{
			"name": "Бобково",
			"timing": 4
		},
		{
			"name": "Бобров, Бобровский р-н",
			"timing": 4
		},
		{
			"name": "Богандинский",
			"timing": 3
		},
		{
			"name": "Богатищево",
			"timing": 4
		},
		{
			"name": "Богашево",
			"timing": 2
		},
		{
			"name": "Богданович",
			"timing": 6
		},
		{
			"name": "Богородицк",
			"timing": 4
		},
		{
			"name": "Богородск",
			"timing": 3
		},
		{
			"name": "Богородское",
			"timing": 4
		},
		{
			"name": "Богучар",
			"timing": 4
		},
		{
			"name": "Бодайбо",
			"timing": 7
		},
		{
			"name": "Бологое",
			"timing": 4
		},
		{
			"name": "Болохово",
			"timing": 3
		},
		{
			"name": "Болычево",
			"timing": 4
		},
		{
			"name": "Большево",
			"timing": 2
		},
		{
			"name": "Большеустьикинское",
			"timing": 6
		},
		{
			"name": "Большие Вяземы",
			"timing": 2
		},
		{
			"name": "Большие Дворы",
			"timing": 4
		},
		{
			"name": "Большое Алексеевское",
			"timing": 4
		},
		{
			"name": "Большое Гридино",
			"timing": 4
		},
		{
			"name": "Большое Грызлово",
			"timing": 4
		},
		{
			"name": "Большое Савино",
			"timing": 3
		},
		{
			"name": "Большое Село",
			"timing": 3
		},
		{
			"name": "Большой Камень",
			"timing": 6
		},
		{
			"name": "Бор",
			"timing": 3
		},
		{
			"name": "Борзя",
			"timing": 7
		},
		{
			"name": "Борисово",
			"timing": 4
		},
		{
			"name": "Борисоглебск",
			"timing": 5
		},
		{
			"name": "Борисоглебский",
			"timing": 2
		},
		{
			"name": "Боровичи",
			"timing": 4
		},
		{
			"name": "Боровково",
			"timing": 3
		},
		{
			"name": "Боровск",
			"timing": 3
		},
		{
			"name": "Боровский",
			"timing": 3
		},
		{
			"name": "Бородино",
			"timing": 5
		},
		{
			"name": "Бортниково",
			"timing": 4
		},
		{
			"name": "Ботово",
			"timing": 2
		},
		{
			"name": "Бояркино",
			"timing": 4
		},
		{
			"name": "Братовщина",
			"timing": 2
		},
		{
			"name": "Братск",
			"timing": 5
		},
		{
			"name": "Бронницы",
			"timing": 3
		},
		{
			"name": "Брюховецкая",
			"timing": 5
		},
		{
			"name": "Брянск",
			"timing": 3
		},
		{
			"name": "Бугры",
			"timing": 2
		},
		{
			"name": "Бугульма",
			"timing": 4
		},
		{
			"name": "Бугуруслан",
			"timing": 5
		},
		{
			"name": "Буденновск",
			"timing": 6
		},
		{
			"name": "Буденоветц",
			"timing": 4
		},
		{
			"name": "Бужаниново",
			"timing": 4
		},
		{
			"name": "Бужарово",
			"timing": 4
		},
		{
			"name": "Бузулук",
			"timing": 4
		},
		{
			"name": "Буинск",
			"timing": 5
		},
		{
			"name": "Буйнакск",
			"timing": 5
		},
		{
			"name": "Булаково",
			"timing": 4
		},
		{
			"name": "Булычево",
			"timing": 4
		},
		{
			"name": "Буньково",
			"timing": 4
		},
		{
			"name": "Бунятино",
			"timing": 2
		},
		{
			"name": "Бурцево",
			"timing": 4
		},
		{
			"name": "Бутурлиновка, Бутурлиновс-кий р-н, Воронежская обл.",
			"timing": 5
		},
		{
			"name": "Быково",
			"timing": 4
		},
		{
			"name": "Бяудэ",
			"timing": 4
		},
		{
			"name": "Валдай",
			"timing": 4
		},
		{
			"name": "Валуево",
			"timing": 2
		},
		{
			"name": "Валуйки",
			"timing": 3
		},
		{
			"name": "Валуйки, Валуйский р-н",
			"timing": 5
		},
		{
			"name": "Ванино",
			"timing": 5
		},
		{
			"name": "Ванюки",
			"timing": 2
		},
		{
			"name": "Васильевское",
			"timing": 4
		},
		{
			"name": "Васькино",
			"timing": 4
		},
		{
			"name": "Ватутенки",
			"timing": 2
		},
		{
			"name": "Введенское",
			"timing": 4
		},
		{
			"name": "Великие Луки",
			"timing": 4
		},
		{
			"name": "Великий Двор",
			"timing": 4
		},
		{
			"name": "Великий Новгород",
			"timing": 4
		},
		{
			"name": "Великий Устюг",
			"timing": 5
		},
		{
			"name": "Вельск",
			"timing": 4
		},
		{
			"name": "Вельяминово",
			"timing": 4
		},
		{
			"name": "Венев",
			"timing": 3
		},
		{
			"name": "Вербилки",
			"timing": 4
		},
		{
			"name": "Верейка",
			"timing": 4
		},
		{
			"name": "Верещагино",
			"timing": 5
		},
		{
			"name": "Верея",
			"timing": 4
		},
		{
			"name": "Верхнебаканский",
			"timing": 4
		},
		{
			"name": "Верхнее Калино",
			"timing": 2
		},
		{
			"name": "Верхнемячково",
			"timing": 2
		},
		{
			"name": "Верхний Тагил",
			"timing": 6
		},
		{
			"name": "Верхняя Пышма",
			"timing": 5
		},
		{
			"name": "Верхняя Салда",
			"timing": 6
		},
		{
			"name": "Верховажье",
			"timing": 5
		},
		{
			"name": "Веселево",
			"timing": 4
		},
		{
			"name": "Весна",
			"timing": 8
		},
		{
			"name": "Вешенская",
			"timing": 6
		},
		{
			"name": "Видное",
			"timing": 3
		},
		{
			"name": "Винзили",
			"timing": 3
		},
		{
			"name": "Виноградово",
			"timing": 4
		},
		{
			"name": "Витязево",
			"timing": 3
		},
		{
			"name": "Вичуга",
			"timing": 5
		},
		{
			"name": "Вишняковские Дачи",
			"timing": 3
		},
		{
			"name": "Владивосток",
			"timing": 7
		},
		{
			"name": "Владикавказ",
			"timing": 5
		},
		{
			"name": "Владимир",
			"timing": 4
		},
		{
			"name": "Власово",
			"timing": 4
		},
		{
			"name": "Внуково",
			"timing": 2
		},
		{
			"name": "Воздвиженское",
			"timing": 4
		},
		{
			"name": "Вознесенское",
			"timing": 6
		},
		{
			"name": "Волгоград",
			"timing": 4
		},
		{
			"name": "Волгодонск",
			"timing": 5
		},
		{
			"name": "Волгореченск, Костромская обл.",
			"timing": 4
		},
		{
			"name": "Волжск",
			"timing": 3
		},
		{
			"name": "Волжск, Волжский р-н",
			"timing": 5
		},
		{
			"name": "Волжский",
			"timing": 4
		},
		{
			"name": "Волково",
			"timing": 4
		},
		{
			"name": "Вологда",
			"timing": 3
		},
		{
			"name": "Володарск",
			"timing": 4
		},
		{
			"name": "Волоколамск",
			"timing": 3
		},
		{
			"name": "Волосово",
			"timing": 4
		},
		{
			"name": "Волхов",
			"timing": 5
		},
		{
			"name": "Волченки",
			"timing": 4
		},
		{
			"name": "Вольно-Надеждинское",
			"timing": 9
		},
		{
			"name": "Вольск",
			"timing": 6
		},
		{
			"name": "Воробьево",
			"timing": 2
		},
		{
			"name": "Воронеж",
			"timing": 3
		},
		{
			"name": "Вороново",
			"timing": 4
		},
		{
			"name": "Воротынск",
			"timing": 3
		},
		{
			"name": "Ворсино",
			"timing": 3
		},
		{
			"name": "Ворсма",
			"timing": 5
		},
		{
			"name": "Воскресенск",
			"timing": 3
		},
		{
			"name": "Воскресенское",
			"timing": 2
		},
		{
			"name": "Воскресенское поселение",
			"timing": 3
		},
		{
			"name": "Восход",
			"timing": 3
		},
		{
			"name": "Воткинск",
			"timing": 4
		},
		{
			"name": "Врангель",
			"timing": 5
		},
		{
			"name": "Всеволожск",
			"timing": 3
		},
		{
			"name": "Выборг",
			"timing": 5
		},
		{
			"name": "Выкопанка",
			"timing": 4
		},
		{
			"name": "Выкса",
			"timing": 4
		},
		{
			"name": "Выселки",
			"timing": 5
		},
		{
			"name": "Высокая Гора",
			"timing": 3
		},
		{
			"name": "Высоковск",
			"timing": 4
		},
		{
			"name": "Высоцк",
			"timing": 3
		},
		{
			"name": "Вышегород",
			"timing": 4
		},
		{
			"name": "Вышний Волочёк, гор.окр. Вышний Волочёк",
			"timing": 4
		},
		{
			"name": "Вязники",
			"timing": 4
		},
		{
			"name": "Вятские Поляны",
			"timing": 5
		},
		{
			"name": "Гаврилов-Ям",
			"timing": 3
		},
		{
			"name": "Гагарин",
			"timing": 4
		},
		{
			"name": "Гай",
			"timing": 5
		},
		{
			"name": "Галич",
			"timing": 4
		},
		{
			"name": "Гамово",
			"timing": 4
		},
		{
			"name": "Ганусово",
			"timing": 2
		},
		{
			"name": "Гарь-Покровское",
			"timing": 4
		},
		{
			"name": "Гатка",
			"timing": 5
		},
		{
			"name": "Гатчина",
			"timing": 4
		},
		{
			"name": "Гдов",
			"timing": 5
		},
		{
			"name": "Геленджик",
			"timing": 5
		},
		{
			"name": "Георгиевск",
			"timing": 5
		},
		{
			"name": "Герцена им.санаторий",
			"timing": 2
		},
		{
			"name": "Гжель",
			"timing": 2
		},
		{
			"name": "Гиагинская",
			"timing": 5
		},
		{
			"name": "Гидроузла Поселок",
			"timing": 4
		},
		{
			"name": "Гизедьдере",
			"timing": 4
		},
		{
			"name": "Глазов",
			"timing": 5
		},
		{
			"name": "Глубокое",
			"timing": 4
		},
		{
			"name": "Гойтх",
			"timing": 4
		},
		{
			"name": "Голицыно",
			"timing": 3
		},
		{
			"name": "Головинка",
			"timing": 4
		},
		{
			"name": "Головково",
			"timing": 4
		},
		{
			"name": "Голышманово",
			"timing": 6
		},
		{
			"name": "Горбово Фабрика",
			"timing": 4
		},
		{
			"name": "Горелово",
			"timing": 3
		},
		{
			"name": "Горетово",
			"timing": 4
		},
		{
			"name": "Горки",
			"timing": 4
		},
		{
			"name": "Горки 10",
			"timing": 2
		},
		{
			"name": "Горки 2",
			"timing": 2
		},
		{
			"name": "Горки-10, Одинцовский р-н",
			"timing": 3
		},
		{
			"name": "Горки-коломенские",
			"timing": 4
		},
		{
			"name": "Горловка",
			"timing": 2
		},
		{
			"name": "Горно-Алтайск",
			"timing": 4
		},
		{
			"name": "Горнозаводск, Пермский край",
			"timing": 6
		},
		{
			"name": "Горный",
			"timing": 8
		},
		{
			"name": "Горный Щит, Свердловская обл.",
			"timing": 6
		},
		{
			"name": "Горняк",
			"timing": 6
		},
		{
			"name": "Городец",
			"timing": 4
		},
		{
			"name": "Городище",
			"timing": 4
		},
		{
			"name": "Гороховец",
			"timing": 2
		},
		{
			"name": "Горшково",
			"timing": 4
		},
		{
			"name": "Горы",
			"timing": 4
		},
		{
			"name": "Горячеводский",
			"timing": 3
		},
		{
			"name": "Горячий Ключ",
			"timing": 5
		},
		{
			"name": "Грабово",
			"timing": 3
		},
		{
			"name": "Григорьевское",
			"timing": 4
		},
		{
			"name": "Гришино",
			"timing": 4
		},
		{
			"name": "Грозный",
			"timing": 4
		},
		{
			"name": "Грязи",
			"timing": 4
		},
		{
			"name": "Губаха",
			"timing": 6
		},
		{
			"name": "Губино",
			"timing": 4
		},
		{
			"name": "Губкин",
			"timing": 4
		},
		{
			"name": "Губкинский",
			"timing": 6
		},
		{
			"name": "Гудермес",
			"timing": 4
		},
		{
			"name": "Гуково",
			"timing": 5
		},
		{
			"name": "Гулькевичи",
			"timing": 5
		},
		{
			"name": "Гусь-Хрустальный",
			"timing": 5
		},
		{
			"name": "Давыдково",
			"timing": 4
		},
		{
			"name": "Давыдово",
			"timing": 4
		},
		{
			"name": "Далматово",
			"timing": 6
		},
		{
			"name": "Дальнегорск",
			"timing": 10
		},
		{
			"name": "Дарищи",
			"timing": 4
		},
		{
			"name": "Датта",
			"timing": 5
		},
		{
			"name": "Дашковка",
			"timing": 4
		},
		{
			"name": "Дворики",
			"timing": 4
		},
		{
			"name": "Девица",
			"timing": 2
		},
		{
			"name": "Дегтярск, Свердловская обл.",
			"timing": 6
		},
		{
			"name": "Деденево",
			"timing": 4
		},
		{
			"name": "Дединово",
			"timing": 4
		},
		{
			"name": "Дедовск",
			"timing": 4
		},
		{
			"name": "Демидов",
			"timing": 3
		},
		{
			"name": "Демихово",
			"timing": 4
		},
		{
			"name": "Денежниково",
			"timing": 2
		},
		{
			"name": "Деньково",
			"timing": 4
		},
		{
			"name": "Дербент",
			"timing": 5
		},
		{
			"name": "Десногорск",
			"timing": 5
		},
		{
			"name": "Джалиль",
			"timing": 3
		},
		{
			"name": "Джанкой",
			"timing": 4
		},
		{
			"name": "Джанхот",
			"timing": 3
		},
		{
			"name": "Джубга",
			"timing": 4
		},
		{
			"name": "Дзержинск",
			"timing": 3
		},
		{
			"name": "Дзержинский",
			"timing": 3
		},
		{
			"name": "Дивноморское",
			"timing": 4
		},
		{
			"name": "Димитровград",
			"timing": 3
		},
		{
			"name": "Динская",
			"timing": 5
		},
		{
			"name": "Дмитриевка",
			"timing": 4
		},
		{
			"name": "Дмитров",
			"timing": 3
		},
		{
			"name": "Дмитрово",
			"timing": 2
		},
		{
			"name": "Дмитровский Погост",
			"timing": 4
		},
		{
			"name": "Добрыниха",
			"timing": 4
		},
		{
			"name": "Добрянка",
			"timing": 5
		},
		{
			"name": "Долгодеревенское",
			"timing": 5
		},
		{
			"name": "Долгопрудный",
			"timing": 3
		},
		{
			"name": "Долинск",
			"timing": 8
		},
		{
			"name": "Домодедово",
			"timing": 3
		},
		{
			"name": "Домодедово Аэропорт",
			"timing": 2
		},
		{
			"name": "Донецк",
			"timing": 5
		},
		{
			"name": "Донино",
			"timing": 2
		},
		{
			"name": "Донской",
			"timing": 4
		},
		{
			"name": "Дор",
			"timing": 4
		},
		{
			"name": "Дорохово",
			"timing": 4
		},
		{
			"name": "Дрезна",
			"timing": 4
		},
		{
			"name": "Дубки",
			"timing": 2
		},
		{
			"name": "Дубна",
			"timing": 3
		},
		{
			"name": "Дубна ГУПС",
			"timing": 4
		},
		{
			"name": "Дубнево",
			"timing": 4
		},
		{
			"name": "Дубровицы",
			"timing": 2
		},
		{
			"name": "Дубронивка",
			"timing": 4
		},
		{
			"name": "Дурыкино",
			"timing": 4
		},
		{
			"name": "Духанино",
			"timing": 2
		},
		{
			"name": "Духовщина",
			"timing": 2
		},
		{
			"name": "Дюртюли",
			"timing": 5
		},
		{
			"name": "Дютьково",
			"timing": 4
		},
		{
			"name": "Дятьково",
			"timing": 4
		},
		{
			"name": "Евпатория",
			"timing": 4
		},
		{
			"name": "Евсеево",
			"timing": 4
		},
		{
			"name": "Егорьевск",
			"timing": 4
		},
		{
			"name": "Ейск",
			"timing": 5
		},
		{
			"name": "Екатеринбург",
			"timing": 5
		},
		{
			"name": "Елабуга",
			"timing": 4
		},
		{
			"name": "Елгозино",
			"timing": 4
		},
		{
			"name": "Елец",
			"timing": 3
		},
		{
			"name": "Елизарово",
			"timing": 4
		},
		{
			"name": "Елизово",
			"timing": 5
		},
		{
			"name": "Елочка Дом отдыха",
			"timing": 4
		},
		{
			"name": "Ельдигино",
			"timing": 2
		},
		{
			"name": "Ельня",
			"timing": 3
		},
		{
			"name": "Еманжелинск",
			"timing": 5
		},
		{
			"name": "Емельяново",
			"timing": 5
		},
		{
			"name": "Енисейск",
			"timing": 6
		},
		{
			"name": "Ермолино",
			"timing": 4
		},
		{
			"name": "Ерново",
			"timing": 4
		},
		{
			"name": "Ершово",
			"timing": 2
		},
		{
			"name": "Ессентуки",
			"timing": 6
		},
		{
			"name": "Ефремов",
			"timing": 3
		},
		{
			"name": "Ефремовская",
			"timing": 4
		},
		{
			"name": "Жаворонки",
			"timing": 2
		},
		{
			"name": "Железноводск",
			"timing": 5
		},
		{
			"name": "Железногорск",
			"timing": 5
		},
		{
			"name": "Железногорск-Илимский",
			"timing": 6
		},
		{
			"name": "Железногорск, Красноярский край",
			"timing": 5
		},
		{
			"name": "Железногорск, Курская обл.",
			"timing": 4
		},
		{
			"name": "Железнодорожный",
			"timing": 2
		},
		{
			"name": "Железнодорожный, Балаши- ха",
			"timing": 4
		},
		{
			"name": "Жигулевск",
			"timing": 8
		},
		{
			"name": "Жигулёвск",
			"timing": 4
		},
		{
			"name": "Жилево",
			"timing": 4
		},
		{
			"name": "Жирновск",
			"timing": 6
		},
		{
			"name": "Житнево",
			"timing": 2
		},
		{
			"name": "Жостово",
			"timing": 2
		},
		{
			"name": "Жуков",
			"timing": 3
		},
		{
			"name": "Жуковка",
			"timing": 2
		},
		{
			"name": "Жуково",
			"timing": 2
		},
		{
			"name": "Жуковский",
			"timing": 4
		},
		{
			"name": "Журавна",
			"timing": 4
		},
		{
			"name": "Жучки",
			"timing": 4
		},
		{
			"name": "Забайкальск",
			"timing": 7
		},
		{
			"name": "Заветы Ильича",
			"timing": 2
		},
		{
			"name": "Заводоуковск",
			"timing": 6
		},
		{
			"name": "Заводской",
			"timing": 3
		},
		{
			"name": "Заволжье",
			"timing": 4
		},
		{
			"name": "Заворово",
			"timing": 4
		},
		{
			"name": "Завьялово",
			"timing": 4
		},
		{
			"name": "Загорские Дали",
			"timing": 4
		},
		{
			"name": "Загорянский",
			"timing": 2
		},
		{
			"name": "Заинск",
			"timing": 5
		},
		{
			"name": "Зайцево",
			"timing": 3
		},
		{
			"name": "Закубежье",
			"timing": 4
		},
		{
			"name": "Заовражье",
			"timing": 4
		},
		{
			"name": "Заозерный",
			"timing": 5
		},
		{
			"name": "Заокский",
			"timing": 4
		},
		{
			"name": "Западный",
			"timing": 5
		},
		{
			"name": "Заполярный",
			"timing": 6
		},
		{
			"name": "Запрудня",
			"timing": 4
		},
		{
			"name": "Запутное",
			"timing": 4
		},
		{
			"name": "Зарайск",
			"timing": 3
		},
		{
			"name": "Зарайский совхоз",
			"timing": 4
		},
		{
			"name": "Заречный",
			"timing": 4
		},
		{
			"name": "Заречный, Свердловская обл.",
			"timing": 6
		},
		{
			"name": "Заречье",
			"timing": 2
		},
		{
			"name": "Заринск",
			"timing": 5
		},
		{
			"name": "Заря",
			"timing": 2
		},
		{
			"name": "Заря Коммунизма",
			"timing": 4
		},
		{
			"name": "Захарово",
			"timing": 4
		},
		{
			"name": "Звездный городок",
			"timing": 2
		},
		{
			"name": "Звенигород",
			"timing": 3
		},
		{
			"name": "Зверево",
			"timing": 6
		},
		{
			"name": "Зверосовхоз",
			"timing": 2
		},
		{
			"name": "Здравница",
			"timing": 2
		},
		{
			"name": "Зеленая Роща",
			"timing": 4
		},
		{
			"name": "Зеленогорск, Красноярский край",
			"timing": 5
		},
		{
			"name": "Зеленоград",
			"timing": 3
		},
		{
			"name": "Зеленоградский",
			"timing": 4
		},
		{
			"name": "Зеленодольск",
			"timing": 4
		},
		{
			"name": "Зеленокумск",
			"timing": 5
		},
		{
			"name": "Зеленчукская",
			"timing": 6
		},
		{
			"name": "Зеленый",
			"timing": 3
		},
		{
			"name": "Зендиково",
			"timing": 4
		},
		{
			"name": "Зерноград",
			"timing": 5
		},
		{
			"name": "Златоуст",
			"timing": 5
		},
		{
			"name": "Знамя Октября",
			"timing": 2
		},
		{
			"name": "Зональная Станция",
			"timing": 4
		},
		{
			"name": "Зубово",
			"timing": 4
		},
		{
			"name": "Зыково",
			"timing": 4
		},
		{
			"name": "Зюзино",
			"timing": 2
		},
		{
			"name": "Ивакино",
			"timing": 4
		},
		{
			"name": "Ивановка",
			"timing": 2
		},
		{
			"name": "Иваново",
			"timing": 3
		},
		{
			"name": "Ивановское",
			"timing": 4
		},
		{
			"name": "Ивантеевка",
			"timing": 4
		},
		{
			"name": "Ивантеевка, Московская обл.",
			"timing": 4
		},
		{
			"name": "Ивашково",
			"timing": 4
		},
		{
			"name": "Ивдель",
			"timing": 6
		},
		{
			"name": "Иглино",
			"timing": 5
		},
		{
			"name": "Игра",
			"timing": 5
		},
		{
			"name": "Ижевск",
			"timing": 4
		},
		{
			"name": "Избербаш",
			"timing": 5
		},
		{
			"name": "Излучинск",
			"timing": 4
		},
		{
			"name": "Измайлово",
			"timing": 2
		},
		{
			"name": "Изобильный",
			"timing": 5
		},
		{
			"name": "Икша",
			"timing": 4
		},
		{
			"name": "Ильинка",
			"timing": 3
		},
		{
			"name": "Ильинский",
			"timing": 2
		},
		{
			"name": "Ильинский Погост",
			"timing": 4
		},
		{
			"name": "Ильинское",
			"timing": 4
		},
		{
			"name": "Ильинское-Усово",
			"timing": 2
		},
		{
			"name": "Ильинское-Ярополецкое",
			"timing": 4
		},
		{
			"name": "Им Воровского",
			"timing": 3
		},
		{
			"name": "им Чайковского",
			"timing": 4
		},
		{
			"name": "Индустрия",
			"timing": 4
		},
		{
			"name": "Институт Полиомелита",
			"timing": 2
		},
		{
			"name": "Иншино",
			"timing": 4
		},
		{
			"name": "Иншинский",
			"timing": 4
		},
		{
			"name": "Ипатово",
			"timing": 6
		},
		{
			"name": "Ирбит",
			"timing": 5
		},
		{
			"name": "Иркутск",
			"timing": 5
		},
		{
			"name": "Иртышский",
			"timing": 5
		},
		{
			"name": "Искитим",
			"timing": 5
		},
		{
			"name": "Истра",
			"timing": 3
		},
		{
			"name": "Истра Санаторий",
			"timing": 4
		},
		{
			"name": "Ишим",
			"timing": 6
		},
		{
			"name": "Ишимбай",
			"timing": 5
		},
		{
			"name": "Йошкар-Ола",
			"timing": 4
		},
		{
			"name": "Кабаново",
			"timing": 4
		},
		{
			"name": "Кабардинка",
			"timing": 3
		},
		{
			"name": "Каблуково",
			"timing": 2
		},
		{
			"name": "Казань",
			"timing": 4
		},
		{
			"name": "Калач-на-Дону",
			"timing": 6
		},
		{
			"name": "Калачинск",
			"timing": 5
		},
		{
			"name": "Калининград",
			"timing": 4
		},
		{
			"name": "Калининец",
			"timing": 3
		},
		{
			"name": "Калинино",
			"timing": 6
		},
		{
			"name": "Калино",
			"timing": 3
		},
		{
			"name": "Калистово",
			"timing": 4
		},
		{
			"name": "Калицыно",
			"timing": 4
		},
		{
			"name": "Калуга",
			"timing": 3
		},
		{
			"name": "Каменка",
			"timing": 4
		},
		{
			"name": "Каменка, Каменский район",
			"timing": 5
		},
		{
			"name": "Каменск-Уральский",
			"timing": 6
		},
		{
			"name": "Каменск-Шахтинский",
			"timing": 5
		},
		{
			"name": "Каменское",
			"timing": 3
		},
		{
			"name": "Камышин",
			"timing": 6
		},
		{
			"name": "Камышлов",
			"timing": 6
		},
		{
			"name": "Канаш",
			"timing": 5
		},
		{
			"name": "Кандалакша",
			"timing": 6
		},
		{
			"name": "Каневская",
			"timing": 5
		},
		{
			"name": "Канск",
			"timing": 5
		},
		{
			"name": "Кантемировка",
			"timing": 4
		},
		{
			"name": "Карачаевск",
			"timing": 6
		},
		{
			"name": "Карачев",
			"timing": 4
		},
		{
			"name": "Кардымово",
			"timing": 3
		},
		{
			"name": "Карино",
			"timing": 4
		},
		{
			"name": "Каринское",
			"timing": 4
		},
		{
			"name": "Карталы",
			"timing": 7
		},
		{
			"name": "Касимов",
			"timing": 4
		},
		{
			"name": "Каспийск",
			"timing": 5
		},
		{
			"name": "Качканар",
			"timing": 5
		},
		{
			"name": "Кашино",
			"timing": 4
		},
		{
			"name": "Кашинцево",
			"timing": 2
		},
		{
			"name": "Кашира",
			"timing": 3
		},
		{
			"name": "Квашенки",
			"timing": 4
		},
		{
			"name": "Кез",
			"timing": 5
		},
		{
			"name": "Кемерово",
			"timing": 4
		},
		{
			"name": "Кемь",
			"timing": 6
		},
		{
			"name": "Керва",
			"timing": 4
		},
		{
			"name": "Керчь",
			"timing": 5
		},
		{
			"name": "Киевский",
			"timing": 4
		},
		{
			"name": "Кизилюрт",
			"timing": 6
		},
		{
			"name": "Кимры",
			"timing": 3
		},
		{
			"name": "Кингисепп",
			"timing": 4
		},
		{
			"name": "Кинель",
			"timing": 4
		},
		{
			"name": "Кинешма",
			"timing": 4
		},
		{
			"name": "Киреевск",
			"timing": 4
		},
		{
			"name": "Кирилловка",
			"timing": 2
		},
		{
			"name": "Кириши",
			"timing": 5
		},
		{
			"name": "Киров",
			"timing": 4
		},
		{
			"name": "Киров, Кировский р-н",
			"timing": 4
		},
		{
			"name": "Кировград",
			"timing": 6
		},
		{
			"name": "Кирово-Чепецк",
			"timing": 5
		},
		{
			"name": "Кировск,  Лен.обл",
			"timing": 5
		},
		{
			"name": "Киселёвск",
			"timing": 5
		},
		{
			"name": "Кисловодск",
			"timing": 5
		},
		{
			"name": "Клеменово",
			"timing": 4
		},
		{
			"name": "Клементьево",
			"timing": 4
		},
		{
			"name": "Кленово",
			"timing": 2
		},
		{
			"name": "Климовск",
			"timing": 2
		},
		{
			"name": "Климовск мкр, Подольск",
			"timing": 3
		},
		{
			"name": "Климовское",
			"timing": 3
		},
		{
			"name": "Клин",
			"timing": 3
		},
		{
			"name": "Клинцы",
			"timing": 4
		},
		{
			"name": "Клишино",
			"timing": 4
		},
		{
			"name": "Клязьма",
			"timing": 2
		},
		{
			"name": "Кневичи",
			"timing": 3
		},
		{
			"name": "Ковдор",
			"timing": 6
		},
		{
			"name": "Ковров",
			"timing": 3
		},
		{
			"name": "Когалым",
			"timing": 5
		},
		{
			"name": "Кожино",
			"timing": 4
		},
		{
			"name": "Козельск",
			"timing": 5
		},
		{
			"name": "Кокино",
			"timing": 4
		},
		{
			"name": "Кокошкино",
			"timing": 4
		},
		{
			"name": "Кола",
			"timing": 2
		},
		{
			"name": "Коломна",
			"timing": 3
		},
		{
			"name": "Колпашево",
			"timing": 6
		},
		{
			"name": "Колпино",
			"timing": 4
		},
		{
			"name": "Колычево",
			"timing": 4
		},
		{
			"name": "Кольцово",
			"timing": 2
		},
		{
			"name": "Кольчугино",
			"timing": 4
		},
		{
			"name": "Колюбакино",
			"timing": 4
		},
		{
			"name": "Коммунар",
			"timing": 2
		},
		{
			"name": "Коммунарка",
			"timing": 3
		},
		{
			"name": "Комсомольск-на-Амуре",
			"timing": 7
		},
		{
			"name": "Конаково",
			"timing": 3
		},
		{
			"name": "Кондопога",
			"timing": 5
		},
		{
			"name": "Кондратово",
			"timing": 4
		},
		{
			"name": "Кондрово",
			"timing": 5
		},
		{
			"name": "Конобеево",
			"timing": 4
		},
		{
			"name": "Коноплево",
			"timing": 4
		},
		{
			"name": "Константиново",
			"timing": 4
		},
		{
			"name": "Константиновск",
			"timing": 5
		},
		{
			"name": "Копалино",
			"timing": 3
		},
		{
			"name": "Копейск",
			"timing": 5
		},
		{
			"name": "Кореновск",
			"timing": 5
		},
		{
			"name": "Коркино",
			"timing": 5
		},
		{
			"name": "Коробчеево",
			"timing": 4
		},
		{
			"name": "Коровино",
			"timing": 4
		},
		{
			"name": "Королев",
			"timing": 3
		},
		{
			"name": "Корсаков",
			"timing": 9
		},
		{
			"name": "Корыстово",
			"timing": 4
		},
		{
			"name": "Коряжма",
			"timing": 3
		},
		{
			"name": "Костино",
			"timing": 4
		},
		{
			"name": "Костомарово",
			"timing": 4
		},
		{
			"name": "Костомукша",
			"timing": 6
		},
		{
			"name": "Кострово",
			"timing": 4
		},
		{
			"name": "Кострома",
			"timing": 3
		},
		{
			"name": "Косяево",
			"timing": 4
		},
		{
			"name": "Котельники",
			"timing": 2
		},
		{
			"name": "Котельниково",
			"timing": 5
		},
		{
			"name": "Котельнич",
			"timing": 5
		},
		{
			"name": "Котлас",
			"timing": 5
		},
		{
			"name": "Котово",
			"timing": 6
		},
		{
			"name": "Котовск, Тамбовская обл.",
			"timing": 8
		},
		{
			"name": "Кочубеевское",
			"timing": 5
		},
		{
			"name": "Кошелево",
			"timing": 4
		},
		{
			"name": "Кощаково",
			"timing": 2
		},
		{
			"name": "Красково",
			"timing": 2
		},
		{
			"name": "Красная Гора",
			"timing": 4
		},
		{
			"name": "Красная Горка",
			"timing": 2
		},
		{
			"name": "Красная пахра",
			"timing": 2
		},
		{
			"name": "Красная Пойма",
			"timing": 4
		},
		{
			"name": "Красная Поляна, Сочи гор.о- круг",
			"timing": 5
		},
		{
			"name": "Красноармейск",
			"timing": 4
		},
		{
			"name": "Красновидово",
			"timing": 4
		},
		{
			"name": "Красногвардейское",
			"timing": 5
		},
		{
			"name": "Красногвардейское, Красногвардейский р-н",
			"timing": 5
		},
		{
			"name": "Красногорск",
			"timing": 3
		},
		{
			"name": "Краснодар",
			"timing": 4
		},
		{
			"name": "Красное",
			"timing": 4
		},
		{
			"name": "Красное Село",
			"timing": 3
		},
		{
			"name": "Красное-на-Волге",
			"timing": 4
		},
		{
			"name": "Краснозаводск",
			"timing": 4
		},
		{
			"name": "Краснознаменск",
			"timing": 3
		},
		{
			"name": "Краснокаменск, Забайкальс-кий край",
			"timing": 7
		},
		{
			"name": "Краснокамск",
			"timing": 4
		},
		{
			"name": "Краснообск",
			"timing": 2
		},
		{
			"name": "Красноперекопск",
			"timing": 4
		},
		{
			"name": "Краснотурьинск",
			"timing": 6
		},
		{
			"name": "Красноуральск",
			"timing": 5
		},
		{
			"name": "Красноуфимск",
			"timing": 5
		},
		{
			"name": "Красноярск",
			"timing": 4
		},
		{
			"name": "Красные Ткачи",
			"timing": 4
		},
		{
			"name": "Красный",
			"timing": 3
		},
		{
			"name": "Красный Сулин",
			"timing": 6
		},
		{
			"name": "Красный Яр",
			"timing": 5
		},
		{
			"name": "Кратово",
			"timing": 2
		},
		{
			"name": "Крекшино",
			"timing": 3
		},
		{
			"name": "Кривандино",
			"timing": 4
		},
		{
			"name": "Кривенковское",
			"timing": 8
		},
		{
			"name": "Кронштадт",
			"timing": 4
		},
		{
			"name": "Кропоткин",
			"timing": 5
		},
		{
			"name": "Крутое",
			"timing": 4
		},
		{
			"name": "Крыловская",
			"timing": 5
		},
		{
			"name": "Крымск",
			"timing": 5
		},
		{
			"name": "Крюково",
			"timing": 4
		},
		{
			"name": "Кстово",
			"timing": 4
		},
		{
			"name": "Кубинка",
			"timing": 2
		},
		{
			"name": "Кубинский Городок",
			"timing": 4
		},
		{
			"name": "Кувандык",
			"timing": 6
		},
		{
			"name": "Кугеси",
			"timing": 5
		},
		{
			"name": "Кудрово",
			"timing": 8
		},
		{
			"name": "Кудымкар",
			"timing": 6
		},
		{
			"name": "Кузнетцы",
			"timing": 4
		},
		{
			"name": "Кузнецк",
			"timing": 4
		},
		{
			"name": "Кузнецово",
			"timing": 4
		},
		{
			"name": "Кузнечики",
			"timing": 2
		},
		{
			"name": "Кузьмино",
			"timing": 4
		},
		{
			"name": "Кузьмоловский",
			"timing": 2
		},
		{
			"name": "Кузяево",
			"timing": 4
		},
		{
			"name": "Куйбышев",
			"timing": 5
		},
		{
			"name": "Кулебаки",
			"timing": 5
		},
		{
			"name": "Куликово",
			"timing": 4
		},
		{
			"name": "Култаево, Пермский р-н, Пе-рмский край",
			"timing": 5
		},
		{
			"name": "Кульпино",
			"timing": 4
		},
		{
			"name": "Кумертау",
			"timing": 5
		},
		{
			"name": "Кунгур",
			"timing": 5
		},
		{
			"name": "Купавна",
			"timing": 2
		},
		{
			"name": "Кураково",
			"timing": 3
		},
		{
			"name": "Курган",
			"timing": 5
		},
		{
			"name": "Курганинск",
			"timing": 5
		},
		{
			"name": "Курилово",
			"timing": 4
		},
		{
			"name": "Куровское",
			"timing": 4
		},
		{
			"name": "Куровское, Орехово-Зуевс-кий гор.округ",
			"timing": 3
		},
		{
			"name": "Курск",
			"timing": 3
		},
		{
			"name": "Куртино",
			"timing": 4
		},
		{
			"name": "Курчатов",
			"timing": 4
		},
		{
			"name": "Курьяново",
			"timing": 4
		},
		{
			"name": "Кушва",
			"timing": 6
		},
		{
			"name": "Кущёвская, Кущёвский р-н",
			"timing": 5
		},
		{
			"name": "Кызыл",
			"timing": 7
		},
		{
			"name": "Кыштым",
			"timing": 5
		},
		{
			"name": "Кяхта",
			"timing": 6
		},
		{
			"name": "Лабинск",
			"timing": 5
		},
		{
			"name": "Лабытнанги",
			"timing": 6
		},
		{
			"name": "Ладыгино",
			"timing": 4
		},
		{
			"name": "Лазаревское",
			"timing": 5
		},
		{
			"name": "Лаишево",
			"timing": 4
		},
		{
			"name": "Лангепас",
			"timing": 5
		},
		{
			"name": "Ларцевы Поляны",
			"timing": 4
		},
		{
			"name": "Лебедянь",
			"timing": 4
		},
		{
			"name": "Левашово",
			"timing": 8
		},
		{
			"name": "Ледово",
			"timing": 4
		},
		{
			"name": "Лелечи",
			"timing": 4
		},
		{
			"name": "Ленинградская",
			"timing": 5
		},
		{
			"name": "Ленино",
			"timing": 4
		},
		{
			"name": "Лениногорск",
			"timing": 5
		},
		{
			"name": "Ленинск-Кузнецкий",
			"timing": 4
		},
		{
			"name": "Ленинские Горки",
			"timing": 2
		},
		{
			"name": "Ленинский",
			"timing": 4
		},
		{
			"name": "Леньково",
			"timing": 4
		},
		{
			"name": "Леонтьево",
			"timing": 4
		},
		{
			"name": "Лермонтов",
			"timing": 6
		},
		{
			"name": "Лермонтово",
			"timing": 4
		},
		{
			"name": "Лесное Озеро",
			"timing": 2
		},
		{
			"name": "Лесной",
			"timing": 5
		},
		{
			"name": "Лесной Городок",
			"timing": 4
		},
		{
			"name": "Лесные Поляны",
			"timing": 4
		},
		{
			"name": "Летний Отдых",
			"timing": 2
		},
		{
			"name": "Летуново",
			"timing": 4
		},
		{
			"name": "Ливны",
			"timing": 5
		},
		{
			"name": "Лидино",
			"timing": 4
		},
		{
			"name": "Ликино-дулево",
			"timing": 4
		},
		{
			"name": "Липецк",
			"timing": 3
		},
		{
			"name": "Липино",
			"timing": 4
		},
		{
			"name": "Липицы",
			"timing": 4
		},
		{
			"name": "Лиски, Лискинский р-н",
			"timing": 4
		},
		{
			"name": "Литвиново",
			"timing": 2
		},
		{
			"name": "Лиховской",
			"timing": 6
		},
		{
			"name": "Лобня",
			"timing": 3
		},
		{
			"name": "Ловцы",
			"timing": 4
		},
		{
			"name": "Логиново",
			"timing": 4
		},
		{
			"name": "Лодейное Поле",
			"timing": 4
		},
		{
			"name": "Ложки",
			"timing": 4
		},
		{
			"name": "Лоза",
			"timing": 4
		},
		{
			"name": "Ломоносов",
			"timing": 4
		},
		{
			"name": "Лосино-Петровский",
			"timing": 4
		},
		{
			"name": "Лососина",
			"timing": 5
		},
		{
			"name": "Лотошино",
			"timing": 4
		},
		{
			"name": "Луга",
			"timing": 5
		},
		{
			"name": "Луговая",
			"timing": 2
		},
		{
			"name": "Луговой Поселок",
			"timing": 4
		},
		{
			"name": "Лужники",
			"timing": 4
		},
		{
			"name": "Лукерино",
			"timing": 4
		},
		{
			"name": "Лукино",
			"timing": 2
		},
		{
			"name": "Лукошкино",
			"timing": 4
		},
		{
			"name": "Лукьяново",
			"timing": 4
		},
		{
			"name": "Лунево",
			"timing": 2
		},
		{
			"name": "Луховицы",
			"timing": 3
		},
		{
			"name": "Лучегорск",
			"timing": 7
		},
		{
			"name": "Лучинское",
			"timing": 2
		},
		{
			"name": "Лысково",
			"timing": 4
		},
		{
			"name": "Лысьва",
			"timing": 5
		},
		{
			"name": "Лыткарино",
			"timing": 3
		},
		{
			"name": "Лыткино",
			"timing": 4
		},
		{
			"name": "Лыщиково",
			"timing": 4
		},
		{
			"name": "Львовский",
			"timing": 4
		},
		{
			"name": "Любаново",
			"timing": 4
		},
		{
			"name": "Люберцы",
			"timing": 3
		},
		{
			"name": "Любучаны",
			"timing": 4
		},
		{
			"name": "Людино",
			"timing": 4
		},
		{
			"name": "Людиново",
			"timing": 3
		},
		{
			"name": "Лямино",
			"timing": 3
		},
		{
			"name": "Магадан",
			"timing": 7
		},
		{
			"name": "Магас, Ингушетия респ.",
			"timing": 8
		},
		{
			"name": "Магнитогорск",
			"timing": 5
		},
		{
			"name": "Майкоп",
			"timing": 4
		},
		{
			"name": "Майский",
			"timing": 5
		},
		{
			"name": "Макеево",
			"timing": 4
		},
		{
			"name": "Макшеево",
			"timing": 4
		},
		{
			"name": "Малаховка",
			"timing": 2
		},
		{
			"name": "Малая Дубна",
			"timing": 4
		},
		{
			"name": "Малеевка",
			"timing": 4
		},
		{
			"name": "Маливо",
			"timing": 4
		},
		{
			"name": "Малино",
			"timing": 4
		},
		{
			"name": "Малоярославец",
			"timing": 3
		},
		{
			"name": "Малышево",
			"timing": 2
		},
		{
			"name": "Мамадыш",
			"timing": 4
		},
		{
			"name": "Мамонтовка",
			"timing": 2
		},
		{
			"name": "Мамонтово",
			"timing": 4
		},
		{
			"name": "Манихино",
			"timing": 2
		},
		{
			"name": "Мансурово",
			"timing": 4
		},
		{
			"name": "Манушкино",
			"timing": 4
		},
		{
			"name": "Манюхино",
			"timing": 2
		},
		{
			"name": "Мариинск",
			"timing": 4
		},
		{
			"name": "Маркс",
			"timing": 5
		},
		{
			"name": "Марушкино",
			"timing": 4
		},
		{
			"name": "Марфин Брод",
			"timing": 4
		},
		{
			"name": "Марфино",
			"timing": 2
		},
		{
			"name": "Марьино",
			"timing": 2
		},
		{
			"name": "Маслянино",
			"timing": 7
		},
		{
			"name": "Матвеев Курган",
			"timing": 5
		},
		{
			"name": "Матыра",
			"timing": 4
		},
		{
			"name": "Махачкала",
			"timing": 4
		},
		{
			"name": "Мегион",
			"timing": 5
		},
		{
			"name": "Медведево",
			"timing": 3
		},
		{
			"name": "Медвежьегорск",
			"timing": 6
		},
		{
			"name": "Медвежьи озера",
			"timing": 2
		},
		{
			"name": "Междуреченск",
			"timing": 5
		},
		{
			"name": "Мелеуз",
			"timing": 5
		},
		{
			"name": "Мельниково",
			"timing": 6
		},
		{
			"name": "Менделеево",
			"timing": 6
		},
		{
			"name": "Менделеевск",
			"timing": 3
		},
		{
			"name": "Менделеевск, Татарстан респ.",
			"timing": 5
		},
		{
			"name": "Мендюкино",
			"timing": 4
		},
		{
			"name": "Мензелинск",
			"timing": 5
		},
		{
			"name": "Мессажай",
			"timing": 8
		},
		{
			"name": "Металлострой",
			"timing": 4
		},
		{
			"name": "Мещерино",
			"timing": 4
		},
		{
			"name": "Мещерское",
			"timing": 4
		},
		{
			"name": "Миасс",
			"timing": 5
		},
		{
			"name": "мизиново",
			"timing": 2
		},
		{
			"name": "Микулино",
			"timing": 4
		},
		{
			"name": "Микунь",
			"timing": 6
		},
		{
			"name": "Миллерово, Миллеровский р-н",
			"timing": 5
		},
		{
			"name": "Миловка",
			"timing": 3
		},
		{
			"name": "Минеральные Воды",
			"timing": 5
		},
		{
			"name": "Минеральные воды",
			"timing": 4
		},
		{
			"name": "Минусинск",
			"timing": 5
		},
		{
			"name": "Мирный, Саха респ. (Якутия)",
			"timing": 9
		},
		{
			"name": "Мисцево",
			"timing": 4
		},
		{
			"name": "Мисцево Куровское",
			"timing": 4
		},
		{
			"name": "Митино",
			"timing": 3
		},
		{
			"name": "Михайлов",
			"timing": 5
		},
		{
			"name": "Михайловка",
			"timing": 6
		},
		{
			"name": "Михайловск",
			"timing": 5
		},
		{
			"name": "Михайловск, Свердловская область",
			"timing": 6
		},
		{
			"name": "Михайловское",
			"timing": 4
		},
		{
			"name": "Михалево",
			"timing": 4
		},
		{
			"name": "Михали",
			"timing": 4
		},
		{
			"name": "Михнево",
			"timing": 4
		},
		{
			"name": "Михнево, Ступинский р-н",
			"timing": 4
		},
		{
			"name": "Мичуринец",
			"timing": 2
		},
		{
			"name": "Мичуринск",
			"timing": 4
		},
		{
			"name": "Мишеронский",
			"timing": 4
		},
		{
			"name": "Мишнево",
			"timing": 2
		},
		{
			"name": "Мишутино",
			"timing": 4
		},
		{
			"name": "Можайск",
			"timing": 3
		},
		{
			"name": "Можга",
			"timing": 5
		},
		{
			"name": "Моздок",
			"timing": 6
		},
		{
			"name": "Мокрое",
			"timing": 4
		},
		{
			"name": "Молодарский",
			"timing": 2
		},
		{
			"name": "Молодежный",
			"timing": 4
		},
		{
			"name": "Молоди",
			"timing": 4
		},
		{
			"name": "Молоково",
			"timing": 2
		},
		{
			"name": "Монгохто",
			"timing": 5
		},
		{
			"name": "Монино",
			"timing": 2
		},
		{
			"name": "Монино привокзальное",
			"timing": 2
		},
		{
			"name": "Моносеино",
			"timing": 4
		},
		{
			"name": "Мончегорск",
			"timing": 6
		},
		{
			"name": "Морозово",
			"timing": 4
		},
		{
			"name": "Морозовск",
			"timing": 6
		},
		{
			"name": "Моршанск",
			"timing": 5
		},
		{
			"name": "Москва",
			"timing": 3
		},
		{
			"name": "Москвич",
			"timing": 4
		},
		{
			"name": "Московская область",
			"timing": 4
		},
		{
			"name": "Московский Комбинат Совхоз",
			"timing": 2
		},
		{
			"name": "Мосрентген",
			"timing": 2
		},
		{
			"name": "Мостовик",
			"timing": 4
		},
		{
			"name": "Мостовской",
			"timing": 5
		},
		{
			"name": "Мочилы",
			"timing": 4
		},
		{
			"name": "Муравленко",
			"timing": 6
		},
		{
			"name": "Муриково",
			"timing": 4
		},
		{
			"name": "Мурино",
			"timing": 2
		},
		{
			"name": "Мурино, Всеволожский р-н",
			"timing": 3
		},
		{
			"name": "Мурманск",
			"timing": 6
		},
		{
			"name": "Мурмаши",
			"timing": 3
		},
		{
			"name": "Муром",
			"timing": 4
		},
		{
			"name": "Муханово",
			"timing": 4
		},
		{
			"name": "Мухино",
			"timing": 4
		},
		{
			"name": "Мценск",
			"timing": 4
		},
		{
			"name": "Мыски",
			"timing": 5
		},
		{
			"name": "Мытищи",
			"timing": 3
		},
		{
			"name": "Набережные Челны",
			"timing": 4
		},
		{
			"name": "Навашино",
			"timing": 4
		},
		{
			"name": "Надым",
			"timing": 4
		},
		{
			"name": "Назарово",
			"timing": 4
		},
		{
			"name": "Назарьево",
			"timing": 2
		},
		{
			"name": "Назрань",
			"timing": 6
		},
		{
			"name": "Нальчик",
			"timing": 5
		},
		{
			"name": "Наро-Фоминск",
			"timing": 3
		},
		{
			"name": "Нарский",
			"timing": 4
		},
		{
			"name": "Нарынка",
			"timing": 4
		},
		{
			"name": "Нарьян-Мар",
			"timing": 5
		},
		{
			"name": "Нахабино",
			"timing": 3
		},
		{
			"name": "Находка",
			"timing": 7
		},
		{
			"name": "Небуг",
			"timing": 4
		},
		{
			"name": "Невель",
			"timing": 4
		},
		{
			"name": "Невинномысск",
			"timing": 5
		},
		{
			"name": "Невьянск",
			"timing": 5
		},
		{
			"name": "Некрасовка",
			"timing": 3
		},
		{
			"name": "Некрасовский",
			"timing": 4
		},
		{
			"name": "Некрасовское",
			"timing": 2
		},
		{
			"name": "Нелазское",
			"timing": 3
		},
		{
			"name": "Нелидово",
			"timing": 4
		},
		{
			"name": "Неман",
			"timing": 2
		},
		{
			"name": "Немчиновка",
			"timing": 4
		},
		{
			"name": "Непецино",
			"timing": 4
		},
		{
			"name": "Нерастанное",
			"timing": 4
		},
		{
			"name": "Нерехта",
			"timing": 3
		},
		{
			"name": "Нерюнгри",
			"timing": 9
		},
		{
			"name": "Нефтекамск",
			"timing": 5
		},
		{
			"name": "Нефтеюганск",
			"timing": 4
		},
		{
			"name": "Нижегородка",
			"timing": 2
		},
		{
			"name": "Нижнебаканская",
			"timing": 3
		},
		{
			"name": "Нижневартовск",
			"timing": 4
		},
		{
			"name": "Нижнегорский",
			"timing": 5
		},
		{
			"name": "Нижнее Хорошово",
			"timing": 4
		},
		{
			"name": "Нижнекамск",
			"timing": 4
		},
		{
			"name": "Нижнемаслово",
			"timing": 4
		},
		{
			"name": "Нижние Серги",
			"timing": 6
		},
		{
			"name": "Нижний Новгород",
			"timing": 3
		},
		{
			"name": "Нижний Тагил",
			"timing": 5
		},
		{
			"name": "Нижняя Тура",
			"timing": 5
		},
		{
			"name": "Никитское",
			"timing": 4
		},
		{
			"name": "Николо-кропотки",
			"timing": 4
		},
		{
			"name": "Никольск",
			"timing": 4
		},
		{
			"name": "Никольско-Архангельское",
			"timing": 2
		},
		{
			"name": "Никольское",
			"timing": 4
		},
		{
			"name": "Никольское-Гагарино",
			"timing": 4
		},
		{
			"name": "Никоновское",
			"timing": 2
		},
		{
			"name": "Никулино",
			"timing": 4
		},
		{
			"name": "Новая Адыгея",
			"timing": 4
		},
		{
			"name": "Новая Деревня",
			"timing": 4
		},
		{
			"name": "Новая Ольховка",
			"timing": 4
		},
		{
			"name": "Новая Усмань",
			"timing": 3
		},
		{
			"name": "Ново-Переделкино",
			"timing": 4
		},
		{
			"name": "Новоалександровск",
			"timing": 6
		},
		{
			"name": "Новоалтайск",
			"timing": 4
		},
		{
			"name": "Нововоронеж",
			"timing": 4
		},
		{
			"name": "Нововязники",
			"timing": 2
		},
		{
			"name": "Новогорск",
			"timing": 2
		},
		{
			"name": "Новодвинск",
			"timing": 5
		},
		{
			"name": "Новодрожжино",
			"timing": 2
		},
		{
			"name": "Новое",
			"timing": 4
		},
		{
			"name": "Новое Гришино",
			"timing": 4
		},
		{
			"name": "Новое Девяткино",
			"timing": 3
		},
		{
			"name": "Новоегорий",
			"timing": 4
		},
		{
			"name": "Новозагарие",
			"timing": 4
		},
		{
			"name": "Новоклемово",
			"timing": 4
		},
		{
			"name": "Новокубанск",
			"timing": 5
		},
		{
			"name": "Новокузнецк",
			"timing": 4
		},
		{
			"name": "Новокуйбышевск",
			"timing": 4
		},
		{
			"name": "Новомихайловский",
			"timing": 5
		},
		{
			"name": "Новомосковск",
			"timing": 3
		},
		{
			"name": "Новомышастовская",
			"timing": 5
		},
		{
			"name": "Новоникольское",
			"timing": 2
		},
		{
			"name": "Новопавловск",
			"timing": 6
		},
		{
			"name": "Новопетровское",
			"timing": 4
		},
		{
			"name": "Новоподрезково",
			"timing": 2
		},
		{
			"name": "Новопокровская",
			"timing": 5
		},
		{
			"name": "Новороссийск",
			"timing": 4
		},
		{
			"name": "Новоселки",
			"timing": 4
		},
		{
			"name": "Новосергиевка",
			"timing": 6
		},
		{
			"name": "Новосибирск",
			"timing": 4
		},
		{
			"name": "Новосиньково",
			"timing": 4
		},
		{
			"name": "Новотитаровская",
			"timing": 4
		},
		{
			"name": "Новотроицк",
			"timing": 5
		},
		{
			"name": "Новоуральск",
			"timing": 5
		},
		{
			"name": "Новохаритоново",
			"timing": 2
		},
		{
			"name": "Новочапово",
			"timing": 4
		},
		{
			"name": "Новочебоксарск",
			"timing": 4
		},
		{
			"name": "Новочеркасск",
			"timing": 4
		},
		{
			"name": "Новошахтинск",
			"timing": 5
		},
		{
			"name": "Новые Ляды",
			"timing": 4
		},
		{
			"name": "Новый Быт",
			"timing": 4
		},
		{
			"name": "Новый Снопок",
			"timing": 4
		},
		{
			"name": "Новый Уренгой",
			"timing": 4
		},
		{
			"name": "Ногинск",
			"timing": 3
		},
		{
			"name": "Норильск",
			"timing": 6
		},
		{
			"name": "Ноябрьск",
			"timing": 5
		},
		{
			"name": "Нудоль",
			"timing": 4
		},
		{
			"name": "Нурлат",
			"timing": 4
		},
		{
			"name": "Нытва",
			"timing": 5
		},
		{
			"name": "Нягань",
			"timing": 5
		},
		{
			"name": "Обнинск",
			"timing": 3
		},
		{
			"name": "Оболдино",
			"timing": 2
		},
		{
			"name": "Оболенск",
			"timing": 4
		},
		{
			"name": "Обухово",
			"timing": 4
		},
		{
			"name": "Обухово, Ногинский р-н",
			"timing": 3
		},
		{
			"name": "Обь",
			"timing": 4
		},
		{
			"name": "Оверята",
			"timing": 4
		},
		{
			"name": "Огуднево",
			"timing": 2
		},
		{
			"name": "Одинцово",
			"timing": 3
		},
		{
			"name": "Одинцово Вахромеево",
			"timing": 2
		},
		{
			"name": "Ожерелье",
			"timing": 4
		},
		{
			"name": "Озеретское",
			"timing": 4
		},
		{
			"name": "Озерск",
			"timing": 6
		},
		{
			"name": "Озеры",
			"timing": 4
		},
		{
			"name": "Озёры",
			"timing": 3
		},
		{
			"name": "Октябрьск",
			"timing": 4
		},
		{
			"name": "Октябрьская",
			"timing": 5
		},
		{
			"name": "Октябрьский",
			"timing": 3
		},
		{
			"name": "Октябрьский, Башкортостан респ.",
			"timing": 5
		},
		{
			"name": "Оленегорск",
			"timing": 6
		},
		{
			"name": "Ольгинка",
			"timing": 8
		},
		{
			"name": "Ольгино",
			"timing": 8
		},
		{
			"name": "Ольгово",
			"timing": 4
		},
		{
			"name": "Ольявидово",
			"timing": 4
		},
		{
			"name": "Омск",
			"timing": 4
		},
		{
			"name": "Онуфриево",
			"timing": 4
		},
		{
			"name": "Опалиха",
			"timing": 2
		},
		{
			"name": "Орел",
			"timing": 3
		},
		{
			"name": "Оренбург",
			"timing": 4
		},
		{
			"name": "Орехово-Зуево",
			"timing": 3
		},
		{
			"name": "Орешки",
			"timing": 4
		},
		{
			"name": "Орленок",
			"timing": 8
		},
		{
			"name": "Орск",
			"timing": 5
		},
		{
			"name": "Орудьево",
			"timing": 4
		},
		{
			"name": "Осаново-Дубовое",
			"timing": 4
		},
		{
			"name": "Осинники",
			"timing": 5
		},
		{
			"name": "Осиновка",
			"timing": 6
		},
		{
			"name": "Осиново, Зеленодольский р-н",
			"timing": 4
		},
		{
			"name": "Осташево",
			"timing": 4
		},
		{
			"name": "Остров",
			"timing": 5
		},
		{
			"name": "Островцы",
			"timing": 3
		},
		{
			"name": "Острогожск, Острогожский р-н",
			"timing": 4
		},
		{
			"name": "Отрадная, Отрадненский р-н, Краснодарский край",
			"timing": 5
		},
		{
			"name": "Отрадное",
			"timing": 2
		},
		{
			"name": "Отрадный",
			"timing": 4
		},
		{
			"name": "Оханск",
			"timing": 6
		},
		{
			"name": "Очер",
			"timing": 5
		},
		{
			"name": "Ошейкино",
			"timing": 4
		},
		{
			"name": "Павельцево",
			"timing": 2
		},
		{
			"name": "Павловичи",
			"timing": 4
		},
		{
			"name": "Павлово",
			"timing": 4
		},
		{
			"name": "Павловск",
			"timing": 2
		},
		{
			"name": "Павловск, Алтай. край",
			"timing": 5
		},
		{
			"name": "Павловск, Воронежская обл.",
			"timing": 5
		},
		{
			"name": "Павловская",
			"timing": 5
		},
		{
			"name": "Павловская Слобода",
			"timing": 4
		},
		{
			"name": "Павловский Посад",
			"timing": 4
		},
		{
			"name": "Павловское",
			"timing": 2
		},
		{
			"name": "Палласовка",
			"timing": 5
		},
		{
			"name": "Парфентьево",
			"timing": 4
		},
		{
			"name": "Пенза",
			"timing": 3
		},
		{
			"name": "Первомайск",
			"timing": 6
		},
		{
			"name": "Первомайский",
			"timing": 4
		},
		{
			"name": "Первомайское",
			"timing": 4
		},
		{
			"name": "Первомайское, Первомайский р-н",
			"timing": 4
		},
		{
			"name": "Первоуральск",
			"timing": 5
		},
		{
			"name": "Пересвет",
			"timing": 4
		},
		{
			"name": "Переславль-Залесский",
			"timing": 4
		},
		{
			"name": "Пермь",
			"timing": 5
		},
		{
			"name": "Перхушково",
			"timing": 2
		},
		{
			"name": "Пески",
			"timing": 4
		},
		{
			"name": "Песочный",
			"timing": 2
		},
		{
			"name": "Пестово, Новгородская обл.",
			"timing": 5
		},
		{
			"name": "Пестрецы, Пестречинский р-н",
			"timing": 4
		},
		{
			"name": "Петергоф",
			"timing": 4
		},
		{
			"name": "Петрово",
			"timing": 4
		},
		{
			"name": "Петрово-Дальнее",
			"timing": 2
		},
		{
			"name": "Петровское",
			"timing": 2
		},
		{
			"name": "Петродворец",
			"timing": 2
		},
		{
			"name": "Петрозаводск",
			"timing": 4
		},
		{
			"name": "Петропавловск-Камчатский",
			"timing": 6
		},
		{
			"name": "Печерники",
			"timing": 4
		},
		{
			"name": "Печора",
			"timing": 7
		},
		{
			"name": "Пироговский",
			"timing": 2
		},
		{
			"name": "Пирочи",
			"timing": 4
		},
		{
			"name": "Племхоз Константиново",
			"timing": 2
		},
		{
			"name": "Плесецк",
			"timing": 6
		},
		{
			"name": "Плеханово",
			"timing": 4
		},
		{
			"name": "Повалиха",
			"timing": 4
		},
		{
			"name": "Поварово",
			"timing": 4
		},
		{
			"name": "Пограничный",
			"timing": 6
		},
		{
			"name": "Подольск",
			"timing": 3
		},
		{
			"name": "Подосинки",
			"timing": 4
		},
		{
			"name": "Подхожее",
			"timing": 4
		},
		{
			"name": "Подьячево",
			"timing": 4
		},
		{
			"name": "Покров",
			"timing": 3
		},
		{
			"name": "Покровка",
			"timing": 4
		},
		{
			"name": "Покровское",
			"timing": 5
		},
		{
			"name": "Покровское-Шереметьево",
			"timing": 4
		},
		{
			"name": "Полазна",
			"timing": 4
		},
		{
			"name": "Полбино",
			"timing": 4
		},
		{
			"name": "Полевской",
			"timing": 6
		},
		{
			"name": "Половодово",
			"timing": 2
		},
		{
			"name": "Полтавская",
			"timing": 5
		},
		{
			"name": "Полуряденки",
			"timing": 4
		},
		{
			"name": "Полушкино",
			"timing": 4
		},
		{
			"name": "Полярные Зори",
			"timing": 6
		},
		{
			"name": "Понтонный",
			"timing": 3
		},
		{
			"name": "Поречье",
			"timing": 4
		},
		{
			"name": "Поречье Санаторий",
			"timing": 2
		},
		{
			"name": "Порожский",
			"timing": 6
		},
		{
			"name": "Похвистнево",
			"timing": 6
		},
		{
			"name": "Почеп",
			"timing": 4
		},
		{
			"name": "Починки",
			"timing": 4
		},
		{
			"name": "Правдинский",
			"timing": 2
		},
		{
			"name": "Приволжск",
			"timing": 4
		},
		{
			"name": "Приволье",
			"timing": 2
		},
		{
			"name": "Прииртышский",
			"timing": 8
		},
		{
			"name": "Прилепы",
			"timing": 4
		},
		{
			"name": "Приморск",
			"timing": 3
		},
		{
			"name": "Приморско-Ахтарск",
			"timing": 5
		},
		{
			"name": "Приозерск",
			"timing": 4
		},
		{
			"name": "Приютово",
			"timing": 5
		},
		{
			"name": "Прокопьевск",
			"timing": 5
		},
		{
			"name": "Пролетарский",
			"timing": 4
		},
		{
			"name": "Промышленная",
			"timing": 4
		},
		{
			"name": "Протасово",
			"timing": 2
		},
		{
			"name": "Протвино",
			"timing": 3
		},
		{
			"name": "Протекино",
			"timing": 4
		},
		{
			"name": "Прохладный",
			"timing": 6
		},
		{
			"name": "Прохладный, Белоярск окрг.",
			"timing": 6
		},
		{
			"name": "Прохоровка",
			"timing": 5
		},
		{
			"name": "Псарьки",
			"timing": 4
		},
		{
			"name": "Псков",
			"timing": 5
		},
		{
			"name": "Птичное",
			"timing": 3
		},
		{
			"name": "Пугачев",
			"timing": 6
		},
		{
			"name": "Пустоша",
			"timing": 4
		},
		{
			"name": "Путилково",
			"timing": 2
		},
		{
			"name": "Пушкин",
			"timing": 3
		},
		{
			"name": "Пушкино",
			"timing": 3
		},
		{
			"name": "Пущино",
			"timing": 3
		},
		{
			"name": "Пыть-Ях",
			"timing": 5
		},
		{
			"name": "Пышелицы",
			"timing": 4
		},
		{
			"name": "Пятигорск",
			"timing": 6
		},
		{
			"name": "Пятница",
			"timing": 4
		},
		{
			"name": "Радовицкий",
			"timing": 4
		},
		{
			"name": "Радужный",
			"timing": 4
		},
		{
			"name": "Радужный, ХМАО",
			"timing": 6
		},
		{
			"name": "Развилка",
			"timing": 2
		},
		{
			"name": "Разметелево",
			"timing": 8
		},
		{
			"name": "Райсеменовское",
			"timing": 4
		},
		{
			"name": "Раменки",
			"timing": 4
		},
		{
			"name": "Раменский Совхоз",
			"timing": 2
		},
		{
			"name": "Раменское",
			"timing": 3
		},
		{
			"name": "Раменье",
			"timing": 4
		},
		{
			"name": "Рассвет",
			"timing": 4
		},
		{
			"name": "Рассказово",
			"timing": 5
		},
		{
			"name": "Рассудово",
			"timing": 4
		},
		{
			"name": "Расцвет",
			"timing": 6
		},
		{
			"name": "Рахманово",
			"timing": 4
		},
		{
			"name": "Ревда",
			"timing": 6
		},
		{
			"name": "Редкино",
			"timing": 4
		},
		{
			"name": "Реж",
			"timing": 5
		},
		{
			"name": "Реутов",
			"timing": 2
		},
		{
			"name": "Речицы",
			"timing": 4
		},
		{
			"name": "Решеткино",
			"timing": 4
		},
		{
			"name": "Решетниково",
			"timing": 4
		},
		{
			"name": "Ржавки",
			"timing": 2
		},
		{
			"name": "Ржев",
			"timing": 4
		},
		{
			"name": "Рогачево",
			"timing": 4
		},
		{
			"name": "Рогово",
			"timing": 4
		},
		{
			"name": "Родники",
			"timing": 4
		},
		{
			"name": "Рождествено",
			"timing": 4
		},
		{
			"name": "Рождественский",
			"timing": 4
		},
		{
			"name": "Романовская",
			"timing": 6
		},
		{
			"name": "Романцево",
			"timing": 2
		},
		{
			"name": "Рославль",
			"timing": 5
		},
		{
			"name": "Росляково",
			"timing": 5
		},
		{
			"name": "Россошь",
			"timing": 5
		},
		{
			"name": "Ростов",
			"timing": 4
		},
		{
			"name": "Ростов-на-Дону",
			"timing": 4
		},
		{
			"name": "Рошаль",
			"timing": 4
		},
		{
			"name": "Рощино",
			"timing": 2
		},
		{
			"name": "Рощино, Выборгский р-н",
			"timing": 4
		},
		{
			"name": "рп Городище, Городищенский р-н",
			"timing": 4
		},
		{
			"name": "Ртищево, Ртищевский р-он",
			"timing": 5
		},
		{
			"name": "Рубцовск",
			"timing": 5
		},
		{
			"name": "Руза",
			"timing": 3
		},
		{
			"name": "Рузаевка",
			"timing": 3
		},
		{
			"name": "Рузаевка, Мордовия респ.",
			"timing": 5
		},
		{
			"name": "Румянцево",
			"timing": 4
		},
		{
			"name": "Руново",
			"timing": 4
		},
		{
			"name": "Русь Санаторий",
			"timing": 4
		},
		{
			"name": "Рыбинск",
			"timing": 4
		},
		{
			"name": "Рыбное",
			"timing": 4
		},
		{
			"name": "Рыльск",
			"timing": 5
		},
		{
			"name": "Ряжск",
			"timing": 4
		},
		{
			"name": "Рязаново",
			"timing": 2
		},
		{
			"name": "Рязановский",
			"timing": 4
		},
		{
			"name": "Рязань",
			"timing": 3
		},
		{
			"name": "Саввинская Слобода",
			"timing": 4
		},
		{
			"name": "Савельево",
			"timing": 4
		},
		{
			"name": "Савостино",
			"timing": 4
		},
		{
			"name": "Саки",
			"timing": 4
		},
		{
			"name": "Салават",
			"timing": 5
		},
		{
			"name": "Салехард",
			"timing": 5
		},
		{
			"name": "Салтыковка",
			"timing": 2
		},
		{
			"name": "Сальск",
			"timing": 5
		},
		{
			"name": "Самара",
			"timing": 4
		},
		{
			"name": "Санаторий 28А",
			"timing": 2
		},
		{
			"name": "Санаторий Белое Озеро",
			"timing": 4
		},
		{
			"name": "Санаторий ВЦСПС №5",
			"timing": 2
		},
		{
			"name": "Санаторий Подмосковье",
			"timing": 4
		},
		{
			"name": "Санкт-Петербург",
			"timing": 3
		},
		{
			"name": "Саранск",
			"timing": 3
		},
		{
			"name": "Сарапул",
			"timing": 6
		},
		{
			"name": "Саратов",
			"timing": 4
		},
		{
			"name": "Сарманово",
			"timing": 2
		},
		{
			"name": "Саров",
			"timing": 4
		},
		{
			"name": "Сасово",
			"timing": 4
		},
		{
			"name": "Сатис",
			"timing": 3
		},
		{
			"name": "Сатка",
			"timing": 6
		},
		{
			"name": "Саукдере",
			"timing": 3
		},
		{
			"name": "Сафоновка",
			"timing": 2
		},
		{
			"name": "Сафоново",
			"timing": 5
		},
		{
			"name": "Саяногорск",
			"timing": 5
		},
		{
			"name": "Саянск",
			"timing": 7
		},
		{
			"name": "Сватково",
			"timing": 4
		},
		{
			"name": "Свердловский",
			"timing": 2
		},
		{
			"name": "Светлоград",
			"timing": 5
		},
		{
			"name": "Светлый Яр",
			"timing": 4
		},
		{
			"name": "Светогорск",
			"timing": 3
		},
		{
			"name": "Свободный",
			"timing": 6
		},
		{
			"name": "Свободы Поселок",
			"timing": 4
		},
		{
			"name": "Себеж",
			"timing": 5
		},
		{
			"name": "Севастополь",
			"timing": 5
		},
		{
			"name": "Северный",
			"timing": 2
		},
		{
			"name": "Северобайкальск",
			"timing": 6
		},
		{
			"name": "Северодвинск",
			"timing": 5
		},
		{
			"name": "Североморск",
			"timing": 6
		},
		{
			"name": "Североуральск",
			"timing": 6
		},
		{
			"name": "Северск",
			"timing": 5
		},
		{
			"name": "Северская",
			"timing": 5
		},
		{
			"name": "Сегежа",
			"timing": 6
		},
		{
			"name": "Селково",
			"timing": 4
		},
		{
			"name": "Сельниково",
			"timing": 4
		},
		{
			"name": "Сельцо",
			"timing": 4
		},
		{
			"name": "Селятино",
			"timing": 4
		},
		{
			"name": "Семенов",
			"timing": 3
		},
		{
			"name": "Семеново",
			"timing": 4
		},
		{
			"name": "Семеновское",
			"timing": 4
		},
		{
			"name": "Семикаракорск",
			"timing": 5
		},
		{
			"name": "Семилуки",
			"timing": 2
		},
		{
			"name": "Семилуки, Семилукский р-н, Воронежская обл.",
			"timing": 4
		},
		{
			"name": "Сенницы",
			"timing": 4
		},
		{
			"name": "Сергач",
			"timing": 4
		},
		{
			"name": "Сергиев Посад",
			"timing": 3
		},
		{
			"name": "Сергиевский",
			"timing": 4
		},
		{
			"name": "Сердобск",
			"timing": 4
		},
		{
			"name": "Серебряные Пруды",
			"timing": 4
		},
		{
			"name": "Серебряные Пруды совхоз",
			"timing": 4
		},
		{
			"name": "Середа",
			"timing": 4
		},
		{
			"name": "Середниково",
			"timing": 4
		},
		{
			"name": "Серов",
			"timing": 6
		},
		{
			"name": "Серпухов",
			"timing": 3
		},
		{
			"name": "Сертолово",
			"timing": 3
		},
		{
			"name": "Сестрорецк",
			"timing": 4
		},
		{
			"name": "Сибай",
			"timing": 6
		},
		{
			"name": "Симбухово",
			"timing": 3
		},
		{
			"name": "Симферополь",
			"timing": 4
		},
		{
			"name": "Синево",
			"timing": 4
		},
		{
			"name": "Синичино",
			"timing": 4
		},
		{
			"name": "Ситне-щелканово",
			"timing": 4
		},
		{
			"name": "Сколково инновационный центр",
			"timing": 3
		},
		{
			"name": "Скопин",
			"timing": 4
		},
		{
			"name": "Скоропусковский",
			"timing": 4
		},
		{
			"name": "Славгород",
			"timing": 5
		},
		{
			"name": "Славянск-на-Кубани",
			"timing": 5
		},
		{
			"name": "Сланцы",
			"timing": 3
		},
		{
			"name": "Слобода",
			"timing": 4
		},
		{
			"name": "Слободка",
			"timing": 4
		},
		{
			"name": "Слободской",
			"timing": 6
		},
		{
			"name": "Слюдянка",
			"timing": 6
		},
		{
			"name": "Смоленск",
			"timing": 3
		},
		{
			"name": "Смышляевка",
			"timing": 3
		},
		{
			"name": "Снегири",
			"timing": 2
		},
		{
			"name": "Снежинск",
			"timing": 6
		},
		{
			"name": "Собинка",
			"timing": 5
		},
		{
			"name": "Соболево",
			"timing": 4
		},
		{
			"name": "Советск",
			"timing": 8
		},
		{
			"name": "Советская Гавань",
			"timing": 7
		},
		{
			"name": "Советский",
			"timing": 6
		},
		{
			"name": "Совхоз 10 лет Октября",
			"timing": 4
		},
		{
			"name": "Совхоз 50 лет Октября",
			"timing": 3
		},
		{
			"name": "Совхоз им Ленина",
			"timing": 3
		},
		{
			"name": "Совхоз Маслово",
			"timing": 4
		},
		{
			"name": "Совхоз Мир",
			"timing": 4
		},
		{
			"name": "Сокол",
			"timing": 4
		},
		{
			"name": "Соколова Пустынь",
			"timing": 4
		},
		{
			"name": "Сокольниково",
			"timing": 4
		},
		{
			"name": "Соликамск",
			"timing": 6
		},
		{
			"name": "Солнечногорск",
			"timing": 2
		},
		{
			"name": "Солнечный",
			"timing": 8
		},
		{
			"name": "Соль-Илецк",
			"timing": 6
		},
		{
			"name": "Сомово",
			"timing": 2
		},
		{
			"name": "Сорочинск, Оренбургская обл.",
			"timing": 5
		},
		{
			"name": "Сортавала",
			"timing": 5
		},
		{
			"name": "Сосенский",
			"timing": 3
		},
		{
			"name": "Сосновка",
			"timing": 4
		},
		{
			"name": "Сосново, Приозерский р-н",
			"timing": 4
		},
		{
			"name": "Сосновоборск",
			"timing": 5
		},
		{
			"name": "Сосновый",
			"timing": 6
		},
		{
			"name": "Сосновый Бор",
			"timing": 5
		},
		{
			"name": "Софрино",
			"timing": 2
		},
		{
			"name": "Сочи",
			"timing": 5
		},
		{
			"name": "Спас Заулок",
			"timing": 4
		},
		{
			"name": "Спасс",
			"timing": 4
		},
		{
			"name": "Спасск-Дальний",
			"timing": 7
		},
		{
			"name": "Спутник",
			"timing": 4
		},
		{
			"name": "Ставрополь",
			"timing": 4
		},
		{
			"name": "Старая Купавна",
			"timing": 3
		},
		{
			"name": "Старая Руза",
			"timing": 4
		},
		{
			"name": "Старая Русса",
			"timing": 4
		},
		{
			"name": "Старая Ситня",
			"timing": 4
		},
		{
			"name": "Стариково",
			"timing": 4
		},
		{
			"name": "Старое",
			"timing": 4
		},
		{
			"name": "Старокорсунская станица",
			"timing": 4
		},
		{
			"name": "Староминская",
			"timing": 5
		},
		{
			"name": "Старый Городок",
			"timing": 4
		},
		{
			"name": "Старый Оскол",
			"timing": 4
		},
		{
			"name": "Старый Петергоф",
			"timing": 2
		},
		{
			"name": "Стегачево",
			"timing": 2
		},
		{
			"name": "Степановское",
			"timing": 2
		},
		{
			"name": "Степанцево",
			"timing": 4
		},
		{
			"name": "Степанщино",
			"timing": 4
		},
		{
			"name": "Степаньково",
			"timing": 4
		},
		{
			"name": "Стерлитамак",
			"timing": 5
		},
		{
			"name": "Столбовая",
			"timing": 4
		},
		{
			"name": "Стрежевой",
			"timing": 4
		},
		{
			"name": "Стрелица",
			"timing": 2
		},
		{
			"name": "Стрельна",
			"timing": 3
		},
		{
			"name": "Стремилово",
			"timing": 4
		},
		{
			"name": "Строитель, Яковлевский р-н",
			"timing": 4
		},
		{
			"name": "Струпна",
			"timing": 4
		},
		{
			"name": "Ступино",
			"timing": 3
		},
		{
			"name": "Судак",
			"timing": 4
		},
		{
			"name": "Судиславль",
			"timing": 3
		},
		{
			"name": "Судниково",
			"timing": 4
		},
		{
			"name": "Суздаль",
			"timing": 5
		},
		{
			"name": "Сумкино",
			"timing": 6
		},
		{
			"name": "Сунжа, Ингушетия респ.",
			"timing": 10
		},
		{
			"name": "Супсех",
			"timing": 5
		},
		{
			"name": "Сургут",
			"timing": 4
		},
		{
			"name": "Суходол",
			"timing": 6
		},
		{
			"name": "Сухой",
			"timing": 6
		},
		{
			"name": "Сухой Лог",
			"timing": 6
		},
		{
			"name": "Сходня",
			"timing": 3
		},
		{
			"name": "Сызрань",
			"timing": 4
		},
		{
			"name": "Сыктывкар",
			"timing": 5
		},
		{
			"name": "Сысерть",
			"timing": 6
		},
		{
			"name": "Сычево",
			"timing": 4
		},
		{
			"name": "Тавда",
			"timing": 6
		},
		{
			"name": "Таганрог",
			"timing": 5
		},
		{
			"name": "Тайшет",
			"timing": 7
		},
		{
			"name": "Талдом",
			"timing": 4
		},
		{
			"name": "Талица, Талицкий р-н",
			"timing": 6
		},
		{
			"name": "Талицы",
			"timing": 4
		},
		{
			"name": "Талнах",
			"timing": 7
		},
		{
			"name": "Тальменка",
			"timing": 6
		},
		{
			"name": "Тамань",
			"timing": 5
		},
		{
			"name": "Тамбов",
			"timing": 4
		},
		{
			"name": "Таптыково",
			"timing": 3
		},
		{
			"name": "Тарасково",
			"timing": 4
		},
		{
			"name": "Тарасково, Наро-Фоминский р-н",
			"timing": 3
		},
		{
			"name": "Тарасовский",
			"timing": 5
		},
		{
			"name": "Тарбушево",
			"timing": 4
		},
		{
			"name": "Татариново",
			"timing": 4
		},
		{
			"name": "Таширово",
			"timing": 4
		},
		{
			"name": "Тбилисская",
			"timing": 5
		},
		{
			"name": "Тверь",
			"timing": 3
		},
		{
			"name": "Текстильщик",
			"timing": 2
		},
		{
			"name": "Темпы",
			"timing": 4
		},
		{
			"name": "Темрюк",
			"timing": 5
		},
		{
			"name": "Терек",
			"timing": 6
		},
		{
			"name": "Теряево",
			"timing": 4
		},
		{
			"name": "Тимашевск",
			"timing": 2
		},
		{
			"name": "Тимашевск, Тимашевский р-н",
			"timing": 5
		},
		{
			"name": "Тимонино",
			"timing": 4
		},
		{
			"name": "Тихвин",
			"timing": 5
		},
		{
			"name": "Тихорецк",
			"timing": 5
		},
		{
			"name": "Тишково",
			"timing": 2
		},
		{
			"name": "Тобольск",
			"timing": 6
		},
		{
			"name": "Тогучин",
			"timing": 4
		},
		{
			"name": "Токи",
			"timing": 5
		},
		{
			"name": "Тольятти",
			"timing": 4
		},
		{
			"name": "Томилино",
			"timing": 4
		},
		{
			"name": "Томск",
			"timing": 4
		},
		{
			"name": "Тоншалово",
			"timing": 3
		},
		{
			"name": "Топканово",
			"timing": 4
		},
		{
			"name": "Топки",
			"timing": 4
		},
		{
			"name": "Торгашино",
			"timing": 4
		},
		{
			"name": "Торжок",
			"timing": 3
		},
		{
			"name": "Торхово",
			"timing": 4
		},
		{
			"name": "Тосно",
			"timing": 3
		},
		{
			"name": "Тотьма",
			"timing": 5
		},
		{
			"name": "Трехгорный",
			"timing": 5
		},
		{
			"name": "Троицк",
			"timing": 3
		},
		{
			"name": "Троицк, Чел. обл",
			"timing": 6
		},
		{
			"name": "Троицкое",
			"timing": 2
		},
		{
			"name": "Троицкое-антропово",
			"timing": 4
		},
		{
			"name": "Тропарево",
			"timing": 4
		},
		{
			"name": "Трубино",
			"timing": 2
		},
		{
			"name": "Трудовая",
			"timing": 3
		},
		{
			"name": "Туапсе",
			"timing": 4
		},
		{
			"name": "Туголесский Бор",
			"timing": 4
		},
		{
			"name": "Туймазы",
			"timing": 5
		},
		{
			"name": "Тула",
			"timing": 3
		},
		{
			"name": "Тула Пятьдесят",
			"timing": 2
		},
		{
			"name": "Тулун",
			"timing": 7
		},
		{
			"name": "Туношна",
			"timing": 3
		},
		{
			"name": "Туринск",
			"timing": 6
		},
		{
			"name": "Турово",
			"timing": 4
		},
		{
			"name": "Тутаев",
			"timing": 2
		},
		{
			"name": "Тучково",
			"timing": 4
		},
		{
			"name": "Тында",
			"timing": 9
		},
		{
			"name": "Тюменский",
			"timing": 4
		},
		{
			"name": "Тюменское",
			"timing": 4
		},
		{
			"name": "Тюмень",
			"timing": 5
		},
		{
			"name": "Ува",
			"timing": 5
		},
		{
			"name": "Уваровка",
			"timing": 4
		},
		{
			"name": "Уват",
			"timing": 7
		},
		{
			"name": "Углич",
			"timing": 4
		},
		{
			"name": "Ударный",
			"timing": 4
		},
		{
			"name": "Удельная",
			"timing": 2
		},
		{
			"name": "Удомля",
			"timing": 4
		},
		{
			"name": "Ужур",
			"timing": 7
		},
		{
			"name": "Узловая",
			"timing": 3
		},
		{
			"name": "Узуново",
			"timing": 4
		},
		{
			"name": "Улан-Удэ",
			"timing": 4
		},
		{
			"name": "Ульянино",
			"timing": 4
		},
		{
			"name": "Ульяновка",
			"timing": 2
		},
		{
			"name": "Ульяновск",
			"timing": 4
		},
		{
			"name": "Урай",
			"timing": 6
		},
		{
			"name": "Урус-Мартан",
			"timing": 4
		},
		{
			"name": "Урюпинск",
			"timing": 6
		},
		{
			"name": "Усады",
			"timing": 4
		},
		{
			"name": "Усады, Лаишевский р-н",
			"timing": 4
		},
		{
			"name": "Усинск",
			"timing": 8
		},
		{
			"name": "Усмань",
			"timing": 5
		},
		{
			"name": "Усово",
			"timing": 2
		},
		{
			"name": "Усовский",
			"timing": 4
		},
		{
			"name": "Усолье",
			"timing": 4
		},
		{
			"name": "Усолье-Сибирское",
			"timing": 6
		},
		{
			"name": "Успенское",
			"timing": 2
		},
		{
			"name": "Уссурийск",
			"timing": 7
		},
		{
			"name": "Усть-Абакан",
			"timing": 6
		},
		{
			"name": "Усть-Джегута",
			"timing": 6
		},
		{
			"name": "Усть-Илимск",
			"timing": 6
		},
		{
			"name": "Усть-Катав",
			"timing": 5
		},
		{
			"name": "Усть-Кинельский",
			"timing": 3
		},
		{
			"name": "Усть-Кокса",
			"timing": 6
		},
		{
			"name": "Усть-Кут",
			"timing": 6
		},
		{
			"name": "Усть-Лабинск",
			"timing": 5
		},
		{
			"name": "Устье",
			"timing": 4
		},
		{
			"name": "Уфа",
			"timing": 5
		},
		{
			"name": "Ухта",
			"timing": 5
		},
		{
			"name": "Учалы",
			"timing": 5
		},
		{
			"name": "Учкекен, Карачаево-Черкесская респ.",
			"timing": 9
		},
		{
			"name": "Ушаково",
			"timing": 4
		},
		{
			"name": "Уяр, Красноярский край",
			"timing": 5
		},
		{
			"name": "Федоровка",
			"timing": 3
		},
		{
			"name": "Федорцово",
			"timing": 4
		},
		{
			"name": "Федосино",
			"timing": 4
		},
		{
			"name": "Федюково",
			"timing": 2
		},
		{
			"name": "Фенино",
			"timing": 4
		},
		{
			"name": "Феодосия",
			"timing": 4
		},
		{
			"name": "Ферма",
			"timing": 4
		},
		{
			"name": "Фирсановка",
			"timing": 2
		},
		{
			"name": "Фокино",
			"timing": 6
		},
		{
			"name": "Фролы",
			"timing": 4
		},
		{
			"name": "Фруктовая",
			"timing": 4
		},
		{
			"name": "Фрязево",
			"timing": 3
		},
		{
			"name": "Фрязино",
			"timing": 2
		},
		{
			"name": "Фряново",
			"timing": 2
		},
		{
			"name": "Хабаровск",
			"timing": 6
		},
		{
			"name": "Ханты-Мансийск",
			"timing": 4
		},
		{
			"name": "Хапо-Ое",
			"timing": 8
		},
		{
			"name": "Харлампеево",
			"timing": 4
		},
		{
			"name": "Хасавюрт",
			"timing": 6
		},
		{
			"name": "Хатунь",
			"timing": 4
		},
		{
			"name": "Химки",
			"timing": 3
		},
		{
			"name": "Химки Новые",
			"timing": 3
		},
		{
			"name": "Хлюпино",
			"timing": 2
		},
		{
			"name": "Холмогоры",
			"timing": 4
		},
		{
			"name": "Холмск",
			"timing": 8
		},
		{
			"name": "Холщевики",
			"timing": 4
		},
		{
			"name": "Хомутово",
			"timing": 6
		},
		{
			"name": "Хорлово",
			"timing": 4
		},
		{
			"name": "Хотеичи",
			"timing": 4
		},
		{
			"name": "Хотиково",
			"timing": 4
		},
		{
			"name": "Хотьково, Сергиево-Посадский р-н",
			"timing": 3
		},
		{
			"name": "Хрипань",
			"timing": 2
		},
		{
			"name": "Хрущево",
			"timing": 4
		},
		{
			"name": "Хутор им. Ленина",
			"timing": 2
		},
		{
			"name": "Цветковский Совхоз",
			"timing": 4
		},
		{
			"name": "Цемдолина",
			"timing": 2
		},
		{
			"name": "Цемдолина, гор. окр Новороссийск",
			"timing": 4
		},
		{
			"name": "Центролит",
			"timing": 4
		},
		{
			"name": "Цивильск",
			"timing": 5
		},
		{
			"name": "Цимлянск",
			"timing": 5
		},
		{
			"name": "Цыпка",
			"timing": 8
		},
		{
			"name": "Цюрупы",
			"timing": 4
		},
		{
			"name": "Чайковский",
			"timing": 5
		},
		{
			"name": "Чалтырь",
			"timing": 5
		},
		{
			"name": "Чапаевск",
			"timing": 8
		},
		{
			"name": "Часцы",
			"timing": 4
		},
		{
			"name": "Чашниково",
			"timing": 2
		},
		{
			"name": "Чебаркуль",
			"timing": 6
		},
		{
			"name": "Чебоксары",
			"timing": 4
		},
		{
			"name": "Чегдомын",
			"timing": 7
		},
		{
			"name": "Челябинск",
			"timing": 6
		},
		{
			"name": "Чемодурово",
			"timing": 4
		},
		{
			"name": "Ченлобитьево",
			"timing": 2
		},
		{
			"name": "Черемхово",
			"timing": 7
		},
		{
			"name": "Череповец",
			"timing": 4
		},
		{
			"name": "Черкесск",
			"timing": 6
		},
		{
			"name": "Черкизово",
			"timing": 2
		},
		{
			"name": "Черленково",
			"timing": 4
		},
		{
			"name": "Черная Грязь, Солнечногорский р-н",
			"timing": 3
		},
		{
			"name": "Чёрная Грязь, Солнечногорский р-н",
			"timing": 3
		},
		{
			"name": "Черная Речка",
			"timing": 2
		},
		{
			"name": "Чернетское",
			"timing": 4
		},
		{
			"name": "Черноголовка",
			"timing": 3
		},
		{
			"name": "Черногорск",
			"timing": 5
		},
		{
			"name": "Черное",
			"timing": 3
		},
		{
			"name": "Черноморское",
			"timing": 4
		},
		{
			"name": "Чернушка",
			"timing": 6
		},
		{
			"name": "Чертково",
			"timing": 5
		},
		{
			"name": "Черусти",
			"timing": 4
		},
		{
			"name": "Чесноковка",
			"timing": 2
		},
		{
			"name": "Чехов",
			"timing": 3
		},
		{
			"name": "Чисмена",
			"timing": 4
		},
		{
			"name": "Чистополь",
			"timing": 4
		},
		{
			"name": "Чита",
			"timing": 5
		},
		{
			"name": "Чкаловск",
			"timing": 6
		},
		{
			"name": "Чудово",
			"timing": 5
		},
		{
			"name": "Чулково",
			"timing": 2
		},
		{
			"name": "Чунский",
			"timing": 8
		},
		{
			"name": "Чурилково",
			"timing": 4
		},
		{
			"name": "Чусовой",
			"timing": 6
		},
		{
			"name": "Шабурново",
			"timing": 4
		},
		{
			"name": "Шадринск",
			"timing": 5
		},
		{
			"name": "Шали",
			"timing": 4
		},
		{
			"name": "Шаликово",
			"timing": 4
		},
		{
			"name": "Шарапова Охота",
			"timing": 4
		},
		{
			"name": "Шарапово",
			"timing": 4
		},
		{
			"name": "Шарыпово",
			"timing": 6
		},
		{
			"name": "Шарья",
			"timing": 5
		},
		{
			"name": "Шатск второй",
			"timing": 4
		},
		{
			"name": "Шатура",
			"timing": 3
		},
		{
			"name": "Шатурторф",
			"timing": 4
		},
		{
			"name": "Шаумян",
			"timing": 4
		},
		{
			"name": "Шаховская",
			"timing": 4
		},
		{
			"name": "Шаховская, Шаховской р-н",
			"timing": 4
		},
		{
			"name": "Шахты",
			"timing": 5
		},
		{
			"name": "Шахунья",
			"timing": 4
		},
		{
			"name": "Шебекино",
			"timing": 4
		},
		{
			"name": "Шебекино, Шебекинский р-н",
			"timing": 4
		},
		{
			"name": "Шевляково",
			"timing": 4
		},
		{
			"name": "Шеино",
			"timing": 4
		},
		{
			"name": "Шелехов",
			"timing": 6
		},
		{
			"name": "Шеметово",
			"timing": 4
		},
		{
			"name": "Шепси",
			"timing": 8
		},
		{
			"name": "Шереметьево 1 аэропорт",
			"timing": 2
		},
		{
			"name": "Шереметьево 2 аэропорт",
			"timing": 2
		},
		{
			"name": "Шереметьевский",
			"timing": 2
		},
		{
			"name": "Шестаково",
			"timing": 4
		},
		{
			"name": "Шилово",
			"timing": 4
		},
		{
			"name": "Шихово",
			"timing": 2
		},
		{
			"name": "Шубино",
			"timing": 2
		},
		{
			"name": "Шувое",
			"timing": 4
		},
		{
			"name": "Шугарово",
			"timing": 4
		},
		{
			"name": "Шустиково",
			"timing": 4
		},
		{
			"name": "Шушары",
			"timing": 3
		},
		{
			"name": "Шуя",
			"timing": 4
		},
		{
			"name": "Щапово",
			"timing": 2
		},
		{
			"name": "Щеглово",
			"timing": 2
		},
		{
			"name": "Щеглятьево",
			"timing": 4
		},
		{
			"name": "Щекино",
			"timing": 4
		},
		{
			"name": "Щелково",
			"timing": 4
		},
		{
			"name": "Щербинка",
			"timing": 3
		},
		{
			"name": "Электрогорск",
			"timing": 3
		},
		{
			"name": "Электросталь",
			"timing": 3
		},
		{
			"name": "Электроугли",
			"timing": 3
		},
		{
			"name": "Элиста",
			"timing": 5
		},
		{
			"name": "Энгельс",
			"timing": 4
		},
		{
			"name": "Юбилейный",
			"timing": 2
		},
		{
			"name": "Юбилейный мкр. (Королёв)",
			"timing": 3
		},
		{
			"name": "Югорск",
			"timing": 6
		},
		{
			"name": "Южно-Сахалинск",
			"timing": 8
		},
		{
			"name": "Южноуральск",
			"timing": 6
		},
		{
			"name": "Южный",
			"timing": 8
		},
		{
			"name": "Юрга",
			"timing": 4
		},
		{
			"name": "Юрлово",
			"timing": 4
		},
		{
			"name": "Юрцово",
			"timing": 4
		},
		{
			"name": "Юрьев-Польский",
			"timing": 5
		},
		{
			"name": "Юрюзань",
			"timing": 5
		},
		{
			"name": "Юхнов",
			"timing": 3
		},
		{
			"name": "Яблоновский",
			"timing": 5
		},
		{
			"name": "Яковлево",
			"timing": 4
		},
		{
			"name": "Яковское",
			"timing": 4
		},
		{
			"name": "Якоть",
			"timing": 4
		},
		{
			"name": "Якутск",
			"timing": 8
		},
		{
			"name": "Ялта",
			"timing": 4
		},
		{
			"name": "Ялуторовск",
			"timing": 6
		},
		{
			"name": "Ям",
			"timing": 2
		},
		{
			"name": "Ямкино",
			"timing": 3
		},
		{
			"name": "Ямны",
			"timing": 3
		},
		{
			"name": "Янино 1",
			"timing": 8
		},
		{
			"name": "Ярополец",
			"timing": 4
		},
		{
			"name": "Ярославль",
			"timing": 3
		},
		{
			"name": "Ярцево",
			"timing": 5
		},
		{
			"name": "Ясная Поляна",
			"timing": 4
		},
		{
			"name": "Ясногорск",
			"timing": 3
		},
		{
			"name": "Яхрома",
			"timing": 4
		},
		{
			"name": "Moscow",
			"timing": 3
		},
		{
			"name": "Saint Petersburg",
			"timing": 3
		},
		{
			"name": "Novosibirsk",
			"timing": 4
		},
		{
			"name": "Yekaterinburg",
			"timing": 5
		},
		{
			"name": "Kazan",
			"timing": 4
		},
		{
			"name": "Nizhny Novgorod",
			"timing": 3
		},
		{
			"name": "Chelyabinsk",
			"timing": 6
		},
		{
			"name": "Samara",
			"timing": 4
		},
		{
			"name": "Omsk",
			"timing": 4
		},
		{
			"name": "Rostov-on-Don",
			"timing": 4
		},
		{
			"name": "Ufa",
			"timing": 5
		},
		{
			"name": "Krasnoyarsk",
			"timing": 4
		},
		{
			"name": "Voronezh",
			"timing": 3
		},
		{
			"name": "Perm",
			"timing": 5
		},
		{
			"name": "Volgograd",
			"timing": 4
		},
		{
			"name": "Krasnodar",
			"timing": 4
		},
	],
	"BY": [
		{
			"name": "Барановичи",
			"timing": 5
		},
		{
			"name": "Бобруйск",
			"timing": 4
		},
		{
			"name": "Борисов",
			"timing": 3
		},
		{
			"name": "Брест",
			"timing": 3
		},
		{
			"name": "Витебск",
			"timing": 3
		},
		{
			"name": "Воскресенское поселение",
			"timing": 2
		},
		{
			"name": "Гомель",
			"timing": 5
		},
		{
			"name": "Гродно",
			"timing": 5
		},
		{
			"name": "Жлобин",
			"timing": 5
		},
		{
			"name": "Жодино",
			"timing": 4
		},
		{
			"name": "Зеленоград",
			"timing": 3
		},
		{
			"name": "Кобрин",
			"timing": 5
		},
		{
			"name": "Лида",
			"timing": 5
		},
		{
			"name": "Минск",
			"timing": 3
		},
		{
			"name": "Митино",
			"timing": 3
		},
		{
			"name": "Могилев",
			"timing": 5
		},
		{
			"name": "Мозырь",
			"timing": 8
		},
		{
			"name": "Молодечно",
			"timing": 5
		},
		{
			"name": "Москва",
			"timing": 2
		},
		{
			"name": "Новополоцк",
			"timing": 4
		},
		{
			"name": "Орша",
			"timing": 5
		},
		{
			"name": "Пинск",
			"timing": 5
		},
		{
			"name": "Полоцк",
			"timing": 4
		},
		{
			"name": "Сколково",
			"timing": 3
		},
		{
			"name": "Слуцк",
			"timing": 5
		},
		{
			"name": "Солигорск",
			"timing": 4
		},
		{
			"name": "Троицк",
			"timing": 3
		},
		{
			"name": "Щербинка",
			"timing": 3
		}
	],
	"KZ": [
		{
			"name": "Абай, Карагандинская обл, Казахстан",
			"timing": 10
		},
		{
			"name": "Актау",
			"timing": 9
		},
		{
			"name": "Актобе, Казахстан",
			"timing": 7
		},
		{
			"name": "Алматы",
			"timing": 11
		},
		{
			"name": "Атырау",
			"timing": 6
		},
		{
			"name": "Балхаш, Карагандинская обл",
			"timing": 12
		},
		{
			"name": "Воскресенское поселение",
			"timing": 3
		},
		{
			"name": "Жанаозен, Мангистауская обл.",
			"timing": 9
		},
		{
			"name": "Жезказган, Карагандинская обл.",
			"timing": 12
		},
		{
			"name": "Зеленоград",
			"timing": 3
		},
		{
			"name": "Капчагай, Алма-Атинская обл.",
			"timing": 13
		},
		{
			"name": "Караганда, Карагандинская обл.",
			"timing": 9
		},
		{
			"name": "Каскелен, Алматинская обл, Карасайский район",
			"timing": 13
		},
		{
			"name": "Кокшетау, Казахстан",
			"timing": 10
		},
		{
			"name": "Кордай, Жамбылская обл.",
			"timing": 13
		},
		{
			"name": "Костанай",
			"timing": 11
		},
		{
			"name": "Косшы, Целиноградский р-н, Казахстан",
			"timing": 11
		},
		{
			"name": "Кызылорда, Казахстан",
			"timing": 12
		},
		{
			"name": "Митино",
			"timing": 3
		},
		{
			"name": "Москва",
			"timing": 6
		},
		{
			"name": "Нур-Султан",
			"timing": 9
		},
		{
			"name": "Астана",
			"timing": 9
		},
		{
			"name": "Отеген батыр",
			"timing": 11
		},
		{
			"name": "Павлодар, Павлодарская обл.",
			"timing": 8
		},
		{
			"name": "Петропавловск, Сев.-Казах.обл.",
			"timing": 6
		},
		{
			"name": "Приозёрск",
			"timing": 13
		},
		{
			"name": "Риддер",
			"timing": 9
		},
		{
			"name": "Рудный, Костанайская обл.",
			"timing": 12
		},
		{
			"name": "Сарань, Карагандинская обл., Казахстан",
			"timing": 10
		},
		{
			"name": "Сарыагаш, Туркестанская обл.",
			"timing": 14
		},
		{
			"name": "Сатпаев, Карагандинская обл., Казахстан",
			"timing": 19
		},
		{
			"name": "Семей (Семипалатинск)",
			"timing": 8
		}
	]
}

function shippingTo(country) {
	let freeShipping = false;
	const order = new Order();

	$("#delivery").attr("data-country-code", country ? country.code : null);

	if ((country && country.code == 'RU') || order.total() > 190) {
		freeShipping = true;
		$('#total').text('$' + order.total()).data('total', order.total());
	} else
		$('#total').text('$' + (order.total() + 15)).data('total', order.total() + 15);

	if (!freeShipping)
		setTimingAndShipping(
			country ? country.timing : null,
			190 - order.total()
		)
	else
		setTimingAndShipping(country.timing ?? null)
}

function setTimingAndShipping(timing = null, leftToFreeshipping = null) {
	let days = timing ? '(' + timing + ' ' + (timing <= 1 ? 'day' : 'days') + ')' : '';

	$('#delivery').attr("data-timing", timing);

	$('#delivery').html(
		(leftToFreeshipping > 0 ? `<span>$${leftToFreeshipping}</span>&nbsp;` : '') + `DHL Express® ${days}`
	);
}

function shippingToCity(__city) {
	if (
		$('#delivery').data('country-code') == 'RU' ||
		$('#delivery').data('country-code') == 'BY' ||
		$('#delivery').data('country-code') == 'KZ'
	) {
		let city = cities_data[$('#delivery').data('country-code')].find(city => city.name.toLowerCase() == __city.trim().toLowerCase());

		setTimingAndShipping(city ? city.timing : null)
	}
}
