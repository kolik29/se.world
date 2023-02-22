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

			if (country.name.toLocaleLowerCase() == 'russia') {
				$('.js-hide-paypal').addClass('display_none');
			}
		});
	}

	$('.input-wrapper input[name="country"]').on('change, keyup', function () {
		let country = countries_data.find(country => country.name.toLowerCase() == $(this).val().trim().toLowerCase());

		if (country) {
			$('.input-wrapper input[name="country"]').val(country.name);
			shippingTo(country);
		}
	})

	$('.input-wrapper input[name="state"]').on('change, keyup', function () {
		shippingToCity($(this).val());
	})

	$('body').on('click', '.checkout-wrapper .minus, .checkout-wrapper .plus', () => {
		let country = countries_data.find(country => country.name.toLowerCase() == $('.input-wrapper input[name="country"]').val().trim().toLowerCase()),
			city = $('.input-wrapper input[name="state"]').val();

		if (country)
			shippingTo(country);

		if (city != '')
			shippingToCity(city);
	})
})

var countries_data = [
	{
		name: 'Беларусь',
		timing: 'ex_calc',
		code: 'BY'
	},
	{
		name: 'Казахстан',
		timing: 'ex_calc',
		code: 'KZ'
	},
	{
		name: 'Россия',
		timing: 'ex_calc',
		code: 'RU'
	},
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
		name: '"Yap (Micronesia, Federal States)"',
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
		name: '"Congo, Democratic Republic"',
		timing: 6,
		code: 'CD'
	},
	{
		name: '"Korea, South"',
		timing: 4,
		code: 'KR'
	},
	{
		name: 'Kosovo',
		timing: 6,
		code: 'XK'
	},
	{
		name: '"Kosray (Micronesia, Federal States)"',
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
		name: '"Ponape (Micronesia, Federal States)"',
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
		name: '"Truk (Micronesia, Federal States)"',
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
			"deliveries_time": 3
		},
		{
			"name": "40 лет Октября",
			"deliveries_time": 4
		},
		{
			"name": "Абакан",
			"deliveries_time": 4
		},
		{
			"name": "Абинск",
			"deliveries_time": 5
		},
		{
			"name": "Абрамовка",
			"deliveries_time": 4
		},
		{
			"name": "Абрамцево",
			"deliveries_time": 4
		},
		{
			"name": "Абрау-Дюрсо",
			"deliveries_time": 3
		},
		{
			"name": "Авдеево",
			"deliveries_time": 4
		},
		{
			"name": "Авдотьино",
			"deliveries_time": 3
		},
		{
			"name": "Авсюнино",
			"deliveries_time": 4
		},
		{
			"name": "Агой",
			"deliveries_time": 3
		},
		{
			"name": "Агрия",
			"deliveries_time": 4
		},
		{
			"name": "Агрыз",
			"deliveries_time": 5
		},
		{
			"name": "Адыгейск",
			"deliveries_time": 5
		},
		{
			"name": "Азнакаево",
			"deliveries_time": 4
		},
		{
			"name": "Азов",
			"deliveries_time": 5
		},
		{
			"name": "Акатьево",
			"deliveries_time": 4
		},
		{
			"name": "Аксай",
			"deliveries_time": 5
		},
		{
			"name": "Аксинино",
			"deliveries_time": 4
		},
		{
			"name": "Аксиньино",
			"deliveries_time": 2
		},
		{
			"name": "Алабино",
			"deliveries_time": 4
		},
		{
			"name": "Алабушево",
			"deliveries_time": 4
		},
		{
			"name": "Алапаевск",
			"deliveries_time": 6
		},
		{
			"name": "Алдан",
			"deliveries_time": 11
		},
		{
			"name": "Алейск",
			"deliveries_time": 6
		},
		{
			"name": "Александров",
			"deliveries_time": 3
		},
		{
			"name": "Александрово",
			"deliveries_time": 4
		},
		{
			"name": "Александровск",
			"deliveries_time": 3
		},
		{
			"name": "Алексеевка",
			"deliveries_time": 5
		},
		{
			"name": "Алексеевка, Алексеевский район, Белгородская обл.",
			"deliveries_time": 4
		},
		{
			"name": "Алексин",
			"deliveries_time": 3
		},
		{
			"name": "Алексино",
			"deliveries_time": 4
		},
		{
			"name": "Алексино-шатур",
			"deliveries_time": 4
		},
		{
			"name": "Алешня",
			"deliveries_time": 3
		},
		{
			"name": "Алпатьево",
			"deliveries_time": 4
		},
		{
			"name": "Алтайское, Алтайский край",
			"deliveries_time": 4
		},
		{
			"name": "Алушта",
			"deliveries_time": 4
		},
		{
			"name": "Алферьево",
			"deliveries_time": 4
		},
		{
			"name": "Алфимово",
			"deliveries_time": 4
		},
		{
			"name": "Альметьевск",
			"deliveries_time": 4
		},
		{
			"name": "Амурск",
			"deliveries_time": 7
		},
		{
			"name": "Анапа",
			"deliveries_time": 5
		},
		{
			"name": "Анапская",
			"deliveries_time": 5
		},
		{
			"name": "Ангарск",
			"deliveries_time": 6
		},
		{
			"name": "Анджиевский",
			"deliveries_time": 2
		},
		{
			"name": "Андреевка",
			"deliveries_time": 2
		},
		{
			"name": "Андрейково",
			"deliveries_time": 2
		},
		{
			"name": "Анжеро-Судженск",
			"deliveries_time": 5
		},
		{
			"name": "Анива",
			"deliveries_time": 4
		},
		{
			"name": "Апатиты",
			"deliveries_time": 6
		},
		{
			"name": "Апрелевка",
			"deliveries_time": 4
		},
		{
			"name": "Апшеронск",
			"deliveries_time": 4
		},
		{
			"name": "Арамиль",
			"deliveries_time": 5
		},
		{
			"name": "Аргун",
			"deliveries_time": 3
		},
		{
			"name": "Арзамас",
			"deliveries_time": 4
		},
		{
			"name": "Армавир",
			"deliveries_time": 5
		},
		{
			"name": "Армянск",
			"deliveries_time": 4
		},
		{
			"name": "Арсеньев",
			"deliveries_time": 7
		},
		{
			"name": "Арск",
			"deliveries_time": 4
		},
		{
			"name": "Артем",
			"deliveries_time": 7
		},
		{
			"name": "Артём",
			"deliveries_time": 6
		},
		{
			"name": "Артемовский",
			"deliveries_time": 6
		},
		{
			"name": "Арти, Свердловская обл.",
			"deliveries_time": 6
		},
		{
			"name": "Архангельск",
			"deliveries_time": 4
		},
		{
			"name": "Архангельское",
			"deliveries_time": 4
		},
		{
			"name": "Архипо-Осиповка",
			"deliveries_time": 5
		},
		{
			"name": "Асбест",
			"deliveries_time": 5
		},
		{
			"name": "Асино",
			"deliveries_time": 6
		},
		{
			"name": "Астапово",
			"deliveries_time": 4
		},
		{
			"name": "Астрахань",
			"deliveries_time": 4
		},
		{
			"name": "Атепцево",
			"deliveries_time": 4
		},
		{
			"name": "Афанасовка",
			"deliveries_time": 4
		},
		{
			"name": "Афипский",
			"deliveries_time": 4
		},
		{
			"name": "Ахтубинск",
			"deliveries_time": 5
		},
		{
			"name": "Ачинск",
			"deliveries_time": 4
		},
		{
			"name": "Аша, Ашинский р-н",
			"deliveries_time": 6
		},
		{
			"name": "Ашитково",
			"deliveries_time": 4
		},
		{
			"name": "Ашукино",
			"deliveries_time": 2
		},
		{
			"name": "Бабенки",
			"deliveries_time": 4
		},
		{
			"name": "Бабяково",
			"deliveries_time": 2
		},
		{
			"name": "Бавлы",
			"deliveries_time": 4
		},
		{
			"name": "Баксан",
			"deliveries_time": 6
		},
		{
			"name": "Бакшеево",
			"deliveries_time": 4
		},
		{
			"name": "Балабаново",
			"deliveries_time": 3
		},
		{
			"name": "Балаково",
			"deliveries_time": 5
		},
		{
			"name": "Балахна",
			"deliveries_time": 3
		},
		{
			"name": "Балашиха",
			"deliveries_time": 3
		},
		{
			"name": "Балашов",
			"deliveries_time": 5
		},
		{
			"name": "Балезино",
			"deliveries_time": 6
		},
		{
			"name": "Барабаново",
			"deliveries_time": 4
		},
		{
			"name": "Барановское",
			"deliveries_time": 4
		},
		{
			"name": "Барвиха",
			"deliveries_time": 2
		},
		{
			"name": "Барвиха Санаторий",
			"deliveries_time": 2
		},
		{
			"name": "Барда, Бардымский р-н",
			"deliveries_time": 5
		},
		{
			"name": "Барнаул",
			"deliveries_time": 4
		},
		{
			"name": "Барсово",
			"deliveries_time": 3
		},
		{
			"name": "Барсуки",
			"deliveries_time": 4
		},
		{
			"name": "Барынино",
			"deliveries_time": 4
		},
		{
			"name": "Барышево",
			"deliveries_time": 3
		},
		{
			"name": "Батайск",
			"deliveries_time": 4
		},
		{
			"name": "Батырево, Батыревский р-н",
			"deliveries_time": 5
		},
		{
			"name": "Бахчисарай",
			"deliveries_time": 4
		},
		{
			"name": "Безенчук",
			"deliveries_time": 5
		},
		{
			"name": "Беззубово",
			"deliveries_time": 4
		},
		{
			"name": "Бекасово",
			"deliveries_time": 4
		},
		{
			"name": "Белая Глина",
			"deliveries_time": 8
		},
		{
			"name": "Белая дача",
			"deliveries_time": 2
		},
		{
			"name": "Белая Калитва",
			"deliveries_time": 5
		},
		{
			"name": "Белая Колпь",
			"deliveries_time": 4
		},
		{
			"name": "Белгород",
			"deliveries_time": 4
		},
		{
			"name": "Белебей",
			"deliveries_time": 5
		},
		{
			"name": "Белово",
			"deliveries_time": 4
		},
		{
			"name": "Белогорск",
			"deliveries_time": 6
		},
		{
			"name": "Белогорск (Крым)",
			"deliveries_time": 5
		},
		{
			"name": "Белозерский",
			"deliveries_time": 4
		},
		{
			"name": "Белокуриха",
			"deliveries_time": 4
		},
		{
			"name": "Белоозерский",
			"deliveries_time": 4
		},
		{
			"name": "Белоомут",
			"deliveries_time": 4
		},
		{
			"name": "Белорецк",
			"deliveries_time": 6
		},
		{
			"name": "Белореченск",
			"deliveries_time": 5
		},
		{
			"name": "Белые Колодези",
			"deliveries_time": 4
		},
		{
			"name": "Белые Столбы",
			"deliveries_time": 4
		},
		{
			"name": "Белый Раст",
			"deliveries_time": 3
		},
		{
			"name": "Белый Яр",
			"deliveries_time": 3
		},
		{
			"name": "Беляная Гора",
			"deliveries_time": 4
		},
		{
			"name": "Беляниново",
			"deliveries_time": 2
		},
		{
			"name": "Бердск",
			"deliveries_time": 3
		},
		{
			"name": "Береговое",
			"deliveries_time": 3
		},
		{
			"name": "Березка Дом отдыха",
			"deliveries_time": 4
		},
		{
			"name": "Березники",
			"deliveries_time": 6
		},
		{
			"name": "Березняки",
			"deliveries_time": 4
		},
		{
			"name": "Березовка, Красноярский край",
			"deliveries_time": 5
		},
		{
			"name": "Березовский",
			"deliveries_time": 5
		},
		{
			"name": "Березовский (Кузбасс)",
			"deliveries_time": 4
		},
		{
			"name": "Берники",
			"deliveries_time": 4
		},
		{
			"name": "Беслан, Северная Осетия респ.",
			"deliveries_time": 5
		},
		{
			"name": "Бессоновка",
			"deliveries_time": 3
		},
		{
			"name": "Бетта",
			"deliveries_time": 4
		},
		{
			"name": "Бийск",
			"deliveries_time": 4
		},
		{
			"name": "Бикей",
			"deliveries_time": 4
		},
		{
			"name": "Бикин",
			"deliveries_time": 7
		},
		{
			"name": "Биорки",
			"deliveries_time": 4
		},
		{
			"name": "Бирево",
			"deliveries_time": 4
		},
		{
			"name": "Биробиджан",
			"deliveries_time": 5
		},
		{
			"name": "Бирск",
			"deliveries_time": 5
		},
		{
			"name": "Бисерово",
			"deliveries_time": 3
		},
		{
			"name": "Благовещенка, Алтайский край",
			"deliveries_time": 6
		},
		{
			"name": "Благовещенск",
			"deliveries_time": 6
		},
		{
			"name": "Благовещенск, Башкортостан респ.",
			"deliveries_time": 5
		},
		{
			"name": "Бобково",
			"deliveries_time": 4
		},
		{
			"name": "Бобров, Бобровский р-н",
			"deliveries_time": 4
		},
		{
			"name": "Богандинский",
			"deliveries_time": 3
		},
		{
			"name": "Богатищево",
			"deliveries_time": 4
		},
		{
			"name": "Богашево",
			"deliveries_time": 2
		},
		{
			"name": "Богданович",
			"deliveries_time": 6
		},
		{
			"name": "Богородицк",
			"deliveries_time": 4
		},
		{
			"name": "Богородск",
			"deliveries_time": 3
		},
		{
			"name": "Богородское",
			"deliveries_time": 4
		},
		{
			"name": "Богучар",
			"deliveries_time": 4
		},
		{
			"name": "Бодайбо",
			"deliveries_time": 7
		},
		{
			"name": "Бологое",
			"deliveries_time": 4
		},
		{
			"name": "Болохово",
			"deliveries_time": 3
		},
		{
			"name": "Болычево",
			"deliveries_time": 4
		},
		{
			"name": "Большево",
			"deliveries_time": 2
		},
		{
			"name": "Большеустьикинское",
			"deliveries_time": 6
		},
		{
			"name": "Большие Вяземы",
			"deliveries_time": 2
		},
		{
			"name": "Большие Дворы",
			"deliveries_time": 4
		},
		{
			"name": "Большое Алексеевское",
			"deliveries_time": 4
		},
		{
			"name": "Большое Гридино",
			"deliveries_time": 4
		},
		{
			"name": "Большое Грызлово",
			"deliveries_time": 4
		},
		{
			"name": "Большое Савино",
			"deliveries_time": 3
		},
		{
			"name": "Большое Село",
			"deliveries_time": 3
		},
		{
			"name": "Большой Камень",
			"deliveries_time": 6
		},
		{
			"name": "Бор",
			"deliveries_time": 3
		},
		{
			"name": "Борзя",
			"deliveries_time": 7
		},
		{
			"name": "Борисово",
			"deliveries_time": 4
		},
		{
			"name": "Борисоглебск",
			"deliveries_time": 5
		},
		{
			"name": "Борисоглебский",
			"deliveries_time": 2
		},
		{
			"name": "Боровичи",
			"deliveries_time": 4
		},
		{
			"name": "Боровково",
			"deliveries_time": 3
		},
		{
			"name": "Боровск",
			"deliveries_time": 3
		},
		{
			"name": "Боровский",
			"deliveries_time": 3
		},
		{
			"name": "Бородино",
			"deliveries_time": 5
		},
		{
			"name": "Бортниково",
			"deliveries_time": 4
		},
		{
			"name": "Ботово",
			"deliveries_time": 2
		},
		{
			"name": "Бояркино",
			"deliveries_time": 4
		},
		{
			"name": "Братовщина",
			"deliveries_time": 2
		},
		{
			"name": "Братск",
			"deliveries_time": 5
		},
		{
			"name": "Бронницы",
			"deliveries_time": 3
		},
		{
			"name": "Брюховецкая",
			"deliveries_time": 5
		},
		{
			"name": "Брянск",
			"deliveries_time": 3
		},
		{
			"name": "Бугры",
			"deliveries_time": 2
		},
		{
			"name": "Бугульма",
			"deliveries_time": 4
		},
		{
			"name": "Бугуруслан",
			"deliveries_time": 5
		},
		{
			"name": "Буденновск",
			"deliveries_time": 6
		},
		{
			"name": "Буденоветц",
			"deliveries_time": 4
		},
		{
			"name": "Бужаниново",
			"deliveries_time": 4
		},
		{
			"name": "Бужарово",
			"deliveries_time": 4
		},
		{
			"name": "Бузулук",
			"deliveries_time": 4
		},
		{
			"name": "Буинск",
			"deliveries_time": 5
		},
		{
			"name": "Буйнакск",
			"deliveries_time": 5
		},
		{
			"name": "Булаково",
			"deliveries_time": 4
		},
		{
			"name": "Булычево",
			"deliveries_time": 4
		},
		{
			"name": "Буньково",
			"deliveries_time": 4
		},
		{
			"name": "Бунятино",
			"deliveries_time": 2
		},
		{
			"name": "Бурцево",
			"deliveries_time": 4
		},
		{
			"name": "Бутурлиновка, Бутурлиновс-кий р-н, Воронежская обл.",
			"deliveries_time": 5
		},
		{
			"name": "Быково",
			"deliveries_time": 4
		},
		{
			"name": "Бяудэ",
			"deliveries_time": 4
		},
		{
			"name": "Валдай",
			"deliveries_time": 4
		},
		{
			"name": "Валуево",
			"deliveries_time": 2
		},
		{
			"name": "Валуйки",
			"deliveries_time": 3
		},
		{
			"name": "Валуйки, Валуйский р-н",
			"deliveries_time": 5
		},
		{
			"name": "Ванино",
			"deliveries_time": 5
		},
		{
			"name": "Ванюки",
			"deliveries_time": 2
		},
		{
			"name": "Васильевское",
			"deliveries_time": 4
		},
		{
			"name": "Васькино",
			"deliveries_time": 4
		},
		{
			"name": "Ватутенки",
			"deliveries_time": 2
		},
		{
			"name": "Введенское",
			"deliveries_time": 4
		},
		{
			"name": "Великие Луки",
			"deliveries_time": 4
		},
		{
			"name": "Великий Двор",
			"deliveries_time": 4
		},
		{
			"name": "Великий Новгород",
			"deliveries_time": 4
		},
		{
			"name": "Великий Устюг",
			"deliveries_time": 5
		},
		{
			"name": "Вельск",
			"deliveries_time": 4
		},
		{
			"name": "Вельяминово",
			"deliveries_time": 4
		},
		{
			"name": "Венев",
			"deliveries_time": 3
		},
		{
			"name": "Вербилки",
			"deliveries_time": 4
		},
		{
			"name": "Верейка",
			"deliveries_time": 4
		},
		{
			"name": "Верещагино",
			"deliveries_time": 5
		},
		{
			"name": "Верея",
			"deliveries_time": 4
		},
		{
			"name": "Верхнебаканский",
			"deliveries_time": 4
		},
		{
			"name": "Верхнее Калино",
			"deliveries_time": 2
		},
		{
			"name": "Верхнемячково",
			"deliveries_time": 2
		},
		{
			"name": "Верхний Тагил",
			"deliveries_time": 6
		},
		{
			"name": "Верхняя Пышма",
			"deliveries_time": 5
		},
		{
			"name": "Верхняя Салда",
			"deliveries_time": 6
		},
		{
			"name": "Верховажье",
			"deliveries_time": 5
		},
		{
			"name": "Веселево",
			"deliveries_time": 4
		},
		{
			"name": "Весна",
			"deliveries_time": 8
		},
		{
			"name": "Вешенская",
			"deliveries_time": 6
		},
		{
			"name": "Видное",
			"deliveries_time": 3
		},
		{
			"name": "Винзили",
			"deliveries_time": 3
		},
		{
			"name": "Виноградово",
			"deliveries_time": 4
		},
		{
			"name": "Витязево",
			"deliveries_time": 3
		},
		{
			"name": "Вичуга",
			"deliveries_time": 5
		},
		{
			"name": "Вишняковские Дачи",
			"deliveries_time": 3
		},
		{
			"name": "Владивосток",
			"deliveries_time": 7
		},
		{
			"name": "Владикавказ",
			"deliveries_time": 5
		},
		{
			"name": "Владимир",
			"deliveries_time": 4
		},
		{
			"name": "Власово",
			"deliveries_time": 4
		},
		{
			"name": "Внуково",
			"deliveries_time": 2
		},
		{
			"name": "Воздвиженское",
			"deliveries_time": 4
		},
		{
			"name": "Вознесенское",
			"deliveries_time": 6
		},
		{
			"name": "Волгоград",
			"deliveries_time": 4
		},
		{
			"name": "Волгодонск",
			"deliveries_time": 5
		},
		{
			"name": "Волгореченск, Костромская обл.",
			"deliveries_time": 4
		},
		{
			"name": "Волжск",
			"deliveries_time": 3
		},
		{
			"name": "Волжск, Волжский р-н",
			"deliveries_time": 5
		},
		{
			"name": "Волжский",
			"deliveries_time": 4
		},
		{
			"name": "Волково",
			"deliveries_time": 4
		},
		{
			"name": "Вологда",
			"deliveries_time": 3
		},
		{
			"name": "Володарск",
			"deliveries_time": 4
		},
		{
			"name": "Волоколамск",
			"deliveries_time": 3
		},
		{
			"name": "Волосово",
			"deliveries_time": 4
		},
		{
			"name": "Волхов",
			"deliveries_time": 5
		},
		{
			"name": "Волченки",
			"deliveries_time": 4
		},
		{
			"name": "Вольно-Надеждинское",
			"deliveries_time": 9
		},
		{
			"name": "Вольск",
			"deliveries_time": 6
		},
		{
			"name": "Воробьево",
			"deliveries_time": 2
		},
		{
			"name": "Воронеж",
			"deliveries_time": 3
		},
		{
			"name": "Вороново",
			"deliveries_time": 4
		},
		{
			"name": "Воротынск",
			"deliveries_time": 3
		},
		{
			"name": "Ворсино",
			"deliveries_time": 3
		},
		{
			"name": "Ворсма",
			"deliveries_time": 5
		},
		{
			"name": "Воскресенск",
			"deliveries_time": 3
		},
		{
			"name": "Воскресенское",
			"deliveries_time": 2
		},
		{
			"name": "Воскресенское поселение",
			"deliveries_time": 3
		},
		{
			"name": "Восход",
			"deliveries_time": 3
		},
		{
			"name": "Воткинск",
			"deliveries_time": 4
		},
		{
			"name": "Врангель",
			"deliveries_time": 5
		},
		{
			"name": "Всеволожск",
			"deliveries_time": 3
		},
		{
			"name": "Выборг",
			"deliveries_time": 5
		},
		{
			"name": "Выкопанка",
			"deliveries_time": 4
		},
		{
			"name": "Выкса",
			"deliveries_time": 4
		},
		{
			"name": "Выселки",
			"deliveries_time": 5
		},
		{
			"name": "Высокая Гора",
			"deliveries_time": 3
		},
		{
			"name": "Высоковск",
			"deliveries_time": 4
		},
		{
			"name": "Высоцк",
			"deliveries_time": 3
		},
		{
			"name": "Вышегород",
			"deliveries_time": 4
		},
		{
			"name": "Вышний Волочёк, гор.окр. Вышний Волочёк",
			"deliveries_time": 4
		},
		{
			"name": "Вязники",
			"deliveries_time": 4
		},
		{
			"name": "Вятские Поляны",
			"deliveries_time": 5
		},
		{
			"name": "Гаврилов-Ям",
			"deliveries_time": 3
		},
		{
			"name": "Гагарин",
			"deliveries_time": 4
		},
		{
			"name": "Гай",
			"deliveries_time": 5
		},
		{
			"name": "Галич",
			"deliveries_time": 4
		},
		{
			"name": "Гамово",
			"deliveries_time": 4
		},
		{
			"name": "Ганусово",
			"deliveries_time": 2
		},
		{
			"name": "Гарь-Покровское",
			"deliveries_time": 4
		},
		{
			"name": "Гатка",
			"deliveries_time": 5
		},
		{
			"name": "Гатчина",
			"deliveries_time": 4
		},
		{
			"name": "Гдов",
			"deliveries_time": 5
		},
		{
			"name": "Геленджик",
			"deliveries_time": 5
		},
		{
			"name": "Георгиевск",
			"deliveries_time": 5
		},
		{
			"name": "Герцена им.санаторий",
			"deliveries_time": 2
		},
		{
			"name": "Гжель",
			"deliveries_time": 2
		},
		{
			"name": "Гиагинская",
			"deliveries_time": 5
		},
		{
			"name": "Гидроузла Поселок",
			"deliveries_time": 4
		},
		{
			"name": "Гизедьдере",
			"deliveries_time": 4
		},
		{
			"name": "Глазов",
			"deliveries_time": 5
		},
		{
			"name": "Глубокое",
			"deliveries_time": 4
		},
		{
			"name": "Гойтх",
			"deliveries_time": 4
		},
		{
			"name": "Голицыно",
			"deliveries_time": 3
		},
		{
			"name": "Головинка",
			"deliveries_time": 4
		},
		{
			"name": "Головково",
			"deliveries_time": 4
		},
		{
			"name": "Голышманово",
			"deliveries_time": 6
		},
		{
			"name": "Горбово Фабрика",
			"deliveries_time": 4
		},
		{
			"name": "Горелово",
			"deliveries_time": 3
		},
		{
			"name": "Горетово",
			"deliveries_time": 4
		},
		{
			"name": "Горки",
			"deliveries_time": 4
		},
		{
			"name": "Горки 10",
			"deliveries_time": 2
		},
		{
			"name": "Горки 2",
			"deliveries_time": 2
		},
		{
			"name": "Горки-10, Одинцовский р-н",
			"deliveries_time": 3
		},
		{
			"name": "Горки-коломенские",
			"deliveries_time": 4
		},
		{
			"name": "Горловка",
			"deliveries_time": 2
		},
		{
			"name": "Горно-Алтайск",
			"deliveries_time": 4
		},
		{
			"name": "Горнозаводск, Пермский край",
			"deliveries_time": 6
		},
		{
			"name": "Горный",
			"deliveries_time": 8
		},
		{
			"name": "Горный Щит, Свердловская обл.",
			"deliveries_time": 6
		},
		{
			"name": "Горняк",
			"deliveries_time": 6
		},
		{
			"name": "Городец",
			"deliveries_time": 4
		},
		{
			"name": "Городище",
			"deliveries_time": 4
		},
		{
			"name": "Гороховец",
			"deliveries_time": 2
		},
		{
			"name": "Горшково",
			"deliveries_time": 4
		},
		{
			"name": "Горы",
			"deliveries_time": 4
		},
		{
			"name": "Горячеводский",
			"deliveries_time": 3
		},
		{
			"name": "Горячий Ключ",
			"deliveries_time": 5
		},
		{
			"name": "Грабово",
			"deliveries_time": 3
		},
		{
			"name": "Григорьевское",
			"deliveries_time": 4
		},
		{
			"name": "Гришино",
			"deliveries_time": 4
		},
		{
			"name": "Грозный",
			"deliveries_time": 4
		},
		{
			"name": "Грязи",
			"deliveries_time": 4
		},
		{
			"name": "Губаха",
			"deliveries_time": 6
		},
		{
			"name": "Губино",
			"deliveries_time": 4
		},
		{
			"name": "Губкин",
			"deliveries_time": 4
		},
		{
			"name": "Губкинский",
			"deliveries_time": 6
		},
		{
			"name": "Гудермес",
			"deliveries_time": 4
		},
		{
			"name": "Гуково",
			"deliveries_time": 5
		},
		{
			"name": "Гулькевичи",
			"deliveries_time": 5
		},
		{
			"name": "Гусь-Хрустальный",
			"deliveries_time": 5
		},
		{
			"name": "Давыдково",
			"deliveries_time": 4
		},
		{
			"name": "Давыдово",
			"deliveries_time": 4
		},
		{
			"name": "Далматово",
			"deliveries_time": 6
		},
		{
			"name": "Дальнегорск",
			"deliveries_time": 10
		},
		{
			"name": "Дарищи",
			"deliveries_time": 4
		},
		{
			"name": "Датта",
			"deliveries_time": 5
		},
		{
			"name": "Дашковка",
			"deliveries_time": 4
		},
		{
			"name": "Дворики",
			"deliveries_time": 4
		},
		{
			"name": "Девица",
			"deliveries_time": 2
		},
		{
			"name": "Дегтярск, Свердловская обл.",
			"deliveries_time": 6
		},
		{
			"name": "Деденево",
			"deliveries_time": 4
		},
		{
			"name": "Дединово",
			"deliveries_time": 4
		},
		{
			"name": "Дедовск",
			"deliveries_time": 4
		},
		{
			"name": "Демидов",
			"deliveries_time": 3
		},
		{
			"name": "Демихово",
			"deliveries_time": 4
		},
		{
			"name": "Денежниково",
			"deliveries_time": 2
		},
		{
			"name": "Деньково",
			"deliveries_time": 4
		},
		{
			"name": "Дербент",
			"deliveries_time": 5
		},
		{
			"name": "Десногорск",
			"deliveries_time": 5
		},
		{
			"name": "Джалиль",
			"deliveries_time": 3
		},
		{
			"name": "Джанкой",
			"deliveries_time": 4
		},
		{
			"name": "Джанхот",
			"deliveries_time": 3
		},
		{
			"name": "Джубга",
			"deliveries_time": 4
		},
		{
			"name": "Дзержинск",
			"deliveries_time": 3
		},
		{
			"name": "Дзержинский",
			"deliveries_time": 3
		},
		{
			"name": "Дивноморское",
			"deliveries_time": 4
		},
		{
			"name": "Димитровград",
			"deliveries_time": 3
		},
		{
			"name": "Динская",
			"deliveries_time": 5
		},
		{
			"name": "Дмитриевка",
			"deliveries_time": 4
		},
		{
			"name": "Дмитров",
			"deliveries_time": 3
		},
		{
			"name": "Дмитрово",
			"deliveries_time": 2
		},
		{
			"name": "Дмитровский Погост",
			"deliveries_time": 4
		},
		{
			"name": "Добрыниха",
			"deliveries_time": 4
		},
		{
			"name": "Добрянка",
			"deliveries_time": 5
		},
		{
			"name": "Долгодеревенское",
			"deliveries_time": 5
		},
		{
			"name": "Долгопрудный",
			"deliveries_time": 3
		},
		{
			"name": "Долинск",
			"deliveries_time": 8
		},
		{
			"name": "Домодедово",
			"deliveries_time": 3
		},
		{
			"name": "Домодедово Аэропорт",
			"deliveries_time": 2
		},
		{
			"name": "Донецк",
			"deliveries_time": 5
		},
		{
			"name": "Донино",
			"deliveries_time": 2
		},
		{
			"name": "Донской",
			"deliveries_time": 4
		},
		{
			"name": "Дор",
			"deliveries_time": 4
		},
		{
			"name": "Дорохово",
			"deliveries_time": 4
		},
		{
			"name": "Дрезна",
			"deliveries_time": 4
		},
		{
			"name": "Дубки",
			"deliveries_time": 2
		},
		{
			"name": "Дубна",
			"deliveries_time": 3
		},
		{
			"name": "Дубна ГУПС",
			"deliveries_time": 4
		},
		{
			"name": "Дубнево",
			"deliveries_time": 4
		},
		{
			"name": "Дубровицы",
			"deliveries_time": 2
		},
		{
			"name": "Дубронивка",
			"deliveries_time": 4
		},
		{
			"name": "Дурыкино",
			"deliveries_time": 4
		},
		{
			"name": "Духанино",
			"deliveries_time": 2
		},
		{
			"name": "Духовщина",
			"deliveries_time": 2
		},
		{
			"name": "Дюртюли",
			"deliveries_time": 5
		},
		{
			"name": "Дютьково",
			"deliveries_time": 4
		},
		{
			"name": "Дятьково",
			"deliveries_time": 4
		},
		{
			"name": "Евпатория",
			"deliveries_time": 4
		},
		{
			"name": "Евсеево",
			"deliveries_time": 4
		},
		{
			"name": "Егорьевск",
			"deliveries_time": 4
		},
		{
			"name": "Ейск",
			"deliveries_time": 5
		},
		{
			"name": "Екатеринбург",
			"deliveries_time": 5
		},
		{
			"name": "Елабуга",
			"deliveries_time": 4
		},
		{
			"name": "Елгозино",
			"deliveries_time": 4
		},
		{
			"name": "Елец",
			"deliveries_time": 3
		},
		{
			"name": "Елизарово",
			"deliveries_time": 4
		},
		{
			"name": "Елизово",
			"deliveries_time": 5
		},
		{
			"name": "Елочка Дом отдыха",
			"deliveries_time": 4
		},
		{
			"name": "Ельдигино",
			"deliveries_time": 2
		},
		{
			"name": "Ельня",
			"deliveries_time": 3
		},
		{
			"name": "Еманжелинск",
			"deliveries_time": 5
		},
		{
			"name": "Емельяново",
			"deliveries_time": 5
		},
		{
			"name": "Енисейск",
			"deliveries_time": 6
		},
		{
			"name": "Ермолино",
			"deliveries_time": 4
		},
		{
			"name": "Ерново",
			"deliveries_time": 4
		},
		{
			"name": "Ершово",
			"deliveries_time": 2
		},
		{
			"name": "Ессентуки",
			"deliveries_time": 6
		},
		{
			"name": "Ефремов",
			"deliveries_time": 3
		},
		{
			"name": "Ефремовская",
			"deliveries_time": 4
		},
		{
			"name": "Жаворонки",
			"deliveries_time": 2
		},
		{
			"name": "Железноводск",
			"deliveries_time": 5
		},
		{
			"name": "Железногорск",
			"deliveries_time": 5
		},
		{
			"name": "Железногорск-Илимский",
			"deliveries_time": 6
		},
		{
			"name": "Железногорск, Красноярский край",
			"deliveries_time": 5
		},
		{
			"name": "Железногорск, Курская обл.",
			"deliveries_time": 4
		},
		{
			"name": "Железнодорожный",
			"deliveries_time": 2
		},
		{
			"name": "Железнодорожный, Балаши- ха",
			"deliveries_time": 4
		},
		{
			"name": "Жигулевск",
			"deliveries_time": 8
		},
		{
			"name": "Жигулёвск",
			"deliveries_time": 4
		},
		{
			"name": "Жилево",
			"deliveries_time": 4
		},
		{
			"name": "Жирновск",
			"deliveries_time": 6
		},
		{
			"name": "Житнево",
			"deliveries_time": 2
		},
		{
			"name": "Жостово",
			"deliveries_time": 2
		},
		{
			"name": "Жуков",
			"deliveries_time": 3
		},
		{
			"name": "Жуковка",
			"deliveries_time": 2
		},
		{
			"name": "Жуково",
			"deliveries_time": 2
		},
		{
			"name": "Жуковский",
			"deliveries_time": 4
		},
		{
			"name": "Журавна",
			"deliveries_time": 4
		},
		{
			"name": "Жучки",
			"deliveries_time": 4
		},
		{
			"name": "Забайкальск",
			"deliveries_time": 7
		},
		{
			"name": "Заветы Ильича",
			"deliveries_time": 2
		},
		{
			"name": "Заводоуковск",
			"deliveries_time": 6
		},
		{
			"name": "Заводской",
			"deliveries_time": 3
		},
		{
			"name": "Заволжье",
			"deliveries_time": 4
		},
		{
			"name": "Заворово",
			"deliveries_time": 4
		},
		{
			"name": "Завьялово",
			"deliveries_time": 4
		},
		{
			"name": "Загорские Дали",
			"deliveries_time": 4
		},
		{
			"name": "Загорянский",
			"deliveries_time": 2
		},
		{
			"name": "Заинск",
			"deliveries_time": 5
		},
		{
			"name": "Зайцево",
			"deliveries_time": 3
		},
		{
			"name": "Закубежье",
			"deliveries_time": 4
		},
		{
			"name": "Заовражье",
			"deliveries_time": 4
		},
		{
			"name": "Заозерный",
			"deliveries_time": 5
		},
		{
			"name": "Заокский",
			"deliveries_time": 4
		},
		{
			"name": "Западный",
			"deliveries_time": 5
		},
		{
			"name": "Заполярный",
			"deliveries_time": 6
		},
		{
			"name": "Запрудня",
			"deliveries_time": 4
		},
		{
			"name": "Запутное",
			"deliveries_time": 4
		},
		{
			"name": "Зарайск",
			"deliveries_time": 3
		},
		{
			"name": "Зарайский совхоз",
			"deliveries_time": 4
		},
		{
			"name": "Заречный",
			"deliveries_time": 4
		},
		{
			"name": "Заречный, Свердловская обл.",
			"deliveries_time": 6
		},
		{
			"name": "Заречье",
			"deliveries_time": 2
		},
		{
			"name": "Заринск",
			"deliveries_time": 5
		},
		{
			"name": "Заря",
			"deliveries_time": 2
		},
		{
			"name": "Заря Коммунизма",
			"deliveries_time": 4
		},
		{
			"name": "Захарово",
			"deliveries_time": 4
		},
		{
			"name": "Звездный городок",
			"deliveries_time": 2
		},
		{
			"name": "Звенигород",
			"deliveries_time": 3
		},
		{
			"name": "Зверево",
			"deliveries_time": 6
		},
		{
			"name": "Зверосовхоз",
			"deliveries_time": 2
		},
		{
			"name": "Здравница",
			"deliveries_time": 2
		},
		{
			"name": "Зеленая Роща",
			"deliveries_time": 4
		},
		{
			"name": "Зеленогорск, Красноярский край",
			"deliveries_time": 5
		},
		{
			"name": "Зеленоград",
			"deliveries_time": 3
		},
		{
			"name": "Зеленоградский",
			"deliveries_time": 4
		},
		{
			"name": "Зеленодольск",
			"deliveries_time": 4
		},
		{
			"name": "Зеленокумск",
			"deliveries_time": 5
		},
		{
			"name": "Зеленчукская",
			"deliveries_time": 6
		},
		{
			"name": "Зеленый",
			"deliveries_time": 3
		},
		{
			"name": "Зендиково",
			"deliveries_time": 4
		},
		{
			"name": "Зерноград",
			"deliveries_time": 5
		},
		{
			"name": "Златоуст",
			"deliveries_time": 5
		},
		{
			"name": "Знамя Октября",
			"deliveries_time": 2
		},
		{
			"name": "Зональная Станция",
			"deliveries_time": 4
		},
		{
			"name": "Зубово",
			"deliveries_time": 4
		},
		{
			"name": "Зыково",
			"deliveries_time": 4
		},
		{
			"name": "Зюзино",
			"deliveries_time": 2
		},
		{
			"name": "Ивакино",
			"deliveries_time": 4
		},
		{
			"name": "Ивановка",
			"deliveries_time": 2
		},
		{
			"name": "Иваново",
			"deliveries_time": 3
		},
		{
			"name": "Ивановское",
			"deliveries_time": 4
		},
		{
			"name": "Ивантеевка",
			"deliveries_time": 4
		},
		{
			"name": "Ивантеевка, Московская обл.",
			"deliveries_time": 4
		},
		{
			"name": "Ивашково",
			"deliveries_time": 4
		},
		{
			"name": "Ивдель",
			"deliveries_time": 6
		},
		{
			"name": "Иглино",
			"deliveries_time": 5
		},
		{
			"name": "Игра",
			"deliveries_time": 5
		},
		{
			"name": "Ижевск",
			"deliveries_time": 4
		},
		{
			"name": "Избербаш",
			"deliveries_time": 5
		},
		{
			"name": "Излучинск",
			"deliveries_time": 4
		},
		{
			"name": "Измайлово",
			"deliveries_time": 2
		},
		{
			"name": "Изобильный",
			"deliveries_time": 5
		},
		{
			"name": "Икша",
			"deliveries_time": 4
		},
		{
			"name": "Ильинка",
			"deliveries_time": 3
		},
		{
			"name": "Ильинский",
			"deliveries_time": 2
		},
		{
			"name": "Ильинский Погост",
			"deliveries_time": 4
		},
		{
			"name": "Ильинское",
			"deliveries_time": 4
		},
		{
			"name": "Ильинское-Усово",
			"deliveries_time": 2
		},
		{
			"name": "Ильинское-Ярополецкое",
			"deliveries_time": 4
		},
		{
			"name": "Им Воровского",
			"deliveries_time": 3
		},
		{
			"name": "им Чайковского",
			"deliveries_time": 4
		},
		{
			"name": "Индустрия",
			"deliveries_time": 4
		},
		{
			"name": "Институт Полиомелита",
			"deliveries_time": 2
		},
		{
			"name": "Иншино",
			"deliveries_time": 4
		},
		{
			"name": "Иншинский",
			"deliveries_time": 4
		},
		{
			"name": "Ипатово",
			"deliveries_time": 6
		},
		{
			"name": "Ирбит",
			"deliveries_time": 5
		},
		{
			"name": "Иркутск",
			"deliveries_time": 5
		},
		{
			"name": "Иртышский",
			"deliveries_time": 5
		},
		{
			"name": "Искитим",
			"deliveries_time": 5
		},
		{
			"name": "Истра",
			"deliveries_time": 3
		},
		{
			"name": "Истра Санаторий",
			"deliveries_time": 4
		},
		{
			"name": "Ишим",
			"deliveries_time": 6
		},
		{
			"name": "Ишимбай",
			"deliveries_time": 5
		},
		{
			"name": "Йошкар-Ола",
			"deliveries_time": 4
		},
		{
			"name": "Кабаново",
			"deliveries_time": 4
		},
		{
			"name": "Кабардинка",
			"deliveries_time": 3
		},
		{
			"name": "Каблуково",
			"deliveries_time": 2
		},
		{
			"name": "Казань",
			"deliveries_time": 4
		},
		{
			"name": "Калач-на-Дону",
			"deliveries_time": 6
		},
		{
			"name": "Калачинск",
			"deliveries_time": 5
		},
		{
			"name": "Калининград",
			"deliveries_time": 4
		},
		{
			"name": "Калининец",
			"deliveries_time": 3
		},
		{
			"name": "Калинино",
			"deliveries_time": 6
		},
		{
			"name": "Калино",
			"deliveries_time": 3
		},
		{
			"name": "Калистово",
			"deliveries_time": 4
		},
		{
			"name": "Калицыно",
			"deliveries_time": 4
		},
		{
			"name": "Калуга",
			"deliveries_time": 3
		},
		{
			"name": "Каменка",
			"deliveries_time": 4
		},
		{
			"name": "Каменка, Каменский район",
			"deliveries_time": 5
		},
		{
			"name": "Каменск-Уральский",
			"deliveries_time": 6
		},
		{
			"name": "Каменск-Шахтинский",
			"deliveries_time": 5
		},
		{
			"name": "Каменское",
			"deliveries_time": 3
		},
		{
			"name": "Камышин",
			"deliveries_time": 6
		},
		{
			"name": "Камышлов",
			"deliveries_time": 6
		},
		{
			"name": "Канаш",
			"deliveries_time": 5
		},
		{
			"name": "Кандалакша",
			"deliveries_time": 6
		},
		{
			"name": "Каневская",
			"deliveries_time": 5
		},
		{
			"name": "Канск",
			"deliveries_time": 5
		},
		{
			"name": "Кантемировка",
			"deliveries_time": 4
		},
		{
			"name": "Карачаевск",
			"deliveries_time": 6
		},
		{
			"name": "Карачев",
			"deliveries_time": 4
		},
		{
			"name": "Кардымово",
			"deliveries_time": 3
		},
		{
			"name": "Карино",
			"deliveries_time": 4
		},
		{
			"name": "Каринское",
			"deliveries_time": 4
		},
		{
			"name": "Карталы",
			"deliveries_time": 7
		},
		{
			"name": "Касимов",
			"deliveries_time": 4
		},
		{
			"name": "Каспийск",
			"deliveries_time": 5
		},
		{
			"name": "Качканар",
			"deliveries_time": 5
		},
		{
			"name": "Кашино",
			"deliveries_time": 4
		},
		{
			"name": "Кашинцево",
			"deliveries_time": 2
		},
		{
			"name": "Кашира",
			"deliveries_time": 3
		},
		{
			"name": "Квашенки",
			"deliveries_time": 4
		},
		{
			"name": "Кез",
			"deliveries_time": 5
		},
		{
			"name": "Кемерово",
			"deliveries_time": 4
		},
		{
			"name": "Кемь",
			"deliveries_time": 6
		},
		{
			"name": "Керва",
			"deliveries_time": 4
		},
		{
			"name": "Керчь",
			"deliveries_time": 5
		},
		{
			"name": "Киевский",
			"deliveries_time": 4
		},
		{
			"name": "Кизилюрт",
			"deliveries_time": 6
		},
		{
			"name": "Кимры",
			"deliveries_time": 3
		},
		{
			"name": "Кингисепп",
			"deliveries_time": 4
		},
		{
			"name": "Кинель",
			"deliveries_time": 4
		},
		{
			"name": "Кинешма",
			"deliveries_time": 4
		},
		{
			"name": "Киреевск",
			"deliveries_time": 4
		},
		{
			"name": "Кирилловка",
			"deliveries_time": 2
		},
		{
			"name": "Кириши",
			"deliveries_time": 5
		},
		{
			"name": "Киров",
			"deliveries_time": 4
		},
		{
			"name": "Киров, Кировский р-н",
			"deliveries_time": 4
		},
		{
			"name": "Кировград",
			"deliveries_time": 6
		},
		{
			"name": "Кирово-Чепецк",
			"deliveries_time": 5
		},
		{
			"name": "Кировск,  Лен.обл",
			"deliveries_time": 5
		},
		{
			"name": "Киселёвск",
			"deliveries_time": 5
		},
		{
			"name": "Кисловодск",
			"deliveries_time": 5
		},
		{
			"name": "Клеменово",
			"deliveries_time": 4
		},
		{
			"name": "Клементьево",
			"deliveries_time": 4
		},
		{
			"name": "Кленово",
			"deliveries_time": 2
		},
		{
			"name": "Климовск",
			"deliveries_time": 2
		},
		{
			"name": "Климовск мкр, Подольск",
			"deliveries_time": 3
		},
		{
			"name": "Климовское",
			"deliveries_time": 3
		},
		{
			"name": "Клин",
			"deliveries_time": 3
		},
		{
			"name": "Клинцы",
			"deliveries_time": 4
		},
		{
			"name": "Клишино",
			"deliveries_time": 4
		},
		{
			"name": "Клязьма",
			"deliveries_time": 2
		},
		{
			"name": "Кневичи",
			"deliveries_time": 3
		},
		{
			"name": "Ковдор",
			"deliveries_time": 6
		},
		{
			"name": "Ковров",
			"deliveries_time": 3
		},
		{
			"name": "Когалым",
			"deliveries_time": 5
		},
		{
			"name": "Кожино",
			"deliveries_time": 4
		},
		{
			"name": "Козельск",
			"deliveries_time": 5
		},
		{
			"name": "Кокино",
			"deliveries_time": 4
		},
		{
			"name": "Кокошкино",
			"deliveries_time": 4
		},
		{
			"name": "Кола",
			"deliveries_time": 2
		},
		{
			"name": "Коломна",
			"deliveries_time": 3
		},
		{
			"name": "Колпашево",
			"deliveries_time": 6
		},
		{
			"name": "Колпино",
			"deliveries_time": 4
		},
		{
			"name": "Колычево",
			"deliveries_time": 4
		},
		{
			"name": "Кольцово",
			"deliveries_time": 2
		},
		{
			"name": "Кольчугино",
			"deliveries_time": 4
		},
		{
			"name": "Колюбакино",
			"deliveries_time": 4
		},
		{
			"name": "Коммунар",
			"deliveries_time": 2
		},
		{
			"name": "Коммунарка",
			"deliveries_time": 3
		},
		{
			"name": "Комсомольск-на-Амуре",
			"deliveries_time": 7
		},
		{
			"name": "Конаково",
			"deliveries_time": 3
		},
		{
			"name": "Кондопога",
			"deliveries_time": 5
		},
		{
			"name": "Кондратово",
			"deliveries_time": 4
		},
		{
			"name": "Кондрово",
			"deliveries_time": 5
		},
		{
			"name": "Конобеево",
			"deliveries_time": 4
		},
		{
			"name": "Коноплево",
			"deliveries_time": 4
		},
		{
			"name": "Константиново",
			"deliveries_time": 4
		},
		{
			"name": "Константиновск",
			"deliveries_time": 5
		},
		{
			"name": "Копалино",
			"deliveries_time": 3
		},
		{
			"name": "Копейск",
			"deliveries_time": 5
		},
		{
			"name": "Кореновск",
			"deliveries_time": 5
		},
		{
			"name": "Коркино",
			"deliveries_time": 5
		},
		{
			"name": "Коробчеево",
			"deliveries_time": 4
		},
		{
			"name": "Коровино",
			"deliveries_time": 4
		},
		{
			"name": "Королев",
			"deliveries_time": 3
		},
		{
			"name": "Корсаков",
			"deliveries_time": 9
		},
		{
			"name": "Корыстово",
			"deliveries_time": 4
		},
		{
			"name": "Коряжма",
			"deliveries_time": 3
		},
		{
			"name": "Костино",
			"deliveries_time": 4
		},
		{
			"name": "Костомарово",
			"deliveries_time": 4
		},
		{
			"name": "Костомукша",
			"deliveries_time": 6
		},
		{
			"name": "Кострово",
			"deliveries_time": 4
		},
		{
			"name": "Кострома",
			"deliveries_time": 3
		},
		{
			"name": "Косяево",
			"deliveries_time": 4
		},
		{
			"name": "Котельники",
			"deliveries_time": 2
		},
		{
			"name": "Котельниково",
			"deliveries_time": 5
		},
		{
			"name": "Котельнич",
			"deliveries_time": 5
		},
		{
			"name": "Котлас",
			"deliveries_time": 5
		},
		{
			"name": "Котово",
			"deliveries_time": 6
		},
		{
			"name": "Котовск, Тамбовская обл.",
			"deliveries_time": 8
		},
		{
			"name": "Кочубеевское",
			"deliveries_time": 5
		},
		{
			"name": "Кошелево",
			"deliveries_time": 4
		},
		{
			"name": "Кощаково",
			"deliveries_time": 2
		},
		{
			"name": "Красково",
			"deliveries_time": 2
		},
		{
			"name": "Красная Гора",
			"deliveries_time": 4
		},
		{
			"name": "Красная Горка",
			"deliveries_time": 2
		},
		{
			"name": "Красная пахра",
			"deliveries_time": 2
		},
		{
			"name": "Красная Пойма",
			"deliveries_time": 4
		},
		{
			"name": "Красная Поляна, Сочи гор.о- круг",
			"deliveries_time": 5
		},
		{
			"name": "Красноармейск",
			"deliveries_time": 4
		},
		{
			"name": "Красновидово",
			"deliveries_time": 4
		},
		{
			"name": "Красногвардейское",
			"deliveries_time": 5
		},
		{
			"name": "Красногвардейское, Красногвардейский р-н",
			"deliveries_time": 5
		},
		{
			"name": "Красногорск",
			"deliveries_time": 3
		},
		{
			"name": "Краснодар",
			"deliveries_time": 4
		},
		{
			"name": "Красное",
			"deliveries_time": 4
		},
		{
			"name": "Красное Село",
			"deliveries_time": 3
		},
		{
			"name": "Красное-на-Волге",
			"deliveries_time": 4
		},
		{
			"name": "Краснозаводск",
			"deliveries_time": 4
		},
		{
			"name": "Краснознаменск",
			"deliveries_time": 3
		},
		{
			"name": "Краснокаменск, Забайкальс-кий край",
			"deliveries_time": 7
		},
		{
			"name": "Краснокамск",
			"deliveries_time": 4
		},
		{
			"name": "Краснообск",
			"deliveries_time": 2
		},
		{
			"name": "Красноперекопск",
			"deliveries_time": 4
		},
		{
			"name": "Краснотурьинск",
			"deliveries_time": 6
		},
		{
			"name": "Красноуральск",
			"deliveries_time": 5
		},
		{
			"name": "Красноуфимск",
			"deliveries_time": 5
		},
		{
			"name": "Красноярск",
			"deliveries_time": 4
		},
		{
			"name": "Красные Ткачи",
			"deliveries_time": 4
		},
		{
			"name": "Красный",
			"deliveries_time": 3
		},
		{
			"name": "Красный Сулин",
			"deliveries_time": 6
		},
		{
			"name": "Красный Яр",
			"deliveries_time": 5
		},
		{
			"name": "Кратово",
			"deliveries_time": 2
		},
		{
			"name": "Крекшино",
			"deliveries_time": 3
		},
		{
			"name": "Кривандино",
			"deliveries_time": 4
		},
		{
			"name": "Кривенковское",
			"deliveries_time": 8
		},
		{
			"name": "Кронштадт",
			"deliveries_time": 4
		},
		{
			"name": "Кропоткин",
			"deliveries_time": 5
		},
		{
			"name": "Крутое",
			"deliveries_time": 4
		},
		{
			"name": "Крыловская",
			"deliveries_time": 5
		},
		{
			"name": "Крымск",
			"deliveries_time": 5
		},
		{
			"name": "Крюково",
			"deliveries_time": 4
		},
		{
			"name": "Кстово",
			"deliveries_time": 4
		},
		{
			"name": "Кубинка",
			"deliveries_time": 2
		},
		{
			"name": "Кубинский Городок",
			"deliveries_time": 4
		},
		{
			"name": "Кувандык",
			"deliveries_time": 6
		},
		{
			"name": "Кугеси",
			"deliveries_time": 5
		},
		{
			"name": "Кудрово",
			"deliveries_time": 8
		},
		{
			"name": "Кудымкар",
			"deliveries_time": 6
		},
		{
			"name": "Кузнетцы",
			"deliveries_time": 4
		},
		{
			"name": "Кузнецк",
			"deliveries_time": 4
		},
		{
			"name": "Кузнецово",
			"deliveries_time": 4
		},
		{
			"name": "Кузнечики",
			"deliveries_time": 2
		},
		{
			"name": "Кузьмино",
			"deliveries_time": 4
		},
		{
			"name": "Кузьмоловский",
			"deliveries_time": 2
		},
		{
			"name": "Кузяево",
			"deliveries_time": 4
		},
		{
			"name": "Куйбышев",
			"deliveries_time": 5
		},
		{
			"name": "Кулебаки",
			"deliveries_time": 5
		},
		{
			"name": "Куликово",
			"deliveries_time": 4
		},
		{
			"name": "Култаево, Пермский р-н, Пе-рмский край",
			"deliveries_time": 5
		},
		{
			"name": "Кульпино",
			"deliveries_time": 4
		},
		{
			"name": "Кумертау",
			"deliveries_time": 5
		},
		{
			"name": "Кунгур",
			"deliveries_time": 5
		},
		{
			"name": "Купавна",
			"deliveries_time": 2
		},
		{
			"name": "Кураково",
			"deliveries_time": 3
		},
		{
			"name": "Курган",
			"deliveries_time": 5
		},
		{
			"name": "Курганинск",
			"deliveries_time": 5
		},
		{
			"name": "Курилово",
			"deliveries_time": 4
		},
		{
			"name": "Куровское",
			"deliveries_time": 4
		},
		{
			"name": "Куровское, Орехово-Зуевс-кий гор.округ",
			"deliveries_time": 3
		},
		{
			"name": "Курск",
			"deliveries_time": 3
		},
		{
			"name": "Куртино",
			"deliveries_time": 4
		},
		{
			"name": "Курчатов",
			"deliveries_time": 4
		},
		{
			"name": "Курьяново",
			"deliveries_time": 4
		},
		{
			"name": "Кушва",
			"deliveries_time": 6
		},
		{
			"name": "Кущёвская, Кущёвский р-н",
			"deliveries_time": 5
		},
		{
			"name": "Кызыл",
			"deliveries_time": 7
		},
		{
			"name": "Кыштым",
			"deliveries_time": 5
		},
		{
			"name": "Кяхта",
			"deliveries_time": 6
		},
		{
			"name": "Лабинск",
			"deliveries_time": 5
		},
		{
			"name": "Лабытнанги",
			"deliveries_time": 6
		},
		{
			"name": "Ладыгино",
			"deliveries_time": 4
		},
		{
			"name": "Лазаревское",
			"deliveries_time": 5
		},
		{
			"name": "Лаишево",
			"deliveries_time": 4
		},
		{
			"name": "Лангепас",
			"deliveries_time": 5
		},
		{
			"name": "Ларцевы Поляны",
			"deliveries_time": 4
		},
		{
			"name": "Лебедянь",
			"deliveries_time": 4
		},
		{
			"name": "Левашово",
			"deliveries_time": 8
		},
		{
			"name": "Ледово",
			"deliveries_time": 4
		},
		{
			"name": "Лелечи",
			"deliveries_time": 4
		},
		{
			"name": "Ленинградская",
			"deliveries_time": 5
		},
		{
			"name": "Ленино",
			"deliveries_time": 4
		},
		{
			"name": "Лениногорск",
			"deliveries_time": 5
		},
		{
			"name": "Ленинск-Кузнецкий",
			"deliveries_time": 4
		},
		{
			"name": "Ленинские Горки",
			"deliveries_time": 2
		},
		{
			"name": "Ленинский",
			"deliveries_time": 4
		},
		{
			"name": "Леньково",
			"deliveries_time": 4
		},
		{
			"name": "Леонтьево",
			"deliveries_time": 4
		},
		{
			"name": "Лермонтов",
			"deliveries_time": 6
		},
		{
			"name": "Лермонтово",
			"deliveries_time": 4
		},
		{
			"name": "Лесное Озеро",
			"deliveries_time": 2
		},
		{
			"name": "Лесной",
			"deliveries_time": 5
		},
		{
			"name": "Лесной Городок",
			"deliveries_time": 4
		},
		{
			"name": "Лесные Поляны",
			"deliveries_time": 4
		},
		{
			"name": "Летний Отдых",
			"deliveries_time": 2
		},
		{
			"name": "Летуново",
			"deliveries_time": 4
		},
		{
			"name": "Ливны",
			"deliveries_time": 5
		},
		{
			"name": "Лидино",
			"deliveries_time": 4
		},
		{
			"name": "Ликино-дулево",
			"deliveries_time": 4
		},
		{
			"name": "Липецк",
			"deliveries_time": 3
		},
		{
			"name": "Липино",
			"deliveries_time": 4
		},
		{
			"name": "Липицы",
			"deliveries_time": 4
		},
		{
			"name": "Лиски, Лискинский р-н",
			"deliveries_time": 4
		},
		{
			"name": "Литвиново",
			"deliveries_time": 2
		},
		{
			"name": "Лиховской",
			"deliveries_time": 6
		},
		{
			"name": "Лобня",
			"deliveries_time": 3
		},
		{
			"name": "Ловцы",
			"deliveries_time": 4
		},
		{
			"name": "Логиново",
			"deliveries_time": 4
		},
		{
			"name": "Лодейное Поле",
			"deliveries_time": 4
		},
		{
			"name": "Ложки",
			"deliveries_time": 4
		},
		{
			"name": "Лоза",
			"deliveries_time": 4
		},
		{
			"name": "Ломоносов",
			"deliveries_time": 4
		},
		{
			"name": "Лосино-Петровский",
			"deliveries_time": 4
		},
		{
			"name": "Лососина",
			"deliveries_time": 5
		},
		{
			"name": "Лотошино",
			"deliveries_time": 4
		},
		{
			"name": "Луга",
			"deliveries_time": 5
		},
		{
			"name": "Луговая",
			"deliveries_time": 2
		},
		{
			"name": "Луговой Поселок",
			"deliveries_time": 4
		},
		{
			"name": "Лужники",
			"deliveries_time": 4
		},
		{
			"name": "Лукерино",
			"deliveries_time": 4
		},
		{
			"name": "Лукино",
			"deliveries_time": 2
		},
		{
			"name": "Лукошкино",
			"deliveries_time": 4
		},
		{
			"name": "Лукьяново",
			"deliveries_time": 4
		},
		{
			"name": "Лунево",
			"deliveries_time": 2
		},
		{
			"name": "Луховицы",
			"deliveries_time": 3
		},
		{
			"name": "Лучегорск",
			"deliveries_time": 7
		},
		{
			"name": "Лучинское",
			"deliveries_time": 2
		},
		{
			"name": "Лысково",
			"deliveries_time": 4
		},
		{
			"name": "Лысьва",
			"deliveries_time": 5
		},
		{
			"name": "Лыткарино",
			"deliveries_time": 3
		},
		{
			"name": "Лыткино",
			"deliveries_time": 4
		},
		{
			"name": "Лыщиково",
			"deliveries_time": 4
		},
		{
			"name": "Львовский",
			"deliveries_time": 4
		},
		{
			"name": "Любаново",
			"deliveries_time": 4
		},
		{
			"name": "Люберцы",
			"deliveries_time": 3
		},
		{
			"name": "Любучаны",
			"deliveries_time": 4
		},
		{
			"name": "Людино",
			"deliveries_time": 4
		},
		{
			"name": "Людиново",
			"deliveries_time": 3
		},
		{
			"name": "Лямино",
			"deliveries_time": 3
		},
		{
			"name": "Магадан",
			"deliveries_time": 7
		},
		{
			"name": "Магас, Ингушетия респ.",
			"deliveries_time": 8
		},
		{
			"name": "Магнитогорск",
			"deliveries_time": 5
		},
		{
			"name": "Майкоп",
			"deliveries_time": 4
		},
		{
			"name": "Майский",
			"deliveries_time": 5
		},
		{
			"name": "Макеево",
			"deliveries_time": 4
		},
		{
			"name": "Макшеево",
			"deliveries_time": 4
		},
		{
			"name": "Малаховка",
			"deliveries_time": 2
		},
		{
			"name": "Малая Дубна",
			"deliveries_time": 4
		},
		{
			"name": "Малеевка",
			"deliveries_time": 4
		},
		{
			"name": "Маливо",
			"deliveries_time": 4
		},
		{
			"name": "Малино",
			"deliveries_time": 4
		},
		{
			"name": "Малоярославец",
			"deliveries_time": 3
		},
		{
			"name": "Малышево",
			"deliveries_time": 2
		},
		{
			"name": "Мамадыш",
			"deliveries_time": 4
		},
		{
			"name": "Мамонтовка",
			"deliveries_time": 2
		},
		{
			"name": "Мамонтово",
			"deliveries_time": 4
		},
		{
			"name": "Манихино",
			"deliveries_time": 2
		},
		{
			"name": "Мансурово",
			"deliveries_time": 4
		},
		{
			"name": "Манушкино",
			"deliveries_time": 4
		},
		{
			"name": "Манюхино",
			"deliveries_time": 2
		},
		{
			"name": "Мариинск",
			"deliveries_time": 4
		},
		{
			"name": "Маркс",
			"deliveries_time": 5
		},
		{
			"name": "Марушкино",
			"deliveries_time": 4
		},
		{
			"name": "Марфин Брод",
			"deliveries_time": 4
		},
		{
			"name": "Марфино",
			"deliveries_time": 2
		},
		{
			"name": "Марьино",
			"deliveries_time": 2
		},
		{
			"name": "Маслянино",
			"deliveries_time": 7
		},
		{
			"name": "Матвеев Курган",
			"deliveries_time": 5
		},
		{
			"name": "Матыра",
			"deliveries_time": 4
		},
		{
			"name": "Махачкала",
			"deliveries_time": 4
		},
		{
			"name": "Мегион",
			"deliveries_time": 5
		},
		{
			"name": "Медведево",
			"deliveries_time": 3
		},
		{
			"name": "Медвежьегорск",
			"deliveries_time": 6
		},
		{
			"name": "Медвежьи озера",
			"deliveries_time": 2
		},
		{
			"name": "Междуреченск",
			"deliveries_time": 5
		},
		{
			"name": "Мелеуз",
			"deliveries_time": 5
		},
		{
			"name": "Мельниково",
			"deliveries_time": 6
		},
		{
			"name": "Менделеево",
			"deliveries_time": 6
		},
		{
			"name": "Менделеевск",
			"deliveries_time": 3
		},
		{
			"name": "Менделеевск, Татарстан респ.",
			"deliveries_time": 5
		},
		{
			"name": "Мендюкино",
			"deliveries_time": 4
		},
		{
			"name": "Мензелинск",
			"deliveries_time": 5
		},
		{
			"name": "Мессажай",
			"deliveries_time": 8
		},
		{
			"name": "Металлострой",
			"deliveries_time": 4
		},
		{
			"name": "Мещерино",
			"deliveries_time": 4
		},
		{
			"name": "Мещерское",
			"deliveries_time": 4
		},
		{
			"name": "Миасс",
			"deliveries_time": 5
		},
		{
			"name": "мизиново",
			"deliveries_time": 2
		},
		{
			"name": "Микулино",
			"deliveries_time": 4
		},
		{
			"name": "Микунь",
			"deliveries_time": 6
		},
		{
			"name": "Миллерово, Миллеровский р-н",
			"deliveries_time": 5
		},
		{
			"name": "Миловка",
			"deliveries_time": 3
		},
		{
			"name": "Минеральные Воды",
			"deliveries_time": 5
		},
		{
			"name": "Минеральные воды",
			"deliveries_time": 4
		},
		{
			"name": "Минусинск",
			"deliveries_time": 5
		},
		{
			"name": "Мирный, Саха респ. (Якутия)",
			"deliveries_time": 9
		},
		{
			"name": "Мисцево",
			"deliveries_time": 4
		},
		{
			"name": "Мисцево Куровское",
			"deliveries_time": 4
		},
		{
			"name": "Митино",
			"deliveries_time": 3
		},
		{
			"name": "Михайлов",
			"deliveries_time": 5
		},
		{
			"name": "Михайловка",
			"deliveries_time": 6
		},
		{
			"name": "Михайловск",
			"deliveries_time": 5
		},
		{
			"name": "Михайловск, Свердловская область",
			"deliveries_time": 6
		},
		{
			"name": "Михайловское",
			"deliveries_time": 4
		},
		{
			"name": "Михалево",
			"deliveries_time": 4
		},
		{
			"name": "Михали",
			"deliveries_time": 4
		},
		{
			"name": "Михнево",
			"deliveries_time": 4
		},
		{
			"name": "Михнево, Ступинский р-н",
			"deliveries_time": 4
		},
		{
			"name": "Мичуринец",
			"deliveries_time": 2
		},
		{
			"name": "Мичуринск",
			"deliveries_time": 4
		},
		{
			"name": "Мишеронский",
			"deliveries_time": 4
		},
		{
			"name": "Мишнево",
			"deliveries_time": 2
		},
		{
			"name": "Мишутино",
			"deliveries_time": 4
		},
		{
			"name": "Можайск",
			"deliveries_time": 3
		},
		{
			"name": "Можга",
			"deliveries_time": 5
		},
		{
			"name": "Моздок",
			"deliveries_time": 6
		},
		{
			"name": "Мокрое",
			"deliveries_time": 4
		},
		{
			"name": "Молодарский",
			"deliveries_time": 2
		},
		{
			"name": "Молодежный",
			"deliveries_time": 4
		},
		{
			"name": "Молоди",
			"deliveries_time": 4
		},
		{
			"name": "Молоково",
			"deliveries_time": 2
		},
		{
			"name": "Монгохто",
			"deliveries_time": 5
		},
		{
			"name": "Монино",
			"deliveries_time": 2
		},
		{
			"name": "Монино привокзальное",
			"deliveries_time": 2
		},
		{
			"name": "Моносеино",
			"deliveries_time": 4
		},
		{
			"name": "Мончегорск",
			"deliveries_time": 6
		},
		{
			"name": "Морозово",
			"deliveries_time": 4
		},
		{
			"name": "Морозовск",
			"deliveries_time": 6
		},
		{
			"name": "Моршанск",
			"deliveries_time": 5
		},
		{
			"name": "Москва",
			"deliveries_time": 3
		},
		{
			"name": "Москвич",
			"deliveries_time": 4
		},
		{
			"name": "Московская область",
			"deliveries_time": 4
		},
		{
			"name": "Московский Комбинат Совхоз",
			"deliveries_time": 2
		},
		{
			"name": "Мосрентген",
			"deliveries_time": 2
		},
		{
			"name": "Мостовик",
			"deliveries_time": 4
		},
		{
			"name": "Мостовской",
			"deliveries_time": 5
		},
		{
			"name": "Мочилы",
			"deliveries_time": 4
		},
		{
			"name": "Муравленко",
			"deliveries_time": 6
		},
		{
			"name": "Муриково",
			"deliveries_time": 4
		},
		{
			"name": "Мурино",
			"deliveries_time": 2
		},
		{
			"name": "Мурино, Всеволожский р-н",
			"deliveries_time": 3
		},
		{
			"name": "Мурманск",
			"deliveries_time": 6
		},
		{
			"name": "Мурмаши",
			"deliveries_time": 3
		},
		{
			"name": "Муром",
			"deliveries_time": 4
		},
		{
			"name": "Муханово",
			"deliveries_time": 4
		},
		{
			"name": "Мухино",
			"deliveries_time": 4
		},
		{
			"name": "Мценск",
			"deliveries_time": 4
		},
		{
			"name": "Мыски",
			"deliveries_time": 5
		},
		{
			"name": "Мытищи",
			"deliveries_time": 3
		},
		{
			"name": "Набережные Челны",
			"deliveries_time": 4
		},
		{
			"name": "Навашино",
			"deliveries_time": 4
		},
		{
			"name": "Надым",
			"deliveries_time": 4
		},
		{
			"name": "Назарово",
			"deliveries_time": 4
		},
		{
			"name": "Назарьево",
			"deliveries_time": 2
		},
		{
			"name": "Назрань",
			"deliveries_time": 6
		},
		{
			"name": "Нальчик",
			"deliveries_time": 5
		},
		{
			"name": "Наро-Фоминск",
			"deliveries_time": 3
		},
		{
			"name": "Нарский",
			"deliveries_time": 4
		},
		{
			"name": "Нарынка",
			"deliveries_time": 4
		},
		{
			"name": "Нарьян-Мар",
			"deliveries_time": 5
		},
		{
			"name": "Нахабино",
			"deliveries_time": 3
		},
		{
			"name": "Находка",
			"deliveries_time": 7
		},
		{
			"name": "Небуг",
			"deliveries_time": 4
		},
		{
			"name": "Невель",
			"deliveries_time": 4
		},
		{
			"name": "Невинномысск",
			"deliveries_time": 5
		},
		{
			"name": "Невьянск",
			"deliveries_time": 5
		},
		{
			"name": "Некрасовка",
			"deliveries_time": 3
		},
		{
			"name": "Некрасовский",
			"deliveries_time": 4
		},
		{
			"name": "Некрасовское",
			"deliveries_time": 2
		},
		{
			"name": "Нелазское",
			"deliveries_time": 3
		},
		{
			"name": "Нелидово",
			"deliveries_time": 4
		},
		{
			"name": "Неман",
			"deliveries_time": 2
		},
		{
			"name": "Немчиновка",
			"deliveries_time": 4
		},
		{
			"name": "Непецино",
			"deliveries_time": 4
		},
		{
			"name": "Нерастанное",
			"deliveries_time": 4
		},
		{
			"name": "Нерехта",
			"deliveries_time": 3
		},
		{
			"name": "Нерюнгри",
			"deliveries_time": 9
		},
		{
			"name": "Нефтекамск",
			"deliveries_time": 5
		},
		{
			"name": "Нефтеюганск",
			"deliveries_time": 4
		},
		{
			"name": "Нижегородка",
			"deliveries_time": 2
		},
		{
			"name": "Нижнебаканская",
			"deliveries_time": 3
		},
		{
			"name": "Нижневартовск",
			"deliveries_time": 4
		},
		{
			"name": "Нижнегорский",
			"deliveries_time": 5
		},
		{
			"name": "Нижнее Хорошово",
			"deliveries_time": 4
		},
		{
			"name": "Нижнекамск",
			"deliveries_time": 4
		},
		{
			"name": "Нижнемаслово",
			"deliveries_time": 4
		},
		{
			"name": "Нижние Серги",
			"deliveries_time": 6
		},
		{
			"name": "Нижний Новгород",
			"deliveries_time": 3
		},
		{
			"name": "Нижний Тагил",
			"deliveries_time": 5
		},
		{
			"name": "Нижняя Тура",
			"deliveries_time": 5
		},
		{
			"name": "Никитское",
			"deliveries_time": 4
		},
		{
			"name": "Николо-кропотки",
			"deliveries_time": 4
		},
		{
			"name": "Никольск",
			"deliveries_time": 4
		},
		{
			"name": "Никольско-Архангельское",
			"deliveries_time": 2
		},
		{
			"name": "Никольское",
			"deliveries_time": 4
		},
		{
			"name": "Никольское-Гагарино",
			"deliveries_time": 4
		},
		{
			"name": "Никоновское",
			"deliveries_time": 2
		},
		{
			"name": "Никулино",
			"deliveries_time": 4
		},
		{
			"name": "Новая Адыгея",
			"deliveries_time": 4
		},
		{
			"name": "Новая Деревня",
			"deliveries_time": 4
		},
		{
			"name": "Новая Ольховка",
			"deliveries_time": 4
		},
		{
			"name": "Новая Усмань",
			"deliveries_time": 3
		},
		{
			"name": "Ново-Переделкино",
			"deliveries_time": 4
		},
		{
			"name": "Новоалександровск",
			"deliveries_time": 6
		},
		{
			"name": "Новоалтайск",
			"deliveries_time": 4
		},
		{
			"name": "Нововоронеж",
			"deliveries_time": 4
		},
		{
			"name": "Нововязники",
			"deliveries_time": 2
		},
		{
			"name": "Новогорск",
			"deliveries_time": 2
		},
		{
			"name": "Новодвинск",
			"deliveries_time": 5
		},
		{
			"name": "Новодрожжино",
			"deliveries_time": 2
		},
		{
			"name": "Новое",
			"deliveries_time": 4
		},
		{
			"name": "Новое Гришино",
			"deliveries_time": 4
		},
		{
			"name": "Новое Девяткино",
			"deliveries_time": 3
		},
		{
			"name": "Новоегорий",
			"deliveries_time": 4
		},
		{
			"name": "Новозагарие",
			"deliveries_time": 4
		},
		{
			"name": "Новоклемово",
			"deliveries_time": 4
		},
		{
			"name": "Новокубанск",
			"deliveries_time": 5
		},
		{
			"name": "Новокузнецк",
			"deliveries_time": 4
		},
		{
			"name": "Новокуйбышевск",
			"deliveries_time": 4
		},
		{
			"name": "Новомихайловский",
			"deliveries_time": 5
		},
		{
			"name": "Новомосковск",
			"deliveries_time": 3
		},
		{
			"name": "Новомышастовская",
			"deliveries_time": 5
		},
		{
			"name": "Новоникольское",
			"deliveries_time": 2
		},
		{
			"name": "Новопавловск",
			"deliveries_time": 6
		},
		{
			"name": "Новопетровское",
			"deliveries_time": 4
		},
		{
			"name": "Новоподрезково",
			"deliveries_time": 2
		},
		{
			"name": "Новопокровская",
			"deliveries_time": 5
		},
		{
			"name": "Новороссийск",
			"deliveries_time": 4
		},
		{
			"name": "Новоселки",
			"deliveries_time": 4
		},
		{
			"name": "Новосергиевка",
			"deliveries_time": 6
		},
		{
			"name": "Новосибирск",
			"deliveries_time": 4
		},
		{
			"name": "Новосиньково",
			"deliveries_time": 4
		},
		{
			"name": "Новотитаровская",
			"deliveries_time": 4
		},
		{
			"name": "Новотроицк",
			"deliveries_time": 5
		},
		{
			"name": "Новоуральск",
			"deliveries_time": 5
		},
		{
			"name": "Новохаритоново",
			"deliveries_time": 2
		},
		{
			"name": "Новочапово",
			"deliveries_time": 4
		},
		{
			"name": "Новочебоксарск",
			"deliveries_time": 4
		},
		{
			"name": "Новочеркасск",
			"deliveries_time": 4
		},
		{
			"name": "Новошахтинск",
			"deliveries_time": 5
		},
		{
			"name": "Новые Ляды",
			"deliveries_time": 4
		},
		{
			"name": "Новый Быт",
			"deliveries_time": 4
		},
		{
			"name": "Новый Снопок",
			"deliveries_time": 4
		},
		{
			"name": "Новый Уренгой",
			"deliveries_time": 4
		},
		{
			"name": "Ногинск",
			"deliveries_time": 3
		},
		{
			"name": "Норильск",
			"deliveries_time": 6
		},
		{
			"name": "Ноябрьск",
			"deliveries_time": 5
		},
		{
			"name": "Нудоль",
			"deliveries_time": 4
		},
		{
			"name": "Нурлат",
			"deliveries_time": 4
		},
		{
			"name": "Нытва",
			"deliveries_time": 5
		},
		{
			"name": "Нягань",
			"deliveries_time": 5
		},
		{
			"name": "Обнинск",
			"deliveries_time": 3
		},
		{
			"name": "Оболдино",
			"deliveries_time": 2
		},
		{
			"name": "Оболенск",
			"deliveries_time": 4
		},
		{
			"name": "Обухово",
			"deliveries_time": 4
		},
		{
			"name": "Обухово, Ногинский р-н",
			"deliveries_time": 3
		},
		{
			"name": "Обь",
			"deliveries_time": 4
		},
		{
			"name": "Оверята",
			"deliveries_time": 4
		},
		{
			"name": "Огуднево",
			"deliveries_time": 2
		},
		{
			"name": "Одинцово",
			"deliveries_time": 3
		},
		{
			"name": "Одинцово Вахромеево",
			"deliveries_time": 2
		},
		{
			"name": "Ожерелье",
			"deliveries_time": 4
		},
		{
			"name": "Озеретское",
			"deliveries_time": 4
		},
		{
			"name": "Озерск",
			"deliveries_time": 6
		},
		{
			"name": "Озеры",
			"deliveries_time": 4
		},
		{
			"name": "Озёры",
			"deliveries_time": 3
		},
		{
			"name": "Октябрьск",
			"deliveries_time": 4
		},
		{
			"name": "Октябрьская",
			"deliveries_time": 5
		},
		{
			"name": "Октябрьский",
			"deliveries_time": 3
		},
		{
			"name": "Октябрьский, Башкортостан респ.",
			"deliveries_time": 5
		},
		{
			"name": "Оленегорск",
			"deliveries_time": 6
		},
		{
			"name": "Ольгинка",
			"deliveries_time": 8
		},
		{
			"name": "Ольгино",
			"deliveries_time": 8
		},
		{
			"name": "Ольгово",
			"deliveries_time": 4
		},
		{
			"name": "Ольявидово",
			"deliveries_time": 4
		},
		{
			"name": "Омск",
			"deliveries_time": 4
		},
		{
			"name": "Онуфриево",
			"deliveries_time": 4
		},
		{
			"name": "Опалиха",
			"deliveries_time": 2
		},
		{
			"name": "Орел",
			"deliveries_time": 3
		},
		{
			"name": "Оренбург",
			"deliveries_time": 4
		},
		{
			"name": "Орехово-Зуево",
			"deliveries_time": 3
		},
		{
			"name": "Орешки",
			"deliveries_time": 4
		},
		{
			"name": "Орленок",
			"deliveries_time": 8
		},
		{
			"name": "Орск",
			"deliveries_time": 5
		},
		{
			"name": "Орудьево",
			"deliveries_time": 4
		},
		{
			"name": "Осаново-Дубовое",
			"deliveries_time": 4
		},
		{
			"name": "Осинники",
			"deliveries_time": 5
		},
		{
			"name": "Осиновка",
			"deliveries_time": 6
		},
		{
			"name": "Осиново, Зеленодольский р-н",
			"deliveries_time": 4
		},
		{
			"name": "Осташево",
			"deliveries_time": 4
		},
		{
			"name": "Остров",
			"deliveries_time": 5
		},
		{
			"name": "Островцы",
			"deliveries_time": 3
		},
		{
			"name": "Острогожск, Острогожский р-н",
			"deliveries_time": 4
		},
		{
			"name": "Отрадная, Отрадненский р-н, Краснодарский край",
			"deliveries_time": 5
		},
		{
			"name": "Отрадное",
			"deliveries_time": 2
		},
		{
			"name": "Отрадный",
			"deliveries_time": 4
		},
		{
			"name": "Оханск",
			"deliveries_time": 6
		},
		{
			"name": "Очер",
			"deliveries_time": 5
		},
		{
			"name": "Ошейкино",
			"deliveries_time": 4
		},
		{
			"name": "Павельцево",
			"deliveries_time": 2
		},
		{
			"name": "Павловичи",
			"deliveries_time": 4
		},
		{
			"name": "Павлово",
			"deliveries_time": 4
		},
		{
			"name": "Павловск",
			"deliveries_time": 2
		},
		{
			"name": "Павловск, Алтай. край",
			"deliveries_time": 5
		},
		{
			"name": "Павловск, Воронежская обл.",
			"deliveries_time": 5
		},
		{
			"name": "Павловская",
			"deliveries_time": 5
		},
		{
			"name": "Павловская Слобода",
			"deliveries_time": 4
		},
		{
			"name": "Павловский Посад",
			"deliveries_time": 4
		},
		{
			"name": "Павловское",
			"deliveries_time": 2
		},
		{
			"name": "Палласовка",
			"deliveries_time": 5
		},
		{
			"name": "Парфентьево",
			"deliveries_time": 4
		},
		{
			"name": "Пенза",
			"deliveries_time": 3
		},
		{
			"name": "Первомайск",
			"deliveries_time": 6
		},
		{
			"name": "Первомайский",
			"deliveries_time": 4
		},
		{
			"name": "Первомайское",
			"deliveries_time": 4
		},
		{
			"name": "Первомайское, Первомайский р-н",
			"deliveries_time": 4
		},
		{
			"name": "Первоуральск",
			"deliveries_time": 5
		},
		{
			"name": "Пересвет",
			"deliveries_time": 4
		},
		{
			"name": "Переславль-Залесский",
			"deliveries_time": 4
		},
		{
			"name": "Пермь",
			"deliveries_time": 5
		},
		{
			"name": "Перхушково",
			"deliveries_time": 2
		},
		{
			"name": "Пески",
			"deliveries_time": 4
		},
		{
			"name": "Песочный",
			"deliveries_time": 2
		},
		{
			"name": "Пестово, Новгородская обл.",
			"deliveries_time": 5
		},
		{
			"name": "Пестрецы, Пестречинский р-н",
			"deliveries_time": 4
		},
		{
			"name": "Петергоф",
			"deliveries_time": 4
		},
		{
			"name": "Петрово",
			"deliveries_time": 4
		},
		{
			"name": "Петрово-Дальнее",
			"deliveries_time": 2
		},
		{
			"name": "Петровское",
			"deliveries_time": 2
		},
		{
			"name": "Петродворец",
			"deliveries_time": 2
		},
		{
			"name": "Петрозаводск",
			"deliveries_time": 4
		},
		{
			"name": "Петропавловск-Камчатский",
			"deliveries_time": 6
		},
		{
			"name": "Печерники",
			"deliveries_time": 4
		},
		{
			"name": "Печора",
			"deliveries_time": 7
		},
		{
			"name": "Пироговский",
			"deliveries_time": 2
		},
		{
			"name": "Пирочи",
			"deliveries_time": 4
		},
		{
			"name": "Племхоз Константиново",
			"deliveries_time": 2
		},
		{
			"name": "Плесецк",
			"deliveries_time": 6
		},
		{
			"name": "Плеханово",
			"deliveries_time": 4
		},
		{
			"name": "Повалиха",
			"deliveries_time": 4
		},
		{
			"name": "Поварово",
			"deliveries_time": 4
		},
		{
			"name": "Пограничный",
			"deliveries_time": 6
		},
		{
			"name": "Подольск",
			"deliveries_time": 3
		},
		{
			"name": "Подосинки",
			"deliveries_time": 4
		},
		{
			"name": "Подхожее",
			"deliveries_time": 4
		},
		{
			"name": "Подьячево",
			"deliveries_time": 4
		},
		{
			"name": "Покров",
			"deliveries_time": 3
		},
		{
			"name": "Покровка",
			"deliveries_time": 4
		},
		{
			"name": "Покровское",
			"deliveries_time": 5
		},
		{
			"name": "Покровское-Шереметьево",
			"deliveries_time": 4
		},
		{
			"name": "Полазна",
			"deliveries_time": 4
		},
		{
			"name": "Полбино",
			"deliveries_time": 4
		},
		{
			"name": "Полевской",
			"deliveries_time": 6
		},
		{
			"name": "Половодово",
			"deliveries_time": 2
		},
		{
			"name": "Полтавская",
			"deliveries_time": 5
		},
		{
			"name": "Полуряденки",
			"deliveries_time": 4
		},
		{
			"name": "Полушкино",
			"deliveries_time": 4
		},
		{
			"name": "Полярные Зори",
			"deliveries_time": 6
		},
		{
			"name": "Понтонный",
			"deliveries_time": 3
		},
		{
			"name": "Поречье",
			"deliveries_time": 4
		},
		{
			"name": "Поречье Санаторий",
			"deliveries_time": 2
		},
		{
			"name": "Порожский",
			"deliveries_time": 6
		},
		{
			"name": "Похвистнево",
			"deliveries_time": 6
		},
		{
			"name": "Почеп",
			"deliveries_time": 4
		},
		{
			"name": "Починки",
			"deliveries_time": 4
		},
		{
			"name": "Правдинский",
			"deliveries_time": 2
		},
		{
			"name": "Приволжск",
			"deliveries_time": 4
		},
		{
			"name": "Приволье",
			"deliveries_time": 2
		},
		{
			"name": "Прииртышский",
			"deliveries_time": 8
		},
		{
			"name": "Прилепы",
			"deliveries_time": 4
		},
		{
			"name": "Приморск",
			"deliveries_time": 3
		},
		{
			"name": "Приморско-Ахтарск",
			"deliveries_time": 5
		},
		{
			"name": "Приозерск",
			"deliveries_time": 4
		},
		{
			"name": "Приютово",
			"deliveries_time": 5
		},
		{
			"name": "Прокопьевск",
			"deliveries_time": 5
		},
		{
			"name": "Пролетарский",
			"deliveries_time": 4
		},
		{
			"name": "Промышленная",
			"deliveries_time": 4
		},
		{
			"name": "Протасово",
			"deliveries_time": 2
		},
		{
			"name": "Протвино",
			"deliveries_time": 3
		},
		{
			"name": "Протекино",
			"deliveries_time": 4
		},
		{
			"name": "Прохладный",
			"deliveries_time": 6
		},
		{
			"name": "Прохладный, Белоярск окрг.",
			"deliveries_time": 6
		},
		{
			"name": "Прохоровка",
			"deliveries_time": 5
		},
		{
			"name": "Псарьки",
			"deliveries_time": 4
		},
		{
			"name": "Псков",
			"deliveries_time": 5
		},
		{
			"name": "Птичное",
			"deliveries_time": 3
		},
		{
			"name": "Пугачев",
			"deliveries_time": 6
		},
		{
			"name": "Пустоша",
			"deliveries_time": 4
		},
		{
			"name": "Путилково",
			"deliveries_time": 2
		},
		{
			"name": "Пушкин",
			"deliveries_time": 3
		},
		{
			"name": "Пушкино",
			"deliveries_time": 3
		},
		{
			"name": "Пущино",
			"deliveries_time": 3
		},
		{
			"name": "Пыть-Ях",
			"deliveries_time": 5
		},
		{
			"name": "Пышелицы",
			"deliveries_time": 4
		},
		{
			"name": "Пятигорск",
			"deliveries_time": 6
		},
		{
			"name": "Пятница",
			"deliveries_time": 4
		},
		{
			"name": "Радовицкий",
			"deliveries_time": 4
		},
		{
			"name": "Радужный",
			"deliveries_time": 4
		},
		{
			"name": "Радужный, ХМАО",
			"deliveries_time": 6
		},
		{
			"name": "Развилка",
			"deliveries_time": 2
		},
		{
			"name": "Разметелево",
			"deliveries_time": 8
		},
		{
			"name": "Райсеменовское",
			"deliveries_time": 4
		},
		{
			"name": "Раменки",
			"deliveries_time": 4
		},
		{
			"name": "Раменский Совхоз",
			"deliveries_time": 2
		},
		{
			"name": "Раменское",
			"deliveries_time": 3
		},
		{
			"name": "Раменье",
			"deliveries_time": 4
		},
		{
			"name": "Рассвет",
			"deliveries_time": 4
		},
		{
			"name": "Рассказово",
			"deliveries_time": 5
		},
		{
			"name": "Рассудово",
			"deliveries_time": 4
		},
		{
			"name": "Расцвет",
			"deliveries_time": 6
		},
		{
			"name": "Рахманово",
			"deliveries_time": 4
		},
		{
			"name": "Ревда",
			"deliveries_time": 6
		},
		{
			"name": "Редкино",
			"deliveries_time": 4
		},
		{
			"name": "Реж",
			"deliveries_time": 5
		},
		{
			"name": "Реутов",
			"deliveries_time": 2
		},
		{
			"name": "Речицы",
			"deliveries_time": 4
		},
		{
			"name": "Решеткино",
			"deliveries_time": 4
		},
		{
			"name": "Решетниково",
			"deliveries_time": 4
		},
		{
			"name": "Ржавки",
			"deliveries_time": 2
		},
		{
			"name": "Ржев",
			"deliveries_time": 4
		},
		{
			"name": "Рогачево",
			"deliveries_time": 4
		},
		{
			"name": "Рогово",
			"deliveries_time": 4
		},
		{
			"name": "Родники",
			"deliveries_time": 4
		},
		{
			"name": "Рождествено",
			"deliveries_time": 4
		},
		{
			"name": "Рождественский",
			"deliveries_time": 4
		},
		{
			"name": "Романовская",
			"deliveries_time": 6
		},
		{
			"name": "Романцево",
			"deliveries_time": 2
		},
		{
			"name": "Рославль",
			"deliveries_time": 5
		},
		{
			"name": "Росляково",
			"deliveries_time": 5
		},
		{
			"name": "Россошь",
			"deliveries_time": 5
		},
		{
			"name": "Ростов",
			"deliveries_time": 4
		},
		{
			"name": "Ростов-на-Дону",
			"deliveries_time": 4
		},
		{
			"name": "Рошаль",
			"deliveries_time": 4
		},
		{
			"name": "Рощино",
			"deliveries_time": 2
		},
		{
			"name": "Рощино, Выборгский р-н",
			"deliveries_time": 4
		},
		{
			"name": "рп Городище, Городищенский р-н",
			"deliveries_time": 4
		},
		{
			"name": "Ртищево, Ртищевский р-он",
			"deliveries_time": 5
		},
		{
			"name": "Рубцовск",
			"deliveries_time": 5
		},
		{
			"name": "Руза",
			"deliveries_time": 3
		},
		{
			"name": "Рузаевка",
			"deliveries_time": 3
		},
		{
			"name": "Рузаевка, Мордовия респ.",
			"deliveries_time": 5
		},
		{
			"name": "Румянцево",
			"deliveries_time": 4
		},
		{
			"name": "Руново",
			"deliveries_time": 4
		},
		{
			"name": "Русь Санаторий",
			"deliveries_time": 4
		},
		{
			"name": "Рыбинск",
			"deliveries_time": 4
		},
		{
			"name": "Рыбное",
			"deliveries_time": 4
		},
		{
			"name": "Рыльск",
			"deliveries_time": 5
		},
		{
			"name": "Ряжск",
			"deliveries_time": 4
		},
		{
			"name": "Рязаново",
			"deliveries_time": 2
		},
		{
			"name": "Рязановский",
			"deliveries_time": 4
		},
		{
			"name": "Рязань",
			"deliveries_time": 3
		},
		{
			"name": "Саввинская Слобода",
			"deliveries_time": 4
		},
		{
			"name": "Савельево",
			"deliveries_time": 4
		},
		{
			"name": "Савостино",
			"deliveries_time": 4
		},
		{
			"name": "Саки",
			"deliveries_time": 4
		},
		{
			"name": "Салават",
			"deliveries_time": 5
		},
		{
			"name": "Салехард",
			"deliveries_time": 5
		},
		{
			"name": "Салтыковка",
			"deliveries_time": 2
		},
		{
			"name": "Сальск",
			"deliveries_time": 5
		},
		{
			"name": "Самара",
			"deliveries_time": 4
		},
		{
			"name": "Санаторий 28А",
			"deliveries_time": 2
		},
		{
			"name": "Санаторий Белое Озеро",
			"deliveries_time": 4
		},
		{
			"name": "Санаторий ВЦСПС №5",
			"deliveries_time": 2
		},
		{
			"name": "Санаторий Подмосковье",
			"deliveries_time": 4
		},
		{
			"name": "Санкт-Петербург",
			"deliveries_time": 3
		},
		{
			"name": "Саранск",
			"deliveries_time": 3
		},
		{
			"name": "Сарапул",
			"deliveries_time": 6
		},
		{
			"name": "Саратов",
			"deliveries_time": 4
		},
		{
			"name": "Сарманово",
			"deliveries_time": 2
		},
		{
			"name": "Саров",
			"deliveries_time": 4
		},
		{
			"name": "Сасово",
			"deliveries_time": 4
		},
		{
			"name": "Сатис",
			"deliveries_time": 3
		},
		{
			"name": "Сатка",
			"deliveries_time": 6
		},
		{
			"name": "Саукдере",
			"deliveries_time": 3
		},
		{
			"name": "Сафоновка",
			"deliveries_time": 2
		},
		{
			"name": "Сафоново",
			"deliveries_time": 5
		},
		{
			"name": "Саяногорск",
			"deliveries_time": 5
		},
		{
			"name": "Саянск",
			"deliveries_time": 7
		},
		{
			"name": "Сватково",
			"deliveries_time": 4
		},
		{
			"name": "Свердловский",
			"deliveries_time": 2
		},
		{
			"name": "Светлоград",
			"deliveries_time": 5
		},
		{
			"name": "Светлый Яр",
			"deliveries_time": 4
		},
		{
			"name": "Светогорск",
			"deliveries_time": 3
		},
		{
			"name": "Свободный",
			"deliveries_time": 6
		},
		{
			"name": "Свободы Поселок",
			"deliveries_time": 4
		},
		{
			"name": "Себеж",
			"deliveries_time": 5
		},
		{
			"name": "Севастополь",
			"deliveries_time": 5
		},
		{
			"name": "Северный",
			"deliveries_time": 2
		},
		{
			"name": "Северобайкальск",
			"deliveries_time": 6
		},
		{
			"name": "Северодвинск",
			"deliveries_time": 5
		},
		{
			"name": "Североморск",
			"deliveries_time": 6
		},
		{
			"name": "Североуральск",
			"deliveries_time": 6
		},
		{
			"name": "Северск",
			"deliveries_time": 5
		},
		{
			"name": "Северская",
			"deliveries_time": 5
		},
		{
			"name": "Сегежа",
			"deliveries_time": 6
		},
		{
			"name": "Селково",
			"deliveries_time": 4
		},
		{
			"name": "Сельниково",
			"deliveries_time": 4
		},
		{
			"name": "Сельцо",
			"deliveries_time": 4
		},
		{
			"name": "Селятино",
			"deliveries_time": 4
		},
		{
			"name": "Семенов",
			"deliveries_time": 3
		},
		{
			"name": "Семеново",
			"deliveries_time": 4
		},
		{
			"name": "Семеновское",
			"deliveries_time": 4
		},
		{
			"name": "Семикаракорск",
			"deliveries_time": 5
		},
		{
			"name": "Семилуки",
			"deliveries_time": 2
		},
		{
			"name": "Семилуки, Семилукский р-н, Воронежская обл.",
			"deliveries_time": 4
		},
		{
			"name": "Сенницы",
			"deliveries_time": 4
		},
		{
			"name": "Сергач",
			"deliveries_time": 4
		},
		{
			"name": "Сергиев Посад",
			"deliveries_time": 3
		},
		{
			"name": "Сергиевский",
			"deliveries_time": 4
		},
		{
			"name": "Сердобск",
			"deliveries_time": 4
		},
		{
			"name": "Серебряные Пруды",
			"deliveries_time": 4
		},
		{
			"name": "Серебряные Пруды совхоз",
			"deliveries_time": 4
		},
		{
			"name": "Середа",
			"deliveries_time": 4
		},
		{
			"name": "Середниково",
			"deliveries_time": 4
		},
		{
			"name": "Серов",
			"deliveries_time": 6
		},
		{
			"name": "Серпухов",
			"deliveries_time": 3
		},
		{
			"name": "Сертолово",
			"deliveries_time": 3
		},
		{
			"name": "Сестрорецк",
			"deliveries_time": 4
		},
		{
			"name": "Сибай",
			"deliveries_time": 6
		},
		{
			"name": "Симбухово",
			"deliveries_time": 3
		},
		{
			"name": "Симферополь",
			"deliveries_time": 4
		},
		{
			"name": "Синево",
			"deliveries_time": 4
		},
		{
			"name": "Синичино",
			"deliveries_time": 4
		},
		{
			"name": "Ситне-щелканово",
			"deliveries_time": 4
		},
		{
			"name": "Сколково инновационный центр",
			"deliveries_time": 3
		},
		{
			"name": "Скопин",
			"deliveries_time": 4
		},
		{
			"name": "Скоропусковский",
			"deliveries_time": 4
		},
		{
			"name": "Славгород",
			"deliveries_time": 5
		},
		{
			"name": "Славянск-на-Кубани",
			"deliveries_time": 5
		},
		{
			"name": "Сланцы",
			"deliveries_time": 3
		},
		{
			"name": "Слобода",
			"deliveries_time": 4
		},
		{
			"name": "Слободка",
			"deliveries_time": 4
		},
		{
			"name": "Слободской",
			"deliveries_time": 6
		},
		{
			"name": "Слюдянка",
			"deliveries_time": 6
		},
		{
			"name": "Смоленск",
			"deliveries_time": 3
		},
		{
			"name": "Смышляевка",
			"deliveries_time": 3
		},
		{
			"name": "Снегири",
			"deliveries_time": 2
		},
		{
			"name": "Снежинск",
			"deliveries_time": 6
		},
		{
			"name": "Собинка",
			"deliveries_time": 5
		},
		{
			"name": "Соболево",
			"deliveries_time": 4
		},
		{
			"name": "Советск",
			"deliveries_time": 8
		},
		{
			"name": "Советская Гавань",
			"deliveries_time": 7
		},
		{
			"name": "Советский",
			"deliveries_time": 6
		},
		{
			"name": "Совхоз 10 лет Октября",
			"deliveries_time": 4
		},
		{
			"name": "Совхоз 50 лет Октября",
			"deliveries_time": 3
		},
		{
			"name": "Совхоз им Ленина",
			"deliveries_time": 3
		},
		{
			"name": "Совхоз Маслово",
			"deliveries_time": 4
		},
		{
			"name": "Совхоз Мир",
			"deliveries_time": 4
		},
		{
			"name": "Сокол",
			"deliveries_time": 4
		},
		{
			"name": "Соколова Пустынь",
			"deliveries_time": 4
		},
		{
			"name": "Сокольниково",
			"deliveries_time": 4
		},
		{
			"name": "Соликамск",
			"deliveries_time": 6
		},
		{
			"name": "Солнечногорск",
			"deliveries_time": 2
		},
		{
			"name": "Солнечный",
			"deliveries_time": 8
		},
		{
			"name": "Соль-Илецк",
			"deliveries_time": 6
		},
		{
			"name": "Сомово",
			"deliveries_time": 2
		},
		{
			"name": "Сорочинск, Оренбургская обл.",
			"deliveries_time": 5
		},
		{
			"name": "Сортавала",
			"deliveries_time": 5
		},
		{
			"name": "Сосенский",
			"deliveries_time": 3
		},
		{
			"name": "Сосновка",
			"deliveries_time": 4
		},
		{
			"name": "Сосново, Приозерский р-н",
			"deliveries_time": 4
		},
		{
			"name": "Сосновоборск",
			"deliveries_time": 5
		},
		{
			"name": "Сосновый",
			"deliveries_time": 6
		},
		{
			"name": "Сосновый Бор",
			"deliveries_time": 5
		},
		{
			"name": "Софрино",
			"deliveries_time": 2
		},
		{
			"name": "Сочи",
			"deliveries_time": 5
		},
		{
			"name": "Спас Заулок",
			"deliveries_time": 4
		},
		{
			"name": "Спасс",
			"deliveries_time": 4
		},
		{
			"name": "Спасск-Дальний",
			"deliveries_time": 7
		},
		{
			"name": "Спутник",
			"deliveries_time": 4
		},
		{
			"name": "Ставрополь",
			"deliveries_time": 4
		},
		{
			"name": "Старая Купавна",
			"deliveries_time": 3
		},
		{
			"name": "Старая Руза",
			"deliveries_time": 4
		},
		{
			"name": "Старая Русса",
			"deliveries_time": 4
		},
		{
			"name": "Старая Ситня",
			"deliveries_time": 4
		},
		{
			"name": "Стариково",
			"deliveries_time": 4
		},
		{
			"name": "Старое",
			"deliveries_time": 4
		},
		{
			"name": "Старокорсунская станица",
			"deliveries_time": 4
		},
		{
			"name": "Староминская",
			"deliveries_time": 5
		},
		{
			"name": "Старый Городок",
			"deliveries_time": 4
		},
		{
			"name": "Старый Оскол",
			"deliveries_time": 4
		},
		{
			"name": "Старый Петергоф",
			"deliveries_time": 2
		},
		{
			"name": "Стегачево",
			"deliveries_time": 2
		},
		{
			"name": "Степановское",
			"deliveries_time": 2
		},
		{
			"name": "Степанцево",
			"deliveries_time": 4
		},
		{
			"name": "Степанщино",
			"deliveries_time": 4
		},
		{
			"name": "Степаньково",
			"deliveries_time": 4
		},
		{
			"name": "Стерлитамак",
			"deliveries_time": 5
		},
		{
			"name": "Столбовая",
			"deliveries_time": 4
		},
		{
			"name": "Стрежевой",
			"deliveries_time": 4
		},
		{
			"name": "Стрелица",
			"deliveries_time": 2
		},
		{
			"name": "Стрельна",
			"deliveries_time": 3
		},
		{
			"name": "Стремилово",
			"deliveries_time": 4
		},
		{
			"name": "Строитель, Яковлевский р-н",
			"deliveries_time": 4
		},
		{
			"name": "Струпна",
			"deliveries_time": 4
		},
		{
			"name": "Ступино",
			"deliveries_time": 3
		},
		{
			"name": "Судак",
			"deliveries_time": 4
		},
		{
			"name": "Судиславль",
			"deliveries_time": 3
		},
		{
			"name": "Судниково",
			"deliveries_time": 4
		},
		{
			"name": "Суздаль",
			"deliveries_time": 5
		},
		{
			"name": "Сумкино",
			"deliveries_time": 6
		},
		{
			"name": "Сунжа, Ингушетия респ.",
			"deliveries_time": 10
		},
		{
			"name": "Супсех",
			"deliveries_time": 5
		},
		{
			"name": "Сургут",
			"deliveries_time": 4
		},
		{
			"name": "Суходол",
			"deliveries_time": 6
		},
		{
			"name": "Сухой",
			"deliveries_time": 6
		},
		{
			"name": "Сухой Лог",
			"deliveries_time": 6
		},
		{
			"name": "Сходня",
			"deliveries_time": 3
		},
		{
			"name": "Сызрань",
			"deliveries_time": 4
		},
		{
			"name": "Сыктывкар",
			"deliveries_time": 5
		},
		{
			"name": "Сысерть",
			"deliveries_time": 6
		},
		{
			"name": "Сычево",
			"deliveries_time": 4
		},
		{
			"name": "Тавда",
			"deliveries_time": 6
		},
		{
			"name": "Таганрог",
			"deliveries_time": 5
		},
		{
			"name": "Тайшет",
			"deliveries_time": 7
		},
		{
			"name": "Талдом",
			"deliveries_time": 4
		},
		{
			"name": "Талица, Талицкий р-н",
			"deliveries_time": 6
		},
		{
			"name": "Талицы",
			"deliveries_time": 4
		},
		{
			"name": "Талнах",
			"deliveries_time": 7
		},
		{
			"name": "Тальменка",
			"deliveries_time": 6
		},
		{
			"name": "Тамань",
			"deliveries_time": 5
		},
		{
			"name": "Тамбов",
			"deliveries_time": 4
		},
		{
			"name": "Таптыково",
			"deliveries_time": 3
		},
		{
			"name": "Тарасково",
			"deliveries_time": 4
		},
		{
			"name": "Тарасково, Наро-Фоминский р-н",
			"deliveries_time": 3
		},
		{
			"name": "Тарасовский",
			"deliveries_time": 5
		},
		{
			"name": "Тарбушево",
			"deliveries_time": 4
		},
		{
			"name": "Татариново",
			"deliveries_time": 4
		},
		{
			"name": "Таширово",
			"deliveries_time": 4
		},
		{
			"name": "Тбилисская",
			"deliveries_time": 5
		},
		{
			"name": "Тверь",
			"deliveries_time": 3
		},
		{
			"name": "Текстильщик",
			"deliveries_time": 2
		},
		{
			"name": "Темпы",
			"deliveries_time": 4
		},
		{
			"name": "Темрюк",
			"deliveries_time": 5
		},
		{
			"name": "Терек",
			"deliveries_time": 6
		},
		{
			"name": "Теряево",
			"deliveries_time": 4
		},
		{
			"name": "Тимашевск",
			"deliveries_time": 2
		},
		{
			"name": "Тимашевск, Тимашевский р-н",
			"deliveries_time": 5
		},
		{
			"name": "Тимонино",
			"deliveries_time": 4
		},
		{
			"name": "Тихвин",
			"deliveries_time": 5
		},
		{
			"name": "Тихорецк",
			"deliveries_time": 5
		},
		{
			"name": "Тишково",
			"deliveries_time": 2
		},
		{
			"name": "Тобольск",
			"deliveries_time": 6
		},
		{
			"name": "Тогучин",
			"deliveries_time": 4
		},
		{
			"name": "Токи",
			"deliveries_time": 5
		},
		{
			"name": "Тольятти",
			"deliveries_time": 4
		},
		{
			"name": "Томилино",
			"deliveries_time": 4
		},
		{
			"name": "Томск",
			"deliveries_time": 4
		},
		{
			"name": "Тоншалово",
			"deliveries_time": 3
		},
		{
			"name": "Топканово",
			"deliveries_time": 4
		},
		{
			"name": "Топки",
			"deliveries_time": 4
		},
		{
			"name": "Торгашино",
			"deliveries_time": 4
		},
		{
			"name": "Торжок",
			"deliveries_time": 3
		},
		{
			"name": "Торхово",
			"deliveries_time": 4
		},
		{
			"name": "Тосно",
			"deliveries_time": 3
		},
		{
			"name": "Тотьма",
			"deliveries_time": 5
		},
		{
			"name": "Трехгорный",
			"deliveries_time": 5
		},
		{
			"name": "Троицк",
			"deliveries_time": 3
		},
		{
			"name": "Троицк, Чел. обл",
			"deliveries_time": 6
		},
		{
			"name": "Троицкое",
			"deliveries_time": 2
		},
		{
			"name": "Троицкое-антропово",
			"deliveries_time": 4
		},
		{
			"name": "Тропарево",
			"deliveries_time": 4
		},
		{
			"name": "Трубино",
			"deliveries_time": 2
		},
		{
			"name": "Трудовая",
			"deliveries_time": 3
		},
		{
			"name": "Туапсе",
			"deliveries_time": 4
		},
		{
			"name": "Туголесский Бор",
			"deliveries_time": 4
		},
		{
			"name": "Туймазы",
			"deliveries_time": 5
		},
		{
			"name": "Тула",
			"deliveries_time": 3
		},
		{
			"name": "Тула Пятьдесят",
			"deliveries_time": 2
		},
		{
			"name": "Тулун",
			"deliveries_time": 7
		},
		{
			"name": "Туношна",
			"deliveries_time": 3
		},
		{
			"name": "Туринск",
			"deliveries_time": 6
		},
		{
			"name": "Турово",
			"deliveries_time": 4
		},
		{
			"name": "Тутаев",
			"deliveries_time": 2
		},
		{
			"name": "Тучково",
			"deliveries_time": 4
		},
		{
			"name": "Тында",
			"deliveries_time": 9
		},
		{
			"name": "Тюменский",
			"deliveries_time": 4
		},
		{
			"name": "Тюменское",
			"deliveries_time": 4
		},
		{
			"name": "Тюмень",
			"deliveries_time": 5
		},
		{
			"name": "Ува",
			"deliveries_time": 5
		},
		{
			"name": "Уваровка",
			"deliveries_time": 4
		},
		{
			"name": "Уват",
			"deliveries_time": 7
		},
		{
			"name": "Углич",
			"deliveries_time": 4
		},
		{
			"name": "Ударный",
			"deliveries_time": 4
		},
		{
			"name": "Удельная",
			"deliveries_time": 2
		},
		{
			"name": "Удомля",
			"deliveries_time": 4
		},
		{
			"name": "Ужур",
			"deliveries_time": 7
		},
		{
			"name": "Узловая",
			"deliveries_time": 3
		},
		{
			"name": "Узуново",
			"deliveries_time": 4
		},
		{
			"name": "Улан-Удэ",
			"deliveries_time": 4
		},
		{
			"name": "Ульянино",
			"deliveries_time": 4
		},
		{
			"name": "Ульяновка",
			"deliveries_time": 2
		},
		{
			"name": "Ульяновск",
			"deliveries_time": 4
		},
		{
			"name": "Урай",
			"deliveries_time": 6
		},
		{
			"name": "Урус-Мартан",
			"deliveries_time": 4
		},
		{
			"name": "Урюпинск",
			"deliveries_time": 6
		},
		{
			"name": "Усады",
			"deliveries_time": 4
		},
		{
			"name": "Усады, Лаишевский р-н",
			"deliveries_time": 4
		},
		{
			"name": "Усинск",
			"deliveries_time": 8
		},
		{
			"name": "Усмань",
			"deliveries_time": 5
		},
		{
			"name": "Усово",
			"deliveries_time": 2
		},
		{
			"name": "Усовский",
			"deliveries_time": 4
		},
		{
			"name": "Усолье",
			"deliveries_time": 4
		},
		{
			"name": "Усолье-Сибирское",
			"deliveries_time": 6
		},
		{
			"name": "Успенское",
			"deliveries_time": 2
		},
		{
			"name": "Уссурийск",
			"deliveries_time": 7
		},
		{
			"name": "Усть-Абакан",
			"deliveries_time": 6
		},
		{
			"name": "Усть-Джегута",
			"deliveries_time": 6
		},
		{
			"name": "Усть-Илимск",
			"deliveries_time": 6
		},
		{
			"name": "Усть-Катав",
			"deliveries_time": 5
		},
		{
			"name": "Усть-Кинельский",
			"deliveries_time": 3
		},
		{
			"name": "Усть-Кокса",
			"deliveries_time": 6
		},
		{
			"name": "Усть-Кут",
			"deliveries_time": 6
		},
		{
			"name": "Усть-Лабинск",
			"deliveries_time": 5
		},
		{
			"name": "Устье",
			"deliveries_time": 4
		},
		{
			"name": "Уфа",
			"deliveries_time": 5
		},
		{
			"name": "Ухта",
			"deliveries_time": 5
		},
		{
			"name": "Учалы",
			"deliveries_time": 5
		},
		{
			"name": "Учкекен, Карачаево-Черкесская респ.",
			"deliveries_time": 9
		},
		{
			"name": "Ушаково",
			"deliveries_time": 4
		},
		{
			"name": "Уяр, Красноярский край",
			"deliveries_time": 5
		},
		{
			"name": "Федоровка",
			"deliveries_time": 3
		},
		{
			"name": "Федорцово",
			"deliveries_time": 4
		},
		{
			"name": "Федосино",
			"deliveries_time": 4
		},
		{
			"name": "Федюково",
			"deliveries_time": 2
		},
		{
			"name": "Фенино",
			"deliveries_time": 4
		},
		{
			"name": "Феодосия",
			"deliveries_time": 4
		},
		{
			"name": "Ферма",
			"deliveries_time": 4
		},
		{
			"name": "Фирсановка",
			"deliveries_time": 2
		},
		{
			"name": "Фокино",
			"deliveries_time": 6
		},
		{
			"name": "Фролы",
			"deliveries_time": 4
		},
		{
			"name": "Фруктовая",
			"deliveries_time": 4
		},
		{
			"name": "Фрязево",
			"deliveries_time": 3
		},
		{
			"name": "Фрязино",
			"deliveries_time": 2
		},
		{
			"name": "Фряново",
			"deliveries_time": 2
		},
		{
			"name": "Хабаровск",
			"deliveries_time": 6
		},
		{
			"name": "Ханты-Мансийск",
			"deliveries_time": 4
		},
		{
			"name": "Хапо-Ое",
			"deliveries_time": 8
		},
		{
			"name": "Харлампеево",
			"deliveries_time": 4
		},
		{
			"name": "Хасавюрт",
			"deliveries_time": 6
		},
		{
			"name": "Хатунь",
			"deliveries_time": 4
		},
		{
			"name": "Химки",
			"deliveries_time": 3
		},
		{
			"name": "Химки Новые",
			"deliveries_time": 3
		},
		{
			"name": "Хлюпино",
			"deliveries_time": 2
		},
		{
			"name": "Холмогоры",
			"deliveries_time": 4
		},
		{
			"name": "Холмск",
			"deliveries_time": 8
		},
		{
			"name": "Холщевики",
			"deliveries_time": 4
		},
		{
			"name": "Хомутово",
			"deliveries_time": 6
		},
		{
			"name": "Хорлово",
			"deliveries_time": 4
		},
		{
			"name": "Хотеичи",
			"deliveries_time": 4
		},
		{
			"name": "Хотиково",
			"deliveries_time": 4
		},
		{
			"name": "Хотьково, Сергиево-Посадский р-н",
			"deliveries_time": 3
		},
		{
			"name": "Хрипань",
			"deliveries_time": 2
		},
		{
			"name": "Хрущево",
			"deliveries_time": 4
		},
		{
			"name": "Хутор им. Ленина",
			"deliveries_time": 2
		},
		{
			"name": "Цветковский Совхоз",
			"deliveries_time": 4
		},
		{
			"name": "Цемдолина",
			"deliveries_time": 2
		},
		{
			"name": "Цемдолина, гор. окр Новороссийск",
			"deliveries_time": 4
		},
		{
			"name": "Центролит",
			"deliveries_time": 4
		},
		{
			"name": "Цивильск",
			"deliveries_time": 5
		},
		{
			"name": "Цимлянск",
			"deliveries_time": 5
		},
		{
			"name": "Цыпка",
			"deliveries_time": 8
		},
		{
			"name": "Цюрупы",
			"deliveries_time": 4
		},
		{
			"name": "Чайковский",
			"deliveries_time": 5
		},
		{
			"name": "Чалтырь",
			"deliveries_time": 5
		},
		{
			"name": "Чапаевск",
			"deliveries_time": 8
		},
		{
			"name": "Часцы",
			"deliveries_time": 4
		},
		{
			"name": "Чашниково",
			"deliveries_time": 2
		},
		{
			"name": "Чебаркуль",
			"deliveries_time": 6
		},
		{
			"name": "Чебоксары",
			"deliveries_time": 4
		},
		{
			"name": "Чегдомын",
			"deliveries_time": 7
		},
		{
			"name": "Челябинск",
			"deliveries_time": 6
		},
		{
			"name": "Чемодурово",
			"deliveries_time": 4
		},
		{
			"name": "Ченлобитьево",
			"deliveries_time": 2
		},
		{
			"name": "Черемхово",
			"deliveries_time": 7
		},
		{
			"name": "Череповец",
			"deliveries_time": 4
		},
		{
			"name": "Черкесск",
			"deliveries_time": 6
		},
		{
			"name": "Черкизово",
			"deliveries_time": 2
		},
		{
			"name": "Черленково",
			"deliveries_time": 4
		},
		{
			"name": "Черная Грязь, Солнечногорский р-н",
			"deliveries_time": 3
		},
		{
			"name": "Чёрная Грязь, Солнечногорский р-н",
			"deliveries_time": 3
		},
		{
			"name": "Черная Речка",
			"deliveries_time": 2
		},
		{
			"name": "Чернетское",
			"deliveries_time": 4
		},
		{
			"name": "Черноголовка",
			"deliveries_time": 3
		},
		{
			"name": "Черногорск",
			"deliveries_time": 5
		},
		{
			"name": "Черное",
			"deliveries_time": 3
		},
		{
			"name": "Черноморское",
			"deliveries_time": 4
		},
		{
			"name": "Чернушка",
			"deliveries_time": 6
		},
		{
			"name": "Чертково",
			"deliveries_time": 5
		},
		{
			"name": "Черусти",
			"deliveries_time": 4
		},
		{
			"name": "Чесноковка",
			"deliveries_time": 2
		},
		{
			"name": "Чехов",
			"deliveries_time": 3
		},
		{
			"name": "Чисмена",
			"deliveries_time": 4
		},
		{
			"name": "Чистополь",
			"deliveries_time": 4
		},
		{
			"name": "Чита",
			"deliveries_time": 5
		},
		{
			"name": "Чкаловск",
			"deliveries_time": 6
		},
		{
			"name": "Чудово",
			"deliveries_time": 5
		},
		{
			"name": "Чулково",
			"deliveries_time": 2
		},
		{
			"name": "Чунский",
			"deliveries_time": 8
		},
		{
			"name": "Чурилково",
			"deliveries_time": 4
		},
		{
			"name": "Чусовой",
			"deliveries_time": 6
		},
		{
			"name": "Шабурново",
			"deliveries_time": 4
		},
		{
			"name": "Шадринск",
			"deliveries_time": 5
		},
		{
			"name": "Шали",
			"deliveries_time": 4
		},
		{
			"name": "Шаликово",
			"deliveries_time": 4
		},
		{
			"name": "Шарапова Охота",
			"deliveries_time": 4
		},
		{
			"name": "Шарапово",
			"deliveries_time": 4
		},
		{
			"name": "Шарыпово",
			"deliveries_time": 6
		},
		{
			"name": "Шарья",
			"deliveries_time": 5
		},
		{
			"name": "Шатск второй",
			"deliveries_time": 4
		},
		{
			"name": "Шатура",
			"deliveries_time": 3
		},
		{
			"name": "Шатурторф",
			"deliveries_time": 4
		},
		{
			"name": "Шаумян",
			"deliveries_time": 4
		},
		{
			"name": "Шаховская",
			"deliveries_time": 4
		},
		{
			"name": "Шаховская, Шаховской р-н",
			"deliveries_time": 4
		},
		{
			"name": "Шахты",
			"deliveries_time": 5
		},
		{
			"name": "Шахунья",
			"deliveries_time": 4
		},
		{
			"name": "Шебекино",
			"deliveries_time": 4
		},
		{
			"name": "Шебекино, Шебекинский р-н",
			"deliveries_time": 4
		},
		{
			"name": "Шевляково",
			"deliveries_time": 4
		},
		{
			"name": "Шеино",
			"deliveries_time": 4
		},
		{
			"name": "Шелехов",
			"deliveries_time": 6
		},
		{
			"name": "Шеметово",
			"deliveries_time": 4
		},
		{
			"name": "Шепси",
			"deliveries_time": 8
		},
		{
			"name": "Шереметьево 1 аэропорт",
			"deliveries_time": 2
		},
		{
			"name": "Шереметьево 2 аэропорт",
			"deliveries_time": 2
		},
		{
			"name": "Шереметьевский",
			"deliveries_time": 2
		},
		{
			"name": "Шестаково",
			"deliveries_time": 4
		},
		{
			"name": "Шилово",
			"deliveries_time": 4
		},
		{
			"name": "Шихово",
			"deliveries_time": 2
		},
		{
			"name": "Шубино",
			"deliveries_time": 2
		},
		{
			"name": "Шувое",
			"deliveries_time": 4
		},
		{
			"name": "Шугарово",
			"deliveries_time": 4
		},
		{
			"name": "Шустиково",
			"deliveries_time": 4
		},
		{
			"name": "Шушары",
			"deliveries_time": 3
		},
		{
			"name": "Шуя",
			"deliveries_time": 4
		},
		{
			"name": "Щапово",
			"deliveries_time": 2
		},
		{
			"name": "Щеглово",
			"deliveries_time": 2
		},
		{
			"name": "Щеглятьево",
			"deliveries_time": 4
		},
		{
			"name": "Щекино",
			"deliveries_time": 4
		},
		{
			"name": "Щелково",
			"deliveries_time": 4
		},
		{
			"name": "Щербинка",
			"deliveries_time": 3
		},
		{
			"name": "Электрогорск",
			"deliveries_time": 3
		},
		{
			"name": "Электросталь",
			"deliveries_time": 3
		},
		{
			"name": "Электроугли",
			"deliveries_time": 3
		},
		{
			"name": "Элиста",
			"deliveries_time": 5
		},
		{
			"name": "Энгельс",
			"deliveries_time": 4
		},
		{
			"name": "Юбилейный",
			"deliveries_time": 2
		},
		{
			"name": "Юбилейный мкр. (Королёв)",
			"deliveries_time": 3
		},
		{
			"name": "Югорск",
			"deliveries_time": 6
		},
		{
			"name": "Южно-Сахалинск",
			"deliveries_time": 8
		},
		{
			"name": "Южноуральск",
			"deliveries_time": 6
		},
		{
			"name": "Южный",
			"deliveries_time": 8
		},
		{
			"name": "Юрга",
			"deliveries_time": 4
		},
		{
			"name": "Юрлово",
			"deliveries_time": 4
		},
		{
			"name": "Юрцово",
			"deliveries_time": 4
		},
		{
			"name": "Юрьев-Польский",
			"deliveries_time": 5
		},
		{
			"name": "Юрюзань",
			"deliveries_time": 5
		},
		{
			"name": "Юхнов",
			"deliveries_time": 3
		},
		{
			"name": "Яблоновский",
			"deliveries_time": 5
		},
		{
			"name": "Яковлево",
			"deliveries_time": 4
		},
		{
			"name": "Яковское",
			"deliveries_time": 4
		},
		{
			"name": "Якоть",
			"deliveries_time": 4
		},
		{
			"name": "Якутск",
			"deliveries_time": 8
		},
		{
			"name": "Ялта",
			"deliveries_time": 4
		},
		{
			"name": "Ялуторовск",
			"deliveries_time": 6
		},
		{
			"name": "Ям",
			"deliveries_time": 2
		},
		{
			"name": "Ямкино",
			"deliveries_time": 3
		},
		{
			"name": "Ямны",
			"deliveries_time": 3
		},
		{
			"name": "Янино 1",
			"deliveries_time": 8
		},
		{
			"name": "Ярополец",
			"deliveries_time": 4
		},
		{
			"name": "Ярославль",
			"deliveries_time": 3
		},
		{
			"name": "Ярцево",
			"deliveries_time": 5
		},
		{
			"name": "Ясная Поляна",
			"deliveries_time": 4
		},
		{
			"name": "Ясногорск",
			"deliveries_time": 3
		},
		{
			"name": "Яхрома",
			"deliveries_time": 4
		},
		{
			"name": "Moscow",
			"deliveries_time": 3
		},
		{
			"name": "Saint Petersburg",
			"deliveries_time": 3
		},
		{
			"name": "Novosibirsk",
			"deliveries_time": 4
		},
		{
			"name": "Yekaterinburg",
			"deliveries_time": 5
		},
		{
			"name": "Kazan",
			"deliveries_time": 4
		},
		{
			"name": "Nizhny Novgorod",
			"deliveries_time": 3
		},
		{
			"name": "Chelyabinsk",
			"deliveries_time": 6
		},
		{
			"name": "Samara",
			"deliveries_time": 4
		},
		{
			"name": "Omsk",
			"deliveries_time": 4
		},
		{
			"name": "Rostov-on-Don",
			"deliveries_time": 4
		},
		{
			"name": "Ufa",
			"deliveries_time": 5
		},
		{
			"name": "Krasnoyarsk",
			"deliveries_time": 4
		},
		{
			"name": "Voronezh",
			"deliveries_time": 3
		},
		{
			"name": "Perm",
			"deliveries_time": 5
		},
		{
			"name": "Volgograd",
			"deliveries_time": 4
		},
		{
			"name": "Krasnodar",
			"deliveries_time": 4
		},
	],
	"BY": [
		{
			"name": "Барановичи",
			"deliveries_time": 5
		},
		{
			"name": "Бобруйск",
			"deliveries_time": 4
		},
		{
			"name": "Борисов",
			"deliveries_time": 3
		},
		{
			"name": "Брест",
			"deliveries_time": 3
		},
		{
			"name": "Витебск",
			"deliveries_time": 3
		},
		{
			"name": "Воскресенское поселение",
			"deliveries_time": 2
		},
		{
			"name": "Гомель",
			"deliveries_time": 5
		},
		{
			"name": "Гродно",
			"deliveries_time": 5
		},
		{
			"name": "Жлобин",
			"deliveries_time": 5
		},
		{
			"name": "Жодино",
			"deliveries_time": 4
		},
		{
			"name": "Зеленоград",
			"deliveries_time": 3
		},
		{
			"name": "Кобрин",
			"deliveries_time": 5
		},
		{
			"name": "Лида",
			"deliveries_time": 5
		},
		{
			"name": "Минск",
			"deliveries_time": 3
		},
		{
			"name": "Митино",
			"deliveries_time": 3
		},
		{
			"name": "Могилев",
			"deliveries_time": 5
		},
		{
			"name": "Мозырь",
			"deliveries_time": 8
		},
		{
			"name": "Молодечно",
			"deliveries_time": 5
		},
		{
			"name": "Москва",
			"deliveries_time": 2
		},
		{
			"name": "Новополоцк",
			"deliveries_time": 4
		},
		{
			"name": "Орша",
			"deliveries_time": 5
		},
		{
			"name": "Пинск",
			"deliveries_time": 5
		},
		{
			"name": "Полоцк",
			"deliveries_time": 4
		},
		{
			"name": "Сколково",
			"deliveries_time": 3
		},
		{
			"name": "Слуцк",
			"deliveries_time": 5
		},
		{
			"name": "Солигорск",
			"deliveries_time": 4
		},
		{
			"name": "Троицк",
			"deliveries_time": 3
		},
		{
			"name": "Щербинка",
			"deliveries_time": 3
		}
	],
	"KZ": [
		{
			"name": "Абай, Карагандинская обл, Казахстан",
			"deliveries_time": 10
		},
		{
			"name": "Актау",
			"deliveries_time": 9
		},
		{
			"name": "Актобе, Казахстан",
			"deliveries_time": 7
		},
		{
			"name": "Алматы",
			"deliveries_time": 11
		},
		{
			"name": "Атырау",
			"deliveries_time": 6
		},
		{
			"name": "Балхаш, Карагандинская обл",
			"deliveries_time": 12
		},
		{
			"name": "Воскресенское поселение",
			"deliveries_time": 3
		},
		{
			"name": "Жанаозен, Мангистауская обл.",
			"deliveries_time": 9
		},
		{
			"name": "Жезказган, Карагандинская обл.",
			"deliveries_time": 12
		},
		{
			"name": "Зеленоград",
			"deliveries_time": 3
		},
		{
			"name": "Капчагай, Алма-Атинская обл.",
			"deliveries_time": 13
		},
		{
			"name": "Караганда, Карагандинская обл.",
			"deliveries_time": 9
		},
		{
			"name": "Каскелен, Алматинская обл, Карасайский район",
			"deliveries_time": 13
		},
		{
			"name": "Кокшетау, Казахстан",
			"deliveries_time": 10
		},
		{
			"name": "Кордай, Жамбылская обл.",
			"deliveries_time": 13
		},
		{
			"name": "Костанай",
			"deliveries_time": 11
		},
		{
			"name": "Косшы, Целиноградский р-н, Казахстан",
			"deliveries_time": 11
		},
		{
			"name": "Кызылорда, Казахстан",
			"deliveries_time": 12
		},
		{
			"name": "Митино",
			"deliveries_time": 3
		},
		{
			"name": "Москва",
			"deliveries_time": 6
		},
		{
			"name": "Нур-Султан (Астана)",
			"deliveries_time": 9
		},
		{
			"name": "Отеген батыр",
			"deliveries_time": 11
		},
		{
			"name": "Павлодар, Павлодарская обл.",
			"deliveries_time": 8
		},
		{
			"name": "Петропавловск, Сев.-Казах.обл.",
			"deliveries_time": 6
		},
		{
			"name": "Приозёрск",
			"deliveries_time": 13
		},
		{
			"name": "Риддер",
			"deliveries_time": 9
		},
		{
			"name": "Рудный, Костанайская обл.",
			"deliveries_time": 12
		},
		{
			"name": "Сарань, Карагандинская обл., Казахстан",
			"deliveries_time": 10
		},
		{
			"name": "Сарыагаш, Туркестанская обл.",
			"deliveries_time": 14
		},
		{
			"name": "Сатпаев, Карагандинская обл., Казахстан",
			"deliveries_time": 19
		},
		{
			"name": "Семей (Семипалатинск)",
			"deliveries_time": 8
		}
	]
}

function shippingTo(country) {
	let freeShipping = false, days = '';
	const order = new Order();

	if (country.code == 'RU') {
		freeShipping = true;
		$('#total').text('$' + order.total()).data('total', order.total());
	} else {
		if (order.total() > 190) {
			freeShipping = true;
			$('#total').text('$' + order.total()).data('total', order.total());
		} else {
			$('#total').text('$' + (order.total() + 15)).data('total', order.total() + 15);
		}

		days = country.timing + ' ' + declOfNum(country.timing, ['day', 'days']);
		days = ` (${days})`;
	}

	$("#delivery").attr("data-country-code", country.code);
	$('#delivery').attr("data-timing", country.timing);

	if (!freeShipping)
		$('#delivery').html(
			freeShippingTextTemplate(days, 190 - order.total())
		);
	else
		$('#delivery').html(freeShippingTextTemplate(days));
}

function shippingToCity(__city) {
	if (
		$('#delivery').data('country-code') == 'RU' ||
		$('#delivery').data('country-code') == 'BY' ||
		$('#delivery').data('country-code') == 'KZ'
	) {
		try {
			let city = cities_data[$('#delivery').data('country-code')].find(city => city.name.toLowerCase() == __city.trim().toLowerCase()),
				days = city.deliveries_time + ' ' + declOfNum(city.deliveries_time, ['day', 'days']);

			days = ` (${days})`;

			$('#delivery')
				.attr('data-timing', city.deliveries_time)
				.html(
					freeShippingTextTemplate(days)
				);
		} catch { }
	}
}

function freeShippingTextTemplate(days, leftToFreeshipping = 0) {
	return (leftToFreeshipping > 0 ? `<span>$${leftToFreeshipping}</span>&nbsp;` : '') + `DHL Express®${days}`;
}

function declOfNum(num, words) {
	if (num <= 1)
		return words[0];
	else
		return words[1];
}
